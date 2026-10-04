import { useEffect, useState } from 'react';
import { Background, Controls, Panel, ReactFlow } from '@xyflow/react';
import { fetchFilms } from '../../api/films';
import type { Character } from '../../types/character';
import type { Film } from '../../types/film';
import { CharacterNode } from './nodes/CharacterNode/CharacterNode';
import { FilmNode } from './nodes/FilmNode/FilmNode';
import { buildCharacterGraph } from './utils/buildCharacterGraph';
import type { GraphNode } from './types/graph';
import '@xyflow/react/dist/style.css';
import './CharacterGraph.scss';

type FilmsState =
  | { status: 'loading' }
  | { status: 'success'; films: Film[] }
  | { status: 'error' };

const nodeTypes = { character: CharacterNode, film: FilmNode };

export function SelectedCharacterGraph({ character }: { character: Character }) {
  const [filmsState, setFilmsState] = useState<FilmsState>({ status: 'loading' });
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFilms(): Promise<void> {
      try {
        const films = await fetchFilms(character.films, { signal: controller.signal });
        if (!controller.signal.aborted) setFilmsState({ status: 'success', films });
      } catch {
        if (!controller.signal.aborted) setFilmsState({ status: 'error' });
      }
    }

    void loadFilms();
    return () => controller.abort();
  }, [character, requestVersion]);

  function retryRequest(): void {
    setFilmsState({ status: 'loading' });
    setRequestVersion((version) => version + 1);
  }

  const films = filmsState.status === 'success' ? filmsState.films : [];
  const { nodes, edges } = buildCharacterGraph(character, films);

  return (
    <ReactFlow<GraphNode>
      key={filmsState.status}
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      colorMode="dark"
      fitView
      fitViewOptions={{ maxZoom: 1, padding: 0.15 }}
      minZoom={0.15}
      maxZoom={1.5}
      nodesConnectable={false}
      deleteKeyCode={null}
    >
      <Background gap={24} size={1} />
      <Controls showInteractive={false} />
      {filmsState.status === 'loading' && (
        <Panel position="top-center"><p className="character-graph__notice" role="status">Loading films…</p></Panel>
      )}
      {filmsState.status === 'error' && (
        <Panel position="top-center">
          <div className="character-graph__notice" role="alert">
            <p>Unable to load films.</p>
            <button className="character-graph__retry" type="button" onClick={retryRequest}>Try again</button>
          </div>
        </Panel>
      )}
      {filmsState.status === 'success' && films.length === 0 && (
        <Panel position="top-center"><p className="character-graph__notice" role="status">No films found for this character.</p></Panel>
      )}
    </ReactFlow>
  );
}
