import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const storage = getStorage();
  const navigate = useNavigate();

  //? Register and Login with Email, password, displayName
  async function signup(email, password, displayName, profileImage) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: displayName,
          photoURL: profileImage,
        });

        setCurrentUser(user);
      }

      toastSuccessNotify("Kayıt başarılı...");
    } catch (error) {
      toastErrorNotify("Kayıt başarısız:", error.massage);
    }
  }

  //? Login with email and password
  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        setIsAdmin(user.email === "makceviriatolyesi@gmail.com"); // Admin e-posta kontrolü

        setCurrentUser(user);
      }
      navigate(-1);
      toastSuccessNotify("Giriş başarılı...");
    } catch (error) {
      toastErrorNotify("Giriş başarısız:", error);
    }
  }

  //? Login with google
  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        setIsAdmin(user.email === "makceviriatolyesi@gmail.com"); // Admin e-posta kontrolü
        const googleProfileImage = user.photoURL; // Google hesabındaki profil resmi
        const imageUrl = googleProfileImage || currentUser?.photoURL; // Eğer Google hesabında resim yoksa, kullanıcının mevcut resmini kullan

        await updateProfile(auth.currentUser, {
          displayName: user.displayName,
          photoURL: imageUrl,
        });

        setCurrentUser((prevUser) => ({
          ...prevUser,
          displayName: user.displayName,
          photoURL: imageUrl,
        }));
      }
      navigate(-1);
      toastSuccessNotify("Giriş başarılı...");
    } catch (error) {
      toastErrorNotify("Giriş başarısız:", error);
    }
  }

  //? Logout
  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toastSuccessNotify("Çıkış başarılı...");
      navigate("/login");
    } catch (error) {
      toastErrorNotify("Çıkış başarısız:", error);
    }
  }

  //? Reset passsword
  async function forgetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      toastSuccessNotify(
        `${email} adresine şifre sısıfırlama linki başarıyla gönderildi`
      );
    } catch (error) {
      toastErrorNotify("Lüften geçerli bir mail adresi giriniz:", error);
    }
  }

  //? Update profile image
  async function getProfileImageUrl(userId) {
    try {
      const storageRef = ref(storage, `profile-images/${userId}`);
      const imageUrl = await getDownloadURL(storageRef);
      toastSuccessNotify("Profil resmi başarıyla güncellendi...");
      return imageUrl;
    } catch (error) {
      console.error("Error getting profile image:", error);
      toastErrorNotify("Bir hata oluştu:", error);
      return null;
    }
  }

  //? Upload profil image to google firebase storage
  async function uploadProfileImage(userId, file) {
    const storageRef = ref(storage, `profile-images/${userId}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    try {
      await updateProfile(auth.currentUser, {
        photoURL: imageUrl,
      });

      setCurrentUser((prevUser) => {
        const newUser = {
          ...prevUser,
          photoURL: imageUrl,
        };
        return newUser;
      });
      return imageUrl;
    } catch (error) {
      console.error("Error updating profile image URL:", error);
      return null;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        setIsAdmin(
          user.email === "makceviriatolyesi@gmail.com" ||
            user.email === "karaozmehmetakif@gmail.com" ||
            user.email === "mucahid1985@gmail.com"
        );
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
    signup,
    loginWithGoogle,
    login,
    logout,
    forgetPassword,
    getProfileImageUrl,
    uploadProfileImage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
