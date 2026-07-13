import { useCollection } from '../hooks/useCollection.js'

export default function CollectionPage({
  title,
  subtitle,
  endpoint,
  endpointUrl,
  emptyMessage,
  badgeLabel,
  renderItem,
  gridClassName = 'row g-4'
}) {
  const { isLoading, error, items, totalCount } = useCollection(endpointUrl ?? endpoint)

  return (
    <section className="container-fluid px-3 px-lg-4 py-4 py-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <p className="app-eyebrow mb-2">{endpoint}</p>
          <h2 className="h1 fw-bold text-dark mb-2">{title}</h2>
          <p className="text-body-secondary mb-0">{subtitle}</p>
        </div>
        <div className="badge rounded-pill text-bg-dark px-3 py-2 fs-6">
          {totalCount} {badgeLabel}
        </div>
      </div>

      {isLoading ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-lg-5 text-center text-body-secondary">
            Loading {title.toLowerCase()}...
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger border-0 shadow-sm rounded-4 mb-0" role="alert">
          <strong>Failed to load {title.toLowerCase()}.</strong> {error.message}
        </div>
      ) : items.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4 p-lg-5 text-body-secondary">{emptyMessage}</div>
        </div>
      ) : (
        <div className={gridClassName}>
          {items.map((item, index) => (
            <div className="col-12" key={item?._id ?? item?.id ?? item?.slug ?? `${index}`}>
              <article className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-lg-5">{renderItem(item, index)}</div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}