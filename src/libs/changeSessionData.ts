export async function updateSessionAccess(userId: string, newAccess: string) {
  try {

      const url = "https://deepdive-ki.de/api/dbAccessCheck";
      console.log("Sending POST request to:", url);
      console.log("Request body:", JSON.stringify({ userId, newAccess }));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newAccess }),
      cache: "no-store",
    });

    const data = await response.json();
    console.log("Response data POST??????:", data);

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
