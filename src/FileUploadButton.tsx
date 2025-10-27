// import { Button } from "@/components/ui/button";
import { Button } from "@/components/retroui/Button";

export function FileUploadButton({
  onFileSelect,
  fileNumber,
  data,
}: {
  onFileSelect: (file: File) => void;
  fileNumber?: number;
  data: File | null;
}) {
  return (
    <div>
      <input
        id={`file${fileNumber}`}
        type="file"
        className="hidden" // hides the native file input
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("🚀 ~ FileUploadButton ~ file:", file);
          if (file) onFileSelect(file);
        }}
      />
      <label htmlFor={`file${fileNumber}`}>
        {/* asChild prop will let the child (must only be one child) inherit the properties of the parent (all of the styling of shadcn Button component) */}
        <Button
          variant="outline"
          style={{ height: "400px", width: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}
          asChild
        >
          {data ? <span>{data.name}</span> : <span>Select File {fileNumber}</span>}
        </Button>
      </label>
    </div>
  );
}
