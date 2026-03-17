import * as XLSX from "xlsx";
import { ColumnDef } from "../types";

export const exportToExcel = <TData extends Record<string, any>>(
  data: TData[],
  columns: ColumnDef<TData>[],
  filename: string = "table-export.xlsx"
) => {
  const wsData = [
    columns.map(col => col.header),
    ...data.map(row => 
      columns.map(col => {
        const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? row[col.accessorKey] : "");
        return val ?? "";
      })
    )
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, filename);
};
