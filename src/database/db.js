const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://victorrony89:MxHzUfnRoMfT9t52@cluster0.qfovjja.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
