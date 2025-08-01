export const validateFirstName = (name: string) => {
  if (!name.trim()) return "First name is required";
  if (name.trim().length < 2) return "First name must be at least 2 characters";
  if (name.trim().length > 50) return "First name must be less than 50 characters";
  return null;
};

export const validateEmail = (email: string) => {
  if (!email.trim()) return "Email address is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validateForm = (firstName: string, email: string) => {
  const firstNameError = validateFirstName(firstName);
  const emailError = validateEmail(email);
  
  return {
    firstName: firstNameError,
    email: emailError,
    isValid: !firstNameError && !emailError
  };
};