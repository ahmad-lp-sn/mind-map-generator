#!/bin/bash

# Fetch secrets from Google Cloud Secret Manager
OPENAI_API_KEY=$(gcloud secrets versions access latest --secret=openai-api-key)
OPENAI_MODEL_ID=$(gcloud secrets versions access latest --secret=openai-model-id)
STORAGE_TYPE=$(gcloud secrets versions access latest --secret=storage-type)
GCP_STORAGE_BUCKET=$(gcloud secrets versions access latest --secret=gcp-storage-bucket)
GCP_PROJECT_ID=$(gcloud secrets versions access latest --secret=gcp-project-id)
GCP_SA_KEY=$(gcloud secrets versions access latest --secret=gcp-sa-key)

# Export secrets as environment variables
export OPENAI_API_KEY OPENAI_MODEL_ID STORAGE_TYPE GCP_STORAGE_BUCKET GCP_PROJECT_ID GCP_SA_KEY

node run build
pm2 restart dist/app/index.js