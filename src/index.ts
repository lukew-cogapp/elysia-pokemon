import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PokemonService } from "./services/pokemonService";
import { PokemonParams, PokemonResponse } from "./models/pokemon";
import { errorHandler } from "./middleware/errorHandler";

const app = new Elysia()
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
        return await PokemonService.getById(params.id); // ✅ params.id is now guaranteed to be a number
      },
      {
        params: PokemonParams,
        response: PokemonResponse,
        transform({ params }) {
          const id = Number(params.id); // ✅ Explicitly convert to number
          if (!Number.isInteger(id)) {
            throw new Error("Invalid Pokémon ID");
          }
          params.id = id; // ✅ Mutate params.id to be a number
        },
        detail: {
          tags: ["v1"],
          description: "Returns details about a Pokémon by ID",
        },
      }
    )
  )
  .listen(3000);

console.log("Elysia app running at http://localhost:3000");
