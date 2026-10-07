import React, { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { GalaxyMap } from './components/GalaxyMap';
import { GameScene } from './components/GameScene';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { HomeScreen } from './components/HomeScreen';
import { LogOut, User as UserIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const { user, setUser, activePlanetId, setActivePlanet } = useGameStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [hasStartedPlay, setHasStartedPlay] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return <AuthModal />;

  const isFirstTimeSetup = !user.age || !user.phone;

  const handleGoHome = () => {
    setActivePlanet(null);
    setHasStartedPlay(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative font-cute">
      {/* Nút Home góc trái - Đã sửa đường dẫn có BASE_URL */}
      {hasStartedPlay && activePlanetId === null && (
        <button
          onClick={handleGoHome}
          title="Quay lại Màn hình chính"
          className="absolute top-4 left-4 z-50 focus:outline-none cursor-pointer transition-transform hover:scale-110 active:scale-95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/icon_home.png`}
            alt="Home Icon"
            className="w-16 h-16 md:w-30 md:h-30 object-contain"
          />
        </button>
      )}

      {/* Cụm User góc phải */}
      {hasStartedPlay && (
        <div className="absolute top-4 right-4 z-50">
          <UserProfileWidget 
            user={user} 
            onOpenProfile={() => setIsProfileOpen(true)}
            onRequestLogout={() => setShowLogoutConfirm(true)}
          />
        </div>
      )}

      {!hasStartedPlay ? (
        <HomeScreen 
          onPlay={() => setHasStartedPlay(true)} 
          onOpenSettings={() => setIsProfileOpen(true)}
        />
      ) : activePlanetId === null ? (
        <GalaxyMap />
      ) : (
        <GameScene />
      )}

      {/* Modal Hồ Sơ cá nhân */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        isMandatory={isFirstTimeSetup} 
        onOpenSubscription={() => {
          setIsProfileOpen(false);
          setIsSubscriptionOpen(true);
        }}
      />

      {/* Modal Thanh Toán / Gói VIP Premium */}
      <SubscriptionModal 
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />

      {/* Modal Hỏi Lại Khi Bấm Đăng Xuất */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl text-white"
            >
              <AlertCircle size={48} className="text-amber-400 mx-auto mb-3 animate-bounce" />
              <h3 className="text-xl font-bold mb-2">Bạn có chắc muốn Đăng xuất?</h3>
              <p className="text-xs text-slate-400 mb-6">
                Mọi tiến trình chơi trong phiên hiện tại vẫn sẽ được lưu an toàn.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Ở lại
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const UserProfileWidget: React.FC<{
  user: any;
  onOpenProfile: () => void;
  onRequestLogout: () => void;
}> = ({ user, onOpenProfile, onRequestLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      className="bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md rounded-full p-1.5 flex items-center gap-2 transition-all duration-300"
    >
      <button
        onClick={onOpenProfile}
        className="w-9 h-9 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0 hover:scale-105 transition-transform cursor-pointer"
        title="Hồ sơ cá nhân"
      >
        <UserIcon size={18} />
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 overflow-hidden pr-2 whitespace-nowrap"
          >
            <button
              onClick={onOpenProfile}
              className="text-left text-xs hover:text-pink-300 transition-colors cursor-pointer"
            >
              <span className="font-bold text-pink-400 block leading-tight">
                {user.displayName || 'Bé Ngoan'}
              </span>
              <span className="text-[10px] text-slate-400">
                {user.age ? `${user.age} tuổi` : 'Hồ sơ'}
              </span>
            </button>

            <div className="w-px h-5 bg-slate-800 my-auto mx-1" />

            <button
              onClick={onRequestLogout}
              title="Đăng xuất"
              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;