# surfranker-cli
### Making surf rankings just that little bit franker.

<p align="center">
  <img  src="https://media.giphy.com/media/LqaiJK6aYZPG11qKrz/giphy.gif" width="80%">
</p>

Retrieve live **World Surf League** tour rankings for free via the Terminal. **Championship Tours**, **Challenger Series**, **Big Wave Tours**, **Qualifying Series**, **Junior Tours** & **Longboard Tours** all supported. **Throwaway Event Filtering** supported where applicable.

## Installing surfranker-cli
* Open your Terminal window and ensure you have Node.JS & NPM installed. Run `brew install node`.
* Then install surfranker-cli with `npm install -g surfranker-cli`.
* You should be all set and ready to use any of the commands below!

## Using surfranker-cli
### Championship Tours (WCT & MCT)
* View the current Womens & Mens CT rankings using commands `surfranker wct` & `surfranker mct`.
* Calculate, sort & view the current Womens & Mens CT rankings with 1 or 2 throwaway events applied. Eg. use `surfranker wct -throw2` or `surfranker mct -throw1`.
* View the Womens & Mens CT rankings by year using eg. `surfranker wct -2017`. Supported years include 2010-2021 (Womens & Mens).

### Challenger Series (WCS & MCS - supported in Version 2 after the first contest in September 2021)
* View the current Womens & Mens CS rankings using commands `surfranker mcs` & `surfranker wcs`.
* Calculate, sort & view the current Womens & Mens CS rankings with 1 or 2 throwaway events applied. Eg. use `surfranker mcs -throw1` or `surfranker wcs -throw2`.
Note: Results derive from four CS events and one QS event in 2021.

### Big Wave Tours (WBWT & MBWT)
* View the current Womens & Mens BWT rankings by year using eg. `surfranker mbwt -2018` & `surfranker wbwt -2016`.
* Supported years include 2016-2018 (Womens) & 2009-2018 (Mens).

### Qualifying Series (WQS & MQS)
* View the current Womens & Mens QS rankings by year and region using eg. `surfranker wqs -2021 -haw/tn` & `surfranker mqs -2021 -aus/oce`.
* Supported years include 2010-2021 (Womens) & 2011-2021 (Mens).

### Junior Tours (WJUN & MJUN)
* View the current Womens & Mens JT rankings by year and region using eg. `surfranker wjun -2021 -aus/oce` & `surfranker mjun -2021 -eu`.
* Supported years include 2011-2021 (Womens & Mens). 2012 omitted.

### Longboard Tours (WLT & MLT)
* View the current Womens & Mens LT rankings by year and region using eg. `surfranker wlt -2020 -int` & `surfranker mlt -2020 -eu`.
* Supported years include 2011-2020 (Womens & Mens). 2012 omitted in the Mens.

Supported regions include International (`-int`), Australia/Oceania (`-aus/oce`), Africa (`-af`), Asia (`-as`), Europe (`-eu`), Hawaii/Tahiti Nui (`-haw/tn`), North America (`-na`) & South America (`-sa`) where applicable.
All supported years and regions across individual tours can be seen [here](https://github.com/AltDom/surfranker-cli/blob/main/src/constants.js).
