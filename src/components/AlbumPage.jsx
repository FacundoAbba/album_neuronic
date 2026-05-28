import StickerSlot from './StickerSlot'
import { ALBUM_ASSETS, getStickersForPage } from '../utils/album'

export default function AlbumPage({ pageIndex, collected }) {
  const stickers = getStickersForPage(pageIndex)

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `url(${ALBUM_ASSETS.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-0">
        {stickers.map((number) => (
          <StickerSlot
            key={number}
            number={number}
            isCollected={collected.has(number)}
          />
        ))}
      </div>
    </div>
  )
}
