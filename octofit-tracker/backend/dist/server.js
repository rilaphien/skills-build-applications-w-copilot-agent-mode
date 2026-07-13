"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    codespaceName ? `https://${codespaceName}-5173.app.github.dev` : null
].filter((origin) => Boolean(origin)));
app.use(express_1.default.json());
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User_1.User.find().populate('team', 'name').lean();
        res.json({ count: users.length, data: users });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().populate('members', 'name email').lean();
        res.json({ count: teams.length, data: teams });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find()
            .sort({ completedAt: -1 })
            .populate('user', 'name email')
            .populate('team', 'name')
            .lean();
        res.json({ count: activities.length, data: activities });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find()
            .sort({ periodEnd: -1 })
            .populate('entries.user', 'name')
            .populate('entries.team', 'name')
            .lean();
        res.json({ count: leaderboard.length, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('recommendedForUsers', 'name').lean();
        res.json({ count: workouts.length, data: workouts });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
app.get('/api', (_req, res) => {
    res.json({
        service: 'OctoFit API',
        apiBaseUrl,
        routes: {
            users: `${apiBaseUrl}/api/users/`,
            teams: `${apiBaseUrl}/api/teams/`,
            activities: `${apiBaseUrl}/api/activities/`,
            leaderboard: `${apiBaseUrl}/api/leaderboard/`,
            workouts: `${apiBaseUrl}/api/workouts/`
        }
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${apiBaseUrl}`);
});
