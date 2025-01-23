import { Button } from "@/components/ui/button";

export const Controls = ({
  selectedTool,
  setSelectedTool,
  runAlgorithm,
  clearGrid,
  isRunning,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 ${
          selectedTool === "start" && "bg-blue-600"
        }`}
        onClick={() => setSelectedTool("start")}
        disabled={isRunning}
      >
        Set Start
      </Button>
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 ${
          selectedTool === "end" && "bg-blue-600"
        }`}
        onClick={() => setSelectedTool("end")}
        disabled={isRunning}
      >
        Set End
      </Button>
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 ${
          selectedTool === "wall" && "bg-blue-600"
        }`}
        onClick={() => setSelectedTool("wall")}
        disabled={isRunning}
      >
        Set Wall
      </Button>
      <Button
        className="px-4 py-2 bg-green-500 hover:bg-green-600"
        onClick={runAlgorithm}
        disabled={isRunning}
      >
        {isRunning ? "Running" : "Run BFS"}
      </Button>
      <Button
        className="px-4 py-2 bg-gray-500 hover:bg-gray-600"
        onClick={clearGrid}
        disabled={isRunning}
      >
        Clear
      </Button>
    </div>
  );
};
