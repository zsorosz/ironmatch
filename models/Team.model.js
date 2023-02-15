const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Team = model("Team", teamSchema);

module.exports = Team;
