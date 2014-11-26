all: install_dependencies test build

clean:
	rm -rf node_modules/

install_dependencies: install_global_module
	npm install

install_global_module:
	npm install -g jasmine

test:
	npm test

build: local_install

local_install:
	npm install -g ./
