"use client";

import * as React from "react";
import type { ToastVariant, ToastPosition } from "@/components/ui/toast";

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
}

interface ToastWithId extends ToastOptions {
  id: string;
}

type ToastState = {
  toasts: ToastWithId[];
};

// Internal state management
let memoryState: ToastState = { toasts: [] };
const listeners = new Set<(state: ToastState) => void>();

function emitChange() {
  listeners.forEach((listener) => listener(memoryState));
}

export const toast = (options: ToastOptions) => {
  const id = options.id || Math.random().toString(36).substring(2, 9);
  const newToast: ToastWithId = { 
    ...options, 
    id, 
    position: options.position || "bottom-right" 
  };

  memoryState = {
    ...memoryState,
    toasts: [newToast, ...memoryState.toasts].slice(0, 5), // Limit to 5 active toasts
  };

  emitChange();

  if (options.duration !== Infinity) {
    setTimeout(() => {
      dismissToast(id);
    }, options.duration || 5000);
  }

  return id;
};

export const dismissToast = (id: string) => {
  memoryState = {
    ...memoryState,
    toasts: memoryState.toasts.filter((t) => t.id !== id),
  };
  emitChange();
};

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismissToast,
  };
}
