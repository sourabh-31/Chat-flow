import FlowBuilder from "../features/flowbuilder/FlowBuilder";
import Save from "../features/flowbuilder/Save";
import Sidebar from "../features/flowbuilder/Sidebar";

//this is a simple page component without having any effects or states. This is just used to ensure scalability and we can add many more features according to requirements

function FlowPage() {
  return (
    <>
      <Save />
      <FlowBuilder />
      <Sidebar />
    </>
  );
}

export default FlowPage;
