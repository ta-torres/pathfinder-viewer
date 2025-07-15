import { NodeType } from "../types";

export const createGrid = (rows: number, cols: number) => {
  const grid: NodeType[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        isPath: false,
        weight: 1,
      });
    }
    grid.push(currentRow);
  }
  grid[5][5].isStart = true;
  grid[11][11].isEnd = true;

  return grid;
};
