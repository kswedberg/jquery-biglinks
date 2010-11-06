/*!
 * jQuery Big Links plugin v1.0  
 * 
 * Date: 
 * Requires: jQuery v1.3.2+
 *
 * Copyright 2010, Karl Swedberg
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Increase the target area of links to a containing element
 *
 *
*/

(function($) {

$.fn.biglinks = function(options) {
  var opts = $.extend({}, $.fn.biglinks.defaults, options || {});
  
  this.addClass(opts.biglinkClass);
  
  this.bind('click.biglinks', function(event) {
    var $firstLink = $(this).find('a').eq(0);
    
    if (opts.preventDefault === true) {
      event.preventDefault();
      $firstLink.trigger('click');
    } else if ( !$(event.target).closest('a').length ) {
      window.location.href = $firstLink[0].href;
    }
  });
  
  this.bind('mouseenter.biglinks mouseleave.biglinks', function(event) {
    $(this).toggleClass(opts.biglinkHoverClass, event.type === 'mouseenter');
  });
  
  return this;
};

// default options
$.fn.biglinks.defaults = {
  preventDefault: false,
  biglinkClass: 'biglink',
  biglinkHoverClass: 'biglink-hover'
};

})(jQuery);
