'use strict';
const getRegionID = require('./getRegionID');
const {
  tours,
  regions,
  currentYear,
  defaultNumberOfEventsToThrow,
  championshipTours,
  challengerSeries
} = require('./constants');
const parseFlags = (_tour, _flag1, _flag2) => {
  let _year, _numberOfEventsToThrow, _regionID;
  // _tour parsing
  if (!tours.map((tour) => tour.id).includes(_tour))
    return { error: "You're likely using a wrong tour acronym." };
  // _flag1 parsing and recasting logic
  if (_flag1 === '') {
    _year = currentYear;
    _numberOfEventsToThrow = defaultNumberOfEventsToThrow;
  } else if (_flag1.charAt(0) === '-' && parseInt(_flag1.substring(1)).toString().length === 4) {
    _year = parseInt(_flag1.substring(1));
    _numberOfEventsToThrow = defaultNumberOfEventsToThrow;
  } else if (
    _flag1.includes('-throw') &&
    (parseInt(_flag1.substring(6)) === 1 || parseInt(_flag1.substring(6)) === 2)
  ) {
    _year = currentYear;
    _numberOfEventsToThrow = parseInt(_flag1.substring(6));
  } else
    return {
      error: 'Your year or throwaway query looks wrong.'
    };
  // _flag2 parsing and recasting logic
  if (_flag2 === '') _regionID = '';
  else if (
    _flag2.charAt(0) === '-' &&
    regions.map((region) => region.key).includes(_flag2.substring(1)) &&
    getRegionID(_flag2.substring(1)) !== null
  )
    _regionID = getRegionID(_flag2.substring(1));
  else return { error: "You're likely using a wrong region acronym." };
  // Specific conditionals
  // All tours
  if (
    !tours
      .filter((tour) => !championshipTours.concat(challengerSeries).includes(tour.id))
      .every((tour) => tour.id !== _tour) &&
    _numberOfEventsToThrow !== 0
  )
    return { error: 'There are no throwaways for that tour.' };
  else if (
    tours.every((tour) => tour.id !== _tour || tour.years.every((item) => item.year !== _year))
  )
    return { error: `There's no data available that year for that tour.` };
  else if (
    tours
      .filter((tour) => tour.id === _tour)
      .every((tour) => tour.years.every((item) => item.regions === undefined)) &&
    _regionID !== ''
  )
    return { error: `There are no continental regions for that tour.` };
  // Championship Tours
  else if (championshipTours.includes(_tour) && _year === 2020)
    return { error: 'No Championship Tour contests ran that year due to Covid19.' };
  else if (
    championshipTours.includes(_tour) &&
    _year !== currentYear &&
    _numberOfEventsToThrow !== 0
  )
    return {
      error: 'Throwaways are already factored into the rankings for that year.'
    };
  // Challenger Series
  else if (challengerSeries.includes(_tour) && _year !== currentYear)
    return { error: 'The Challenger Series was introduced in 2021.' };
  else if (challengerSeries.includes(_tour) && _year === currentYear)
    return { error: 'The Challenger Series will begin in September.' };
  else
    return {
      tour: _tour,
      year: _year,
      numberOfEventsToThrow: _numberOfEventsToThrow,
      region: _regionID,
      error: null
    };
};
module.exports = parseFlags;
