
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function () {
				return (root.returnExportsGlobal = factory());
		});
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals
		root.Diogenes = factory();
	}
}(this, function () {

	'use strict';

	function Injector() {

		this.container = {};

	}

	Injector.INSTANCE = 1;
	Injector.CACHE_INSTANCE = 2;
	Injector.FACTORY_FUNCTION = 3;
	Injector.VALUE = 4;


	Injector.prototype = {

		/**
		*
		*  mode can either be a string or an object
		*
		*
		*/
		register : function (key, injectable, mode, locals) {

			this.container[key] = {
				injectable : injectable,
				mode : mode || Injector.INSTANCE,
				locals : locals || []
			};
		},

		has : function (key) {
			return !!this.container[key];
		},

		/**
		*
		*
		*
		*/
		get : function (key, keychain) {

			var injectableConfig = this.container[key],
			    instance,
			    injectable;

			keychain = (keychain || []).slice();

			if(keychain.indexOf(key) != -1) {

				throw Error('cyclical dependency detected for key: ' + key + ' in keychain ' + keychain);

			} else {

				keychain.unshift(key);

			}

			if(!injectableConfig) {
				throw Error('non existent injectable: ' + key);
			}

			injectable = injectableConfig.injectable;

			if(injectableConfig.mode === Injector.CACHE_INSTANCE) {
				if(injectableConfig.cachedInstance) {
					return injectableConfig.cachedInstance;
				} else {
					instance = this.createInstance(injectableConfig, keychain);
					injectableConfig.cachedInstance = instance;
				}
			} else {
				instance = this.createInstance(injectableConfig, keychain);
			}

			return instance;

		},

		createInstance : function (config, keychain) {

			var Injectable,
			    dependencies,
			    InjectableOptions = {},
			    result;

			Injectable = config.injectable;

			dependencies = Injectable.inject || [];

			dependencies.forEach(function (dependencyKey) {

				InjectableOptions[dependencyKey] = this.get(dependencyKey, keychain);

			}, this);

			switch(config.mode) {
			case Injector.INSTANCE:
			case Injector.CACHE_INSTANCE:
				result = new Injectable(InjectableOptions, config.locals);
				break;
			case Injector.FACTORY_FUNCTION:
				result = Injectable(InjectableOptions, config.locals);
				break;
			case Injector.VALUE:
				result = Injectable;
				break;
			}

			return result;

		},

		start : function (key, callback) {

			var injectable = this.get(key);

			callback(injectable);

		}


	};

	return Injector;

}));