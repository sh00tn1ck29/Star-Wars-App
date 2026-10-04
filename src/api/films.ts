import { apiClient } from './client';
import type { Film } from '../types/film';

interface FetchFilmsOptions {
  signal?: AbortSignal;
}

export async function fetchFilms(
  filmUrls: string[],
  { signal }: FetchFilmsOptions = {},
): Promise<Film[]> {
  return Promise.all(filmUrls.map(async (url) => {
    const { data } = await apiClient.get<Film>(url, {
      ...(signal ? { signal } : {}),
    });

    return data;
  }));
}
