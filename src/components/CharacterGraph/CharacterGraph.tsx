import type { Character } from '../../types/character';
import { SelectedCharacterGraph } from './SelectedCharacterGraph';
import './CharacterGraph.scss';

interface CharacterGraphProps {
  character: Character | null;
}

export function CharacterGraph({ character }: CharacterGraphProps) {
  return (
    <section className="character-graph" aria-labelledby="graph-heading">
      <h2 id="graph-heading" className="character-graph__title">Character graph</h2>
      <div className="character-graph__canvas">
        {character ? (
          <SelectedCharacterGraph key={character.url} character={character} />
        ) : (
          <div className="character-graph__empty" role="status">
            <img className="character-graph__placeholder" src="/favicon.svg" alt="" />
            <p className="character-graph__message">Select a character to explore their graph.</p>
          </div>
        )}
      </div>
    </section>
  );
}
