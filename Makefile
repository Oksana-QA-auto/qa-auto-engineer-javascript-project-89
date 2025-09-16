.PHONY: setup install dev build preview test test-local test-ci test-cov lint clean

setup:    ; npm ci
install:  ; npm ci

dev:      ; npm run dev
build:    ; npm run build
preview:  ; npm run preview

test:     ; npm run --silent test:ci 2>/dev/null | tee /var/tmp/report.json

test-ci:  ; npm run --silent test:ci 2>/dev/null

test-local: ; npm test

test-cov: ; npm test -- --coverage

lint:     ; npm run lint
clean:    ; rm -rf node_modules dist coverage .vitest tmp

