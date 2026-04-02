import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ColumnDef } from "../types";

export const exportToPdf = <TData extends Record<string, any>>(
  data: TData[],
  columns: ColumnDef<TData>[],
  filename: string = "table-export.pdf"
) => {
  const doc = new jsPDF();
  const head = [columns.map(col => col.header)];
  const body = data.map(row => 
    columns.map(col => {
      const val = col.accessorFn ? col.accessorFn(row) : (col.accessorKey ? row[col.accessorKey] : "");
      return String(val ?? "");
    })
  );

  autoTable(doc, {
    head,
    body,
    theme: "striped",
    headStyles: { fillColor: "#2563eb" }
  });

  doc.save(filename);
};
