'use strict';
const getRegionID = require('./getRegionID');
const {
  tours,
  regions,
  currentYear,
  defaultNumberOfEventsToThrow,
  championshipTours,
  challengerSeries,
  qualifyingSeries,
  bigWaveTours,
  juniorTours,
  longboardTours
} = require('./constants');
const parseFlags = (_tour, _flag1, _flag2) => {
  let _year, _numberOfEventsToThrow, _regionID;
  let _top5 = false;
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
  } else if (_flag1 === '-top5') {
    _year = currentYear;
    _numberOfEventsToThrow = defaultNumberOfEventsToThrow;
    if (_flag2 !== '') {
      return {
        error: 'That is not a valid command.'
      };
    } else _flag2 = _flag1;
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
  else if (_flag2.includes('-top5') && _flag2.length === 5) {
    _top5 = true;
    _regionID = '';
  } else return { error: "You're likely using a wrong region acronym." };
  // Specific conditionals
  // Qualifying Series
  if (
    qualifyingSeries.includes(_tour) &&
    _year === 2021 &&
    (_regionID === '' || _regionID === regions[0].id)
  )
    return {
      error:
        'No International Qualifying Series rankings after 2020 (due to the Challenger Series). Specify another region or year.'
    };
  // Big Wave Tours
  else if (bigWaveTours.includes(_tour) && _year === 2021)
    return { error: 'No Big Wave Tour rankings available after 2018.' };
  // Junior Tours
  else if (
    juniorTours.includes(_tour) &&
    _year > currentYear &&
    (_regionID === '' || _regionID === regions[0].id)
  )
    return {
      error: 'No International Junior Tour rankings available after 2019. Try a specific region.'
    };
  // Longboard Tours
  else if (longboardTours.includes(_tour) && _year >= currentYear)
    return {
      error: 'No Longboard Tour rankings available after 2021. Specify another year or region.'
    };
  // All tours
  else if (
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
      .every((tour) =>
        tour.years
          .filter((item) => item.year === _year)
          .every((year) => year.regions && !year.regions.includes(_flag2.substring(1)))
      ) &&
    _regionID !== ''
  )
    return { error: `There are no continental regions for that tour.` };
  // Championship Tours
  else if (championshipTours.includes(_tour) && _year === 2020)
    return { error: 'No Championship Tour contests ran that year due to Covid19.' };
  else if (championshipTours.includes(_tour) && _numberOfEventsToThrow !== 0 && _year < currentYear)
    return {
      error: 'Throwaways are already factored into the rankings for that year.'
    };
  else if (championshipTours.includes(_tour) && _numberOfEventsToThrow === 2)
    // review after the midyear cut
    return {
      error: 'Only one throwaway will be applied prior to the midyear cut.'
    };
  // Challenger Series
  else if (challengerSeries.includes(_tour) && _year === currentYear)
    return {
      error: 'The Challenger Series will begin in May 2022. Results are available for 2021.'
    };
  else
    return {
      tour: _tour,
      year: _year,
      numberOfEventsToThrow: _numberOfEventsToThrow,
      region: _regionID,
      top5: _top5,
      error: null
    };
};
module.exports = parseFlags;
