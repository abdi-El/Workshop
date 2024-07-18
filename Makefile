.PHONY: up
up:
	yarn tauri dev

.PHONY: build
build:
	yarn install --frozen-lockfile

.PHONY: build-dist
build-dist:
	yarn tauri build

.PHONY: delete_db
delete_db:
	rm -rf ~/.config/com.ab.workshop/workshop.*
