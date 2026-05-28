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
    <div className="flex h-full w-full items-center justify-center">
      {imagePath && !imageError ? (
        <img
          src={imagePath}
          alt={figurita?.name ?? `Figurita ${number}`}
          loading="eager"
          decoding="async"
          className={[
            'mx-auto block max-h-[93%] max-w-[93%] object-contain object-center',
            'transition-opacity duration-300',
            isCollected ? 'opacity-100' : 'opacity-40 grayscale',
          ].join(' ')}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="h-[60%] w-[60%] rounded bg-white/20" aria-hidden />
      )}
    </div>
  )
}
