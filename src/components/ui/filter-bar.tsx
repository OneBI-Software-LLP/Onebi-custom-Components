"use client"

import * as React from "react"
import { PlusCircle, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface FilterOption {
  label: string
  value: string
  options?: { label: string; value: string }[]
}

export interface FilterBarProps {
  filters: FilterOption[]
  activeFilters: Record<string, any>
  onFilterChange: (key: string, value: any) => void
  onClearFilters: () => void
}

export function FilterBar({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = React.useState("")

  const activeCount = Object.keys(activeFilters).length

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-background p-2">
      <div className="flex items-center gap-2 px-2 py-1">
        <Input
          placeholder="Search..."
          className="h-8 w-[150px] lg:w-[250px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.value}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircle className="mr-2 h-4 w-4" />
                {filter.label}
                {activeFilters[filter.value] && (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                    >
                      {activeFilters[filter.value].length}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {activeFilters[filter.value].length > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal"
                        >
                          {activeFilters[filter.value].length} selected
                        </Badge>
                      ) : (
                        filter.options
                          ?.filter((option) =>
                            activeFilters[filter.value].includes(option.value)
                          )
                          .map((option) => (
                            <Badge
                              variant="secondary"
                              key={option.value}
                              className="rounded-sm px-1 font-normal"
                            >
                              {option.label}
                            </Badge>
                          ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {filter.options?.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    const currentValues = activeFilters[filter.value] || []
                    const newValues = currentValues.includes(option.value)
                      ? currentValues.filter((v: any) => v !== option.value)
                      : [...currentValues, option.value]
                    onFilterChange(filter.value, newValues)
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      activeFilters[filter.value]?.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <svg
                      className={cn("h-4 w-4")}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
        {activeCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
