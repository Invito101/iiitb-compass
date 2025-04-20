# IIITB Compass - Student Utility Portal

## Overview

IIITB Compass is a general utilities platform made by and for IIITB students. It brings together essential utilities like:

-  Academic Calendar
-  Cab Sharing (generally used for airport)
-  Lost & Found items
-  Mess Menu & Specific dish Ratings and comments

All into one sleek and modern dashboard.

## Features

1. **Calendar**
   - Stay updated on academic and event schedules.
   - View upcoming holidays, exams, and institute events.

2. **CabShare**
   - Find peers leaving for or arriving from the airport at the same time.
   - Coordinate rides and split cab fares.

3. **Lost & Found**
   - Report items you've lost or found in the campus.
   - View reports by others and reconnect people with their belongings.

4. **Menu & Food Ratings**
   - Check the daily mess menu.
   - Rate meals and view peer ratings for food quality and variety.

## Pages

- **`/auth`**: Authentication page allowing users to log in via GitHub. Upon successful login, users are redirected to the dashboard.

- **`/dashboard`**: The central hub where users can access all features: CabShare, Calendar, Lost & Found, and Menu and Contact Us.

- **`/calendar`**: Displays academic and campus events. Pulled from a pre-fed calendar source or admin-created entries.

- **`/cabshare`**: Users can view and post cab-sharing opportunities based on time and destination.

- **`/lost-and-found`**: Submit details of lost or found items. Users can filter and search by date, category, or location.

- **`/menu`**: Shows the current week's mess menu. Users can rate meals and read aggregated ratings by others.

- **`/contact`**: Page with links to linkedin profiles of all members involved.


## Project Structure

```
client/
├── app/                # App routes and main layout
├── components/         # Reusable UI components
├── forms/              # Form components for each page
├── lib/                # Utility functions
├── prisma/             # Prisma schema and DB config
├── public/             # Static files (images, icons)
├── types/              # TypeScript type declarations
├── scripts/            # Local development scripts
├── .env                # Environment variables
├── auth.ts             # Authentication setup
├── next.config.ts      # Next.js configuration
├── postcss.config.mjs  # PostCSS setup for TailwindCSS
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation
```

## Tech Stack

- **Next.js** – App router + full-stack routes
- **TypeScript** – Safety and clarity
- **Tailwind CSS** – Modern styling
- **shadcn/ui** – Accessible component library
- **NextAuth.js** – Auth via GitHub OAuth
- **Prisma** – Type-safe database ORM
- **PostgreSQL** – Backend DB 



##  Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL DB (or use SQLite for testing)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Invito101/iiitb-compass.git
cd iiitb-compass/client
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

In the `.env` file inside the repo, configure these lines  (Follow nextAuth documentation, contact the repo owner for extra details):

```env
AUTH_GITHUB_ID=***
AUTH_GITHUB_SECRET=***
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the dev server:

```bash
npm run dev
```

Then go to **http://localhost:3000/auth** to begin.

---
Go to `http://localhost:3000/auth` to begin authentication.
---

Project maintained by IIITB students. Built with 💜 for campus life.
