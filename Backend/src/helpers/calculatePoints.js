module.exports = {
    calculateQuizPoints: (quizResult) => {
        const { acertosFaceis, acertosMedios, acertosDificeis, totalQuestoes } = quizResult;
        
        // Pontos por tipo de questão
        const pontosFaceis = acertosFaceis * 5;
        const pontosMedios = acertosMedios * 10;
        const pontosDificeis = acertosDificeis * 20;
        
        // Bônus por completar o quiz
        const bonusCompletar = 20;
        
        // Bônus por gabaritar
        const gabaritou = (acertosFaceis === 10 && acertosMedios === 5 && acertosDificeis === 5);
        const bonusGabaritar = gabaritou ? 50 : 0;
        
        // Total de pontos
        const totalPontos = pontosFaceis + pontosMedios + pontosDificeis + bonusCompletar + bonusGabaritar;
        
        return {
            pontosFaceis,
            pontosMedios,
            pontosDificeis,
            bonusCompletar,
            bonusGabaritar,
            totalPontos,
            gabaritou
        };
    },
    
    getRanking: (pontos) => {
        if (pontos >= 4400) return '🧠 O THINKER (Patente Suprema)';
        if (pontos >= 3300) return 'Gênio da Mente Dourada';
        if (pontos >= 2200) return 'Mestre dos Quizzes';
        if (pontos >= 1100) return 'Decifrador de Desafios';
        return 'Aprendiz do Conhecimento';
    }
};