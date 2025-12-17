import { useState, useEffect } from 'react';
import { Comment } from '../App';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  poiId: string;
  poiName: string;
  loadComments: (poiId: string) => Promise<Comment[]>;
  saveComments: (poiId: string, comments: Comment[]) => void;
  userNickname: string | null;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
}

const RatingModal = ({
  isOpen,
  onClose,
  poiId,
  poiName,
  loadComments,
  saveComments,
  userNickname,
  isAuthenticated,
  onLoginRequired,
}: RatingModalProps) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [pendingSuccess, setPendingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const MAX_COMMENT_LENGTH = 500;

  // Dispatch Tonttu success event after state updates
  useEffect(() => {
    if (pendingSuccess) {
      const event = new CustomEvent('tonttu:rating-success', {
        detail: { name: poiName },
      });
      window.dispatchEvent(event);
      setPendingSuccess(false);
    }
  }, [pendingSuccess, poiName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    if (!rating) {
      alert('請填寫星級評分');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');

      // Save to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-081848af/ratings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            poiId,
            rating,
            text: text.trim(),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '提交失敗');
      }

      const data = await response.json();

      // Also save to localStorage for backward compatibility
      const comments = await loadComments(poiId);
      comments.unshift(data.rating);
      saveComments(poiId, comments);

      // Schedule Tonttu success event
      setPendingSuccess(true);

      // Reset form
      setText('');
      setRating(0);
      onClose();
    } catch (err) {
      console.error('Rating submission error:', err);
      setError(err instanceof Error ? err.message : '提交失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-serif font-bold mb-4 text-[#003580]">
          為 {poiName} 評分
        </h3>
        
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              請先登入以留下您的評分與評論
            </p>
            <button
              onClick={onLoginRequired}
              className="bg-[#003580] text-white px-6 py-3 rounded shadow-md hover:bg-[#003580]/90 transition"
            >
              登入 / 註冊
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-sans mb-4 text-gray-600">
              以 <span className="font-bold text-[#003580]">{userNickname}</span> 的身份留下評分
            </p>

            {error && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                      setText(e.target.value);
                    }
                  }}
                  placeholder="分享您的美食體驗（選填，最多 500 字）"
                  className="w-full p-3 border border-gray-300 rounded text-sm font-serif h-24"
                />
                <div className="text-right text-xs text-gray-400 mt-1">
                  {text.length} / {MAX_COMMENT_LENGTH}
                </div>
              </div>

              <div className="flex flex-col items-start space-y-2">
                <span className="text-sm font-sans font-bold">星級評分:</span>
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star}>
                      <input
                        type="radio"
                        value={star}
                        checked={rating === star}
                        onChange={() => setRating(star)}
                        required
                      />
                      <span>★</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="text-gray-600 text-sm font-sans px-4 py-2 hover:bg-gray-100 rounded transition disabled:opacity-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#d4af37] text-[#111] text-sm font-sans px-6 py-2 rounded shadow-md hover:bg-[#d4af37]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '提交中...' : '提交評分'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RatingModal;