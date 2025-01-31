//@ts-nocheck
import "./App.css";
import { useState } from "react";
import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";
import { createGrid } from "./utils/createGrid";
import { bfs } from "./utils/bfs";
import { dfs } from "./utils/dfs";

const GRID_ROWS = 20;
const GRID_COLS = 40;

function App() {
  const [grid, setGrid] = useState(() => createGrid(GRID_ROWS, GRID_COLS));
  const [selectedTool, setSelectedTool] = useState("wall");
  const [isRunning, setIsRunning] = useState(false);

  const algorithms = {
    bfs,
    dfs,
  };

  const runAlgorithm = async (algorithmName) => {
    /* find start and end nodes already set in createGrid 
    pass grid from state and nodes to the algorithm
    get visited nodes and shortest path from the algorithm
    for each visited node update the node state
    for each node in the shortest path update the node state
    */
    const algorithm = algorithms[algorithmName];
    if (!algorithm) throw new Error(`Algorithm ${algorithmName} not found`);

    setIsRunning(true);
    const startNode = grid.flat().find((node) => node.isStart);
    const endNode = grid.flat().find((node) => node.isEnd);

    const { visitedNodes, shortestPath } = algorithm(grid, startNode, endNode);

    for (const node of visitedNodes) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setGrid((prev) =>
        updateNodeState(prev, node.row, node.col, {
          isVisited: true,
        })
      );
    }

    for (const node of shortestPath) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setGrid((prev) =>
        updateNodeState(prev, node.row, node.col, {
          isPath: true,
        })
      );
    }
    setIsRunning(false);
  };

  const clearGrid = () => {
    setGrid(createGrid(GRID_ROWS, GRID_COLS));
  };

  const updateNodeState = (prevGrid, row, col, objProps) => {
    /* 
    take the grid from the previous state and make a copy
    update only the node at a given row and column, 
    take the node object and only overwrite the prop: value
    */
    const newGrid = [...prevGrid];
    newGrid[row][col] = { ...newGrid[row][col], ...objProps };
    return newGrid;
  };

  const handleNodeClick = (row, col) => {
    if (
      selectedTool === "wall" &&
      !grid[row][col].isStart &&
      !grid[row][col].isEnd
    ) {
      setGrid((prevGrid) =>
        updateNodeState(prevGrid, row, col, { isWall: true, weight: Infinity })
      );
    }

    if (selectedTool === "start") {
      const startNode = grid.flat().find((node) => node.isStart);
      if (startNode) {
        setGrid((prevGrid) =>
          updateNodeState(prevGrid, startNode.row, startNode.col, {
            isStart: false,
          })
        );
      }
      setGrid((prevGrid) =>
        updateNodeState(prevGrid, row, col, { isStart: true })
      );
    }

    if (selectedTool === "end") {
      const endNode = grid.flat().find((node) => node.isEnd);
      if (endNode) {
        setGrid((prevGrid) =>
          updateNodeState(prevGrid, endNode.row, endNode.col, {
            isEnd: false,
          })
        );
      }
      setGrid((prevGrid) =>
        updateNodeState(prevGrid, row, col, { isEnd: true })
      );
    }
  };

  return (
    <div className="bg-flexoki-light-bg-2 py-8 px-4">
      <div className="max-w-6xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Pathfinding Visualizer
          </h1>
          <p className="text-gray-600">
            Visualize pathfinding algorithms through an interactive grid
          </p>
        </header>

        <Controls
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          runAlgorithm={runAlgorithm}
          clearGrid={clearGrid}
          isRunning={isRunning}
        />

        <Grid
          grid={grid}
          onClick={handleNodeClick}
          selectedTool={selectedTool}
        />
      </div>
    </div>
  );
}

export default App;
