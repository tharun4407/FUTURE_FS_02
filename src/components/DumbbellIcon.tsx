const DumbbellIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    {/* Crossed dumbbells like GymKart logo */}
    {/* Dumbbell 1 - diagonal top-left to bottom-right */}
    <rect x="3" y="6" width="4" height="3" rx="1" transform="rotate(-45 5 7.5)" />
    <rect x="6" y="9" width="2" height="10" rx="0.5" transform="rotate(-45 7 14)" />
    <rect x="18" y="21" width="2" height="10" rx="0.5" transform="rotate(-45 19 26)" />
    <rect x="25" y="23" width="4" height="3" rx="1" transform="rotate(-45 27 24.5)" />
    {/* Simplified crossed dumbbell shapes */}
    <path d="M7.5 2.5L4 6l1.5 1.5L9 4 7.5 2.5z" />
    <path d="M12 7L5.5 13.5 7 15l6.5-6.5L12 7z" />
    <path d="M25 18l-6.5 6.5L20 26l6.5-6.5L25 18z" />
    <path d="M28 24.5L24.5 28 26 29.5 29.5 26 28 24.5z" />
    {/* Dumbbell 2 - diagonal top-right to bottom-left */}
    <path d="M24.5 2.5L28 6l-1.5 1.5L23 4l1.5-1.5z" />
    <path d="M20 7l6.5 6.5L25 15l-6.5-6.5L20 7z" />
    <path d="M7 18l6.5 6.5L12 26 5.5 19.5 7 18z" />
    <path d="M4 24.5L7.5 28 6 29.5 2.5 26 4 24.5z" />
    {/* Center connection */}
    <circle cx="16" cy="16" r="2.5" />
  </svg>
);

export default DumbbellIcon;
