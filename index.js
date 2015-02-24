
module.exports = function(pg) {
  pg.Client.prototype.query = (function(fn) {
    return function() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }

      if (args[0].query && args[0].values) {
        var i = 1;
        var query = args[0].query.replace(/\?/g, function() {
          return '$' + i++;
        });

        return fn.call(this, { text: query, values: args[0].values }, args[1]);
      }

      return fn.apply(this, args);
    }
  })(pg.Client.prototype.query);
};
