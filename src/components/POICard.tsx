import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Tag, MapPin, Info, Star } from 'lucide-react';
import { CityPOI } from '../data/cityData';
import { Comment } from '../App';

interface POICardProps {
  poi: CityPOI;
  showDate?: boolean;
  loadComments: (poiId: string) => Comment[];
  getAverageRating: (poiId: string) => string;
  onRatingClick: (poiId: string, poiName: string) => void;
}

// 預設景點圖片（根據類型）
const getDefaultImage = (type: CityPOI['type']): string => {
  const defaults: Record<CityPOI['type'], string> = {
    attraction: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80',
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    museum: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&q=80',
    shopping: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80',
    nature: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80',
    transport: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80',
  };
  return defaults[type] || defaults.attraction;
};

export const POICard: React.FC<POICardProps> = ({ 
  poi, 
  showDate = true, 
  loadComments, 
  getAverageRating,
  onRatingClick 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const comments = loadComments(poi.id);
  const avgRating = getAverageRating(poi.id);
  const imageUrl = poi.image || getDefaultImage(poi.type);

  return (
    <motion.div
      layout
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10
        hover:bg-white/10 hover:border-white/20 transition-all"
    >
      {/* 基本信息 */}
      <div className="flex gap-4 p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {/* 縮圖 */}
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={poi.nameZh}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* 內容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-white mb-1">{poi.nameZh}</h4>
              <p className="text-white/60 text-sm mb-2 truncate">{poi.name}</p>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-2">
                {showDate && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded flex items-center gap-1">
                    <Calendar className="size-3" />
                    {poi.date}
                  </span>
                )}
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded flex items-center gap-1">
                  <Tag className="size-3" />
                  {poi.typeZh}
                </span>
                
                {/* 評分顯示 */}
                {comments.length > 0 && (
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded flex items-center gap-1">
                    <Star className="size-3 fill-amber-300" />
                    {avgRating}
                  </span>
                )}
              </div>

              {/* 副标题 */}
              <p className="text-white/70 text-sm line-clamp-2">{poi.subtitle}</p>
            </div>

            {/* 展开图标 */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <Info className="size-5 text-white/40" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 展开内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* 描述 */}
              <p className="text-white/70 text-sm leading-relaxed">
                {poi.description}
              </p>

              {/* Tonttu 提示 */}
              {poi.tips && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🧝</span>
                    <div className="flex-1">
                      <p className="text-amber-200/90 text-xs mb-1">Tonttu 小精靈說</p>
                      <p className="text-amber-100/80 text-sm">{poi.tips}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 位置 */}
              {poi.location && (
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="size-4 flex-shrink-0 mt-0.5" />
                  <span>{poi.location}</span>
                </div>
              )}

              {/* 标签云 */}
              <div className="flex flex-wrap gap-2">
                {poi.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 評分與評論區 */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {comments.length > 0 ? (
                      <>
                        {/* 星星評分顯示 */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const rating = parseFloat(avgRating);
                            const isFull = star <= Math.floor(rating);
                            const isHalf = star === Math.ceil(rating) && rating % 1 >= 0.25 && rating % 1 < 0.75;
                            
                            return (
                              <Star
                                key={star}
                                className={`size-4 ${
                                  isFull
                                    ? 'text-amber-400 fill-amber-400'
                                    : isHalf
                                    ? 'text-amber-400 fill-amber-400/50'
                                    : 'text-white/20 fill-white/20'
                                }`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-white/90 text-sm">{avgRating}</span>
                        <span className="text-white/50 text-xs">
                          ({comments.length} 則評論)
                        </span>
                      </>
                    ) : (
                      <>
                        {/* 無評分時顯示空星星 */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="size-4 text-white/20 fill-white/20"
                            />
                          ))}
                        </div>
                        <span className="text-white/60 text-sm">尚無評分</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRatingClick(poi.id, poi.nameZh);
                    }}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                  >
                    留下評分
                  </button>
                </div>

                {/* 評論展開 */}
                {comments.length > 0 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowComments(!showComments);
                      }}
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mb-2"
                    >
                      <span>{showComments ? '▼' : '▶'}</span>
                      <span>{showComments ? '隱藏' : '查看'} {comments.length} 則評論</span>
                    </button>

                    <AnimatePresence>
                      {showComments && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          {comments.slice(0, 3).map((comment) => (
                            <div
                              key={comment.id}
                              className="bg-white/5 rounded-lg p-3"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white/90 text-sm">{comment.author}</span>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`size-3 ${
                                        i < comment.rating
                                          ? 'text-amber-400 fill-amber-400'
                                          : 'text-white/20'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              {comment.text && (
                                <p className="text-white/70 text-sm">{comment.text}</p>
                              )}
                              <p className="text-white/40 text-xs mt-1">
                                {new Date(comment.date).toLocaleDateString('zh-TW')}
                              </p>
                            </div>
                          ))}
                          {comments.length > 3 && (
                            <p className="text-white/50 text-xs text-center">
                              還有 {comments.length - 3} 則評論...
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};