import React from 'react';
import { CityPOI } from '../data/cityData';

interface CityCardProps {
  city: 'helsinki' | 'tallinn' | 'porvoo' | 'suomenlinna';
  cityZh: string;
  image: string;
  poiCount: number;
  highlightPOIs: CityPOI[];
  onClick: () => void;
}

export const CityCard: React.FC<CityCardProps> = ({
  cityZh,
  image,
  poiCount,
  highlightPOIs,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-full
        hover:scale-[1.02] transition-all duration-500 ease-out shadow-lg
        hover:shadow-2xl"
    >
      {/* 背景图片 */}
      <div className="relative h-full overflow-hidden">
        <img
          src={image}
          alt={cityZh}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* 悬停效果 */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500" />
      </div>

      {/* 内容 */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* 城市名称 */}
        <h3 className="text-white mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
          {cityZh}
        </h3>
        
        {/* 景点数量 */}
        <div className="flex items-center gap-2 mb-3 text-white/80 text-sm">
          <span>📍</span>
          <span>{poiCount} 個景點</span>
        </div>

        {/* 精选景点标签 */}
        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 
          translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
          {highlightPOIs.slice(0, 3).map((poi, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white/90 text-xs
                border border-white/30"
            >
              {poi.nameZh}
            </span>
          ))}
          {highlightPOIs.length > 3 && (
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white/90 text-xs
              border border-white/30">
              +{highlightPOIs.length - 3}
            </span>
          )}
        </div>

        {/* 点击提示 */}
        <div className="flex items-center gap-2 text-white/60 text-sm
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
          <span>點擊探索</span>
          <span className="text-lg">→</span>
        </div>
      </div>

      {/* 顶部标签 */}
      <div className="absolute top-4 right-4">
        <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs
          text-gray-800 font-medium shadow-lg">
          城市探索
        </div>
      </div>
    </div>
  );
};