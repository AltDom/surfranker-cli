'use strict';
const puppeteer = require('puppeteer');
const parseFlags = require('./parseFlags');
const fetchData = async (tour, flag1 = '', flag2 = '') => {
  try {
    const queryData = await parseFlags(tour, flag1, flag2);
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
    const response = await page.evaluate(async (throwNumber = queryData.numberOfEventsToThrow) => {
      const athlete_array = [];
      const athlete_table = await document.querySelector('.table-wrap--athletes tbody');
      if (!athlete_table) return { error: 'No data is available using that query.' };
      else if (throwNumber === 0) {
        for (let i = 0, row; (row = athlete_table.rows[i]); i++) {
          const athlete_rank = await row.querySelector('.athlete-rank').innerHTML;
          const athlete_name = await row.querySelector('.athlete-name').innerHTML;
          const athlete_points = await row.querySelector('.tour-points').innerHTML;
          athlete_array.push(`${athlete_rank}. ${athlete_name} - ${athlete_points}pts`);
        }
        return { athlete_array };
      } else {
        for (let i = 0, row; (row = athlete_table.rows[i]); i++) {
          let athlete_points_array = [];
          let totalPoints;
          const athlete_rank = await row.querySelector('.athlete-rank').innerHTML;
          const athlete_name = await row.querySelector('.athlete-name').innerHTML;
          const athlete_event_places = await row.querySelectorAll('.athlete-event-place');
          await athlete_event_places.forEach((possiblePoints) => {
            const eventPoints = possiblePoints.querySelector('span').innerHTML.replace(/,/g, '');
            if (eventPoints !== '-') athlete_points_array.push(parseInt(eventPoints));
          });
          if (athlete_points_array.length - throwNumber <= 0) totalPoints = 0;
          else {
            athlete_points_array
              .sort((a, b) => b - a)
              .splice(athlete_points_array.length - throwNumber, throwNumber);
            totalPoints = athlete_points_array.reduce((a, b) => a + b);
          }
          athlete_array.push(`${athlete_rank}. ${athlete_name} - ${totalPoints}pts`);
        }
        athlete_array.sort(
          (a, b) =>
            b.substring(b.lastIndexOf(' ') + 1, b.lastIndexOf('pts')) -
            a.substring(a.lastIndexOf(' ') + 1, a.lastIndexOf('pts'))
        );
        return { athlete_array };
      }
    }, queryData.numberOfEventsToThrow);
    await browser.close();
    return {
      athletes: response.athlete_array,
      throwaways: queryData.numberOfEventsToThrow !== 0 ? true : false,
      error: response.error
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = fetchData;
