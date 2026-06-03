"use client";

import { createContext, useContext, useRef, forwardRef } from "react";
import type { ReactNode } from "react";

import AddLinkModal from "@/app/dashboard/_components/add-link-modal";

type ModalContextType = {
  openAddLink: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <ModalContext.Provider
      value={{ openAddLink: () => dialogRef.current?.showModal() }}
    >
      {children}
      <AddLinkModal ref={dialogRef} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used inside <ModalProvider>");
  }
  return ctx;
}
