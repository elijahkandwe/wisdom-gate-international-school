# DIGI-SCHOOL production release

Target: Render + managed PostgreSQL.

Included:
- Production server hardening and graceful shutdown.
- Strict production JWT secret validation.
- Configurable database SSL and connection pool limits.
- Exact-origin CORS support.
- Render Blueprint (`render.yaml`).
- Managed PostgreSQL (`databases` section in the Blueprint).
- Automated pre-deploy schema migration.
- Health check endpoint: `/api/health`.
- One-time Excel import with SHA-256 import lock.
- Original WGIS workbook included for the initial data migration.
