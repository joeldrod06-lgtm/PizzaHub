import { NextResponse } from "next/server";

import {
  ADMIN_ACCESS_COOKIE,
  ADMIN_REFRESH_COOKIE,
  adminAccessCookieOptions,
  adminRefreshCookieOptions,
} from "@/lib/auth";
import { getSupabaseServerAuthClient } from "@/lib/supabase";

type SessionPayload = {
  accessToken?: string;
  refreshToken?: string;
};

export async function POST(request: Request) {
  const { accessToken, refreshToken }: SessionPayload = await request.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { message: "Faltan credenciales de sesión." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServerAuthClient(accessToken);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return NextResponse.json(
      { message: "No se pudo validar la sesión del admin." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_ACCESS_COOKIE, accessToken, adminAccessCookieOptions);
  response.cookies.set(
    ADMIN_REFRESH_COOKIE,
    refreshToken,
    adminRefreshCookieOptions
  );

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_ACCESS_COOKIE, "", {
    ...adminAccessCookieOptions,
    maxAge: 0,
  });
  response.cookies.set(ADMIN_REFRESH_COOKIE, "", {
    ...adminRefreshCookieOptions,
    maxAge: 0,
  });

  return response;
}
