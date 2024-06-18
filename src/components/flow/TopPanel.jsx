import Header from "../../ui/Header";
import MessageCount from "./MessageCount";
import SaveFlow from "./SaveFlow";

// Component for rendering the top panel
function TopPanel() {
  return (
    // Top panel container
    <Header>
      {/* Message count and save flow button */}
      <div className="flex justify-between items-center mr-4">
        <MessageCount />
        <SaveFlow />
      </div>
    </Header>
  );
}

export default TopPanel;
