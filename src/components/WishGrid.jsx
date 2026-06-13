import WishCard from './WishCard'
import SkeletonCard from './SkeletonCard'
import { sortWishes } from '../utils/wishes'

export default function WishGrid({ wishes, loading, error, onPledge }) {
  if (loading) {
    return (
      <div className="wish-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-[72px] px-6 text-[var(--text-2)]">
        <div className="text-[40px] mb-4">😔</div>
        <div className="text-lg font-bold mb-2">Couldn&apos;t load wishlist</div>
        <div className="text-[14.5px] mb-6">Try refreshing the page.</div>
        <button
          className="btn btn-outline"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    )
  }

  const sorted = sortWishes(wishes)

  if (sorted.length === 0) {
    return (
      <div className="text-center py-[72px] px-6 text-[var(--text-2)]">
        <div className="text-[40px] mb-4">📭</div>
        <div className="text-lg font-bold">Nothing here yet.</div>
      </div>
    )
  }

  return (
    <div className="wish-grid">
      {sorted.map((wish) => (
        <WishCard key={wish.id} wish={wish} onPledge={onPledge} />
      ))}
    </div>
  )
}
