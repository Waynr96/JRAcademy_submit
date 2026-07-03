import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginEmail, validateLoginPassword, validateLogin } from "../../utils/validators";
import { useEmail } from "../../hooks/useEmail";
import TextInput from "../../components/TextInput";
import "./login.css";

function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "123456") {
        resolve();
      } else {
        reject(new Error("Incorrect email or password"));
      }
    }, 1000);
  });
}

function Login() {
  const navigate = useNavigate();
  const { email, emailError, emailChange, setEmailError } = useEmail(validateLoginEmail);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  // 页面第一次打开后，把光标自动定位到 Email 输入框
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  function passwordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validateLoginPassword(value));
  }

  async function handleLogin() {
    const errMsg = validateLogin({ email, password });
    setEmailError(errMsg.emailError);
    setPasswordError(errMsg.passwordError);
    if (errMsg.emailError || errMsg.passwordError) return;

    setError("");
    setStatus("loading");
    try {
      await mockLogin(email, password);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <TextInput
          ref={emailInputRef}
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={emailChange}
          error={emailError}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={passwordChange}
          error={passwordError}
        />
        <button
          className={`login-btn ${status === "loading" ? "btn-loading" : ""}`}
          onClick={handleLogin}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {status === "error" && <p className="error-message">{error}</p>}
        {status === "success" && (
          <p className="success-message">Login Success</p>
        )}
        <p className="switch-auth-text">
          Don't have an account?{" "}
          <span className="switch-auth-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
