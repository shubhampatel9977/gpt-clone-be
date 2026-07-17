# Multimodal AI Backend

> Production-ready backend for an AI-powered chat application

## Overview

Multimodal AI Backend is a Node.js + Express + TypeScript backend using
OpenRouter, PostgreSQL (Supabase), Prisma ORM, JWT Authentication and
Server-Sent Events (SSE).

### Links

-   **Frontend Live:** https://multimodal-ai-chi.vercel.app
-   **Frontend Repo:** https://github.com/shubhampatel9977/multimodal-ai-fe.git
-   **Backend Repo:** https://github.com/shubhampatel9977/multimodal-ai-be.git
-   **Backend Live:** https://multimodal-ai-be.onrender.com

## Tech Stack

-   Node.js 22
-   Express
-   TypeScript
-   Prisma ORM
-   PostgreSQL (Supabase)
-   OpenRouter
-   JWT
-   Zod
-   Helmet
-   Compression
-   Morgan
-   Cookie Parser
-   SSE

## Features

-   Authentication
-   Google Login
-   JWT + Refresh Token
-   AI Models
-   Projects
-   Conversations
-   Messages
-   Streaming Chat
-   Temporary Chat
-   AI Title Generation
-   Token Tracking

## Folder Structure

``` text
src/
├── config
├── middlewares
├── modules
├── routes
├── security
├── types
├── utils
├── app.ts
└── server.ts
```

## Setup

``` bash
git clone https://github.com/shubhampatel9977/multimodal-ai-fe.git
cd multimodal-ai-fe
npm install
```

Rename `.env.example` to `.env`, update environment variables, then:

``` bash
npm run dev
```

## License

Public repository. No license specified.

## Author

Shubham Patel

https://www.linkedin.com/in/shubhampatel9977
