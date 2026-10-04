import { apiClient } from '../../shared/gateways/index';
import type { CharactersResponse } from '../types/index';

import type { FetchOptions } from '../../shared/types/index';

export async function fetchCharacters(
  { signal }: FetchOptions = {},
): Promise<CharactersResponse> {
  const { data } = await apiClient.get<CharactersResponse>('people', {
    ...(signal ? { signal } : {}),
  });

  return data;
}

