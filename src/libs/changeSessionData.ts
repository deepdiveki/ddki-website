"use server";

export async function updateSessionAccess(userId: string, newAccess: string) {
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/dbAccessCheck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newAccess }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update session");
    }

    console.log("Session updated successfully:", data.session);
    return data.session;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
}
