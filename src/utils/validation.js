export const validateName = (name) => {
  if (!name) {
    return "name is required";
  } else if (name.length < 2) {
    return "name must be at least 2 characters";
  }
  return "";
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "email is required";
  } else if (!emailRegex.test(email)) {
    return "invalid email format";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "password is required";
  } else if (password.length < 6) {
    return "password must be at least 6 characters";
  }
  return "";
};

export const validateForm = (form) => {
  const errors = {};
  errors.name = validateName(form.name);
  errors.email = validateEmail(form.email);
  errors.password = validatePassword(form.password);
  return errors;
};

export default validateForm;
