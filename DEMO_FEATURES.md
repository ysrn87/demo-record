# Demo Features Documentation

## Overview

This demo version includes special features designed for demonstrations, training, and testing purposes.

## Feature 1: Auto-Reset on Logout

### How It Works
- When you click "Sign Out", the system automatically:
  1. Deletes all activity logs
  2. Removes all sales and sale items
  3. Deletes all customers
  4. Clears all stock entries
  5. Removes all product variants and products
  6. Deletes all categories
  7. Removes all non-PRIVILEGE users
  8. Signs you out
  9. Redirects to login page

### What's Preserved
- PRIVILEGE user account (privilege@demo.com)
- Company profile settings
- Database schema

### Why This Is Useful
- Start each demo with a clean slate
- No need to manually clean up test data
- Consistent demo experience every time
- Perfect for training sessions

## Feature 2: Role Switching

### Available Roles

#### PRIVILEGE (Super Admin)
- **Full Access** to all features
- Can view reports
- Can manage all user types
- Can access all settings
- Best for: Full system demonstrations

#### ADMIN
- Manage products and variants
- Manage pricing
- Create and manage users (Sales, Warehouse)
- Access settings
- Best for: Product and user management demos

#### SALES
- Record sales transactions
- Generate invoices
- View customers
- Best for: Sales process demonstrations

#### WAREHOUSE
- Record incoming stock
- View stock levels
- Manage inventory
- Best for: Inventory management demos

### How to Switch Roles

1. **Locate the Role Switcher**
   - Found in the top-right corner after login
   - Shows current role (e.g., "Demo Mode: Privilege")

2. **Open the Dropdown**
   - Click on the role switcher button
   - View all available roles

3. **Select New Role**
   - Click on any role to switch
   - Current role is highlighted
   - System will update in ~1 second

4. **Verify Switch**
   - Page will refresh
   - New role appears in the switcher
   - Available menu items update based on role

### Role Permissions Matrix

| Feature | PRIVILEGE | ADMIN | SALES | WAREHOUSE |
|---------|-----------|-------|-------|-----------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Products | ✅ | ✅ | ❌ | ❌ |
| Stock In | ✅ | ✅ | ❌ | ✅ |
| Sales | ✅ | ✅ | ✅ | ❌ |
| Customers | ✅ | ✅ | ✅ | ❌ |
| Stock Levels | ✅ | ✅ | ❌ | ✅ |
| Reports | ✅ | ❌ | ❌ | ❌ |
| User Management | ✅ | ✅* | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ |

*ADMIN can only manage SALES and WAREHOUSE users

## Feature 3: Demo Banner

### Visual Indicator
- Bright yellow banner at the top of all pages
- Shows "🎭 DEMO MODE ACTIVE"
- Reminds users that data will reset on logout
- Cannot be dismissed (intentional)

### Purpose
- Makes it clear this is a demo environment
- Prevents confusion about data persistence
- Sets proper expectations for users

## Common Demo Workflows

### Workflow 1: Product Management Demo
1. Login as PRIVILEGE
2. Switch to ADMIN role
3. Navigate to Products
4. Create sample products with variants
5. Show product management features
6. Logout to reset

### Workflow 2: Sales Process Demo
1. Login as PRIVILEGE
2. Create sample products (as ADMIN)
3. Create sample customers
4. Switch to SALES role
5. Record a few sales transactions
6. Generate invoices
7. Show reports (switch back to PRIVILEGE)
8. Logout to reset

### Workflow 3: Inventory Management Demo
1. Login as PRIVILEGE
2. Create sample products (as ADMIN)
3. Switch to WAREHOUSE role
4. Record stock entries
5. Show stock levels
6. Switch to SALES and record sales
7. Switch to WAREHOUSE and show updated stock
8. Logout to reset

### Workflow 4: Multi-Role Training
1. Login as PRIVILEGE
2. Show PRIVILEGE features
3. Switch to ADMIN - show admin features
4. Switch to SALES - show sales features
5. Switch to WAREHOUSE - show warehouse features
6. Demonstrate how different roles see different features
7. Logout to reset

## Technical Details

### API Endpoints

```
POST /api/auth/logout
- Triggers auto-reset
- Cleans database
- Signs out user
- Returns redirect URL

POST /api/demo/switch-role
- Changes user role in database
- Requires authentication
- Updates session
- Returns new role

POST /api/demo/reset
- Manual reset endpoint (if needed)
- Cleans database
- Does not sign out user
```

### Database Reset Order

The system deletes in this specific order to respect foreign key constraints:

1. ActivityLog (no dependencies)
2. SaleItem (depends on Sale)
3. Sale (depends on Customer, User)
4. Customer (no dependencies)
5. StockEntryItem (depends on StockEntry)
6. StockEntry (depends on User)
7. ProductVariantValue (depends on ProductVariant)
8. ProductVariant (depends on Product)
9. VariantOption (depends on VariantType)
10. VariantType (depends on Product)
11. Product (depends on Category)
12. Category (no dependencies)
13. Non-PRIVILEGE Users

### Session Management

- Role changes update the database immediately
- Session refreshes to reflect new role
- Permissions update in real-time
- Navigation menu updates based on new role

## Best Practices for Demos

### Before Demo
- [ ] Clear browser cache
- [ ] Logout from any previous session
- [ ] Login fresh
- [ ] Verify privilege user credentials work

### During Demo
- [ ] Explain demo mode features upfront
- [ ] Show role switcher early
- [ ] Create realistic sample data
- [ ] Use real-world scenarios
- [ ] Demonstrate role differences

### After Demo
- [ ] Simply logout - no manual cleanup needed
- [ ] System auto-resets
- [ ] Ready for next demo

## Limitations

### What Demo Mode Does NOT Do
- ❌ Protect against concurrent users (single-user only)
- ❌ Store demo history across sessions
- ❌ Allow selective data persistence
- ❌ Provide data backup/restore
- ❌ Support production workloads

### When NOT to Use Demo Mode
- ❌ Production environments
- ❌ Real customer data
- ❌ Long-term testing
- ❌ Multi-user scenarios
- ❌ Data preservation requirements

## Troubleshooting

### Role Switch Not Working
**Symptoms**: Click role, nothing happens  
**Solution**: 
1. Check browser console for errors
2. Verify database connection
3. Refresh page manually
4. Re-login if needed

### Data Not Resetting
**Symptoms**: Old data still present after logout  
**Solution**:
1. Check server logs for reset errors
2. Verify database permissions
3. Run manual cleanup: `npm run db:cleanup`
4. Check DATABASE_URL in .env

### Login Fails
**Symptoms**: Cannot login with privilege@demo.com  
**Solution**:
1. Run: `npm run db:seed:demo`
2. Verify .env configuration
3. Check database connection
4. Check password: `password123`

### Demo Banner Missing
**Symptoms**: Yellow banner not showing  
**Solution**:
1. Verify you're on a dashboard page
2. Check browser console for errors
3. Clear browser cache
4. Refresh page

## Security Notes

⚠️ **Important**: Demo mode is NOT secure for production use because:
- Auto-reset can cause data loss
- Single credential for all demos
- No audit trail preservation
- Simplified authentication
- Public credential (privilege@demo.com)

For production:
1. Remove all demo-related code
2. Implement proper user management
3. Add data persistence policies
4. Implement proper authorization
5. Use secure credential management

---

**Remember**: This is a demo environment. All data is temporary and will be reset on logout!
