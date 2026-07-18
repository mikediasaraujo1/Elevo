import { cn } from "@/lib/utils/cn";

interface ButtonGoldProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function ButtonGold({
  children,
  className,
  fullWidth = false,
  type = "button",
  ...props
}: ButtonGoldProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-[10px] border-none bg-[linear-gradient(135deg,#C4920A_0%,#E0B84A_100%)] px-7 py-3 font-bold text-[#0A0A0F] transition-all duration-200",
        "hover:brightness-[1.08] hover:shadow-[0_4px_20px_rgba(196,146,10,0.35)]",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 disabled:hover:shadow-none disabled:active:scale-100",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
