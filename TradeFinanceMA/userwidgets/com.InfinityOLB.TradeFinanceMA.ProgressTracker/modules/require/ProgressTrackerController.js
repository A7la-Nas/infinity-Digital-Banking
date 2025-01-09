define(function () {
  var skins = {
    circleIncomplete: "sknFlxInactiveCircleRoadmap",
    circleInProgress: "sknFlxInProgressCircleRoadmap",
    rowNumberIncomplete: "ICSknLabelSSPRegular42424215px",
    currentRow: "sknFlxInProgressRowRoadmap",
    rowDone: "ICSknLabelSSPRegular42424215px",
    rowIncomplete: "ICSknLbl949494SSPR15px",
    rowInProgress: "ICSknLabelSSPRegular42424215px"
  };
  return {
    preShow: function () {
      this.view.flxDropdown.onClick = this.toggleLCStatus.bind(this);
      this.view.segSections.widgetDataMap = {
        "imgRowDone": "imgRowDone",
        "lblRowNumber": "lblRowNumber",
        "flxCurrentRowIndicator": "flxCurrentRowIndicator",
        "flxRowCircle": "flxRowCircle",
        "lblRowName": "lblRowName",
        "lblInProgress": "lblInProgress",
        "imgDottedLine": "imgDottedLine",
        "flxRowContent": "flxRowContent",
      };

    },
    /***  setData
     * Method to update the status bar UI
     * return : NA
     */
    setData: function (data) {
      this.setLCStartDate();
	  var orientationHandler = new OrientationHandler();
	  if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
		this.view.lblCoptyStatus.right = "45px";
	  }
      if (data.showCopyDetails) {
        this.view.lblCoptyStatus.isVisible = true;
      } else {
        this.view.lblCoptyStatus.isVisible = false;
      }
      rows = [];
      let currentRow = -1;
      let rowNumber = 0;
      for (let i = 0; i < data.length; i++) {
        rowNumber = rowNumber + 1
        rows.push(this._getRowData(data[i], rowNumber));
        if (data[i]["currentRow"])
          currentRow = i;
      }
      rows[0]["imgDottedLine"] = {
        isVisible: false,
      };
      if (currentRow >= 0) {
        rows[currentRow]["flxCurrentRowIndicator"] = {
          skin: skins.currentRow,
        };
        rows[currentRow]["flxRowContent"] = {
          top: "0dp",
        };
        rows[currentRow]["height"] = "55dp";
      }
      this.view.segSections.setData(rows);
    },
    /**
     *	Get row data json for give type of row
     * @param {json} rowData - the data to be filled in row
     * @param {int} rowNumber - the position of the row
     */
    _getRowData: function (rowData, rowNumber) {
      var newRowData = {};
      switch (rowData.rowStatus) {
        case "done":
          newRowData = this._getDoneRow(rowData);
          break;
        case "Inprogress":
          newRowData = this._getInProgressRow(rowData, rowNumber);
          break;
        default:
          newRowData = this._getIncompleteRow(rowData, rowNumber);
          break;
      }
      return newRowData;
    },

    /**	Get row data json for give type of row
     * @param {json} data: data for done row
     */
    _getDoneRow: function (data) {
      let rowData = {};
      rowData["lblRowName"] = {
        text: data["rowLabel"],
        skin: skins.rowDone,
      };
      rowData["imgRowDone"] = {
        src: "numeringdone.png",
        isVisible: true,
      };
      rowData["lblRowNumber"] = "";
      rowData["flxRowCircle"] = {
        skin: "slFbox",
      };
      rowData["lblInProgress"] = "";
      rowData["flxCurrentRowIndicator"] = {
        skin: "slFbox",
      };
      rowData["imgDottedLine"] = {
        isVisible: true,
      };
      rowData["flxRowContent"] = {
        top: "5dp",
      };
      rowData["onClick"] = data["onClick"];
      return rowData;
    },

    /***	Get row data json for give type of row
     * @param {json} rowNumber - Numnber of the current row
     * @param {json} data: data for in progress row
     */
    _getInProgressRow: function (data, rowNumber) {
      let rowData = {};
      rowData["lblRowName"] = {
        text: data["rowLabel"],
        skin: skins.rowInProgress,
      };
      if (data.rowLabel === "User Actions") {
        rowData["imgRowDone"] = {
          src: "useractions.png",
          isVisible: true,
        };
      } else {
        rowData["imgRowDone"] = {
          isVisible: false,
        };
      }
      rowData["lblRowNumber"] = { text: "" + rowNumber };
      rowData["flxRowCircle"] = {
        skin: skins.circleInProgress,
      };
      // rowData["lblRowName"] = data["rowLabel"]
      rowData["lblInProgress"] = {
        text: "In Progress",
        right: "20dp",
      };
      rowData["flxCurrentRowIndicator"] = {
        skin: "slFbox",
      };
      rowData["imgDottedLine"] = {
        isVisible: true,
      };
      rowData["flxRowContent"] = {
        top: "5dp",
      };
      rowData["onClick"] = data["onClick"];
      return rowData;
    },
    /**
     * @param {json} data: data for incomplete row
     */
    _getIncompleteRow: function (data, rowNumber) {
      let rowData = {};
      rowData["lblRowName"] = {
        text: data["rowLabel"],
        skin: skins.rowIncomplete,
      };

      rowData["imgRowDone"] = {
        isVisible: false,
      };
      rowData["lblRowNumber"] = {
        text: "" + rowNumber,
        skin: skins.rowNumberIncomplete,
      };
      rowData["flxRowCircle"] = {
        skin: skins.circleIncomplete,
      };
      // rowData["lblRowName"] = data["rowLabel"]
      rowData["lblInProgress"] = "";
      rowData["flxCurrentRowIndicator"] = {
        skin: "slFbox",
      };
      rowData["imgDottedLine"] = {
        isVisible: true,
        src: "dottedline.png",
      };
      rowData["flxRowContent"] = {
        top: "5dp",
      };
      rowData["onClick"] = data["onClick"];
      return rowData;
    },
    /***  toggleLCStatus
       * Method to toggle the Status bar
     * return : NA
     */
    toggleLCStatus: function () {
      var scope = this;
      if (scope.view.flxSegment.isVisible) {
        scope.view.flxSegment.isVisible = false;
        scope.view.imgDropdown.src = "dropdown_expand.png";
      } else {
        scope.view.flxSegment.isVisible = true;
        scope.view.imgDropdown.src = "dropdown_collapse.png";
      }
    },
    /***  setLCStartDate
       * Method to set the start date of LC
     * return : NA
     */
    setLCStartDate: function () {
      var scope = this;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      scope.view.lblApplicationStartDate.text = "Started on : " + today;
    }
  };
});
