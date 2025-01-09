define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'FormatUtil'], function (CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, FormatUtil) {
    let presenter;
    let previousForm;
    let pritDataObj = [], collectionResponse;
    let collectionOverViewArray = [],
        paymentStatusArray = [],
        draweeConsentArray = [],
        collectionDetailsArray = [],
        draweeAndBankDetailsArray = [],
        documentAndBankInstructionArray = [];
    let viewAllCollection = kony.i18n.getLocalizedString("i18n.TradeFinance.viewAllCollections");
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let outwardConstants;
    let localReturnedHistory;
    return {
        /**
         * Sets the initial actions for forms
         */
        onNavigate: function (data) {
            var scope = this;
            try {
                collectionResponse = data.navData;
                pritDataObj = data.navData;
                scope.view.postShow = scope.postShow;
                scope.view.preShow = scope.preShow;
                previousForm = data.previousFormName;
            }
            catch (err) {
                var errorObj =
                {
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
        },
        /**
         * Performs the actions required before rendering form
         */
        preShow: function () {
            var scope = this;
            try {
                presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'OutwardCollectionsUIModule'
                });
                outwardConstants = presenter.outwardConstants;
                localReturnedHistory = collectionResponse.returnedHistory ? JSON.parse(collectionResponse.returnedHistory.replace(/'/g, "\"")) : [];
                scope.renderHeaderDetails();
                scope.setSegCollectionWidgetDataMap();
                scope.appendResponses();
            }
            catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * Performs the actions required after rendering form
         */
        postShow: function () {
            var scope = this;
            try {
                kony.os.print();
                // timeout is required to allow print popup to be visible.
                setTimeout(function () {
                    scope.afterPrintCallback();
                }, "17ms");
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        afterPrintCallback: function () {
            var scope = this;
            try {
                pritDataObj["flowType"] = viewAllCollection;
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `OutwardCollectionsUIModule/${previousForm}`
                }).navigate(pritDataObj);
            }
            catch (err) {
                var errorObj = {
                    "method": "afterPrintCallback",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        renderHeaderDetails: function () {
            var scope = this;
            try {
                let userObject = applicationManager.getUserPreferencesManager().getUserObj();
                scope.view.lblUserName.text = (userObject.userfirstname && userObject.LastName) ? userObject.userfirstname + " " + userObject.LastName : NA;
                scope.view.lblAddress3.text = userObject.phone ? presenter.getDynamicData(userObject, 'phone') : NA;
                scope.view.lblBankNameValue.text = userObject.bankName ? presenter.getDynamicData(userObject, 'bankName') : NA;
                scope.view.lblEmailValue.text = userObject.email ? presenter.getDynamicData(userObject, 'email') : NA;
                scope.view.lblTermsCondition.text = presenter.renderI18nKeys("i18n.Transfers.Terms&Conditions", true) + " " + presenter.renderI18nKeys("i18n.TradeFinance.amendmentsTermsandConditions", false);
                // As per UX team's suggestion, hard coding below values
                let address1 = "Ohio/West Virginia Markets";
                let address2 = "P O Box 260180";
                scope.view.lblAddress1.text = address1;
                scope.view.lblAddress2.text = address2;
                scope.view.lblCustCareValue.text = "10000020000";
                scope.view.lblAddressValue.text = address1 + " " + address2;
                scope.view.lblWebsiteValue.text = "dbxdigitalbanking.com";
            } catch (err) {
                var errorObj = {
                    "method": "renderHeaderDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        setSegCollectionWidgetDataMap: function () {
            var scope = this;
            try {
                scope.view.segCollectionData.rowTemplate = "flxTempInwardGuranteeAmendmentRowPrint";
                scope.view.segCollectionData.sectionHeaderTemplate = "flxTempInwardGuaranteeAmendmentHeader";
                scope.view.segCollectionData.widgetDataMap = {
                    "flxTempInwardGuaranteeAmendmentHeader": "flxTempInwardGuaranteeAmendmentHeader",
                    "lblAmendmentHeader": "lblAmendmentHeader",
                    "flxTempInwardGuranteeAmendmentRowPrint": "flxTempInwardGuranteeAmendmentRowPrint",
                    "flxDetailsRow": "flxDetailsRow",
                    "imgDaysLeft": "imgDaysLeft",
                    "lblDaysLeft": "lblDaysLeft",
                    "lblHeader": "lblHeader",
                    "flxKeyHeading": "flxKeyHeading",
                    "lblKeyHeading": "lblKeyHeading",
                    "flxKey": "flxKey",
                    "lblKey": "lblKey",
                    "lblValue": "lblValue",
                    "flxAddress": "flxAddress",
                    "lblAddress1": "lblAddress1",
                    "lblAddress2": "lblAddress2",
                    "lblAddress3": "lblAddress3",
                    "template": "template",
                    "flxKey": "flxKey",
                    "lblReviewKey":"lblReviewKey",
                    "lblReviewValue":"lblReviewValue",
                    "flxTempAmendGuarentPrint": "flxTempAmendGuarentPrint"
                };
            } catch (err) {
                var errorObj = {
                    "level": "frmOutwardCollectionPrintController",
                    "method": "setSegCollectionWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        collectionOverView: function () {
            var scope = this;
            try {
                let tempStatus = collectionResponse.status.toLowerCase();
                collectionOverViewArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                            },
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true),
                                "lblReviewValue": collectionResponse.collectionReference ? presenter.getDynamicData(collectionResponse, 'collectionReference') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                                "lblReviewValue": collectionResponse.updatedOn ? presenter.getConvertedDate(collectionResponse, 'updatedOn') : NA,
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                                "lblReviewValue": collectionResponse.status ? presenter.getDynamicData(collectionResponse, 'status') : NA
                            }
                        ]
                    ]
                ];
                if (tempStatus == outwardConstants.cancelled) {
                    collectionOverViewArray[0][1].push(
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.reasonForCancellation", true),
                            "lblReviewValue": collectionResponse.reasonForCancellation ? presenter.getDynamicData(collectionResponse, 'reasonForCancellation') : NA
                        }
                    );
                } else if (tempStatus == outwardConstants.rejected) {
                    collectionOverViewArray[0][1].push(
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
                            "lblReviewValue": collectionResponse.reasonForRejection ? presenter.getDynamicData(collectionResponse, 'reasonForRejection') : NA
                        }
                    );
                } else if (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) {
                    collectionOverViewArray[0][1].push(
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
                            "lblReviewValue": collectionResponse.maturityDate ? presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA
                        }
                    );
                } else if (tempStatus == outwardConstants.returnedByBank || (tempStatus == outwardConstants.submittedToBank && localReturnedHistory.length > 0)) {
                    collectionOverViewArray[0][1].push(
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
                            "lblReviewValue": collectionResponse.reasonForReturn ? presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
                        }
                    );
                }
                if (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.rejected || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) {
                    collectionOverViewArray[0][1].push(
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.courierTrackingDetails", true),
                            "lblReviewValue": collectionResponse.courierTrackingDetails ? presenter.getDynamicData(collectionResponse, 'courierTrackingDetails') : NA
                        },
                        {
                            "flxDetailsRow": {
                                isVisible: (tempStatus == outwardConstants.approved || tempStatus == outwardConstants.rejected || tempStatus == outwardConstants.settled || tempStatus == outwardConstants.overdue) && collectionResponse.paymentStatus
                            },
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.requestPaymentStatus", true),
                            "lblReviewValue": collectionResponse.paymentStatus ? presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
                        },
                        {
                            "flxDetailsRow": {
                                isVisible: (tempStatus == outwardConstants.overdue && !presenter.isEmptyNullOrUndefined(collectionResponse.billOfExchangeStatus))
                            },
                            "lblReviewKey": 'Request Bill of Exchange:',
                            "lblReviewValue": collectionResponse.billOfExchangeStatus ? presenter.getDynamicData(collectionResponse, 'billOfExchangeStatus') : NA
                        },
                        {
                            "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
                            "lblReviewValue": collectionResponse.messageFromBank ? presenter.getDynamicData(collectionResponse, 'messageFromBank') : NA
                        }
                    );
                }
            } catch (err) {
                var errorObj = {
                    "method": "collectionOverView",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        paymentDetails: function () {
            var scope = this;
            try {
                paymentStatusArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TransfersEur.PaymentDetails", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                            }
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                                "lblReviewValue": collectionResponse.paymentStatus ? presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                                "lblReviewValue":(collectionResponse.currency &&  collectionResponse.amount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) : NA
                            },
                            {
                                "lblReviewKey": 'Amount Credited Account:',
                                "lblReviewValue": collectionResponse.creditAccount ? scope.morphAcNumber(collectionResponse.creditAccount) : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "paymentdetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        draweeConsent: function () {
            var scope = this;
            try {
                paymentStatusArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                            }
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.wealth.acknowledgement", true),
                                "lblReviewValue": collectionResponse.draweeAcknowledgement ? presenter.getDynamicData(collectionResponse, 'draweeAcknowledgement') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
                                "lblReviewValue": collectionResponse.draweeAcceptance ? presenter.getDynamicData(collectionResponse, 'draweeAcceptance') : NA,
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
                                "lblReviewValue": collectionResponse.isBillExchangeSigned ? presenter.getDynamicData(collectionResponse, 'isBillExchangeSigned') : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "draweeConsentArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        collectionDetails: function () {
            var scope = this;
            try {
                collectionDetailsArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                            }
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
                                "lblReviewValue": collectionResponse.documentNo ? presenter.getDynamicData(collectionResponse, 'documentNo') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.createdOnWithColon", false),
                                "lblReviewValue": collectionResponse.createdOn ? presenter.getConvertedDate(collectionResponse, 'createdOn') : NA,
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                                "lblReviewValue": collectionResponse.tenorType ? presenter.getDynamicData(collectionResponse, 'tenorType') : NA
                            },
                            {
                                "flxDetailsRow": {
                                  isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
                                },
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                                "lblReviewValue": collectionResponse.usanceDays ? presenter.getDynamicData(collectionResponse, 'usanceDays') : NA
                            },
                            {
                                "flxDetailsRow": {
                                  isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
                                },
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
                                "lblReviewValue": collectionResponse.usanceDetails ? presenter.getDynamicData(collectionResponse, 'usanceDetails') : NA,
                            },
                            {
                                "flxDetailsRow": {
                                  isVisible: collectionResponse.tenorType == presenter.outwardConstants.usance
                                },
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                                "lblReviewValue": collectionResponse.allowUsanceAcceptance ? presenter.getDynamicData(collectionResponse, 'allowUsanceAcceptance') : NA
                            },
                            {
                                "lblReviewKey":
                                {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.amountaAndAccountDetails", true),
                                    skin: "ICSknlbl424242SSP13pxSemibold"
                                },
                                "lblReviewValue":
                                {
                                    isVisible: false,
                                },
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.requestAmountWithColon", false),
                                "lblReviewValue":(collectionResponse.currency &&  collectionResponse.amount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", true),
                                "lblReviewValue": collectionResponse.creditAccount ? scope.morphAcNumber(collectionResponse.creditAccount) : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                                "lblReviewValue": collectionResponse.debitAccount ? scope.morphAcNumber(collectionResponse.debitAccount) : NA
                            },
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "collectionDetailsArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        draweeAndBankDetails: function () {
            var scope = this;
            var scope = this;
            try {
                let bankAddress = !presenter.isEmptyNullOrUndefined(collectionResponse.collectingBankAddress) ? presenter.getFormattedAddress(collectionResponse.collectingBankAddress, 'ICSknLbl424242SSPRegular15px', '44.4%', '20dp', '15dp') : NA;
                let draweeAddress = !presenter.isEmptyNullOrUndefined(collectionResponse.draweeAddress) ? presenter.getFormattedAddress(collectionResponse.draweeAddress, 'ICSknLbl424242SSPRegular15px', '44.4%', '20dp', '15dp') : NA;
                draweeAndBankDetailsArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TradeFinance.draweeAndCollectingBankDetails", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                            }
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey":
                                {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.draweeDetails", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold"
                                },
                                "lblReviewValue":
                                {
                                    isVisible: false,
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.draweeName", true),
                                "lblReviewValue": collectionResponse.draweeName ? presenter.getDynamicData(collectionResponse, 'draweeName') : NA,
                            },
                            Object.assign(
                                {
                                    "flxTempAmendGuarentPrint": {
                                        height: '75dp'
                                    },
                                    "lblKey":
                                    {
                                        text: presenter.renderI18nKeys("i18n.TradeFinance.draweeAddress", true),
                                        skin: "bbSknLbl727272SSP15Px",
                                    },
                                    "lblValue":
                                    {
                                        isVisible: draweeAddress == NA ? true : !draweeAddress['flxAddress']['isVisible'],
                                        text: NA,
                                        left: '20dp'

                                    },
                                    template: "flxTempAmendGuarentPrint",
                                }, draweeAddress),
                            {
                                "lblReviewKey":
                                {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold",
                                },
                                "lblReviewValue":
                                {
                                    isVisible: false,
                                },
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.payee.bankname", false),
                                "lblReviewValue": collectionResponse.collectingBank ? presenter.getDynamicData(collectionResponse, 'collectingBank') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.swift/BicCodeWithColon", false),
                                "lblReviewValue": collectionResponse.swiftOrBicCode ? presenter.getDynamicData(collectionResponse, 'swiftOrBicCode') : NA
                            },
                            Object.assign(
                                {
                                    "flxTempAmendGuarentPrint": {
                                        height: '75dp'
                                    },
                                    "lblKey":
                                    {
                                        text: presenter.renderI18nKeys("i18n.TradeFinance.bankAddressWithColon", false),
                                        skin: "bbSknLbl727272SSP15Px",
                                    },
                                    "lblValue":
                                    {
                                        isVisible: bankAddress == NA ? true : !bankAddress['flxAddress']['isVisible'],
                                        text: NA,
                                        left: '20dp'
                                    },
                                    template: "flxTempAmendGuarentPrint",
                                }, bankAddress),
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj =
                {
                    "method": "draweeAndBankDetailsArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        documentAndBankInstruction: function () {
            var scope = this;
            try {
                documentAndBankInstructionArray = [
                    [
                        {
                            "lblAmendmentHeader":
                            {
                                text: presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
                                skin: "ICSknlbl424242SSP15pxSemibold"
                            }
                        }, // Section Header Template
                        [
                            {
                                "lblReviewKey":
                                {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.uploadAndPhysicalDocumentCounts", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold",
                                },
                                "lblReviewValue":
                                {
                                    isVisible: false,
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false),
                                "lblReviewValue": presenter.processDocsAndInstructionBills(collectionResponse,'uploadDocuments')
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false),
                                "lblReviewValue": collectionResponse.physicalDocuments ? presenter.getPhysicalDocumentCount(collectionResponse.physicalDocuments) : NA,

                            },
                            {
                                "lblReviewKey":
                                {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.bankInstructions", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold",
                                },
                                "lblReviewValue":
                                {
                                    isVisible: false,
                                },
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
                                "lblReviewValue": collectionResponse.incoTerms ? presenter.getDynamicData(collectionResponse, 'incoTerms') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.deliveryInstructionsOptional", true),
                                "lblReviewValue": collectionResponse.deliveryInstructions ? presenter.getDynamicData(collectionResponse, 'deliveryInstructions') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetailsWithOptional", true),
                                "lblReviewValue": collectionResponse.otherCollectionDetails ? presenter.getDynamicData(collectionResponse, 'otherCollectionDetails') : NA,
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankOptional", true),
                                "lblReviewValue": collectionResponse.messageToBank ? presenter.getDynamicData(collectionResponse, 'messageToBank') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.instructionForBills", true),
                                "lblReviewValue": presenter.processDocsAndInstructionBills(collectionResponse,'instructionsForBills')
                            },
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "documentAndBankInstructionArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        appendResponses: function () {
            var scope = this;
            try {
                scope.collectionOverView();
                if (collectionResponse.status.toLowerCase() === outwardConstants.settled) {
                    scope.paymentDetails();
                } else if (collectionResponse.status.toLowerCase() === outwardConstants.approved || collectionResponse.status.toLowerCase() === outwardConstants.overdue) {
                    scope.draweeConsent();
                }
                scope.collectionDetails();
                scope.draweeAndBankDetails();
                scope.documentAndBankInstruction();
                let printSegData =
                    [
                        ...collectionOverViewArray,
                        ...paymentStatusArray,
                        ...draweeConsentArray,
                        ...collectionDetailsArray,
                        ...draweeAndBankDetailsArray,
                        ...documentAndBankInstructionArray
                    ];
                printSegData.map((item1, index1) => {
                    item1[1].map((item2, index2) => {
                        typeof printSegData[index1][1][index2].lblReviewKey !== 'object' &&
                        (printSegData[index1][1][index2].lblReviewKey = {
                            text: printSegData[index1][1][index2].lblReviewKey,
                            width: '44%'
                        });
                        typeof printSegData[index1][1][index2].lblReviewValue !== 'object' &&
                        (printSegData[index1][1][index2].lblReviewValue = {
                            text: printSegData[index1][1][index2].lblReviewValue,
                            skin: 'ICSknLbl424242SSPRegular15px'
                        });
                    });
                });
                scope.view.segCollectionData.setData(printSegData);
            } catch (err) {
                var errorObj = {
                    "method": "appendResponses",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        morphAcNumber: function (inputAcID) {
            var scope = this;
            try {
                let accountList = applicationManager.getConfigurationManager().userAccounts;
                for (let i = 0; i < accountList.length; i++) {
                    if (accountList[i].accountID == inputAcID) {
                        return CommonUtilities.mergeAccountNameNumber(accountList[i].nickName || accountList[i].accountName, accountList[i].accountID);
                    }
                }
                return NA;
            } catch (err) {
                var errorObj = {
                    "method": "morphAcNumber",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmOutwardCollectionPrint";
            // kony.ui.Alert(errMsg);
        },
    };
});
