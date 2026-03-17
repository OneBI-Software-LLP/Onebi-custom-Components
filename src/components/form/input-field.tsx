"use client"

import * as React from "react"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputFieldProps extends InputProps {
  label?: string
  description?: string
  error?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, description, error, className, ...props }, ref) => {
    return (
      <FormItem className={cn("w-full", className)}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input ref={ref} {...props} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage>{error}</FormMessage>
      </FormItem>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
