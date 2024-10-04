const mongoose = require("mongoose");
const { mongoUrl } = require("./config");

mongoose.connect(mongoUrl);
