"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400/70">
        PizzaHub
      </p>
      <h1 className="mt-3 text-3xl font-light text-white">Acceso admin</h1>
      <p className="mt-3 text-sm leading-6 text-white/50">
        Inicia sesión con un usuario registrado en Supabase Auth
      </p>

      <form
        className="mt-6 space-y-4"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);

          startTransition(() => {
            void (async () => {
              const { data, error: signInError } =
                await supabase.auth.signInWithPassword({
                  email,
                  password,
                });

              if (signInError) {
                setError(signInError.message);
                return;
              }

              const { data: profile } = await supabase
                .from("admin_profiles")
                .select("is_active")
                .eq("user_id", data.user.id)
                .maybeSingle();

              if (!profile?.is_active) {
                await supabase.auth.signOut();
                setError("Tu usuario no tiene acceso activo al panel.");
                return;
              }

              router.replace("/admin");
            })();
          });
        }}
      >
        <div>
          <label className="mb-2 block text-sm text-white/65">Correo</label>
          <Input
            type="email"
            name="admin_email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="border-white/10 bg-black/20 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">Contraseña</label>
          <Input
            type="password"
            name="admin_password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            className="border-white/10 bg-black/20 text-white"
            required
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          {pending ? "Entrando..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}
