import "./App.css";
import { useState } from "react";
import { NodeType, Algorithm, Tool, Speed } from "./types";
import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";
import { getGridSize } from "./utils/gridSize";
import { createGrid } from "./utils/createGrid";
import { bfs } from "./utils/bfs";
import { dfs } from "./utils/dfs";
import { dijkstra } from "./utils/dijkstra";
import { aStar } from "./utils/aStar";

const ANIMATION_SPEEDS = {
  slow: 100,
  normal: 50,
  fast: 10,
} as const;

function App() {
  const { rows, cols } = getGridSize();
  const [grid, setGrid] = useState<NodeType[][]>(() => createGrid(rows, cols));
  const [selectedTool, setSelectedTool] = useState<Tool>("wall");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<Speed>("normal");

  const algorithms = {
    bfs,
    dfs,
    dijkstra,
    aStar,
  };

  const runAlgorithm = async (algorithmName: Algorithm) => {
    /* find start and end nodes already set in createGrid 
    pass grid from state and nodes to the algorithm
    get visited nodes and shortest path from the algorithm
    for each visited node update the node state
    for each node in the shortest path update the node state
    */
    clearPaths();
    const algorithm = algorithms[algorithmName];
    if (!algorithm) throw new Error(`Algorithm ${algorithmName} not found`);

    setIsRunning(true);
    const startNode = grid.flat().find((node) => node.isStart) as NodeType;
    const endNode = grid.flat().find((node) => node.isEnd) as NodeType;

    const { visitedNodes, shortestPath } = algorithm(grid, startNode, endNode);

    const ANIMATION_SPEED = ANIMATION_SPEEDS[speed];
    const BATCH_SIZE = 4;

    for (let i = 0; i < visitedNodes.length; i += BATCH_SIZE) {
      const batch = visitedNodes.slice(i, i + BATCH_SIZE);
      // update the grid state for the batch
      setGrid((prev) => {
        const newGrid = [...prev];
        batch.forEach((node) => {
          updateNodeState(newGrid, node.row, node.col, {
            isVisited: true,
          });
        });
        return newGrid;
      });
      // wait for the batch to be animated
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED));
    }

    // wait for the shortest path to be animated
    await new Promise((resolve) => setTimeout(resolve, 100));

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

  const clearPaths = () => {
    setGrid((grid) =>
      grid.map((row) =>
        row.map((node) => ({
          ...node,
          isVisited: false,
          isPath: false,
        }))
      )
    );
  };
  const clearGrid = () => {
    setGrid(createGrid(rows, cols));
  };

  const updateNodeState = (
    prevGrid: NodeType[][],
    row: number,
    col: number,
    objProps: object
  ) => {
    /* 
    take the grid from the previous state and make a copy
    update only the node at a given row and column, 
    take the node object and only overwrite the prop: value
    */
    const newGrid = [...prevGrid];
    newGrid[row][col] = { ...newGrid[row][col], ...objProps };
    return newGrid;
  };

  const handleNodeClick = (row: number, col: number) => {
    if (isRunning) return;
    if (
      selectedTool === "wall" &&
      !grid[row][col].isStart &&
      !grid[row][col].isEnd
    ) {
      setGrid((prevGrid) =>
        updateNodeState(prevGrid, row, col, { isWall: true, weight: Infinity })
      );
    } else if (selectedTool === "forest") {
      setGrid((prevGrid) =>
        updateNodeState(prevGrid, row, col, {
          isWall: false,
          weight: 5,
          isVisited: false,
          isPath: false,
        })
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

  const generateRandomMaze = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          if (node.isStart || node.isEnd) return node;

          const isWall = Math.random() < 0.3;

          return {
            ...node,
            isWall,
            weight: isWall ? Infinity : 1,
            isVisited: false,
            isPath: false,
          };
        })
      )
    );
  };

  return (
    <div className="bg-flexoki-light-bg-2 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Pathfinding Visualizer
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Visualize pathfinding algorithms through an interactive grid
          </p>
        </header>

        <Controls
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          runAlgorithm={runAlgorithm}
          clearGrid={clearGrid}
          generateRandomMaze={generateRandomMaze}
          isRunning={isRunning}
          speed={speed}
          setSpeed={setSpeed}
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
