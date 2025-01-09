define(["FormControllerUtility", "commonUtilities", "OLBConstants"], function (FormControllerUtility, commonUtilities, OLBConstants) {
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let contentScope;
    let sweepData;
    return {
        /**
         * Sets the initial actions for form
         */
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate12.onError = this.onError;
            this.initFormActions();
        },
        /**
         * @api : onBreakpointChange
         *This function for changing the UI depending upon breakpoint
         * @return : NA
         */
        onBreakpointChange: function (form, width) {
            if (width === 640) {
                this.view.formTemplate12.pageTitleVisibility = false;
                this.view.formTemplate12.pageTitle = "Create Sweep-Confirmation";
            } else {
                this.view.formTemplate12.pageTitleVisibility = true; 
                this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.accountSweeps.createSweepConfirmation");
            }
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function () {
            contentScope.flxBoth.setVisibility(false);
            contentScope.rtxCondition.skin = "bbSknRtx424242SSP15px";
            this.view.title="Create Sweep-Confirmation";
           
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
            
           

        },
       
        /**
         * Method to initialise form actions
         */
        initFormActions: function () {
            this.presenter = applicationManager.getModulesPresentationController({
                appName: 'AccountSweepsMA',
                moduleName: 'AccountSweepsUIModule'
            });
            contentScope = this.view.formTemplate12.flxContentTCCenter;
            formatUtilManager = applicationManager.getFormatUtilManager();
            contentScope.btnCancel.onClick = this.customPopup;
            contentScope.btnModify.onClick = this.modifyScreen;
            contentScope.btnSumbit.onClick = this.createSweep;
        },
        /**
         * @api : customPopup
         * Triggerd on click of cancel 
         * @return : NA
         */
        customPopup: function () {
            var scope = this;
            var cancelPopupContext = {
                heading: kony.i18n.getLocalizedString("i18n.konybb.common.cancel"),
                popupsetActive : function(){
                    scope.view.formTemplate12.flxContentTCCenter.btnCancel.setActive(true);
                },
                closea11yLabel:"Close this Popup",
                yesa11yLabel:"Yes, Cancel Create Sweep Process",
                noa11yLabel:"No, Don't Cancel Create Sweep Process",
                message:"Are you sure you want to cancel create sweep process?",
                yesClick: function () {
                    if(sweepData.isEdit){ 
                        scope.presenter.showSweepScreen({
                            context: "AcccountSweep"
                        });
                    }
                    else{
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "AccountsUIModule",
                            "appName": "HomepageMA"
                        });
                        accountsModule.presentationController.showAccountsDashboard();
                    }
                },
            };
            this.view.formTemplate12.setPopup(cancelPopupContext);
        },
        /**
         * @api : createSweep
         * Triggerd on click of sumbit 
         * @return : NA
         */
        createSweep: function () {
            let payload = {};
            let sweepcondition = {};
            this.presenter.isModify = false;
            payload.primaryAccountNumber = sweepData.primaryAccountNumber;
            payload.secondaryAccountNumber = sweepData.secondaryAccountNumber;
            payload.secondaryAccountName = sweepData.secondaryAccountName;
            payload.primaryAccountName = sweepData.primaryAccountName;
            payload.startDate = sweepData.startDate;
            payload.endDate = sweepData.endDate === kony.i18n.getLocalizedString("i18n.accountsweeps.endManually") ? "" : sweepData.endDate;
            payload.frequency = sweepData.frequency;
            payload.currencyCode = sweepData.currencyCode;
            payload.belowSweepAmount = sweepData.belowSweepAmount;
            payload.aboveSweepAmount = sweepData.aboveSweepAmount;
            sweepcondition.rtxCondition = contentScope.rtxCondition.text;
            sweepcondition.content1 = contentScope.rtxSweepCondAbove.text;
            sweepcondition.content2 = contentScope.rtxSweepCond.text;
            sweepcondition.visibility = contentScope.flxBoth.isVisible;
            sweepData.sweepcondition = sweepcondition;
            if (sweepData.isEdit) {
                payload.previousSecondaryAccountNumber = sweepData.previousSecondaryAccountNumber;
                this.presenter.editSweep(payload, sweepData)
            } else {
                this.presenter.createSweep(payload, sweepData);
            }
        },
        /**
         * @api : modifyScreen
         * Triggerd on click of modify 
         * @return : NA
         */
        modifyScreen: function () {
            this.presenter.isModify = true;
            sweepData.isModify = true;
            this.presenter.showSweepScreen({
                context: "createSweep"
            }, sweepData);
        },
        /**
         * Method to update the UI
         * @param {Collection} viewModel List of view properities and keys
         */
        updateUI: function (viewModel) {
            if (viewModel.isEdit === true) this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.accountSweeps.editSweepConfirmation");
            contentScope.lblValue1.text = viewModel.formattedprimaryAccountNumber;
            contentScope.lblValue2.text = viewModel.formattedsecondaryAccountNumber;
            var amountBelow = viewModel.formattedcurrencyCode + viewModel.belowSweepAmount;
            var amountAbove = viewModel.formattedcurrencyCode + viewModel.aboveSweepAmount;
            contentScope.lblValue3.text = viewModel.sweepType;
            contentScope.lblValue4.text = viewModel.frequency;
            contentScope.lblValue5.text = viewModel.startDate;
            contentScope.lblValue6.text = viewModel.endDate;
            if (viewModel.sweepType === "Both") {
                contentScope.rtxCondition.text = "If the balance in " + contentScope.lblValue1.text + ":";
                contentScope.rtxSweepCondAbove.text = " goes <b>above " + amountAbove + "</b> then <b>transfer excess</b> amount to " + contentScope.lblValue2.text;
                contentScope.rtxSweepCond.text = " goes <b>below " + amountBelow + "</b> then <b>topup </b>from " + contentScope.lblValue2.text;
                contentScope.flxBoth.setVisibility(true);
            } else if (viewModel.sweepType === "Above") {
                contentScope.rtxCondition.text = "If the balance in " + contentScope.lblValue1.text + " goes <b>above " + amountAbove + "</b> then <b>transfer excess</b> amount to " + contentScope.lblValue2.text;
            } else {
                contentScope.rtxCondition.text = "If the balance in " + contentScope.lblValue1.text + " goes <b>below " + amountBelow + "</b> then <b>topup </b>from " + contentScope.lblValue2.text;
            }
            this.view.forceLayout();
        },
        /**
         * Entry point method for the form controller
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            }
            if (viewModel.confirmDetails) {
                sweepData = viewModel.confirmDetails;
                this.updateUI(viewModel.confirmDetails);
            }
        },
        /**
         * Method to show server error in form 
         * @param {String} errorMsg - Error Message from server
         */
        showServerError: function (errorMsg) {
            this.view.formTemplate12.showBannerError({
                dbpErrMsg: errorMsg
            });
        },
        /**
         * Error thrown from catch block of form controller
         */
        onError: function (err) {
            kony.print(JSON.stringify(err));
        },
    };
});