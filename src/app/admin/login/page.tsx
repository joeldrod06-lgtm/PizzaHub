import { Suspense } from "react";

import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4 py-10">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-3xl border border-white/8 bg-white/[0.03] p-6 text-sm text-white/60 md:p-8">
            Cargando acceso admin...
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
