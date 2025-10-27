import "./index.css";
import { Text } from "@/components/retroui/Text";
import { Button } from "./components/retroui/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            height: "100vh",
          }}
        >
          <Text as="h1">Getting Started 👋</Text>
          <Button size={"lg"} style={{ height: "200px", width: "275px" }} asChild>
            <Link to="/clean-file">Clean a CSV/Excel File</Link>
          </Button>
          <Button size={"lg"} style={{ height: "200px", width: "275px" }} asChild>
            <Link to="/join-files">Join two CSV/Excel File</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
