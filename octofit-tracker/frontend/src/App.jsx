import { Link, NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName, isCodespaceConfigured } from './lib/api.js'
import './App.css'

const navigationItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' }
]

function ShellLayout() {
  return (
    <div className="app-shell d-flex flex-column">
      <header className="app-header border-bottom border-white border-opacity-10">
        <div className="container-fluid px-3 px-lg-4 py-4 py-lg-5">
          <div className="row align-items-end g-4">
            <div className="col-12 col-xl-8">
              <p className="app-eyebrow mb-2">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3 text-white">
                React 19 dashboard for training, teams, and competition.
              </h1>
              <p className="lead text-white-50 mb-0">
                Browse live collections from the Node and MongoDB backend with route-based
                navigation and flexible response handling.
              </p>
            </div>
            <div className="col-12 col-xl-4">
              <div className="status-panel rounded-4 p-3 p-lg-4 text-white">
                <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
                  <span className="badge text-bg-success">React 19</span>
                  <span className="badge text-bg-info">Vite</span>
                  <span className={`badge ${isCodespaceConfigured ? 'text-bg-primary' : 'text-bg-warning'}`}>
                    {isCodespaceConfigured ? 'Codespaces API' : 'Local fallback'}
                  </span>
                </div>
                <div className="small text-uppercase text-white-50 fw-semibold mb-1">
                  API base
                </div>
                <div className="text-break fw-semibold mb-3">{apiBaseUrl}</div>
                {!isCodespaceConfigured ? (
                  <div className="alert alert-warning mb-0 py-2 px-3 small">
                    Define VITE_CODESPACE_NAME in .env.local to target the Codespaces API URL.
                  </div>
                ) : (
                  <div className="small text-white-50">
                    VITE_CODESPACE_NAME is set to {codespaceName}.
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="mt-4 d-flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-pill rounded-pill px-3 py-2 text-decoration-none ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

function OverviewPage() {
  return (
    <section className="container-fluid px-3 px-lg-4 py-4 py-lg-5">
      <div className="row g-4 align-items-stretch mb-4">
        <div className="col-12 col-xl-7">
          <div className="hero-card rounded-4 p-4 p-lg-5 h-100 text-white">
            <p className="app-eyebrow mb-2 text-white-50">Navigation</p>
            <h2 className="display-6 fw-bold mb-3">Jump straight into each tracked collection.</h2>
            <p className="text-white-75 mb-4">
              The pages below call the backend through Codespaces-aware API URLs and accept both
              paginated payloads and plain arrays.
            </p>
            <div className="d-flex flex-wrap gap-2">
              {navigationItems
                .filter((item) => item.to !== '/')
                .map((item) => (
                  <Link key={item.to} to={item.to} className="btn btn-light rounded-pill px-3">
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="card shadow-sm border-0 h-100 rounded-4">
            <div className="card-body p-4 p-lg-5">
              <p className="app-eyebrow mb-2">Environment</p>
              <h2 className="h3 fw-bold mb-3">Set your Codespaces name once.</h2>
              <p className="text-body-secondary mb-4">
                Create or edit .env.local in the frontend folder and define VITE_CODESPACE_NAME.
              </p>
              <pre className="env-example rounded-4 p-3 mb-0">VITE_CODESPACE_NAME=your-codespace-name</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="activities" element={<Activities />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="users" element={<Users />} />
        <Route path="workouts" element={<Workouts />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
