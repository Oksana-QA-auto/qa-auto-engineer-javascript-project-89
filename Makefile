.PHONY: setup install dev build preview test test-ci test-cov lint clean

setup:    ; npm ci
install:  ; npm ci

dev:      ; npm run dev
build:    ; npm run build
preview:  ; npm run preview

test:     ; npm run test:ci > /var/tmp/hexlet.json; cat /var/tmp/hexlet.json
test-local: ; npm test
test-ci:  ; npm run test:ci
test-cov: ; npm test -- --coverage

lint:     ; npm run lint
clean:    ; rm -rf node_modules dist coverage .vitest tmp
