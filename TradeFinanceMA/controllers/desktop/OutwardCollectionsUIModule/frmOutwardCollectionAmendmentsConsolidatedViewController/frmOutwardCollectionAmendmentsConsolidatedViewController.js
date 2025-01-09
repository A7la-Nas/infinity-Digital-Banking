define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility'], function (CommonUtilities, OLBConstants, FormControllerUtility) {
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let serviceResponse;
    let outwardcollection_status;
    let OUTWARD_COLLECTIONS_AMENDMENT_STATUSES;
    let collectionOverViewArray = [],
        paymentStatusArray = [],
        draweeConsentArray = [],
        collectionDetailsArray = [],
        draweeAndBankDetailsArray = [],
        documentAndBankInstructionArray = [];
    let viewAllAmendments = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
    let isTablet = false;
    return {
        onNavigate: function (data) {
            var scope = this;
            try {
                scope.segViewDetailsTempData = "";
                serviceResponse = data;
                collectionResponse = data.collectionResponse;
                amendmentResponse  = data.groupAmendmentResponse;
                previousFormName = data.previousForm;
                scope.view.preShow = scope.preShow;
                scope.view.postShow = scope.postShow;
                scope.view.onBreakpointChange = scope.onBreakpointChange;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : onBreakpointChange
         * This function for changing the UI depending upon breakpoint
         * @return : NA
         */
        onBreakpointChange: function () {
            var scope = this;
            try {
                var currentBreakpoint = kony.application.getCurrentBreakpoint();
                if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
                    isTablet = true;
                } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                    isTablet = false;
                }
            } catch (err) {
                var errorObj = {
                    "method": "onBreakpointChange",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : preShow
         * Gets invoked initially before rendering of UI
         * @return : NA
         */
        preShow: function () {
            var scope = this;
            try {
                this.presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'OutwardCollectionsUIModule'
                });
                globalView = this.view.formTemplate12.flxContentTCCenter;
                contentPopupScope = this.view.formTemplate12.flxContentPopup;
                OUTWARD_COLLECTIONS_AMENDMENT_STATUSES = OLBConstants.OUTWARD_COLLECTION_AMENDMENTS_STATUS;
                outwardcollection_status = this.presenter.collectionStatusConfig;
                contentPopupScope.flxViewSBLCDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
                scope.seti18nkeys();
                scope.setCollectionSummary();
                scope.setsegAmdConsolidatedWidgetDataMap();
                scope.setsegCollectionDetails();
                scope.setAmendmentDetails();
            } catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : postShow
         * Gets invoked initially after rendering of UI
         * @return : NA
         */
        postShow: function () {
            var scope = this;
            try {
                scope.initButtonActions();
                globalView.flxCollectionSummary.width = "100%";
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

         /**
         * @api : updateFormUI
         * This function to set UI when landing on screen.
         * @return : NA
         */
         updateFormUI: function(viewModel) {
            var scope = this;
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },

        seti18nkeys: function () {
            var scope = this;
            try {
                scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale() === "ar_AE" ? kony.i18n.getLocalizedString("i18n.TradeFinance.viewConsolidated") + " - " + kony.i18n.getLocalizedString("i18n.ImportLC.Amendments") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + kony.i18n.getLocalizedString("i18n.ImportLC.Amendments") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.viewConsolidated"); 
                globalView.btnViewDetails.text = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                globalView.lblSumaryHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionSummary");
                globalView.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
            } catch (err) {
                var errorObj = {
                    "method": "seti18nkeys",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * @api : initButtonActions
         * This function is for defining the widget actions
         * @return : NA
         */
        initButtonActions: function () {
            var scope = this;
            try {
                globalView.btnViewDetails.onClick = scope.appendResponses.bind(this);
                globalView.btnBack.onClick = scope.navigateToBack.bind(this);
            } catch (err) {
                var errorObj = {
                    "method": "initButtonActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setsegCollectionDetails: function () {
            var scope = this;
            try {
                let collectionSummaryPopupRef = contentPopupScope.flxViewSBLCDetailsPopup;
                collectionSummaryPopupRef.segDetails.sectionHeaderTemplate = 'flxTempFrmViewDetailsOutward';
                collectionSummaryPopupRef.segDetails.rowTemplate = 'flxGuaranteeReceivedDetails';
                collectionSummaryPopupRef.segDetails.widgetDataMap = {
                    "lblHeading": "lblHeading",
                    "lblDropdownIcon": "lblDropdownIcon",
                    "flxDropdown": "flxDropdown",
                    "flxMain": "flxMain",
                    "lblKey": "lblKey",
                    "lblValue": "lblValue",
                    "flxDocument": "flxDocument",
                    "flxDownloadImage": "flxDownloadImage",
                    "flxTempFrmViewDetailsOutward": "flxTempFrmViewDetailsOutward",
                    "flxSectionHeaderContent": "flxSectionHeaderContent",
                    "flxSeparator": "flxSeparator",
                    "flxheaderWithDropdown": "flxheaderWithDropdown",
                    "lblHeader": "lblHeader",
                    "flxDropDown": "flxDropDown",
                    "imgDropDown": "imgDropDown",
                    "lblDocumentName": "lblDocumentName",
                    "flxAddress": "flxAddress",
                    "lblAddress1": "lblAddress1",
                    "lblAddress2": "lblAddress2",
                    "lblAddress3": "lblAddress3",
                    "btnAction": "btnAction"
                };
            } catch (err) {
                var errorObj = {
                    "method": "renderCollectionSummaryPopup",
                    "error": err 
                };
                scope.onError(errorObj);
            }
        },

        setsegAmdConsolidatedWidgetDataMap: function () {
            var scope = this;
            try {
                globalView.segAmendmentListContent.rowTemplate = "flxAmendRowTemplate";
                globalView.segAmendmentListContent.sectionHeaderTemplate = "flxReviewHeader";
                globalView.segAmendmentListContent.widgetDataMap = {
                    "btnViewRespond": "btnViewRespond",
                    "flxAmendRowTemplate": "flxAmendRowTemplate",
                    "flxBottomSeparator": "flxBottomSeparator",
                    "flxButtonActions": "flxButtonActions",
                    "flxDropDown": "flxDropDown",
                    "flxReviewHeader": "flxReviewHeader",
                    "flxReviewRight": "flxReviewRight",
                    "flxReviewValues": "flxReviewValues",
                    "flxSeparator1": "flxSeparator1",
                    "flxSeparator2": "flxSeparator2",
                    "flxheaderWithDropdown": "flxheaderWithDropdown",
                    "flxreviewRows": "flxreviewRows",
                    "imgDaysLeft": "imgDaysLeft",
                    "imgDropDown": "imgDropDown",
                    "lblDaysLeft": "lblDaysLeft",
                    "lblReview": "lblReview",
                    "lblReviewValue1": "lblReviewValue1",
                    "lblTransactionHeader": "lblTransactionHeader"
                };
            } catch (err) {
                var errorObj = {
                    "method": "setsegAmdConsolidatedWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api :setAmendmentDetails
         * setting amendment details 
         * @return : NA
         */
        setAmendmentDetails: function () {
            var scope = this;
            let amendmentConsolidated = [],
                amendmentRequestedArray = [],
                amendmentOverviewArray = [];
            let data = amendmentResponse;
            try {
                data.map((tempData, index) => {
                    amendmentOverviewArray = [{
                        lblTransactionHeader: {
                            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.Amendment", false) + " " + (data.length - index),
                            left: "2%"
                        },
                        flxDropDown: {
                            isVisible: false
                        },
                        flxheaderWithDropdown: {
                            skin: "slFboxffffff"
                        },
                        flxSeparator2: {
                            isVisible: true,
                            width: "100%"
                        },
                        flxReviewHeader: {
                            skin: "slFbox"
                        }
                    },
                    [
                        {
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.status ? scope.presenter.getDynamicData(tempData, 'status') : NA,
                                skin: "ICSknlbl424242SSP15pxSemibold",
                                left: "58dp" 
                            }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
                                left: "24dp",
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false
                            },
                            lblReviewValue1: {
                                text: tempData.reasonForReturn ? scope.presenter.getDynamicData(tempData, 'reasonForReturn') : NA,
                                left: "58dp",
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false
                            },
                            flxreviewRows : {
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false
                            }
                        }, {
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", false),
                                left: "24dp",
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED ? true : false
                            },
                            lblReviewValue1: {
                                text: tempData.reasonForRejection ? scope.presenter.getDynamicData(tempData, 'reasonForRejection') : NA,
                                left: "58dp",
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED ? true : false
                            },
                            flxreviewRows : {
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED ? true : false
                                }
                            }, {
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.updatedOn ? scope.presenter.getConvertedDate(tempData, 'updatedOn') : NA,
                                left: "58dp"
                            }
                            }, {
                                lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturnedWithColon", false),
                                left: "24dp",
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK && tempData.reasonForReturn) ? true : false
                            },
                            lblReviewValue1: {
                                text: tempData.reasonForReturn ? scope.presenter.getDynamicData(tempData, 'reasonForReturn') : NA,
                                left: "58dp",
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK && tempData.reasonForReturn) ? true : false
                            },
                            flxreviewRows : {
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK && tempData.reasonForReturn) ? true : false
                            }
                        }, {
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", true),
                                left: "24dp",
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && tempData.cancellationStatus ? true : false
                            },
                            lblReviewValue1: {
                                text: tempData.cancellationStatus ? scope.presenter.getDynamicData(tempData, 'cancellationStatus') : NA,
                                left: "58dp",
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && tempData.cancellationStatus ? true : false
                            },
                            flxreviewRows : {
                                isVisible: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.SUBMITTED_TO_BANK || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED) && tempData.cancellationStatus ? true : false
                            }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNumber", true),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.amendmentNo ? scope.presenter.getDynamicData(tempData, 'amendmentNo') : NA,
                                left: "58dp"
                            }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.requestedOn", true),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.requestedOn ? scope.presenter.getConvertedDate(tempData, 'requestedOn') : NA,
                                left: "58dp",
                            }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
                                left: "24dp",
                            },
                            lblReviewValue1: {
                                text: tempData.amendmentReference ? scope.presenter.getDynamicData(tempData, 'amendmentReference') : NA,
                                left: "58dp",
                            },
                            flxreviewRows: {
                                bottom: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED) ? "5dp" : "20dp"
                                }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.courierTrackingDetails", true),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.courierTrackingDetails ? scope.presenter.getDynamicData(tempData, 'courierTrackingDetails') : NA,
                                left: "58dp"
                            },
                            flxreviewRows : {
                                isVisible:(tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED) ? true : false,
                                bottom: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.APPROVED || tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.REJECTED) ? "20dp" : "0dp"
                            }
                        }             
                    ]
                ],
                amendmentRequestedArray = [
                    {
                        lblTransactionHeader: {
                            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
                            top: "10dp",
                            left: "2%"
                        },
                        flxheaderWithDropdown: {
                            height: "40dp",
                            skin: "sknFlexF9F9F9"
                        },
                        flxDropDown: {
                            top: "8dp",
                            onClick: scope.onActionClick.bind(this, "segAmendmentListContent")
                        },
                        flxSeparator2: {
                            isVisible: false
                        },
                        imgDropDown: "dropdown_collapse.png"
                    },
                    [
                        {
                            lblReview: {
                                text: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? scope.presenter.renderI18nKeys("i18n.TradeFinance.ChargesDebitAccount", true) : scope.presenter.renderI18nKeys("i18n.StopCheckPayments.Amount", false),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: (tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK && tempData.chargesDebitAccount) ? scope.presenter.getAccountDisplayName(tempData.chargesDebitAccount) : (tempData.currency && tempData.amount) ? tempData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(tempData.amount) : NA,
                                left: "58dp" 
                            }
                        },{
                            lblReview: {
                                text: scope.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
                                left: "24dp"
                            },
                            lblReviewValue1: {
                                text: tempData.messageToBank ? scope.presenter.getDynamicData(tempData, 'messageToBank') : NA,
                                left: "58dp"
                            },
                            flxreviewRows: {
                                bottom: tempData.status !== OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? "20dp" : "0dp"
                            }
                        },{
                            flxButtonActions: {
                                isVisible: tempData.status === OUTWARD_COLLECTIONS_AMENDMENT_STATUSES.RETURNED_BY_BANK ? true : false,
                                bottom: "20dp"
                            },
                            btnViewRespond: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.viewAndRespond", false),
                                onClick: scope.viewAndRespondOnClick.bind(this, tempData)
                            },
                            flxreviewRows: {
                                isVisible: false
                            }
                        }
                    ]   
                ]
                amendmentConsolidated.push(amendmentOverviewArray);
                amendmentConsolidated.push(amendmentRequestedArray);
            })
                globalView.segAmendmentListContent.setData(amendmentConsolidated);
            } catch (err) {
                var errorObj = {
                    "method": "setAmendmentDetails",
                    "error": err
                };
                scope.onError(errorObj)             
            }
        },


        collectionOverView: function() {
            var scope = this;
            try {
                collectionOverViewArray = [
                    [{
                            "lblHeader": {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false),
                                skin: "ICSknlbl424242SSP15pxSemibold",
                                isVisible: true
                            },
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                        }, // Section Header Template
                        [
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true),
                            "lblValue": collectionResponse.collectionReference ? scope.presenter.getDynamicData(collectionResponse, 'collectionReference') : NA
                        }, 
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.updatedOn", true),
                            "lblValue": collectionResponse.updatedOn ? scope.presenter.getConvertedDate(collectionResponse, 'updatedOn') : NA,
                        }, 
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                            "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'status') : NA
                        }
                        ]
                    ]
                ];
                // If status is Rejected
                if (collectionResponse.status === outwardcollection_status['Rejected']) {
                    collectionOverViewArray[0][1].push(
                        [
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejectionWithColon", true),
                            "lblValue": collectionResponse.reasonForRejection ? scope.presenter.getDynamicData(collectionResponse, 'reasonForRejection') : NA
                        }
                        ]
                    )
                } else if (collectionResponse.status === outwardcollection_status['Returned by Bank']) {
                    collectionOverViewArray[0][1].push({
                        "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
                        "lblValue": collectionResponse.reasonForReturn ? scope.presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
                    })
                } else if (collectionResponse.status === outwardcollection_status['Rejected'] || collectionResponse.status === outwardcollection_status['Settled'] || collectionResponse.status === outwardcollection_status['Approved'] || collectionResponse.status === outwardcollection_status['Overdue']) {
                    collectionOverViewArray[0][1].push({
                        "lblKey": scope.presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
                        "lblValue": collectionResponse.maturityDate ? scope.presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA
                    },
                    {
                        "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.reasonForReturned", true),
                        "lblValue": collectionResponse.reasonForReturn ? scope.presenter.getDynamicData(collectionResponse, 'reasonForReturn') : NA
                    },
                    {
                        "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.requestPaymentStatus", true),
                        "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
                    },
                    {
                        "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessagefromBank", true),
                        "lblValue": collectionResponse.messageFromBank ? scope.presenter.getDynamicData(collectionResponse, 'messageFromBank') : NA
                    })
                }
            } catch (err) {
                var errorObj = {
                    "method": "collectionOverViewArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        paymentDetails: function() {
            var scope = this;
            try {
                paymentStatusArray = [
                    [
                        {
                            "lblHeader": scope.presenter.renderI18nKeys("i18n.TransfersEur.PaymentDetails", false),
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                        }, // Section Header Template
                    [
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.paymentStatusWithColon", false),
                            "lblValue": collectionResponse.paymentStatusWith ? scope.presenter.getDynamicData(collectionResponse, 'paymentStatus') : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.settledAmount", false),
                            "lblValue": collectionResponse.amount ? scope.presenter.getDynamicData(collectionResponse, 'amount') : NA,
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                            "lblValue": collectionResponse.status ? scope.presenter.getDynamicData(collectionResponse, 'status') : NA
                        }
                    ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "paymentStatusArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        draweeConsent: function() {
            var scope = this;
            try {
                draweeConsentArray = [
                    [
                        {
                            "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false),
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                            
                        }, // Section Header Template
                        [
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.wealth.acknowledgement", true),
                            "lblValue": collectionResponse.draweeAcknowledgment ? scope.presenter.getDynamicData(collectionResponse, 'draweeAcknowledgment') : NA
                        }, {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.acceptance", true),
                            "lblValue": collectionResponse.draweeAcceptance ? scope.presenter.getDynamicData(collectionResponse, 'draweeAcceptance') : NA,
                        }, {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeSigned", true),
                            "lblValue": collectionResponse.isBillExchangeSigned ? scope.presenter.getDynamicData(collectionResponse, 'isBillExchangeSigned') : NA
                        }]
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

        colletionDetails: function() {
            var scope = this;
            try {
                collectionDetailsArray = [
                    [
                        {
                            "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false),
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                        }, // Section Header Template
                        [
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.documentNumberWithColon", false),
                            "lblValue": collectionResponse.documentNo ? scope.presenter.getDynamicData(collectionResponse, 'documentNo') : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.createdOnWithColon", false),
                            "lblValue": collectionResponse.createdOn ? scope.presenter.getConvertedDate(collectionResponse, 'createdOn') : NA,
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                            "lblValue": collectionResponse.tenorType ? scope.presenter.getDynamicData(collectionResponse, 'tenorType') : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", true),
                            "lblValue": collectionResponse.usanceDays ? scope.presenter.getDynamicData(collectionResponse, 'usanceDays') : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetailsWithColon", false),
                            "lblValue": collectionResponse.usanceDetails ? scope.presenter.getDynamicData(collectionResponse, 'usanceDetails') : NA,
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.allowUserAcceptance", true),
                            "lblValue": collectionResponse.allowUsanceAcceptance ? scope.presenter.getDynamicData(collectionResponse, 'allowUsanceAcceptance') : NA
                        },
                        {
                            "lblKey": {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.amountaAndAccountDetails", false),
                                skin: "ICSknlbl424242SSP13pxSemibold",
                            },
                            "lblValue": {
                                isVisible: false,
                            },
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.requestAmountWithColon", false),
                            "lblValue": collectionResponse.amount && collectionResponse.currency ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount) : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.amountCreditAccount", false),
                            "lblValue": collectionResponse.creditAccount ? scope.presenter.getAccountDisplayName(collectionResponse.creditAccount) : NA
                        }, {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitAccountWithColon", false),
                            "lblValue": collectionResponse.debitAccount ? scope.presenter.getAccountDisplayName(collectionResponse.debitAccount) : NA
                        }, ]
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
        
        draweeAndBankDetails: function() {
            var scope = this;
            try {
                let bankAddress = scope.presenter.getMethodForAddress(collectionResponse.collectingBankAddress);
                let draweeAddress = scope.presenter.getMethodForAddress(collectionResponse.draweeAddress);
                draweeAndBankDetailsArray = [
                    [
                        {
                            "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeAndCollectingBankDetails", false),
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                        }, // Section Header Template
                        [
                            {
                                "lblKey": {
                                    text: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeDetails", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold"
                                },
                                "lblValue": {
                                    isVisible: false,
                                }
                            },
                            {
                                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeName", true),
                                "lblValue": collectionResponse.draweeName ? scope.presenter.getDynamicData(collectionResponse, 'draweeName') : NA,
                            },
                            Object.assign({
                                "lblKey": {
                                    text: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeAddressWithOptional", true),
                                    skin: "bbSknLbl727272SSP15Px",
                                 },
                                "lblValue": {
                                    isVisible: !draweeAddress['flxAddress']['isVisible'],
                                    text: NA,
                                },
                                template: "flxGuaranteeReceivedDetails",
                            }, draweeAddress),
                            {
                                "lblKey": {
                                    text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", false),
                                    skin: "ICSknlbl424242SSP13pxSemibold",
                                },
                                "lblValue": {
                                    isVisible: false,
                                },
                            },
                            {
                                "lblKey": scope.presenter.renderI18nKeys("i18n.payee.bankname", false),
                                "lblValue": collectionResponse.collectingBank ? scope.presenter.getDynamicData(collectionResponse, 'collectingBank') : NA
                            },
                            {
                                "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.swift/BicCodeWithColon", false),
                                "lblValue": collectionResponse.swiftOrBicCode ? scope.presenter.getDynamicData(collectionResponse, 'swiftOrBicCode') : NA
                            },
                            Object.assign({
                                "lblKey": {
                                    text: scope.presenter.renderI18nKeys("i18n.TradeFinance.bankAddressWithColon", false),
                                    skin: "bbSknLbl727272SSP15Px",
                                 },
                                "lblValue": {
                                    isVisible: !bankAddress['flxAddress']['isVisible'],
                                    text: NA,
                                },
                                template: "flxGuaranteeReceivedDetails",
                            }, bankAddress),
                        ]
                    ]
                ];
            } catch (err) {
                var errorObj = {
                    "method": "draweeAndBankDetailsArray",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        documentAndBankInstruction: function() {
            var scope = this;
            try {
                let docResponse = collectionResponse.uploadDocuments ? collectionResponse.uploadDocuments : NA;
                let tempDocResponse = "";
                if (docResponse !== NA) {
                    docResponse = JSON.parse(collectionResponse.uploadDocuments.replace(/'/g, "\""));
                    docResponse.map((item, index) => {
                        tempDocResponse = (tempDocResponse + item.documentName) + (docResponse.length - 1 === index ? '' : '\n');
                    });
                } else {
                    tempDocResponse = NA;
                }
                documentAndBankInstructionArray = [
                    [
                        {
                            "lblHeader": scope.presenter.renderI18nKeys("i18n.TradeFinance.documentsAndBankInstruction", false),
                            "flxDropDown": {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            "imgDropDown": "dropdown_collapse.png",
                        }, // Section Header Template
                        [
                        {
                            "lblKey": {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.uploadAndPhysicalDocumentCounts", false),
                                skin: "ICSknlbl424242SSP13pxSemibold",
                                //innerWidth:"preferred"
                            },
                            "lblValue": {
                                isVisible: false,
                            }
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.uploadedDocumentsWithColon", false),
                            "lblValue": tempDocResponse
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.physicalDocumentDetailsWithColon", false),
                            "lblValue": {
                                text: scope.presenter.getPhysicalDocumentCount(collectionResponse.physicalDocuments),
                            }
                        },
                        {
                            "lblKey": {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.bankInstructions", false),
                                skin: "ICSknlbl424242SSP13pxSemibold",
                            },
                            "lblValue": {
                                isVisible: false,
                            },
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", true),
                            "lblValue": collectionResponse.incoTerms ? scope.presenter.getDynamicData(collectionResponse, 'incoTerms') : NA
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.deliveryInstructionsOptional", true),
                            "lblValue": 
                            {
                                text: collectionResponse.deliveryInstructions ? scope.presenter.getDynamicData(collectionResponse, 'deliveryInstructions') : NA,
                            }
                        }, {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.otherCollectionDetailsWithOptional", true),
                            "lblValue": {
                                text: collectionResponse.otherCollectionDetails ? scope.presenter.getDynamicData(collectionResponse, 'otherCollectionDetails') : NA,
                            }
                        },
                        {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankOptional", true),
                            "lblValue": 
                            {
                                text: collectionResponse.messageToBank ? scope.presenter.getDynamicData(collectionResponse, 'messageToBank') : NA,
                            }
                        }, {
                            "lblKey": scope.presenter.renderI18nKeys("i18n.TradeFinance.instructionForBills", true),
                            "lblValue": 
                            {
                                text: scope.presenter.processDocsAndInstructionBills(collectionResponse, 'instructionsForBills'),
                            },
                            "flxMain": {
                                bottom: "20dp"
                            }
                        }, ]
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

        appendResponses: function() {
            var scope = this;
            try {
                let collectionSummaryPopupRef = contentPopupScope.flxViewSBLCDetailsPopup;
                contentPopupScope.lblViewSBLCHeader.text = kony.i18n.getCurrentLocale() === "ar_AE" ? kony.i18n.getLocalizedString("i18n.common.ViewDetails") + " - " + collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") : kony.i18n.getLocalizedString("i18n.TradeFinance.outwardCollection") + " - " + collectionResponse.collectionReference + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                collectionSummaryPopupRef.flxCrossSBLC.cursorType = "pointer";
                collectionSummaryPopupRef.flxCrossSBLC.onClick = scope.togglePopUp.bind(this);
                scope.collectionOverView();
                if (collectionResponse.status === outwardcollection_status['Settled']) {
                    scope.paymentDetails();
                } else if (collectionResponse.status === outwardcollection_status['Approved'] || collectionResponse.status === outwardcollection_status['Overdue']) {
                    scope.draweeConsent();
                }
                scope.colletionDetails();
                scope.draweeAndBankDetails();
                scope.documentAndBankInstruction();
                let setSegData = [...collectionOverViewArray, ...paymentStatusArray, ...draweeConsentArray, ...collectionDetailsArray, ...draweeAndBankDetailsArray, ...documentAndBankInstructionArray];
                contentPopupScope.segDetails.setData(setSegData);
                scope.togglePopUp();
            } catch (err) {
                var errorObj = {
                    "method": "appendResponses",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },


         /**
         * @api : togglePopUp
         * Hiding and showing the popup
         * @return : NA
         */
          togglePopUp: function () {
            var scope = this;
            try {
                contentPopupScope.setVisibility(!contentPopupScope.isVisible);
                contentPopupScope.flxViewSBLCDetailsPopup.setVisibility(contentPopupScope.isVisible);
            } catch (err) {
                var errorObj = {
                    "method": "togglePopUp",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },


        /**
         * @api : onActionClick
         * Triggerd on click of dropdown in segment
         * @return : NA
        */
        onActionClick: function (segName) {
            var scopeObj = this;
            try {
                var segScope;
                if (segName === "segDetails") {
                    segScope = contentPopupScope;
                } else {
                    segScope = globalView;
                }
                var index = segScope[segName].selectedRowIndex;
                var sectionIndex = index[0];
                var data = segScope[segName].data;
                var selectedHeaderData = data[sectionIndex][0];
                if (this.segViewDetailsTempData === "") {
                    this.segViewDetailsTempData = JSON.parse(JSON.stringify(segScope[segName].data));
                }
                if (selectedHeaderData["imgDropDown"] === "dropdown_expand.png") {
                    selectedHeaderData["imgDropDown"] = "dropdown_collapse.png";
                    data[sectionIndex][1] = this.segViewDetailsTempData[sectionIndex][1];
                    segScope[segName].setData(data);
                } else {
                    selectedHeaderData["imgDropDown"] = "dropdown_expand.png";
                    data[sectionIndex][1] = [];
                    segScope[segName].setData(data);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onActionClick",
                    "error": err
                };
                scopeObj.onError(errorObj);
            }
        },


         /**
         * @api :viewAndRespondOnClick
         * on click of View and Respond
         * @return : NA
         */
          viewAndRespondOnClick: function (selectedRecord) {
            var scope = this;
            try {
                scope.presenter.showOutwardCollectionScreen({
                    context: "amendViewDetails",
                    form: scope.view.id,
                    data: selectedRecord
                });
            } catch (err) {
                var errorObj = {
                    "method": "viewAndRespondOnClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

         /**
         * @api :navigateToBack
         * Navigating to back
         * @return : NA
         */
          navigateToBack: function () {
            var scope = this;
            try {
				this.navManager = applicationManager.getNavigationManager();
                let tempData = {};
                tempData["response"] = serviceResponse;
                tempData["flowType"] = viewAllAmendments;
				let formName = "frmOutwardCollectionsViewDetails";
                tempData.previousFormName = 'frmOutwardCollectionAmendmentsConsolidatedView'
				this.navManager.navigateTo({
                    appName: "TradeFinanceMA",
                    friendlyName: formName
                }, false, tempData);
            } catch (err) {
                var errorObj = {
                    "method": "navigateToBack",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        setCollectionSummary: function () {
            var scope = this;
            try {
                globalView.lblDrawerDetailsKey.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true);
                globalView.lblDrawerDetailsValue.text = collectionResponse.draweeName ? scope.presenter.getDynamicData(collectionResponse, 'draweeName') : NA;
                globalView.lblTransactionRefDetailsKey.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.transactionsRef", true);
                globalView.lblTransactionRefDetailsValue.text = collectionResponse.collectionReference ? scope.presenter.getDynamicData(collectionResponse, 'collectionReference') : NA;
                globalView.lblAmountDetailsKey.text = scope.presenter.renderI18nKeys("i18n.wealth.amount", true);
                globalView.lblAmountDetailsValue.text = (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + collectionResponse.amount : NA;
                globalView.lblTenorTypeDetailsKey.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true);
                globalView.lblTenorTypeDetailsValue.text = collectionResponse.tenorType ? scope.presenter.getDynamicData(collectionResponse, 'tenorType') : NA;
                globalView.lblMaturityDateKey.text = scope.presenter.renderI18nKeys("kony.mb.accdetails.maturityDate", true);
                globalView.lblMaturityDateValue.text = collectionResponse.maturityDate ? scope.presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA;
                globalView.lblRemittingBankDetailsKey.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBankDetails", true);
                globalView.lblRemittingBankValue.text = collectionResponse.collectingBank ? scope.presenter.getDynamicData(collectionResponse, 'collectingBank') : NA;
            } catch (err) {
                var errorObj = {
                    "method": "setCollectionSummary",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },


        /**
         * @api :onError
         * Error thrown from catch block in component and shown on the form
         * @return : NA
         */
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmOutwardCollectionAmendmentsConsolidatedViewController";
            // kony.ui.Alert(errMsg);
        },
    };
});