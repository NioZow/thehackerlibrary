export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  try {
    await requireAdmin();
  } catch {
    return notFound();
  }

  redirect("/admin/resources");
}
