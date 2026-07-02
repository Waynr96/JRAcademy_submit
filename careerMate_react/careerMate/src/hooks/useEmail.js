import { useState } from "react";

export function useEmail(validate) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function emailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validate(value));
  }

  return { email, emailError, emailChange, setEmailError };
}
