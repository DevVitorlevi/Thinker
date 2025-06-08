import React, { useState } from 'react';
import {
    Footer,
    Header,
    MenuIcon,
    Overlay,
    MenuDesktop,
    MenuMobile,
} from '../../styles/Landing';
import { BackgroundContainer } from '../../components/BackgroundContainer';
import Logo from '../../assets/Logo.png';
import { X, Menu } from 'lucide-react';

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleMenuClick = () => {
        closeMenu();
    };

    return (
        <>
            <Header>
                <img src={Logo} alt="Logo do Thinker" id="logo" />
                <MenuIcon onClick={toggleMenu}>
                    {menuOpen ? <X /> : <Menu />}
                </MenuIcon>

                <Overlay $isOpen={menuOpen} onClick={closeMenu} />

                <MenuMobile open={menuOpen}>
                    <nav>
                        <ul>
                            <li className="menu-itens">
                                <a href="#home" onClick={handleMenuClick}>Início</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#materias" onClick={handleMenuClick}>Matérias</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#quizzes" onClick={handleMenuClick}>Quizzes</a>
                            </li>
                        </ul>
                    </nav>
                </MenuMobile>

                <MenuDesktop>
                    <nav>
                        <ul>
                            <li className="menu-itens">
                                <a href="#home">Início</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#materias">Matérias</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#quizzes">Quizzes</a>
                            </li>
                        </ul>
                    </nav>
                </MenuDesktop>
            </Header>

            <BackgroundContainer>
                <h1 style={{ color: 'white', padding: '2rem' }}>Oi</h1>
            </BackgroundContainer>

            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>
        </>
    );
};
