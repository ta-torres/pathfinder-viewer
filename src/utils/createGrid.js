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
        weight: 1,
      });
    }
    grid.push(currentRow);
    console.log({ currentRow });
  }
  grid[5][5].isStart = true;
  grid[5][27].isEnd = true;

  for (let i = 0; i < 7; i++) {
    grid[4][i].isWall = true;
    grid[4 + i][7].isWall = true;
  }
  for (let i = 0; i < 15; i++) {
    grid[i][25].isWall = true;
  }

  return grid;
};
