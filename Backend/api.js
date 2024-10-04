const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const connectDB = require('../src/components/MDB/connection');
const contestModel = require('../src/components/MDB/contestModel');
const practiceModel = require('../src/components/MDB/practiceModel');
const User = require('../src/components/MDB/userModel');
const UserData = require('../src/components/MDB/userDataModel');
connectDB();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route to handle user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/delete-user', async (req, res) => {
  const { username } = req.body;

  try {
    // Delete the user from the User collection
    await User.deleteOne({ username });

    // Delete the user data from the UserData collection
    await UserData.deleteOne({ username });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/forgot-password', async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User found' });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/update-password', async (req, res) => {
  const { username, email, newPassword } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/contest', async (req, res) => {
  try {
    const contests = await contestModel.find({});
    res.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/practice', async (req, res) => {
  try {
    const contests = await practiceModel.find({});
    res.json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/addcontest', async (req, res) => {
  try {
    const { platform, name, start, end, url } = req.body;
    const newContest = new contestModel({ platform, name, start, end, url });
    await newContest.save();
    res.status(201).json({ message: 'Contest added successfully' });
  } catch (error) {
    console.error('Error adding contest:', error);
    res.status(500).json({ error: 'Failed to add contest' });
  }
});

app.get('/profile/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = await UserData.findOne({ username });
    if (!userData) {
      return res.status(404).json({ error: 'User data not found' });
    }

    const userWithData = {
      username: user.username,
      password: user.password,
      email: user.email,
      userData: userData,
    };

    res.json(userWithData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const userDataList = await UserData.find({}, { username: 1, leetcodeRatings: 1, codechefRatings: 1, codeforcesRatings: 1 });
    const leaderboard = userDataList.map((userData) => {
      const averageRating = (userData.leetcodeRatings + userData.codechefRatings + userData.codeforcesRatings) / 3;
      return {
        username: userData.username,
        averageRating: averageRating,
      };
    });

    leaderboard.sort((a, b) => b.averageRating - a.averageRating);

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Read the user data from userData.json
    const userData = JSON.parse(fs.readFileSync(userDataFilePath, 'utf-8'));

    // Combine the user data with the username and password
    const userWithData = {
      username: user.username,
      password: user.password,
      email: user.email,
      userData: userData[username] || {},
    };

    res.json(userWithData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user signup
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try { 
    // Check if the username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password, email });
    await newUser.save();

    // Create a new user data document
    const newUserData = new UserData({
      username,
      leetcodeSolvedQuestions: null,
      codechefSolvedQuestions: null,
      codeforcesSolvedQuestions: null,
      totalContests: null,
      leetcodeRatings: null,
      codechefRatings: null,
      codeforcesRatings: null,
      lastContest: null,
      badges: [],
    });
    await newUserData.save();

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Serve the React app's static files
app.use(express.static(path.join(__dirname, 'build')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});