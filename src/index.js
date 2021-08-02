#!/usr/bin/env node
'use strict';
const fetchData = require('./fetchData');
const { codePoints } = require('./constants');
const ora = require('ora');
const chalk = require('chalk');
// flag1 is a 4-digit year (eg. -2020) or number of throwaways (eg. -throw2). flag2 is region (eg. -aus/oce).
const [, , tour, flag1, flag2] = process.argv;
(async () => {
  const emoji = String.fromCodePoint(codePoints[Math.floor(Math.random() * codePoints.length)]);
  const spinner = ora(`Collating surf brain... ${emoji}`).start();
  const response = await fetchData(tour, flag1, flag2);
  if (response.error) return spinner.fail(response.error);
  spinner.succeed();
  if (Array.isArray(response.athletes)) {
    response.athletes.map((athlete, index) => {
      if (athlete.indexOf('1. ') !== 0) {
        if (response.throwaways && parseInt(athlete.substring(0, athlete.indexOf('.'))) > index + 1)
          console.log(chalk.red(athlete));
        else if (
          response.throwaways &&
          parseInt(athlete.substring(0, athlete.indexOf('.'))) < index + 1
        )
          console.log(chalk.blue(athlete));
        else console.log(athlete);
      } else console.log(chalk.yellow(athlete));
    });
  } else console.log(response.athletes);
})();
