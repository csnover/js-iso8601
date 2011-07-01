var sixHours       = 6 * 60 * 60 * 1000,
    sixHoursThirty = sixHours + 30 * 60 * 1000;

test('date-part', 16, function () {
    strictEqual(Date.parse('1970-01-01'), Date.UTC(1970, 0, 1, 0, 0, 0, 0), 'Unix epoch');

    strictEqual(Date.parse('2001'),       Date.UTC(2001, 0, 1, 0, 0, 0, 0), '2001');
    strictEqual(Date.parse('2001-02'),    Date.UTC(2001, 1, 1, 0, 0, 0, 0), '2001-02');
    strictEqual(Date.parse('2001-02-03'), Date.UTC(2001, 1, 3, 0, 0, 0, 0), '2001-02-03');

    strictEqual(Date.parse('-002001'),       Date.UTC(-2001, 0, 1, 0, 0, 0, 0), '-002001');
    strictEqual(Date.parse('-002001-02'),    Date.UTC(-2001, 1, 1, 0, 0, 0, 0), '-002001-02');
    strictEqual(Date.parse('-002001-02-03'), Date.UTC(-2001, 1, 3, 0, 0, 0, 0), '-002001-02-03');

    strictEqual(Date.parse('+010000-02'),    Date.UTC(10000, 1, 1, 0, 0, 0, 0), '+010000-02');
    strictEqual(Date.parse('+010000-02-03'), Date.UTC(10000, 1, 3, 0, 0, 0, 0), '+010000-02-03');
    strictEqual(Date.parse('-010000-02'),    Date.UTC(-10000, 1, 1, 0, 0, 0, 0), '-010000-02');
    strictEqual(Date.parse('-010000-02-03'), Date.UTC(-10000, 1, 3, 0, 0, 0, 0), '-010000-02-03');

    // 2 digit years incorrectly parsed as though they were prefixed with 19
    /* disabled, since no native implementations get this right either
     strictEqual(Date.parse('0099-12-31'), +new Date(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31');
     strictEqual(Date.parse('0099-12-31T00:00Z'), Date.UTC(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31T00:00Z');
    */

    ok(isNaN(Date.parse('asdf')), 'invalid YYYY (non-digits)');
    ok(isNaN(Date.parse('1970-as-df')), 'invalid YYYY-MM-DD (non-digits)');
    ok(isNaN(Date.parse('1970-01-')), 'invalid YYYY-MM- (extra hyphen)');
    ok(isNaN(Date.parse('19700101')), 'invalid YYYY-MM-DD (missing hyphens)');
    ok(isNaN(Date.parse('197001')), 'ambiguous YYYY-MM/YYYYYY (missing plus/minus or hyphen)');

    // TODO: Test for invalid YYYYMM and invalid YYYYY?
});

test('date-time', 31, function () {
    strictEqual(Date.parse('2001-02-03T04:05'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05');
    strictEqual(Date.parse('2001-02-03T04:05:06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');

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

    strictEqual(Date.parse('2001T04:05:06.007'),             Date.UTC(2001, 0, 1, 4, 5, 6, 7), '2001T04:05:06.007');
    strictEqual(Date.parse('2001-02T04:05:06.007'),          Date.UTC(2001, 1, 1, 4, 5, 6, 7), '2001-02T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'),       Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');

    strictEqual(Date.parse('-010000T04:05'),       Date.UTC(-10000, 0, 1, 4, 5, 0, 0), '-010000T04:05');
    strictEqual(Date.parse('-010000-02T04:05'),    Date.UTC(-10000, 1, 1, 4, 5, 0, 0), '-010000-02T04:05');
    strictEqual(Date.parse('-010000-02-03T04:05'), Date.UTC(-10000, 1, 3, 4, 5, 0, 0), '-010000-02-03T04:05');

    ok(isNaN(Date.parse('1970-01-01 00:00:00')), 'invalid date-time (missing T)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00.000000')), 'invalid date-time (too many characters in millisecond part)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00,000')), 'invalid date-time (comma instead of dot)');
    ok(isNaN(Date.parse('1970-01-01T00:00:00+0630')), 'invalid date-time (missing colon in timezone part)');
    ok(isNaN(Date.parse('1970-01-01T0000')), 'invalid date-time (missing colon in time part)');
    ok(isNaN(Date.parse('1970-01-01T00:00.000')), 'invalid date-time (msec with missing seconds)');

    // TODO: DRY
});