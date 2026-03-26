# Parody AI Detector

## What This Is
A parody AI detector website that always flags any text as 95-100% AI generated. Pure frontend, no backend. Deployed to Railway via Docker/nginx.

## Tech Stack
- Static HTML/CSS/JS (no build step)
- compromise.js via CDN for browser-side POS tagging
- nginx:alpine Docker container for serving

## Project Structure
```
site/           - Static files served by nginx
  index.html    - Main page
  css/style.css - All styles
  js/
    app.js      - Main controller, event handling
    gauge.js    - SVG semicircular gauge with animation
    analyzer.js - compromise.js text analysis + highlight generation
    models.js   - AI model list + random selection
Dockerfile      - Railway deployment (nginx:alpine)
nginx.conf      - nginx config template (uses $PORT env var)
```

## Development
Open `site/index.html` directly in a browser. No build step needed. compromise.js loads from CDN.

## Deployment
- GitHub repo: `fake-ai-detector`
- Railway: auto-deploys from Dockerfile
- The Dockerfile uses envsubst to inject Railway's `$PORT` env var into nginx config
