# Quick Start Guide - Demo Version

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Create `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/demo_db"
AUTH_SECRET="your-secret-key-min-32-chars-long"
AUTH_URL="http://localhost:3000"
```

### 3. Initialize Database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with demo data (only privilege user)
npm run db:seed:demo
```

### 4. Start Application
```bash
npm run dev
```

### 5. Login
Go to http://localhost:3000

**Credentials:**
- Email: `privilege@demo.com`
- Password: `password123`

## Demo Mode Features

✅ **Role Switcher**: Click the dropdown in top-right to switch between roles  
✅ **Create Data**: Add products, sales, customers during your session  
✅ **Auto-Reset**: All data deleted automatically on logout  
✅ **Clean State**: Perfect for demos - fresh start every time  

## Testing Different Roles

1. Login with privilege@demo.com
2. Use the role switcher to change to:
   - **ADMIN** - Test product and user management
   - **SALES** - Test sales and invoicing
   - **WAREHOUSE** - Test stock management
3. Create sample data to test features
4. Logout to reset everything

## Important Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:seed:demo     # Reset to demo state
npm run db:cleanup       # Manual cleanup
npm run db:generate      # Regenerate Prisma client

# Production
npm run build            # Build for production
npm start                # Start production server
```

## Troubleshooting

**Problem**: Can't switch roles  
**Solution**: Refresh the page after switching roles

**Problem**: Data not resetting on logout  
**Solution**: Check console for errors, ensure database connection

**Problem**: Login fails  
**Solution**: Run `npm run db:seed:demo` to recreate the privilege user

---

🎭 **Demo Mode Active** - All data resets on logout!
