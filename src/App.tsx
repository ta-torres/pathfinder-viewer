//@ts-nocheck
import "./App.css";
import { useState } from "react";
import { Controls } from "./components/Controls";

function App() {
  const [selectedTool, setSelectedTool] = useState("wall");

  return (
    <div className="grid place-items-center p-8 gap-4">
      <Controls selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}

export default App;
