import { usersSchema } from "../schemas/usersSchema.js";

export function userSchemaValidation(req, res, next) {
  const user = req.body;

  const { error } = usersSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  res.locals.user = user;
  next();
}
