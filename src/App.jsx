import { useCallback, useEffect, useState } from 'react'
import AlbumBook from './components/AlbumBook'
import { useAlbumPageTurn } from './hooks/useAlbumPageTurn'
import { loadCollection, saveCollection } from './utils/album'

export default function App() {
  const [collected, setCollected] = useState(() => loadCollection())

  const {
    viewIndex,
    isTurning,
    turnDirection,
    canGoPrevious,
    canGoNext,
    goNext,
    goPrevious,
  } = useAlbumPageTurn({ autoPlayOnMount: true })

  useEffect(() => {
    saveCollection(collected)
  }, [collected])

  const handlePrevious = useCallback(() => {
    goPrevious(true)
  }, [goPrevious])

  const handleNext = useCallback(() => {
    goNext(true)
  }, [goNext])

  return (
    <div className="album-app relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden">
      <main className="relative min-h-0 flex-1">
        <AlbumBook
          viewIndex={viewIndex}
          collected={collected}
          isTurning={isTurning}
          turnDirection={turnDirection}
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      </main>
    </div>
  )
}
