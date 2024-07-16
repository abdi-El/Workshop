.PHONY: up
up:
	yarn tauri dev

.PHONY: build
build:
	yarn install --frozen-lockfile

.PHONY: build-dist
build-dist:
	yarn tauri build
