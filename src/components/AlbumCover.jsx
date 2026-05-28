import { ALBUM_ASSETS } from '../utils/album'

export default function AlbumCover() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <img
        src={ALBUM_ASSETS.tapa}
        alt="Tapa del álbum"
        className="h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden'
        }}
      />
    </div>
  )
}
