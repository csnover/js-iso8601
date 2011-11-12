Universal JavaScript Date.parse for ISO 8601
============================================

ECMAScript revision 5 adds native support for simplified [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) dates in the
`Date.parse` method, but some browsers currently on the market (Safari 5-, IE 8-, Firefox 3.6-) do not support it. This
is a simple shim for Date.parse that adds support for parsing ES5 simplified ISO 8601 strings to all browsers.

If you are attempting to parse date strings coming from non-ES5-conformant backends, please consider using the
[non-conformant edition](https://github.com/csnover/js-iso8601/tree/lax).

Caveats
-------

1. This library strictly implements the simplified ISO 8601 date time string format specified in the
   [ES5 Errata](http://wiki.ecmascript.org/doku.php?id=es3.1:es3.1_proposal_working_draft) (§15.9.1.15) and will *not*
   parse ISO 8601 variants that would otherwise be considered valid under ISO 8601:2004(E).
2. Creating a new date using the `new Date(dateString)` form will not be fixed by this shim.
3. ES5 §15.9.4.2 states that parsing for Date Time String Format must occur prior to any implementation-specific date
   format parsing; therefore, this JavaScript implementation will always be used in lieu of native browser support
   for parsing the simplified ISO 8601 date format.

Unit tests
----------

By default, the unit tests are configured only to test the JavaScript fallback portion of the script, which means
your browser’s native Date.parse implementation will not be used. Add “?useNativeDateParse” to the URL to run unit
tests that will use the browser’s native implementation (for browser compliance testing purposes).

**Note:** You must checkout using `git clone --recursive` in order for unit tests to function.


License
-------

© 2011 Colin Snover. [MIT Licensed](http://www.opensource.org/licenses/mit-license.php).
