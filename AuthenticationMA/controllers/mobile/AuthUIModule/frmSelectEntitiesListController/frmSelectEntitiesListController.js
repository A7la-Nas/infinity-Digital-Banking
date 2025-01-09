define([], function () {
  return {
    MIN_RECORDS_TO_ALLOW_SEARCH: 5,
    SEG_ROW_FLEX_SKINS: ["bbSKnFlxffffff", "ICSknFlxF6F6F6Radius26px"],

    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    onNavigate: function () {
      try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (e) {
        kony.print("Exception in onNavigate" + e);
      }
    },

    preshow: function () {
      try {
        kony.print("Entered preShow");
        this.setPreShowData();
        this.setFlowActions();
        this.renderTitleBar();
      } catch (e) {
        kony.print("Exception in preshow" + e);
      }
    },

    renderTitleBar: function () {
      let deviceUtilManager = applicationManager.getDeviceUtilManager();
      let isIphone = deviceUtilManager.isIPhone();
      if (!isIphone) {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
    },

    setPreShowData: function () {
      this.view.customHeader.lblLocateUs.contentAlignment = 5;
      this.setEntitiesListSegmentData();
    },

    setFlowActions: function () {
      let self = this;
      this.view.customHeader.flxBack.onClick = function () {
        self.goBack();
      };
      this.view.customSearchbox.tbxSearch.onTextChange = function () {
        self.searchEntities();
      };
    },

    goBack: function () {
      let navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmSelectEntity" });
    },

    searchEntities: function () {
      let segEntitiesFilteredData = [];
      let segEntitiesData = this.view.segEntitiesList.info.data;
      let searchText = this.view.customSearchbox.tbxSearch.text.toLowerCase();
      if (searchText.length === 0) {
        this.resetSearchEntities();
      } else {
        segEntitiesData.forEach(segEntityRecord => {
          if (segEntityRecord.lblEntityValue.text.toLowerCase().indexOf(searchText) !== -1) {
            segEntitiesFilteredData.push(segEntityRecord);
          }
        });
        if (segEntitiesFilteredData && segEntitiesFilteredData.length !== 0) {
          this.view.segEntitiesList.setData(segEntitiesFilteredData);
          this.view.segEntitiesList.setVisibility(true);
          this.view.flxNoRecords.setVisibility(false);
        } else {
          this.view.segEntitiesList.setData([]);
          this.view.segEntitiesList.setVisibility(false);
          this.view.flxNoRecords.setVisibility(true);
        }
      }
    },

    resetSearchEntities: function () {
      this.view.customSearchbox.tbxSearch.text = "";
      this.view.flxNoRecords.setVisibility(false);
      let segEntitiesOriginalData = this.view.segEntitiesList.info.data;
      this.view.segEntitiesList.setData(segEntitiesOriginalData);
    },

    setEntitiesListSegmentData: function () {
      var self = this;
      let navManager = applicationManager.getNavigationManager();
      let selectedEntityData = navManager.getCustomInfo("frmSelectEntitiesList");
      let entitiesDataList = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
      let segEntitiesData = [];
      if (entitiesDataList && entitiesDataList.length > 0) {
        segEntitiesData = entitiesDataList.map(entityData => {
          return {
            "flxEntitySelectionContainer": {
              "skin": selectedEntityData && selectedEntityData.id === entityData.id ? self.SEG_ROW_FLEX_SKINS[1] : self.SEG_ROW_FLEX_SKINS[0],
              "focusskin": self.SEG_ROW_FLEX_SKINS[1]
            },
            "lblEntityValue": {
              "text": entityData.companyName
            },
            "id": entityData.id
          };
        });
      }
      let widgetDataMap = {
        "flxEntitySelectionContainer": "flxEntitySelectionContainer",
        "lblEntityValue": "lblEntityValue",
        "id": "id"
      };
      this.view.segEntitiesList.widgetDataMap = widgetDataMap;
      this.view.segEntitiesList.removeAll();
      if (segEntitiesData && segEntitiesData.length > 0) {
        this.view.segEntitiesList.setData(segEntitiesData);
        this.view.segEntitiesList.info = {
          "data": segEntitiesData
        };
        if (segEntitiesData.length > this.MIN_RECORDS_TO_ALLOW_SEARCH) {
          this.view.flxSearchEntityContainer.setVisibility(true);
          this.view.flxSelectEntityHeadingContainer.setVisibility(true);
        } else {
          this.view.flxSearchEntityContainer.setVisibility(false);
          this.view.flxSelectEntityHeadingContainer.setVisibility(false);
        }
      } else {
        this.view.segEntitiesList.setData([]);
        this.view.segEntitiesList.info = {
          "data": []
        };
        this.view.flxSearchEntityContainer.setVisibility(false);
        this.view.flxSelectEntityHeadingContainer.setVisibility(false);
      }
      this.view.segEntitiesList.onRowClick = this.onEntityRowClick;
      this.view.customSearchbox.tbxSearch.text = "";
      this.view.forceLayout();
    },

    onEntityRowClick: function () {
      var self = this;
      let navManager = applicationManager.getNavigationManager();
      let segEntitiesOriginalData = this.view.segEntitiesList.info.data;
      let segEntitiesData = this.view.segEntitiesList.data;
      let selRowData = this.view.segEntitiesList.selectedRowItems[0];
      if (selRowData && selRowData.id) {
        let onRowClickSetSegData = function (segEntityRecord) {
          segEntityRecord.flxEntitySelectionContainer.skin = self.SEG_ROW_FLEX_SKINS[0];
          if (segEntityRecord.id === selRowData.id) {
            segEntityRecord.flxEntitySelectionContainer.skin = self.SEG_ROW_FLEX_SKINS[1];
          }
        };
        segEntitiesOriginalData.forEach(segEntityRecord => onRowClickSetSegData(segEntityRecord));
        segEntitiesData.forEach(segEntityRecord => onRowClickSetSegData(segEntityRecord));

        this.view.segEntitiesList.setData(segEntitiesData);
        this.view.segEntitiesList.info = {
          "data": segEntitiesOriginalData
        };
        this.view.forceLayout();
        let selectedEntityData = {
          "id": selRowData.id,
          "companyName": selRowData.lblEntityValue.text
        };
        navManager.setCustomInfo("frmSelectEntity", selectedEntityData);
        navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmSelectEntity" });
      }
    },

    showToastPopup: function (successOrfailure, message) {
      try {
        var scopeObj = this;
        var statusMessage = message;

        if (successOrfailure === "success") {
          statusMessage = message === "" ? "Successfully executed" : message;
          this.view.flxPopup.skin = "sknFlxBg43ce6eTab";
          this.view.customPopup.imgPopup.src = "confirmation_tick.png";
        } else if (successOrfailure === "failure") {
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";
        }

        this.view.customPopup.lblPopup.text = statusMessage;
        if (!kony.sdk.isNullOrUndefined(this._timerCounter)) {
          this._timerCounter = parseInt(this._timerCounter) + 1;
        }
        else {
          this._timerCounter = 1;
        }
        var timerId = "timerPopupErrorACHTransactionDetail" + this._timerCounter;
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function () {
          scopeObj.view.flxPopup.setVisibility(false);

        }, 2, false);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        kony.print("Exception in showToastMessage-->" + error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
});