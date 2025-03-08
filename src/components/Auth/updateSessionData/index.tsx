"use client";

import { useEffect } from "react";
import { updateSessionAccess } from "@/libs/changeSessionData";

// Define the props type
interface UpdateSessionProps {
  userId: string;
  newAccess: string;
}

export default function UpdateSession({ userId, newAccess }: UpdateSessionProps) {
    console.log("function is even called??:", userId, newAccess);
  useEffect(() => {
    if (userId && newAccess) {
      updateSessionAccess(userId, newAccess)
        .then(() => console.log("Session updated successfully"))
        .catch((error) => console.error("Error updating session:", error));
    }
  }, [userId, newAccess]);

  return null;
}