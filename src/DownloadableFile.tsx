import { Text } from "@/components/retroui/Text";
import { useLocation } from "react-router-dom";
import Grid from "./Grid";
import ExportButton from "./ExportButton";
import { Button } from "./components/retroui/Button";

const DownloadableFile = () => {
  const { state } = useLocation();
  const { df } = state;

  const handleStartOver = () => {
    // Want to refresh the page
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

      <Grid df={df} height="70vh" width="70vw" />
      <ExportButton data={df} filename={"data.csv"} />
      <Button onClick={handleStartOver}>Start Over</Button>
    </div>
  );
};

export default DownloadableFile;
