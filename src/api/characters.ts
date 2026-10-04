import { apiClient } from './client';
import type { CharactersResponse } from '../types/character';

interface FetchCharactersOptions {
  signal?: AbortSignal;
}

export async function fetchCharacters(
  { signal }: FetchCharactersOptions = {},
): Promise<CharactersResponse> {
  const { data } = await apiClient.get<CharactersResponse>('people', {
    ...(signal ? { signal } : {}),
  });

  return data;
}

