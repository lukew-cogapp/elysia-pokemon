// /models/pokemon.ts

import { t } from "elysia";

export const PokemonParams = t.Object({
  id: t.Integer({
    default: 3,
    description: "The ID of the Pokémon to retrieve",
  }),
});

export const PokemonResponse = t.Object({
  id: t.Integer({ default: 3 }),
  name: t.String({ default: "venusaur" }),
  sprite: t.String({
    default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  }),
  types: t.Array(t.String(), { default: ["grass", "poison"] }),
});
