import { useState } from "react";
import axios from "axios";
import { FileUploadButton } from "./FileUploadButton";
import { Button } from "./components/retroui/Button";
import { useNavigate } from "react-router-dom";
import { Text } from "./components/retroui/Text";
import Grid from "./Grid";

const apiUrl = import.meta.env.VITE_API_URL;

const JoinFiles = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [df1, setDf1] = useState<any[] | null>(null);
  const [df2, setDf2] = useState<any[] | null>(null);
  const [tmpFilepath1, setTmpFilepath1] = useState<string | null>(null);
  const [tmpFilepath2, setTmpFilepath2] = useState<string | null>(null);
  const [df1IsCleaned, setDf1IsCleaned] = useState<boolean>(false);
  const [df2IsCleaned, setDf2IsCleaned] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpload = async (e: any, fileNumber: number) => {
    e.preventDefault();
    console.log("inside handleUpload");

    const formData = new FormData();
    if (fileNumber == 1 && file1) formData.append("file", file1);
    else if (fileNumber == 2 && file2) formData.append("file", file2);

    console.log("formData", formData);

    try {
      const res = await axios.put(`${apiUrl}/app/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "Failed") {
        alert(`Error: ${res.data.message}`);
      } else {
        if (fileNumber == 1) {
          setDf1(res.data.data);
          setTmpFilepath1(res.data.filepath);
        } else if (fileNumber == 2) {
          setDf2(res.data.data);
          setTmpFilepath2(res.data.filepath);
        } else {
          throw new Error("fileNumber was not 1 or 2.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = async (e: any) => {
    e.preventDefault();
    console.log("inside handleJoin");
    try {
      const body = {
        df1,
        df2,
      };
      const res = await axios.put(`${apiUrl}/app/join-files`, body);
      console.log(res.data);
      navigate("/downloadable-file", { state: { df: res.data.data } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClean = async (e: any, fileNumber: number) => {
    e.preventDefault();
    console.log("inside handleClean");

    try {
      if (fileNumber == 1 && tmpFilepath1) {
        const body = {
          tmpFilePath: tmpFilepath1,
        };
        const res = await axios.put(`${apiUrl}/app/clean-file`, body);
        console.log("res.data.data:", res.data.data);
        console.log("cleaning df1");
        setDf1(res.data.data);
        setDf1IsCleaned(true);
      } else if (fileNumber == 2 && tmpFilepath2) {
        const body = {
          tmpFilePath: tmpFilepath2,
        };
        const res = await axios.put(`${apiUrl}/app/clean-file`, body);
        console.log("res.data.data:", res.data.data);
        console.log("cleaning df2");
        setDf2(res.data.data);
        setDf2IsCleaned(true);
      } else {
        console.log("fileNumber is not 1 or 2, or respective tmpFilepath is not defined");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Text as={"h2"}>Join Two CSV Files</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleJoin}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {df1 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      // paddingTop: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text as={"h2"}>Previewing {file1?.name}</Text>
                    <Grid df={df1} width="600px" height="600px" />
                    <Button onClick={(e) => handleClean(e, 1)} disabled={df1IsCleaned}>
                      {df1IsCleaned ? "Cleaned" : "Clean"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <FileUploadButton
                      fileNumber={1}
                      onFileSelect={(e: any) => setFile1(e)}
                      data={file1}
                      height={600}
                      width={600}
                    />
                    <Button variant={"secondary"} onClick={(e) => handleUpload(e, 1)}>
                      Upload
                    </Button>
                  </div>
                </>
              )}
              {df2 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      // paddingTop: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text as={"h2"}>Previewing {file2?.name}</Text>
                    <Grid df={df2} width="600px" height="600px" />
                    <Button onClick={(e) => handleClean(e, 2)} disabled={df2IsCleaned}>
                      {df2IsCleaned ? "Cleaned" : "Clean"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <FileUploadButton
                      fileNumber={2}
                      onFileSelect={(e: any) => setFile2(e)}
                      data={file2}
                      height={600}
                      width={600}
                    />
                    <Button variant={"secondary"} onClick={(e) => handleUpload(e, 2)}>
                      Upload
                    </Button>
                  </div>
                </>
              )}
            </div>
            {df1IsCleaned && df2IsCleaned && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button variant={"secondary"}>Join Cleaned Files</Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default JoinFiles;
