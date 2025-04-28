import styled from 'styled-components';
export const Header = styled.header`
    display:flex;
    font-family: 'Josefin Sans';
    align-items: center;
    justify-content: space-between;
    background-color:#006BCF;
    width: 100%;
    padding: 1rem;
    #logo {
    width: 10rem;
    }
    @media screen and (min-width:768px){
        #logo{
            width: 12rem;
        }
        position: sticky;
        top: -1px;
        z-index: 9999;
    }
`
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
  background-color:transparent;
  z-index: 998; // Garanta que está abaixo do menu (que tem z-index: 1000)
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')}; // Só recebe clicks quando aberto
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

export const Cta = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    margin-top: 2rem;
    font-size:1rem;
    
    font-family: "Josefin Sans", sans-serif;

    .thinker{
        font-family:'Dalek';
        font-size: 3rem;
        color: gold;
    }

    @media screen and (min-width:768px){
      .thinker{
        font-size: 4rem;
    }
    }
`
export const ButtonCall = styled.button `
    background-color: #004888;
    padding: 1.3rem;
    border-radius: 1rem;
    width:90%;
    color: white;
    font-family: 'Josefin Sans';
    font-size: 1rem;
    border: 0;
    transition: ease-in-out .3s;
    &:hover{
        transform: scale(1.02);
    }
    @media screen and (min-width:768px) and (max-width:992px){
        font-size: 1.6rem;
        width: 80%;
    }
    @media screen and (min-width:992px) {
        width: 60%;
        font-size: 1.6rem;
    }

`

export const Presentation = styled.div `
    padding: 2rem;
    margin: auto;
    font-family: 'Josefin Sans';
    
`
export const Content = styled.div `
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

    @media screen and (min-width:768px){
        flex-direction: row;
        gap: 3rem;
        .subtitle{
          font-size:1.3rem ;
        }
        .title{
            font-size: 1.5rem;
            font-family: 'Dalek';
            margin-top:1rem
      }
        img{
          width: 25rem;
        }
        div{
        display: flex;
        flex-direction: column;
        gap: 2rem;

    }
      }
      @media screen and (min-width:992px) {
       .subtitle{
          font-size: 1.8rem;
       }
       .title{
          font-size: 2.2rem;
       }
       img{
          width: 35rem;
       }
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

    @media screen and (min-width:768px){
        flex-direction: row-reverse;
        gap: 3rem;
        .subtitle{
          font-size:1.3rem ;
        }
        .title{
            font-size: 1.5rem;
      }
        img{
          width: 25rem;
        }
        div{
      display: flex;
      flex-direction: column;
      gap: 2rem;

    }
      }
      @media screen and (min-width:992px) {
        .subtitle{
          font-size: 1.8rem;
       }
       .title{
          font-size: 2.2rem;
       }
       img{
          width: 35rem;
       }
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
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    h1{
      font-size: 2.4rem;
    }
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
  right: .5rem;
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
  opacity: ${({ show }) => (show ? '1' : '0')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(100px)')};
  
  &:hover {
    background-color: #004888;
    transform: ${({ show }) => (show ? 'translateY(-5px)' : 'translateY(100px)')};
  }
  
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

