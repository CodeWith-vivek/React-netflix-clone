// Each validator returns an error message, or null when the input is valid.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./]).{6,}$/;

export const validateName = (name) => {
  if (!name) return "Name is required";
  if (/[^a-zA-Z0-9 ]/.test(name)) {
    return "Name can only contain letters and numbers";
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePassword = (password, { strong = false } = {}) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (strong && !STRONG_PASSWORD_REGEX.test(password)) {
    return "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  if (/\s/.test(password)) return "Password cannot contain spaces";
  return null;
};
