import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { StarshipGraphNode } from '../../types/graph/index';
import './index.scss';

export function StarshipNode({ data }: NodeProps<StarshipGraphNode>) {
  const { starship } = data;

  return (
    <article className="starship-node">
      <Handle type="target" position={Position.Left} />
      <div className="starship-node__portrait">
        <img className="starship-node__image" src="/favicon.svg" alt="" draggable={false} />
        <span className="starship-node__placeholder">PHOTO COMING SOON</span>
      </div>
      <div className="starship-node__content">
        <p className="starship-node__category">STARSHIP</p>
        <h3 className="starship-node__name">{starship.name}</h3>
        <dl className="starship-node__details">
          <dt className="starship-node__label">Model</dt>
          <dd className="starship-node__value">{starship.model}</dd>
          <dt className="starship-node__label">Class</dt>
          <dd className="starship-node__value">{starship.starship_class}</dd>
          <dt className="starship-node__label">Crew</dt>
          <dd className="starship-node__value">{starship.crew}</dd>
        </dl>
      </div>
    </article>
  );
}
