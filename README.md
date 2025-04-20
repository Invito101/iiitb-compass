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

- **`/lostfound`**: Submit details of lost or found items. Users can filter and search by date, category, or location.

- **`/foodmenu`**: Shows the current week's mess menu. Users can rate meals and read aggregated ratings by others.

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
npm install --force
```

It is important to use --force here

 3.  Configure Environment Variables

In the `.env` file inside the repo, make sure to properly configure the following values:

```env
AUTH_GITHUB_ID=***
AUTH_GITHUB_SECRET=***
```

 Follow these guides to set up GitHub OAuth and integrate Auth.js with Prisma:

-  [Auth.js Installation Guide](https://authjs.dev/getting-started/installation)  
-  [GitHub OAuth Setup](https://authjs.dev/getting-started/authentication/oauth#github)  
-  [Prisma Adapter Setup](https://authjs.dev/getting-started/adapters/prisma)

---

```env
AUTH_SECRET=***
```

- Generate a **random string** and paste it here.  
  You can use [this tool](https://generate-secret.vercel.app/32) or any method you like to generate one.

---

```env
NEXTAUTH_URL=http://localhost:3000
```

- Set this to the **URL where your dev server runs**, usually `http://localhost:3000` during local development.

---

```env
DATABASE_URL=***
```

To get your database URL:

 - Sign up at [neon.tech](https://neon.tech/docs/get-started-with-neon/signing-up)  
 - Follow the links below to connect your Neon database, and get your :  
    https://neon.tech/docs/get-started-with-neon/signing-up
    https://neon.tech/docs/get-started-with-neon/connect-neon

And add your database URL to the variable






4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the dev server:

```bash
npm run dev
```

Then go to **http://localhost:3000/auth** and sign up with github to begin.

---

Project built and maintained by IIITB students. Built with 💜 for campus life.
