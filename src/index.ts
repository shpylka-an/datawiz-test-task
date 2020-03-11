import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { connection } from "./dbConnection";
import auth from "./routes/auth";

const app = express();

const { SERVER_PORT } = process.env;

connection.connect(err => {
  console.log(`Can not connect to DB: ${err}`);
});

app.use(bodyParser.json());

app.use("/auth", auth);

app.listen(SERVER_PORT, () => {
  console.log(`Server started at http://localhost${SERVER_PORT}`);
});
