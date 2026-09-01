<div align="center">
  <h1 style="font-family: monospace;">disk0-backend</h1>
  <p>Backend API for <b>disk0</b>, a cloud storage application</p>
</div>

> This application is still under active development.

---

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Password Hashing:** Argon2
- **Validation:** Zod

---

## Project Structure
```
src/
├── app.ts
├── server.ts
├── config        # database and envirnoment configuration
├── db            # migrations
├── errors/       # Custom Error Classes
├── middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── modules
│   ├── auth/
│   └── health/
├── routes/       # Main routes
├── types/        # Project wide TypeScript declarations
└── utils         # utility functions
```

---

## Getting started

### Prerequisites
- Node.js
- PostgreSQL
- `npm`

### Installation
1. Clone the repo
```
git clone https://github.com/MVSPrabash/disk0-backend.git
cd disk0-backend
```

2. Install dependencies
```
npm install
```

3. Environment Variables
Create a file .env with contents
```
PORT=8080

DATABASE_URL=postgresql://username:password@localhost:5432/disk0

ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...

ACCESS_TOKEN_EXPIRES_IN=900
REFRESH_TOKEN_EXPIRES_IN=604800
```
Replace `username` and `password` in `DATABASE_URL` to your PostgreSQL credentials
and set `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` secret keys

Make sure `.env` is listed inside of `.gitignore`

### Intialize the database
Run the migrations
```
npm run db:migrate
```

### Start the dev server
```
npm run dev
```

### Production Build
```
npm run build
npm start
```

---

## API

- Base URL: `/api`
- Healthcheck: `GET /api/health`

#### Authentication
- Register: `POST /api/auth/register`
request body
```
{
  "username": "user",
  "email": "user@email.com",
  "password": "password"
}
```

- Login: `POST /api/auth/login`
request body
```
{
  "identifier": "user",
  "password": "password"
}
```
`identifier` can be username or email address

- Refresh the Access Token: `POST /api/auth/refresh`
use the refresh token from cookies, and return a new accessToken

Authenticated endpoints use Bearer token.

