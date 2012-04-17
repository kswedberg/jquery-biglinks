/*!
 * jQuery Big Links plugin v1.2
 *
 * Date: Fri Mar 16 10:15:28 2012 EDT
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
// first argument is options map or method name string.
// If method name string, then 2nd argument can be used as options map
$.fn.biglinks = function(options, methodOpts) {
  var opts = $.fn.biglinks.defaults,
      meth = 'init',
      slice = Array.prototype.slice;

  if (typeof options == 'string') {
    meth = options;
    options = methodOpts;
  }

  opts = $.extend({}, opts, options || {});

  var methods = {
    init: function(iOpts) {
      var o = $.extend({}, opts, iOpts || {});

      this.each(function() {
        var $container = $(this);
        var $link = o.link.call(this);
        var link = $link[0];
        var biglinked = $link.data('biglink');

        // skip this container if it doesn't have a link
        // or if the link has already been "biglinked"
        if ( !link || biglinked ) {
          return;
        }

        // mark the container as "biglinked"
        $link.data('biglink', true);

        $container.addClass(o.biglinkClass);

        $container.bind('click.biglinks', function(event) {

          if (o.preventDefault) {
            event.preventDefault();
          }
          if ( !$(event.target).closest('a').length && link.href ) {

            if (o.preventDefault === true) {
              $link.trigger('click');
            } else {
              window.location.href = link.href;
            }
          }
        });

        $container.bind('mouseenter.biglinks mouseleave.biglinks', function(event) {
          $(this).toggleClass(o.biglinkHoverClass, event.type === 'mouseenter');
        });
      });
    },
    destroy: function(dOpts) {
      var o = $.extend({}, opts, dOpts || {});
      this.each(function() {
        var linked,
            $link = o.link.call(this);

        $link.removeData('biglink');
        linked = $(this).find('a').filter(function() {
          return !!$(this).data('biglink');
        }).length;

        if (!linked) {
          $(this).unbind('.biglinks').removeClass(o.biglinkClass).removeClass(o.biglinkHoverClass);
        }

      });
    }

  };

  if ( methods[ meth ] ) {
    methods[ meth ].apply( this, slice.call(arguments, 1) );
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
