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
        <span className="dual-title-zh text-lg uppercase text-gray-600">美食與伴手禮精選</span>
      </h2>

      {/* 桌面版：左右分割（60/40） | 手機版：上下堆疊 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 左側：美食輪播（60%，即 3/5） */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="border-t-4 border-[#d4af37] p-6">
              <h3 className="text-3xl font-serif italic text-[#111] mb-4">
                芬蘭美食精選
              </h3>

              {/* 輪播區 */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-4 group">
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
                      
                      {/* 手機版按鈕：直接顯示在漸層區 */}
                      <button
                        onClick={onOpenFoodDrawer}
                        className="lg:hidden mt-3 w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-sans hover:bg-white/30 transition flex items-center justify-center gap-2 text-sm border border-white/30"
                      >
                        體驗更多美食 <span>→</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* 電腦版 hover 按鈕：中央顯示 */}
                <div className="hidden lg:block absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={onOpenFoodDrawer}
                      className="bg-white text-[#003580] py-3 px-8 rounded-lg font-sans hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
                    >
                      體驗更多美食 <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 輪播指示器 */}
              <div className="flex justify-center gap-2">
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
            </div>
          </div>
        </div>

        {/* 右側：伴手禮網格（40%，即 2/5） */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
            <div className="border-t-4 border-[#d4af37] p-6 flex-1 flex flex-col">
              <h3 className="text-3xl font-serif italic text-[#111] mb-4">
                伴手禮推薦
              </h3>

              {/* 伴手禮小圖網格 */}
              <div className="flex-1 grid grid-cols-1 gap-4 relative group">
                {featuredSouvenirs.map((souvenir, index) => (
                  <div key={souvenir.id} className="relative overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={souvenirImages[souvenir.id] || 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800'}
                      alt={souvenir.nameZh}
                      className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                    />
                    {/* 名稱移到左下角（與美食一致） */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <span className="text-white font-serif text-sm">
                        {souvenir.nameZh}
                      </span>
                      
                      {/* 手機版：第三個圖上顯示按鈕 */}
                      {index === featuredSouvenirs.length - 1 && (
                        <button
                          onClick={onOpenFoodDrawer}
                          className="lg:hidden mt-2 w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-sans hover:bg-white/30 transition flex items-center justify-center gap-2 text-xs border border-white/30"
                        >
                          想看更多伴手禮 <span>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* 電腦版 hover 按鈕：整個區域中央顯示 */}
                <div className="hidden lg:block absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={onOpenFoodDrawer}
                      className="bg-white text-[#003580] py-3 px-8 rounded-lg font-sans hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
                    >
                      想看更多伴手禮 <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodPreview;