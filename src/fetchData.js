'use strict';
const puppeteer = require('puppeteer');
const parseFlags = require('./parseFlags');
const fetchData = async (_tour, _flag1 = '', _flag2 = '') => {
  try {
    const queryData = await parseFlags(_tour, _flag1, _flag2);
    if (queryData.error !== null) return { error: queryData.error };
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--fast-start', '--disable-extensions', '--no-sandbox'],
      ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.worldsurfleague.com/athletes/tour/${queryData.tour}?${queryData.region}year=${queryData.year}`
    );
    const response = await page.evaluate(
      async (numberOfEventsToThrow = queryData.numberOfEventsToThrow) => {
        const athleteArray = [];
        const athleteTable = document.querySelector('.table-wrap--athletes tbody');
        if (!athleteTable) return { error: 'No data is available using that query.' };
        else if (numberOfEventsToThrow === 0) {
          for (let i = 0, row; (row = athleteTable.rows[i]); i++) {
            const athleteRank = await row.querySelector('.athlete-rank').innerHTML;
            const athleteName = await row.querySelector('.athlete-name').innerHTML;
            const athlete_points = await row
              .querySelector('.tour-points')
              .innerHTML.replace(/,/g, '');
            athleteArray.push(`${athleteRank}. ${athleteName} - ${athlete_points}pts`);
          }
          return { athleteArray };
        } else {
          const table_head = document.querySelector('.table-wrap--athletes thead');
          const numCompletedEvents = table_head.querySelectorAll('.athlete-event-place a').length;
          const numEvents = table_head.querySelectorAll('.athlete-event-place').length;
          const numEventsRemaining = numEvents - numCompletedEvents;
          for (let i = 0, row; (row = athleteTable.rows[i]); i++) {
            let athleteEventPointsArray = [];
            let numEventsAthleteMissedAndRemaining = 0;
            let athleteTotalPoints;
            const athleteRank = await row.querySelector('.athlete-rank').innerHTML;
            const athleteName = await row.querySelector('.athlete-name').innerHTML;
            const athleteTourPoints = await row.querySelector('.tour-points').innerHTML;
            const athleteEventPlaces = await row.querySelectorAll('.athlete-event-place');
            await athleteEventPlaces.forEach((possiblePoints) => {
              const eventPoints = possiblePoints.querySelector('span').innerHTML.replace(/,/g, '');
              if (eventPoints === '-') numEventsAthleteMissedAndRemaining++;
              else athleteEventPointsArray.push(parseInt(eventPoints));
            });
            if (numEventsAthleteMissedAndRemaining - numEventsRemaining >= numberOfEventsToThrow)
              athleteTotalPoints = athleteTourPoints.replace(/,/g, '');
            else {
              athleteEventPointsArray
                .sort((a, b) => b - a)
                .splice(
                  athleteEventPointsArray.length - numberOfEventsToThrow,
                  numberOfEventsToThrow
                );
              athleteTotalPoints = athleteEventPointsArray.reduce((a, b) => a + b);
            }
            athleteArray.push(`${athleteRank}. ${athleteName} - ${athleteTotalPoints}pts`);
          }
          athleteArray
            .sort(
              (a, b) =>
                b.substring(b.lastIndexOf(' ') + 1, b.lastIndexOf('pts')) -
                a.substring(a.lastIndexOf(' ') + 1, a.lastIndexOf('pts'))
            )
            .forEach((athlete, index, array) => {
              if (index !== 0) {
                if (
                  athlete.substring(athlete.indexOf('-') + 1, athlete.lastIndexOf('pts')) ===
                  athleteArray[index - 1].substring(
                    athleteArray[index - 1].indexOf('-') + 1,
                    athleteArray[index - 1].lastIndexOf('pts')
                  )
                ) {
                  array[index] = `${athleteArray[index - 1].substring(
                    0,
                    athleteArray[index - 1].indexOf('.')
                  )}${athlete.substring(
                    athlete.indexOf('.'),
                    Array.from(athlete).length
                  )} (${athlete.substring(0, athlete.indexOf('.'))})`;
                } else if (parseInt(athlete.substring(0, athlete.indexOf('.'))) !== index + 1) {
                  array[index] = `${index + 1}${athlete.substring(
                    athlete.indexOf('.'),
                    Array.from(athlete).length
                  )} (${athlete.substring(0, athlete.indexOf('.'))})`;
                }
              } else {
                if (athlete.substring(0, athlete.indexOf('.')) != '1') {
                  array[index] = `1${athlete.substring(
                    athlete.indexOf('.'),
                    Array.from(athlete).length
                  )} (${athlete.substring(0, athlete.indexOf('.'))})`;
                }
              }
            });
          athleteArray.forEach((athlete, index, array) => {
            if (
              athlete.substring(0, athlete.indexOf('.')) ===
              athlete.substring(athlete.indexOf('(') + 1, athlete.indexOf(')'))
            ) {
              array[index] = `${athlete.substring(0, athlete.indexOf(athlete.slice(-4)))}`;
            }
          });
          return { athleteArray };
        }
      },
      queryData.numberOfEventsToThrow
    );
    await browser.close();
    return {
      athletes: response.athleteArray,
      throwaways: queryData.numberOfEventsToThrow !== 0 ? true : false,
      error: response.error
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = fetchData;
