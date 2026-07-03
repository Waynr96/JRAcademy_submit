import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateRegisterEmail,
  validateRegisterPassword,
  validateConfirmPassword,
  validateRegister,
} from "../../utils/validators";
import { useEmail } from "../../hooks/useEmail";
import TextInput from "../../components/TextInput";
import "./register.css";

function mockRegister() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const { email, emailError, emailChange, setEmailError } = useEmail(validateRegisterEmail);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [status, setStatus] = useState("idle");

  // 事件处理函数
  // e 是事件对象，e.target.value 就是输入框里当前的文字

  function nameChange(e) {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  }

  function passwordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validateRegisterPassword(value));
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
    }
  }

  function confirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, password));
  }

  // ─── 点击 Register 按钮时触发 ───
  async function handleSubmit(e) {
    // 阻止表单默认行为（默认会刷新页面），让我们自己控制提交逻辑
    e.preventDefault();

    // 对所有字段做一次完整校验
    // （不能直接用 nameError 等 state，因为 state 的更新是异步的，这里拿到的可能是旧值）
    const errMsg = validateRegister({ name, email, password, confirmPassword });

    // 把校验结果更新到 state，让页面显示所有错误提示
    setNameError(errMsg.nameError);
    setEmailError(errMsg.emailError);
    setPasswordError(errMsg.passwordError);
    setConfirmPasswordError(errMsg.confirmPasswordError);

    if (
      errMsg.nameError ||
      errMsg.emailError ||
      errMsg.passwordError ||
      errMsg.confirmPasswordError
    )
      return;

    setStatus("loading");
    await mockRegister();
    setStatus("success");

    // 停留片刻让用户看到成功提示，再跳转回登录页
    setTimeout(() => navigate("/"), 1000);
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="registre-title">CareerMate Register</h1>

        {/* onSubmit：点击 type="submit" 的按钮时触发 handleSubmit */}
        <form onSubmit={handleSubmit}>
          <TextInput
            autoFocus
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={nameChange}
            error={nameError}
          />

          <TextInput
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

          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={confirmPasswordChange}
            error={confirmPasswordError}
          />

          {/* 提交按钮，type="submit" 会触发 form 的 onSubmit */}
          <button
            className={`register-btn ${status === "loading" ? "btn-loading" : ""}`}
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>
        {status === "success" && (
          <p className="success-message">Register success</p>
        )}
        <p className="switch-auth-text">
          Already have an account?{" "}
          <span className="switch-auth-link" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
