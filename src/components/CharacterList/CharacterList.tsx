import { Pagination } from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { fetchCharacters } from '../../api/characters';
import type { Character } from '../../types/character';
import { LoadingHelmet } from '../LoadingHelmet/LoadingHelmet';
import './CharacterList.scss';

const CHARACTERS_PER_PAGE = 10;

type CharactersState =
  | { status: 'loading' }
  | { status: 'success'; characters: Character[] }
  | { status: 'error' };

interface CharacterListProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
}

export function CharacterList({ selectedCharacter, onCharacterSelect }: CharacterListProps) {
  const [charactersState, setCharactersState] = useState<CharactersState>({ status: 'loading' });
  const [currentPage, setCurrentPage] = useState(1);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCharacters(): Promise<void> {
      try {
        const characters = await fetchCharacters({ signal: controller.signal });

        if (!controller.signal.aborted) {
          setCharactersState({ status: 'success', characters });
        }
      } catch {
        if (!controller.signal.aborted) {
          setCharactersState({ status: 'error' });
        }
      }
    }

    void loadCharacters();

    return () => controller.abort();
  }, [requestVersion]);

  function retryRequest(): void {
    setCharactersState({ status: 'loading' });
    setCurrentPage(1);
    setRequestVersion((version) => version + 1);
  }

  const characters = charactersState.status === 'success' ? charactersState.characters : [];
  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);
  const firstCharacterIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const visibleCharacters = characters.slice(firstCharacterIndex, firstCharacterIndex + CHARACTERS_PER_PAGE);

  return (
    <section className="character-list" aria-labelledby="characters-heading" aria-busy={charactersState.status === 'loading'}>
      <div className="character-list__heading">
        <div>
          <p className="character-list__eyebrow">THE GALAXY ARCHIVE</p>
          <h1 id="characters-heading" className="character-list__title">Characters</h1>
        </div>
        {charactersState.status === 'success' && (
          <span className="character-list__count">{characters.length} characters</span>
        )}
      </div>

      {charactersState.status === 'loading' && (
        <LoadingHelmet />
      )}

      {charactersState.status === 'error' && (
        <div className="character-list__message" role="alert">
          <p>Unable to load characters. Please try again.</p>
          <button className="character-list__retry" type="button" onClick={retryRequest}>Try again</button>
        </div>
      )}

      {charactersState.status === 'success' && characters.length === 0 && (
        <p className="character-list__message" role="status">No characters found.</p>
      )}

      {charactersState.status === 'success' && characters.length > 0 && (
        <>
          <ol className="character-list__items" start={firstCharacterIndex + 1}>
            {visibleCharacters.map((character, index) => (
              <li className={`character-list__item${selectedCharacter?.url === character.url ? ' character-list__item--selected' : ''}`} key={character.url}>
                <span className="character-list__number" aria-hidden="true">
                  {String(firstCharacterIndex + index + 1).padStart(2, '0')}
                </span>
                <button className="character-list__name" type="button" aria-pressed={selectedCharacter?.url === character.url} onClick={() => onCharacterSelect(character)}>
                  {character.name}
                </button>
              </li>
            ))}
          </ol>

          <div className="character-list__footer">
            <p className="character-list__summary" role="status">
              {firstCharacterIndex + 1}–{Math.min(firstCharacterIndex + CHARACTERS_PER_PAGE, characters.length)} of {characters.length}
            </p>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} label="Characters pagination" />
          </div>
        </>
      )}
    </section>
  );
}




