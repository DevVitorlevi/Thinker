import styled from 'styled-components';
export const Wrapper = styled.div`
    background-color:rgba(169, 235, 236, 0.4);
`
export const Header = styled.header`
    display: flex;
    font-family: 'Josefin Sans';
    align-items: center;
    justify-content: space-between;
    background-color: #006BCF;
    width: 100%;
    padding: 1rem;
    position: sticky;
    top: -1px;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra opcional */

    #logo {
        width: 10rem;
    }

    @media screen and (min-width: 768px) {
        #logo {
            width: 12rem;
        }
    }
`;
export const MenuMobile = styled.div`
    background-color: #006BCF;
    position: fixed;
    top: 6rem;
    right: 0;
    width: 250px;
    overflow: hidden;
    border-radius: 0 0 1rem 1rem;
    z-index: 1000;
    transition: all 0.4s ease;
    height: ${({ open }) => (open ? '200px' : '0')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    padding: ${({ open }) => (open ? '20px' : '0 20px')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')}; // Só recebe clicks quando aberto

    nav, ul {
        width: 100%;
    }

    ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        
        li a {
            color: white;
            font-size: 1.6rem;
            text-decoration: none;
            width: 100%;
            display: block;
            padding: 0.5rem 0;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 5px;
                border-radius: 1rem;
                background: goldenrod;
                transition: width 0.3s ease-in-out;
            }

            &:hover::after {
                width: 100%;
            }
        }
    }
    @media screen and (min-width:768px){
        display: none;
    }
`

export const MenuIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: auto;
    transition: transform 0.3s ease-in-out;

    &:active {
        transform: rotate(90deg);
    }

    svg{
        width: 3rem;
        height: 3rem;
        color: white;
    }

    @media screen and (min-width:768px){
        display: none;
    }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 998; // Garanta que está abaixo do menu (que tem z-index: 1000)
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')}; // Só recebe clicks quando aberto
`;

export const MenuDesktop = styled.div`
    ul{
      display: flex;
      gap: 2rem;
      color:white;
    }
    li a {
            color: white;
            font-size: 1.6rem;
            text-decoration: none;
            width: 100%;
            display: block;
            padding: 0.5rem 0;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 5px;
                border-radius: 1rem;
                background: goldenrod;
                transition: width 0.3s ease-in-out;
            }

            &:hover::after {
                width: 100%;
            }
        }
        @media screen and (max-width:767px){
          display: none;
        }
