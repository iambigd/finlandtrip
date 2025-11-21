import { useEffect, useState } from 'react';
import { Comment } from '../App';

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  poiId: string;
  poiName: string;
  loadComments: (poiId: string) => Comment[];
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
}

const ViewingModal = ({
  isOpen,
  onClose,
  poiId,
  poiName,
  loadComments,
  getAverageRating,
  renderStars,
}: ViewingModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (isOpen) {
      const loadedComments = loadComments(poiId).sort((a, b) => b.date - a.date);
      setComments(loadedComments);
    }
  }, [isOpen, poiId, loadComments]);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-serif font-bold mb-2">{poiName} 的所有評分</h3>
        <p className="text-sm font-sans mb-6 text-gray-600">
          平均評分:{' '}
          <span className="text-[#d4af37] font-bold text-lg">
            {getAverageRating(poiId, false)}
          </span>{' '}
          / 5 ({comments.length} 則評論)
        </p>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 font-serif italic">
              目前尚無評分。搶先留下您的評論吧！
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#fdfbf7] p-4 border-l-4 border-[#003580] shadow-sm"
              >
                <div className="flex justify-between items-start text-xs mb-2">
                  <span className="font-bold text-[#111] text-sm">{comment.author}</span>
                  <span className="text-gray-500">{formatDate(comment.date)}</span>
                </div>
                <div className="text-base font-serif italic text-gray-700 mb-2 leading-relaxed">
                  {comment.text}
                </div>
                <div className="text-lg text-[#d4af37]">
                  <span dangerouslySetInnerHTML={{ __html: renderStars(comment.rating) }} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#003580] text-white text-sm font-sans px-6 py-2 rounded hover:bg-[#003580]/90 transition"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewingModal;
