import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { FilmGraphNode } from '../../types/graph';
import './FilmNode.scss';


export function FilmNode({ data }: NodeProps<FilmGraphNode>) {
  const { film } = data;

  return (
    <article className="film-node">
      <Handle type="target" position={Position.Left} />
      <div className="film-node__portrait">
        <img className="film-node__image" src="/favicon.svg" alt="" draggable={false} />
        <span className="film-node__placeholder">POSTER COMING SOON</span>
      </div>
      <div className="film-node__content">
        <p className="film-node__category">FILM · EPISODE {film.episode_id}</p>
        <h3 className="film-node__name">{film.title}</h3>
        <dl className="film-node__details">
          <dt className="film-node__label">Release date</dt>
          <dd className="film-node__value">{film.release_date}</dd>
          <dt className="film-node__label">Director</dt>
          <dd className="film-node__value">{film.director}</dd>
        </dl>
      </div>
    </article>
  );
}


