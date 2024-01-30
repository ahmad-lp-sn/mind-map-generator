#!/bin/bash

# Fetch secrets from Google Cloud Secret Manager
OPENAI_API_KEY=$(gcloud secrets versions access latest --secret=OPENAI_API_KEY)
OPENAI_MODEL_ID=$(gcloud secrets versions access latest --secret=OPENAI_MODEL_ID)
STORAGE_TYPE=$(gcloud secrets versions access latest --secret=STORAGE_TYPE)
GCP_STORAGE_BUCKET=$(gcloud secrets versions access latest --secret=GCP_STORAGE_BUCKET)
GCP_PROJECT_ID=$(gcloud secrets versions access latest --secret=GCP_PROJECT_ID)
GCP_SA_KEY=$(gcloud secrets versions access latest --secret=GCP_SA_KEY)

# Export secrets as environment variables
export OPENAI_API_KEY OPENAI_MODEL_ID STORAGE_TYPE GCP_STORAGE_BUCKET GCP_PROJECT_ID GCP_SA_KEY

npm run build
node dist/app/index.js