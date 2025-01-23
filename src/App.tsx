//@ts-nocheck
import "./App.css";
import { useState } from "react";
import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";
import { createGrid } from "./utils/createGrid";

const GRID_ROWS = 20;
const GRID_COLS = 40;

function App() {
  const [grid, setGrid] = useState(() => createGrid(GRID_ROWS, GRID_COLS));
  const [selectedTool, setSelectedTool] = useState("wall");

  const clearGrid = () => {
    setGrid(createGrid(GRID_ROWS, GRID_COLS));
  };

  return (
    <div className="grid place-items-center p-8 gap-4">
      <Controls
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        clearGrid={clearGrid}
      />
      <Grid grid={grid} />
    </div>
  );
}

export default App;
