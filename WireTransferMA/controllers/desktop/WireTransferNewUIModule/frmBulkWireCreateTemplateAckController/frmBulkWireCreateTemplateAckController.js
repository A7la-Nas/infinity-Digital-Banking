define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                    if (uiData.showLoadingIndicator) {
                        if (uiData.showLoadingIndicator.status === true) {
                            FormControllerUtility.showProgressBar(this.view)
                        } else {
                            FormControllerUtility.hideProgressBar(this.view)
                        }
                    }
                    if (uiData.createSuccess) {
                        this.createAckSuccess(uiData.createSuccess);
                    }
                }
                if (uiData.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
        },

        createAckSuccess: function(formData) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateAck"), accessibilityConfig);
            this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.createTemplateAck");
            CommonUtilities.setText(this.view.rtxDetail1, formData.bulkWireTemplateName, accessibilityConfig);
            var defaultCurrency = formData.defaultCurrency;
            switch (defaultCurrency) {
                case "USD":
                    defaultCurrency = "$ (USD)";
                    break;
                case "EUR":
                    defaultCurrency = "€ (EUR)";
                    break;
                case "INR":
                    defaultCurrency = "₹ (INR)";
                    break;
                case "GBP":
                    defaultCurrency = "£ (GBP)";
                    break;

            }
            CommonUtilities.setText(this.view.rtxDetail3, applicationManager.getFormatUtilManager().getCurrencySymbol(defaultCurrency), accessibilityConfig);
            CommonUtilities.setText(this.view.rtxDetail4, formData.noOfDomesticTransactions, accessibilityConfig);
            CommonUtilities.setText(this.view.rtxDetail5, formData.noOfInternationalTransactions, accessibilityConfig);
            CommonUtilities.setText(this.view.rtxDetail6, formData.noOfTransactions, accessibilityConfig);
            this.view.rtxDetail1.toolTip = formData.bulkWireTemplateName;
            this.view.rtxDetail3.toolTip = defaultCurrency;
            this.view.rtxDetail4.toolTip = formData.noOfDomesticTransactions + "";
            this.view.rtxDetail5.toolTip = formData.noOfInternationalTransactions + "";
            this.view.rtxDetail6.toolTip = formData.noOfTransactions + "";
            this.view.rtxDetail4.text = formData.noOfDomesticTransactions + "";
            this.view.rtxDetail5.text = formData.noOfInternationalTransactions + "";
            this.view.rtxDetail6.text = formData.noOfTransactions + "";
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                this.view.lblIcon.isVisible = applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false;
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName": "AccountsUIModule"});
                this.view.lblIcon.text = accountsModule.presentationController.fetchIsBusinessAccount(formData.defaultFromAccount) === "true" ? "r" : "s";
            }
            var accountObj = applicationManager.getAccountManager().getInternalAccountByID(formData.defaultFromAccount);
            var accountDisplayName = CommonUtilities.getAccountDisplayNameNew(accountObj);
            this.view.rtxDetail2.toolTip = accountDisplayName;
            CommonUtilities.setText(this.view.rtxDetail2, accountDisplayName, accessibilityConfig);
            this.view.btnMakeBulkTransfer.onClick = this.makeBulkTransfer.bind(this, formData.bulkWireTemplateName, formData.bulkWireTemplateID, formData.defaultCurrency, formData.defaultFromAccount);
            this.setPermissions(formData);
            this.view.btnAction.onClick = this.viewTemplateDetails.bind(this, formData);
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },


        setPermissions: function(data) {
            var domesticCount = data.noOfDomesticTransactions;
            var internationalCount = data.noOfInternationalTransactions;
            var isDomesticViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
            var isInternationalViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
            var isDomesticCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE]);
            var isInternationalCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE]);
            this.view.btnMakeBulkTransfer.setVisibility(false);
            if (domesticCount > 0 && internationalCount == "0") {
                if (isDomesticViewPermitted && isDomesticCreatePermitted) {
                    this.view.btnMakeBulkTransfer.setVisibility(true);
                }
            }
            if (internationalCount > 0 && domesticCount == "0") {
                if (isInternationalViewPermitted && isInternationalCreatePermitted) {
                    this.view.btnMakeBulkTransfer.setVisibility(true);
                }
            }
            if (internationalCount > 0 && domesticCount > 0) {
                if ((isDomesticViewPermitted && isDomesticCreatePermitted) || (isInternationalViewPermitted && isInternationalCreatePermitted)) {
                    this.view.btnMakeBulkTransfer.setVisibility(true);
                }
            }
            if (this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES])) {
                this.view.btnAction.setVisibility(true);
                this.view.btnViewAllTemplates.setVisibility(true);
            } else {
                this.view.btnAction.setVisibility(false);
                this.view.btnViewAllTemplates.setVisibility(false);
            }
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        makeBulkTransfer: function(filename, templateID, defaultCurrency, defaultFromAccount) {
            FormControllerUtility.showProgressBar(this.view);
            var params = {
                "bulkWireID": templateID,
                "bulkWireName": filename,
                "defaultCurrency": defaultCurrency,
                "defaultFromAccount": defaultFromAccount
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireEditRecipientTemplate(params);
        },

        viewTemplateDetails: function(templateData) {
            var params = {
                "bulkWireTemplateID": templateData.bulkWireTemplateID
            };
            FormControllerUtility.showProgressBar(this.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setBulkWireTemplateId(params);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setPrimaryDetails(templateData);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.fetchRecipientsByTemplateID(params, false);
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
        },

        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxMakeTransferError.setVisibility(false);
            } else {
                this.view.rtxError.text = status;
                this.view.rtxError.toolTip = status;
                this.view.flxMakeTransferError.setVisibility(true);
                this.view.flxMakeTransferError.setFocus(true);
            }
            this.view.forceLayout();
        },




        /**
         * Init Method 
         */

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.rtxMakeTransferError, kony.i18n.getLocalizedString("i18n.wireTemplate.templateCreateSuccess"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblConfirmHeaderMain, kony.i18n.getLocalizedString("i18n.wiretemplate.templatePrimaryDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail1, kony.i18n.getLocalizedString("i18n.wireTemplate.templateName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail2, kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail3, kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail4, kony.i18n.getLocalizedString("i18n.bulkwires.domesticrecipients"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail5, kony.i18n.getLocalizedString("i18n.bulkwires.internationalrecipients"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblDetail6, kony.i18n.getLocalizedString("i18n.bulkwires.totalreipients"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblReferenceNumHeader, kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnAction, kony.i18n.getLocalizedString("i18n.userManagement.viewMoreDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnViewAllTemplates, kony.i18n.getLocalizedString("i18n.wireTemplates.viewallTemplates"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnCreateAnotherTemplate, kony.i18n.getLocalizedString("i18n.wireTemplates.createAnotherTemplate"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnMakeBulkTransfer, kony.i18n.getLocalizedString("i18n.bulkWire.make"), accessibilityConfig);
            this.view.rtxMakeTransferError.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.templateCreateSuccess");
            this.view.lblConfirmHeaderMain.toolTip = kony.i18n.getLocalizedString("i18n.wiretemplate.templatePrimaryDetails");
            this.view.lblDetail1.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.templateCreateSuccess");
            this.view.lblDetail2.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.defFromAcc");
            this.view.lblDetail3.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.DefaultCurrency");
            this.view.lblDetail4.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.domesticrecipients");
            this.view.lblDetail5.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.internationalrecipients");
            this.view.lblDetail6.toolTip = kony.i18n.getLocalizedString("i18n.bulkwires.totalreipients");
            this.view.btnAction.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.viewMoreDetails");
            this.view.btnViewAllTemplates.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplates.viewallTemplates");
            this.view.btnCreateAnotherTemplate.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplates.createAnotherTemplate");
            this.view.btnMakeBulkTransfer.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.make");
            this.view.btnViewAllTemplates.onClick = function() {
                FormControllerUtility.showProgressBar(this.view)
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var params = {
                    "formName": "frmBulkTransferFiles",
                    "bulkWireCategoryFilter": "Templates"
                };
                wireTransferModule.presentationController.showBulkwirefiles(params);
            };
            this.view.btnCreateAnotherTemplate.onClick = function() {
                FormControllerUtility.showProgressBar(this.view)
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.navigateToCreateTemplateForm();
            };
        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            this.view.customheadernew.setDefaultHoverSkins();
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            var self = this;
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader']);
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }

        },

    };
});