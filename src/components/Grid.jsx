import { useState } from "react";
import "./Grid.css";

const Node = ({ node, onClick, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { isStart, isEnd, isWall, isVisited, isPath } = node;

  const getNodeClass = () => {
    const baseClasses = "w-5 h-5 border border-gray-300 will-change";

    if (isStart) return `${baseClasses} bg-green-400 smooth-transition`;
    if (isEnd) return `${baseClasses} bg-red-400 smooth-transition`;
    if (isWall) return `${baseClasses} bg-gray-900 animate-wall`;
    if (isPath) return `${baseClasses} bg-yellow-400 animate-path`;
    if (isVisited)
      return `${baseClasses} bg-blue-400 animate-visited smooth-transition`;
    return `${baseClasses} bg-gray-100 will-change smooth-transition`;
  };

  return (
    <div
      className={getNodeClass()}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    />
  );
};

export const Grid = ({ grid, onClick, selectedTool }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e, row, col) => {
    e.preventDefault();
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
              onMouseDown={(e) => handleMouseDown(e, node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
