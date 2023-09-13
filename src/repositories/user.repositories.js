import User from "../models/User.js";

const findByEmailUserRepository = (email) => User.findOne({ email });

const createUserRepository = ({
  name,
  userName,
  email,
  password,
  avatar,
  background,
}) => User.create({ name, userName, email, password, avatar, background });

const findAllUserRepository = () => User.find();

const findByIdUserRepository = (idUser) => User.findById(idUser);

const updateUserRepository = (
  id,
  name,
  userName,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, email, userName, password, avatar, background },
    { rawResult: true }
  );

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
};
