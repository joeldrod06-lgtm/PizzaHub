"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type LoginStage =
  | "idle"
  | "cleaning"
  | "authenticating"
  | "verifying"
  | "securing"
  | "redirecting";

function getFriendlyAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid_credentials")
  ) {
    return "Correo o contrasena incorrectos.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Tu correo aun no ha sido confirmado.";
  }

  if (normalized.includes("too many requests")) {
    return "Demasiados intentos. Espera un momento e intentalo otra vez.";
  }

  if (normalized.includes("refresh token")) {
    return "La sesion anterior vencio. Intenta iniciar sesion otra vez.";
  }

  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "No se pudo conectar con el servidor. Revisa tu red e intentalo de nuevo.";
  }

  return "No se pudo iniciar sesion en este momento.";
}

function getStageLabel(stage: LoginStage) {
  switch (stage) {
    case "cleaning":
      return "Preparando el acceso...";
    case "authenticating":
      return "Validando tus credenciales...";
    case "verifying":
      return "Comprobando permisos del panel...";
    case "securing":
      return "Asegurando la sesion...";
    case "redirecting":
      return "Todo listo. Entrando al panel...";
    default:
      return null;
  }
}

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [supabase] = useState(() => getSupabaseBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<LoginStage>("idle");
  const [showDelayHint, setShowDelayHint] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!pending) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowDelayHint(true);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [pending]);

  const stageLabel = getStageLabel(stage);

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/8 bg-white/[0.03] p-6 md:p-8">
      <p className="text-[11px] uppercase tracking-[0.35em] text-orange-400/70">
        PizzaHub
      </p>
      <h1 className="mt-3 text-3xl font-light text-white">Acceso admin</h1>
      <p className="mt-3 text-sm leading-6 text-white/50">
        Inicia sesion con un usuario registrado en Supabase Auth.
      </p>

      <form
        className="mt-6 space-y-4"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          setStage("cleaning");
          setShowDelayHint(false);

          startTransition(() => {
            void (async () => {
              try {
                await supabase.auth.signOut();

                setStage("authenticating");
                const { data, error: signInError } =
                  await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                  });

                if (signInError) {
                  setError(getFriendlyAuthErrorMessage(signInError.message));
                  setStage("idle");
                  setShowDelayHint(false);
                  return;
                }

                if (!data.session) {
                  setError("No se pudo abrir la sesion del admin.");
                  setStage("idle");
                  setShowDelayHint(false);
                  return;
                }

                setStage("verifying");
                const { data: profile, error: profileError } = await supabase
                  .from("admin_profiles")
                  .select("is_active")
                  .eq("user_id", data.user.id)
                  .maybeSingle();

                if (profileError) {
                  await supabase.auth.signOut();
                  setError("No pudimos validar tus permisos del panel.");
                  setStage("idle");
                  setShowDelayHint(false);
                  return;
                }

                if (!profile?.is_active) {
                  await fetch("/api/auth/session", { method: "DELETE" });
                  await supabase.auth.signOut();
                  setError("Tu usuario no tiene acceso activo al panel.");
                  setStage("idle");
                  setShowDelayHint(false);
                  return;
                }

                setStage("securing");
                const sessionResponse = await fetch("/api/auth/session", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    accessToken: data.session.access_token,
                    refreshToken: data.session.refresh_token,
                  }),
                });

                if (!sessionResponse.ok) {
                  await supabase.auth.signOut();
                  setError("No se pudo asegurar la sesion del admin.");
                  setStage("idle");
                  setShowDelayHint(false);
                  return;
                }

                setStage("redirecting");
                const nextPath = searchParams.get("next");
                const safeNextPath =
                  nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin";

                router.replace(safeNextPath);
              } catch (caughtError) {
                const message =
                  caughtError instanceof Error
                    ? getFriendlyAuthErrorMessage(caughtError.message)
                    : "Ocurrio un error inesperado al intentar iniciar sesion.";

                setError(message);
                setStage("idle");
                setShowDelayHint(false);
              }
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
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            disabled={pending}
            className="border-white/10 bg-black/20 text-white disabled:cursor-not-allowed disabled:opacity-70"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">Contrasena</label>
          <Input
            type="password"
            name="admin_password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            disabled={pending}
            className="border-white/10 bg-black/20 text-white disabled:cursor-not-allowed disabled:opacity-70"
            required
          />
        </div>

        <div aria-live="polite" className="min-h-16">
          {pending && stageLabel ? (
            <div className="rounded-2xl border border-orange-500/15 bg-orange-500/[0.06] px-4 py-3 text-sm text-orange-100">
              <div className="flex items-center gap-3">
                <LoaderCircle className="h-4 w-4 animate-spin text-orange-300" />
                <span>{stageLabel}</span>
              </div>
              {showDelayHint ? (
                <p className="mt-2 text-xs text-orange-100/70">
                  Esto puede tardar unos segundos si la conexion esta lenta.
                </p>
              ) : null}
            </div>
          ) : null}

          {!pending && error ? (
            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-80"
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Procesando acceso...
            </span>
          ) : (
            "Iniciar sesion"
          )}
        </Button>
      </form>
    </div>
  );
}
