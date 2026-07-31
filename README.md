# MAHA Films Website

This is the Next.js version of the MAHA Films website. MAHA Films is a Bengaluru-based production and line production company. This project is built with Next.js 15+, React 19, Tailwind CSS v4, and standard modern web tooling.

## Prerequisites

Before getting started, make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18.17 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository** (or download and extract it):
   ```bash
   git clone <your-repo-url>
   cd maha-films
   ```

2. **Install dependencies**:
   Run the following command in the project root to install all required packages (Next.js, React, Tailwind, etc.):
   ```bash
   npm install
   ```
   *Note: You can also use `yarn install`, `pnpm install`, or `bun install` if you prefer other package managers.*

3. **Run the development server**:
   Start the local development server:
   ```bash
   npm run dev
   ```

4. **View the site**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application. The page will automatically hot-reload as you make changes to the code.

## Project Structure

- `app/` - Contains the main Next.js App Router files (`page.tsx`, `layout.tsx`, `globals.css`).
- `components/sections/` - Contains the major layout sections of the homepage (Hero, About, Services, Header, etc.).
- `components/ui/` - Contains reusable smaller UI components.
- `public/` - Contains static assets like images, logos, and fonts that are served directly.
- `lib/data/` - Contains static data used across the site (e.g. clients, reviews, team data).

## Building for Production

To create an optimized production build of the site, run:
```bash
npm run build
```
Once the build is complete, you can test the production server locally by running:
```bash
npm run start
```
