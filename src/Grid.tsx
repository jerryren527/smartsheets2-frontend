import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface GridProps {
  df: any[];
}

const Grid = ({ df }: GridProps) => {
  const columnDefs = useMemo(() => {
    if (df && df.length > 0) {
      const firstRow = df[0];
      return Object.keys(firstRow).map((key) => ({ field: key }));
    } else {
      return [];
    }
  }, [df]);

  return (
    <div className="ag-theme-alpine" style={{ height: "70vh", width: "70%" }}>
      <AgGridReact rowData={df} columnDefs={columnDefs} pagination={true} />
    </div>
  );
};

export default Grid;
