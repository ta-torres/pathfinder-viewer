# pathfinder-viewer

Pathfinding visualizer built with React, TypeScript, Tailwind CSS and shadcn/ui components.

You can try the live demo of the project at <https://pathfinder-view.vercel.app> .

## Features

- Visualize weighted and unweighted pathfinding algorithms

  - Weighted: The algorithm takes into account the cost of travelling through different areas, meaning some paths may be harder or slower to go through.
  - Unweighted: Every path has the same cost, usually aimed to find the shortest route regardless of the difficulty.

- List of algorithms:

  - Weighted
    - Dijsktra
    - A\*
  - Unweighted
    - BFS (Breadth First Search, guarantees the shortest route)
    - DFS (Depth First Search)

- Customizable grid with different obstacles and weights:

  - Start node
  - End node
  - Walls
  - Forests (for weighted algorithms)

- Randomly generated mazes
- Set animation speed
