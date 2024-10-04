const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  leetcodeSolvedQuestions: { type: Array, default: null },
  codechefSolvedQuestions: { type: Array, default: null },
  codeforcesSolvedQuestions: { type: Array, default: null },
  totalContests: { type: Number, default: null },
  leetcodeRatings: { type: Number, default: null },
  codechefRatings: { type: Number, default: null },
  codeforcesRatings: { type: Number, default: null },
  lastContest: { type: String, default: null },
  badges: { type: Array, default: [] },
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;