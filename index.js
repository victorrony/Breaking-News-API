import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import newsRouter from "./src/routes/post.route.js";
import swaggerRouter from "./src/routes/swagger.route.cjs"


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/posts", newsRouter);
app.use("/doc", swaggerRouter);

app.listen(port, () => console.log(`Servidor rodando na port: ${port}`));
