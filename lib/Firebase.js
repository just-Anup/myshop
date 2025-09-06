// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMpO7Hl8x8bk9HAa35YcWUbrwVN8W_0RM",
  authDomain: "shopx-dc09a.firebaseapp.com",
  projectId: "shopx-dc09a",
  storageBucket: "shopx-dc09a.firebasestorage.app",
  messagingSenderId: "599423147392",
  appId: "1:599423147392:web:db6974a7e20144d588b565",
  measurementId: "G-8G29K7KFJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Only initialize analytics in browser
let analytics;
if (typeof window !== "undefined") {
  // Lazy-load analytics to prevent SSR errors
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export const auth = getAuth(app); // ✅ export auth
export default app;
