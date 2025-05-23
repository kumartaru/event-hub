# Frontend Architecture & Design Decisions

## Overview

This document outlines the structure, decisions, and considerations made while building the frontend for the event management system using React, Tailwind CSS, and Next.js.

---

## Routes Implemented

### `/events`

- **Purpose**: Display a paginated, filterable list of events.
- **Features**:

  - Fetches events using `/api/events`
  - Pagination controls
  - Filters by category and date
  - Responsive layout using Tailwind CSS

### `/events/[id]`

- **Purpose**: View details of a selected event
- **Features**:

  - Fetch single event details using `/api/events/[id]`
  - Shows title, description, date, category
  - Registration form that posts to `/api/events/register`

---

## Components

### `<EventCard />`

- Displays summary of an event
- Used in `/events` list
- Reusable and styled with Tailwind

### `<Pagination />`

- Controls for page number and limit per page
- Updates URL query string and triggers reload

### `<EventDetail />`

- Shows full event information and a registration form

---

## Key Decisions

### ✅ Tailwind CSS

- Chosen for its utility-first approach and ease of building responsive UI
- Rapid prototyping and consistency in styling

### ✅ Page Fetching Strategy

- `getServerSideProps` used for SEO and fresh data on `/events` and `/events/[id]`

### ✅ Form Handling

- Basic form state with `useState`
- POST to `/api/events/registe`

---

## Summary Table

| Feature      | Component/Route    | API Dependency              |
| ------------ | ------------------ | --------------------------- |
| Event List   | `/events`          | `GET /api/events`           |
| Event Detail | `/events/[id]`     | `GET /api/events/[id]`      |
| Register     | `EventDetail` Form | `POST /api/events/register` |
| Pagination   | `Pagination`       | URL query params            |

How to Start the Project
Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

Git

Installation Steps

# Clone the repository

git clone <repository-url>
cd <project-directory>

# Install dependencies

npm install

# or

yarn install

# Run development server

npm run dev

# or

yarn dev
