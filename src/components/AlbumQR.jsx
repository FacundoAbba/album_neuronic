import QRCode from 'react-qr-code'
import { getAlbumShareUrl } from '../utils/album'

export default function AlbumQR() {
  const shareUrl = getAlbumShareUrl()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1">
      <div className="rounded-md bg-white p-1.5 shadow-md sm:p-2">
        <QRCode
          value={shareUrl}
          size={72}
          level="M"
          className="h-auto w-auto max-w-full"
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        />
      </div>
      <span className="max-w-[5.5rem] text-center text-[7px] font-medium leading-tight text-white/90 drop-shadow sm:text-[8px]">
        Escaneá para ver el álbum
      </span>
    </div>
  )
}
