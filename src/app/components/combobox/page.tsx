"use client";

import React from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

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

export default function ComboboxPage() {
  const frameworks = [
    { value: "next.js", label: "Next.js", icon: "▲" },
    { value: "sveltekit", label: "SvelteKit", icon: "◆" },
    { value: "nuxt.js", label: "Nuxt.js", icon: "◆" },
    { value: "remix", label: "Remix", icon: "◆" },
    { value: "astro", label: "Astro", icon: "◆" },
  ];

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Combobox
            </h2>
            <p className="text-lg text-slate-500">
              Searchable dropdown with autocomplete functionality.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 max-w-xl">
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Basic Combobox
              </Label>
              <Command className="rounded-lg border border-slate-200 shadow-sm">
                <CommandInput placeholder="Search framework..." className="h-12" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        className="cursor-pointer"
                      >
                        <span className="mr-2">{framework.icon}</span>
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <Separator className="bg-slate-100" />
            <div className="space-y-4">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                With Selection State
              </Label>
              <Command className="rounded-lg border border-slate-200 shadow-sm">
                <CommandInput placeholder="Select framework..." className="h-12" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{framework.icon}</span>
                          {framework.label}
                        </div>
                        <Check className="h-4 w-4 text-indigo-600" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            <CodeBlock
              code={`import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "onebi-ui";
import { Check } from "lucide-react";

export default function ComboboxDemo() {
  const [selected, setSelected] = useState("");

  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              value={item.value}
              onSelect={setSelected}
            >
              <Check
                className={cn(
                  selected === item.value ? "opacity-100" : "opacity-0"
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
