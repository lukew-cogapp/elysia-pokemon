// /services/pokemon-service.ts

import { ERROR_MESSAGES } from "../constants/errors";

interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export abstract class PokemonService {
  static async getById(id: number) {
    const POKEMON_API_URL = process.env.POKEMON_API_URL;
    const response = await fetch(`${POKEMON_API_URL}${id}`);

    if (!response.ok) throw new Error(ERROR_MESSAGES.POKEMON_NOT_FOUND);

    const data: PokemonAPIResponse =
      (await response.json()) as PokemonAPIResponse;

    const types = data.types.map((typeEntry) => typeEntry.type.name);

    // Structure data to match the PokemonResponse model
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default ?? "",
      types,
    };
  }
}
