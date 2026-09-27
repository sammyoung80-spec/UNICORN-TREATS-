# Security Policy & Architecture — Unicorn Treats

This application is built according to production-grade security and privacy best practices.

## 1. Secrets & Credentials Isolation
- No private API keys or secret credentials are ever committed to the repository, stored in client-side code, or bundled into JavaScript assets.
- Environment variables are defined in `.env.example` without real secrets.
- Third-party social links and ordering channels are safely sandboxed. If placeholders such as `[PHONE NUMBER]` or `[WHATSAPP NUMBER]` are detected, the app prevents dead or spoofed protocol links (`tel:`, `wa.me/`) and provides a friendly user dialog.

## 2. Input Sanitization & Anti-Spam Measures
- The direct inquiry form implements client-side validation and length limits on all text inputs (`maxLength={80}`, `maxLength={500}`).
- **Honeypot protection**: An invisible input trap (`id="website-hp"`) captures automated spam bots and silently discards bot submissions without processing.
- No dynamic execution (`eval()`, `new Function()`, or `dangerouslySetInnerHTML`) is used anywhere in the codebase, preventing Cross-Site Scripting (XSS).

## 3. Privacy & Data Handling
- The landing page does not store any unnecessary personally identifiable information (PII).
- No credit card or payment information is collected or processed on this website. Payment and checkout are handled peer-to-peer or directly upon pickup/delivery via the user's selected channel (WhatsApp, Text, or Phone).
- No fake payment gateways, mock checkouts, or deceptive authentication forms exist.

## 4. External Links Security
- All external links (Instagram, Facebook, WhatsApp) utilize `rel="noopener noreferrer"` attributes to prevent tabnabbing and window hijacking.

## 5. Content Security & Headers
For production deployments (such as Cloud Run, Nginx, or Vercel), the following HTTP headers are recommended:
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

## Reporting Vulnerabilities
If you notice any security issue with this site, please notify the site maintainer directly.
