const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGO_URL;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
const EXECUTION_URL = process.env.EXECUTION_URL;

module.exports = { JWT_SECRET, saltRounds, mongoUrl, EXECUTION_URL };
