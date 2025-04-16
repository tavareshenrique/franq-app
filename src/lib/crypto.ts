
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY!

export function encrypt(data: any): string {
  try {
    if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== "string") {      
      return JSON.stringify(data)
    }

    const jsonString = JSON.stringify(data)

    const encrypted = btoa(
      encodeURIComponent(jsonString)
        .split("")
        .map((c, i) => {
          return String.fromCharCode(c.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
        })
        .join(""),
    )

    return encrypted
  } catch (error) {
    return JSON.stringify(data)
  }
}

export function decrypt<T>(encryptedData: string): T | null {
  try {
    if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== "string") {
      return JSON.parse(encryptedData) as T
    }

    const isBase64 = /^[A-Za-z0-9+/=]+$/.test(encryptedData.trim())

    if (!isBase64) {
      return JSON.parse(encryptedData) as T
    }

    const decrypted = decodeURIComponent(
      atob(encryptedData)
        .split("")
        .map((c, i) => {
          return String.fromCharCode(c.charCodeAt(0) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length))
        })
        .join(""),
    )

    return JSON.parse(decrypted) as T
  } catch (error) {
    try {
      return JSON.parse(encryptedData) as T
    } catch {
      return null
    }
  }
}

export function secureStore(key: string, data: any): void {
  try {
    const encryptedData = encrypt(data)

    localStorage.setItem(key, encryptedData)
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function secureRetrieve<T>(key: string): T | null {
  try {
    const encryptedData = localStorage.getItem(key)

    if (!encryptedData) return null

    return decrypt<T>(encryptedData)
  } catch (error) {
    return null
  }
}
