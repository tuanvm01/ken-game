import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, ShieldCheck, QrCode } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/audio';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { user, setUser } = useGameStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'lifetime'>('lifetime');
  const [showQrStep, setShowQrStep] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePaymentConfirm = () => {
    soundManager.playPop();
    setIsSuccess(true);
    
    // Cập nhật trạng thái VIP cho user trong store
    if (user) {
      setUser({
        ...user,
        isVip: true,
        vipPlan: selectedPlan,
      } as any);
    }

    setTimeout(() => {
      setIsSuccess(false);
      setShowQrStep(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 font-cute select-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.2)] relative text-white max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Nút đóng */}
          <button
            onClick={() => {
              soundManager.playPop();
              setShowQrStep(false);
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {!showQrStep ? (
            <>
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900 border border-purple-500/30 rounded-2xl p-5 text-center mb-6 shadow-inner">
                <div className="inline-flex p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-300 mb-2 shadow-lg animate-bounce">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400">
                  Mở khóa toàn bộ hành trình khám phá
                </h2>
              </div>

              {/* Danh sách quyền lợi */}
              <div className="space-y-3 mb-6 text-sm md:text-base font-semibold">
                <div className="flex items-center gap-3 text-slate-200">
                  <span className="text-xl">🪐</span> Mở khóa tất cả 5 hành tinh
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <span className="text-xl">🚫</span> Không có quảng cáo
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <span className="text-xl">📊</span> Báo cáo chi tiết cho ba/mẹ
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <span className="text-xl">🎯</span> Thử thách đặc biệt mỗi tuần
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <span className="text-xl">🏆</span> Huy hiệu và phần thưởng độc quyền
                </div>
              </div>

              {/* Các gói lựa chọn */}
              <div className="space-y-3 mb-6">
                
                {/* Gói Hàng tháng */}
                <div
                  onClick={() => {
                    soundManager.playPop();
                    setSelectedPlan('monthly');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedPlan === 'monthly'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-black text-base text-white">Hàng tháng</div>
                    <div className="text-xs text-slate-400 mt-1">Trải nghiệm linh hoạt</div>
                  </div>
                  {/* SỬA LỖI Ở ĐÂY: Dùng flex, items-center và gap-4 để xếp hàng ngang */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-black text-amber-400 text-lg">59.000đ</div>
                      <div className="text-[10px] text-slate-400">/tháng</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedPlan === 'monthly' ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-600'
                      }`}>
                      {selectedPlan === 'monthly' && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
                

                {/* Gói Trọn đời */}
                <div
                  onClick={() => {
                    soundManager.playPop();
                    setSelectedPlan('lifetime');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between relative overflow-hidden ${
                    selectedPlan === 'lifetime'
                      ? 'bg-purple-950/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-base text-white">Trọn đời</span>
                      <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        Tiết kiệm 37%
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Đầu tư một lần, chơi mãi mãi</div>
                  </div>
                  {/* SỬA LỖI Ở ĐÂY: Dùng flex, items-center và gap-4 để xếp hàng ngang */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-black text-amber-400 text-lg">599.000đ</div>
                      <div className="text-[10px] text-slate-400">/trọn đời</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedPlan === 'lifetime' ? 'border-purple-400 bg-purple-500 text-white' : 'border-slate-600'
                      }`}>
                      {selectedPlan === 'lifetime' && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút Đăng ký */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  setShowQrStep(true);
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-lg rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all cursor-pointer active:scale-95"
              >
                Tiếp tục thanh toán ({selectedPlan === 'monthly' ? '59.000đ' : '599.000đ'})
              </button>
            </>
          ) : (
            /* Bước Quét Mã QR Thanh Toán */
            <div className="text-center py-4">
              <div className="inline-flex p-3 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-300 mb-3">
                <QrCode size={32} />
              </div>
              <h3 className="text-xl font-bold mb-1">Quét mã QR để thanh toán</h3>
              <p className="text-xs text-slate-400 mb-6">
                Sử dụng ứng dụng Ngân hàng hoặc Momo để quét mã bên dưới
              </p>

              {/* Khung ảnh QR Giả lập */}
              <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto mb-6 shadow-2xl flex items-center justify-center relative">
                <div className="absolute inset-4 border-4 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-800">
                  <span className="font-black text-sm text-center">MÃ QR<br/>MOMO / BANK</span>
                  <span className="text-[10px] font-bold text-amber-600 mt-2 bg-amber-100 px-2 py-1 rounded-md">
                    {selectedPlan === 'monthly' ? '59.000đ' : '599.000đ'}
                  </span>
                </div>
              </div>

              {isSuccess ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 py-3 rounded-xl font-bold flex items-center justify-center gap-2 animate-pulse">
                  <Check size={20} /> Thanh toán thành công!
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQrStep(false)}
                    className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handlePaymentConfirm}
                    className="flex-[1.5] py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    Tôi đã chuyển khoản
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};