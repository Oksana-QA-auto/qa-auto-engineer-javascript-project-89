.PHONY: setup install dev build preview test test-local test-ci test-cov lint clean

setup:    ; npm ci
install:  ; npm ci

dev:      ; npm run dev
build:    ; npm run build
preview:  ; npm run preview

test:     ; ./node_modules/.bin/vitest run --reporter=json --silent | tee /var/tmp/hexlet.json

test-local: ; vitest run --reporter=verbose
test-ci:  ; ./node_modules/.bin/vitest run --reporter=json --silent

test-cov: ; npm test -- --coverage
lint:     ; npm run lint
clean:    ; rm -rf node_modules dist coverage .vitest tmp

