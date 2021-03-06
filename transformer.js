// A suite of functions to transform JSON rows from the database results into
// the JSON users want.

class Transformer {

  constructor() {}

  // {
  //   2001: {1: {'Annual': 300, 'Monthly': 900, 'Hourly': 700}, 2: {'Annual': 300, 'Monthly': 900, ... 'Hourly': 700} },
  //   2002: {1: {'Annual': 300, 'Monthly': 900, 'Hourly': 700}, 2: {'Annual': 300, 'Monthly': 900, ... 'Hourly': 700} }
  // }
  static countMembershipsByYearAndWeek(rows) {
    let result = {};
    rows.map(row => {
      const { year, week, membership, count } = row;
      if (year) {
        if (result[year] === undefined) result[year] = {};
        if (result[year][week] === undefined) result[year][week] = {}
        result[year][week][membership] = parseInt(count);
      }
    });
    return result;
  }

  // {
  //   2001: {1: {'Annual': 300, 'Monthly': 900, 'Hourly': 700}, 2: {'Annual': 300, 'Monthly': 900, ... 'Hourly': 700} },
  //   2002: {1: {'Annual': 300, 'Monthly': 900, 'Hourly': 700}, 2: {'Annual': 300, 'Monthly': 900, ... 'Hourly': 700} }
  // }
  static countMembershipsByYearAndMonth(rows) {
    let result = {};
    rows.map(row => {
      const { year, month, membership, count } = row;
      if (year) {
        if (result[year] === undefined) result[year] = {};
        if (result[year][month] === undefined) result[year][month] = {}
        result[year][month][membership] = parseInt(count);
      }
    });
    return result;
  }

  // {
  //   2001: {1: 300, 2: 900, 6: 700, ... 365: 543},
  //   2002: {1: 30, 5: 90, 7: 88, ... 365: 21}
  // }
  static countByYearAndDayOfYear(rows) {
    let result = {};
    rows.map(row => {
      const { year, day, count } = row;
      if (year) {
        if (result[year] === undefined) result[year] = {};
        result[year][day] = parseInt(count);
      }
    });
    return result;
  }

  // {
  //   2001: {1: {1: 300, 2: 900, 31: 700}, 2: {1: 300, 2: 900, ... 31: 700} },
  //   2002: {1: {1: 300, 2: 900, 31: 700}, 2: {1: 300, 2: 900, ... 31: 700} }
  // }
  static countByYearAndMonthAndDay(rows) {
    let result = {};
    rows.map(row => {
      const { year, month, day, count } = row;
      if (year) {
        if (result[year] === undefined) result[year] = {};
        if (result[year][month] === undefined) result[year][month] = {}
        result[year][month][day] = parseInt(count);
      }
    });
    return result;
  }

  // {
  //   2001: [ {1: 1000}, {2: 900}, ... {12: 788} ],
  //   2002: [ {1: 100}, {2: 90}, ... {12: 78} ]
  // }
  static countByYearAndMonth(rows) {
    let result = {};
    rows.map(row => row.year).filter(val => val != null).forEach(year => {
      if (result[year] === undefined) result[year] = [];
    });
    rows.forEach(row => {
      if (row.year != null)
        result[row.year].push({[row.month]:parseInt(row.count)});
    });
    return result;
  }

  /**
   * Transforms a rowset of grouped counts like this:
   * [ {'year':y1, 'count':'429'}, {'year':y2,'count':'231'}, ... ]
   * into this:
   * {y1: 17, y2: 23, ... yN: 701}
   */
  static countByPeriod(rows, periodName) {
    let result = {};
    rows.forEach(row => {
      if (row[periodName] != null) result[row[periodName]] = parseInt(row.count);
    });
    return result;
  }

}

module.exports = Transformer;
