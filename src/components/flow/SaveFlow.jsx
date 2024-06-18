import { useSaveLocalStorage } from "../../hooks/useSaveLocalStorage";
import Button from "../../ui/Button";

// Component for rendering the "Save Changes" button
function SaveFlow() {
  const { saveDataToLocalStorage } = useSaveLocalStorage();

  return (
    // Button to save the current flow data to local storage
    <Button
      onClick={saveDataToLocalStorage}
      className="text-[#0550f1] border-[#648ee7]"
    >
      Save Changes
    </Button>
  );
}

export default SaveFlow;
