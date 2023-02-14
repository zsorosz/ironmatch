const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  passwordHash: {
    type: String,
    trim: true,
    required: true,
  },
  projectTeams: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
  },
});

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
