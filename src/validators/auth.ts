import Joi from "joi";

export const stepSchemas: Record<number, Joi.ObjectSchema> = {
  1: Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required.",
    }),
  }),

  2: Joi.object({
    role: Joi.string().trim().required().messages({
      "string.empty": "Role is required.",
    }),
    companyName: Joi.string().trim().required().messages({
      "string.empty": "Company name is required.",
    }),
  }),

  3: Joi.object({
    email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email address.",
    }),  
  }),

  4: Joi.object({
    password: Joi.string()
      .trim()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required.",
        "string.pattern.base":
          "Password must be at least 8 characters, include letters, numbers & special characters.",
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match.",
        "any.required": "Confirm Password is required.",
      }),
  }),
};
