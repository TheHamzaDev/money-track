import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import Transaction from "./models/transaction.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/api/test", (req, res) => {
//   res.json("test ok");
// });

//connect to db
app.post("/api/transaction", async (req, res) => {
  //npm i mongoose
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price } = req.body;
  const transaction = await Transaction.create({ name, price });
  res.json(transaction);
});

// get data
app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(5172);
