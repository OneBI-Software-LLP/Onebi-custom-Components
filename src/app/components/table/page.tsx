"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomTable } from "@/components/CustomTable/CustomTable";
import { ColumnDef } from "@/components/CustomTable/types";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        npm i onebi-ui
      </Badge>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: string;
}

const employees: Employee[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", role: "Senior Developer", department: "Engineering", status: "Active", joinDate: "2023-01-15" },
  { id: "2", name: "Marcus Johnson", email: "marcus.j@company.com", role: "Product Manager", department: "Product", status: "Active", joinDate: "2023-03-22" },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@company.com", role: "UX Designer", department: "Design", status: "On Leave", joinDate: "2023-06-10" },
  { id: "4", name: "David Kim", email: "david.kim@company.com", role: "DevOps Engineer", department: "Engineering", status: "Active", joinDate: "2023-08-05" },
  { id: "5", name: "Aisha Patel", email: "aisha.p@company.com", role: "Data Analyst", department: "Analytics", status: "Inactive", joinDate: "2022-11-30" },
  { id: "6", name: "James Wilson", email: "james.w@company.com", role: "QA Lead", department: "Engineering", status: "Active", joinDate: "2023-02-14" },
  { id: "7", name: "Olivia Brown", email: "olivia.b@company.com", role: "Marketing Manager", department: "Marketing", status: "Active", joinDate: "2023-04-01" },
  { id: "8", name: "Liam Taylor", email: "liam.t@company.com", role: "Backend Developer", department: "Engineering", status: "Active", joinDate: "2023-07-19" },
];

const columns: ColumnDef<Employee>[] = [
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "email", accessorKey: "email", header: "Email" },
  { id: "role", accessorKey: "role", header: "Role" },
  { id: "department", accessorKey: "department", header: "Department" },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    type: "badge",
    badgeColorMap: {
      Active: "#10b981",
      "On Leave": "#f59e0b",
      Inactive: "#ef4444",
    },
  },
  { id: "joinDate", accessorKey: "joinDate", header: "Join Date", type: "date" },
];

export default function TablePage() {
  const [sortState, setSortState] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-6xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Table
            </h2>
            <p className="text-lg text-slate-500">
              Powerful data grid with sorting, filtering, pagination, and bulk actions.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Employee Directory
              </Label>
              <CustomTable
                data={employees}
                columns={columns}
                showToolbar
                showColumnVisibility
                showExportButton
                searchPlaceholder="Search employees..."
                striped
                density="compact"
                getRowId={(row) => row.id}
                onSortChange={(sorting) => setSortState(sorting)}
                onSearchChange={(query) => setSearchQuery(query)}
              />
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Selection & Bulk Actions
              </Label>
              <CustomTable
                data={employees.slice(0, 5)}
                columns={columns}
                showToolbar
                selectionMode="multi"
                showExportButton
                striped
                density="standard"
                getRowId={(row) => row.id}
                bulkActions={[
                  { value: "activate", label: "Activate Selected" },
                  { value: "deactivate", label: "Deactivate Selected" },
                  { value: "export", label: "Export Selected" },
                ]}
                onBulkAction={(action, selected) => {
                  console.log(`Action: ${action}, Selected:`, selected);
                }}
                showAddButton
                onAddClick={() => console.log("Add employee clicked")}
                onRefresh={() => console.log("Refresh clicked")}
              />
            </div>

            <CodeBlock
              code={`import { CustomTable } from "onebi-ui";
import type { ColumnDef } from "onebi-ui/types";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnDef<Employee>[] = [
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "email", accessorKey: "email", header: "Email" },
  { id: "role", accessorKey: "role", header: "Role" },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    type: "badge",
    badgeColorMap: { Active: "#10b981", Inactive: "#ef4444" },
  },
];

export default function EmployeeTable() {
  return (
    <CustomTable
      data={employees}
      columns={columns}
      showToolbar
      selectionMode="multi"
      striped
      getRowId={(row) => row.id}
    />
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
