// ── 通用字段校验 ──

export function validateName(value) {
  // trim() 去掉首尾空格，防止用户只输入空格就通过校验
  if (!value.trim()) return "Name is required";
  return "";
}

export function validateConfirmPassword(value, password) {
  if (!value.trim()) return "Confirm Password is required";
  if (value !== password) return "Passwords do not match";
  return "";
}

// ── Login 字段校验 ──

export function validateLoginEmail(value) {
  if (!value.trim()) return "Email is required";
  if (!value.includes("@")) return "Invalid email format";
  if (value.length > 50) return "Email must be less than 50 characters";
  return "";
}

export function validateLoginPassword(value) {
  if (!value.trim()) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (value.length > 20) return "Password must be less than 20 characters";
  return "";
}

// ── Register 字段校验 ──

export function validateRegisterEmail(value) {
  if (!value.trim()) return "Email is required";
  if (!value.includes("@")) return "Invalid email format";
  return "";
}

export function validateRegisterPassword(value) {
  if (!value.trim()) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  return "";
}

// ── 表单级校验 ──

export function validateLogin({ email, password }) {
  return {
    emailError: validateLoginEmail(email),
    passwordError: validateLoginPassword(password),
  };
}

export function validateRegister({ name, email, password, confirmPassword }) {
  return {
    nameError: validateName(name),
    emailError: validateRegisterEmail(email),
    passwordError: validateRegisterPassword(password),
    confirmPasswordError: validateConfirmPassword(confirmPassword, password),
  };
}
