# Sneakers Intro + Vertex AI

Beginner-friendly sneaker guide with an AI recommender powered by **Google Vertex AI**.

## Features
- Buying guide for first-time sneaker buyers
- Fit and authenticity checklist
- Care tips
- Starter sneaker suggestions
- AI sneaker recommender (`/api/recommend`) using Vertex AI Gemini

## Tech
- Frontend: HTML/CSS/Vanilla JS
- Backend: Node.js + Express
- AI: `@google-cloud/vertexai`

## Local run
```bash
npm install
export GOOGLE_CLOUD_PROJECT="your-project-id"
export VERTEX_LOCATION="us-central1"
export VERTEX_MODEL="gemini-1.5-flash"
# Auth via ADC (recommended)
gcloud auth application-default login
npm start
```
Open: `http://localhost:8080`

## GCP Deploy (Cloud Run)
```bash
gcloud config set project YOUR_PROJECT_ID
gcloud run deploy sneakers-intro \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID,VERTEX_LOCATION=us-central1,VERTEX_MODEL=gemini-1.5-flash
```

## Required IAM for runtime service account
- `roles/aiplatform.user`

## Notes
- Keep recommendation output educational; users should verify availability/pricing from official stores.
