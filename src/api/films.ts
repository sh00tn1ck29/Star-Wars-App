import { fetchCachedResource } from './fetchCachedResource';
import type { FetchOptions } from './types';
import type { Film } from '../types/film';

const filmsCache = new Map<string, Film>();

export async function fetchFilms(
  filmUrls: string[],
  options: FetchOptions = {},
): Promise<Film[]> {
  return Promise.all(filmUrls.map((url) => fetchCachedResource(url, filmsCache, options)));
}
