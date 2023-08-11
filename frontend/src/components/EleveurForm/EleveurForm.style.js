import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 8px;
  background-color: #0074d9;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const StyledSlidingDiv = styled.div`
  /* display: none; */
  background-color: #ccc;
  visibility: hidden;
  position: absolute;
  top: 5px;
  left: 0;
  /* width: 100%;
  height: 100px; */
  transition: transform 0.5s ease-in-out;
  z-index: 1;

  &.show {
    visibility: visible;
    display: block;
    transform: translate(0, 50px);
  }
`;

export const StyledContainer = styled.div`
  position: relative;
`;

export const Second = styled.div`
  background-color: #ddd;
  position: relative;
`;
