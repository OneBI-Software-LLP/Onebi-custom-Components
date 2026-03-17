import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const Spinner = ({ size = 24, className, ...props }: SpinnerProps) => {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Spinner }
