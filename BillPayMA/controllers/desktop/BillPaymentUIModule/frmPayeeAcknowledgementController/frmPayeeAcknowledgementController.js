define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        profileAccess: "",
        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.initActions();
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
        },
        preShow: function() {
            var scope = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Add Payee");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
           // this.view.btnViewAllPayees.toolTip = kony.i18n.getLocalizedString("i18n.payments.viewAllPayees");
           // this.view.btnMakeBillPay.toolTip = kony.i18n.getLocalizedString("i18n.payments.makeABillPayment");
          //  this.view.btnSetDefaultBillPayAccnt.toolTip = kony.i18n.getLocalizedString("i18n.payments.makeABillPayment");
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scope.view.lblAddPayee.setActive(true);
            };
            this.view.onKeyPress=this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            //this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.setAccessibility();
        },
        setAccessibility: function () {
            if (kony.application.getCurrentBreakpoint() > 1024) {
                var segData = this.view.screenConfirm.segContracts.data;
                var widgetMap = this.view.screenConfirm.segContracts.widgetDataMap;
                widgetMap["lblColumn1Accessibility"] = "lblColumn1Accessibility";
                widgetMap["lblColumn2Accessibility"] = "lblColumn2Accessibility";
                widgetMap["lblColumn3Accessibility"] = "lblColumn3Accessibility";
                this.view.screenConfirm.segContracts.widgetDataMap = widgetMap;
                for (var i = 0; i < segData.length; i++) {
                    segData[i][0].lblColumn1Accessibility = this.view.screenConfirm.lblColumn1.text + " " + segData[i][0].lblColumn1.text;
                    segData[i][0].lblColumn2Accessibility = this.view.screenConfirm.lblColumn2.text + " " + segData[i][0].lblColumn2.text;
                    segData[i][0].lblColumn3Accessibility = this.view.screenConfirm.lblColumn3.text + " " + segData[i][0].lblColumn3.text;
                }
                this.view.screenConfirm.segContracts.setData(segData);
            }
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
            }
			this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            },

        initActions: function() {
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            //this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            //this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        /** updates the present Form based on required function.
         * @param {list} viewModel used to load a view
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.payeeSuccessDetails) {
                this.prePopulateAcknowledgementDetails(viewModel.payeeSuccessDetails);
            }

            if (viewModel.updatePayeeSuccess) {
                this.setAckScreenForModifyPayee(viewModel.updatePayeeSuccess, viewModel.segManagePayeeData)
            }
        },
        /**
         * used to show the acknowledgement screen with prepopulated
         * @param {object} model response details
         */
        prePopulateAcknowledgementDetails: function(model) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
          
			scopeObj.view.lblHeaderPayeeDetails.text = kony.i18n.getLocalizedString("i18n.AddPayee.payeedetails");
            if (this.profileAccess === "both") {
                this.view.flxBillerValUser.setVisibility(false);
                this.view.lblBillerValUser.setVisibility(true);
                this.view.lblBillerValUser.text = model.isBusinessPayee === "1" ? "r" : "s";
            } else {
                this.view.flxBillerValUser.setVisibility(false);
                this.view.lblBillerValUser.setVisibility(false);
            }
            CommonUtilities.setText(scopeObj.view.lblAcknowledgementMessage, "‘" + model.billerName + "’ " + kony.i18n.getLocalizedString("i18n.common.HasBeenAddedSuccessfully"), CommonUtilities.getaccessibilityConfig());

            scopeObj.view.lblBillerKey.text = kony.i18n.getLocalizedString("i18n.AddPayee.SelectedPayee");
            CommonUtilities.setText(scopeObj.view.lblBillerVal, model.billerName, CommonUtilities.getaccessibilityConfig());

            scopeObj.view.lblDetailsAddressKey.text = kony.i18n.getLocalizedString("i18n.billpay.payeeAddress");
            scopeObj.view.rtxDetailsAddressVal.text = model.billerAddress;

            scopeObj.view.lblAccNumberKey.text = kony.i18n.getLocalizedString("i18n.AddPayee.payeeaccountnumber");
            if (model.accountNumber === "") {
                CommonUtilities.setText(scopeObj.view.rtxAccNumberVal, kony.i18n.getLocalizedString("i18n.common.NotAvailable"), CommonUtilities.getaccessibilityConfig());
            } else {
                CommonUtilities.setText(scopeObj.view.rtxAccNumberVal, model.accountNumber, CommonUtilities.getaccessibilityConfig());
            }

            scopeObj.view.lblDetailsNickKey.text = kony.i18n.getLocalizedString("i18n.billPay.BillerNickName");
            CommonUtilities.setText(scopeObj.view.lblDetailsNickVal, model.payeeNickName, CommonUtilities.getaccessibilityConfig());

            scopeObj.view.lblDetailsNOBkey.text = kony.i18n.getLocalizedString("i18n.AddPayee.Nameasonthebill");
            CommonUtilities.setText(scopeObj.view.lblDetailsNOBVal, model.nameOnBill, CommonUtilities.getaccessibilityConfig());

            if(model.state){
                scopeObj.view.flxDetailsState.setVisibility(true);
                scopeObj.view.lblDetailsStateValue.text = model.state;
            } else{
                scopeObj.view.flxDetailsState.setVisibility(false);
            }
            
            scopeObj.view.btnMakeBillPay.onClick = function() {
                scopeObj.presenter.makePayment();
            };
            scopeObj.view.btnViewAllPayees.onClick = function() {
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    "loadBills": true
                });
            };

            if (model.cifSegData && model.cifSegData.length > 0) {
                this.view.flxContractsComponent.setVisibility(true);
                this.view.screenConfirm.setAckScreenContractsData(model.cifSegData);
                this.view.screenConfirm.flxHorizontalLine1.setVisibility(false);
            } else {
                this.view.flxContractsComponent.setVisibility(false);
            }
            this.view.lblAddPayee.text = kony.i18n.getLocalizedString("infinity.addPayeeAcknowledgementHeader");
          	this.view.lblRefrenceNumber.text = kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber");
          	this.view.lblRefrenceNumberValue.text = model.payeeId;
            this.view.forceLayout();
        },
        /**
         * used to show the permission based UI
         */
        showBillPaymentOption: function() {
            this.view.btnMakeBillPay.setVisibility(true);
            this.view.btnViewAllPayees.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideBillPaymentOption: function() {
            this.view.btnMakeBillPay.setVisibility(false);
            this.view.btnViewAllPayees.setVisibility(false);
        },

        setAckScreenForModifyPayee: function(payeeDetails, segData) {
            var scopeObj = this;
			this.view.lblHeaderPayeeDetails.text = kony.i18n.getLocalizedString("i18n.transfers.accountDetails");
            if (this.profileAccess === "both") {
                this.view.flxBillerValUser.setVisibility(false);
                this.view.lblBillerValUser.setVisibility(true);
                this.view.lblBillerValUser.text = payeeDetails.isBusinessPayee === "1" ? "r" : "s";
            } else {
                this.view.flxBillerValUser.setVisibility(false);
                this.view.lblBillerValUser.setVisibility(false);
            }
            this.view.lblAddPayee.text = kony.i18n.getLocalizedString("infinity.editPayeeAcknowledgementHeader");
            // this.view.lblAddPayee.text = "Edit Biller-Acknowledgement";
            this.view.lblAcknowledgementMessage.text = "‘" + payeeDetails.payeeNickName + "’ " + kony.i18n.getLocalizedString("i18n.TransfersEur.HasBeenSuccessfullyUpdated");

            this.view.lblBillerKey.text = kony.i18n.getLocalizedString("i18n.billPay.PayeeNickName");
            this.view.lblBillerVal.text = payeeDetails.payeeNickName;

            // account numner
            this.view.lblDetailsAddressKey.text = kony.i18n.getLocalizedString("i18n.AddPayee.payeeaccountnumber");
            this.view.rtxDetailsAddressVal.text = payeeDetails.accountNumber;

            // address 
            this.view.lblAccNumberKey.text = kony.i18n.getLocalizedString("i18n.billpay.payeeAddress");
            this.view.rtxAccNumberVal.text = payeeDetails.addressLine1 + payeeDetails.addressLine2;

            this.view.lblDetailsNickKey.text = kony.i18n.getLocalizedString("i18n.common.city");
            this.view.lblDetailsNickVal.text = payeeDetails.cityName;

            //State
            if(payeeDetails.state){
                this.view.flxDetailsState.setVisibility(true);
                this.view.lblDetailsStateValue.text = payeeDetails.state;
            } else{
                this.view.flxDetailsState.setVisibility(false);
            }

            this.view.lblDetailsNOBkey.text = kony.i18n.getLocalizedString("i18n.common.zipcode");
            this.view.lblDetailsNOBVal.text = payeeDetails.zipCode;

            this.view.btnViewAllPayees.text = kony.i18n.getLocalizedString("i18n.BillPay.backToManagePayee");
            // this.view.btnViewAllPayees.text = "Back to Manage Payee";
            this.view.btnMakeBillPay.text = kony.i18n.getLocalizedString("i18n.hamburger.payABill");
            // this.view.btnMakeBillPay.skin = "sknBtnffffffBorder0273e31pxRadius2px";

            this.view.btnMakeBillPay.onClick = function() {
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    "loadBills": true
                });
            };
            this.view.btnViewAllPayees.onClick = function () {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params: {
                        "refreshComponent": true
                    },
                    callbackModelConfig: {
                        managePayees: true
                    }
                });
            }.bind(this);

            if (segData && segData.length > 0) {
                this.view.flxContractsComponent.setVisibility(true);
               // this.view.screenConfirm.setConfirmScreenContractsData(segData);
			 // this.view.screenConfirm.flxHorizontalLine1.setVisibility(false);
            } else {
                this.view.flxContractsComponent.setVisibility(false);
            }


            this.view.forceLayout();
        }

    };
});