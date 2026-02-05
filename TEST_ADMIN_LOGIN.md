# BlockUI Admin Login Test Guide

## Test Endpoints

### 1. Backend Health Check
```bash
curl https://blockui-backend.fly.dev/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "database": "pending",
  "message": "API is running, waiting for database configuration",
  "timestamp": "2026-02-05T14:54:00.000Z"
}
```

### 2. Backend API Root
```bash
curl https://blockui-backend.fly.dev/
```

**Expected Response:**
```json
{
  "name": "BlockUI Backend API",
  "version": "0.1.0",
  "endpoints": {
    "health": "/health",
    "admin": {
      "login": "POST /admin/login",
      "verify": "POST /admin/verify",
      "me": "GET /admin/me"
    }
  }
}
```

### 3. Admin Login
```bash
curl -X POST https://blockui-backend.fly.dev/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@blockui.local",
    "password": "blockui123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin-001",
    "email": "admin@blockui.local",
    "role": "admin"
  }
}
```

### 4. Verify Token
```bash
curl -X POST https://blockui-backend.fly.dev/admin/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "userId": "admin-001",
    "email": "admin@blockui.local",
    "role": "admin"
  }
}
```

### 5. Get Current User
```bash
curl https://blockui-backend.fly.dev/admin/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "userId": "admin-001",
    "email": "admin@blockui.local",
    "role": "admin"
  }
}
```

## Frontend Admin Panel

**Login URL:** https://blockui-frontend.fly.dev/admin

**Credentials:**
- Email: `admin@blockui.local`
- Password: `blockui123`

**Dashboard URL (after login):** https://blockui-frontend.fly.dev/admin/dashboard

## Environment Variables

### Backend (blockui-backend)
- `JWT_SECRET`: ✅ Set on Fly.io
- `DATABASE_URL`: Placeholder set (waiting for production database)
- `NODE_ENV`: production

### Frontend (blockui-frontend)
- `NEXT_PUBLIC_API_URL`: ✅ Set to `https://blockui-backend.fly.dev`
- `NODE_ENV`: production

## Next Steps

1. **Production Database Setup**
   - Create Managed PostgreSQL on Fly.io
   - Run migrations: `npm run migrate`
   - Update DATABASE_URL secret

2. **User Management**
   - Implement proper user authentication with database
   - Add user creation/management endpoints
   - Hash passwords properly with bcrypt

3. **Security Hardening**
   - Change default admin credentials
   - Implement rate limiting
   - Add CORS restrictions
   - Enable HTTPS-only cookies
