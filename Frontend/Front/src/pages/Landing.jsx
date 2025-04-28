import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Header,
    MenuMobile,
    MenuIcon,
    Cta,
    ButtonCall,
    Presentation,
    Content,
    Cards,
    Card,
    ScrollRevealLeft,
    ScrollRevealRight,
    Footer,
    ButtonTop,
    Overlay,
    MenuDesktop,
    ContentReverse,
    Shape
} from "../styles/Landing";
import { Menu, X, ArrowUp } from 'lucide-react';
import Logo from '../assets/Logo.png';
import Materiascell from '../assets/Materias-Cell.png';
import Quiz from '../assets/Quiz.png';
import Rank from '../assets/Ranking.png';
import Templo from '../assets/boneco.png'

export const Landing = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleMenuClick = () => {
        closeMenu();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('[data-animate]');
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

        animateOnScroll();
    }, []);

    return (
        <>
            <Header>
                <img src={Logo} alt="Logo do Thinker" id="logo" />
                <MenuIcon onClick={toggleMenu}>
                    {menuOpen ? <X /> : <Menu />}
                </MenuIcon>

                <Overlay isOpen={menuOpen} onClick={closeMenu} />

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


            <Cta id="home">
                <div className="cta-content">
                    <div className="text-content">
                        <h1>Suba de nível. Supere limites. Pense como um <p className="thinker">Thinker</p></h1>
                        <Link to='/register'>
                            <ButtonCall>Comece Sua Jornada No Conhecimento</ButtonCall>
                        </Link>
                    </div>
                    <Shape>
                        <img src={Templo} alt="" />
                    </Shape>
                </div>
            </Cta>

            <Presentation id="como">
                <Content>
                    <div><h1 className="title">Explore a lista de matérias e prepare-se para o ENEM no Thinker</h1>
                        <p className="subtitle">
                            No Thinker, acesse matérias essenciais para o ENEM e estude de forma focada e eficaz, preparando-se para o exame com confiança.
                        </p></div>
                    <img src={Materiascell} alt="Matérias do ENEM" />
                </Content>
            </Presentation>

            <Presentation>
                <ContentReverse>
                    <div> <h1 className="title">Complete quizzes e acumule pontos</h1>
                        <p className="subtitle">
                            No Thinker, ao completar quizzes, você ganha pontos que refletem seu desempenho, tornando o aprendizado mais motivador.
                        </p></div>
                    <img src={Quiz} alt="Quiz do Thinker" />
                </ContentReverse>
            </Presentation>
            <Presentation>
                <Content>
                    <div><h1 className="title">Acompanhe seu progresso no ranking</h1>
                        <p className="subtitle">
                            O Thinker exibe seu progresso em um ranking apenas entre seus amigos, incentivando a comparação e a melhoria contínua de forma mais pessoal e competitiva.
                        </p></div>
                    <img src={Rank} alt="Ranking do Thinker" />
                </Content>
            </Presentation>
            <Cards id="beneficios">
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

            <ButtonTop show={showButton} onClick={scrollToTop} aria-label="Voltar ao topo">
                <ArrowUp />
            </ButtonTop>

            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>



        </>
    );
};