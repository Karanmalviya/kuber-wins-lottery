import { AppRootContainer } from "./../shared/app-root/app-root.container";
import store from "./store";
import { useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { history } from "../history";

function App() {
  const navigate = useNavigate();
  const userLocal = localStorage.getItem("user");
  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    if (userLocal) {
      const checkLogout = () => {
        const parsedUser = JSON.parse(userLocal);
        const expiresAt = parsedUser.expiresAt;
        const currentTime = new Date().toISOString();

        if (expiresAt && expiresAt < currentTime) {
          localStorage.clear("user");
          localStorage.clear("token");
          window.location.reload();
          navigate("/login");
        }
      };

      const intervalId = setInterval(checkLogout, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [userLocal]);

  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRootContainer />
    </Provider>
  );
}

export default App;
