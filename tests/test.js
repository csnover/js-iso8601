var sixHours       = 6 * 60 * 60 * 1000,
    sixHoursThirty = sixHours + 30 * 60 * 1000;

test('date-part', 16, function () {
    strictEqual(Date.parse('1970-01-01'), +new Date(1970, 0, 1, 0, 0, 0, 0), 'Unix epoch');

    strictEqual(Date.parse('2001'),       +new Date(2001, 0, 1, 0, 0, 0, 0), '2001');
    strictEqual(Date.parse('2001-02'),    +new Date(2001, 1, 1, 0, 0, 0, 0), '2001-02');
    strictEqual(Date.parse('2001-02-03'), +new Date(2001, 1, 3, 0, 0, 0, 0), '2001-02-03');

    strictEqual(Date.parse('-002001'),       +new Date(-2001, 0, 1, 0, 0, 0, 0), '-002001');
    strictEqual(Date.parse('-002001-02'),    +new Date(-2001, 1, 1, 0, 0, 0, 0), '-002001-02');
    strictEqual(Date.parse('-002001-02-03'), +new Date(-2001, 1, 3, 0, 0, 0, 0), '-002001-02-03');

    strictEqual(Date.parse('+010000-02'),    +new Date(10000, 1, 1, 0, 0, 0, 0), '+010000-02');
    strictEqual(Date.parse('+010000-02-03'), +new Date(10000, 1, 3, 0, 0, 0, 0), '+010000-02-03');
    strictEqual(Date.parse('-010000-02'),    +new Date(-10000, 1, 1, 0, 0, 0, 0), '-010000-02');
    strictEqual(Date.parse('-010000-02-03'), +new Date(-10000, 1, 3, 0, 0, 0, 0), '-010000-02-03');

    strictEqual(Date.parse('19700101'),      +new Date(1970, 0, 1, 0, 0, 0, 0), 'non-hyphenated Unix epoch');

    // 2 digit years incorrectly parsed as though they were prefixed with 19
    /* disabled, since no native implementations get this right either
     strictEqual(Date.parse('0099-12-31'), +new Date(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31');
     strictEqual(Date.parse('0099-12-31T00:00Z'), Date.UTC(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31T00:00Z');
    */

    ok(isNaN(Date.parse('asdf')), 'invalid YYYY (non-digits)');
    ok(isNaN(Date.parse('1970-as-df')), 'invalid YYYY-MM-DD (non-digits)');
    ok(isNaN(Date.parse('1970-01-')), 'invalid YYYY-MM- (extra hyphen)');
    strictEqual(Date.parse('197001'), +new Date(1970, 0, 1, 0, 0, 0, 0), 'non-hyphenated year-month');

    // TODO: Test for invalid YYYYMM and invalid YYYYY?
});

test('date-time', 33, function () {
    strictEqual(Date.parse('2001-02-03T04:05'),        +new Date(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05');
    strictEqual(Date.parse('2001-02-03T04:05:06'),     +new Date(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');

    strictEqual(Date.parse('2001-02-03T04:05Z'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05Z');
    strictEqual(Date.parse('2001-02-03T04:05:06Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06Z');
    strictEqual(Date.parse('2001-02-03T04:05:06.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007Z');

    strictEqual(Date.parse('2001-02-03T04:05-00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06-00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007-00:00');

    strictEqual(Date.parse('2001-02-03T04:05+00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06+00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007+00:00');

    strictEqual(Date.parse('2001-02-03T04:05-06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHoursThirty, '2001-02-03T04:05-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06-06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHoursThirty, '2001-02-03T04:05:06-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');

    strictEqual(Date.parse('2001-02-03T04:05+06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHoursThirty, '2001-02-03T04:05+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06+06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHoursThirty, '2001-02-03T04:05:06+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03T04:05:06.007+06:30');

    strictEqual(Date.parse('2001T04:05:06.007'),             +new Date(2001, 0, 1, 4, 5, 6, 7), '2001T04:05:06.007');
    strictEqual(Date.parse('2001-02T04:05:06.007'),          +new Date(2001, 1, 1, 4, 5, 6, 7), '2001-02T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'),       +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.07'),       +new Date(2001, 1, 3, 4, 5, 6, 70), '2001-02-03T04:05:06.07');
    strictEqual(Date.parse('2001-02-03T04:05:06.7'),       +new Date(2001, 1, 3, 4, 5, 6, 700), '2001-02-03T04:05:06.7');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');

    strictEqual(Date.parse('-010000T04:05'),       +new Date(-10000, 0, 1, 4, 5, 0, 0), '-010000T04:05');
    strictEqual(Date.parse('-010000-02T04:05'),    +new Date(-10000, 1, 1, 4, 5, 0, 0), '-010000-02T04:05');
    strictEqual(Date.parse('-010000-02-03T04:05'), +new Date(-10000, 1, 3, 4, 5, 0, 0), '-010000-02-03T04:05');

    strictEqual(Date.parse('1970-01-01 00:00:00Z'),       Date.UTC(1970, 0, 1, 0, 0, 0, 0), 'space-separated datetime');
    strictEqual(Date.parse('1970-01-01T00:00:00.987654'), +new Date(1970, 0, 1, 0, 0, 0, 987), 'extended sub-second precision');
    strictEqual(Date.parse('1970-01-01T00:00:00,123'),    +new Date(1970, 0, 1, 0, 0, 0, 123), 'comma-delimited milliseconds');
    strictEqual(Date.parse('1970-01-01T00:00:00+0630'),   Date.UTC(1970, 0, 1, 0, 0, 0, 0) - sixHoursThirty, 'colon-free timezone part');
    strictEqual(Date.parse('1970-01-01T0000'),            +new Date(1970, 0, 1, 0, 0, 0, 0), 'colon-free time part');
    ok(isNaN(Date.parse('1970-01-01T00:00.000')), 'invalid date-time (msec with missing seconds)');

    // TODO: DRY
});