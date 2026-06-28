#!/bin/bash
# deploy.sh — builds Lambda, deploys via SAM, then patches config.js with the real API URL
set -e

STACK_NAME="mycprc-myemt"
REGION="ap-southeast-1"
S3_DEPLOY_BUCKET="poc-mycprc-myemt"   # reuse the same bucket for SAM artifacts

echo "▶  Building SAM..."
sam build

echo "▶  Deploying stack: $STACK_NAME ..."
sam deploy \
  --stack-name "$STACK_NAME" \
  --s3-bucket  "$S3_DEPLOY_BUCKET" \
  --s3-prefix  "sam-deploy" \
  --region     "$REGION" \
  --capabilities CAPABILITY_IAM \
  --no-confirm-changeset

echo "▶  Fetching API Gateway URL..."
API_URL=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region     "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" \
  --output text)

echo "   API URL: $API_URL"

echo "▶  Patching assets/js/config.js ..."
sed -i '' "s|REPLACE_WITH_API_GATEWAY_URL|$API_URL|g" assets/js/config.js

echo ""
echo "✅  Done. API live at: $API_URL"
echo ""
echo "Next steps:"
echo "  1. Commit and push to GitHub"
echo "  2. Amplify Hosting will auto-deploy the static files"
echo "  3. Set S3 bucket CORS in AWS Console (see README)"
