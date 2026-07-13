import CollectionPage from './CollectionPage.jsx'
import { formatDateTime, formatNumber, getDisplayValue } from '../lib/api.js'

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      subtitle="Recommended workout blueprints, exercises, and target difficulty levels."
      endpoint="workouts"
      endpointUrl={workoutsApiUrl}
      badgeLabel="workouts"
      emptyMessage="No workouts have been recommended yet."
      renderItem={(workout) => (
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="text-uppercase text-body-secondary small fw-semibold mb-1">Workout plan</p>
              <h3 className="h4 fw-bold mb-1">{workout.title}</h3>
              <p className="text-body-secondary mb-0">Focus: {workout.focus}</p>
            </div>
            <span className="badge rounded-pill text-bg-warning align-self-start text-uppercase">
              {workout.difficulty}
            </span>
          </div>

          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Duration</div>
                <div className="fs-5 fw-semibold">{formatNumber(workout.durationMinutes)} min</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Exercises</div>
                <div className="fs-5 fw-semibold">{workout.exercises?.length ?? 0}</div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Audience</div>
                <div className="fw-semibold">
                  {(workout.recommendedForUsers ?? []).length === 0
                    ? 'Open recommendation'
                    : `${workout.recommendedForUsers.length} users recommended`}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Created</div>
                <div className="fw-semibold">{formatDateTime(workout.createdAt)}</div>
              </div>
            </div>
          </div>

          {(workout.exercises ?? []).length > 0 && (
            <div>
              <div className="text-uppercase text-body-secondary small fw-semibold mb-2">Exercise list</div>
              <div className="d-flex flex-wrap gap-2">
                {workout.exercises.map((exercise, index) => (
                  <span key={`${exercise.name}-${index}`} className="badge text-bg-light border rounded-pill px-3 py-2">
                    {exercise.name} • {formatNumber(exercise.sets)} x {formatNumber(exercise.reps)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(workout.recommendedForUsers ?? []).length > 0 && (
            <div>
              <div className="text-uppercase text-body-secondary small fw-semibold mb-2">Recommended for</div>
              <div className="d-flex flex-wrap gap-2">
                {workout.recommendedForUsers.map((user, index) => (
                  <span
                    key={`${getDisplayValue(user, 'user')}-${index}`}
                    className="badge text-bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2"
                  >
                    {getDisplayValue(user, 'Unknown user')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    />
  )
}