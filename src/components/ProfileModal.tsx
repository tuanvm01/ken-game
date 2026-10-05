import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Calendar, Check, X, Award, Settings, Volume2, Music, Crown, Star, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMandatory?: boolean;
  onOpenSubscription?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, isMandatory = false, onOpenSubscription }) => {
  const { user, setUser } = useGameStore();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [age, setAge] = useState(user?.age || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [soundOn, setSoundOn] = useState(() => soundManager.isSoundEnabled);
  const [bgmOn, setBgmOn] = useState(() => soundManager.isBgmEnabled);

  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'faq'>('profile');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Vui lòng nhập tên của bé!');
      return;
    }

    soundManager.playPop();
    if (user) {
      setUser({
        ...user,
        displayName: displayName.trim(),
        age,
        phone: phone.trim()
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 font-cute select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="bg-slate-900 border-2 border-pink-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative text-white my-auto max-h-[95vh] overflow-y-auto"
        >
          {!isMandatory && (
            <button
              type="button"
              onClick={() => {
                soundManager.playPop();
                onClose();
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer z-10"
            >
              <X size={22} />
            </button>
          )}

          {/* Thanh chuyển đổi Tab (Profile, Cài đặt, FAQ) */}
          <div className="flex gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => { soundManager.playPop(); setActiveTab('profile'); }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'profile' ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User size={16} /> Hồ Sơ
            </button>
            <button
              type="button"
              onClick={() => { soundManager.playPop(); setActiveTab('settings'); }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'settings' ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings size={16} /> Cài Đặt
            </button>
            <button
              type="button"
              onClick={() => { soundManager.playPop(); setActiveTab('faq'); }}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'faq' ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle size={16} /> FAQ
            </button>
          </div>

          {/* Nội dung Tab: Hồ Sơ */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-pink-300">
                  <User size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-pink-400">Thông Tin Bé & Phụ Huynh</h3>
                <p className="text-xs text-slate-400">Cá nhân hóa trải nghiệm học tập tuyệt vời cho bé</p>
              </div>

              {error && (
                <div className="bg-rose-950/60 border border-rose-500/50 text-rose-200 px-4 py-2.5 rounded-xl text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Tên của bé:</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Nhập tên bé (Ví dụ: Bé Bảo An)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 pl-11 text-white text-sm focus:outline-none focus:border-pink-500 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Độ tuổi:</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Tuổi của bé"
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 pl-11 text-white text-sm focus:outline-none focus:border-pink-500 font-bold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Số điện thoại phụ huynh:</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="SĐT liên hệ"
                      className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 pl-11 text-white text-sm focus:outline-none focus:border-pink-500 font-bold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Tổng Điểm Tích Lũy</h4>
                    <p className="text-[11px] text-slate-400">Xếp hạng qua các hành tinh vũ trụ</p>
                  </div>
                </div>
                <span className="font-black text-amber-400 text-base flex items-center gap-1">
                  <Star size={16} fill="currentColor" /> {user?.totalScore || 0} đ
                </span>
              </div>

              {/* NÚT NÂNG CẤP LÊN PREMIUM (MÀU VÀNG CHỦ ĐẠO - ĐÃ LINK TRỰC TIẾP) */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  onClose(); // Đóng modal hồ sơ
                  if (onOpenSubscription) {
                    onOpenSubscription(); // Mở modal thanh toán VIP
                  }
                }}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 border border-amber-300/60 rounded-2xl p-3.5 flex items-center justify-between shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-left group mb-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950/20 border border-slate-950/20 flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
                    <Sparkles size={22} className="text-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 text-base md:text-lg flex items-center gap-1.5 leading-snug">
                      Nâng lên Premium
                    </h4>
                    <p className="text-slate-900 text-xs font-bold opacity-90">
                      Mở khóa tất cả hành tinh • Không quảng cáo
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center text-slate-950 group-hover:translate-x-1 transition-transform mr-1 font-bold">
                  <ChevronRight size={18} />
                </div>
              </button>

              {/* Nút lưu thông tin */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check size={20} /> Lưu Thông Tin
              </button>
            </form>
          )}

          {/* Nội dung Tab: Cài Đặt */}
          {activeTab === 'settings' && (
            <div className="space-y-4 py-2">
              <div className="text-center mb-2">
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-indigo-300">
                  <Settings size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-indigo-300">Cài Đặt Hệ Thống</h3>
                <p className="text-xs text-slate-400">Tùy chỉnh âm thanh và ngôn ngữ cho bé</p>
              </div>

              {/* Hiệu ứng âm thanh */}
              <div className="flex items-center justify-between bg-slate-800/70 border border-slate-700/80 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center">
                    <Volume2 size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Hiệu ứng âm thanh</h4>
                    <p className="text-xs text-slate-400">Âm thanh bấm nút, đúng/sai</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newState = !soundOn;
                    setSoundOn(newState);
                    soundManager.toggleSound(newState);
                    soundManager.playPop();
                  }}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    soundOn ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <motion.div
                    layout
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      soundOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Nhạc nền */}
              <div className="flex items-center justify-between bg-slate-800/70 border border-slate-700/80 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center">
                    <Music size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Nhạc nền vũ trụ</h4>
                    <p className="text-xs text-slate-400">Giai điệu vui tươi thư giãn</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newState = !bgmOn;
                    setBgmOn(newState);
                    soundManager.toggleBgm(newState);
                  }}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    bgmOn ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <motion.div
                    layout
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      bgmOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  setActiveTab('profile');
                }}
                className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-sm transition-all cursor-pointer"
              >
                Quay Lại Hồ Sơ
              </button>
            </div>
          )}

          {/* Nội dung Tab: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 py-2">
              <div className="text-center mb-3">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg border-2 border-amber-300 text-slate-950">
                  <HelpCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-amber-300">Câu Hỏi Thường Gặp (FAQ)</h3>
                <p className="text-xs text-slate-400">Thông tin hữu ích dành cho ba mẹ và bé</p>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
                  <div className="font-bold text-amber-300 text-sm mb-1">Q: Trò chơi KÉN dành cho độ tuổi nào?</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    Game được thiết kế tối ưu cho các bé từ 5 đến 10 tuổi, giúp bé phát triển tư duy, kỹ năng sống và khám phá thế giới qua các hành tinh vũ trụ sinh động.
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
                  <div className="font-bold text-amber-300 text-sm mb-1">Q: Làm thế nào để mở khóa các hành tinh mới?</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    Bé cần hoàn thành xuất sắc các thử thách ở hành tinh hiện tại, hoặc ba mẹ có thể nâng cấp gói VIP để mở khóa toàn bộ 5 hành tinh ngay lập tức!
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
                  <div className="font-bold text-amber-300 text-sm mb-1">Q: Quyền lợi của gói VIP trọn đời gồm những gì?</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    Mở khóa tất cả 5 hành tinh, không có quảng cáo, nhận báo cáo chi tiết học tập dành riêng cho ba mẹ, thử thách tuần đặc biệt và kho huy hiệu độc quyền.
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
                  <div className="font-bold text-amber-300 text-sm mb-1">Q: Liên hệ hỗ trợ kỹ thuật và thanh toán ở đâu?</div>
                  <div className="text-xs text-slate-300 leading-relaxed space-y-1 mt-1">
                    <div>📧 Email: <span className="text-white font-bold">support@kenlearning.vn</span></div>
                    <div>☎️ Hotline / Zalo: <span className="text-white font-bold">1900 xxxx (8:00 - 21:00)</span></div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playPop();
                  setActiveTab('profile');
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                Quay Lại Hồ Sơ
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};