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
