import { useState } from "react";
import "./Grid.css";
import { NodeType, Tool } from "../types";

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

  const getNodeClass = () => {
    const baseClasses =
      "w-5 h-5 border border-flexoki-base-200 will-change-auto";

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
    if (selectedTool === "wall") {
      setIsMouseDown(true);
      onClick(row, col);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) onClick(row, col);
  };

  const handleMouseUp = () => setIsMouseDown(false);

  return (
    <div className="bg-flexoki-base-50 border border-flexoki-base-200">
      <div className="flex flex-col gap-[1px]">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-[1px]">
            {row.map((node, nodeIdx) => (
              <Node
                key={`${rowIdx}-${nodeIdx}`}
                node={node}
                onClick={() => onClick(node.row, node.col)}
                onMouseDown={(e) => handleMouseDown(e, node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
