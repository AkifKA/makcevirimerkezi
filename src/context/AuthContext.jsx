import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage(); // Firebase Storage instance'ını aldık

  async function signup(email, password, displayName, profileImage) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: displayName,
        });

        if (profileImage) {
          const profileImageUrl = await uploadProfileImage(
            user.uid,
            profileImage
          );
          await updateProfile(user, {
            photoURL: profileImageUrl,
          });
        }

        setCurrentUser(user);
      }

      toastSuccessNotify("Başarıyla kayıt oldunuz.");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
      toastErrorNotify("Kayıt olma başarısız:", error.message);
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful.");
      toastSuccessNotify("Başarıyla giriş yapıldı.");
      navigate(-1);
    } catch (error) {
      console.error("Error logging in:", error.message);
      toastErrorNotify("Giriş başarısız:", error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toastSuccessNotify(
        "Başarıyla çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz"
      );
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      toastErrorNotify("Çıkış başarısız:", error.message);
    }
  }

  async function loginWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      toastSuccessNotify("Başarıyla giriş yapıldı.");
      navigate(-1);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      toastErrorNotify("Giriş başarısız:", error.message);
    }
  }

  async function forgetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      toastSuccessNotify(
        `Şu adrese sıfırlama linki gönderildi:${email}. Lütfen kontrol ediniz...`
      );
    } catch (error) {
      console.log("Password reset error:", error);
      toastErrorNotify("Resetleme başarısız:", error.message);
    }
  }

  // Profil resmini yükleme fonksiyonu
  const uploadProfileImage = async (userId, file) => {
    const storageRef = ref(storage, `profile-images/${userId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  async function getProfileImageUrl(userId) {
    const storageRef = ref(storage, `profile-images/${userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        setIsAdmin(user.email === "makceviriatolyesi@gmail.com");
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    signup,
    login,
    logout,
    loginWithGoogle,
    forgetPassword,
    uploadProfileImage,
    getProfileImageUrl,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
