define({
  timerCounter: 0,

  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },

  preShow: function () {
    this.setFlowActions();
    this.setPreShowData();
    this.renderTitleBar();
    let navManager = applicationManager.getNavigationManager();
    let currentForm = navManager.getCurrentForm();
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
    this.view.btnUpdate.text = kony.i18n.getLocalizedString("i18n.Profile.BacktoDashboard");
    this.setEntityPreferenceUpdateAcknowledgmentMessage();
  },

  setEntityPreferenceUpdateAcknowledgmentMessage: function () {
    var navManager = applicationManager.getNavigationManager();
    this.view.lblSuccessMsg.text = "";
    if (!kony.sdk.isNullOrUndefined(navManager.getCustomInfo("frmSettingsEntityAcknowledgement"))) {
      let response = navManager.getCustomInfo("frmSettingsEntityAcknowledgement");
      if (response.isDefaultEntityPreviouslyPresent) {
        this.view.btnUpdate.text = kony.i18n.getLocalizedString("i18n.Profile.BacktoDashboard");
        this.view.btnUpdate.onClick = this.navToDashboard;
      } else {
        this.view.btnUpdate.text = kony.i18n.getLocalizedString("i18n.Profile.BacktoEntityPreferences");
        this.view.btnUpdate.onClick = this.goBack;
      }
      let userLegalEntitiesObj = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj();
      let updatedDefaultLegalEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
      this.view.lblSuccessMsg.text = "";
      if (updatedDefaultLegalEntity && userLegalEntitiesObj && userLegalEntitiesObj[updatedDefaultLegalEntity]) {
        let companyName = userLegalEntitiesObj[updatedDefaultLegalEntity].companyName ? userLegalEntitiesObj[updatedDefaultLegalEntity].companyName : "";
        this.view.lblSuccessMsg.text = kony.i18n.getLocalizedString("kony.mb.legalEntity.defaultEntityUpdateSuccessMsg").replace("%field%", companyName);
      }
    }
  },

  setFlowActions: function () {
    let self = this;
    this.view.customHeader.flxBack.onClick = function () {
      self.goBack();
    };
    this.view.btnUpdate.onClick = this.navToDashboard;
  },

  goBack: function () {
    let navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

  navToDashboard: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmUnifiedDashboard" });
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
  },
});