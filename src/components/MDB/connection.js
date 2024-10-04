const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://2005raheelkhan:2005@cluster0.c47vh.mongodb.net/';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database is Connected!');
  } catch (err) {
    console.error('Failed to connect to MongoDBase:', err);
  }
};

module.exports = connectToMongoDB;