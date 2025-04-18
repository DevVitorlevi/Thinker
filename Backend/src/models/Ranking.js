const mongoose = require('mongoose');

const rankingLevels = [
    { name: 'Iniciante', minPoints: 0, maxPoints: 199 },
    { name: 'Aprendiz', minPoints: 200, maxPoints: 499 },
    { name: 'Intermediário', minPoints: 500, maxPoints: 999 },
    { name: 'Avançado', minPoints: 1000, maxPoints: 1999 },
    { name: 'Mestre', minPoints: 2000, maxPoints: Infinity }
];

const userRankingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    points: { 
        type: Number, 
        default: 0,
        min: 0
    },
    currentLevel: { 
        type: String, 
        enum: rankingLevels.map(level => level.name),
        default: 'Iniciante'
    },
    quizzesCompleted: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Atualiza o nível automaticamente quando os pontos mudam
userRankingSchema.pre('save', function(next) {
    const userPoints = this.points;
    const newLevel = rankingLevels.find(level => 
        userPoints >= level.minPoints && userPoints <= level.maxPoints
    ).name;

    if (this.currentLevel !== newLevel) {
        this.currentLevel = newLevel;
    }
    next();
});

module.exports = mongoose.model('UserRanking', userRankingSchema);