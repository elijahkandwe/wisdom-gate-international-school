# Production deployment — DIGI-SCHOOL

## Recommended deployment
This project is prepared for Render with a Node.js web service and PostgreSQL database. Render supports managed Postgres and Node web services, health checks, environment variables, automatic deploys from Git, and custom domains.

## 1. Put the project in GitHub
Create a private GitHub repository and upload the contents of this folder. Do **not** commit `.env`, database passwords, JWT secrets, or exported production backups.

## 2. Create the Render services
In Render, choose **New → Blueprint** and select the repository. Render will read `render.yaml`.

The blueprint creates:
- `digi-school` web service
- `digi-school-db` PostgreSQL service
- generated `JWT_SECRET`
- `/api/health` health check
- automatic schema migration before deploy

For a real school production environment, use paid/stable plans rather than free preview resources.

## 3. Set the required environment variable
Set `CORS_ORIGIN` to the exact public origin, for example:
`https://school.example.com`

If you temporarily use the Render hostname, use that hostname as the value.

## 4. Import the Excel data once
The supplied workbook is included as `DIGI-SCHOOL (WGIS)-3new(1).xlsm`.

After the first successful deployment, run the seed script **once** from the service shell or a controlled deployment job:

```bash
npm run seed -- "DIGI-SCHOOL (WGIS)-3new(1).xlsm"
```

Set `ADMIN_PASSWORD` to a new strong password before doing this. The importer records a SHA-256 fingerprint in `import_runs` and will skip the same workbook if it is accidentally run again.

## 5. Create the custom domain
In the Render web service, add the school's domain and configure the DNS records Render provides. Then change `CORS_ORIGIN` to the final HTTPS URL and redeploy.

## 6. Production security
- Use HTTPS only.
- Change the imported administrator password immediately.
- Use a unique password for every staff account.
- Keep `JWT_SECRET` private and never commit it.
- Restrict `CORS_ORIGIN` to the exact frontend origin.
- Keep PostgreSQL private; the web service should be the public application layer.
- Enable database backups/PITR on the production database plan.
- Review the audit log regularly.
- Create separate accounts for accountants, teachers, librarians, storekeepers, and viewers.

## 7. Deployment workflow
Pushes to the configured production branch can automatically deploy. The build runs `npm install`, the pre-deploy command runs `npm run migrate`, and the service starts with `npm start`.

## Local production-like test
```bash
npm install
cp .env.production.example .env
# edit .env
npm run migrate
npm start
```

## Health check
`GET /api/health` returns HTTP 200 only when the application can reach PostgreSQL.
