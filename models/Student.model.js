const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    surveyComplete: Boolean,
    greenList: { 
      type :[Schema.Types.ObjectId],
      ref : "Student",
    },
    redList: { 
      type :[Schema.Types.ObjectId],
      ref : "Student",
    },
  },
);

const Student = model("Student", studentSchema);

module.exports = Student;
