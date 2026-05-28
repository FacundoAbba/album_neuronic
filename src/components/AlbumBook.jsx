import { ChevronLeft, ChevronRight } from 'lucide-react'
import AlbumCover from './AlbumCover'
import AlbumPage from './AlbumPage'

export default function AlbumBook({
  viewIndex,
  collected,
  isTurning,
  turnDirection,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) {
  const isCover = viewIndex === 0
  const pageIndex = viewIndex - 1

  const turnClass = isTurning
    ? turnDirection === 'next'
      ? 'album-page-turn-next'
      : 'album-page-turn-prev'
    : 'album-page-idle'

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="album-stage">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious || isTurning}
          aria-label="Página anterior"
          className={[
            'absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2',
            'flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9',
            'bg-white/95 shadow-md active:scale-95',
            'disabled:pointer-events-none disabled:opacity-25',
          ].join(' ')}
        >
          <ChevronLeft className="h-5 w-5 text-album-cover sm:h-6 sm:w-6" />
        </button>

        <div className="album-perspective h-full w-full">
          <div className="relative h-full w-full overflow-hidden rounded-md bg-album-cream/95 shadow-book sm:rounded-lg">
            <div className={`album-page-layer h-full w-full p-0.5 sm:p-1 ${turnClass}`}>
              {isCover ? (
                <AlbumCover />
              ) : (
                <AlbumPage pageIndex={pageIndex} collected={collected} />
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || isTurning}
          aria-label="Página siguiente"
          className={[
            'absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2',
            'flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9',
            'bg-white/95 shadow-md active:scale-95',
            'disabled:pointer-events-none disabled:opacity-25',
          ].join(' ')}
        >
          <ChevronRight className="h-5 w-5 text-album-cover sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}
