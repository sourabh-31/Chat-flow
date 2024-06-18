import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import CustomTextNode from "./CustomTextNode";
import { useFlow } from "../../context/FlowContext";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useEdgeActions } from "../../hooks/useEdgeActions";
import { useNodeActions } from "../../hooks/useNodeActions";

// Define custom node types
const nodeTypes = {
  customNode: CustomTextNode,
};

function FlowBuilder() {
  const { addNode, selectedNodeId } = useFlow();

  // Handle node actions
  const { nodes, onNodesChange, onNodeClick } = useNodeActions();
  // Handle edge actions
  const { edges, onEdgesChange, onConnect } = useEdgeActions();
  // Handle drag and drop actions
  const { onDrop, onDragOver } = useDragAndDrop(addNode);

  return (
    // Render the ReactFlow component with required functionality
    <div className="h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            selected: node.id === selectedNodeId,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
        <MiniMap position="bottom-left" className="ml-16" />
      </ReactFlow>
    </div>
  );
}

export default FlowBuilder;
