"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    type: {
        type: String,
        enum: ['run', 'cycle', 'strength', 'yoga', 'hiit', 'walk'],
        required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
