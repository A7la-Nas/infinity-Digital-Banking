define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {

  return {
    MIN_RECORDS_TO_ALLOW_SEARCH: 5,
    timerCounter: 0,

    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    preShow: function () {
      this.setPreShowData();
      this.setFlowActions();
      this.renderTitleBar();
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
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
      this.view.btnUpdate.setEnabled(false);
      this.view.btnUpdate.skin = "sknBtnBgE2E9F0Border1pxE2E9F040px";
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
      this.view.btnUpdate.onClick = this.onEntityPreferenceUpdate;
      this.view.btnCancel.onClick = this.goBack;
    },

    goBack: function () {
      let navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    },

    onEntityPreferenceUpdate: function () {
      let selRowData = this.view.segEntities.info.data.find(entityRowData => entityRowData.imgRadiobtn.src === "radioselected.png");
      if (selRowData && selRowData.id) {
        let request = {
          "id": selRowData.id
        };
        let settingsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
        settingsUIModule.presentationController.fetchTermsAndConditions(request);
      }
    },

    searchEntities: function () {
      let segEntiiesFilteredData = [];
      let segEntitiesData = this.view.segEntities.info.data;
      let searchText = this.view.customSearchbox.tbxSearch.text.toLowerCase();
      if (searchText.length === 0) {
        this.resetSearchEntities();
      } else {
        segEntitiesData.forEach(segEntityRecord => {
          if (segEntityRecord.lblBank.text.toLowerCase().indexOf(searchText) !== -1) {
            segEntiiesFilteredData.push(segEntityRecord);
          }
        });
        if (segEntiiesFilteredData && segEntiiesFilteredData.length !== 0) {
          this.view.segEntities.setData(segEntiiesFilteredData);
          this.view.segEntities.setVisibility(true);
          this.view.flxNoRecords.setVisibility(false);
          this.view.btnUpdate.setEnabled(true);
          this.view.btnUpdate.skin = "sknbtnBf293276Border1pxFontFFFFFF40PX";
        } else {
          this.view.segEntities.setData([]);
          this.view.segEntities.setVisibility(false);
          this.view.flxNoRecords.setVisibility(true);
          this.view.btnUpdate.setEnabled(false);
          this.view.btnUpdate.skin = "sknBtnBgE2E9F0Border1pxE2E9F040px";
        }
      }
    },

    resetSearchEntities: function () {
      this.view.customSearchbox.tbxSearch.text = "";
      this.view.flxNoRecords.setVisibility(false);
      let segEntitiesOriginalData = this.view.segEntities.info.data;
      this.view.segEntities.setData(segEntitiesOriginalData);
      this.view.btnUpdate.setEnabled(false);
      this.view.btnUpdate.skin = "sknBtnBgE2E9F0Border1pxE2E9F040px";
    },

    setEntitiesListSegmentData: function () {
      var self = this;
      let widgetDataMap = {
        "flxSettingsEntities": "flxSettingsEntities",
        "lblBank": "lblBank",
        "imgRadiobtn": "imgRadiobtn",
        "flxSeparator": "flxSeparator",
        "id": "id"
      };
      this.view.segEntities.removeAll();
      let defaultLegalEntity = this.getDefaultLegalEntity();
      if (!kony.sdk.isNullOrUndefined(defaultLegalEntity) && defaultLegalEntity !== "") {
        this.view.btnUpdate.text = kony.i18n.getLocalizedString("konybb.userMgmt.update");
        this.view.btnCancel.setVisibility(true);
        this.view.flxConfirmButton.height = "135dp";
        this.view.flxEntities.bottom = "135dp";
      } else {
        this.view.btnUpdate.text = kony.i18n.getLocalizedString("i18n.Profile.SetAsDefault");
        this.view.btnCancel.setVisibility(false);
        this.view.flxConfirmButton.height = "75dp";
        this.view.flxEntities.bottom = "75dp";
      }
      this.view.forceLayout();

      let navManager = applicationManager.getNavigationManager();
      let legalEntitiesDataList = navManager.getCustomInfo("frmSettingsEntityPreferences");
      let segEntitiesData = [];
      if (legalEntitiesDataList && legalEntitiesDataList.length > 0) {
        segEntitiesData = legalEntitiesDataList.map(entityData => {
          return {
            "imgRadiobtn": {
              "src": defaultLegalEntity && entityData.id === defaultLegalEntity ? "radioselected.png" : "radiounselectedblue.png"
            },
            "lblBank": {
              "text": entityData.companyName
            },
            "id": entityData.id
          };
        });
      }
      this.view.segEntities.widgetDataMap = widgetDataMap;
      if (segEntitiesData && segEntitiesData.length > 0) {
        this.view.segEntities.setData(segEntitiesData);
        this.view.segEntities.info = {
          "data": segEntitiesData
        };
        if (segEntitiesData.length > this.MIN_RECORDS_TO_ALLOW_SEARCH) {
          this.view.flxSearchEntityContainer.setVisibility(true);
          this.view.flxMainContainer.height = "195dp";
          this.view.flxEntities.top = "250dp";
        } else {
          this.view.flxSearchEntityContainer.setVisibility(false);
          this.view.flxMainContainer.height = "150dp";
          this.view.flxEntities.top = "205dp";
        }
      } else {
        this.view.segEntities.setData([]);
        this.view.segEntities.info = {
          "data": []
        };
        this.view.flxSearchEntityContainer.setVisibility(false);
        this.view.flxMainContainer.height = "150dp";
        this.view.flxEntities.top = "205dp";
      }
      this.view.segEntities.onRowClick = this.onEntityRowClick;
      this.view.customSearchbox.tbxSearch.text = "";
      this.view.forceLayout();
    },

    onEntityRowClick: function () {
      var self = this;
      let defaultLegalEntity = this.getDefaultLegalEntity();
      let segEntitiesOriginalData = this.view.segEntities.info.data;
      let segEntitiesData = this.view.segEntities.data;
      let selRowData = this.view.segEntities.selectedRowItems[0];
      let onRowClickSetSegData = function (segEntityRecord) {
        segEntityRecord.imgRadiobtn.src = "radiounselectedblue.png";
        if (segEntityRecord.id === selRowData.id) {
          segEntityRecord.imgRadiobtn.src = "radioselected.png";
        }
      };
      segEntitiesOriginalData.forEach(segEntityRecord => onRowClickSetSegData(segEntityRecord));
      segEntitiesData.forEach(segEntityRecord => onRowClickSetSegData(segEntityRecord));
      if (!kony.sdk.isNullOrUndefined(defaultLegalEntity) && defaultLegalEntity !== "") {
        if (selRowData.id !== defaultLegalEntity) {
          self.view.btnUpdate.setEnabled(true);
          self.view.btnUpdate.skin = "sknbtnBf293276Border1pxFontFFFFFF40PX";
        } else {
          self.view.btnUpdate.setEnabled(false);
          self.view.btnUpdate.skin = "sknBtnBgE2E9F0Border1pxE2E9F040px";
        }
      } else {
        self.view.btnUpdate.setEnabled(true);
        self.view.btnUpdate.skin = "sknbtnBf293276Border1pxFontFFFFFF40PX";
      }
      this.view.segEntities.setData(segEntitiesData);
      this.view.segEntities.info = {
        "data": segEntitiesOriginalData
      };
    },

    getDefaultLegalEntity: function () {
      let userPreferencesManager = applicationManager.getUserPreferencesManager();
      let defaultLegalEntity = userPreferencesManager.getDefaultLegalEntity();
      return defaultLegalEntity;
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