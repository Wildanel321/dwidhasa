import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVfwnb9AK-m5JrMpHOJZhNeyeAmIlvdMo",
  authDomain: "kelasdwidhasa.firebaseapp.com",
  projectId: "kelasdwidhasa",
  storageBucket: "kelasdwidhasa.firebasestorage.app",
  messagingSenderId: "841315848969",
  appId: "1:841315848969:web:35862b13250033294339d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
