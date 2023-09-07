import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect( process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};

export default connectDatabase;
