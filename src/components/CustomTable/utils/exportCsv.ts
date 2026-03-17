import { ColumnDef } from "../types";

export const exportToCsv = <TData extends Record<string, any>>(
  data: TData[],
  columns: ColumnDef<TData>[],
  filename: string = "table-export.csv"
) => {
  const headers = columns.map(col => col.header);
  const rows = data.map(row => 
    columns.map(col => {
      const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? row[col.accessorKey] : "");
      return `"${String(val ?? "").replace(/"/g, '""')}"`;
    }).join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
