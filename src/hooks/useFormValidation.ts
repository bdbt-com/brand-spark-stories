import { useState } from "react";
import { validateFirstName, validateLastName, validateEmail } from "@/utils/validation";

type FieldErrors = { firstName?: string; lastName?: string; email?: string };
type Field = "firstName" | "lastName" | "email";

export const useFormValidation = () => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validateField = (field: Field, value: string) => {
    const error =
      field === "firstName"
        ? validateFirstName(value)
        : field === "lastName"
        ? validateLastName(value)
        : validateEmail(value);

    setFieldErrors((prev) => ({ ...prev, [field]: error || undefined }));
    return error;
  };

  // If 3 args: (firstName, lastName, email). Legacy 2-arg form skips lastName.
  const validateAllFields = (firstName: string, emailOrLastName: string, maybeEmail?: string) => {
    const hasLast = typeof maybeEmail === "string";
    const lastName = hasLast ? emailOrLastName : "";
    const email = hasLast ? (maybeEmail as string) : emailOrLastName;

    const firstNameError = validateFirstName(firstName);
    const lastNameError = hasLast ? validateLastName(lastName) : null;
    const emailError = validateEmail(email);

    setFieldErrors({
      firstName: firstNameError || undefined,
      lastName: lastNameError || undefined,
      email: emailError || undefined,
    });

    return !firstNameError && !lastNameError && !emailError;
  };

  const clearErrors = () => setFieldErrors({});

  return { fieldErrors, validateField, validateAllFields, clearErrors };
};
