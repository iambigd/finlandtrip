import { useState, useEffect, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Comment } from '../App';
import { cityData, CityPOI, cityTips } from '../data/cityData';
import { cityImages } from '../data/cityDataImages';
import { MapPin, Calendar, Info } from 'lucide-react';

interface CitySectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
  loadComments: (poiId: string) => Comment[];
  selectedCity?: CityPOI['city'] | 'all';
  setSelectedCity?: (city: CityPOI['city'] | 'all') => void;
}

type TypeFilter = 'all' | CityPOI['type'];

const CitySection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
  loadComments,
  selectedCity: externalSelectedCity,
  setSelectedCity: externalSetSelectedCity,
}: CitySectionProps) => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [internalSelectedCity, setInternalSelectedCity] = useState<CityPOI['city'] | 'all'>('all');
  
  // 使用外部 state（如果有提供），否則使用內部 state
  const selectedCity = externalSelectedCity !== undefined ? externalSelectedCity : internalSelectedCity;
  const setSelectedCity = externalSetSelectedCity || setInternalSelectedCity;

  // 調試：監聽 selectedCity 變化
  useEffect(() => {
    console.log('🏛️ CitySection: selectedCity 更新為', selectedCity, '(來源:', externalSelectedCity !== undefined ? '外部' : '內部', ')');
  }, [selectedCity, externalSelectedCity]);

  // 標籤顏色配置（統一使用同一種藍色）
  const tagStyles: Record<string, string> = {
    '必訪': 'bg-blue-100 text-blue-700',
    '拍照景點': 'bg-blue-100 text-blue-700',
    '世界遺產': 'bg-blue-100 text-blue-700',
    '設計朝聖': 'bg-blue-100 text-blue-700',
    '美食': 'bg-blue-100 text-blue-700',
    '當地體驗': 'bg-blue-100 text-blue-700',
    '中世紀': 'bg-blue-100 text-blue-700',
    '海港': 'bg-blue-100 text-blue-700',
  };

  // 類型篩選器選項
  const typeFilterOptions: { value: TypeFilter; label: string; emoji: string }[] = [
    { value: 'all', label: '全部景點', emoji: '🗺️' },
    { value: 'attraction', label: '景點', emoji: '🏛️' },
    { value: 'museum', label: '博物館', emoji: '🎨' },
    { value: 'restaurant', label: '餐廳', emoji: '🍽️' },
    { value: 'shopping', label: '購物', emoji: '🛍️' },
    { value: 'nature', label: '自然', emoji: '🌳' },
    { value: 'transport', label: '交通', emoji: '🚂' },
  ];

  // 城市篩選器選項
  const cityFilterOptions: { value: CityPOI['city'] | 'all'; label: string; color: string }[] = [
    { value: 'all', label: '所有城市', color: 'bg-gray-500' },
    { value: 'helsinki', label: '赫爾辛基', color: 'bg-blue-500' },
    { value: 'tallinn', label: '塔林', color: 'bg-amber-500' },
    { value: 'porvoo', label: '波爾沃', color: 'bg-rose-500' },
    { value: 'suomenlinna', label: '芬蘭堡', color: 'bg-indigo-500' },
  ];

  // 渲染標籤
  const renderTags = (tags: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs px-2 py-1 rounded ${tagStyles[tag] || 'bg-gray-500 text-white'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  // 篩選資料
  const filteredData = useMemo(() => {
    return cityData.filter(poi => {
      const typeMatch = typeFilter === 'all' || poi.type === typeFilter;
      const cityMatch = selectedCity === 'all' || poi.city === selectedCity;
      return typeMatch && cityMatch;
    });
  }, [typeFilter, selectedCity]);

  // 按日期分組
  const groupedByDay = useMemo(() => {
    const groups: Record<number, CityPOI[]> = {};
    filteredData.forEach(poi => {
      if (!groups[poi.dayNumber]) {
        groups[poi.dayNumber] = [];
      }
      groups[poi.dayNumber].push(poi);
    });
    return groups;
  }, [filteredData]);

  const sortedDays = Object.keys(groupedByDay)
    .map(Number)
    .sort((a, b) => a - b);

  // 獲取城市對應的邊框顏色
  const getCityBorderColor = (city: CityPOI['city']): string => {
    const colorMap: Record<CityPOI['city'], string> = {
      helsinki: 'border-blue-400',
      tallinn: 'border-amber-400',
      porvoo: 'border-rose-400',
      suomenlinna: 'border-indigo-400',
    };
    return colorMap[city];
  };

  return (
    <section id="city" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 border-b border-gray-200 pb-6">
          <h2 className="text-6xl font-serif italic text-[#111] mb-3">
            City Exploration
            <span className="dual-title-zh text-lg uppercase text-gray-600 ml-4">
              城市探索
            </span>
          </h2>
          <p className="font-serif text-lg text-gray-600 mt-4">
            從赫爾辛基的設計之都到塔林的中世紀舊城，探索北歐與波羅的海的城市魅力
          </p>
        </div>

        {/* 城市篩選器 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {cityFilterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedCity(option.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedCity === option.value
                    ? `${option.color} text-white border-transparent`
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 景點列表 - 按日期分組 */}
        {sortedDays.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-gray-500 text-xl">
              沒有符合條件的景點
            </p>
          </div>
        ) : (
          sortedDays.map(dayNumber => {
            const pois = groupedByDay[dayNumber];
            const firstPoi = pois[0];

            return (
              <div key={dayNumber} className="mb-16">
                {/* 日期標題 */}
                <div className={`flex items-center mb-8 pb-4 border-l-4 pl-6 ${getCityBorderColor(firstPoi.city)}`}>
                  <Calendar className="w-6 h-6 text-gray-600 mr-3" />
                  <div>
                    <h3 className="text-3xl font-serif">
                      {firstPoi.date}
                      <span className="text-base text-gray-500 ml-3 font-sans">
                        Day {dayNumber}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 font-sans mt-1">
                      {firstPoi.cityZh} • {pois.length} 個景點
                    </p>
                  </div>
                </div>

                {/* 景點卡片 */}
                <div className="space-y-8">
                  {pois.map(poi => {
                    const avgRating = getAverageRating(poi.id, true);
                    const comments = loadComments(poi.id);
                    const imageUrl = cityImages[poi.id];

                    return (
                      <div
                        key={poi.id}
                        className={`group bg-white border-l-4 ${getCityBorderColor(poi.city)} shadow-sm hover:shadow-xl transition-all duration-300`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                          {/* 左側圖片 */}
                          <div className="md:col-span-2 relative overflow-hidden h-[300px] md:h-auto">
                            <ImageWithFallback
                              src={imageUrl}
                              alt={poi.nameZh}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            {/* 類型標籤 */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-sans">
                              {poi.typeZh}
                            </div>
                          </div>

                          {/* 右側內容 */}
                          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              {/* 標題 */}
                              <h4 className="text-3xl font-serif mb-1 leading-tight">
                                {poi.name}
                              </h4>
                              <h5 className="text-xl mb-2 leading-tight text-[#777]">
                                {poi.nameZh}
                              </h5>

                              {/* 副標題 */}
                              <p className="text-sm text-[#003580] font-sans uppercase tracking-wider mb-4">
                                {poi.subtitle}
                              </p>

                              {/* 標籤 */}
                              {renderTags(poi.tags)}

                              {/* 描述 */}
                              <p className="font-serif text-gray-700 leading-relaxed mb-4">
                                {poi.description}
                              </p>

                              {/* Tonttu 提示 */}
                              {poi.tips && (
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                                  <div className="flex items-start">
                                    <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm font-serif text-blue-900 italic">
                                      <span className="font-sans font-bold mr-1">Tonttu 秘訣:</span>
                                      {poi.tips}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* 位置資訊 */}
                              {poi.location && (
                                <div className="flex items-start text-xs text-gray-500 font-sans mb-4">
                                  <MapPin className="w-3 h-3 mr-1 mt-0.5" />
                                  <span>{poi.location}</span>
                                </div>
                              )}
                            </div>

                            {/* 評分區域 */}
                            <div className="border-t pt-4 mt-4">
                              <h5 className="text-sm font-sans font-bold text-[#003580] mb-3">
                                旅伴回憶
                              </h5>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <span className="text-xs font-sans mr-2">推薦評分:</span>
                                    <span
                                      className="display-rating cursor-pointer text-lg"
                                      onClick={() => openViewingModal(poi.id, poi.nameZh)}
                                    >
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: renderStars(avgRating),
                                        }}
                                      />
                                    </span>
                                  </div>
                                  {comments.length > 0 && (
                                    <span className="text-xs text-gray-500 font-sans">
                                      ({comments.length} 則評論)
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => openRatingModal(poi.id, poi.nameZh)}
                                  className="bg-[#003580] text-white text-xs font-sans px-4 py-2 rounded hover:bg-[#003580]/90 transition"
                                >
                                  留下評分
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        {/* 城市秘訣區塊 */}
        {selectedCity !== 'all' && (
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-2xl font-serif mb-6 flex items-center">
              <div className="w-8 h-8 mr-3 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  {/* Face */}
                  <circle cx="50" cy="50" r="48" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
                  {/* Eyes */}
                  <circle cx="35" cy="48" r="4" fill="#1a1a1a" />
                  <circle cx="65" cy="48" r="4" fill="#1a1a1a" />
                  {/* Smile */}
                  <path d="M45 58 Q50 63 55 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Blush */}
                  <circle cx="30" cy="58" r="6" fill="#ffadad" opacity="0.6" />
                  <circle cx="70" cy="58" r="6" fill="#ffadad" opacity="0.6" />
                  {/* Santa Hat */}
                  <path d="M10 38 Q50 -15 90 38" fill="#c0392b" />
                  <circle cx="50" cy="6" r="8" fill="#fff" />
                  {/* Collar */}
                  <rect x="20" y="75" width="60" height="15" rx="5" fill="#003580" />
                </svg>
              </div>
              Tonttu 的 {cityFilterOptions.find(c => c.value === selectedCity)?.label} 秘訣
            </h3>
            <ul className="space-y-3">
              {cityTips
                .find(ct => ct.city === selectedCity)
                ?.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-3 text-lg">•</span>
                    <span className="font-serif text-gray-800">{tip}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default CitySection;