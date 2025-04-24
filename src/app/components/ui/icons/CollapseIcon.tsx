interface CollapseIconProps {
  isCollapsed: boolean;
}

export function CollapseIcon({ isCollapsed }: CollapseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={
          isCollapsed
            ? "M13 5l7 7-7 7M5 5l7 7-7 7"
            : "M11 19l-7-7 7-7M19 19l-7-7 7-7"
        }
      />
    </svg>
  );
} 