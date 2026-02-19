# Project: Street Fighter

## Project Overview

This project, "Street Fighter," is a web application that meticulously documents the complete restoration and modification journey of a classic BMW R65 motorcycle. It serves as a living document, visual timeline, and technical diary of the build process.

### Key Features
*   **Interactive Timeline:** Follow the build process step-by-step from initial teardown to final assembly.
*   **High-Quality Gallery:** A visual feast of concept designs, work-in-progress shots, and final glamour shots.
*   **Responsive Design:** A clean, modern interface that looks great on any device.
*   **Dark Mode:** For comfortable late-night browsing.

### Tech Stack
The project leverages a modern, performant, and scalable tech stack:
*   **Framework:** React (with TypeScript)
*   **Build Tool:** Vite
*   **Routing:** TanStack Router
*   **UI Components:** shadcn/ui (built on Radix UI)
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint
*   **Backend:** Supabase (for authentication and data management, as indicated by project dependencies)

## Building and Running

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/carcme/streetbike.git
    cd streetbike
    ```

2.  **Install dependencies:**
    This project uses `npm` as its package manager.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start the Vite development server, typically on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

4.  **Build the project for production:**
    ```bash
    npm run build
    ```

5.  **Preview the production build:**
    ```bash
    npm run preview
    ```

6.  **Run linters:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Language:** TypeScript is used throughout the project for type safety and improved developer experience.
*   **Code Quality:** ESLint is configured to maintain code quality and consistency.
*   **UI/UX:** User interface components are built using `shadcn/ui`, which is based on `Radix UI`, ensuring a consistent and accessible design system. Styling is managed with `Tailwind CSS` for utility-first styling.
*   **Routing:** `TanStack Router` is employed for robust and type-safe routing within the application.
*   **Backend Integration:** `Supabase` is integrated for backend services, including authentication and data management.

---
This `GEMINI.md` provides a foundational understanding of the "Street Fighter" project. For further details on specific implementations or to contribute, refer to the respective source files and the `README.md`.