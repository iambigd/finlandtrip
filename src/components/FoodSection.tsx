import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Comment } from '../App';
import { foodData, FoodItem } from '../data/foodData';
import { souvenirData, SouvenirItem } from '../data/souvenirData';
import { foodImages, souvenirImages } from '../data/foodDataImages';

interface FoodSectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
  loadComments: (poiId: string) => Comment[];
}

type FoodCategory = '推薦' | '全部' | '極地特色' | '芬蘭經典' | '塔林美食' | '甜點' | '飲品' | '零食';
type SouvenirCategory = '推薦' | '全部' | '設計品' | '食品' | '工藝品' | '服飾' | '酒類';

const FoodSection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
  loadComments,
}: FoodSectionProps) => {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [foodFilter, setFoodFilter] = useState<FoodCategory>('推薦');
  const [souvenirFilter, setSouvenirFilter] = useState<SouvenirCategory>('推薦');

  const toggleReviews = (poiId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      newSet.has(poiId) ? newSet.delete(poiId) : newSet.add(poiId);
      return newSet;
    });
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 標籤顏色配置（改為淡色背景）
  const tagStyles: Record<string, string> = {
    '必吃': 'bg-orange-100 text-orange-700',
    '極地限定': 'bg-blue-100 text-blue-700',
    '中世紀': 'bg-purple-100 text-purple-700',
    '經典': 'bg-amber-100 text-amber-700',
    '伴手禮': 'bg-green-100 text-green-700',
    '季節限定': 'bg-orange-100 text-orange-700',
    '設計精品': 'bg-amber-100 text-amber-700',
    '送禮首選': 'bg-emerald-100 text-emerald-700',
    '必買': 'bg-orange-100 text-orange-700',
  };

  // 渲染標籤（移除 icon）
  const renderTags = (tags: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs px-2.5 py-1 rounded-full ${tagStyles[tag] || 'bg-gray-100 text-gray-700'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  // 篩選美食
  const getFilteredFood = (): FoodItem[] => {
    if (foodFilter === '推薦') {
      return foodData.filter(item => 
        item.tags.includes('必吃') || item.tags.includes('極地限定')
      );
    }
    if (foodFilter === '全部') {
      return foodData;
    }
    const categoryMap: Record<FoodCategory, FoodItem['category']> = {
      '極地特色': 'extreme',
      '芬蘭經典': 'classic',
      '塔林美食': 'tallinn',
      '甜點': 'dessert',
      '飲品': 'drink',
      '零食': 'snack',
      '推薦': 'classic', // 不會用到
      '全部': 'classic', // 不會用到
    };
    return foodData.filter(item => item.category === categoryMap[foodFilter]);
  };

  // 篩選伴手禮
  const getFilteredSouvenirs = (): SouvenirItem[] => {
    if (souvenirFilter === '推薦') {
      return souvenirData.filter(item => !item.isRecommended);
    }
    if (souvenirFilter === '全部') {
      return souvenirData;
    }
    const categoryMap: Record<SouvenirCategory, SouvenirItem['category']> = {
      '設計品': 'design',
      '食品': 'food',
      '工藝品': 'craft',
      '服飾': 'clothing',
      '酒類': 'alcohol',
      '推薦': 'design', // 不會用到
      '全部': 'design', // 不會用到
    };
    return souvenirData.filter(item => item.category === categoryMap[souvenirFilter]);
  };

  // 美食卡片（Pinterest 風格）
  const renderFoodCard = (item: FoodItem) => {
    const comments = loadComments(item.id);
    const avgRating = getAverageRating(item.id, true);
    const isExpanded = expandedReviews.has(item.id);

    return (
      <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        <ImageWithFallback
          src={foodImages[item.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
          alt={item.name}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ height: 'auto', aspectRatio: '4/3' }}
        />
        
        <div className="p-5">
          {renderTags(item.tags)}

          <h3 className="text-2xl font-serif mb-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-1">{item.nameZh}</p>
          <span className="text-xs text-[#003580] font-sans tracking-widest uppercase block mb-3">{item.subtitle}</span>
          
          <p className="text-sm font-serif text-gray-700 leading-relaxed mb-4">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="display-rating cursor-pointer" onClick={() => openViewingModal(item.id, item.nameZh)}>
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(avgRating),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal(item.id, item.nameZh)}
              className="bg-[#003580] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#002a66] transition"
            >
              評分
            </button>
          </div>

          {comments.length > 0 && (
            <div className="text-xs text-gray-400 mt-2">
              {comments.length} 則評論
            </div>
          )}

          {/* 評論展開區 */}
          {comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => toggleReviews(item.id)}
                className="text-sm text-[#003580] hover:underline flex items-center gap-2"
              >
                {isExpanded ? '▼' : '▶'} 查看評論
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs"
                          dangerouslySetInnerHTML={{
                            __html: renderStars(comment.rating),
                          }}
                        />
                        <span className="text-xs text-gray-400">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      {comment.text ? (
                        <p className="text-sm text-gray-700 font-serif">
                          "{comment.text}"
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          (未留評論)
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        — {comment.author}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 伴手禮卡片（統一 Pinterest 風格）
  const renderSouvenirCard = (item: SouvenirItem) => {
    const comments = loadComments(item.id);
    const avgRating = getAverageRating(item.id, true);
    const isExpanded = expandedReviews.has(item.id);

    return (
      <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        <ImageWithFallback
          src={souvenirImages[item.id] || 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800'}
          alt={item.name}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ height: 'auto', aspectRatio: '4/3' }}
        />
        
        <div className="p-5">
          {renderTags(item.tags)}

          <h4 className="text-xl font-serif mb-1">
            {item.name}
          </h4>
          <p className="text-sm text-gray-500 mb-1">{item.nameZh}</p>
          <span className="text-xs text-[#003580] font-sans tracking-widest uppercase block mb-3">{item.subtitle}</span>
          
          <p className="text-sm font-serif text-gray-700 leading-relaxed mb-4">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="display-rating cursor-pointer text-sm" onClick={() => openViewingModal(item.id, item.nameZh)}>
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(avgRating),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal(item.id, item.nameZh)}
              className="bg-[#003580] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#002a66] transition"
            >
              評分
            </button>
          </div>

          {comments.length > 0 && (
            <div className="text-xs text-gray-400 mt-2">
              {comments.length} 則評論
            </div>
          )}

          {/* 評論展開區 */}
          {comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => toggleReviews(item.id)}
                className="text-sm text-[#003580] hover:underline flex items-center gap-2"
              >
                {isExpanded ? '▼' : '▶'} 查看評論
              </button>

              {isExpanded && (
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs"
                          dangerouslySetInnerHTML={{
                            __html: renderStars(comment.rating),
                          }}
                        />
                        <span className="text-xs text-gray-400">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      {comment.text ? (
                        <p className="text-sm text-gray-700 font-serif">
                          "{comment.text}"
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          (未留評論)
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        — {comment.author}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const foodCategories: FoodCategory[] = ['推薦', '全部', '極地特色', '芬蘭經典', '塔林美食', '甜點', '飲品', '零食'];
  const souvenirCategories: SouvenirCategory[] = ['推薦', '全部', '設計品', '食品', '工藝品', '服飾', '酒類'];

  const filteredFood = getFilteredFood();
  const filteredSouvenirs = getFilteredSouvenirs();
  const recommendedSouvenirs = souvenirData.filter(item => item.isRecommended);

  return (
    <section id="food" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 border-t border-gray-100 relative z-10">
      {/* 美食體驗區 */}
      <h2 className="text-6xl font-serif text-center italic text-[#111] mb-8">
        Food Experience
        <span className="dual-title-zh text-lg uppercase text-gray-600">美食體驗</span>
      </h2>

      {/* 美食篩選器 */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {foodCategories.map(category => (
          <button
            key={category}
            onClick={() => setFoodFilter(category)}
            className={`px-4 py-2 rounded-lg text-sm font-sans transition ${
              foodFilter === category
                ? 'bg-[#003580] text-white'
                : 'bg-white text-[#003580] border border-[#003580] hover:bg-[#003580] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 美食卡片 - Pinterest 瀑布流 */}
      <ResponsiveMasonry columnsCountBreakpoints={{350: 1, 768: 2, 1024: 3}}>
        <Masonry gutter="24px">
          {filteredFood.map(item => renderFoodCard(item))}
        </Masonry>
      </ResponsiveMasonry>

      {/* 伴手禮與購物區 */}
      <div className="mt-32 pt-10 border-t-4 border-[#d4af37]">
        <h2 className="text-6xl font-serif text-center italic text-[#111] mb-8">
          Souvenirs & Shopping
          <span className="dual-title-zh text-lg uppercase text-gray-600">伴手禮與購物</span>
        </h2>

        {/* 伴手禮篩選器 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {souvenirCategories.map(category => (
            <button
              key={category}
              onClick={() => setSouvenirFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-sans transition ${
                souvenirFilter === category
                  ? 'bg-[#003580] text-white'
                  : 'bg-white text-[#003580] border border-[#003580] hover:bg-[#003580] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 伴手禮卡片 - Pinterest 瀑布流 */}
        <ResponsiveMasonry columnsCountBreakpoints={{350: 1, 768: 2, 1024: 4}}>
          <Masonry gutter="20px">
            {filteredSouvenirs.map(item => renderSouvenirCard(item))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Löyly Sauna 設計亮點 */}
      <div className="mt-32 pt-10 border-t-4 border-[#d4af37] grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative h-96">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1757940809566-70aaf9501138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBzYXVuYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjM3MTk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Löyly Sauna"
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[#d4af37] font-sans text-sm tracking-widest block mb-2">
            設計亮點
          </span>
          <h3 className="text-5xl font-serif mb-6">
            Löyly Sauna <span className="dual-title-zh text-lg">羅伊利桑拿</span>
          </h3>
          <p className="font-serif text-lg text-gray-700 leading-relaxed drop-cap">
            <span className="drop-cap">我</span>
            們造訪了這座擁有現代木造建築的公共桑拿。Löyly
            不僅是個蒸氣浴場所，它代表了芬蘭現代設計美學與傳統桑拿文化的完美融合。
          </p>
          <div className="mt-8 border-t pt-4">
            <h4 className="text-lg font-bold font-sans mb-3 text-[#003580]">旅伴回憶</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-sans mr-2">設計評分:</span>
                <span
                  className="display-rating"
                  onClick={() => openViewingModal('loeyly-sauna', '羅伊利桑拿')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderStars(getAverageRating('loeyly-sauna', true)),
                    }}
                  />
                </span>
              </div>
              <button
                onClick={() => openRatingModal('loeyly-sauna', '羅伊利桑拿')}
                className="bg-[#003580] text-white text-xs font-sans px-4 py-2 rounded hover:bg-[#003580]/90 transition"
              >
                留下評分
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;