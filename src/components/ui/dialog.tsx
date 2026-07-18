"use client";

import { X } from "lucide-react";
import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current
      ?.querySelector<HTMLElement>("button:not([disabled]), a[href]")
      ?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
    )];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="icon-button dialog-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <X aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
        <h2 id="dialog-title">{title}</h2>
        {description ? <p id="dialog-description">{description}</p> : null}
        {children}
      </div>
    </div>,
    document.body,
  );
}
