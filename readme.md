# 76Packing_server

Backend server for the **76Packing mobile app** — GraphQL API + MySQL + Node.js + TypeScript.

## Project Description

This project is the backend server for the Packing 76 application. It is built using Node.js and TypeScript, leveraging GraphQL for a flexible API and interacting with a database to manage user data, favorite items, packing lists, and potentially incorporating AI/prompt-based features for luggage suggestions.

## Features

- Exposes a GraphQL API for managing packing-related data.
- User management: create, read, update, delete users.
- Manage favorite clothes, packing lists, and saved luggage.
- AI-powered luggage recommendations via prompt engineering (planned / in progress).
- Secure integration with MySQL database.

## Technologies Used

- Node.js
- TypeScript
- Apollo Server
- GraphQL
- Express
- MySQL (via `mysql2`)
- dotenv
- axios
- cors
- Firebase Admin (dependency listed, potential future use or specific feature)

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (LTS recommended)
- npm, yarn, or pnpm

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/DamianIanni/76Packing_server.git
    cd 76Packing_server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project based on the `.env.example` file.

    ```env
    PORT=3005
    OR_API_KEY=your_openrouter_api_key
    # Add other necessary database connection variables here (e.g., DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
    ```

    _Note: You will need to add your specific database connection details and the OpenRouter API key._

4.  **Database Setup:**
    This project uses MySQL. You will need to set up a MySQL database and configure the connection details in your `.env` file.

## Running the Project

- **Build the project:**

  ```bash
  npm run build
  ```

- **Start the server (production build):**

  ```bash
  npm start
  ```

- **Start the server (development with hot-reloading):**
  ```bash
  npm run dev
  ```

## API Endpoint

The GraphQL API will be available at `http://localhost:<PORT>/graphql` (replace `<PORT>` with the port specified in your `.env` file, default is 3005).

## Project Structure

<pre>
. ├── package.json ├── .gitignore ├── tsconfig.json ├── .env.example └── src ├── server.ts # Main server entry point ├── config # Configuration files (e.g., database) ├── utils # Utility functions ├── services # Business logic and external service interactions (DB, prompts) └── graphql # GraphQL schema and resolvers
</pre>

## Author

Damian Ianni

## Contact

- GitHub: [DamianIanni](https://github.com/DamianIanni)
- Email: damiangussi@gmail.com
