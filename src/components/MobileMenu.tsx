import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, AlertCircle } from 'lucide-react';

interface MobileMenuProps {
  onOpenPreparation: () => void;
  onOpenTaxRefund: () => void;
  onOpenEmergency: () => void;
}

const MobileMenu = ({ onOpenPreparation, onOpenTaxRefund, onOpenEmergency }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlanningExpanded, setIsPlanningExpanded] = useState(false);

  // 防止背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.location.hash = href;
    }, 300);
  };

  const handleDrawerOpen = (openFn: () => void) => {
    setIsOpen(false);
    setTimeout(() => {
      openFn();
    }, 300);
  };

  return (
    <>
      {/* 頂部欄 - 手機版 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#fdfbf7]/95 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="font-bold text-xs font-sans uppercase tracking-wider text-gray-800">
          Arctic Chronicle
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* 側邊菜單 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* 菜單抽屜 */}
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl animate-slide-in-left overflow-y-auto md:hidden">
            {/* 頂部 */}
            <div className="bg-gradient-to-r from-[#003580] to-blue-600 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-serif">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-blue-100">Arctic Chronicle: Finland 2025</p>
            </div>

            {/* 菜單項目 */}
            <nav className="p-4 space-y-2">
              <a
                href="#map"
                onClick={() => handleLinkClick('#map')}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <div className="font-sans text-sm">旅程地圖</div>
                <div className="text-xs text-gray-500">Journey Map</div>
              </a>

              {/* 旅行規劃 - 可展開 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsPlanningExpanded(!isPlanningExpanded)}
                  className="w-full px-4 py-3 bg-amber-50 hover:bg-amber-100 transition text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-sans text-sm text-amber-900">旅行規劃</div>
                    <div className="text-xs text-amber-700">Planning</div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-700 transition-transform ${
                      isPlanningExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isPlanningExpanded && (
                  <div className="bg-white">
                    <button
                      onClick={() => handleDrawerOpen(onOpenPreparation)}
                      className="w-full px-6 py-3 text-left hover:bg-gray-50 transition border-t border-gray-100"
                    >
                      <div className="font-sans text-sm text-gray-700">行前準備</div>
                      <div className="text-xs text-gray-500">Preparation</div>
                    </button>
                    <button
                      onClick={() => handleDrawerOpen(onOpenTaxRefund)}
                      className="w-full px-6 py-3 text-left hover:bg-gray-50 transition border-t border-gray-100"
                    >
                      <div className="font-sans text-sm text-gray-700">退稅指南</div>
                      <div className="text-xs text-gray-500">Tax Refund</div>
                    </button>
                  </div>
                )}
              </div>

              <a
                href="#city"
                onClick={() => handleLinkClick('#city')}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <div className="font-sans text-sm">城市探索</div>
                <div className="text-xs text-gray-500">City Exploration</div>
              </a>

              <a
                href="#arctic"
                onClick={() => handleLinkClick('#arctic')}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <div className="font-sans text-sm">北極圈體驗</div>
                <div className="text-xs text-gray-500">Arctic Experience</div>
              </a>

              <a
                href="#food"
                onClick={() => handleLinkClick('#food')}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition text-gray-700"
              >
                <div className="font-sans text-sm">美食與伴手禮</div>
                <div className="text-xs text-gray-500">Food & Souvenirs</div>
              </a>

              {/* 緊急聯絡 - 紅色強調 */}
              <button
                onClick={() => handleDrawerOpen(onOpenEmergency)}
                className="w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition text-white flex items-center gap-2 mt-4"
              >
                <AlertCircle className="w-5 h-5" />
                <div>
                  <div className="font-sans text-sm font-bold">緊急聯絡</div>
                  <div className="text-xs text-red-100">Emergency Info</div>
                </div>
              </button>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;