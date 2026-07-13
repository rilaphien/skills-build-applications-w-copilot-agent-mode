import CollectionPage from './CollectionPage.jsx'
import { formatDateTime, formatNumber, getDisplayValue } from '../lib/api.js'

export default function Users() {
  return (
    <CollectionPage
      title="Users"
      subtitle="Browse athletes, their fitness levels, and the teams they are linked to."
      endpoint="users"
      badgeLabel="users"
      emptyMessage="No users were found."
      renderItem={(user) => (
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="text-uppercase text-body-secondary small fw-semibold mb-1">Athlete</p>
              <h3 className="h4 fw-bold mb-1">{user.name}</h3>
              <p className="text-body-secondary mb-0">{user.email}</p>
            </div>
            <span className="badge rounded-pill text-bg-success align-self-start text-uppercase">
              {user.fitnessLevel}
            </span>
          </div>

          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Age</div>
                <div className="fs-5 fw-semibold">{user.age ?? '—'}</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Points</div>
                <div className="fs-5 fw-semibold">{formatNumber(user.points)}</div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Team</div>
                <div className="fw-semibold">{getDisplayValue(user.team, 'No team assigned')}</div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Created</div>
                <div className="fw-semibold">{formatDateTime(user.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}