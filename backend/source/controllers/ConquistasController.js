const Conquista = require('../models/Conquistas');
const User = require('../models/User');

module.exports = class ConquistaController {
    // Criar uma nova conquista
    static async create(req, res) {
        try {
            const { titulo, descricao, criterios } = req.body;

            if (!titulo || !descricao || !criterios) {
                return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novaConquista = new Conquista({ titulo, descricao, criterios });
            await novaConquista.save();

            res.status(201).json({ message: 'Conquista criada com sucesso!', conquista: novaConquista });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar conquista.', error });
        }
    }

    // Atualizar uma conquista existente
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, criterios, ativa, oculta } = req.body;

            const conquista = await Conquista.findById(id);

            if (!conquista) {
                return res.status(404).json({ message: 'Conquista não encontrada.' });
            }

            conquista.titulo = titulo || conquista.titulo;
            conquista.descricao = descricao || conquista.descricao;
            conquista.criterios = criterios || conquista.criterios;
            conquista.ativa = ativa !== undefined ? ativa : conquista.ativa;
            conquista.oculta = oculta !== undefined ? oculta : conquista.oculta;

            await conquista.save();

            res.status(200).json({ message: 'Conquista atualizada com sucesso!', conquista });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar conquista.', error });
        }
    }

    // Deletar uma conquista
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const conquista = await Conquista.findByIdAndDelete(id);

            if (!conquista) {
                return res.status(404).json({ message: 'Conquista não encontrada.' });
            }

            res.status(200).json({ message: 'Conquista deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar conquista.', error });
        }
    }

    // Verificar se o usuário atingiu alguma conquista
    static async verificarConquistas(userId) {
        try {
            const user = await User.findById(userId).populate('conquistas');
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            const conquistas = await Conquista.find({ ativa: true });

            for (const conquista of conquistas) {
                const criteriosAtingidos = conquista.criterios.every(criterio => {
                    switch (criterio.tipo) {
                        case 'questoes_feitas':
                            return this.compararValores(user.estatisticas.questoes_feitas, criterio.valorAlvo, criterio.comparador);
                        case 'acertos':
                            return this.compararValores(user.estatisticas.acertos, criterio.valorAlvo, criterio.comparador);
                        case 'quizzes_completos':
                            return this.compararValores(user.estatisticas.quizzes_completos, criterio.valorAlvo, criterio.comparador);
                        case 'tempo_estudo':
                            return this.compararValores(user.estatisticas.tempo_estudo, criterio.valorAlvo, criterio.comparador);
                        default:
                            return false;
                    }
                });

                if (criteriosAtingidos && !user.conquistas.includes(conquista._id)) {
                    user.conquistas.push(conquista._id);
                    await user.save();
                    console.log(`Conquista "${conquista.titulo}" atribuída ao usuário ${user.nome}.`);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar conquistas:', error);
        }
    }

    static compararValores(valorAtual, valorAlvo, comparador) {
        switch (comparador) {
            case 'igual':
                return valorAtual === valorAlvo;
            case 'maior':
                return valorAtual > valorAlvo;
            case 'menor':
                return valorAtual < valorAlvo;
            case 'maior_igual':
                return valorAtual >= valorAlvo;
            case 'menor_igual':
                return valorAtual <= valorAlvo;
            default:
                return false;
        }
    }
};