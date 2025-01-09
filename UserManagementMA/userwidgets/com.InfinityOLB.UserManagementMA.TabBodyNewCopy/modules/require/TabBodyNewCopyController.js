define(function() {

	return {
      
          constructor: function(baseConfig, layoutConfig, pspConfig) {
              this._tabExapandHeight = "202dp";
              this._SectionData = [];
              this._RowDataMap = [];
              this._DefaultValues = [];
              this._EmptyRowData = [];
              this._Rows = [];
              this._segWidget = this.view.segTemplates;
              this.onSegmentReload = function () {};
          },
      	
      	  setSegmentReloadAction: function (functionCall) {
            this.onSegmentReload = functionCall;
          },
      
          setSegmentWidget: function(wid) {
			this._segWidget = wid;
          },
      
      	  showOrHideDetails: function(context) {
              try {
                  var row = context.row;
                  var section = context.section;
                  var direction = context.direction;
                  var segData = this._segWidget.data;
                  for(var i =0; i < segData.length; i++) {
                    for(var j =0; j< segData[i][1].length; j++) {
                      if(! (i === section && j === row)) {
                          segData[i][1][j].imgDropDown = "bbdownicon.png";
                      }
                    }
                  }
                  if(segData[section][1][row].imgDropDown == "bbdownicon.png") {
                      direction = 1;
                      segData[section][1][row].imgDropDown = "bbuparrow.png";
                  }
                  else {
                      direction = 2;
                      segData[section][1][row].imgDropDown = "bbdownicon.png";
                  }

                  var fstStepConfig = {
                      "height": "51dp",
                      "stepConfig": {
                          "timingFunction": kony.anim.EASE
                      }
                  };

                   var lstStepConfig = {
                      "height": this._tabExapandHeight,
                      "stepConfig": {
                          "timingFunction": kony.anim.EASE
                      }
                  };           

                  if (direction == 1) {
                      fstStepConfig.height = "51dp";
                      lstStepConfig.height = this._tabExapandHeight;

                  } 
                  else if (direction == 2) {
                      fstStepConfig.height = this._tabExapandHeight;
                      lstStepConfig.height = "51dp";
                  }

                  this._segWidget.setData(segData);

                  this._segWidget.animateRows({
                      rows: [{
                              sectionIndex: section,
                              rowIndex: row
                            }],

                      widgets: ["flxMain"],

                      animation: {
                            definition: kony.ui.createAnimation({
                                      "0": fstStepConfig,
                                      "100": lstStepConfig
                            }),
                            config: {
                                  "delay": 0,
                                  "iterationCount": 1,
                                  "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                  "duration": 0.5,
                                  "direction": kony.anim.DIRECTION_ALTERNATE
                            },
                            callbacks: {
                                  animationEnd: function() {
                                    this.view.forceLayout();
                                    if(this.onSegmentReload !== undefined && this.onSegmentReload !== null) {
                                      this.onSegmentReload();
                                    }
                                  }.bind(this)
                            }
                      }
                  });
              } 
              catch(err) {
                	kony.print(JSON.stringify(err));
                     //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
              }
          },
      
          setData: function(data) {
              this._segWidget.setData(data);
              this.view.forceLayout();
              if(this.onSegmentReload !== undefined && this.onSegmentReload !== null) {
                this.onSegmentReload();
              }
          },
      
          getData: function() {
              return this._segWidget.data;
          },
      
          setExpandableRowHeight: function(rowHeight) {
              this._tabExapandHeight = rowHeight + "dp";
          },
      	        
          setSectionData: function(sectionData) {
            this._SectionData = sectionData;
            
          },
      
          getSectionData: function() {
            return this._SectionData;
          },
      
          setRowDataMap: function(rowdataMap) {
            this._RowDataMap = rowdataMap;
          },
      
          getRowDataMap: function() {
            return this._RowDataMap;
          },
      
          setDefaultValues: function(defaultValues) {
            this._DefaultValues = defaultValues;
          },
      
          getDefaultValues: function() {
            return this._DefaultValues;
          },

      	  setEmptyRowData: function(emptyRowData) {
            this._EmptyRowData = emptyRowData;
          },
      
          getEmptyRowData: function() {
            return this._EmptyRowData;
          },     
      
          addDataForSections: function(rows) {
            this._Rows = rows;
            this.setWidgetDataMap();
            var segData = this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)));
            this.setData(segData);
          },
      
          sortData: function(sectionNo, mainSortImg, allSortImgs, sortWidget, sortWidetType, sortOrder) {
              var data = this.getData();  
              for(var i in allSortImgs) {
                  this._SectionData[sectionNo][allSortImgs[i]] = "sorting.png";
              }
            
              if(sortOrder !== undefined && sortOrder !== null) {
                if(sortOrder == "Desc") {
                	data[sectionNo][0][mainSortImg] = "sorting_previous.png";
                }
            	else if(sortOrder == "Asc"){
                  data[sectionNo][0][mainSortImg] = "sorting_next.png";
                }
              }
            
              if(data[sectionNo][0][mainSortImg] == "sorting_previous.png" || data[sectionNo][0][mainSortImg] == "sorting.png" ){
                  this._SectionData[sectionNo][mainSortImg] = "sorting_next.png";
                  sortOrder = "Desc";
              }
              else if(data[sectionNo][0][mainSortImg] == "sorting_next.png") {
                  this._SectionData[sectionNo][mainSortImg] = "sorting_previous.png";
                  sortOrder = "Asc";                  
              }
              
              var newSegData = this.sortSegmentData(data, sectionNo, sortWidget, sortWidetType, sortOrder);
              newSegData = this.mapDefaultValues(newSegData);
              this.setData(newSegData);
              this.view.forceLayout();
          },
      
      	  filterData: function(sectionNo, filterWidget, filterRegex) {
              var data = this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)));
              var filteredData = this.filterSegmentData(data, sectionNo, filterWidget, filterRegex);
              filteredData = this.mapDefaultValues(filteredData);
              this.setData(filteredData);
              this.view.forceLayout();
          },
      
          addEmptyRow: function () 
          {
              var context = this._segWidget.getLastVisibleRow();
              if(kony.sdk.isNullOrUndefined(context.rowIndex))
                context.rowIndex = -1;
			  var emptyRow = this.getMappedRows(this._RowDataMap[context.sectionIndex], [JSON.parse(JSON.stringify(this._EmptyRowData[context.sectionIndex]))], this._DefaultValues[context.sectionIndex]);
              this._segWidget.addDataAt(emptyRow[0], context.rowIndex + 1, context.sectionIndex);
              this.view.forceLayout();
			  if (this.onSegmentReload !== undefined && this.onSegmentReload !== null) {
                this.onSegmentReload();
			  }
          },
          filterSelectedSection : function(sectionNo) {
              var segData;
              if(sectionNo == -1) {
               segData= this.createSegmentData(JSON.parse(JSON.stringify(this._Rows)));
              	this.setData(segData);
              }
              else {
                segData = this.createSegmentDataForSingleSection(sectionNo, JSON.parse(JSON.stringify(this._Rows[sectionNo])));
                this.setData(segData);
              }
          },
      
          /**
            Common Utility to Add an extra row to the segment 
            map - widgetDataMap of teh segment
            segmentData - segmentObject
          **/
          addRowForSegment : function(data, map) {
                var segmentData = JSON.parse(JSON.stringify(data));
                var emptyData = JSON.parse(JSON.stringify(map));
                var keys = Object.keys(emptyData);
                for(var i in keys) {
                  emptyData[keys[i]] = "  ";
                }
                for(var i=0; i < segmentData.length; i++) {
                  segmentData[i][1].push(emptyData);
                }
                return segmentData;
            },
      
          /** 
              Common Utility method to filter the Segment Data
              completeData - Data to be sorted
              sectionNo - section number to be filtered
              widgetName - KeyName on whoose value, data needs to be filtered
              filterRegex - Filter Regular expression to match widgetValue
          **/
          filterSegmentData : function(completeData, sectionNo, widgetName, filterRegex) {
              var segmentData = completeData;
              var rows = [];
              for(var j = 0; j < segmentData[sectionNo][1].length; j++) {
                if(filterRegex.test(segmentData[sectionNo][1][j][widgetName])){
                  rows.push(segmentData[sectionNo][1][j]);
                }
              }
              segmentData[sectionNo].pop();
              segmentData[sectionNo].push(rows);
              return segmentData;
          },
      
          /** 
              Common Utility method to sort the Segment Data
              widgetName - KeyName on which data needs to be sorted
              widgetDataType - Datatype  of the widget possible values are (Number, Date, Amount, String)
              sortingOrder - Sorting Order possible values are (DESC, ASC)
          **/
          sortSegmentData : function(completeData, sectionNo, widgetName, widgetDataType, sortingOrder) {
              var segmentData = JSON.parse(JSON.stringify(completeData));

              var SortingFunction  = {
                      sortbyNumberDesc : function(x, y) { 
                        return (y[widgetName] - x[widgetName]);
                      },

                      sortbyNumberAsc : function(x, y) { 
                        return (x[widgetName] - y[widgetName]);
                      },    

                      sortbyAmountDesc : function(x, y) { 
                        var a = x[widgetName].replace('$', '');
                        var b = y[widgetName].replace('$', '');
                        return (b - a);
                      },

                      sortbyAmountAsc : function(x, y) { 
                        var a = x[widgetName].replace('$', '');
                        var b = y[widgetName].replace('$', '');
                        return (a - b);
                      },

                      sortbyStringAsc : function(x, y) { 
                        return ((x[widgetName] == y[widgetName]) ? 0 : ((x[widgetName] > y[widgetName]) ? 1 : -1 ));
                      },

                      sortbyStringDesc : function(x, y) { 
                        return ((x[widgetName] == y[widgetName]) ? 0 : ((y[widgetName] > x[widgetName]) ? 1 : -1 ));
                      },

                      sortbyDateAsc : function(x, y) { 
                        return (new Date(x[widgetName]).getTime() - new Date(y[widgetName]).getTime());
                      },

                      sortbyDateDesc : function(x, y) { 
                        return (new Date(y[widgetName]).getTime() - new Date(x[widgetName]).getTime());
                      }
              };

              var funcName = "sortby"+widgetDataType+sortingOrder;
              segmentData[sectionNo][1].sort(SortingFunction[funcName]);

              return segmentData;
          },
      
      
          /**
            Common Utility to Map the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          mapDefaultValues : function(segmentData) {
              var segData = [];
              for(var i=0; i < segmentData.length; i++) {
                var sectionData = this.createSegmentSection(this._SectionData[i], {}, segmentData[i][1], this._DefaultValues[i]);
                segData.push(sectionData);
              }
              return segData;
           },
      
      	  /**
            Common Utility to create the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          createSegmentData : function(rows) {
              var segData = [];
              for(var i=0; i < this._SectionData.length; i++) {
                var sectionData = this.createSegmentSection(this._SectionData[i], this._RowDataMap[i], rows[i], this._DefaultValues[i]);
                segData.push(sectionData);
              }
              return segData;
           },
      
      	   setWidgetDataMap: function() {
             var dataMap = {};
             var i,j;
             for(j=0; j < this._SectionData.length; j++) {
               var sectionDataKeys = Object.keys(this._SectionData[j]);
               for(i=0; i<sectionDataKeys.length; i++)
                 dataMap[sectionDataKeys[i]] = sectionDataKeys[i];
             }
             
             for(j=0; j < this._RowDataMap.length; j++) {
               var rowDataMapKeys = Object.keys(this._RowDataMap[j]);
               for(i=0; i<rowDataMapKeys.length; i++)
                 dataMap[rowDataMapKeys[i]] = rowDataMapKeys[i];
             }
             
             for(j=0; j < this._DefaultValues.length; j++) {
               var defaultkeys = Object.keys(this._DefaultValues[j]);
               for(i=0; i<defaultkeys.length; i++)
                 dataMap[defaultkeys[i]] = defaultkeys[i];
             }
             
             this._segWidget.widgetDataMap = dataMap;
           },
      
      	  /**
            Common Utility to create the segment data for the segment with sections
            segmentData - actual data to be Updated
            defaultValues - Which are common across all the rows
            sectionHeaderData - Section Header values to be updated
          **/
          createSegmentDataForSingleSection : function(sectionNo, rows) {
              var segData = [];
              var sectionData = this.createSegmentSection(this._SectionData[sectionNo], this._RowDataMap[sectionNo], rows, this._DefaultValues[sectionNo]);
              segData.push(sectionData);
              return segData;
           },
      
           /**
                    Common Utility to create the segment section data. Later this can be passed to setData method of segment
                    sectionData - Section Hedaer Data to be set
                    rowDataMap - RowDataMap
                    rows - actual data to be shown
                    defaultValues - Which are common across all the rows
            **/
            createSegmentSection : function (sectionData, rowDataMap, rows, defaultValues) {
                  return [
                    sectionData,
                    this.getMappedRows(rowDataMap, rows, defaultValues)
                  ];
            },
      

          /**
            Common Utility to Map the segment data for the segment with sections
            rowDataMap - RowDataMap
            rows - actual data to be shown
            defaultValues - Which are common across all the rows
          **/
          getMappedRows : function(rowDataMap, rowsData, defaultValues) {
                var dataMapValues = Object.values(rowDataMap);
                var dataMapKeys = Object.keys(rowDataMap);
                var rows = JSON.parse(JSON.stringify(rowsData));

                for(var i=0; i < rows.length; i++) {
                  for(var j =0; j < dataMapKeys.length; j++) {
                    if(rows[i].hasOwnProperty(dataMapValues[j]) && dataMapKeys[j] !== dataMapValues[j]) {
                      rows[i][dataMapKeys[j]] = rows[i][dataMapValues[j]];
                      //delete rows[i][dataMapValues[j]];
                    }
                  }
                  for(var val in defaultValues) {
                    rows[i][val] = defaultValues[val];
                  }
                }
                return rows;
          },
      
          updateKeyAt: function(widgetName, value, row, section){
            var data = this.getData();
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this._segWidget.setDataAt(rowDataTobeUpdated, row, section);
          },
      
         updateTotal: function(eventobject) {
            var data = this.getData();
            var sum = 0;
            for(var i =0; i < data.length; i++) {
              for (var j=0; j < data[i][1].length; j++) {
                var temp;
                if(kony.sdk.isNullOrUndefined(data[i][1][j][eventobject.id].text)) {
                  temp = parseFloat(data[i][1][j][eventobject.id]);
                }
                else {
                 temp = parseFloat(data[i][1][j][eventobject.id].text);
                }
                if(isNaN(temp))
                  temp = 0;
                sum = sum + temp;
              }
            }
            if(this.updateTotalEvent !== undefined && this.updateTotalEvent !== null)
              this.updateTotalEvent(sum);
          }
      	
      
    };
});