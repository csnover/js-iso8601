Universal JavaScript Date.parse for ISO 8601, non-conformant edition
====================================================================

ECMAScript revision 5 adds native support for simplified [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) dates in the
`Date.parse` method, but some browsers currently on the market (Safari 5-, IE 8-, Firefox 3.6-) do not support it. This
is a simple shim for Date.parse that adds support for parsing ES5 simplified ISO 8601 strings to all browsers. *This
is the non-conformant edition of Universal JavaScript Date.parse for ISO 8601*. It violates the ES5 errata spec in the
following helpful ways:

1. Hyphens and colons are optional.
2. Dates and times without an explicit timezone are treated as being in local time.
3. Time part can be separated by a space in addition to "T". (This is a violation of ISO 8601:2004(E).)
4. Time part separator is optional.
5. Sub-second precision part can also be separated by comma.
6. Sub-second precision part can be any arbitrary precision, milliseconds or smaller.

If you want an ES5-conformant shim, please use the [master branch](https://github.com/csnover/js-iso8601/tree/master)
instead.

Caveats
-------

1. This library does *not* strictly implement the simplified ISO 8601 date time string format specified in the
   [ES5 Errata](http://wiki.ecmascript.org/doku.php?id=es3.1:es3.1_proposal_working_draft) and will not work
   identically to conforming implementations.
2. Creating a new date using the `new Date(dateString)` form will not be fixed by this shim.
3. Due to its non-standard behaviour, this JavaScript implementation will always be used in lieu of native browser
   support for parsing the simplified ISO 8601 date format.

Unit tests
----------

By default, the unit tests are configured only to test the JavaScript fallback portion of the script, which means
your browser’s native Date.parse implementation will not be used. Add “?useNativeDateParse” to the URL to run unit
tests that will use the browser’s native implementation (for browser compliance testing purposes).

**Note:** You must checkout using `git clone --recursive` in order for unit tests to function.


License
-------

© 2011 Colin Snover. [MIT Licensed](http://www.opensource.org/licenses/mit-license.php).
