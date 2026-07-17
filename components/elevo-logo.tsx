export function ElevoLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="37"
      viewBox="0 0 100 115"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="50,4 96,28.5 96,86.5 50,111 4,86.5 4,28.5"
        fill="#C4920A"
      />
      <rect x="24" y="73" width="53" height="11" rx="3" fill="#F7F2EA" />
      <rect x="24" y="53" width="39" height="11" rx="3" fill="#F7F2EA" />
      <rect x="24" y="33" width="25" height="11" rx="3" fill="#F7F2EA" />
    </svg>
  );
}
