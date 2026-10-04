import { apiClient } from './client';
import type { FetchOptions } from './types';

export async function fetchCachedResource<T>(
  url: string,
  cache: Map<string, T>,
  { signal }: FetchOptions = {},
): Promise<T> {
  signal?.throwIfAborted();

  const cachedResource = cache.get(url);
  if (cachedResource !== undefined) return cachedResource;

  const { data } = await apiClient.get<T>(url, {
    ...(signal ? { signal } : {}),
  });

  signal?.throwIfAborted();
  cache.set(url, data);
  return data;
}
