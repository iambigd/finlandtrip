const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 p-4 bg-[#fdfbf7]/95 backdrop-blur-sm shadow-sm flex justify-between items-center text-[#111] font-sans text-xs uppercase tracking-widest">
      <div className="font-bold text-sm">ARCTIC CHRONICLE: FINLAND 極地日誌</div>
      <div className="space-x-4">
        <a href="#map" className="hover:text-[#d4af37] transition">
          旅程地圖
        </a>
        <a href="#prep" className="hover:text-[#d4af37] transition">
          行前準備
        </a>
        <a href="#city" className="hover:text-[#d4af37] transition">
          赫爾辛基
        </a>
        <a href="#arctic" className="hover:text-[#d4af37] transition">
          北極圈
        </a>
        <a href="#food" className="hover:text-[#d4af37] transition">
          美食體驗
        </a>
      </div>
    </nav>
  );
};

export default Navigation;