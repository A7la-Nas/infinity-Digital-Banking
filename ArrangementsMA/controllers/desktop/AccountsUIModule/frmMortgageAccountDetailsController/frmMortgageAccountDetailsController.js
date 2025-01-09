define("ArrangementsMA/AccountsUIModule/userfrmMortgageAccountDetailsController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return {
        plansData: {},
        accountDetails: {},
        isAccountsOpened: true,
		mortgageAccountCount: "",
        fromScroll: false,
		earlyPayoff: false,
        param: {},
        contextualflag:"",
        onNavigate: function() {
            this.view.quicklinks.onError = this.onError;
            this.setQuicklinks();
        },
        updateFormUI: function(uiData) {
            //alert('ok');
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    }
                }
                if (uiData.details) {
                    account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.currentAccount;
                    this.setData(uiData.details, account1);
                }
                if (uiData.plans) {
                    this.plans(uiData.plans)
                }
            }
        },
        initFrmAccountDetails: function() {
            var self = this;
            var formatUtil = applicationManager.getFormatUtilManager();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var today = new Date();
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.onBreakpointChange = this.onBreakpointChange;
            // this.loadAccountModule().presentationController.getMortgage();
        },
        loadAccountModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
        },
        //Type your controller code here 
        preshowFrmMortgageAccountDetails: function() {
            var scopeObj = this;
            var params = {};
            this.view.postShow=this.postShowFrmMortgageAccountDetails;
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxMain', 'flxFooter', "flxAccountTypesAndInfo", "flxPropertyAndTerm", "flxMortgageSummary", "flxMortgageInformation"]);
            //var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            var userPermissionsList = applicationManager.getConfigurationManager().getUserPermissions();
            if(typeof(userPermissionsList)==="string"){
                userPermissionsList = JSON.parse(userPermissionsList);
            }
            var userPermissions = Array.from(userPermissionsList);
            this.view.customheader.forceCloseHamburger();
            params.entitlement = {};
            params.entitlement.features = applicationManager.getConfigurationManager().getUserFeatures();
            params.entitlement.permissions = userPermissions;
            this.param = params;
            this.view.quicklinks.setParentScopeAndEntitlements(this, params.entitlement);
            this.view.quicklinks.onError = this.onError;
            this.view.accountTransactionList.onError = this.onError;
            this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "My Accounts");
            //this.setQuicklinks();
            this.view.accountListMenu.isVisible = false;
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            accountList = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.accountList;
            //this.setData(mortgageDetails, account1);
            this.plans(mortgagePlans, scopeObj);
            width = kony.application.getCurrentBreakpoint();
            this.onBreakpointHandler(width);
            this.setDataForDropDown(accountList);
            this.view.imgAccountTypes.isVisible = true;
            this.view.accountListMenu.isVisible = false;
            scopeObj.view.accountTypes.isVisible = false;
            this.view.flxThree.onClick = function() {
                scopeObj.view.quicklinks.isVisible = !scopeObj.view.quicklinks.isVisible;
                // scopeObj.view.accountList.top = scopeObj.view.accountList.top == "750dp" ? "10dp" : "750dp";
            };
            this.view.flxGroup.onClick = this.accountTypesOnclick;
            this.view.flxGroup.onKeyPress = this.groupOnkeyPress;
            this.view.accountList.flxClosedPlan.onClick = function() {
                scopeObj.view.accountList.segAccounts.setData(scopeObj.plansData.closedPlansData);
            };
            // this.view.accountList.flxActivePlan.onTouchEnd = function() {
            //     scopeObj.view.accountList.segAccounts.setData(scopeObj.plansData.activePlansData);
            // }
            this.view.accountTypes.segAccountTypes.onRowClick = this.showMortgageFacility.bind(this, this.view.accountTypes.segAccountTypes.selectedRowItems);
            this.view.flxShowIcon.onClick = function(mortgageDetails) {
                mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.mortgageDetails;
                if (scopeObj.view.lblShowIcon.text == 'g') {
                    scopeObj.view.lblShowIcon.text = 'h';
                    scopeObj.view.lblAccountNumberValue.text = mortgageDetails.accountNumber;
                    scopeObj.view.flxShowIcon.accessibilityConfig={
                        "a11yLabel":"Hide account number, your account number is currently visible",
                        "a11yARIA":{
                            "role":"button",
                            "tabindex":0
                        }
                    }
                } else {
                    scopeObj.view.lblShowIcon.text = 'g';
                    scopeObj.view.lblAccountNumberValue.text = "****" + mortgageDetails.accountNumber.slice(-4);
                    scopeObj.view.flxShowIcon.accessibilityConfig={
                        "a11yLabel":"View account number, your account number is currently hidden",
                        "a11yARIA":{
                            "role":"button",
                            "tabindex":0
                        }
                    }
                }
                scopeObj.view.flxShowIcon.setActive(true);
            }
            this.view.flxShowIcon2.onClick = function(mortgageDetails) {
                mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.mortgageDetails;
                if (scopeObj.view.lblShowIcon2.text == 'g') {
                    if (orientationHandler.isDesktop || orientationHandler.isTablet) {
                        if (mortgageDetails.iBAN.length > 20) {
                            scopeObj.view.flxiBan2.isVisible = true;
                            scopeObj.view.lblIBANValue.text = mortgageDetails.iBAN.substr(0, 20);
                            scopeObj.view.lblIBANValue2.text = mortgageDetails.iBAN.substr(20, );
                            scopeObj.view.flxShowIcon2.isVisible = false;
                            scopeObj.view.lblShowIcon3.text = 'h';
                        } else {
                            scopeObj.view.lblIBANValue.text = mortgageDetails.iBAN;
                            scopeObj.view.lblShowIcon2.text = 'h';
                        }
                    } else {
                        scopeObj.view.lblShowIcon2.text = 'h';
                        scopeObj.view.lblIBANValue.text = mortgageDetails.iBAN;
                    }
                } else {
                    scopeObj.view.lblShowIcon2.text = 'g';
                    scopeObj.view.lblIBANValue.text = "****" + mortgageDetails.iBAN.slice(-4);
                }
            }
            this.view.accountTypes.segAccountTypes.onScrolling = function() {
                scopeObj.fromScroll = true;
            };
           // scopeObj.checkPermissionForDay();
            this.view.flxImgDropdown.onClick = this.dropDownClick;
            this.view.flxImgDropdown.onKeyPress = this.dropDownKeyPress;
            this.view.segUpdate.onRowClick = this.showChangeRepaymentPage.bind(this.view.segUpdate.selectedRowItems);
            scopeObj.view.flxUpdateContent.isVisible = true;
            scopeObj.view.flxUpdateContent.isVisible = false;
           // this.view.flxUpdateFacilityMain.top = "465dp";
            this.view.flxFooter.top = "700dp";
            //this.view.accountList.segAccounts.onRowClick = this.showPlanDetails.bind(this.view.accountList.segAccounts);
            this.view.accountTypes.segAccountTypes.onScrolling = function() {
                scopeObj.fromScroll = true;
            };
            this.view.flxShowIcon3.onClick = function() {
                mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.mortgageDetails;
                scopeObj.view.flxShowIcon2.isVisible = true;
                scopeObj.view.lblShowIcon2.text = 'g';
                scopeObj.view.lblIBANValue.text = "****" + mortgageDetails.iBAN.slice(-4);
                scopeObj.view.flxiBan2.isVisible = false;
            };
          if (orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 640) {
            // this.view.flxUpdateFacilityMain.top = "120dp";
          }
        },
        groupOnkeyPress : function(eventObject,eventPayload){
            if (eventPayload.keyCode === 27) {
                if (this.view.accountTypes.isVisible) {
                    this.accountTypesOnclick();
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if (this.view.accountTypes.isVisible) {
                        this.accountTypesOnclick();
                        //need to implement setactive
                    }
                }
            }
        },
        accountTypesOnclick: function () {
            this.view.accountTypes.isVisible = !this.view.accountTypes.isVisible;
            this.view.flxGroup.accessibilityConfig = {
                "a11yLabel":this.view.accountTypes.isVisible === true ? "Currently Selected "+this.view.lblAccountTypes.text+" . Click to hide list of accounts.": "Currently Selected "+this.view.lblAccountTypes.text+". Click to show list of accounts.",
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": this.view.accountTypes.isVisible === true ? true : false,
                    "tabindex":0
                }
            };
            this.view.flxGroup.setActive(true);
        },
        dropDownKeyPress : function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                if(this.view.lblDropdown.text==="P"){
                    eventPayload.preventDefault();
                    this.dropDownClick();
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(this.view.lblDropdown.text==="P"){
                        this.dropDownClick();
                        //need to implement setactive
                    }
                }
            }
        },
        dropDownClick : function() {
            this.view.lblDropdown.text = this.view.lblDropdown.text == 'O' ? 'P' : 'O';
            if(this.view.lblDropdown.text==="O"){
                this.view.flxImgDropdown.accessibilityConfig={
                    "a11yLabel":"Show more quick links",
                    "a11yARIA":{
                        "role":"button",
                        "aria-expanded":false,
                        "tabindex":0
                    }
                }
            }
            else{
                this.view.flxImgDropdown.accessibilityConfig={
                    "a11yLabel":"Hide List of quick links",
                    "a11yARIA":{
                        "role":"button",
                        "aria-expanded":true,
                        "tabindex":0
                    }
                }
            }
            if(this.view.accountListMenu.isVisible)
                this.view.accountListMenu.isVisible= !this.view.accountListMenu.isVisible;
            this.view.flxUpdateContent.isVisible = !this.view.flxUpdateContent.isVisible;
            if (orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 640) {
                if(this.view.lblDropdown.text == 'P'){
                    this.view.flxFooter.top = parseInt(this.view.flxFooter.info.frame.y + 70) + "dp";
                }
                else{
                    this.view.flxFooter.top = parseInt(this.view.flxFooter.info.frame.y - 70) + "dp";
                }
            }
            this.view.flxImgDropdown.setActive(true);
        },
        postShowFrmMortgageAccountDetails: function() {
            var scope = this;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.customheadernew.btnSkipNav.onClick=function(){
                scope.view.lblTitle.setActive(true);
            }
            this.view.accountListMenu.zIndex=10;
            this.view.customheadernew.collapseAll();
            this.view.flxShowIcon.accessibilityConfig={
                "a11yLabel":"View account number, your account number is currently hidden",
                "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                }
            }
            this.view.flxImgDropdown.accessibilityConfig={
                "a11yLabel":"Show more quick links",
                "a11yARIA":{
                    "role":"button",
                    "aria-expanded":false,
                    "tabindex":0
                }
            }
            this.view.btnByPass.onClick=function(){
                if(kony.application.getCurrentBreakpoint()===640){
                scope.view.accountList.segAccounts.setActive(-1,0,"flxTempPlanMobile.flxAccountListItemHeader.flxGroup");
                }
                else{
                scope.view.accountList.segAccounts.setActive(-1,0,"flxTempPlan.flxAccountListItemHeader.flxGroup");
                }
            }
            this.view.flxAccountTypes.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                } 
            }
            this.view.accountListMenu.segAccountListActions.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.accountTypes.segAccountTypes.accessibilityConfig={
                "a11yARIA":{
                    "tabindex":-1
                }
            }
            this.view.customheadernew.lblHeaderMobile.text="Mortgage Account Details";
            applicationManager.getNavigationManager().applyUpdates(this);
            //this.view.customheader.forceCloseHamburger();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.imgAccountTypes.left="10dp";
            this.view.imgAccountTypes.top="6dp";
            this.view.accountTypes.top="-15dp";
            this.view.accountTypes.left="0dp";
            this.view.accountTypes.width="360dp";
            if (kony.os.deviceInfo().screenHeight < 400) {
                if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.customheadernew.flximgKony.left = "30dp";
                    this.view.customheadernew.flxHamburger.width = "48%";
                    this.view.customheadernew.flxMenuLeft.left = "20dp";
                    this.view.customheadernew.flxActionsMenu.right="36dp";
                }
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.view.flxHeader.height = "40dp";
                    this.view.flxFormContent.top = "60dp";
                    this.view.customheadernew.lblHeaderMobile.isVisible = true;
                    this.view.customheadernew.lblHeaderMobile.centerX = "50%";
                    this.view.customheadernew.lblHeaderMobile.centerY = "50%";
                    this.view.customheadernew.flxHamburger.width = "90%";
                    this.view.flxFooter.top="1500dp";
                }
            }
            if(kony.application.getCurrentBreakpoint()===640){
                this.view.quicklinks.top="10dp";
                this.view.quicklinks.isVisible=true;
                this.view.flxUpdateFacilityMain.top="70dp";
                this.view.accountList.top="20dp";
            }
            this.view.lblShowIcon.text="g";
        },
        onKeyPressCallBack: function (eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxDialogs.isVisible) {
                    this.view.flxDialogs.isVisible = false;
                }
                this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
        checkPermissionForDay: function() {
            var data = [];
			var account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.currentAccount;				
			if((account1.actions !== undefined) && account1.actions.includes("EARLY_PAYOFF_SIMULATION-CREATE")){
				this.earlyPayoff = true;
			}
            if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_DAY-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("EARLY_PAYOFF_SIMULATION-CREATE") == "-1") {
                this.view.flxUpdateFacilityMain.isVisible = false;
                // data = [{
                //     lblAction: 'Remove Co Borrower'
                // }];
            } else if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_DAY-VIEW") == "-1" || this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1" || this.param.entitlement.permissions.indexOf("EARLY_PAYOFF_SIMULATION-CREATE") == "-1") {
                if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_DAY-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("EARLY_PAYOFF_SIMULATION-CREATE") == "-1") {
                    data = [{
                        lblUsers: 'Partial Repayment'
                    }];
                } else if (this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("EARLY_PAYOFF_SIMULATION-CREATE") == "-1") {
                    data = [{
                        lblUsers: 'Change Repayment Day'
                    }];
                } else if (this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_DAY-VIEW") == "-1" && this.mortgageAccountCount === 1) {
                    if (this.earlyPayoff === true) {
						data = [{
							lblUsers: 'Simulate Early payoff'
						}];
					}
                } else if (this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1") {
					if(this.mortgageAccountCount === 1 && this.earlyPayoff === true){
                    data = [{
                        lblUsers: 'Change Repayment Day'
                    }, {
                        lblUsers: 'Simulate Early payoff'
                    }];
					} else {
						 data = [{
                        lblUsers: 'Change Repayment Day'
                    }];
					}
                } else if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_DAY-VIEW") == "-1") {
					if(this.mortgageAccountCount === 1 && this.earlyPayoff === true){
                    data = [{
                        lblUsers: 'Partial Repayment'
                    }, {
                        lblUsers: 'Simulate Early payoff'
                    }];
					} else {
						data = [{
                        lblUsers: 'Partial Repayment'
                    }];
					}
                } else if (this.param.entitlement.permissions.indexOf("EARLY_PAYOFF_SIMULATION-CREATE") == "-1") {
                    data = [{
                        lblUsers: 'Change Repayment Day'
                    }, {
                        lblUsers: 'Partial Repayment'
                    }];
                }
            } else {
                data = [{
                    lblUsers: 'Change Repayment Day'
                }, {
                    lblUsers: 'Partial Repayment'
                }, {
                    lblUsers: 'Simulate Early payoff'
                }];
                // {
                //     lblAction: 'Remove Co Borrower'
                // }];
            }
            for(var i=0;i<data.length;i++){
                data[i].flxAccountTypes={
                    "accessibilityConfig":{
                        "a11yARIA":{
                            "role":"button",
                            "tabindex":0,
                            "aria-labelledby":"lblUsers"
                        }
                    },
                    "onKeyPress":this.accounttypesKeypress
                }
            }
            this.view.segUpdate.setData(data);
        },
        accounttypesKeypress : function(eventObject,eventPayload,context){
            if(eventPayload.keyCode===27){
                eventPayload.preventDefault();
                this.dropDownClick();
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0){
                        eventPayload.preventDefault();
                        this.dropDownClick();
                    }
                }
                else{
                    if(context.rowIndex===context.widgetInfo.data.length-1){
                        eventPayload.preventDefault();
                        this.dropDownClick();
                        //need to implement setactive
                    }
                }
            }
        },
        showPartialRepaymentTnCPage: function (sgData) {
            if (sgData.selectedRowItems[0].lblUsers == "Partial Repayment") {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.isFromMortgage = 1;
                kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                navMan.navigateTo({
                    "appName": "ArrangementsMA",
                    "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentTermsAndCond"
                });
            }
            kony.application.dismissLoadingScreen();
        },
		showEarlyPafoffTnCPage: function (sgData) {
            if (sgData.selectedRowItems[0].lblUsers == "Simulate Early payoff") {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.isFromMortgage = 1;
                kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                navMan.navigateTo({
                    "appName": "ArrangementsMA",
                    "friendlyName": "MortgageServicesUIModule/frmEarlypayTermsandCond"
                });
            }
            kony.application.dismissLoadingScreen();
        },
        setDataForDropDown: function(accountList) {
            var mortgageAccounts = accountList.filter(function(account) {
                return account.accountType == "mortgageFacility"
            })
            var data = []
            var scope=this;
            mortgageAccounts.forEach(function(account) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                let a = {
                    lblSeparator: account,
                    lblUsers: {
                        text:account.accountName + "..." + (account.accountID.substr(-4)),
                        accessibilityConfig:{
                            "a11yHidden":true,
                            "a11yARIA":{
                                tabindex:-1
                            }
                        }
                    },
                    flxAccountTypes : {
                        "accessibilityConfig":{
                            "a11yARIA":{
                                "role":"button",
                                "tabindex":0,
                                "aria-labelledby":"lblUsers"
                            }
                        },
                        "onKeyPress":scope.topAccountsKeyPress
                    }
                }
                data.push(a);
            })
            this.view.accountTypes.segAccountTypes.setData(data);;
        },
        topAccountsKeyPress : function(eventObject,eventPayload,context){
            if(eventPayload.keyCode===27){
                this.accountTypesOnclick();
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0){
                        eventPayload.preventDefault();
                        this.accountTypesOnclick();
                    }
                }
                else{
                    if(context.rowIndex===context.widgetInfo.data.length-1){
                        this.accountTypesOnclick();
                    }
                }
            }
        },
        onBreakpointHandler: function(width) {
            if (orientationHandler.isDesktop) {
                // this.view.quicklinks.top = "397px";
                // this.view.quicklinks.left = "897px";
                // this.view.accountList.left = "6.2%";
                // this.view.accountList.top = "397px";
                //this.view.flxUpdateFacilityMain.top = "465dp";
                // this.view.flxUpdateFacilityMain.left = "897dp";
            };
            if (orientationHandler.isTablet) {
                // this.view.flxUpdateFacilityMain.top = "663dp";
                // this.view.flxUpdateFacilityMain.left = "392dp";
                // this.view.flxUpdateFacilityMain.width = "352dp";
            }
        },
        setData: function(account, account1) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            day = dd + '/' + mm + '/' + yyyy;
            this.view.flexRight.lblAsOf.text= kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + day;
            this.view.lblAccountTypes.text= account1.AccountName + "..." + (account1.accountID.substr(-4));
            this.view.flxGroup.accessibilityConfig = {
                "a11yLabel":"Currently Selected "+this.view.lblAccountTypes.text+". Click to show list of accounts.",
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": false,
                    "tabindex":0
                }
            };
            this.view.lblOutstandingBalance.text = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalOutstandingBalance");
            this.view.lblBalance.text = CommonUtilities.formatCurrencyWithCommas(account.totalOutstandingBalance, false, account.currency);
            this.view.lblField1.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.CommitmentAmount");
            this.view.lblField1Value.text = CommonUtilities.formatCurrencyWithCommas(account.commitmentAmount, false, account.currency);
            //this.view.lblField1Value.text=account.commitmentAmount;
            this.view.lblField2.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.UtilisedAmount");
            this.view.lblField2Value.text = CommonUtilities.formatCurrencyWithCommas(account.utilisedAmount, false, account.currency) + ' of ' + CommonUtilities.formatCurrencyWithCommas(account.commitmentAmount, false, account.currency);
            this.view.lblField3.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.TotalPaidtoDate");
            this.view.lblField3Value.text = CommonUtilities.formatCurrencyWithCommas(account.totalPaidAmount, false, account.currency);
            //this.view.lblField3Value.text=account.totalPaid;
            this.view.lblField4.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.HomeOwnership");
            this.view.lblField4Value.text = account.homeOwnership + "%";
            this.view.lblPropertyAddress.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.PropertyAddress");
            this.view.lblPropertyAddressValue.text = account.propertyAddress;
            this.view.lblPropertyType.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.PropertyType");
            this.view.lblPropertyTypeValue.text = account.propertyType;
            this.view.lblCommitmentTerm.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.CommitmentTerm");
            this.view.lblCommitmentTermValue.text = account.commitmentTerm;
            this.view.lblEffectiveDate.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.EffectiveDate");
            this.view.lblEffectiveDateValue.text = this.getFormattedDate(account.effectiveDate);
            this.view.lblMaturityDate.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.MaturityDate");
            this.view.lblMaturityDateValue.text = this.getFormattedDate(account.maturityDate);
            this.view.lblAccountNumber.text = kony.i18n.getLocalizedString("i18n.mortgageAccount.AccountNumber");
            this.view.lblAccountNumberValue.text = "****" + account.accountNumber.slice(-4);
            this.view.lblIBAN.text = kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN") + ":";
            this.view.lblIBANValue.text = account.iBAN ? "****" + account.iBAN.slice(-4) : kony.i18n.getLocalizedString("i18n.common.NA");
            this.view.flxShowIcon2.isVisible = true;
            if (kony.sdk.isNullOrUndefined(account.iBAN)) {
                this.view.flxShowIcon2.isVisible = false;
            }
            this.view.segCoBorrower.widgetDataMap = {
                "lblCoBorrower": "lblCoBorrower",
                "lblCoBorrowerValue": "lblCoBorrowerValue"
            };
            var customers = account.ownership;
            customers = JSON.parse(customers);
            var data = [];
            a = customers.filter(function(customer) {
                return customer.customerRole == "OWNER"
            });
            data[0] = {
                'template': (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxCoBorrowerMobile" : "flxCoBorrower",
                lblCoBorrower: "Primary Borrower:",
                lblCoBorrowerValue: a[0].customerName
            }
            b = customers.indexOf(a[0])
            customers.splice(b, 1)
            customers.forEach(function(customer, index) {
                let b = {
                    'template': (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxCoBorrowerMobile" : "flxCoBorrower",
                    lblCoBorrower: "Co-Borrower" + ' ' + String(index + 1) + ':',
                    lblCoBorrowerValue: customer.customerName
                };
                data.push(b);
            });
            this.view.segCoBorrower.setData(data);
            FormControllerUtility.hideProgressBar(this.view);
        },
        setQuicklinks: function() {
            if (orientationHandler.isMobile) {
                var param = [{
                    "linkText": 'View Documents',
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDocument",
                        "context": "",
                        "entitlement": ["VIEW_DOCUMENTS"]
                    },
                    "visibility": true
                }, {
                    "linkText": kony.i18n.getLocalizedString("i18n.Homepage.raiseaRequest"),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionRaiseARequest",
                        "context": "",
                        "entitlement": ["MESSAGES_CREATE_OR_REPLY"]
                    },
                    "visibility": true
                }, {
                    "linkText": 'Simulate Early payoff',
                    "linkCTA": {
                        "level": "Form",
                        "method": "showEarlyPayoffForMobile",
                        "context": "",
                        "entitlement": ["EARLY_PAYOFF_SIMULATION-CREATE"]
                    },
                    "visibility": true
                },{
                    "linkText": 'Change Repayment Day',
                    "linkCTA": {
                        "level": "Form",
                        "method": "showRepaymentDayForMobile",
                        "context": "",
                        "entitlement": ["CHANGE_REPAYMENT_DAY-VIEW"]
                    },
                    "visibility": true
                },{
                    "linkText": 'Partial Repayment',
                    "linkCTA": {
                        "level": "Form",
                        "method": "showPartialRepaymentForMobile",
                        "context": "",
                        "entitlement": ["EARLY_PARTIAL_REPAYMENT-VIEW"]
                    },
                    "visibility": true
                }];
            } else {
                var param = [{
                    "linkText": 'View Documents',
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionViewDocument",
                        "context": "",
                        "entitlement": ["VIEW_DOCUMENTS"]
                    },
                    "visibility": true
                }, {
                    "linkText": kony.i18n.getLocalizedString("i18n.Homepage.raiseaRequest"),
                    "linkCTA": {
                        "level": "Form",
                        "method": "actionRaiseARequest",
                        "context": "",
                        "entitlement": ["MESSAGES_CREATE_OR_REPLY"]
                    },
                    "visibility": true
                }]
            }
            this.view.quicklinks.setContext(param);
        },
        showPartialRepaymentForMobile: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = 1;
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentTermsAndCond"
            });
            kony.application.dismissLoadingScreen();
        },
		showEarlyPayoffForMobile: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = 1;
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmEarlypayTermsandCond"
            });
            kony.application.dismissLoadingScreen();
        },
        plans: function(mortgagePlans, scopeObj) {
            this.plansData['activePlansData'] = [
                [{
                        CopyimgMenu0a97e7ab1e83140: 'contextual_menu.png',
                        template: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxTempPlanMobile" : "flxTempPlan",
                        CopyimgThreeDotIcon0eac906fccd3d43: 'O',
                        lblClosedPlans: {
                            text: 'Closed Loans',
                            isVisible: false
                        },
                        lblTransactionHeader: {
                            text: kony.i18n.getLocalizedString("i18n.LocateUs.Loans"),
                            skin: 'sknlbl424242bold15px',
                            width:"300dp",
                            height:"40dp",
                            accessibilityConfig:{
                                "a11yARIA":{
                                    "tabindex":-1
                                }
                            }
                        },
                        flxActiveSeparator: {
                            isVisible: false
                        },
                        flxClosedSeparator: {
                            isVisible: false
                        }
                    },
                    []
                ]
            ];
            this.plansData['closedPlansData'] = [
                [{
                        CopyimgMenu0a97e7ab1e83140: 'contextual_menu.png',
                        template: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxTempPlanMobile" : "flxTempPlan",
                        CopyimgThreeDotIcon0eac906fccd3d43: 'O',
                        lblClosedPlans: {
                            text: 'Closed Loans'
                        },
                        lblTransactionHeader: {
                            text: 'Active Loans',
                            width:"300dp",
                            height:"40dp",
                            accessibilityConfig:{
                                "a11yARIA":{
                                    "tabindex":-1
                                }
                            }
                        },
                        flxActiveSeparator: {
                            isVisible: false
                        },
                        flxClosedSeparator: {
                            isVisible: true
                        }
                    },
                    []
                ]
            ];
            scopeObj = this;
            this.view.accountList.segAccounts.widgetDataMap = {
                "lblAccountName": "lblAccountName",
                "lblRoleIcon": "lblRoleIcon",
                "lblFavoriteIcon": "lblFavoriteIcon",
                "imgBankIcon": "imgBankIcon",
                "flxFavorite": "flxFavorite",
                "flxBankIcon": "flxBankIcon",
                "lblBankIcon": "lblBankIcon",
                "lblAccountType": "lblAccountType",
                "lblAvailableBalanceValue": "lblAvailableBalanceValue",
                "lblAvailableBalanceTitle": "lblAvailableBalanceTitle",
                "imgThreeDotIcon": "imgThreeDotIcon",
                "flxMenu": "flxMenu",
                "flxAccountRoleType": "flxAccountRoleType",
                "lblAccountRoleType": "lblAccountRoleType",
                "lblAccountTypeHeader": "lblAccountTypeHeader",
                "flxDropDown": "flxDropDown",
                "lblDropDown": "lblDropDown",
                "lblSeperator": "lblSeperator",
                "lblBottomSeperator": "lblBottomSeperator",
                "lblTopSeperator": "lblTopSeperator",
                "flxAccountsRowWrapper": "flxAccountsRowWrapper",
                "flxNoResultsFound": "flxNoResultsFound",
                "lblNoResultsFound": "lblNoResultsFound",
                "imgNoResultsFound": "imgNoResultsFound",
                "lblTotalAccountsTitle": "lblTotalAccountsTitle",
                "lblTotalAccountsValue": "lblTotalAccountsValue",
                "lblTotalBalanceTitle": "lblTotalBalanceTitle",
                "lblTotalBalanceValue": "lblTotalBalanceValue",
                "flxRowTotalAccountsGroupBalance": "flxRowTotalAccountsGroupBalance",
                "flxRowTotalAccountsGroupBalanceMobile": "flxRowTotalAccountsGroupBalanceMobile",
                "imgExternalAlert": "imgExternalAlert",
                "lblCurrentBalanceValue": "lblCurrentBalanceValue",
                "lblCurrentBalanceTitle": "lblCurrentBalanceTitle",
                "lblAccountTypeNumber": "lblAccountTypeNumber",
                "flxAvailableBalance": "flxAvailableBalance",
                "flxCurrentBalance": "flxCurrentBalance",
                "flxClosedSeparator": "flxClosedSeparator",
                "flxActiveSeparator": "flxActiveSeparator",
                "account": "account",
                "accountType": "accountType",
                "lblTransactionHeader": "lblTransactionHeader",
                "lblClosedPlans": "lblClosedPlans",
                "flxPlansRowWrapperMobile": "flxPlansRowWrapperMobile",
                "flxMenu": "flxMenu",
                "imgThreeDotIcon": "imgThreeDotIcon"
            };
            if (!(mortgagePlans == undefined)) {
                accounts = mortgagePlans;
                var count = 0;
                var isMenuVisible = scopeObj.hideQuickLinkforPlans();   
                accounts.forEach(function(account) {
                    account.accountType = "mortgageFacility";
                    if (account.arrangementstatus == "CURRENT") {
                        count += 1;
                        var dataobject = {
                            template: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxPlansRowTempMobile" : "flxPlansRowTemplate",
                            lblAccountName: {
                                skin: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 'ICSknBBLabelSSP42424213px' : 'sknSSP42424215Px',
                                text: account.accountName + "..." + account.accountID.substr(-4)
                            },
                            lblAvailableBalanceTitle: kony.i18n.getLocalizedString("i18n.accounts.RemainingBalance"),
                            lblAvailableBalanceValue: CommonUtilities.formatCurrencyWithCommas(account.commitmentAmount, false, account.currency),
                            flxCurrentBalance: {
                                "isVisible": true
                            },
                            flxFavorite: {
                                isVisible: false
                            },
                            lblCurrentBalanceValue: {
                                skin: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 'ICSknBBLabelSSP42424213px' : 'sknlbl424242SSPReg24px',
                                text: CommonUtilities.formatCurrencyWithCommas(account.utilisedAmount, false, account.currency),
                                isVisible: true
                            },
                            lblCurrentBalanceTitle: {
                                text: kony.i18n.getLocalizedString("i18n.mortgageAccount.UtilisedAmount"),
                                isVisible: true
                            },
                            lblSeperator: {
                                "isVisible": true
                            },
                            lblFavoriteIcon: {
                                isVisible: false
                            },
                            lblAccountType: "Mortgage",
                            flxMenu: {
                                isVisible: false
                            },
                            flxPlansRowWrapperMobile: {
                                "height": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "100dp" : "78dp"
                            },
                            flxMenu: {
                                "isVisible": isMenuVisible,
                                // "onClick":function(widgetInfo,context){
                                //     scopeObj.contextualflag=context,
                                //     scopeObj.openQuickActions(account);
                                // },
                                "onKeyPress":scopeObj.contextualKeyPress,
                                "accessibilityConfig":{
                                    "a11yLabel":"Open list of quick actions for "+account.accountName + "..." + account.accountID.substr(-4),
                                    "a11yARIA":{
                                        "tabindex":0,
                                        "role":"button"
                                    }
                                }
                            },
                            imgThreeDotIcon: {
                                "isVisible": true
                            },
                            "onAccountClick": scopeObj.onAccountSelection.bind(scopeObj, account),
                            "onQuickActions": scopeObj.openQuickActions.bind(scopeObj, account),
                            'account': account
                                //"onAccountClick": scopeObj.showPlanDetails.bind(scopeObj,account)
                        }
                        scopeObj.plansData.activePlansData[0][1].push(dataobject);
                    } else {
                        dataobject = {
                            template: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxPlansRowTempMobile" : "flxPlansRowTemplate",
                            lblAccountName: {
                                skin: (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 'ICSknBBLabelSSP42424213px' : 'sknSSP42424215Px',
                                text: account.accountName + "..." + account.accountID.substr(-4)
                            },
                            lblAvailableBalanceTitle: kony.i18n.getLocalizedString("i18n.accounts.RemainingBalance"),
                            lblAvailableBalanceValue: CommonUtilities.formatCurrencyWithCommas(account.commitmentAmount, false, account.currency),
                            flxCurrentBalance: {
                                "isVisible": false
                            },
                            flxFavorite: {
                                isVisible: false
                            },
                            lblCurrentBalanceValue: CommonUtilities.formatCurrencyWithCommas(account.utilisedAmount, false, account.currency),
                            lblCurrentBalanceTitle: kony.i18n.getLocalizedString("i18n.mortgageAccount.UtilisedAmount"),
                            lblSeperator: {
                                "isVisible": true
                            },
                            lblFavoriteIcon: {
                                isVisible: false
                            },
                            lblAccountType: "Mortgage Plan",
                            flxMenu: {
                                isVisible: false
                            },
                            flxPlansRowWrapperMobile: {
                                "height": "78dp"
                            },
                            'account': account
                                //"onAccountClick": scopeObj.showPlanDetails.bind(scopeObj, account)
                        }
                        scopeObj.plansData.closedPlansData[0][1].push(dataobject);
                    }
                    return this.plansData;
                });
                if (orientationHandler.isDesktop) {
                    if (count === 1) {
                        this.view.flxFooter.top = 624 + count * 50 + "dp";
                    } else {
                        this.view.flxFooter.top = 574 + count * 50 + "dp";
                    }
                }
                if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.flxFooter.top = 900 + count * 50 + "dp";
                }
                if (orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 640) {
                  this.view.flxFooter.top = 1150 + count * 50 + "dp";
                  if (kony.os.deviceInfo().screenHeight < 400) {
                    this.view.flxFooter.top = 1400+"dp";
                  }
                }
                this.view.accountList.segAccounts.setData(scopeObj.plansData.activePlansData);
                if(this.view.accountList.segAccounts.data[0][0].lblClosedPlans.isVisible===true){
                    this.view.accountList.flxClosedPlan.isVisible=true;
                }
                else{
                    this.view.accountList.flxClosedPlan.isVisible=false;
                }
				if(scopeObj.plansData.activePlansData !== undefined){
					scopeObj.mortgageAccountCount = scopeObj.plansData.activePlansData[0][1].length
				}			
				scopeObj.checkPermissionForDay();
                FormControllerUtility.hideProgressBar(this.view);
            }
        },

        hideQuickLinkforPlans: function(){
			if(this.param === undefined){
				params.entitlement = {};
				params.entitlement.features = applicationManager.getConfigurationManager().getUserFeatures();
				params.entitlement.permissions = userPermissions;
				this.param = params;
			}
			if((this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_ACCOUNT-VIEW") === -1) && this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") === -1){
				return false;
			}else
				return true;
		},
        
        contextualKeyPress : function(eventObject,eventPayload,context){
            this.contextualflag=context;
            
            if(eventPayload.keyCode===27){
                this.setContextualAccessibility(eventPayload,context);
                if(this.view.accountListMenu.isVisible){
                    this.view.accountListMenu.isVisible=false;
                    //this.view.accountList.segAccounts.data[this.contextualflag.sectionIndex][1][this.contextualflag.rowIndex].onQuickActions();
                eventPayload.preventDefault();
                if(kony.application.getCurrentBreakpoint()!==640){
                    this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTemplate.flxPlansRowWrapper.flxPlansWrapper.flxMenu");
                }
                else{
                    this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTempMobile.flxPlansRowWrapperMobile.flxPlansWrapper.flxMenu");
                }
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                if(this.view.accountListMenu.isVisible){
                    this.setContextualAccessibility(eventPayload,context);
                    this.view.accountListMenu.isVisible=false;
                    //this.view.accountList.segAccounts.data[this.contextualflag.sectionIndex][1][this.contextualflag.rowIndex].onQuickActions();
                }
            }
            }
        },
        setContextualAccessibility : function(eventPayload,context){
            if(eventPayload.keyCode===27||eventPayload.keyCode===9){
            var segData=this.view.accountList.segAccounts.data;
            segData[context.sectionIndex][1][context.rowIndex].flxMenu.accessibilityConfig={
                "a11yLabel":"Open List of quick actions for "+segData[context.sectionIndex][1][context.rowIndex].lblAccountName.text,
                "a11yARIA":{
                    "role":"button",
                    "tabindex":0
                }
        }
        this.view.accountList.segAccounts.setData(segData);
        }
        },
        actionFAQ: function() {
            if (applicationManager.getConfigurationManager().isMicroAppPresent("AboutUsMA")) {
                var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AboutUsMA",
                    "moduleName": "InformationContentUIModule"
                });
                InformationContentModule.presentationController.showFAQs();
            }
        },
        actionViewDocument: function() {
            this.accountDetails.formattedAccountNumber = this.view.lblAccountTypes.text;
            FormControllerUtility.showProgressBar(this.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                moduleName: "AccountServicesUIModule",
                appName: "ArrangementsMA"
            }).presentationController.setFormData(this.accountDetails);
        },
        actionRaiseARequest: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                moduleName: "AlertsMsgsUIModule",
                appName: "SecureMessageMA"
            }).presentationController.showAlertsPage("hamburgerMenu", {
                show: "Messages"
            });
        },
        showMortgageFacility: function(dummy, segData) {
            this.accountTypesOnclick();
            account = segData.selectedRowItems[0].lblSeparator;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showMortgageDetails(account);
        },
        onAccountSelection: function(account) {
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("mortgageLoanDetails", account.utilisedAmount);
            FormControllerUtility.showProgressBar(this.view);
            if (applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")) {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.showAccountDetails(account);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        openQuickActions: function(account) {
            scopeObj = this;
            a = [{
                "lblUsers": {
                    "text": "Change Repayment Account",
                    "accessibilityConfig":{
                        "a11yHidden":true,
                        "a11yARIA":{
                            "tabindex":-1
                        }
                    }
                },
                "lblSeparator": "lblSeparator",
                "flxAccountTypes": {
                    "onClick": scopeObj.changeAccount.bind(a, account),
                    "onKeyPress":scopeObj.contextualDDKeyPress,
                    "accessibilityConfig":{
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-labelledby":"lblUsers",
                            "role":"button"
                        }
                    }
                }
            }, {
                "lblUsers": {
                    "text": "Partial Repayment",
                    "accessibilityConfig":{
                        "a11yHidden":true,
                        "a11yARIA":{
                            "tabindex":-1
                        }
                    }
                },
                "lblSeparator": "lblSeparator",
                "flxAccountTypes": {
                    "onClick": scopeObj.partialRepayment.bind(a, account),
                    "onKeyPress":scopeObj.contextualDDKeyPress,
                    "accessibilityConfig":{
                        "a11yARIA":{
                            "tabindex":0,
                            "aria-labelledby":"lblUsers",
                            "role":"button"
                        }
                    }
                }
            }];
            if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_ACCOUNT-VIEW") == "-1" && this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1") {
                this.view.accountListMenu.flxAccountListActionsSegment.isVisible = false;
            }
            else if (this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-VIEW") == "-1") {
                a = [a[0]];
            }
            else if (this.param.entitlement.permissions.indexOf("CHANGE_REPAYMENT_ACCOUNT-VIEW") == "-1") {
                a = [a[1]];
            }
            if(this.view.flxUpdateContent.isVisible)
            {
                this.view.flxUpdateContent.isVisible= !this.view.flxUpdateContent.isVisible;
                this.view.lblDropdown.text = this.view.lblDropdown.text == 'O' ? 'P' : 'O';
            }
            this.view.accountListMenu.segAccountListActions.setData(a);
        },
        contextualDDKeyPress : function(eventObject,eventPayload,context){
            
            if(eventPayload.keyCode===27){
                this.setContextualAccessibility(eventPayload,this.contextualflag);
                this.view.accountListMenu.isVisible=false;
                //this.view.accountList.segAccounts.data[this.contextualflag.sectionIndex][1][this.contextualflag.rowIndex].onQuickActions();
                eventPayload.preventDefault();
                if(kony.application.getCurrentBreakpoint()!==640){
                    this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTemplate.flxPlansRowWrapper.flxPlansWrapper.flxMenu");
                }
                else{
                    this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTempMobile.flxPlansRowWrapperMobile.flxPlansWrapper.flxMenu");
                }
            }
            if(eventPayload.keyCode===40){
                if (context.rowIndex === context.widgetInfo.data.length - 1) {
                    this.view.accountListMenu.isVisible=false;
                    eventPayload.preventDefault();
                    if (kony.application.getCurrentBreakpoint() !== 640) {
                        this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex, this.contextualflag.sectionIndex, "flxPlansRowTemplate.flxPlansRowWrapper.flxPlansWrapper.flxMenu");
                    }
                    else {
                        this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex, this.contextualflag.sectionIndex, "flxPlansRowTempMobile.flxPlansRowWrapperMobile.flxPlansWrapper.flxMenu");
                    }
                }
            }
            if(eventPayload.keyCode===9){
                if(eventPayload.shiftKey){
                    if(context.rowIndex===0){
                        this.setContextualAccessibility(eventPayload,this.contextualflag);
                        this.view.accountListMenu.isVisible=false;
                        //this.view.accountList.segAccounts.data[this.contextualflag.sectionIndex][1][this.contextualflag.rowIndex].onQuickActions();
                        eventPayload.preventDefault();
                        if(kony.application.getCurrentBreakpoint()!==640){
                            this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTemplate.flxPlansRowWrapper.flxPlansWrapper.flxMenu");
                        }
                        else{
                            this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTempMobile.flxPlansRowWrapperMobile.flxPlansWrapper.flxMenu");
                        }
                    }
                }
                else{
                    if(context.rowIndex===context.widgetInfo.data.length-1){
                        this.setContextualAccessibility(eventPayload,this.contextualflag);
                        this.view.accountListMenu.isVisible=false;
                        //this.view.accountList.segAccounts.data[this.contextualflag.sectionIndex][1][this.contextualflag.rowIndex].onQuickActions();
                        eventPayload.preventDefault();
                        if(kony.application.getCurrentBreakpoint()!==640){
                            this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTemplate.flxPlansRowWrapper.flxPlansWrapper.flxMenu");
                        }
                        else{
                            this.view.accountList.segAccounts.setActive(this.contextualflag.rowIndex,this.contextualflag.sectionIndex,"flxPlansRowTempMobile.flxPlansRowWrapperMobile.flxPlansWrapper.flxMenu");
                        }
                    }
                }
            }
        },
        changeAccount: function(account, a) {
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = account;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentAccountNew"
            });
        },
        partialRepayment: function(account, a){
            var navMan = applicationManager.getNavigationManager();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = account;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = 0;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentTermsAndCond"
            });
        },
        showRepaymentDayForMobile: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = 1;
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "AccountsUIModule/frmChangeRepaymentDay"
            });
        },
        showChangeRepaymentPage: function(sgData) {
            this.dropDownClick();
            if (sgData.selectedRowItems[0].lblUsers == "Change Repayment Day") {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.isFromMortgage = 1;
                kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                navMan.navigateTo({
                    "appName": "ArrangementsMA",
                    "friendlyName": "AccountsUIModule/frmChangeRepaymentDay"
                });
            } else if (sgData.selectedRowItems[0].lblUsers == "Partial Repayment"){
                this.showPartialRepaymentTnCPage(sgData);
            } else {
               this.showEarlyPafoffTnCPage(sgData); 
            }
        },
        showPlanDetails: function(segData) {
            account = segData.selectedRowItems[0].account;
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("mortgageLoanDetails", account.utilisedAmount);
            FormControllerUtility.showProgressBar(this.view);
            if (applicationManager.getConfigurationManager().isMicroAppPresent("ArrangementsMA")) {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.showAccountDetails(account);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        onBreakpointChange: function() {
            this.FormTouchEnd();
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            if (!(mortgagePlans == undefined)) this.plans(mortgagePlans);
            account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            if (!(mortgagePlans == undefined)) this.setData(mortgageDetails, account1);
        },
        FormTouchEnd: function() {
            self = this;
            this.view.onTouchEnd = function() {
                self.hidePopUps();
            };
        },
        hidePopUps: function() {
            self = this;
            if (this.view.accountTypes.isVisible === false && this.isAccountsOpened === true) {
                this.isAccountsOpened = false;
            } else if (this.view.accountTypes.isVisible === true && this.isAccountsOpened === false) {
                setTimeout(function() {
                    if (!self.fromScroll) {
                        self.view.accountTypes.isVisible = false;
                        self.isAccountsOpened = true;
                    }
                    self.fromScroll = false;
                }, "17ms");
            }
        },
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        showServerError: function(status) {},
        onError: function() {
            FormControllerUtility.hideProgressBar(this.view);
        }
    };
});