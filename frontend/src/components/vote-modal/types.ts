// Re-exportar tipos de la API
export type { Waifu } from "../../api/waifus";

export interface VotedCharacter {
  id: string;
  name: string;
  imageUrl: string;
  source: string;
}
