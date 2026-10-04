import type { Starship } from '../../../types/starship';
import type { Edge, Node } from '@xyflow/react';
import type { Character } from '../../../types/character';
import type { Film } from '../../../types/film';

export type CharacterGraphNode = Node<{ character: Character }, 'character'>;
export type FilmGraphNode = Node<{ film: Film }, 'film'>;
export type StarshipGraphNode = Node<{ starship: Starship }, 'starship'>;
export type GraphNode = CharacterGraphNode | FilmGraphNode | StarshipGraphNode;

export interface CharacterGraphData {
  nodes: GraphNode[];
  edges: Edge[];
}


export type GraphResourcesState =
  | { status: 'loading' }
  | { status: 'success'; films: Film[]; starships: Starship[] }
  | { status: 'error' };
