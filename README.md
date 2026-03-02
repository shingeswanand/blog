# Blog CMS (Next.js + MongoDB)

A simple CMS for managing blog posts with a WordPress-like admin panel and a frontend blog experience.

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- MongoDB

## Features

- Admin dashboard with post analytics (total, published, drafts, top category)
- Posts management with category and tags
- Markdown-style content editor helpers in admin form
- REST API routes for post create/list/delete
- Public frontend:
  - home page with featured/latest published posts
  - all posts listing page
  - single post detail page by slug
- MongoDB connection helper with safe behavior when env config is missing

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
   - All posts: `http://localhost:3000/posts`
   - Admin: `http://localhost:3000/admin`

## Next improvements

- Authentication/roles for admin routes
- True rich text editor (TipTap / Slate)
- Media library uploads
- Edit post flow and scheduled publishing
