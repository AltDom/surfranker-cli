'use strict';
module.exports = Object.freeze({
  currentYear: 2021,
  defaultNumberOfEventsToThrow: 0,
  tours: ['mct', 'wct', 'mcs', 'wcs', 'mqs', 'wqs', 'mbwt', 'wbwt'],
  championshipTours: ['mct', 'wct'],
  challengerSeries: ['mcs', 'wcs'],
  qualifyingSeries: ['mqs', 'wqs'],
  bigWaveTours: ['mbwt', 'wbwt'],
  regions: [
    {
      key: 'int',
      id: 'regionId=1&'
    },
    { key: 'aus/oce', id: 'regionId=2&' },
    { key: 'af', id: 'regionId=3&' },
    { key: 'haw/nt', id: 'regionId=4&' },
    { key: 'eu', id: 'regionId=5&' },
    { key: 'as', id: 'regionId=6&' },
    { key: 'na', id: 'regionId=7&' },
    { key: 'sa', id: 'regionId=8&' }
  ],
  codePoints: [0x1f9e0, 0x1f3c4, 0x1f30a, 0x1f4be, 0x1f4ad]
});
