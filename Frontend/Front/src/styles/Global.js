import { createGlobalStyle } from 'styled-components';
import Dalek from '../assets/DalekPinpointBold.ttf'
import styled from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Dalek';
    src: url(${Dalek}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
     * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }


`

export const StyledContainer = styled.div `
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`