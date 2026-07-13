import CollectionPage from './CollectionPage.jsx'
import { formatDateTime, formatNumber } from '../lib/api.js'

export default function Teams() {
  return (
    <CollectionPage
      title="Teams"
      subtitle="Track team descriptions, members, and total points across the collection."
      endpoint="teams"
      badgeLabel="teams"
      emptyMessage="No teams have been created yet."
      renderItem={(team) => (
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="text-uppercase text-body-secondary small fw-semibold mb-1">Team profile</p>
              <h3 className="h4 fw-bold mb-1">{team.name}</h3>
              <p className="text-body-secondary mb-0">{team.description}</p>
            </div>
            <span className="badge rounded-pill text-bg-primary align-self-start">
              {formatNumber(team.totalPoints)} points
            </span>
          </div>

          <div className="row g-3">
            <div className="col-6 col-lg-4">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Members</div>
                <div className="fs-5 fw-semibold">{team.members?.length ?? 0}</div>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Created</div>
                <div className="fs-6 fw-semibold">{formatDateTime(team.createdAt)}</div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="metric-card rounded-3 p-3 h-100">
                <div className="text-uppercase small text-body-secondary fw-semibold">Roster</div>
                <div className="fw-semibold">
                  {(team.members ?? []).length === 0
                    ? 'No members yet'
                    : `${team.members.length} tracked members`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}