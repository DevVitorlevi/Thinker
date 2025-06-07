import styled from 'styled-components';

export const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const SlideTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
`;

export const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SlideText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  font-size: 1.8rem;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
`;
