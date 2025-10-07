# Clarity Expense

A visually stunning and intuitive expense management application for teams, built on the Cloudflare serverless platform.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/twynixkaran/generated-app-20251007-074350)

Clarity Expense is a sophisticated, self-contained expense management system designed for visual excellence and intuitive operation. Built on Cloudflare's serverless platform, it provides a fast, secure, and reliable experience for employees, managers, and administrators. The application features role-based access control, allowing employees to submit expenses, managers to approve them through a defined workflow, and administrators to oversee the entire system.

The user interface is crafted with a minimalist design philosophy, emphasizing clarity, ease of use, and a visually stunning aesthetic through generous whitespace, a refined color palette, and fluid micro-interactions. All data is securely stored and managed using Cloudflare Durable Objects, ensuring data integrity and high availability.

## ✨ Key Features

- **Role-Based Access Control:** Pre-configured roles for Employee, Manager, and Admin with distinct permissions and views.
- **Intuitive Dashboard:** At-a-glance summary of expense statuses, recent activity, and key metrics.
- **Expense Management:** Full CRUD functionality for submitting, viewing, and tracking expenses.
- **Approval Workflows:** Simple, clear process for managers to review, approve, or reject expense claims.
- **Modern UI/UX:** A clean, responsive, and visually appealing interface built with the latest web technologies.
- **Serverless Architecture:** Runs entirely on the Cloudflare global network for exceptional performance and reliability.
- **Persistent State:** Utilizes Cloudflare Durable Objects for robust and consistent data storage.

## 🚀 Technology Stack

- **Frontend:**
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management
  - [React Router](https://reactrouter.com/) for navigation
  - [Framer Motion](https://www.framer.com/motion/) for animations
- **Backend:**
  - [Hono](https://hono.dev/) on [Cloudflare Workers](https://workers.cloudflare.com/)
- **Database:**
  - [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) package manager
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) logged into your Cloudflare account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/clarity_expense.git
    cd clarity_expense
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

## 🖥️ Running Locally

To start the development server, which includes the Vite frontend and a local Wrangler instance for the backend worker, run:

```bash
bun run dev
```

The application will be available at `http://localhost:3000` (or the next available port). The backend API will be accessible through the same port, proxied by Vite.

## 📁 Project Structure

The codebase is organized into three main directories:

-   `src/`: Contains the entire frontend React application, including pages, components, hooks, and styles.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers, including API routes and Durable Object entity definitions.
-   `shared/`: Contains TypeScript types and mock data that are shared between the frontend and the backend to ensure type safety.

## ☁️ Deployment

This application is designed for easy deployment to the Cloudflare network.

1.  **Build the application:**
    This command bundles the frontend and backend for production.
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using Wrangler. Make sure you have authenticated with Wrangler beforehand.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/twynixkaran/generated-app-20251007-074350)