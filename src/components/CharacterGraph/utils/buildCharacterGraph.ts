import type { Edge } from '@xyflow/react';
import type { Character } from '../../../types/character';
import type { Film } from '../../../types/film';
import type { CharacterGraphNode } from '../nodes/CharacterNode/CharacterNode';
import type { FilmGraphNode } from '../nodes/FilmNode/FilmNode';

export type GraphNode = CharacterGraphNode | FilmGraphNode;

export function buildCharacterGraph(character: Character, films: Film[]): { nodes: GraphNode[]; edges: Edge[] } {
  const filmSpacing = 280;
  const nodes: GraphNode[] = [{
    id: character.url,
    type: 'character',
    position: { x: 0, y: Math.max(0, (films.length - 1) * filmSpacing / 2 - 40) },
    data: { character },
  }];

  films.forEach((film, index) => {
    nodes.push({
      id: film.url,
      type: 'film',
      position: { x: 360, y: index * filmSpacing },
      data: { film },
    });
  });

  const edges: Edge[] = films.map((film) => ({
    id: `${character.url}-to-${film.url}`,
    source: character.url,
    target: film.url,
    type: 'smoothstep',
  }));

  return { nodes, edges };
}

