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

test:
	npm test

build: local_install

local_install:
	npm install -g ./

clean:
	rm -rf node_modules/

drop:
	npm remove -g say-me
