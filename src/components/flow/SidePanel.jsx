import { useFlow } from "../../context/FlowContext";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

// Component for rendering the side panel
function SidePanel() {
  const { screen } = useFlow();

  return (
    // Side panel container
    <aside className="bg-white absolute top-0 right-0 z-10 w-[20rem] h-screen pt-16 border-l border-gray-200">
      {/* Render NodesPanel or SettingsPanel based on the current screen state */}
      {screen === "default" ? (
        <NodesPanel />
      ) : (
        <>
          <SettingsPanel />
        </>
      )}
    </aside>
  );
}

export default SidePanel;
