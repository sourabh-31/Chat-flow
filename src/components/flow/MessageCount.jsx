import { useFlow } from "../../context/FlowContext";

// Component to display the total number of messages
function MessageCount() {
  const { nodes } = useFlow();

  return (
    <div className="text-sm ml-8 font-bold">
      {/* Display the total message count */}
      <p className="flex items-center gap-1">
        <span>Total message:</span>
        <span className="text-base">{nodes?.length}</span>
      </p>
    </div>
  );
}

export default MessageCount;
