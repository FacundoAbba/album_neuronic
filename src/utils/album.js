import { FIGURITAS } from '../data/figuritasManifest'

export const STICKERS_PER_PAGE = 4
export const STORAGE_KEY = 'panini-album-collection-v2'
export const TOTAL_STICKERS = FIGURITAS.length

const assetBase = import.meta.env.BASE_URL

/** Coloca tapa.png y fondo.png en la carpeta public/ del proyecto */
export const ALBUM_ASSETS = {
  tapa: `${assetBase}tapa.png`,
  fondo: `${assetBase}fondo.png`,
}

/** URL pública del álbum (GitHub Pages) */
export function getAlbumShareUrl() {
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL
  }
  if (typeof window !== 'undefined') {
    return new URL(import.meta.env.BASE_URL, window.location.href).href
  }
  return 'https://facundoabba.github.io/album_neuronic/'
}

export function getFullCollection() {
  return new Set(FIGURITAS.map((f) => f.id))
}

export function getTotalPages() {
  return Math.ceil(TOTAL_STICKERS / STICKERS_PER_PAGE)
}

export function getStickersForPage(pageIndex) {
  const start = pageIndex * STICKERS_PER_PAGE + 1
  const end = Math.min(start + STICKERS_PER_PAGE - 1, TOTAL_STICKERS)
  const stickers = []
  for (let n = start; n <= end; n += 1) {
    stickers.push(n)
  }
  return stickers
}

export function getFigurita(number) {
  return FIGURITAS.find((f) => f.id === number) ?? null
}

export function getStickerImagePath(number) {
  const figurita = getFigurita(number)
  if (!figurita) return null
  return `${assetBase}figuritas/${encodeURIComponent(figurita.file)}`
}

export function loadCollection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getFullCollection()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return getFullCollection()
    const saved = new Set(
      parsed.filter(
        (n) => typeof n === 'number' && n >= 1 && n <= TOTAL_STICKERS,
      ),
    )
    return saved.size > 0 ? saved : getFullCollection()
  } catch {
    return getFullCollection()
  }
}

export function saveCollection(collected) {
  const sorted = [...collected].sort((a, b) => a - b)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted))
}

export function pickRandomStickerNumber() {
  return Math.floor(Math.random() * TOTAL_STICKERS) + 1
}
