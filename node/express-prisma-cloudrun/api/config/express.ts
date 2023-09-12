import express, { Application } from "express";
import cors from "cors";
import user from "../modules/user/routes/user";

const app: Application = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use("/users", user);

export default app;
