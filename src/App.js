import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import { VideosProvider } from "./context/VideosContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <VideosProvider>
          <AppRouter />
          <ToastContainer />
        </VideosProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
