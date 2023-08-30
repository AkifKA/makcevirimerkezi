import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { VideoProvider } from "./context/VideoContext";

function App() {
  return (
    <>
      <AuthProvider>
        <VideoProvider>
          <AppRouter />
          <ToastContainer />
        </VideoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
