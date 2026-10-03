import { Background, Controls, ReactFlow } from '@xyflow/react';
import type { Character } from '../../types/character';
import { CharacterNode } from './CharacterNode';
import type { CharacterGraphNode } from './CharacterNode';
import '@xyflow/react/dist/style.css';
import './CharacterGraph.scss';

interface CharacterGraphProps {
  character: Character | null;
}

const nodeTypes = { character: CharacterNode };

export function CharacterGraph({ character }: CharacterGraphProps) {
  const nodes: CharacterGraphNode[] = character ? [{
    id: character.url,
    type: 'character',
    position: { x: 0, y: 0 },
    data: { character },
  }] : [];

  return (
    <section className="character-graph" aria-labelledby="graph-heading">
      <h2 id="graph-heading" className="character-graph__title">Character graph</h2>
      <div className="character-graph__canvas">
        {character ? (
          <ReactFlow<CharacterGraphNode>
            key={character.url}
            defaultNodes={nodes}
            nodeTypes={nodeTypes}
            colorMode="dark"
            fitView
            fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
            minZoom={0.3}
            maxZoom={1.5}
            nodesConnectable={false}
            deleteKeyCode={null}
          >
            <Background gap={24} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
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
