 #!/usr/bin/env bash

set -u

ERR=/var/tmp/vitest.err
OUT="$(./node_modules/.bin/vitest run --reporter=json --silent 2> "$ERR" || true)"

if [ -n "$OUT" ]; then
  echo "$OUT" | tee /var/tmp/hexlet.json
  exit 0
fi

if [ -f "$ERR" ]; then
  RAW_ERR="$(tail -n 200 "$ERR")"
else
  RAW_ERR="No output from vitest"
fi

SAFE_ERR="$(printf '%s' "$RAW_ERR" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')"
printf '{"success":false,"error":"%s"}\n' "$SAFE_ERR" | tee /var/tmp/hexlet.json
exit 0

