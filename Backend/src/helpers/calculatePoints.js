module.exports = (pontos) => {
    if (pontos >= 4400) return '🧠 O THINKER';
    if (pontos >= 3300) return 'Gênio da Mente Dourada';
    if (pontos >= 2200) return 'Mestre dos Quizzes';
    if (pontos >= 1100) return 'Decifrador de Desafios';
    return 'Aprendiz do Conhecimento';
};