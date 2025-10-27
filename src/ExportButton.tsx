import React from "react";
import { Button } from "./components/retroui/Button";

interface ExportButtonProps {
  data: any[];
  filename: string;
}

const ExportButton = ({ data, filename }: ExportButtonProps) => {
  const handleExport = () => {
    if (!data || !data.length) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((field) => {
            const value = row[field] ?? "";
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];

    // Add UTF-8 BOM for Excel compatibility
    const csvString = "\uFEFF" + csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };
  return <Button onClick={handleExport}>Download CSV</Button>;
};

export default ExportButton;
