import styled,{keyframes} from 'styled-components';

export const Materias = styled.div`
    padding: 2rem;
`;

export const Titulo = styled.div`
    font-family: 'Dalek';
    text-align: center;
    margin-bottom: 2rem;

    h1 {
        color: #517BA1;
        font-size: 5rem;
        letter-spacing: 1rem;
        text-shadow:1rem 1rem 0.7rem rgba(0, 0, 0, 0.42);
    }

    p {
        color: #D9C732;
        font-size: 3rem;
        letter-spacing: 1rem;
        text-shadow:1rem 1rem 0.7rem rgba(0, 0, 0, 0.42);
    }
`;

export const MateriaCards = styled.div`
    display: grid;
    gap: 1.5rem;

    @media (max-width: 768px) {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 1rem;

        &::-webkit-scrollbar {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: #517BA1;
            border-radius: 4px;
        }
    }

    @media (min-width: 769px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
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
export const MateriaCard = styled.div`
    background-color: #fff;
    border: 2px solid;
    border-radius: 1rem;
    padding: 1.5rem;
    min-width: 250px;
    transition: transform 0.2s ease;
    animation: ${fadeInUp} 0.6s ease both;
    cursor: pointer;
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

    &:hover {
       outline:3px solid gold;
    }

    /* Cores específicas */
    &.matematica {
        border-color: #003869;
         color: #003869;
    }
    &.portugues {
        border-color: #930004;
        color: #930004; 
    }
    &.fisica {
        border-color: #001F9C;
        color: #001F9C; 
    }
    &.quimica {
        border-color: #780B76;
         color: #780B76; 
    }
    &.biologia {
        border-color: #418600;
        color: #418600;
    }
    &.geografia {
        border-color: #CF761C;
         color: #CF761C; 
    }
    &.historia {
        border-color: #B39025;
        color: #B39025; 
    }
    &.filosofia {
        border-color: #5B3312;
         color: #5B3312; 
    }
    &.sociologia {
        border-color: #B75EB6;
         color: #B75EB6; 
    }
    &.espanhol {
        border-color: #B10508;
        color: #B10508; 
    }
    &.educacao {
        border-color: #3CC0A8;
        color: #3CC0A8;
    }
    &.ingles {
        border-color: #2D51A6;
        color: #2D51A6;
    }

    @media (min-width: 769px) {
        min-width: unset;
    }


`;

export const Quizzes = styled.div`
    padding: 2rem;
`;

export const QuizzesCards = styled.div`
    display: grid;
    gap: 1.5rem;

    @media (max-width: 768px) {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 1rem;

        &::-webkit-scrollbar {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: #517BA1;
            border-radius: 4px;
        }
    }

    @media (min-width: 769px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
export const QuizCard = styled.div`
    background-color: #fff;
    border: 2px solid;
    border-radius: 1rem;
    padding: 1.5rem;
    min-width: 250px;
    transition: transform 0.2s ease;
    animation: ${fadeInUp} 0.6s ease both;
    cursor: pointer;
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

    &:hover {
       outline:3px solid gold;
    }

    /* Cores específicas */
    &.matematica {
        border-color: #003869;
         color: #003869;
    }
    &.portugues {
        border-color: #930004;
        color: #930004; 
    }
    &.fisica {
        border-color: #001F9C;
        color: #001F9C; 
    }
    &.quimica {
        border-color: #780B76;
         color: #780B76; 
    }
    &.biologia {
        border-color: #418600;
        color: #418600;
    }
    &.geografia {
        border-color: #CF761C;
         color: #CF761C; 
    }
    &.historia {
        border-color: #B39025;
        color: #B39025; 
    }
    &.filosofia {
        border-color: #5B3312;
         color: #5B3312; 
    }
    &.sociologia {
        border-color: #B75EB6;
         color: #B75EB6; 
    }
    &.espanhol {
        border-color: #B10508;
        color: #B10508; 
    }
    &.educacao {
        border-color: #3CC0A8;
        color: #3CC0A8;
    }
    &.ingles {
        border-color: #2D51A6;
        color: #2D51A6;
    }

    @media (min-width: 769px) {
        min-width: unset;
    }


`;

export const ButtonQuiz = styled.button `
    padding: .5rem;
    border-radius:.8rem;
    margin-top:1rem;
    border:0;
    width: 100%;
    color: white;
    font-weight: bold;
    font-size:1rem;

     &.matematica {
        background-color: #003869;
    }
    &.portugues {
        background-color: #930004; 
    }
    &.fisica {
        background-color: #001F9C; 
    }
    &.quimica {
        background-color: #780B76; 
    }
    &.biologia {
        background-color: #418600;
    }
    &.geografia {
        background-color: #CF761C; 
    }
    &.historia {
        background-color: #B39025; 
    }
    &.filosofia {
        background-color: #5B3312; 
    }
    &.sociologia {
        background-color: #B75EB6; 
    }
    &.espanhol {

        background-color: #B10508; 
    }
    &.educacao {
        background-color: #3CC0A8;
    }
    &.ingles {
        background-color: #2D51A6;
    }
`
