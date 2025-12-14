import { ImageWithFallback } from './figma/ImageWithFallback';

interface SaunaSectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => number;
  renderStars: (rating: number) => string;
}

const SaunaSection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
}: SaunaSectionProps) => {
  return (
    <section id="sauna" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 border-t border-gray-100 relative z-10">
      {/* Löyly Sauna 設計亮點 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

export default SaunaSection;