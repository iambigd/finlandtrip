import { ImageWithFallback } from './figma/ImageWithFallback';

interface CitySectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
}

const CitySection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
}: CitySectionProps) => {
  return (
    <section id="city" className="py-24 bg-white max-w-7xl mx-auto px-6 relative z-10">
      <h2 className="text-6xl font-serif italic text-[#111] mb-16 border-b border-gray-200 pb-4">
        Helsinki & Surroundings
        <span className="dual-title-zh text-lg uppercase text-gray-600">赫爾辛基與周邊城市</span>
      </h2>

      {/* Helsinki Cathedral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 pt-10 border-t border-gray-100">
        <div className="relative overflow-hidden h-[450px]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1651608979499-94f24adacdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMGNhdGhlZHJhbCUyMHdpbnRlcnxlbnwxfHx8fDE3NjM3MTkzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Helsinki Cathedral"
            className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <span className="text-[#003580] font-sans text-xs tracking-widest block mb-2">
            12月19日 • 市中心
          </span>
          <h3 className="text-4xl font-serif leading-tight mb-4">
            Helsinki Cathedral{' '}
            <span className="dual-title-zh text-base">赫爾辛基大教堂與市集</span>
          </h3>
          <p className="font-serif text-lg text-gray-700 leading-relaxed drop-cap">
            <span className="drop-cap">從</span>
            火車站出發，直奔赫爾辛基最著名的地標——白色大教堂。十二月時，元老院廣場上充滿了聖誕市集，空氣中瀰漫著熱紅酒
            (Glögi) 的香氣，是體驗芬蘭節慶氣氛的最佳選擇。
          </p>
          <p className="text-sm font-sans mt-4">
            周邊景點: 艾斯普拉納蒂公園、港口市集廣場、運動用品店。
          </p>
          <div className="mt-8 border-t pt-4">
            <h4 className="text-lg font-bold font-sans mb-3 text-[#003580]">旅伴回憶</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-sans mr-2">推薦評分:</span>
                <span
                  className="display-rating"
                  onClick={() => openViewingModal('helsinki-cathedral', '赫爾辛基大教堂')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderStars(getAverageRating('helsinki-cathedral', true)),
                    }}
                  />
                </span>
              </div>
              <button
                onClick={() => openRatingModal('helsinki-cathedral', '赫爾辛基大教堂')}
                className="bg-[#003580] text-white text-xs font-sans px-4 py-2 rounded hover:bg-[#003580]/90 transition"
              >
                留下評分
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rock Church */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 pt-10 border-t border-gray-100">
        <div className="relative overflow-hidden h-[550px] md:h-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1713149019799-477ac308920f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wcGVsaWF1a2lvJTIwY2h1cmNoJTIwaGVsc2lua2l8ZW58MXx8fHwxNzYzNzE5MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Temppeliaukio Church"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <span className="text-[#d4af37] font-sans text-sm tracking-widest block mb-2">
            特別推薦 • 12月26日
          </span>
          <h3 className="text-6xl font-serif leading-tight mb-6">
            Temppeliaukio Church <span className="dual-title-zh text-xl">岩石教堂</span>
          </h3>
          <p className="font-serif text-lg text-gray-700 leading-relaxed drop-cap">
            <span className="drop-cap">我</span>
            們參觀了這座不可思議的建築——一座直接在巨大岩石中鑿出的教堂。銅製圓頂與自然光的結合，創造出寧靜而又極具現代感的震撼美學。
          </p>
          <ul className="text-xs font-sans space-y-1 mt-4 text-gray-500">
            <li>📍 交通方式: 搭乘電車 2/3 號或公車 14/18 號。</li>
          </ul>
          <div className="mt-8 border-t pt-4">
            <h4 className="text-lg font-bold font-sans mb-3 text-[#003580]">旅伴回憶</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-sans mr-2">推薦評分:</span>
                <span
                  className="display-rating"
                  onClick={() => openViewingModal('rock-church', '岩石教堂')}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderStars(getAverageRating('rock-church', true)),
                    }}
                  />
                </span>
              </div>
              <button
                onClick={() => openRatingModal('rock-church', '岩石教堂')}
                className="bg-[#003580] text-white text-xs font-sans px-4 py-2 rounded hover:bg-[#003580]/90 transition"
              >
                留下評分
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Day Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 pt-10 border-t border-gray-100">
        <div>
          <span className="text-[#003580] font-sans text-xs tracking-widest block mb-1">
            12月27日 • 塔林一日遊
          </span>
          <h4 className="text-4xl font-serif mb-4">
            Across the Gulf of Finland <span className="dual-title-zh text-base">跨越芬蘭灣</span>
          </h4>
          <p className="font-serif text-lg text-gray-700 mb-6">
            搭乘 Eckerö Line 郵輪橫越芬蘭灣前往愛沙尼亞的塔林。中世紀的城牆、聖奧拉夫教堂，以及童話般的舊城區，讓這趟一日遊充滿古老的歐洲魅力。
          </p>
          <div className="flex items-center space-x-4 border-t pt-4">
            <span
              className="display-rating"
              onClick={() => openViewingModal('tallinn-daytrip', '塔林一日遊')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(getAverageRating('tallinn-daytrip', true)),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal('tallinn-daytrip', '塔林一日遊')}
              className="bg-[#003580] text-white text-xs px-3 py-1 rounded transition"
            >
              留下評分
            </button>
          </div>
        </div>
        <div>
          <span className="text-[#003580] font-sans text-xs tracking-widest block mb-1">
            12月28日 • 波爾沃
          </span>
          <h4 className="text-4xl font-serif mb-4">
            Porvoo Old Town <span className="dual-title-zh text-base">芬蘭最古老的城鎮</span>
          </h4>
          <p className="font-serif text-lg text-gray-700 mb-6">
            芬蘭第二古老的城鎮，以河岸旁的紅色木造倉庫聞名。搭乘巴士前往，感受與赫爾辛基截然不同的古樸寧靜氛圍。
          </p>
          <div className="flex items-center space-x-4 border-t pt-4">
            <span
              className="display-rating"
              onClick={() => openViewingModal('porvoo-daytrip', '波爾沃一日遊')}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStars(getAverageRating('porvoo-daytrip', true)),
                }}
              />
            </span>
            <button
              onClick={() => openRatingModal('porvoo-daytrip', '波爾沃一日遊')}
              className="bg-[#003580] text-white text-xs px-3 py-1 rounded transition"
            >
              留下評分
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySection;
