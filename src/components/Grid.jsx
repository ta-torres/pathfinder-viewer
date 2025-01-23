import { useState } from "react";

const Node = ({ node, onClick, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { isStart, isEnd, isWall, isVisited, isPath } = node;

  const getNodeClass = () => {
    if (isStart) return "bg-green-400";
    if (isEnd) return "bg-red-400";
    if (isWall) return "bg-gray-900";
    if (isPath) return "bg-yellow-400";
    if (isVisited) return "bg-blue-400";
    return "bg-gray-100";
  };

  return (
    <div
      className={`w-5 h-5 border border-gray-300 ${getNodeClass()}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    />
  );
};

export const Grid = ({ grid, onClick, selectedTool }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (row, col) => {
    if (selectedTool === "wall") {
      setIsMouseDown(true);
      onClick(row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) onClick(row, col);
  };

  const handleMouseUp = () => setIsMouseDown(false);

  return (
    <div className="flex flex-col gap-px">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-px">
          {row.map((node, nodeIdx) => (
            <Node
              key={`${rowIdx}-${nodeIdx}`}
              node={node}
              onClick={() => {
                console.log("clicked");
                onClick(node.row, node.col);
              }}
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
