import type { CharacterGraphData, GraphNode } from '../../types/graph/index';
import { createGraphEdge } from '../createGraphEdge/index';
import type { Character } from '../../../../entities/character/types/index';
import type { Film } from '../../../../entities/film/types/index';
import type { Starship } from '../../../../entities/starship/types/index';

export function buildCharacterGraph(character: Character, films: Film[], starships: Starship[]): CharacterGraphData {
  const filmSpacing = 280;
  const starshipSpacing = 360;
  const characterStarships = starships.filter((starship) => character.starships.includes(starship.url));
  const graphHeight = Math.max(films.length * filmSpacing, characterStarships.length * starshipSpacing, 340);
  const nodes: GraphNode[] = [{
    id: character.url,
    type: 'character',
    position: { x: 0, y: (graphHeight - 340) / 2 },
    data: { character },
  }];

  films.forEach((film, index) => {
    nodes.push({
      id: film.url,
      type: 'film',
      position: { x: 360, y: (graphHeight - films.length * filmSpacing) / 2 + index * filmSpacing },
      data: { film },
    });
  });

  characterStarships.forEach((starship, index) => {
    nodes.push({
      id: starship.url,
      type: 'starship',
      position: { x: 720, y: (graphHeight - characterStarships.length * starshipSpacing) / 2 + index * starshipSpacing },
      data: { starship },
    });
  });

  const edges = films.map((film) => createGraphEdge(character.url, film.url));

  films.forEach((film) => {
    characterStarships.forEach((starship) => {
      if (film.starships.includes(starship.url)) {
        edges.push(createGraphEdge(film.url, starship.url));
      }
    });
  });

  return { nodes, edges };
}
