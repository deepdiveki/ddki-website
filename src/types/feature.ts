import { ReactNode } from "react";

export type Feature = {
  id: number;
  icon: string;
  title: string;
  description: string;
  rotate?: boolean;
  animationComponent?: ReactNode; // Neuer Typ für die Animation
};