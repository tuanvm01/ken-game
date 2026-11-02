import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, ArrowLeft, Crown } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';

// Component trang trí nền Vũ trụ
const SpaceBackground = () => {
  const stars = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
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

export const LeaderboardModal: React.FC = () => {
  const { isLeaderboardOpen, setLeaderboardOpen, user } = useGameStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const userScore = user?.totalScore || 14450;
  const userName = user?.displayName || 'Võ Minh Tuấn';

  // Dữ liệu mẫu Tuần chuẩn theo thiết kế Figma
  const weeklyRankings = [
    { name: 'Thanh Toàn', score: 4850, rankNum: 2, avatar: '👦' },
    { name: userName, score: userScore, rankNum: 1, avatar: '👦', isMe: true },
    { name: 'Thanh Lê', score: 2850, rankNum: 3, avatar: '👧' },
    { name: 'Thanh Hân', score: 1890, rankNum: 4, avatar: '👧' },
    { name: 'Quốc Toàn', score: 990, rankNum: 5, avatar: '👦' },
    { name: 'Bảo Thư', score: 800, rankNum: 6, avatar: '👧' },
    { name: 'Những ngôi sao nhỏ', score: 500, rankNum: 7, avatar: '⭐' },
    { name: 'Đào Phát Khôi canh', score: 480, rankNum: 8, avatar: '👦' },
    { name: 'Giai ơi du-jango BAMOUS', score: 430, rankNum: 9, avatar: '👧' },
  ];

  const monthlyRankings = [
    { name: 'Thanh Toàn', score: 21200, rankNum: 1, avatar: '👦' },
    { name: 'Quốc Toàn', score: 18500, rankNum: 2, avatar: '👦' },
    { name: userName, score: userScore * 2, rankNum: 3, avatar: '👦', isMe: true },
    { name: 'Thanh Lê', score: 15400, rankNum: 4, avatar: '👧' },
    { name: 'Bảo Thư', score: 12300, rankNum: 5, avatar: '👧' },
  ];

  const rankings = activeTab === 'weekly' ? weeklyRankings : monthlyRankings;
  
  const top1 = rankings.find(r => r.rankNum === 1) || rankings[0];
  const top2 = rankings.find(r => r.rankNum === 2) || rankings[1];
  const top3 = rankings.find(r => r.rankNum === 3) || rankings[2];
  const others = rankings.filter(r => r.rankNum && r.rankNum > 3);

  return (
    <AnimatePresence>
      {isLeaderboardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 font-cute select-none overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[92vw] max-w-[1100px] h-[85vh] max-h-[750px] flex flex-col items-center my-auto"
          >
            {/* Khung nền chính sử dụng BG.png chuẩn từ thư mục BXH, chiếm không gian rộng rãi */}
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border-4 border-[#635BFF] shadow-[0_30px_90px_rgba(99,91,255,0.6)] flex flex-col p-6 sm:p-8 bg-[#1A0C3E]">
              
              <img 
                src={`${import.meta.env.BASE_URL}images/BXH/BG.png`} 
                alt="Leaderboard Background" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* ================= HEADER ================= */}
              <div className="relative z-10 flex justify-between items-center w-full mb-5">
                {/* Nút Quay lại */}
                <button 
                  onClick={() => {
                    soundManager.playPop();
                    setLeaderboardOpen(false);
                  }}
                  className="flex items-center gap-2.5 bg-[#635BFF] hover:bg-[#5249E0] border-2 border-white/40 px-6 py-3 rounded-2xl text-white font-black text-base shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft size={22} className="text-amber-300" />
                  <span>Quay lại</span>
                </button>

                {/* Tiêu đề Bảng Xếp Hạng */}
                <div className="bg-[#FFFBEB] border-3 border-[#FCD34D] px-10 py-2.5 rounded-full shadow-lg flex items-center gap-3">
                  <span className="text-amber-500 text-xl">⭐</span>
                  <h1 className="text-lg sm:text-2xl font-black text-[#1E1B4B] tracking-wide uppercase">BẢNG XẾP HẠNG</h1>
                  <span className="text-amber-500 text-xl">⭐</span>
                </div>

                {/* Điểm số góc phải */}
                <div className="bg-[#2D1667] border-2 border-amber-500/60 px-5 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-inner">
                  <Star size={20} className="fill-amber-400 text-amber-500" />
                  <span className="font-black text-amber-400 text-lg">{userScore.toLocaleString()} đ</span>
                </div>
              </div>

              {/* ================= NỘI DUNG CHÍNH (2 CỘT: PODIUM & DANH SÁCH) ================= */}
              <div className="relative z-10 grid grid-cols-12 gap-6 flex-1 items-stretch mb-5 overflow-hidden">
                
                {/* CỘT TRÁI: BỤC VINH QUANG TOP 3 (Container-4, 5, 6 chuẩn Figma phóng to rõ) */}
                <div className="col-span-5 flex items-end justify-center gap-4 px-4 py-6 bg-[#261054]/90 rounded-[36px] border-2 border-indigo-500/30 shadow-inner">
                  
                  {/* Top 2 (Container-4) */}
                  {top2 && (
                    <div className="relative w-1/3 flex flex-col items-center">
                      <div className="relative w-18 h-18 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center text-3xl shadow-2xl z-20 mb-[-24px]">
                        {top2.avatar}
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center font-black border-2 border-white shadow">2</div>
                      </div>
                      <div className="w-full bg-[#35186E] border-2 border-indigo-400/40 rounded-[32px] p-4 flex flex-col items-center justify-between h-[210px] shadow-2xl pt-10">
                        <span className="text-sm sm:text-base font-black text-white text-center truncate w-full">{top2.name}</span>
                        <div className="bg-[#FFFBEB] w-full rounded-2xl py-3 px-2 flex flex-col items-center shadow-inner border border-amber-200">
                          <span className="text-xs text-slate-500 font-bold">Hạng 2</span>
                          <span className="text-sm sm:text-base font-black text-amber-600 flex items-center gap-1">
                            <Star size={14} className="fill-amber-400 text-amber-400" /> {top2.score.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 1 (Container-5 - Vô địch cao nhất) */}
                  {top1 && (
                    <div className="relative w-1/3 flex flex-col items-center -translate-y-6 z-30">
                      <Crown size={36} className="text-amber-300 drop-shadow-md mb-1.5 animate-bounce" />
                      <div className="relative w-22 h-22 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 border-4 border-white flex items-center justify-center text-5xl shadow-[0_0_35px_rgba(245,158,11,0.85)] z-20 mb-[-26px]">
                        {top1.avatar}
                        <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white text-sm w-7 h-7 rounded-full flex items-center justify-center font-black border-2 border-white shadow">1</div>
                      </div>
                      <div className="w-full bg-[#431B96] border-3 border-amber-400/80 rounded-[36px] p-4.5 flex flex-col items-center justify-between h-[250px] shadow-[0_15px_45px_rgba(245,158,11,0.35)] pt-12">
                        <span className="text-sm sm:text-base font-black text-amber-300 text-center truncate w-full">{top1.name}</span>
                        <div className="bg-[#FFFBEB] w-full rounded-2xl py-3 px-2 flex flex-col items-center shadow-inner border border-amber-300">
                          <span className="text-xs text-amber-800 font-black uppercase">VÔ ĐỊCH</span>
                          <span className="text-sm sm:text-base font-black text-amber-600 flex items-center gap-1">
                            <Star size={14} className="fill-amber-400 text-amber-400" /> {top1.score.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 3 (Container-6) */}
                  {top3 && (
                    <div className="relative w-1/3 flex flex-col items-center">
                      <div className="relative w-18 h-18 rounded-full bg-rose-400 border-4 border-white flex items-center justify-center text-3xl shadow-2xl z-20 mb-[-24px]">
                        {top3.avatar}
                        <div className="absolute -bottom-1 -right-1 bg-rose-600 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center font-black border-2 border-white shadow">3</div>
                      </div>
                      <div className="w-full bg-[#35186E] border-2 border-indigo-400/40 rounded-[32px] p-4 flex flex-col items-center justify-between h-[190px] shadow-2xl pt-10">
                        <span className="text-sm sm:text-base font-black text-white text-center truncate w-full">{top3.name}</span>
                        <div className="bg-[#FFFBEB] w-full rounded-2xl py-3 px-2 flex flex-col items-center shadow-inner border border-amber-200">
                          <span className="text-xs text-slate-500 font-bold">Hạng 3</span>
                          <span className="text-sm sm:text-base font-black text-amber-600 flex items-center gap-1">
                            <Star size={14} className="fill-amber-400 text-amber-400" /> {top3.score.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* CỘT PHẢI: TABS & DANH SÁCH (Container-2, 3 & Container_margin) */}
                <div className="col-span-7 flex flex-col h-full bg-[#261054]/90 backdrop-blur-md rounded-[36px] p-5 border-2 border-indigo-500/30 shadow-inner">
                  
                  {/* Tabs chuyển Tuần này / Tháng này */}
                  <div className="flex bg-[#160733] p-2 rounded-full border-2 border-indigo-500/40 mb-4 shadow-inner">
                    <button
                      onClick={() => { soundManager.playPop(); setActiveTab('weekly'); }}
                      className={`flex-1 py-3 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                        activeTab === 'weekly' ? 'bg-[#38BDF8] text-slate-950 shadow-lg scale-[1.02]' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Trophy size={18} /> Tuần này
                    </button>
                    <button
                      onClick={() => { soundManager.playPop(); setActiveTab('monthly'); }}
                      className={`flex-1 py-3 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
                        activeTab === 'monthly' ? 'bg-[#38BDF8] text-slate-950 shadow-lg scale-[1.02]' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Star size={18} /> Tháng này
                    </button>
                  </div>

                  {/* Danh sách cuộn mượt mà từ #4 trở đi */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[38vh] custom-scrollbar">
                    {others.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all ${
                          item.isMe 
                            ? 'bg-gradient-to-r from-fuchsia-600/40 to-purple-600/40 border-fuchsia-400 shadow-md' 
                            : 'bg-white/95 border-indigo-100 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 text-center font-black text-base ${item.isMe ? 'text-fuchsia-300' : 'text-indigo-600'}`}>
                            #{item.rankNum || idx + 4}
                          </span>
                          <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl shadow-inner border border-indigo-200">
                            {item.avatar}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-black text-base sm:text-lg ${item.isMe ? 'text-white' : 'text-slate-900'}`}>
                              {item.name}
                            </span>
                            {item.isMe && (
                              <span className="bg-fuchsia-500 text-white text-xs font-black px-3 py-0.5 rounded-full shadow">
                                Bạn
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 font-black text-sm sm:text-base text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 shadow-inner">
                          <Star size={16} className="fill-amber-400 text-amber-400" />
                          <span>{item.score.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

              {/* ================= FOOTER: BẠN Ở ĐÂY (Chuẩn mẫu Image-1 & Text) ================= */}
              <div className="relative z-10 bg-[#38BDF8] rounded-3xl px-6 py-4 flex items-center justify-between shadow-[0_12px_40px_rgba(56,189,248,0.4)] border-3 border-white/70">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0284C7] text-white font-black text-base px-4 py-2 rounded-xl shadow-inner border border-white/40">
                    #4
                  </div>
                  <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white">
                    👦
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="font-black text-base sm:text-lg text-slate-950">{userName} (HE176448)</span>
                    <span className="bg-[#FFFBEB] text-amber-900 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full shadow-sm border-2 border-amber-300">
                      Bạn ở đây
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-black text-lg sm:text-xl text-slate-950 bg-amber-300 px-6 py-2 rounded-2xl shadow-inner border-2 border-amber-400">
                  <Star size={20} className="fill-amber-600 text-amber-600" />
                  <span>{userScore.toLocaleString()} đ</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};