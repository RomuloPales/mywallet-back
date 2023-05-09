import dayjs from "dayjs";
import { transactionsSchema } from "../schemas/transationSchema.js";

export function transactionValidationSchema(req, res, next) {
  const { value, description, type } = req.body;
  const user = res.locals.user;
  const transactions = {
    value,
    description,
    type,
    user: user._id,
    createAt: dayjs().format("DD/MM/YYYY"),
  };
  const { error } = transactionsSchema.validate(transactions, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  res.locals.transactions = transactions;
  next();
}
