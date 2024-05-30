import { Handle, Position } from "reactflow";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

//this is the code for customizing the default node, with the help of custom styling
function CustomNode({ data }) {
  const { selected, heading, label } = data;

  return (
    <div
      className="bg-white w-[18rem] rounded-md"
      style={{ border: selected ? "1px solid blue" : "1px solid #f3f3f3" }}
    >
      <div className="flex items-center gap-2 bg-[#b2f0e3] rounded-t-md py-1 px-3">
        <BiSolidMessageRoundedDetail size={15} color="green" />
        <p className="text-sm font-bold text-[#232B2B]">{heading}</p>
      </div>
      <div className="break-words whitespace-normal px-4 py-2 text-sm">
        {label}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomNode;
