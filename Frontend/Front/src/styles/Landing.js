import styled from 'styled-components';
export const Header = styled.header`
    display:inline-flex;
    background-color:#006BCF;
    width: 100%;
    padding: 1rem;
    #logo {
    width: 10rem;
    }
    @media screen and (min-width:769px){
        #logo{
            width: 15rem;
        }
        position: sticky;
        top: 0;
        z-index: 9999;
    }
`
export const MenuMobile = styled.div`
    background-color: #006BCF;
    position: absolute;
    top: 5rem;
    right: 0;
    width: 250px;
    overflow: hidden;
    border-radius: 0 0 0.5rem 0.5rem;
    z-index: 1000;
    transition: all 0.4s ease;
    height: ${({ open }) => (open ? '250px' : '0')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    padding: ${({ open }) => (open ? '20px' : '0 20px')};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ open }) => (open ? '1.5rem' : '0')};

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
    @media screen and (min-width:769px){
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

    @media screen and (min-width:769px){
        display: none;
    }
`
export const ButtonRegister = styled.button`
    background-color:transparent;
    border: 1px solid white;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 13rem;
    cursor: pointer;
    color: white;
    font-size: 1.4rem;
    transition: ease-in .4s;

    &:hover{
        background-color: goldenrod;
        transform: scale(1.1);
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
`
export const ButtonCall = styled.button `
    background-color: #004888;
    padding: 1.3rem;
    border-radius: 1rem;
    width: 90%;
    color: white;
    font-family: 'Josefin Sans';
    font-size: 1.1rem;
    border: 0;
    transition: ease-in-out .3s;
    &:hover{
        transform: scale(1.02);
    }
`

export const Presentation = styled.div `
    margin: 1rem;
    font-family: 'Josefin Sans';
`
export const Content = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    .title{
            font-size: 1.2rem;
            font-family: 'Dalek';
            margin-top:1rem
    }
    .subtitle{
            font-size: 1rem;
    }



`