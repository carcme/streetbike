# Project: R65

From a rusted shed find to a track-tearing monster. This project documents the complete restoration and modification journey of a classic BMW R65 motorcycle.

![Shed find - the humble beginnings of the BMW R65 Street Fighter](./public/shedbike.webp)

This web application serves as a living document, a visual timeline, and a technical diary of the entire build process.

## ✨ Features

- **Interactive Timeline:** Follow the build process step-by-step, from the initial teardown to the final assembly.
- **Rebuild Todo's:** Phase-based task tracker showing the status of every job on the bike.
- **Progress Updates:** Blog-style updates documenting each stage of the restoration.
- **High-Quality Gallery:** A visual feast of concept designs, work-in-progress shots, and final glamour shots.
- **Admin Panel:** Password-protected dashboard to manage content (tasks, timeline steps, updates, images).
- **Visitor Analytics:** Lightweight page view and unique visitor tracking stored in Supabase — no third-party analytics service.
- **Responsive Design:** A clean, modern interface that looks great on any device.
- **Dark Mode:** For comfortable late-night browsing.

## 🚀 Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework:** [React](https://react.dev/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Image Optimisation:** [@lonik/oh-image](https://www.npmjs.com/package/@lonik/oh-image)
- **Drag & Drop:** [dnd-kit](https://dndkit.com/)
- **Performance Monitoring:** <s>[Vercel Speed Insights](https://vercel.com/docs/speed-insights)</s>
- **Linting:** [ESLint](https://eslint.org/)

Here's a glimpse of the concepts that inspired the build:

<p align="center">
  <img src="./public/concept.webp" width="48%" alt="Concept 1">
  &nbsp;
  <img src="./public/concept2.webp" width="48%" alt="Concept 2">
</p>
<p align="center">
  <img src="./public/concept3.webp" width="48%" alt="Concept 3">
  &nbsp;
  <img src="./public/concept4.webp" width="48%" alt="Concept 4">
</p>

## 🛠️ Getting Started

To run this project locally, follow these steps:

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

3.  **Set up environment variables:**
    Create a `.env.local` file in the project root with your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    This will start the Vite development server, typically on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## 📂 Project Structure

The codebase is organized to be clean, modular, and easy to navigate.

```
/src
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components (shadcn/ui + custom)
│   └── admin/      # Admin panel layout and sidebar
├── data/           # Static data and local content
├── hooks/          # Custom React hooks (data fetching, auth, analytics)
├── lib/            # Supabase client and utility functions
├── routes/         # File-based routes via TanStack Router
│   ├── admin/      # Protected admin panel routes
│   └── tasksdb/    # Public task/phase detail routes
├── types/          # TypeScript types including Supabase database types
├── main.tsx        # Application entry point
└── index.css       # Global styles and Tailwind CSS imports
```

---

This project is a labor of love, combining a passion for motorcycles with the art of web development.

#### Palette Generator

- **Palette Generator:** [Tweakcn](https://tweakcn.com/editor/theme)

- **Palette Preview:** [Add URL as Custom](https://tweakcn.com/editor/theme?p=custom)

---

#### PageSpeed Insights

###### <u>Mobile</u>

<center>

![Mobile](./public/perfMobile.png "Mobile")

</center>

###### <u>Desktop</u>

<center>

![Desktop](./public/perfDesktop.png "Desktop")

</center>
