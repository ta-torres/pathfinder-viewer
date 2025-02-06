import { NodeType } from "../types";

export const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  endNode: NodeType
) => {
  const visitedNodes = [];
  const priorityQueue = [];
  const prevNodes = new Map();
  const distances = new Map();

  // every node except the start node has an infinite distance because it hasn't been calculated yet
  grid.forEach((row) =>
    row.forEach((node) => {
      const key = `${node.row}-${node.col}`;
      distances.set(key, node === startNode ? 0 : Infinity);
    })
  );

  priorityQueue.push(startNode);

  while (priorityQueue.length > 0) {
    // unlike a queue in BFS, priority queues have to be sorted to find the shortest distance. I could also use a min heap
    priorityQueue.sort(
      (a, b) =>
        distances.get(`${a.row}-${a.col}`) - distances.get(`${b.row}-${b.col}`)
    );
    const currentNode = priorityQueue.shift()!; // non-null assertion, queue is never empty

    if (currentNode.isWall) continue; // skips calculating distance
    // this isn't necessary?
    // if (distances[`${currentNode.row}-${currentNode.col}`] === Infinity) break;
    if (currentNode === endNode) break;

    visitedNodes.push(currentNode);

    const neighbors = getNeighbors(grid, currentNode);
    for (const neighbor of neighbors) {
      const currentDistance = distances.get(
        `${currentNode.row}-${currentNode.col}`
      );
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      const newDistance = currentDistance + neighbor.weight; // distance from start node to neighbor

      // edge relaxation: check if path through current node to the neighbor is shorter
      if (newDistance < distances.get(neighborKey)) {
        distances.set(neighborKey, newDistance); // set a new best path
        prevNodes.set(neighborKey, currentNode);
        priorityQueue.push(neighbor); // add shortest neighbor to queue
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
