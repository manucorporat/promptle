import { style as styled } from "styled-vanilla-extract/qwik";

export const mainBox = styled`
  max-width: 650px;
  margin: 0 auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 130px -50px var(--qwik-light-purple);
  overflow: hidden;
`;

export const mainHeaderBox = styled`
  position: relative;
`;

export const mainHeaderText = styled`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  color: white;
  text-shadow: 0 0 5px #00000059;
`;

export const mainImg = styled`
  display: block;
  width: 100%;
  height: auto;
`;

export const mainBoxContent = styled`
  padding: 30px;
  color: #2a2a2a;
  line-height: 1.5;
`;

export const decriptionP = styled`
  max-width: 404px;
  text-align: center;
  margin: 0 auto;
  font-size: 20px;
`;

export const playGameButton = styled`
  display: block;
  margin: auto;
  border: 3px solid;
  padding: 21px;
  font-size: 26px;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 1px 20px;
  margin: 40px auto;
  border-radius: 12px;
  max-width: 345px;
  cursor: pointer;
`;
