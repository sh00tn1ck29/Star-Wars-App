import { fetchCachedResource } from '../../../utils/index';
import type { FetchOptions } from '../../shared/types/index';
import type { Film } from '../types/index';

const filmsCache = new Map<string, Film>();

export async function fetchFilms(
  filmUrls: string[],
  options: FetchOptions = {},
): Promise<Film[]> {
  return Promise.all(filmUrls.map((url) => fetchCachedResource(url, filmsCache, options)));
}
