import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { useHistory } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaCodeBranch, FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`https://codexhub-backends-server.onrender.com/profile/${username}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action is irreversible and will permanently remove all your data.'
    );

    if (confirmDelete) {
      const username = localStorage.getItem('username');

      try {
        const response = await axios.delete('https://codexhub-backends-server.onrender.com/api/delete-user', {
          data: { username },
        });

        if (response.status === 200) {
          localStorage.removeItem('username');
          alert('Your profile has been deleted successfully.');
          history.push('/');
        } else {
          alert('Failed to delete your profile.');
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('An error occurred while deleting your profile.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  const renderStat = (value, label) => {
    if (!value) {
      return <span>No Data Found</span>;
    }
  
    if (label === 'Last Contest') {
      const dateObj = new Date(value);
      return dateObj.toLocaleString();
    }
  
    return value;
  };

  return (
    <div className="user-profile">
      <div className="animated-background">
        <div className="profile-header">
          <div className="user-avatar">
            <FaUserCircle />
          </div>
          <h2 className="username">{user.username}</h2>
        </div>

        <div className="stats">
          <div className="stat-item">
            <div className="stat-icon">
              <FaCodeBranch />
            </div>
            <div className="stat-content">
              <h4>Questions Solved</h4>
              <p>Leetcode: {renderStat(user.userData.leetcodeSolvedQuestions)}</p>
              <p>Codechef: {renderStat(user.userData.codechefSolvedQuestions)}</p>
              <p>Codeforces: {renderStat(user.userData.codeforcesSolvedQuestions)}</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <FaTrophy />
            </div>
            <div className="stat-content">
              <h4>Contests Participation</h4>
              <p>Total Contests: {renderStat(user.userData.totalContests)}</p>
              <p>Leetcode Ratings: {renderStat(user.userData.leetcodeRatings)}</p>
              <p>Codechef Ratings: {renderStat(user.userData.codechefRatings)}</p>
              <p>Codeforces Ratings: {renderStat(user.userData.codeforcesRatings)}</p>
              <p>Last Contest: {renderStat(user.userData.lastContest, 'Last Contest')}</p>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h4>Badges Obtained</h4>
              <div className="badge-list">
                {user.userData.badges.length > 0 ? (
                  user.userData.badges.map((badge, index) => (
                    <span key={index} className="badgess">{badge}</span>
                  ))
                ) : (
                  <p>No badges yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="delete-profile">
          <button onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;