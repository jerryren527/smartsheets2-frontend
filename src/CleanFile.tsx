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
  const [tmpFilepath, setTmpFilepath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = async (e: any) => {
    e.preventDefault();
    console.log("inside handleupload");
    // console.log(file1);
    // console.log(file2);

    // // Send the files as multipart/form-data. This is how files are sent in request.FILES
    const formData = new FormData();
    if (file1) {
      formData.append("file1", file1);
    }
    // if (file2) {
    //   formData.append("file2", file2);
    // }

    try {
      const res = await axios.put("https://smartsheets2-backend-production.up.railway.app/app/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const res = await axios.put("http://localhost:8000/app/upload-file", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      console.log(res);
      console.log(res.data);

      if (res.data.status === "Failed") {
        alert(`Error: ${res.data.message}`);
      } else {
        setDf(res.data.data);
        setTmpFilepath(res.data.filepath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClean = async (e: any) => {
    try {
      const body = {
        tmpFilepath,
      };
      const filepath = file1?.name;
      console.log("🚀 ~ handleClean ~ filepath:", filepath);
      const res = await axios.put("https://smartsheets2-backend-production.up.railway.app/app/clean-file", body);
      // const res = await axios.put("http://localhost:8000/app/clean-file", body);
      console.log(res);
      console.log(res.data);
      setDf(res.data.data);
      navigate("/cleaned-file", { state: { cleanedDf: res.data.data } });
    } catch (error) {
      console.error(error);
    }

    console.log("handleClean");
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
            <Grid df={df} />
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
            <Text as={"h1"}>Upload CSV/Excel ⬆︎</Text>
            <FileUploadButton fileNumber={1} onFileSelect={(e: any) => setFile1(e)} data={file1} />
            <Button variant={"secondary"}>Upload</Button>
          </div>
        </form>
      )}
    </>
  );
};

export default CleanFile;
