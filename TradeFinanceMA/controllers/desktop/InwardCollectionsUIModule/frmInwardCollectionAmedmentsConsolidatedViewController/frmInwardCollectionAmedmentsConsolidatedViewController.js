define(['OLBConstants'], function (OLBConstants) {
    let groupOfAmendmentsResponse;
    let collectionSummery;
    let globalView, contentPopupScope;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let INWARD_COLLECTION_AMENDMENTS_STATUSES;
    let completeServiceResponse;
    let viewAllAmendments = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllAmendments");
    return {
        onNavigate: function (data) {
            var scope = this;
            try {
                completeServiceResponse = data.serviceResponse !== undefined ? data.serviceResponse : data;
                groupOfAmendmentsResponse = [...completeServiceResponse.groupAmendmentResponse];
                collectionSummery = completeServiceResponse.collectionResponse;
                scope.segViewDetailsTempData = "";
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
                    moduleName: 'InwardCollectionsUIModule'
                });
                globalView = this.view.formTemplate12.flxContentTCCenter;
                contentPopupScope = this.view.formTemplate12.flxContentPopup;
                INWARD_COLLECTION_AMENDMENTS_STATUSES = OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS;
                scope.seti18nkeys();
                scope.setCollectionSummary();
                scope.setsegAmdConsolidatedWidgetDataMap();
                scope.setAmendmentConsolidatedData();
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
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        seti18nkeys: function () {
            var scope = this;
            try {
                scope.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollection") + " - " + kony.i18n.getLocalizedString("i18n.ImportLC.Amendments") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.viewConsolidated");
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
                globalView.btnViewDetails.onClick = scope.renderCollectionSummeryPopup.bind(this);
                globalView.btnBack.onClick = scope.navigateToBack.bind(this);
            } catch (err) {
                var errorObj = {
                    "method": "initButtonActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : renderCollectionSummeryPopup
         * Render Collection Summery Popup
         * @return : NA
         */
        renderCollectionSummeryPopup: function () {
            var scope = this;
            try {
                let collectionSummeryPopupRef = contentPopupScope.flxViewSBLCDetailsPopup;
                contentPopupScope.lblViewSBLCHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollection") + " - " + collectionSummery.collectionSrmsId + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                collectionSummeryPopupRef.flxCrossSBLC.cursorType = "pointer";
                collectionSummeryPopupRef.flxCrossSBLC.onClick = scope.togglePopUp.bind(this);
                collectionSummeryPopupRef.segDetails.sectionHeaderTemplate = 'flxReviewHeader';
                collectionSummeryPopupRef.segDetails.rowTemplate = 'flxCollectionAmendRowDetails';

                collectionSummeryPopupRef.segDetails.widgetDataMap = {
                    "flxheaderWithDropdown": "flxheaderWithDropdown",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "flxDropDown": "flxDropDown",
                    "imgDropDown": "imgDropDown",
                    "lblReview": "lblReview",
                    "lblReviewValue1": "lblReviewValue1",
                    "imgDaysLeft": "imgDaysLeft",
                    "lblDaysLeft": "lblDaysLeft"
                };
                let collectionOverView = [
                    [
                        {
                            lblTransactionHeader: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false)
                            },
                            flxDropDown: {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            imgDropDown: "dropdown_collapse.png",
                            flxheaderWithDropdown: {
                                "skin": "ICSknFlxF8F7F8"
                            }
                        },
                        [
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
                                lblReviewValue1: collectionSummery.collectionSrmsId ? scope.presenter.getDynamicData(collectionSummery, 'collectionSrmsId') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
                                lblReviewValue1: collectionSummery.documentNo ? scope.presenter.getDynamicData(collectionSummery, 'documentNo') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.receivedOnWithColon", false),
                                lblReviewValue1: collectionSummery.receivedOn ? scope.presenter.getConvertedDate(collectionSummery, 'receivedOn') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.serviceRequests.Status:", false),
                                lblReviewValue1: collectionSummery.status ? scope.presenter.getDynamicData(collectionSummery, 'status') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceEligible", false),
                                lblReviewValue1: collectionSummery.usanceAcceptanceEligibility ? scope.presenter.getDynamicData(collectionSummery, 'usanceAcceptanceEligibility') : NA
                            }
                        ]
                    ]
                ];
                let draweeConsent = [
                    [
                        {
                            lblTransactionHeader: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false)
                            },
                            flxDropDown: {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            imgDropDown: "dropdown_collapse.png",
                            flxheaderWithDropdown: {
                                skin: "ICSknFlxF8F7F8",
                            }
                        },
                        [
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
                                lblReviewValue1: collectionSummery.draweeAcknowledgement ? scope.presenter.getDynamicData(collectionSummery, 'draweeAcknowledgement') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptance", false),
                                lblReviewValue1: collectionSummery.usanceAcceptance ? scope.presenter.getDynamicData(collectionSummery, 'usanceAcceptance') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceDate", false),
                                lblReviewValue1: collectionSummery.usanceAcceptanceDate ? scope.presenter.getConvertedDate(collectionSummery, 'usanceAcceptanceDate') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeStatus", false),
                                lblReviewValue1: collectionSummery.billExchangeStatus ? scope.presenter.getDynamicData(collectionSummery, 'billExchangeStatus') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFromWithColon", false),
                                lblReviewValue1: collectionSummery.debitAmountFrom ? scope.presenter.getDynamicData(collectionSummery, 'debitAmountFrom') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitFrom", false),
                                lblReviewValue1: collectionSummery.chargesDebitFrom ? scope.presenter.getDynamicData(collectionSummery, 'chargesDebitFrom') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
                                lblReviewValue1: collectionSummery.messageToBank ? scope.presenter.getDynamicData(collectionSummery, 'messageToBank') : NA
                            }
                        ]
                    ]
                ];
                let tempMaturityData = scope.presenter.calculateMaturityDate(collectionSummery.maturityDate);
                let tempDocs = '';
                if (collectionSummery.hasOwnProperty('documentsUploaded') && this.presenter.isEmptyNullOrUndefined(collectionSummery.documentsUploaded)) {
                    let docsResponse = JSON.parse(collectionSummery.documentsUploaded.replace(/'/g, "\""));
                    docsResponse.map((item, index) => {
                        tempDocs = (tempDocs + item.documentName) + (docsResponse.length === (index + 1) ? '' : '\n');
                    });
                } else {
                    tempDocs = NA;
                }
                let collectionDetails = [
                    [
                        {
                            lblTransactionHeader: {
                                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false)
                            },
                            flxDropDown: {
                                isVisible: true,
                                onClick: scope.onActionClick.bind(this, "segDetails")
                            },
                            imgDropDown: "dropdown_collapse.png",
                            flxheaderWithDropdown: {
                                skin: "ICSknFlxF8F7F8",
                            }
                        },
                        [
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true),
                                lblReviewValue1: collectionSummery.drawerName ? scope.presenter.getDynamicData(collectionSummery, 'drawerName') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.StopCheckPayments.Amount", false),
                                lblReviewValue1: (collectionSummery.currency && collectionSummery.amount) ? collectionSummery.currency + " " + collectionSummery.amount : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("kony.mb.loans.Charges", false),
                                lblReviewValue1: (collectionSummery.currency && collectionSummery.charges) ? collectionSummery.currency + " " + collectionSummery.charges : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.mortgageAccount.MaturityDate", false),
                                lblReviewValue1: {
                                    text: collectionSummery.maturityDate ? scope.presenter.getConvertedDate(collectionSummery, 'maturityDate') : NA,
                                    width: '90dp'
                                },
                                imgDaysLeft: {
                                    isVisible: tempMaturityData.imageToLoad ? true : false,
                                    src: tempMaturityData.imageToLoad ? tempMaturityData.imageToLoad : ''
                                },
                                lblDaysLeft: {
                                    isVisible: tempMaturityData.daysLeft ? true : false,
                                    text: tempMaturityData.daysLeft ? tempMaturityData.daysLeft : ''
                                }
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                                lblReviewValue1: collectionSummery.tenorType ? scope.presenter.getDynamicData(collectionSummery, 'tenorType') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
                                lblReviewValue1: collectionSummery.usanceDetails ? scope.presenter.getDynamicData(collectionSummery, 'usanceDetails') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.capitalINCOTerms", false),
                                lblReviewValue1: collectionSummery.incoTerms ? scope.presenter.getDynamicData(collectionSummery, 'incoTerms') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                                lblReviewValue1: collectionSummery.remittingBank ? scope.presenter.getDynamicData(collectionSummery, 'remittingBank') : NA
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.documentsWithColon", false),
                                lblReviewValue1: tempDocs
                            },
                            {
                                lblReview: scope.presenter.renderI18nKeys("i18n.TradeFinance.messageFromBankWithColon", false),
                                lblReviewValue1: {
                                    text: collectionSummery.messageFromBank ? scope.presenter.getDynamicData(collectionSummery, 'messageFromBank') : NA,
                                    bottom: '10dp'
                                },
                                flxReviewRows: {
								    top : "15dp"
							    }
                            }
                        ]
                    ]
                ];
                let collectionSummeryPopupSegData = [
                    ...collectionOverView,
                    ...draweeConsent,
                    ...collectionDetails
                ];
                collectionSummeryPopupRef.segDetails.setData(collectionSummeryPopupSegData);
                scope.togglePopUp();
            } catch (err) {
                var errorObj = {
                    "method": "renderCollectionSummeryPopup",
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

        setCollectionSummary: function () {
            var scope = this;
            let tempMaturityDate = scope.presenter.calculateMaturityDate(collectionSummery.maturityDate);
            try {
                globalView.lblDrawerDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.drawerDetails") + ":";
                globalView.lblDrawerDetailsValue.text = collectionSummery.drawerName ? scope.presenter.getDynamicData(collectionSummery, 'drawerName') : NA;
                globalView.lblTransactionRefDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.transactionsRef") + ":";
                globalView.lblTransactionRefDetailsValue.text = collectionSummery.collectionSrmsId ? scope.presenter.getDynamicData(collectionSummery, 'collectionSrmsId') : NA;
                globalView.lblAmountDetailsKey.text = kony.i18n.getLocalizedString("i18n.wealth.amount") + ":";
                globalView.lblAmountDetailsValue.text = (collectionSummery.currency && collectionSummery.amount) ? collectionSummery.currency + ' ' + collectionSummery.amount : NA;
                globalView.lblTenorTypeDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.tenorType") + ":";
                globalView.lblTenorTypeDetailsValue.text = collectionSummery.tenorType ? scope.presenter.getDynamicData(collectionSummery, 'tenorType') : NA;
                globalView.lblMaturityDateKey.text = kony.i18n.getLocalizedString("kony.mb.accdetails.maturityDate") + ":";
                globalView.lblMaturityDateValue.text = collectionSummery.maturityDate ? this.presenter.getConvertedDate(collectionSummery, 'maturityDate') : NA;
                globalView.imgDaysLeft.src = tempMaturityDate.imageToLoad;
                globalView.lblDaysLeft.text = tempMaturityDate.daysLeft;
                globalView.lblRemittingBankDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.remittingBankDetails") + ":";
                globalView.lblRemittingBankValue.text = collectionSummery.remittingBank ? this.presenter.getDynamicData(collectionSummery, 'remittingBank') : NA;
            } catch (err) {
                var errorObj = {
                    "method": "setCollectionSummary",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        setsegAmdConsolidatedWidgetDataMap: function () {
            var scope = this;
            try {
                globalView.segAmendmentListContent.rowTemplate = "flxTempInwardGuaranteeAmendRow";
                globalView.segAmendmentListContent.widgetDataMap = {
                    "flxTempInwardGuaranteeAmendRow": "flxTempInwardGuaranteeAmendRow",
                    "flxAmendmentDetailsContent": "flxAmendmentDetailsContent",
                    "lblAmendmentDetails": "lblAmendmentDetails",
                    "btnViewDetails": "btnViewDetails",
                    "flxAmendmentDetailsHeaderSep": "flxAmendmentDetailsHeaderSep",
                    "flxAmendRowContent": "flxAmendRowContent",
                    "flxDetailsRow": "flxDetailsRow",
                    "lblReviewKey": "lblReviewKey",
                    "lblReviewValue": "lblReviewValue",
                    "flxDetailsRow2": "flxDetailsRow2",
                    "lblReviewDetailsKey": "lblReviewDetailsKey",
                    "lblReviewDetailsValue": "lblReviewDetailsValue",
                    "flxDetailsRow03": "flxDetailsRow03",
                    "lblReviewKey03": "lblReviewKey03",
                    "lblRevieValue3": "lblRevieValue3",
                    "flxDetailsRow4": "flxDetailsRow4",
                    "lblReviewKey4": "lblReviewKey4",
                    "lblReviewValue4": "lblReviewValue4",
                    "flxAmendDraweeConsent": "flxAmendDraweeConsent",
                    "flxAmendSectionTitle2": "flxAmendSectionTitle2",
                    "flxSeparator1": "flxSeparator1",
                    "flxheaderWithDropdown2": "flxheaderWithDropdown2",
                    "lblTransactionHeaderTitle": "lblTransactionHeaderTitle",
                    "flxDropDown2": "flxDropDown2",
                    "imgDropDown2": "imgDropDown2",
                    "flxDraweeContent2": "flxDraweeContent2",
                    "flxDetailsRowDrawee": "flxDetailsRowDrawee",
                    "lblReviewKeyDrawee": "lblReviewKeyDrawee",
                    "lblReviewValueDrawee": "lblReviewValueDrawee",
                    "flxDetailsRejection": "flxDetailsRejection",
                    "lblReviewKeyRejection": "lblReviewKeyRejection",
                    "lblReviewValueRejection": "lblReviewValueRejection",
                    "flxDetailRowDrawee2": "flxDetailRowDrawee2",
                    "lblReviewDetailKeyDrawee": "lblReviewDetailKeyDrawee",
                    "lblReviewValuesDrawee": "lblReviewValuesDrawee",
                    "flxDetailRowDrawee3": "flxDetailRowDrawee3",
                    "lblDetailRowDrawee3Key": "lblDetailRowDrawee3Key",
                    "lblDetailRowDrawee3Value": "lblDetailRowDrawee3Value",
                    "flxAmendRequestedList": "flxAmendRequestedList",
                    "flxAmendSectionTitle": "flxAmendSectionTitle",
                    "flxSeparator": "flxSeparator",
                    "flxheaderWithDropdown": "flxheaderWithDropdown",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "flxDropDown": "flxDropDown",
                    "imgDropDown": "imgDropDown",
                    "flxAmendmentRequestedContent": "flxAmendmentRequestedContent",
                    "flxDetailsRow01": "flxDetailsRow01",
                    "lblReviewKey1": "lblReviewKey1",
                    "lblReviewvalue1": "lblReviewvalue1",
                    "flxDaysLeft": "flxDaysLeft",
                    "imgDaysLeft": "imgDaysLeft",
                    "lblDaysLeft": "lblDaysLeft",
                    "flxDetailsRow02": "flxDetailsRow02",
                    "lblReviewKey2": "lblReviewKey2",
                    "lblReviewValue2": "lblReviewValue2",
                    "flxDaysLeft1": "flxDaysLeft1",
                    "imgDaysLeft1": "imgDaysLeft1",
                    "lblDaysLeft1": "lblDaysLeft1",
                    "flxDetailRow4": "flxDetailRow4",
                    "lblReviewDetailKey4": "lblReviewDetailKey4",
                    "lblReviewValues4": "lblReviewValues4",
                    "flxDetailsRow3": "flxDetailsRow3",
                    "lblReviewKey3": "lblReviewKey3",
                    "lblReviewValue03": "lblReviewValue03",
                    "flxButtonActions": "flxButtonActions",
                    "btnViewRespond": "btnViewRespond",
                    "flxAmendmentDetailsContentBody": "flxAmendmentDetailsContentBody",
                    "flxDetailsRow00": "flxDetailsRow00",
                    "lblDetailsRow00Key": "lblDetailsRow00Key",
                    "lblDetailsRow00Value": "lblDetailsRow00Value",
                    "flxDraweeContent2": "flxDraweeContent2",
					"flxAmendDraweeConsent": "flxAmendDraweeConsent",
					"flxAmendmentRequestedContent": "flxAmendmentRequestedContent",
					"flxAmendRequestedList": "flxAmendRequestedList",
                    "flxReviewRows": "flxReviewRows",
                    "flxDetailsRow05": "flxDetailsRow05",
                    "lblReviewKey05": "lblReviewKey05",
                    "lblReviewValue05": "lblReviewValue05",
                    "flxDetailsRow06": "flxDetailsRow06",
                    "lblReviewKey06": "lblReviewKey06",
                    "lblReviewValue06": "lblReviewValue06"
                };
            } catch (err) {
                var errorObj = {
                    "method": "setsegAmdConsolidatedWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        setAmendmentConsolidatedData: function () {
            var scope = this;
            try {
                let consolidatedAmendmentDetails = [];
                groupOfAmendmentsResponse.map((section, index) => {
                    let tempMaturityDate = scope.presenter.calculateMaturityDate(section.maturityDate);
                    // Processing documents data
                    let docResponse = section.supportingDocuments ? section.supportingDocuments : [];
                    let tempDocResponse = "";
                    if (docResponse.length > 0) {
                        docResponse = JSON.parse(section.supportingDocuments.replace(/'/g, "\""));
                        docResponse.map((item, index) => {
                            tempDocResponse = (tempDocResponse + item) + (docResponse.length - 1 === index ? '' : '\n');
                        });
                    } else {
                        tempDocResponse = NA;
                    }
                    let tempObj = {
                        /******** Amendment Overview ********/
                        lblAmendmentDetails: scope.presenter.renderI18nKeys('i18n.TradeFinance.Amendment', false) + " " + (groupOfAmendmentsResponse.length - index),
                        btnViewDetails: {
                            text: scope.presenter.renderI18nKeys('i18n.konybb.Common.ViewDetails', false),
                            onClick: scope.viewAndRespondOnClick.bind(this, section),
                            isVisible: false
                        },
                        lblReviewKey: scope.presenter.renderI18nKeys('i18n.serviceRequests.Status:', false),
                        lblReviewValue: section.status ? scope.presenter.getDynamicData(section, 'status') : NA,
                        lblReviewDetailsKey: scope.presenter.renderI18nKeys('i18n.TradeFinance.ReceivedOn', true),
                        lblReviewDetailsValue: section.receivedOn ? scope.presenter.getConvertedDate(section, 'receivedOn') : NA,
                        lblReviewKey03: scope.presenter.renderI18nKeys('i18n.TradeFinance.AmendmentReference', true),
                        lblRevieValue3: section.amendmentSrmsId ? scope.presenter.getDynamicData(section, 'amendmentSrmsId') : NA,
                        flxDetailsRow4: {
                            // flxDetailsRow4 contains draweeAcknowledgement
                            isVisible: (section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.NEW || section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) ? true : false
                        },
                        lblReviewKey4: scope.presenter.renderI18nKeys('i18n.TradeFinance.draweeAcknowledgement', true),
                        lblReviewValue4: section.draweeAcknowledgement ? scope.presenter.getDynamicData(section, 'draweeAcknowledgement') : NA,
                        /******** Drawee Consent ********/
                        flxAmendDraweeConsent: {
                            // flxAmendDraweeConsent contains Drawee Concent
                            isVisible: (section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.NEW || section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) ? false : true
                        },
                        lblTransactionHeaderTitle: scope.presenter.renderI18nKeys('i18n.TradeFinance.draweeConsent', false),
                        flxDropDown2: {
                            cursorType: "pointer",
                            onClick: scope.segAmendmentListContentonClick.bind(this, "segAmendmentListContent", "flxDropDown2")
                        },
                        lblReviewKeyDrawee: scope.presenter.renderI18nKeys('i18n.TradeFinance.draweeAcknowledgement', true),
                        lblReviewValueDrawee: section.draweeAcknowledgement ? scope.presenter.getDynamicData(section, 'draweeAcknowledgement') : NA,
                        flxDetailRowDrawee2: {
                            // flxDetailRowDrawee2 Contains reason for rejection
                            isVisible: section.draweeAcknowledgement === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED ? true : false
                        },
                        lblReviewDetailKeyDrawee: scope.presenter.renderI18nKeys('i18n.TradeFinance.reasonForRejectionWithColon', false),
                        lblReviewValuesDrawee: section.reasonForRejection ? scope.presenter.getDynamicData(section, 'reasonForRejection') : NA,
                        lblDetailRowDrawee3Key: scope.presenter.renderI18nKeys('i18n.TradeFinance.messageToBankWithColon', false),
                        lblDetailRowDrawee3Value: section.messageToBank ? scope.presenter.getDynamicData(section, 'messageToBank') : NA,
                        /******** Amendment Requested ********/
                        lblTransactionHeader: scope.presenter.renderI18nKeys('i18n.TradeFinance.amendmentRequested', false),
                        flxDropDown: {
                            cursorType: "pointer",
                            onClick: scope.segAmendmentListContentonClick.bind(this, "segAmendmentListContent", "flxDropDown")
                        },
                        flxDetailsRow00: {
                            // flxDetailsRow00 contains Amount
                            isVisible: (section.currency && section.amount) ? true : false
                        },
                        lblDetailsRow00Key: scope.presenter.renderI18nKeys('i18n.billPayee.review.amount', false),
                        lblDetailsRow00Value: (section.currency && section.amount) ? section.currency + " " + applicationManager.getFormatUtilManager().formatAmount(section.amount) : NA,
                        flxDetailsRow01: {
                            // flxDetailsRow01 contains MaturityDate
                            top: (section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.APPROVED || section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED) ? '20dp' : '10dp',
                            isVisible: section.maturityDate ? true : false
                        },
                        lblReviewKey1: scope.presenter.renderI18nKeys('i18n.mortgageAccount.MaturityDate', false),
                        lblReviewvalue1: section.maturityDate ? scope.presenter.getConvertedDate(section, 'maturityDate') : NA,
                        imgDaysLeft: tempMaturityDate.imageToLoad,
                        lblDaysLeft: tempMaturityDate.daysLeft,
                        flxDetailsRow02: {
                            // flxDetailsRow02 contains Tenor Type:
                            isVisible: section.tenorType ? true : false
                        },
                        lblReviewKey2: scope.presenter.renderI18nKeys('i18n.TradeFinance.tenorType', true),
                        lblReviewValue2: section.tenorType ? scope.presenter.getDynamicData(section, 'tenorType') : NA,
                        flxDetailRow4: {
                            // flxDetailRow4 contains Usance Details:
                            isVisible: section.usanceDetails ? true : false
                        },
                        lblReviewDetailKey4: scope.presenter.renderI18nKeys('i18n.TradeFinance.usanceDetails', false),
                        lblReviewValues4: section.usanceDetails ? scope.presenter.getDynamicData(section, 'usanceDetails') : NA,
                        flxDetailsRow3: {
                            // flxDetailsRow3 contains Remitting Bank Details:
                            isVisible: section.usanceDetails ? true : false
                        },
                        lblReviewKey3: scope.presenter.renderI18nKeys('i18n.TradeFinance.remittingBankDetails', true),
                        lblReviewValue03: section.remittingBank ? scope.presenter.getDynamicData(section, 'remittingBank') : NA,
                        flxDetailsRow05: {
                            // flxDetailsRow05 contains Documents:
                            isVisible: tempDocResponse !== NA ? true : false
                        },
                        lblReviewKey05: scope.presenter.renderI18nKeys('i18n.TradeFinance.documentsWithColon', false),
                        lblReviewValue05: tempDocResponse,
                        flxDetailsRow06: {
                            // flxDetailsRow05 contains Message from Bank:
                            isVisible: section.messageFromBank ? true : false
                        },
                        lblReviewKey06: scope.presenter.renderI18nKeys('i18n.TradeFinance.messageFromBankWithColon', false),
                        lblReviewValue06: section.messageFromBank ? scope.presenter.getDynamicData(section, 'messageFromBank') : NA,
                        /******** View and Respond ********/
                        flxButtonActions: {
                            isVisible: (section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.NEW || section.status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) ? true : false
                        },
                        btnViewRespond: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.viewAndRespond"),
                            onClick: scope.viewAndRespondOnClick.bind(this, section)
                        },
						flxAmendDraweeConsent:{
							bottom: "20dp"
						},
						flxDraweeContent2:{
							isVisible: true
						},
						imgDropDown: {
							src: "dropdown_collapse.png"
						},
						imgDropDown2: {
							src: "dropdown_collapse.png"
						},
						flxAmendmentRequestedContent:{
							isVisible: true
						},
						flxAmendRequestedList: {
							bottom: "20dp"
						}
                    };
                    consolidatedAmendmentDetails.push(tempObj);
                });
                globalView.segAmendmentListContent.setData(consolidatedAmendmentDetails);
            } catch (err) {
                var errorObj = {
                    "method": "setAmendmentConsolidatedData",
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
                    segScope = contentScope;
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
      
      segAmendmentListContentonClick: function(segName, widgetName){
        var scope = this;
        try{
          var index = globalView[segName].selectedRowIndex;
          var sectionIndex = index[0];
          var rowIndex = index[1];
          var data = globalView[segName].data;
          if(widgetName === "flxDropDown2"){
            if (data[rowIndex].flxDraweeContent2.isVisible === false) {
              data[rowIndex].imgDropDown2.src = "arrowup_sm.png";
              data[rowIndex].flxDraweeContent2.isVisible = true;
              data[rowIndex].flxAmendDraweeConsent.bottom = "20dp"
            } else {
              data[rowIndex].imgDropDown2.src = "dropdown.png";
              data[rowIndex].flxDraweeContent2.isVisible = false;
              data[rowIndex].flxAmendDraweeConsent.bottom = "0dp"
            }
          }
          else if(widgetName === "flxDropDown"){
            if (data[rowIndex].flxAmendmentRequestedContent.isVisible === false) {
              data[rowIndex].imgDropDown.src = "arrowup_sm.png";
              data[rowIndex].flxAmendmentRequestedContent.isVisible = true;
              data[rowIndex].flxButtonActions.isVisible = true;
              data[rowIndex].flxAmendRequestedList.bottom = "20dp";
            } else {
              data[rowIndex].imgDropDown.src = "dropdown.png";
              data[rowIndex].flxAmendmentRequestedContent.isVisible = false;
              data[rowIndex].flxButtonActions.isVisible = false;
              data[rowIndex].flxAmendRequestedList.bottom = "0dp";
            }
          }
          globalView.segAmendmentListContent.setData(data, rowIndex);
        }catch (err) {
          var errorObj = {
            "method": "segAmendmentListContentonClick",
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
                completeServiceResponse["amendmentResponse"] = selectedRecord;
                let temp = {
                    serviceResponse: completeServiceResponse,
                    previousFormName: 'frmInwardCollectionAmedmentsConsolidatedView'
                };
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionAmendmentViewDetails"
                }).navigate(temp);
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
                let tempData = completeServiceResponse;
                tempData["flowType"] = viewAllAmendments;
				let formName = "frmInwardCollectionsViewDetails";
                tempData.previousFormName = 'frmInwardCollectionAmedmentsConsolidatedView'
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

        /**
         * @api :onError
         * Error thrown from catch block in component and shown on the form
         * @return : NA
         */
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = " frmInwardCollectionAmedmentsConsolidatedViewController";
            // kony.ui.Alert(errMsg);
        },
    };
});