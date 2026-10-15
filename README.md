# CRM

Simple CRM to manage student enquiries. Counselors can register, login, view unclaimed enquiries and claim them.

## Tech Stack

- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React (Vite), Tailwind CSS

## Project Structure

```
CRM/
  client/    React frontend
  server/    Node.js backend
```

## Run Backend

```
cd server
npm install
npm run dev
```

Create a `.env` file inside `server`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_db
JWT_SECRET=your_secret_key
```

## Run Frontend

```
cd client
npm install
npm run dev
```

Open http://localhost:5173 in the browser.

## API

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /auth/register | No |
| POST | /auth/login | No |
| POST | /enquiries | No |
| GET | /enquiries/public | Yes |
| GET | /enquiries/private | Yes |
| PATCH | /enquiries/:id/claim | Yes |
