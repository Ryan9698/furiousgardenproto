const mongoose = require("mongoose");
const User = require("../models/User");
const db = require("../config/connection");

const users = [
  {
    username: "admin",
    email: "admin@fg.com",
    password: "admin",
  },
  {
    username: "user1",
    email: "user@fg.com",
    password: "user1",
  },
  {
    username: "guest",
    email: "guest@fg.com",
    password: "guest",
  },
  {
    username: "admin2",
    email: "admin2@fg.com",
    password: "admin2",
  },
  {
    username: "user2",
    email: "user2@fg.com",
    password: "user2",
  },
];

const seedUsers = async () => {
  await db;
  await User.deleteMany({});
  await User.insertMany(users);

  console.log("Seeded users successfully!");
  mongoose.disconnect();
};

seedUsers().catch(console.error);
