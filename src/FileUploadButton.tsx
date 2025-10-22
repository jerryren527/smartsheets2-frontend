// import { Button } from "@/components/ui/button";
import { Button } from "@/components/retroui/Button";

export function FileUploadButton({
  onFileSelect,
  fileNumber,
}: {
  onFileSelect: (file: File) => void;
  fileNumber?: number;
}) {
  return (
    <div>
      <input
        id={`file${fileNumber}`}
        type="file"
        className="hidden" // hides the native file input
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      <label htmlFor={`file${fileNumber}`}>
        {/* asChild prop will let the child (must only be one child) inherit the properties of the parent (all of the styling of shadcn Button component) */}
        <Button size={"md"} style={{ flex: 1 }} asChild>
          <span>Select File {fileNumber}</span>
        </Button>
      </label>
    </div>
  );
}
