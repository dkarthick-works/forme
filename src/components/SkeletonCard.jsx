export default function SkeletonCard({ layout = 'grid' }) {
  const cardClass = ['wish-card', layout === 'list' && 'list'].filter(Boolean).join(' ')

  return (
    <div className={cardClass}>
      <div className="skeleton img-skeleton" />
      <div className="card-body">
        <div
          className="skeleton"
          style={{ height: 17, width: '65%', marginBottom: 8 }}
        />
        <div
          className="skeleton"
          style={{ height: 15, width: '30%', marginBottom: 15 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <div
            className="skeleton"
            style={{ height: 36, flex: 1, borderRadius: 10 }}
          />
          <div
            className="skeleton"
            style={{ height: 36, flex: 2, borderRadius: 10 }}
          />
        </div>
      </div>
    </div>
  )
}
