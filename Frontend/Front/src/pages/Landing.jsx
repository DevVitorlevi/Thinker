import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Header,
    ButtonRegister,
    MenuMobile,
    MenuIcon,
    Cta,
    ButtonCall,
    Presentation,
    Content,
    Cards,
    Card,
    ScrollRevealLeft,
    ScrollRevealRight
} from "../styles/Landing";
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Materiascell from '../assets/Materias-Cell.png';
import Quiz from '../assets/Quiz.png';
import Rank from '../assets/Ranking.png';

export const Landing = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const animateOnScroll = (elements) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('show');
                        }, entry.target.dataset.delay || 0);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                observer.observe(element);
            });

            return () => observer.disconnect();
        };

        animateOnScroll(document.querySelectorAll('[data-animate]'));
    }, []);

    return (
        <>
            <Header>
                <img src={Logo} alt="Logo do Thinker" id="logo" />
                <MenuIcon onClick={toggleMenu}>
                    {menuOpen ? <X /> : <Menu />}
                </MenuIcon>
            </Header>

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

            <ScrollRevealLeft
                className="scroll-reveal-left"
                data-animate
                data-delay="100"
            >
                <Cta>
                    <h1>Suba de nível. Supere limites. Pense como um <span className="thinker">Thinker</span></h1>
                    <Link to='/register'>
                        <ButtonCall>Comece Sua Jornada No Conhecimento</ButtonCall>
                    </Link>
                </Cta>
            </ScrollRevealLeft>

            <ScrollRevealRight
                className="scroll-reveal-right"
                data-animate
                data-delay="200"
            >
                <Presentation>
                    <Content>
                        <h1 className="title">Explore a lista de matérias e prepare-se para o ENEM no Thinker</h1>
                        <p className="subtitle">
                            No Thinker, acesse matérias essenciais para o ENEM e estude de forma focada e eficaz, preparando-se para o exame com confiança.
                        </p>
                        <img src={Materiascell} alt="Matérias do ENEM" />
                    </Content>
                </Presentation>
            </ScrollRevealRight>

            <ScrollRevealLeft
                className="scroll-reveal-left"
                data-animate
                data-delay="300"
            >
                <Presentation>
                    <Content>
                        <h1 className="title">Complete quizzes e acumule pontos</h1>
                        <p className="subtitle">
                            No Thinker, ao completar quizzes, você ganha pontos que refletem seu desempenho, tornando o aprendizado mais motivador.
                        </p>
                        <img src={Quiz} alt="Quiz do Thinker" />
                    </Content>
                </Presentation>
            </ScrollRevealLeft>

            <ScrollRevealRight
                className="scroll-reveal-right"
                data-animate
                data-delay="400"
            >
                <Presentation>
                    <Content>
                        <h1 className="title">Acompanhe seu progresso no ranking</h1>
                        <p className="subtitle">
                            O Thinker exibe seu progresso em um ranking apenas entre seus amigos, incentivando a comparação e a melhoria contínua de forma mais pessoal e competitiva.
                        </p>
                        <img src={Rank} alt="Ranking do Thinker" />
                    </Content>
                </Presentation>
            </ScrollRevealRight>

            <Cards>
                <h1 data-animate>Veja os Beneficios Do Thinker</h1>

                <ScrollRevealLeft
                    className="scroll-reveal-left"
                    data-animate
                    data-delay="100"
                >
                    <Card>
                        <div className="icon">🚀</div>
                        <h2 className="title">Aprendizado rápido e dinâmico</h2>
                        <p className="subtitle">Acelere seu aprendizado com uma metodologia envolvente e dinâmica.</p>
                    </Card>
                </ScrollRevealLeft>

                <ScrollRevealRight
                    className="scroll-reveal-right"
                    data-animate
                    data-delay="200"
                >
                    <Card>
                        <div className="icon">🎮</div>
                        <h2 className="title">Sistema de gamificação que motiva</h2>
                        <p className="subtitle">Conquiste pontos e suba no ranking, desafiando seus amigos enquanto aprende.</p>
                    </Card>
                </ScrollRevealRight>

                <ScrollRevealLeft
                    className="scroll-reveal-left"
                    data-animate
                    data-delay="300"
                >
                    <Card>
                        <div className="icon">📚</div>
                        <h2 className="title">Conteúdo atualizado e de qualidade</h2>
                        <p className="subtitle">Tenha acesso a materiais de estudo sempre atualizados e com alto padrão de qualidade.</p>
                    </Card>
                </ScrollRevealLeft>

                <ScrollRevealRight
                    className="scroll-reveal-right"
                    data-animate
                    data-delay="400"
                >
                    <Card>
                        <div className="icon">🏆</div>
                        <h2 className="title">Ranking para desafiar seus amigos</h2>
                        <p className="subtitle">Veja como você se sai em relação aos seus amigos e busque ser o melhor no ranking</p>
                    </Card>
                </ScrollRevealRight>
            </Cards>
        </>
    );
};