`

export const Cta = styled.div`
  font-family: "Josefin Sans", sans-serif;

  .cta-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 200px;
    background-color: white;
  }

  .text-content {
    text-align: left;
    z-index: 2;
    margin: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .thinker {
    font-family: 'Dalek';
    font-size: 3rem;
    color: gold;
  }

  @media screen and (min-width: 768px) and (max-width:1194px) {
    h1 {
      font-size: 3rem;
    }
    .thinker {
      font-size: 4rem;
    }
    .text-content {
      min-width:10px;
      margin: 3rem;
  }
  }

  @media screen and (max-width: 768px) {
    .cta-content {
      flex-direction: column;
    }
    .text-content {
      order: 2;
      text-align: center;
    }
  }

  @media screen and (min-width:1194px){
    .cta-content {
    min-height: 700px;
  }

  .text-content {
    max-width: 550px;
    margin: 2rem;
  }
  }
  @media screen and (min-width:1280px){
    .text-content {
    max-width: 550px;
    font-size:1.5rem;
  }
  }
  @media screen and (min-width: 1440px){
    .cta-content {
    min-height: 850px;
  }
  .text-content {
    max-width: 750px;
    margin: 10rem;
  }
  }
`;
export const ButtonCall = styled.button `
    background-color: #004888;
    padding: 1.3rem;
    border-radius: 1rem;
    width:100%;
    color: white;
    font-family: 'Josefin Sans';
    font-size: 1.1rem;
    border: 0;
    transition: ease-in-out .3s;
    margin-bottom: 3rem;
    &:hover{
        transform: scale(1.02);
    }
    @media screen and (min-width:768px){
        font-size: 1.6rem;
    }
`

export const Presentation = styled.div`
  margin: 2rem 1rem; 
  font-family: 'Josefin Sans';

  @media screen and (min-width:768px) and (max-width:992px) {
    width: 80%;
    margin: 3rem auto; 
  }
  @media screen and (min-width:992px) {
    margin: 3rem auto; 
    width: 80%;
  }
`
export const Content = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    div{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .title{
            font-size: 1.8rem;
            font-family: 'Dalek';
            margin-top:1rem
    }
    .subtitle{
            font-size: 1rem;
    }
    @media screen and (min-width:768px) and (max-width:992px){
      .subtitle{
            font-size: 1.5rem;
    }
    }
    @media screen and (min-width:992px){
      .subtitle{
            font-size: 1.8rem;
          }
          div{  
            gap: 1rem;
          }
          img{
            width: 35rem;
          }
      flex-direction: row;
      gap: 3rem;
      
    }
      
      `
export const ContentReverse = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    .title{
            font-size: 1.8rem;
            font-family: 'Dalek';
            margin-top:1rem
    }
    .subtitle{
            font-size: 1rem;
    }

    @media screen and (min-width:768px) and (max-width:992px){
      .subtitle{
            font-size: 1.5rem;}
    }
    @media screen and (min-width:992px){
      .subtitle{
            font-size: 1.8rem;
          }
          div{  
            gap: 1rem;
          }
          img{
            width: 35rem;
          }
      flex-direction: row-reverse;
      gap: 3rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  
`
export const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  font-family: 'Josefin Sans';
  gap: 1.4rem;
  width: 100%;
  padding: 1.4rem;
  align-items: stretch; 
  justify-items: center;
  height: auto;

  h1 {
    font-family: 'Dalek';
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
    grid-column: 1 / -1;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    h1{
      font-size: 2.4rem;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  `;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 2rem;
  background-color: whitesmoke;
  box-shadow: 0px 2px 18px rgba(0,0,0,0.2);
  transition: all 0.4s ease;
  width: 100%;
  max-width: 350px;
  height: 100%;
  padding:1rem;
  box-sizing: border-box;

  .icon {
    text-align: center;
    padding: 2rem;
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 80%;
    border-bottom-right-radius: 80%;
    background-color: gold;
    font-size: 3rem;
  }

  .title {
    font-size: 1.6rem;
    text-align: center;
    font-family: 'Dalek';
    padding: 0.5rem;
  }

  .subtitle {
    font-size: 1.4rem;
    padding: 0.5rem;
    text-align: center;
    flex-grow: 1; 
  }

  &:hover {
    transform: scale(1.03);
  }
  `;

export const ScrollRevealLeft = styled.div`
opacity: 0;
transform: translateX(-50px);
transition: all 1s ease-out;
display: flex;
justify-content: center;
align-items: center;

&.show {
  opacity: 1;
  transform: translateX(0);
}
`;

export const ScrollRevealRight = styled.div`
opacity: 0;
transform: translateX(50px);
transition: all 1s ease-out;
display: flex;
justify-content: center;
align-items: center;

&.show {
  opacity: 1;
  transform: translateX(0);
}
`;

export const ScrollReveal = styled.div`
opacity: 0;
transform: translateY(20px);
transition: opacity 0.6s ease-out, transform 0.6s ease-out;
display: flex;
justify-content: center;
align-items: center;

&.show {
  opacity: 1;
  transform: translateY(0);
}
`;


export const Footer = styled.footer `
    background-color: #006BCF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    color: white;
    font-family: 'Josefin Sans';
    img{
        width: 8rem;
    }
    p{
      font-family: 'Dalek';
    }
`
export const ButtonTop = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 0.5rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #006BCF;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;

  opacity: ${({ $show }) => ($show ? '1' : '0')};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(100px)')};

  &:hover {
    background-color: #004888;
    transform: ${({ $show }) => ($show ? 'translateY(-5px)' : 'translateY(100px)')};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;


export const Shape = styled.div`
    @media screen and (min-width:1194px) {background-color: #004888;
    width: 50%;
    height:90%;
    border-radius: 40% 30% 0 20%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex; 
    align-items:center;
    justify-content: center;
      img{
      width: 30rem;
    }}

  @media screen and (max-width: 1193px) {
    display: none;
    img{
      display: none;
    }
  }
  @media screen and (min-width: 1440px){
    width: 40%;
    img{
      width: 40rem;
    }
  }
`;