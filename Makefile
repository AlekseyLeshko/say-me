.DEFAULT_TARGET: all
.PHONY: all

all: install_dependencies test build

install_dependencies: install_global_module
	npm install

install_say_me:
	npm install -g say-me

install_global_module: install_say_me
	$(eval JASMINE_IS_INSTALLED = $(shell say-me --npmmii -g -p jasmine))

	@if [ "$(JASMINE_IS_INSTALLED)" = "false" ] ; then \
		echo "installing jasmine"; \
		npm install -g jasmine; \
	fi

	@echo "jasmine is installed"

	$(eval ISTANBUL_IS_INSTALLED = $(shell say-me --npmmii -g -p istanbul))

	@if [ "$(ISTANBUL_IS_INSTALLED)" = "false" ] ; then \
		echo "installing istanbul"; \
		npm install -g istanbul; \
	fi

	@echo "istanbul is installed"

	$(eval IS_INSTALLED = $(shell say-me --npmmii -g -p codeclimate-test-reporter))

	@if [ "$(IS_INSTALLED)" = "false" ] ; then \
		echo "installing codeclimate-test-reporter"; \
		npm install -g codeclimate-test-reporter; \
	fi

	@echo "codeclimate-test-reporter is installed"

	$(eval IS_INSTALLED = $(shell say-me --npmmii -g -p gulp))

	@if [ "$(IS_INSTALLED)" = "false" ] ; then \
		echo "installing gulp"; \
		npm install -g gulp; \
	fi

	@echo "gulp is installed"

test:
	gulp jshint
	istanbul cover jasmine

build: global_install

global_remove:
	npm remove -g say-me

global_install: global_remove
	npm install -g ./

test_coverage:
	istanbul cover jasmine

clean:
	rm -rf node_modules/
	rm -rf coverage/
