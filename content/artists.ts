// artists.ts
// Dati della lineup, riutilizzabili al di fuori del solo file lastCall2026.ts
// se in futuro verranno aggiunti eventi con altri artisti.

export type Artist = {
  name: string;
  photo: string;
  social: string;
  bio: string;
  setTime: string;
};

export { lastCall2026 } from "./lastCall2026";
