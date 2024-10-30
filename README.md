# Pokémon API Server

A lightweight Pokémon API server built with [Elysia](https://elysia.js.org/) and powered by [Bun](https://bun.sh/). This server provides endpoints to fetch Pokémon details by ID, including validation and Swagger documentation for easy API exploration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Development](#development)
- [License](#license)

## Prerequisites

- **Bun** - A fast, all-in-one JavaScript runtime that allows for easy installation, management, and execution of JavaScript projects.

### Install Bun

If you don’t already have Bun installed, run the following command:

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal session or add Bun to your shell profile so the command is available globally.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine and change into the directory.

### 2. Install Dependencies

Use Bun to install dependencies:

```bash
bun install
```

## Running the Server

To start the server, run:

```bash
bun dev
```

The server should now be running at [http://localhost:3000](http://localhost:3000).

## API Documentation

The server includes Swagger documentation for testing and viewing the API’s endpoints.

- Visit [http://localhost:3000/swagger](http://localhost:3000/swagger) to access the Swagger UI.

## Endpoints

### `/v1/pokemon/:id`

Fetch details for a specific Pokémon by ID. The ID must be a positive integer (e.g., `1`, `2`, `25`).

- **Method**: `GET`
- **Path**: `/v1/pokemon/:id`
- **Parameters**:
  - `id` (integer, required): The Pokémon ID, must be a whole number.
- **Responses**:
  - `200 OK`: Returns Pokémon details (ID, name, sprite URL, types).
  - `400 Bad Request`: Invalid ID format (e.g., not a whole number).
  - `404 Not Found`: Pokémon not found.

Example response for a valid request:

```json
{
  "id": 1,
  "name": "bulbasaur",
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "types": ["grass", "poison"]
}
```

## Error Handling

The server includes custom error handling for consistent responses:

- **400 Bad Request**: Returned when an invalid ID is supplied (e.g., decimals like `1.5`).
- **404 Not Found**: Returned if the Pokémon is not found in the API.
- **500 Internal Server Error**: Catch-all for unexpected server errors.

Error responses are formatted as:

```json
{
  "status": 400,
  "error": "Invalid Pokémon ID"
}
```

## Project Structure

- `/models` - Contains Elysia models for request and response validation.
- `/services` - Abstracted service logic for fetching and transforming Pokémon data.
- `/middleware` - Error handling and other middleware configurations.

## Development

To enable automatic reloading during development, run:

```bash
bun run dev
```

This command will watch for file changes and restart the server as needed.

## License

This project is licensed under the MIT License.
