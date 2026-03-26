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
    <Card className="rounded-3xl border border-white/8 bg-white/[0.02] py-0 shadow-none">
      <CardContent className="p-5 md:p-6">
        <div className="mb-4">
          <h3 className="text-base font-medium text-white md:text-lg">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/40">{description}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
