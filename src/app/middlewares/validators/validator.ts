import { ObjectSchema } from "joi";

export const validator = <T = never>(
  schema: ObjectSchema<T>,
  allowUnknown = true
) => {
  return (req, res, next) => {
    const validationResult = schema.unknown(allowUnknown).validate(req);
    if (validationResult.error)
      return res.status(400).send(validationResult.error.message);
    next();
  };
};
