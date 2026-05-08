const mongoose = require("mongoose");
const Quest = require("./models/Quest");
const quests = require("./seedData");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Quest.deleteMany();
  await Quest.insertMany(quests);
  console.log(`Загружено ${quests.length} квестов!`);
  process.exit();
});
