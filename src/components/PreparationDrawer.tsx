import { useEffect, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface PreparationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const PreparationDrawer = ({ isOpen, onClose }: PreparationDrawerProps) => {
  // 衣服清單
  const [clothingItems, setClothingItems] = useState<ChecklistItem[]>([
    { id: 'hat', label: '保暖毛帽 or 飛行帽', checked: false },
    { id: 'scarf', label: '保暖圍巾 保暖口罩', checked: false },
    { id: 'heattech', label: '發熱衣 發熱褲 (heattech)', checked: false },
    { id: 'sweater', label: '中層羊毛毛衣', checked: false },
    { id: 'jacket', label: '中層保暖外套', checked: false },
    { id: 'down', label: '防水防風厚羽絨外套', checked: false },
    { id: 'snowpants', label: '防水防風褲 (雪褲)', checked: false },
    { id: 'pants', label: '刷毛厚褲 + 運動緊身褲', checked: false },
    { id: 'socks', label: '發熱襪 + 羊毛刷毛襪', checked: false },
    { id: 'boots', label: '刷毛雪靴 (迪卡儂)', checked: false },
    { id: 'gloves1', label: '防水防風手套', checked: false },
    { id: 'gloves2', label: '保暖刷毛手套', checked: false },
    { id: 'underwear', label: '免洗內褲', checked: false },
    { id: 'swimsuit', label: '泳衣', checked: false },
  ]);

  // 藥品清單
  const [medicineItems, setMedicineItems] = useState<ChecklistItem[]>([
    { id: 'vitamin', label: '日常維他命 個人夜晚用藥', checked: false },
    { id: 'medicine', label: '退燒藥 腸胃藥 暈船藥', checked: false },
    { id: 'ointment', label: '小護士 創口貼 跌打損傷藥', checked: false },
    { id: 'skin', label: '皮膚藥膏', checked: false },
    { id: 'warmer', label: '暖暖包 (黏的、非黏的)', checked: false },
    { id: 'mask', label: '飛機用口罩', checked: false },
    { id: 'vaseline', label: '凡士林', checked: false },
  ]);

  // 日常用品清單
  const [dailyItems, setDailyItems] = useState<ChecklistItem[]>([
    { id: 'skincare', label: '臉部保養品 化妝品 防曬', checked: false },
    { id: 'hairdryer', label: '吹風機', checked: false },
    { id: 'toothbrush', label: '牙刷牙膏', checked: false },
    { id: 'tissue', label: '衛生紙 濕紙巾', checked: false },
    { id: 'hair', label: '髮油 髮蠟 乳液', checked: false },
    { id: 'cotton', label: '棉花棒', checked: false },
    { id: 'slippers', label: '室內拖鞋 購物袋', checked: false },
    { id: 'warmer2', label: '暖暖包', checked: false },
    { id: 'eyedrops', label: '洗眼液 隱眼保濕藥水', checked: false },
    { id: 'period', label: '女性生理期用品', checked: false },
  ]);

  // 從 localStorage 載入狀態
  useEffect(() => {
    if (isOpen) {
      const savedClothing = localStorage.getItem('prep_clothing');
      const savedMedicine = localStorage.getItem('prep_medicine');
      const savedDaily = localStorage.getItem('prep_daily');
      
      if (savedClothing) setClothingItems(JSON.parse(savedClothing));
      if (savedMedicine) setMedicineItems(JSON.parse(savedMedicine));
      if (savedDaily) setDailyItems(JSON.parse(savedDaily));
    }
  }, [isOpen]);

  // 儲存到 localStorage
  const saveToLocalStorage = (key: string, items: ChecklistItem[]) => {
    localStorage.setItem(key, JSON.stringify(items));
  };

  // 切換單個項目
  const toggleItem = (category: 'clothing' | 'medicine' | 'daily', id: string) => {
    if (category === 'clothing') {
      const updated = clothingItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setClothingItems(updated);
      saveToLocalStorage('prep_clothing', updated);
    } else if (category === 'medicine') {
      const updated = medicineItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setMedicineItems(updated);
      saveToLocalStorage('prep_medicine', updated);
    } else if (category === 'daily') {
      const updated = dailyItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setDailyItems(updated);
      saveToLocalStorage('prep_daily', updated);
    }
  };

  // 切換全選或清除（選項 A 邏輯）
  const toggleAllCategory = (category: 'clothing' | 'medicine' | 'daily') => {
    if (category === 'clothing') {
      const allChecked = clothingItems.every(item => item.checked);
      const updated = clothingItems.map(item => ({ ...item, checked: !allChecked }));
      setClothingItems(updated);
      saveToLocalStorage('prep_clothing', updated);
    } else if (category === 'medicine') {
      const allChecked = medicineItems.every(item => item.checked);
      const updated = medicineItems.map(item => ({ ...item, checked: !allChecked }));
      setMedicineItems(updated);
      saveToLocalStorage('prep_medicine', updated);
    } else if (category === 'daily') {
      const allChecked = dailyItems.every(item => item.checked);
      const updated = dailyItems.map(item => ({ ...item, checked: !allChecked }));
      setDailyItems(updated);
      saveToLocalStorage('prep_daily', updated);
    }
  };

  // 檢查分類是否全部勾選
  const isAllChecked = (items: ChecklistItem[]) => {
    return items.every(item => item.checked);
  };

  // 計算進度
  const getProgress = (items: ChecklistItem[]) => {
    const checked = items.filter(item => item.checked).length;
    const total = items.length;
    return { checked, total, percentage: Math.round((checked / total) * 100) };
  };

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

  if (!isOpen) return null;

  const clothingProgress = getProgress(clothingItems);
  const medicineProgress = getProgress(medicineItems);
  const dailyProgress = getProgress(dailyItems);

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 抽屜內容 - 桌面版左側滑入，手機版底部滑入 */}
      <div
        className={`
          fixed z-50 bg-white shadow-2xl
          md:top-0 md:left-0 md:h-full md:w-[600px]
          md:animate-slide-in-left
          bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl
          md:rounded-none
          animate-slide-in-bottom
          overflow-y-auto
        `}
      >
        {/* 手機版下滑提示條 */}
        <div className="md:hidden flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* 頂部標題 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-20 shadow-md">
          <div>
            <h2 className="text-3xl font-serif text-[#003580]">
              行前準備
              <span className="text-sm font-sans text-gray-500 ml-3">Preparation</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">極地旅行必備清單</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 內容區域 */}
        <div className="p-6 space-y-6">
          {/* 衣服準備 */}
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif flex items-center text-pink-900">
                  <span className="text-3xl mr-3">🧥</span>
                  衣服準備
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAllCategory('clothing')}
                    className="text-xs bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition"
                  >
                    {isAllChecked(clothingItems) ? '清除' : '全部確認'}
                  </button>
                </div>
              </div>
              
              {/* 進度條 */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-pink-800 mb-2">
                  <span>{clothingProgress.checked} / {clothingProgress.total} 已備妥</span>
                  <span>{clothingProgress.percentage}%</span>
                </div>
                <div className="w-full bg-pink-200 rounded-full h-2">
                  <div 
                    className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${clothingProgress.percentage}%` }}
                  />
                </div>
              </div>

              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                {clothingItems.map(item => (
                  <li key={item.id}>
                    <label className="flex items-start cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem('clothing', item.id)}
                        className="mt-1 w-4 h-4 text-pink-600 border-pink-300 rounded focus:ring-pink-500 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 group-hover:text-pink-900 transition">
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 需帶藥品 */}
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif flex items-center text-indigo-900">
                  <span className="text-3xl mr-3">💊</span>
                  需帶藥品
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAllCategory('medicine')}
                    className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {isAllChecked(medicineItems) ? '清除' : '全部確認'}
                  </button>
                </div>
              </div>
              
              {/* 進度條 */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-indigo-800 mb-2">
                  <span>{medicineProgress.checked} / {medicineProgress.total} 已備妥</span>
                  <span>{medicineProgress.percentage}%</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${medicineProgress.percentage}%` }}
                  />
                </div>
              </div>

              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                {medicineItems.map(item => (
                  <li key={item.id}>
                    <label className="flex items-start cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem('medicine', item.id)}
                        className="mt-1 w-4 h-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 group-hover:text-indigo-900 transition">
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 日常用品攜帶 */}
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif flex items-center text-orange-900">
                  <span className="text-3xl mr-3">🎒</span>
                  日常用品攜帶
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAllCategory('daily')}
                    className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded-lg hover:bg-orange-700 transition"
                  >
                    {isAllChecked(dailyItems) ? '清除' : '全部確認'}
                  </button>
                </div>
              </div>
              
              {/* 進度條 */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-orange-800 mb-2">
                  <span>{dailyProgress.checked} / {dailyProgress.total} 已備妥</span>
                  <span>{dailyProgress.percentage}%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dailyProgress.percentage}%` }}
                  />
                </div>
              </div>

              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                {dailyItems.map(item => (
                  <li key={item.id}>
                    <label className="flex items-start cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem('daily', item.id)}
                        className="mt-1 w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-800 group-hover:text-orange-900 transition">
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tonttu 提示 */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <div className="flex items-start">
              <span className="text-3xl mr-3">🎅</span>
              <div>
                <p className="font-sans font-bold text-blue-900 mb-2">Tonttu 的極地提示</p>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• 芬蘭冬季氣溫可達 -20°C 至 -30°C，務必做好保暖準備</li>
                  <li>• 洋蔥式穿法最實用：發熱衣 → 毛衣 → 羽絨外套</li>
                  <li>• 暖暖包建議帶 20 個以上，黏貼式可貼在腳底</li>
                  <li>• 凡士林可預防臉部和嘴唇乾裂，非常重要！</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 總體進度 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <h4 className="font-serif text-xl text-green-900">整體準備進度</h4>
                  <p className="text-sm text-green-700">
                    {clothingProgress.checked + medicineProgress.checked + dailyProgress.checked} / {clothingProgress.total + medicineProgress.total + dailyProgress.total} 項目已完成
                  </p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {Math.round(((clothingProgress.checked + medicineProgress.checked + dailyProgress.checked) / (clothingProgress.total + medicineProgress.total + dailyProgress.total)) * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreparationDrawer;