# Notice Board

A full-stack Notice Board application built using **Next.js (Pages Router)**, **Prisma**, **MySQL (TiDB Cloud)**, and **Tailwind CSS**. The application allows users to create, view, update, and delete notices with server-side validation and persistent database storage.

---

## Features

- Create new notices
- View all notices in a responsive card layout
- Edit existing notices
- Delete notices with confirmation
- Urgent notices displayed first
- Responsive UI for desktop and mobile
- Server-side validation using Zod
- Persistent data storage with Prisma and TiDB Cloud
- Optional image field support

---

## Tech Stack

- **Frontend:** Next.js (Pages Router), React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** TiDB Cloud (MySQL)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Deployment:** Vercel

---

## Project Structure

```
components/
    notice/
        NoticeCard.tsx
        NoticeForm.tsx
        DeleteNoticeModal.tsx

lib/
    prisma.ts
    validations.ts

pages/
    api/
        notices/
            index.ts
            [noticeId].ts

    notices/
        new.tsx
        [noticeId].tsx

    index.tsx

prisma/
    schema.prisma

services/
    notice.service.ts

styles/

types/

utils/
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project directory

```bash
cd notice
```

Install dependencies

```bash
npm install
```

Configure environment variables by creating a `.env` file.

```env
DATABASE_URL="your_database_connection_string"
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## API Endpoints

### Get all notices

```
GET /api/notices
```

### Create notice

```
POST /api/notices
```

### Get single notice

```
GET /api/notices/:noticeId
```

### Update notice

```
PUT /api/notices/:noticeId
```

### Delete notice

```
DELETE /api/notices/:noticeId
```

---

## Validation

Server-side validation is implemented using **Zod**.

The following validations are performed:

- Title is required
- Body is required
- Category must be one of:
  - Exam
  - Event
  - General
- Priority must be one of:
  - Normal
  - Urgent
- Publish Date must be a valid date

---

## Database

Prisma is used as the ORM to interact with a MySQL-compatible TiDB Cloud database.

The Notice model contains:

- Title
- Body
- Category
- Priority
- Publish Date
- Optional Image URL
- Created At
- Updated At

---

## What I Would Improve With More Time

- Upload images using Cloudinary
- Add toast notifications instead of browser alerts
- Improve loading states with skeleton loaders
- Add search and category filters
- Add pagination for larger datasets
- Improve accessibility and keyboard navigation

---

## AI Usage

AI tools were used to assist with:

- Project planning
- UI structure and component organization
- Tailwind CSS styling suggestions
- Prisma setup guidance
- Code reviews and debugging
- README preparation

All implementation, integration, testing, debugging, and final code decisions were reviewed and completed manually.

---

## Deployment

The application is designed to be deployed on **Vercel** with a hosted TiDB Cloud MySQL database.

```
Frontend : Vercel
Database : TiDB Cloud
ORM      : Prisma
```

---

## Author

**Yash Agarwal**