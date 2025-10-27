import { useEffect, useState } from "react";
import axios from "axios";
import { FileUploadButton } from "./FileUploadButton";
import "./index.css";
import SubmitButton from "./SubmitButton";
import { Text } from "@/components/retroui/Text";
import GridExample from "./GridExample";
import { Button } from "./components/retroui/Button";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CleanFile from "./CleanFile";
import JoinFiles from "./JoinFiles";
import CleanedFile from "./CleanedFile";

function App() {
  useEffect(() => {
    const deleteTmpFles = async () => {
      console.log("Deleting all tmp files in /tmp...");
      try {
        // const res = await axios.delete("http://localhost:8000/app/delete-tmp-files");
        const res = await axios.delete("https://smartsheets2-backend-production.up.railway.app/app/delete-tmp-files");
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    deleteTmpFles();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clean-file" element={<CleanFile />} />
        <Route path="/cleaned-file" element={<CleanedFile />} />
        <Route path="/join-files" element={<JoinFiles />} />
      </Routes>
    </>
  );
}

export default App;
