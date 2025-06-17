import styled, { keyframes } from 'styled-components';

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Materias = styled.div`
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const Titulo = styled.div`
  font-family: 'Dalek';
  text-align: center;
  margin-bottom: 5rem;

  h1 {
    color: #517BA1;
    font-size: 6rem;
    letter-spacing: 0.5rem;
    text-shadow: 1rem 1rem 0.7rem rgba(0, 0, 0, 0.42);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
      letter-spacing: 0.2rem;
    }
  }

  p {
    color: #D9C732;
    font-size: 4rem;
    letter-spacing: 0.5rem;
    text-shadow: 1rem 1rem 0.7rem rgba(0, 0, 0, 0.42);

    @media (max-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 0.2rem;
    }
  }
`;

export const MateriaCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
    padding: 1rem;
    gap: 1rem;

    & > * {
      flex: 0 0 auto;
      scroll-snap-align: start;
    }

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #517BA1;
      border-radius: 4px;
    }
  }
`;

export const MateriaCard = styled.div`
  background-color: #fff;
  border: 2px solid;
  border-radius: 1rem;
  padding: 1.5rem;
  min-width: 150px;
  transition: transform 0.2s ease;
  animation: ${fadeInUp} 0.6s ease both;
  cursor: pointer;
  text-align: center;

  .icon {
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-family: 'Josefin Sans';
  }

  p {
    font-size: 1rem;
    font-family: 'Josefin Sans';
  }

  &.matematica { border-color: #003869; color: #003869; }
  &.portugues { border-color: #930004; color: #930004; }
  &.fisica { border-color: #001F9C; color: #001F9C; }
  &.quimica { border-color: #780B76; color: #780B76; }
  &.biologia { border-color: #418600; color: #418600; }
  &.geografia { border-color: #CF761C; color: #CF761C; }
  &.historia { border-color: #B39025; color: #B39025; }
  &.filosofia { border-color: #5B3312; color: #5B3312; }
  &.sociologia { border-color: #B75EB6; color: #B75EB6; }
  &.espanhol { border-color: #B10508; color: #B10508; }
  &.educacao { border-color: #3CC0A8; color: #3CC0A8; }
  &.ingles { border-color: #2D51A6; color: #2D51A6; }

  @media (max-width: 768px) {
    flex: 0 0 auto;
    scroll-snap-align: start;
    min-width: 240px;
    max-width: 270px;
  }
`;

export const Quizzes = styled.div`
  padding: 5rem 2rem 30rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem 15rem;
  }
`;

export const QuizzesCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;
    padding: 1rem;
    gap: 1rem;

    & > * {
      flex: 0 0 auto;
      scroll-snap-align: start;
    }

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #517BA1;
      border-radius: 4px;
    }
  }
`;

export const QuizCard = styled.div`
  background-color: #fff;
  border: 2px solid;
  border-radius: 1rem;
  padding: 1.5rem;
  min-width: 200px;
  max-width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${fadeInUp} 0.6s ease both;
  cursor: pointer;
  text-align: center;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .icon {
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-family: 'Josefin Sans';
  }

  p {
    font-size: 1rem;
    font-family: 'Josefin Sans';
  }

  &.matematica { border-color: #003869; color: #003869; }
  &.portugues { border-color: #930004; color: #930004; }
  &.fisica { border-color: #001F9C; color: #001F9C; }
  &.quimica { border-color: #780B76; color: #780B76; }
  &.biologia { border-color: #418600; color: #418600; }
  &.geografia { border-color: #CF761C; color: #CF761C; }
  &.historia { border-color: #B39025; color: #B39025; }
  &.filosofia { border-color: #5B3312; color: #5B3312; }
  &.sociologia { border-color: #B75EB6; color: #B75EB6; }
  &.espanhol { border-color: #B10508; color: #B10508; }
  &.educacao { border-color: #3CC0A8; color: #3CC0A8; }
  &.ingles { border-color: #2D51A6; color: #2D51A6; }

  @media (max-width: 768px) {
    flex: 0 0 auto;
  }

  @media (min-width: 769px) {
    min-width: unset;
    max-width: unset;
  }
`;

export const QuizText = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 1rem;
    font-size: 1.3rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const ButtonQuiz = styled.button`
  padding: 0.5rem;
  border-radius: 0.8rem;
  margin-top: 1rem;
  border: 0;
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 1rem;

  &.matematica { background-color: #003869; }
  &.portugues { background-color: #930004; }
  &.fisica { background-color: #001F9C; }
  &.quimica { background-color: #780B76; }
  &.biologia { background-color: #418600; }
  &.geografia { background-color: #CF761C; }
  &.historia { background-color: #B39025; }
  &.filosofia { background-color: #5B3312; }
  &.sociologia { background-color: #B75EB6; }
  &.espanhol { background-color: #B10508; }
  &.educacao { background-color: #3CC0A8; }
  &.ingles { background-color: #2D51A6; }
`;
