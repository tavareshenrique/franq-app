import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "./use-mobile"
import { describe, it, beforeEach, expect, vi } from "vitest"

describe("useIsMobile", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query.includes("max-width: 767px"),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it("should return true if window width is less than MOBILE_BREAKPOINT", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 500 })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it("should return false if window width is greater than or equal to MOBILE_BREAKPOINT", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 800 })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("should update value when window width changes", () => {
    let listeners: Record<string, Function> = {}
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes("max-width: 767px"),
      addEventListener: (event: any, listener: any) => {
        listeners[event] = listener
      },
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    act(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, value: 700 })
      listeners.change?.()
    })

    expect(result.current).toBe(true)
  })

  it("should handle undefined window width gracefully", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: undefined })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("should clean up event listeners on unmount", () => {
    const removeEventListenerMock = vi.fn()
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
    }))

    const { unmount } = renderHook(() => useIsMobile())

    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })

  it("should update value when window width changes", () => {
    let listeners: Record<string, Function> = {}
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes("max-width: 767px"),
      addEventListener: (event: any, listener: any) => {
        listeners[event] = listener
      },
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    act(() => {
      Object.defineProperty(window, "innerWidth", { writable: true, value: 700 })
      listeners.change?.()
    })

    expect(result.current).toBe(true)
  })
})