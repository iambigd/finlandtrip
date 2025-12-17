import { useState } from 'react';
import { CityCard } from './CityCard';
import { CityDrawer } from './CityDrawer';
import { cityData, CityPOI } from '../data/cityData';
import { Comment } from '../App';

interface CitySectionProps {
  loadComments: (poiId: string) => Promise<Comment[]>;
  saveComments: (poiId: string, comments: Comment[]) => void;
  getAverageRating: (poiId: string) => Promise<string>;
  openRatingModal: (poiId: string, poiName: string) => void;
}

export const CitySection: React.FC<CitySectionProps> = ({
  loadComments,
  saveComments,
  getAverageRating,
  openRatingModal,
}) => {
  const [selectedCity, setSelectedCity] = useState<CityPOI['city'] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 城市配置
  const cities: Array<{
    id: CityPOI['city'];
    nameZh: string;
    image: string;
  }> = [
    {
      id: 'helsinki',
      nameZh: '赫爾辛基',
      image: 'https://images.unsplash.com/photo-1651608979499-94f24adacdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMGNhdGhlZHJhbCUyMHdpbnRlcnxlbnwxfHx8fDE3NjUzNDU4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'tallinn',
      nameZh: '塔林',
      image: 'https://images.unsplash.com/photo-1551086054-1bc97d3466ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWxsaW5uJTIwb2xkJTIwdG93bnxlbnwxfHx8fDE3NjUzNDU4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'porvoo',
      nameZh: '波爾沃',
      image: 'https://images.unsplash.com/photo-1611706537648-754e851083b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J2b28lMjBjb2xvcmZ1bCUyMGhvdXNlc3xlbnwxfHx8fDE3NjUzODU1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'suomenlinna',
      nameZh: '芬蘭堡',
      image: 'https://images.unsplash.com/photo-1688105168409-6f7bfa1d2cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW9tZW5saW5uYSUyMGZvcnRyZXNzfGVufDF8fHx8MTc2NTM4NTU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  // 获取每个城市的 POI
  const getCityPOIs = (cityId: CityPOI['city']) => {
    return cityData.filter((poi) => poi.city === cityId);
  };

  // 获取每个城市的亮点 POI（必访标签）
  const getHighlightPOIs = (cityId: CityPOI['city']) => {
    return cityData
      .filter((poi) => poi.city === cityId && poi.tags.includes('必訪'))
      .slice(0, 5);
  };

  // 打开抽屉
  const handleCityClick = (cityId: CityPOI['city']) => {
    setSelectedCity(cityId);
    setIsDrawerOpen(true);
  };

  // 关闭抽屉
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedCity(null), 300);
  };

  return (
    <section id="city" className="py-24 bg-[#fdfbf7] relative overflow-hidden">
      {/* 裝飾性背景元素 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 标题 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-[#003580] italic mb-4">
            City Explorer
            <span className="dual-title-zh text-sm uppercase text-gray-500">城市探索</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            四座獨特的城市，每一處都有屬於自己的故事。從現代設計之都赫爾辛基，到中世紀童話小鎮塔林，
            探索北歐的多元魅力。
          </p>
        </div>

        {/* 城市卡片 - 幾何拼貼排版 */}
        <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
          {cities.map((city, index) => {
            const pois = getCityPOIs(city.id);
            const highlights = getHighlightPOIs(city.id);
            
            // 幾何拼貼佈局配置
            const layouts = [
              'col-span-12 md:col-span-7 row-span-2',  // 赫爾辛基 - 大
              'col-span-12 md:col-span-5 row-span-2',  // 塔林 - 中
              'col-span-12 md:col-span-6 row-span-2',  // 波爾沃 - 中
              'col-span-12 md:col-span-6 row-span-2',  // 芬蘭堡 - 中
            ];
            
            return (
              <div key={city.id} className={layouts[index]}>
                <CityCard
                  city={city.id}
                  cityZh={city.nameZh}
                  image={city.image}
                  poiCount={pois.length}
                  highlightPOIs={highlights}
                  onClick={() => handleCityClick(city.id)}
                />
              </div>
            );
          })}
        </div>

        {/* 提示文字 */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <span>💡</span>
            <span>點擊城市卡片查看該城市所有景點與詳細資訊</span>
          </p>
        </div>
      </div>

      {/* 城市抽屉 */}
      {selectedCity && (
        <CityDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          cityName={cities.find((c) => c.id === selectedCity)?.id || ''}
          cityNameZh={cities.find((c) => c.id === selectedCity)?.nameZh || ''}
          pois={getCityPOIs(selectedCity)}
          loadComments={loadComments}
          saveComments={saveComments}
          getAverageRating={getAverageRating}
          onRatingClick={openRatingModal}
        />
      )}
    </section>
  );
};

export default CitySection;