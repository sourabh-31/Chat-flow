import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Initial edges
const initialEdges = [];

// Initial nodes
const initialNodes = [
  {
    id: "1",
    data: {
      heading: "Get Started",
      label: "Click here to edit",
    },
    position: { x: 200, y: 200 },
    type: "customNode",
  },
];

// Create the context
const FlowContext = createContext();

// Context provider component
function FlowProvider({ children }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Screen state ("default" or "edit")
  const [screen, setScreen] = useState("default");
  const [nodeData, setNodeData] = useState({});

  // Add a new node
  const addNode = useCallback(
    (position) => {
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: "customNode",
        position: position,
        data: {
          heading: "New Heading",
          label: "New Message",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length]
  );

  // Update an existing node
  const updateNode = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  // Delete a node
  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, []);

  // Load data from local storage
  const loadDataFromLocalStorage = useCallback(() => {
    const storedNodes = localStorage.getItem("nodes");
    const storedEdges = localStorage.getItem("edges");

    const parsedNodes = JSON.parse(storedNodes || "[]");
    const parsedEdges = JSON.parse(storedEdges || "[]");

    if (parsedNodes.length === 0 && parsedEdges.length === 0) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      setNodes(parsedNodes);
      setEdges(parsedEdges);
    }
  }, [setEdges, setNodes]);

  // Load data from local storage on mount
  useEffect(() => {
    loadDataFromLocalStorage();
  }, [loadDataFromLocalStorage]);

  return (
    <FlowContext.Provider
      value={{
        nodes,
        setNodes,
        selectedNodeId,
        setSelectedNodeId,
        edges,
        setEdges,
        addNode,
        screen,
        setScreen,
        nodeData,
        setNodeData,
        updateNode,
        deleteNode,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

// Custom hook to access the flow context
function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined)
    throw new Error("Flow context was used outside the provider");

  return context;
}

export { FlowProvider, useFlow };
