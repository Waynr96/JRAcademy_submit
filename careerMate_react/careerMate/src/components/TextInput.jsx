import { useRef, useEffect } from "react";

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  error,
  placeholder,
  autoFocus = false,
}) {
  const inputRef = useRef(null);

  // 只有传入 autoFocus 的输入框，才在挂载后自动获得焦点
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        ref={inputRef}
        className={`form-input ${error ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default TextInput;
