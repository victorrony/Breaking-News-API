import express from "express";
import connectDatabase from "./src/database/db.js";
import "dotenv/config.js";
import cors from "cors";
import router from "./src/routes/index.js";

const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());
app.use(router)

export default app;
