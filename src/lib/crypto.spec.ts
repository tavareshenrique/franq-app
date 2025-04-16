import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import {
  encrypt,
  decrypt,
  secureStore,
  secureRetrieve,
} from './crypto'

describe('Crypto Utils', () => {
  const originalEnv = process.env
  const mockKey = 'mock-secret-key'
  const sampleObject = { user: 'Alice', age: 30 }

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv, NEXT_PUBLIC_CRYPTO_KEY: mockKey }

    vi.stubGlobal('localStorage', {
      store: {} as Record<string, string>,
      setItem(key: string, value: string) {
        (this as any).store[key] = value
      },
      getItem(key: string) {
        return (this as any).store[key] || null
      },
      removeItem(key: string) {
        delete (this as any).store[key]
      },
      clear() {
        (this as any).store = {}
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    process.env = originalEnv
  })

  it('should encrypt and decrypt correctly', () => {
    const encrypted = encrypt(sampleObject)
    expect(typeof encrypted).toBe('string')

    const decrypted = decrypt<typeof sampleObject>(encrypted)
    expect(decrypted).toEqual(sampleObject)
  })

  it('should return original JSON if key is missing during encrypt', () => {
    process.env.NEXT_PUBLIC_CRYPTO_KEY = undefined as unknown as string
    const result = encrypt(sampleObject)
    expect(result).toBe(JSON.stringify(sampleObject))
  })

  it('should return original object if key is missing during decrypt', () => {
    const plain = JSON.stringify(sampleObject)
    process.env.NEXT_PUBLIC_CRYPTO_KEY = undefined as unknown as string
    const result = decrypt<typeof sampleObject>(plain)
    expect(result).toEqual(sampleObject)
  })

  it('should return null if decrypt fails on invalid string', () => {
    const result = decrypt('not a valid string')
    expect(result).toBeNull()
  })

  it('should store and retrieve securely from localStorage', () => {
    secureStore('test-key', sampleObject)
    const result = secureRetrieve<typeof sampleObject>('test-key')
    expect(result).toEqual(sampleObject)
  })

  it('should return null if key not found in localStorage', () => {
    const result = secureRetrieve('non-existent')
    expect(result).toBeNull()
  })
})
