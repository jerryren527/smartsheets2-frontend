import { useState } from "react";
import axios from "axios";
import { FileUploadButton } from "./FileUploadButton";
import SubmitButton from "./SubmitButton";

const JoinFiles = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    console.log(file1);
    console.log(file2);

    // Send the files as multipart/form-data. This is how files are sent in request.FILES
    const formData = new FormData();
    if (file1) {
      formData.append("file1", file1);
    }
    if (file2) {
      formData.append("file2", file2);
    }

    try {
      // const res = await axios.put("http://localhost:8000/app/join/", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const res = await axios.put("https://smartsheets2-backend-production.up.railway.app/app/join", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      console.log(res.data);

      if (res.data.status === "Failed") {
        alert(`Error: ${res.data.message}`);
      } else {
        alert(`Success`);
        // Create a URL for the CSV blob
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv"); // filename
        document.body.appendChild(link);
        link.click();
        link.remove(); // cleanup
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleUpload}>
          <div style={{ display: "flex", gap: "10px" }}>
            <FileUploadButton fileNumber={1} onFileSelect={(e: any) => setFile1(e)} data={file1} />
            <FileUploadButton fileNumber={2} onFileSelect={(e: any) => setFile2(e)} data={file2} />
            <SubmitButton text="Clean and Join" />
          </div>
          <div>
            {file1 && <p>File 1: {file1?.name}</p>}
            {file2 && <p>File 2: {file2?.name}</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default JoinFiles;
