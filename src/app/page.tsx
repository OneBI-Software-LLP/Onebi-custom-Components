"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CustomTable } from "@/components/CustomTable";
import { ColumnDef, SortingState } from "@/components/CustomTable/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CommandPalette } from "@/components/ui/command-palette";
import { FilterBar, type FilterOption } from "@/components/ui/filter-bar";
import { RolePermissionSelector, type Role, type Permission } from "@/components/ui/role-permission-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { 
  PlusCircle, 
  Shield, 
  LayoutDashboard, 
  Type, 
  SquareCheck, 
  Layers, 
  ListFilter, 
  Calendar as CalendarIcon, 
  Table as TableIcon, 
  Zap,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock Data Generation ────────────────────────────────────────────────────────
interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string[];
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
  loginCount: number;
  avatar: string;
}

const generateMockData = (count: number): UserRow[] => {
  const roles = ["Admin", "User", "Editor", "Viewer"];
  const statuses = ["Active", "Inactive", "Pending"] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 4 === 0 ? ["Admin", "Manager", "Editor"] : [roles[i % roles.length]],
    status: statuses[i % statuses.length],
    joinedDate: new Date(2023, 0, 1 + (i % 365)).toISOString(),
    loginCount: Math.floor(Math.random() * 500),
    avatar: `https://i.pravatar.cc/150?u=${i + 1}`
  }));
};

const ALL_MOCK_DATA = generateMockData(200);

