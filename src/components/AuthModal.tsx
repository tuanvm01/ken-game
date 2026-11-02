import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider, sendPasswordResetEmail } from '../services/firebase';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const AuthModal: React.FC = () => {
  const { setUser } = useGameStore();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form khi chuyển chế độ
  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    soundManager.playPop();
    setMode(newMode);
    setErrorMsg('');
    setResetSent(false);
  };

  // 1. Xử lý Đăng nhập Email/Mật khẩu
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: res.user.uid,
        displayName: (res.user.displayName || email.split('@')[0]) as string,
      });
    } catch (err: any) {
      setErrorMsg('Tài khoản hoặc mật khẩu không chính xác!');
    } finally {
      setLoading(false);
    }
  };

  // 2. Xử lý Đăng ký
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();
    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser && displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }
      setUser({
        uid: res.user.uid,
        displayName: displayName || email.split('@')[0],
      });
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setMode('login');
        setErrorMsg('Email này đã có tài khoản. Vui lòng đăng nhập!');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Định dạng Email không hợp lệ!');
      } else {
        setErrorMsg('Đăng ký thất bại. Vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Đăng nhập Google (Đã fix lỗi bị đóng popup/reload trang)
  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault(); // Chặn hành vi mặc định của form
    soundManager.playPop();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser({
        uid: res.user.uid,
        displayName: (res.user.displayName || 'Bé Ngoan') as string,
      });
    } catch (err: any) {
      console.error("Lỗi Google Login:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Bạn đã đóng cửa sổ đăng nhập!');
      } else {
        setErrorMsg('Đăng nhập Google thất bại. Vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Quên mật khẩu
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();
    if (!email) {
      setErrorMsg('Vui lòng nhập Email đã đăng ký!');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setErrorMsg('Email chưa được đăng ký hoặc không hợp lệ!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 z-50 font-cute select-none"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/BG4.png')` }}
    >
      {/* Lớp phủ mờ */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Container chính */}
      <div className="relative z-10 w-full max-w-sm">
        
        {/* Nút Quay Lại (Góc trên trái ngoài form) */}
        <button 
          onClick={() => mode !== 'login' ? switchMode('login') : null}
          className={`absolute -top-12 left-0 bg-[#5B42F3] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-[0_3px_0_#3B26B6] active:shadow-none active:translate-y-[3px] transition-all cursor-pointer ${mode === 'login' ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ChevronLeft size={16} /> Quay lại
        </button>

        {/* Form Container */}
        <div className="bg-[#FFF8E7] border-[4px] border-[#5B42F3] rounded-[32px] p-6 md:p-8 w-full shadow-[0_8px_0_#5B42F3]">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black text-[#5B42F3] tracking-widest mb-1">
              KÉN
            </h1>
            <p className="text-[11px] font-bold text-[#5B42F3] uppercase tracking-wide mb-1">
              {mode === 'login' ? 'Chào mừng bạn trở lại' : mode === 'register' ? 'Chào mừng đến với Kén' : 'Khôi phục tài khoản'}
            </p>
            <h2 className="text-2xl font-black text-[#1A1A1A]">
              {mode === 'login' && 'Đăng nhập'}
              {mode === 'register' && 'Đăng ký'}
              {mode === 'forgot' && 'Quên mật khẩu'}
            </h2>
          </div>

          {/* Thông báo Lỗi */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-600 rounded-xl text-xs text-center font-bold">
              {errorMsg}
            </div>
          )}

          {/* ----------------- 1. FORM ĐĂNG NHẬP ----------------- */}
          {mode === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Tên đăng nhập (Email)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhap@email.com"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors tracking-widest"
                />
              </div>

              {/* Ghi nhớ tôi & Quên mật khẩu */}
              <div className="flex justify-between items-center px-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#5B42F3] border-[#5B42F3]' : 'bg-white border-[#5B42F3]/40 group-hover:border-[#5B42F3]'}`}>
                    {rememberMe && <Check size={12} className="text-white" strokeWidth={4} />}
                  </div>
                  <span className="text-[10px] font-bold text-[#5B42F3]" onClick={() => setRememberMe(!rememberMe)}>Ghi nhớ tôi</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-[10px] font-bold text-[#5B42F3] hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#FFC72C] text-[#5B42F3] font-black rounded-full shadow-[0_4px_0_#D9A016] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-1 cursor-pointer text-sm"
              >
                {loading ? 'Đang xử lý...' : 'Đăng nhập'} <ChevronRight size={18} strokeWidth={3} />
              </button>

              {/* Divider trang trí */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="w-16 h-[2px] bg-[#5B42F3]/20"></div>
                <div className="w-2 h-2 rotate-45 bg-[#FFC72C] mx-2"></div>
                <div className="w-16 h-[2px] bg-[#5B42F3]/20"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2.5 bg-white border-2 border-[#5B42F3] text-[#5B42F3] font-bold rounded-full shadow-[0_4px_0_#5B42F3] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Tiếp tục với Google
              </button>

              <div className="text-center pt-3 text-[10px] font-bold text-[#1A1A1A]">
                Chưa có tài khoản?{' '}
                <button type="button" onClick={() => switchMode('register')} className="text-[#5B42F3] hover:underline cursor-pointer">
                  Đăng ký ngay!
                </button>
              </div>
            </form>
          )}

          {/* ----------------- 2. FORM ĐĂNG KÝ ----------------- */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Tên / Biệt danh bé</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ví dụ: Bé Bo"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Email phụ huynh</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhap@email.com"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Mật khẩu</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors tracking-widest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 bg-[#FFC72C] text-[#5B42F3] font-black rounded-full shadow-[0_4px_0_#D9A016] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-1 cursor-pointer text-sm"
              >
                {loading ? 'Đang tạo...' : 'Đăng ký'} <ChevronRight size={18} strokeWidth={3} />
              </button>

              <div className="text-center pt-3 text-[10px] font-bold text-[#1A1A1A]">
                Đã có tài khoản?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-[#5B42F3] hover:underline cursor-pointer">
                  Đăng nhập ngay!
                </button>
              </div>
            </form>
          )}

          {/* ----------------- 3. QUÊN MẬT KHẨU ----------------- */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              {resetSent ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-16 h-16 bg-[#FFC72C] rounded-full flex items-center justify-center mx-auto shadow-[0_4px_0_#D9A016]">
                    <Check size={32} className="text-[#5B42F3]" strokeWidth={4} />
                  </div>
                  <p className="text-sm font-bold text-[#5B42F3] px-4">
                    Link khôi phục đã được gửi! Vui lòng kiểm tra email của bạn.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full py-3 bg-white border-2 border-[#5B42F3] text-[#5B42F3] font-bold rounded-full shadow-[0_4px_0_#5B42F3] active:shadow-none active:translate-y-[4px] transition-all cursor-pointer text-sm"
                  >
                    Quay lại Đăng nhập
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1A1A1A] mb-1.5 ml-2">Nhập Email tài khoản</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nhap@email.com"
                      className="w-full bg-white border-2 border-[#5B42F3]/40 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-[#5B42F3] text-[#1A1A1A] font-bold transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 bg-[#FFC72C] text-[#5B42F3] font-black rounded-full shadow-[0_4px_0_#D9A016] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-1 cursor-pointer text-sm"
                  >
                    {loading ? 'Đang gửi...' : 'Gửi link khôi phục'}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};