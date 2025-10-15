"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef, useCallback } from "react";

export type ModalProps = {
  visible?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  backdropClassName?: string;
  children?: React.ReactNode;
};

export default function Modal({
  visible = false,
  onClose,
  title,
  headerContent,
  footerContent,
  showHeader = false,
  showFooter = false,
  stickyHeader = true,
  stickyFooter = true,
  closeOnBackdrop = true,
  className = "",
  backdropClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Prevent background scroll when visible
  useEffect(() => {
    if (!visible) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [visible]);

  // ESC to close
  // const onKeyDown = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (!visible) return;
  //     if (e.key === "Escape") {
  //       onClose?.();
  //     }
  //   },
  //   [visible, onClose]
  // );

  // useEffect(() => {
  //   if (!visible) return;
  //   document.addEventListener("keydown", onKeyDown);
  //   // Focus the close button (simple focus management)
  //   closeBtnRef.current?.focus();
  //   return () => document.removeEventListener("keydown", onKeyDown);
  // }, [visible, onKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    // only close if the click originated on the backdrop (not on the panel)
    if (e.target === e.currentTarget) onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8 ${backdropClassName}`}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "dynamic-modal-title" : undefined}
      onMouseDown={handleBackdropClick}
      // Backdrop
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      {/* Modal Panel */}
      <div
        ref={panelRef}
        className={`relative w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl rounded-xl bg-[#1D1D1D] text-[#FFFFFF] shadow-2xl outline-none flex flex-col max-h-[85vh] ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showHeader && (
          <div
            className={`flex items-center gap-3 ${
              stickyHeader ? "sticky top-0" : ""
            } rounded-t-xl bg-[#1D1D1D] backdrop-blur supports-[backdrop-filter]:bg-[#1D1D1D] border-b border-gray-500 px-4 sm:px-6 py-3 ${headerClassName}`}
          >
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="dynamic-modal-title"
                  className="font-semibold text-base sm:text-lg md:text-xl truncate"
                >
                  {title}
                </h2>
              )}
              {headerContent && (
                <div className="mt-1 text-sm text-gray-600">
                  {headerContent}
                </div>
              )}
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full group"
            >
              <X className="h-5 w-5 group-hover:scale-110" onClick={onClose}/>
            </button>
          </div>
        )}

        {/* Body (scrollable area) */}
        <div className={`flex-1 overflow-y-auto px-4 sm:px-6 py-4 ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div
            className={`${
              stickyFooter ? "sticky bottom-0" : ""
            } rounded-b-xl bg-[#1D1D1D] backdrop-blur supports-[backdrop-filter]:bg-[#1D1D1D] border-b border-gray-500 px-4 sm:px-6 py-3 ${footerClassName}`}
          >
            {footerContent ?? (
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                  Confirm
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
