import { sessionsollection, usersCollection } from "../database/db.js";
import { usersSchema } from "../schemas/usersSchema.js";
import bcrypt from "bcrypt";

export function userSchemaValidation(req, res, next) {
  const user = req.body;

  const { error } = usersSchema.validate(user, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  res.locals.user = user;
  next();
}

export async function signinSchemaValidation(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}

export async function authRoutesValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
