import FlowBuilder from "../components/flow/FlowBuilder";
import SidePanel from "../components/flow/SidePanel";
import TopPanel from "../components/flow/TopPanel";

// Page component for the FlowBuilder
function FlowBuilderPage() {
  return (
    <>
      {/* Top panel section */}
      <TopPanel />

      {/* Main flow builder section */}
      <FlowBuilder />

      {/* Side panel section */}
      <SidePanel />
    </>
  );
}

export default FlowBuilderPage;
