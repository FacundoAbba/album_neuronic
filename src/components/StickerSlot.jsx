import { useEffect, useState } from 'react'
import { getFigurita, getStickerImagePath } from '../utils/album'

export default function StickerSlot({ number, isCollected }) {
  const [imageError, setImageError] = useState(false)
  const imagePath = getStickerImagePath(number)
  const figurita = getFigurita(number)

  useEffect(() => {
    setImageError(false)
  }, [number])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {imagePath && !imageError ? (
        <img
          src={imagePath}
          alt={figurita?.name ?? `Figurita ${number}`}
          loading="eager"
          decoding="async"
          className={[
            'h-full w-full object-contain',
            'transition-opacity duration-300',
            isCollected ? 'opacity-100' : 'opacity-40 grayscale',
          ].join(' ')}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="h-full w-full bg-white/20" aria-hidden />
      )}
    </div>
  )
}
