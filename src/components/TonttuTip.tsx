import { useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { TipConfig } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface TipData {
  [key: string]: TipConfig | ((name?: string) => TipConfig);
}

const TonttuTip = () => {
  const [showTip, setShowTip] = useState(false);
  const [tipTitle, setTipTitle] = useState('Tonttu 精靈');
  const [currentTip, setCurrentTip] = useState('');

  const tips: TipData = {
    cover: { 
      title: '歡迎來到芬蘭！', 
      text: '這是一份完整的 15 天極地旅遊日誌。向下滾動查看旅程地圖，或點擊導航查看行前準備！' 
    },
    map: {
      title: '15天旅程地圖',
      text: '點擊地圖上的城市圖標，快速跳轉到該城市的詳細景點介紹！赫爾辛基、塔林、波爾沃、芬蘭堡都在等您探索。'
    },
    city: { 
      title: '城市探索', 
      text: '使用城市篩選器切換不同城市！點擊景點卡片可查看更多資訊與評論。建議購買 Helsinki Card 免費使用交通與參觀博物館。' 
    },
    arctic: { 
      title: '北極圈體驗', 
      text: '極光攝影秘訣：將相機或手機的曝光時間拉長 3-5 秒，搭配腳架才能捕捉到絢麗的極光！記得多穿幾層保暖。' 
    },
    sauna: {
      title: '桑拿文化',
      text: '芬蘭桑拿是國寶級體驗！傳統做法是桑拿後直接跳進冰冷的湖水或海水，這是真正的「冰火兩重天」！'
    },
    food: { 
      title: '美食與購物', 
      text: 'Fazer 巧克力、Iittala 玻璃器皿、Marimekko 紡織品都是芬蘭必買！機場免稅店的 Fazer 巧克力通常最便宜。' 
    },
    'rating-success': (name?: string) => ({
      title: '評分成功！',
      text: `您對「${name}」的評分已成功記錄，感謝您的分享！`,
    }),
    default: { 
      title: 'Tonttu 精靈', 
      text: '我是您的芬蘭旅遊小精靈！滾動頁面，我會在每個區塊給您實用的旅遊提示。' 
    },
  };

  const setTip = (key: string, name?: string) => {
    const tip =
      typeof tips[key] === 'function'
        ? (tips[key] as (name?: string) => TipConfig)(name)
        : (tips[key] as TipConfig) || tips.default;

    setShowTip(false);
    setTimeout(() => {
      setTipTitle(tip.title);
      setCurrentTip(tip.text);
      setShowTip(true);
    }, 100);

    // Auto-hide for certain tips
    if (key === 'default' || key.startsWith('check') || key === 'rating-success') {
      setTimeout(() => {
        setShowTip(false);
      }, 6000);
    }
  };

  const nextTip = () => {
    setTip('default');
  };

  const closeTip = () => {
    setShowTip(false);
  };

  useEffect(() => {
    // Initialize with cover tip
    setTip('cover');

    // Setup ScrollTriggers for different sections
    const sections = ['map', 'city', 'arctic', 'sauna', 'food'];

    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setTip(id),
        onEnterBack: () => setTip(id),
      });
    });

    // Listen for custom events (for checklist and rating success)
    const handleChecklistTip = (event: CustomEvent) => {
      setTipTitle('Tonttu 精靈鼓勵您!');
      setCurrentTip(event.detail.tip);
      setShowTip(false);
      setTimeout(() => setShowTip(true), 100);
      setTimeout(() => setShowTip(false), 5000);
    };

    const handleRatingSuccess = (event: CustomEvent) => {
      setTip('rating-success', event.detail.name);
    };

    window.addEventListener('tonttu:checklist-tip', handleChecklistTip as EventListener);
    window.addEventListener('tonttu:rating-success', handleRatingSuccess as EventListener);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('tonttu:checklist-tip', handleChecklistTip as EventListener);
      window.removeEventListener('tonttu:rating-success', handleRatingSuccess as EventListener);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end md:bottom-6 md:right-6 bottom-20 right-4">
      {/* Speech Bubble */}
      {showTip && (
        <div className="speech-bubble mb-3 max-w-[220px] md:max-w-[220px] max-w-[180px] transition-all duration-300 ease-out transform">
          <div className="bg-white p-4 md:p-4 p-3 rounded-lg shadow-xl border-2 border-[#003580] relative">
            {/* Close Button */}
            <button
              onClick={closeTip}
              className="absolute -top-2 -right-2 bg-[#003580] text-white rounded-full w-5 h-5 md:w-5 md:h-5 w-4 h-4 flex items-center justify-center hover:bg-[#002a66] transition shadow-md"
              aria-label="關閉提示"
            >
              <X className="w-3 h-3 md:w-3 md:h-3 w-2 h-2" />
            </button>
            
            <p className="text-[10px] md:text-[10px] text-[9px] font-sans font-bold text-[#003580] tracking-widest mb-1">
              {tipTitle}
            </p>
            <p className="text-xs md:text-xs text-[11px] font-serif text-gray-700 italic leading-relaxed">
              {currentTip}
            </p>
          </div>
        </div>
      )}

      {/* Tonttu Character */}
      <div
        className="w-16 h-16 md:w-16 md:h-16 w-12 h-12 cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
        onClick={nextTip}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Face */}
          <circle cx="50" cy="50" r="48" fill="#fff" stroke="#1a1a1a" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="35" cy="48" r="4" fill="#1a1a1a" />
          <circle cx="65" cy="48" r="4" fill="#1a1a1a" />
          {/* Smile */}
          <path d="M45 58 Q50 63 55 58" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Blush */}
          <circle cx="30" cy="58" r="6" fill="#ffadad" opacity="0.6" />
          <circle cx="70" cy="58" r="6" fill="#ffadad" opacity="0.6" />
          {/* Santa Hat */}
          <path d="M10 38 Q50 -15 90 38" fill="#c0392b" />
          <circle cx="50" cy="6" r="8" fill="#fff" />
          {/* Collar */}
          <rect x="20" y="75" width="60" height="15" rx="5" fill="#003580" />
        </svg>

        {/* Alert Badge */}
        {!showTip && (
          <div className="absolute -top-1 -right-1 bg-[#d4af37] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            !
          </div>
        )}
      </div>
    </div>
  );
};

export default TonttuTip;