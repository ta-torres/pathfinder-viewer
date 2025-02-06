import { NodeType } from "../types";

export const bfs = (
  grid: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
) => {
  const visitedNodes = [];
  const queue = [];
  const prevNodes = new Map();

  queue.push(startNode);
  prevNodes.set(`${startNode.row}-${startNode.col}`, null);

  while (queue.length > 0) {
    const currentNode = queue.shift()!; // non-null assertion, queue is never empty

    if (currentNode === endNode) break;

    visitedNodes.push(currentNode);

    const neighbors = getNeighbors(grid, currentNode);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!prevNodes.has(key)) {
        prevNodes.set(key, currentNode);
        queue.push(neighbor);
      }
    }
  }

  const shortestPath = reconstructPath(prevNodes, endNode);
  return { visitedNodes, shortestPath };
};

const getNeighbors = (grid: NodeType[][], node: NodeType) => {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      !grid[newRow][newCol].isWall
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }
  return neighbors;
};

const reconstructPath = (
  prevNodes: Map<string, NodeType>,
  endNode: NodeType
) => {
  const path = [];
  let currentNode = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = prevNodes.get(
      `${currentNode.row}-${currentNode.col}`
    ) as NodeType;
  }

  return path.length > 1 ? path : [];
};
