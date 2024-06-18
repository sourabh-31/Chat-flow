import { useCallback } from "react";
import { useFlow } from "../context/FlowContext";
import toast from "react-hot-toast";

// Custom hook for saving flow data to local storage
export function useSaveLocalStorage() {
  const { nodes, edges } = useFlow();

  // Save flow data to local storage
  const saveDataToLocalStorage = useCallback(() => {
    // Find nodes that are not connected to any edges
    const invalidNodes = nodes.filter((node) => {
      return (
        !edges.some((edge) => edge.source === node.id) &&
        !edges.some((edge) => edge.target === node.id)
      );
    });

    // Check if there are any invalid nodes
    if (invalidNodes.length > 0) {
      toast.error("Error: Cannot save flow");
      return;
    }

    // Save nodes and edges to local storage
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    toast.success("Success: Flow saved");
  }, [nodes, edges]);

  return { saveDataToLocalStorage };
}
