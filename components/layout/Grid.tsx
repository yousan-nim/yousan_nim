"use client";

import React from "react";

// Utility to combine class names
function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

// Predeclare Tailwind classes so JIT can see them
const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
} as const;

const SPANS = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

const GAP = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  xxl: "gap-10",
} as const;

const GAP_X = {
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
  xxl: "gap-x-10",
} as const;

const GAP_Y = {
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
  xxl: "gap-y-10",
} as const;

export type GridGap = keyof typeof GAP;
export type GridCols = keyof typeof COLS;
export type GridSpan = keyof typeof SPANS;

export interface GridProps<T extends keyof JSX.IntrinsicElements = "div">
  extends React.HTMLAttributes<HTMLElement> {
  as?: T;
  // columns per breakpoint
  cols?: GridCols; // base
  sm?: GridCols;
  md?: GridCols;
  lg?: GridCols;
  xl?: GridCols;
  // spacing
  gap?: GridGap; // overall gap
  gapX?: GridGap; // horizontal
  gapY?: GridGap; // vertical
  // alignment
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "stretch";
}

/**
 * Responsive Grid component using TailwindCSS
 * - Renders a CSS Grid with responsive column counts
 * - Accessible, flexible API; safe-listed classes for Tailwind JIT
 */
export function Grid<
  T extends keyof JSX.IntrinsicElements = "div"
>({
  as,
  cols = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl,
  gap = "md",
  gapX,
  gapY,
  align = "stretch",
  justify = "stretch",
  className,
  children,
  ...rest
}: GridProps<T>) {
  const Component: any = as || "div";

  const baseCols = COLS[cols] ?? COLS[1];
  const smCols = sm ? `sm:${COLS[sm]}` : undefined;
  const mdCols = md ? `md:${COLS[md]}` : undefined;
  const lgCols = lg ? `lg:${COLS[lg]}` : undefined;
  const xlCols = xl ? `xl:${COLS[xl]}` : undefined;

  const gapClass = gap ? GAP[gap] : undefined;
  const gapXClass = gapX ? GAP_X[gapX] : undefined;
  const gapYClass = gapY ? GAP_Y[gapY] : undefined;

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  } as const;

  const justifyMap = {
    start: "justify-items-start",
    center: "justify-items-center",
    end: "justify-items-end",
    stretch: "justify-items-stretch",
  } as const;

  return (
    <Component
      className={cn(
        "grid",
        baseCols,
        smCols,
        mdCols,
        lgCols,
        xlCols,
        // gaps – allow combined or per-axis overrides
        gapX || gapY ? undefined : gapClass,
        gapXClass,
        gapYClass,
        // alignment
        alignMap[align],
        justifyMap[justify],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  span?: GridSpan; // base span
  sm?: GridSpan;
  md?: GridSpan;
  lg?: GridSpan;
  xl?: GridSpan;
}

/**
 * GridItem to control column spans at each breakpoint
 */
export function GridItem({ span = 1, sm, md, lg, xl, className, ...rest }: GridItemProps) {
  const base = SPANS[span] ?? SPANS[1];
  const smC = sm ? `sm:${SPANS[sm]}` : undefined;
  const mdC = md ? `md:${SPANS[md]}` : undefined;
  const lgC = lg ? `lg:${SPANS[lg]}` : undefined;
  const xlC = xl ? `xl:${SPANS[xl]}` : undefined;

  return (
    <div className={cn(base, smC, mdC, lgC, xlC, className)} {...rest} />
  );
}

// Default export for convenience
export default Grid;
