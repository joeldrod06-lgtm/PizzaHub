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
    <Card className="rounded-3xl border border-white/8 bg-white/[0.03] py-0 shadow-none">
      <CardContent className="p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">{label}</p>
        <p className="mt-4 text-3xl font-light text-white">{value}</p>
        <p className="mt-2 text-sm text-white/45">{helper}</p>
      </CardContent>
    </Card>
  );
}
