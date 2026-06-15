import { useState } from 'react'
import WishCard from './WishCard'
import WishBundleCard from './WishBundleCard'
import SkeletonCard from './SkeletonCard'
import {
  getClaimedWishes,
  getOpenWishes,
  sortByPrice,
} from '../utils/wishes'

function WishToolbar({
  listFilter,
  onListFilterChange,
  openCount,
  claimedCount,
  view,
  onViewChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="wish-toolbar">
      <div className="wish-toolbar-left">
        <div className="list-toggle" role="group" aria-label="Wishlist filter">
          <button
            type="button"
            className={`list-toggle-btn${listFilter === 'open' ? ' active' : ''}`}
            onClick={() => onListFilterChange('open')}
            aria-pressed={listFilter === 'open'}
          >
            Wishlist
            {openCount > 0 && (
              <span className="list-toggle-count">{openCount}</span>
            )}
          </button>
          {claimedCount > 0 && (
            <button
              type="button"
              className={`list-toggle-btn${listFilter === 'claimed' ? ' active' : ''}`}
              onClick={() => onListFilterChange('claimed')}
              aria-pressed={listFilter === 'claimed'}
            >
              Claimed
              <span className="list-toggle-count">{claimedCount}</span>
            </button>
          )}
        </div>

        <label className="sort-control">
          <span className="sort-label">Sort</span>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort wishes"
          >
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </label>
      </div>

      <div className="view-toggle" role="group" aria-label="Display layout">
        <button
          type="button"
          className={`view-toggle-btn${view === 'grid' ? ' active' : ''}`}
          onClick={() => onViewChange('grid')}
          aria-pressed={view === 'grid'}
          aria-label="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <rect x="1" y="1" width="6" height="6" rx="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
          </svg>
          Grid
        </button>
        <button
          type="button"
          className={`view-toggle-btn${view === 'list' ? ' active' : ''}`}
          onClick={() => onViewChange('list')}
          aria-pressed={view === 'list'}
          aria-label="List view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <rect x="1" y="2" width="14" height="3" rx="1.5" />
            <rect x="1" y="6.5" width="14" height="3" rx="1.5" />
            <rect x="1" y="11" width="14" height="3" rx="1.5" />
          </svg>
          List
        </button>
      </div>
    </div>
  )
}

export default function WishGrid({ wishes, loading, error, onPledge }) {
  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('price-desc')
  const [listFilter, setListFilter] = useState('open')
  const layoutClass = view === 'list' ? 'wish-list' : 'wish-grid'

  const openWishes = sortByPrice(getOpenWishes(wishes), sort)
  const claimedWishes = sortByPrice(getClaimedWishes(wishes), sort)
  const activeWishes = listFilter === 'claimed' ? claimedWishes : openWishes

  const toolbar = (
    <WishToolbar
      listFilter={listFilter}
      onListFilterChange={setListFilter}
      openCount={openWishes.length}
      claimedCount={claimedWishes.length}
      view={view}
      onViewChange={setView}
      sort={sort}
      onSortChange={setSort}
    />
  )

  if (loading) {
    return (
      <>
        {toolbar}
        <div className={layoutClass}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} layout={view} />
          ))}
        </div>
      </>
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

  if (wishes.length === 0) {
    return (
      <div className="text-center py-[72px] px-6 text-[var(--text-2)]">
        <div className="text-[40px] mb-4">📭</div>
        <div className="text-lg font-bold">Nothing here yet.</div>
      </div>
    )
  }

  return (
    <>
      {toolbar}

      {activeWishes.length === 0 ? (
        <div className="text-center py-[56px] px-6 text-[var(--text-2)]">
          <div className="text-[36px] mb-3">
            {listFilter === 'claimed' ? '🎉' : '✨'}
          </div>
          <div className="text-lg font-bold mb-2">
            {listFilter === 'claimed'
              ? 'Nothing claimed yet'
              : 'Wishlist is clear'}
          </div>
          <div className="text-[14.5px]">
            {listFilter === 'open' && claimedWishes.length > 0
              ? 'Everything on the list has been claimed.'
              : listFilter === 'claimed'
                ? 'No gifts claimed so far.'
                : 'Check back soon for new items.'}
          </div>
          {listFilter === 'open' && claimedWishes.length > 0 && (
            <button
              type="button"
              className="btn btn-outline mt-6"
              onClick={() => setListFilter('claimed')}
            >
              See claimed items
            </button>
          )}
        </div>
      ) : (
        <div className={layoutClass}>
          {activeWishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} layout={view} onPledge={onPledge} />
          ))}
          {listFilter === 'open' && (
            <WishBundleCard
              openWishes={openWishes}
              layout={view}
              onPledge={onPledge}
            />
          )}
        </div>
      )}
    </>
  )
}
