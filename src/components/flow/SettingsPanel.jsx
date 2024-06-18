import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useFlow } from "../../context/FlowContext";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import TextInput from "../../ui/TextInput";

// Settings panel component
function SettingsPanel() {
  const {
    updateNode,
    deleteNode,
    setScreen,
    setNodeData,
    nodeData,
    setSelectedNodeId,
  } = useFlow();

  // Destructure node data
  const {
    id,
    data: { heading, label },
  } = nodeData;

  // State for label and heading values
  const [labelValue, setLabelValue] = useState(label);
  const [headingValue, setHeadingValue] = useState(heading);

  // Update node label and heading
  function handleUpdateNodeLabel() {
    updateNode(id, { heading: headingValue, label: labelValue });
    handleReset();
    setSelectedNodeId("");
    toast.success("Success: Edit successful");
  }

  // Reset panel state
  function handleReset() {
    setScreen("default");
    setNodeData({});
    setSelectedNodeId("");
  }

  // Delete node
  function handleDelete() {
    deleteNode(id);
    setScreen("default");
    setNodeData({});
  }

  // Sync label and heading state with node data
  useEffect(
    function () {
      setLabelValue(label);
      setHeadingValue(heading);
    },
    [label, heading]
  );

  return (
    <section className="border-b border-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-3">
        <button className="ml-6" onClick={handleReset}>
          <FaArrowLeft />
        </button>
        <p className="-ml-8 font-bold text-sm">Message</p>
        <div />
      </header>

      {/* Main content */}
      <main className="p-4">
        <p className="text-gray-500 mb-2 text-sm font-bold">Enter Heading</p>
        <TextInput
          value={headingValue}
          onChange={(e) => setHeadingValue(e.target.value)}
        />

        <p className="text-gray-500 mb-2 mt-6 text-sm font-bold">Enter Label</p>
        <textarea
          className="border border-gray-200 w-full h-[5rem] rounded-md outline-none text-sm p-2"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />

        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            onClick={handleDelete}
            className="text-[#9b111e] border-[#9b111e]"
          >
            Delete
          </Button>

          <Button
            onClick={handleUpdateNodeLabel}
            className="text-[#0550f1] border-[#648ee7]"
          >
            Done
          </Button>
        </div>
      </main>
    </section>
  );
}

export default SettingsPanel;
