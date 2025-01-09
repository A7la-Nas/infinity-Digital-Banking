define(["FormControllerUtility", "CommonUtilities", "OLBConstants", "ViewConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let Primary = "Primary";
    let Secondary = "Secondary";
    let PrimaryRecords = [];
    let SecondaryRecords = [];
    let filteredPrimaryAccounts = [];
    let filteredSecondaryAccounts = []
    let PrimarySelected = false;
    let SecondarySelected = false;
    let checkboxSelected = false;
    let amountEntered = false;
    let PrimaryAccountNumber;
    let PrimaryAccountName;
    let SecondaryAccountNumber;
    let SecondaryAccountName;
    let currencyCode;
    let isEdit = false;
    let selectedPrimaryaccount;
    let selectedSecondaryaccount;
    let previousSecondaryAccountNumber = "";
    let contentScope, contentPopupScope, titleActionScope;
    return {
        /**
         * Sets the initial actions for form
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate12.onError = this.onError;
            this.initFormActions();
        },
        onBreakpointChange: function(form, width) {},
        /**
         * Performs the actions required before rendering form
         */
        preShow: function() {
            if(this.presenter.isModify === true){
				return;
			}
            CommonUtilities.clearList();
            contentPopupScope.setVisibility(false);
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            frequency = Object.values(this.presenter.frequencies);
            this.view.formTemplate12.flxContentTCCenter.lblEnd.text = kony.i18n.getLocalizedString("i18n.accountsweeps.endManually") + ":";
            this.view.formTemplate12.flxContentTCCenter.lblEnd1.text = kony.i18n.getLocalizedString("i18n.accountsweeps.customDate") + ":";
			this.view.formTemplate12.flxContentTCCenter.flxErrMessage.setVisibility(false);
            this.toggleHeightofPopups();
            this.view.title = "Create New Sweep";
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            if(this.presenter.isModify === true){
				return;
			}
            this.isEdit = false;
            this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.accountsweeps.createNewSweep");
            this.setSegFrequencyDropdownData();
            this.setPrimaryAccountsList();
            this.setSecondaryAccountsList();
            contentScope.flxLoadingIndicatorSecondary.setVisibility(false);
            contentScope.flxLoadingIndicatorPrimary.setVisibility(false);
            if(this.presenter.modifyData && this.presenter.modifyData.noSweepCreated){
                this.preFillPrimaryAccount();
            }
            else if (this.presenter.modifyData && (this.presenter.modifyData.isEdit && !this.presenter.modifyData.isModify)) {
                this.preFilldata()
            } else if (this.presenter.modifyData.isModify != true){
                this.resetForm();
                this.setBankDate();
            }
             this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.onKeyPress=this.onKeyPressCallBack;
            this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.onKeyPress=this.onKeyPressCallBackStart;
            this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.onKeyPress=this.onKeyPressCallBackEnd;
             this.view.formTemplate12.flxContentTCCenter.flxStartFromClose.onKeyPress=this.infoKeyPressCallStart;
            this.view.formTemplate12.flxContentTCCenter.flxEndDateClose.onKeyPress=this.infoKeyPressCallEnd;
             this.view.formTemplate12.flxContentTCCenter.flxSixMonthsChevron.onKeyPress=this.infoKeyPressCallFreq;
             this.view.formTemplate12.flxContentTCCenter.flxDailyChevron.accessibilityConfig = {
                "a11yLabel": "Hide information about daily frequency",
                "a11yARIA": {
                    "aria-expanded": true,
                    "tabindex": 0,
                    "role": "button",
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxWeeklyChevron.accessibilityConfig = {
                "a11yLabel": "Show more information about weekly frequency ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxMonthlyChevron.accessibilityConfig = {
                "a11yLabel": "Show more information about monthly frequency",
                "a11yARIA": {
                    "aria-expanded":false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxSixMonthsChevron.accessibilityConfig = {
                "a11yLabel": "Show more information about every 6 months frequency",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
            if(kony.application.getCurrentBreakpoint()===640){
                this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.width="290px";
                this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.width="290px";
                this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.width="290px";
                this.view.formTemplate12.flxContentTCCenter.flxCustomOption.left="0px";
            }
            contentScope.flxFrequency.onBlur = CommonUtilities.hideAllPopups;
            CommonUtilities.addToListner({
                widget: contentScope.flxFrequencyList,
                hideFunc: this.segDropdownExpandCollapse.bind(this, "lblFrequencyDropdownIcon", "flxFrequencyList")
            });
        },
         onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27){
                if(this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible===true){
                this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible=false;
                this.view.formTemplate12.flxContentTCCenter.flxFrequencyInfo.setActive(true);
                }
            }


        },
        onKeyPressCallBackStart: function(eventObject, eventPayload){
            if (eventPayload.keyCode === 27){
                if( this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible===true){
                    this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible=false;
                    this.view.formTemplate12.flxContentTCCenter.flxStartFromInfo.setActive(true);
                }
            }
        },
        onKeyPressCallBackEnd: function(eventObject, eventPayload){
            if (eventPayload.keyCode === 27){
                if(this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible===true){
                    this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible=false;
                    this.view.formTemplate12.flxContentTCCenter.flxEndDateInfo.setActive(true);
                }
            }
        },
        infoKeyPressCallFreq: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible === true) {
                    this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxFrequencyInfo.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible = false;
                 eventPayload.preventDefault();
                this.view.formTemplate12.flxContentTCCenter.flxFrequencyInfo.setActive(true);
            }
            if (eventPayload.keyCode === 27) {
                if (this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible === true) {
                    this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxFrequencyInfo.setActive(true);
                }
            }

},
         infoKeyPressCallStart: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible === true) {
                    this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxStartFromInfo.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible = false;
                eventPayload.preventDefault();
                this.view.formTemplate12.flxContentTCCenter.flxStartFromInfo.setActive(true);
            }
            if (eventPayload.keyCode === 27) {
                if (this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible === true) {
                    this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxStartFromInfo.setActive(true);
                }
            }
},
         infoKeyPressCallEnd: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible === true) {
                    this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxEndDateInfo.setActive(true);
                }
           }
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
            this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible = false;
             eventPayload.preventDefault();
             this.view.formTemplate12.flxContentTCCenter.flxEndDateInfo.setActive(true);
        }
          if (eventPayload.keyCode === 27) {
            if (this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible === true) {
                this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.isVisible = false;
                this.view.formTemplate12.flxContentTCCenter.flxEndDateInfo.setActive(true);
            }
        }

},

       
        
        
        
        /**
         * Method to initialise form actions
         */
        initFormActions: function() {
            const scope = this;
            this.presenter = applicationManager.getModulesPresentationController({
                appName: 'AccountSweepsMA',
                moduleName: 'AccountSweepsUIModule'
            });
            contentScope = this.view.formTemplate12.flxContentTCCenter;
            contentPopupScope = this.view.formTemplate12.flxContentPopup;
            titleActionScope = this.view.formTemplate12.flxTCButtons;
            formatUtilManager = applicationManager.getFormatUtilManager();
            contentScope.flxFrequencyDropdown.onClick = scope.segDropdownExpandCollapse.bind(this, "lblFrequencyDropdownIcon", "flxFrequencyList");
            contentScope.flxCustomOption.onClick = scope.setCustomDate.bind(this);
            contentScope.flxManulaOption.onClick = scope.setManualDate.bind(this);
            contentScope.flxClose.onClick = function() {
                contentScope.flxInfoMessage.setVisibility(false);
                this.toggleHeightofPopups();
            }.bind(this);
            this.renderCalendarSweepAccount();
            this.setSweepConditionUI();
            this.restrictSpecialCharacters();
            contentScope.tbxPrimaryAccount.onKeyUp = this.filterAccounts.bind(this, "Primary");
            contentScope.tbxSecondaryAccount.onKeyUp = this.filterAccounts.bind(this, "Secondary");
            contentScope.segPrimaryAccounts.onRowClick = this.onPrimaryAccountSelection.bind(this);
            contentScope.segSecondaryAccounts.onRowClick = this.onSecondaryAccountSelection.bind(this);
            contentScope.flxPrimaryTextBox.onClick = this.toggleAccountsDropdown.bind(this, "Primary");
            contentScope.flxSecondaryTextBox.onClick = this.toggleAccountsDropdown.bind(this, "Secondary");
            contentScope.tbxPrimaryAccount.onTouchStart = function() {
                this.toggleAccountsDropdown("Primary");
            }.bind(this);
            contentScope.tbxSecondaryAccount.onTouchStart = function() {
                this.toggleAccountsDropdown("Secondary");
            }.bind(this);
            contentScope.flxClearPrimaryText.onClick = this.clearAccountTextboxTexts.bind(this, "Primary");
            contentScope.flxClearSecondaryText.onClick = this.clearAccountTextboxTexts.bind(this, "Secondary");
            contentScope.btnCancel.onClick = this.viewDetails;
            contentScope.flxCheckBox1.onClick = this.toggleCheckbox.bind(this, "1");
            contentScope.flxCheckBox2.onClick = this.toggleCheckbox.bind(this, "2");
            contentScope.btnContinue.onClick = this.submitSweep.bind(this);
            contentScope.tbxAmount1.onTouchStart = () => {
                contentScope.tbxAmount1.text = scope.presenter.isEmptyNullOrUndefined(contentScope.tbxAmount1.text) ? "" : parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')).toString();
            }
            contentScope.tbxAmount2.onTouchStart = () => {
                contentScope.tbxAmount2.text = scope.presenter.isEmptyNullOrUndefined(contentScope.tbxAmount2.text) ? "" : parseFloat(contentScope.tbxAmount2.text.replace(/,/g, '')).toString();
            }
            contentScope.tbxAmount1.onEndEditing = this.amountFormat.bind(this, "1");
            contentScope.tbxAmount2.onEndEditing = this.amountFormat.bind(this, "2");
            contentScope.flxFrequencyInfo.onClick = this.showFrequencyInfo;
            this.view.formTemplate12.flxContentTCCenter.flxPaymentMethodClose.onClick = this.closeFrequencyInfo;
            //contentScope.lblPaymentMethodClose.onTouchEnd = this.closeFrequencyInfo;
            this.view.formTemplate12.flxContentTCCenter.flxDailyChevron.onClick=this.toggleFrequencyChevron.bind(this, "Daily");
			//contentScope.lblDailyChevron.onTouchEnd = this.toggleFrequencyChevron.bind(this, "Daily");
            this.view.formTemplate12.flxContentTCCenter.flxMonthlyChevron.onClick=this.toggleFrequencyChevron.bind(this, "Monthly");
			//contentScope.lblMonthlyChevron.onTouchEnd = this.toggleFrequencyChevron.bind(this, "Monthly");
            this.view.formTemplate12.flxContentTCCenter.flxWeeklyChevron.onClick=this.toggleFrequencyChevron.bind(this, "Weekly");
			//contentScope.lblWeeklyChevron.onTouchEnd = this.toggleFrequencyChevron.bind(this, "Weekly");
            this.view.formTemplate12.flxContentTCCenter.flxSixMonthsChevron.onClick=this.toggleFrequencyChevron.bind(this, "SixMonths");
			//contentScope.lblSixMonthsChevron.onTouchEnd = this.toggleFrequencyChevron.bind(this, "SixMonths");
            contentScope.flxEndDateInfo.onClick = this.showEndDateInfo;
            this.view.formTemplate12.flxContentTCCenter.flxEndDateClose.onClick=this.closeEndDateInfo;
            contentScope.lblEndDateClose.onTouchEnd = this.closeEndDateInfo;
            contentScope.flxStartFromInfo.onClick = this.showStartingFromInfo;
            this.view.formTemplate12.flxContentTCCenter.flxStartFromClose.onClick=this.closeStartingFromInfo;
            contentScope.lblStartFromClose.onTouchEnd = this.closeStartingFromInfo;
           // contentScope.calStartDate.onSelection = () => scope.disableOldDaySelectionEndDate(contentScope.calStartDate, this.presenter.isEmptyNullOrUndefined(contentScope.calStartDate) ? this.presenter.bankDate.currentWorkingDate : contentScope.calStartDate.formattedDate.split("/").reverse().join("-"));
            FormControllerUtility.disableTextbox(contentScope.tbxAmount1);
            FormControllerUtility.disableTextbox(contentScope.tbxAmount2);
            CommonUtilities.disableButton(contentScope.btnContinue);
        },

         showFrequencyInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.setVisibility(true);
			this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.setVisibility(false);
			this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.setVisibility(false);
            this.view.formTemplate12.flxContentTCCenter.lblPaymentMethodHeader.setActive(true);
        },
        closeFrequencyInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.setVisibility(false);
            this.collapseChevronsOfFreqMethods();
        },
        showEndDateInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.setVisibility(true);
			this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.setVisibility(false);
			this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.setVisibility(false);
            this.view.formTemplate12.flxContentTCCenter.lblEndDateHeader.setActive(true);
            this.collapseChevronsOfFreqMethods();
        },
        closeEndDateInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.setVisibility(false);
        },
        showStartingFromInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.setVisibility(true);
			this.view.formTemplate12.flxContentTCCenter.flxEndDatePopup.setVisibility(false);
			this.view.formTemplate12.flxContentTCCenter.flxPaymentMethods.setVisibility(false);
            this.view.formTemplate12.flxContentTCCenter.lblStartingFromHeader.setActive(true);
            this.collapseChevronsOfFreqMethods();
        },

		closeStartingFromInfo: function() {
            this.view.formTemplate12.flxContentTCCenter.flxStartingFromPopup.setVisibility(false);

        },

		toggleFrequencyChevron: function(fieldType){
			if (contentScope["lbl" + fieldType + "Chevron"].text === "P")
            {
                contentScope["lbl" + fieldType + "Chevron"].text = "O";
                contentScope["flx" + fieldType + "Chevron"].accessibilityConfig = {
                    "a11yLabel": "Show more information about " + fieldType + " frequency ",
                    "a11yARIA": {
                        "aria-expanded": false,
                        "tabindex": 0,
                        "role": "button",
                    }
                }
                contentScope["lbl" + fieldType + "Desc"].setVisibility(false);
                contentScope["flx" + fieldType + "Chevron"].setActive(true);
				return;
            }	
			this.collapseChevronsOfFreqMethods();
            if (contentScope["lbl" + fieldType + "Chevron"].text === "O") {
                contentScope["lbl" + fieldType + "Chevron"].text = "P";
                contentScope["flx" + fieldType + "Chevron"].accessibilityConfig = {
                    "a11yLabel": "Hide information about " + fieldType + " frequency",
                    "a11yARIA": {
                        "aria-expanded": true,
                        "tabindex": 0,
                        "role": "button",
                    }
                }
                contentScope["lbl" + fieldType + "Desc"].setVisibility(true);
                 contentScope["flx" + fieldType + "Chevron"].setActive(true);
            } 
		},

        toggleHeightofPopups: function() {
            if (contentScope.flxInfoMessage.isVisible === true) {
                if (contentScope.lblSweepError.isVisible === true) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "450dp";
                        contentScope.flxEndDatePopup.top = "635dp";
                        contentScope.flxStartingFromPopup.top = "726dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "404dp";
                        contentScope.flxEndDatePopup.top = "428dp";
                        contentScope.flxStartingFromPopup.top = "523dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "313dp";
                        contentScope.flxEndDatePopup.top = "356dp";
                        contentScope.flxStartingFromPopup.top = "430dp";
                    }
                } else if (contentScope.flxErrMessage.isVisible === true) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "495dp";
                        contentScope.flxEndDatePopup.top = "670dp";
                        contentScope.flxStartingFromPopup.top = "768dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "446dp";
                        contentScope.flxEndDatePopup.top = "488dp";
                        contentScope.flxStartingFromPopup.top = "565dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "355dp";
                        contentScope.flxEndDatePopup.top = "393dp";
                        contentScope.flxStartingFromPopup.top = "472dp";
                    }
                } else {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "395dp";
                        contentScope.flxEndDatePopup.top = "570dp";
                        contentScope.flxStartingFromPopup.top = "668dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "346dp";
                        contentScope.flxEndDatePopup.top = "388dp";
                        contentScope.flxStartingFromPopup.top = "465dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "255dp";
                        contentScope.flxEndDatePopup.top = "293dp";
                        contentScope.flxStartingFromPopup.top = "372dp";
                    }
                }
            } else {
                if (contentScope.lblSweepError.isVisible === true) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "313dp";
                        contentScope.flxEndDatePopup.top = "510dp";
                        contentScope.flxStartingFromPopup.top = "600dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "319dp";
                        contentScope.flxEndDatePopup.top = "343dp";
                        contentScope.flxStartingFromPopup.top = "420dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "235dp";
                        contentScope.flxEndDatePopup.top = "270dp";
                        contentScope.flxStartingFromPopup.top = "348dp";
                    }
                } else if (contentScope.flxErrMessage.isVisible === true) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "445dp";
                        contentScope.flxEndDatePopup.top = "550dp";
                        contentScope.flxStartingFromPopup.top = "640dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "353dp";
                        contentScope.flxEndDatePopup.top = "388dp";
                        contentScope.flxStartingFromPopup.top = "464dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "277dp";
                        contentScope.flxEndDatePopup.top = "314dp";
                        contentScope.flxStartingFromPopup.top = "369dp";
                    }
                } else {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        contentScope.flxPaymentMethods.top = "345dp";
                        contentScope.flxEndDatePopup.top = "450dp";
                        contentScope.flxStartingFromPopup.top = "540dp";
                    } else if (kony.application.getCurrentBreakpoint() === 1024) {
                        contentScope.flxPaymentMethods.top = "253dp";
                        contentScope.flxEndDatePopup.top = "288dp";
                        contentScope.flxStartingFromPopup.top = "364dp";
                    } else {
                        contentScope.flxPaymentMethods.top = "177dp";
                        contentScope.flxEndDatePopup.top = "214dp";
                        contentScope.flxStartingFromPopup.top = "269dp";
                    }
                }
            }
        },

        collapseChevronsOfFreqMethods: function(){
			contentScope["lblDailyChevron"].text = "O";
             contentScope["flxDailyChevron"].accessibilityConfig = {
                "a11yLabel": "Show more information about daily frequency ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
			contentScope["lblWeeklyChevron"].text = "O";
             contentScope["flxWeeklyChevron"].accessibilityConfig = {
                "a11yLabel": "Show more information about weekly frequency ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
			contentScope["lblMonthlyChevron"].text = "O";
             contentScope["flxMonthlyChevron"].accessibilityConfig = {
                "a11yLabel": "Show more information about monthly frequency ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
			contentScope["lblSixMonthsChevron"].text = "O";
            contentScope["flxSixMonthsChevron"].accessibilityConfig = {
                "a11yLabel": "Show more information about every 6 months frequency ",
                "a11yARIA": {
                    "aria-expanded": false,
                    "tabindex": 0,
                    "role": "button",
                }
            }
			contentScope["lblDailyDesc"].setVisibility(false);
			contentScope["lblWeeklyDesc"].setVisibility(false);
			contentScope["lblMonthlyDesc"].setVisibility(false);
			contentScope["lblSixMonthsDesc"].setVisibility(false);
		},

        /**
         * Method to navigate previous form onClick action of Cancel button
         */
        viewDetails: function() {
			this.presenter.isModify = false;
            if (kony.application.getPreviousForm().id == "frmAccountSweepDashboard") {
                this.presenter.getAllsweeps(this.presenter.coreCustomerId);
        }
        else{
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
							"appName": "HomepageMA",
							"moduleName": "AccountsUIModule"
						});
				var custDashboard = accountsModule.presentationController.customerdashboard;
				if (custDashboard === "true") {
                var navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
			} else {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
			}
        }
        },
        /**
         * Method to format the amount with commas
         */
        amountFormat: function(Id) {
            if (contentScope["tbxAmount" + Id].text != "") {
                contentScope["tbxAmount" + Id].text=!/^[0-9]/.test(contentScope["tbxAmount" + Id].text)?"":contentScope["tbxAmount" + Id].text;
                contentScope["tbxAmount" + Id].text = formatUtilManager.formatAmount(parseFloat(contentScope["tbxAmount" + Id].text.replace(/,/g, '')));
                this.amountEntered = true;
                this.validateForm();
            } else {
                contentScope["tbxAmount" + Id].text = "";
                this.amountEntered = false;
            }
        },
        /**
         * Entry point method for the form controller
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                var errCode = viewModel.serverError.dbpErrCode;
                var dbpErrMsg = viewModel.serverError.dbpErrMsg;
				this.view.formTemplate12.flxContentTCCenter.flxErrMessage.setVisibility(false);
                if (!this.presenter.isEmptyNullOrUndefined(errCode)) {
                    if(dbpErrMsg.indexOf("\n") !== -1){
                        var errMsg = dbpErrMsg.split("\n");
                        this.view.formTemplate12.flxContentTCCenter.lblError1.text = errMsg[0];
                        this.view.formTemplate12.flxContentTCCenter.lblError2.text = errMsg[1];
                        this.view.formTemplate12.flxContentTCCenter.flxErrMessage.setVisibility(true);
                    }else{
                        this.view.formTemplate12.flxContentTCCenter.lblSweepError.setVisibility(true);
                        this.view.formTemplate12.flxContentTCCenter.lblSweepError.setFocus(true);					
                        if (this.presenter.isEmptyNullOrUndefined(dbpErrMsg)) dbpErrMsg = kony.i18n.getLocalizedString("i18n.accountSweeps.serverError");
                        this.view.formTemplate12.flxContentTCCenter.lblSweepError.text = dbpErrMsg;
                    }
                    this.toggleHeightofPopups();
				}else{
                    if(this.presenter.isEmptyNullOrUndefined(dbpErrMsg))
						dbpErrMsg = kony.i18n.getLocalizedString("i18n.accountSweeps.serverError");
					this.showServerError(dbpErrMsg);
				}
            }
        },
        /**
         * Method to reset all the form actions and UI
         */
        resetForm: function() {
            contentScope.flxInfoMessage.setVisibility(true);
            contentScope.flxPrimaryAccountSegment.setVisibility(false);
            contentScope.flxNoPrimaryRecords.setVisibility(false);
            contentScope.flxErrorMessage.setVisibility(false);
            contentScope.flxPrimaryText.setVisibility(false);
            contentScope.flxClearPrimaryText.setVisibility(false);
            contentScope.flxPrimaryTextBox.setVisibility(true);
            contentScope.lblPrimaryRecordField.setVisibility(false);
            contentScope.tbxPrimaryAccount.setVisibility(true);
            contentScope.tbxPrimaryAccount.text = '';
            contentScope.lblPrimaryRecordField1.setVisibility(false);
            contentScope.flxSecondaryAccountSegment.setVisibility(false);
            contentScope.flxNoSecondaryRecords.setVisibility(false);
            contentScope.lblSecondaryRecordField.setVisibility(false);
            contentScope.tbxSecondaryAccount.setVisibility(true);
            contentScope.tbxSecondaryAccount.text = '';
            contentScope.lblSecondaryRecordField1.setVisibility(false);
            contentScope.flxSelectEndDate.setVisibility(false);
            contentScope.lblSelectedFrequency.text = "Daily";
            contentScope.imgCheck1.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            contentScope.imgCheck2.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            FormControllerUtility.disableTextbox(contentScope.tbxAmount1);
            FormControllerUtility.disableTextbox(contentScope.tbxAmount2);
            contentScope.tbxAmount1.text = "";
            contentScope.tbxAmount2.text = "";
            contentScope.tbxAmount1.maxTextLength = 15;
            contentScope.tbxAmount2.maxTextLength = 15;
            this.view.formTemplate12.hideBannerError();
            this.resetToggleCheckbox();
            this.PrimarySelected = false;
            this.SecondarySelected = false;
			this.amountEntered = false;
            this.selectedSecondaryaccount = '';
            this.selectedPrimaryaccount = '';
            this.setManualDate();
            this.hideFieldError();
            CommonUtilities.disableButton(contentScope.btnContinue);
            contentScope.lblSweepError.setVisibility(false);
            contentScope.lblStartDate.text = kony.i18n.getLocalizedString("i18n.accountsweeps.startingFromWithColon");
			contentScope.lblStartingFromHeader.text = kony.i18n.getLocalizedString("i18n.accountsweeps.startingFromWithoutColon");
            contentScope.lblStartFromDesc.text = kony.i18n.getLocalizedString("i18n.accountsweeps.startingFromInfo");
			this.toggleHeightofPopups();
        },
		resetCalendar: function() {
            var scopeObj = this;
            var startDate = new Date(this.presenter.bankDate.currentWorkingDate || CommonUtilities.getServerDate());
            contentScope.calEndDate.dateComponents = null;
            contentScope.calStartDate.dateComponents = null;
            scopeObj.disableOldDaySelection(contentScope.calStartDate, startDate);
          //  scopeObj.disableOldDaySelection(contentScope.calEndDate, startDate);
        },
        /**
         * Method to pre-populate the data in the form onClick of edit 
         */
        preFilldata: function() {
			this.resetCalendar();
            editData = this.presenter.modifyData;
            this.view.formTemplate12.pageTitle = "Edit Sweep";//kony.i18n.getLocalizedString("i18n.accountsweeps.editAccountSweep");
            this.preselectAccount(editData.primaryAccountNumber, "Primary");
            this.preselectAccount(editData.secondaryAccountNumber, "Secondary");
        //    if(this.selectedSecondaryaccount)this.filteredSecondaryAccounts.push(this.selectedSecondaryaccount)
            previousSecondaryAccountNumber = editData.secondaryAccountNumber;
            contentScope.lblStartDate.text = kony.i18n.getLocalizedString("i18n.accountSweeps.nextOccurrenceDate");
			contentScope.lblStartingFromHeader.text = kony.i18n.getLocalizedString("i18n.accountSweeps.nextOccurrenceDate");
            contentScope.lblStartFromDesc.text = kony.i18n.getLocalizedString("i18n.accountsweeps.nextOccurrenceInfo");            
            if (this.selectedPrimaryaccount) {
                this.isEdit = this.presenter.modifyData.isEdit;
                let accounts = this.removeSelectedAccount(this.selectedPrimaryaccount, this.filteredSecondaryAccounts);
                let filteredRecords = this.presenter.filterAccountsByMembershipId(this.selectedPrimaryaccount.Membership_id, accounts);
                this.setData(filteredRecords, "Secondary");
                this.PrimarySelected = true;
                contentScope.lblPrimaryText.text = CommonUtilities.truncateStringWithGivenLength(editData.primaryAccountName + "....", 26) + CommonUtilities.getLastFourDigit(editData.primaryAccountNumber);
                contentScope.flxPrimaryTextBox.setVisibility(false);
                contentScope.flxPrimaryText.setVisibility(true);
                contentScope.lblPrimaryText.skin = "bbSknLbl424242SSP15Px";
            }else{ 
                this.isEdit = false;
                contentScope.flxPrimaryTextBox.setVisibility(true);
                contentScope.flxPrimaryText.setVisibility(false);
            }
            if (this.selectedSecondaryaccount) {
               
                this.selectedSecondaryaccount.lblRecordField1 = CommonUtilities.truncateStringWithGivenLength(editData.secondaryAccountName + "....", 26) + CommonUtilities.getLastFourDigit(editData.secondaryAccountNumber);
                this.selectedSecondaryaccount.lblRecordField2 = (this.selectedSecondaryaccount.availableBalance ? CommonUtilities.formatCurrencyWithCommas(this.selectedSecondaryaccount.availableBalance, false, this.selectedSecondaryaccount.currencyCode) : (this.selectedSecondaryaccount.bankName));
                this.onSecondaryAccountSelection(this.selectedSecondaryaccount);
            }else{
                contentScope.lblSecondaryRecordField.text =  "";
                contentScope.lblSecondaryRecordField1.text = "";
                contentScope.tbxSecondaryAccount.setVisibility(true);
            }
            contentScope.flxInfoMessage.setVisibility(false);
			this.toggleHeightofPopups();
            contentScope.flxErrorMessage.setVisibility(false);
            contentScope.tbxSecondaryAccount.text = '';
            contentScope.lblSelectedFrequency.text = editData.frequency;
            contentScope.tbxAmount1.text = this.presenter.isEmptyNullOrUndefined(editData.belowSweepAmount) ? "" : editData.belowSweepAmount;
            contentScope.tbxAmount2.text = this.presenter.isEmptyNullOrUndefined(editData.aboveSweepAmount) ? "" : editData.aboveSweepAmount;
            contentScope.lblSelectedCurrencySymbol1.text = formatUtilManager.getCurrencySymbol(editData.currencyCode);
            contentScope.lblSelectedCurrencySymbol2.text = formatUtilManager.getCurrencySymbol(editData.currencyCode);
			this.resetToggleCheckbox();
            if (editData.sweepType == "Both") {
                this.editToggleCheckbox("1");
                this.editToggleCheckbox("2");
            }
            if (editData.sweepType == "Below") {
                this.editToggleCheckbox("1");
            }
            if (editData.sweepType == "Above") {
                this.editToggleCheckbox("2");
            }
			var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var bankDate = this.presenter.bankDate.currentWorkingDate || CommonUtilities.getServerDate();
            var startDate = editData.startDate.split("/").reverse().join("-");
            var endDate = this.presenter.isEmptyNullOrUndefined(editData.endDate) ? "" : editData.endDate.split("/").reverse().join("-");
            if (editData.startDate && formatUtilManager.getDateObjectfromString(startDate) > formatUtilManager.getDateObjectfromString(bankDate)) {
				contentScope.calStartDate.date = CommonUtilities.getFrontendDateString(startDate, dateFormat);
                contentScope.calStartDate.dateComponents = this.getServerDateComponents(startDate);
            } else if (editData.startDate && formatUtilManager.getDateObjectfromString(startDate) <= formatUtilManager.getDateObjectfromString(bankDate)) {
				contentScope.calStartDate.date = CommonUtilities.getFrontendDateString(bankDate, dateFormat);
                contentScope.calStartDate.dateComponents = this.getServerDateComponents(bankDate);
            }
            if (editData.endDate && formatUtilManager.getDateObjectfromString(endDate) > formatUtilManager.getDateObjectfromString(bankDate)) {
				contentScope.calEndDate.date = CommonUtilities.getFrontendDateString(endDate, dateFormat);
                contentScope.calEndDate.dateComponents = this.getServerDateComponents(endDate);
            } else if (editData.endDate && formatUtilManager.getDateObjectfromString(endDate) < formatUtilManager.getDateObjectfromString(bankDate)) {
				contentScope.calEndDate.date = CommonUtilities.getFrontendDateString(bankDate, dateFormat);
                contentScope.calEndDate.dateComponents = this.getServerDateComponents(bankDate);
            }
            if (this.presenter.isEmptyNullOrUndefined(editData.endDate) || (editData.endDate && formatUtilManager.getDateObjectfromString(endDate) <= formatUtilManager.getDateObjectfromString(bankDate))) {
                this.setManualDate();
                var endDate1 = this.presenter.isEmptyNullOrUndefined(contentScope.calStartDate) ? this.presenter.bankDate.currentWorkingDate : contentScope.calStartDate.formattedDate.split("/").reverse().join("-");
               // contentScope.calEndDate.dateComponents = this.getServerDateComponents(endDate1);
                this.disableOldDaySelection(contentScope.calEndDate, endDate1);
            } else {
                this.setCustomDate();
				this.disableOldDaySelectionEndDate(contentScope.calEndDate, startDate);
            }
            contentScope.flxLoadingIndicatorSecondary.setVisibility(false);
            this.enableOrDisableContinueButton();
        },
        preFillPrimaryAccount : function(){
            this.resetForm();
            this.setBankDate();
            var data = this.presenter.modifyData;
            this.preselectAccount(data.accountId, "Primary");
            if (this.selectedPrimaryaccount) {
                // let accounts = this.removeSelectedAccount(this.selectedPrimaryaccount, this.filteredSecondaryAccounts);
                // let filteredRecords = this.presenter.filterAccountsByMembershipId(this.selectedPrimaryaccount.Membership_id, accounts);
                this.PrimarySelected = true;
                contentScope.lblPrimaryText.text = CommonUtilities.truncateStringWithGivenLength(this.selectedPrimaryaccount.accountName + "....", 26) + CommonUtilities.getLastFourDigit(this.selectedPrimaryaccount.accountID);
                contentScope.flxPrimaryTextBox.setVisibility(false);
                contentScope.flxPrimaryText.setVisibility(true);
                contentScope.lblPrimaryText.skin = "bbSknLbl424242SSP15Px";
            }
        },
        /**
         * Method to check the pre selected account
         * @param {String} id - it contains the account id .
         *  @param {String} type - it contains the type of sweep account(Primary or Secondary) .
         * @returns - it returns account Id
         */
        preselectAccount: function(id, type) {
            let accounts = this.presenter.filteredEditAccounts
            index = accounts.findIndex(object => {
                return object.accountID === id;
            });
            this["selected" + type + "account"] = accounts[index];
            
        },
         /**
         * Method to toggle the check box in edit flow
         * @param {String} id - it contains the widget id .
         */
        editToggleCheckbox: function(id) {            
            FormControllerUtility.enableTextbox(contentScope["tbxAmount" + id]);
            contentScope["imgCheck" + id].text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
            if (id === "1") contentScope["tbxAmount" + id].text = formatUtilManager.formatAmount(editData.belowSweepAmount);
            if (id === "2") contentScope["tbxAmount" + id].text = formatUtilManager.formatAmount(editData.aboveSweepAmount);
            contentScope["tbxAmount" + id].skin = "ICSknTextBox424242";
            this.checkboxSelected = true;
        },
        /**
         * Method to reset the toggled check box
         * @param {String} id - it contains the widget id .
         */
        resetToggleCheckbox: function() {
            for (i = 1; i <= 2; i++) {
                contentScope["imgCheck" + i].text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                contentScope["tbxAmount" + i].skin = "ICSknTbxDisabledSSPreg42424215px";
                contentScope["tbxAmount" + i].text = "";
            }
        },
        /**
         * Method to submit the form Details to the sweep confirmation page
         */
        submitSweep: function() {
			this.presenter.isModify = false;
            this.view.formTemplate12.flxContentTCCenter.lblSweepError.setVisibility(false);
            var data = this.getFormDetails();
            if (this.validateForm()) {                
                this.createSweep(data);
            }
        },
        createSweep: function(sweepData) {
            sweepData.validate = "true";
			if(sweepData.isEdit)
				this.presenter.editSweepValidation(sweepData, sweepData);
			else
				this.presenter.createSweepValidation(sweepData, sweepData);
        },
         /**
         * Method to get the details of a filled form
         * @returns {object} formDetails - collection of form details
         */
        getFormDetails: function() {
            var formDetails = {};
            formDetails.formattedprimaryAccountNumber = this.selectedPrimaryaccount.lblRecordField1 ? this.selectedPrimaryaccount.lblRecordField1 : contentScope.lblPrimaryText.text
            formDetails.formattedsecondaryAccountNumber = this.selectedSecondaryaccount.lblRecordField1 ? this.selectedSecondaryaccount.lblRecordField1 : contentScope.lblSecondaryRecordField.text;
            formDetails.primaryAccountNumber = this.selectedPrimaryaccount.accountID;
            formDetails.secondaryAccountNumber = this.selectedSecondaryaccount.accountID;
            formDetails.primaryAccountName = this.selectedPrimaryaccount.accountName
            formDetails.secondaryAccountName = this.selectedSecondaryaccount.accountName
            formDetails.previousSecondaryAccountNumber = this.selectedSecondaryaccount.accountID === previousSecondaryAccountNumber?previousSecondaryAccountNumber:"";
            formDetails.frequency = contentScope.lblSelectedFrequency.text;
            formDetails.belowSweepAmount = this.presenter.isEmptyNullOrUndefined(contentScope.tbxAmount1.text) ? "" : contentScope.tbxAmount1.text.replace(/,/g, '');
            formDetails.aboveSweepAmount = this.presenter.isEmptyNullOrUndefined(contentScope.tbxAmount2.text) ? "" : contentScope.tbxAmount2.text.replace(/,/g, '');
            formDetails.startDate = contentScope.calStartDate.formattedDate;
            formDetails.endDate = contentScope.lblManualOption.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO ? kony.i18n.getLocalizedString("i18n.accountsweeps.endManually") : contentScope.calEndDate.formattedDate;
            formDetails.currencyCode = formatUtilManager.getCurrencySymbolCode(contentScope.lblSelectedCurrencySymbol1.text);
            formDetails.formattedcurrencyCode = contentScope.lblSelectedCurrencySymbol1.text;
            formDetails.isEdit = this.isEdit;
            if (contentScope.imgCheck1.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED && contentScope.imgCheck2.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                formDetails.sweepType = "Both";
            } else if (contentScope.imgCheck1.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                formDetails.sweepType = "Below";
            } else {
                formDetails.sweepType = "Above";
            }
            return formDetails;
        },
          /**
         * Method to get the bank server date or the current working date.
         */
        setBankDate: function() {
            var bankDate = this.presenter.bankDate.currentWorkingDate || CommonUtilities.getServerDate();
            this.disableOldDaySelection(contentScope.calStartDate, bankDate);
            this.disableOldDaySelection(contentScope.calEndDate, this.presenter.isEmptyNullOrUndefined(contentScope.calStartDate) ? this.presenter.bankDate.currentWorkingDate : contentScope.calStartDate.formattedDate.split("/").reverse().join("-"));
        },
        /**
         * Method to disable the selection of past dates and sets the date range for a calendar widget.
         * @param {String} widgetId - calendar widget ID
         * @param {String} bankDate - calendar widget's date selection will be disabled for backdated dates of bankDate
         */
        disableOldDaySelection: function(widgetId, bankDate) {
            var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
            var today = new Date(bankDate);
            var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
            if (widgetId == contentScope.calStartDate) {
                widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
                widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            }
            if (widgetId == contentScope.calEndDate) {
                widgetId.enableRangeOfDates([today.getDate() + 1, today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
                widgetId.dateComponents = [today.getDate() + 1, today.getMonth() + 1, today.getFullYear()];
            }
        },
		
		disableOldDaySelectionEndDate: function(widgetId, bankDate) {
            var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
            var today = new Date(bankDate);
            var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));            
            widgetId.enableRangeOfDates([today.getDate() + 1, today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
        },
        /**
         * Method to validate amount in textbox and calendar dates
         * @returns {boolean} - enables or disables continue button based on validations
         */
        validateForm: function() {
            var sendOnDate = formatUtilManager.getDateObjectFromDateComponents(contentScope.calStartDate.dateComponents);
            var currDateComponent = this.presenter.bankDate.currentWorkingDate ? this.getServerDateComponents(this.presenter.bankDate.currentWorkingDate) : CommonUtilities.getServerDateComponent();
            var currDate = formatUtilManager.getDateObjectFromDateComponents(currDateComponent);
            if(!kony.sdk.isNullOrUndefined(contentScope.calEndDate.dateComponents)){
                var endOnDate = formatUtilManager.getDateObjectFromDateComponents(contentScope.calEndDate.dateComponents);
                if (contentScope.lblCustomOption.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    if (endOnDate.getTime() < currDate.getTime()) {
                        this.showFieldError("i18n.transfers.errors.invalidEndOnDate");
                        contentScope.calEndDate.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    }
                    if (endOnDate.getTime() === sendOnDate.getTime()) {
                        this.showFieldError("i18n.transfers.errors.sameEndDate");
                        contentScope.calEndDate.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    }
                    if (endOnDate.getTime() < sendOnDate.getTime()) {
                        this.showFieldError("i18n.accountSweeps.errors.beforeEndDate");
                        contentScope.calEndDate.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    } else if (endOnDate.getTime() > sendOnDate.getTime()) {
                        this.hideFieldError();
                        contentScope.calEndDate.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
                    }
                }
            }
            if ((contentScope.tbxAmount1.text == "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) || (contentScope.tbxAmount2.text == "" && contentScope.imgCheck2.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED)) {
                this.showFieldError("i18n.accountsweeps.pleaseEnterAmount");
                this.amountEntered = false;
                return false;
            }
            if ((contentScope.tbxAmount1.text != "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) || (contentScope.tbxAmount2.text != "" && contentScope.imgCheck2.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED)) {
                this.hideFieldError();
            }
            if ((contentScope.tbxAmount1.text != "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) && (contentScope.tbxAmount2.text != "" && contentScope.imgCheck2.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED)) {
                if ((parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')) > parseFloat(contentScope.tbxAmount2.text.replace(/,/g, '')))) {
                    contentScope.tbxAmount2.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                    this.showFieldError("i18n.accountSweeps.sweepAmountValidate");
                    return false;
                }
            }
            if ((contentScope.tbxAmount1.text != "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) && (contentScope.tbxAmount2.text != "" && contentScope.imgCheck2.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED)) {
                if ((parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')) < parseFloat(contentScope.tbxAmount2.text.replace(/,/g, '')))) {
                    this.hideFieldError();
                }
            }
            if (parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')) < 1) {
                contentScope.tbxAmount1.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                this.showFieldError("i18n.accountsweeps.pleaseEnterAmount");
                return false;
            }
            if (parseFloat(contentScope.tbxAmount2.text.replace(/,/g, '')) < 1) {
                contentScope.tbxAmount2.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                this.showFieldError("i18n.accountSweeps.PleaseEntervalidAmount");
                return false;
            }
            if ((parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')) < parseFloat(contentScope.tbxAmount2.text.replace(/,/g, ''))) || parseFloat(contentScope.tbxAmount1.text.replace(/,/g, '')) > 1 || parseFloat(contentScope.tbxAmount2.text.replace(/,/g, '')) > 1) {
                this.hideFieldError();
            }
            contentScope.calEndDate.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            return true;
        },
        /**
         * Method to restrict special charcters for amount and allow only numbers
         */
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            contentScope.tbxAmount1.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
            contentScope.tbxAmount2.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },
        /**
         * Method to get the date components
         * @param {object} dateString date string
         * @returns {object} date components
         */
        getServerDateComponents: function(dateString) {
            var dateObj = formatUtilManager.getDateObjectfromString(dateString, formatUtilManager.getDateFormat().toUpperCase());
            return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
        },
        /**
         * Method to show error field with error message when error occured during validation
         * @param {String} errorKey i18n key
         */
        showFieldError: function(errorKey) {
            //     this.view.lblWarning.setVisibility(true);
            CommonUtilities.setText(contentScope.lblErrorMessage, kony.i18n.getLocalizedString(errorKey), CommonUtilities.getaccessibilityConfig());
            contentScope.flxErrorMessage.setVisibility(true);
            if (contentScope.tbxAmount1.text == "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                contentScope.tbxAmount1.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                this.checkboxSelected = false;
            } else if (contentScope.tbxAmount2.text == "" && contentScope.imgCheck2.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                contentScope.tbxAmount2.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
                this.checkboxSelected = false;
            }
            if (errorKey == 'i18n.payments.payDueAmountErrorMessage') {
                this.checkboxSelected = false;
            }
            contentScope.flxErrorMessage.setVisibility(true);
            this.enableOrDisableContinueButton();
        },
         /**
         * Method to hide error field when their is no error occured during validation
         */
        hideFieldError: function() {
            if (contentScope.tbxAmount1.text != "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                contentScope.tbxAmount1.skin = "ICSknTextBox424242";
                this.checkboxSelected = true;
            }
            if (contentScope.tbxAmount2.text != "" && contentScope.imgCheck1.text == ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                contentScope.tbxAmount2.skin = "ICSknTextBox424242";
                this.checkboxSelected = true;
            }
           
            contentScope.flxErrorMessage.setVisibility(false);
            this.enableOrDisableContinueButton();
        },
         /**
         * Method to toggle checkbox
         * @param {String} selectedcheckbox - for widget ID
         */
        toggleCheckbox: function(selectedcheckbox) {
            if (contentScope["imgCheck" + selectedcheckbox].text === ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.checkboxSelected = true;
                FormControllerUtility.enableTextbox(contentScope["tbxAmount" + selectedcheckbox]);
                contentScope["imgCheck" + selectedcheckbox].text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
                contentScope["tbxAmount" + selectedcheckbox].skin = "ICSknTextBox424242";
            } else {
                this.checkboxSelected = false;
                this.amountEntered = false;
                contentScope["imgCheck" + selectedcheckbox].text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                contentScope["tbxAmount" + selectedcheckbox].skin = "ICSknTbxDisabledSSPreg42424215px";
                contentScope["tbxAmount" + selectedcheckbox].text = "";
                FormControllerUtility.disableTextbox(contentScope["tbxAmount" + selectedcheckbox]);
                this.hideFieldError();
            }
			if ((contentScope["imgCheck1"].text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) || (contentScope["imgCheck2"].text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED)) {
				this.checkboxSelected = true;
			}
            this.enableOrDisableContinueButton();
        },
        /**
         * @api : renderCalendarSweepAccount
         * This function UI of Calendar
         * @return : NA
         */
        renderCalendarSweepAccount: function() {
            var context1 = {
                "widget": contentScope.flxCalStartDate,
                "anchor": "bottom"
            };
            contentScope.calStartDate.setContext(context1);
            var context2 = {
                "widget": contentScope.flxCalEndDate,
                "anchor": "bottom"
            };
            contentScope.calEndDate.setContext(context2);
        },
        /**
         * @api : segDropdownExpandCollapse
         * This function handles expand and collapse of segLCDropdown
         * @param {String} labelID - label widget Id for frequence
         * @param {String} FlxID - flex widget Id for frequency dropdown
         * @return : NA
         */
        segDropdownExpandCollapse: function(labelID, flxID) {
            if (contentScope[labelID].text === "O") {
                contentScope[flxID].setVisibility(true);
                contentScope[labelID].text = "P";
                 contentScope[flxID].accessibilityConfig={
                    "a11yLabel": "Click to hide list of frequency options",
                        "a11yARIA": {
                            "aria-expanded": true,
                            "tabindex": 0,
                            "role": "button",
                        }
                }
            } else {
                contentScope[flxID].setVisibility(false);
                contentScope[labelID].text = "O";
                contentScope[flxID].accessibilityConfig={
                    "a11yLabel": contentScope["lblSelectedFrequency"].text + "frequency . Click to show more frequency options" ,
                        "a11yARIA": {
                            "aria-expanded": false,
                            "tabindex": 0,
                            "role": "button",
                        }
                }
            }
        },
        /**
         * @api : setsegFrequencyListData
         * This function sets widget data mapping for All Guarantees & Standby LC dropdown
         * @return : NA
         */
        setSegFrequencyDropdownData: function() {
            var scope = this;
            var segFrequencyData = [],
                i;
            contentScope.segFrequencyList.rowTemplate = "flxFrequencyListDropdown"
            contentScope.segFrequencyList.widgetDataMap = {
                "flxFrequencyListDropdown": "flxFrequencyListDropdown",
                "lblListValue": "lblListValue",
            };
            for (i = 0; i < frequency.length; i++) {
                segFrequencyData[i] = {
                    "lblListValue": {
                        "text": kony.i18n.getLocalizedString(frequency[i]),
                        "isVisible": true,
                    },
                    "flxFrequencyListDropdown": {
                        "onClick": scope.segFrequencyListOnclick.bind(this),
                         "onKeyPress":scope.onKeyPressCallBackSeg.bind(this),
                        "isVisible": true,
                    }
                };
            }
            contentScope.segFrequencyList.setData(segFrequencyData);
        },
         onKeyPressCallBackSeg: function(eventObject, eventPayload){
            if (eventPayload.keyCode === 27) {
                if(this.view.formTemplate12.flxContentTCCenter.flxFrequencyList.isVisible===true){
                    this.view.formTemplate12.flxContentTCCenter.flxFrequencyList.isVisible=false;
                    this.view.formTemplate12.flxContentTCCenter.lblFrequencyDropdownIcon.text='O';
                    this.view.formTemplate12.flxContentTCCenter.flxFrequencyDropdown.setActive(true);
                }
            }
        },
        /**
         * @api : segFrequencyListOnclick
         * This function handles onClick of each row in segLCDropdown
         * @return : NA
         */
        segFrequencyListOnclick: function() {
            let segmentdata = JSON.parse(JSON.stringify(contentScope.segFrequencyList.data));
            var rowIndex = contentScope.segFrequencyList.selectedRowIndex[1];
            contentScope.lblSelectedFrequency.text = segmentdata[rowIndex].lblListValue.text;
            selectedCurrency = frequency[rowIndex];
            contentScope.flxFrequencyList.setVisibility(false);
            contentScope.lblFrequencyDropdownIcon.text = "O";
        },
         /**
         * Method to set custom date onClick of Custom Date radio button
         */
        setCustomDate: function() {
            contentScope.lblManualOption.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            contentScope.lblManualOption.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
             contentScope.flxManulaOption.accessibilityConfig = {
                "a11yLabel": this.view.formTemplate12.flxContentTCCenter.lblEndManually.text,
                "a11yARIA": {
                    "role": "radio",
                    "aria-checked": false,
                    "tabindex": 0
                }
            };
            contentScope.flxManulaOption.setActive(true);

            contentScope.lblCustomOption.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            contentScope.lblCustomOption.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
             contentScope.flxCustomOption.accessibilityConfig = {
                "a11yLabel": this.view.formTemplate12.flxContentTCCenter.lblCustomDate.text,
                "a11yARIA": {
                    "role": "radio",
                    "aria-checked": true,
                    "tabindex": 0
                }
            };
            contentScope.flxCustomOption.setActive(true);
            contentScope.flxSelectEndDate.setVisibility(true);
           

        },
         /**
         * Method to set date manually onClick of End Manually radio button
         */
        setManualDate: function() {
            contentScope.lblManualOption.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            contentScope.lblManualOption.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            contentScope.flxManulaOption.accessibilityConfig = {
                "a11yLabel": this.view.formTemplate12.flxContentTCCenter.lblEndManually.text,
                "a11yARIA": {
                    "role": "radio",
                    "aria-checked": true,
                    "tabindex": 0
                }
            };
            contentScope.lblCustomOption.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            contentScope.lblCustomOption.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
             contentScope.flxCustomOption.accessibilityConfig = {
                "a11yLabel": this.view.formTemplate12.flxContentTCCenter.lblCustomDate.text,
                "a11yARIA": {
                    "role": "radio",
                    "aria-checked": false,
                    "tabindex": 0
                }
            };
            contentScope.flxManulaOption.setActive(true);
            contentScope.flxSelectEndDate.setVisibility(false);
        },
          /**
         * Method to set Responsive UI for Sweep Condition Input Flex Container
         */
        setSweepConditionUI: function() {
            //row1
            contentScope.lblPreCondition1.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                contentScope.flxCondition1.width = contentScope.lblPreCondition1.info.frame.x + contentScope.lblPreCondition1.info.frame.width + "px";
                contentScope.flxConditionAndAmount1.width = contentScope.lblPreCondition1.info.frame.x + contentScope.lblPreCondition1.info.frame.width + 10 + 180 + "px";
                this.checkAndReorderRow1();
            }.bind(this);
            contentScope.lblPostCondition1.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                this.checkAndReorderRow1();
            }.bind(this);
            contentScope.flxSweepCondition1.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                this.checkAndReorderRow1();
            }.bind(this);
            //row2
            contentScope.lblPreCondition2.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                contentScope.flxCondition2.width = contentScope.lblPreCondition2.info.frame.x + contentScope.lblPreCondition2.info.frame.width + "px";
                contentScope.flxConditionAndAmount2.width = contentScope.lblPreCondition2.info.frame.x + contentScope.lblPreCondition2.info.frame.width + 10 + 200 + "px";
                this.checkAndReorderRow2();
            }.bind(this);
            contentScope.lblPostCondition2.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                this.checkAndReorderRow2();
            }.bind(this);
            contentScope.flxSweepCondition2.doLayout = function(widgetRef) {
                this.updateWidgetInInfo(widgetRef);
                this.checkAndReorderRow2();
            }.bind(this);
        },
         /**
         * Method to set primary sweep accounts list in the segment dropdown
         */
        setPrimaryAccountsList: function() {
            this.setAccountsSegmentTemplateAndWidgetMap(contentScope.segPrimaryAccounts);
            this.filteredPrimaryAccounts = this.presenter.filteredAccounts;
            this.setData(this.filteredPrimaryAccounts, "Primary");
        },
         /**
         * Method to set secondary sweep accounts list in the segment dropdown
         */
        setSecondaryAccountsList: function() {
            this.setAccountsSegmentTemplateAndWidgetMap(contentScope.segSecondaryAccounts);
            this.filteredSecondaryAccounts = this.presenter.filteredAccounts;
            this.setData(this.filteredSecondaryAccounts, "Secondary");
        },
         /**
         * Method to set data into accounts segment
         * @param {object} filterData - it fetches the filtered accounts data
         * @param {String} type - Prinmary or secondary type account
         */
        setData: function(filterData, type) {
            this[type + "Records"] = filterData;
            //this.showLoadingIndicator(false, type);
            let data = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(filterData, type) : this.getDataWithSections(filterData, type);
            contentScope["seg" + type + "Accounts"].setData(data);
        },
        /**
         * Method to filter accounts based on search, selection and clear functionality.
         * @param { String}  fieldType - Primary or Secondary type account
         */
        filterAccounts: function(fieldType) {
            var searchText = contentScope["tbx" + fieldType + "Account"].text.toLowerCase();
            contentScope["flxClear" + fieldType + "Text"].setVisibility(true);
            if (searchText != "") {
                var result = [];
                var data = this[fieldType + "Records"];
                var result = data.filter(function(account) {
                    return CommonUtilities.substituteforIncludeMethod(account.nickName.toLowerCase(), searchText) || CommonUtilities.substituteforIncludeMethod(account.accountID, searchText)
                })
                if (!(result.length > 0)) {
                    contentScope["flx" + fieldType + "AccountSegment"].setVisibility(false);
                    contentScope["flxNo" + fieldType + "Records"].setVisibility(true);
                } else {
                    this.setData(result, fieldType)
                    contentScope["flx" + fieldType + "AccountSegment"].setVisibility(true);
                    contentScope["flxNo" + fieldType + "Records"].setVisibility(false);
                }
            } else {
                this[fieldType + "Selected"] = false;
                this["selected" + fieldType + "account"] = null;
                contentScope["flx" + fieldType + "AccountSegment"].setVisibility(true);
                contentScope["flxNo" + fieldType + "Records"].setVisibility(false);
                contentScope["flxClear" + fieldType + "Text"].setVisibility(false);
                contentScope["lbl" + fieldType + "RecordField"].text = "";
                contentScope["lbl" + fieldType + "RecordField1"].text = "";
                this.filterBasedonMemshipId(this["filtered" + fieldType + "Accounts"], fieldType);
                CommonUtilities.disableButton(contentScope.btnContinue);
            }
        },
         /**
         * Method to filter accounts based on Membership ID
         * @param {object} accounts - collection of accounts
         * @param {String} type - Primary or Secondary type account
         */
        filterBasedonMemshipId: function(accounts, type) {
            if (type === "Secondary" && this.selectedPrimaryaccount) {
                records = this.removeSelectedAccount(this.selectedPrimaryaccount, accounts);
                accounts = this.presenter.filterAccountsByMembershipId(this.selectedPrimaryaccount.Membership_id, records);
            }
            if (type === "Primary" && this.selectedSecondaryaccount) {
                records = this.removeSelectedAccount(this.selectedSecondaryaccount, accounts);
                accounts = this.presenter.filterAccountsByMembershipId(this.selectedSecondaryaccount.Membership_id, records);
            }
            this.setData(accounts, type)
        },
         /**
         * Method to set segment data and widget data mapping
         * @param {object} segWidget- accounts segment widget data
         */
        setAccountsSegmentTemplateAndWidgetMap: function(segWidget) {
            if (kony.application.getCurrentBreakpoint() === 640) {
                segWidget.sectionHeaderTemplate = "flxAccountSweepDropdownHeaderMobile";
                segWidget.rowTemplate = "flxAccountSweepDropdownListMobile";
            } else {
                segWidget.sectionHeaderTemplate = "flxAccountDropdownHeader";
                segWidget.rowTemplate = "flxAccountsDropdown";
            }
            segWidget.widgetDataMap = {
                "lblRecordType": "lblRecordType",
                "lblDropdownIcon": "lblDropdownIcon",
                "flxRecordFieldType": "flxRecordFieldType",
                "lblRecordField1": "lblRecordField1",
                "lblRecordField2": "lblRecordField2",
                "flxRecordFieldTypeIcon1": "flxRecordFieldTypeIcon1",
                "flxRecordFieldTypeIcon2": "flxRecordFieldTypeIcon2",
                "lblRecordFieldTypeIcon1": "lblRecordFieldTypeIcon1",
                "imgRecordFieldTypeIcon2": "imgRecordFieldTypeIcon2",
                "lblRecordField3": "lblRecordField3",
                "flxAccountsDropdown": "flxAccountsDropdown",
                "flxAccountsDropdownListMobile": "flxAccountsDropdownListMobile",
                "flxDropdownIcon": "flxDropdownIcon"
            };
        },
        /** 
        *create segment data with account type grouping
        *@param {object} accounts - collection of all accounts data
        *@param {String} typeOfTransfer - differentiate whether it is "Primary" or "Secondary" account transaction
        */
        getDataWithAccountTypeSections: function(accounts, typeOfTransfer) {
            var scopeObj = this;
            var finalData = {};
            accounts.forEach(function(account) {
                var accountType = account.accountType;
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentData(account, typeOfTransfer));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                            lblRecordType: {
                                text: accountType,
                                left: "10dp"
                            },
                            flxBottomSeparator: {
                                "isVisible": true
                            },
                            lblDropdownIcon: "P",
                            flxDropdownIcon: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context,typeOfTransfer);
                                }.bind(this),
                                "isVisible": true
                            },
                            template: "flxAccountDropdownHeader",
                        },
                        [scopeObj.createSegmentData(account, typeOfTransfer)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            for (var key in this.presenter.allowedAccountTypes) {
                var accountType = this.presenter.allowedAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        /**
         * creates segment with account numbers and other details with particular header values
         * @param accounts - fetches all accounts data
         * @param typeOfTransfer - differentiate whether it is "Primary" or "Secondary" account transaction
         */
        getDataWithSections: function(accounts, typeOfTransfer) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = ["Personal Accounts"];
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";
                var accountTypeIcon = "";
                var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
                if (account.isBusinessAccount === "false") {
                    if (primaryCustomerId.id === account.Membership_id && primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                        accountTypeIcon = "s";
                    } else {
                        accountType = account.Membership_id;
                        accountTypeIcon = "s";
                    }
                } else {
                    accountType = account.Membership_id;
                    accountTypeIcon = "r";
                }
                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account, typeOfTransfer));
                } else {
                    if (accountType != "Personal Accounts") {
                        prioritizeAccountTypes.push(accountType);
                    }
                    finalData[accountType] = [{
                            lblRecordType: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            flxBottomSeparator: {
                                "isVisible": true
                            },
                            lblDropdownIcon: "P",
                            flxDropdownIcon: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context, typeOfTransfer);
                                }.bind(this)
                            },
                            template: "flxAccountDropdownHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentData(account, typeOfTransfer)]
                    ];
                }
            });
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            return data;
        },
        /**
         *  creates the row template with account number and other details
         *  @param accounts - fetches all accounts data
         *  @param typeOfTransfer - differentiate whether it is "to" or "from" account transaction 
         */
        createSegmentData: function(account, typeOfTransfer) {
            var fromOrToAccountNumber = (typeOfTransfer === "Primary") ? account.fromAccountNumber : account.toAccountNumber;
            var fromOrToAccountName = (typeOfTransfer === "Secondary") ? account.fromAccountName : account.toAccountName;
            this.currencyCode = account.currencyCode;
            var dataObject = {
                "lblRecordField1": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : (kony.sdk.isNullOrUndefined(CommonUtilities.getAccountDisplayName(account)) ? CommonUtilities.getAccountDisplayName(account) : fromOrToAccountName),
                "lblRecordField2": (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId || fromOrToAccountNumber,
                "currencyCode": account.currencyCode,
                "accountName": account.accountName,
                "Membership_id": account.Membership_id,
                "lblRecordField3": {
                    "text": account.accountType,
                    "left": this.profileAccess === "both" ? "7px" : "20px",
                },
                "flxRecordFieldType": {
                    "left": this.profileAccess === "both" ? "15px" : "0px"
                },
                "flxRecordFieldTypeIcon1": {
                    "isVisible": this.profileAccess === "both" ? true : false
                },
                "lblRecordFieldTypeIcon1": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s"
                },
                "flxRecordFieldTypeIcon2": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                },
                "imgRecordFieldTypeIcon2": {
                    "src": "bank_icon_hdfc.png"
                },
                "flxBottomSeparator": {
                    "isVisible": true
                },
                "flxAccountListItem": {
                    "isVisible": true
                },
                "flxAccountsDropdown": {
                    "height": "76dp"
                }
            };
            return dataObject;
        },
        /**
         * It shows or hides the particular section 
         * @param typeOfTransfer - differentiate whether it is "to" or "from" account transaction 
         */
        showOrHideAccountRows: function(context, typeOfTransfer) {
            fromScroll = true;
            var section = contentScope["seg" + typeOfTransfer + "Accounts"].selectedRowIndex[0];
            var segData = contentScope["seg" + typeOfTransfer + "Accounts"].data;
            var isRowVisible = true;
            if (segData[section][0].lblDropdownIcon.text === "O") {
                segData[section][0]["lblDropdownIcon"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["lblDropdownIcon"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxAccountsDropdown = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsDropdown));
                flxAccountsDropdown["isVisible"] = isRowVisible;
                flxAccountsDropdown["height"] = isRowVisible ? "76dp" : "0dp";
                this.updateKeyAt("flxAccountsDropdown", flxAccountsDropdown, i, section, typeOfTransfer);
            }
            segData = contentScope["seg" + typeOfTransfer + "Accounts"].data;
            contentScope["seg" + typeOfTransfer + "Accounts"].setSectionAt(segData[section], section);
            this.setFromAccountsDropdownHeight(segData, typeOfTransfer);
        },
        /**
         * It updates the account row selected from the accounts dropdown
         * @param typeOfTransfer - differentiate whether it is "Primary" or "Secondary" account transaction
         */
        updateKeyAt: function(widgetName, value, row, section, typeOfTransfer) {
            var data = contentScope["seg" + typeOfTransfer + "Accounts"].data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            contentScope["seg" + typeOfTransfer + "Accounts"].setDataAt(rowDataTobeUpdated, row, section);
        },
        /**
         * It sets height for the Primary and secondary account dropdown
         * @param typeOfTransfer - differentiate whether it is "to" or "from" account transaction 
         */
        setFromAccountsDropdownHeight: function(data, typeOfTransfer) {
            var totalHeight = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i][1][0]["flxAccountsDropdown"].height !== "0dp") {
                    totalHeight += data[i][1].length * 76;
                }
            }
            if (totalHeight === 0) {
                totalHeight += data.length * 40;
            }
            contentScope["flx" + typeOfTransfer + "AccountSegment"].height = totalHeight >= 300 ? "300dp" : totalHeight + "dp";
        },
        updateWidgetInInfo: function(widgetRef) {
            widgetRef.info.frame = widgetRef.frame;
        },
         /**
         * It checks whether the selected account is removed or not
         * @param {String} selectedRecord - it takes the selected account record
         * @param {Object} accounts - it collects all the accounts data
         */
        removeSelectedAccount: function(selectedRecord, accounts) {
            if (selectedRecord) {
                return accounts.filter(function(account) {
                    return account.accountID != selectedRecord.accountID// && account.currencyCode === selectedRecord.currencyCode //currency check is removed as part of RIRB-8809
                })
            }
            return accounts;
        },
         /**
         * It sets data for the primary account textbox on selection
         */
        onPrimaryAccountSelection: function() {
            let selectedRecord = contentScope.segPrimaryAccounts.selectedRowItems[0];
			var sweeps = this.presenter.sweeps;
            var accNums = [];
			for (var i = 0; i < sweeps.length; i++) {
				accNums.push(sweeps[i].primaryAccountNumber);
			}
            if(accNums.indexOf(selectedRecord.accountID) !== -1){
               contentScope.lblSweepError.setVisibility(true);
			   contentScope.lblSweepError.text = kony.i18n.getLocalizedString("i18n.accountSweeps.sweepAlreadyExists");
			   contentScope.flxPrimaryAccountSegment.setVisibility(false);
			   this.toggleHeightofPopups();
			   return;
			}
			contentScope.lblSweepError.setVisibility(false);
	    this.toggleHeightofPopups();
            let records = this.removeSelectedAccount(selectedRecord, this.filteredSecondaryAccounts);
            let filteredRecords = this.presenter.filterAccountsByMembershipId(selectedRecord.Membership_id, records);
            this.selectedPrimaryaccount = selectedRecord;
            this.setData(filteredRecords, "Secondary");
            contentScope.flxClearPrimaryText.setVisibility(false);
            contentScope.tbxPrimaryAccount.setVisibility(false);
            contentScope.lblPrimaryRecordField.setVisibility(true);
            contentScope.lblPrimaryRecordField1.setVisibility(true);
            contentScope.tbxPrimaryAccount.text = selectedRecord.lblRecordField1 || "";
            contentScope.lblPrimaryRecordField.text = selectedRecord.lblRecordField1 || "";
            contentScope.lblPrimaryRecordField1.text = selectedRecord.lblRecordField2 || "";
            contentScope.flxPrimaryAccountSegment.setVisibility(false);
            contentScope.lblSelectedCurrencySymbol1.text = formatUtilManager.getCurrencySymbol(selectedRecord.currencyCode);
            contentScope.lblSelectedCurrencySymbol2.text = contentScope.lblSelectedCurrencySymbol1.text;
            this.PrimarySelected = true;
            this.enableOrDisableContinueButton();
        },
         /**
         * It sets data for the secondary account textbox on selection
         * @param {object} record - it collects the data of the particular row account
         */
        onSecondaryAccountSelection: function(record) {
            let selectedRecord = record.accountID ? record : contentScope.segSecondaryAccounts.selectedRowItems[0];
            let records = this.removeSelectedAccount(selectedRecord, this.filteredPrimaryAccounts);
            let filteredRecords = this.presenter.filterAccountsByMembershipId(selectedRecord.Membership_id, records);
            this.selectedSecondaryaccount = selectedRecord;
            this.setData(filteredRecords, "Primary");
            contentScope.flxClearSecondaryText.setVisibility(false);
            contentScope.tbxSecondaryAccount.setVisibility(false);
            contentScope.lblSecondaryRecordField.setVisibility(true);
            contentScope.lblSecondaryRecordField1.setVisibility(true);
            //contentScope.tbxSecondaryAccount.text = selectedRecord.lblRecordField1 || "";
            contentScope.lblSecondaryRecordField.text = selectedRecord.lblRecordField1 || "";
            contentScope.lblSecondaryRecordField1.text = selectedRecord.lblRecordField2 || "";
            contentScope.flxSecondaryAccountSegment.setVisibility(false);
            //contentScope.lblSelectedCurrencySymbol1.text = formatUtilManager.getCurrencySymbol(this.currencyCode);
            //contentScope.lblSelectedCurrencySymbol2.text = formatUtilManager.getCurrencySymbol(selectedRecord.currencyCode);
            this.SecondarySelected = true;
            this.enableOrDisableContinueButton();
        },
         /**
         * Method is used to enable or disable continue button
         */
        enableOrDisableContinueButton: function() {
            if (contentScope.tbxAmount1.text !== "" || contentScope.tbxAmount2.text !== "") {
                this.amountEntered = true;
            }
            if (this.PrimarySelected && this.SecondarySelected && this.checkboxSelected && this.amountEntered) {
                CommonUtilities.enableButton(contentScope.btnContinue)
            } else{
                CommonUtilities.disableButton(contentScope.btnContinue)
            }
        },
         /**
         * Method is used to expand or collapse in account segment
         * @param {String} fieldType - Primary or Secondary
         */
        toggleAccountsDropdown: function(fieldType) {
            contentScope["flxClear" + fieldType + "Text"].setVisibility(false);
            if (!(contentScope["flx" + fieldType + "AccountSegment"].isVisible) && !(contentScope["flxNo" + fieldType + "Records"].isVisible)) {
                contentScope["tbx" + fieldType + "Account"].setVisibility(true);
                contentScope["tbx" + fieldType + "Account"].setFocus(true);
                var segData = contentScope["seg" + fieldType + "Accounts"].data;
                if (segData.length != 0) {
                    contentScope["flx" + fieldType + "AccountSegment"].setVisibility(true);
                } else {
                    contentScope["flxNo" + fieldType + "Records"].setVisibility(true);
                }
                contentScope["lbl" + fieldType + "RecordField1"].setVisibility(false);
            } else {
                contentScope["flx" + fieldType + "AccountSegment"].setVisibility(false);
                contentScope["flxNo" + fieldType + "Records"].setVisibility(false);
            }
        },
         /**
         * Method is used to clear text in accounts textbox
         * @param {String} fieldType - Primary or Secondary
         */
        clearAccountTextboxTexts: function(fieldType) {
            this[fieldType + "Selected"] = false;
            contentScope["tbx" + fieldType + "Account"].text = "";
            contentScope["flxClear" + fieldType + "Text"].setVisibility(false);
            contentScope["flx" + fieldType + "AccountSegment"].setVisibility(true);
            contentScope["flxNo" + fieldType + "Records"].setVisibility(false);
            this.enableOrDisableContinueButton();
        },
         /**
         * Method is reset the UI for sweep below condition responsively
         * @return : NA
         */
        checkAndReorderRow1: function() {
            if (contentScope.lblPreCondition1.info.frame === undefined || contentScope.lblPostCondition1.info.frame === undefined || contentScope.flxSweepCondition1.info.frame === undefined) {
                return;
            }
            let checkAndTbxWidth = contentScope.lblPreCondition1.info.frame.x + contentScope.lblPreCondition1.info.frame.width + 10 + 300;
            let internalWidth = checkAndTbxWidth + 10 + contentScope.lblPostCondition1.info.frame.width;
            //-10 below is for right gutter space
            if (internalWidth > contentScope.flxSweepCondition1.info.frame.width - 10) {
                contentScope.flxSweepCondition1.layoutType = kony.flex.FLOW_VERTICAL;
                //-10 below is for right gutter space
                if (checkAndTbxWidth > contentScope.flxSweepCondition1.info.frame.width - 10) {
                    contentScope.flxConditionAndAmount1.layoutType = kony.flex.FLOW_VERTICAL;
                } else {
                    contentScope.flxConditionAndAmount1.layoutType = kony.flex.FLOW_HORIZONTAL;
                }
            } else {
                contentScope.flxSweepCondition1.layoutType = kony.flex.FLOW_HORIZONTAL;
            }
        },
         /**
         * Method is reset the UI for sweep above condition responsively
         * @return : NA
         */
        checkAndReorderRow2: function() {
            if (contentScope.lblPreCondition2.info.frame === undefined || contentScope.lblPostCondition2.info.frame === undefined || contentScope.flxSweepCondition2.info.frame === undefined) {
                return;
            }
            let checkAndTbxWidth = contentScope.lblPreCondition2.info.frame.x + contentScope.lblPreCondition2.info.frame.width + 10 + 300;
            let internalWidth = checkAndTbxWidth + 10 + contentScope.lblPostCondition2.info.frame.width;
            //-10 below is for right gutter space
            if (internalWidth > contentScope.flxSweepCondition2.info.frame.width - 10) {
                contentScope.flxSweepCondition2.layoutType = kony.flex.FLOW_VERTICAL;
                //-10 below is for right gutter space
                if (checkAndTbxWidth > contentScope.flxSweepCondition2.info.frame.width - 10) {
                    contentScope.flxConditionAndAmount2.layoutType = kony.flex.FLOW_VERTICAL;
                } else {
                    contentScope.flxConditionAndAmount2.layoutType = kony.flex.FLOW_HORIZONTAL;
                }
            } else {
                contentScope.flxSweepCondition2.layoutType = kony.flex.FLOW_HORIZONTAL;
            }
        },
         /**
         * Method to show server error in form 
         * @param {String} errorMsg - Error Message from server
         */
        showServerError: function(errorMsg) {
            this.view.formTemplate12.showBannerError({
                dbpErrMsg: errorMsg
            });
        },
        /**
         * Error thrown from catch block of form controller
         */
        onError: function(err) {
            kony.print(JSON.stringify(err));
        },
    };
});


