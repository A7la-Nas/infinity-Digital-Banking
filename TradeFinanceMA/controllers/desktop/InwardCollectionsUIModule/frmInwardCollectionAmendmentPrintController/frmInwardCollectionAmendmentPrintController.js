define(['OLBConstants'], function (OLBConstants) {
    let pritDataObj, collectionResponse, amendmentResponse;
    let presenter;
    let previousForm;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let collectionSummeryArray = [], amendmentOverviewArray = [], draweeConcentArray = [], amendmentRequestedArray = [];
    let INWARD_COLLECTION_AMENDMENTS_STATUSES;
    let viewAllAmendments = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
    return {
        /**
         * @api :onNavigate
         * Will trigger when form is called
         * @return : NA
         */
        onNavigate: function (data) {
            var scope = this;
            try {
                pritDataObj = data.serviceResponse;
                collectionResponse = data.serviceResponse.collectionResponse;
                amendmentResponse = data.serviceResponse.amendmentResponse;
                scope.view.postShow = scope.postShow;
                scope.view.preShow = scope.preShow;
                previousForm = data.previousFormName;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :preShow
         * Before showing the UI
         * @return : NA
         */
        preShow: function () {
            var scope = this;
            try {
                presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'InwardCollectionsUIModule'
                });
                INWARD_COLLECTION_AMENDMENTS_STATUSES = OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS;
                scope.renderHeaderDetails();
                scope.setSegAmendmentWidgetDataMap();
                scope.appendResponses();
            } catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :postShow
         * After loading the UI
         * @return : NA
         */
        postShow: function () {
            var scope = this;
            try {
                kony.os.print();
                //timeout is required to allow print popup to be visible.
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

        /**
         * @api : afterPrintCallback
         * It will help user to navigate back from print
         * @return : NA
         */
        afterPrintCallback: function () {
            var scope = this;
            try {
                pritDataObj["flowType"] = viewAllAmendments;
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `InwardCollectionsUIModule/${previousForm}`
                }).navigate(pritDataObj);
            } catch (err) {
                var errorObj = {
                    "method": "afterPrintCallback",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :renderHeaderDetails
         * Rendering logged user details in UI
         * @return : NA
         */
        renderHeaderDetails: function () {
            var scope = this;
            try {
                let userObject = applicationManager.getUserPreferencesManager().getUserObj();
                scope.view.lblUserName.text = (userObject.userfirstname && userObject.LastName) ? userObject.userfirstname + " " + userObject.LastName : NA;
                scope.view.lblAddress3.text = userObject.phone ? presenter.getDynamicData(userObject, 'phone') : NA;
                scope.view.lblBankNameValue.text = userObject.bankName ? presenter.getDynamicData(userObject, 'bankName') : NA;
                scope.view.lblEmailValue.text = userObject.email ? presenter.getDynamicData(userObject, 'email') : NA;
                scope.view.lblTermsCondition.text = presenter.renderI18nKeys("i18n.Transfers.Terms&Conditions", true)+ " " + presenter.renderI18nKeys("i18n.TradeFinance.amendmentsTermsandConditions", false);
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

        /**
         * @api :setSegAmendmentWidgetDataMap
         * Widget data map for segment
         * @return : NA
         */
        setSegAmendmentWidgetDataMap: function () {
            var scope = this;
            try {
                scope.view.segAmendmentOverview.rowTemplate = "flxTempInwardGuranteeAmendmentRowPrint";
                scope.view.segAmendmentOverview.sectionHeaderTemplate = "flxTempInwardGuaranteeAmendmentHeader";
                scope.view.segAmendmentOverview.widgetDataMap = {
                    "flxTempInwardGuaranteeAmendmentHeader": "flxTempInwardGuaranteeAmendmentHeader",
                    "lblAmendmentHeader": "lblAmendmentHeader",
                    "flxTempInwardGuranteeAmendmentRowPrint": "flxTempInwardGuranteeAmendmentRowPrint",
                    "flxDetailsRow": "flxDetailsRow",
                    "lblReviewKey": "lblReviewKey",
                    "lblReviewValue": "lblReviewValue",
                    "imgDaysLeft": "imgDaysLeft",
                    "lblDaysLeft": "lblDaysLeft",
                };
            } catch (err) {
                var errorObj = {
                    "level": "frmInwardCollectionAmendmentPrintController",
                    "method": "setSegAmendmentWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :processCollectionSummery
         * Processing Collection Summery
         * @return : NA
         */
        processCollectionSummery: function () {
            var scope = this;
            try {
                let tempMaturityDate = presenter.calculateMaturityDate(collectionResponse.maturityDate);
                collectionSummeryArray = [
                    [
                        { "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.collectionSummary", false) }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true),
                                "lblReviewValue": collectionResponse.drawerName ? presenter.getDynamicData(collectionResponse, 'drawerName') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
                                "lblReviewValue": collectionResponse.collectionSrmsId ? presenter.getDynamicData(collectionResponse, 'collectionSrmsId') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.StopCheckPayments.Amount", false),
                                "lblReviewValue": (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + collectionResponse.amount : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                                "lblReviewValue": collectionResponse.tenorType ? presenter.getDynamicData(collectionResponse, 'tenorType') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
                                "lblReviewValue": collectionResponse.maturityDate ? presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA,
                                "imgDaysLeft": {
                                    isVisible: true,
                                    src: 'days_left_gray.png'
                                },
                                "lblDaysLeft": {
                                    isVisible: true,
                                    text: tempMaturityDate.daysLeft
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                                "lblReviewValue": collectionResponse.remittingBank ? presenter.getDynamicData(collectionResponse, 'remittingBank') : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "processCollectionSummery",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :processAmendmentOverview
         * Processing Amendment Overview
         * @return : NA
         */
        processAmendmentOverview: function () {
            var scope = this;
            try {
                amendmentOverviewArray = [
                    [
                        { "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.amendmentOverview", false) }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                                "lblReviewValue": amendmentResponse.status ? presenter.getDynamicData(amendmentResponse, 'status') : NA
                            },
                            {
                                "lblReviewKey": {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.rejectedDateWithColon", false),
                                    isVisible: amendmentResponse.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED ? true : false
                                },
                                "lblReviewValue": {
                                    text: amendmentResponse.rejectedDate ? presenter.getConvertedDate(amendmentResponse, 'rejectedDate') : NA,
                                    isVisible: amendmentResponse.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED ? true : false
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.ReceivedOn", true),
                                "lblReviewValue": amendmentResponse.receivedOn ? presenter.getConvertedDate(amendmentResponse, 'receivedOn') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", true),
                                "lblReviewValue": amendmentResponse.amendmentNo ? presenter.getDynamicData(amendmentResponse, 'amendmentNo') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
                                "lblReviewValue": amendmentResponse.amendmentSrmsId ? presenter.getDynamicData(amendmentResponse, 'amendmentSrmsId') : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "processAmendmentOverview",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :processDraweeConsent
         * Processing Drawee Consent
         * @return : NA
         */
        processDraweeConsent: function () {
            var scope = this;
            try {
                draweeConcentArray = [
                    [
                        { "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false) }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
                                "lblReviewValue": amendmentResponse.draweeAcknowledgement ? presenter.getDynamicData(amendmentResponse, 'draweeAcknowledgement') : NA
                            },
                            {
                                "lblReviewKey": {
                                    text: presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
                                    isVisible: amendmentResponse.draweeAcknowledgement === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED ? true : false
                                },
                                "lblReviewValue": {
                                    text: amendmentResponse.reasonForRejection ? presenter.getDynamicData(amendmentResponse, 'reasonForRejection') : NA,
                                    isVisible: amendmentResponse.draweeAcknowledgement === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED ? true : false
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
                                "lblReviewValue": amendmentResponse.messageToBank ? presenter.getDynamicData(amendmentResponse, 'messageToBank') : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "processDraweeConsent",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :processAmendmentRequested
         * Processing Amendment Requested
         * @return : NA
         */
        processAmendmentRequested: function () {
            var scope = this;
            try {
                // Processing documents data
                let docResponse = amendmentResponse.amendDocuments ? amendmentResponse.amendDocuments : NA;
                let tempDocResponse = "";
                if (docResponse !== NA) {
                    docResponse = JSON.parse(amendmentResponse.amendDocuments.replace(/'/g, "\""));
                    docResponse.map((item, index) => {
                        tempDocResponse = (tempDocResponse + item.documentName) + (docResponse.length - 1 === index ? '' : '\n');
                    });
                } else {
                    tempDocResponse = NA;
                }
                let tempMaturityDate = presenter.calculateMaturityDate(collectionResponse.maturityDate);
                amendmentRequestedArray = [
                    [
                        { "lblAmendmentHeader": presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false) }, // Section Header Template
                        [
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.StopCheckPayments.Amount", false),
                                "lblReviewValue": (amendmentResponse.currency && amendmentResponse.amendAmount) ? amendmentResponse.currency + " " + amendmentResponse.amendAmount : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
                                "lblReviewValue": amendmentResponse.amendMaturityDate ? presenter.getConvertedDate(amendmentResponse, 'amendMaturityDate') : NA,
                                "imgDaysLeft": {
                                    isVisible: true,
                                    src: 'days_left_gray.png'
                                },
                                "lblDaysLeft": {
                                    isVisible: true,
                                    text: tempMaturityDate.daysLeft
                                }
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                                "lblReviewValue": amendmentResponse.amendTenorType ? presenter.getDynamicData(amendmentResponse, 'amendTenorType') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
                                "lblReviewValue": amendmentResponse.amendUsanceDetails ? presenter.getDynamicData(amendmentResponse, 'amendUsanceDetails') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                                "lblReviewValue": amendmentResponse.remittingBank ? presenter.getDynamicData(amendmentResponse, 'remittingBank') : NA
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.documentsWithColon", false),
                                "lblReviewValue": tempDocResponse
                            },
                            {
                                "lblReviewKey": presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
                                "lblReviewValue": amendmentResponse.messageFromBank ? presenter.getDynamicData(amendmentResponse, 'messageFromBank') : NA
                            }
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "processAmendmentRequested",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :appendResponses
         * Combaining all responses and showing in UI based on response
         * @return : NA
         */
        appendResponses: function () {
            var scope = this;
            try {
                if (amendmentResponse.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.NEW || amendmentResponse.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) {
                    scope.processCollectionSummery();
                    scope.processAmendmentOverview();
                    scope.processAmendmentRequested();
                } else {
                    scope.processCollectionSummery();
                    scope.processAmendmentOverview();
                    scope.processDraweeConsent();
                    scope.processAmendmentRequested();
                }
                let printSegData = [
                    ...collectionSummeryArray,
                    ...amendmentOverviewArray,
                    ...draweeConcentArray,
                    ...amendmentRequestedArray
                ];
                scope.view.segAmendmentOverview.setData(printSegData);
            } catch (err) {
                var errorObj = {
                    "method": "appendResponses",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : onError
         * Error thrown from catch block in component and shown on the form
         * @arg: err - object based on error
         * @return : NA
        */
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmInwardCollectionAmendmentPrint";
            // kony.ui.Alert(errMsg);
        },
    };
});