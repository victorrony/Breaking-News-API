const express = require("express");
const userRouter = require("./src/routes/user.route");
const app = express();

const port = 3000;
app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => console.log("Servidor rodando na porta 3000") );
