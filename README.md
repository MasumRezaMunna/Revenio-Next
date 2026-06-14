# Revenio — Curated Marketplace

A polished e-commerce style web app built with **Next.js (App Router)**, **Firebase Authentication**, and **Tailwind CSS**. Revenio showcases a curated catalog of products with public browsing pages and protected pages for managing your own listings.

## Live Demo & Repo

- **Live demo:** _add your Vercel URL here_
- **GitHub repo:** _add your repo URL here_

## Key Features

- **Responsive landing page** with 7 sections: sticky navbar, hero, featured products, trust badges, category browser, testimonials, and CTA banner.
- **Auth-aware navbar** — shows Login/Register when signed out. When signed in, shows a dropdown with user info and Sign Out. **Add Product** and **Manage Products** links only appear for admin accounts.
- **Admin-only product management** — `/items/add` and `/items/manage` are restricted to admin users (see "Admin Access" below). Regular signed-in users who try to visit these routes see an "Admins only" message instead of the form/table.
- **Items page (`/items`)** — search bar plus filtering by category, price, and rating, with a responsive grid of product cards.
- **Item details page (`/items/[id]`)** — dynamic route showing full description, key specs/availability, price, tags, related items, and a back button.
- **About page (`/about`)** — story, values, and stats.
- **Firebase Authentication** — email/password and Google sign-in, with auth state managed via React Context. Redirects to `/` after login.
- **Protected page: Add Product (`/items/add`)** — admin-only form with validation (title, descriptions, price, category, rating, image URL, availability); shows a success toast and redirects to manage.
- **Protected page: Manage Products (`/items/manage`)** — admin-only table/grid view of all products with View and Delete actions (with confirm step).
- Unauthenticated users are redirected to `/login` when visiting protected routes. Authenticated non-admin users are shown an access-restricted screen instead.
- Dark, modern UI with consistent spacing, hover/focus states, and micro-animations.

## Admin Access

Adding, editing, and deleting products is restricted to **admin accounts only**. An account is treated as admin if its email matches one of the addresses in `NEXT_PUBLIC_ADMIN_EMAILS` (comma-separated) in `.env.local`. If that variable isn't set, it defaults to `admin@revenio.com`.

```
NEXT_PUBLIC_ADMIN_EMAILS=admin@revenio.com,owner@example.com
```

- Admin users see an **Admin** badge in the navbar dropdown, plus **Add Product** and **Manage Products** links.
- Non-admin signed-in users only see their account info and **Sign Out** — the Add/Manage links are hidden.
- If a non-admin user navigates directly to `/items/add` or `/items/manage`, they see an "Admins only" screen with a link back home.
- Unauthenticated users visiting either route are redirected to `/login`.

To test admin features, register/sign in with an email listed in `NEXT_PUBLIC_ADMIN_EMAILS` (e.g. `admin@revenio.com`).

## Tech Stack

- Next.js 16 (App Router, JavaScript/JSX)
- Tailwind CSS v4
- Firebase Authentication (`firebase` SDK)
- React Context API for auth + product state
- `react-hot-toast` for notifications
- `lucide-react` for icons
- Local storage for persisting user-added products (no backend database required)

## Setup & Installation

1. **Clone the repo and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd revenio-app
   npm install
   ```

2. **Create a Firebase project**
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - In **Authentication → Sign-in method**, enable **Email/Password** and **Google**.
   - In **Project settings → General**, register a new Web App and copy the config values.

3. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Fill in your Firebase config values:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
     NEXT_PUBLIC_FIREBASE_APP_ID=...
     ```
   - Set which email(s) are treated as admins (controls who can add/edit/delete products):
     ```
     NEXT_PUBLIC_ADMIN_EMAILS=admin@revenio.com
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

6. **Deploy to Vercel**
   - Push the repo to GitHub.
   - Import the project on [Vercel](https://vercel.com/new).
   - Add the same `NEXT_PUBLIC_FIREBASE_*` environment variables in the Vercel project settings.
   - Deploy.

## Route Summary

| Route               | Access          | Description                                                        |
|---------------------|-----------------|---------------------------------------------------------------------|
| `/`                  | Public          | Landing page — navbar, hero, featured products, categories, testimonials, CTA, footer |
| `/items`             | Public          | Product catalog with search and filters (category, price, rating)  |
| `/items/[id]`        | Public          | Dynamic product details page with specs and related items          |
| `/about`             | Public          | About the app, mission, values, and stats                           |
| `/login`             | Public          | Email/password and Google sign-in                                   |
| `/register`          | Public          | Email/password and Google sign-up                                   |
| `/items/add`         | Admin only      | Form to add a new product (redirects to `/login` if signed out; "Admins only" if signed in as a non-admin) |
| `/items/manage`      | Admin only      | Table/grid of all products with View and Delete actions (redirects to `/login` if signed out; "Admins only" if signed in as a non-admin) |

## Notes

- Static product data is defined in `data/products.js`. Products added via `/items/add` are persisted to `localStorage` and merged with the static catalog.
- Auth state is provided globally via `contexts/AuthContext.jsx`, which also exposes `isAdmin`.
- `lib/admin.js` defines `ADMIN_EMAILS` / `isAdminUser()` — the single source of truth for admin checks.
- `components/AdminRoute.jsx` guards `/items/add` and `/items/manage`, redirecting signed-out users to `/login` and showing an "Admins only" message to non-admin signed-in users.
- `components/ProtectedRoute.jsx` is a general-purpose guard for any future page that should require login (without the admin restriction).
