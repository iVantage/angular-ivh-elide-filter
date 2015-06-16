
/**
 * Smart cropping for text in AngularJS apps
 *
 * @package ivh.elideFilter
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.elideFilter')
  .filter('ivhElide', function() {
    'use strict';

    var limit = 25
      , hardBreak = false
      /**
       * @todo Make these configurable
       *
       * The "more" indicator should be configurable
       *
       * For soft breaks, how far back and forward we'll look before giving up
       * and breaking on `limit` exactly.
       */
      , more = '...'
      , softRadius = [3, 2];

    // For eventual options provider

    // /**
    //  * The filter will look to break strings after `l` characters
    //  *
    //  * The default character limit is 12. It may be set on a case by case basis
    //  * (e.g. ` 'my string' | ivhElide:3`) but this lets you set the limit globally.
    //  *
    //  * @param {int} l Number of chars to elide afer
    //  */
    // this.setCharLimit = function(l) {
    //   limit = l;
    // };

    // /**
    //  * Unless hard break is set we'll try to break on word barriers
    //  *
    //  * If hard break is set to `false` (the default) we'll break at the nearest
    //  * word barrier rather than right at `limit`.
    //  *
    //  * @param {Boolean} bool [optional] Whether or not to break hard at `limit`
    //  */
    // this.useHardBreak = function(bool) {
    //   hardBreak = angular.isUndefined(bool) ? true : bool;
    // };

    /**
     * Filter for nicely truncating text
     *
     * `str` will be truncated to `lim` characters with ellipses added as
     * necessary. If `hard` is truthy we'll always break on `lim` exactly,
     * otherwise we'll look for a nearby word break.
     *
     * @param {String} str The string to truncate
     * @param {int} lim [optional] The max chars to keep
     * @param {Boolean} hard [optional] Whether or not to use a hard break
     */
    return function(str, lim, hard) {
      lim = angular.isUndefined(lim) ? limit : lim;
      hard = angular.isUndefined(hard) ? hardBreak : hard;

      var strlen = str.length;

      if(str < lim) {
        return str;
      }

      if(!hard && strlen < lim + softRadius[1]) {
        return str;
      }

      if(hard) {
        return str.substring(0, lim) + more;
      }

      // So our string is too long and we're doing soft breaks...

      // Do we happen to be right between words?
      if(/\W/.test(str.charAt(lim))) {
        return str.substring(0, lim) + more;
      }

      // We're in the middle of a word, welp.
      var basex = lim, ix = 0, doneForward = false, doneBack = false;
      while(!doneForward && !doneBack) {
        ix++;
        if(!doneForward) {
          if(/\W/.test(str.charAt(basex + ix))) {
            return str.substring(0, lim + ix) + more;
          }
          if(ix > softRadius[1]) {
            doneForward = true;
          }
        }

        if(!doneBack) {
          if(/\W/.test(str.charAt(basex - ix))) {
            return str.substring(0, lim - ix) + more;
          }
          if(ix > softRadius[0]) {
            doneBack = true;
          }
        }
      }

      // Womp womp
      return str.substring(0, lim) + more;
    };
  });
