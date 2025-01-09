define([], function () {
  let touchEndSubscribers = new Map();
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
   * Filters the records based on criteria.
   * @param {Array} records - Specifies the records.
   * @param {object} criteria - Specifies the criteria.
   * @returns {Array} - Result array.
   */
  const _searchAndFilterRecords = function (records, criteria) {
    return records.filter((record) => {
      return Object.keys(criteria.searchParam || {}).every((key) => {
        return (record[key] || '').toLowerCase().includes(criteria.searchParam[key].toLowerCase());
      }) && Object.keys(criteria.filterParam || {}).every((key) => {
        return (record[key] || '') === criteria.filterParam[key];
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
  /**
   * Subscribes widgets for touch end.
   * @param {Array} widgets - Specfies the widgets to be subscribed.
   */
  const _subscribeToTouchEnd = function (widgets) {
    touchEndSubscribers = new Map();
    widgets.forEach(widget => {
      touchEndSubscribers.set(widget.id, {
        widget,
        'shouldBeVisible': false
      });
    });
  };
  /**
   * Hides the visible subscribed widgets.
   */
  const _hideSubscribedWidgetsIfVisible = function () {
    touchEndSubscribers.forEach(subscriber => {
      if (subscriber.shouldBeVisible) {
        subscriber.shouldBeVisible = false;
      } else if (subscriber.widget.isVisible) {
        subscriber.widget.closeDropdown();
      }
    });
  };
  /**
   * Updates the subscriber.
   * @param {string} subscriberKey - Specifies the subscriber key.
   * @param {boolean} isVisible - Specifies the visibility.
   * @returns {void} - Returns nothing, if subscriber is not subscribed.
   */
  const _updateTouchEndSubscriber = function (subscriberKey, isVisible) {
    if (!touchEndSubscribers.has(subscriberKey)) {
      return;
    }
    let value = touchEndSubscribers.get(subscriberKey);
    value.shouldBeVisible = isVisible;
    touchEndSubscribers.set(subscriberKey, value);
  };
  return {
    'isEmptyNullOrUndefined': _isEmptyNullOrUndefined,
    'sortRecords': _sortRecords,
    'searchAndFilterRecords': _searchAndFilterRecords,
    'subscribeToTouchEnd': _subscribeToTouchEnd,
    'hideSubscribedWidgetsIfVisible': _hideSubscribedWidgetsIfVisible,
    'updateTouchEndSubscriber': _updateTouchEndSubscriber
  };
});