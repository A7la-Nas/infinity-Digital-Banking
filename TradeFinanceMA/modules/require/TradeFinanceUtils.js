define([], function () {
  /**
   * Verifies whether the value is empty, null or undefined.
   * @param {any} data - Value to be verified.
   * @returns {boolean} - Validity of the value passed.
   */
  const _isEmptyNullOrUndefined = function (data) {
    try {
      data = JSON.parse(data);
    } catch (err) { }
    if (data === null || data === undefined || (typeof data === "string" && data.trim() === "")) return true;
    if (typeof data === "object") {
      if (Array.isArray(data)) return data.length === 0;
      return Object.keys(data).length === 0;
    }
    return false;
  };
  /**
   * Sorts the records based on criteria.
   * @param {Array} records - Specifies the records.
   * @param {object} criteria - Specifies the criteria.
   * @returns {Array} - Sorted array.
   */
  const _sortRecords = function (records, criteria) {
    if (records.length === 0) {
      return records;
    }
    let sortedRecords = [];
    const { sortByParam, sortOrder } = criteria;
    const value = records.reduce((result, obj) => {
      if (result !== undefined) {
        return result;
      }
      if (obj[sortByParam] !== undefined) {
        return obj[sortByParam];
      }
      return result;
    }, undefined);
    if (isNaN(parseInt(value))) {
      sortedRecords = (sortOrder === 'ASC')
        ? records.sort((obj1, obj2) => (obj1[sortByParam] || '').localeCompare(obj2[sortByParam] || ''))
        : records.sort((obj1, obj2) => (obj2[sortByParam] || '').localeCompare(obj1[sortByParam] || ''));
    } else if (Number.isInteger(Date.parse(value)) && isNaN(value)) {
      sortedRecords = (sortOrder === 'ASC')
        ? records.sort((obj1, obj2) => new Date(obj1[sortByParam]) - new Date(obj2[sortByParam]))
        : records.sort((obj1, obj2) => new Date(obj2[sortByParam]) - new Date(obj1[sortByParam]));
    } else {
      sortedRecords = (sortOrder === 'ASC')
        ? records.sort((obj1, obj2) => obj1[sortByParam] - obj2[sortByParam])
        : records.sort((obj1, obj2) => obj2[sortByParam] - obj1[sortByParam]);
    }
    return sortedRecords;
  };
  /**
   * Search the records based on value.
   * @param {Array} records - Specifies the records.
   * @param {string} searchValue - Specifies the value to be searched.
   * @returns {Array} - Result array.
   */
  const _searchRecords = function (records, searchValue) {
    searchValue = searchValue.toLowerCase();
    return records.filter(obj => Object.values(obj).some(value => typeof value === 'string' && value.toLowerCase().includes(searchValue)));
  };
  /**
   * Filters the records based on criteria.
   * @param {Array} records - Specifies the records.
   * @param {object} criteria - Specifies the criteria.
   * @returns {Array} - Result array.
   */
  const _filterRecords = function (records, criteria) {
    return records.filter((record) => {
      return Object.keys(criteria.filterParam || {}).every((key) => {
        return criteria.filterParam[key].includes(record[key]);
      }) && Object.keys(criteria.dateParam || {}).every((key) => {
        const filterDate = new Date(record[key]);
        filterDate.setHours(0, 0, 0, 0);
        const dateValue = criteria.dateParam[key];
        if (!dateValue) return false;
        if (typeof dateValue === 'string') {
          return filterDate === new Date(dateValue);
        }
        const startDate = new Date(dateValue[0]),
          endDate = new Date(dateValue[1]);
        return filterDate >= startDate && filterDate <= endDate;
      });
    });
  };
  return {
    'isEmptyNullOrUndefined': _isEmptyNullOrUndefined,
    'sortRecords': _sortRecords,
    'searchRecords': _searchRecords,
    'filterRecords': _filterRecords
  };
});