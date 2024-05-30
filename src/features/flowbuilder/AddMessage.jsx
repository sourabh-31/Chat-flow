import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useFlow } from "../../context/FlowContext";
import toast from "react-hot-toast";

function AddMessage() {
  const { updateNode, setScreen, setNodeData, nodeData, setSelectedNodeId } =
    useFlow();

  const {
    id,
    data: { heading, label },
  } = nodeData;

  //initial values for the text fields in case there is existing data
  const [labelValue, setLabelValue] = useState(label);
  const [headingValue, setHeadingValue] = useState(heading);

  //useEffect to load the data into the states to keep updated with the changes
  useEffect(
    function () {
      setLabelValue(label);
      setHeadingValue(heading);
    },
    [label, heading]
  );

  //submit handler function for updating "label" and "heading"
  function handleUpdateNodeLabel() {
    updateNode(id, { heading: headingValue, label: labelValue });
    handleReset();
    setSelectedNodeId("");
    toast.success("Success: edit successful");
  }

  //this function is binded to back arrow to reset the screen as well as data
  function handleReset() {
    setScreen("default");
    setNodeData({});
    setSelectedNodeId("");
  }

  return (
    <section className="border-b border-gray-200">
      {/* header part with back arrow */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-3">
        <button className="ml-6" onClick={handleReset}>
          <FaArrowLeft />
        </button>
        <p className="-ml-8 font-bold text-sm">Message</p>
        <div />
      </header>

      {/* main area where the heading and label will be entered and updated */}
      <main className="p-4">
        {/* heading part */}
        <p className="text-gray-500 mb-2 text-sm font-bold">Enter Heading</p>
        <input
          className="border border-gray-200 w-full rounded-md outline-none text-sm p-2"
          value={headingValue}
          onChange={(e) => setHeadingValue(e.target.value)}
        />

        {/* label part */}
        <p className="text-gray-500 mb-2 mt-6 text-sm font-bold">Enter Label</p>
        <textarea
          className="border border-gray-200 w-full h-[5rem] rounded-md outline-none text-sm p-2"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />

        {/* submit button */}
        <div className="flex justify-end mt-4">
          <button
            className="text-[#0550f1] text-xs font-bold bg-white py-2 px-3 border border-[#648ee7] rounded"
            onClick={handleUpdateNodeLabel}
          >
            Done
          </button>
        </div>
      </main>
    </section>
  );
}

export default AddMessage;
