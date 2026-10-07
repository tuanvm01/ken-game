import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';
import { ProfileModal } from './ProfileModal';
import { LeaderboardModal } from './LeaderboardModal';
import { SubscriptionModal } from './SubscriptionModal';

interface HomeScreenProps {
  onPlay: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPlay, onOpenSettings }) => {
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
        src={`${import.meta.env.BASE_URL}images/homepagebg.jpg`} 
        alt="Vũ trụ" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}images/homepagebg.png`; }}
      />

      {/* ================= 2. CỤM HÀNH TINH & NẤM ================= */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -bottom-16 -left-16 md:-bottom-28 md:-left-24 w-[115vw] md:w-[90vw] max-w-[1500px] z-10 pointer-events-none"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/Homepage_htinh.png`} 
          alt="Hành tinh"
          className="w-full h-auto object-contain"
          onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}images/Homepage_htinh.jpg`; }}
        />

        <motion.img
          src={`${import.meta.env.BASE_URL}images/Homepage_nam.png`}
          alt="Cây nấm"
          animate={{ 
            scaleX: [1, 1.05, 0.95, 1.03, 1],
            scaleY: [1, 0.95, 1.05, 0.97, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-3%] left-[7%] w-[95%] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] origin-bottom"
        />
      </motion.div>

      {/* ================= 3. CHỮ KÉN ================= */}
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

      {/* ================= 4. NÚT PLAY VÀ SETTING ================= */}
      <div className="absolute bottom-8 right-10 md:right-20 lg:right-28 z-50 flex flex-row items-center gap-6">
        
        {/* Nút Play (Bên trái): Gọi onPlay để vào game */}
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
          <img src={`${import.meta.env.BASE_URL}images/btn_play.png`} alt="Bắt đầu chơi" className="h-30 md:h-54 lg:h-58 w-auto object-contain" />
        </motion.button>

        {/* Nút Setting (Bên phải): Gọi mở Cài đặt (Hoặc mở Profile tùy logic của bạn, ở đây gọi onOpenSettings) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playPop();
            // Mở Cài đặt âm thanh (hoặc bạn có thể đổi thành setProfileOpen(true) nếu muốn mở Profile)
            onOpenSettings();
          }}
          className="cursor-pointer focus:outline-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-shadow hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        >
          <img src={`${import.meta.env.BASE_URL}images/btn_setting.png`} alt="Cài đặt" className="h-30 md:h-54 lg:h-58 w-auto object-contain" />
        </motion.button>

      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} onOpenSubscription={() => setSubOpen(true)} />
      <LeaderboardModal />
      <SubscriptionModal isOpen={isSubOpen} onClose={() => setSubOpen(false)} />
      
    </div>
  );
};