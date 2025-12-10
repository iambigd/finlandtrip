import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weatherData as staticWeatherData } from '../data/weatherData';
import { useWeatherData } from '../hooks/useWeatherData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const WeatherCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // 使用即時天氣數據
  const { weatherData: liveWeatherData, loading, error } = useWeatherData();
  
  // 如果正在加載或出錯，使用靜態數據作為 fallback
  const weatherData = liveWeatherData.length > 0 ? liveWeatherData : staticWeatherData;

  // 自动播放
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % weatherData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + weatherData.length) % weatherData.length);
  };

  const weather = weatherData[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 标题 */}
      <div className="mb-6">
        <h3 className="text-white/90 flex items-center gap-2">
          <span className="text-2xl">❄️</span>
          <span>旅程天氣</span>
          {/* 即時數據標記 */}
          {liveWeatherData.length > 0 && (
            <span className="ml-auto text-xs text-white/40 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              即時
            </span>
          )}
        </h3>
        <p className="text-white/60 text-sm mt-1">
          {loading && '載入即時天氣數據...'}
          {error && '使用預設數據'}
          {!loading && !error && '即時氣象與穿搭建議'}
        </p>
      </div>

      {/* 轮播容器 */}
      <div className="flex-1 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/10">
              {/* 城市 */}
              <div className="mb-4">
                <h4 className="text-white">{weather.cityZh}</h4>
                <p className="text-white/50 text-sm">{weather.city}</p>
              </div>

              {/* 温度 */}
              <div className="text-center py-6 mb-4">
                <div className="text-5xl text-white mb-2">
                  {weather.currentTemp}°C
                </div>
                <div className="text-white/50 text-sm mb-3">
                  體感 {weather.feelsLike}°C
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{weather.weatherIcon}</span>
                  <span className="text-white/70">{weather.weather}</span>
                </div>
              </div>

              {/* 气象详情 */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <span>💧</span>
                  <span>濕度 {weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <span>💨</span>
                  <span>風速 {weather.windSpeed} m/s</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 col-span-2">
                  <span>☀️</span>
                  <span>日照 {weather.daylight}</span>
                </div>
              </div>

              {/* 穿着建议 */}
              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <div className="text-white/50 text-sm mb-2 flex items-center gap-1">
                  <span>🧥</span>
                  <span>穿搭建議</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weather.clothing.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 特殊提示 */}
              {weather.highlight && (
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white/80 text-sm flex items-center gap-2">
                    <span>⭐</span>
                    <span>{weather.highlight}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 导航按钮 */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4
            p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm
            transition-all z-10"
          aria-label="上一个城市"
        >
          <ChevronLeft className="size-5 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4
            p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm
            transition-all z-10"
          aria-label="下一个城市"
        >
          <ChevronRight className="size-5 text-white" />
        </button>
      </div>

      {/* 指示器 - 移到底部 */}
      <div className="flex justify-center gap-2 mt-6">
        {weatherData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${idx === currentIndex ? 'w-6 bg-white/80' : 'w-1.5 bg-white/30'}
            `}
            aria-label={`前往城市 ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};