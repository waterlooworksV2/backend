.PHONY: help

help: ## Possibly what you're looking for
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Initialise dependencies (brew, mongodb, yarn)
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	brew install mongodb
	brew install yarn
	yarn install

dev: ## Run the development server for debugging/testing purposes
	yarn dev

test: ## Run the tests - every PR should have tests that check the changes
	yarn test:dev

start: ## Run the server in production mode with logs disabled
	yarn start
