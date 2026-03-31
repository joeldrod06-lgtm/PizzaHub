export async function revalidatePublicSite() {
  const response = await fetch("/api/revalidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo refrescar el contenido publico.");
  }
}
