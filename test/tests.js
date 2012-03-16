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

module('destroy method', {
  setup: function() {
    $('#qunit-fixture > div').biglinks();
  }
});
test('destroy removes classes and unbinds events', function() {
  $('#qunit-fixture > div').biglinks('destroy');
  $('#qunit-fixture > div').each(function() {
    var href = $(this).find('a')[0].href;
    ok( !$(this).hasClass('biglink'), '<a href="' + href  + '"> does not have biglink' );
    $(this).trigger('mouseenter');
    ok( !$(this).hasClass('biglink-hover'), '<a href="' + href  + '"> does not have biglink-hover class on mouseenter' );
  });

});
