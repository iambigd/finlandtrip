import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { CityFilterType } from '../App';
import { WeatherCarousel } from './WeatherCarousel';

gsap.registerPlugin(MotionPathPlugin);

interface MapSectionProps {
  activeMapLocation: string;
  setActiveMapLocation: (location: string) => void;
  setSelectedCityFilter: (city: CityFilterType) => void;
}

interface CityBlock {
  id: string;
  name: string;
  nameEn: string;
  days: string;
  colorClass: string;
  description: string;
  linkTo: string;
}

const cityBlocks: CityBlock[] = [
  {
    id: 'helsinki',
    name: '赫爾辛基',
    nameEn: 'Helsinki',
    days: 'Day 1-3, 12, 15',
    colorClass: 'border-l-4 border-blue-400',
    description: '首都市區探索、聖誕市集、設計博物館、大教堂',
    linkTo: '#city'
  },
  {
    id: 'rovaniemi',
    name: '羅瓦涅米',
    nameEn: 'Rovaniemi',
    days: 'Day 4-7',
    colorClass: 'border-l-4 border-cyan-400',
    description: '聖誕老人村、跨越北極圈、極光追逐',
    linkTo: '#arctic'
  },
  {
    id: 'levi',
    name: '列維',
    nameEn: 'Levi',
    days: 'Day 8-9',
    colorClass: 'border-l-4 border-teal-400',
    description: '哈士奇雪橇、滑雪度假村、極地體驗',
    linkTo: '#arctic'
  },
  {
    id: 'tallinn',
    name: '塔林',
    nameEn: 'Tallinn',
    days: 'Day 10-11',
    colorClass: 'border-l-4 border-amber-400',
    description: '跨國探索、中世紀舊城與愛沙尼亞文化',
    linkTo: '#city'
  },
  {
    id: 'porvoo',
    name: '波爾沃',
    nameEn: 'Porvoo',
    days: 'Day 13 | 一日遊',
    colorClass: 'border-l-4 border-rose-400',
    description: '彩色木屋小鎮、芬蘭第二古老城市',
    linkTo: '#city'
  },
  {
    id: 'suomenlinna',
    name: '芬蘭堡',
    nameEn: 'Suomenlinna',
    days: 'Day 14 | 一日遊',
    colorClass: 'border-l-4 border-indigo-400',
    description: '海上堡壘、UNESCO 世界遺產',
    linkTo: '#city'
  }
];

