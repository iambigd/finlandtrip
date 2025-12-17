import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';

interface ArcticSectionProps {
  openRatingModal: (id: string, name: string) => void;
  openViewingModal: (id: string, name: string) => void;
  getAverageRating: (poiId: string, round: boolean) => Promise<string>;
  renderStars: (rating: number) => string;
}

const ArcticSection = ({
  openRatingModal,
  openViewingModal,
  getAverageRating,
  renderStars,
}: ArcticSectionProps) => {
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [slidesToShow, setSlidesToShow] = useState(3);

  // 動態偵測螢幕寬度
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1280) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // 初始設定
    handleResize();

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: slidesToShow > 1,
    centerMode: false,
    variableWidth: false,
  };

  // Arctic activities data
  const arcticActivities = [
    {
      id: 'ice-karting',
      title: 'Ice Karting',
      titleZh: '冰上卡丁車',
      description: '體驗在結冰的湖面上高速漂移的極限運動！',
      image: 'https://images.unsplash.com/photo-1651467538765-bb1367c6a8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBrYXJ0aW5nJTIwc25vdyUyMHRyYWNrfGVufDF8fHx8MTc2NTM3NzkwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'husky-sledding',
      title: 'Husky Sledding',
      titleZh: '哈士奇雪橇',
      description: '坐上哈士奇雪橇，感受在雪地森林中奔馳的快感。',
      image: 'https://images.unsplash.com/photo-1672085270147-14cb8c790df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMHNsZWRkaW5nJTIwd2ludGVyfGVufDF8fHx8MTY2MzcxOTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'horse-riding',
      title: 'Horse Riding',
      titleZh: '雪地騎馬',
      description: '在白雪覆蓋的森林中騎馬漫步，享受寧靜的北歐風光。',
      image: 'https://images.unsplash.com/photo-1737995719884-6005421a419d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJpZGluZyUyMHNub3clMjB3aW50ZXIlMjBmaW5sYW5kfGVufDF8fHx8MTc2NTM3ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'aurora-hunting',
      title: 'Levi Nordic Odyssey',
      titleZh: '極光獵人',
      description: '跟隨專業嚮導深入荒野，追尋北極光的蹤跡。極光下的雪地漫步，是一生難忘的體驗。',
      image: 'https://images.unsplash.com/photo-1666003400042-a9e68d6bff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYSUyMGJvcmVhbGlzfGVufDF8fHx8MTc2MzcxOTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Load all ratings when component mounts
  useEffect(() => {
    const loadRatings = async () => {
      const ids = ['rovaniemi-village', ...arcticActivities.map(a => a.id)];
      const ratingsData: Record<string, string> = {};
      
      await Promise.all(
        ids.map(async (id) => {
          const rating = await getAverageRating(id, true);
          ratingsData[id] = rating;
        })
      );
      
      setRatings(ratingsData);
    };
    
    loadRatings();
  }, [getAverageRating]);

  return (
    <section id="arctic" className="py-24 bg-[#1a202c] text-[#fdfbf7] relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-serif text-white mb-2 drop-shadow-lg leading-tight">
            <span className="aurora-glow">Arctic Circle</span>
            <span className="dual-title-zh text-xl text-gray-400 block tracking-widest">
              進入北極圈
            </span>
          </h2>
          <p className="font-sans text-sm tracking-widest text-gray-400 mt-2">
            VR 臥鋪火車 • 羅瓦涅米 • 列維
          </p>
        </div>

        <div className="text-center py-12 border-y border-white/20 mb-16">
          <span className="text-[#d4af37] font-sans text-xs tracking-[0.4em] block mb-4">
            12月20日 • 交通日
          </span>
          <h3 className="text-4xl font-serif text-white mb-6">聖誕老人臥鋪火車</h3>
        </div>

        {/* Santa Claus Village */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="order-2 md:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1553966528-237ab71fb292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWluZGVlciUyMGxhcGxhbmQlMjBmaW5sYW5kfGVufDF8fHx8MTc2MzcxOTQwNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Reindeer"
              className="w-full h-auto object-cover opacity-80"
            />
            <div className="text-xs font-sans mt-2 text-gray-500 flex justify-between">
              <span>北緯 66° 33′ 45.9″</span>
              <span>北極圈線</span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center">
            <span className="text-white font-sans text-xs tracking-widest block mb-2">
              12月21日 • 羅瓦涅米
            </span>
            <h3 className="text-5xl font-serif mb-6 text-white">
              Santa Claus Village{' '}
              <span className="dual-title-zh text-lg text-gray-400">北極圈首都</span>
            </h3>
            <p className="font-serif text-lg text-gray-300 leading-relaxed">
              抵達聖誕老人的故鄉。在聖誕老人村跨越北極圈線，並在郵局寄出蓋有特別郵戳的明信片。這是夢幻與現實交會之地。
            </p>
            <p className="text-sm font-sans text-[#d4af37] mt-4">
              必訪: 聖誕老人辦公室、Santa's Salmon Place 煙燻鮭魚餐廳。
            </p>
            <div className="flex items-center space-x-4 mt-4 border-t border-white/10 pt-4">
              <span
                className="display-rating-arctic"
                onClick={() => openViewingModal('rovaniemi-village', '聖誕老人村')}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderStars(parseFloat(ratings['rovaniemi-village'] || '0')),
                  }}
                />
              </span>
              <button
                onClick={() => openRatingModal('rovaniemi-village', '聖誕老人村')}
                className="bg-[#d4af37] text-[#111] text-xs px-3 py-1 rounded transition"
              >
                留下評分
              </button>
            </div>
          </div>
        </div>

        {/* Arctic Activities */}
        <div className="py-10 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="text-[#d4af37] font-sans text-xs tracking-widest block mb-2">
              12月22-24日 • 列維
            </span>
            <h4 className="text-3xl font-serif text-white">
              Extreme Arctic Activities{' '}
              <span className="dual-title-zh text-sm text-gray-400">極地極限活動</span>
            </h4>
            <p className="text-gray-500 text-sm mt-2">速度、毛皮與極光追逐。</p>
          </div>
          
          <div className="max-w-6xl mx-auto px-0 md:px-16">
            <Slider {...sliderSettings}>
              {arcticActivities.map((activity) => (
                <div key={activity.id} className="px-3 md:px-2">
                  <div className="bg-white/10 p-4 md:p-6">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 object-cover opacity-80 rounded mb-4"
                    />
                    <h5 className="text-xl font-serif italic text-[#d4af37] mb-2">
                      {activity.title}{' '}
                      <span className="dual-title-zh text-xs text-gray-400">{activity.titleZh}</span>
                    </h5>
                    <p className="text-sm text-gray-300 mb-4">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 border-t border-white/20 pt-3">
                      <span
                        className="display-rating-arctic cursor-pointer"
                        onClick={() => openViewingModal(activity.id, activity.titleZh)}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: renderStars(parseFloat(ratings[activity.id] || '0')),
                          }}
                        />
                      </span>
                      <button
                        onClick={() => openRatingModal(activity.id, activity.titleZh)}
                        className="bg-[#d4af37] text-[#111] text-xs px-3 py-1 rounded transition hover:bg-[#c5a028]"
                      >
                        留下評分
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Aurora Banner */}
        <div className="relative h-[300px] md:h-[600px] w-full mt-16 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1666003400042-a9e68d6bff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYSUyMGJvcmVhbGlzfGVufDF8fHx8MTc2MzcxOTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Aurora"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-5xl md:text-8xl font-serif text-white mb-2 md:mb-4 drop-shadow-lg aurora-glow">
                AURORA
                <span className="dual-title-zh text-sm md:text-xl text-gray-400 block tracking-widest mt-1 md:mt-0">
                  北極光
                </span>
              </h3>
              <p className="font-sans text-xs md:text-base tracking-widest uppercase text-white/80">
                追逐極光，永生難忘。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArcticSection;