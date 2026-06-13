import { useState } from 'react'
import { cardGradient, formatPrice, productEmoji } from '../utils/wishes'

function ProductPlaceholder({ name, gifted }) {
  return (
    <div
      className="img-placeholder"
      style={{ background: cardGradient(gifted) }}
    >
      <span style={{ filter: gifted ? 'grayscale(1)' : 'none' }}>
        {productEmoji(name)}
      </span>
    </div>
  )
}

export default function WishCard({ wish, onPledge }) {
  const f = wish.fields
  const name = f['Product Name']
  const price = f.Price
  const url = f['Product URL']
  const gifted = f.Select === 'Gifted'
  const [imgErr, setImgErr] = useState(false)

  const cardClass = ['wish-card', gifted && 'gifted'].filter(Boolean).join(' ')

  return (
    <div className={cardClass}>
      <div className="img-wrap">
        {f['Hero Image'] && !imgErr ? (
          <img
            src={f['Hero Image']}
            alt={name}
            onError={() => setImgErr(true)}
          />
        ) : (
          <ProductPlaceholder name={name} gifted={gifted} />
        )}
        {gifted && <div className="badge badge-claimed">✓ Claimed</div>}
      </div>

      <div className="card-body">
        <div className="product-name">{name}</div>
        <div className="product-price">{formatPrice(price)}</div>
        <div className="card-actions">
          {gifted ? (
            <button
              className="btn btn-outline"
              disabled
              style={{ flex: 1, cursor: 'default' }}
            >
              Already claimed 🎉
            </button>
          ) : (
            <>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View
              </a>
              <button
                className="btn btn-primary"
                style={{ flex: 2 }}
                onClick={() => onPledge(wish)}
              >
                I&apos;ll get this 🎁
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
