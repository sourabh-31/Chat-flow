import { useCallback } from "react";
import { useFlow } from "../context/FlowContext";
import { addEdge, applyEdgeChanges } from "reactflow";
import toast from "react-hot-toast";

// Custom hook for handling edge-related actions
export function useEdgeActions() {
  const { nodes, edges, setEdges } = useFlow();

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Handle edge connection
  const onConnect = useCallback(
    (params) => {
      // Find the source node
      const sourceNode = nodes.find((node) => node.id === params.source);
      // Find outgoing edges from the source node
      const outgoingEdges = edges.filter(
        (edge) => edge.source === sourceNode.id
      );

      // Check if there is already an outgoing edge from the source node
      if (outgoingEdges.length >= 1) {
        toast.error("Error: Cannot connect message");
        return;
      }

      // Add the new edge
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, nodes, setEdges]
  );

  return { edges, onEdgesChange, onConnect };
}
