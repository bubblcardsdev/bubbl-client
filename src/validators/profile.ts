import Joi from "joi";


export const EditProfileSchema = Joi.object({
  profileName: Joi.string().trim().required().messages({
    "string.empty": "Profile name is required.",
  }),
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required.",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required.",
  }),
  designation: Joi.string().trim().allow("").optional(),
  companyName: Joi.string().trim().allow("").optional(),
  companyAddress: Joi.string().trim().allow("").optional(),
  shortDescription: Joi.string().trim().allow("").optional(),
  address: Joi.string().trim().allow("").optional(),
  city: Joi.string().trim().allow("").optional(),
zipCode: Joi.string()
  .trim()
  .allow("") // allow empty if optional
  .pattern(/^\d{5,6}$/) // 5 or 6 digits
  .messages({
    "string.pattern.base": "Enter a valid zip code (5–6 digits).",
  })
  .optional(),
  state: Joi.string().trim().allow("").optional(),
  country: Joi.string().trim().allow("").optional(),

  // Phone numbers: 1 mandatory, max 2
  phoneNumbers: Joi.array()
    .items(
      Joi.object({
        phoneNumberId: Joi.number().optional(),
        countryCode: Joi.string().required().messages({
          "string.empty": "Country code is required.",
        }),
        phoneNumber: Joi.string()
          .trim()
          .pattern(/^[0-9]{10,15}$/)
          .required()
          .messages({
            "string.empty": "Phone number is required.",
            "string.pattern.base": "Enter a valid phone number (10–15 digits).",
          }),
        phoneNumberType: Joi.string().optional(),
        checkBoxStatus: Joi.boolean().optional(),
        activeStatus: Joi.boolean().required(),
      })
    )
    .min(1)
    .max(2)
    .required()
    .messages({
      "array.min": "At least 1 phone number is required.",
      "array.max": "You can add up to 2 phone numbers only.",
      "any.required": "Phone numbers are required.",
    }),

  // Emails: 1 mandatory, max 2
  emailIds: Joi.array()
    .items(
      Joi.object({
        emailIdNumber: Joi.number().optional(),
        emailId: Joi.string()
          .trim()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.empty": "Email is required.",
            "string.email": "Enter a valid email address.",
          }),
        emailType: Joi.string().optional(),
        checkBoxStatus: Joi.boolean().optional(),
        activeStatus: Joi.boolean().required(),
      })
    )
    .min(1)
    .max(2)
    .required()
    .messages({
      "array.min": "At least 1 email is required.",
      "array.max": "You can add up to 2 emails only.",
      "any.required": "Emails are required.",
    }),
}).unknown(true);
