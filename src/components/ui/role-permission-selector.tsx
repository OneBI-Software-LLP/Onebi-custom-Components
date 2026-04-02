"use client"

import * as React from "react"
import { Check, Shield, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface Permission {
  id: string
  name: string
  description: string
  category: string
}

export interface Role {
  id: string
  name: string
  permissions: string[] // Permission IDs
}

interface RolePermissionSelectorProps {
  permissions: Permission[]
  roles: Role[]
  onPermissionToggle: (roleId: string, permissionId: string) => void
  disabled?: boolean
}

export function RolePermissionSelector({
  permissions,
  roles,
  onPermissionToggle,
  disabled = false,
}: RolePermissionSelectorProps) {
  // Group permissions by category
  const categories = Array.from(
    new Set(permissions.map((p) => p.category))
  )

  return (
    <div className="space-y-8 rounded-md border p-4 bg-background">
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </h4>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Permission</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id} className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-medium">{role.name}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions
                .filter((p) => p.category === category)
                .map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{permission.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {permission.description}
                        </span>
                      </div>
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={role.permissions.includes(permission.id)}
                            onChange={() =>
                              onPermissionToggle(role.id, permission.id)
                            }
                            disabled={disabled}
                          />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
