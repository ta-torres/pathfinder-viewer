export interface GridDimensions {
  rows: number;
  cols: number;
}

export const getGridSize = (): GridDimensions => {
  const width = window.innerWidth;
  if (width < 640) return { rows: 25, cols: 20 };
  else if (width < 768) return { rows: 25, cols: 25 };
  else if (width < 1024) return { rows: 25, cols: 30 };
  else return { rows: 20, cols: 40 };
};

export const getCellSize = () => {
  const width = window.innerWidth;
  if (width < 1024) return { width: 20, height: 20 };
  else return { width: 25, height: 25 };
};
