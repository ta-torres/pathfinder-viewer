export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  weight: number;
};

export type Algorithm = "bfs" | "dfs" | "dijkstra";
export type Tool = "wall" | "start" | "end" | "forest" | "maze";
