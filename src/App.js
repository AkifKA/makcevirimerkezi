import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { VideoProvider } from "./context/VideoContext";
import { LikeCommentProvider } from "./context/LikesComments";

function App() {
  return (
    <>
      <AuthProvider>
        <LikeCommentProvider>
          <VideoProvider>
            <AppRouter />
            <ToastContainer />
          </VideoProvider>
        </LikeCommentProvider>
      </AuthProvider>
    </>
  );
}

export default App;
