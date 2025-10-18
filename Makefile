DOCKER_PROJECT_KEY=example_docusaurus

DOCKER_BASE_CMD=docker exec -it $(DOCKER_PROJECT_KEY)

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_\-\.]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

start:
	docker compose up -d

full-init:
	$(DOCKER_BASE_CMD) npm install
	$(MAKE) cache-clear

test:
	$(DOCKER_BASE_CMD) npm run build

restart:
	docker stop $(shell docker ps -q)
	docker-compose up -d;
	$(MAKE) cache-clear

restart-once:
	docker stop $(shell docker ps -q)
	docker-compose up -d;

full-restart:
	docker-compose down --volumes --remove-orphans;
	docker-compose up -d --build;
	$(MAKE) cache-clear

cache-clear:
	docker exec -it $(DOCKER_PROJECT_KEY) npm run docusaurus clear;
	docker exec -it $(DOCKER_PROJECT_KEY) npm run docusaurus start

update:
	$(DOCKER_BASE_CMD) npm i @docusaurus/core@latest @docusaurus/plugin-content-docs@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/types@latest

package-fix:
	$(DOCKER_BASE_CMD) npm audit fix || true

docusaurus-version:
	$(DOCKER_BASE_CMD) npm list @docusaurus/core

swizzle:
	$(DOCKER_BASE_CMD) npm run swizzle

swizzle-list:
	$(DOCKER_BASE_CMD) npm run swizzle -- --list

new-Component:
	./scripts/newComponent.sh
	${MAKE} restart-once;
	
new-docs:
	./scripts/newDocs.sh
	${MAKE} restart-once;

new-Version:
	./scripts/newVersion.sh
	${MAKE} restart-once;
