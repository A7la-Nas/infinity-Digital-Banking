define("ArrangementsMA/MortgageServicesUIModule/userfrmEarlyPayOffController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function (CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {        

        initEarlyPayOff: function () {
            var scopeObj = this;
			this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
        },

        updateFormUI: function (uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                if (uiData.showLoadingIndicator.status === true) {
                    FormControllerUtility.showProgressBar(this.view)
                } else {
                    FormControllerUtility.hideProgressBar(this.view)
                }
                }
                if(uiData.bankDate) {
                    this.setBankDate(uiData.bankDate);
                }
                if (uiData.showOnServerError) {
					FormControllerUtility.hideProgressBar(this.view);
					var error = uiData.showOnServerError;
					if(!kony.sdk.isNullOrUndefined(error.serverErrorRes.dbpErrCode) && ("5001" === error.serverErrorRes.dbpErrCode)){
						this.showErrScenario(error.serverErrorRes.errmsg);
					}else{                    
						this.view.flxError.setVisibility(true);
					}
                }
            }
        },

        preShowEarlyPayOff: function () {
            var scope = this;   
            FormControllerUtility.hideProgressBar(this.view);
            this.view.customheader.forceCloseHamburger();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.getBankDate();
            var numOfDays = applicationManager.getConfigurationManager().getConfigurationValue('earlyPayOffSimulateDays'); 
            scope.view.flxImage.onClick = scope.showPayOffSimulationInfo;       
           // scope.view.imgInfo.onTouchEnd = scope.showPayOffSimulationInfo;
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
            this.view.btnCancel.onClick = scope.onClickofCancel;
            this.view.btnContinue.onClick = scope.onClickofContinue;
            if (kony.application.getCurrentBreakpoint() <= 640 ) {
                this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.Accounts.SimulateEarlyPayOff");
            }
            this.view.lblInlineMessage.setVisibility(false);
			this.view.flx1.top = "30dp";
			if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)
				this.view.flxContainer.height = "425dp";
			else
				this.view.flxContainer.height = "475dp";
            this.view.flxByDate.height = "40px";
            this.view.flxByDate.clipBounds = false;
            this.view.flxButtons.zIndex = 0;
            this.view.flxMainWrapper.zIndex = 20;
            this.view.flxSeparator.zIndex = 0;
           // this.view.flxInstructionPoint.zIndex = 0;
			this.view.calDateFrom.clear();
            var dateFormat = applicationManager.getConfigurationManager().getDateFormatCP();
			if (dateFormat === "dmy"){
				this.view.calDateFrom.dateFormat="dd/MM/yyyy";
				this.view.calDateFrom.placeholder="dd/MM/yyyy";
			}else{
				//this.view.calDateFrom.dateFormat="MM/dd/yyyy";
				//this.view.calDateFrom.placeholder="MM/dd/yyyy";
                this.view.calDateFrom.accessibilityConfig ={
                    "a11yLabel": "Payoff Simulation Date",
                    "a11yARIA": {
                        // "aria-labelledby": "K1709701142724",
                         "aria-required": true,
                        // "role": "button",
                         "tabindex": 0
                     }
                };
			}
            var calFromDateContext = {
                "widget": this.view.calDateFrom,
                "anchor": "bottom"
            };
            this.view.calDateFrom.setContext(calFromDateContext);
            this.view.flxInformationText.setVisibility(false); 
            this.view.lblPoint1.text = kony.i18n.getLocalizedString("i18n.Accounts.PayoffInstructions") + numOfDays + kony.i18n.getLocalizedString("i18n.Accounts.PayoffInstructions1");
            var bankDate = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                     "moduleName": "AccountsUIModule",
                     "appName": "ArrangementsMA"
                }).presentationController.bankDate;    
            //this.setBankDate(bankDate); 
            this.view.flxError.setVisibility(false);
            this.view.imgClose.onTouchEnd = function() {
                scope.view.flxError.setVisibility(false);
            }; 
            this.view.customheader.btnSkip.onClick = function() {
                scope.view.lblHeader.setActive(true);
			};
			this.view.byPass.onClick = function() {
                scope.view.lblInstructionHeader.setActive(true);
			};
			
			this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
			this.view.flxPopup.onKeyPress = this.onKeyPressCallBack;
			this.view.flxInformationText.onKeyPress = this.infoKeyPressCall;
			this.view.btnCross.onKeyPress=this.infoKeyPressCall1;
			this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "My Accounts");           
        },

        postShowEarlyPayOff: function () {
            this.view.flx5.zIndex = 1;
			this.view.lblFacilityValue.text = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
			this.view.lblLoanAccountValue.text = mortgagePlans[0].accountName + " - " + mortgagePlans[0].accountID.substr(-4);
			this.view.lblCurrOutstandingBalValue.text = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
			this.view.lblCurrMaturityDateValue.text = this.getFormattedDate(mortgageDetails.maturityDate);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
			this.view.CustomPopupNew.doLayout = CommonUtilities.centerPopupFlex;
			this.view.flxImage.accessibilityConfig = {
                "a11yLabel": "Read more information regarding payoff simulation date",
                "a11yARIA": {
                    "tabindex": 0,
					"role": "button"
                }
            };
			this.view.flxInstructionPoint.zIndex = 0;
			if (kony.application.getCurrentBreakpoint() > 1024) {
				this.view.flxInstructionPoint.height = "190px";
				this.view.flxInstructionPoint.width = "360px";
			}
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxPopup.isVisible === true) {
                    self.view.flxPopup.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.btnCancel.setFocus(true);
                }
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                   // self.view.flxDialogs.isVisible = false;
                    //  self.view.customheadernew.btnLogout.setFocus(true);
                    self.view.customheader.onKeyPressCallBack(eventObject, eventPayload);
                }
            }
        },
		
		infoKeyPressCall: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                this.view.flxInformationText.isVisible = false;
                this.view.flxImage.setActive(true);
            }
        },
		
		infoKeyPressCall1: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (this.view.flxInformationText.isVisible === true) {
                    this.view.flxInformationText.isVisible = false;
                    this.view.flxImage.setActive(true);
                }
            }
   
			if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                    this.view.flxInformationText.isVisible = false;
					eventPayload.preventDefault();
                    this.view.flxImage.setActive(true);
                }
				
			if (eventPayload.keyCode === 27) {
                this.view.flxInformationText.isVisible = false;
                this.view.flxImage.setActive(true);
            }
				
        },
         getFormattedDate: function(date) {
			var dateFormat = applicationManager.getConfigurationManager().getDateFormatCP();
            if (date.indexOf("-") == "-1") {
                if (dateFormat === "dmy") return date.substr(6, 2) + "/" + date.substr(4, 2) + "/" + date.substr(0, 4);
				else return date.substr(4, 2) + "/" + date.substr(6, 2) + "/" + date.substr(0, 4);                
            }
        },
       // onBreakpointChange: function() {
           // kony.print('on breakpoint change');
           // orientationHandler.onOrientationChange(this.onBreakpointChange);
       // },
       onBreakpointChange: function(form, width) {
        var scopeObj = this;
        FormControllerUtility.setupFormOnTouchEnd(width);
        this.view.customheader.onBreakpointChangeComponent(width);
           },

        showPayOffSimulationInfo: function() {
            var scope = this;
            this.view.flx5.zIndex = 1;
            this.view.flxSimulationInfo.zIndex = 2;
            this.view.flxInformationText.setVisibility(true);
            this.view.btnCross.onClick = function() {
                scope.view.flxInformationText.setVisibility(false);
                scope.view.flxImage.setActive(true);
            };
            this.view.lblInfo.setActive(true);
        },

        onClickofCancel: function() {
          var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
             "appName": "ArrangementsMA",
             "friendlyName": "AccountsUIModule/frmMortgageAccountDetails"
		 });
        },

        onClickofContinue: function() {
          FormControllerUtility.showProgressBar(this.view);
          var date = this.view.calDateFrom.dateComponents;
		  var effectiveDate = "" + date[2] + this.getNumber(date[1]) + this.getNumber(date[0]);
          var params = {
            "arrangementId": mortgagePlans[0].arrangementId,//"AA23108RTHFX", 
            "effectiveDate": effectiveDate //"20230525"
          };
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AccountServicesUIModule",
            "appName": "ArrangementsMA"
          }).presentationController.getEarlyPayOffDetails(params);
        },  

        setBankDate: function(bankDate) {
            var scopeObj = this;            
            bankDate = bankDate.currentWorkingDate || CommonUtilities.getServerDate();
            scopeObj.disableOldDaySelection(scopeObj.view.calDateFrom, bankDate);            
        },

        disableOldDaySelection: function(widgetId, bankDate) {
            var numOfDays = applicationManager.getConfigurationManager().getConfigurationValue('earlyPayOffSimulateDays');
            var today = new Date(bankDate);
            var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * (numOfDays - 1) /*days*/));
            widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
            widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        },

        getNumber: function(num) {
            if (num > -1 && num < 10) {
                return "0" + num;
            }
            return "" + num;
        },

        showErrScenario: function(errmsg){
			this.view.lblInlineMessage.text = errmsg;
			this.view.lblInlineMessage.setVisibility(true);
			this.view.flx1.top = "17dp";
			if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)
				this.view.flxContainer.height = "452dp";
			else
				this.view.flxContainer.height = "502dp";			
		}

    }

});        