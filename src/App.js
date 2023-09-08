import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AuthContextProvider>
        {/* <VideoProvider> */}
        <AppRouter />
        <ToastContainer />
        {/* </VideoProvider> */}
      </AuthContextProvider>
    </>
  );
}

export default App;
