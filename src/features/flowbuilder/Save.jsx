import { useFlow } from "../../context/FlowContext";
import Header from "../../ui/Header";

//this is the "save changes" button to save the changes in the local storage
function Save() {
  const { saveDataToLocalStorage, nodes } = useFlow();

  return (
    <Header>
      <div className="flex justify-between items-center mr-4">
        <div className="text-sm ml-8 font-bold">
          {/* displaying total messages currently active on the canvas */}
          <p className="flex items-center gap-1">
            <span>Total message:</span>
            <span className="text-base">{nodes?.length}</span>
          </p>
        </div>
        <button
          className="text-[#0550f1] text-xs font-bold bg-white py-2 px-4 border border-[#648ee7] rounded"
          onClick={saveDataToLocalStorage}
        >
          Save Changes
        </button>
      </div>
    </Header>
  );
}

export default Save;
