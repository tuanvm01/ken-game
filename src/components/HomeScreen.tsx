import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { ProfileModal } from './ProfileModal';
import { LeaderboardModal } from './LeaderboardModal';
import { SubscriptionModal } from './SubscriptionModal';
import { useGameStore } from '../store/useGameStore';

interface HomeScreenProps {
  onPlay: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPlay, onOpenSettings }) => {
  const { setLeaderboardOpen } = useGameStore();
  
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);

  useEffect(() => {
    soundManager.playBgm();
  }, []);

  const handleScreenInteraction = () => {
    soundManager.playBgm();
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-slate-950 font-cute select-none"
      onClick={handleScreenInteraction}
    >
      
      {/* ================= 1. BACKGROUND ================= */}
      <img 
        src="/images/homepagebg.jpg" 
        alt="Vũ trụ" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => { e.currentTarget.src = "/images/homepagebg.png"; }}
      />

      {/* ================= 2. CỤM HÀNH TINH & NẤM ================= */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -bottom-16 -left-16 md:-bottom-28 md:-left-24 w-[115vw] md:w-[90vw] max-w-[1500px] z-10 pointer-events-none"
      >
        <img
          src="/images/Homepage_htinh.png" 
          alt="Hành tinh"
          className="w-full h-auto object-contain"
          onError={(e) => { e.currentTarget.src = "/images/Homepage_htinh.jpg"; }}
        />

        <motion.img
          src="/images/Homepage_nam.png"
          alt="Cây nấm"
          animate={{ 
            scaleX: [1, 1.05, 0.95, 1.03, 1],
            scaleY: [1, 0.95, 1.05, 0.97, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-3%] left-[7%] w-[95%] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] origin-bottom"
        />
      </motion.div>

      {/* ================= 3. GÓC TRÊN BÊN PHẢI: VIP & XẾP HẠNG (Đã ẩn hoàn toàn nút profile tròn) ================= */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPop();
            setSubOpen(true);
          }}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 px-5 py-2.5 rounded-2xl font-black text-sm md:text-base flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
        >
          <Crown size={20} /> VIP
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPop();
            setLeaderboardOpen(true);
          }}
          className="bg-slate-900/80 border border-slate-700 hover:bg-slate-800 text-amber-400 p-3 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Trophy size={22} />
        </button>
      </div>

      {/* ================= 4. CHỮ KÉN (Bo tròn, đáng yêu, không có tên lửa) ================= */}
      <div className="absolute right-12 md:right-52 bottom-[45%] md:bottom-[48%] z-40 text-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 drop-shadow-[0_10px_25px_rgba(236,72,153,0.8)] filter drop-shadow(0 0 35px rgba(234,179,8,0.5)) font-sans">
            KÉN
          </h1>
        </motion.div>
      </div>

      {/* ================= 5. NÚT PLAY VÀ SETTING (Góc dưới bên phải) ================= */}
      <div className="absolute bottom-8 right-10 md:right-20 lg:right-28 z-50 flex flex-row items-center gap-6">
        
        {/* Nút SETTING */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPop();
            setProfileOpen(true);
          }}
          className="cursor-pointer focus:outline-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-shadow hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        >
          <img src="/images/btn_setting.png" alt="Cài đặt" className="h-30 md:h-54 lg:h-58 w-auto object-contain" />
        </motion.button>

        {/* Nút PLAY */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPop();
            soundManager.playBgm();
            onPlay(); 
          }}
          className="cursor-pointer focus:outline-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-shadow hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]"
        >
          <img src="/images/btn_play.png" alt="Bắt đầu chơi" className="h-30 md:h-54 lg:h-58 w-auto object-contain" />
        </motion.button>

      </div>

      {/* ================= 6. MODALS ================= */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} onOpenSubscription={() => setSubOpen(true)} />
      <LeaderboardModal />
      <SubscriptionModal isOpen={isSubOpen} onClose={() => setSubOpen(false)} />
      
    </div>
  );
};