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
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -bottom-12 left-0 md:-bottom-20 md:left-2 w-[126vw] md:w-[98vw] max-w-[1680px] z-10 pointer-events-none"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/homepage_tachnen.png`} 
          alt="Hành tinh"
          className="w-full h-auto object-contain"
          onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}images/Homepage_htinh.jpg`; }}
        />
      </motion.div>

      {/* ================= CHỮ KÉN & CỤM NÚT ĐIỀU HƯỚNG ================= */}
      <div className="absolute right-8 md:right-24 lg:right-36 top-65 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
        
        {/* Chữ KÉN */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none flex justify-center mb-2"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/chuKen.png`} 
            alt="Kén"
            className="w-98 md:w-[630px] lg:w-[700px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}images/Homepage_htinh.jpg`; }}
          />
        </motion.div>

        {/* Cụm Nút Play & Setting (Kéo cực sát nhau) */}
        <div className="absolute top-135 flex flex-col items-center -space-y-32 md:-space-y-38 lg:-space-y-46 z-50">
          
          {/* Nút Play */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playPop();
              soundManager.playBgm();
              onPlay(); 
            }}
            className="cursor-pointer focus:outline-none drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-shadow hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] relative z-10"
          >
            <img src={`${import.meta.env.BASE_URL}images/btn_play.png`} alt="Bắt đầu chơi" className="h-36 md:h-58 lg:h-80 w-auto object-contain" />
          </motion.button>

          {/* Nút Setting */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playPop();
              onOpenSettings();
            }}
            className="cursor-pointer focus:outline-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-shadow hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] relative z-0"
          >
            <img src={`${import.meta.env.BASE_URL}images/btn_setting.png`} alt="Cài đặt" className="h-36 md:h-58 lg:h-80 w-auto object-contain" />
          </motion.button>

        </div>
      </div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} onOpenSubscription={() => setSubOpen(true)} />
      <LeaderboardModal />
      <SubscriptionModal isOpen={isSubOpen} onClose={() => setSubOpen(false)} />
      
    </div>
  );
};