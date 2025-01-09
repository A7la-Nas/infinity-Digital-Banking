define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
    var responsiveUtils = new ResponsiveUtils();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("DisputeTransactionUIModule").presentationController;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
			this.flxMainCalculateHeight();
        },
        preShow: function() {
            // this.view.customheadernew.activateMenu("EUROTRANSFERS", "Manage Beneficiaries");
        },
        postShow: function() {
            var self = this;
            this.view.customheadernew.activateMenu("ACCOUNTS", "Disputed Transaction");
            this.flxMainCalculateHeight();
            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblDisputeTransactions.setActive(true);
            }
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxLogout.skin = "ICSknScrlFlx000000OP40";
        },
        onKeyPressCallBack: function(eventObject, eventPayload){
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setActive(true);
                }
            }
        },
        flxMainCalculateHeight: function() {
            let headerHeight = this.view.flxHeader.height;
            let footerHeight = this.view.flxFooter.height;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - headerHeight.substring(0, headerHeight.length - 2) - footerHeight.substring(0, footerHeight.length - 2) + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.disputedList) {
                this.showDisputedList(viewModel.disputedList);
            }
        },

        showCancelPopup: function(data) {
            var scopeObj = this;
            scopeObj.view.CustomPopupCancel.lblHeading.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.CancelDisputeTransaction");
            scopeObj.view.CustomPopupCancel.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.AreYouSureToCancelTheDisputeRequest");
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.presenter.cancelDisputeTransactionRequest(data);
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
        },

        setDataForMobileBreakpoint: function(viewModel) {
            var self = this;
            this.view.flxDisputeTransactionListHeader.setVisibility(false);
            var dataMap = {
                "flxDisputedTransactionsMobile": "flxDisputedTransactionsMobile",
                "flxIdentifier0": "flxIdentifier0",
                "flxIdentifier": "flxIdentifier",
                "flxSegDisputedTransactionRowWrapper": "flxSegDisputedTransactionRowWrapper",
                "flxSegDisputedTransactionRowWrappers": "flxSegDisputedTransactionRowWrappers",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
                "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
                "flxDetailVertical0": "flxDetailVertical0",
                "flxInfoVertical0": "flxInfoVertical0",
                "flxDetails": "flxDetails",
                "flxDropdown": "flxDropdown",
                "flxWrapper": "flxWrapper",
                "flxTransactionDescription": "flxTransactionDescription",
                "flxDate": "flxDate",
                "flxDescription": "flxDescription",
                "flxDisputeId": "flxDisputeId",
                "flxAmount": "flxAmount",
                "flxStatus": "flxStatus",
                "flxDetail": "flxDetail",
                "flxInformation": "flxInformation",
                "flxActions": "flxActions",
                "flxDetailHeader": "flxDetailHeader",
                "flxFrom": "flxFrom",
                "flxDateOfTransaction": "flxDateOfTransaction",
                "flxReasonForDispute": "flxReasonForDispute",
                "flxReferenceNumber": "flxReferenceNumber",
                "flxTo": "flxTo",
                "flxTransactionType": "flxTransactionType",
                "flxActionsWrapper": "flxActionsWrapper",
                "lblIdentifier0": "lblIdentifier0",
                "lblSeparator": "lblSeparator",
                "imgDropdown": "imgDropdown",
                "lblDate": "lblDate",
                "imgWarning": "imgWarning",
                "lblDescription": "lblDescription",
                "lblDisputeId": "lblDisputeId",
                "lblDisputeIdValue": "lblDisputeIdValue",
                "lblAmount": "lblAmount",
                "lblAmountValue": "lblAmountValue",
                "lblStatus": "lblStatus",
                "lblFrom": "lblFrom",
                "lblFromKey": "lblFromKey",
                "lblDateOfTransaction": "lblDateOfTransaction",
                "lblDateOfTransactionValue": "lblDateOfTransactionValue",
                "lblReasonForDispute": "lblReasonForDispute",
                "lblReasonValue": "lblReasonValue",
                "lblReferenceNumber": "lblReferenceNumber",
                "lblReferenceNoValue": "lblReferenceNoValue",
                "lblTo": "lblTo",
                "lblToKey": "lblToKey",
                "lblTransactionType": "lblTransactionType",
                "lblTypeValue": "lblTypeValue",
                "lblDescriptionKey": "lblDescriptionKey",
                "lblDescriptionValue": "lblDescriptionValue",
                "lblIssueHeader": "lblIssueHeader",
                "lblIssueValue": "lblIssueValue",
                "btnCancelRequest": "btnCancelRequest",
                "btnViewMessage": "btnViewMessage",
                "lblSeparatorLineAction2": "lblSeparatorLineAction2"
            };
            var segmentData = viewModel.data.map(function(dataItem) {
                return {
                    "lblDate":{
                        "text":CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate),
                        "accessibilityConfig": {
                            "a11yLabel": `Dispute transaction date ${CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate)}`,
                            "a11yARIA": {
                                "tabindex": -1,
                                "tagName":"span"
                            }
                        },
                    },
                    "lblDescription": dataItem.description,
                    "lblDisputeIdValue": dataItem.disputeId || dataItem.orderId,
                    "lblAmountValue": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false),
                    //"lblStatus": dataItem.statusDescription || dataItem.orderStatus,
                    "lblStatus": "Requested",
                    "lblDateOfTransactionValue": CommonUtilities.getFrontendDateString(dataItem.transactionDate),
                    "lblReasonValue": dataItem.disputeReason,
                    "lblFromValue": CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        nickName: dataItem.fromNickName,
                        Account_id: dataItem.fromAccountNumber
                    }),
                    "lblDescriptionValue": dataItem.disputeDescription ? dataItem.disputeDescription : kony.i18n.getLocalizedString("i18n.common.none"),
                    "lblReferenceNoValue": dataItem.transactionId,
                    "lblToValue": dataItem.toAccountName || dataItem.payPersonName || dataItem.payeeNickName || dataItem.payeeName,
                    "lblTypeValue": dataItem.transactionType,
                    "btnCancelRequest": {
                        "toolTip": kony.i18n.getLocalizedString("i18n.StopPayments.CANCELREQUEST"),
                        "onClick": self.onCancelRequest.bind(this, dataItem)
                    },
                    "btnViewMessage": {
                        "onClick": self.onSendMessage.bind(this, dataItem),
                        "isVisible": applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")
                    },
                    "template": "flxDisputedTransactionsMobile",
                    "flxDisputedTransactionsMobile": {
                        "height": "70dp"
                    },
                    "imgDropdown": {
                        "text": "O"
                    },
                    "flxIdentifier": {
                        "skin": "sknFlxIdentifier",
                        "isVisible": false
                    },
                    "lblIdentifier": {
                        "skin": "sknffffff15pxolbfonticons"
                    },
                    "lblDisputeId": kony.i18n.getLocalizedString("i18n.stopChecks.DisputeID:"),
                    "lblAmount": kony.i18n.getLocalizedString("i18n.ChequeManagement.Amount"),
                    "lblDateOfTransaction": kony.i18n.getLocalizedString("i18n.bulkWire.transactionDate"),
                    "lblReason": kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:"),
                    "lblFromAccount": kony.i18n.getLocalizedString("i18n.stopChecks.FromAccount:"),
                    "lblIssueHeader": kony.i18n.getLocalizedString("i18n.stopChecks.DisputeDescription"),
                    "lblReferenceNumber": kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:"),
                    "lblToTitle": kony.i18n.getLocalizedString("i18n.WireTransfers.ToAccount"),
                    "lblTransactionType": kony.i18n.getLocalizedString("i18n.stopChecks.TransactionType:"),
                    "flxDropdown":{
                        "onClick":self.showSelectedRowMB,
                        "accessibilityConfig": {
                            "a11yLabel": `Show more details for dispute Id ${dataItem.disputeId || dataItem.orderId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        },
                    },
                    "flxDetailVertical0":{
                        "isVisible" : false
                    },
                    "flxActions": {
                        "isVisible": false
                    }
                };
            });
            this.view.segDisputeTransactions.widgetDataMap = dataMap;
            this.view.segDisputeTransactions.setData(segmentData);
        },

        showSelectedRowMB: function() {
            var index = kony.application.getCurrentForm().segDisputeTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segDisputeTransactions.data;
            if (data[rowIndex].imgDropdown === "P") {
                data[rowIndex].imgDropdown = "O";
                data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
                data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                data[rowIndex].flxDisputedTransactionsMobile.skin = "sknflxffffffnoborder";
                data[rowIndex].flxDisputedTransactionsMobile.height = "70dp";                
                data[rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": `Show more details for dispute Id ${data[rowIndex].lblDisputeIdValue}`,
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };      
                data[rowIndex].btnViewMessage.accessibilityConfig = {
                    "a11yLabel": `Send Message for ${data[rowIndex].lblDisputeIdValue}`,
                    "a11yARIA": {
                        "role": "link",
                        "tabindex": -1
                    }
                };
                data[rowIndex].flxDetailVertical0.isVisible = false;
                data[rowIndex].flxActions.isVisible = false;
                kony.application.getCurrentForm().segDisputeTransactions.setDataAt(data[rowIndex], rowIndex);
            } else {
                for (i = 0; i < data.length; i++) {
                    if (i === rowIndex) {
                        data[i].imgDropdown = "P";
                        data[i].flxIdentifier.isVisible = true;
                        data[i].flxIdentifier.skin = "sknflx4a902";
                        data[i].lblIdentifier.skin = "sknLbl4a90e215px";
                        data[i].flxDisputedTransactionsMobile.height = "630dp";
                        data[i].flxDisputedTransactionsMobile.skin = "sknFlxfbfbfb";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Hide details for dispute Id ${data[i].lblDisputeIdValue}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": true
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for  ${data[i].lblDisputeIdValue}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": 0
                            }
                        };
                        data[i].flxDetailVertical0.isVisible = true;
                        data[i].flxActions.isVisible = true;
                    } else {
                        data[i].imgDropdown = "O";
                        data[i].flxIdentifier.isVisible = true;
                        data[i].flxIdentifier.skin = "sknFlxIdentifier";
                        data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                        data[i].flxDisputedTransactionsMobile.skin = "sknflxffffffnoborder";
                        data[i].flxDisputedTransactionsMobile.height = "70dp";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Show more details for dispute Id ${data[i].lblDisputeIdValue}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for ${data[i].lblDisputeIdValue}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": -1
                            }
                        };
                        data[i].flxDetailVertical0.isVisible = false;
                        data[i].flxActions.isVisible = false;
                    }
                }
                kony.application.getCurrentForm().segDisputeTransactions.setData(data);
            }
            kony.application.getCurrentForm().forceLayout();
            this.view.segDisputeTransactions.setActive(rowIndex,0,"flxDisputedTransactionsMobile.flxSelectedRowWrapper.flxSegDisputedTransactionRowWrapper.flxSegDisputedTransactionRowWrappers.flxWrapper.flxDropdown");
        },

        setDataForTabletBreakpoint: function(viewModel) {
            var self = this;
            var dataMap = {
                "flxDisputedTransactionsTablet": "flxDisputedTransactionsTablet",
                "flxIdentifier": "flxIdentifier",
                "flxSegDisputedTransactionRowWrapper": "flxSegDisputedTransactionRowWrapper",
                "flxSegDisputedTransactionRowWrappers": "flxSegDisputedTransactionRowWrappers",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
                "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
                "flxDetailVertical0": "flxDetailVertical0",
                "flxInfoVertical0": "flxInfoVertical0",
                "flxDetail": "flxDetail",
                "flxDropdown": "flxDropdown",
                "flxWrapper": "flxWrapper",
                "flxTransactionDescription": "flxTransactionDescription",
                "flxDate": "flxDate",
                "flxDescription": "flxDescription",
                "flxDisputeId": "flxDisputeId",
                "flxAmount": "flxAmount",
                "flxStatus": "flxStatus",
                "flxDetail": "flxDetail",
                "flxInformation": "flxInformation",
                "flxActions": "flxActions",
                "flxDetailHeader": "flxDetailHeader",
                "flxFromAccount": "flxFromAccount",
                "flxDateOfTransaction": "flxDateOfTransaction",
                "flxReasonForDispute": "flxReasonForDispute",
                "flxReferenceNumber": "flxReferenceNumber",
                "flxToAccount": "flxToAccount",
                "flxTransactionType": "flxTransactionType",
                "flxIssueDescription": "flxIssueDescription",
                "flxActionsWrapper": "flxActionsWrapper",
                "lblIdentifier": "lblIdentifier",
                "lblSeparator2": "lblSeparator2",
                "imgDropdown": "imgDropdown",
                "lblDate": "lblDate",
                "imgWarning": "imgWarning",
                "lblDescription": "lblDescription",
                "lblDisputeId": "lblDisputeId",
                "lblDisputeIdValue": "lblDisputeIdValue",
                "lblAmount": "lblAmount",
                "lblAmountValue": "lblAmountValue",
                "lblStatus": "lblStatus",
                "lblSeparator": "lblSeparator",
                "lblFromAccount": "lblFromAccount",
                "lblFromValue": "lblFromValue",
                "lblDateOfTransaction": "lblDateOfTransaction",
                "lblDateOfTransactionValue": "lblDateOfTransactionValue",
                "lblReasonForDispute": "lblReasonForDispute",
                "lblReasonValue": "lblReasonValue",
                "lblReferenceNumber": "lblReferenceNumber",
                "lblReferenceNoValue": "lblReferenceNoValue",
                "lblToTitle": "lblToTitle",
                "lblToValue": "lblToValue",
                "lblTransactionType": "lblTransactionType",
                "lblTypeValue": "lblTypeValue",
                "lblDescriptionKey": "lblDescriptionKey",
                "lblDescriptionValue": "lblDescriptionValue",
                "lblIssueHeader": "lblIssueHeader",
                "lblIssueValue": "lblIssueValue",
                "btnCancelRequest": "btnCancelRequest",
                "btnViewMessage": "btnViewMessage",
                "lblSeparatorLineAction2": "lblSeparatorLineAction2"
            };
            var segmentData = viewModel.data.map(function(dataItem) {
                return {
                    "lblDate": CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate),
                    "lblDescription": dataItem.description,
                    "lblDisputeId": dataItem.disputeId || dataItem.orderId,
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false),
                    //"lblStatus": dataItem.statusDescription || dataItem.orderStatus,
                    "lblStatus": "Requested",
                    "lblDateOfTransactionValue": CommonUtilities.getFrontendDateString(dataItem.transactionDate),
                    "lblReasonValue": dataItem.disputeReason,
                    "lblFromValue": CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        nickName: dataItem.fromNickName,
                        Account_id: dataItem.fromAccountNumber
                    }),
                    "lblIssueValue": dataItem.disputeDescription ? dataItem.disputeDescription : kony.i18n.getLocalizedString("i18n.common.none"),
                    "lblReferenceNoValue": dataItem.transactionId,
                    "lblToValue": dataItem.toAccountName || dataItem.payPersonName || dataItem.payeeNickName || dataItem.payeeName,
                    "lblTypeValue": dataItem.transactionType,
                    "btnCancelRequest": {
                        "toolTip": kony.i18n.getLocalizedString("i18n.StopPayments.CANCELREQUEST"),
                        "onClick": self.onCancelRequest.bind(this, dataItem)
                    },
                    "btnViewMessage": {
                        "onClick": self.onSendMessage.bind(this, dataItem),
                        "isVisible": applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")
                    },
                    "template": "flxDisputedTransactionsTablet",
                    "flxDisputedTransactionsTablet": {
                        "height": "42dp"
                    },
                    "imgDropdown": {
                        "text": "O"
                    },
                    "flxIdentifier": {
                        "skin": "sknFlxIdentifier",
                        "isVisible": false
                    },
                    "lblIdentifier": {
                        "skin": "sknffffff15pxolbfonticons"
                    },
                    "lblDateOfTransaction": kony.i18n.getLocalizedString("i18n.bulkWire.transactionDate"),
                    "lblReason": kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:"),
                    "lblFromAccount": kony.i18n.getLocalizedString("i18n.stopChecks.FromAccount:"),
                    "lblIssueHeader": kony.i18n.getLocalizedString("i18n.stopChecks.DisputeDescription"),
                    "lblReferenceNumber": kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:"),
                    "lblToTitle": kony.i18n.getLocalizedString("i18n.WireTransfers.ToAccount"),
                    "lblTransactionType": kony.i18n.getLocalizedString("i18n.stopChecks.TransactionType:"),
                    "flxDropdown":{
                        "onClick":self.showSelectedRowTablet,
                        "accessibilityConfig": {
                            "a11yLabel": `Show more details for dispute Id ${dataItem.disputeId || dataItem.orderId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        },
                    },
                    "flxDetail":{
                        "isVisible": false
                    }
                };
            });
            this.view.segDisputeTransactions.widgetDataMap = dataMap;
            this.view.segDisputeTransactions.setData(segmentData);
        },

        showSelectedRowTablet: function() {
            var index = kony.application.getCurrentForm().segDisputeTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segDisputeTransactions.data;
            if (data[rowIndex].imgDropdown === "P") {
                data[rowIndex].imgDropdown = "O";
                data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
                data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                data[rowIndex].flxDisputedTransactionsTablet.skin = "sknflxffffffnoborder";
                data[rowIndex].flxDisputedTransactionsTablet.height = "65dp";
                data[rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": `Show more details for dispute Id ${data[rowIndex].lblDisputeId}`,
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };      
                data[rowIndex].btnViewMessage.accessibilityConfig = {
                    "a11yLabel": `Send Message for ${data[rowIndex].lblDisputeId}`,
                    "a11yARIA": {
                        "role": "link",
                        "tabindex": -1
                    }
                };
                data[rowIndex].flxDetail.isVisible = false;
                data[rowIndex].flxIdentifier.isVisible = false;
                kony.application.getCurrentForm().segDisputeTransactions.setDataAt(data[rowIndex], rowIndex);
            } else {
                for (i = 0; i < data.length; i++) {
                    if (i === rowIndex) {
                        data[i].imgDropdown = "P";
                        data[i].flxIdentifier.isVisible = true;
                        data[i].flxIdentifier.skin = "sknflx4a902";
                        data[i].lblIdentifier.skin = "sknLbl4a90e215px";
                        data[i].flxDisputedTransactionsTablet.height = "275dp";
                        data[i].flxDisputedTransactionsTablet.skin = "sknFlxf7f7f7";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Hide details for dispute Id ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": true
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for  ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": 0
                            }
                        };
                        data[i].flxDetail.isVisible = true;
                    } else {
                        data[i].imgDropdown = "O";
                        data[i].flxIdentifier.isVisible = false;
                        data[i].flxIdentifier.skin = "sknFlxIdentifier";
                        data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                        data[i].flxDisputedTransactionsTablet.skin = "sknflxffffffnoborder";
                        data[i].flxDisputedTransactionsTablet.height = "65dp";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Show more details for dispute Id ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": -1
                            }
                        };
                        data[i].flxDetail.isVisible = false;
                    }
                }
                kony.application.getCurrentForm().segDisputeTransactions.setData(data);
            }
            kony.application.getCurrentForm().forceLayout();
            this.view.segDisputeTransactions.setActive(rowIndex,0,"flxDisputedTransactions.flxGroup1Parent.flxGroup2Parent.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
        },

        setDataForDesktopBreakpoint: function(viewModel) {
            var self = this;
            var dataMap = {
                "flxDisputedTransactions": "flxDisputedTransactions",
                "flxDisputedTransactionsMobile": "flxDisputedTransactionsMobile",
                "flxDisputedTransactionsTablet": "flxDisputedTransactionsTablet",
                "flxIdentifier0": "flxIdentifier0",
                "flxIdentifier": "flxIdentifier",
                "flxSegDisputedTransactionRowWrapper": "flxSegDisputedTransactionRowWrapper",
                "flxSelectedRowWrapper": "flxSelectedRowWrapper",
                "flxSegTransactionRowSavings": "flxSegTransactionRowSavings",
                "flxSegTransactionRowWrapper": "flxSegTransactionRowWrapper",
                "flxDropdown": "flxDropdown",
                "flxWrapper": "flxWrapper",
                "flxDate": "flxDate",
                "flxDescription": "flxDescription",
                "flxDisputeId": "flxDisputeId",
                "flxAmount": "flxAmount",
                "flxStatus": "flxStatus",
                "flxDetail": "flxDetail",
                "flxInformation": "flxInformation",
                "flxActions": "flxActions",
                "flxDetailHeader": "flxDetailHeader",
                "flxFromAccount": "flxFromAccount",
                "flxDateOfTransaction": "flxDateOfTransaction",
                "flxReason": "flxReason",
                "flxReferenceNumber": "flxReferenceNumber",
                "flxToAccount": "flxToAccount",
                "flxTransactionType": "flxTransactionType",
                "flxIssueDescription": "flxIssueDescription",
                "flxActionsWrapper": "flxActionsWrapper",
                "lblIdentifier": "lblIdentifier",
                "lblSeparator2": "lblSeparator2",
                "imgDropdown": "imgDropdown",
                "lblDate": "lblDate",
                "imgWarning": "imgWarning",
                "lblDescription": "lblDescription",
                "lblDisputeId": "lblDisputeId",
                "lblAmount": "lblAmount",
                "lblStatus": "lblStatus",
                "lblSeparator": "lblSeparator",
                "lblFromAccount": "lblFromAccount",
                "lblFromValue": "lblFromValue",
                "lblDateOfTransaction": "lblDateOfTransaction",
                "lblDateOfTransactionValue": "lblDateOfTransactionValue",
                "lblReason": "lblReason",
                "lblReasonValue": "lblReasonValue",
                "lblReferenceNumber": "lblReferenceNumber",
                "lblReferenceNoValue": "lblReferenceNoValue",
                "lblToTitle": "lblToTitle",
                "lblToValue": "lblToValue",
                "lblTransactionType": "lblTransactionType",
                "lblTypeValue": "lblTypeValue",
                "lblIssueHeader": "lblIssueHeader",
                "lblIssueValue": "lblIssueValue",
                "btnCancelRequest": "btnCancelRequest",
                "btnViewMessage": "btnViewMessage",
                "lblSeparatorActions": "lblSeparatorActions",
                "lblDate1": "lblDate1",
				"lblDescription1": "lblDescription1",
				"lblDisputeId1": "lblDisputeId1",
				"lblAmount1": "lblAmount1",
				"lblStatus1": "lblStatus1"
            };
            var segmentData = viewModel.data.map(function(dataItem) {
                return {
                    // "lblDate": CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate || "-"),
                   // "lblDescription": dataItem.description || "-",
                   // "lblDisputeId": dataItem.disputeId || dataItem.orderId || "-",
                   // "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false),
                    //"lblStatus": dataItem.statusDescription || dataItem.orderStatus || "-",
                   // "lblStatus": "Requested",
					// "lblDate": CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate || "-"),
					"lblDate": {
                        "text": CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate || "-"),
                        },
                        "lblDate1": {
                        "text": "Date" + " " + (CommonUtilities.getFrontendDateString(dataItem.disputeDate || dataItem.orderedDate || "-"))
                       },
                        
                       // "lblDescription": dataItem.description || "-",
                        "lblDescription": {
                        "text": dataItem.description || "-",
                        },
                        
                        "lblDescription1" : {
                        "text" : "Transaction Description" + " " + (dataItem.description || "-")
                       },
                        
                        "lblDisputeId": {
                           "text": dataItem.disputeId || dataItem.orderId || "-",
                       },
                       "lblDisputeId1" : {
                        "text" : (self.view.lblDisputeId.text) + " " + (dataItem.disputeId || dataItem.orderId || "-")
                       },
                       
                        "lblAmount": {
                        "text": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false),
                       },
                       "lblAmount1" : {
                        "text" : (self.view.lblAmount.text) + " " + (CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false))
                       },				   
                        "lblStatus": {
                        "text" : "Requested",
                       },
                       "lblStatus1": {
                        "text": (self.view.lblStatus.text) + " " + "Requested"
                       },
                    "lblDateOfTransactionValue": CommonUtilities.getFrontendDateString(dataItem.transactionDate),
                    "lblReasonValue": dataItem.disputeReason,
                    "lblFromValue": CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        nickName: dataItem.fromNickName,
                        Account_id: dataItem.fromAccountNumber
                    }),
                    "lblIssueValue": dataItem.disputeDescription ? dataItem.disputeDescription : kony.i18n.getLocalizedString("i18n.common.none"),
                    "lblReferenceNoValue": dataItem.transactionId || "-",
                    "lblToValue": dataItem.toAccountName || dataItem.payPersonName || dataItem.payeeNickName || dataItem.payeeName || "NA",
                    "lblTypeValue": dataItem.transactionType || "-",
                    "btnCancelRequest": {
                        "toolTip": kony.i18n.getLocalizedString("i18n.StopPayments.CANCELREQUEST"),
                        "onClick": self.onCancelRequest.bind(this, dataItem)
                    },
                    "btnViewMessage": {
                        "onClick": self.onSendMessage.bind(this, dataItem),
                        "isVisible": applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")
                    },
                    "template": "flxDisputedTransactions",
                    "flxDisputedTransactions": {
                        "height": "55dp"
                    },
                    "imgDropdown": {
                        "text": "O"
                    },
                    "flxIdentifier": {
                        "skin": "sknFlxIdentifier",
                        "isVisible": false
                    },
                    "lblIdentifier": {
                        "skin": "sknffffff15pxolbfonticons"
                    },
                    "lblDateOfTransaction": kony.i18n.getLocalizedString("i18n.bulkWire.transactionDate"),
                    "lblReason": kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:"),
                    "lblFromAccount": kony.i18n.getLocalizedString("i18n.stopChecks.FromAccount:"),
                    "lblIssueHeader": kony.i18n.getLocalizedString("i18n.stopChecks.DisputeDescription"),
                    "lblReferenceNumber": kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:"),
                    "lblToTitle": kony.i18n.getLocalizedString("i18n.WireTransfers.ToAccount"),
                    "lblTransactionType": kony.i18n.getLocalizedString("i18n.stopChecks.TransactionType:"),
                    "flxDropdown":{
                        "onClick" : self.showSelectedRow,
                        "accessibilityConfig": {
                            "a11yLabel": `Show more details for dispute Id ${dataItem.disputeId || dataItem.orderId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        },
                    },
                    "flxDetail":{
                        "isVisible": false
                    }
                };
            });
            this.view.segDisputeTransactions.widgetDataMap = dataMap;
            this.view.segDisputeTransactions.setData(segmentData);
        },

        showSelectedRow: function() {
            var index = kony.application.getCurrentForm().segDisputeTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segDisputeTransactions.data;
            if (data[rowIndex].imgDropdown === "P") {
                data[rowIndex].imgDropdown = "O";
                data[rowIndex].flxIdentifier.isVisible = false;
                data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
                data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                data[rowIndex].flxDisputedTransactions.skin = "sknflxffffffnoborder";
                data[rowIndex].flxDisputedTransactions.height = "55dp";                
                data[rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": `Show more details for dispute Id ${data[rowIndex].lblDisputeId}`,
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };      
                data[rowIndex].btnViewMessage.accessibilityConfig = {
                    "a11yLabel": `Send Message for ${data[rowIndex].lblDisputeId}`,
                    "a11yARIA": {
                        "role": "link",
                        "tabindex": -1
                    }
                };
                data[rowIndex].flxDetail.isVisible = false;
                kony.application.getCurrentForm().segDisputeTransactions.setDataAt(data[rowIndex], rowIndex);
            } else {
                for (i = 0; i < data.length; i++) {
                    if (i === rowIndex) {
                        data[i].imgDropdown = "P";
                        data[i].flxIdentifier.isVisible = true;
                        data[i].flxIdentifier.skin = "sknflx4a902";
                        data[i].lblIdentifier.skin = "sknLbl4a90e215px";
                        data[i].flxDisputedTransactions.height = "236dp";
                        data[i].flxDisputedTransactions.skin = "sknFlxfbfbfb";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Hide details for dispute Id ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": true
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for  ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": 0
                            }
                        };
                        data[i].flxDetail.isVisible = true;
                    } else {
                        data[i].imgDropdown = "O";
                        data[i].flxIdentifier.isVisible = false;
                        data[i].flxIdentifier.skin = "sknFlxIdentifier";
                        data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                        data[i].flxDisputedTransactions.skin = "sknflxffffffnoborder";
                        data[i].flxDisputedTransactions.height = "55dp";
                        data[i].flxDropdown.accessibilityConfig = {
                            "a11yLabel": `Show more details for dispute Id ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };  
                        data[i].btnViewMessage.accessibilityConfig = {
                            "a11yLabel": `Send Message for ${data[i].lblDisputeId}`,
                            "a11yARIA": {
                                "role": "link",
                                "tabindex": -1
                            }
                        };
                        data[i].flxDetail.isVisible = false;
                    }
                }
                kony.application.getCurrentForm().segDisputeTransactions.setData(data);
            }
            kony.application.getCurrentForm().forceLayout();
            this.view.segDisputeTransactions.setActive(rowIndex,0,"flxDisputedTransactions.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
        },

        showDisputedList: function(viewModel) {
            if (viewModel.data.length > 0) {
                this.view.flxNoPayment.setVisibility(false);
                this.view.flxDisputeTransactionListHeader.setVisibility(true);
                this.view.flxHorizontalLine2.setVisibility(true);
                this.view.flxSegmentContainer.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.setDataForMobileBreakpoint(viewModel);
                } else if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.setDataForTabletBreakpoint(viewModel);
                } else {
                    this.setDataForDesktopBreakpoint(viewModel);
                }
            } else {
                this.view.flxDisputeTransactionListHeader.setVisibility(false);
                this.view.flxHorizontalLine2.setVisibility(false);
                this.view.flxSegmentContainer.setVisibility(false);
                this.view.rtxNoPaymentMessage = kony.i18n.getLocalizedString("i18n.transfers.i18n.transfers.noDisputedTransactions");
                this.view.flxNoPayment.setVisibility(true);
            }
        },

        onCancelRequest: function(data) {
            this.showCancelPopup(data);
            // this.presenter.cancelDisputeTransactionRequest(data);
        },

        onSendMessage: function(data) {
            this.presenter.onSendMessageAction();
        }
    };
});
