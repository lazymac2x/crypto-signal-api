#!/bin/bash
# Cloudflare Quick Tunnel for crypto-signal-api
# Captures the public URL and saves it for reference

LOG_DIR="/Users/lazymac_2x/Projects/active/crypto-signal-api/logs"
mkdir -p "$LOG_DIR"

exec /opt/homebrew/bin/cloudflared tunnel --url http://localhost:3100 2>&1 | tee "$LOG_DIR/tunnel.log"
