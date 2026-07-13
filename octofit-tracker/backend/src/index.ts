import express from 'express';
import './config/database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find().populate('team', 'name').lean();
    res.json({ count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email').lean();
    res.json({ count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ completedAt: -1 })
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();
    res.json({ count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ periodEnd: -1 })
      .populate('entries.user', 'name')
      .populate('entries.team', 'name')
      .lean();
    res.json({ count: leaderboard.length, data: leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('recommendedForUsers', 'name').lean();
    res.json({ count: workouts.length, data: workouts });
  } catch (error) {
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
  console.log(`OctoFit backend listening on port ${port}`);
});
