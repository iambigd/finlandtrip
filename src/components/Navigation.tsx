import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ChevronDown, User, LogOut } from 'lucide-react';

interface NavigationProps {
  onOpenPreparation: () => void;
  onOpenTaxRefund: () => void;
  onOpenEmergency: () => void;
  onOpenFood: () => void;
  user: { nickname: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Navigation = ({ 
  onOpenPreparation, 
  onOpenTaxRefund, 
  onOpenEmergency, 
  onOpenFood,
  user,
  onOpenAuth,
  onLogout,
}: NavigationProps) => {
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="hidden md:flex fixed top-0 left-0 w-full z-30 px-6 py-4 bg-[#fdfbf7]/95 backdrop-blur-sm shadow-sm justify-between items-center text-[#111] font-sans text-xs uppercase tracking-widest">
      {/* Logo/Title */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-bold text-sm hover:text-[#d4af37] transition cursor-pointer"
      >
        ARCTIC CHRONICLE: FINLAND 極地日誌
      </button>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="#map" className="hover:text-[#d4af37] transition">
          旅程地圖
        </a>

        {/* 旅行規劃 - 下拉菜單 */}
        <div
          className="relative"
          onMouseEnter={() => setIsPlanningOpen(true)}
          onMouseLeave={() => setIsPlanningOpen(false)}
        >
          <button className="flex items-center hover:text-[#d4af37] transition">
            旅行規劃
            <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${isPlanningOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* 下拉選單 - 使用 Motion 動畫 */}
          <AnimatePresence>
            {isPlanningOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-full left-0 pt-2 z-50"
              >
                <div className="w-48 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenPreparation();
                      setIsPlanningOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-amber-50 transition text-gray-700 hover:text-[#003580] border-b border-gray-100"
                  >
                    <div className="font-sans text-xs uppercase tracking-wider">行前準備</div>
                    <div className="text-[10px] text-gray-500 normal-case mt-0.5">Preparation</div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenTaxRefund();
                      setIsPlanningOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-amber-50 transition text-gray-700 hover:text-[#003580]"
                  >
                    <div className="font-sans text-xs uppercase tracking-wider">退稅指南</div>
                    <div className="text-[10px] text-gray-500 normal-case mt-0.5">Tax Refund</div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a href="#city" className="hover:text-[#d4af37] transition">
          城市探索
        </a>

        <a href="#arctic" className="hover:text-[#d4af37] transition">
          北極圈體驗
        </a>

        <button 
          onClick={onOpenFood}
          className="hover:text-[#d4af37] transition"
        >
          美食與伴手禮
        </button>

        {/* 緊急聯絡按鈕 - 紅色強調 */}
        <button
          onClick={onOpenEmergency}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-lg hover:shadow-xl"
        >
          <AlertCircle className="w-4 h-4" />
          <span>緊急聯絡</span>
        </button>

        {/* 用戶登入/登出 */}
        {user ? (
          <div
            className="relative"
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={() => setIsUserMenuOpen(false)}
          >
            <button className="flex items-center gap-2 bg-[#003580] text-white px-4 py-2 rounded-lg hover:bg-[#003580]/90 transition">
              <User className="w-4 h-4" />
              <span className="normal-case">{user.nickname}</span>
            </button>
            
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full right-0 pt-2 z-50"
                >
                  <div className="w-40 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 transition text-gray-700 hover:text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-sans text-xs uppercase tracking-wider">登出</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 bg-[#003580] text-white px-4 py-2 rounded-lg hover:bg-[#003580]/90 transition"
          >
            <User className="w-4 h-4" />
            <span>登入</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;