import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface MapSectionProps {
  activeMapLocation: string;
  setActiveMapLocation: (location: string) => void;
}

const MapSection = ({ activeMapLocation, setActiveMapLocation }: MapSectionProps) => {
  const routeTimelinesRef = useRef<{ [key: string]: gsap.core.Timeline }>({});
  const activeRouteRef = useRef<string | null>(null);

  useEffect(() => {
    // Create timeline for each route
    const createTravelTimeline = (iconId: string, pathId: string, duration: number) => {
      return gsap
        .timeline({ paused: true })
        .to(iconId, {
          duration: duration,
          ease: 'power1.inOut',
          onStart: () => gsap.to(iconId, { opacity: 1, duration: 0.3 }),
          onReverseComplete: () => {
            gsap.to(iconId, { opacity: 0, duration: 0.3 });
            if (activeRouteRef.current === iconId) {
              activeRouteRef.current = null;
            }
          },
          motionPath: {
            path: pathId,
            align: pathId,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        });
    };

    routeTimelinesRef.current = {
      'hel-tal': createTravelTimeline('#boat-icon', '#path-hel-tal', 8),
      'hel-rov': createTravelTimeline('#train-icon', '#path-hel-rov', 12),
      'rov-lev': createTravelTimeline('#bus-icon', '#path-rov-lev', 5),
    };
  }, []);

  const stopAllAnimations = () => {
    for (const routeId in routeTimelinesRef.current) {
      const timeline = routeTimelinesRef.current[routeId];
      if (timeline && !timeline.paused()) {
        timeline.reverse();
      }
    }
    activeRouteRef.current = null;
  };

  const startTravelAnimation = (poiId: string) => {
    let newRouteId: string | null = null;

    switch (poiId) {
      case 'tallinn':
        newRouteId = 'hel-tal';
        break;
      case 'rovaniemi':
        newRouteId = 'hel-rov';
        break;
      case 'levi':
        newRouteId = 'rov-lev';
        break;
      case 'helsinki':
        stopAllAnimations();
        setActiveMapLocation('helsinki');
        return;
      default:
        return;
    }

    const timeline = routeTimelinesRef.current[newRouteId];

    if (timeline) {
      setActiveMapLocation(poiId);

      if (activeRouteRef.current === newRouteId) {
        // Toggle: play or reverse
        if (timeline.reversed()) {
          timeline.timeScale(1).play();
        } else {
          timeline.timeScale(1).reverse();
        }
      } else {
        // Start new route
        stopAllAnimations();
        activeRouteRef.current = newRouteId;
        timeline.timeScale(1).play(0).reversed(false);
      }
    }
  };

  return (
    <section id="map" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-[#003580] italic">
          Journey Map
          <span className="dual-title-zh text-sm uppercase text-gray-500">旅程地圖</span>
        </h2>
        <p className="text-sm font-sans text-gray-500 mt-2">
          16天的極地日誌。點擊地標查看細節並觀看交通動畫。
        </p>
      </div>

      <div className="flex justify-center items-start h-[600px] relative">
        {/* Travel Icons */}
        <div id="boat-icon" className="travel-icon">
          <i className="fa-solid fa-ship text-[#0077b6]"></i>
        </div>
        <div id="train-icon" className="travel-icon">
          <i className="fa-solid fa-train text-[#c0392b]"></i>
          <i
            className="fa-solid fa-hat-santa absolute top-[-5px] right-[-5px] text-xs"
            style={{ color: '#fff', textShadow: '0 0 3px #c0392b' }}
          ></i>
        </div>
        <div id="bus-icon" className="travel-icon">
          <i className="fa-solid fa-bus text-[#f39c12]"></i>
        </div>

        {/* Map SVG */}
        <svg className="h-full w-auto" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Routes */}
          <path
            id="path-hel-tal"
            d="M180 680 C 180 680, 160 710, 150 740"
            stroke="#0077b6"
            strokeWidth="3"
            strokeDasharray="6,6"
            opacity="0.7"
          />
          <path
            id="path-hel-rov"
            d="M180 680 C 160 500, 190 400, 200 250"
            stroke="#c0392b"
            strokeWidth="3"
            opacity="0.7"
          />
          <path
            id="path-rov-lev"
            d="M200 250 L 220 180"
            stroke="#f39c12"
            strokeWidth="3"
            strokeDasharray="4,4"
            opacity="0.7"
          />

          {/* POI: Helsinki */}
          <g
            className="cursor-pointer transition duration-300"
            onClick={() => startTravelAnimation('helsinki')}
            transform="translate(180, 680)"
          >
            <circle r="8" fill="#003580" stroke="none" />
            <text x="15" y="5" fill="#111" fontFamily="serif" fontSize="16" fontWeight="bold">
              赫爾辛基
            </text>
          </g>

          {/* POI: Rovaniemi */}
          <g
            className="cursor-pointer transition duration-300"
            onClick={() => startTravelAnimation('rovaniemi')}
            transform="translate(200, 250)"
          >
            <circle
              r="8"
              fill={activeMapLocation === 'rovaniemi' ? '#d4af37' : 'none'}
              stroke="#c0392b"
              strokeWidth="2"
            />
            <text x="15" y="5" fill="#111" fontFamily="serif" fontSize="16" fontWeight="bold">
              羅瓦涅米
            </text>
          </g>

          {/* POI: Levi */}
          <g
            className="cursor-pointer transition duration-300"
            onClick={() => startTravelAnimation('levi')}
            transform="translate(220, 180)"
          >
            <circle
              r="8"
              fill={activeMapLocation === 'levi' ? '#d4af37' : 'none'}
              stroke="#c0392b"
              strokeWidth="2"
            />
            <text x="15" y="5" fill="#111" fontFamily="serif" fontSize="16" fontWeight="bold">
              列維
            </text>
          </g>

          {/* POI: Tallinn */}
          <g
            className="cursor-pointer transition duration-300"
            onClick={() => startTravelAnimation('tallinn')}
            transform="translate(150, 740)"
          >
            <circle
              r="5"
              fill={activeMapLocation === 'tallinn' ? '#d4af37' : 'none'}
              stroke="#94a3b8"
              strokeWidth="2"
            />
            <text x="15" y="5" fill="#111" fontFamily="sans-serif" fontSize="12">
              塔林
            </text>
          </g>

          {/* Detail Box */}
          <g transform="translate(250, 400)">
            <foreignObject width="150" height="200">
              <div
                className={`bg-white p-4 border-l-4 shadow-lg border-[#003580] transition-opacity duration-300 ${
                  activeMapLocation ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {activeMapLocation === 'helsinki' && (
                  <div className="text-[#111] text-xs font-sans">
                    <h4 className="font-bold text-sm mb-1">赫爾辛基 (Helsinki)</h4>
                    <p className="text-[10px] uppercase text-gray-500 mb-2">12月19-31日</p>
                    <p>住宿: Scandic Helsinki Hub</p>
                    <p className="mt-2 text-[#003580]">市區探索與聖誕市集體驗。</p>
                    <a href="#city" className="text-[#d4af37] underline block mt-4 text-center">
                      閱讀該章節 &rarr;
                    </a>
                  </div>
                )}
                {activeMapLocation === 'rovaniemi' && (
                  <div className="text-[#111] text-xs font-sans">
                    <h4 className="font-bold text-sm mb-1">羅瓦涅米 (Rovaniemi)</h4>
                    <p className="text-[10px] uppercase text-gray-500 mb-2">12月21日</p>
                    <p>住宿: Santa's Hotel</p>
                    <p className="mt-2 text-[#003580]">聖誕老人村，跨越北極圈。</p>
                    <a href="#arctic" className="text-[#d4af37] underline block mt-4 text-center">
                      閱讀該章節 &rarr;
                    </a>
                  </div>
                )}
                {activeMapLocation === 'levi' && (
                  <div className="text-[#111] text-xs font-sans">
                    <h4 className="font-bold text-sm mb-1">列維 (Levi)</h4>
                    <p className="text-[10px] uppercase text-gray-500 mb-2">12月22-24日</p>
                    <p>住宿: Break Sokos Hotel</p>
                    <p className="mt-2 text-[#003580]">哈士奇雪橇，極光追逐。</p>
                    <a href="#arctic" className="text-[#d4af37] underline block mt-4 text-center">
                      閰讀該章節 &rarr;
                    </a>
                  </div>
                )}
                {activeMapLocation === 'tallinn' && (
                  <div className="text-[#111] text-xs font-sans">
                    <h4 className="font-bold text-sm mb-1">塔林 (一日遊)</h4>
                    <p className="text-[10px] uppercase text-gray-500 mb-2">12月27日</p>
                    <p>交通: Eckerö Line 郵輪</p>
                    <p className="mt-2 text-[#003580]">中世紀舊城區探險。</p>
                    <a href="#city" className="text-[#d4af37] underline block mt-4 text-center">
                      閰讀該章節 &rarr;
                    </a>
                  </div>
                )}
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* Font Awesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
    </section>
  );
};

export default MapSection;