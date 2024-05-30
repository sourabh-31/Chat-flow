import { useFlow } from "../../context/FlowContext";
import AddMessage from "./AddMessage";
import AddNode from "./AddNode";
import DeleteNode from "./DeleteNode";

//sidebar component
function Sidebar() {
  const { screen } = useFlow();

  //"drag-and-drop" feature starts here by inititalizing a drag
  const handleDragStart = (event) => {
    event.dataTransfer.setData("application/reactflow", "newNode");
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    // rendering screen based on the whether a node is selected or not
    <aside className="bg-white absolute top-0 right-0 z-10 w-[20rem] h-screen pt-16 border-l border-gray-200">
      {screen === "default" ? (
        <AddNode handleDragStart={handleDragStart} />
      ) : (
        <>
          <AddMessage />
          <DeleteNode />
        </>
      )}
    </aside>
  );
}

export default Sidebar;
