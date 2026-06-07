// Aufnahme-Skripte pro Video-Lektion.
// Quelle: Notion-Board „Udemy MasterClass".
// Pro Sektion eine eigene Datei in ./scripts/.

import { s1Scripts } from "./scripts/s1";
import { s2Scripts } from "./scripts/s2";
import { s3Scripts } from "./scripts/s3";
import { s4Scripts } from "./scripts/s4";
import { s5Scripts } from "./scripts/s5";
import { s6Scripts } from "./scripts/s6";
import { s7Scripts } from "./scripts/s7";

export const courseScripts: Record<string, string> = {
  ...s1Scripts,
  ...s2Scripts,
  ...s3Scripts,
  ...s4Scripts,
  ...s5Scripts,
  ...s6Scripts,
  ...s7Scripts,
};
