const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const codespaceName = rawCodespaceName ?? ''
export const isCodespaceConfigured = Boolean(rawCodespaceName)
export const apiBaseUrl = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      totalCount: payload.length
    }
  }

  if (!payload || typeof payload !== 'object') {
    return {
      items: [],
      totalCount: 0
    }
  }

  const collectionCandidates = [payload.data, payload.items, payload.results]

  for (const candidate of collectionCandidates) {
    if (Array.isArray(candidate)) {
      return {
        items: candidate,
        totalCount: typeof payload.count === 'number' ? payload.count : candidate.length
      }
    }
  }

  for (const candidate of collectionCandidates) {
    if (candidate && typeof candidate === 'object') {
      const nestedCandidates = [candidate.data, candidate.items, candidate.results]

      for (const nestedCandidate of nestedCandidates) {
        if (Array.isArray(nestedCandidate)) {
          return {
            items: nestedCandidate,
            totalCount:
              typeof payload.count === 'number' ? payload.count : nestedCandidate.length
          }
        }
      }
    }
  }

  return {
    items: [],
    totalCount: typeof payload.count === 'number' ? payload.count : 0
  }
}

export async function fetchCollection(endpoint, signal) {
  const endpointValue = String(endpoint).trim()
  const requestUrl = /^https?:\/\//i.test(endpointValue)
    ? endpointValue
    : `${apiBaseUrl}/${endpointValue.replace(/^\/+|\/+$/g, '')}/`

  const response = await fetch(requestUrl, {
    signal,
    headers: {
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to load ${endpointValue}: ${response.status} ${response.statusText}`)
  }

  return normalizeCollection(await response.json())
}

export function getDisplayValue(value, fallback = 'Unassigned') {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.email ?? fallback
  }

  return String(value)
}

export function formatDateTime(value) {
  if (!value) {
    return 'Not available'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return String(value)
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

export function formatNumber(value, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '0'
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(Number(value))
}