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
import {
    Materias,
    Titulo,
    MateriaCards,
    MateriaCard
} from '../../styles/Home';

const materiasData = [
    { titulo: "Matemática", descricao: "Explore conceitos essenciais, desde álgebra até cálculo, com explicações claras e exemplos práticos. Aprenda de forma fácil e aplicada!", cor: "matematica" },
    { titulo: "Língua Portuguesa", descricao: "Aprimore sua comunicação! Explore gramática, ortografia e interpretação de textos com explicações claras e exemplos práticos.", cor: "portugues" },
    { titulo: "Física", descricao: "Estude as leis que regem o universo, entendendo como a matéria, a energia e o movimento funcionam no nosso dia a dia.", cor: "fisica" },
    { titulo: "Química", descricao: "Desvende os mistérios da matéria! Explore reações, elementos e princípios químicos de forma clara e aplicada ao dia a dia.", cor: "quimica" },
    { titulo: "Biologia", descricao: "Explore a vida em todas as suas formas, estudando os seres vivos, seus processos, evolução e relações com o ambiente", cor: "biologia" },
    { titulo: "Geografia", descricao: "Explore o planeta, estudando lugares, culturas, climas e as relações entre a sociedade e o meio ambiente.", cor: "geografia" },
    { titulo: "História", descricao: "Estude os principais eventos, culturas e transformações que marcaram o passado e influenciam o mundo de hoje.", cor: "historia" },
    { titulo: "Filosofia", descricao: "Investigue as grandes questões da existência, do conhecimento e da ética, desenvolvendo o pensamento crítico e reflexivo", cor: "filosofia" },
    { titulo: "Sociologia", descricao: "Estude a sociedade, suas estruturas, culturas e relações, entendendo melhor o comportamento humano e as transformações sociais.", cor: "sociologia" },
    { titulo: "Espanhol", descricao: "Aprenda a se comunicar em uma das línguas mais faladas do mundo, explorando vocabulário, cultura e conversação", cor: "espanhol" },
    { titulo: "Educação Física", descricao: "Desenvolva seu corpo e mente por meio de atividades físicas, promovendo saúde, disciplina e qualidade de vida", cor: "educacao" },
    { titulo: "Inglês", descricao: "Aprenda a entender, falar e escrever em inglês, expandindo suas oportunidades de comunicação e acesso ao mundo.", cor: "ingles" },
];

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const handleMenuClick = () => closeMenu();

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
                            <li className="menu-itens"><a href="#home" onClick={handleMenuClick}>Início</a></li>
                            <li className="menu-itens"><a href="#materias" onClick={handleMenuClick}>Matérias</a></li>
                            <li className="menu-itens"><a href="#quizzes" onClick={handleMenuClick}>Quizzes</a></li>
                        </ul>
                    </nav>
                </MenuMobile>

                <MenuDesktop>
                    <nav>
                        <ul>
                            <li className="menu-itens"><a href="#home">Início</a></li>
                            <li className="menu-itens"><a href="#materias">Matérias</a></li>
                            <li className="menu-itens"><a href="#quizzes">Quizzes</a></li>
                        </ul>
                    </nav>
                </MenuDesktop>
            </Header>

            <BackgroundContainer>
                <Materias id="materias">
                    <Titulo>
                        <h1>Componentes</h1>
                        <p>Curriculares</p>
                    </Titulo>

                    <MateriaCards>
                        {materiasData.map((materia, index) => (
                            <MateriaCard className={materia.cor} key={index}>
                                <h3>{materia.titulo}</h3>
                                <p>{materia.descricao}</p>
                            </MateriaCard>
                        ))}
                    </MateriaCards>
                </Materias>
            </BackgroundContainer>

            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>
        </>
    );
};
