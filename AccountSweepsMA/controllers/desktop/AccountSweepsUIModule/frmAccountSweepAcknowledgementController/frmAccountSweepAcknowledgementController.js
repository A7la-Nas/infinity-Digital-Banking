define(["FormControllerUtility", "commonUtilities", "OLBConstants"], function (FormControllerUtility, commonUtilities, OLBConstants) {
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let contentScopeRight; 
    let sweepData;
    return {
        /**
         * Sets the initial actions for form
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate66.onError = this.onError;
            this.initFormActions();
        },
        /**
         * @api : onBreakpointChange
         *This function for changing the UI depending upon breakpoint
         * @return : NA
         */
        onBreakpointChange: function(form, width) {
            if (width === 640) {
                this.view.formTemplate66.pageTitleVisibility = false;
                this.view.formTemplate66.pageTitle = "Create Sweep-Acknowledgement"
            } else {
                this.view.formTemplate66.pageTitleVisibility = true;
                this.view.formTemplate66.pageTitle = "Create Sweep-Acknowledgement"
            }
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function() {
            this.view.title="Create Sweep-Acknowledgement";
            contentScopeRight.flxRightContainer.doLayout = this.setHeight;
            this.view.formTemplate66.hideBannerError();
            contentScopeRight.btnViewRules.setVisibility(this.presenter.checkUserPermission('ACCOUNT_SWEEP_VIEW'));
            contentScopeRight.btnCreateRule.setVisibility(this.presenter.checkUserPermission('ACCOUNT_SWEEP_CREATE'));
            
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * Method to initialise form actions
         */
        initFormActions: function() {
            this.presenter = applicationManager.getModulesPresentationController({
                appName: 'AccountSweepsMA',
                moduleName: 'AccountSweepsUIModule'
            });
            contentScopeRight = this.view.formTemplate66.flxContentTCRight;
            contentScopeLeft = this.view.formTemplate66.flxContentTCLeft
            formatUtilManager = applicationManager.getFormatUtilManager();
            contentScopeRight.btnViewRules.onClick = this.viewDetials;
            contentScopeRight.btnCreateRule.onClick = this.createNewSweep;
            this.view.formTemplate66.flxTCButtons.btnDownload.onClick = this.downloadSweep;
            this.view.formTemplate66.flxTCButtons.btnPrint.onClick = this.printSweep;
        },
        /**
         * @api : setHeight
         * Triggerd on doLayout 
         *This function for set the Height of left section
         *@param {source widget} srcWid List of view properities
         * @return : NA
         */
        setHeight: function(srcWid) {
            if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                contentScopeLeft.flxLeftContainer.height = "300dp"
            } else {
                contentScopeLeft.flxLeftContainer.height = srcWid.frame.height + "dp";
            }
        },
        /**
         * @api : createNewSweep
         * Triggerd on click of createRule 
         * @return : NA
         */
        createNewSweep: function() {
            this.presenter.isFlowFromAcknowledgment = true;
            this.presenter.showSweepScreen({
                context: "createSweep"
            });
        },
        /**
         * @api : downloadSweep
         * Triggerd on touchEnd of download
         * @return : NA
         */
        downloadSweep: function(){
            this.presenter.downloadSweep(sweepData.payload);
        },
        /**
         * @api : printSweep
         * Triggerd on touchEnd of print 
         * @return : NA
         */
        printSweep: function(){
            this.presenter.printSweep(sweepData)
        },
        /**
         * @api : viewDetails
         * Triggerd on click of viewRules 
         * @return : NA
         */
        viewDetials: function() {
            this.presenter.isFlowFromAcknowledgment = true;
            this.presenter.showSweepScreen({
                context: "AcccountSweep"
            });
        },
        /**
         * Method to update the UI
         * @param {Collection} viewModel List of view properities and keys
         */
        updateUI: function(viewModel) {
            if (viewModel.isEdit === true) {
                this.view.formTemplate66.pageTitle = "Create New Sweep-Acknowledgement"
                contentScopeLeft.lblStatus.text = kony.i18n.getLocalizedString("i18n.accountSweeps.editSweep");
            }
            contentScopeRight.lblValue1.text = viewModel.formattedprimaryAccountNumber;
            contentScopeRight.lblValue2.text = viewModel.formattedsecondaryAccountNumber;
            contentScopeRight.lblValue3.text = viewModel.sweepType;
            contentScopeRight.lblValue4.text = viewModel.frequency;
            contentScopeRight.lblValue5.text = viewModel.startDate;
            contentScopeRight.lblValue6.text = viewModel.endDate;
            if(!this.presenter.isEmptyNullOrUndefined(viewModel.confirmationNumber)){
                contentScopeLeft.flxReferenceNumber.setVisibility(true);
                contentScopeLeft.lblReferenceNumberValue.text = viewModel.confirmationNumber;
            }else{
                contentScopeLeft.flxReferenceNumber.setVisibility(false);
            }
            contentScopeRight.rtxCondition.text = viewModel.sweepcondition.rtxCondition;
            contentScopeRight.rtxSweepCondAbove.text = viewModel.sweepcondition.content1;
            contentScopeRight.rtxSweepCond.text = viewModel.sweepcondition.content2;
            contentScopeRight.flxBoth.setVisibility(viewModel.sweepcondition.visibility);
            if (viewModel.sweepType === "Both") {
                contentScopeLeft.minheight = "494px";
            } 
            contentScopeLeft.forceLayout();
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
                this.showServerError(viewModel.serverError);
            }
            if (viewModel.sweeps) {
                sweepData = viewModel.sweeps;
                this.updateUI(viewModel.sweeps)
            }
        },
        /**
         * Method to show server error in form 
         * @param {String} errorMsg - Error Message from server
         */
        showServerError: function(errorMsg) {
            this.view.formTemplate66.showBannerError({
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
