"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
}, {
    _id: false,
    versionKey: false
});
const leaderboardSchema = new mongoose_1.Schema({
    period: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: true
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    entries: { type: [leaderboardEntrySchema], default: [] }
}, {
    timestamps: true,
    versionKey: false
});
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
