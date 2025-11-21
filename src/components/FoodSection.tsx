import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodSectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
}

const FoodSection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
}: FoodSectionProps) => {
  return (
    <section id="food" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 border-t border-gray-100 relative z-10">
      <h2 className="text-6xl font-serif text-center italic text-[#111] mb-16">
        Food, Experience & Souvenirs
        <span className="dual-title-zh text-lg uppercase text-gray-600">美食、體驗與伴手禮</span>
      </h2>

      {/* Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Salmon Soup */}
        <div className="bg-white p-6 shadow-md border-t-4 border-[#d4af37]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1675870793073-70306dbc541f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBzb3VwJTIwZmlubmlzaHxlbnwxfHx8fDE3NjM3MTk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Salmon Soup"
            className="w-full h-40 object-cover"
          />
          <h3 className="text-2xl font-serif font-bold mt-4 mb-1">
            Salmon Soup <span className="dual-title-zh text-xs text-gray-500">鮭魚湯 (Lohikeitto)</span>
          </h3>
          <span className="text-xs text-gray-500 font-sans tracking-widest">奶油鮭魚濃湯</span>
          <p className="text-sm font-serif italic mt-3 text-gray-700">
            北歐冬季的靈魂食物。濃郁的奶油湯底配上新鮮鮭魚塊和蒔蘿，是暖身的極致之選。
          </p>
          <div className="flex items-center space-x-4 mt-4 pt-3">
            <span className="display-rating" onClick={() => openViewingModal('lohikeitto', '鮭魚湯')}>
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(getAverageRating('lohikeitto', true)),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal('lohikeitto', '鮭魚湯')}
              className="bg-[#003580] text-white text-xs px-3 py-1 rounded transition"
            >
              留下評分
            </button>
          </div>
        </div>

        {/* Cinnamon Bun */}
        <div className="bg-white p-6 shadow-md border-t-4 border-[#d4af37]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1694632288834-17d86b340745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5uYW1vbiUyMGJ1biUyMHBhc3RyeXxlbnwxfHx8fDE3NjM3MTk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cinnamon Bun"
            className="w-full h-40 object-cover"
          />
          <h3 className="text-2xl font-serif font-bold mt-4 mb-1">
            Cinnamon Bun{' '}
            <span className="dual-title-zh text-xs text-gray-500">肉桂捲 (Korvapuusti)</span>
          </h3>
          <span className="text-xs text-gray-500 font-sans tracking-widest">芬蘭肉桂捲</span>
          <p className="text-sm font-serif italic mt-3 text-gray-700">
            芬蘭式的肉桂捲，形狀像「被拍扁的耳朵」。肉桂和荳蔻的香氣撲鼻，配一杯熱 Glögi 完美。
          </p>
          <div className="flex items-center space-x-4 mt-4 pt-3">
            <span
              className="display-rating"
              onClick={() => openViewingModal('korvapuusti', '肉桂捲')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(getAverageRating('korvapuusti', true)),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal('korvapuusti', '肉桂捲')}
              className="bg-[#003580] text-white text-xs px-3 py-1 rounded transition"
            >
              留下評分
            </button>
          </div>
        </div>

        {/* Reindeer */}
        <div className="bg-white p-6 shadow-md border-t-4 border-[#d4af37]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1668887465493-c4b0351aea89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWluZGVlciUyMG1lYXQlMjBkaXNofGVufDF8fHx8MTc2MzcxOTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Reindeer"
            className="w-full h-40 object-cover"
          />
          <h3 className="text-2xl font-serif font-bold mt-4 mb-1">
            Sautéed Reindeer{' '}
            <span className="dual-title-zh text-xs text-gray-500">乾炒馴鹿肉 (Poronkäristys)</span>
          </h3>
          <span className="text-xs text-gray-500 font-sans tracking-widest">拉普蘭特色菜</span>
          <p className="text-sm font-serif italic mt-3 text-gray-700">
            在拉普蘭必嚐的野味菜餚。薄片馴鹿肉清炒，搭配越橘醬 (Lingonberry) 和馬鈴薯泥。
          </p>
          <div className="flex items-center space-x-4 mt-4 pt-3">
            <span
              className="display-rating"
              onClick={() => openViewingModal('poronkaristys', '乾炒馴鹿肉')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(getAverageRating('poronkaristys', true)),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal('poronkaristys', '乾炒馴鹿肉')}
              className="bg-[#003580] text-white text-xs px-3 py-1 rounded transition"
            >
              留下評分
            </button>
          </div>
        </div>
      </div>

      {/* Löyly Sauna */}
      <div className="mt-20 pt-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-10">
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

      {/* Souvenirs Guide */}
      <div className="mt-20 pt-10 border-t border-gray-200">
        <h3 className="text-4xl font-serif italic text-[#d4af37] mb-8">
          Souvenirs & Shopping Guide{' '}
          <span className="dual-title-zh text-base text-gray-700">伴手禮與購物指南</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 border-r pr-6 border-gray-200">
            <span className="text-[#003580] font-sans text-xs tracking-widest block mb-2">
              巧克力與糖果
            </span>
            <h4 className="text-2xl font-serif font-bold mb-3">
              Fazer Chocolate <span className="dual-title-zh text-xs text-gray-500">Fazer 巧克力</span>
            </h4>
            <p className="text-sm font-serif text-gray-700">
              芬蘭國民巧克力，絕對是必買伴手禮。推薦在赫爾辛基市中心的 Fazer Café 旗艦店購買。
            </p>
          </div>
          <div className="md:col-span-1 border-r pr-6 border-gray-200">
            <span className="text-[#003580] font-sans text-xs tracking-widest block mb-2">
              設計與家飾
            </span>
            <h4 className="text-2xl font-serif font-bold mb-3">
              Moomin / Marimekko{' '}
              <span className="dual-title-zh text-xs text-gray-500">姆明與瑪莉美歌</span>
            </h4>
            <p className="text-sm font-serif text-gray-700">
              姆明馬克杯和襪子是送禮的首選；Marimekko 的花紋織品在 Outlet 能找到很棒的價格。
            </p>
          </div>
          <div className="md:col-span-1">
            <span className="text-[#003580] font-sans text-xs tracking-widest block mb-2">
              保健與當地特產
            </span>
            <h4 className="text-2xl font-serif font-bold mb-3">
              Arctic Berries / Iittala{' '}
              <span className="dual-title-zh text-xs text-gray-500">北極莓果與 Iittala</span>
            </h4>
            <p className="text-sm font-serif text-gray-700">
              北極莓果醬、魚油保健品，以及 Iittala 的設計玻璃製品都是值得帶回家的芬蘭特產。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;
