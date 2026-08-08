import type { PackageDto } from '@/redux/fetchres/package/packageApi'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000/api'

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 600 } })
    if (!res.ok) return null
    const json = (await res.json()) as { data?: T }
    return json.data ?? null
  } catch {
    return null
  }
}

export const fetchPackage = (slug: string) =>
  safeFetch<PackageDto>(`/packages/${encodeURIComponent(slug)}`)

export const fetchPackagesByType = async (type: 'HAJJ' | 'UMRAH'): Promise<PackageDto[]> => {
  const result = await safeFetch<PackageDto[]>(`/packages?type=${type}&status=PUBLISHED&limit=100`)
  return result ?? []
}
