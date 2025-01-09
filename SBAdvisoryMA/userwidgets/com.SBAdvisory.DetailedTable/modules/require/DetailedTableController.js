define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
	return {
		constructor: function (baseConfig, layoutConfig, pspConfig) {
			this.context = [];
			this.numberOfColumns = 0;
			this.imgSortDefault = 'sorting_default.png';
			this.imgSortAsc = 'sorting_previous.png';
			this.imgSortDesc = 'sorting_next.png';
			this.widthDefaultSort = '14px';
			this.heightDefaultSort = '15px';
			this.widthAscDescSort = '14px';
			this.heightAscDescSort = '15px';
			this.imgSortWidgetId;
			this.imgToKeepInSort;
			this.requestFromSort = false;
			this.requestFromSearch = false;
			this.searchString = "";
			this.tempData;
			this.sortKey;
			this.ascOrDesc;
		},

		/**
		 * @api: initGettersSetters
		 * Logic for getters/setters of custom properties
		 * @return: NA
		 */
		initGettersSetters: function () {
			defineSetter(this, "dataMapping", (value) => {
				this._dataMapping = value;
			});
			defineGetter(this, "dataMapping", () => {
				return this._dataMapping;
			});
			defineSetter(this, "defaultAscSort", (value) => {
				this._defaultAscSort = value;
			});
			defineGetter(this, "defaultAscSort", () => {
				return this._defaultAscSort;
			});
			defineSetter(this, "appendCurrencySymbol", (value) => {
				this._appendCurrencySymbol = value;
			});
			defineGetter(this, "appendCurrencySymbol", () => {
				return this._appendCurrencySymbol;
			});
			defineSetter(this, "searchKey", (value) => {
				this._searchKey = value;
			});
			defineGetter(this, "searchKey", () => {
				return this._searchKey;
			});
			defineSetter(this, "paginationKey", (value) => {
				this._paginationKey = value;
			});
			defineGetter(this, "paginationKey", () => {
				return this._paginationKey;
			});
		},

		/**
		 * @api: setContext
		 * Method to set the context value from form/parent component
		 * @arg: param - data sent from consumer of Dropdown component
		 * @return: NA
		 */
		setContext: function (param) {
			var scope = this;
			try {
				scope.context = param;
				scope.ResponseData = param;
				scope.handlePagination();
				scope.onSortClick(scope._dataMapping.filter(data => data.keyToLoad === scope._defaultAscSort)[0]);
				scope.view.PaginationContainer.setPageSize(10);
				scope.view.PaginationContainer.flxPagination.width = "235dp";
				scope.view.flxPagination.zIndex = 0;
			} catch (err) {
				var errorObj = {
					"method": "setContext",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: sortResponse
		 * Method to set the context value from form/parent component
		 * @arg: param - data sent from consumer of Dropdown component
		 * @return: NA
		 */
		sortResponse: function () {
			var scope = this;
			try {
				scope.requestFromSort = true;
				scope.handlePagination();
			} catch (err) {
				var errorObj = {
					"method": "sortResponse",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: setSearchString
		 * Method to set the search string value
		 * @arg: data - data to be searched, param - data sent from form
		 * @return: NA
		 */
		setSearchString: function (data, param) {
			var scope = this;
			try {
				scope.view.PaginationContainer.setLowerLimit(1);
				scope.view.PaginationContainer.setPageSize(10);
				scope.view.PaginationContainer.setIntervalHeader();
				scope.requestFromSearch = true;
				scope.searchString = param;
				scope.performSearch(data, param);
			} catch (err) {
				var errorObj = {
					"method": "setSearchString",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: handlePagination
		 * Method to handle pagination depends on data
		 * @arg: data 
		 * @return: NA
		 */
		handlePagination: function (isFromPagination) {
			var scope = this;
			try {
				if (scope.view.PaginationContainer.lowerLimit === 1) {
					scope.setPaginationComponent(kony.i18n.getLocalizedString(scope._paginationKey));
					scope.tempData = scope.ResponseData.slice(0, 11);
					if (scope.ResponseData.length > 10) {
						scope.view.flxPagination.setVisibility(true);
						scope.setPaginationDetails(scope.tempData);
						scope.view.segDetailedTable.bottom = "10dp";
					} else {
						scope.view.flxPagination.setVisibility(false);
						scope.view.segDetailedTable.bottom = "0dp";
					}
				} else {
					scope.tempData = scope.ResponseData.slice(scope.view.PaginationContainer.lowerLimit - 1, scope.view.PaginationContainer.upperLimit + 1);
					scope.setPaginationDetails(scope.tempData);
				}
				scope.context = scope.tempData.slice(0, 10);
				scope.processingTheTableData(isFromPagination);
			} catch (err) {
				var errorObj = {
					"method": "handlePagination",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api : setPaginationComponent
		 * This method will invoked to set pagination variables
		 * @return : NA
		 */
		setPaginationComponent: function (pageHeader) {
			var scope = this;
			try {
				scope.view.PaginationContainer.setPageSize(10);
				scope.view.PaginationContainer.setLowerLimit(1);
				scope.view.PaginationContainer.setPageHeader(pageHeader);
				scope.view.PaginationContainer.setServiceDelegate(scope.handlePagination.bind(scope, true));
				scope.view.PaginationContainer.setIntervalHeader();
			} catch (err) {
				var errorObj = {
					"method": "setPaginationComponent",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		setPaginationDetails: function (data) {
			var scope = this;
			try {
				const offset = scope.view.PaginationContainer.getPageOffset();
				if (offset === 0) {
					scope.view.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
				} else {
					scope.view.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
				}
				if (!kony.sdk.isNullOrUndefined(data) && data.length > 10) {
					scope.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
					scope.view.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
				} else {
					scope.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
				}
			} catch (err) {
				var errorObj = {
					"method": "setPaginationDetails",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: performSearch
		 * Method to search a string from array of objects
		 * @arg: data - data to be searched, param - data sent from form
		 * @return: NA
		 */
		performSearch: function (data, param) {
			var scope = this;
			var searchResult;
			try {
				searchResult = data.filter(obj => obj[scope._searchKey].toLowerCase().includes(param.toLowerCase()));
				scope.ResponseData = searchResult;
				scope.initiateSort(scope.sortKey, scope.ascOrDesc);
				scope.handlePagination();
			} catch (err) {
				var errorObj = {
					"method": "performSearch",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: processingTheTableData
		 * Method to processing the table data
		 * @return: NA
		 */
		processingTheTableData: function (isFromPagination) {
			var scope = this;
			try {
				// Width calculation
				let initialColumnWidth = 100 / scope._dataMapping.length;
				let firstColumnWidth = initialColumnWidth + (scope._dataMapping.length > 5 ? -5 : 10); // Adding extra 10% width for first column
				let otherColumnsWidth = (100 - firstColumnWidth) / (scope._dataMapping.length - 1); // Calculating other columns width by deducting firstColumnWidth

				// Processing widget data map
				let tempWidgetDataMap = {};
				for (let i = 1; i < 11; i++) {
					// Section header widget's for segment widgetDataMap
					tempWidgetDataMap[`flxHeader${i}`] = `flxHeader${i}`;
					tempWidgetDataMap[`lblHeader${i}`] = `lblHeader${i}`;
					tempWidgetDataMap[`imgSort${i}`] = `imgSort${i}`;
					// Rows widget's for segment widgetDataMap
					tempWidgetDataMap[`flxRow${i}`] = `flxRow${i}`;
					tempWidgetDataMap[`lblRow${i}`] = `lblRow${i}`;
				}
				scope.view.segDetailedTable.widgetDataMap = tempWidgetDataMap;

				// Processing section headers
				let sectionHeaders = {};
				scope._dataMapping.map((dataMapObj, index) => {
					let widgetName = `flxHeader${index + 1}`;
					if(scope.context.length>0){
						var currentColumnHeader = Object.keys(scope.context[0])[index];
						}
					sectionHeaders[`flxHeader${index + 1}`] = {
						isVisible: true,
						width: widgetName == 'flxHeader1' ? `${firstColumnWidth}%` : `${otherColumnsWidth}%`,
					};
					sectionHeaders[`lblHeader${index + 1}`] = kony.i18n.getLocalizedString(dataMapObj.headerName);
					// When header and default sort is equal, we are setting the different sort image along with width and height
					sectionHeaders[`imgSort${index + 1}`] = {
						cursorType: 'pointer',
						src: currentColumnHeader == scope._defaultAscSort ? scope.imgSortAsc : scope.imgSortDefault,
						width: currentColumnHeader == scope._defaultAscSort ? scope.widthAscDescSort : scope.widthDefaultSort,
						height: currentColumnHeader == scope._defaultAscSort ? scope.heightAscDescSort : scope.heightDefaultSort,
						onTouchEnd: scope.onSortClick.bind(scope, dataMapObj),
					};
				});

				// Processing rows data
				let rowData = [];
				if(scope.context.length>0){
				scope.context.map(customerObj => {
					let tempRowData = {};
					scope._dataMapping.map((dataMapObj, dataMapObjIndex) => {
						let widgetName = `flxRow${dataMapObjIndex + 1}`;
						tempRowData[`flxRow${dataMapObjIndex + 1}`] = {
							isVisible: true,
							width: widgetName == 'flxRow1' ? `${firstColumnWidth}%` : `${otherColumnsWidth}%`,
						};
						tempRowData[`lblRow${dataMapObjIndex + 1}`] = scope._appendCurrencySymbol.includes(dataMapObj.keyToLoad) ? `${applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(customerObj[dataMapObj.keyToLoad], applicationManager.getConfigurationManager().configurations.items.BASECURRENCY)}` : `${(customerObj[dataMapObj.keyToLoad])}`;
					});
					rowData.push(tempRowData);
				});
			}
				if(scope.context.length === 0){
						let tempRowData = {};
							let widgetName = `flxRow1`;
							tempRowData[`flxRow1`] = {
								isVisible: true,
								width: widgetName == 'flxRow1' ? `${firstColumnWidth}%` : `${otherColumnsWidth}%`,
							};
							tempRowData[`lblRow1`] = `No records found`;
						rowData.push(tempRowData);
				   // });
				}

				// Appending the section header & row data into the segment
				let segmentData = [
					[
						sectionHeaders,
						rowData
					]
				];
				scope.view.segDetailedTable.setData(segmentData);
				if (scope.requestFromSort || isFromPagination || scope.requestFromSearch) {
					scope.requestFromSort = false;
					scope.modifyDataInSectionHeader();
				}
			} catch (err) {
				var errorObj = {
					"method": "processingTheTableData",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api : onSortClick
		 * On clicking of sort image
		 * @arg1 {selectedItem} : selected Header obj
		 * @return : NA
		 */
		onSortClick: function (selectedItem) {
			var scope = this;
			try {
				// Getting sort widget, image to keep after click
				this._dataMapping.map((item, index) => {
					if (this.view.segDetailedTable.data[0][0][`lblHeader${index + 1}`] == kony.i18n.getLocalizedString(selectedItem.headerName)) {
						if (this.view.segDetailedTable.data[0][0][`imgSort${index + 1}`].src == this.imgSortDefault || this.view.segDetailedTable.data[0][0][`imgSort${index + 1}`].src == this.imgSortDesc) {
							// Sort in Ascending order
							this.imgSortWidgetId = `imgSort${index + 1}`;
							this.imgToKeepInSort = this.imgSortAsc;
							scope.ascOrDesc = 'ASC';
						} else if (this.view.segDetailedTable.data[0][0][`imgSort${index + 1}`].src == this.imgSortAsc) {
							// Sort in Descending order
							this.imgSortWidgetId = `imgSort${index + 1}`;
							this.imgToKeepInSort = this.imgSortDesc;
							scope.ascOrDesc = 'DESC';
						}
					}
				});
				scope.sortKey = selectedItem.keyToLoad;
				this.initiateSort(scope.sortKey, scope.ascOrDesc);
			} catch (err) {
				var errorObj = {
					"method": "onSortClick",
					"error": err
				};
				this.onError(errorObj);
			}
		},

		/**
		 * @api : modifyDataInSectionHeader
		 * modifying the Data In Section Header
		 * @return : NA
		 */
		modifyDataInSectionHeader: function () {
			var scope = this;
			try {
				let tempSegData = scope.view.segDetailedTable.data;
				let tempSectionHeaderData = tempSegData[0][0];
				scope._dataMapping.map((item, index) => {
					tempSectionHeaderData[`imgSort${index + 1}`].src = scope.imgSortDefault;
					tempSectionHeaderData[`imgSort${index + 1}`].width = scope.widthDefaultSort;
					tempSectionHeaderData[`imgSort${index + 1}`].height = scope.heightDefaultSort;
				});
				tempSectionHeaderData[scope.imgSortWidgetId].src = scope.imgToKeepInSort;
				tempSectionHeaderData[scope.imgSortWidgetId].width = scope.widthAscDescSort;
				tempSectionHeaderData[scope.imgSortWidgetId].height = scope.heightAscDescSort;
				tempSegData[0][0] = tempSectionHeaderData;
				scope.view.segDetailedTable.setData(tempSegData);
			} catch (err) {
				var errorObj = {
					"method": "modifyDataInSectionHeader",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api : initiateSort
		 * modifying the data by the sort
		 * @return : NA
		 */
		initiateSort: function (key, sortOrder) {
			var scope = this;
			try {
				if (isNaN(scope.ResponseData[0][key])) {
					scope.sortAlphabetValues(key, sortOrder);
				} else {
					scope.sortNumericValues(key, sortOrder);
				}
				scope.sortResponse();
			} catch (err) {
				var errorObj = {
					"method": "initiateSort",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api : sortNumericValues
		 * sort the numeric data
		 * @return : NA
		 */
		sortNumericValues: function (key, sortOrder) {
			var scope = this;
			try {
				if (sortOrder === "ASC") {
					scope.ResponseData.sort((data1, data2) => (parseInt(data2[key]) < parseInt(data1[key])) ? -1 : (parseInt(data2[key]) > parseInt(data1[key])) ? 1 : 0)
				} else if (sortOrder === "DESC") {
					scope.ResponseData.sort((data1, data2) => (parseInt(data1[key]) < parseInt(data2[key])) ? -1 : (parseInt(data1[key]) > parseInt(data2[key])) ? 1 : 0)
				}
			} catch (err) {
				var errorObj = {
					"method": "sortNumericValues",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api : sortAlphabetValues
		 * sort the alphabets data
		 * @return : NA
		 */
		sortAlphabetValues: function (key, sortOrder) {
			var scope = this;
			try {
				if (sortOrder === "ASC") {
					scope.ResponseData.sort((data1, data2) => (data2[key].toLowerCase() < data1[key].toLowerCase()) ? -1 : (data2[key].toLowerCase() > data1[key].toLowerCase()) ? 1 : 0)
				} else if (sortOrder === "DESC") {
					scope.ResponseData.sort((data1, data2) => (data1[key].toLowerCase() < data2[key].toLowerCase()) ? -1 : (data1[key].toLowerCase() < data2[key].toLowerCase()) ? 1 : 0)
				}
			} catch (err) {
				var errorObj = {
					"method": "sortAlphabetValues",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		/**
		 * @api: onError
		 * Method to alert the error
		 * @return: NA
		 */
		onError: function (err) {
			let errMsg = JSON.stringify(err);
			errMsg.level = "DetailedTable";
			// kony.ui.Alert(errMsg);
		}
	};
});