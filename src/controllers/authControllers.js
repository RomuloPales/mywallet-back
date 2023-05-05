import { sessionsollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

export async function signUp(req, res) {
  const user = res.locals.user;
  const passwordHash = bcrypt.hashSync(user.password, 10);
  try {
    await usersCollection.insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
const user = res.locals.user;
  const token = uuidv4();

  try { 
    await sessionsollection.insertOne({ token, userId: user._id });
    res.send({ token });
  }
  catch (err) { 
    console.log(err);
    res.sendStatus(500);
  }
}
