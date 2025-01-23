import { Button } from "@/components/ui/button";

export const Controls = ({ setSelectedTool, runAlgorithm, clearGrid }) => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600`}
        onClick={() => setSelectedTool("start")}
      >
        Set Start
      </Button>
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600`}
        onClick={() => setSelectedTool("end")}
      >
        Set End
      </Button>
      <Button
        className={`px-4 py-2 bg-blue-500 hover:bg-blue-600`}
        onClick={() => setSelectedTool("wall")}
      >
        Set Wall
      </Button>
      <Button
        className="px-4 py-2 bg-green-500 hover:bg-green-600"
        onClick={runAlgorithm}
      >
        Run BFS
      </Button>
      <Button
        className="px-4 py-2 bg-gray-500 hover:bg-gray-600"
        onClick={clearGrid}
      >
        Clear
      </Button>
    </div>
  );
};
