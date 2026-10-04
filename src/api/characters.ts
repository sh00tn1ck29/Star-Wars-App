import { apiClient } from './client';
import type { CharactersResponse } from '../types/character';

import type { FetchOptions } from './types';

export async function fetchCharacters(
  { signal }: FetchOptions = {},
): Promise<CharactersResponse> {
  const { data } = await apiClient.get<CharactersResponse>('people', {
    ...(signal ? { signal } : {}),
  });

  return data;
}

