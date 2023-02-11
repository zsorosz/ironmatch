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
    img: "/images/rachel.webp",
  },
  {
    firstName: "Joey",
    img: "/images/joey.jpg",
  },
  {
    firstName: "Ross",
    img: "/images/ross.webp",
  },
  {
    firstName: "Monica",
    img: "/images/monica.webp",
  },
  {
    firstName: "Phoebe",
    img: "/images/pheobe.webp",
  },
  {
    firstName: "Janice",
    img: "/images/jenice.webp",
  },
  {
    firstName: "Gunther",
    img: "/images/gunther.jpg",
  },
  {
    firstName: "Ben",
    img: "/images/ben.jpg",
  },
  {
    firstName: "Mike",
    img: "/images/mike.jpg",
  },
  {
    firstName: "Emily",
    img: "/public/images/emily.webp",
  },
];

const seedDB = async () => {
  await Student.deleteMany({});
  await Student.insertMany(seedStudents);
};

seedDB().then(() => {
  mongoose.connection.close();
});
