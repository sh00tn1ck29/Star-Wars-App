import { apiClient } from './client';
import type { Film } from '../types/film';

import type { FetchOptions } from './types';

export async function fetchFilms(
  filmUrls: string[],
  { signal }: FetchOptions = {},
): Promise<Film[]> {
  return Promise.all(filmUrls.map(async (url) => {
    const { data } = await apiClient.get<Film>(url, {
      ...(signal ? { signal } : {}),
    });

    return data;
  }));
}
