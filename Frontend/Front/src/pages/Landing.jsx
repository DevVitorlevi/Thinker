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
                <h1>Suba de nível. Supere limites. Pense como um <span className="thinker">Thinker</span></h1>
                <Link to='/register'>
                    <ButtonCall>Comece Sua Jornada No Conhecimento</ButtonCall>
                </Link>
            </Cta>

            <Presentation>
                <div>
                    <h1 className="title">Explore a lista de matérias e prepare-se para o ENEM no Thinker</h1>
                    <p className="subtitle">
                        No Thinker, acesse matérias essenciais para o ENEM e estude de forma focada e eficaz, preparando-se para o exame com confiança.
                    </p>
                    <img src="" alt="" />
                </div>
                <div>
                    <h1 className="title">
                        Complete quizzes e acumule pontos
                    </h1>
                    <p className="subtitle">
                        No Thinker, ao completar quizzes, você ganha pontos que refletem seu desempenho, tornando o aprendizado mais motivador.
                    </p>
                    <img src="" alt="" />
                </div>
                <div>
                    <h1 className="title">
                        Acompanhe seu progresso no ranking
                    </h1>
                    <p className="subtitle">O Thinker exibe seu progresso em um ranking apenas entre seus amigos, incentivando a comparação e a melhoria contínua de forma mais pessoal e competitiva.</p>
                    <img src="" alt="" />
                </div>
            </Presentation>
        </>
    )
}
