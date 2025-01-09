define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'IBANUtils'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, IBANUtils) {
     
    var orientationHandler = new OrientationHandler();
    var exData;
    var edit;
    return {
        updateFormUI: function(context) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.data) {
                exData = context.data;
                edit = false;
                this.confirmAddRecipient(context.data, edit, OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC);
            }
            if (context.editData) {
                edit = true;
                this.confirmAddRecipient(context.editData, edit, OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC);
            }
            if (context.saveRecipientServerError) {
                this.showSaveRecipientServerError(context.saveRecipientServerError);
            }
            if (context.editRecipientSuccessMsg) {
                this.showEditRecipientSuccessMessage(context.editRecipientSuccessMsg);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("WIRE TRANSFER", "Add Recipient");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.btnMakeAnotherWireTransfer.onClick = this.showMakeTransferScreen.bind(this);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRecipientDetails', 'flxBankDetails']);
            this.view.flxContractsComponent.setVisibility(false);
			this.view.flxSeparator1.width = "96%";
        },
        editAnotherRecipient: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.showWireTransfer({
                landingPageView: "myRecipients"
            })
        },
        addAnotherRecipient: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.showWireTransferAddRecipientStep1({
                landingPageView: "addRecipient"
            })
        },
        showMakeTransferScreen: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.getMakeTransferRecipientList({
                searchString: this.view.rtxDetailsValue1.text
            });
        },
        showEditRecipientSuccessMessage: function(data) {
            var self = this;
            var scopeObj = this;
            this.view.flxStep2Buttons.setVisibility(false);
            this.view.flxSuccessMessage.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640  || orientationHandler.isMobile) {
              this.view.flxSuccessMessage.height= "150dp";
            }
            this.view.flxbuttons.setVisibility(true);
            this.view.lblRefrenceNumber.setVisibility(false);
            this.view.lblRefrenceNumberValue.setVisibility(false);
            this.view.btnSaveRecipient.setVisibility(false);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipientAcknowledgement");
            //this.view.lblConfirmHeader.text=kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            this.view.lblSuccessAcknowledgement.text = data.payeeNickName + " " + "has been edited successfully!";
            this.view.btnMakeAnotherWireTransfer.text = kony.i18n.getLocalizedString('i18n.WireTranfers.MakeAnotherWireTransfer');
            this.view.btnMakeAnotherWireTransfer.toolTip = kony.i18n.getLocalizedString('i18n.WireTranfers.MakeAnotherWireTransfer');
            this.view.btnViewSentTransactions.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditAnotherRecipient");
            this.view.btnViewSentTransactions.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.EditAnotherRecipient");
        },
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },


        /**
         * Save Recipient Server error
         * @param {object} viewModel Data from server
         */
        showSaveRecipientServerError: function(viewModel) {
            this.modifyAddRecipient(viewModel.type);
            this.showServerError(viewModel.errorMessage);
        },
        /**
         * Modify Add Recipient - Resets UI and takes back to Form - from confirm page
         * @param {type} type - Type of Recipient International / Domestic
         */
        modifyAddRecipient: function(type) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            // applicationManager.getNavigationManager().navigateTo("frmWireTransferAddKonyAccountStep1");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmWireTransferAddKonyAccountStep1": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },
        /**
         * Handle server error, shows serverFlex
         * @param {object} serverError error
         */
        showServerError: function(serverError) {
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.text = serverError;
        },
        /**
         * Return recipient address
         * @param {Payee} dataItem - Reciepient Object
         * @returns {string} Formatted Address of the payee
         */
        returnRecipientAddress: function(dataItem) {
            var strings = [dataItem.addressLine1, dataItem.addressLine2, dataItem.cityName, dataItem.state, dataItem.zipCode];
            var address = strings.filter(function(string) {
                if (string) {
                    return true;
                }
                return false;
            }).join(', ');
            return address;
        },
        //        
        /**
         * To return Bank Address
         * @param {Payee} payeeObject recipient list
         * @param {boolean} withName -to specify whether Address required with name or not
         * @returns {string} formatted address
         */
        returnBankAddress: function(payeeObject, withName) {
            var strings = [payeeObject.bankAddressLine1, payeeObject.bankAddressLine2, payeeObject.bankCity, payeeObject.bankState, payeeObject.bankZip];
            var address = strings.filter(function(string) {
                if (string) {
                    return true
                };
                return false;
            }).join(', ');
            if (withName) {
                address = [payeeObject.bankName, address].filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', ');
            }
            return address;
        },
        /**
         * Shows UI for add recipient Confirmation
         * @param {string} type Type of Recipient International/Domestic
         */
        showAddRecipientConfirmUI: function(type) {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxRecipientDetails']);
            // this.resetUI();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.view.flxConfirmDetails.setVisibility(true);
            this.view.flxHeader.setFocus(true);
            this.view.lblConfirmHeader.text = kony.i18n.getLocalizedString('i18n.wiretransfers.confirmDetails');
            this.view.flxTransactionDetails.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxRow4.setVisibility(false);
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxSeparator.setVisibility(false);
            this.view.flxRow2.setVisibility(false);
            this.view.flxRow4.setVisibility(false);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 1366 || currBreakpoint === 1380) {
                this.view.flxRecipientDetails.info.frame.height = this.view.flxBankDetails.info.frame.height;
            } else if(currBreakpoint === 1024 ) {
                this.view.flxRecipientDetails.height = "190dp";
                this.view.flxBankDetails.height = "190dp";
            }
        },
        /**
         * Shows data forconfirmation UI
         * @param {Object}  data of add recipient form
         * @param {string}  type of recipient 'domestic'/'international'   
         * @param {function} [onCancel] Optional Listener for cancel
         * @param {function} [onSave] Optional Listener for on save
         * @param {boolean}  disableModify If modify needs to be disabled
         * @returns {void} - None
         */
        confirmAddRecipient: function(data, edit, type, onCancel, onSave, disableModify) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (edit) {
                this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipientAcknowledgement");
                this.view.btnViewSentTransactions.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditAnotherRecipient");
                this.view.btnViewSentTransactions.onClick = this.editAnotherRecipient.bind(this);
            } else {
                this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipientAcknowledgement");
                this.view.btnViewSentTransactions.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddAnotherRecipient");
                this.view.btnViewSentTransactions.onClick = this.addAnotherRecipient.bind(this);
            }
            //recipient details
            this.showAddRecipientConfirmUI(type);
            this.view.lblSuccessAcknowledgement.text = data.payeeNickName + " " + "has been added succesfully!";
            this.view.lblRefrenceNumberValue.text = data.payeeId;
            this.view.lblDetailsKey1.text = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName") + " :";
            this.view.rtxDetailsValue1.text = data.payeeName;
            this.view.lblDetailsKey2.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientType') + " :";
            this.view.rtxDetailsValue2.text = data.type;
            this.view.lblDetailsKey3.text = kony.i18n.getLocalizedString('i18n.transfers.accountType') + " :";
            this.view.rtxDetailsValue3.text = type;
            this.view.lblDetailsKey4.text = kony.i18n.getLocalizedString('i18n.WireTransfer.RecipientAddress') + " :";
            this.view.rtxDetailsValue4.text = this.returnRecipientAddress(data)
            //bank details
            this.view.lblBankDetailsKey3.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientAccountNumber') + " :";
            this.view.rtxBankDetailsValue3.text = data.accountNumber || data.payeeAccountNumber;
            this.view.lblBankDetailsKey5.text = kony.i18n.getLocalizedString('i18n.transfers.accountNickName') + " :";
            this.view.rtxBankDetailsValue5.text = data.payeeNickName;
            this.view.lblBankDetailsKey6.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientBank&Address') + " :";
            this.view.rtxBankDetailsValue6.text = data.bankAddressLine1;
            this.view.rtxBankDetailsValue6.text = this.returnBankAddress(data, true);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblIcon.setVisibility(false);
                this.view.lblIcon.text = data.isBusinessPayee === "1" ? "r" : "s";
            } else {
                this.view.lblIcon.setVisibility(false);
            }
            //location specific bank details
            if (type === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                this.view.lblBankDetailsKey1.text = kony.i18n.getLocalizedString('i18n.accounts.routingNumber') + " :";
                this.view.rtxBankDetailsValue1.text = data.routingCode;
            } else if (type === OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL) {
                if (IBANUtils.isCountrySupportsIBAN(data.country)) {
                    this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString('i18n.Accounts.IBAN');
                    this.view.rtxBankDetailsValue2.text = data.IBAN
                } else {
                    this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString('i18n.WireTransfer.internationalRoutingCode') + " :";
                    this.view.rtxBankDetailsValue2.text = data.internationalRoutingCode
                }
                this.view.lblBankDetailsKey1.text = kony.i18n.getLocalizedString('i18n.accounts.swiftCode') + " :";
                this.view.rtxBankDetailsValue1.text = data.swiftCode;
            }

            if (data.cifSegData && data.cifSegData.length > 0) {
                this.view.flxContractsComponent.setVisibility(true);
              	this.view.flxSeparator1.width = "100%";
                this.view.screenConfirm.setAckScreenContractsData(data.cifSegData);
            } else {
                this.view.flxContractsComponent.setVisibility(false);
              	this.view.flxSeparator1.width = "96%";
            }
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 1024  || orientationHandler.isTablet) {
                this.view.flxFooter.top = "700dp";
            }
        },

    };
});