// ── Navigation Categories ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    category: "Foundation",
    items: [
      { id: 'button', name: 'Buttons', icon: Zap },
      { id: 'badge-avatar', name: 'Badge & Avatar', icon: Layers },
    ]
  },
  {
    category: "Forms & Inputs",
    items: [
      { id: 'input', name: 'Input Fields', icon: Type },
      { id: 'select-form', name: 'Select & Multi', icon: SquareCheck },
      { id: 'date-picker', name: 'Date Picker', icon: CalendarIcon },
    ]
  },
  {
    category: "Layout & Data",
    items: [
      { id: 'tabs', name: 'Tabs', icon: LayoutDashboard },
      { id: 'dialog-sheet', name: 'Modals & Drawers', icon: Shield },
      { id: 'table', name: 'Data Table', icon: TableIcon },
    ]
  },
  {
    category: "Advanced",
    items: [
      { id: 'advanced', name: 'Onebi Advanced', icon: ListFilter },
    ]
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('button');
  
  // Table State
  const [data, setData] = useState<UserRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState[]>([]);
  const [theme, setTheme] = useState<"light" | "dark" | "minimal">("light");
  const [density, setDensity] = useState<"standard" | "compact" | "comfortable">("standard");
  const [striped, setStriped] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Advanced Components State
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const filterOptions: FilterOption[] = [
    { label: "Status", value: "status", options: [{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }] },
    { label: "Role", value: "role", options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] }
  ]

  const permissions: Permission[] = [
    { id: "read", name: "Read", description: "Can read data", category: "Access" },
    { id: "write", name: "Write", description: "Can write data", category: "Access" },
    { id: "delete", name: "Delete", description: "Can delete data", category: "Access" },
  ]
  const roles: Role[] = [
    { id: "admin", name: "Administrator", permissions: ["read", "write", "delete"] },
    { id: "user", name: "Regular User", permissions: ["read"] }
  ]

  const fetchData = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    let filtered = [...ALL_MOCK_DATA];
    if (search) {
      filtered = filtered.filter(row => 
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      filtered.sort((a, b) => {
        const valA = a[id as keyof UserRow];
        const valB = b[id as keyof UserRow];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return desc ? valB.localeCompare(valA) : valA.localeCompare(valB);
        }
        if (valA < valB) return desc ? 1 : -1;
        if (valA > valB) return desc ? -1 : 1;
        return 0;
      });
    }
    const start = (page - 1) * pageSize;
    setData(filtered.slice(start, start + pageSize));
    setTotalRows(filtered.length);
    setLoading(false);
  }, [page, pageSize, search, sorting]);

  useEffect(() => {
    if (activeTab === 'table') fetchData();
  }, [fetchData, activeTab]);

  const columns: ColumnDef<UserRow>[] = [
    { id: "id", header: "ID", accessorKey: "id", width: 80, pin: "left" },
    { id: "name", header: "Name", accessorKey: "name", accessorSubKey: "email", accessorAvatarKey: "avatar", sortable: true, width: 250 },
    { id: "status", header: "Status", accessorKey: "status", type: "badge" },
    { id: "loginCount", header: "Logins", accessorKey: "loginCount", type: "number", align: "right" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'button':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Buttons</h2>
              <p className="text-lg text-slate-500">High-performance interactors with dynamic variants.</p>
            </div>
            <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Variants</Label>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <Separator className="bg-slate-100" />
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Sizes & States</Label>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon" className="rounded-full"><PlusCircle className="h-4 w-4" /></Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'input':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Input & Form</h2>
              <p className="text-lg text-slate-500">Semantic form layout with custom styled inputs.</p>
            </div>
            <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-2xl">
              <div className="grid gap-2.5">
                <Label htmlFor="email-demo" className="text-sm font-bold text-slate-700">Email Address</Label>
                <Input id="email-demo" placeholder="hello@onebi.ui" type="email" className="rounded-xl h-11 border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="bio-demo" className="text-sm font-bold text-slate-700">Biography</Label>
                <Textarea id="bio-demo" placeholder="Tell us about yourself..." className="rounded-xl min-h-[120px] border-slate-200 focus:ring-4 focus:ring-indigo-100 transition-all" />
              </div>
              <div className="flex items-center space-x-3 p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <Checkbox id="terms-demo" className="h-5 w-5 rounded-md border-2 border-slate-300" />
                <Label htmlFor="terms-demo" className="cursor-pointer text-sm font-medium text-slate-600">I accept the high-quality terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-3 p-5 border border-slate-100 rounded-2xl bg-slate-50/50 justify-between">
                <div className="space-y-0.5">
                   <Label htmlFor="airplane-demo" className="cursor-pointer text-sm font-bold text-slate-700">Modern Switch</Label>
                   <p className="text-xs text-slate-400">Toggle system-wide airplane mode state.</p>
                </div>
                <Switch id="airplane-demo" />
              </div>
            </div>
          </div>
        )

      case 'badge-avatar':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Badge & Avatar</h2>
              <p className="text-lg text-slate-500">Small components, big impact on identity and status.</p>
            </div>
            <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">Status Tags</Label>
                <div className="flex gap-3 flex-wrap">
                  <Badge className="px-3 py-1 bg-indigo-500 text-white border-none shadow-md shadow-indigo-100">Live Component</Badge>
                  <Badge variant="secondary" className="px-3 py-1">Drafting</Badge>
                  <Badge variant="outline" className="px-3 py-1 text-slate-500 border-slate-200">Deprecated</Badge>
                  <Badge variant="destructive" className="px-3 py-1 border-none shadow-md shadow-red-100">System Error</Badge>
                </div>
              </div>
              <Separator className="bg-slate-100" />
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">User Identity</Label>
                <div className="flex gap-10 items-center">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-[3px] border-white ring-4 ring-indigo-50 shadow-lg">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                       <span className="font-bold text-slate-900">Shadcn</span>
                       <span className="text-xs text-slate-400 italic leading-none">@shadcnui</span>
                    </div>
                  </div>
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <Avatar key={i} className="h-12 w-12 border-2 border-white shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i+10}`} />
                        <AvatarFallback className="bg-slate-200">U</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="h-12 w-12 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-500 z-10 shadow-sm">+12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'tabs':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Navigation Tabs</h2>
              <p className="text-lg text-slate-500">Semantic container for multi-view content switches.</p>
            </div>
            <div className="p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="bg-slate-100/50 p-1.5 h-auto gap-1 rounded-2xl border border-slate-100">
                  <TabsTrigger value="performance" className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">Productivity</TabsTrigger>
                  <TabsTrigger value="billing" className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">Team Usage</TabsTrigger>
                  <TabsTrigger value="settings" className="px-6 py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600">API Access</TabsTrigger>
                </TabsList>
                <div className="mt-8 p-8 border border-slate-100 rounded-[1.5rem] bg-slate-50/30">
                  <TabsContent value="performance">
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold text-slate-800">Performance Metrics</h4>
                       <p className="text-slate-500 leading-relaxed">Our advanced tracking system ensures all productivity cycles are monitored in real-time with zero latency across all regions.</p>
                       <div className="grid grid-cols-3 gap-4 mt-6">
                          {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse" />)}
                       </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="billing">
                    <div className="space-y-2 py-4">
                      <p className="text-sm font-medium text-slate-600 text-center italic">Team usage data is currentely syncing with the cloud.</p>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </TabsContent>
                  <TabsContent value="settings">
                    <div className="space-y-4">
                       <h4 className="text-xl font-bold text-slate-800">Access Control</h4>
                       <p className="text-slate-500 text-sm">Generate and rotate your secure API keys here.</p>
                       <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:border-indigo-400">
                         Generate New Key
                         <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                       </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        )

      case 'select-form':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Selection Engine</h2>
              <p className="text-lg text-slate-500">Intelligent UI for single and multi-value data selection.</p>
            </div>
            <div className="grid gap-10 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-xl">
              <div className="space-y-3">
                <Label className="text-sm font-black text-slate-800 tracking-tight">Main Framework</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 shadow-sm focus:ring-4 focus:ring-indigo-50">
                    <SelectValue placeholder="Choose your primary library" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                    <SelectItem value="next">Next.js 14 (App Router)</SelectItem>
                    <SelectItem value="react">React (Vite)</SelectItem>
                    <SelectItem value="remix">Remix Run</SelectItem>
                    <SelectItem value="astro">Astro Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-slate-50" />
              <div className="space-y-3">
                <Label className="text-sm font-black text-slate-800 tracking-tight">Technology Stack</Label>
                <MultiSelect
                  options={[
                    { label: "Typescript 5.x", value: "ts" },
                    { label: "Tailwind CSS", value: "tw" },
                    { label: "Prisma ORM", value: "pr" },
                    { label: "PostgreSQL", value: "db" },
                    { label: "Redis Cache", value: "rc" },
                  ]}
                  selected={[]}
                  onChange={() => {}}
                />
                <p className="text-[10px] text-slate-400 font-medium">You can select up to 8 technologies for your project profile.</p>
              </div>
            </div>
          </div>
        )

      case 'date-picker':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Date & Time</h2>
              <p className="text-lg text-slate-500">Clean, precise calendar picker with standard date formatting.</p>
            </div>
            <div className="p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-sm">
              <div className="space-y-4">
                <Label className="text-sm font-black text-slate-800 tracking-tight">Schedule Launch</Label>
                <DatePicker date={new Date()} setDate={() => {}} />
                <p className="text-[11px] text-slate-400 leading-tight">Selection will automatically lock the date for global distribution scheduling.</p>
              </div>
            </div>
          </div>
        )

      case 'dialog-sheet':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Dialog Art</h2>
              <p className="text-lg text-slate-500">Overlays and drawers that feel organic and fluid.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-14 px-8 rounded-2xl bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200 flex-1">
                    Launch System Modal
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-10">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black text-slate-900">Advanced Setup</DialogTitle>
                    <DialogDescription className="text-slate-500">
                      Customize your environment settings before initializing the core engine.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5">
                    <div className="grid gap-1.5">
                      <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace ID</Label>
                      <Input placeholder="onebi-prod-01" className="bg-slate-50 border-transparent focus:bg-white focus:border-indigo-200 transition-all rounded-xl" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Access Protocol</Label>
                      <Select defaultValue="ssl">
                        <SelectTrigger className="bg-slate-50 border-transparent transition-all rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl"><SelectItem value="ssl">Secure Socket (SSL)</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-10 sm:justify-start gap-3">
                    <Button type="submit" className="rounded-xl h-11 px-8 bg-indigo-600 hover:bg-indigo-700">Initialize</Button>
                    <Button variant="ghost" className="rounded-xl h-11 text-slate-400">Later</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 flex-1">
                    Open Inspector Panel
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[450px] border-l-border/30 shadow-2xl p-0">
                  <div className="h-full flex flex-col p-10 bg-white">
                    <SheetHeader className="mb-10 text-left">
                      <SheetTitle className="text-3xl font-black text-slate-900 tracking-tighter">Panel Engine</SheetTitle>
                      <SheetDescription className="text-slate-400">Real-time inspection of your current component tree.</SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 space-y-8">
                       <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                          <Label className="text-xs font-black text-slate-500 block mb-4">SYSTEM STATUS</Label>
                          <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200" />
                             <span className="text-sm font-bold text-slate-700">All modules optimized</span>
                          </div>
                       </div>
                       <Separator className="bg-slate-100" />
                       <div className="space-y-6">
                         <div className="flex items-center justify-between">
                            <Label className="text-sm font-bold text-slate-800">Debug Mode</Label>
                            <Switch />
                         </div>
                         <div className="flex items-center justify-between">
                            <Label className="text-sm font-bold text-slate-800">Auto-Refresh</Label>
                            <Switch defaultChecked />
                         </div>
                       </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        )

      case 'table':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Data Architecture</h2>
              <p className="text-lg text-slate-500">Virtualization-ready table for complex datasets.</p>
            </div>
            <div className="border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-100 overflow-hidden">
               <div style={{ height: '600px' }}>
                <CustomTable<UserRow>
                  data={data}
                  columns={columns}
                  loading={loading}
                  serverSide={true}
                  totalRows={totalRows}
                  page={page}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  onSearchChange={setSearch}
                  onSortChange={setSorting}
                  theme={theme as any}
                  density={density as any}
                  striped={striped}
                  selectionMode="multi"
                  selectedRows={selectedRows}
                  onSelectionChange={setSelectedRows}
                  stickyHeader={true}
                />
              </div>
            </div>
          </div>
        )

      case 'advanced':
        return (
          <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Advanced UI</h2>
              <p className="text-lg text-slate-500">Enterprise-grade patterns for high-density applications.</p>
            </div>
            
            <div className="grid gap-12">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-800">Omni Search</h3>
                  <Badge className="bg-indigo-600 text-white border-none text-[10px] font-bold uppercase tracking-widest px-2">Global UI</Badge>
                </div>
                <div className="p-12 border border-slate-200 rounded-[3rem] bg-white shadow-xl shadow-slate-100/60 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-transparent pointer-events-none" />
                  <div className="relative text-center max-w-md mx-auto space-y-6">
                     <div className="w-16 h-16 bg-white rounded-2xl shadow-inner border border-slate-100 mx-auto flex items-center justify-center text-2xl">⌨️</div>
                     <div className="space-y-2">
                        <p className="text-xl font-bold text-slate-900 tracking-tight">The Command Palette</p>
                        <p className="text-sm text-slate-400">A central hub for navigation, actions, and search. Fully accessible and themeable.</p>
                     </div>
                     <div className="flex items-center justify-center gap-2">
                        <kbd className="px-3 py-1.5 bg-slate-900 text-slate-100 rounded-lg text-xs font-black shadow-lg">CTRL</kbd>
                        <span className="text-slate-300 font-black">+</span>
                        <kbd className="px-3 py-1.5 bg-slate-900 text-slate-100 rounded-lg text-xs font-black shadow-lg">K</kbd>
                     </div>
                     <div className="pt-4">
                        <CommandPalette />
                     </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-2xl font-black text-slate-800">Multivariate Filtering</h3>
                <FilterBar
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={(k, v) => setActiveFilters(prev => ({ ...prev, [k]: v }))}
                  onClearFilters={() => setActiveFilters({})}
                />
              </section>

              <section className="space-y-6">
                <h3 className="text-2xl font-black text-slate-800">RBAC Management</h3>
                <div className="border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-100/60 overflow-hidden">
                  <RolePermissionSelector
                    permissions={permissions}
                    roles={roles}
                    onPermissionToggle={() => {}}
                  />
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-800">Skeleton Flow</h3>
                  <div className="p-8 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-100/60 space-y-6">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-14 w-14 rounded-2xl bg-slate-100" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-[220px] bg-slate-100" />
                        <Skeleton className="h-4 w-[160px] bg-slate-50" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <Skeleton className="h-4 w-full bg-slate-50" />
                       <Skeleton className="h-4 w-full bg-slate-50" />
                       <Skeleton className="h-4 w-4/5 bg-slate-50" />
                    </div>
                    <Skeleton className="h-40 w-full rounded-2xl bg-slate-100" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-800">Semantic Empty States</h3>
                  <EmptyState
                    icon={Shield}
                    title="No Security Logs"
                    description="We haven't detected any security anomalies in your environment for the last 30 days."
                    actionLabel="View Audit Policy"
                    onAction={() => {}}
                    className="p-12 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-100/60 min-h-0 h-full border-dashed border-2"
                  />
                </div>
              </section>
            </div>
          </div>
        )

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Sidebar */}
      <aside className="w-[340px] bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Sidebar Header */}
        <div className="p-10 pb-8">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-all duration-300">
              O
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight leading-none text-slate-900">Onebi UI</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Enterprise v1.2
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-6 space-y-8 overflow-y-auto scrollbar-hide py-4">
          {NAV_ITEMS.map((section) => (
            <div key={section.category} className="space-y-1.5">
              <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-300 mb-3">
                {section.category}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 group",
                      activeTab === item.id 
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1" 
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-1"
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={cn(
                        "p-2 rounded-xl transition-colors",
                        activeTab === item.id ? "bg-white/10" : "bg-slate-50 group-hover:bg-white"
                      )}>
                        <item.icon className={cn(
                          "h-4 w-4",
                          activeTab === item.id ? "text-indigo-300" : "text-slate-400 group-hover:text-indigo-500"
                        )} />
                      </div>
                      {item.name}
                    </div>
                    {activeTab === item.id && (
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-8 mt-auto">
          <div className="p-6 bg-slate-950 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-3">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Cloud</span>
               </div>
               <p className="text-xs font-bold text-slate-400 leading-relaxed">Your design system is synced with the production CDN.</p>
               <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-white hover:text-indigo-400 no-underline transition-colors">
                 Check Updates →
               </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 lg:p-24 overflow-y-auto scroll-smooth">
        <div className="max-w-5xl mx-auto pb-24">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
