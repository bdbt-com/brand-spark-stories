import { useState } from "react";
import { validateFirstName, validateEmail } from "@/utils/validation";

export const useFormValidation = () => {
  const [fieldErrors, setFieldErrors] = useState<{firstName?: string; email?: string}>({});

  const validateField = (field: "firstName" | "email", value: string) => {
    const error = field === "firstName" 
      ? validateFirstName(value) 
      : validateEmail(value);
    
    setFieldErrors(prev => ({ 
      ...prev, 
      [field]: error || undefined 
    }));
    
    return error;
  };

  const validateAllFields = (firstName: string, email: string) => {
    const firstNameError = validateFirstName(firstName);
    const emailError = validateEmail(email);
    
    setFieldErrors({
      firstName: firstNameError || undefined,
      email: emailError || undefined
    });
    
    return !firstNameError && !emailError;
  };

  const clearErrors = () => {
    setFieldErrors({});
  };

  return {
    fieldErrors,
    validateField,
    validateAllFields,
    clearErrors
  };
};