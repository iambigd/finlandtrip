import { Home, MapPin, AlertCircle, Receipt, UtensilsCrossed } from 'lucide-react';

interface MobileTabBarProps {
  onOpenEmergency: () => void;
  onOpenTaxRefund: () => void;
  onOpenFood: () => void;
}

const MobileTabBar = ({ onOpenEmergency, onOpenTaxRefund, onOpenFood }: MobileTabBarProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToCity = () => {
    const citySection = document.getElementById('city');
    if (citySection) {
      citySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl">
      <div className="grid grid-cols-5 h-16">
        {/* Home */}
        <button
          onClick={handleScrollToTop}
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition active:bg-gray-100"
        >
          <Home className="w-5 h-5 text-[#003580]" />
          <span className="text-[10px] font-sans text-gray-600">Home</span>
        </button>

        {/* City */}
        <button
          onClick={handleScrollToCity}
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition active:bg-gray-100"
        >
          <MapPin className="w-5 h-5 text-[#003580]" />
          <span className="text-[10px] font-sans text-gray-600">City</span>
        </button>

        {/* Food */}
        <button
          onClick={onOpenFood}
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition active:bg-gray-100"
        >
          <UtensilsCrossed className="w-5 h-5 text-[#003580]" />
          <span className="text-[10px] font-sans text-gray-600">Food</span>
        </button>

        {/* Tax Refund */}
        <button
          onClick={onOpenTaxRefund}
          className="flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition active:bg-gray-100"
        >
          <Receipt className="w-5 h-5 text-[#003580]" />
          <span className="text-[10px] font-sans text-gray-600">Tax</span>
        </button>

        {/* Emergency - 紅色顯眼 */}
        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center justify-center gap-1 hover:bg-red-50 transition active:bg-red-100"
        >
          <AlertCircle className="w-6 h-6 text-red-600" />
          <span className="text-[10px] font-sans text-red-600 font-bold">SOS</span>
        </button>
      </div>
    </div>
  );
};

export default MobileTabBar;