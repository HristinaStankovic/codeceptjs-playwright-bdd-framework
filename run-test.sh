#!/bin/bash

# Create logs directory if it doesn't exist
mkdir -p logs

# Get current timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Run the command based on the first argument
case "$1" in
  "web")
    codeceptjs run --grep @web --steps 2>&1 | tee "logs/web_ui_test_${TIMESTAMP}.log"
    ;;
  "web:headless")
    HEADLESS=true codeceptjs run --grep @web --steps 2>&1 | tee "logs/web_ui_headless_test_${TIMESTAMP}.log"
    ;;
  "api")
    API_ONLY=true codeceptjs run --grep @api --steps 2>&1 | tee "logs/api_test_${TIMESTAMP}.log"
    ;;
  "all")
    codeceptjs run --steps 2>&1 | tee "logs/all_tests_${TIMESTAMP}.log"
    ;;
  *)
    echo "Usage: ./run-test.sh [web|web:headless|api|all]"
    exit 1
    ;;
esac
