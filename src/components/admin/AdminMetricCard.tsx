import { Card, CardContent } from "@/components/ui/card";

type AdminMetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function AdminMetricCard({
  label,
  value,
  helper,
}: AdminMetricCardProps) {
  return (
    <Card className="rounded-3xl border border-white/8 bg-white/[0.02] py-0 shadow-none">
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">{label}</p>
        <p className="mt-3 text-3xl font-light text-white">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/30">{helper}</p>
      </CardContent>
    </Card>
  );
}
