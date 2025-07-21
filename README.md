# CodexHub

CodexHub is a MERN stack application designed to help competitive programmers and coding enthusiasts track contests, practice questions, and view leaderboards across popular platforms such as LeetCode, CodeChef, and Codeforces. The app aggregates contest information, practice sets, user progress, and coding news, providing a centralized hub for coding preparation and community engagement.

## Features

- **Contest Aggregation**: View live, upcoming, and previous coding contests from major platforms.
- **Practice Questions**: Browse practice questions filtered by platform.
- **User Authentication**: Register, login, manage password, and delete accounts.
- **User Profiles**: Track solved questions, contest participation, ratings, and earned badges.
- **Leaderboards**: See aggregated ratings of users based on their performance across platforms.
- **News Feed**: Stay updated with the latest tech and coding news.
- **Admin Tools**: Add new contests and practice sets to the database.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose ODM)
- **APIs**: External news API for fetching coding news.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud instance)
- (Optional) NewsAPI key for fetching news

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Raheelkhan-05/CodexHub_MERN.git
   cd CodexHub_MERN
   ```

2. **Backend Setup:**
   - Navigate to the `Backend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Configure MongoDB connection in `Backend/connection.js`.
   - Start the backend server:
     ```bash
     node api.js
     ```

3. **Frontend Setup:**
   - From the root directory, install frontend dependencies:
     ```bash
     npm install
     ```
   - Set up environment variables:
     - Create a `.env` file and add your NewsAPI key:
       ```
       REACT_APP_NEWS_API_KEY=your_api_key_here
       ```
   - Start the frontend:
     ```bash
     npm start
     ```

4. **Access the App:**
   - Default frontend runs on `http://localhost:3000`
   - Backend API runs on `http://localhost:5000` (or as configured)

## API Endpoints

The backend provides various REST endpoints, including:

- `POST /api/login` — User login
- `POST /api/delete-user` — Delete user account
- `PUT /api/forgot-password` — Forgot password workflow
- `PUT /api/update-password` — Update password
- `GET /contest` — Get contests
- `GET /practice` — Get practice questions
- `POST /addcontest` — Add a new contest (admin)
- `GET /profile/:username` — Get user profile and stats
- `GET /leaderboard` — Get leaderboard data

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors

- Raheelkhan Lohani ([GitHub](https://github.com/Raheelkhan-05))

## Live Demo

[https://codexhub.onrender.com](https://codexhub.onrender.com)
