import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { useFlow } from "../../context/FlowContext";
import toast from "react-hot-toast";

//defined the nodeTypes to "customNode" that we have created
const nodeTypes = {
  customNode: CustomNode,
};

function FlowBuilder() {
  //context values for global state setting
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    setNodeData,
    setScreen,
    addNode,
    selectedNodeId,
    setSelectedNodeId,
  } = useFlow();

  //handler function for changing the postion of the nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  //handler function to connect two nodes
  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const outgoingEdges = edges.filter(
        (edge) => edge.source === sourceNode.id
      );

      //checking if the outgoing edges for the node is only one and if not then displaying a error notification
      if (outgoingEdges.length >= 1) {
        toast.error("Error: a message can only have one outgoing connection");
        return;
      }

      //if success then setting the edges to the node data
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, nodes, setEdges]
  );

  //when clicked on a node the values of the selected node will be set to "nodeData" to then display it in the "AddMessage" page
  const onNodeClick = useCallback(
    (event, node) => {
      setNodeData(node);
      setScreen("edit");
      setSelectedNodeId(node.id);
    },
    [setNodeData, setScreen, setSelectedNodeId]
  );

  //this is the drop feature to complete the "drag-and-drop" functionality initiated from the "Sidebar"
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

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

  //this is just to show the drag effect on the screen
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    // using react flow with required functionality
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
