const Node = ({ node, onClick }) => {
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
    />
  );
};

export const Grid = ({ grid, onClick }) => {
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};
