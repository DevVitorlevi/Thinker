import styled from "styled-components"

export const HeaderS = styled.header`
font-family: 'Josefin Sans';
    height: 10vh;
    background-color: #7D49AB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .desktop {
        display: none;
    }

    img {
        width: 90px;
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
        position: fixed;
        top: 9%;
        right: 0;
        background-color: #7D49AB;
        width: 100%;
        height: 100%;
        z-index: 9999;
        padding-top: 60px;
        transform: translateY(-100%); /* Esconde o menu fora da tela */
        opacity: 0; /* Inicialmente invisível */
        visibility: hidden; /* Impede a interação com o menu */
        transition: transform 0.5s ease-in-out; /* Transição para transform, opacity e visibility */
    }

    .mobile_menu.open {
        transform: translateY(0); /* Exibe o menu deslizando para baixo */
        opacity: 1; /* Torna o menu visível */
        visibility: visible; /* Permite interação com o menu */
        transition: transform 0.2s ease-in-out; /* Faz a transição de visibility junto com transform e opacity */
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