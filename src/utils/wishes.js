export function sortWishes(list) {
  return [...list].sort((a, b) => {
    if (a.fields.Select === 'Gifted' && b.fields.Select !== 'Gifted') return 1
    if (b.fields.Select === 'Gifted' && a.fields.Select !== 'Gifted') return -1
    return 0
  })
}

export function formatPrice(price) {
  if (!price) return ''
  return '₹' + Number(price).toLocaleString('en-IN')
}

export function productEmoji(name = '') {
  const n = name.toLowerCase()
  if (n.includes('drone') || n.includes('dji')) return '🚁'
  if (n.includes('airpod') || n.includes('bud')) return '🎧'
  if (n.includes('headphone') || n.includes('xm')) return '🎧'
  if (n.includes('ipad') || n.includes('tablet')) return '📱'
  if (n.includes('kindle') || n.includes('reader')) return '📖'
  if (n.includes('gopro') || n.includes('hero 12')) return '📷'
  if (n.includes('speaker') || n.includes('jbl')) return '🔊'
  if (n.includes('watch') || n.includes('garmin')) return '⌚'
  if (n.includes('powerbank') || n.includes('anker')) return '🔋'
  if (n.includes('phone') || n.includes('iphone')) return '📱'
  if (n.includes('laptop') || n.includes('macbook')) return '💻'
  return '📦'
}

export function cardGradient(gifted) {
  if (gifted) return 'linear-gradient(135deg,#EDEAE5 0%,#E2DED8 100%)'
  return 'linear-gradient(135deg,#F5F0EA 0%,#EDE8E0 100%)'
}
