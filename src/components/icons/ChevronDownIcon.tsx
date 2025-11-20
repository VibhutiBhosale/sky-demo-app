type ChevronDownIconProps = {
  className?: string;
};
export default function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      data-test-id="masthead-chevron-down-linear-icon"
      aria-hidden="true"
      className={`chevron chevron--down ${className || ""}`}
      fill="#4a4a4a"
    >
      <g>
        <path
          d="M16.535 20.909a1 1 0 0 1-1.414 0l-8.828-8.828a1 1 0 0 1 0-1.414L6.96 10l8.868 8.869L24.697 10l.667.667a1 1 0 0 1 0 1.414z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}
