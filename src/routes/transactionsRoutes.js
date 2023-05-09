import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionsControllers.js";
import { transactionValidationSchema } from "../middlewares/transactionValidationMiddleware.js";
import { authRoutesValidation } from "../middlewares/authValidationMiddleware.js";

const router = Router();

router.post("/transactions", authRoutesValidation,transactionValidationSchema,  createTransaction);
router.get("/transactions", authRoutesValidation, getTransactions);

export default router;
