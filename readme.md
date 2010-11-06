jQuery Biglinks Plugin
======================

Simple plugin to increase the target area of links to a containing element. 

Note: This plugin is unnecessary if you're using the HTML5 doctype and applying a "shim" for older browsers because HTML5 allows for block-level elements to be wrapped in <code>&lt;a href="something"&gt;&lt;/a&gt;</code>.

Basic Usage
-----------

Say you have an unordered list, and you want each list item to appear and act like the link it wraps:

    <body>
    
      <ul class="mylist">      
        <li>
          <h3>Bobos</h3>
          <a href="/shoes/">shoes</a>
          <span>$1.99</span>
        </li>
    
        <li>
          <h3>Bozos</h3>
          <a href="/clowns/">clowns</a>
          <span>$5.99</span>
        </li>
      </ul>
      
      <!-- more HTML -->
      <script src="path/to/jquery.biglinks.js"></script>
      <script src="path/to/myscript.js"></script>
      
    </body>

You can apply the biglinks plugin from the "myscript.js" file like so:

    $('ul.mylist > li').biglinks();
    
The list items have a "biglink" class added to them, which allows you to apply styles in a stylesheet such as:

    li.biglink { cursor: pointer; }

When the user mouses over a list item, the <code>&lt;li&gt;</code> has the "biglink-hover" class added; when the user mouses out, the class is removed. This allows hover-based styles on the container element such as:

    li.biglink-hover { background-color: #ffc; }
    li.biglink-hover a { text-decoration: underline; }
    
When the user clicks anywhere within an <code>&lt;li&gt;</code>, the browser is directed to the href of the first <code>&lt;a&gt;</code> within it.

Options
-------

The Biglinks Plugin comes with three options. Here are the defaults:

    $.fn.biglinks.defaults = {
      preventDefault: false,
      biglinkClass: 'biglink',
      biglinkHoverClass: 'biglink-hover'
    };
    
You can call <code>.biglinks()</code> with an option by passing in an object map like so:

    $('ul.mylist > li').biglinks({biglinkClass: 'myclass'});
    
You can also change options for all of you calls to <code>.biglinks()</code> by modifying the <code>$.fn.biglinks.defaults</code> map directly:

    $.fn.biglinks.defaults.preventDefault = true;

If you set <code>preventDefault</code> to <code>true</code>, a click will not necessarily direct the browser to the contained link's href. Instead, it will trigger any click events that have been bound to that link.
