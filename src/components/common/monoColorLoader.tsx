import React, { FC, SVGProps } from "react";
import { DefaultNFCIcon } from "./icons";

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

interface Props{
    size?: number | string;
    color?: string;
    message?: string;
    icon?: FC<IconProps>;
    className?: string;
    containerClassName?: string;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    overlay?: boolean;
}

export default function MonoColorLoader({
  size = 100,
  color = "#b97cff",
  message = "Loading...",
  icon: Icon = DefaultNFCIcon,
  className = "",
  containerClassName = "",
  style = {},
  containerStyle = {},
  overlay = true,
}: Props) {
  const numericSize = typeof size === "string" ? size : `${size}px`;

  return (
    <div
      className={`${overlay ? "fixed" : "absolute"} inset-0 flex z-[99999] items-center justify-center ${
        overlay ? "bg-black/70" : ""
      } ${containerClassName}`}
      style={containerStyle}
    >
      <div className={`flex flex-col items-center gap-3 select-none ${className}`} style={style}>
        <div
          className="relative"
          style={{ width: numericSize, height: numericSize }}
        >
          {/* Outer Pulse Ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: color }}
          />

          {/* Inner rotating border */}
          <div
            className="absolute inset-0 rounded-full border-4 animate-spin"
            style={{ borderColor: color, borderTopColor: "transparent" }}
          />

          {/* Custom icon or default NFC chip */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon color={color} />
          </div>
        </div>

        {/* Loading message */}
        {message && (
          <p className="text-sm font-medium text-center" style={{ color }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
