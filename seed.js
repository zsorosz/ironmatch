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
  },
  {
    firstName: "Joey",
  },
  {
    firstName: "Ross",
  },
  {
    firstName: "Monica",
  },
  {
    firstName: "Phoebe",
  },
  {
    firstName: "Janice",
  },
  {
    firstName: "Gunther",
  },
  {
    firstName: "Ben",
  },
  {
    firstName: "Mike",
  },
  {
    firstName: "Emily",
  },
];

const seedDB = async () => {
  //   await Student.deleteMany({});
  await Student.insertMany(seedStudents);
};

seedDB().then(() => {
  mongoose.connection.close();
});
