import { useState } from "react";
import { Link } from "react-router-dom";
import { Header, ButtonRegister, MenuMobile, MenuIcon, Cta, ButtonCall, Presentation } from "../styles/Landing";
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';

export const Landing = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Header>
                <img src={Logo} alt="Logo do Thinker" id="logo" />
                <MenuIcon onClick={toggleMenu}>
                    {menuOpen ? <X /> : <Menu />}
                </MenuIcon>
            </Header>

            {/* Menu Mobile */}
            <MenuMobile open={menuOpen}>
                <nav>
                    <ul>
                        <li className="menu-itens"><a href="home">Inicio</a></li>
                        <li className="menu-itens"><a href="#">Como Funciona</a></li>
                        <li className="menu-itens"><a href="#">Beneficios</a></li>
                    </ul>
                </nav>
                <Link to='/register'>
                    <ButtonRegister>Entre</ButtonRegister>
                </Link>
            </MenuMobile>

            <Cta>
                <h1>Suba de nível. Supere limites. Pense como um <span>Thinker</span></h1>
                <Link to='/register'>
                    <ButtonCall>Comece Sua Jornada No Conhecimento</ButtonCall>
                </Link>
            </Cta>

            <Presentation>
                <h1 className="title">Aprender nunca foi tão divertido</h1>
            </Presentation>
        </>
    )
}
