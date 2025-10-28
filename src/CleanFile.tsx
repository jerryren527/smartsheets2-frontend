import { useState } from "react";
import axios from "axios";
import { FileUploadButton } from "./FileUploadButton";
import "./index.css";
import { Text } from "@/components/retroui/Text";
import { Button } from "./components/retroui/Button";
import { useNavigate } from "react-router-dom";
import Grid from "./Grid";

const CleanFile = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [df, setDf] = useState<any[] | null>(null);
  const [tmpFilePath, setTmpFilePath] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUpload = async (e: any) => {
    e.preventDefault();

    // Send the files as multipart/form-data. This is how files are sent in request.FILES
    const formData = new FormData();
    if (file1) {
      formData.append("file", file1);
    }

    try {
      const res = await axios.put(`${apiUrl}/app/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "Failed") {
        alert(`Error: ${res.data.message}`);
      } else {
        setDf(res.data.data);
        setTmpFilePath(res.data.filepath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClean = async () => {
    try {
      const body = {
        tmpFilePath,
      };
      const res = await axios.put(`${apiUrl}/app/clean-file`, body);
      setDf(res.data.data);
      navigate("/downloadable-file", { state: { df: res.data.data } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {df ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text as={"h2"}>Previewing {file1?.name}</Text>
            <Grid df={df} height="70vh" width="70vw" />
            <Button onClick={handleClean}>Clean</Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpload}>
          <div
            style={{
              height: "100vh",
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text as={"h1"}>Upload CSV File ⬆︎</Text>
            <FileUploadButton
              fileNumber={1}
              onFileSelect={(e: any) => setFile1(e)}
              data={file1}
              height={400}
              width={400}
            />
            <Button variant={"secondary"}>Upload</Button>
          </div>
        </form>
      )}
    </>
  );
};

export default CleanFile;
