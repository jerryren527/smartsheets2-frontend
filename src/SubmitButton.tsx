import { Button } from "@/components/retroui/Button";
import "./styles.css";
import { useState } from "react";

export default function SubmitButton({ text }: { text: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Button
      variant={hovered ? "secondary" : "default"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="submit"
    >
      {text}
    </Button>
  );
}
