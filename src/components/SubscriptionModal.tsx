import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/audio';
import { Check, X, Shield } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'lifetime'>('monthly');
  const [step, setStep] = useState<'plans' | 'qr' | 'success'>('plans');

  if (!isOpen) return null;

  const handleSelectPlan = (plan: 'monthly' | 'lifetime') => {
    soundManager.playPop();
    setSelectedPlan(plan);
  };

  const handleProceedPayment = () => {
    soundManager.playPop();
    setStep('qr');
  };

  const handleConfirmTransfer = () => {
    soundManager.playPop();
    setStep('success');
    setTimeout(() => {
      setStep('plans');
      onClose();
    }, 3000);
  };

  const handleBackToPlans = () => {
    soundManager.playPop();
    setStep('plans');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 font-cute select-none overflow-y-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-[460px] flex flex-col items-center my-auto"
          >
            {/* ================= BƯỚC 1: CHỌN GÓI PREMIUM ================= */}
            {step === 'plans' && (
              <div className="relative w-full flex flex-col items-center bg-[#F8F7FF] rounded-[36px] border-4 border-[#5B42F3] shadow-[0_12px_40px_rgba(91,66,243,0.3)] overflow-hidden p-6">
                
                {/* Nút Đóng (X) */}
                <button 
                  onClick={() => {
                    soundManager.playPop();
                    onClose();
                  }}
                  className="absolute top-5 right-5 hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
                >
                  <div className="w-8 h-8 rounded-full bg-[#5B42F3] text-white flex items-center justify-center shadow-md">
                    <X size={18} />
                  </div>
                </button>

                {/* Header */}
                <div className="flex flex-col items-center text-center mt-2 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#E0E7FF] border-2 border-[#5B42F3] flex items-center justify-center mb-3 shadow-inner">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <span className="text-[10px] font-black text-[#5B42F3] uppercase tracking-wider mb-0.5">VÉ THÔNG HÀNH KÉN</span>
                  <h2 className="text-xl font-black text-slate-900 leading-tight">Mở khóa cả dải ngân hà kỹ năng</h2>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Một tấm vé, trọn hành trình lớn khôn an toàn và đầy hứng khởi.</p>
                </div>

                {/* Tính năng nổi bật */}
                <div className="w-full bg-[#EAF8F1] rounded-2xl p-3.5 mb-4 border border-[#C6EFE2] grid grid-cols-2 gap-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Mở khóa tất cả hành tinh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Không có quảng cáo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Báo cáo chi tiết cho ba mẹ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                      <Check size={10} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Thử thách đặc biệt mỗi tuần</span>
                  </div>
                </div>

                {/* Thẻ chọn gói cước */}
                <div className="w-full flex gap-3 mb-4">
                  <div 
                    onClick={() => handleSelectPlan('monthly')}
                    className={`flex-1 rounded-2xl p-3.5 border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                      selectedPlan === 'monthly' 
                        ? 'bg-[#FEF9C3] border-[#FACC15] shadow-md scale-[1.02]' 
                        : 'bg-[#F3F4F6] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-extrabold text-slate-500 block">Hàng tháng</span>
                        <span className="text-base font-black text-slate-900">99.000đ</span>
                      </div>
                      {selectedPlan === 'monthly' && (
                        <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold mt-2">/ tháng</span>
                  </div>

                  <div 
                    onClick={() => handleSelectPlan('lifetime')}
                    className={`flex-1 rounded-2xl p-3.5 border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                      selectedPlan === 'lifetime' 
                        ? 'bg-[#FEF9C3] border-[#FACC15] shadow-md scale-[1.02]' 
                        : 'bg-[#F3F4F6] border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <span className="text-[11px] font-extrabold text-slate-500 block">Trọn đời</span>
                        <span className="text-base font-black text-slate-900">599.000đ</span>
                      </div>
                      {selectedPlan === 'lifetime' && (
                        <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-slate-500 font-semibold">Thanh toán một lần</span>
                      <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">Tiết kiệm nhất</span>
                    </div>
                  </div>
                </div>

                {/* Nút Tiếp tục thanh toán */}
                <button
                  onClick={handleProceedPayment}
                  className="w-full hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer mb-2"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}images/premium/Container.png`} 
                    alt="Tiếp tục thanh toán" 
                    className="w-full object-contain drop-shadow-md" 
                  />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Shield size={12} />
                  <span>Thanh toán được bảo mật • Phụ huynh xác nhận</span>
                </div>
              </div>
            )}

            {/* ================= BƯỚC 2: MÀN HÌNH QR (Cân chỉnh tỷ lệ 2 nút theo đúng kích thước gốc Figma) ================= */}
            {step === 'qr' && (
              <div className="relative w-full max-w-[460px] flex flex-col items-center">
                
                {/* Khung QR chính */}
                <div className="relative w-full flex justify-center">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/premium/QR.png`} 
                    alt="Trạm thanh toán QR" 
                    className="w-full object-contain drop-shadow-2xl"
                  />
                  
                  {/* Số tiền hiển thị */}
                  <div className="absolute bottom-[23%] left-[49%] -translate-x-1/2 bg-[#FFC72C] text-slate-950 px-2 py-0.5 rounded text-[11px] font-black shadow-sm">
                    {selectedPlan === 'monthly' ? '99.000đ' : '599.000đ'}
                  </div>
                </div>

                {/* Cụm 2 nút bấm chia tỷ lệ chuẩn theo đúng kích thước gốc Figma (276.12 : 441.88) */}
                <div className="flex gap-2.5 w-full mt-3 px-1 items-center">
                  <button
                    onClick={handleBackToPlans}
                    style={{ flex: '276.12' }}
                    className="hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}images/premium/Button.png`} 
                      alt="Quay lại" 
                      className="w-full object-contain drop-shadow-md" 
                    />
                  </button>

                  <button
                    onClick={handleConfirmTransfer}
                    style={{ flex: '441.88' }}
                    className="hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}images/premium/Button-1.png`} 
                      alt="Tôi đã chuyển khoản" 
                      className="w-full object-contain drop-shadow-md" 
                    />
                  </button>
                </div>

              </div>
            )}

            {/* ================= BƯỚC 3: THÀNH CÔNG ================= */}
            {step === 'success' && (
              <div className="relative w-full max-w-[460px] flex justify-center">
                <img 
                  src={`${import.meta.env.BASE_URL}images/premium/QR-1.png`} 
                  alt="Thông tin đã được ghi nhận" 
                  className="w-full object-contain drop-shadow-2xl"
                />
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};