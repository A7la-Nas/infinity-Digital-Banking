define({
  preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxTAndC.top = "56dp";
    }
    var navManager = applicationManager.getNavigationManager();
    var navData = navManager.getCustomInfo("frmQRTAndC");
    this.view.rtxTermsConditionsValue.text = navData.richTextData;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.flxTAndC.scrollsToTop = true;
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmQRActivation");
  }
});
