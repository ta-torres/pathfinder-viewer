import { NodeType } from "../types";

export const aStar = (
  grid: NodeType[][],
  startNode: NodeType,
  endNode: NodeType,
) => {
  const visitedNodes = [];
  const priorityQueue = [];
  const prevNodes = new Map();
  const gScores = new Map(); // g(n) shortest distance from start to current node
  const fScores = new Map(); // f(n) = g(n) + heuristic(n)

  // set every node except start to infinity because it hasn't been calculated yet
  // g(start) = 0, g(other nodes) = infinity
  // f(start) = h(start), f(other nodes) = infinity
  grid.forEach((row) =>
    row.forEach((node) => {
      const key = `${node.row}-${node.col}`;

      gScores.set(key, node === startNode ? 0 : Infinity);

      // calculate the heuristic from the start node to the end node
      fScores.set(
        key,
        node === startNode ? heuristic(node, endNode) : Infinity,
      );
    }),
  );

  priorityQueue.push(startNode);

  while (priorityQueue.length > 0) {
    // select the node with the lowest f score
    priorityQueue.sort(
      (a, b) =>
        fScores.get(`${a.row}-${a.col}`) - fScores.get(`${b.row}-${b.col}`),
    );
    const currentNode = priorityQueue.shift()!;

    if (currentNode.isWall) continue;
    if (currentNode === endNode) break;

    visitedNodes.push(currentNode);

    const neighbors = getNeighbors(grid, currentNode);
    for (const neighbor of neighbors) {
      const currentKey = `${currentNode.row}-${currentNode.col}`;
      const neighborKey = `${neighbor.row}-${neighbor.col}`;

      const tentativeGScore = gScores.get(currentKey) + neighbor.weight;

      // only update the neighbor if the new g score is lower
      if (tentativeGScore < gScores.get(neighborKey)) {
        prevNodes.set(neighborKey, currentNode);
        gScores.set(neighborKey, tentativeGScore);
        // f(n) = g(n) + h(n)
        fScores.set(
          neighborKey,
          tentativeGScore + heuristic(neighbor, endNode),
        );

        if (!priorityQueue.includes(neighbor)) {
          priorityQueue.push(neighbor);
        }
      }
    }
  }

  const shortestPath = reconstructPath(prevNodes, endNode);
  return { visitedNodes, shortestPath };
};

// Manhattan distance calcula la suma de las diferencias absolutas entre las coordenadas en 2 dimensiones
// h(n) = |x1 - x2| + |y1 - y2|
const heuristic = (node: NodeType, endNode: NodeType) => {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

const getNeighbors = (grid: NodeType[][], node: NodeType) => {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
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
  endNode: NodeType,
) => {
  const path = [];
  let currentNode = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = prevNodes.get(
      `${currentNode.row}-${currentNode.col}`,
    ) as NodeType;
  }

  return path.length > 1 ? path : [];
};
