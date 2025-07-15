import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Algorithm, Tool, Speed } from "@/types";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";

interface ControlsProps {
  selectedTool: string;
  setSelectedTool: (tool: Tool) => void;
  runAlgorithm: (algorithmName: Algorithm) => void;
  clearGrid: () => void;
  generateRandomMaze: () => void;
  isRunning: boolean;
  speed: Speed;
  setSpeed: (speed: Speed) => void;
}

export const Controls = ({
  selectedTool,
  setSelectedTool,
  runAlgorithm,
  clearGrid,
  generateRandomMaze,
  isRunning,
  speed,
  setSpeed,
}: ControlsProps) => {
  return (
    <div className="space-y-3 px-2 sm:space-y-0 sm:px-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        {/* tools */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <div>
            <div className="mb-1 text-xs font-medium text-gray-600">
              {/*sm:hidden*/}
              Node Tools
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Button
                className={`px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                  selectedTool === "start"
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-green-50 text-green-800 hover:bg-green-100"
                } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => setSelectedTool("start")}
                disabled={isRunning}
              >
                Start
              </Button>
              <span className="self-center text-gray-400 max-sm:hidden">→</span>
              <Button
                className={`px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                  selectedTool === "end"
                    ? "bg-flexoki-red-400 hover:bg-flexoki-red-500 text-white"
                    : "bg-flexoki-red-50 hover:bg-flexoki-red-100 text-rose-800"
                } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => setSelectedTool("end")}
                disabled={isRunning}
              >
                End
              </Button>
              <span className="self-center text-gray-400 max-sm:hidden">→</span>
              <Button
                className={`px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                  selectedTool === "wall"
                    ? "bg-flexoki-base-800 hover:bg-flexoki-base-900 text-white"
                    : "bg-flexoki-base-50 text-flexoki-dark-tx-3 hover:bg-gray-200"
                } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => setSelectedTool("wall")}
                disabled={isRunning}
              >
                Walls
              </Button>
              <span className="self-center text-gray-400 max-sm:hidden">→</span>
              <Button
                className={`px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                  selectedTool === "forest"
                    ? "bg-flexoki-green-800 hover:bg-flexoki-green-900 text-white"
                    : "bg-flexoki-green-100 text-flexoki-green-800 hover:bg-flexoki-green-200"
                } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => setSelectedTool("forest")}
                disabled={isRunning}
              >
                Forest
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden h-6 w-px bg-gray-300 sm:block"></div>

        {/* algorithm controls */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="">
            <div className="mb-1 text-xs font-medium text-gray-600">
              Algorithm & Grid
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="min-w-0 flex-1 bg-emerald-600 px-3 py-2 text-xs font-medium text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-xs active:bg-emerald-800 sm:flex-none sm:px-4 sm:text-sm"
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "Run Algorithm"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold">
                      Weighted Algorithms
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => runAlgorithm("dijkstra")}>
                    Dijkstra's
                  </DropdownMenuItem>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold">
                      Unweighted Algorithms
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => runAlgorithm("bfs")}
                    disabled={isRunning}
                  >
                    BFS (Breadth First Search)
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => runAlgorithm("dfs")}>
                    DFS (Depth First Search)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                className="text-flexoki-light-tx bg-gray-100 px-3 py-2 text-xs font-medium transition-all hover:bg-gray-200 active:bg-gray-300 sm:px-4 sm:text-sm"
                onClick={clearGrid}
                disabled={isRunning}
              >
                Clear
              </Button>

              <Button
                className={`px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                  selectedTool === "maze"
                    ? "bg-flexoki-base-800 hover:bg-flexoki-base-900 text-white"
                    : "bg-flexoki-base-50 text-flexoki-dark-tx-3 hover:bg-gray-200"
                } ${isRunning ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => {
                  setSelectedTool("maze");
                  generateRandomMaze();
                }}
                disabled={isRunning}
              >
                Maze
              </Button>
            </div>
          </div>
        </div>

        {/* additional controls */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div>
            <div className="mb-1 text-xs font-medium text-gray-600">
              Additional Controls
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-full bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-blue-700 active:bg-blue-800 sm:w-auto sm:px-4 sm:text-sm"
                  disabled={isRunning}
                >
                  <span className="sm:hidden">Speed: </span>
                  <span className="hidden sm:inline">Speed: </span>
                  {speed.charAt(0).toUpperCase() + speed.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSpeed("slow")}>
                  Slow
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSpeed("normal")}>
                  Normal
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSpeed("fast")}>
                  Fast
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
