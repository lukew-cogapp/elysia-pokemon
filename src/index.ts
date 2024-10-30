import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PokemonService } from "./services/pokemonService";
import { PokemonParams, PokemonResponse } from "./models/pokemon";
import { errorHandler } from "./middleware/errorHandler";

new Elysia()
  .use(
    swagger({
      documentation: {
        tags: [{ name: "v1", description: "Version 1 API endpoints" }],
      },
    })
  )
  .onError(errorHandler)

  // Define a versioned group for v1 routes
  .group("/v1", (app) =>
    app.get(
      "/pokemon/:id",
      async ({ params }) => {
        return await PokemonService.getById(params.id);
      },
      {
        params: PokemonParams,
        response: PokemonResponse,
        transform({ params }) {
          const id = +params.id;
          if (!Number.isInteger(id)) throw new Error("Invalid Pokémon ID");
          // if (Number.isNaN(id)) throw new Error("Invalid Pokémon ID");
          params.id = id;
        },
        detail: {
          tags: ["v1"],
        },
      }
    )
  )
  .listen(3000);

console.log("Elysia app running at http://localhost:3000");
