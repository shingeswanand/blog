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

<<<<<<< HEAD
=======
   Your `.env.local` should contain:

   ```env
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB=blog_cms
   ```

>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
3. Start MongoDB locally or update your `MONGODB_URI`.

4. Run the app:

   ```bash
   npm run dev
   ```

5. Open:

   - Frontend: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin`

<<<<<<< HEAD
=======
## Windows PowerShell fix for `npm`

If you see this error:

```
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

Use one of these options:

1. Run npm via `npm.cmd` (no policy change):

   ```powershell
   npm.cmd run dev
   ```

2. Allow local scripts for your user and restart PowerShell:

   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

3. Or run commands in Command Prompt (`cmd`) instead of PowerShell:

   ```cmd
   npm run dev
   ```

>>>>>>> origin/codex/create-cms-for-blog-using-react-and-next.js-cvdcec
## Next improvements

- Authentication for admin routes
- Rich text editor (TipTap / Slate)
- Media library uploads
- Categories and tags
- Edit post and trash/recover flows
