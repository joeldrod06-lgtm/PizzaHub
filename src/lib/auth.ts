import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getSupabaseServerAuthClient } from "@/lib/supabase";

export const ADMIN_ACCESS_COOKIE = "pizzahub-admin-access-token";
export const ADMIN_REFRESH_COOKIE = "pizzahub-admin-refresh-token";

const isProduction = process.env.NODE_ENV === "production";

export const adminAccessCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProduction,
  path: "/",
  priority: "high" as const,
  maxAge: 60 * 60,
};

export const adminRefreshCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: isProduction,
  path: "/",
  priority: "high" as const,
  maxAge: 60 * 60 * 24 * 7,
};

export type AdminSession = {
  user: {
    id: string;
    email: string | null;
  };
  profile: {
    id: string;
    role: "admin" | "editor";
    email: string;
    full_name: string | null;
  };
};

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_ACCESS_COOKIE)?.value ?? null;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const accessToken = await getAdminAccessToken();

  if (!accessToken) {
    return null;
  }

  const supabase = getSupabaseServerAuthClient(accessToken);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id, role, email, full_name, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError || !profile?.is_active) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? null,
    },
    profile: {
      id: profile.id,
      role: profile.role,
      email: profile.email,
      full_name: profile.full_name,
    },
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
