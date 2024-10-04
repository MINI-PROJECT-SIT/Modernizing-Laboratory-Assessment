const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

module.exports = { JWT_SECRET, saltRounds, mongoUrl };
