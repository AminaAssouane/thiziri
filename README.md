# Thiziri 🌙

_Thiziri_ means "moonlight" in Kabyle — a personal health tracking web app built as a full-stack portfolio project.

## What it does

Thiziri lets you keep track of your health in one place: daily mood and health status, medications and dosage logs, appointments, chronic conditions, allergies, emergency contacts, and medical documents.

## Status

🚧 Work in progress — core CRUD features are being built out model by model before any styling pass.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** Auth.js (Credentials provider, JWT sessions)
- **File storage:** Uploadthing
- **Styling:** Tailwind CSS

## Features (planned)

- [x] Auth (sign up / log in)
- [x] Health profile
- [x] Daily health status tracking
- [x] Mood entries
- [x] Chronic illnesses & allergies
- [x] Medications + medication logs
- [x] Appointments
- [x] Emergency contacts
- [ ] Document uploads (medical records, prescriptions)
- [ ] UI/styling pass
- [ ] Google OAuth

## Data Models

- `User` — auth & account
- `HealthProfile` — allergies, chronic illnesses
- `HealthStatus` — daily health snapshot
- `MoodEntry` — daily mood, GitHub-style contribution graph
- `Medication` + `MedicationLog` — prescriptions and dosage tracking
- `Appointment` — upcoming & past medical appointments
- `EmergencyContact`
- `Document` _(in progress)_ — uploaded medical files

## Getting started

```bash
npm install
npx prisma migrate dev
npm run dev
```

## Why "Thiziri"?

Keeping a Kabyle name for this project was a deliberate choice — a small way of bringing a piece of my language and culture into my work, rather than picking something generic.
