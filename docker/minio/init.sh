#!/bin/sh
set -e

until mc alias set local http://minio:9000 "$AWS_ACCESS_KEY_ID" "$AWS_SECRET_ACCESS_KEY" >/dev/null 2>&1; do
  sleep 2
done

mc mb -p "local/$AWS_BUCKET" >/dev/null 2>&1 || true

# OPTION 1 (simple): public download (may allow listing too)
# mc anonymous set download "local/$AWS_BUCKET"

# OPTION 2 (strict): ONLY GetObject, no list
mc anonymous set-json /policies/policy-get-only.json "local/$AWS_BUCKET"

mc anonymous list "local/$AWS_BUCKET" || true
