/**
 * Description of Module representing a Confirm form.
 * @module frmBillPayScheduledController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function (CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {

    var orientationHandler = new OrientationHandler();
    return /** @alias module:frmBillPayScheduledController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        profileAccess: "",
        updateFormUI: function (uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.scheduledBills && uiDataMap.sortingInputs) {
                this.bindScheduleBills(uiDataMap.scheduledBills);
                this.initializeSearchAndFilterActions(uiDataMap.scheduledBills);
                FormControllerUtility.updateSortFlex(this.scheduledSortMap, uiDataMap.sortingInputs);
                this.setAccessibilityConfigForSorting(uiDataMap.sortingInputs);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            }
            if (uiDataMap.billDueData) {
                this.bindTotalEbillAmountDue(uiDataMap.billDueData);
            }
        },
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
        },
        preShow: function () {
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.isScheduledTab = true;
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function () {
            var scopeObj = this;
            scopeObj.setScheduledSorting();
            scopeObj.setTabActions();
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function () {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblTransactions.setActive(true);
            };
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxViewEbillContainer.doLayout = CommonUtilities.centerPopupFlex;
            this.view.btnBypass.onClick = function () {
                scopeObj.view.flxAddPayee.setActive(true);
            }.bind();
            this.view.CustomPopupCancel.flxCross.accessibilityConfig = {
                "a11yLabel": `Close this pop-up`,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            }
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxCancelPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.flxViewEbillPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.flxDialogs.isModalContainer = true;
        },

        setAccessibilityConfigForSorting: function (sortingInputs) {
            var scope = this, widgetMapping = {
                "scheduledDate": {
                    "widgetName": "flxScheduledDateWrapper",
                    "uiMapping": this.view.lblScheduledDate.text
                },
                "nickName": {
                    "widgetName": "flxScheduledPayeeWrapper",
                    "uiMapping": this.view.lblPayee.text
                },
                "billDueAmount": {
                    "widgetName": "flxBillAmountWrapper",
                    "uiMapping": this.view.lblBillAMount.text
                },
                "amount": {
                    "widgetName": "flxScheduledAmountWrapper",
                    "uiMapping": this.view.lblScheduledAmount.text
                }
            };
            this.scheduledSortMap.forEach((element) => {
                if (element.imageFlx.src === "sorting.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. No sort applied. Click to sort in Ascending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
                else if (element.imageFlx.src === "sorting_previous.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. Sorted in Ascending order. Click to Sort in Descending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
                else if (element.imageFlx.src === "sorting_next.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. Sorted in Descending order. Click to Sort in Ascending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
            });
            if (scope.isScheduledTab) {
                scope.isScheduledTab = false
               // scope.view.btnScheduled.setActive(true);
            }
            else {
                scope.view[widgetMapping[sortingInputs.sortBy].widgetName].setActive(true);
            }
        },

        onKeyPressCallBack: function (eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.accountTypesBillPaySchedule.isVisible) {
                    scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                    if (scopeObj.view.accountTypesBillPaySchedule.isVisible) {
                        scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": `View Details`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                    }
                }
                else if (scopeObj.view.flxViewEbillPopup.isVisible) {
                    scopeObj.view.flxViewEbillPopup.setVisibility(false);
                    scopeObj.view.flxDialogs.setVisibility(false);
                    if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                        kony.application.getCurrentForm().segmentBillpay.setActive(
                            this.rowIndex,
                            0,
                            "flxBillPaymentScheduledSelectedMobile.flxBottom.btnEbill");
                    }
                    else {
                        kony.application.getCurrentForm().segmentBillpay.setActive(
                            this.rowIndex,
                            0,
                            "flxBillPaymentScheduledSelected.flxBottom.flxEdit.btnEbill");
                    }
                }
                else if (scopeObj.view.flxCancelPopup.isVisible) {
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.flxCancelPopup.setVisibility(false);
                    if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                        kony.application.getCurrentForm().segmentBillpay.setActive(
                            this.rowIndex,
                            0,
                            scopeObj.widgetId === "btnCancel" ? "flxBillPaymentScheduledSelectedMobile.flxEdit.btnCancel" : "flxBillPaymentScheduledSelected.flxEdit.btnCancelSeries");
                    }
                    else {
                        kony.application.getCurrentForm().segmentBillpay.setActive(
                            this.rowIndex,
                            0,
                            scopeObj.widgetId === "btnCancel" ? "flxBillPaymentScheduledSelected.flxBottom.flxEdit.btnCancel" : "flxBillPaymentScheduledSelected.flxBottom.flxRow2.btnCancelSeries");
                    }
                }
                else if (scopeObj.view.flxLogout.isVisible) {
                    scopeObj.view.flxDialogs.isVisible = false;
                    scopeObj.view.flxLogout.setVisibility(false);
                    scopeObj.view.customheadernew.btnLogout.setActive(true);
                }
            }
            else if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (scopeObj.view.accountTypesBillPaySchedule.isVisible) {
                        scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": `View Details`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                    }
                }
            }
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function () {
            let widgets = [
                [this.view.txtSearch, this.view.flxtxtSearchandClearbtn]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
         * used to load the  due payements
         * @param {object} dueBills due bills
         */
        bindTotalEbillAmountDue: function (dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(true);
                CommonUtilities.setText(scopeObj.view.lblBills, dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEbillAmountDueValue, scopeObj.formatAmount(String(dueBills.totalDueAmount)), CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
        },

        /**
         * sorting configurations to billPay
         */
        setScheduledSorting: function () {
            var scopeObj = this;
            scopeObj.scheduledSortMap = [{
                name: 'scheduledDate',
                imageFlx: scopeObj.view.imgSortDate,
                clickContainer: scopeObj.view.flxScheduledDateWrapper
            },
            {
                name: 'nickName',
                imageFlx: scopeObj.view.imgPayeeSort,
                clickContainer: scopeObj.view.flxScheduledPayeeWrapper
            },
            {
                name: 'billDueAmount',
                imageFlx: scopeObj.view.imgBillPaySort,
                clickContainer: scopeObj.view.flxBillAmountWrapper
            },
            {
                name: 'amount',
                imageFlx: scopeObj.view.imgSchedledAmountSort,
                clickContainer: scopeObj.view.flxScheduledAmountWrapper
            },
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.scheduledSortMap, scopeObj.onScheduledSortClickHandler, scopeObj);
        },

        /**
         * used to bind schedule Bills
         * @param {object} scheduledBills scheduled bills
         */
        bindScheduleBills: function (scheduledBills) {
            var scopeObj = this;
            scopeObj.view.flxNoPayment.setVisibility(false);
            scopeObj.view.flxSegmentContainer.setVisibility(true);
            scopeObj.view.flxHorizontalLine.setVisibility(true);
            scopeObj.view.flxHorizontalLine2.setVisibility(true);
            //if(configurationManager.isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                scopeObj.view.flxScheduledSearch.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    scopeObj.view.flxFiltersList.setVisibility(false);
                    scopeObj.view.flxtxtSearchandClearbtn.right = "3.5%";
                }
            } else {
                scopeObj.view.flxScheduledSearch.setVisibility(false);
            }
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.flxBillPayScheduled.setVisibility(false);
            } else {
                scopeObj.view.flxBillPayScheduled.setVisibility(true);
            }
            if (scheduledBills.length === 0) {
                scopeObj.showNoPayementDetails({
                    noPaymentMessageI18Key: "i18n.billPay.noPaymentScheduleMessage",
                    showActionMessageI18Key: "i18n.billPay.ScheduleAPayment"
                });
                this.view.flxScheduledSearch.setVisibility(false);
            } else {
                var dataMap = {
                    "lblIdentifier": "lblIdentifier",
                    "lblSeperatorone": "lblSeperatorone",
                    "lblSeparator": "lblSeparator",
                    "lblDropdown": "lblDropdown",
                    "flxDropdown": "flxDropdown",
                    "lblDate": "lblDate",
                    "lblDateA": "lblDateA",
                    "lblPayeeName": "lblPayeeName",
                    "lblPayeeNameA": "lblPayeeNameA",
                    "lblBillDueAmount": "lblBillDueAmount",
                    "lblBillDueAmountA": "lblBillDueAmountA",
                    "lblPaidAmount": "lblPaidAmount",
                    "lblPaidAmountA": "lblPaidAmountA",
                    "btnEdit": "btnEdit",
                    "lblRefrenceNumber": "lblRefrenceNumber",
                    "lblRefrenceNumberValue": "lblRefrenceNumberValue",
                    "lblSentFrom": "lblSentFrom",
                    "lblSentFromValue": "lblSentFromValue",
                    "lblNotes": "lblNotes",
                    "lblNotesValue": "lblNotesValue",
                    "btnCancel": "btnCancel",
                    "btnEbill": "btnEbill",
                    "flxCombinedEbill": "flxCombinedEbill",
                    "btnCombinedEbill": "btnCombinedEbill",
                    "flxRecurrenceNumber": "flxRecurrenceNumber",
                    "lblRecurrenceNo": "lblRecurrenceNo",
                    "lblRecurrenceNoValue": "lblRecurrenceNoValue",
                    "flxFrequency": "flxFrequency",
                    "lblFrequencyTitle": "lblFrequencyTitle",
                    "lblFrequencyValue": "lblFrequencyValue",
                    "flxCancelSeries": "flxCancelSeries",
                    "btnCancelSeries": "btnCancelSeries",
                    "flxIdentifier": "flxIdentifier",
                    "flxBillPaymentScheduledSelected": "flxBillPaymentScheduledSelected",
                    "flxBillPaymentScheduledSelectedMobile": "flxBillPaymentScheduledSelectedMobile",
                    "lblIcon": "lblIcon",
                    "lblFromIcon": "lblFromIcon",
                    "flxPayeeIcon": "flxPayeeIcon",
                    "flxFromIcon": "flxFromIcon",
                    "flxEdit": "flxEdit",
                    "flxAction": "flxAction",
                    "flxPaidAmount": "flxPaidAmount",
                    "flxBottom": "flxBottom"
                };
                scheduledBills = scheduledBills.map(function (dataItem) {
                    dataItem.payeeName = dataItem.payeeNickName || dataItem.payeeName;
                    dataItem.paidAmount = dataItem.amount;
                    dataItem.notes = dataItem.transactionsNotes || "";
                    dataItem.referenceNumber = dataItem.referenceId;
                    dataItem.lastPaidAmount = dataItem.billPaidAmount;
                    dataItem.lastPaidDate = dataItem.billPaidDate;
                    dataItem.eBillStatus = dataItem.eBillEnable;
                    dataItem.billDueDate = dataItem.billDueDate;
                    dataItem.dueAmount = scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency));
                    dataItem.payeeNickname = dataItem.payeeName;
                    dataItem.sendOn = dataItem.scheduledDate;
                    dataItem.isScheduleEditFlow = true;
                    var dataObject = {
                        "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                        "flxDropdown": {
                            onClick: scopeObj.handleSegmentRowView.bind(scopeObj),
                            accessibilityConfig: {
                                "a11yLabel": `Show more details for bill with reference number ${dataItem.referenceNumber}`,
                                "a11yARIA": {
                                    "role": "button",
                                    "tabindex": 0,
                                    "aria-expanded": false
                                }
                            }
                        },
                        "lblSeparatorBottom": {
                            "text": " "
                        },
                        "lblIdentifier": {
                            "text": " ",
                            "skin": "sknffffff15pxolbfonticons"
                        },
                        "flxIdentifier": {
                            "skin": "sknFlxIdentifier"
                        },
                        "flxBillPaymentScheduledSelected": {
                            "height": "80dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxBillPaymentScheduledSelectedMobile": {
                            "height": "80dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "flxEdit": {
                            "isVisible": false
                        },
                        "lblDateA": {
                            "text": scopeObj.view.lblScheduledDate.text+" "+scopeObj.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS"),
                            "accessibilityConfig": {
                                "a11yLabel": scopeObj.view.lblScheduledDate.text+" "+scopeObj.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS")
                            }
                        },
                        "lblDate": {
                            "text": scopeObj.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS"),
                            "accessibilityConfig ": {
                                "a11yHidden": true
                            }
                        },
                        "lblPayeeName": {
                            "text": dataItem.payeeName,
                            "accessibilityConfig ": {
                                "a11yHidden": true
                            }
                        },
						"lblPayeeNameA": {
                            "text": scopeObj.view.lblPayee.text+" "+dataItem.payeeName,
                            "accessibilityConfig": {
                                "a11yLabel": scopeObj.view.lblPayee.text+" "+dataItem.payeeName
                            }
                        },
                        "lblBillDueAmount": {
                            "text": scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                            "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "" : "0px",
                            "right": CommonUtilities.isMirrorLayoutEnabled() ? "78px" : "",
                        },
						 "lblBillDueAmountA": {
                            "text": scopeObj.view.lblBillAMount.text+" "+scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                            "accessibilityConfig": {
                                "a11yLabel": scopeObj.view.lblBillAMount.text+" "+scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency))
                            },
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "" : "0px",
                            "right": CommonUtilities.isMirrorLayoutEnabled() ? "78px" : "",
                        },
                        "lblPaidAmount": {
                            "text": scopeObj.formatAmount(dataItem.paidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                            "accessibilityConfig ": {
                                "a11yHidden": true
                            },
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "12px" : "72px",
                        },
						"lblPaidAmountA": {
                            "text": scopeObj.view.lblScheduledAmount.text+" "+scopeObj.formatAmount(dataItem.paidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                            "accessibilityConfig": {
                                "a11yLabel": scopeObj.view.lblScheduledAmount.text+" "+scopeObj.formatAmount(dataItem.paidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency))
                            },
                            "left": CommonUtilities.isMirrorLayoutEnabled() ? "12px" : "72px",
                        },
                        "btnEdit": {
                            "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                            "onClick": function () {
                                dataItem.onCancel = function () {
                                    kony.mvc.getNavigationManager().navigate({
                                        context: this,
                                        callbackModelConfig: {
                                            scheduled: true
                                        }
                                    });
                                };
                                scopeObj.presenter.showBillPaymentScreen({
                                    "sender": null,
                                    "context": 'PayABill',
                                    "loadBills": true,
                                    "data": dataItem
                                });
                            },
                            "accessibilityConfig": {
                                "a11yLabel": `Edit the transaction with reference number ${dataItem.referenceNumber}`,
                                "a11yARIA": {
                                    "role": "link",
                                    "tabindex": 0
                                }
                            },
                            "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
                        },
                        "lblSeparator": "A",
                        "lblSeperatorone": "A",
                        "lblRefrenceNumber": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber"),
                            "accessibilityConfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.RefrenceNumber")
                            }
                        },
                        "lblRefrenceNumberValue": {
                            "text": dataItem.referenceNumber,
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.referenceNumber
                            }
                        },
                        "lblSentFrom": kony.i18n.getLocalizedString("i18n.billPay.sentFrom"),
                        "lblSentFromValue": {
                            "text": CommonUtilities.getAccountDisplayName({
                                name: dataItem.fromAccountName,
                                accountID: dataItem.fromAccountNumber,
                                nickName: dataItem.fromNickName,
                                Account_id: dataItem.fromAccountNumber
                            }),
                            "accessibilityConfig": {
                                "a11yLabel": CommonUtilities.getAccountDisplayName({
                                    name: dataItem.fromAccountName,
                                    accountID: dataItem.fromAccountNumber,
                                    nickName: dataItem.fromNickName,
                                    Account_id: dataItem.fromAccountNumber
                                })
                            }
                        },
                        "lblNotes": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.Description"),
                            "accessibilityConfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.Description")
                            }
                        },
                        "lblNotesValue": {
                            "text": dataItem.notes ? dataItem.notes : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.notes ? dataItem.notes : kony.i18n.getLocalizedString("i18n.common.none")
                            }
                        },
                        "lblFrequencyTitle": {
                            "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),
                            "accessibilityConfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),
                            }
                        },
                        "lblFrequencyValue": {
                            "text": dataItem.frequencyType ? dataItem.frequencyType : kony.i18n.getLocalizedString("i18n.common.none"),
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.frequencyType ? dataItem.frequencyType : kony.i18n.getLocalizedString("i18n.common.none")
                            }
                        },
                        "flxRecurrenceNumber": {
                            "isVisible": dataItem.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? false : true
                        },
                        "lblRecurrenceNo": {
                            "text": kony.i18n.getLocalizedString("i18n.accounts.recurrence"),
                            "accessibilityConfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.recurrence"),
                            }
                        },
                        "lblRecurrenceNoValue": {
                            "text": dataItem.recurrenceDesc ? dataItem.recurrenceDesc : "-",
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.recurrenceDesc ? dataItem.recurrenceDesc : "-"
                            }
                        },
                        "btnCancel": {
                            "text": dataItem.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? kony.i18n.getLocalizedString("i18n.transfers.Cancel") : kony.i18n.getLocalizedString("i18n.common.cancelThisOccurrence"),
                            "onClick": function (eventPayload, segInfo) {
                                scopeObj.btnCancelOnClick(segInfo, dataItem);
                            }.bind(this),
                            "isVisible": CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE"),
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? `Cancel this transaction with reference number ${dataItem.referenceNumber}` : `Cancel this transaction occurance with reference number ${dataItem.referenceNumber}`,
                                "a11yARIA": {
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        },
                        "btnCancelSeries": {
                            "text": kony.i18n.getLocalizedString("i18n.common.cancelSeries"),
                            "onClick": function (eventPayload, segInfo) {
                                scopeObj.btnCancelSeriesOnClick(segInfo, dataItem);
                            }.bind(this),
                            "isVisible": dataItem.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? false : (CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")),
                            "accessibilityConfig": {
                                "a11yLabel": `Cancel this transaction series with reference number ${dataItem.referenceNumber}`,
                                "a11yARIA": {
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        },
                        "lblIcon": {
                            "text": dataItem.isBusinessPayee === "1" ? "r" : "s",
                            // "isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                            "isVisible": this.profileAccess === "both" ? true : false
                        },
                        "lblFromIcon": {
                            "text": scopeObj.presenter.isBusinessAccount(dataItem.fromAccountNumber) === "true" ? "r" : "s",
                            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                            "isVisible": scopeObj.profileAccess === "both" ? true : false
                        },
                        "flxPayeeIcon": {
                            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                            "isVisible": false //this.profileAccess === "both" ? true : false
                        },
                        "flxFromIcon": {
                            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                            "isVisible": scopeObj.profileAccess === "both" ? true : false
                        },
                        "btnEbill": {
                            "text": dataItem.eBillStatus == 1 ? kony.i18n.getLocalizedString("i18n.billPay.viewEBill") : '',
                            "onClick": function (eventPayload, segInfo) {
                                scopeObj.btnViewEbillOnClick(segInfo, dataItem);
                            }.bind(this),
                            //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ?((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile === true) ? false : (CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES"))) :(CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES"))
                            "isVisible": this.profileAccess === "both" ? ((kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile === true) ? false : (CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES"))) : (CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES")),
                            "accessibilityConfig": {
                                "a11yLabel": `View this transaction ebill with reference number ${dataItem.referenceNumber}`,
                                "a11yARIA": {
                                    "role": "button",
                                    "tabindex": 0
                                }
                            }
                        },
                        "flxCombinedEbill": {
                            //"isVisible" : (applicationManager.getConfigurationManager().isCombinedUser === "true" && (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile === true)) 	? true : false
                            "isVisible": (this.profileAccess === "both" && (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile === true)) ? true : false
                        },
                        "btnCombinedEbill": {
                            "text": dataItem.eBillStatus == 1 ? kony.i18n.getLocalizedString("i18n.billPay.viewEBill") : '',
                            "onClick": dataItem.eBillStatus == 1 ? scopeObj.viewEBill.bind(scopeObj, {
                                "billGeneratedDate": scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS"),
                                "amount": scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                                "ebillURL": dataItem.ebillURL
                            }) : null,
                            "isVisible": (CommonUtilities.isCSRMode() ? true : applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYEES")) && (applicationManager.getConfigurationManager().isCombinedUser === "true")
                        },
                        "flxAction": {
                            "right": (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet || orientationHandler.isDesktop) ? "50dp" : "15dp"
                        },
                        "flxPaidAmount": {
                            "width": "161px"
                        },
                        "flxBottom": {
                            "isVisible": false
                        },
                        "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentScheduledSelectedMobile" : "flxBillPaymentScheduledSelected"
                    };
                    if (CommonUtilities.isCSRMode()) {
                        dataObject.btnCancel.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(15);
                    }
                    return dataObject;
                });
                scopeObj.view.segmentBillpay.widgetDataMap = dataMap;
                scopeObj.view.segmentBillpay.setData(scheduledBills);
            }
            scopeObj.view.forceLayout();
        },

        btnCancelOnClick: function (segInfo, dataItem) {
            var scopeObj = this;
            scopeObj.widgetId = "btnCancel";
            scopeObj.rowIndex = segInfo.rowIndex;
            CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : dataItem.frequencyType === OLBConstants.TRANSACTION_RECURRENCE.ONCE ? scopeObj.onScheduledCancelBtnClick(dataItem) : scopeObj.onCancelOccurrence(dataItem);
        },
        btnCancelSeriesOnClick: function (segInfo, dataItem) {
            var scopeObj = this;
            scopeObj.widgetId = "btnCancelSeries";
            scopeObj.rowIndex = segInfo.rowIndex;
            CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : scopeObj.onScheduledCancelBtnClick(scopeObj, dataItem);
        },
        btnViewEbillOnClick: function (segInfo, dataItem) {
            var scopeObj = this;
            scopeObj.rowIndex = segInfo.rowIndex;
            dataItem.eBillStatus == 1 ? scopeObj.viewEBill({
                "billGeneratedDate": scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS"),
                "amount": scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                "ebillURL": dataItem.ebillURL
            }) : null;
        },

        /**
         * used to show the no payees flow.
         * @param {message} message used to show the no message message on the page
         */
        showNoPayementDetails: function (message) {
            var scopeObj = this;
            if (message) {
                scopeObj.view.flxNoPayment.setVisibility(true);
                scopeObj.view.flxSegmentContainer.setVisibility(false);
                scopeObj.view.flxBillPayScheduled.setVisibility(false);
                scopeObj.view.flxHorizontalLine.setVisibility(false);
                scopeObj.view.flxHorizontalLine2.setVisibility(false);
                scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString(message.noPaymentMessageI18Key);
                if (message.showActionMessageI18Key) {
                    scopeObj.view.lblScheduleAPayment.setVisibility(false);
                    CommonUtilities.setText(scopeObj.view.lblScheduleAPayment, kony.i18n.getLocalizedString(message.showActionMessageI18Key), CommonUtilities.getaccessibilityConfig());
                }
                scopeObj.view.btnScheduled.setActive(true);
            }
        },

        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function (amount, currencySymbolNotRequired, currencySymbol) {
            if (currencySymbolNotRequired) {
                return applicationManager.getFormatUtilManager().formatAmount(amount);
            } else {
                return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount, currencySymbol);
            }
        },

        /**
         * On Scheduled sort Click handler
         * @param {object} event
         * @param {object} data
         */
        onScheduledSortClickHandler: function (event, data) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.fetchScheduledBills(data);
        },


        /**
         * method to handle the cancel the schedule transaction actvity.
         * @param {object} dataItem dataItem
         */
        onScheduledCancelBtnClick: function (dataItem) {
            var scopeObj = this;
            var params = {
                transactionId: dataItem.transactionId,
                transactionType: dataItem.transactionType
            };
            var obj = {
                dialogueHeader: kony.i18n.getLocalizedString("i18n.transfers.Cancel"),
                dialogueText: kony.i18n.getLocalizedString("I18n.billPay.QuitTransactionMsg"),
                dialogueAction: scopeObj.deleteScheduledTransaction.bind(scopeObj, params)
            }
            scopeObj.showPopUp(obj);
        },
        /**
         * Method to handle transaction cancel occurrence action
         * @param {object} data object
         */
        onCancelOccurrence: function (data) {
            var scopeObj = this;
            var obj = {
                dialogueHeader: kony.i18n.getLocalizedString("i18n.transfers.Cancel"),
                dialogueText: kony.i18n.getLocalizedString("i18n.common.cancelOccurrenceMessage"),
                dialogueAction: scopeObj.cancelScheduledTransactionOccurrence.bind(scopeObj, {
                    transactionId: data.referenceNumber
                })
            }
            scopeObj.showPopUp(obj);
        },
        /**
         *  method to handle the delete the schedule transaction.
         *  @param {object} params params
         */
        cancelScheduledTransactionOccurrence: function (data) {
            var self = this;
            FormControllerUtility.showProgressBar(self.view);
            self.presenter.cancelScheduledTransactionOccurrence(data);
        },
        /**
         *  method to handle the delete the schedule transaction.
         *  @param {object} params params
         */
        deleteScheduledTransaction: function (params) {
            var scopeObj = this;
            scopeObj.presenter.deleteScheduledTransaction(params);
        },

        /**
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        /**
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        setServerError: function (erroObj) {
            var scopeObj = this;
            scopeObj.view.flxDowntimeWarning.setVisibility(true);
            if (erroObj.errorMessage) {
                scopeObj.view.rtxDowntimeWarning.text = erroObj.errorMessage;
            } else {
                scopeObj.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
            }
            FormControllerUtility.hideProgressBar(scopeObj.view);
            scopeObj.view.forceLayout();
        },
        /** 
         * used to set the popup.
         * @param {obj} obj
         */
        showPopUp: function (obj) {
            var scopeObj = this;
            scopeObj.view.CustomPopupCancel.lblHeading.text = obj.dialogueHeader;
            scopeObj.view.CustomPopupCancel.lblPopupMessage.text = obj.dialogueText;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                obj.dialogueAction();
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                if (scopeObj.widgetId === "btnCancel") {
                    scopeObj.view.segmentBillpay.setActive(scopeObj.rowIndex, 0, "flxBillPaymentScheduledSelected.flxBottom.flxEdit.btnCancel")
                }
                if (scopeObj.widgetId === "btnCancelSeries") {
                    scopeObj.view.segmentBillpay.setActive(scopeObj.rowIndex, 0, "flxBillPaymentScheduledSelected.flxBottom.flxRow2.flxCancelSeries.btnCancelSeries")
                }
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                if(scopeObj.widgetId === "btnCancel"){  
                scopeObj.view.segmentBillpay.setActive(scopeObj.rowIndex, 0, "flxBillPaymentScheduledSelected.flxBottom.flxEdit.btnCancel") }
                if(scopeObj.widgetId === "btnCancelSeries"){  
                scopeObj.view.segmentBillpay.setActive(scopeObj.rowIndex, 0, "flxBillPaymentScheduledSelected.flxBottom.flxRow2.flxCancelSeries.btnCancelSeries") }
            };
            scopeObj.view.CustomPopupCancel.lblHeading.setActive(true);
            scopeObj.view.CustomPopupCancel.btnYes.accessibilityConfig = {
                "a11yLabel": obj.dialogueText === "Are you sure you want to cancel this occurrence?" ? 'Yes, cancel this occurrence' : "Yes, cancel this transaction" ,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            };
            scopeObj.view.CustomPopupCancel.btnNo.accessibilityConfig = {
                "a11yLabel": obj.dialogueText === "Are you sure you want to cancel this occurrence?" ? 'No, don’t cancel this occurrence' : "No, don't cancel this transaction" ,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            };
        },


        /**
         * used to convert the CalenderFormat Date
         * @param {String} dateString string formated date
         * @param {string} inputFormat input format
         * @returns {string} outputDate output date
         */
        getDateFromDateString: function (dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },

        /**
         * used to set the actions
         */
        setTabActions: function () {
            this.view.btnAllPayees.onClick = this.loadAllPayees.bind(this);
            this.view.btnPayementDue.onClick = this.loadPayementDues.bind(this);
            this.view.btnScheduled.onClick = this.loadScheduleBills.bind(this);
            this.view.btnHistory.onClick = this.loadBillPayHistory.bind(this);
            this.view.btnManagePayee.onClick = this.loadManagePayees.bind(this);
            this.view.flxAddPayee.onClick = this.loadAddPayee.bind(this);
            this.view.flxMakeOneTimePayment.onClick = this.loadOneTimePayement.bind(this);
            if (kony.os.deviceInfo().screenHeight < 200) {
                this.view.btnAllPayees.skin = "ICSknBtnAccountSummaryUnselected10px";
                this.view.btnPayementDue.skin = "ICSknBtnAccountSummaryUnselected10px";
                this.view.btnScheduled.skin = "ICSknBtnAccountSummarySelected10px";
                this.view.btnHistory.skin = "ICSknBtnAccountSummaryUnselected10px";
                this.view.btnManagePayee.skin = "ICSknBtnAccountSummaryUnselected10px";
                this.view.btnAllPayees.hoverSkin = "";
                this.view.btnPayementDue.hoverSkin = "";
                this.view.btnScheduled.hoverSkin = "";
                this.view.btnHistory.hoverSkin = "";
                this.view.btnManagePayee.hoverSkin = "";
            }
        },

        /**
         * used to load the Bulk Payees
         */
        loadAllPayees: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "BulkPayees",
                loadBills: true
            });
        },

        /**
         * used to load the Due Payements
         */
        loadPayementDues: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "DueBills",
                loadBills: true
            });
        },

        /**
         * used to load the scheduled bills
         */
        loadScheduleBills: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ScheduleBills",
                loadBills: true
            });
            this.isScheduledTab = true;
        },

        /**
         * used to load the bill pay history
         */
        loadBillPayHistory: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "History",
                loadBills: true
            });
        },

        /**
         * used to load the manage payees
         */
        loadManagePayees: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ManagePayees",
                loadBills: true
            });
        },

        /**
         * used to load the Payee Module
         */
        loadAddPayee: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "AddPayee"
            });
        },

        /**
         * used to load the Payee Module
         */
        loadOneTimePayement: function () {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "MakeOneTimePayment",
                callbackModelConfig: {
                    scheduled: true
                }
            });
        },
        /**
         * method to view the ebill.
         * @param {object} viewModel ebill information
         */
        viewEBill: function (viewModel) {
            var scopeObj = this;
            if (viewModel) {
                var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
                CommonUtilities.setText(scopeObj.view.lblPostDateValue, viewModel.billGeneratedDate || nonValue, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAmountValue, viewModel.amount || nonValue, CommonUtilities.getaccessibilityConfig());
                scopeObj.view.flxMemo.setVisibility(false);
                scopeObj.view.imgEBill.src = viewModel.ebillURL;
                if (viewModel.ebillURL) {
                    scopeObj.view.flxDownload.onClick = scopeObj.downloadFile.bind(scopeObj, {
                        'url': viewModel.ebillURL
                    });
                    scopeObj.view.flxDownload.setVisibility(true);
                } else {
                    scopeObj.view.flxDownload.setVisibility(false);
                    scopeObj.view.flxDownload.onClick = null;
                }
                this.view.flxZoom.setVisibility(false);
                this.view.flxFlip.setVisibility(false);
                this.view.flxDialogs.setVisibility(true);
                this.view.flxViewEbillPopup.setVisibility(true);
                scopeObj.view.lblTransactions1.setActive(true);
            }
            scopeObj.view.flxImgCancel.onClick = function () {
                scopeObj.view.flxViewEbillPopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    scopeObj.view.segmentBillpay.setActive(0, 0, "flxBillPaymentScheduledSelectedMobile.flxBottom.btnEbill");
                } else {
                    scopeObj.view.segmentBillpay.setActive(0, 0, "flxBillPaymentScheduledSelected.flxBottom.flxEdit.btnEbill");
                }
            };
        },
        /**
         * method to download the e-bill page.
         * @param {object} data information
         */
        downloadFile: function (data) {
            if (data) {
                CommonUtilities.downloadFile({
                    'url': data.url,
                    'filename': kony.i18n.getLocalizedString('i18n.billPay.Bill')
                })
            }
        },

        /**
         * Need to remove
         */
        onScheduledSegmentRowClick: function () {
            var scopeObj = this;
            var index = scopeObj.view.segmentBillpay.selectedRowIndex[1];
            var data = scopeObj.view.segmentBillpay.data;
            for (var i = 0; i < data.length; i++) {
                if (i === index) {
                    if (data[index].template == "flxBillPayScheduled" || data[index].template == "flxBillPayScheduledMobile") {
                        data[index].imgDropdown = ViewConstants.IMAGES.CHEVRON_UP;
                        data[index].template = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPayScheduledSelectedMobile" : "flxBillPayScheduledSelected";
                    } else {
                        data[index].imgDropdown = ViewConstants.IMAGES.ARRAOW_DOWN;
                        data[index].template = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPayScheduledMobile" : "flxBillPayScheduled";
                    }
                } else {
                    data[i].imgDropdown = ViewConstants.IMAGES.ARRAOW_DOWN;
                    data[i].template = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPayScheduledMobile" : "flxBillPayScheduled";
                }
            }
            scopeObj.view.segmentBillpay.setData(data);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function (form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);

            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },

        /**
         * used to show the permission based UI
         */
        showAllCreatePayeeOptions: function () {
            this.view.btnAllPayees.setVisibility(true);
            this.view.btnPayementDue.setVisibility(true);
            this.view.btnScheduled.setVisibility(true);
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideAllCreatePayeeOptions: function () {
            this.view.btnAllPayees.setVisibility(false);
            this.view.btnPayementDue.setVisibility(false);
            this.view.btnScheduled.setVisibility(false);
            this.view.flxMakeOneTimePayment.setVisibility(false);
        },

        /**
         * used to show the permission based UI
         */
        showAddPayeeOption: function () {
            this.view.flxAddPayee.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideAddPayeeOption: function () {
            this.view.flxAddPayee.setVisibility(false);
        },

        /**
         * used to show the permission based UI
         */
        showManagePayeeOption: function () {
            this.view.btnManagePayee.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideManagePayeeOption: function () {
            this.view.btnManagePayee.setVisibility(false);
        },


        /**
         * used to show the permission based UI
         */
        showHistoryOption: function () {
            this.view.btnHistory.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function () {
            this.view.btnHistory.setVisibility(false);
        },

        /*
         * method to display the types of payees list
         */
        onFiltersBtnClick: function () {
            this.view.accountTypesBillPaySchedule.setVisibility(!this.view.accountTypesBillPaySchedule.isVisible);
            this.view.accountTypesBillPaySchedule.skin = "slfBoxffffffB1R5";
            this.view.accountTypesBillPaySchedule.flxAccountTypesSegment.skin = "slfBoxffffffB1R5";
            this.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": `View Details`,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": this.view.accountTypesBillPaySchedule.isVisible
                }
            };
        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function (scheduledBills) {
            this.initializeFilterSegments();
            this.view.txtSearch.text = "";
            this.view.flxClearBtn.setVisibility(false);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, scheduledBills);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, scheduledBills);
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, scheduledBills);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            this.view.accountTypesBillPaySchedule.segAccountTypes.onRowClick = this.onFilterSelection.bind(this, scheduledBills);
            //this.view.accountTypesBillPaySchedule.segAccountTypes.onRowClick = function(eventobject, sectionIndex, rowIndex){     
            //this.onFilterSelection(eventobject, sectionIndex, rowIndex, scheduledBills);
            //}.bind(this);
        },

        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function () {
            // this.view.a = this.view.LisiBox1.masterData[0]; 
            //this.view.accountTypesBillPaySchedule.setVisibility(true);
            var data = [{
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": `All Payees`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "All Payees",
                    "left": "10dp"
                }
            }, {
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": `Personal Payees`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "Personal Payees",
                    "left": "10dp"
                }
            }, {
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": `Business Payees`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "Business Payees",
                    "left": "10dp"
                }
            }];
            this.view.accountTypesBillPaySchedule.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers",
                "flxAccountTypes": "flxAccountTypes",
                "lblSeparator": "lblSeparator"
            };
            this.view.accountTypesBillPaySchedule.height = "120dp";
            this.view.accountTypesBillPaySchedule.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesBillPaySchedule.segAccountTypes.data[0].lblUsers.text;
        },

        onSegKeyPressCallBack: function (eventObject, eventPayload, context) {
            var scopeObj = this;
            //Esc Key
            if (eventPayload.keyCode === 27) {
                scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                scopeObj.view.flxFiltersList.setActive(true);
                scopeObj.view.flxFiltersList.accessibilityConfig = {
                    "a11yLabel": `View Details`,
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };
            }
            //Tab key
            else if (eventPayload.keyCode === 9) {
                //Shift + Tab key
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    eventPayload.preventDefault();
                    if (context.rowIndex === 1) {
                        context.widgetInfo.setActive(0, 0, "flxAccountTypes")
                    } else if (context.rowIndex === 2) {
                        context.widgetInfo.setActive(1, 0, "flxAccountTypes")
                    } else if (context.rowIndex === 3) {
                        context.widgetInfo.setActive(2, 0, "flxAccountTypes")
                    }
                    if (context.rowIndex === 0 && context.sectionIndex === 0) {
                        scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": `View Details`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                        scopeObj.view.flxFiltersList.setActive(true);
                    }
                }
                else if (context.rowIndex === context.widgetInfo.data.length - 1) {
                    scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                    scopeObj.view.flxFiltersList.setActive(true);
                    scopeObj.view.flxFiltersList.accessibilityConfig = {
                        "a11yLabel": `View Details`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    };
                }
            }
        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function (scheduledBills) {
            var scopeObj = this;
            //var segData = this.view.accountTypesBillPaySchedule.segAccountTypes.data;
            //accounts = context.recipients;    
            this.view.accountTypesBillPaySchedule.setVisibility(false);
            scopeObj.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": `View Details`,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": false
                }
            };
            var data = scopeObj.getSearchAndFilterData(scheduledBills);
            // context.recipients = data;
            this.bindScheduleBills(data);
            scopeObj.view.forceLayout();
            scopeObj.view.flxFiltersList.setActive(true);
        },

        /**
         * method used to enable or disable the clear button.
         */
        onTxtSearchKeyUp: function () {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxtxtSearchandClearbtn.forceLayout();
        },

        /**
         * method used to clear search
         */
        onSearchClearBtnClick: function (scheduledBills) {
            var scopeObj = this;

            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            //var data = scopeObj.getSearchAndFilterData(scheduledBills);
            this.bindScheduleBills(scheduledBills);
            // context.recipients = data;
            //this.bindScheduleBills(data); 
            scopeObj.view.txtSearch.setActive(true);
        },

        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function (scheduledBills) {
            var scopeObj = this;
            // accounts = context.recipients;    
            var data = scopeObj.getSearchAndFilterData(scheduledBills);
            // context.recipients = data;
            this.bindScheduleBills(data);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function (scheduledBills) {
            var scopeObj = this;
            this.view.lblType.text = (this.view.accountTypesBillPaySchedule.segAccountTypes.selectedRowItems !== null && this.view.accountTypesBillPaySchedule.segAccountTypes.selectedRowItems.length !== 0) ? this.view.accountTypesBillPaySchedule.segAccountTypes.selectedRowItems[0].lblUsers.text : this.view.accountTypesBillPaySchedule.segAccountTypes.data[0].lblUsers.text;

            var filterQuery = this.view.lblType.text;
            var searchQuery = scopeObj.view.txtSearch.text.trim();

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = scheduledBills;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < scheduledBills.length; i++) {
                    if (scheduledBills[i].isBusinessPayee === "0") {
                        accountlist.push(scheduledBills[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                scheduledBills = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < scheduledBills.length; i++) {
                    if (scheduledBills[i].isBusinessPayee === "1") {
                        accountlist.push(scheduledBills[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                scheduledBills = accountlist;
            }
            if (searchQuery !== "") {
                // var data = scopeObj.getDataWithSections(accounts);
                var data = scheduledBills;
                var searchresults = [];
                if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {

                    var j = 0;
                    for (var i = 0; i < data.length; i++) {
                        var rowdata = null;
                        if ((data[i].amount && data[i].amount.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].payeeName && data[i].payeeName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].billDueAmount && data[i].billDueAmount.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
                            rowdata = data[i];
                        }
                        if (kony.sdk.isNullOrUndefined(rowdata)) {
                            //data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
                            //data[i][1][0].flxNoResultsFound["isVisible"] = true;
                            data[i].isNoRecords = true;
                            data[i].lblNoResultsFound = {
                                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
                            };
                            var noRecordsData = data[i];
                            //data[i] = [];
                            if (data[i].isNoRecords === false) {
                                searchresults[j].push(noRecordsData);
                                j++;
                            }
                        } else {
                            //data[i] = [];
                            searchresults[j] = rowdata;
                            j++;
                        }
                    }
                }
                return searchresults;
            } else {
                return scheduledBills;
            }
        },
        /**
         * Method to handle the segment row view on click of dropdown
         */
        handleSegmentRowView: function () {
            var scopeObj = this;
            const rowIndex = scopeObj.view.segmentBillpay.selectedRowIndex[1];
            const data = scopeObj.view.segmentBillpay.data;
            var pre_val;
            var requiredView = [];
            const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", { "Mobile": "80dp", "Default": "80dp" }, "sknflxffffffnoborder"];
            const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", { "Mobile": "400dp", "Default": "250dp" }, "sknflxffffffnoborder"];
            if (previous_index_schedule === rowIndex) {
                requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
                this.toggleSegmentRowView(rowIndex, requiredView);
            } else {
                if (previous_index_schedule >= 0) {
                    pre_val = previous_index_schedule;
                    this.toggleSegmentRowView(pre_val, collapsedView);
                }
                pre_val = rowIndex;
                this.toggleSegmentRowView(rowIndex, expandedView);
            }
            previous_index_schedule = rowIndex;
        },
        /**
         * Method to toggle the segment row view
         * @param {Number} index - index of segment row to toggle
         * @param {Array} viewData - data which need to be assigned to toggled view
         */
        toggleSegmentRowView: function (index, viewData) {
            var scopeObj = this;
            var data = scopeObj.view.segmentBillpay.data;
            data[index].lblDropdown = viewData[0];
            data[index].flxIdentifier.isVisible = viewData[1];
            data[index].flxIdentifier.skin = viewData[2];
            data[index].lblIdentifier.skin = viewData[3];
            data[index].flxBillPaymentScheduledSelected.height = viewData[4]['Default'];
            data[index].flxBillPaymentScheduledSelected.skin = viewData[5];
            data[index].flxBillPaymentScheduledSelectedMobile.height = viewData[4]['Mobile'];
            data[index].flxBillPaymentScheduledSelectedMobile.skin = viewData[5];
            data[index].flxBottom.isVisible = viewData[1];
            data[index].flxEdit.isVisible = viewData[1];
            data[index].flxDropdown.accessibilityConfig = {
                "a11yLabel": viewData[1] ? `Hide details for bill with reference number ${data[index].lblRefrenceNumberValue.text}` : `Show more details for bill with reference number ${data[index].lblRefrenceNumberValue.text}`,
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": viewData[1]
                }
            };
            scopeObj.view.segmentBillpay.setDataAt(data[index], index);
            scopeObj.view.segmentBillpay.setActive(index, 0, "flxBillPaymentScheduledSelected.flxMain.flxDropdown");
        }
    }
});