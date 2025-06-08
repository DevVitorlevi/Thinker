import styled from 'styled-components';
import HomeMobile from '../assets/HomeMobile.png';

export const BackgroundContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${HomeMobile});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid lime;
`;
