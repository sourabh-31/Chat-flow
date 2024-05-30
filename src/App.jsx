import { Toaster } from "react-hot-toast";
import { FlowProvider } from "./context/FlowContext";
import FlowPage from "./pages/FlowPage";

//many more pages can be added here and then we can use react-router-dom to route the pages
function App() {
  return (
    <div className="h-screen">
      <FlowProvider>
        <FlowPage />
      </FlowProvider>

      {/* customizing toast notification */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "14px",
            fontWeight: "600",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </div>
  );
}

export default App;
