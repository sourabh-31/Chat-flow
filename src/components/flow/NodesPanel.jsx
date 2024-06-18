import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

// Component for rendering the node panel button
function NodesPanel() {
  const { handleDragStart } = useDragAndDrop(null);

  return (
    // Draggable button for creating new nodes
    <button
      className="text-[#648ee7] text-xs font-bold bg-white py-3 px-6 border border-[#648ee7] rounded flex flex-col items-center ml-4"
      draggable
      onDragStart={handleDragStart}
    >
      <BiSolidMessageRoundedDetail size={18} />
      <p>Drag & Drop</p>
    </button>
  );
}

export default NodesPanel;
