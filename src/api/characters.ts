import axios from 'axios';
import type { CharactersResponse } from '../types/character';

const apiClient = axios.create({
  baseURL: 'https://swapi.info/api/',
  timeout: 15_000,
});

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
