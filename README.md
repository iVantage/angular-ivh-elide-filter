
# ivh.elideFilter

[![Build Status](https://secure.travis-ci.org/iVantage/angular-ivh-elide-filter.png?branch=master)](https://travis-ci.org/iVantage/angular-ivh-elide-filter)

> Smart cropping for text in AngularJS apps.


## Installation

Install with bower:

```
bower install --save angular-ivh-elide-filter
```


## Usage

Add this module as a dependency to your app:

```
angular.module('myApp', ['ivh.elideFilter']);
```

Use it in your views:

```
{{'super super super long text' | ivhElide}}
```

Inject it for profit:

```javascript
inject(function(ivhElideFilter) {
  var longText = 'super super super long text'
    , shorText = ivhElideFilter(longText);
});
```


### Filter Signature

#### `ivhElideFilter(str[, lim=25][, hard=false])`

Returns a version of `str` limited to `lim` characters, if the `str` is elided
three dots will be appended to it: `...`. By default, this filter will look for
a convenient word break *near* `lim` characters to break on if possible. If you
prefer a hard break pass `true` as the last parameter.


## Testing

Use `npm test` to run the full suite of linting, style checks, and unit tests.

Or, run each individually:

- Use `grunt jshint` for linting
- Use `grunt jscs` for coding style checks
- Use `grunt jasmine` to unit tests

For ease of development the `grunt watch` task will run each of the above as
needed when you make changes to source files.


## Changelog

- 2015-06-16 v0.0.1 Initial release


## License

MIT
