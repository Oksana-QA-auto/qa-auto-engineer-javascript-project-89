.PHONY: setup install dev build preview test test-ci test-cov lint clean

setup:    ; npm ci
install:  ; npm ci

dev:      ; npm run dev
build:    ; npm run build
preview:  ; npm run preview

test:     ; npm test
test-ci:  ; npm test -- --run
test-cov: ; npm test -- --coverage

lint:     ; npm run lint
clean:    ; rm -rf node_modules dist coverage .vitest


 
