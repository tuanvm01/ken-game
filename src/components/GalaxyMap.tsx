import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock, CheckCircle, Trophy } from 'lucide-react';
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
  const { setActivePlanet, completedPlanetIds, setLeaderboardOpen } = useGameStore();

  const ITEMS_PER_PAGE = 3;
  const TOTAL_PLANETS = 6; // Đã tăng lên 6 để hiển thị thêm hành tinh Coming Soon ở cuối
  const totalPages = Math.ceil(TOTAL_PLANETS / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    soundManager.playPop();
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    soundManager.playPop();
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleSelectPlanet = (planetId: string, isUnlocked: boolean, isDummy: boolean) => {
    if (isDummy) {
      soundManager.playWrong();
      return;
    }
    if (isUnlocked) {
      soundManager.playPop();
      setActivePlanet(planetId);
    } else {
      soundManager.playWrong();
    }
  };

  const displayPlanets: DisplayPlanet[] = Array.from({ length: TOTAL_PLANETS }).map((_, idx) => {
    if (idx < GAME_DATA.length) {
      return { ...GAME_DATA[idx], isDummy: false };
    }
    return { 
      id: `locked-planet-${idx}`, 
      title: 'Coming Soon', 
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-cute select-none bg-slate-900">
      
      {/* Background Ảnh Galaxy */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/bg_galaxy.png')` }}
      >
        <div className="absolute inset-0 bg-slate-950/40"></div>
      </div>

      {/* Nút mở Bảng Xếp Hạng ở góc trên bản đồ */}
      <button
        onClick={() => {
          soundManager.playPop();
          setLeaderboardOpen(true);
        }}
        className="absolute top-6 right-20 md:right-24 z-30 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Trophy size={18} />
        <span className="text-xs md:text-sm">Bảng Xếp Hạng</span>
      </button>

      {/* Header */}
      <div className="z-10 mb-4 md:mb-8 text-center mt-8">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Bản Đồ Vũ Trụ
        </h1>
        <p className="text-white mt-3 font-bold text-base md:text-lg drop-shadow-md">
          Hãy chọn một hành tinh để khám phá kiến thức nhé!
        </p>
      </div>

      {/* Khung chứa chính: Đẩy 2 nút tiến/lùi dạt sát rìa bằng justify-between và mở rộng tối đa màn hình */}
      <div className="z-10 flex items-center justify-between w-full max-w-[96rem] px-4 md:px-12 flex-1">
        
        {/* Nút Lùi (Sát rìa trái) */}
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`p-3 md:p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all z-20 shrink-0 ${
            currentPage === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.3)]'
          }`}
        >
          <ChevronLeft size={44} className="text-white" />
        </button>

        {/* Lưới hiển thị Hành tinh (Giãn khoảng cách rộng rãi gap-12 md:gap-24) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 place-items-center px-4">
          <AnimatePresence mode="wait">
            {currentPlanets.map((planet, idx) => {
              const globalIndex = currentPage * ITEMS_PER_PAGE + idx;
              
              let isUnlocked = false;
              let isCompleted = false;

              if (!planet.isDummy) {
                isUnlocked = globalIndex === 0 || completedPlanetIds.includes(GAME_DATA[globalIndex - 1].id);
                isCompleted = completedPlanetIds.includes(planet.id);
              }

              return (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="flex flex-col items-center gap-6 relative group"
                >
                  <button
                    onClick={() => handleSelectPlanet(planet.id, isUnlocked, planet.isDummy)}
                    className="relative focus:outline-none"
                  >
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5 + idx * 0.5, ease: "easeInOut" }}
                      className={`relative w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center transition-all ${
                        isUnlocked && !planet.isDummy ? 'cursor-pointer hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]' : 'cursor-not-allowed grayscale-[0.5] opacity-80'
                      }`}
                    >
                      {isUnlocked && !planet.isDummy && (
                        <div className={`absolute inset-0 rounded-full blur-3xl opacity-50 ${planet.color}`} />
                      )}
                      
                      {isUnlocked && !isCompleted && !planet.isDummy && (
                        <div className="absolute inset-0 rounded-full animate-ping opacity-60 bg-amber-400" />
                      )}

                      {planet.isDummy || !isUnlocked ? (
                        <div className="w-full h-full rounded-full bg-slate-800 border-4 border-slate-600 flex flex-col items-center justify-center shadow-inner z-10">
                          <span className="text-8xl md:text-9xl font-black text-slate-500 opacity-50 mb-4 md:mb-6">?</span>
                          <Lock className="text-slate-400 absolute bottom-8 md:bottom-10" size={36} />
                        </div>
                      ) : (
                        <img 
                          src={planet.thumbnail.startsWith('http') ? planet.thumbnail : `${import.meta.env.BASE_URL}${planet.thumbnail.startsWith('/') ? planet.thumbnail.slice(1) : planet.thumbnail}`} 
                          alt={planet.title} 
                          className="w-full h-full object-cover rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10 border-[4px] border-white/30"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/png?text=Planet+${globalIndex + 1}`;
                          }}
                        />
                      )}

                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-3 z-20 border-4 border-slate-900 shadow-xl">
                          <CheckCircle size={40} />
                        </div>
                      )}
                    </motion.div>
                  </button>

                  <div className={`px-8 py-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.6)] z-20 whitespace-nowrap transition-colors ${
                    isUnlocked && !planet.isDummy
                      ? 'bg-slate-900/90 border-2 border-pink-400' 
                      : 'bg-slate-800/90 border-2 border-slate-600'
                  }`}>
                    <span className={`font-black text-lg md:text-xl tracking-wide ${
                      isUnlocked && !planet.isDummy ? 'text-amber-300' : 'text-slate-400'
                    }`}>
                      {planet.isDummy ? 'Coming Soon' : (!isUnlocked ? 'Hành tinh Khóa' : planet.title)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Nút Tiến (Sát rìa phải) */}
        <button 
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`p-3 md:p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all z-20 shrink-0 ${
            currentPage >= totalPages - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.3)]'
          }`}
        >
          <ChevronRight size={44} className="text-white" />
        </button>

      </div>

      {/* Dấu chấm chỉ báo phân trang */}
      <div className="mt-8 mb-6 flex gap-4 z-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div 
            key={i} 
            className={`h-3.5 rounded-full transition-all duration-300 shadow-sm ${
              i === currentPage ? 'w-12 bg-amber-400' : 'w-3.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Modal Bảng Xếp Hạng */}
      <LeaderboardModal />
    </div>
  );
};