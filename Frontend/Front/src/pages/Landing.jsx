import { useState } from "react";
import { Link } from "react-router-dom";
import { Header, ButtonRegister, MenuMobile, Overlay, MenuIcon } from "../styles/Landing";
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
                    <Menu color="white" size={32} />
                </MenuIcon>
            </Header>

            <Overlay open={menuOpen} onClick={toggleMenu} />

            {/* Menu Mobile */}
            <MenuMobile open={menuOpen}>
                <div onClick={toggleMenu}>
                    <X color="white" size={32} />
                </div>
                <nav>
                    <ul>
                        <li className="menu-itens"><a href="">Inicio</a></li>
                        <li className="menu-itens"><a href="">Como Funciona</a></li>
                        <li className="menu-itens"><a href="">Beneficios</a></li>
                    </ul>
                </nav>
                <Link to='/register'>
                    <ButtonRegister>Entre</ButtonRegister>
                </Link>
            </MenuMobile>
        </>
    )
}
