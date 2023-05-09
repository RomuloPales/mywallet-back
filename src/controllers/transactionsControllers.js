import { transactionsCollection } from "../database/db.js";

export async function createTransaction(req, res) {
  const transactions = res.locals.transactions;

  try {
    await transactionsCollection.insertOne(transactions);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendstatus(500);
  }
}

export async function getTransactions(req, res) {
  const user = res.locals.user;
  try {
    const transactions = await transactionsCollection.find({ user: user._id }).toArray();
    delete user.password;
    res.send({transactions, user});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
