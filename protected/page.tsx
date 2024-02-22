import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/api/auth/signin");

  alert("Please sign in to continue");
}
