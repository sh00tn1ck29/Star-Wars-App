import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { CharacterGraphNode } from '../../types/graph';
import './CharacterNode.scss';


export function CharacterNode({ data }: NodeProps<CharacterGraphNode>) {
  const { character } = data;

  return (
    <article className="character-node">
      <Handle type="source" position={Position.Right} />
      <div className="character-node__portrait">
        <img className="character-node__image" src="/favicon.svg" alt="" draggable={false} />
        <span className="character-node__placeholder">PHOTO COMING SOON</span>
      </div>
      <div className="character-node__content">
        <p className="character-node__category">CHARACTER</p>
        <h3 className="character-node__name">{character.name}</h3>
        <dl className="character-node__details">
          <dt className="character-node__label">Birth year</dt>
          <dd className="character-node__value">{character.birth_year}</dd>
          <dt className="character-node__label">Gender</dt>
          <dd className="character-node__value">{character.gender}</dd>
          <dt className="character-node__label">Height</dt>
          <dd className="character-node__value">{character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}</dd>
        </dl>
      </div>
    </article>
  );
}



