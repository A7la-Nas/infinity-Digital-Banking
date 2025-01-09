define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    preshow: function () {
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
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.common.TnC");
        this.view.flxBody.top = "55dp";
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.title = kony.i18n.getLocalizedString("i18n.common.TnC");
        this.view.flxBody.top = "0dp";
      }
    },

    setPreShowData: function () {
      this.view.customHeader.lblLocateUs.contentAlignment = 5;
      this.setTermsAndConditionsData();
    },

    setFlowActions: function () {
      this.view.customHeader.btnRight.onClick = this.goBack;
      this.view.btnAccept.onClick = this.onAcceptOfTermsAndConditions;
    },

    goBack: function () {
      let navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    },

    onAcceptOfTermsAndConditions: function () {
      let navManager = applicationManager.getNavigationManager();
      let termsAndConditionsData = navManager.getCustomInfo("frmSelectEntityTermsAndConditions");
      let request = {
        "id": termsAndConditionsData.id,
        "isSetAsDefaultEntity": termsAndConditionsData.isSetAsDefaultEntity ? true : false
      };
      let authUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authUIModule.presentationController.updateTermsAndConditions(request);
    },

    setTermsAndConditionsData: function () {
      let navManager = applicationManager.getNavigationManager();
      let termsAndConditionsData = navManager.getCustomInfo("frmSelectEntityTermsAndConditions");
      this.view.rtxTermsAndConditionsLegalEntity.text = termsAndConditionsData && termsAndConditionsData.termsAndConditionsContent ? termsAndConditionsData.termsAndConditionsContent : "";
      this.view.forceLayout();
    }
  };
});