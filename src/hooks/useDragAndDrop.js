import { useCallback } from "react";

// Custom hook for handling drag and drop functionality
export function useDragAndDrop(addNode) {
  // Handle the start of the drag event
  const handleDragStart = useCallback((event) => {
    event.dataTransfer.setData("application/reactflow", "newNode");
    event.dataTransfer.effectAllowed = "move";
  }, []);

  // Handle the drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // Get the bounding rectangle of the ReactFlow component
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // If the dragged item is a new node, calculate its position and add it
      if (type === "newNode") {
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };
        addNode(position);
      }
    },
    [addNode]
  );

  // Handle the dragover event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return { handleDragStart, onDrop, onDragOver };
}
