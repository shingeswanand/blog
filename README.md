# Blog CMS (Next.js + MongoDB)

A starter CMS for managing blog posts with a WordPress-like admin panel.

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- MongoDB

## Features

- Admin Dashboard with post stats
- Posts management page (add and delete posts)
- REST API routes for posts
- MongoDB connection helper
- WordPress-like admin sidebar and top header layout

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env.local
   ```

3. Start MongoDB locally or update your `MONGODB_URI`.

4. Run the app:

   ```bash
   npm run dev
   ```

5. Open:

   - Frontend: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

## Next improvements

- Authentication for admin routes
- Rich text editor (TipTap / Slate)
- Media library uploads
- Categories and tags
- Edit post and trash/recover flows
