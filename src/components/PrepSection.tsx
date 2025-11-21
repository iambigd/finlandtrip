import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: number;
  name: string;
  checked: boolean;
  tip: string;
}

const PrepSection = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 1,
      name: '機能保暖內層 (必備)',
      checked: localStorage.getItem('check_1') === 'true',
      tip: '體感溫度是關鍵！保暖內層是抵抗寒冷的第一道防線。',
    },
    {
      id: 2,
      name: '防水雪靴 / 保暖羊毛襪',
      checked: localStorage.getItem('check_2') === 'true',
      tip: '腳暖全身暖！雪靴和羊毛襪千萬別省。',
    },
    {
      id: 3,
      name: '圍巾 / 毛帽 / 防水手套',
      checked: localStorage.getItem('check_3') === 'true',
      tip: '手套要防水，玩雪時才不會凍傷！',
    },
    {
      id: 4,
      name: '轉接頭 / 多孔充電器',
      checked: localStorage.getItem('check_4') === 'true',
      tip: '在寒冷的天氣中電池消耗很快，請多帶充電設備。',
    },
    {
      id: 5,
      name: '護照 / 機票 / 保險文件',
      checked: localStorage.getItem('check_5') === 'true',
      tip: '這不用說，但它是最重要的！',
    },
    {
      id: 6,
      name: '保濕乳液 / 護唇膏 (芬蘭乾燥)',
      checked: localStorage.getItem('check_6') === 'true',
      tip: '芬蘭空氣非常乾燥，記得加強保濕！',
    },
  ]);
  const [pendingTip, setPendingTip] = useState<string | null>(null);

  // Dispatch Tonttu event after render is complete
  useEffect(() => {
    if (pendingTip) {
      const event = new CustomEvent('tonttu:checklist-tip', {
        detail: { tip: pendingTip },
      });
      window.dispatchEvent(event);
      setPendingTip(null);
    }
  }, [pendingTip]);

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newChecked = !item.checked;
          localStorage.setItem(`check_${id}`, String(newChecked));

          // Schedule Tonttu tip event
          if (newChecked) {
            setPendingTip(item.tip);
          }

          return { ...item, checked: newChecked };
        }
        return item;
      })
    );
  };

  return (
    <section id="prep" className="py-24 bg-[#fdfbf7] max-w-7xl mx-auto px-6 border-t border-gray-100 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-1">
          <h2 className="text-5xl font-serif text-[#111] mb-6">
            Preparation
            <br />
            <span className="italic text-[#d4af37]">Checklist</span>
            <span className="dual-title-zh text-lg uppercase text-gray-600">行前準備清單</span>
          </h2>
          <p className="font-sans text-sm text-gray-600">
            在旅程開始前，請確認您的行囊已備齊，足以對抗北極的酷寒。
          </p>
        </div>
        <div className="md:col-span-2 space-y-4">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleCheck(item.id)}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}}
                className="w-5 h-5 text-[#003580] border-gray-300 rounded focus:ring-[#003580] mr-4 pointer-events-none"
              />
              <span
                className={`font-sans text-base ${
                  item.checked ? 'line-through text-gray-500' : ''
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-3xl font-serif italic mb-4 text-[#003580]">
            Tax Refund Guide <span className="dual-title-zh text-sm text-gray-700">退稅指南</span>
          </h3>
          <p className="font-serif text-lg leading-relaxed text-gray-700 drop-cap">
            <span className="drop-cap">在</span>芬蘭，單筆消費超過{' '}
            <span className="text-[#d4af37] font-bold">40 歐元</span>{' '}
            即可享有退稅資格。購物時請務必索取退稅單 (Tax Free
            form)。在赫爾辛基機場，請先前往出境大廳的退稅櫃台蓋章，再憑單據領取現金或信用卡退款。
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-serif italic mb-4 text-[#003580]">
            Emergency Contacts <span className="dual-title-zh text-sm text-gray-700">緊急聯絡資訊</span>
          </h3>
          <p className="font-serif text-lg leading-relaxed text-gray-700 drop-cap">
            <span className="drop-cap">我</span>
            們已投保富邦旅遊平安險和 AXA 申根保險。若遇緊急狀況，請聯絡台灣駐芬蘭代表處（急難救助專線：
            <span className="text-[#003580] font-bold">+358-40-5455429</span>
            ）。芬蘭境內緊急電話請撥打 <span className="text-red-600 font-bold">112</span>。
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrepSection;
