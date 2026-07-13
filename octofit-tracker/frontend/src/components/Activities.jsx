import CollectionPage from './CollectionPage.jsx'
import { formatDateTime, formatNumber, getDisplayValue } from '../lib/api.js'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function formatActivityType(value) {
  return String(value ?? 'activity')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

export default function Activities() {
  return (
    <CollectionPage
      title="Activity Log"
      subtitle="Review recent training sessions, duration, calories, and who completed each workout."
      endpoint="activities"
      endpointUrl={activitiesApiUrl}
      badgeLabel="activities"
      emptyMessage="No activities have been recorded yet."
      renderItem={(activity) => (
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="text-uppercase text-body-secondary small fw-semibold mb-1">
                {formatActivityType(activity.type)}
              </p>
              <h3 className="h4 fw-bold mb-1">{getDisplayValue(activity.user, 'Unknown user')}</h3>
              <p className="text-body-secondary mb-0">
                {getDisplayValue(activity.team, 'No team assigned')} • {formatDateTime(activity.completedAt)}
              </p>
            </div>
            <span className="badge rounded-pill text-bg-primary align-self-start">
              {formatNumber(activity.caloriesBurned)} cal
            </span>
          </div>

          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Duration</div>
                <div className="fs-5 fw-semibold">{formatNumber(activity.durationMinutes)} min</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Distance</div>
                <div className="fs-5 fw-semibold">
                  {activity.distanceKm === undefined || activity.distanceKm === null
                    ? '—'
                    : `${formatNumber(activity.distanceKm, 1)} km`}
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">User</div>
                <div className="fs-5 fw-semibold">{getDisplayValue(activity.user, 'Unknown user')}</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Team</div>
                <div className="fs-5 fw-semibold">{getDisplayValue(activity.team, 'No team')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}