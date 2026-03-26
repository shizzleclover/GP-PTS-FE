export function decodeJwt(token: string | null): any | null {
  if (!token) return null

  const parts = token.split('.')
  if (parts.length < 2) return null

  // JWT payload is base64url-encoded
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')

  try {
    const json = atob(base64)
    return JSON.parse(json)
  } catch {
    return null
  }
}

