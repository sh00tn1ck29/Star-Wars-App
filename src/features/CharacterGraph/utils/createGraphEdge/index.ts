import type { Edge } from '@xyflow/react';

export function createGraphEdge(source: string, target: string): Edge {
  return {
    id: `${source}-to-${target}`,
    source,
    target,
    type: 'smoothstep',
  };
}
