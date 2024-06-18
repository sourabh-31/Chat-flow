import { Handle, Position } from "reactflow";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { useFlow } from "../../context/FlowContext";

// Custom text node component
function CustomTextNode({ data }) {
  const { selected, heading, label } = data;
  const { screen } = useFlow();

  return (
    <div
      className="bg-white w-[18rem] rounded-md"
      style={{
        border:
          selected && screen === "edit"
            ? "2px solid blue"
            : "1px solid #f3f3f3",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 bg-[#b2f0e3] rounded-t-md py-1 px-3">
        <BiSolidMessageRoundedDetail size={15} color="green" />
        <p className="text-sm font-bold text-[#232B2B]">{heading}</p>
      </div>

      {/* Content */}
      <div className="break-words whitespace-normal px-4 py-2 text-sm">
        {label}
      </div>

      {/* Node handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default CustomTextNode;
