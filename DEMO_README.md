# Demo Version - Product Stock Management System

This is a demo version with special features for demonstration purposes.

## 🎭 Demo Features

### 1. **Auto-Reset on Logout**
- All data is automatically cleaned when you log out
- Only the PRIVILEGE user credentials remain
- No sample data persists between sessions

### 2. **Role Switching**
- Switch between different user roles while logged in
- Test features available to different roles:
  - **PRIVILEGE** (Super Admin): Full access to all features
  - **ADMIN**: Manage products, variants, and users
  - **SALES**: Record sales and generate invoices
  - **WAREHOUSE**: Record incoming stock
- Role switcher appears in the top-right corner after login

### 3. **Session-Based Data**
- All data you create persists during your login session
- Data resets only after logout
- Perfect for demos and testing

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/demo_db"
   AUTH_SECRET="your-auth-secret-here"
   AUTH_URL="http://localhost:3000"
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Seed initial data (privilege user only)
   npm run db:seed
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the demo**
   Open http://localhost:3000

## 🔐 Default Login

After seeding, only the PRIVILEGE user exists:
- **Email**: privilege@demo.com
- **Password**: password123

## 📝 How Demo Mode Works

### On Login
- You can switch roles using the role switcher in the top-right
- Create data (products, sales, customers, etc.)
- All data persists during your session

### On Logout
- Database is automatically cleaned
- All tables are emptied EXCEPT:
  - PRIVILEGE user account
  - Company profile settings (optional)
- System is reset to initial state

## 🎯 Use Cases

Perfect for:
- **Sales Demos**: Show features to potential customers
- **Training Sessions**: Train users on different roles
- **Feature Testing**: Test role-based permissions
- **Presentations**: Clean slate for each presentation

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database
npm run db:cleanup     # Manual cleanup (keeps PRIVILEGE user)
```

## 📂 Key Files Modified for Demo

1. **API Routes**
   - `/src/app/api/auth/logout/route.ts` - Auto-reset on logout
   - `/src/app/api/demo/reset/route.ts` - Manual reset endpoint
   - `/src/app/api/demo/switch-role/route.ts` - Role switching

2. **Components**
   - `/src/components/demo/DemoBanner.tsx` - Demo mode indicator
   - `/src/components/demo/DemoRoleSwitcher.tsx` - Role switching UI
   - `/src/components/layout/Sidebar.tsx` - Custom logout handler

3. **Layout**
   - `/src/app/dashboard/layout.tsx` - Integrates demo components

## 🔄 Reset Process

### Automatic (on Logout)
Deletes in order:
1. Activity Logs
2. Sale Items & Sales
3. Customers
4. Stock Entry Items & Stock Entries
5. Product Variants & Variant Values
6. Variant Options & Variant Types
7. Products
8. Categories
9. Non-PRIVILEGE users

### Manual Reset
If needed, you can manually reset:
```bash
npm run db:cleanup
```

## ⚠️ Important Notes

- **Not for Production**: This demo mode should NOT be used in production
- **Data Loss**: All data is lost on logout
- **Single User**: Best for single-user demo sessions
- **Database Access**: Requires direct database access for reset

## 🔒 Security Considerations

For production use, you should:
- Remove all demo-related code
- Implement proper user management
- Add data persistence
- Remove auto-reset functionality
- Add proper authorization checks

## 📧 Support

For issues or questions about the demo setup, check the original project documentation.

---

**Version**: Demo 1.0  
**Based on**: Product Stock Management System v1.0.0
