# CRM

A simple CRM backend and frontend for managing student enquiries (leads). Counselors can register, log in, view public (unclaimed) enquiries, and claim them. Once claimed, an enquiry becomes private to that counselor.

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT
- Frontend: React (Vite)

## Project Structure

```
assi/
  config/        database connection
  controllers/   route logic
  middleware/    jwt auth
  models/        mongoose schemas
  routes/        api routes
  utils/         password hashing
  index.js       app entry
  frontend/      react app
```

## Backend Setup

```
npm install
```

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_db
JWT_SECRET=your_secret_key
```

Run the server:

```
npm run dev
```

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in the browser.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register an employee |
| POST | /api/auth/login | No | Login and get JWT token |
| POST | /api/enquiries | No | Submit a public enquiry |
| GET | /api/enquiries/public | Yes | Get all unclaimed enquiries |
| GET | /api/enquiries/private | Yes | Get enquiries claimed by the logged-in user |
| PATCH | /api/enquiries/:id/claim | Yes | Claim an enquiry |

For protected routes, send the token in the header:

```
Authorization: Bearer <token>
```
