define(['handlebars','text'], function (Handlebars, text) {

  var _buildMap = {};
  var _buildTemplate = Handlebars.compile(
                         'define("{{pluginName}}!{{moduleName}}", ["handlebars"], function(Handlebars){'+
                         '  return {{fn}}'+
                         '});\n'
                       );
  return {
    load: function (name, req, onLoad, config) {
      fileName = name+'.hbs';
      text.get(req.toUrl(fileName), function(data) {
        if (config.isBuild) {
          _buildMap[name] = Handlebars.precompile(data);
        }
        onLoad(Handlebars.compile(data));
      });
    },

    write: function (pluginName, moduleName, writeModule) {
      if(moduleName in _buildMap) {
        var fn = _buildMap[moduleName];
        writeModule(_buildTemplate({
          pluginName : pluginName,
          moduleName : moduleName,
          fn : fn
        }));
      }
    }
  };
});