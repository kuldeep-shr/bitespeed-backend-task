import { Joi, Segments } from "celebrate";

export const contactSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string().email(),
      phoneNumber: Joi.string().pattern(/^[0-9]{10}$/),
    })
    .or("email", "phoneNumber")
    .messages({
      "object.missing":
        "At least one of email or phoneNumber must be provided.",
      "string.email": "Email must be a valid email address.",
      "string.pattern.base": "Phone number must be exactly 10 digits.",
    }),
};
