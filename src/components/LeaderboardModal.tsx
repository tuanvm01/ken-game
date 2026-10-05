import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, Calendar, Award, Flame, Trophy, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';

// Component trang trí nền Vũ trụ (Đã tách riêng và tối ưu)
const SpaceBackground = () => {
  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`,
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 2 + 1}s`
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div 
          key={star.id} 
          className="absolute bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }} 
        />
      ))}
    </div>
  );
};

// ĐỔI TÊN LẠI THÀNH LeaderboardModal ĐỂ KHÔNG BỊ LỖI IMPORT
export const LeaderboardModal: React.FC = () => {
  const { isLeaderboardOpen, setLeaderboardOpen, user } = useGameStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const userScore = user?.totalScore || 1450;

  // Dữ liệu mẫu Tuần
  const weeklyRankings = [
    { name: 'Bảo Ngọc', score: 4800, rank: '🚀 Chuyên Gia', avatar: '👧', streak: 9 },
    { name: user?.displayName || 'Bé Ngoan', score: userScore, rank: '⭐ Phi Hành Gia', avatar: '👦', streak: 7, isMe: true },
    { name: 'Gia Hân', score: 2950, rank: '⭐ Phi Hành Gia', avatar: '👧', streak: 6 },
    { name: 'Minh Khôi', score: 1600, rank: '🌱 Bé Tập Sự', avatar: '👦', streak: 4 },
    { name: 'Diệu Linh', score: 950, rank: '🌱 Bé Tập Sự', avatar: '👧', streak: 2 },
    { name: 'Tuấn Kiệt', score: 800, rank: '🌱 Bé Tập Sự', avatar: '👦', streak: 1 },
    { name: 'Hải Đăng', score: 500, rank: '🌱 Bé Tập Sự', avatar: '👦', streak: 1 },
  ].sort((a, b) => b.score - a.score);

  // Dữ liệu mẫu Tháng
  const monthlyRankings = [
    { name: 'Bảo Ngọc', score: 15400, rank: '🌟 Vua Khám Phá', avatar: '👧', streak: 28 },
    { name: 'Gia Hân', score: 12900, rank: '🚀 Chuyên Gia', avatar: '👧', streak: 25 },
    { name: user?.displayName || 'Bé Ngoan', score: userScore * 3, rank: '🚀 Chuyên Gia', avatar: '👦', streak: 20, isMe: true },
    { name: 'Minh Khôi', score: 8600, rank: '⭐ Phi Hành Gia', avatar: '👦', streak: 15 },
    { name: 'Diệu Linh', score: 5400, rank: '⭐ Phi Hành Gia', avatar: '👧', streak: 10 },
  ].sort((a, b) => b.score - a.score);

  const rankings = activeTab === 'weekly' ? weeklyRankings : monthlyRankings;
  const top1 = rankings[0];
  const top2 = rankings[1];
  const top3 = rankings[2];
  const others = rankings.slice(3);

  return (
    <AnimatePresence>
      {isLeaderboardOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 w-full h-full font-cute select-none overflow-y-auto overflow-x-hidden bg-[#0A0B1A] text-white custom-scrollbar"
        >
          {/* Nền vũ trụ */}
          <SpaceBackground />

          {/* Header & Nút Trở Về */}
          <div className="relative z-10 w-full p-4 sm:p-6 flex items-center justify-between">
            <button
              onClick={() => {
                soundManager.playPop();
                setLeaderboardOpen(false);
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/20 backdrop-blur-md px-4 py-2.5 rounded-full font-bold transition-all active:scale-95 group shadow-lg"
            >
              <ChevronLeft size={24} className="text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline text-lg">Quay Lại</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-900/50 border-2 border-amber-500/30 backdrop-blur-md px-4 py-2.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Star size={20} className="fill-amber-400 text-amber-500" />
              <span className="font-black text-amber-400 text-lg">{userScore} XP</span>
            </div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center pt-2 pb-24 px-4">
            
            {/* Tiêu đề */}
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 rounded-[2rem] shadow-[0_0_30px_rgba(245,158,11,0.5)] border-4 border-white/20 mb-4 animate-bounce">
                <Trophy size={40} className="text-white drop-shadow-md" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                BẢNG XẾP HẠNG
              </h1>
              <p className="text-lg sm:text-xl text-indigo-200 mt-2 font-bold flex items-center justify-center gap-2">
                <Sparkles size={20} className="text-amber-300" /> Các siêu sao vũ trụ <Sparkles size={20} className="text-amber-300" />
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex bg-slate-800/60 p-2 rounded-full border-2 border-slate-700/50 backdrop-blur-md mb-16 w-full max-w-sm mx-auto shadow-xl">
              <button
                onClick={() => { soundManager.playPop(); setActiveTab('weekly'); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-base sm:text-lg font-black transition-all ${
                  activeTab === 'weekly'
                    ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-slate-900 shadow-[0_4px_15px_rgba(245,158,11,0.5)] scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar size={20} /> Tuần Này
              </button>
              <button
                onClick={() => { soundManager.playPop(); setActiveTab('monthly'); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-base sm:text-lg font-black transition-all ${
                  activeTab === 'monthly'
                    ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-slate-900 shadow-[0_4px_15px_rgba(245,158,11,0.5)] scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Award size={20} /> Tháng Này
              </button>
            </div>

            {/* Bục Vinh Quang Top 3 */}
            <div className="flex items-end justify-center w-full max-w-3xl mb-12 gap-2 sm:gap-6">
              {/* Top 2 */}
              {top2 && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center w-1/3 max-w-[160px]">
                  <span className="text-base sm:text-lg font-black text-slate-300 truncate w-full text-center mb-2 drop-shadow-md">{top2.name}</span>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-700 border-4 border-slate-300 rounded-[2rem] flex items-center justify-center text-3xl sm:text-4xl shadow-xl z-20 mb-[-15px]">{top2.avatar}</div>
                  <div className="w-full h-32 sm:h-40 bg-gradient-to-t from-slate-600/20 to-slate-400/40 border-t-8 border-slate-300 rounded-t-3xl backdrop-blur-md flex flex-col items-center justify-start pt-6 shadow-[0_-10px_30px_rgba(203,213,225,0.1)]">
                    <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center mb-1 shadow-lg">2</div>
                    <span className="text-slate-200 font-black text-lg sm:text-xl">{top2.score}</span>
                  </div>
                </motion.div>
              )}

              {/* Top 1 */}
              {top1 && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center w-1/3 max-w-[200px] z-30">
                  <div className="text-4xl sm:text-5xl mb-2 animate-bounce">👑</div>
                  <span className="text-lg sm:text-xl font-black text-amber-300 truncate w-full text-center mb-2 drop-shadow-md">{top1.name}</span>
                  <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-300 to-orange-500 border-4 border-white rounded-[2.5rem] flex items-center justify-center text-4xl sm:text-6xl shadow-[0_0_30px_rgba(245,158,11,0.6)] z-20 mb-[-20px]">{top1.avatar}</div>
                  <div className="w-full h-44 sm:h-56 bg-gradient-to-t from-amber-600/20 to-amber-500/50 border-t-8 border-amber-400 rounded-t-3xl backdrop-blur-md flex flex-col items-center justify-start pt-8 shadow-[0_-10px_40px_rgba(245,158,11,0.2)]">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-900 font-black text-xl flex items-center justify-center mb-2 shadow-lg">1</div>
                    <span className="text-amber-300 font-black text-2xl sm:text-3xl">{top1.score}</span>
                  </div>
                </motion.div>
              )}

              {/* Top 3 */}
              {top3 && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center w-1/3 max-w-[160px]">
                  <span className="text-base sm:text-lg font-black text-orange-300 truncate w-full text-center mb-2 drop-shadow-md">{top3.name}</span>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800 border-4 border-orange-500 rounded-[2rem] flex items-center justify-center text-3xl sm:text-4xl shadow-xl z-20 mb-[-15px]">{top3.avatar}</div>
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-orange-800/20 to-orange-600/40 border-t-8 border-orange-500 rounded-t-3xl backdrop-blur-md flex flex-col items-center justify-start pt-5 shadow-[0_-10px_30px_rgba(249,115,22,0.1)]">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-orange-950 font-black flex items-center justify-center mb-1 shadow-lg">3</div>
                    <span className="text-orange-200 font-black text-lg sm:text-xl">{top3.score}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Các Hạng Tiếp Theo */}
            <div className="w-full max-w-3xl flex flex-col gap-4">
              {others.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }} key={idx}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-[2rem] border-2 backdrop-blur-sm transition-transform hover:scale-[1.02] ${
                    item.isMe 
                      ? 'bg-gradient-to-r from-fuchsia-600/30 to-purple-600/30 border-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.3)]' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl ${item.isMe ? 'bg-fuchsia-500 text-white shadow-lg' : 'bg-white/10 text-slate-300'}`}>
                      #{idx + 4}
                    </div>
                    <div className="text-3xl sm:text-4xl bg-black/20 p-2 rounded-2xl">{item.avatar}</div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <h4 className="font-black text-lg sm:text-xl text-white">{item.name}</h4>
                        {item.isMe && <span className="bg-fuchsia-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-sm animate-pulse">LÀ BẠN NÈ</span>}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-xs sm:text-sm text-indigo-300 font-bold bg-indigo-500/20 px-2 py-0.5 rounded-md">{item.rank}</span>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-amber-400 font-bold">
                          <Flame size={14} className="fill-amber-400" /> {item.streak} ngày
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 px-4 py-2 sm:py-3 rounded-2xl border border-white/5">
                    <Star size={20} className="text-amber-400 fill-amber-400 drop-shadow-md" />
                    <span className="font-black text-amber-400 text-xl sm:text-2xl">{item.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};