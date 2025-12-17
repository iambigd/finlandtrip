import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { CityPOI } from '../data/cityData';
import { Comment } from '../App';
import { POICard } from './POICard';

interface CityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  cityNameZh: string;
  pois: CityPOI[];
  // 評論系統
  loadComments: (poiId: string) => Promise<Comment[]>;
  saveComments: (poiId: string, comments: Comment[]) => void;
  getAverageRating: (poiId: string) => Promise<string>;
  onRatingClick: (poiId: string, poiName: string) => void;
}

export const CityDrawer: React.FC<CityDrawerProps> = ({
  isOpen,
  onClose,
  cityName,
  cityNameZh,
  pois,
  loadComments,
  saveComments,
  getAverageRating,
  onRatingClick,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // 按日期分組 POI
  const groupedByDate = pois.reduce((acc, poi) => {
    const date = poi.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(poi);
    return acc;
  }, {} as Record<string, CityPOI[]>);

  // 获取所有日期并排序
  const dates = Object.keys(groupedByDate).sort((a, b) => {
    const poiA = groupedByDate[a][0];
    const poiB = groupedByDate[b][0];
    return poiA.dayNumber - poiB.dayNumber;
  });

  // 按类型分组
  const groupedByType = pois.reduce((acc, poi) => {
    const type = poi.typeZh;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(poi);
    return acc;
  }, {} as Record<string, CityPOI[]>);

  // 类型图标映射
  const typeIcons: Record<string, string> = {
    '景點': '🏛️',
    '餐廳': '🍽️',
    '博物館': '🎨',
    '購物': '🛍️',
    '自然': '🌲',
    '交通': '🚇',
  };

  // 重置 tab 当关闭时
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setActiveTab('all'), 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* 抽屉 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] 
              bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
              shadow-2xl z-50 overflow-hidden"
          >
            {/* 装饰性背景 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
            </div>

            {/* 内容 */}
            <div className="relative h-full flex flex-col">
              {/* 头部 */}
              <div className="flex-shrink-0 px-8 py-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white mb-1">{cityNameZh}</h2>
                    <p className="text-white/60 text-sm">{cityName}</p>
                    <div className="flex items-center gap-2 mt-3 text-white/70 text-sm">
                      <MapPin className="size-4" />
                      <span>{pois.length} 個景點</span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="size-6 text-white/70" />
                  </button>
                </div>

                {/* Tab 切换 */}
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`
                      px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                      ${activeTab === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }
                    `}
                  >
                    全部 ({pois.length})
                  </button>
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setActiveTab(date)}
                      className={`
                        px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                        ${activeTab === date
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }
                      `}
                    >
                      {date} ({groupedByDate[date].length})
                    </button>
                  ))}
                </div>
              </div>

              {/* 景点列表 */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {activeTab === 'all' ? (
                      // 全部视图 - 按类型分组
                      Object.entries(groupedByType).map(([type, typePois]) => (
                        <div key={type} className="mb-8">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">{typeIcons[type] || '📍'}</span>
                            <h3 className="text-white/90">{type}</h3>
                            <span className="text-white/40 text-sm">({typePois.length})</span>
                          </div>
                          <div className="space-y-3">
                            {typePois.map((poi) => (
                              <POICard key={poi.id} poi={poi} loadComments={loadComments} saveComments={saveComments} getAverageRating={getAverageRating} onRatingClick={onRatingClick} />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      // 日期视图
                      <div className="space-y-3">
                        {groupedByDate[activeTab]?.map((poi) => (
                          <POICard key={poi.id} poi={poi} showDate={false} loadComments={loadComments} saveComments={saveComments} getAverageRating={getAverageRating} onRatingClick={onRatingClick} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};