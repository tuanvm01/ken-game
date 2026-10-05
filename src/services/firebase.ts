import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

// Điền cấu hình Firebase Project của bạn vào đây
const firebaseConfig = {
  apiKey: "AIzaSyAwSpSx_4WHBUDrajsFwIGM-do1MkPobb8",
  authDomain: "kens-5db76.firebaseapp.com",
  projectId: "kens-5db76",
  storageBucket: "kens-5db76.firebasestorage.app",
  messagingSenderId: "945947073532",
  appId: "1:945947073532:web:443c006aa10aa631ddf079",
  measurementId: "G-XYQGRB5BHK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Kích hoạt ghi nhớ đăng nhập trình duyệt
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
export { sendPasswordResetEmail, signOut };