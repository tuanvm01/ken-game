import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock, Star, Trophy, Lightbulb } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { GAME_DATA } from '../data/mockGameData';
import { soundManager } from '../utils/audio';
import { LeaderboardModal } from './LeaderboardModal';

type DisplayPlanet = {
  id: string;
  title: string;
  color: string;
  icon: string;
  thumbnail: string;
  scenarios: any[];
  isDummy: boolean;
};

export const GalaxyMap: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomingPlanet, setZoomingPlanet] = useState<DisplayPlanet | null>(null);
  
  const { setActivePlanet, completedPlanetIds, setLeaderboardOpen, user } = useGameStore();

  const ITEMS_PER_PAGE = 5; 
  const TOTAL_PLANETS = 6;
  const totalPages = Math.ceil(TOTAL_PLANETS / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    soundManager.playPop();
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    soundManager.playPop();
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSelectPlanet = (planet: DisplayPlanet, isUnlocked: boolean) => {
    if (planet.isDummy || !isUnlocked) {
      soundManager.playWrong();
      return;
    }
    soundManager.playPop();
    setZoomingPlanet(planet);
    
    setTimeout(() => {
      setActivePlanet(planet.id);
      setZoomingPlanet(null);
    }, 1500);
  };

  const displayPlanets: DisplayPlanet[] = Array.from({ length: TOTAL_PLANETS }).map((_, idx) => {
    if (idx < GAME_DATA.length) {
      return { ...GAME_DATA[idx], isDummy: false };
    }
    return { 
      id: `locked-planet-${idx}`, 
      title: 'Sắp ra mắt', 
      color: 'bg-slate-800', 
      icon: 'Lock', 
      thumbnail: '', 
      scenarios: [], 
      isDummy: true 
    };
  });

  const currentPlanets = displayPlanets.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div 
      className="min-h-screen flex flex-col font-cute select-none bg-cover bg-center overflow-hidden relative"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/Figma/BG.png')` }}
    >
      
      {/* ================= HEADER TUYỆT ĐỐI CÙNG HÀNG VỚI APP.TSX ================= */}
      
      {/* Tiêu đề góc trái (Ngang hàng tuyệt đối với nút Home ở top-4 left-4) */}
      <div className="absolute top-8 left-20 md:left-150 z-40 pointer-events-none pr-4 justify center items-center flex flex-col text-left">
        <h1 className="text-2xl md:text-[32px] lg:text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wide mb-0.5">
          Dải Ngân Hà Kỹ Năng
        </h1>
        <p className="text-slate-200 text-[10px] md:text-xs lg:text-sm font-bold drop-shadow-md">
          Bay qua từng hành tinh, thu thập sao và mở khóa chuyến thám hiểm mới!
        </p>
      </div>

      {/* Cụm công cụ góc phải (Ngang hàng tuyệt đối với nút Avatar ở top-4 right-4) */}
      <div className="absolute top-5 right-[65px] md:right-[75px] z-40 flex items-center gap-2 md:gap-3">
        {/* Nút Số Sao Của User */}
        <div className="bg-[#FFC72C] text-[#1A0B2E] px-3 md:px-4 py-1.5 md:py-2 rounded-full font-black flex items-center gap-1.5 md:gap-2 shadow-[0_4px_0_#D9A016]">
          <Star size={16} className="fill-[#1A0B2E] w-4 h-4 md:w-5 md:h-5" /> 
          <span className="text-xs md:text-sm lg:text-base">{user?.totalScore !== undefined ? user.totalScore : 0}</span>
        </div>
        
        
        {/* Nút Leaderboard (Cúp) */}
        <button 
          onClick={() => {
            soundManager.playPop();
            setLeaderboardOpen(true);
          }}
          className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full border-2 border-white/60 text-white bg-slate-900/30 flex items-center justify-center hover:bg-white/20 transition-colors shadow-md cursor-pointer backdrop-blur-sm"
          title="Bảng xếp hạng"
        >
          <Trophy size={16} className="lg:w-[18px] lg:h-[18px]" />
        </button>
      </div>

      {/* ================= VÙNG BẢN ĐỒ CHÍNH ================= */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center overflow-x-auto overflow-y-hidden custom-scrollbar pt-12 md:pt-16">
        
        {/* Container chứa bản đồ (Đảm bảo tối thiểu 1000px để không bị bóp méo trên mobile) */}
        <div className="relative w-full min-w-[1000px] h-[550px] md:h-[650px] mx-auto">
          
          {/* ĐƯỜNG ĐỨT NÉT (FULL 100% WIDTH BẰNG TOÁN HỌC SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Sử dụng đường cong Quadratic/Cubic Bezier để tạo sóng khớp hoàn hảo với 10%, 30%, 50%, 70%, 90% */}
            <path 
              d="M -20 50 Q -10 15 0 50 T 20 50 T 40 50 T 60 50 T 80 50 T 100 50 T 120 50" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="4" 
              strokeDasharray="14 14" 
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke" // Đảm bảo nét đứt không bị biến dạng khi SVG kéo dãn
            />
          </svg>

          {/* CÁC HÀNH TINH (Được neo chính xác vào tọa độ của đường sóng) */}
          {currentPlanets.map((planet, idx) => {
            const globalIndex = currentPage * ITEMS_PER_PAGE + idx;
            let isUnlocked = false;
            
            if (!planet.isDummy) {
              isUnlocked = globalIndex === 0 || completedPlanetIds.includes(GAME_DATA[globalIndex - 1].id);
            }

            // Tọa độ X tương ứng với đỉnh/đáy của đường sóng (10%, 30%, 50%, 70%, 90%)
            const xPos = 10 + idx * 20; 
            
            // Tọa độ Y: isUp = true sẽ nằm trên, false sẽ nằm dưới
            const isUp = idx % 2 !== 0; 
            const yPos = isUp ? 32.5 : 67.5; 

            return (
              <div
                key={planet.id}
                className="absolute flex flex-col items-center group w-[170px] md:w-[220px]"
                // Neo chính giữa component vào đúng tọa độ của đường sóng
                style={{ left: `${xPos}%`, top: `${yPos}%`, transform: 'translate(-50%, -50%)' }}
              >
                
                {/* Hành tinh bay lơ lửng */}
                <motion.div
                   initial={{ y: 0 }}
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 3 + (idx * 0.5), ease: "easeInOut" }}
                   className="relative mb-3 flex flex-col items-center cursor-pointer"
                   onClick={() => handleSelectPlanet(planet, isUnlocked)}
                >
                  {/* Số thứ tự */}
                  <div className="absolute -top-1 -left-1 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 bg-[#4D3196] border-[3px] border-white text-white rounded-full flex items-center justify-center font-black text-sm md:text-base z-30 shadow-lg">
                     {globalIndex + 1}
                  </div>

                  {/* Vòng khóa nếu chưa mở (nhỏ gọn) */}
                  {!isUnlocked && !planet.isDummy && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-slate-800/90 border-2 border-white/50 text-white rounded-full flex items-center justify-center z-30 shadow-md backdrop-blur-sm">
                       <Lock size={12} />
                    </div>
                  )}

                  {/* Size Hành tinh rất to: w-40 h-40 đến w-52 h-52 */}
                  <div className={`relative w-36 h-36 md:w-52 md:h-52 z-20 transition-transform duration-300 ${isUnlocked && !planet.isDummy ? 'group-hover:scale-105' : ''}`}>
                    {isUnlocked && !planet.isDummy && (
                      <div className="absolute inset-0 bg-[#A78BFA] blur-3xl rounded-full opacity-40 animate-pulse" />
                    )}
                    
                    {!isUnlocked || planet.isDummy ? (
                      // Ẩn thành Hành tinh dấu "?" cực ngầu
                      <div className="w-full h-full rounded-full bg-slate-900/80 border-[4px] border-slate-600 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-md">
                        <span className="text-[60px] md:text-[80px] font-black text-slate-500 drop-shadow-xl opacity-70">?</span>
                      </div>
                    ) : (
                      // Hiện hành tinh thật
                      <img 
                        src={planet.thumbnail.startsWith('http') ? planet.thumbnail : `${import.meta.env.BASE_URL}${planet.thumbnail.startsWith('/') ? planet.thumbnail.slice(1) : planet.thumbnail}`} 
                        alt={planet.title} 
                        className="w-full h-full object-cover rounded-full drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] relative z-10"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Thẻ Thông tin (Card) dưới hành tinh */}
                <div className="relative w-full flex flex-col items-center z-20">
                  {/* Nắp Thẻ (Hình thang chứa sao) */}
                  <div 
                    className={`text-white px-4 py-2 pb-4 -mb-3 z-10 flex flex-col items-center justify-center shadow-md ${
                      isUnlocked && !planet.isDummy ? 'bg-[#5B42F3]' : 'bg-[#3A2475]'
                    }`}
                    style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)', width: '80%' }}
                  >
                    <div className="flex gap-1.5 mb-1 opacity-90">
                       <Star size={12} className="fill-amber-300 text-amber-300" />
                       <Star size={12} className="fill-amber-300 text-amber-300" />
                       <Star size={12} className="fill-amber-300 text-amber-300" />
                    </div>
                  </div>

                  {/* Thân Thẻ */}
                  <div className="bg-[#FFF8E7] w-full rounded-2xl pt-5 pb-3 px-2 text-center shadow-xl relative z-20 border-b-[5px] border-slate-300 flex flex-col items-center justify-center min-h-[90px]">
                    <h4 className="text-xs md:text-sm font-black text-[#1A0B2E] mb-2 uppercase tracking-wide">
                      {planet.isDummy ? 'SẮP RA MẮT' : `HÀNH TINH 0${globalIndex + 1}`}
                    </h4>
                    
                    {isUnlocked && !planet.isDummy ? (
                      <button
                        onClick={() => handleSelectPlanet(planet, isUnlocked)}
                        className="w-[90%] py-1.5 md:py-2.5 rounded-full font-black text-xs md:text-sm flex items-center justify-center gap-1 transition-all bg-[#FFC72C] text-[#1A0B2E] shadow-[0_4px_0_#D9A016] hover:translate-y-[2px] hover:shadow-[0_2px_0_#D9A016] cursor-pointer"
                      >
                        Cất cánh <ChevronRight size={16} strokeWidth={3} />
                      </button>
                    ) : (
                      <div className="w-[90%] font-bold text-[10px] md:text-[11px] leading-tight flex items-center justify-center text-slate-500 px-1 text-center h-[36px]">
                        Cần mở khóa hành tinh trước
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= ĐIỀU HƯỚNG BÊN NGOÀI BẢN ĐỒ ================= */}
      {/* Nút Lùi Trang */}
      <button 
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        className={`absolute top-1/2 left-2 md:left-6 -translate-y-1/2 p-3 md:p-4 rounded-full text-white transition-all z-40 ${
          currentPage === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer bg-slate-900/60 shadow-lg backdrop-blur-md border border-white/20'
        }`}
      >
        <ChevronLeft size={32} />
      </button>

      {/* Nút Tiến Trang */}
      <button 
        onClick={handleNextPage}
        disabled={currentPage >= totalPages - 1}
        className={`absolute top-1/2 right-2 md:right-6 -translate-y-1/2 p-3 md:p-4 rounded-full text-white transition-all z-40 ${
          currentPage >= totalPages - 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer bg-slate-900/60 shadow-lg backdrop-blur-md border border-white/20'
        }`}
      >
        <ChevronRight size={32} />
      </button>

      {/* ================= THANH TIẾN TRÌNH ================= */}
      <div className="absolute bottom-4 left-8 md:left-12 z-40 flex flex-col gap-1">
         <span className="text-white font-black text-xs md:text-sm tracking-wide drop-shadow-md">
           {currentPage + 1}/{totalPages} Trang
         </span>
         <div className="w-32 md:w-48 h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-md border border-white/10">
            <motion.div 
              className="h-full bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
         </div>
      </div>

      <LeaderboardModal />

      {/* ================= ANIMATION ZOOM HÀNH TINH ================= */}
      <AnimatePresence>
        {zoomingPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/BG1.png')` }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: [0.5, 1.2, 4], rotate: [-5, 5, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative flex flex-col items-center"
            >
              <img 
                src={zoomingPlanet.thumbnail.startsWith('http') ? zoomingPlanet.thumbnail : `${import.meta.env.BASE_URL}${zoomingPlanet.thumbnail.startsWith('/') ? zoomingPlanet.thumbnail.slice(1) : zoomingPlanet.thumbnail}`} 
                alt="Zooming Planet" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full drop-shadow-[0_0_80px_rgba(255,255,255,1)]"
              />
              <div className="absolute inset-0 rounded-full border-[8px] border-white/50 shadow-[inset_0_0_50px_rgba(255,255,255,0.8)] animate-ping"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};