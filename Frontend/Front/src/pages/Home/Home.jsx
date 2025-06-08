import React, { useState } from 'react'
import { Container } from '../../components/Container'
import { Footer, Header, MenuIcon, Overlay, MenuDesktop, MenuMobile } from '../../styles/Landing'
import Logo from '../../assets/Logo.png'
import { X, Menu } from 'lucide-react'

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
                                <a href="#home" onClick={handleMenuClick}>Inicio</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#como" onClick={handleMenuClick}>Como Funciona</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#beneficios" onClick={handleMenuClick}>Beneficios</a>
                            </li>
                        </ul>
                    </nav>
                </MenuMobile>

                <MenuDesktop>
                    <nav>
                        <ul>
                            <li className="menu-itens">
                                <a href="#home" onClick={handleMenuClick}>Inicio</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#como" onClick={handleMenuClick}>Como Funciona</a>
                            </li>
                            <li className="menu-itens">
                                <a href="#beneficios" onClick={handleMenuClick}>Beneficios</a>
                            </li>
                        </ul>
                    </nav>
                </MenuDesktop>
            </Header>
            <Container>
                <h1>ola</h1>
            </Container>
            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>

        </>
    )
}
