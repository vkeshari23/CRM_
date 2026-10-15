# CRM

Simple CRM to manage student enquiries. Counselors can register, login, view unclaimed enquiries and claim them.

## Tech Stack

- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React (Vite)

## Run Backend

```
npm install
npm run dev
```

`.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_db
JWT_SECRET=your_secret_key
```

## Run Frontend

```
cd frontend
npm install
npm run dev
```

## API

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |
| POST | /api/enquiries | No |
| GET | /api/enquiries/public | Yes |
| GET | /api/enquiries/private | Yes |
| PATCH | /api/enquiries/:id/claim | Yes |
