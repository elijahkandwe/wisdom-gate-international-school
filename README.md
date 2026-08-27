# DIGI-SCHOOL Online — Multi-user School Management System

This is the production-oriented next step from the Excel-based DIGI-SCHOOL workbook. It replaces browser-only localStorage with a PostgreSQL database, secure password hashing, JWT sessions, role-based permissions and an audit log.

## Architecture
- Node.js + Express API
- PostgreSQL database
- JWT authentication
- bcrypt password hashing
- Zod request validation
- Helmet/CORS/compression
- Responsive web UI
- Excel/XLSM seed/import script

## Local setup
1. Install Node.js 20+ and PostgreSQL 15+.
2. Create a database named `digi_school`.
3. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long random `JWT_SECRET`.
4. Run the schema: `psql "$DATABASE_URL" -f sql/schema.sql`
5. Install packages: `npm install`
6. Import the supplied workbook: `npm run seed -- "/path/to/DIGI-SCHOOL (WGIS)-3new(1).xlsm"`
7. Start: `npm start`
8. Open `http://localhost:3000`.

The seed script defaults to the administrator credentials present in the workbook unless `ADMIN_PASSWORD` is set. For production, set `ADMIN_PASSWORD` explicitly before seeding and change the password immediately after first login.

## Production deployment
Recommended options: Render, Railway, Fly.io, or a VPS with managed PostgreSQL. Deploy the Node service and PostgreSQL separately, set environment variables, run the schema once, then run the seed script once.

Production checklist:
- HTTPS only
- Strong random JWT_SECRET
- Strong unique admin passwords
- Restrict CORS to the deployed domain
- Managed PostgreSQL backups + point-in-time recovery where available
- Daily database backup/export
- Server monitoring and error logging
- Never commit `.env`

## Roles
OWNER, ADMIN, ACCOUNTANT, TEACHER, LIBRARIAN, STOREKEEPER, VIEWER. The current API enforces permissions for financial/admin operations and keeps an audit trail.

## Scope
The database schema already covers students, fee schedules, payments, scholarships, alumni, library loans, products, inventory movements, users and audit logs. The web UI exposes the core dashboard, students, accounts, fees, payments, scholarships, users and audit log. The remaining Excel modules can be added to the same API/database without returning to spreadsheet storage.

## Deployment files
- `render.yaml` provisions a Render web service + managed PostgreSQL database.
- `DEPLOYMENT.md` is the production deployment runbook.
- `scripts/migrate.js` applies the SQL schema before deploy.
- `DIGI-SCHOOL (WGIS)-3new(1).xlsm` is included for the one-time production import.
