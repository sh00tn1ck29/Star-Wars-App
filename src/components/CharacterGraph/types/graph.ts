import type { Edge, Node } from '@xyflow/react';
import type { Character } from '../../../types/character';
import type { Film } from '../../../types/film';

export type CharacterGraphNode = Node<{ character: Character }, 'character'>;
export type FilmGraphNode = Node<{ film: Film }, 'film'>;
export type GraphNode = CharacterGraphNode | FilmGraphNode;

export interface CharacterGraphData {
  nodes: GraphNode[];
  edges: Edge[];
}
