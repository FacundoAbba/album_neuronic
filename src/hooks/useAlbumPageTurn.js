import { useCallback, useEffect, useRef, useState } from 'react'
import { getTotalPages } from '../utils/album'

const PAGE_HOLD_MS = 10000
const TURN_DURATION_MS = 650

export function useAlbumPageTurn() {
  const totalStickerPages = getTotalPages()
  const totalViews = totalStickerPages + 1

  const [viewIndex, setViewIndex] = useState(0)
  const [isTurning, setIsTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState('next')
  const isTurningRef = useRef(false)
  const holdTimerRef = useRef(null)
  const turnTimerRef = useRef(null)

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    if (turnTimerRef.current) clearTimeout(turnTimerRef.current)
  }, [])

  const goToView = useCallback(
    (nextIndex, direction = 'next') => {
      if (isTurningRef.current) return
      if (nextIndex < 0 || nextIndex >= totalViews) return

      clearTimers()
      setTurnDirection(direction)
      isTurningRef.current = true
      setIsTurning(true)

      turnTimerRef.current = setTimeout(() => {
        setViewIndex(nextIndex)
        isTurningRef.current = false
        setIsTurning(false)
      }, TURN_DURATION_MS)
    },
    [clearTimers, totalViews],
  )

  const goNext = useCallback(() => {
    const nextIndex = viewIndex >= totalViews - 1 ? 0 : viewIndex + 1
    goToView(nextIndex, 'next')
  }, [goToView, totalViews, viewIndex])

  const goPrevious = useCallback(() => {
    if (viewIndex > 0) {
      goToView(viewIndex - 1, 'prev')
    }
  }, [goToView, viewIndex])

  /* Tras 10 s en la misma vista, pasa a la siguiente (incluye tras uso manual de flechas) */
  useEffect(() => {
    if (isTurning) return undefined

    holdTimerRef.current = setTimeout(() => {
      const nextIndex = viewIndex >= totalViews - 1 ? 0 : viewIndex + 1
      goToView(nextIndex, 'next')
    }, PAGE_HOLD_MS)

    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    }
  }, [goToView, isTurning, totalViews, viewIndex])

  useEffect(() => () => clearTimers(), [clearTimers])

  return {
    viewIndex,
    isTurning,
    turnDirection,
    totalViews,
    totalStickerPages,
    isCover: viewIndex === 0,
    canGoPrevious: viewIndex > 0 && !isTurning,
    canGoNext: viewIndex < totalViews - 1 && !isTurning,
    goNext,
    goPrevious,
  }
}
