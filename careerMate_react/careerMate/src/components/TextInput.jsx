function TextInput({ label, value, onChange, type = "text", error, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
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
