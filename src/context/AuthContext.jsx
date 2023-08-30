import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const storage = getStorage();

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

      // ... diğer işlemler
    } catch (error) {
      // ... hata işlemleri
    }
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        setCurrentUser(user);
      }

      // ... diğer işlemler
    } catch (error) {
      // ... hata işlemleri
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);

      // ... diğer işlemler
    } catch (error) {
      // ... hata işlemleri
    }
  }

  async function forgetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);

      // ... diğer işlemler
    } catch (error) {
      // ... hata işlemleri
    }
  }

  async function getProfileImageUrl(userId) {
    try {
      const storageRef = ref(storage, `profile-images/${userId}`);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error getting profile image:", error);
      return null;
    }
  }

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
    loginWithGoogle,
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
