define([], function () {
  return {
    SET_DEFAULTENTITY_CHECKBOXES_IMG: ["inactivecheckbox_2.png", "activecheckbox.png"],
    selectedEntity: "",

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
      this.view.imgSetDefaultEntity.src = this.SET_DEFAULTENTITY_CHECKBOXES_IMG[0];
      this.view.lblSelectedLegalEntity.text = "";
      this.setSelectedEntityData();
    },

    setFlowActions: function () {
      let self = this;
      this.view.customHeader.flxBack.onClick = function () {
        self.goBack();
      };
      this.view.flxEntitySelection.onClick = function () {
        self.onEntityDropdownClick();
      }
      this.view.imgSetDefaultEntity.onTouchEnd = function () {
        self.toggleSetAsDefaultCheckbox();
      },
      this.view.btnContinue.onClick = function () {
        self.onContinueEntitySelectionClick();
      }
    },

    goBack: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      let authUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AuthenticationMA", "moduleName": "AuthUIModule" });
      authUIModule.presentationController.onLogout();
    },

    onEntityDropdownClick: function () {
      let navManager = applicationManager.getNavigationManager();
      let selectedEntityData = {
        "id": this.selectedEntity
      };
      navManager.setCustomInfo("frmSelectEntitiesList", selectedEntityData);
      navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmSelectEntitiesList" });
    },

    setSelectedEntityData: function () {
      let userLegalEntitiesListObj = applicationManager.getMultiEntityManager().getUserLegalEntitiesListObj();
      let userLegalEntitiesListArr = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
      let homeLegalEntity = applicationManager.getUserPreferencesManager().getHomeLegalEntity();
      let navManager = applicationManager.getNavigationManager();
      let selectedEntityData = navManager.getCustomInfo("frmSelectEntity");
      let companyName = "";
      if (selectedEntityData !== undefined) {
        this.selectedEntity = selectedEntityData.id;
        companyName = selectedEntityData.companyName;
      } else if (userLegalEntitiesListObj && Object.keys(userLegalEntitiesListObj).length > 0) {
        if (userLegalEntitiesListObj[homeLegalEntity]) {
          this.selectedEntity = userLegalEntitiesListObj[homeLegalEntity].id;
          companyName = userLegalEntitiesListObj[homeLegalEntity].companyName;
        } else {
          this.selectedEntity = userLegalEntitiesListArr[0].id;
          companyName = userLegalEntitiesListArr[0].companyName;
        }
      }
      this.view.lblSelectedLegalEntity.text = companyName ? companyName : "";
    },

    toggleSetAsDefaultCheckbox: function () {
      if (this.view.imgSetDefaultEntity.src === this.SET_DEFAULTENTITY_CHECKBOXES_IMG[0]) {
        this.view.imgSetDefaultEntity.src = this.SET_DEFAULTENTITY_CHECKBOXES_IMG[1];
      } else {
        this.view.imgSetDefaultEntity.src = this.SET_DEFAULTENTITY_CHECKBOXES_IMG[0];
      }
      this.view.forceLayout();
    },

    onContinueEntitySelectionClick: function () {
      let selectedEntity = this.selectedEntity;
      let isSetAsDefaultEntity = this.view.imgSetDefaultEntity.src === this.SET_DEFAULTENTITY_CHECKBOXES_IMG[1] ? true : false;
      let request = {
        "id": selectedEntity,
        "isSetAsDefaultEntity": isSetAsDefaultEntity
      };
      let authUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authUIModule.presentationController.fetchTermsAndConditions(request);
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