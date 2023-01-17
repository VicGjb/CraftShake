#!/bin/sh

echo "Pre-Build Steps"
echo "authenticating with AWS ESR..."
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 056327306075.dkr.ecr.eu-central-1.amazonaws.com

echo "Build steps:"
echo "image build..."
docker build -t 056327306075.dkr.ecr.eu-central-1.amazonaws.com/craftshake-frontend:latest .

echo "Post-Build Steps:"
echo "pushing image to AWS ECR..."
docker push 056327306075.dkr.ecr.eu-central-1.amazonaws.com/craftshake-frontend:latest