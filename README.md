# Netflix Clone (React)

A Netflix-style web app built with React and Vite. Users sign up or sign in with email and password (Firebase Authentication), browse rows of movies pulled from The Movie Database (TMDB) API, and watch a movie's trailer on a player page.

## Features

- **Email/password auth**: sign up and sign in through Firebase Authentication. On sign-up, a profile document (`uid`, `name`, `authProvider`, `email`) is written to the Firestore `user` collection.
- **Client-side validation**: name, email and password are checked before the request is sent. Sign-up requires a password with uppercase, lowercase, a number and a special character.
- **Route guard**: signed-out users are redirected to `/login`, and signed-in users are redirected away from `/login` to `/`.
- **Home page**: a hero banner plus movie rows for TMDB's `now_playing`, `top_rated`, `popular` and `upcoming` lists. Rows scroll horizontally with the mouse wheel.
- **Trailer player**: `/player/:id` embeds the first video TMDB returns for that movie (YouTube) and shows its publish date, name and type.
- **Toast notifications** for auth success and errors (react-toastify).
- **Responsive navbar** with a mobile menu toggle, a darker background on scroll, and a sign-out dropdown.

## Tech stack

| Area | Library |
| --- | --- |
| UI | React 19 |
| Build / dev server | Vite 6 with `@vitejs/plugin-react-swc` |
| Routing | react-router-dom 7 (`BrowserRouter`) |
| Auth and database | Firebase 11 (Authentication, Cloud Firestore) |
| HTTP | axios |
| Notifications | react-toastify |
| Movie data | TMDB API v3 |
| Linting | ESLint 9 (flat config) with `react-hooks` and `react-refresh` plugins |
| Styling | Plain CSS, one stylesheet per component or page |

## Folder structure

```
.
├── index.html                  # Vite HTML entry, loads /src/main.jsx
├── public/                     # Static files served as-is (favicon, background)
├── src/
│   ├── main.jsx                # App bootstrap: BrowserRouter + global styles
│   ├── app/
│   │   └── App.jsx             # Routes and auth-state redirect logic
│   ├── pages/
│   │   ├── Home/               # Hero banner + movie rows
│   │   ├── Login/              # Sign in / sign up form
│   │   └── Player/             # Trailer player (/player/:id)
│   ├── features/
│   │   ├── auth/
│   │   │   ├── services/authService.js   # signup, login, logout
│   │   │   └── utils/validators.js       # input validation
│   │   └── movies/
│   │       ├── components/TitleCards/    # Horizontal movie row
│   │       └── services/movieService.js  # TMDB requests
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   └── ui/Spinner/         # Full-screen loading spinner
│   ├── lib/
│   │   ├── firebase.js         # Firebase app, auth and Firestore instances
│   │   └── tmdb.js             # Preconfigured axios client for TMDB
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   └── styles/
│       └── global.css
├── vite.config.js              # React plugin, base path, "@" alias to src/
├── jsconfig.json               # "@/*" path mapping for the editor
├── eslint.config.js
├── vercel.json                 # SPA rewrite rule for Vercel
└── .env.example                # Required environment variables
```

Imports inside `src/` use the `@/` alias, for example `import { auth } from "@/lib/firebase"`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/login` | Sign in / sign up |
| `/player/:id` | Trailer for the TMDB movie with that id |

## Prerequisites

- Node.js 18 or newer (required by Vite 6) and npm
- A Firebase project with **Email/Password** sign-in enabled and a **Cloud Firestore** database
- A TMDB account and its **API Read Access Token** (the v4 bearer token)

## Setup

```bash
git clone https://github.com/CodeWith-vivek/React-netflix-clone.git
cd React-netflix-clone
npm install
cp .env.example .env
```

Then fill in the values in `.env`.

## Environment variables

All variables are read at build time through `import.meta.env`, so they must start with `VITE_`. They end up in the client bundle, so treat them as public configuration, not secrets.

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase web app config: API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase web app config: auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase web app config: project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web app config: storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web app config: messaging sender id |
| `VITE_FIREBASE_APP_ID` | Firebase web app config: app id |
| `VITE_TMDB_TOKEN` | TMDB API Read Access Token, sent as `Authorization: Bearer <token>` |
| `VITE_BASE_PATH` | Optional. Public base path used by Vite. Defaults to `/React-netflix-clone` when unset. Set it to `/` when serving from a domain root. It is read from `process.env` in `vite.config.js`, so set it in the shell or hosting provider; a value in `.env` is not picked up. |

`.env` is listed in `.gitignore`. Don't commit it.

## Development

```bash
npm run dev      # start the Vite dev server with hot reload
npm run lint     # run ESLint on the project
```

## Build and run

```bash
npm run build    # production build into dist/
npm run preview  # serve the dist/ build locally
```

## Tests

There are no automated tests or test runner configured in this project yet.

## Deployment

The repo includes a `vercel.json` that rewrites every path to `/`, so client-side routes like `/player/123` work on refresh.

To deploy on Vercel:

1. Import the repository in Vercel. It detects Vite: build command `npm run build`, output directory `dist`.
2. Add every variable from the table above in the project's environment settings.
3. Set `VITE_BASE_PATH=/` for a root-domain deploy. Without it, assets are built under `/React-netflix-clone/`.

No CI workflow is set up in this repo.
