# Project Management API

Simple Project Management API built with Node.js, Express, MongoDB and Mongoose.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

Authentication

This repo expects JWT auth. A token payload should include `sub` with the user id and be signed with `JWT_SECRET`.

Example payload:

```json
{ "sub": "<userId>", "iat": 0 }
```

Endpoints

- `POST /api/projects` create project
- `GET /api/projects` list with `?page&limit&status&client&priority&assignedTo`
- `GET /api/projects/:id` get full project details
- `PUT /api/projects/:id` update project
- `PUT /api/projects/:id/status` update status
- `POST /api/projects/:id/milestones` add milestone
- `PUT /api/projects/:id/milestones/:mid` update milestone
