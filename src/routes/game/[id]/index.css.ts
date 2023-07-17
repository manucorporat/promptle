import { style as styled } from "styled-vanilla-extract/qwik";

export const gameBox = styled`
  max-width: 1200px;
  margin: 40px auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 130px -50px var(--qwik-light-purple);
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    display: block;
    margin: 20px auto;
  }
`;

export const gameTitle = styled`
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

export const gameImagePanel = styled`
  flex: 3;
  background: black;
  min-width: 340px;
`;

export const gameContentPanel = styled`
  flex: 4;
  padding: 20px;
  min-width: 250px;
  @media (max-width: 900px) {
    padding: 10px;
  }
`;

export const gameImage = styled`
  display: block;
  width: 100%;
`;

export const clueList = styled`
  list-style: none;
  display: flex;
  font-size: 40px;
  font-family: monospace;
  margin: 0;
  padding: 0;
  width: fit-content;
  @media (max-width: 900px) {
    font-size: 25px;
  }
`;

export const clueItem = styled`
  text-align: center;
  letter-spacing: 0;
  width: 44px;
  height: 44px;
  display: inline-block;
  border: 2px solid #d4c0f5;
  border-radius: 5px;
  margin: 1px;
  display: inline-block;
  @media (max-width: 900px) {
    width: 30px;
    height: 30px;
  }
`;

export const clueInput = styled`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid var(--qwik-dark-blue);
  font-size: inherit;
  font-family: inherit;
  text-align: inherit;
  text-transform: lowercase;
`;

export const correctList = styled`
  list-style: none;
  font-size: 40px;
  font-family: monospace;
  margin: 0;
  padding: 0;
  gap: 10px;
  width: fit-content;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

export const remainingItem = styled`
  line-height: 0;
`;

export const livesBox = styled`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  font-size: 30px;
  gap: 5px;
  width: fit-content;
`;

export const guessButton = styled`
  display: inline;
  width: auto;
  border: none;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 25px;
  border: 2px solid var(--qwik-light-purple);
  background: transparent;
`;

export const enterButton = styled`
  display: block;
  margin: auto;
  appearance: none;
  font-family: monospace;
  background: #000000c2;
  color: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 34%), 0 8px 10px -6px rgb(0 0 0 / 24%);
  z-index: 999999;
`;

export const clueWrong = styled`
  background: #f47f7f;
`;

export const clueCorrect = styled`
  background: #7ff48f;
`;

export const clueContains = styled`
  background: yellow;
`;

export const rulesBox = styled`
  margin: 0 auto;
  color: #2a2a2a;
  max-width: 400px;
  padding: 10px;
  font-size: 12px;
`;
