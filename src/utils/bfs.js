export const bfs = (grid, startNode, endNode) => {
  const visitedNodes = [];
  const queue = [];
  const prevNodes = new Map();

  queue.push(startNode);
  prevNodes.set(`${startNode.row}-${startNode.col}`, null);

  while (queue.length > 0) {
    const currentNode = queue.shift();

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

const getNeighbors = (grid, node) => {
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

const reconstructPath = (prevNodes, endNode) => {
  const path = [];
  let currentNode = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = prevNodes.get(`${currentNode.row}-${currentNode.col}`);
  }

  return path.length > 1 ? path : [];
};
