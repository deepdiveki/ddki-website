"use client";

import { createContext, useContext } from "react";

/**
 * „Sofort“-Modus: Folien rendern ihren Endzustand ohne Animation.
 * Genutzt für Presenter-Vorschauen, ?static in der URL (Screenshots/PDF)
 * und als Grundlage für einen späteren Export.
 */
export const InstantContext = createContext(false);

export const useInstant = () => useContext(InstantContext);
