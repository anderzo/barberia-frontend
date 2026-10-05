import { API_URL } from '../config/env'
import type { LoginResponse } from '../types/auth'

const KEY = 'sesion'

export const sesionStorage = {
  get(): LoginResponse | null {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as LoginResponse) : null
    } catch {
      return null
    }
  },
  set: (s: LoginResponse) => localStorage.setItem(KEY, JSON.stringify(s)),
  clear: () => localStorage.removeItem(KEY),
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = sesionStorage.get()?.token
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.error ?? `Error ${res.status}`)
  return data as T
}