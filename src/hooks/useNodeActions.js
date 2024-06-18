import { useCallback } from "react";
import { applyNodeChanges } from "reactflow";
import { useFlow } from "../context/FlowContext";

// Custom hook for handling node-related actions
export function useNodeActions() {
  const { nodes, setNodes, setNodeData, setScreen, setSelectedNodeId } =
    useFlow();

  // Handle node changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handle node click
  const onNodeClick = useCallback(
    (event, node) => {
      // Update the selected node data
      setNodeData(node);
      // Switch to the edit screen
      setScreen("edit");
      // Set the selected node ID
      setSelectedNodeId(node.id);
    },
    [setNodeData, setScreen, setSelectedNodeId]
  );

  return { nodes, onNodesChange, onNodeClick };
}
