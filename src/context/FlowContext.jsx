import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

//initial edge
const initialEdges = [];

//initial node
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

//created a context for global state management
const FlowContext = createContext();

function FlowProvider({ children }) {
  //states to store and access data globally
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  //screen = [default, edit]
  const [screen, setScreen] = useState("default");
  const [nodeData, setNodeData] = useState({});

  //function to add node
  const addNode = useCallback(
    (position) => {
      //creating a new object with some default value
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

  //function to update a existing node using "id and new data"
  const updateNode = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  //function to delete a existing node using "id"
  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, []);

  //This function is binded to "save changes" button in order to save changes to the local storage
  const saveDataToLocalStorage = useCallback(() => {
    const invalidNodes = nodes.filter((node) => {
      return (
        !edges.some((edge) => edge.source === node.id) &&
        !edges.some((edge) => edge.target === node.id)
      );
    });

    if (invalidNodes.length > 0) {
      toast.error(
        "Error: Some messages are not connected to other messages. Please connect all messages before saving."
      );
      return; // Prevent saving if condition fails
    }

    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    toast.success("Success: changes saved");
  }, [nodes, edges]);

  // Function to load data from local storage
  const loadDataFromLocalStorage = useCallback(() => {
    const storedNodes = localStorage.getItem("nodes");
    const storedEdges = localStorage.getItem("edges");

    //if the local storage has the key "nodes" and "edges" but are empty "[]" then using the initial data
    const parsedNodes = JSON.parse(storedNodes || "[]");
    const parsedEdges = JSON.parse(storedEdges || "[]");

    if (parsedNodes.length === 0 && parsedEdges.length === 0) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    } else {
      setNodes(parsedNodes);
      setEdges(parsedEdges);
    }
  }, []);

  //loading data on initial page load
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
        saveDataToLocalStorage,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

//custom hook to access the data globally with ease
function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined)
    throw new Error("Flow context was used outside the provider");

  return context;
}

export { FlowProvider, useFlow };
