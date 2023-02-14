const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Student = require("./models/Student.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ironmatch";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const seedStudents = [
  {
    firstName: "Rachel",
    lastName: "Green",
    email: "rachel@friends.com",
    imageUrl: "/images/rachel.webp",
  },
  {
    firstName: "Joey",
    imageUrl: "/images/joey.jpg",
  },
  {
    firstName: "Ross",
    imageUrl: "/images/ross.webp",
  },
  {
    firstName: "Monica",
    imageUrl: "/images/monica.webp",
  },
  {
    firstName: "Phoebe",
    imageUrl: "/images/pheobe.webp",
  },
  {
    firstName: "Janice",
    imageUrl: "/images/jenice.webp",
  },
  {
    firstName: "Gunther",
    imageUrl: "/images/gunther.jpg",
  },
  {
    firstName: "Ben",
    imageUrl: "/images/ben.jpg",
  },
  {
    firstName: "Mike",
    imageUrl: "/images/mike.jpg",
  },
  {
    firstName: "Emily",
    imageUrl: "/images/emily.webp",
  },
];

const seedDB = async () => {
  await Student.deleteMany({});
  await Student.insertMany(seedStudents);
};

seedDB().then(() => {
  mongoose.connection.close();
});
