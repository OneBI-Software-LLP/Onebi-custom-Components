"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Toast, ToastViewport, type ToastPosition } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

/**
 * Toaster - Global component to render all active toasts grouped by position.
 */
export function Toaster() {
  const { toasts, dismissToast } = useToast();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const positions: ToastPosition[] = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
    "top-center",
    "bottom-center",
  ];

  const content = (
    <>
      {positions.map((position) => {
        const toastsInPosition = toasts.filter((t) => (t.position || "bottom-right") === position);
        if (toastsInPosition.length === 0) return null;

        return (
          <ToastViewport key={position} position={position}>
            {toastsInPosition.map(({ id, ...props }) => (
              <Toast 
                key={id} 
                id={id}
                onClose={() => dismissToast(id)}
                {...props} 
              />
            ))}
          </ToastViewport>
        );
      })}
    </>
  );

  return createPortal(content, document.body);
}
