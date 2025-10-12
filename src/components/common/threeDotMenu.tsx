"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { MoreVertical } from "lucide-react";
import { ThreeDotMenuOption, ThreeDotMenuProps } from "@/src/lib/interface";

type ExtraPlacementProps = {
  /** Optional scroll container; used to compute available space for auto drop-up */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Enable/disable auto placement (drop-up when not enough space below) */
  autoPlacement?: boolean;
};

export default function ThreeDotMenu({
  options,
  visible,
  onOpenChange,
  icon,
  triggerClassName = "",
  iconClassName = "",
  menuClassName = "",
  closeOnSelect = true,
  // 👇 Added props (safe defaults)
  containerRef,
  autoPlacement = true,
}: ThreeDotMenuProps & ExtraPlacementProps) {
  // Uncontrolled state if `visible` not provided
  const [internalOpen, setInternalOpen] = useState(false);
  const open = typeof visible === "boolean" ? visible : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (typeof visible !== "boolean") setInternalOpen(next);
      onOpenChange?.(next);
    },
    [visible, onOpenChange]
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  btnRefs.current = [];

  // 👇 New: menu ref + drop-up state
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [dropUp, setDropUp] = useState(false);

  const focusItem = (idx: number) => {
    const btn = btnRefs.current[idx];
    if (btn) btn.focus();
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  // 👇 New: auto placement (decide drop-up vs drop-down)
  useEffect(() => {
    if (!open || !autoPlacement) return;

    const container =
      containerRef?.current ??
      (document.scrollingElement as HTMLElement) ??
      document.body;

    const triggerEl = rootRef.current;
    const menuEl = menuRef.current;

    if (!triggerEl || !container) return;

    // Compute rects relative to viewport
    const triggerRect = triggerEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // If menu already rendered, use its actual height; otherwise assume a safe default
    const menuHeight = (menuEl?.offsetHeight ?? 160) + 8; // +8 for gap

    // Available space *inside the container* below/above the trigger
    const spaceBelow = containerRect.bottom - triggerRect.bottom;
    const spaceAbove = triggerRect.top - containerRect.top;

    // Decide placement
    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      setDropUp(true);
    } else {
      setDropUp(false);
    }
  }, [open, autoPlacement, containerRef]);

  // Keyboard interactions on trigger + menu
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
      // Focus first item when opening via keyboard
      if (!open) setTimeout(() => focusItem(0), 0);
    }
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
      e.preventDefault();
      setOpen(true);
      setTimeout(
        () => focusItem(e.key === "ArrowDown" ? 0 : options.length - 1),
        0
      );
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    const currentIndex = btnRefs.current.findIndex(
      (b) => b === document.activeElement
    );

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (currentIndex + 1) % options.length;
      focusItem(next);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (currentIndex - 1 + options.length) % options.length;
      focusItem(prev);
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      focusItem(options.length - 1);
    }
  };

  const handleSelect = (opt: ThreeDotMenuOption) => {
    if (opt.disabled) return;
    opt.onClick?.();
    if (closeOnSelect) setOpen(false);
  };

  const triggerIcon = useMemo(() => icon || <MoreVertical size={18} />, [icon]);

  return (
    <div
      className={`relative shrink-0 ${triggerClassName}`}
      onClick={(e) => e.stopPropagation()}
      ref={rootRef}
    >
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        className={`text-gray-400 cursor-pointer focus:outline-none ${iconClassName}`}
      >
        {triggerIcon}
      </div>

      {/* Popup */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={onMenuKeyDown}
          // 👇 Switch between drop-down and drop-up using tailwind utilities
          className={`absolute right-0 ${
            dropUp ? "bottom-full mb-2" : "mt-2"
          } bg-[#1D1D1D] rounded-lg shadow-lg z-10 w-40 ${menuClassName}`}
        >
          {options.map((opt, idx) => (
            <button
              key={`${opt.label}-${idx}`}
              ref={(el: any) => (btnRefs.current[idx] = el)}
              role="menuitem"
              type="button"
              disabled={opt.disabled}
              onClick={() => handleSelect(opt)}
              className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#3a3a3a] w-full text-gray-300 ${
                opt.className || ""
              } ${opt.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {opt.icon ? (
                <span className="inline-flex items-center">{opt.icon}</span>
              ) : null}
              <span className="truncate">
                <abbr title={opt.label} className="no-underline">
                  {opt.label}
                </abbr>
              </span>
              {opt.isPro && (
                <span
                  className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
               text-transparent bg-clip-text text-[8px] font-bold uppercase 
               tracking-wider px-1 shrink-0 select-none"
                >
                  PRO
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
