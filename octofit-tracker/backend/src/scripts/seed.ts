import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Sprinters',
        description: 'A cardio-focused team preparing for city 10K events.'
      },
      {
        name: 'Iron Octos',
        description: 'Strength athletes focused on progressive overload and form.'
      }
    ]);

    const users = await User.insertMany([
      {
        name: 'Mia Fernandez',
        email: 'mia.fernandez@octofit.local',
        age: 29,
        fitnessLevel: 'intermediate',
        team: teams[0]._id,
        points: 1460
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.local',
        age: 34,
        fitnessLevel: 'advanced',
        team: teams[1]._id,
        points: 1590
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.local',
        age: 26,
        fitnessLevel: 'beginner',
        team: teams[0]._id,
        points: 980
      },
      {
        name: 'Luca Weber',
        email: 'luca.weber@octofit.local',
        age: 31,
        fitnessLevel: 'intermediate',
        team: teams[1]._id,
        points: 1310
      }
    ]);

    teams[0].members = [users[0]._id, users[2]._id];
    teams[0].totalPoints = users[0].points + users[2].points;
    teams[1].members = [users[1]._id, users[3]._id];
    teams[1].totalPoints = users[1].points + users[3].points;
    await Promise.all([teams[0].save(), teams[1].save()]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 42,
        distanceKm: 8.1,
        caloriesBurned: 520,
        completedAt: new Date('2026-07-10T06:30:00.000Z')
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 610,
        completedAt: new Date('2026-07-10T18:15:00.000Z')
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        type: 'walk',
        durationMinutes: 35,
        distanceKm: 3.9,
        caloriesBurned: 220,
        completedAt: new Date('2026-07-11T07:05:00.000Z')
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'cycle',
        durationMinutes: 48,
        distanceKm: 19.7,
        caloriesBurned: 540,
        completedAt: new Date('2026-07-11T17:40:00.000Z')
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'hiit',
        durationMinutes: 28,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-12T12:20:00.000Z')
      }
    ]);

    await Leaderboard.create({
      period: 'weekly',
      periodStart: new Date('2026-07-06T00:00:00.000Z'),
      periodEnd: new Date('2026-07-12T23:59:59.000Z'),
      entries: [
        {
          user: users[1]._id,
          team: teams[1]._id,
          points: users[1].points,
          rank: 1
        },
        {
          user: users[0]._id,
          team: teams[0]._id,
          points: users[0].points,
          rank: 2
        },
        {
          user: users[3]._id,
          team: teams[1]._id,
          points: users[3].points,
          rank: 3
        },
        {
          user: users[2]._id,
          team: teams[0]._id,
          points: users[2].points,
          rank: 4
        }
      ]
    });

    await Workout.insertMany([
      {
        title: 'Tempo Builder',
        focus: 'Endurance + pacing',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 10 },
          { name: 'Tempo intervals', sets: 4, reps: 5 },
          { name: 'Cooldown walk', sets: 1, reps: 8 }
        ],
        recommendedForUsers: [users[0]._id, users[2]._id]
      },
      {
        title: 'Strength Pyramid',
        focus: 'Full-body power',
        difficulty: 'advanced',
        durationMinutes: 60,
        exercises: [
          { name: 'Back squat', sets: 5, reps: 5 },
          { name: 'Bench press', sets: 4, reps: 6 },
          { name: 'Deadlift', sets: 3, reps: 5 }
        ],
        recommendedForUsers: [users[1]._id, users[3]._id]
      },
      {
        title: 'Starter Mobility Flow',
        focus: 'Mobility + core stability',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Cat-cow stretch', sets: 2, reps: 10 },
          { name: 'Bodyweight lunge', sets: 3, reps: 10 },
          { name: 'Plank hold (30 sec)', sets: 3, reps: 1 }
        ],
        recommendedForUsers: [users[2]._id]
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
