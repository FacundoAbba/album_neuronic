import StickerSlot from './StickerSlot'
import AlbumQR from './AlbumQR'
import { ALBUM_ASSETS, getStickersForPage, getTotalPages } from '../utils/album'

export default function AlbumPage({ pageIndex, collected }) {
  const stickers = getStickersForPage(pageIndex)
  const isLastPage = pageIndex === getTotalPages() - 1
  const singleSticker = stickers.length === 1

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${ALBUM_ASSETS.fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="grid h-[74%] w-[74%] max-h-[74%] max-w-[74%] grid-cols-2 grid-rows-2 place-items-center">
        {stickers.map((number) => (
          <div
            key={number}
            className={[
              'flex h-full w-full items-center justify-center',
              singleSticker ? 'col-start-1 row-start-1' : '',
            ].join(' ')}
          >
            <StickerSlot
              number={number}
              isCollected={collected.has(number)}
            />
          </div>
        ))}
        {isLastPage && (
          <div className="col-start-2 row-start-2 flex h-full w-full items-center justify-center">
            <AlbumQR />
          </div>
        )}
      </div>
    </div>
  )
}
