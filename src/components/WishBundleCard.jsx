import { formatPrice } from '../utils/wishes'

export default function WishBundleCard({ openWishes, layout = 'grid', onPledge }) {
  if (openWishes.length === 0) return null

  const total = openWishes.reduce(
    (sum, w) => sum + (Number(w.fields.Price) || 0),
    0,
  )
  const count = openWishes.length
  const itemNames = openWishes.map((w) => w.fields['Product Name']).filter(Boolean)

  const bundleWish = {
    id: '__bundle__',
    fields: {
      'Product Name': `Entire wishlist (${count} items)`,
      Price: total,
      Select: 'Open',
      _bundleItems: itemNames.join('; '),
    },
  }

  const cardClass = ['wish-card', 'bundle-card', layout === 'list' && 'list']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClass}>
      <div className="bundle-emoji" aria-hidden>
        🚀
      </div>
      <div className="card-body bundle-body">
        <div className="bundle-kicker">The nuclear option</div>
        <div className="product-name bundle-title">
          Get him everything. All of it.
        </div>
        <p className="bundle-copy">
          That&apos;s {formatPrice(total)} across {count}{' '}
          {count === 1 ? 'item' : 'items'} — one heroic move, zero piecemeal
          generosity.
        </p>
        <div className="product-price bundle-price">{formatPrice(total)}</div>
        <div className="card-actions">
          <button
            type="button"
            className="btn btn-primary bundle-btn"
            onClick={() => onPledge(bundleWish)}
          >
            I&apos;ll get this 🎁
          </button>
        </div>
      </div>
    </div>
  )
}
