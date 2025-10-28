import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CleanFile from "./CleanFile";
import JoinFiles from "./JoinFiles";
import DownloadableFile from "./DownloadableFile";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Import this once, globally. Not in every ag-grid component.
ModuleRegistry.registerModules([AllCommunityModule]);

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  useEffect(() => {
    const deleteTmpFles = async () => {
      console.log("Deleting all tmp files in /tmp...");
      try {
        const res = await axios.delete(`${apiUrl}/app/delete-tmp-files`);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    deleteTmpFles();
    console.log("apiUrl", apiUrl);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clean-file" element={<CleanFile />} />
        <Route path="/downloadable-file" element={<DownloadableFile />} />
        <Route path="/join-files" element={<JoinFiles />} />
      </Routes>
    </>
  );
}

export default App;
