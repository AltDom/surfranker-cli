'use strict';
module.exports = Object.freeze({
  currentYear: 2021,
  defaultNumberOfEventsToThrow: 0,
  championshipTours: ['mct', 'wct'],
  challengerSeries: ['mcs', 'wcs'],
  qualifyingSeries: ['mqs', 'wqs'],
  bigWaveTours: ['mbwt', 'wbwt'],
  juniorTours: ['mjun', 'wjun'],
  longboardTours: ['mlt', 'wlt'],
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
  tours: [
    {
      id: 'mct',
      name: 'Mens Championship Tour',
      years: [
        { year: 2021 },
        { year: 2020 },
        { year: 2019 },
        { year: 2018 },
        { year: 2017 },
        { year: 2016 },
        { year: 2015 },
        { year: 2014 },
        { year: 2013 },
        { year: 2012 },
        { year: 2011 },
        { year: 2010 }
      ]
    },
    {
      id: 'wct',
      name: 'Womens Championship Tour',
      years: [
        { year: 2021 },
        { year: 2020 },
        { year: 2019 },
        { year: 2018 },
        { year: 2017 },
        { year: 2016 },
        { year: 2015 },
        { year: 2014 },
        { year: 2013 },
        { year: 2012 },
        { year: 2011 },
        { year: 2010 }
      ]
    },
    {
      id: 'mcs',
      name: 'Mens Challenger Series',
      years: [{ year: 2021 }]
    },
    {
      id: 'wcs',
      name: 'Womens Challenger Series',
      years: [{ year: 2021 }]
    },
    {
      id: 'mqs',
      years: [
        { year: 2021, regions: ['af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2020, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2019, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2017, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2016, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2015, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int'] },
        { year: 2013, regions: ['int'] },
        { year: 2012, regions: ['int'] },
        { year: 2011, regions: ['int'] }
      ]
    },
    {
      id: 'wqs',
      years: [
        { year: 2021, regions: ['af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2020, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn', 'na'] },
        { year: 2019, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2017, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2016, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2015, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int'] },
        { year: 2013, regions: ['int'] },
        { year: 2012, regions: ['int'] },
        { year: 2011, regions: ['int'] },
        { year: 2010, regions: ['int'] }
      ]
    },
    {
      id: 'mbwt',
      years: [
        { year: 2018 },
        { year: 2017 },
        { year: 2016 },
        { year: 2015 },
        { year: 2014 },
        { year: 2013 },
        { year: 2012 },
        { year: 2011 },
        { year: 2010 },
        { year: 2009 }
      ]
    },
    {
      id: 'wbwt',
      years: [{ year: 2018 }, { year: 2017 }, { year: 2016 }]
    },
    {
      id: 'mjun',
      years: [
        { year: 2021, regions: ['aus/oce', 'eu'] },
        { year: 2020, regions: ['aus/oce', 'eu', 'haw/tn', 'na'] },
        { year: 2019, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2017, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2016, regions: ['af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2015, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'na', 'sa'] },
        { year: 2013, regions: ['int', 'as', 'aus/oce', 'eu', 'na', 'sa'] },
        { year: 2011, regions: ['int'] }
      ]
    },
    {
      id: 'wjun',
      years: [
        { year: 2021, regions: ['aus/oce', 'eu'] },
        { year: 2020, regions: ['aus/oce', 'eu', 'haw/tn', 'na'] },
        { year: 2019, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2017, regions: ['int', 'af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2016, regions: ['af', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2015, regions: ['int', 'af', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int', 'aus/oce', 'eu', 'na', 'sa'] },
        { year: 2013, regions: ['int', 'aus/oce', 'eu', 'na', 'sa'] },
        { year: 2011, regions: ['int'] }
      ]
    },
    {
      id: 'mlt',
      years: [
        { year: 2020, regions: ['int', 'eu'] },
        { year: 2019, regions: ['int', 'aus/oce', 'eu', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'aus/oce', 'eu', 'na'] },
        { year: 2017, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn', 'sa'] },
        { year: 2016, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn'] },
        { year: 2015, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int', 'as', 'aus/oce', 'eu', 'sa'] },
        { year: 2013, regions: ['as', 'aus/oce', 'sa'] },
        { year: 2011, regions: ['int'] }
      ]
    },
    {
      id: 'wlt',
      years: [
        { year: 2020, regions: ['int', 'eu'] },
        { year: 2019, regions: ['int', 'eu', 'na', 'sa'] },
        { year: 2018, regions: ['int', 'af', 'aus/oce', 'eu', 'na'] },
        { year: 2017, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn', 'sa'] },
        { year: 2016, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn'] },
        { year: 2015, regions: ['int', 'as', 'aus/oce', 'eu', 'haw/tn', 'na', 'sa'] },
        { year: 2014, regions: ['int', 'as', 'aus/oce', 'eu', 'sa'] },
        { year: 2013, regions: ['as', 'aus/oce'] },
        { year: 2012, regions: ['int'] },
        { year: 2011, regions: ['int'] }
      ]
    }
  ],
  codePoints: [0x1f9e0, 0x1f3c4, 0x1f30a, 0x1f4be, 0x1f4ad, 0x1f489, 0x26d1, 0x1f913, 0x1f33d],
  messages: [
    'Injecting the AstraZeneca...',
    'Tuning into 5G...',
    'Removing tin foil from Gath...',
    'Waiting for scores...',
    'Making surf rankings franker...',
    'Conjuring the surf gods...',
    '50-Year Storm approaching...',
    'Bit of a lull...',
    'Scouring the ocean...',
    'Waiting for the swell to set in...',
    'Rinsing corn...'
  ]
});
