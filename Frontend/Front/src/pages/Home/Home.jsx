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

const materiasData = [
    { titulo: "Matemática", descricao: "Explore conceitos essenciais...", cor: "matematica", icon: <FunctionSquare size={28} /> },
    { titulo: "Língua Portuguesa", descricao: "Aprimore sua comunicação!", cor: "portugues", icon: <BookText size={28} /> },
    { titulo: "Física", descricao: "Estude as leis que regem o universo...", cor: "fisica", icon: <Atom size={28} /> },
    { titulo: "Química", descricao: "Desvende os mistérios da matéria!", cor: "quimica", icon: <FlaskConical size={28} /> },
    { titulo: "Biologia", descricao: "Explore a vida em todas as suas formas...", cor: "biologia", icon: <Leaf size={28} /> },
    { titulo: "Geografia", descricao: "Explore o planeta...", cor: "geografia", icon: <Globe size={28} /> },
    { titulo: "História", descricao: "Estude os principais eventos...", cor: "historia", icon: <Landmark size={28} /> },
    { titulo: "Filosofia", descricao: "Investigue grandes questões...", cor: "filosofia", icon: <Brain size={28} /> },
    { titulo: "Sociologia", descricao: "Estude a sociedade...", cor: "sociologia", icon: <UsersRound size={28} /> },
    { titulo: "Espanhol", descricao: "Aprenda a se comunicar...", cor: "espanhol", icon: <Languages size={28} /> },
    { titulo: "Educação Física", descricao: "Desenvolva corpo e mente...", cor: "educacao", icon: <Dumbbell size={28} /> },
    { titulo: "Inglês", descricao: "Aprenda a entender e escrever em inglês...", cor: "ingles", icon: <MessageCircle size={28} /> }
];

// Mapeamento para aplicar classe de cor por matéria
const corPorMateria = {
    matematica: "matematica",
    "língua portuguesa": "portugues",
    fisica: "fisica",
    quimica: "quimica",
    biologia: "biologia",
    geografia: "geografia",
    historia: "historia",
    filosofia: "filosofia",
    sociologia: "sociologia",
    espanhol: "espanhol",
    "educação física": "educacao",
    ingles: "ingles"
};

export const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuizzes() {
            try {
                const response = await api.get('/quizzes');
                setQuizzes(response.data.quizzes.slice(0, 12)); // mostra só os 6 primeiros
            } catch (error) {
                console.error('Erro ao buscar quizzes:', error);
            }
        }
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
                        {materiasData.map((materia, index) => (
                            <MateriaCard className={materia.cor} key={index}>
                                <div className="icon">{materia.icon}</div>
                                <h3>{materia.titulo}</h3>
                                <p>{materia.descricao}</p>
                            </MateriaCard>
                        ))}
                    </MateriaCards>
                </Materias>

                <Quizzes id="quizzes">
                    <Titulo>
                        <h1>Quizzes</h1>
                        <p>Recomendados</p>
                    </Titulo>

                    <QuizzesCards>
                        {quizzes.map((quiz) => {
                            const nomeMateriaNormalizado = quiz.materia?.nome
                                ?.normalize("NFD")
                                ?.replace(/[\u0300-\u036f]/g, "")
                                ?.toLowerCase();

                            const cor = corPorMateria[nomeMateriaNormalizado] || 'default';

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
            </BackgroundContainer >

            <Footer>
                <img src={Logo} alt="Logo do Thinker" />
                <p>© THINKER 2025</p>
            </Footer>
        </>
    );
};
