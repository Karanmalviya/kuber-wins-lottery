import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRegisteration, userLogin } from "./index";
import { toast } from "react-hot-toast";
import { resendVerificationMail } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("isLogged");
    if (loggedInUser) {
      return {
        isLoggedIn: true,
        accessToken: localStorage.getItem("accessToken"),
        userId: localStorage.getItem("userId"),
      };
    }
    return { isLoggedIn: false };
  });

  const showMessage = (message, success, email, promise) => {
    if (promise) {
      toast.promise(resendVerificationMail({ email }), {
        loading: "Verification email is Sending to " + email + "...",
        success: "Verification email sent to " + email,
        error: "Failed to send verification email.",
      });
      return;
    }
    let id = toast[success ? "success" : "error"](
      <div className="d-flex align-items-center">
        {message}{" "}
        {email && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              toast.dismiss(id);
              showMessage("", "", email, true);
            }}
          >
            resend
          </button>
        )}
      </div>,
      {
        duration: 3000,
        id: "clipboard",
      }
    );
  };

  const handleLogin = async (body) => {
    try {
      const res = await userLogin(body);
      if (res.message === "Success") {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("expiresAt", res.data.expiresAt);

        setUser({
          isLoggedIn: true,
          accessToken: res.data.token,
          userId: res.data.id,
        });
        navigate("/");
        showMessage(res.message, res.message === "Success");
      } else {
        if (res.message === "Please verify your email before logging in") {
          showMessage(res.message, false, body.username, false);
          return;
        }
        showMessage(res.message, false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleRegistration = async (body, setLoading) => {
    try {
      const res = await userRegisteration(body, setLoading);
      showMessage(
        res.message,
        res.message ===
          "Registration successful. Please check your email to verify your account."
      );
      if (
        res.message ===
        "Registration successful. Please check your email to verify your account."
      ) {
        setTimeout(() => navigate("/login"), 2500);
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({ isLoggedIn: false });
    navigate("/");
    window.location.reload(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register: handleRegistration,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
