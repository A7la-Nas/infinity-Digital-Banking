define("ArrangementsMA/MortgageServicesUIModule/userfrmSimulateEarlyPayOffController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function (CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {

        initSimulateEarlyPayOff: function () {

        },

        preShowSimulateEarlyPayOff: function () {
            var scope = this;
            FormControllerUtility.hideProgressBar(this.view);
			mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            currAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            earlyPayOffDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                     "moduleName": "AccountServicesUIModule",
                     "appName": "ArrangementsMA"
                }).presentationController.earlyPayOffDetails;
            this.setSimulateDate(earlyPayOffDetails);
            this.view.btnContinue.onClick = scope.backToFacility;
            this.view.flxImgBackNavigation.onClick = scope.onClickOfBack;
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.Accounts.SimulateEarlyPayOff");
            }
            this.view.lblSupport1.text = applicationManager.getConfigurationManager().getEarlyPayOffMsg();
            this.view.lblPhNo1.text = applicationManager.getConfigurationManager().getEarlyPayOffTel1();
            this.view.lblPhNo2.text = applicationManager.getConfigurationManager().getEarlyPayOffTel2();
            this.view.lblSupport2.text = applicationManager.getConfigurationManager().getEarlyPayOffEmail();
            this.view.lblSupport3.text = applicationManager.getConfigurationManager().getEarlyPayOffAddress();
        },

        postShowSimulateEarlyPayOff: function () {          
			this.view.lblFacilityValue.text = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
			this.view.lblLoanAccountValue.text = mortgagePlans[0].accountName + " - " + mortgagePlans[0].accountID.substr(-4);
			this.view.lblCurrOutstandingBalValue.text = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
			this.view.lblCurrMaturityDateValue.text = this.getFormattedDate(mortgageDetails.maturityDate);
        },
        getFormattedDate: function(date) {
			var dateFormat = applicationManager.getConfigurationManager().getDateFormatCP();
            if (date.indexOf("-") == "-1") {
                if (dateFormat === "dmy") return date.substr(6, 2) + "/" + date.substr(4, 2) + "/" + date.substr(0, 4);
				else return date.substr(4, 2) + "/" + date.substr(6, 2) + "/" + date.substr(0, 4);                
            }
        },
        onBreakpointChange: function() {
            kony.print('on breakpoint change');
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        },
        
        onClickOfBack: function() {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmEarlyPayOff");
        },

        backToFacility: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
             "appName": "ArrangementsMA",
             "friendlyName": "AccountsUIModule/frmMortgageAccountDetails"
		 });
        },

        setSimulateDate: function(data) {
            var formatUtil = applicationManager.getFormatUtilManager();
            var currencySymbol = formatUtil.getCurrencySymbol(mortgageDetails.currencyCode);
            if (!kony.sdk.isNullOrUndefined(data.payOffDate) && data.payOffDate !== "") {
				var date = new Date(data.payOffDate);
				var payOffDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
				this.view.lblPayOffSimDateValue.text = formatUtil.getDMYFormattedSelectedDate(formatUtil.getDateObjectfromString(payOffDate));
				this.view.flx5.setVisibility(true);
			}else{
				this.view.flx5.setVisibility(false);
			}
            this.view.lbl6Value.text = formatUtil.formatAmountandAppendCurrencySymbol(data.totalOutstandingPricipal, mortgageDetails.currencyCode ? mortgageDetails.currencyCode : mortgagePlans[0].currencyCode);
            if (!kony.sdk.isNullOrUndefined(data.principalInterest) && data.principalInterest !== ""){
                this.view.lbl7Value.text = formatUtil.formatAmountandAppendCurrencySymbol(data.principalInterest, mortgageDetails.currencyCode ? mortgageDetails.currencyCode : mortgagePlans[0].currencyCode);                
                this.view.flx7.setVisibility(true);
            }else{
                this.view.flx7.setVisibility(false);
            }
            if (!kony.sdk.isNullOrUndefined(data.tax) && data.tax !== ""){
                this.view.lbl8Value.text = formatUtil.formatAmountandAppendCurrencySymbol(data.tax, mortgageDetails.currencyCode ? mortgageDetails.currencyCode : mortgagePlans[0].currencyCode);
                this.view.flx8.setVisibility(true);
            }else{
                this.view.flx8.setVisibility(false);
            }
            if (!kony.sdk.isNullOrUndefined(data.earlyPayoffFee) && data.earlyPayoffFee !== ""){
                this.view.lbl9Value.text = formatUtil.formatAmountandAppendCurrencySymbol(data.earlyPayoffFee, mortgageDetails.currencyCode ? mortgageDetails.currencyCode : mortgagePlans[0].currencyCode);
                this.view.flx9.setVisibility(true);
            }else{
                this.view.flx9.setVisibility(false);
            }
            if (!kony.sdk.isNullOrUndefined(data.otherCharges) && data.otherCharges !== ""){
                this.view.lbl10Value.text = formatUtil.formatAmountandAppendCurrencySymbol(data.otherCharges, mortgageDetails.currencyCode ? mortgageDetails.currencyCode : mortgagePlans[0].currencyCode);
                this.view.flx10.setVisibility(true);
            }else{
                this.view.flx10.setVisibility(false);
            }
            this.view.lbl11Value.text = currencySymbol + data.totalPayOffAmount;
        },
    }

});        