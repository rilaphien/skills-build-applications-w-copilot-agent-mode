"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true, min: 1 },
    reps: { type: Number, required: true, min: 1 }
}, {
    _id: false,
    versionKey: false
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], default: [] },
    recommendedForUsers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true,
    versionKey: false
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
