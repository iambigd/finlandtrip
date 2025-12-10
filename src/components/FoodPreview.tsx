import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { foodData } from '../data/foodData';
import { souvenirData } from '../data/souvenirData';
import { foodImages, souvenirImages } from '../data/foodDataImages';

interface FoodPreviewProps {
  onOpenFoodDrawer: () => void;
}

const FoodPreview = ({ onOpenFoodDrawer }: FoodPreviewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 篩選推薦美食（必吃或極地限定）
  const featuredFoods = foodData
    .filter(item => item.tags.includes('必吃') || item.tags.includes('極地限定'))
    .slice(0, 4);

  // 熱門推薦伴手禮（前3個）
  const featuredSouvenirs = souvenirData
    .filter(item => item.isRecommended)
    .slice(0, 3);

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredFoods.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredFoods.length]);

  return (
    <section id="food" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 border-t border-gray-100 relative z-10">
      <h2 className="text-6xl font-serif text-center italic text-[#111] mb-12">
        Food & Souvenirs
        <span className="dual-title-zh text-lg uppercase text-gray-600">美食與伴手禮���選</span>
      </h2>

      {/* 桌面版：左右分割（60/40） | 手機版：上下堆疊 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 左側：美食輪播（60%，即 3/5） */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-lg border-t-4 border-[#d4af37] p-6">
            <h3 className="text-3xl font-serif italic text-[#111] mb-4 flex items-center gap-2">
              🍽️ 芬蘭美食精選
            </h3>

            {/* 輪播區 */}
            <div className="relative h-64 md:h-80 overflow-hidden mb-4">
              {featuredFoods.map((food, index) => (
                <div
                  key={food.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <ImageWithFallback
                    src={foodImages[food.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
                    alt={food.nameZh}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-white font-serif text-xl mb-1">{food.nameZh}</h4>
                    <p className="text-gray-300 text-sm">{food.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 輪播指示器 */}
            <div className="flex justify-center gap-2 mb-4">
              {featuredFoods.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-[#d4af37] w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* 美食按鈕 */}
            <button
              onClick={onOpenFoodDrawer}
              className="w-full bg-[#003580] text-white py-3 px-6 rounded font-sans hover:bg-[#003580]/90 transition flex items-center justify-center gap-2"
            >
              體驗更多美食 <span>→</span>
            </button>
          </div>
        </div>

        {/* 右側：伴手禮網格（40%，即 2/5） */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg border-t-4 border-[#d4af37] p-6 h-full flex flex-col">
            <h3 className="text-3xl font-serif italic text-[#111] mb-4 flex items-center gap-2">
              🎁 伴手禮推薦
            </h3>

            {/* 伴手禮小圖網格 */}
            <div className="flex-1 grid grid-cols-1 gap-4 mb-4">
              {featuredSouvenirs.map((souvenir) => (
                <div key={souvenir.id} className="relative group">
                  <ImageWithFallback
                    src={souvenirImages[souvenir.id] || 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800'}
                    alt={souvenir.nameZh}
                    className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <span className="text-white font-serif text-sm text-center px-2">
                      {souvenir.nameZh}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 伴手禮按鈕 */}
            <button
              onClick={onOpenFoodDrawer}
              className="w-full bg-[#d4af37] text-[#111] py-3 px-6 rounded font-sans hover:bg-[#d4af37]/90 transition flex items-center justify-center gap-2"
            >
              想看更多伴手禮 <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodPreview;