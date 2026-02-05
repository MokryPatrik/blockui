# Embed Blocks

A headless component system for embedding reusable UI blocks on any website.

## Features

- **Admin Panel**: Manage block templates and content
- **shadcn/ui Components**: Beautiful, accessible UI blocks
- **Public Embed API**: Serve blocks via iframe/script on external sites
- **Docker Ready**: Deploy anywhere with Docker Compose

## Quick Start

```bash
docker-compose up
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin: http://localhost:3000/admin

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + shadcn/ui
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Deployment**: Docker Compose

## Project Structure

```
├── frontend/           Next.js admin panel + embed client
├── backend/            Express API
├── docker-compose.yml
└── .env.example
```

## Development

See individual `README.md` files in `frontend/` and `backend/`.
