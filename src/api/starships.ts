import { fetchCachedResource } from './fetchCachedResource';
import type { FetchOptions } from './types';
import type { Starship } from '../types/starship';

const starshipsCache = new Map<string, Starship>();

export async function fetchStarships(
  starshipUrls: string[],
  options: FetchOptions = {},
): Promise<Starship[]> {
  return Promise.all(starshipUrls.map((url) => fetchCachedResource(url, starshipsCache, options)));
}
