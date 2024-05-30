import { useFlow } from "../../context/FlowContext";

//this code represents the delete button on the right sidebar
function DeleteNode() {
  const { nodeData, deleteNode, setScreen, setNodeData } = useFlow();

  const { id } = nodeData;

  //this function when clicked will send the selected node id to the delete node function in the context
  function handleDelete() {
    deleteNode(id);
    setScreen("default");
    setNodeData({});
  }

  return (
    <div className="flex justify-end mr-4 mt-4">
      <button
        className="text-[#9b111e] text-xs font-bold bg-white py-2 px-3 border border-[#9b111e] rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteNode;
