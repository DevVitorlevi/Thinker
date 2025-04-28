import { createGlobalStyle } from 'styled-components';
import Dalek from '../assets/DalekPinpointBold.ttf'
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
    background-color:#e4e8ff;
    color: #333;
    overflow-x:hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

`