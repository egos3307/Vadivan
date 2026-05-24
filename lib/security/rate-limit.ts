type RateLimitMap = {
  [key: string]: {
    count: number
    lastRequest: number
  }
}

const requests: RateLimitMap = {}

export function rateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now()

  if (!requests[ip]) {
    requests[ip] = {
      count: 1,
      lastRequest: now,
    }

    return true
  }

  const timePassed = now - requests[ip].lastRequest

  if (timePassed > windowMs) {
    requests[ip] = {
      count: 1,
      lastRequest: now,
    }

    return true
  }

  if (requests[ip].count >= limit) {
    return false
  }

  requests[ip].count++
  return true
}
