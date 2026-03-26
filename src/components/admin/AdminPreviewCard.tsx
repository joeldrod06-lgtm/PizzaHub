import { Card, CardContent } from "@/components/ui/card";

type AdminPreviewCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AdminPreviewCard({
  title,
  description,
  children,
}: AdminPreviewCardProps) {
  return (
    <Card className="rounded-3xl border border-white/8 bg-white/[0.03] py-0 shadow-none">
      <CardContent className="p-6">
        <div className="mb-5">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/45">{description}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
