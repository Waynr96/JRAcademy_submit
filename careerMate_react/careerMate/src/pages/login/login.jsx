import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginEmail, validateLoginPassword, validateLogin } from "../../utils/validators";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function emailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateLoginEmail(value));
  }

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
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className={`form-input ${emailError ? "input-error" : ""}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={emailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className={`form-input ${passwordError ? "input-error" : ""}`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
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
