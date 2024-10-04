import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import leetcodeLogo from './Images/lc.png'; // Import the platform logos
import codechefLogo from './Images/cclogo.jpg';
import codeforceLogo from './Images/cf.webp';
import { createGlobalStyle } from 'styled-components';


const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const BackGrng = createGlobalStyle`
#root,html {
  background: linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(128,128,128,0.7), rgba(255,255,255,0.5), rgba(128,128,128,0.7), rgba(255,255,255,0.5));
  font-family: Arial, sans-serif;
  background-size: 500% 500%;
  animation: ${gradientAnimation} 20s ease infinite;
}
`;

const Container = styled.div`
  // max-width: 800px;
  margin: 40px  auto;
  font-family: Arial, sans-serif;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px black;
`;

const Table = styled.table`
  width: 100%;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.614), rgba(255, 255, 255, 0.614), rgba(21, 204, 106, 0.1), rgba(204, 204, 54, 0.104),rgba(252, 62, 62, 0.104), rgba(255, 255, 255, 0.15) ,rgba(0, 0, 0, 0.674),rgba(0, 0, 0, 0.674));
  border-collapse: collapse;
  background-size: 400% 400%;
  border-radius: 10px;
  overflow:hidden;
  animation: gradientAnimation 10s ease infinite;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
  
`;

const TableRow = styled.tr`


border-radius: 10px;
`;

const TableHeader = styled.th`
  padding: 10px;
  
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  text-align: left;
`;
const TableBody = styled.tbody`
  text-decoration:none;  
  border-radius: 10px;
  padding-left:20px;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  
`;

const StatusIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.solved ? '#4caf50' : '#f44336')};
  margin-right: 5px;
`;

const DifficultyTag = styled.span`
  background-color: ${(props) => {
    switch (props.difficulty) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Hard':
        return 'red';
      default:
        return '#808080';
    }
  }};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
`;

const PlatformLogo = styled.img`
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 5px;
  border-radius:50%;
`;

const App = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/practice');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleRowClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getPlatformLogo = (platform) => {
    switch (platform) {
      case 'LeetCode':
        return leetcodeLogo;
      case 'CodeChef':
        return codechefLogo;
      case 'Codeforces':
        return codeforceLogo;
      default:
        return null;
    }
  };

  return (
    <>
      <BackGrng></BackGrng>
      <h1 className='m-auto' style={{paddingTop:"80px",fontSize:"45px", textAlign:"center", fontFamily:"cursive",color:"white", fontWeight:"700", textShadow:"0px 2px 2px black", textDecoration:"underline"}}>Practice Questions</h1>
      <Container>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader style={{ textAlign: "center" }}>No.</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Status</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Title</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Platform</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Acceptance</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Difficulty</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index} onClick={() => handleRowClick(question.url)}>
                <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <StatusIcon solved={question.solved} />
                </TableCell>
                <TableCell style={{ textAlign: "center", maxWidth: "250px" }}>{question.name}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <PlatformLogo src={getPlatformLogo(question.platform)} alt={question.platform} />
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>{question.acceptance}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <DifficultyTag difficulty={question.difficulty}>
                    {question.difficulty}
                  </DifficultyTag>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default App;




// This is pdata.json which contains the problem details, in that "solved" should be personalised based on the user profile to profile