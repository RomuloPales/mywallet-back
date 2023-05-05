import { usersCollection } from "../database/database.js";
import bcrypt from "bcrypt";

export async function singUp(req, res) {
  const user = res.locals.user;
  const passwordHash = bcrypt.hashSync(user.password, 10);
  try {
    await usersCollection.insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function sigIn(req, res) {}
