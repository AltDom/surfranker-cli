'use strict';
const { regions } = require('./constants');
const getRegionID = (region) => regions.find((item) => item.key === region).id || null;
module.exports = getRegionID;
