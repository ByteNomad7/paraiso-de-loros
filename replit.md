# Parrot Adoption Website (Loros)

A static HTML website for parrot adoption in Spanish.

## Project Structure

- `index.html` — Homepage
- `adopcion-de-loros.html` — Parrot adoption info
- `available-birds/` — Individual bird pages (macaws, cockatoos, parrots, etc.)
- `blog/` — Blog articles
- `images/` — Bird photos
- `assets/img/` — Additional image assets
- Various informational HTML pages about parrot care and costs

## Running Locally

Served via Python's built-in HTTP server on port 5000:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

## Deployment

Configured as a **static** deployment with `publicDir: "."`.

## Technologies

- Pure static HTML/CSS
- No build system or package manager required
- Spanish-language content
