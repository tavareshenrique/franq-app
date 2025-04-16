import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from "./use-toast"

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.resetAllMocks()
  })

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Hello', description: 'World' })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe('Hello')
    expect(result.current.toasts[0].description).toBe('World')
    expect(result.current.toasts[0].open).toBe(true)
  })

  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string = ''
    act(() => {
      const created = result.current.toast({ title: 'Dismiss me' })
      toastId = created.id
    })

    act(() => {
      result.current.dismiss(toastId)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should remove a toast after timeout', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string = ''
    act(() => {
      const created = result.current.toast({ title: 'To be removed' })
      toastId = created.id
    })

    act(() => {
      result.current.dismiss(toastId)
    })

    act(() => {
      vi.advanceTimersByTime(1000000)
    })

    expect(result.current.toasts.length).toBe(0)
  })

  it('should limit number of toasts to 1', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'First' })
      result.current.toast({ title: 'Second' })
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts[0].title).toBe('Second')
  })

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast())

    let updateFn: (props: any) => void

    act(() => {
      const created = result.current.toast({ title: 'Initial' })
      updateFn = created.update
    })

    act(() => {
      updateFn({ title: 'Updated' })
    })

    expect(result.current.toasts[0].title).toBe('Updated')
  })
})
