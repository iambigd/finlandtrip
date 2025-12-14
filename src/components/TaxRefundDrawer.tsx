import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, FileCheck, Euro } from 'lucide-react';

interface TaxRefundDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaxRefundDrawer = ({ isOpen, onClose }: TaxRefundDrawerProps) => {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* 抽屜內容 - 桌面版右側滑入，手機版底部滑入 */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed z-50 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl overflow-y-auto
              ${isMobile 
                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl' 
                : 'right-0 top-0 h-full w-[600px] lg:w-[700px]'
              }`}
          >
            {/* 手機版下滑提示條 */}
            <div className="md:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* 頂部標題 */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-100 to-yellow-100 border-b border-amber-200 px-6 py-4 flex justify-between items-center z-10">
              <div>
                <h2 className="text-3xl font-serif text-amber-900">
                  退稅指南
                  <span className="text-sm font-sans text-amber-700 ml-3">Tax Refund Guide</span>
                </h2>
                <p className="text-sm text-amber-700 mt-1">輕鬆拿回消費稅</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-200 rounded-full transition-colors"
                aria-label="關閉"
              >
                <X className="w-6 h-6 text-amber-900" />
              </button>
            </div>

            {/* 內容區域 */}
            <div className="p-6 space-y-6">
              {/* 退稅條件區塊 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200">
                <h3 className="text-2xl font-serif mb-6 text-amber-900 flex items-center">
                  <Euro className="w-8 h-8 mr-3 text-amber-600" />
                  退稅條件
                </h3>
                
                <div className="space-y-6">
                  {/* 門檻金額 */}
                  <div>
                    <h4 className="font-sans font-bold text-amber-800 mb-3 flex items-center">
                      <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                      退稅門檻
                    </h4>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <p className="text-gray-700 mb-2">
                        <span className="font-bold text-amber-900">芬蘭：</span>同一店家單次消費滿 <span className="text-2xl font-bold text-amber-600">€40</span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-bold text-amber-900">愛沙尼亞：</span>同一店家單次消費滿 <span className="text-2xl font-bold text-amber-600">€38</span>
                      </p>
                    </div>
                  </div>

                  {/* 退稅率 */}
                  <div>
                    <h4 className="font-sans font-bold text-amber-800 mb-3 flex items-center">
                      <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                      退稅率
                    </h4>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 space-y-3">
                      <div>
                        <p className="text-gray-700 mb-1">
                          芬蘭標準增值稅為 <span className="font-bold text-amber-900">25.5%</span>（服裝、化妝品、運動器材等），部分商品適用 <span className="font-bold text-amber-900">14%</span> 優惠稅率（書籍、藥品等）。
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-amber-300">
                        <p className="text-sm font-bold text-amber-900 mb-2">💰 實際退稅金額：</p>
                        <p className="text-sm text-gray-700">
                          • <span className="font-bold">標準稅率商品</span>：約退回 <span className="text-lg font-bold text-amber-600">14%-16%</span>
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          • <span className="font-bold">優惠稅率商品</span>：約退回 <span className="text-lg font-bold text-amber-600">8.5%-10%</span>
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          *已扣除退稅公司手續費（約 20-30%）
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 需要文件 */}
                  <div>
                    <h4 className="font-sans font-bold text-amber-800 mb-3 flex items-center">
                      <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                      需要文件
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span>護照（必須是非歐盟國家居民）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span>退稅單（Tax Free Form）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span>購物收據（原始發票）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">✓</span>
                        <span>未使用的商品（可能需要檢查）</span>
                      </li>
                    </ul>
                  </div>

                  {/* 注意事項 */}
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <p className="text-sm font-sans font-bold text-red-900 mb-2">⚠️ 重要提醒</p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• 必須在購買後 3 個月內離境並辦理退稅</li>
                      <li>• 商品必須隨身攜帶或托運，不可在歐盟境內使用</li>
                      <li>• 食品、飲料、藥品等消耗品不適用退稅</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 退稅流程三步驟 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200">
                <h3 className="text-2xl font-serif mb-6 text-amber-900 flex items-center">
                  <FileCheck className="w-8 h-8 mr-3 text-amber-600" />
                  退稅流程
                </h3>

                <div className="space-y-6">
                  {/* 步驟 01 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                      01
                    </div>
                    <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
                      <h4 className="font-sans font-bold text-amber-900 mb-2 flex items-center">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        購物時取得退稅單
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        在有 Tax Free 標誌的商店購物時，結帳時告知店員需要退稅，店員會提供退稅單。
                      </p>
                      <div className="bg-white rounded p-3 text-xs text-gray-600">
                        <p className="font-bold text-amber-800 mb-1">常見退稅公司：</p>
                        <p>• Global Blue（最常見）</p>
                        <p>• Premier Tax Free</p>
                        <p>• Tax Free Worldwide</p>
                      </div>
                    </div>
                  </div>

                  {/* 步驟 02 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                      02
                    </div>
                    <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
                      <h4 className="font-sans font-bold text-amber-900 mb-2 flex items-center">
                        <FileCheck className="w-5 h-5 mr-2" />
                        機場海關蓋章驗證
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        離境前在機場找到海關（Customs）櫃台，出示護照、退稅單、商品和收據，海關會在退稅單上蓋章驗證。
                      </p>
                      <div className="bg-white rounded p-3 text-xs text-gray-600">
                        <p className="font-bold text-amber-800 mb-1">⏰ 時間建議：</p>
                        <p>提前 3 小時到機場，避免排隊耽誤退稅</p>
                      </div>
                    </div>
                  </div>

                  {/* 步驟 03 */}
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                      03
                    </div>
                    <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
                      <h4 className="font-sans font-bold text-amber-900 mb-2 flex items-center">
                        <Euro className="w-5 h-5 mr-2" />
                        退稅櫃檯領取退款
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        持蓋章後的退稅單到退稅櫃檯（Tax Refund Counter）領取退款。可選擇現金或信用卡退款。
                      </p>
                      <div className="bg-white rounded p-3 text-xs text-gray-600">
                        <p className="font-bold text-amber-800 mb-1">💡 退款方式：</p>
                        <p>• <span className="font-bold">現金</span>：立即拿到，但可能有額外手續費</p>
                        <p>• <span className="font-bold">信用卡</span>：約 1-2 個月入帳，無額外費用</p>
                      </div>
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
                    <p className="font-sans font-bold text-blue-900 mb-2">Tonttu 的退稅小訣竅</p>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>• 赫爾辛基機場 T2 航廈的退稅櫃檯在安檢前，記得先蓋章再托運行李</li>
                      <li>• 如果購買高價商品（如電子產品），建議隨身攜帶以便海關檢查</li>
                      <li>• 將所有退稅單和收據拍照備份，以防遺失</li>
                      <li>• 信用卡退款最划算，但要確保卡片有效期至少還有 6 個月</li>
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

export default TaxRefundDrawer;