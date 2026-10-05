import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider, sendPasswordResetEmail } from '../services/firebase';
import { Mail, Lock, Sparkles, KeyRound, User, UserPlus } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const AuthModal: React.FC = () => {
  const { setUser } = useGameStore();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  // 1. Xử lý Đăng nhập Email & Mật khẩu
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

  // 2. Xử lý Đăng ký Tài khoản Mới
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
        setErrorMsg('Email này đã có tài khoản. Vui lòng nhập mật khẩu để đăng nhập!');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Định dạng Email không hợp lệ!');
      } else {
        setErrorMsg('Đăng ký thất bại. Vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Đăng nhập nhanh bằng Google
  const handleGoogleLogin = async () => {
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
      setErrorMsg('Đăng nhập Google thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // 4. Gửi Mail Reset Password
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
      style={{ backgroundImage: `url('/images/BG4.png')` }}
    >
      {/* Lớp phủ tối màu giúp nội dung form nổi bật trên nền BG4 */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 bg-slate-900/90 border-2 border-pink-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-white">
        
        {/* Tiêu đề Modal */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-yellow-300 flex items-center justify-center gap-2">
            <Sparkles className="text-pink-400" /> KÉN
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login' && 'Đăng nhập để tiếp tục hành trình khám phá'}
            {mode === 'register' && 'Tạo tài khoản mới cho bé và phụ huynh'}
            {mode === 'forgot' && 'Khôi phục lại mật khẩu tài khoản'}
          </p>
        </div>

        {/* Thông báo Lỗi */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs text-center font-bold">
            {errorMsg}
          </div>
        )}

        {/* ----------------- 1. FORM ĐĂNG NHẬP ----------------- */}
        {mode === 'login' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhap@email.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Mật khẩu</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
              <button
                type="button"
                onClick={() => switchMode('forgot')}
                className="text-[11px] text-pink-400 hover:underline cursor-pointer mt-1"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 font-bold rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer text-sm"
            >
              {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-800" />
              <span className="bg-slate-900 px-3 text-[10px] text-slate-400 font-bold uppercase">Hoặc</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all shadow flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Đăng nhập bằng Google
            </button>

            {/* Chuyển qua Đăng ký */}
            <div className="text-center pt-2 text-xs text-slate-300">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="text-yellow-400 font-bold hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </div>
          </form>
        )}

        {/* ----------------- 2. FORM ĐĂNG KÝ ----------------- */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tên / Biệt danh của bé</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Ví dụ: Bé Bo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Phụ huynh</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhap@email.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer text-sm mt-2 flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              {loading ? 'Đang tạo tài khoản...' : 'TẠO TÀI KHOẢN CỦA BÉ'}
            </button>

            {/* Quay lại Đăng nhập */}
            <div className="text-center pt-2 text-xs text-slate-300">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-pink-400 font-bold hover:underline cursor-pointer"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        )}

        {/* ----------------- 3. FORM QUÊN MẬT KHẨU ----------------- */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            {resetSent ? (
              <div className="text-center py-4 space-y-3">
                <KeyRound size={40} className="text-emerald-400 mx-auto animate-pulse" />
                <p className="text-xs text-emerald-300 font-bold">
                  Đã gửi Email khôi phục! Vui lòng kiểm tra hộp thư để thiết lập mật khẩu mới.
                </p>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Quay lại Đăng nhập
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nhập Email tài khoản của bạn
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nhap@email.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500 text-white font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-pink-500 hover:bg-pink-600 font-bold rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer text-sm"
                >
                  {loading ? 'Đang gửi...' : 'GỬI LINK KHÔI PHỤC MẬT KHẨU'}
                </button>

                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="w-full py-2 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Quay lại Đăng nhập
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};