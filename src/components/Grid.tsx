import { useState } from "react";
import "./Grid.css";
import { NodeType, Tool } from "../types";
import { getGridSize, getCellSize } from "@/utils/gridSize";

interface GridProps {
  grid: NodeType[][];
  onClick: (row: number, col: number) => void;
  selectedTool: Tool;
}

interface NodeProps {
  node: NodeType;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

const Node = ({
  node,
  onClick,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: NodeProps) => {
  const { isStart, isEnd, isWall, isVisited, isPath } = node;
  const { width, height } = getCellSize();

  const getNodeClass = () => {
    const baseClasses = "border border-flexoki-base-200 will-change-auto";

    if (isStart) return `${baseClasses} bg-green-600 smooth-transition`;
    if (isEnd) return `${baseClasses} bg-flexoki-red-300 smooth-transition`;
    if (isWall) return `${baseClasses} bg-flexoki-base-900 animate-wall`;
    if (isPath) return `${baseClasses} bg-flexoki-yellow-300 animate-path`;
    if (isVisited)
      return `${baseClasses} bg-flexoki-blue-300 animate-visited smooth-transition`;
    if (node.weight === 5)
      return `${baseClasses} bg-flexoki-green-600 animate-forest`;

    return `${baseClasses} bg-gray-100 hover:bg-gray-300 will-change-auto smooth-transition`;
  };

  return (
    <div
      className={getNodeClass()}
      style={{ width, height }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    />
  );
};

export const Grid = ({ grid, onClick, selectedTool }: GridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (selectedTool === "wall" || selectedTool === "forest") {
      setIsMouseDown(true);
      onClick(row, col);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) onClick(row, col);
  };

  const handleMouseUp = () => setIsMouseDown(false);

  const { rows, cols } = getGridSize();
  const { width, height } = getCellSize();

  return (
    <div className="grid place-items-center">
      <div className="bg-flexoki-base-50 border border-flexoki-base-200">
        <div
          className="grid items-center justify-center"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${width}px)`,
            gridTemplateRows: `repeat(${rows}, ${height}px)`,
          }}
        >
          {grid.flat().map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              node={node}
              onClick={() => onClick(node.row, node.col)}
              onMouseDown={(e) => handleMouseDown(e, node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
