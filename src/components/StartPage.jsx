import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StartPageContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/pokemon-list');
  };

  return (
    <StartPageContainer>
      <h1>포켓몬 도감</h1>
      <StartButton onClick={handleStart}>포켓몬 도감 시작하기</StartButton>
    </StartPageContainer>
  );
};

export default StartPage;
