var sixHours       = 6 * 60 * 60 * 1000,
    sixHoursThirty = sixHours + 30 * 60 * 1000;

test('date-part', 15, function () {
    strictEqual(Date.parse('1970-01-01'), +new Date(1970, 0, 1, 0, 0, 0, 0), 'Unix epoch');

    strictEqual(Date.parse('2001'),       +new Date(2001, 0, 1, 0, 0, 0, 0), '2001');
    strictEqual(Date.parse('2001-02'),    +new Date(2001, 1, 1, 0, 0, 0, 0), '2001-02');
    strictEqual(Date.parse('2001-02-03'), +new Date(2001, 1, 3, 0, 0, 0, 0), '2001-02-03');
    strictEqual(Date.parse('20010203'),   +new Date(2001, 1, 3, 0, 0, 0, 0), '20010203');

    strictEqual(Date.parse('-2001'),       +new Date(-2001, 0, 1, 0, 0, 0, 0), '-2001');
    strictEqual(Date.parse('-2001-02'),    +new Date(-2001, 1, 1, 0, 0, 0, 0), '-2001-02');
    strictEqual(Date.parse('-2001-02-03'), +new Date(-2001, 1, 3, 0, 0, 0, 0), '-2001-02-03');
    strictEqual(Date.parse('-20010203'),   +new Date(-2001, 1, 3, 0, 0, 0, 0), '-20010203');

    strictEqual(Date.parse('+10000-02'),    +new Date(10000, 1, 1, 0, 0, 0, 0), '+10000-02');
    strictEqual(Date.parse('+10000-02-03'), +new Date(10000, 1, 3, 0, 0, 0, 0), '+10000-02-03');
    strictEqual(Date.parse('-10000-02'),    +new Date(-10000, 1, 1, 0, 0, 0, 0), '-10000-02');
    strictEqual(Date.parse('-10000-02-03'), +new Date(-10000, 1, 3, 0, 0, 0, 0), '-10000-02-03');

    // 2 digit years incorrectly parsed as though they were prefixed with 19
    /* disabled, since no native implementations get this right either
     strictEqual(Date.parse('0099-12-31'), +new Date(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31');
     strictEqual(Date.parse('0099-12-31T00:00Z'), Date.UTC(100, 0, 1, 0, 0, 0, 0) - 1000 * 60 * 60 * 24, '0099-12-31T00:00Z');
    */

    ok(isNaN(Date.parse('asdf')), 'invalid YYYY (asdf)');
    ok(isNaN(Date.parse('1970-as-df')), 'invalid YYYY-MM-DD (1970-as-df)');

    // TODO: Test for invalid YYYYMM and invalid YYYYY?
});

