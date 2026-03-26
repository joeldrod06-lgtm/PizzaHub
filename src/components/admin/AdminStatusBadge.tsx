import { cn } from "@/lib/utils";

type AdminStatusBadgeProps = {
  tone: "orange" | "green" | "blue" | "neutral";
  label: string;
};

const toneStyles: Record<AdminStatusBadgeProps["tone"], string> = {
  orange: "border-orange-500/20 bg-orange-500/10 text-orange-300",
  green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  blue: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  neutral: "border-white/10 bg-white/5 text-white/60",
};

export function AdminStatusBadge({ tone, label }: AdminStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide",
        toneStyles[tone]
      )}
    >
      {label}
    </span>
  );
}
