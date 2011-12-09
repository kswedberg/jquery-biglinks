/*!
 * jQuery Big Links plugin v1.1
 *
 * Date: Fri Dec 09 16:39:51 2011 EST
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
// avoid loading plugin twice
if (typeof $.fn.biglinks === 'function') { return; }

// biglinks plugin
$.fn.biglinks = function(options) {
  var opts = $.fn.biglinks.defaults,
      meth = 'init';

  if (typeof options == 'string') {
    meth = options;
  } else {
    opts = $.extend({}, opts, options || {});
  }

  var methods = {
    init: function() {
      this.each(function() {
        var $container = $(this);
        // skip this container if it doesn't have a link
        if ( !opts.link.call(this).length ) {
          return;
        }

        $container.addClass(opts.biglinkClass);

        $container.bind('click.biglinks', function(event) {
          var $link = opts.link.call(this),
              link = $link[0];

          if (opts.preventDefault) {
            event.preventDefault();
          }
          if ( !$(event.target).closest('a').length && link.href ) {

            if (opts.preventDefault === true) {
              $link.trigger('click');
            } else {
              window.location.href = link.href;
            }
          }
        });

        $container.bind('mouseenter.biglinks mouseleave.biglinks', function(event) {
          $(this).toggleClass(opts.biglinkHoverClass, event.type === 'mouseenter');
        });
      });
    },
    destroy: function() {
      this.unbind('.biglinks').removeClass(opts.biglinkClass).removeClass(opts.biglinkHoverClass);
    }
  };

  if ( methods[ meth ] ) {
    methods[ meth ].apply(this);
  }

  return this;
};

// default options
$.fn.biglinks.defaults = {
  preventDefault: false,
  biglinkClass: 'biglink',
  biglinkHoverClass: 'biglink-hover',
  link: function() {
    return $(this).find('a').eq(0);
  }
};

})(jQuery);
