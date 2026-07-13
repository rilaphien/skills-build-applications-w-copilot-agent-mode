import CollectionPage from './CollectionPage.jsx'
import { formatDateTime, formatNumber, getDisplayValue } from '../lib/api.js'

function formatPeriod(value) {
  return String(value ?? 'period')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

export default function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      subtitle="See the latest scoring period and the entries driving the competition."
      endpoint="leaderboard"
      badgeLabel="boards"
      emptyMessage="The leaderboard is empty right now."
      renderItem={(board) => (
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="text-uppercase text-body-secondary small fw-semibold mb-1">
                {formatPeriod(board.period)}
              </p>
              <h3 className="h4 fw-bold mb-1">Leaderboard snapshot</h3>
              <p className="text-body-secondary mb-0">
                {formatDateTime(board.periodStart)} to {formatDateTime(board.periodEnd)}
              </p>
            </div>
            <span className="badge rounded-pill text-bg-dark align-self-start">
              {board.entries?.length ?? 0} entries
            </span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Team</th>
                  <th scope="col" className="text-end">Points</th>
                </tr>
              </thead>
              <tbody>
                {(board.entries ?? []).map((entry, index) => (
                  <tr key={`${board._id ?? 'board'}-${entry.rank ?? index}`}>
                    <td>
                      <span className="badge text-bg-primary rounded-pill">#{entry.rank ?? index + 1}</span>
                    </td>
                    <td>{getDisplayValue(entry.user, 'Unknown user')}</td>
                    <td>{getDisplayValue(entry.team, 'No team assigned')}</td>
                    <td className="text-end fw-semibold">{formatNumber(entry.points)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    />
  )
}