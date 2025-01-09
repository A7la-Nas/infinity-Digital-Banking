define(['FormControllerUtility'], function(FormControllerUtility) {
    return {

        init: function() {
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ForeignExchangeUIModule").presentationController;
        },

        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },

        preShow: function() {
          	var scopeObj = this;
            this.view.customheadernew.activateMenu(kony.i18n.getLocalizedString("i18n.kony.exchangeRates.ExchangeRatesHeader"), "");
            this.setCountryCodeForExchange();
            this.setFeatures();
            this.setMobileHeader();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain','flxFormContent']);
            scopeObj.view.customheadernew.activateMenu("Exchange Rates", " ");
        },
        postShow: function() {
           // this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
        },

        onBreakpointChange: function(form, width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.setMobileHeader();
        },

        setFeatures: function() {
            this.view.foreignExchange.setFeaturesAndPermissions(applicationManager.getConfigurationManager().getUserFeatures(), applicationManager.getConfigurationManager().getUserPermissions());
        },

        setCountryCodeForExchange: function() {
            var countryCode = "";
            var userAddresses = applicationManager.getUserPreferencesManager().getUserObj().Addresses;
            if (Array.isArray(userAddresses) && userAddresses.length > 0) {
                userAddresses.forEach(function(address) {
                    if (address.isPrimary === "true") {
                        countryCode = address.CountryCode;
                    }
                });
            }
            this.view.foreignExchange.setCountryCode(countryCode);
    },
    setMobileHeader: function()
    {
      var orientationHandler = new OrientationHandler();
      var isMobile = (orientationHandler.isMobile ||  kony.application.getCurrentBreakpoint() === 640);
      if(isMobile)
      {
        this.view.flxForexHeader.setVisibility(false);
        this.view.lblForexHeader.text = "";
        this.view.flxFormContent.top = "70dp";
        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("kony.mb.Europe.ExchangeRate");	 
      }
      else{
        this.view.flxForexHeader.setVisibility(true);
        this.view.customheadernew.lblHeaderMobile.text = "";
        this.view.lblForexHeader.text = kony.i18n.getLocalizedString("kony.mb.Europe.ExchangeRate");			 
      }      
    },

    };
});