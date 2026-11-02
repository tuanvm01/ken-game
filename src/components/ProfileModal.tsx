import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';
import { User, Star, Phone, Volume2, HelpCircle, ChevronRight, Settings as SettingsIcon, Lock, Sparkles, ArrowLeft } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMandatory?: boolean;
  onOpenSubscription?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  isMandatory = false,
  onOpenSubscription,
}) => {
  const { user, setUser } = useGameStore();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [age, setAge] = useState(user?.age ?? '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [soundOn, setSoundOn] = useState(() => soundManager.isSoundEnabled);
  const [helpOn, setHelpOn] = useState(true);
  const [timeLimitOn, setTimeLimitOn] = useState(false);

  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'faq'>('profile');
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setAge(user.age ?? '');
      setPhone(user.phone || '');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
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
        age: String(age).trim(),
        phone: phone.trim()
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 font-cute select-none overflow-y-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-[440px] flex flex-col items-center my-auto"
          >
            {/* Khung nền chính */}
            <div className="relative w-full flex flex-col items-center bg-[#F8F7FF] rounded-[36px] border-4 border-[#5B42F3] shadow-[0_12px_40px_rgba(91,66,243,0.3)] overflow-hidden p-6 max-h-[92vh] overflow-y-auto">
              
              {/* ================= HEADER ================= */}
              <div className="flex justify-center items-center w-full gap-3 mb-4">
                <div className="flex bg-[#EFEFFF] p-1 rounded-full border border-[#D5D2FF] w-[82%]">
                  <button
                    type="button"
                    onClick={() => { soundManager.playPop(); setActiveTab('profile'); }}
                    className={`flex-1 py-1.5 rounded-full font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeTab === 'profile' ? 'bg-[#5B42F3] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User size={14} /> Hồ sơ
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundManager.playPop(); setActiveTab('settings'); }}
                    className={`flex-1 py-1.5 rounded-full font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeTab === 'settings' ? 'bg-[#5B42F3] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <SettingsIcon size={14} /> Cài đặt
                  </button>
                  <button
                    type="button"
                    onClick={() => { soundManager.playPop(); setActiveTab('faq'); }}
                    className={`flex-1 py-1.5 rounded-full font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      activeTab === 'faq' ? 'bg-[#5B42F3] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <HelpCircle size={14} /> FAQ
                  </button>
                </div>

                {!isMandatory && (
                  <button 
                    onClick={() => {
                      soundManager.playPop();
                      onClose();
                    }} 
                    className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}images/infor/Button.png`} 
                      alt="Close Button" 
                      className="w-9 h-9 object-contain" 
                    />
                  </button>
                )}
              </div>

              {/* ================= TAB 1: HỒ SƠ ================= */}
              {activeTab === 'profile' && (
                <div className="w-full flex flex-col">
                  <div className="flex items-center gap-3 w-full px-1 mb-4">
                    <div className="relative w-14 h-14 rounded-full bg-[#5B42F3] flex items-center justify-center border-2 border-white shadow-md shrink-0">
                      <User size={28} className="text-white" />
                      <div className="absolute -bottom-1 -right-1 bg-[#FFC72C] text-[#1A0B2E] w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 border-white shadow-sm">
                        {age ? parseInt(String(age)) || 7 : 7}
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-[#5B42F3] uppercase tracking-wider mb-0.5">Nhà du hành nhỏ</span>
                      <h2 className="text-lg font-black text-slate-800 leading-tight">Thông tin Bé & Phụ huynh</h2>
                      <span className="text-[11px] text-slate-500 font-medium">Cùng KÉN lớn lên qua từng hành tinh</span>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-rose-100 border border-rose-300 text-rose-700 px-3 py-2 rounded-xl text-xs font-bold text-center mb-3">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="w-full flex flex-col gap-3.5">
                    
                    {/* CONTAINER: THÔNG TIN CỦA BÉ */}
                    <div className="bg-[#E5F5F7] rounded-3xl p-4 flex flex-col gap-2.5 shadow-inner border border-[#D0EEF2]">
                      <div className="flex items-center gap-2 px-1">
                        <div className="bg-[#8B5CF6] p-1.5 rounded-full text-white shadow-sm">
                          <Star size={12} className="fill-white" />
                        </div>
                        <span className="font-extrabold text-sm text-slate-700">Thông tin của bé</span>
                      </div>

                      <div className="bg-white rounded-2xl flex items-center px-4 py-2.5 shadow-sm border border-slate-100 focus-within:border-[#8B5CF6] transition-colors">
                        <User size={16} className="text-slate-400 mr-2.5 shrink-0" />
                        <span className="text-xs text-slate-400 font-bold w-20 shrink-0">Tên của bé</span>
                        <input 
                          type="text" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Nhập tên bé..." 
                          className="flex-1 text-sm font-black text-slate-800 outline-none bg-transparent"
                          required
                        />
                        <img src={`${import.meta.env.BASE_URL}images/infor/Icon.png`} alt="Edit" className="w-3.5 h-3.5 ml-2 opacity-50 shrink-0" />
                      </div>

                      <div className="bg-white rounded-2xl flex items-center px-4 py-2.5 shadow-sm border border-slate-100 focus-within:border-[#8B5CF6] transition-colors">
                        <Star size={16} className="text-slate-400 mr-2.5 shrink-0" />
                        <span className="text-xs text-slate-400 font-bold w-20 shrink-0">Độ tuổi</span>
                        <input 
                          type="number" 
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Tuổi của bé" 
                          className="flex-1 text-sm font-black text-slate-800 outline-none bg-transparent"
                        />
                        <img src={`${import.meta.env.BASE_URL}images/infor/Icon.png`} alt="Edit" className="w-3.5 h-3.5 ml-2 opacity-50 shrink-0" />
                      </div>
                    </div>

                    {/* CONTAINER: THÔNG TIN PHỤ HUYNH */}
                    <div className="bg-[#E7F8F0] rounded-3xl p-4 flex flex-col gap-2.5 shadow-inner border border-[#D1F2E2]">
                      <div className="flex items-center gap-2 px-1">
                        <div className="bg-[#10B981] p-1.5 rounded-full text-white shadow-sm">
                          <Phone size={12} />
                        </div>
                        <span className="font-extrabold text-sm text-slate-700">Thông tin phụ huynh</span>
                      </div>

                      <div className="bg-white rounded-2xl flex items-center px-4 py-2.5 shadow-sm border border-slate-100 focus-within:border-[#10B981] transition-colors">
                        <Phone size={16} className="text-slate-400 mr-2.5 shrink-0" />
                        <span className="text-xs text-slate-400 font-bold w-20 shrink-0">Số điện thoại</span>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Thêm số liên hệ" 
                          className="flex-1 text-sm font-black text-slate-800 outline-none bg-transparent"
                        />
                        <img src={`${import.meta.env.BASE_URL}images/infor/Icon.png`} alt="Edit" className="w-3.5 h-3.5 ml-2 opacity-50 shrink-0" />
                      </div>
                    </div>

                    {/* TỔNG ĐIỂM TÍCH LŨY */}
                    <div className="relative w-full flex items-center">
                      <img 
                        src={`${import.meta.env.BASE_URL}images/infor/Container.png`} 
                        alt="Tổng điểm tích lũy" 
                        className="w-full object-contain drop-shadow-sm pointer-events-none" 
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <span className="text-white font-black text-base md:text-lg drop-shadow-md">
                          {user?.totalScore !== undefined ? user.totalScore.toLocaleString('vi-VN') : '0'} đ
                        </span>
                      </div>
                    </div>

                    {/* NÂNG LÊN PREMIUM */}
                    <button 
                      type="button"
                      onClick={() => {
                        soundManager.playPop();
                        onClose();
                        if (onOpenSubscription) onOpenSubscription();
                      }}
                      className="w-full hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer mt-1"
                    >
                      <img 
                        src={`${import.meta.env.BASE_URL}images/infor/Group 3.png`} 
                        alt="Nâng lên Premium" 
                        className="w-full object-contain drop-shadow-sm" 
                      />
                    </button>

                    {/* NÚT LƯU THÔNG TIN */}
                    <button 
                      type="submit"
                      className="w-full hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer mt-1"
                    >
                      <img 
                        src={`${import.meta.env.BASE_URL}images/infor/Group 4.png`} 
                        alt="Lưu thông tin" 
                        className="w-full object-contain drop-shadow-md" 
                      />
                    </button>

                  </form>
                </div>
              )}

              {/* ================= TAB 2: CÀI ĐẶT ================= */}
              {activeTab === 'settings' && (
                <div className="space-y-4 py-2 w-full">
                  <div className="flex items-center gap-3 w-full px-1 mb-2">
                    <div className="w-12 h-12 rounded-full bg-[#38BDF8] flex items-center justify-center border-2 border-white shadow-md shrink-0 text-white">
                      <SettingsIcon size={24} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-[#0284C7] uppercase tracking-wider mb-0.5">Không gian của bé</span>
                      <h2 className="text-lg font-black text-slate-800 leading-tight">Cài đặt hành trình</h2>
                    </div>
                  </div>

                  <div className="bg-[#EFEBFF] rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-[#E0D7FF]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#5B42F3] text-white rounded-xl flex items-center justify-center shadow-sm">
                        <Volume2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs md:text-sm text-slate-800">Âm thanh</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Nhạc nền và hiệu ứng</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newState = !soundOn;
                        setSoundOn(newState);
                        soundManager.toggleSound(newState);
                        soundManager.toggleBgm(newState);
                        soundManager.playPop();
                      }}
                      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        soundOn ? 'bg-[#5B42F3]' : 'bg-slate-300'
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

                  <div className="bg-[#EFEBFF] rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-[#E0D7FF]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#5B42F3] text-white rounded-xl flex items-center justify-center shadow-sm">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs md:text-sm text-slate-800">Gợi ý học tập</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Nhắc bé khi cần trợ giúp</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playPop();
                        setHelpOn(!helpOn);
                      }}
                      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        helpOn ? 'bg-[#5B42F3]' : 'bg-slate-300'
                      }`}
                    >
                      <motion.div
                        layout
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                          helpOn ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="bg-[#EFEBFF] rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-[#E0D7FF]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#5B42F3] text-white rounded-xl flex items-center justify-center shadow-sm">
                        <Lock size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs md:text-sm text-slate-800">Chế độ giới hạn thời gian</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Bảo vệ thay đổi bằng mã PIN</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playPop();
                        setTimeLimitOn(!timeLimitOn);
                      }}
                      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        timeLimitOn ? 'bg-[#5B42F3]' : 'bg-slate-300'
                      }`}
                    >
                      <motion.div
                        layout
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                          timeLimitOn ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div 
                    onClick={() => {
                      soundManager.playPop();
                      setActiveTab('faq');
                    }}
                    className="bg-[#E0F2FE] hover:bg-[#BAE6FD] transition-colors rounded-2xl p-3.5 flex items-center justify-between shadow-sm cursor-pointer border border-[#BAE6FD]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0284C7] text-white rounded-xl flex items-center justify-center shadow-sm">
                        <HelpCircle size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs md:text-sm text-slate-800">Cần KÉN hỗ trợ?</h4>
                        <p className="text-[10px] text-slate-600 font-medium">Liên hệ đội ngũ hỗ trợ dành cho phụ huynh</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-600" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playPop();
                      onClose();
                    }}
                    className="w-full hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer mt-3"
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}images/caidat/Container-4.png`} 
                      alt="Lưu cài đặt" 
                      className="w-full object-contain drop-shadow-md" 
                    />
                  </button>

                </div>
              )}

              {/* ================= TAB 3: FAQ ================= */}
              {activeTab === 'faq' && (
                <div className="space-y-3 py-2 w-full">
                  <div className="flex items-center gap-3 w-full px-1 mb-2">
                    <div className="w-12 h-12 rounded-full bg-[#FFC72C] flex items-center justify-center border-2 border-white shadow-md shrink-0 text-slate-950">
                      <HelpCircle size={24} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-[#D97706] uppercase tracking-wider mb-0.5">Dành cho bé và phụ huynh</span>
                      <h2 className="text-lg font-black text-slate-800 leading-tight">Câu hỏi thường gặp</h2>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-[48vh] overflow-y-auto pr-1">
                    
                    <div 
                      onClick={() => {
                        soundManager.playPop();
                        setExpandedFaq(expandedFaq === 0 ? null : 0);
                      }}
                      className="bg-[#EAE6FF] hover:bg-[#DFD8FF] transition-colors rounded-2xl p-3.5 shadow-sm cursor-pointer border border-[#D5CEFF]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <HelpCircle size={16} className="text-[#5B42F3] shrink-0" />
                          <span className="font-extrabold text-xs md:text-sm text-[#5B42F3]">Trò chơi KÉN dành cho độ tuổi nào?</span>
                        </div>
                        <ChevronRight size={16} className={`text-[#5B42F3] transition-transform ${expandedFaq === 0 ? 'rotate-90' : ''}`} />
                      </div>
                      {expandedFaq === 0 && (
                        <p className="text-[11px] text-slate-600 mt-2 font-medium leading-relaxed pl-6 border-t border-[#D5CEFF]/40 pt-2">
                          KÉN được thiết kế tối ưu cho trẻ từ 5–10 tuổi, giúp bé phát triển tư duy, kỹ năng sống và khám phá thế giới qua các hành tinh sinh động[cite: 14].
                        </p>
                      )}
                    </div>

                    <div 
                      onClick={() => {
                        soundManager.playPop();
                        setExpandedFaq(expandedFaq === 1 ? null : 1);
                      }}
                      className="bg-[#EAE6FF] hover:bg-[#DFD8FF] transition-colors rounded-2xl p-3.5 shadow-sm cursor-pointer border border-[#D5CEFF]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <HelpCircle size={16} className="text-[#5B42F3] shrink-0" />
                          <span className="font-extrabold text-xs md:text-sm text-[#5B42F3]">Làm thế nào để mở khóa các hành tinh mới?</span>
                        </div>
                        <ChevronRight size={16} className={`text-[#5B42F3] transition-transform ${expandedFaq === 1 ? 'rotate-90' : ''}`} />
                      </div>
                      {expandedFaq === 1 && (
                        <p className="text-[11px] text-slate-600 mt-2 font-medium leading-relaxed pl-6 border-t border-[#D5CEFF]/40 pt-2">
                          Bé cần hoàn thành các thử thách xuất sắc ở hành tinh hiện tại hoặc ba mẹ có thể nâng cấp gói Premium để mở khóa toàn bộ các hành tinh ngay lập tức.
                        </p>
                      )}
                    </div>

                    <div 
                      onClick={() => {
                        soundManager.playPop();
                        setExpandedFaq(expandedFaq === 2 ? null : 2);
                      }}
                      className="bg-[#EAE6FF] hover:bg-[#DFD8FF] transition-colors rounded-2xl p-3.5 shadow-sm cursor-pointer border border-[#D5CEFF]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <HelpCircle size={16} className="text-[#5B42F3] shrink-0" />
                          <span className="font-extrabold text-xs md:text-sm text-[#5B42F3]">Quyền lợi của gói Premium gồm những gì?</span>
                        </div>
                        <ChevronRight size={16} className={`text-[#5B42F3] transition-transform ${expandedFaq === 2 ? 'rotate-90' : ''}`} />
                      </div>
                      {expandedFaq === 2 && (
                        <p className="text-[11px] text-slate-600 mt-2 font-medium leading-relaxed pl-6 border-t border-[#D5CEFF]/40 pt-2">
                          Mở khóa tất cả hành tinh, hoàn toàn không có quảng cáo, nhận báo cáo tiến độ học tập và tham gia các thử thách đặc biệt hàng tuần.
                        </p>
                      )}
                    </div>

                    <div 
                      onClick={() => {
                        soundManager.playPop();
                        setExpandedFaq(expandedFaq === 3 ? null : 3);
                      }}
                      className="bg-[#EAE6FF] hover:bg-[#DFD8FF] transition-colors rounded-2xl p-3.5 shadow-sm cursor-pointer border border-[#D5CEFF]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <HelpCircle size={16} className="text-[#5B42F3] shrink-0" />
                          <span className="font-extrabold text-xs md:text-sm text-[#5B42F3]">Liên hệ hỗ trợ kỹ thuật và thanh toán ở đâu?</span>
                        </div>
                        <ChevronRight size={16} className={`text-[#5B42F3] transition-transform ${expandedFaq === 3 ? 'rotate-90' : ''}`} />
                      </div>
                      {expandedFaq === 3 && (
                        <div className="text-[11px] text-slate-600 mt-2 font-medium leading-relaxed pl-6 border-t border-[#D5CEFF]/40 pt-2 space-y-1">
                          <div>📧 Email: <span className="font-bold">kén.education.26@gmail.com</span></div>
                          <div>☎️ Hotline / Zalo: <span className="font-bold">0345440028</span></div>
                        </div>
                      )}
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playPop();
                      setActiveTab('profile');
                    }}
                    className="w-full py-3 bg-[#5B42F3] hover:bg-[#4A32D0] text-white font-black text-xs md:text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <ArrowLeft size={16} /> Quay lại Hồ sơ
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};