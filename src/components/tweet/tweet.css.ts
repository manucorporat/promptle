import { style as styled } from "styled-vanilla-extract/qwik";

export const tweetBox = styled`
  display: block;
  border: 2px solid var(--qwik-dark-blue);
  padding: 10px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 1px 10px #006ce959;
  background: white;
`;

export const tweetMessage = styled`
  font-size: 18px;
  white-space: pre;
`;

export const tweetImg = styled`
  display: block;
  width: 100%;
  height: auto;
`;

export const tweetLink = styled`
  margin: 20px 0;
  display: block;
  text-align: center;
`;
