# Deployment Notes

This folder documents the deployable shape without exposing any client-specific infrastructure.

- Web: Vercel or any Next.js-compatible host.
- API: Docker image behind Caddy.
- Secrets: kept outside the repository and injected through host-level environment variables.
- Public sample data: anonymized data only.

The original client implementation used the same separation of concerns: browser app, API boundary,
shared schemas, and infrastructure manifests. Business-specific formulas and partner integrations are
intentionally removed from this portfolio version.
