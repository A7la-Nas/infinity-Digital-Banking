define("ArrangementsMA/MortgageServicesUIModule/userfrmChangeRepaymentAccountNewController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        //accountList: {},
        segData: [],
        isAccountsOpened: true,
        fromScroll: false,
        frmPreShow: function() {
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            //this.view.formChangeRepaymentAccountNew.pageTitle = 'Change Repayment Account';
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            var scopeObj = this;
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": "false"
                }
            }
            this.view.formChangeRepaymentAccountNew.setContext(formTemplateContext);
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.isVisible = false;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.onClick = this.backToFacility;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.onClick = this.showConfirmation;
            scopeObj = this;
            scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.setEnabled(false);
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible = false;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = false;
            this.fileCompRef = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.uploadFiles3;
            this.setDataForUploadFileComp();
            this.setUpResponsiveUI();
            this.view.postShow = this.postShow;
          //  this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxclose.onKeyPress = this.onKeyPressCallBack;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.onKeyPress = this.onKeyCallBack;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.tbxAcctSelection.onKeyPress = this.onKeyCallBack1;
           // this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.onKeyPress = this.onKeyCallBack;
			this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.onKeyPress = this.flxPlansRowTemplate;
			this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxclose.onKeyPress = this.btnKeyPressCall;
            this.setDataBaseOnFlowType();
            this.view.onBreakpointChange = this.onBreakpoint;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocContainer.imgSuppInfoIcon.cursorType = "pointer";
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.zIndex = 0;
            // this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "";
            if (scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.isVisible === true) {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.height = "110dp";
            } else {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.height = "75dp";
            }
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocContainer.flxSuppInfoicon.onClick = function() {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible = !scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible;
            };
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.flxclose.onClick = function() {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible = false;
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
            }
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.onScrolling = function() {
                scopeObj.fromScroll = true;
            }
            this.dataMapping();
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.onClick = function() {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.lblAccountBal.text = "";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.setFocus(true);
                if (scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.text === "") {
                    scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = true;
                    scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setData(scopeObj.segData);
                } else {
                    scopeObj.searchAccount();
                }
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.tbxAcctSelection.setActive(true);
				
            },
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.onKeyUp = this.searchAccount;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.onRowClick = this.onAccountSelection.bind(this, this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.selectedRowItems);
            this.view.formChangeRepaymentAccountNew.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.width = "100%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.right = "0dp";
            }
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.top = "0dp";				
				this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.accessibilityConfig = {
					a11yLabel: "Read more information about attaching supporting document",
                        a11yARIA: {
                            "tabindex": 0,
                            "role": "button"
                        }
                   };
				
        },
		
		btnKeyPressCall: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if ( this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible === true) {
				   this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible = false;
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
					
				} 	
			}			
				if (eventPayload.keyCode === 27 ) {
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible = false;
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
                }
            		
		 },	
		 
        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27 || eventPayload.keyCode === 13) {
                if (this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible === true) {
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible = false;
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppDocInfo.isVisible = false;
                // this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
            }
        },
        onKeyCallBack: function(eventObject, eventPayload, context) {
            if (eventPayload.keyCode === 27) {
                if (this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.isVisible === true) {
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.isVisible = false;
                    this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.setActive(true);
                }
            }
			if ( eventPayload.keyCode === 9 && !eventPayload.shiftKey ) {
					//if (eventPayload.shiftKey === true) {
						if (context.rowIndex===0) {
				this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.isVisible = false;
				//this.view.formChangeRepaymentAccountNew.flxContentTCCenter.tbxAcctSelection.isVisible= false;
				eventPayload.preventDefault();
				this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.setActive(true);
               // this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSuppInfoicon.setActive(true);
				
						//}	
					}
			}
		//	else if ( eventPayload.keyCode === 13 ) {
			//	this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.isVisible = true;
		//	}
        },
        onKeyCallBack1: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                        this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxSegAccounts.isVisible = false;
                        eventPayload.preventDefault();
                        this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.setActive(true);
                        
                        }          
                 },	
		
        onBreakpoint: function() {
            //	this.FormTouchEnd();
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formChangeRepaymentAccountNew.pageTitleVisibility = false;
                this.view.formChangeRepaymentAccountNew.pageTitle = "Change Repayment Account";
            } else {
                this.view.formChangeRepaymentAccountNew.pageTitleVisibility = true;
                this.view.formChangeRepaymentAccountNew.pageTitle = "Change Repayment Account";
            }
        },
        FormTouchEnd: function() {
            self = this;
            this.view.onTouchEnd = function() {
                self.hidePopUps();
            };
        },
        hidePopUps: function() {
            self = this;
            if (this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible === true && this.isAccountsOpened === true) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = false;
            }
            if (this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible === false && this.isAccountsOpened === true) {
                this.isAccountsOpened = false;
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = true;
            } else if (this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible === true && this.isAccountsOpened === false) {
                setTimeout(function() {
                    if (!self.fromScroll) {
                        self.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = false;
                        self.isAccountsOpened = true;
                    }
                    self.fromScroll = false;
                }, "17ms");
            }
        },
        setUpResponsiveUI: function() {
            if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.left = "31dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.width = "94.5%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.width = "140dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.width = "140dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxPleaseNote.lblAcctSelection.skin = "bbSknLbl424242SSP15Px";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.width = "560dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.width = "560dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "255dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "110dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.skin = "ICSknBBLabelSSP42424213px";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.height = "70px";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.height = "110dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.zIndex = 0;
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.left = "30dp";
                /*
                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.height = "101dp";
                 */
                //this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.height = "404dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.top = "49dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.top = "13dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.left = "30dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.top = "126dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.width = "560dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.height = "180dp";
                //                 //this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxSupportingDoc.top = "182dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.width = "300dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "260dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.top = "165dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "124dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.zIndex = 10;
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.top = "85dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.left = "30dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.width = "560dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.height = "40dp";
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.zIndex = 10;
                //                 this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.width = "560dp";
            } else if (kony.application.getCurrentBreakpoint() === 1024) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.width = "91.5%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.lblSeparator1.left = "30dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.left = "13dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.width = "140dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.width = "140dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxPleaseNote.lblAcctSelection.skin = "bbSknLbl424242SSP15Px";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.width = "560dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.width = "560dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "255dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "85dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.skin = "ICSknBBLabelSSP42424213px";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.height = "641dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxRepaymentAccDetails.height = "31dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.top = "40dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.height = "40dp"
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.top = "85dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.left = "20dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.width = "95%";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.width = "100%";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.left ="20dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.top = "125dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.width = "95%";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.zIndex = 10;
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.top ="221dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.left = "0dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.top = "310dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.width = "100%";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.height = "80dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.btnCancel.width = "140dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.right = "180dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.btnContinue.width = "140dp";
                //         this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxCancelAndContinue.btnContinue.right = "20dp";
            } else if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.width = "95%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.width = "95%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.right = "0%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.right = "0%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnCancel.top = "60dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.height = "120dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.width = "95%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.width = "95%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.left = "10dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.width = "95%";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.left = "10dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "50dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.top = "30dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "85dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.width = "260dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.width = "250dp";
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.skin = "ICSknBBLabelSSP42424213px";
				this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.flxclose.left = "210px";
            }
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocContainer.flxSuppInfoicon.onClick = function() {
                    scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible = !scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible;
                    if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                        // 						scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "260dp";
                        // 						scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.top = "200dp";
                        // 						scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.width = "300dp";
                        // 						scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "124dp";
                        // 						scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.zIndex = 10;
                    }
                }
                /*if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380 || orientationHandler.isDesktop) {
                        scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.height = "124dp";
                        scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.left = "260dp";
                        scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.top = "300dp";
                        scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.width = "300dp";
                }*/
            this.view.forceLayout();
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setUpResponsiveUI();
			this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocContainer.flxSuppInfoicon.onClick = function() {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible = !scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxDocumentContainer.flxSuppDocInfo.isVisible;
				scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.lblAttachmentRules.setActive(true);
				//this.view.formChangeRepaymentAccountNew.flxContentTCCenter.lblAttachmentRules
            };
        },
        searchAccount: function() {
            var navObj = applicationManager.getNavigationManager();
            var searchtext = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.text.toLowerCase();
            /*    if (searchtext) {
                    var data = [];
                    //var accountList = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.data;
                    var accountList = this.segData;
                    data = accountList;
                    header = [];
                    row = [];
                    for (var j = 0; j < data.length; j++) {
                        let a = data[j][0].lblAccountTypeHeader.text;
                        header.push(a);
                        for (var i = 0; i < data[j][1].length; i++) {
                            let b = data[j][1][i];
                            row.push(b);
                        }
                    }
                    //var searchSegmentData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("accountName", searchtext, row,header);
                    var searchSegmentData = this.searchAccounts("accountName", searchtext, data, header);
                    if (searchSegmentData.length > 0) {
                        this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setData(searchSegmentData);
                        this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = true;
                    } else {
                        //this.view.flxListOfDocuments.isVisible = false;
                        //this.view.flxNoDocuments.isVisible = true;
                    }
                } else {*/
            if (this.segData !== undefined && this.segData.length > 0) {
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setData(this.segData);
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = true;
            } else {
                //this.view.flxListOfDocuments.isVisible = false;
                // this.view.flxNoDocuments.isVisible = true;
            }
            //   }
        },
        searchAccounts: function(field, searchText, data, headers) {
            var searchdata = [],
                segEachData = [];
            scopeObj = this;
            for (var i = 0; i < data.length; i++) {
                segEachData = [];
                for (var j = 0; j < data[i][1].length; j++) {
                    if (!kony.sdk.isNullOrUndefined(data[i][1][j][field])) {
                        if (data[i][1][j][field].toLowerCase().indexOf(searchText) >= 0) {
                            segEachData.push(data[i][1][j]);
                        }
                    }
                }
                if (segEachData.length > 0) {
                    var segData = [{
                        lblAccountTypeHeader: {
                            "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(headers[i]) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(headers[i]) : headers[i] + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                            "accessibilityconfig": {
                                "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(headers[i]) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(headers[i]) : headers[i] + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
                            },
                            "left": "8px"
                        },
                        lblAccountRoleType: {
                            "isVisible": false
                        },
                        lblDropDown: {
                            "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                            "accessibilityconfig": {
                                "a1yHidden": true
                            },
                        },
                        lblTopSeperator: {
                            "isVisible": true
                        },
                        lblBottomSeperator: {
                            "isVisible": true
                        },
                        template: "flxAcctSectionHeader",
                        flxDropDown: {
                            "onClick": function(eventobject, context) {
                                scopeObj.showOrHideAccountRows(context);
								
                            }.bind(this),
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": true,
                                    "aria-labelledby": "lblAccountTypeHeader",
                                }
                            }
                        },
                        flxAccountRoleType: {
                            "isVisible": false
                        },
                        lblAccountTypeNumber: {
                            "text": "(1)"
                        }
                    }, segEachData];
                    searchdata.push(segData);
                }
            }
            return searchdata;
        },
        dataMapping: function() {
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.widgetDataMap = {
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
                "flxPlansRowWrapper": "flxPlansRowWrapper",
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
                "account": "account",
				"flxPlansRowTemplate" : "flxPlansRowTemplate",
				"flxContent" : "flxContent"
            };
            var data = applicationManager.getAccountManager().getInternalAccounts();
            data = data.filter(function(account) {
                return (account.accountType == "Checking" || account.accountType == "CURRENT" || account.accountType == "Savings")
            })
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setData(data);
            var accountList = (kony.sdk.isNullOrUndefined(accounts) || accounts.constructor !== Array) ? [] : accounts;
            this.accounts = accountList;
            this.segData = this.getDataWithAccountTypeSections(data);
            scope = this;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setData(scope.segData);
        },
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createAllAccountSegmentsModel(account, accounts.length));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                            lblAccountTypeHeader: {
                                "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                                "accessibilityconfig": {
                                    "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
                                },
                                "left": "8px"
                            },
                            lblAccountRoleType: {
                                "isVisible": false
                            },
                            lblDropDown: {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                                "accessibilityconfig": {
                                    "a1yHidden": true
                                },
                            },
                            lblTopSeperator: {
                                "isVisible": true
                            },
                            lblBottomSeperator: {
                                "isVisible": true
                            },
                            template: "flxAcctSectionHeader",
                            flxDropDown: {
                                onKeyPress: scopeObj.onKeyCallBack1,
                                "onClick": function(eventobject, context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": true,
                                        "aria-labelledby": "lblAccountTypeHeader",
                                    }
                                }
                            },
                            flxAccountRoleType: {
                                "isVisible": false
                            },
                            lblAccountTypeNumber: {
                                "text": "(1)"
                            },
                            membershipId: account.Membership_Id
                        },
                        [scopeObj.createAllAccountSegmentsModel(account, accounts.length)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            if (finalData.hasOwnProperty('Investment')) {
                delete finalData['Investment']
            }
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        createAllAccountSegmentsModel: function(account, accsLen) {
            var scopeObject = this;
            var updatedAccountID;
            var updatedAccountName;
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var dualConfiguration = {
                isCurrentBalanceToBeDisplayed: false,
                isAvailableBalanceToBeDisplayed: true
            };
            var modifiedAccountType = account.accountType;
            if (account.accountType === "Savings") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.savings");
            } else if (account.accountType === "Checking") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.checking");
            } else if (account.accountType === "CreditCard") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.creditCard");
            } else if (account.accountType === "CURRENT") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.current");
            } else if (account.accountType === "Deposit") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.deposit");
            } else if (account.accountType === "External") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.external");
            } else if (account.accountType === "Investment") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.investment");
            } else if (account.accountType === "Line Of Credit") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.lineOfCredit");
            } else if (account.accountType === "Loan") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.loan");
            } else if (account.accountType === "Mortgage") {
                account.accountType = kony.i18n.getLocalizedString("i18n.account.mortgage");
            } else if (account.accountType === "Other") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.others");
            }
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                var truncatedAccountName = CommonUtilities.getAccountName(account);
                truncatedAccountName = truncatedAccountName.substring(0, 20);
                updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID); //account.accountType + " " + 
            } else updatedAccountName = CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName, updatedAccountID);
            let currentLocale = kony.i18n.getCurrentLocale();
            var getConfigFor = function(accountType) {
                if (scopeObject.accountTypeConfig[accountType]) {
                    return scopeObject.accountTypeConfig[accountType];
                } else {
                    return scopeObject.accountTypeConfig.Default;
                }
            };
            var dataObject = {
                "template": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) && dualConfiguration.isAvailableBalanceToBeDisplayed && dualConfiguration.isCurrentBalanceToBeDisplayed ? "flxAccountsRowTemplateMobile" : "flxPlansRowTemplate",
                "lblAccountName": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknSSP42424215Px",
                    "text": updatedAccountName,
                    "accessibilityconfig": {
                        "a11yLabel": updatedAccountName
                    }
                },
				
				"flxPlansRowTemplate" : {
				onKeyPress :  this.onKeyCallBack, 
					"accessibilityconfig": {
						"a11yARIA": {
                        "tabindex": -1
                   }
						
				}
				
					
				},
				
                "lblAvailableBalanceValue": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                    "text": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode),
                    "accessibilityconfig": {
                        "a11yLabel": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode)
                    }
                },
                "lblAvailableBalanceTitle": {
                    "isVisible": false,
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP72727211Px" : "sknSSP72727213Px",
                    "text": kony.i18n.getLocalizedString(getConfigFor(account.accountType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : ""),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(account.accountType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                },
                "flxAvailableBalance": {
                    "isVisible": (account.accountType !== OLBConstants.ACCOUNT_TYPE.SAVING && account.accountType !== OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : dualConfiguration.isAvailableBalanceToBeDisplayed
                },
                "flxCurrentBalance": {
                    "isVisible": false
                },
                "lblCurrentBalanceValue": {
                    "isVisible": false
                },
                "lblCurrentBalanceTitle": {
                    "isVisible": (account.accountType === OLBConstants.ACCOUNT_TYPE.SAVING || account.accountType === OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : false
                },
                "onAccountClick": scopeObject.onAccountSelection.bind(scopeObject, account),
                "flxMenu": {
                    "isVisible": false,
                },
                "flxNoResultsFound": {
                    "isVisible": false
                },
                "isNoRecords": false,
                "imgThreeDotIcon": {
                    "isVisible": false,
                },
                "flxPlansRowWrapper": {
                    "isVisible": true,
                },
                "lblSeperator": {
                    "isVisible": true
                },
                "userName": account.userName,
                "bankId": account.bankId,
                "membershipName": account.MembershipName ? account.MembershipName : "",
                "accountName": updatedAccountName,
                "accountType": account.accountType,
                "account": account,
                "accountID": updatedAccountID,
                "accountBalance": account[getConfigFor(account.accountType).balanceKey],
                "currentBalance": account[getConfigFor(account.accountType).currentBalanceKey],
                "currency": account.currencyCode,
                "favouriteStatus": account.favouriteStatus,
                "isError": account.isError,
                "externalIndicator": account.externalIndicator,
                "isExternalAccount": account.isExternalAccount,
                "lblAccountType": {
                    text:  (account.accountType === "mortgageFacility") ? kony.i18n.getLocalizedString("i18n.Accounts.displayMortgageFacility") : account.accountType
                },
                "lblAccountTypeHeader": {
                    "text": account.accountRoleType,
                },
				"flxContent": {
					"accessibilityConfig": {
                        "a11yLabel": ("Account Name" + " " + (updatedAccountName)) + " " + ("Account Type" + " " + ((account.accountType === "mortgageFacility") ? kony.i18n.getLocalizedString("i18n.Accounts.displayMortgageFacility") : account.accountType))+ " " + ("Amount" + " " + (CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode))) ,
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button"
                        },
                    },
                
				}
            };
            return dataObject;
        },
		
        showOrHideAccountRows: function(context) {
            var section = context.sectionIndex;
            var segData = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.data
            var isRowVisible = true;
            var dataLength;
            var i;
            var height;
            if (segData[section][0].lblDropDown.text === "O") {
                segData[section][0]["lblDropDown"] = {
                    text: "P"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": true,
                    }
                }
                isRowVisible = true;
				
            } else {
                segData[section][0]["lblDropDown"] = {
                    text: "O"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": false,
                    }
                }
                isRowVisible = false;
				//this.view.formChangeRepaymentAccountNew.flxContentTCCenter.segAccounts.setActive(0, -1, "flxAcctSectionHeader.flxDropdown");
            }
            dataLength = segData[section][1].length;
            for (var i = 0; i < dataLength; i++) {
                if (segData[section][1][i].isNoRecords) {
                    var flxNoResultsFound = JSON.parse(JSON.stringify(segData[section][1][i].flxNoResultsFound));
                    flxNoResultsFound["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxNoResultsFound", flxNoResultsFound, i, section);
                } else {
                    var flxPlansRowWrapper = JSON.parse(JSON.stringify(segData[section][1][i].flxPlansRowWrapper));
                    flxPlansRowWrapper["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxPlansRowWrapper", flxPlansRowWrapper, i, section);
                }
            }
            segData[section][0]["lblBottomSeperator"] = {
                isVisible: isRowVisible
            };
			
            segData = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.data;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setSectionAt(segData[section], section);				
            this.view.forceLayout();			
			this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setActive(-1, section, "flxAcctSectionHeader.flxDropDown")
        },
        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.data
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.setDataAt(rowDataTobeUpdated, row, section);
        },
        onAccountSelection: function(account, dummy) {
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.lblAccountBal.text = CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode);
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.text = (account.nickName || account.accountName) + " ...." + account.account_id.slice(-4);
            this.selectedAccount = account;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.isVisible = false;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.isVisible = true;
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.lblAcctHoldName.text = "Account Holder Name:";
            var accountHolder = JSON.parse(account.accountHolder);
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.lblValAcctHoldName.text = accountHolder.fullname;
            this.doValidate();
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.top = "-30dp";
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.accessibilityConfig = {
                "a11yLabel":  ((account.nickName || account.accountName) + " ...." + account.account_id.slice(-4)),
                "a11yARIA": {
                    "tabindex": 0,
                  //  "aria-labelledby": "lblRepaymentAccount",
                    //"role": "textbox"
                }
            },
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.tbxAcctSelection.accessibilityConfig = {
                "a11yLabel":  ((account.nickName || account.accountName) + " ...." + account.account_id.slice(-4)),
                "a11yARIA": {
                    "tabindex": -1
                }
           },
                this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxTextBox.setActive(true);
        },
        accountTypeConfig: (function() {
            var accountTypeConfig = {};
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance',
                    currentBalanceKey: 'currentBalance',
                    currentBalanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = {
                    sideImage: ViewConstants.SIDEBAR_PURPLE,
                    sideSkin: ViewConstants.SKINS.CHECKINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance',
                    currentBalanceKey: 'currentBalance',
                    currentBalanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = {
                    sideImage: ViewConstants.SIDEBAR_YELLOW,
                    sideSkin: ViewConstants.SKINS.CREDIT_CARD_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accountDetail.availableCredit'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = {
                    sideImage: ViewConstants.SIDEBAR_BLUE,
                    sideSkin: ViewConstants.SKINS.DEPOSIT_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.MORTGAGE_CARD_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.INVESTMENT)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'marketValue',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig['Default'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                },
                accountTypeConfig['null'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                }
            return accountTypeConfig;
        })(),
        backToFacility: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmCofirmRepaymentAccount", this.selectedAccount);
            navMan.setCustomInfo("accountModifyFlow", false);
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showAccountDetails(account);
        },
        setDataBaseOnFlowType: function() {
            var navMan = applicationManager.getNavigationManager();
            var isModifyFlow = navMan.getCustomInfo("accountModifyFlow") ? true : false;
            scopeObj = this;
            if (isModifyFlow) {
                scopeObj.doValidate();
            } else {
                scopeObj.fileCompRef.removeAllDocs();
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.lblAccountBal.text = "";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.text = "";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.isEnabled = false;
            }
        },
        doValidate: function() {
            if (scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxTextBox.tbxAcctSelection.text === "") {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.isEnabled = false;
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.height = "75dp";
            } else {
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxCancelAndContinue.btnContinue.setEnabled(true);
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxAccountHolder.isVisible = true;
                scopeObj.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.height = "110dp";
            }
        },
        setDataForUploadFileComp: function() {
            var isMandatory = true;
            var navMan = applicationManager.getNavigationManager();
            var files = navMan.getCustomInfo("modifyFileData");
            var filesData = [];
            if (kony.sdk.isNullOrUndefined(files)) {
                // filesData = this.getFormattedFileDataForComp(files);
            }
            var config = {
                "selectMultipleFiles": false,
                "filter": ['image/jpeg', 'application/pdf']
            }
            var dataComp = {
                // "title": kony.i18n.getLocalizedString("kony.onboarding.documents.adddocuments"),
                // "description": kony.i18n.getLocalizedString("kony.onboarding.documents.lblUploadDescription.text"),
                // "uploadFilesDocCallback": this.uploadFilesCallback.bind(this, userActionName, false, key, coApplicantKey, isMandatory, applicantType,areMultipleUserActionsPresent),//userActions[key][i].ActionMetaData.Skippable),
                // "fileSelectedCallback": this.fileSelectedCallBack.bind(this, userActionName),
                // "downloadCallback": this.downloadCallback.bind(this),
                "removeFileCallback": this.removeFileCallback.bind(this, isMandatory),
                // "checkEvidenceCallback": this.checkEvidenceCallback.bind(this, isMandatory),
                // "deleteEvidenceCallback": this.deleteEvidenceCallback.bind(this, isMandatory),
                // "removeFileUpdateCallback": this.removeFileUpdateCallback.bind(this, isMandatory),
                // "removeFileDropdownCallback": this.removeFileDropdownCallback.bind(this, isMandatory),
                // "filesData": filesData,
                "config": config,
                // "fulfilmentId": fulfilmentId,
                // "hasUploadState": false
            };
            this.fileCompRef.setData(dataComp);
        },
        getFormattedFileDataForComp: function(files) {
            var fileData = [];
            files.forEach(function(file) {
                var fileObject = {
                    "fileObj": {
                        "documentName": file[1]
                    },
                    documentDescription: "file a added",
                    clientDocID: file[2]
                };
                fileData.push(fileObject);
            })
            return fileData;
        },
        removeFileCallback: function(isMandatory, file, uniqueId, removeSuccess, removeFailure, removeSuccessDocument, isUpload, componentParentData) {
            removeSuccess();
            this.view.formChangeRepaymentAccountNew.flxContentTCCenter.uploadFiles3.attachmentsetActive();
        },
        getFileData: function() {
            var browsedFiles = this.fileCompRef.getData();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("modifyFileData", browsedFiles);
            var attachments = [],
                fileData = {};
            var reader = new FileReader();

            function readFile(index) {
                if (index >= browsedFiles.length) {
                    navMan.setCustomInfo("frmChangeRepaymentAcountCnFileData", attachments);
                    navMan.navigateTo({
                        "appName": "ArrangementsMA",
                        "friendlyName": "MortgageServicesUIModule/frmConfirmRepaymentAccount"
                    });
                } else {
                    var newFile = browsedFiles[index];
                    fileData = {};
                    fileData.fileName = newFile[0].name;
                    fileData.fileType = newFile[0].file.type;
                    fileData.fileInfo = newFile[1];
                    fileData.fileClientId = newFile[2];
                    fileData.documentStatus = "Pending";
                    reader.onloadend = function(e) {
                        var base64String = e.target.result;
                        base64String = base64String.replace("data:;base64,", "");
                        base64String = base64String.replace("data:image/png;base64,", "");
                        base64String = base64String.replace("data:application/octet-stream;base64,", "");
                        base64String = base64String.replace("data:image/jpeg;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                        base64String = base64String.replace("data:application/vnd.ms-excel;base64,", "");
                        fileData.fileContents = base64String.replace("data:application/pdf;base64,", "");
                        attachments.push(fileData);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(newFile[0].file);
                }
            }
            readFile(0);
        },
        showConfirmation: function() {
            kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmCofirmRepaymentAccount", this.selectedAccount);
            navMan.setCustomInfo("accountModifyFlow", true);
            this.getFileData();
        }
    }
});

