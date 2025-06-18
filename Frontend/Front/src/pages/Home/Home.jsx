import React, { useState, useEffect } from 'react';
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
import {
    Materias,
    Titulo,
    MateriaCards,
    MateriaCard,
    Quizzes,
    QuizzesCards,
    QuizCard,
    QuizText,
    ButtonQuiz
} from '../../styles/Home';
import {
    FunctionSquare,
    BookText,
    Atom,
    FlaskConical,
    Leaf,
    Globe,
    Landmark,
    Brain,
    UsersRound,
    Languages,
    Dumbbell,
    MessageCircle,
    X,
    Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// Mapeamento: nome da matéria (sem acento e minúsculo) → cor e ícone
const materiaInfo = {
    matematica: { cor: 'matematica', icon: <FunctionSquare size={28} /> },
    'lingua portuguesa': { cor: 'portugues', icon: <BookText size={28} /> },
    fisica: { cor: 'fisica', icon: <Atom size={28} /> },
    quimica: { cor: 'quimica', icon: <FlaskConical size={28} /> },
    biologia: { cor: 'biologia', icon: <Leaf size={28} /> },
    geografia: { cor: 'geografia', icon: <Globe size={28} /> },
    historia: { cor: 'historia', icon: <Landmark size={28} /> },
    filosofia: { cor: 'filosofia', icon: <Brain size={28} /> },
    sociologia: { cor: 'sociologia', icon: <UsersRound size={28} /> },
    espanhol: { cor: 'espanhol', icon: <Languages size={28} /> },
    'educacao fisica': { cor: 'educacao', icon: <Dumbbell size={28} /> },
    ingles: { cor: 'ingles', icon: <MessageCircle size={28} /> }
};

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [materias, setMaterias] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMaterias() {
            try {
                const response = await api.get('/materias');
                setMaterias(response.data.materias);
            } catch (error) {
                console.error('Erro ao buscar matérias:', error);
            }
        }

        async function fetchQuizzes() {
            try {
                const response = await api.get('/quizzes');
                setQuizzes(response.data.quizzes.slice(0, 12));
            } catch (error) {
                console.error('Erro ao buscar quizzes:', error);
            }
        }

        fetchMaterias();
        fetchQuizzes();
    }, []);

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
                        {materias.map((materia, index) => {
                            const nome = materia.nome
                                ?.normalize("NFD")
                                ?.replace(/[\u0300-\u036f]/g, "")
                                ?.toLowerCase();

                            const info = materiaInfo[nome] || { cor: 'default', icon: null };

                            return (
                                <MateriaCard className={info.cor} key={index}>
                                    <div className="icon">{info.icon}</div>
                                    <h3>{materia.nome}</h3>
                                    <p>{materia.descricao}</p>
                                </MateriaCard>
                            );
                        })}
                    </MateriaCards>
                </Materias>

                <Quizzes id="quizzes">
                    <Titulo>
                        <h1>Quizzes</h1>
                        <p>Recomendados</p>
                    </Titulo>

                    <QuizzesCards>
                        {quizzes.map((quiz) => {
                            const nomeMateria = quiz.materia?.nome
                                ?.normalize("NFD")
                                ?.replace(/[\u0300-\u036f]/g, "")
                                ?.toLowerCase();

                            const cor = materiaInfo[nomeMateria]?.cor || 'default';

                            return (
                                <QuizCard className={cor} key={quiz._id}>
                                    <QuizText>
                                        <h3>{quiz.titulo}</h3>
                                        <p>{quiz.materia?.nome || 'Matéria desconhecida'}</p>
                                    </QuizText>
                                    <ButtonQuiz className={cor} onClick={() => navigate(`/quiz/${quiz._id}`)}>
                                        Iniciar
                                    </ButtonQuiz>
                                </QuizCard>
                            );
                        })}
                    </QuizzesCards>
                </Quizzes>
            </BackgroundContainer>

            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>
        </>
    );
};
