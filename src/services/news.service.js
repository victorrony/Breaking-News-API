import News from "../models/New.js";

const createNewsService = async (body) => News.create(body);

const findAllNewsService = async () => News.find();

export { createNewsService, findAllNewsService };
