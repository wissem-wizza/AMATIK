// import styled from "styled-components";
// import TestComponent from "./TestComponent";

// export const Button = styled(TestComponent)`
//   * {
//     font-size: 30px;
//     color: #ee0;
//     background: #2220ee;
//   }
// `;

import styled from "styled-components";
import { css } from "styled-components";
// import TestComponent from "./TestComponent";

const styledButton = css`
  color: blue;
  font-size: 30px;
  color: #ee0;
  background: #2220ee;
`;

//${styledButton}
export const MyButton = styled("TestComponent")`
  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 16px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
