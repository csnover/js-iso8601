/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */
(function (Date, undefined) {
    var origParse = Date.parse, numericKeys = [ 1, 4, 5, 6, 10, 11 ];
    Date.parse = function (date) {
        var timestamp = origParse ? origParse(date) : NaN, minutesOffset = 0, struct;
        //                                  1 YYYY                     2 MM        3 DD          4 hh     5 mm        6 ss          7 msec         8 Z 9 ±    10 tzhh     11 tzmm
        if (isNaN(timestamp) && (struct = /^(-?\d{4}|[+\-]\d{5,6})(?:-?(\d{2})(?:-?(\d{2})(?:[T ](\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?)?)?$/.exec(date))) {
            // avoid NaNs timestamps caused by “undefined” values being passed to Date functions
            for (var i = 0, k; (k = numericKeys[i]); ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            // allow arbitrary sub-second precision beyond milliseconds (this is a non-standard extension to ES5)
            struct[7] = struct[7] ? +struct[7].substr(0, 3) : 0;

            // allow timestamps without timezone identifiers to be considered valid local times
            if (struct[8] === undefined && struct[9] === undefined) {
                timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);
            }
            else {
                if (struct[8] !== 'Z') {
                    minutesOffset = struct[10] * 60 + struct[11];

                    if (struct[9] === '+') {
                        minutesOffset = 0 - minutesOffset;
                    }
                }

                timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
            }
        }

        return timestamp;
    };
}(Date));