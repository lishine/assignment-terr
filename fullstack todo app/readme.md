# Fullstack ToDo Application

This project contains a backend (Node.js/Express) and a frontend (React) for a ToDo list application.

Detailed planning and architecture can be found in [todos.md](./todos.md).

## API Improvements

### Type Sharing Between Backend and Frontend

Synchronizing TypeScript types between the backend and frontend is crucial for maintaining type safety and reducing errors. Here are several approaches considered for this project:

1.  **Manual Replication (Current Initial Approach):**

    - **How it works:** Manually define shared types (e.g., `TodoItem`) in a dedicated file on the frontend (e.g., `frontend/src/types/todo.types.ts`).
    - **Pros:** Simplest to set up initially, especially without a monorepo.
    - **Cons:** Prone to synchronization errors if backend types change and frontend types are not updated. Violates DRY principle. Increases risk of bugs.

2.  **Monorepo with a Shared `types` Package:**

    - **How it works:** Structure the project as a monorepo (e.g., using pnpm workspaces, Yarn workspaces, Turborepo). Create a shared package (e.g., `packages/types`) where common types are defined. Both backend and frontend projects would depend on this local package.
    - **Pros:** Single source of truth for types. Excellent type safety and developer experience.
    - **Cons:** Requires initial setup for the monorepo structure and build tooling.

3.  **Generating Frontend Types from Backend API Specification (e.g., OpenAPI):**

    - **How it works:** Use the backend's OpenAPI (Swagger) specification to automatically generate TypeScript interfaces for the frontend using tools like `openapi-typescript` or `orval`.
    - **Pros:** API serves as the single source of truth for data transfer object types. Automation reduces manual effort.
    - **Cons:** Generated types depend on the quality and completeness of the OpenAPI spec. Adds a code generation step to the frontend build.

4.  **Publishing Types from Backend to a Private Registry:**
    - **How it works:** The backend project publishes its types as a private NPM package. The frontend installs this package.
    - **Pros:** Clear ownership of the API contract by the backend. Good for very decoupled teams.
    - **Cons:** Involves overhead for versioning and publishing. Slight delay in type availability for the frontend.

For the initial development phase of this ToDo application, manual type replication is being used for simplicity. However, for long-term maintainability and scalability, transitioning to a monorepo structure or type generation from an OpenAPI spec is highly recommended.
