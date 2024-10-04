import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userData from './data/userData.json';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaMedal } from 'react-icons/fa';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LeaderboardContainer = styled.div`
  background: linear-gradient(to top, #1C1A1B, #1F1F1F, #2C2A2B);
  background-size: 100% 100%;
  animation: ${backgroundAnimation} 1s ease infinite;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  max-width: 100%;
  margin: 100px auto 0;
  animation: ${fadeIn} 1s ease-in-out;
`;

const LeaderboardTitle = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-bottom: 30px;
  font-variant: small-caps;
  text-shadow:0px 0px 3px white;
`;

const LeaderboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderItem = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding: 0 15px;
`;

const LeaderboardList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LeaderboardItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${(props) => (props.isEven ? '#2A2A2A' : 'rgb(80, 80, 80)')};
  border-radius: 4px;
  margin-bottom: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Rank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 16px;
`;

const UserName = styled.span`
  font-size: 16px;
  flex-grow: 1;
  text-transform: capitalize;
  font-variant: small-caps;
  text-align: center;
`;

const AverageRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;

const TopThree = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const TopThreeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${fadeIn} 1s ease-in-out;
`;

const UserIcon = styled(FaTrophy)`
  font-size: 80px;
  color: #bbb;
`;

const TopThreeName = styled.span`
text-transform: capitalize;
  font-size: 20px;
  font-weight: bold;
  font-variant: small-caps;
  margin-top: 10px;
`;

const RankCandle = styled.div`
  position: relative;
  width: 80px;
  height: ${(props) => props.height}px;
  background-color: #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 10px 20px 10px;
  box-shadow:0px 2px 3px white;
`;

const RankNumber = styled(FaMedal)`
  font-size: 24px;
  color: #333;
  text-shadow: 0px 0px 40px red;
  margin-bottom: 5px;
`;

const ContestRating = styled.span`
  font-size: 16px;
  color: #fff;
  padding-bottom:5px;
  
`;

const FirstPlaceContainer = styled(TopThreeItem)`
  z-index: 1;
`;

const SecondPlaceContainer = styled(TopThreeItem)`
  margin-right: 80px;
  margin-top: 33px;
`;

const ThirdPlaceContainer = styled(TopThreeItem)`
  margin-left: 80px;
  margin-top: 50px;
`;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);
  const topThree = leaderboard.slice(0, 3);
  const restUsers = leaderboard.slice(3);

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <TopThree>
        <SecondPlaceContainer>
          <UserIcon style={{ color: '#C0C0C0' }} />
          <TopThreeName>{topThree[1]?.username || ''}</TopThreeName>
          <RankCandle height={125}>
            <RankNumber style={{ color: '#C0C0C0' }} />
            <ContestRating>{topThree[1]?.averageRating.toFixed(2)}</ContestRating>
          </RankCandle>
        </SecondPlaceContainer>
        <FirstPlaceContainer>
          <UserIcon style={{ color: '#FFD700' }} />
          <TopThreeName>{topThree[0]?.username || ''}</TopThreeName>
          <RankCandle height={160}>
            <RankNumber style={{ color: '#FFD700' }} />
            <ContestRating>{topThree[0]?.averageRating.toFixed(2)}</ContestRating>
          </RankCandle>
        </FirstPlaceContainer>
        <ThirdPlaceContainer>
          <UserIcon style={{ color: '#CD7F32' }} />
          <TopThreeName>{topThree[2]?.username || ''}</TopThreeName>
          <RankCandle height={110}>
            <RankNumber style={{ color: '#CD7F32' }} />
            <ContestRating>{topThree[2]?.averageRating.toFixed(2)}</ContestRating>
          </RankCandle>
        </ThirdPlaceContainer>
      </TopThree>
      <LeaderboardHeader className="mt-5" style={{ fontVariant: 'small-caps' }}>
        <HeaderItem>Rank</HeaderItem>
        <HeaderItem className="ms-3">Username</HeaderItem>
        <HeaderItem>Average Rating</HeaderItem>
      </LeaderboardHeader>
      <LeaderboardList>
        {restUsers.map(({ username, averageRating }, index) => (
          <LeaderboardItem key={username} isEven={(index + 3) % 2 === 0}>
            <Rank>{index + 4}</Rank>
            <UserName>{username}</UserName>
            <AverageRating>{averageRating.toFixed(2)}</AverageRating>
          </LeaderboardItem>
        ))}
      </LeaderboardList>
    </LeaderboardContainer>
  );
};

export default Leaderboard;