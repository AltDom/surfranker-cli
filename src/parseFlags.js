'use strict';
const getRegionID = require('./getRegionID');
const {
  tours,
  regions,
  currentYear,
  defaultNumberOfEventsToThrow,
  bigWaveTours,
  championshipTours,
  challengerSeries,
  qualifyingSeries
} = require('./constants');
const parseFlags = async (tour, flag1, flag2) => {
  const response = await (async (tour, flag1, flag2) => {
    let year, numberOfEventsToThrow, regionID;
    // tour parsing
    if (
      (!bigWaveTours.includes(tour) && tour.length === 4) ||
      (!tours.filter((tour) => !bigWaveTours.includes(tour)).includes(tour) && tour.length === 3) ||
      tour.length > 4 ||
      tour.length < 3
    )
      return { error: "You're likely using a wrong tour acronym." };
    // flag1 parsing and recasting logic
    if (flag1 === '') {
      year = currentYear;
      numberOfEventsToThrow = defaultNumberOfEventsToThrow;
    } else if (flag1.charAt(0) === '-' && parseInt(flag1.substring(1)).toString().length === 4) {
      year = parseInt(flag1.substring(1));
      numberOfEventsToThrow = defaultNumberOfEventsToThrow;
    } else if (
      flag1.includes('-throw') &&
      (parseInt(flag1.substring(6)) === 1 || parseInt(flag1.substring(6)) === 2)
    ) {
      year = currentYear;
      numberOfEventsToThrow = parseInt(flag1.substring(6));
    } else
      return {
        error: 'Your year or throwaway query looks wrong.'
      };
    // flag2 parsing and recasting logic
    if (flag2 === '') regionID = '';
    else if (
      flag2.charAt(0) === '-' &&
      regions.map((region) => region.key).includes(flag2.substring(1)) &&
      getRegionID(flag2.substring(1)) !== null
    )
      regionID = getRegionID(flag2.substring(1));
    else return { error: "You're likely using a wrong region acronym." };
    // Specific conditionals
    // All tours
    if (
      tours.filter((tour) => !championshipTours.includes(tour)).includes(tour) &&
      numberOfEventsToThrow !== 0
    )
      return { error: 'There are no throwaways for that tour.' };
    // Championship tours
    else if (championshipTours.includes(tour) && (year < 2010 || year > 2021))
      return { error: 'Data not available for that year.' };
    else if (championshipTours.includes(tour) && year === 2020)
      return { error: 'No comps ran that year due to Covid.' };
    else if (championshipTours.includes(tour) && regionID !== '')
      return { error: 'There are no regions for the Championship Tour.' };
    else if (
      championshipTours.includes(tour) &&
      year !== currentYear &&
      numberOfEventsToThrow !== 0
    )
      return {
        error: 'Throwaways are already factored into the rankings for that year.'
      };
    // Challenger Series
    else if (challengerSeries.includes(tour) && year !== currentYear)
      return { error: 'The Challenger Series was introduced in 2021.' };
    else if (challengerSeries.includes(tour) && regionID !== '')
      return { error: 'There are no regions for the Challenger Series.' };
    // Big Wave Tours
    else if (bigWaveTours[0].includes(tour) && (year < 2009 || year > 2018))
      return { error: 'No Mens Big Wave data available for that year.' };
    else if (bigWaveTours[1].includes(tour) && (year < 2016 || year > 2018))
      return { error: 'No Womens Big Wave data available for that year.' };
    // Qualifying Series
    else if (qualifyingSeries.includes(tour) && (year < 2011 || year > 2021))
      return { error: 'Data not available for that year.' };
    else if (qualifyingSeries.includes(tour) && year > 2020 && regionID === regions[0].id)
      return {
        error: 'There was no International Qualifying Series for that year.'
      };
    else if (
      qualifyingSeries[1].includes(tour) &&
      year === 2020 &&
      (regionID === regions[2].id || regionID === regions[7].id)
    )
      return {
        error: 'There was no Womens African or South American Qualifying Series for that year.'
      };
    else if (
      qualifyingSeries.includes(tour) &&
      year < 2015 &&
      regionID !== regions[0].id &&
      regionID !== ''
    )
      return {
        error: 'There was no regional Qualifying Series for that year.'
      };
    else
      return {
        tour: tour,
        year: year,
        numberOfEventsToThrow: numberOfEventsToThrow,
        region: regionID,
        error: null
      };
  })(tour, flag1, flag2);
  return response;
};
module.exports = parseFlags;
