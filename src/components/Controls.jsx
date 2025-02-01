import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const Controls = ({
  selectedTool,
  setSelectedTool,
  runAlgorithm,
  clearGrid,
  generateRandomMaze,
  isRunning,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-4">
      <div className="flex gap-2 items-center">
        <Button
          className={`px-4 py-2 text-sm font-medium transition-all
            ${
              selectedTool === "start"
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            }
            ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setSelectedTool("start")}
          disabled={isRunning}
        >
          Start Node
        </Button>
        <span className="text-gray-400">→</span>
        <Button
          className={`px-4 py-2 text-sm font-medium transition-all 
            ${
              selectedTool === "end"
                ? "bg-flexoki-red-400 text-white hover:bg-flexoki-red-500"
                : "bg-flexoki-red-50 text-rose-800 hover:bg-flexoki-red-100"
            }
            ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setSelectedTool("end")}
          disabled={isRunning}
        >
          End Node
        </Button>
        <span className="text-gray-400">→</span>
        <Button
          className={`px-4 py-2 text-sm font-medium transition-all
            ${
              selectedTool === "wall"
                ? "bg-flexoki-base-800 text-white hover:bg-flexoki-base-900"
                : "bg-flexoki-base-50 text-flexoki-dark-tx-3 hover:bg-gray-200"
            }
            ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setSelectedTool("wall")}
          disabled={isRunning}
        >
          Walls
        </Button>
        <span className="text-gray-400">→</span>
        <Button
          className={`px-4 py-2 text-sm font-medium transition-all
      ${
        selectedTool === "forest"
          ? "bg-flexoki-green-800 text-white hover:bg-flexoki-green-900"
          : "bg-flexoki-green-100 text-flexoki-green-800 hover:bg-flexoki-green-200"
      }
      ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setSelectedTool("forest")}
          disabled={isRunning}
        >
          Forest
        </Button>
      </div>
      <span className="text-gray-400">|</span>
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium
                hover:bg-emerald-700 active:bg-emerald-800 transition-all
                shadow-md hover:shadow-sm"
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Run Algorithm"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => runAlgorithm("bfs")}
              disabled={isRunning}
            >
              BFS (Breadth First Search)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => runAlgorithm("dfs")}>
              DFS (Depth First Search)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => runAlgorithm("dijkstra")}>
              Dijkstra's
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="px-4 py-2 bg-gray-100 text-flexoki-light-tx text-sm font-medium
            hover:bg-gray-200 active:bg-gray-300 transition-all"
          onClick={clearGrid}
          disabled={isRunning}
        >
          Clear
        </Button>
        <Button
          className={`px-4 py-2 text-sm font-medium transition-all
            ${
              selectedTool === "maze"
                ? "bg-flexoki-base-800 text-white hover:bg-flexoki-base-900"
                : "bg-flexoki-base-50 text-flexoki-dark-tx-3 hover:bg-gray-200"
            }
            ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            setSelectedTool("maze");
            generateRandomMaze();
          }}
          disabled={isRunning}
        >
          Random Maze
        </Button>
      </div>
    </div>
  );
};
