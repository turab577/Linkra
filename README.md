# Linkra

Modern link management platform — shorten, track, and brand your links.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env template
cp .env.local.example .env.local
# → Fill in your actual keys

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.
Open [http://localhost:3000/privacy](http://localhost:3000/privacy) to view the privacy policy.

## File Structure

```
app/
├── page.tsx                           → imports LandingParent
├── privacy/
│   ├── page.tsx                       → imports PrivacyParent
│   └── components/
│       └── PrivacyParent.tsx          ← all privacy page code
├── landing/
│   └── components/
│       └── LandingParent.tsx          ← all landing page code
├── layout.tsx
└── globals.css
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (auth + database)
- Stripe (payments)
- Meta Graph API (Instagram, WhatsApp, Facebook)
- Vercel (deployment)

## Deploy

```bash
# Push to GitHub, then connect repo on vercel.com
# Add all .env.local variables in Vercel dashboard
```

See `linkra-instructions.txt` for full setup guide.
