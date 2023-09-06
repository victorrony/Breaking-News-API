const express = require("express");
const userRouter = require("./src/routes/user.route");
const app = express();

//Rota
app.use("/soma", userRouter);

app.listen(3000);
