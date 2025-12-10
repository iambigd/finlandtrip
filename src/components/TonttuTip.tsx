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
    cover: { title: '歡迎!', text: '點擊「旅程地圖」按鈕，開始您的極地之旅。' },
    city: { 
      title: '城市探索', 
      text: '使用篩選器尋找您感興趣的景點類型！每個城市都有獨特的魅力等您發現。Helsinki Card 可以免費使用大眾交通與參觀多數博物館，非常划算！' 
    },
    arctic: { title: '極光提醒', text: '極光攝影：將相機（或手機）的曝光時間拉長，才能捕捉到極光！' },
    food: { title: '購物筆記', text: 'Fazer 巧克力在機場免稅店通常最便宜，記得比價喔！' },
    'rating-success': (name?: string) => ({
      title: '評分成功！',
      text: `您對「${name}」的評分已成功記錄。`,
    }),
    default: { title: 'Tonttu 精靈', text: '想知道這個版塊的秘訣嗎？滾動頁面，我來幫您！' },
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
    const sections = ['city', 'arctic', 'food'];

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