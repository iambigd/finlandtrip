import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, AlertCircle, Hospital, MapPin, Clock, CreditCard } from 'lucide-react';

interface EmergencyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyDrawer = ({ isOpen, onClose }: EmergencyDrawerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // 檢測屏幕大小
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 按 ESC 關閉
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* 抽屜內容 - 桌面版右側滑入，手機版底部滑入 */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed z-[60] bg-white shadow-2xl overflow-y-auto
              ${isMobile 
                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl' 
                : 'right-0 top-0 h-full w-[600px] lg:w-[700px]'
              }`}
          >
            {/* 手機版下滑提示條 */}
            <div className="md:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* 頂部標題 - 紅色警示風格 */}
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex justify-between items-center z-10 shadow-lg">
              <div>
                <h2 className="text-3xl font-serif text-white flex items-center">
                  <AlertCircle className="w-8 h-8 mr-3" />
                  緊急聯絡
                </h2>
                <p className="text-sm text-red-100 mt-1">Emergency Contact</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-700 rounded-full transition-colors"
                aria-label="關閉"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* 內容區域 */}
            <div className="p-6 space-y-6">
              {/* 芬蘭緊急電話 - 最重要，放最上面 */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-4 border-red-500 shadow-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-serif mb-4 text-red-900 flex items-center justify-center">
                    <Phone className="w-8 h-8 mr-3 text-red-600" />
                    芬蘭緊急救援
                  </h3>
                  <div className="bg-white rounded-xl p-6 mb-4 shadow-lg">
                    <p className="text-sm text-gray-600 mb-2">撥打緊急號碼</p>
                    <a 
                      href="tel:112" 
                      className="text-7xl font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      112
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      警察 • 消防 • 救護車
                    </p>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    112 是芬蘭統一的緊急救援電話，24 小時全年無休，可使用英語溝通
                  </p>
                </div>
              </div>

              {/* 台灣駐芬蘭代表處 */}
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-serif mb-4 text-blue-900 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                  駐芬蘭台北代表處
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-blue-900 mb-1">旅外國人急難救助服務專線</p>
                    <a href="tel:+358405455429" className="text-xl font-bold text-blue-600 hover:underline">
                      +358-40-5455429
                    </a>
                    <p className="text-xs text-gray-600 mt-1">
                      芬蘭境內請直撥 040-5455429<br />
                      台灣國內請撥 0800-085-095
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-blue-900 mb-1">辦公室電話</p>
                    <a href="tel:+358968293800" className="text-lg font-bold text-blue-600 hover:underline">
                      +358-9-68293800
                    </a>
                    <p className="text-xs text-gray-600 mt-1">
                      芬蘭境內請直撥 09-68293800<br />
                      領務申辦時間：週一至週五<br />
                      09:00-12:00、13:00-15:00
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-blue-900 mb-1">地址</p>
                    <p className="text-gray-700">
                      Aleksanterinkatu 17, 4th Floor<br />
                      00100 Helsinki, Finland
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-blue-900 mb-1">官方網站</p>
                    <a 
                      href="https://www.roc-taiwan.org/fi/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      www.roc-taiwan.org/fi
                    </a>
                  </div>
                </div>
              </div>

              {/* AXA 安盛旅遊保險 */}
              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-serif mb-4 text-green-900 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-green-600" />
                  AXA 安盛旅遊保險
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-green-900 mb-1">24 小時緊急醫療援助專線</p>
                    <a href="tel:+3225525398" className="text-xl font-bold text-green-600 hover:underline">
                      +32 2 552 5398
                    </a>
                    <p className="text-xs text-gray-600 mt-2">
                      If you require medical assistance, please call +32 2 552 5398. Our medical assistance professionals will find the best solution for your situation.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-green-900 mb-2">保單資訊</p>
                    <div className="text-gray-700 space-y-1">
                      <p>• 保單號碼：請事先記錄在手機</p>
                      <p>• 理賠文件：醫療收據、診斷證明、警察報案單</p>
                      <p>• 就醫前務必先聯絡保險公司</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 就醫指南 */}
              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-serif mb-4 text-purple-900 flex items-center">
                  <Hospital className="w-6 h-6 mr-2 text-purple-600" />
                  芬蘭就醫指南
                </h3>
                
                <div className="space-y-4">
                  {/* 藥局 */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                      <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                      藥局 Apteekki
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      輕微症狀可至藥局諮詢藥劑師，多數藥品無需處方箋
                    </p>
                    <div className="bg-purple-50 rounded p-3 text-xs">
                      <p className="font-bold text-purple-800 mb-1">赫爾辛基 24 小時藥局：</p>
                      <p className="text-gray-700">Yliopiston Apteekki</p>
                      <p className="text-gray-600">地址：Mannerheimintie 96</p>
                    </div>
                  </div>

                  {/* 急診 */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                      <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                      急診 Päivystys
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      緊急傷病可直接前往醫院急診室，建議先致電保險公司
                    </p>
                    <div className="bg-purple-50 rounded p-3 text-xs space-y-2">
                      <div>
                        <p className="font-bold text-purple-800">Meilahti Hospital</p>
                        <p className="text-gray-700">24/7 急診服務</p>
                        <p className="text-gray-600">地址：Haartmaninkatu 4, Helsinki</p>
                      </div>
                      <div>
                        <p className="font-bold text-purple-800">Jorvi Hospital</p>
                        <p className="text-gray-700">24/7 急診服務</p>
                        <p className="text-gray-600">地址：Turuntie 150, Espoo</p>
                      </div>
                    </div>
                  </div>

                  {/* 線上預約 */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                      <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                      線上醫療諮詢
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      非緊急症狀可使用線上醫療服務
                    </p>
                    <div className="bg-purple-50 rounded p-3 text-xs">
                      <p className="text-gray-700">• Mehiläinen Online（英語服務）</p>
                      <p className="text-gray-700">• Terveystalo Digital Clinic</p>
                      <p className="text-gray-600 mt-1">需信用卡付費，可向保險公司申請理賠</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 其他重要電話 */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-serif mb-4 text-gray-900 flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-gray-600" />
                  其他重要電話
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-gray-700">台灣外交部急難救助</span>
                    <div className="flex flex-col items-end gap-1">
                      <a href="tel:0800085095" className="font-bold text-blue-600 hover:underline">
                        0800-085-095
                      </a>
                      <span className="text-xs text-gray-500">台灣國內撥打</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-gray-700">信用卡掛失（Visa）</span>
                    <div className="flex flex-col items-end gap-1">
                      <a href="tel:0800110057" className="font-bold text-blue-600 hover:underline">
                        0800-11-0057
                      </a>
                      <a 
                        href="https://www.visa.com.tw/support/consumer/lost-stolen-card.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        官方查詢 →
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-gray-700">信用卡掛失（Mastercard）</span>
                    <div className="flex flex-col items-end gap-1">
                      <a href="tel:08001156234" className="font-bold text-blue-600 hover:underline">
                        08001-156234
                      </a>
                      <a 
                        href="https://www.mastercard.com.tw/zh-tw/personal/get-support.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        官方查詢 →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tonttu 提示 */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 mr-3 flex-shrink-0">
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
                  </div>
                  <div>
                    <p className="font-sans font-bold text-blue-900 mb-2">Tonttu 的安全提示</p>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• 將這些緊急電話存入手機通訊錄，並截圖備份</li>
                      <li>• 護照、保險卡影印並分開存放，手機也要拍照備份</li>
                      <li>• 芬蘭治安良好，但仍要注意保管隨身物品</li>
                      <li>• 冬季路滑，穿著防滑鞋並小心行走</li>
                      <li>• 就醫費用昂貴，務必在台灣購買充足的旅遊保險</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencyDrawer;