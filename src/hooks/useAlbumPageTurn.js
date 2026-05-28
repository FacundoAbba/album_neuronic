import { useCallback, useEffect, useRef, useState } from 'react'
import { getTotalPages } from '../utils/album'

const COVER_HOLD_MS = 2800
const PAGE_HOLD_MS = 2400
const TURN_DURATION_MS = 650

export function useAlbumPageTurn({ autoPlayOnMount = true } = {}) {
  const totalStickerPages = getTotalPages()
  const totalViews = totalStickerPages + 1

  const [viewIndex, setViewIndex] = useState(0)
  const [isTurning, setIsTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState('next')
  const [autoTourActive, setAutoTourActive] = useState(autoPlayOnMount)
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

  const stopAutoTour = useCallback(() => {
    setAutoTourActive(false)
    clearTimers()
  }, [clearTimers])

  const goNext = useCallback(
    (fromUser = false) => {
      if (fromUser) stopAutoTour()
      if (viewIndex < totalViews - 1) {
        goToView(viewIndex + 1, 'next')
      }
    },
    [goToView, stopAutoTour, totalViews, viewIndex],
  )

  const goPrevious = useCallback(
    (fromUser = false) => {
      if (fromUser) stopAutoTour()
      if (viewIndex > 0) {
        goToView(viewIndex - 1, 'prev')
      }
    },
    [goToView, stopAutoTour, viewIndex],
  )

  const replayTour = useCallback(() => {
    clearTimers()
    isTurningRef.current = false
    setIsTurning(false)
    setViewIndex(0)
    setAutoTourActive(true)
  }, [clearTimers])

  useEffect(() => {
    if (!autoTourActive || isTurning) return undefined

    if (viewIndex >= totalViews - 1) {
      holdTimerRef.current = setTimeout(() => {
        setAutoTourActive(false)
      }, PAGE_HOLD_MS)
      return () => {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
      }
    }

    const holdMs = viewIndex === 0 ? COVER_HOLD_MS : PAGE_HOLD_MS

    holdTimerRef.current = setTimeout(() => {
      goToView(viewIndex + 1, 'next')
    }, holdMs)

    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    }
  }, [autoTourActive, goToView, isTurning, totalViews, viewIndex])

  useEffect(() => () => clearTimers(), [clearTimers])

  return {
    viewIndex,
    isTurning,
    turnDirection,
    autoTourActive,
    totalViews,
    totalStickerPages,
    isCover: viewIndex === 0,
    canGoPrevious: viewIndex > 0 && !isTurning,
    canGoNext: viewIndex < totalViews - 1 && !isTurning,
    goNext,
    goPrevious,
    replayTour,
    stopAutoTour,
  }
}
