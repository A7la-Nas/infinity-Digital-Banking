define(["ViewConstants"], function (ViewConstants) {
  /**
   * Specifies the MIME types.
   */
  const mimeTypes = {
    'csv': 'text/csv',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'tiff': 'image/tiff',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
  /**
   * Specifies the document images.
   */
  const docImages = {
    'pdf': ViewConstants.IMAGES.PDF_IMAGE,
    'jpeg': ViewConstants.IMAGES.JPEG_IMAGE,
    'png': ViewConstants.IMAGES.PNG_IMAGE,
    'tiff': ViewConstants.IMAGES.TIFF_IMAGE,
    'doc': ViewConstants.IMAGES.DOC_IMAGE,
    'xls': ViewConstants.IMAGES.XLS_IMAGE,
    'csv': ViewConstants.IMAGES.CSV_IMAGE,
    'xlsx': ViewConstants.IMAGES.XLSX_IMAGE
  };
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
   * Retrieves the base64 string of a file.
   * @param {object} file - Specifies the file object.
   * @param {Function} callback - Specifies the callback.
   */
  const _getBase64 = function (file, callback) {
    const reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };
  /**
   * Converts bytes to kb/mb.
   * @param {number} bytes - Specifies bytes value.
   * @returns {string} - Returns converted value.
   */
  const _bytesToKBOrMB = function (bytes) {
    const mb = bytes / (1024 * 1024),
      kb = bytes / 1024;
    if (mb < 0.1) {
      return `${kb.toFixed(2)} KB`;
    }
    return `${mb.toFixed(2)} MB`;
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
   * Downloads a file.
   * @param {object} param - Specifies the file info like content and name.
   */
  const _downloadFile = function ({ content, fileName }) {
    const blob = new Blob([content], { 'type': 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName || 'file.txt';
    link.click();
    window.URL.revokeObjectURL(link.href);
  };
  /**
   * Returns the MIME types.
   * @param {string|Array} fileFormats - Specifies the file formats.
   * @returns {Array} - Array of MIME types.
   */
  const _getMimeTypes = function (fileFormats) {
    if (typeof fileFormats === 'string') {
      return mimeTypes[fileFormats];
    }
    return fileFormats.map(f => mimeTypes[f]);
  };
  /**
   * Returns the document images.
   * @param {string|Array} docFormats - Specifies the document formats.
   * @returns {Array} - Array of document images.
   */
  const _getDocumentImages = function (docFormats) {
    if (typeof docFormats === 'string') {
      return docImages[docFormats];
    }
    return docFormats.map(f => docImages[f]);
  };
  /**
   * Checks if a date string is valid or invalid.
   * @param {string} date - Specifies the date string.
   * @param {string} format - Specifies the date format.
   * @returns {boolean} - Validity of the date string.
   */
  const _isValidDate = function (date, format) {
    if (!date || !format) {
      return false;
    }
    format = format.replace(/(.)\1+/g, '$1').toUpperCase();
    const dateParts = date.split(/\D+/),
      formatParts = format.match(/Y+|M+|D+/g);
    const day = parseInt(dateParts[formatParts.indexOf('D')], 10),
      month = parseInt(dateParts[formatParts.indexOf('M')], 10),
      year = parseInt(dateParts[formatParts.indexOf('Y')], 10);
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return (parsedDate.getDate() === parseInt(day, 10) && parsedDate.getMonth() === parseInt(month, 10) - 1 && parsedDate.getFullYear() === parseInt(year, 10));
  };
  /**
   * Gets the date object from date string.
   * @param {string} date - Specifies the date string.
   * @param {string} format - Specifies the date format.
   * @returns {Date} - Date object.
   */
  const _getDateObjectFromDateString = function (date, format) {
    if (!date || !format) {
      return;
    }
    format = format.replace(/(.)\1+/g, '$1').toUpperCase();
    const dateParts = date.split(/\D+/),
      formatParts = format.match(/Y+|M+|D+/g);
    const day = parseInt(dateParts[formatParts.indexOf('D')], 10),
      month = parseInt(dateParts[formatParts.indexOf('M')], 10),
      year = parseInt(dateParts[formatParts.indexOf('Y')], 10);
    return new Date(`${year}-${month}-${day}`);
  };
  return {
    'isEmptyNullOrUndefined': _isEmptyNullOrUndefined,
    'getBase64': _getBase64,
    'bytesToKBOrMB': _bytesToKBOrMB,
    'sortRecords': _sortRecords,
    'searchAndFilterRecords': _searchAndFilterRecords,
    'downloadFile': _downloadFile,
    'getMimeTypes': _getMimeTypes,
    'getDocumentImages': _getDocumentImages,
    'isValidDate': _isValidDate,
    'getDateObjectFromDateString': _getDateObjectFromDateString
  };
});