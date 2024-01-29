# Mind Map Generator

This is an example of using GPT to generate mind maps for the given subject/topic.

## Requirements

Before you get started, make sure you have the following dependencies installed:

1. [Node.js v20.2.0](https://nodejs.org/en/blog/release/v20.2.0) - You'll need Node.js to run this project.

## Installation

Follow these steps to set up and run the project:

1. Create an `.env` file to store your environment variables. You can refer to the `.env.bak` file for a list of required variables.
2. Build the project by running the following command:

   `npm run build`

3. Start the project with this command:

   `npm start`

## Testing

To test the project, run the following commands:

1. Run tests using the following command:

   `npm run test`

2. You can also import the Postman collection `*.postman_collection.json` to see available requests and request examples.

## Project Structure

The project is organized into the following directory structure:

- `/src`
  - `/app`
    - `/config` - Configuration-related code, including loading environment variables.
    - `/constants` - Contains all constants and environment-agnostic variables.
      - `/errors` - Custom error handling.
    - `/types` - Custom, common, and auto-generated types.
    - `/controllers` - Contains all controllers.
    - `/services` - Contains all services.
    - `/repositories` - Contains all repositories.
    - `/routes` - Contains all routes.
    - `/middleware` - Middleware for request processing.
      - `/validators` - Request schema validators.
    - `/helpers` - Contains utility functions.
    - `/index.ts` - Starting point of the application.
    - `/init.ts` - Initialization point, where extensions are loaded.
  - `/test` - Test-related files.

Feel free to explore the project structure to understand how different components of the application are organized and interact with each other.
