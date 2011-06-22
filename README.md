Universal JavaScript Date.parse for ISO 8601
============================================

ECMAScript revision 5 adds native support for [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) dates in the
`Date.parse` method, but some browsers currently on the market (Safari 4, IE 6-8) do not support it. This is a simple
duck punching replacement for Date.parse that will provide support for parsing ISO 8601 strings if the native
environment does not do it already.


Unit tests
----------

By default, the unit tests are configured only to test the JavaScript fallback portion of the script, which means
your browser’s native Date.parse implementation will not be used. Add “?useNativeDateParse” to the URL to run unit
tests that will attempt to use native implementation first.

**Note:** You must checkout using `git clone --recursive` in order for unit tests to function.


License
-------

© 2011 Colin Snover. [MIT Licensed](http://www.opensource.org/licenses/mit-license.php).