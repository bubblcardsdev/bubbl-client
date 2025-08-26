import Joi from "joi";

export const EditProfileSchema = Joi.object({
   profileName: Joi.string().trim().required().messages({
    "string.empty": "profileName is required.",
  }),
  firstName: Joi.string().trim().required().messages({
    "string.empty": "FirstName is required.",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "LastName is required.",
  }),
  designation: Joi.string().trim().required().messages({
    "string.empty": "Designation is required.",
  }),
  companyName: Joi.string().trim().required().messages({
    "string.empty": "Company name is required.",
  }),
  companyAddress: Joi.string().trim().required().messages({
    "string.empty": "Company address is required.",
  }),
  shortDescription: Joi.string().trim().required().messages({
    "string.empty": "Description is required.",
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required.",
  }),
  city: Joi.string().trim().required().messages({
    "string.empty": "City is required.",
  }),
  zipCode: Joi.string().trim().required().messages({
    "string.empty": "Zip code is required.",
  }),
  state: Joi.string().trim().required().messages({
    "string.empty": "State is required.",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required.",
  }),

  // ✅ Phone numbers (max 2 entries, worldwide format check)
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
    .max(2)
    .optional(),

  // ✅ Emails (max 2 entries)
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
    .max(2)
    .optional(),

  // ✅ Websites (max 1 entry)
  websites: Joi.array()
    .items(
      Joi.object({
        websiteId: Joi.number().optional(),
        website: Joi.string().uri().allow(""),
        websiteType: Joi.string().allow(""),
        checkBoxStatus: Joi.boolean(),
        activeStatus: Joi.boolean(),
      })
    )
    .max(2),

  // ✅ Social Media
  socialMediaNames: Joi.array().items(
    Joi.object({
      profileSocialMediaLinkId: Joi.number().optional(),
      profileSocialMediaId: Joi.number().required(),
      socialMediaName: Joi.string().required().min(1),
      enableStatus: Joi.boolean(),
      activeStatus: Joi.boolean(),
    })
  ),

  digitalPaymentLinks: Joi.array()
    .items(
      Joi.object({
        profileDigitalPaymentLinkId: Joi.number().optional(),
        profileDigitalPaymentsId: Joi.number().required(),
        digitalPaymentLink: Joi.string(),
        enableStatus: Joi.boolean().optional(),
        activeStatus: Joi.boolean().required(),})
    )
    .max(3)
    .optional()
});
