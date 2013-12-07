/**
 * require-jst
 */
define(function(require){
    'use strict';
    var _ = require('underscore');
    var text = require('text');
	var buildMap = {},
		jst = {};

	/**
	 * Loads the template content and compiles it with _.template.
	 */
	jst.load = function (name, req, load, config) {
		var compiled;
        var templateSettings = null;

        if(config.config && config.config.jst && config.config.jst.templateSettings){
            templateSettings = config.config.jst.templateSettings;
        }
		text.get(req.toUrl(name), function (content) {
			compiled = _.template(content, null, templateSettings);
			buildMap[name] = compiled;
			load(compiled);
		});
	};

	/**
	 * Writes the compiled template to file as a module.
	 */
	jst.write = function(pluginName, moduleName, write) {
		var compiled = buildMap[moduleName];
		write("define('" + pluginName + "!" + moduleName + "', " +
			"['underscore']," +
			"function (_) { return " + compiled.source + "; }" +
		");\n");
	};

	return jst;
});
