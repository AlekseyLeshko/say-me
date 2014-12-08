.DEFAULT_TARGET: all
.PHONY: all

all: install_dependencies test build

install_dependencies: install_global_module
	npm install

install_say_me:
	npm install -g say-me

install_global_module: install_say_me
	@$(call install_npm_module,jasmine,-g)
	@$(call install_npm_module,istanbul,-g)
	@$(call install_npm_module,codeclimate-test-reporter,-g)
	@$(call install_npm_module,gulp,-g)
	@$(call install_npm_module,npm-check-updates,-g)

test:
	gulp jshint
	istanbul cover jasmine

build: global_install
	npm-check-updates

global_remove:
	npm remove -g say-me

global_install: global_remove
	npm install -g ./

test_coverage:
	istanbul cover jasmine

clean:
	rm -rf node_modules/
	rm -rf coverage/

define install_npm_module
	$(eval IS_INSTALLED = $(shell say-me --npmmii $(2) -p $(1)))
	@if [ $(IS_INSTALLED) = "false" ] ; then \
		echo "installing $(1)"; \
		npm install $(2) $(1); \
	fi
	@echo "$(1) is installed"
endef
