import styled from "styled-components"

export const HeaderS = styled.header`
font-family: 'Josefin Sans';
    height: 8vh;
    background-color: #7D49AB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .desktop {
        display: none;
    }

    img {
        width: 70px;
    }
  
`

export const Desktop = styled.div``

export const Mobile = styled.div`
    .icon {
        color: white;
        width: 30px;
        height: 30px;
        margin: 10px;
    }

    .mobile_menu {
        display: none;
        position: fixed;
        top: 7.9%;
        right: 0;
        background-color: #7D49AB;
        width: 100%;
        height: 100%;
        z-index: 9999;
        padding-top: 60px;
        transform: translateY(-100%); /* Esconde o menu fora da tela */
    }

    .mobile_menu.open {
        display: flex;
        transform: translateY(0); /* Exibe o menu deslizando para baixo */
    }

    .menu_items {
        display: flex;
        flex-direction: column;
        gap: 30px;
        text-align: left;
        list-style-type: none;
        padding: 0;
    }

    .menu_items a {
        border: 0;
        border-bottom: 1px solid white;
        color: white;
        text-decoration: none;
        font-size: 40px;
        padding: 5px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        transition: background-color 0.3s;
    }

    .menu_items a:hover {
        background-color: #5c2a94;
    }
`
export const Form = styled.div`
    .inputs{
        position: relative;
    }
    .input{
        width:12rem;
        background-color: white;
        border: 0;
        height: 30px;
        padding: 10px;
        border-radius: 10px;
    }
    ::placeholder{
        color: #7D49AB;
    }
    .search{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #7D49AB;
    }
`
