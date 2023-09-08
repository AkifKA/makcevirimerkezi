import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

// export const {Provider} = createContext()
export const AuthContext = createContext();
//* with custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      //? Firebase method used to create a new user
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/");
      toastSuccessNotify("Registered succesfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccessNotify("Logged in succesfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out succesfully!");
  };

  const userObserver = () => {
    //? Firebase method that monitors whether the user is signin or not and returns the new user as a response when the user changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;

        setCurrentUser({ email, displayName, photoURL });
        //? Sending user information to session storage
      } else {
        setCurrentUser(false);
      }
    });
  };

  //? Firebase method used to login with google
  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    //? Firebase method used to login with popup window
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in succesfully!");
      })
      .catch((error) => {});
  };

  const forgotPassword = (email) => {
    //? Firebase method used for password reset via email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        //? Password reset email sent!
        toastWarnNotify("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
      });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    signUpProvider,
    currentUser,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
