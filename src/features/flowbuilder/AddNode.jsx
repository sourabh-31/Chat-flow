import { BiSolidMessageRoundedDetail } from "react-icons/bi";

//this is the add button, when dragged on the canvas a new message will be created
function AddNode({ handleDragStart }) {
  return (
    <button
      className="text-[#648ee7] text-xs font-bold bg-white py-3 px-6 border border-[#648ee7] rounded flex flex-col items-center ml-4"
      draggable
      onDragStart={handleDragStart}
    >
      <BiSolidMessageRoundedDetail size={18} />
      <p>Message</p>
    </button>
  );
}

export default AddNode;
