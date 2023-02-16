const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    unique: false,
  },
  imageUrl: {
    type: String,
  },
  surveyComplete: Boolean,
  greenList: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
  },
  redList: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
  },
  orangeList: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

const Student = model("Student", studentSchema);

module.exports = Student;
