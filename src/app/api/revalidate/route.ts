import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth";

export async function POST() {
  await requireAdminSession();

  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