const MapSection = ({ activeMapLocation, setActiveMapLocation, setSelectedCityFilter }: MapSectionProps) => {
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAutoPlayedRef = useRef(false);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    // 創建完整 15 天旅程的主時間軸
    const createMasterTimeline = () => {
      const tl = gsap.timeline({ 
        paused: true,
        repeat: 2,  // 總共播放 3 次
        repeatDelay: 3,  // 每次循環間隔 3 秒
        onComplete: () => {
          // 動畫結束後顯示完整路線痕跡
          gsap.to('.route-path', { 
            opacity: 0.4, 
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      });

      // Day 1-3: 赫爾辛基（起點，無動畫）
      
      // Day 4: 赫爾辛基 → 羅瓦涅米（火車）
      tl.to('#train-icon', {
        duration: 2,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#train-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-hel-rov',
          align: '#path-hel-rov',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.5');

      // Day 5-7: 羅瓦涅米停留
      tl.to('#train-icon', { opacity: 0, duration: 0.3 }, '+=0.3');

      // Day 8: 羅瓦涅米 → 列維（巴士）
      tl.to('#bus-icon', {
        duration: 1.5,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#bus-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-rov-lev',
          align: '#path-rov-lev',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      // Day 9: 列維 → 羅瓦涅米（巴士返回）
      tl.to('#bus-icon', {
        duration: 1.5,
        ease: 'power1.inOut',
        motionPath: {
          path: '#path-lev-rov',
          align: '#path-lev-rov',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      tl.to('#bus-icon', { opacity: 0, duration: 0.3 }, '+=0.3');

      // Day 10: 羅瓦涅米 → 赫爾辛基 → 塔林（郵輪跨國）
      // 先回赫爾辛基（火車）
      tl.to('#train-icon', {
        duration: 2,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#train-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-rov-hel',
          align: '#path-rov-hel',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      tl.to('#train-icon', { opacity: 0, duration: 0.3 }, '+=0.2');

      // 赫爾辛基 → 塔林（郵輪）
      tl.to('#ferry-icon', {
        duration: 2.5,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#ferry-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-hel-tal',
          align: '#path-hel-tal',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      // Day 11: 塔林 → 赫爾辛基（郵輪返回）
      tl.to('#ferry-icon', {
        duration: 2.5,
        ease: 'power1.inOut',
        motionPath: {
          path: '#path-tal-hel',
          align: '#path-tal-hel',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.5');

      tl.to('#ferry-icon', { opacity: 0, duration: 0.3 }, '+=0.3');

      // Day 12: 赫爾辛基 → 波爾沃（巴士）
      tl.to('#bus-icon', {
        duration: 1.2,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#bus-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-hel-por',
          align: '#path-hel-por',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      // Day 13: 波爾沃 → 赫爾辛基（巴士返回）
      tl.to('#bus-icon', {
        duration: 1.2,
        ease: 'power1.inOut',
        motionPath: {
          path: '#path-por-hel',
          align: '#path-por-hel',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      tl.to('#bus-icon', { opacity: 0, duration: 0.3 }, '+=0.2');

      // Day 14: 赫爾辛基 → 芬蘭堡 → 赫爾辛基（渡輪往返）
      tl.to('#boat-icon', {
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => gsap.set('#boat-icon', { opacity: 1 }),
        motionPath: {
          path: '#path-hel-suo',
          align: '#path-hel-suo',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      tl.to('#boat-icon', {
        duration: 1,
        ease: 'power1.inOut',
        motionPath: {
          path: '#path-suo-hel',
          align: '#path-suo-hel',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      }, '+=0.3');

      tl.to('#boat-icon', { opacity: 0, duration: 0.3 }, '+=0.3');

      // Day 15: 返程

      return tl;
    };

    masterTimelineRef.current = createMasterTimeline();

    // 首次自動播放（頁面載入 2 秒後）
    if (!hasAutoPlayedRef.current) {
      const autoPlayTimeout = setTimeout(() => {
        masterTimelineRef.current?.play();
        hasAutoPlayedRef.current = true;
      }, 2000);

      return () => clearTimeout(autoPlayTimeout);
    }
  }, []);

  const handleCityClick = (cityId: string, linkTo: string) => {
    setSelectedCity(cityId);
    setActiveMapLocation(cityId);
    
    // 城市 ID 映射到 CitySection 的篩選器
    // 羅瓦涅米和列維屬於北極圈體驗，不在城市探索區，所以設為 'all'
    const citySectionFilterMap: Record<string, CityFilterType> = {
      'helsinki': 'helsinki',
      'tallinn': 'tallinn',
      'porvoo': 'porvoo',
      'suomenlinna': 'suomenlinna',
      'rovaniemi': 'all',  // 北極圈城市
      'levi': 'all',       // 北極圈城市
    };
    
    const filterValue = citySectionFilterMap[cityId] || 'all';
    console.log('🏙️ MapSection: 點擊城市', cityId, '→ 設定篩選器為', filterValue);
    setSelectedCityFilter(filterValue);
    
    // 使用 setTimeout 確保狀態更新後再跳轉
    setTimeout(() => {
      window.location.hash = linkTo;
    }, 0);
  };

  return (
    <section id="map" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-[#003580] italic">
          Journey Map
          <span className="dual-title-zh text-sm uppercase text-gray-500">旅程地圖</span>
        </h2>
        <p className="text-sm font-sans text-gray-500 mt-2">
          15 天的極地日誌。探索芬蘭與愛沙尼亞的冬季奇蹟。
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* 左側：天氣輪播系統 */}
        <div className="lg:sticky lg:top-24">
          <div className="bg-slate-900/50 backdrop-blur-md 
            rounded-2xl p-8 shadow-2xl border border-white/10 min-h-[600px]">
            <WeatherCarousel />
          </div>
        </div>

        {/* 右側：地圖 + 動畫 */}
        <div className="sticky top-24">
          <div className="relative bg-white/50 p-8 rounded-lg shadow-xl border border-gray-200">
            {/* 交通工具圖示 */}
            <div id="train-icon" className="travel-icon">
              <i className="fa-solid fa-train text-[#c0392b]"></i>
            </div>
            <div id="bus-icon" className="travel-icon">
              <i className="fa-solid fa-bus text-[#f39c12]"></i>
            </div>
            <div id="ferry-icon" className="travel-icon">
              <i className="fa-solid fa-ship text-[#0077b6]"></i>
            </div>
            <div id="boat-icon" className="travel-icon">
              <i className="fa-solid fa-ferry text-[#48cae4]"></i>
            </div>

            {/* SVG 地圖 */}
            <svg className="w-full h-[700px]" viewBox="0 0 500 900" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 芬蘭輪廓（簡化） */}
              <path
                d="M250 100 L280 150 L300 200 L290 300 L280 400 L260 500 L240 600 L220 650 L200 700 L180 650 L170 600 L160 500 L170 400 L180 300 L200 200 L220 150 Z"
                fill="#e3f2fd"
                stroke="#003580"
                strokeWidth="2"
                opacity="0.3"
              />

              {/* 路線路徑 */}
              {/* 赫爾辛基 → 羅瓦涅米（火車） */}
              <path
                className="route-path"
                id="path-hel-rov"
                d="M230 650 Q 240 500, 260 250"
                stroke="#c0392b"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
              />
              
              {/* 羅瓦涅米 → 赫爾辛基（火車返回） */}
              <path
                className="route-path"
                id="path-rov-hel"
                d="M260 250 Q 240 500, 230 650"
                stroke="#c0392b"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
              />

              {/* 羅瓦涅米 → 列維（巴士） */}
              <path
                className="route-path"
                id="path-rov-lev"
                d="M260 250 L 290 180"
                stroke="#f39c12"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0"
              />

              {/* 列維 → 羅瓦涅米（巴士返回） */}
              <path
                className="route-path"
                id="path-lev-rov"
                d="M290 180 L 260 250"
                stroke="#f39c12"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0"
              />

              {/* 赫爾辛基 → 塔林（郵輪跨國） */}
              <path
                className="route-path"
                id="path-hel-tal"
                d="M230 650 Q 180 700, 150 780"
                stroke="#0077b6"
                strokeWidth="2"
                strokeDasharray="8,4"
                opacity="0"
              />

              {/* 塔林 → 赫爾辛基（郵輪返回） */}
              <path
                className="route-path"
                id="path-tal-hel"
                d="M150 780 Q 180 700, 230 650"
                stroke="#0077b6"
                strokeWidth="2"
                strokeDasharray="8,4"
                opacity="0"
              />

              {/* 赫爾辛基 → 波爾沃（巴士） */}
              <path
                className="route-path"
                id="path-hel-por"
                d="M230 650 L 310 620"
                stroke="#f39c12"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0"
              />

              {/* 波爾沃 → 赫爾辛基（巴士返回） */}
              <path
                className="route-path"
                id="path-por-hel"
                d="M310 620 L 230 650"
                stroke="#f39c12"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0"
              />

              {/* 赫爾辛基 → 芬蘭堡（渡輪） */}
              <path
                className="route-path"
                id="path-hel-suo"
                d="M230 650 L 200 700"
                stroke="#48cae4"
                strokeWidth="2"
                strokeDasharray="4,2"
                opacity="0"
              />

              {/* 芬蘭堡 → 赫爾辛基（渡輪返回） */}
              <path
                className="route-path"
                id="path-suo-hel"
                d="M200 700 L 230 650"
                stroke="#48cae4"
                strokeWidth="2"
                strokeDasharray="4,2"
                opacity="0"
              />

              {/* 城市標記點 */}
              {/* 赫爾辛基 */}
              <g transform="translate(230, 650)">
                <circle r="10" fill="#003580" stroke="white" strokeWidth="2" />
                <text x="20" y="5" fill="#111" fontSize="14" fontWeight="bold">
                  赫爾辛基
                </text>
              </g>

              {/* 羅瓦涅米 */}
              <g transform="translate(260, 250)">
                <circle r="10" fill="#c0392b" stroke="white" strokeWidth="2" />
                <text x="20" y="5" fill="#111" fontSize="14" fontWeight="bold">
                  羅瓦涅米
                </text>
              </g>

              {/* 列維 */}
              <g transform="translate(290, 180)">
                <circle r="8" fill="#f39c12" stroke="white" strokeWidth="2" />
                <text x="20" y="5" fill="#111" fontSize="14" fontWeight="bold">
                  列維
                </text>
              </g>

              {/* 塔林（愛沙尼亞） */}
              <g transform="translate(150, 780)">
                <circle r="8" fill="#f59e0b" stroke="white" strokeWidth="2" />
                <text x="20" y="5" fill="#111" fontSize="12">
                  塔林 (EST)
                </text>
              </g>

              {/* 波爾沃 */}
              <g transform="translate(310, 620)">
                <circle r="7" fill="#ec4899" stroke="white" strokeWidth="2" />
                <text x="20" y="5" fill="#111" fontSize="12">
                  波爾沃
                </text>
              </g>

              {/* 芬蘭堡 */}
              <g transform="translate(200, 700)">
                <circle r="6" fill="#6366f1" stroke="white" strokeWidth="2" />
                <text x="15" y="5" fill="#111" fontSize="11">
                  芬蘭堡
                </text>
              </g>

              {/* 圖例 */}
              <g transform="translate(30, 820)">
                <text x="0" y="0" fill="#666" fontSize="10" fontWeight="bold">
                  交通工具：
                </text>
                <line x1="0" y1="15" x2="30" y2="15" stroke="#c0392b" strokeWidth="2" strokeDasharray="5,5" />
                <text x="35" y="18" fill="#666" fontSize="9">火車</text>
                
                <line x1="70" y1="15" x2="100" y2="15" stroke="#f39c12" strokeWidth="2" strokeDasharray="3,3" />
                <text x="105" y="18" fill="#666" fontSize="9">巴士</text>
                
                <line x1="140" y1="15" x2="170" y2="15" stroke="#0077b6" strokeWidth="2" strokeDasharray="8,4" />
                <text x="175" y="18" fill="#666" fontSize="9">郵輪</text>
                
                <line x1="210" y1="15" x2="240" y2="15" stroke="#48cae4" strokeWidth="2" strokeDasharray="4,2" />
                <text x="245" y="18" fill="#666" fontSize="9">渡輪</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
    </section>
  );
};

export default MapSection;