import { forwardRef } from "react";

const TextInput = forwardRef(function TextInput(
  { label, value, onChange, type = "text", error, placeholder },
  ref
) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        ref={ref}
        className={`form-input ${error ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
});

export default TextInput;
