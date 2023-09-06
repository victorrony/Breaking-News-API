const express = require("express");
const userRouter = require("./src/routes/user.route");
const app = express();

const connectDatabase = require("./src/database/db");

const port = 3000;

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => console.log("Servidor rodando na porta 3000") );
