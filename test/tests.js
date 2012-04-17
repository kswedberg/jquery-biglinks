/*global module:false,test:false,ok:false,equal:false */
module('basic setup', {
  setup: function() {
    var href;
    $('#qunit-fixture > div').biglinks();
  },
  teardown: function() {
    $('#qunit-fixture > div')
    .unbind('.biglinks')
    .removeClass('biglink');

    location.hash = '';
  }
});

test('container divs get biglink class', 4, function() {
  $('#qunit-fixture > div').each(function() {
    var href = $(this).find('a')[0].href;
    ok( $(this).hasClass('biglink'), '<a href="' + href  + '"> has biglink class' );
  });
});

test('mouseenter/leave adds/removes biglink-hover class', 8, function() {
  $('#qunit-fixture > div').each(function() {
    var href = $(this).find('a')[0].href;

    $(this).trigger('mouseenter');
    ok( $(this).hasClass('biglink-hover'), '<a href="' + href  + '"> has biglink-hover class' );
    $(this).trigger('mouseleave');
    ok( !$(this).hasClass('biglink-hover'), '<a href="' + href  + '"> does not have biglink-hover class' );
  });
});

test('clicking container follows link href', 4, function() {
  $('#qunit-fixture > div').each(function() {
    $(this).trigger('click');
    equal( $(this).find('a')[0].href, location.href, 'location.href equals descendant link href' );
  });
});

module('multiple calls to same element');
test('call biglinks twice', function() {
  var clicked = 0;
  var bl = $('#qunit-fixture > div').first();
  bl.biglinks({preventDefault: true});
  bl.biglinks({preventDefault: true});
  bl.find('a').first().bind('click', function() {
    clicked++;
  });
  bl.trigger('click');

  equal(clicked, 1, 'biglinks called twice, triggers once');
});

module('destroy method', {
  setup: function() {
    $('#qunit-fixture > div').biglinks();
  }
});
test('destroy removes classes and data and unbinds events', function() {
  $('#qunit-fixture > div').biglinks('destroy');
  $('#qunit-fixture > div').each(function() {
    var href = $(this).find('a')[0].href;
    var dnothave = '<div id="'+ this.id + '"> does not have ';
    var anothave = '<a href="' + href  + '"> does not have ';

    $(this).trigger('mouseenter');

    ok( !$(this).hasClass('biglink'), dnothave + 'biglink class' );
    ok( !$(this).hasClass('biglink-hover'), dnothave + 'biglink-hover class on mouseenter' );
    ok( !$(this).find('a').data('biglink'), anothave + 'biglink data');
  });

});
