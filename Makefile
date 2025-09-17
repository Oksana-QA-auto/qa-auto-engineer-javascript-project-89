.PHONY: setup install dev build preview test test-local lint clean

setup:    ; npm ci
install:  ; npm ci

dev:      ; npm run dev
build:    ; npm run build
preview:  ; npm run preview

test:
	./node_modules/.bin/vitest run --reporter=json --silent > /var/tmp/hexlet.json
	cat /var/tmp/hexlet.json

test-local: ; ./node_modules/.bin/vitest run --reporter=verbose

lint:     ; npm run lint
clean:    ; rm -rf node_modules dist coverage .vitest tmp



