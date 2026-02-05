# Fly.io Deployment Guide - blockui

## Project Structure
- `frontend/` - Next.js app → **blockui-frontend**
- `backend/` - Express.js app → **blockui-backend**

## Configuration Files Created

### Frontend Configuration
**File: `frontend/fly.toml`**
```toml
app = "blockui-frontend"
primary_region = "arn"
```
- Next.js app running on port 3000
- Auto-scaling enabled

### Backend Configuration
**File: `backend/fly.toml`**
```toml
app = "blockui-backend"
primary_region = "arn"
```
- Express.js app running on port 5000
- Auto-scaling enabled

## Environment Variables Required

### Backend (blockui-backend)
```
DATABASE_URL=postgresql://user:password@blockui-db.internal:5432/blockui
NODE_ENV=production
```

### Frontend (blockui-frontend)
```
NEXT_PUBLIC_API_URL=https://blockui-backend-xxx.fly.dev
NODE_ENV=production
```

## Dockerfiles

Both apps have dedicated Dockerfiles for optimized production builds:
- `frontend/Dockerfile` - Node.js + Next.js build
- `backend/Dockerfile` - Node.js + Express build

## Build Status

✅ **Frontend Build**: Successful
```
✓ Compiled successfully
✓ Generating static pages (5/5)
```

✅ **Backend Build**: Successful
```
> tsc (TypeScript compilation successful)
```

## Deployment Steps

### Prerequisites
1. Fly CLI installed: `curl -L https://fly.io/install.sh | sh`
2. Fly API Token: Set as `FLY_API_TOKEN` environment variable

### Step 1: Create PostgreSQL Database
```bash
flyctl postgres create \
  --org default \
  --region arn \
  --name blockui-db
```

### Step 2: Deploy Backend
```bash
cd backend
flyctl deploy -a blockui-backend
# Set DATABASE_URL after deployment
flyctl secrets set DATABASE_URL="postgresql://..." -a blockui-backend
```

### Step 3: Deploy Frontend
```bash
cd frontend
flyctl deploy -a blockui-frontend
# Set NEXT_PUBLIC_API_URL to backend URL
flyctl secrets set NEXT_PUBLIC_API_URL="https://blockui-backend-xxx.fly.dev" -a blockui-frontend
```

### Step 4: Verify Deployments
```bash
flyctl status -a blockui-frontend
flyctl status -a blockui-backend
```

## Expected URLs

After successful deployment:
- **Frontend**: `https://blockui-frontend-xxx.fly.dev`
- **Backend**: `https://blockui-backend-xxx.fly.dev`

## Notes

- Both apps are configured for auto-scaling
- Traffic is force-routed over HTTPS
- Shared PostgreSQL database across services
- Minimum 1 machine running for each app
- ARM-based region for cost optimization

## Token Issues

The provided token appears to have authentication issues. For proper deployment:
1. Generate a new token at https://fly.io/app/account/tokens
2. Use the full token including the `FlyV1` prefix
3. Set it as: `export FLY_API_TOKEN="FlyV1 <token-value>"`
