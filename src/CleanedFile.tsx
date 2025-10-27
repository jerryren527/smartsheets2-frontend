import React from "react";
import { Text } from "@/components/retroui/Text";
import { useLocation } from "react-router-dom";
import Grid from "./Grid";
import ExportButton from "./ExportButton";
import { Button } from "./components/retroui/Button";

const CleanedFile = () => {
  const { state } = useLocation();
  const { cleanedDf } = state;
  console.log(cleanedDf);
  // const navigate = useNavigate();

  const handleStartOver = () => {
    window.location.href = "/";
  };
  return (
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
      <Text as={"h2"}>File Cleaned!</Text>

      <Grid df={cleanedDf} />
      <ExportButton data={cleanedDf} filename={"data.csv"} />
      <Button onClick={handleStartOver}>Start Over</Button>
    </div>
  );
};

export default CleanedFile;