test('date-time', 96, function () {
    strictEqual(Date.parse('20010203T0405'),       +new Date(2001, 1, 3, 4, 5, 0, 0), '20010203T0405');
    strictEqual(Date.parse('20010203T040506'),     +new Date(2001, 1, 3, 4, 5, 6, 0), '20010203T040506');
    strictEqual(Date.parse('20010203T040506.007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '20010203T040506.007');
    strictEqual(Date.parse('20010203T040506,007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '20010203T040506,007');

    strictEqual(Date.parse('2001-02-03T04:05'),        +new Date(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05');
    strictEqual(Date.parse('2001-02-03T04:05:06'),     +new Date(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007');
    strictEqual(Date.parse('2001-02-03T04:05:06,007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007');

    strictEqual(Date.parse('20010203T0405Z'),       Date.UTC(2001, 1, 3, 4, 5, 0, 0), '20010203T0405Z');
    strictEqual(Date.parse('20010203T040506Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '20010203T040506Z');
    strictEqual(Date.parse('20010203T040506.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '20010203T040506.007Z');
    strictEqual(Date.parse('20010203T040506,007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '20010203T040506,007Z');

    strictEqual(Date.parse('2001-02-03T04:05Z'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05Z');
    strictEqual(Date.parse('2001-02-03T04:05:06Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06Z');
    strictEqual(Date.parse('2001-02-03T04:05:06.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007Z');
    strictEqual(Date.parse('2001-02-03T04:05:06,007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007Z');

    strictEqual(Date.parse('2001-02-03T04:05-00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05-00');
    strictEqual(Date.parse('2001-02-03T04:05:06-00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06-00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007-00');
    strictEqual(Date.parse('2001-02-03T04:05:06,007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007-00');

    strictEqual(Date.parse('2001-02-03T04:05-00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05-00');
    strictEqual(Date.parse('2001-02-03T04:05:06-00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06-00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007-00');
    strictEqual(Date.parse('2001-02-03T04:05:06,007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007-00');

    strictEqual(Date.parse('2001-02-03T04:05-00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06-00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007-00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06,007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007-00:00');

    strictEqual(Date.parse('2001-02-03T04:05+00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03T04:05+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06+00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03T04:05:06+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06.007+00:00');
    strictEqual(Date.parse('2001-02-03T04:05:06,007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03T04:05:06,007+00:00');

    strictEqual(Date.parse('2001-02-03T04:05-06'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHours, '2001-02-03T04:05-06');
    strictEqual(Date.parse('2001-02-03T04:05:06-06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHours, '2001-02-03T04:05:06-06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHours, '2001-02-03T04:05:06.007-06');
    strictEqual(Date.parse('2001-02-03T04:05:06,007-06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHours, '2001-02-03T04:05:06,007-06');

    strictEqual(Date.parse('2001-02-03T04:05-06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHoursThirty, '2001-02-03T04:05-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06-06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHoursThirty, '2001-02-03T04:05:06-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06.007-06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06,007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03T04:05:06,007-06:30');

    strictEqual(Date.parse('2001-02-03T04:05+06'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHours, '2001-02-03T04:05+06');
    strictEqual(Date.parse('2001-02-03T04:05:06+06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHours, '2001-02-03T04:05:06+06');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHours, '2001-02-03T04:05:06.007+06');
    strictEqual(Date.parse('2001-02-03T04:05:06,007+06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHours, '2001-02-03T04:05:06,007+06');

    strictEqual(Date.parse('2001-02-03T04:05+06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHoursThirty, '2001-02-03T04:05+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06+06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHoursThirty, '2001-02-03T04:05:06+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06.007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03T04:05:06.007+06:30');
    strictEqual(Date.parse('2001-02-03T04:05:06,007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03T04:05:06,007+06:30');

    strictEqual(Date.parse('20010203 0405'),       +new Date(2001, 1, 3, 4, 5, 0, 0), '20010203 0405');
    strictEqual(Date.parse('20010203 040506'),     +new Date(2001, 1, 3, 4, 5, 6, 0), '20010203 040506');
    strictEqual(Date.parse('20010203 040506.007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '20010203 040506.007');
    strictEqual(Date.parse('20010203 040506,007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '20010203 040506,007');

    strictEqual(Date.parse('2001-02-03 04:05'),        +new Date(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05');
    strictEqual(Date.parse('2001-02-03 04:05:06'),     +new Date(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06');
    strictEqual(Date.parse('2001-02-03 04:05:06.007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007');
    strictEqual(Date.parse('2001-02-03 04:05:06,007'), +new Date(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007');

    strictEqual(Date.parse('20010203 0405Z'),       Date.UTC(2001, 1, 3, 4, 5, 0, 0), '20010203 0405Z');
    strictEqual(Date.parse('20010203 040506Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '20010203 040506Z');
    strictEqual(Date.parse('20010203 040506.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '20010203 040506.007Z');
    strictEqual(Date.parse('20010203 040506,007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '20010203 040506,007Z');

    strictEqual(Date.parse('2001-02-03 04:05Z'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05Z');
    strictEqual(Date.parse('2001-02-03 04:05:06Z'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06Z');
    strictEqual(Date.parse('2001-02-03 04:05:06.007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007Z');
    strictEqual(Date.parse('2001-02-03 04:05:06,007Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007Z');

    strictEqual(Date.parse('2001-02-03 04:05-00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05-00');
    strictEqual(Date.parse('2001-02-03 04:05:06-00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06-00');
    strictEqual(Date.parse('2001-02-03 04:05:06.007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007-00');
    strictEqual(Date.parse('2001-02-03 04:05:06,007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007-00');

    strictEqual(Date.parse('2001-02-03 04:05-00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05-00');
    strictEqual(Date.parse('2001-02-03 04:05:06-00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06-00');
    strictEqual(Date.parse('2001-02-03 04:05:06.007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007-00');
    strictEqual(Date.parse('2001-02-03 04:05:06,007-00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007-00');

    strictEqual(Date.parse('2001-02-03 04:05-00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05-00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06-00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06-00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06.007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007-00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06,007-00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007-00:00');

    strictEqual(Date.parse('2001-02-03 04:05+00:00'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0), '2001-02-03 04:05+00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06+00:00'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0), '2001-02-03 04:05:06+00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06.007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06.007+00:00');
    strictEqual(Date.parse('2001-02-03 04:05:06,007+00:00'), Date.UTC(2001, 1, 3, 4, 5, 6, 7), '2001-02-03 04:05:06,007+00:00');

    strictEqual(Date.parse('2001-02-03 04:05-06'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHours, '2001-02-03 04:05-06');
    strictEqual(Date.parse('2001-02-03 04:05:06-06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHours, '2001-02-03 04:05:06-06');
    strictEqual(Date.parse('2001-02-03 04:05:06.007-06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHours, '2001-02-03 04:05:06.007-06');
    strictEqual(Date.parse('2001-02-03 04:05:06,007-06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHours, '2001-02-03 04:05:06,007-06');

    strictEqual(Date.parse('2001-02-03 04:05-06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) + sixHoursThirty, '2001-02-03 04:05-06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06-06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) + sixHoursThirty, '2001-02-03 04:05:06-06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06.007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03 04:05:06.007-06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06,007-06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) + sixHoursThirty, '2001-02-03 04:05:06,007-06:30');

    strictEqual(Date.parse('2001-02-03 04:05+06'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHours, '2001-02-03 04:05+06');
    strictEqual(Date.parse('2001-02-03 04:05:06+06'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHours, '2001-02-03 04:05:06+06');
    strictEqual(Date.parse('2001-02-03 04:05:06.007+06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHours, '2001-02-03 04:05:06.007+06');
    strictEqual(Date.parse('2001-02-03 04:05:06,007+06'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHours, '2001-02-03 04:05:06,007+06');

    strictEqual(Date.parse('2001-02-03 04:05+06:30'),        Date.UTC(2001, 1, 3, 4, 5, 0, 0) - sixHoursThirty, '2001-02-03 04:05+06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06+06:30'),     Date.UTC(2001, 1, 3, 4, 5, 6, 0) - sixHoursThirty, '2001-02-03 04:05:06+06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06.007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03 04:05:06.007+06:30');
    strictEqual(Date.parse('2001-02-03 04:05:06,007+06:30'), Date.UTC(2001, 1, 3, 4, 5, 6, 7) - sixHoursThirty, '2001-02-03 04:05:06,007+06:30');

    // TODO: More colon-free tests and DRY
});

test('extensions', 2, function () {
    strictEqual(Date.parse('2001-02-03T04:05:06.789012'), +new Date(2001, 1, 3, 4, 5, 6, 789), 'With microseconds');
    strictEqual(Date.parse('2001-02-03T04:05:06.789012Z'), Date.UTC(2001, 1, 3, 4, 5, 6, 789), 'UTC with microseconds');
});