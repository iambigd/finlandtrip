import { useState, useEffect } from 'react';
import { Comment } from '../App';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  poiId: string;
  poiName: string;
  loadComments: (poiId: string) => Comment[];
  saveComments: (poiId: string, comments: Comment[]) => void;
}

const RatingModal = ({
  isOpen,
  onClose,
  poiId,
  poiName,
  loadComments,
  saveComments,
}: RatingModalProps) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [pendingSuccess, setPendingSuccess] = useState(false);

  useEffect(() => {
    // Load last author from localStorage
    const lastAuthor = localStorage.getItem('last_author') || '';
    setAuthor(lastAuthor);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author || !rating) {
      alert('請填寫所有必填欄位 (姓名、星級評分)');
      return;
    }

    const comments = loadComments(poiId);
    comments.unshift({
      id: Date.now(),
      author,
      text: text || '未提供評論。',
      rating,
      date: Date.now(),
    });

    saveComments(poiId, comments);
    localStorage.setItem('last_author', author);

    // Schedule Tonttu success event
    setPendingSuccess(true);

    // Reset form
    setText('');
    setRating(0);
    onClose();
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
        <p className="text-sm font-sans mb-4 text-gray-600">
          請留下星級評分與您的旅遊回憶。
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="您的名字 (例: David)"
            required
            className="w-full p-3 border border-gray-300 rounded text-sm font-sans"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="寫下您的評論與回憶..."
            required
            className="w-full p-3 border border-gray-300 rounded text-sm font-serif h-24"
          />

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
              className="text-gray-600 text-sm font-sans px-4 py-2 hover:bg-gray-100 rounded transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-[#d4af37] text-[#111] text-sm font-sans px-6 py-2 rounded shadow-md hover:bg-[#d4af37]/80 transition"
            >
              提交評分
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
