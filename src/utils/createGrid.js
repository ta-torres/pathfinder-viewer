export const createGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        isPath: false,
      });
    }
    grid.push(currentRow);
    console.log({ currentRow });
  }
  grid[5][5].isStart = true;
  grid[5][27].isEnd = true;

  return grid;
};
