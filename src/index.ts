import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import cors from "cors";

const app = express();

const { SERVER_PORT } = process.env;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", auth);

app.listen(SERVER_PORT, () => {
  console.log(`Server started at http://localhost${SERVER_PORT}`);
});
