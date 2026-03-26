import { AlertCircle, CheckCircle2, Info } from "lucide-react";

type AdminFeedbackTone = "success" | "error" | "info";

export type AdminFeedback = {
  message: string;
  tone: AdminFeedbackTone;
};

type AdminFeedbackBannerProps = {
  feedback: AdminFeedback | null;
};

const toneConfig: Record<
  AdminFeedbackTone,
  {
    title: string;
    wrapper: string;
    iconWrapper: string;
    icon: typeof CheckCircle2;
  }
> = {
  success: {
    title: "Cambios guardados",
    wrapper:
      "border-emerald-500/18 bg-emerald-500/[0.08] text-emerald-50 shadow-[0_18px_50px_-22px_rgba(16,185,129,0.45)]",
    iconWrapper: "bg-emerald-500/14 text-emerald-200",
    icon: CheckCircle2,
  },
  error: {
    title: "No se pudo completar",
    wrapper:
      "border-red-500/18 bg-red-500/[0.08] text-red-50 shadow-[0_18px_50px_-22px_rgba(239,68,68,0.45)]",
    iconWrapper: "bg-red-500/14 text-red-200",
    icon: AlertCircle,
  },
  info: {
    title: "Aviso",
    wrapper:
      "border-white/10 bg-white/[0.04] text-white shadow-[0_18px_50px_-22px_rgba(255,255,255,0.18)]",
    iconWrapper: "bg-white/8 text-white/80",
    icon: Info,
  },
};

export function AdminFeedbackBanner({
  feedback,
}: AdminFeedbackBannerProps) {
  if (!feedback) {
    return null;
  }

  const config = toneConfig[feedback.tone];
  const Icon = config.icon;

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] justify-end md:right-8 md:top-24 md:w-auto">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3.5 backdrop-blur-sm ${config.wrapper}`}
      >
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconWrapper}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">{config.title}</p>
          <p className="mt-1 text-sm leading-6 text-current/80">{feedback.message}</p>
        </div>
      </div>
    </div>
  );
}
