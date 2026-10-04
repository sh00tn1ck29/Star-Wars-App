import { apiClient } from './client';
import type { Starship } from '../types/starship';

import type { FetchOptions } from './types';

export async function fetchStarships(
  starshipUrls: string[],
  { signal }: FetchOptions = {},
): Promise<Starship[]> {
  return Promise.all(starshipUrls.map(async (url) => {
    const { data } = await apiClient.get<Starship>(url, {
      ...(signal ? { signal } : {}),
    });

    return data;
  }));
}
