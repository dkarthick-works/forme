import { useState } from 'react'
import Header from './components/Header'
import WishGrid from './components/WishGrid'
import PledgeModal from './components/PledgeModal'
import { useWishes } from './hooks/useWishes'

export default function App() {
  const { wishes, loading, error } = useWishes()
  const [pledgeItem, setPledgeItem] = useState(null)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-[1080px] mx-auto px-6 pb-[100px]">
        <WishGrid
          wishes={wishes}
          loading={loading}
          error={error}
          onPledge={setPledgeItem}
        />
      </main>

      {pledgeItem && (
        <PledgeModal
          wish={pledgeItem}
          onClose={() => setPledgeItem(null)}
        />
      )}

      {!loading && !error && (
        <footer className="text-center px-6 pb-12 text-[var(--text-muted)] text-[13px]">
          Made with love for Karthick ❤️
        </footer>
      )}
    </div>
  )
}
