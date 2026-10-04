import { fetchStarships } from '../../api/starships';
import { StarshipNode } from './nodes/StarshipNode/StarshipNode';
import { useEffect, useState } from 'react';
import { Background, Controls, Panel, ReactFlow } from '@xyflow/react';
import { fetchFilms } from '../../api/films';
import type { Character } from '../../types/character';
import { CharacterNode } from './nodes/CharacterNode/CharacterNode';
import { FilmNode } from './nodes/FilmNode/FilmNode';
import { buildCharacterGraph } from './utils/buildCharacterGraph';
import type { GraphNode, GraphResourcesState } from './types/graph';
import '@xyflow/react/dist/style.css';
import './CharacterGraph.scss';


const nodeTypes = { character: CharacterNode, film: FilmNode, starship: StarshipNode };

export function SelectedCharacterGraph({ character }: { character: Character }) {
  const [resourcesState, setResourcesState] = useState<GraphResourcesState>({ status: 'loading' });
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGraphResources(): Promise<void> {
      try {
        const [films, starships] = await Promise.all([
          fetchFilms(character.films, { signal: controller.signal }),
          fetchStarships(character.starships, { signal: controller.signal }),
        ]);
        if (!controller.signal.aborted) setResourcesState({ status: 'success', films, starships });
      } catch {
        if (!controller.signal.aborted) setResourcesState({ status: 'error' });
      }
    }

    void loadGraphResources();
    return () => controller.abort();
  }, [character, requestVersion]);

  function retryRequest(): void {
    setResourcesState({ status: 'loading' });
    setRequestVersion((version) => version + 1);
  }

  const films = resourcesState.status === 'success' ? resourcesState.films : [];
  const starships = resourcesState.status === 'success' ? resourcesState.starships : [];
  const { nodes, edges } = buildCharacterGraph(character, films, starships);

  return (
    <ReactFlow<GraphNode>
      key={resourcesState.status}
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
      {resourcesState.status === 'loading' && (
        <Panel position="top-center"><p className="character-graph__notice" role="status">Loading films and starships…</p></Panel>
      )}
      {resourcesState.status === 'error' && (
        <Panel position="top-center">
          <div className="character-graph__notice" role="alert">
            <p>Unable to load films and starships.</p>
            <button className="character-graph__retry" type="button" onClick={retryRequest}>Try again</button>
          </div>
        </Panel>
      )}
      {resourcesState.status === 'success' && (films.length === 0 || starships.length === 0) && (
        <Panel position="top-center"><p className="character-graph__notice" role="status">{films.length === 0 ? 'No films found for this character.' : 'No starships found for this character.'}</p></Panel>
      )}
    </ReactFlow>
  );
}

