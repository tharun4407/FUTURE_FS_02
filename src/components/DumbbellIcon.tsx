const DumbbellIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6.5 6.5h11" />
    <path d="M6.5 17.5h11" />
    <path d="M6.5 6.5v11" />
    <path d="M17.5 6.5v11" />
    <path d="M4 8v8" />
    <path d="M20 8v8" />
    <path d="M2 9.5v5" />
    <path d="M22 9.5v5" />
    <path d="M12 6.5v-2" />
    <path d="M12 19.5v-2" />
  </svg>
);

export default DumbbellIcon;
