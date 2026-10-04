import { fetchCachedResource } from '../../../utils/index';
import type { FetchOptions } from '../../shared/types/index';
import type { Starship } from '../types/index';

const starshipsCache = new Map<string, Starship>();

export async function fetchStarships(
  starshipUrls: string[],
  options: FetchOptions = {},
): Promise<Starship[]> {
  return Promise.all(starshipUrls.map((url) => fetchCachedResource(url, starshipsCache, options)));
}
