define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
    let serviceResponse, collectionResponse, amendmentResponse;
    const ACCEPTED = kony.i18n.getLocalizedString("i18n.TradeFinance.Accepted");
    const REJECTED = kony.i18n.getLocalizedString("i18n.Search.Rejected");
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    const HEADER = 'header';
    const SWIFT_TAG = 'swiftTag';
    const SWIFT_MESSAGE_HEADER = "*********************SWIFT AUTH. CORRECT************************";
    const SWIFT_MESSAGE_DETAILS = "*********************MESSAGE************************";
    const SWIFT_MESSAGE_FOOTER = " *****************************End of Message**************************";
    let formTemplateScope, contentScope, contentPopupScope, confirmPopupScope, headerButtonsScope;
    let INWARD_COLLECTION_AMENDMENTS_STATUSES;
    let completeServiceResponse;
    let isTablet = false;
    return {
        /**
         * @api : init
         * Triggers at initial stage of form loading
         * @return : NA
         */
        init: function () {
            var scope = this;
            try {
                scope.segViewDetailsTempData = "";
                scope.view.preShow = this.preShow;
                scope.view.postShow = this.postShow;
                scope.view.onDeviceBack = function () { };
                scope.view.onBreakpointChange = scope.onBreakpointChange;
            } catch (err) {
                var errorObj = {
                    "method": "init",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : onNavigate
          * This function for executing the preShow and postShow
          * @return : NA
          */
        onNavigate: function (data) {
            var scope = this;
            try {
                scope.presenter = applicationManager.getModulesPresentationController({
                    'appName': 'TradeFinanceMA',
                    'moduleName': 'InwardCollectionsUIModule'
                });
                data = {
                    serviceResponse: {
                        collectionResponse: scope.presenter.collectionData,
                        amendmentResponse: scope.presenter.amendmentData
                    }
                };
                completeServiceResponse = data;
                serviceResponse = data.serviceResponse;
                collectionResponse = data.serviceResponse.collectionResponse;
                amendmentResponse = data.serviceResponse.amendmentResponse;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
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
                formTemplateScope = scope.view.formTemplate12;
                contentScope = formTemplateScope.flxContentTCCenter;
                contentPopupScope = formTemplateScope.flxContentPopup;
                confirmPopupScope = contentPopupScope.flxConfirmPopup.ConfirmPopup;
                headerButtonsScope = formTemplateScope.flxTCButtons;
                INWARD_COLLECTION_AMENDMENTS_STATUSES = OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS;
                scope.setDefaultUI();
                scope.seti18nKeys();
                scope.renderSwiftAndAdvices();
                scope.setDataInUIBasedOnStatus();
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
                headerButtonsScope.flxVerticalEllipsisDropdown.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "postShow",
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
          onBreakpointChange: function() {
            var scope = this;
            try {
                var currentBreakpoint = kony.application.getCurrentBreakpoint();
                if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
                    isTablet = true;
                } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                    isTablet = false;
                }
			    if(currentBreakpoint === 1024 ){
					contentPopupScope.flxSwiftMessageDetails.width = "87%";
					contentPopupScope.flxSwiftMessageDetails.left = "17dp";
					contentPopupScope.flxPaymentAdvicePopupHeader.left ="112dp";
					contentPopupScope.flxMainBodyContainer.left ="112dp";
					contentPopupScope.flxMainBodyContainer.width ="600dp";
					contentPopupScope.flxPaymentAdvicePopupHeader.width ="600dp";
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
          * @api : setDefaultUI
          * This function to set default UI when landing on screen.
          * @return : NA
          */
        setDefaultUI: function () {
            var scope = this;
            try {
                contentScope.txtReasonForRejection.text = "";
                contentScope.txtMessageToBank.text = "";
                contentScope.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                contentScope.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                contentScope.flxOtherDetails.setVisibility(false);
                contentScope.flxAcknowledgementMessage.setVisibility(false);
                contentPopupScope.flxSwiftDetailsPopup.setVisibility(false);
                contentPopupScope.flxPaymentAdvicePopup.setVisibility(false);
                contentPopupScope.flxViewSBLCDetailsPopup.setVisibility(false);
                contentScope.flxButtons.setVisibility(false);
                contentScope.flxActionButtons.setVisibility(true);
                headerButtonsScope.flxSwiftAndAdvices.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "setDefaultUI",
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
                headerButtonsScope.lblVerticalEllipsis.onTouchEnd = () => {
                    if(headerButtonsScope.flxVerticalEllipsisDropdown.isVisible) {
                        headerButtonsScope.flxVerticalEllipsisDropdown.setVisibility(false);
                    }
                    else {
                        headerButtonsScope.flxVerticalEllipsisDropdown.setVisibility(true);
                    }
                  };
                headerButtonsScope.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);
                contentScope.btnViewAllCollections.text = this.presenter.renderI18nKeys("i18n.TradeFinance.viewAllCollections", false);
                contentScope.btnViewDetails.onClick = scope.showSBLCPopup.bind(this);
                contentScope.btnCollectionViewDetails.onClick = scope.showSBLCPopup.bind(this);
                contentPopupScope.flxCrossSBLC.onClick = function () {
                    contentPopupScope.setVisibility(false);
                    contentPopupScope.flxViewSBLCDetailsPopup.setVisibility(false);
                };
                contentScope.btnSubmitConsent.onClick = this.submitAmendment.bind(this);
                contentScope.btnNavBack.onClick = this.buttonNavigation.bind(this, "back");
                contentScope.btnBack.onClick = this.buttonNavigation.bind(this, "back");
                contentScope.btnViewAllAmendments.onClick = this.buttonNavigation.bind(this, "viewAllGuaranteeAmendments");
                contentScope.btnViewAllCollections.onClick = this.buttonNavigation.bind(this, "viewAllCollections");
                contentScope.lblAccept.text = this.presenter.renderI18nKeys("i18n.TradeFinance.Accept", false);
                contentScope.lblReject.text = this.presenter.renderI18nKeys("i18n.konybb.myApproval.Reject", false);
                contentScope.flxAcceptRadioImg.cursorType = "pointer";
                contentScope.flxRejectRadioImg.cursorType = "pointer";
                contentScope.flxAcceptRadioImg.onClick = scope.selectAcceptOrReject.bind(this, ACCEPTED);
                contentScope.flxRejectRadioImg.onClick = scope.selectAcceptOrReject.bind(this, REJECTED);
                contentScope.txtReasonForRejection.onKeyUp = function () {
                    contentScope.txtReasonForRejection.text !== "" ? scope.enableOrDisableButton(contentScope.btnSubmitConsent, true) : scope.enableOrDisableButton(contentScope.btnSubmitConsent, false);
                };
                contentScope.flxClear.onClick = function () {
                    contentScope.flxAcknowledgementMessage.setVisibility(false);
                };
                scope.enableOrDisableButton(contentScope.btnSubmitConsent, false);
            } catch (err) {
                var errorObj = {
                    "method": "initButtonActions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : seti18nKeys
         * Setting i18n keys in UI
         * @return : NA
         */
        seti18nKeys: function () {
            var scope = this;
            try {
                formTemplateScope.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollectionAmendment") + " - " + amendmentResponse.amendmentSrmsId;
                contentScope.lblDraweeConsent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.draweeConsent");
                contentScope.lblDecisionText.text = kony.i18n.getLocalizedString("i18n.TradeFinance.acknowledgeYourReceivedAmendment");
                contentScope.lblReasonForRejection.text = kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForRejection");
                contentScope.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankOptional");
            } catch (err) {
                var errorObj = {
                    "method": "seti18nKeys",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDataInUIBasedOnStatus
         * Setting data in UI based on status
         * @return : NA
         */
        setDataInUIBasedOnStatus: function () {
            var scope = this;
            try {
                let status = amendmentResponse.status;
                if (status === INWARD_COLLECTION_AMENDMENTS_STATUSES.NEW || status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) {
                    contentScope.flxCollectionSummary.setVisibility(true);
                    contentScope.flxAmendmentDetails.setVisibility(true);
                    contentScope.flxDraweeConsent.setVisibility(true);
                    contentScope.flxBottomCollectionSummary.setVisibility(false);
                    contentScope.flxButtons.setVisibility(true);
                    contentScope.flxActionButtons.setVisibility(false);
                    contentScope.flxBackButton.setVisibility(false);
                    // Auto filling the details based on user response (if status is Returned by Bank)
                    if (status === INWARD_COLLECTION_AMENDMENTS_STATUSES.RETURNED_BY_BANK) {
                        scope.enableOrDisableButton(contentScope.btnSubmitConsent, true);
                        if (amendmentResponse.draweeAcknowledgement === INWARD_COLLECTION_AMENDMENTS_STATUSES.ACCEPT || amendmentResponse.draweeAcknowledgement.toLowerCase() === ACCEPTED.toLowerCase()) {
                            contentScope.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                            contentScope.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                            contentScope.flxOtherDetails.setVisibility(true);
                            contentScope.txtMessageToBank.text = amendmentResponse.messageToBank ? amendmentResponse.messageToBank : '';
                            contentScope.lblReasonForRejection.setVisibility(false);
                            contentScope.txtReasonForRejection.setVisibility(false);
                        } else {
                            contentScope.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                            contentScope.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                            contentScope.flxOtherDetails.setVisibility(true);
                            if (amendmentResponse.reasonForRejection) {
                                contentScope.txtReasonForRejection.text = amendmentResponse.reasonForRejection;
                            } else {
                                scope.enableOrDisableButton(contentScope.btnSubmitConsent, false);
                            }
                            contentScope.txtMessageToBank.text = amendmentResponse.messageToBank ? amendmentResponse.messageToBank : '';
                            contentScope.lblReasonForRejection.setVisibility(true);
                            contentScope.txtReasonForRejection.setVisibility(true);
                        }
                    }
                } else if (contentScope.flxAcknowledgementMessage.isVisible) {
                    contentScope.flxCollectionSummary.setVisibility(false);
                    contentScope.flxAmendmentDetails.setVisibility(true);
                    contentScope.flxDraweeConsent.setVisibility(false);
                    contentScope.flxBottomCollectionSummary.setVisibility(true);
                    contentScope.flxButtons.setVisibility(true);
                    contentScope.flxActionButtons.setVisibility(true);
                    contentScope.flxBackButton.setVisibility(false);
                    headerButtonsScope.flxPrintAndDownloadContainer.setVisibility(false);
                } else {
                    contentScope.flxCollectionSummary.setVisibility(true);
                    contentScope.flxAmendmentDetails.setVisibility(true);
                    contentScope.flxDraweeConsent.setVisibility(false);
                    contentScope.flxBottomCollectionSummary.setVisibility(false);
                    contentScope.flxButtons.setVisibility(false);
                    contentScope.flxActionButtons.setVisibility(false);
                    contentScope.flxBackButton.setVisibility(true);
                    headerButtonsScope.flxPrintAndDownloadContainer.setVisibility(true);
                }
                scope.setCollectionDetails();
                scope.setAmendmentDetailsData();
                scope.setBottomCollectionSummary();
            } catch (err) {
                var errorObj = {
                    "method": "setDataInUIBasedOnStatus",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setCollectionDetails
         * Setting Collection Details
         * @return : NA
         */
        setCollectionDetails: function () {
            var scope = this;
            try {
                let tempMaturityDate = scope.presenter.calculateMaturityDate(collectionResponse.maturityDate);
                contentScope.lblSumaryHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionSummary");
                contentScope.lblDraweeDetails.text = this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", true);
                contentScope.lblDraweeDetailsValue.text = collectionResponse.drawerName ? collectionResponse.drawerName : NA;
                contentScope.lblTransactionRef.text = this.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true);
                contentScope.lblTransactionRefValue.text = collectionResponse.collectionSrmsId ? collectionResponse.collectionSrmsId : NA;
                contentScope.lblAmount.text = this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false);
                contentScope.lblAmountValue.text = (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(collectionResponse.amount ): NA;
                contentScope.lblTenorType.text = this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true);
                contentScope.lblTenorTypeValue.text = collectionResponse.tenorType ? collectionResponse.tenorType : NA;
                contentScope.lblMaturityDate.text = this.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", true);
                contentScope.lblMaturityDateValue.text = collectionResponse.maturityDate ? this.presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA;
                contentScope.imgDaysLeft.src = tempMaturityDate.imageToLoad;
                contentScope.lblDaysLeft.text = tempMaturityDate.daysLeft;
                contentScope.lblRemittingBankDetails.text = this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true);
                contentScope.lblRemittingBankDetailsValue.text = collectionResponse.remittingBank ? collectionResponse.remittingBank : NA;
                contentScope.imgDaysLeft.left = "385dp";
                contentScope.lblDaysLeft.left = "420dp";
            } catch (err) {
                var errorObj = {
                    "method": "setCollectionDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : setSegAmendmentWidgetDataMap
          * This function for setting widgetDataMap for segment
          * @param : name of the segment.
          * @return : NA
          */
        setSegAmendmentWidgetDataMap: function (segName) {
            var scope = this;
            try {
                let segScope;
                var breakpoint = kony.application.getCurrentBreakpoint();
                var orientationHandler = new OrientationHandler();
                if (segName === "segDetails") {
                    segScope = contentPopupScope;
                } else {
                    segScope = contentScope;
                }
                if (breakpoint === 1024 || orientationHandler.isTablet) {
                    segScope[segName].rowTemplate = "flxAmendRowTemplateTablet";
                } else {
                    segScope[segName].rowTemplate = "flxCollectionAmendRowDetails";
                }
                segScope[segName].sectionHeaderTemplate = "flxReviewHeader";
                segScope[segName].widgetDataMap = {
                    "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
                    "flxCollectionAmendRowDetails": "flxCollectionAmendRowDetails",
                    "flxreviewRows": "flxreviewRows",
                    "lblReview": "lblReview",
                    "flxReviewRight": "flxReviewRight",
                    "flxReviewValues": "flxReviewValues",
                    "lblReviewValue1": "lblReviewValue1",
                    "flxReviewUploadDocumentsRowTemplate": "flxReviewUploadDocumentsRowTemplate",
                    "lblReviewLeft": "lblReviewLeft",
                    "flxDocument": "flxDocument",
                    "imgDownloadIcon": "imgDownloadIcon",
                    "lblDocumentName": "lblDocumentName",
                    "flxRowTemplateSeparator": "flxRowTemplateSeparator",
                    "flxReviewDetailsRowTemplate": "flxReviewDetailsRowTemplate",
                    "flxDetails": "flxDetails",
                    "flxHeading": "flxHeading",
                    "lblHeading1": "lblHeading1",
                    "lblHeading2": "lblHeading2",
                    "lblDetailsRow1": "lblDetailsRow1",
                    "lblDetailsRow2": "lblDetailsRow2",
                    "lblDetailsRow3": "lblDetailsRow3",
                    "lblDetailsRow4": "lblDetailsRow4",
                    "template": "template",
                    "flxReturnedByBank": "flxReturnedByBank",
                    "flxReturnByBankOuter": "flxReturnByBankOuter",
                    "flxReturnByBankInner": "flxReturnByBankInner",
                    "lblReturnBank": "lblReturnBank",
                    "lblReturnDate": "lblReturnDate",
                    "flxSeparatorTopReturnBank": "flxSeparatorTopReturnBank",
                    "flxReturnedByBankBodyContent": "flxReturnedByBankBodyContent",
                    "lblReasonReturn": "lblReasonReturn",
                    "lblRightValue": "lblRightValue",
                    "flxReturnedByBankBodyContent02": "flxReturnedByBankBodyContent02",
                    "lblReasonReturn02": "lblReasonReturn02",
                    "lblRightValue02": "lblRightValue02",
                    "flxReturnedByBankBodyContent03": "flxReturnedByBankBodyContent03",
                    "lblReasonReturn03": "lblReasonReturn03",
                    "lblRightValue03": "lblRightValue03",
                    "flxSeparatorReturnTop03": "flxSeparatorReturnTop03",
                    "flxReviewHeader": "flxReviewHeader",
                    "flxSeparator1": "flxSeparator1",
                    "flxSeparator2": "flxSeparator2",
                    "flxheaderWithDropdown": "flxheaderWithDropdown",
                    "lblTransactionHeader": "lblTransactionHeader",
                    "flxDropDown": "flxDropDown",
                    "imgDropDown": "imgDropDown",
                    "flxBottomSeparator": "flxBottomSeparator",
                    "imgDaysLeft": "imgDaysLeft",
                    "lblDaysLeft": "lblDaysLeft",
                    "flxReviewRows": "flxReviewRows",
                    "flxDownloadImage": "flxDownloadImage",
                };
            } catch (err) {
                var errorObj = {
                    "method": "setSegAmendmentWidgetDataMap",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setRequestDetailsData
         * This function for setting data in RequestDetails Segment
         * @return : NA
         */
        setAmendmentDetailsData: function () {
            var scope = this;
            try {
                scope.setSegAmendmentWidgetDataMap("segAmendmentViewDetails");
                let benData = kony.sdk.isNullOrUndefined(amendmentResponse.beneficiaryDetails) || amendmentResponse.beneficiaryDetails === "" ? "" : JSON.parse(amendmentResponse.beneficiaryDetails.replace(/'/g, '"'));
                let docData = amendmentResponse.amendDocuments ? JSON.parse(amendmentResponse.amendDocuments.replace(/'/g, '"')) : [];
                let date = new Date();
                let amendmentRequestedDetails = [];
                let draweeConsent = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false)
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    },
                    "flxSeparator1": {
                        isVisible: true,
                        top: '0dp'
                    },
                    "flxDropDown": {
                        isVisible: true,
                        onClick: scope.onActionClick.bind(this, "segAmendmentViewDetails")
                    },
                    "flxheaderWithDropdown": {
                        "skin": "ICSknFlxF8F7F8"
                    }
                },
                [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.draweeAcknowledgement ? amendmentResponse.draweeAcknowledgement : NA,
                        isVisible: true
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForRejection", true),
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.reasonForRejection ? amendmentResponse.reasonForRejection : NA,
                    },
                    flxreviewRows: {
                        isVisible: amendmentResponse.draweeAcknowledgement === 'Rejected' ? true : false
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.MessageToBankDrawings", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.messageToBank ? amendmentResponse.messageToBank : NA,
                        isVisible: true,
                    },
                    flxCollectionAmendRowDetails: {
                        height: '60dp'
                    },
                    flxreviewRows: {
                        bottom: "20dp"
                    }
                }]
                ];
                let section1 = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentOverview", false)
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        width: "100%",
                        left: "0dp"
                    },
                    "flxDropDown": {
                        isVisible: false
                    },
					"flxReviewHeader":{
						skin: "slFbox"
                    }
                },
                [{
                    lblReview: {
                            text: this.presenter.renderI18nKeys("i18n.serviceRequests.Status", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.status ? amendmentResponse.status : NA,
                            skin: "ICSknlbl424242SSP15pxSemibold",
                        isVisible: true
                    }
                },
                {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedOn", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.receivedOn ? this.presenter.getConvertedDate(amendmentResponse, "receivedOn") : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.amendmentNo ? amendmentResponse.amendmentNo : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentReference", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.amendmentSrmsId ? amendmentResponse.amendmentSrmsId : NA,
                        isVisible: true
                    },
                    flxCollectionAmendRowDetails: {
                        height: "63dp"
                    },
                    flxreviewRows: {
                        bottom: "20dp"
                    }
                }]
                ];
                if(amendmentResponse.status.toLowerCase() === INWARD_COLLECTION_AMENDMENTS_STATUSES.APPROVED.toLowerCase() || amendmentResponse.status.toLowerCase() === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED.toLowerCase()){
                    section1[1].splice(1, 0, {
                        lblReview: {
                            text: amendmentResponse.status.toLowerCase() === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED.toLowerCase() ? this.presenter.renderI18nKeys("i18n.TradeFinance.rejectedDateWithColon", false) : this.presenter.renderI18nKeys("i18n.TradeFinance.ApprovedDate", true),
                            isVisible: true
                        },
                        lblReviewValue1: {
                            text: amendmentResponse.lastUpdatedDate ? this.presenter.getConvertedDate(amendmentResponse, "lastUpdatedDate") : NA,
                            isVisible: true
                        }
                    })
                }
                amendmentRequestedDetails.push(section1);
                let tempMaturityDate = scope.presenter.calculateMaturityDate(amendmentResponse.maturityDate);
                let section2 = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.amendmentRequested", false),
                        skin: "ICSknlbl424242SSP15pxSemibold"
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    },
                    "flxSeparator1": {
                        isVisible: true,
                        top: "0dp"
                    },
                    "flxheaderWithDropdown": {
                        "skin": "ICSknFlxF8F7F8"
                    },
                    "imgDropDown": "dropdown_collapse.png",
                    "flxDropDown": {
                        onClick: scope.onActionClick.bind(this, "segAmendmentViewDetails")
                    }
                },
                amendmentResponse.cancellationStatus ? 
                [
                    {
                        lblReview: {
                            text: this.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", true),
                            isVisible: true
                        },
                        lblReviewValue1: {
                            text: amendmentResponse.cancellationStatus ? amendmentResponse.cancellationStatus : NA,
                            isVisible: true
                        }
                    },
                    {
                        lblReview: {
                            text: this.presenter.renderI18nKeys("i18n.TradeFinance.reasonForCancellation", true),
                            isVisible: true
                        },
                        lblReviewValue1: {
                            text: amendmentResponse.reasonForCancellation ? amendmentResponse.reasonForCancellation : NA,
                            isVisible: true
                        }
                    }
                ]
                :
                [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: (amendmentResponse.currency && amendmentResponse.amount) ? amendmentResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(amendmentResponse.amendAmount) : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.maturityDate ? scope.presenter.getConvertedDate(amendmentResponse, 'maturityDate') : NA,
                        isVisible: true,
                        width: "90dp"
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    },
                    imgDaysLeft: {
                        isVisible: true,
                        src: tempMaturityDate.imageToLoad
                    },
                    lblDaysLeft: {
                        isVisible: true,
                        text: tempMaturityDate.daysLeft
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.tenorType ? amendmentResponse.tenorType : NA,
                        isVisible: true
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.usanceDetails ? amendmentResponse.usanceDetails : NA,
                        isVisible: true
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.remittingBank ? amendmentResponse.remittingBank : NA,
                        isVisible: true
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    },
                    flxreviewRows: {
                        bottom: "20dp"
                    }
                },]
                ];
                if (docData.length > 0) {
                    for (let i = 0; i < docData.length; i++) {
                        data = {
                            lblReviewLeft: {
                                text: i === 0 ? kony.i18n.getLocalizedString("i18n.wealth.Documents") + ":" : "",
                                left: "4dp"
                            },
                            lblDocumentName: {
                                text: docData[i].documentName ? docData[i].documentName : NA,
                                skin: "ICSknLbl424242SSPRegular15px"
                            },
                            flxreviewRows: {
                                isVisible: docData.length > 0 ? true : false,
                                left: "17dp"
                            },
                            flxDocument: {
                                "left": "286dp"
                            },
                            imgDownloadIcon: {
                                isVisible: false
                            },
                            flxDownloadImage: {
                                isVisible: false
                            },
                            template: "flxReviewUploadDocumentsRowTemplate"
                        }
                        section2[1].push(data);
                    }
                } else {
                    data = {
                        lblReview: {
                            text: this.presenter.renderI18nKeys("i18n.wealth.Documents", true),
                            isVisible: true
                        },
                        lblReviewValue1: {
                            text: NA,
                            isVisible: true
                        },
                        flxRowTemplateSeparator: {
                            isVisible: true
                        }
                    };
                    section2[1].push(data);
                }
                let messageFromBank = {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: amendmentResponse.messageFromBank ? amendmentResponse.messageFromBank : NA,
                        isVisible: true
                    },
                    flxCollectionAmendRowDetails: {
                        height: "63dp"
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    },
                    flxreviewRows: {
                        bottom: "20dp"
                    }
                };
                section2[1].push(messageFromBank);
                let status = amendmentResponse.status;
                if(status === INWARD_COLLECTION_AMENDMENTS_STATUSES.SUBMITTED_TO_BANK || status === INWARD_COLLECTION_AMENDMENTS_STATUSES.PROCESSING_BY_BANK || status === INWARD_COLLECTION_AMENDMENTS_STATUSES.REJECTED || status === INWARD_COLLECTION_AMENDMENTS_STATUSES.APPROVED){
                    amendmentRequestedDetails.push(draweeConsent);
                }
                amendmentRequestedDetails.push(section2);
                contentScope.segAmendmentViewDetails.setData(amendmentRequestedDetails);
            } catch (err) {
                var errorObj = {
                    "method": "setRequestDetailsData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setBottomCollectionSummary
         * Setting Collection Details
         * @return : NA
         */
        setBottomCollectionSummary: function () {
            var scope = this;
            try {
                contentScope.lblCollectionSumaryHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.collectionSummary");
                scope.setSegAmendmentWidgetDataMap("segCollectionDetails");
                let tempMaturityDate = scope.presenter.calculateMaturityDate(collectionResponse.maturityDate);
                let collectionSummaryDetails = [];
                collectionSummaryDetails = [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: collectionResponse.drawerName ? collectionResponse.drawerName : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: collectionResponse.collectionSrmsId ? collectionResponse.collectionSrmsId : "1",
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: (collectionResponse.currency && collectionResponse.amount) ? collectionResponse.currency + " " + collectionResponse.amount : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: collectionResponse.tenorType ? collectionResponse.tenorType : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: collectionResponse.maturityDate ? this.presenter.getConvertedDate(collectionResponse, 'maturityDate') : NA,
                        isVisible: true,
                        width: "90dp"
                    },
                    imgDaysLeft: {
                        isVisible: true,
                        src: tempMaturityDate.imageToLoad
                    },
                    lblDaysLeft: {
                        isVisible: true,
                        text: tempMaturityDate.daysLeft
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: collectionResponse.remittingBank ? collectionResponse.remittingBank : NA,
                        isVisible: true
                    }
                }];
                contentScope.segCollectionDetails.setData(collectionSummaryDetails);
            } catch (err) {
                var errorObj = {
                    "method": "setBottomCollectionSummary",
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

        renderPrintAndDownload: function() {
            var scope = this;
            try {
                headerButtonsScope.segVerticalDropdownEllipsis.widgetDataMap = {
                    flxLCAccountType: 'flxLCAccountType',
                    imgLCCheckbox: 'imgLCCheckbox',
                    lblLCCheckbox: 'lblLCCheckbox',
                    lblLCAccountType: 'lblLCAccountType'
                };
                let masterData = [];
                scope.presenter.contextualMenuData.map(item => {
                    masterData.push({
                        flxLCAccountType: {
                            bottom: '0dp',
                            height: '40dp',
                            onClick: scope.onPrintAndDownloadRowClick.bind(scope, item.id),
                            cursorType: 'pointer',
                            isVisible: scope.contextualItemCondition(item.id)
                        },
                        imgLCCheckbox: {
                            isVisible: true,
                            src: item.src
                        },
                        lblLCCheckbox: {
                            isVisible: false
                        },
                        lblLCAccountType: item.text
                    });
                });
                headerButtonsScope.segVerticalDropdownEllipsis.setData(masterData);
            } catch (err) {
                var errorObj = {
                    "method": "renderPrintAndDownload",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        
    contextualItemCondition: function (id) {
        var scope = this;
        try {
          if (id == 'raiseQuery') {
            if (completeServiceResponse.serviceResponse.amendmentResponse.status.toLowerCase() === (OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.APPROVED).toLowerCase() || completeServiceResponse.serviceResponse.amendmentResponse.status.toLowerCase() === (OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.PAY_DUE).toLowerCase() || completeServiceResponse.serviceResponse.amendmentResponse.status.toLowerCase() === (OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.OVERDUE).toLowerCase()) {
              return true;
            } else {
              return false;
            }
          }
          if (isTablet && id == 'print') {
            return false;
          }
          return true;
        } catch (err) {
          var errorObj = {
            "method": "contextualItemCondition",
            "error": err
          };
          scope.onError(errorObj);
        }
      },

        /**
          * @api : navigateToPrint
          * Navigating to the print based on condition
          * @return : NA
          */
        onPrintAndDownloadRowClick: function (id) {
            var scope = this;
            try {
                headerButtonsScope.flxVerticalEllipsisDropdown.setVisibility(false);
                if (id == 'print') {
                    let dataObj = {
                        serviceResponse,
                        previousFormName: 'frmInwardCollectionAmendmentViewDetails'
                    };
                    let formName = 'frmInwardCollectionAmendmentPrint';
                    dataObj.navData = selectedRecord;
                    dataObj.pageTitle = 'i18n.TradeFinance.inwardCollectionAmendment';
                    new kony.mvc.Navigation({
                        "appName": "TradeFinanceMA",
                        "friendlyName": `InwardCollectionsUIModule/${formName}`
                    }).navigate(dataObj);
                } else if (id == "download") {
                    scope.presenter.generateInwardAmendment({
                        "amendmentSrmsId": amendmentResponse.amendmentSrmsId
                    }, "frmInwardCollectionAmendmentViewDetails");
                } else if (id == 'raiseQuery') {
                    let record = completeServiceResponse.serviceResponse.amendmentResponse;
                    let queryObj = {};
                    let formatUtilManager = applicationManager.getFormatUtilManager();
                    queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.amendmentSrmsId}`;
                    queryObj.descriptionObj = {};
                    record.amendMaturityDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.accountDetail.maturityDate")] = record.amendMaturityDate);
                    record.amendAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.amendAmount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amendAmount) : NA);
                    record.drawer && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.drawerDetails")] = record.drawer);
                    record.remittingBank && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.remittingBank")] = record.remittingBank);
                    record.tenorType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.tenorType")] = record.tenorType);
                    queryObj.tradeModule = true;
                    scope.presenter.showMessagesScreen(queryObj);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onPrintAndDownloadRowClick",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : selectAcceptOrReject
         * Triggerd on click of accept or reject option
         * @return : NA
         */
        selectAcceptOrReject: function (param) {
            var scope = this;
            if (param === ACCEPTED) {
                contentScope.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                contentScope.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                contentScope.flxOtherDetails.setVisibility(true);
                contentScope.txtReasonForRejection.text = "";
                contentScope.txtMessageToBank.text = "";
                contentScope.lblReasonForRejection.setVisibility(false);
                contentScope.txtReasonForRejection.setVisibility(false);
                scope.enableOrDisableButton(contentScope.btnSubmitConsent, true);
            } else {
                contentScope.imgAcceptRadio.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                contentScope.imgRejectRadio.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                contentScope.flxOtherDetails.setVisibility(true);
                contentScope.txtReasonForRejection.text = "";
                contentScope.txtMessageToBank.text = "";
                contentScope.lblReasonForRejection.setVisibility(true);
                contentScope.txtReasonForRejection.setVisibility(true);
                scope.enableOrDisableButton(contentScope.btnSubmitConsent, false);
            }
        },

        /**
          * @api : submitAmendment
          * Triggerd on click of submit Consent
          * @return : NA
          */
        submitAmendment: function () {
            var scope = this;
            try {
                contentPopupScope.setVisibility(true);
                contentPopupScope.flxConfirmPopup.setVisibility(true);
                formTemplateScope.pageTitle = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollectionAmendment") + " - " + amendmentResponse.amendmentSrmsId;
				confirmPopupScope.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.draweeConsent");
                confirmPopupScope.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.submitAmendmentRequest");
                confirmPopupScope.btnYes.text = kony.i18n.getLocalizedString("kony.mb.common.submit");
                confirmPopupScope.btnNo.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
                confirmPopupScope.btnYes.onClick = scope.submitAmendmentFromPopUp.bind(scope);
                confirmPopupScope.flxCross.onClick = scope.closePopup.bind(scope, 'flxConfirmPopup');
                confirmPopupScope.btnNo.onClick = scope.closePopup.bind(scope, 'flxConfirmPopup');
            } catch (err) {
                var errorObj = {
                    "method": "submitAmendment",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : enableOrDisableButton
          * enable or disable skins for buttons.
          * @return : NA
          */
        enableOrDisableButton: function (btnRef, flag) {
            var scope = this;
            try {
                btnRef.setEnabled(flag);
                flag ? btnRef.skin = "ICSknbtnEnabed003e7536px" : btnRef.skin = "ICSknbtnDisablede2e9f036px";
            } catch (err) {
                var errorObj = {
                    "method": "enableOrDisableButton",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : buttonNavigation
          * This function for navigation on button clicks.
          * @return : NA
          */
        buttonNavigation: function (param, data) {
            try {
                this.navManager = applicationManager.getNavigationManager();
                let formName = "";
                let dataToSend = completeServiceResponse;
                switch (param) {
                    case "back":
                        {
                            formName = kony.application.getPreviousForm().id;
                            dataToSend.flowType = 'viewAllAmendments';
                            break;
                        }
                    case "viewAllCollections":
                        {
                            formName = "frmInwardCollectionsDashboardNew";
                            dataToSend.flowType = 'viewAllCollections';
                            break;
                        }
                    case "viewAllGuaranteeAmendments":
                        {
                            formName = "frmInwardCollectionsDashboardNew";
                            dataToSend.flowType = 'viewAllAmendments';
                            break;
                        }
                }
                this.navManager.navigateTo({
                    appName: "TradeFinanceMA",
                    friendlyName: formName
                }, false, dataToSend);
            } catch (err) {
                var errorObj = {
                    "method": "buttonNavigation",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : renderSwiftAndAdvices
          * Rendering Swift And Advices
          * @return : NA
          */
        renderSwiftAndAdvices: function () {
            var scope = this;
            try {
                let swiftMessagesLength = 0;
                let paymentAdvicesLength = 0;
                let swiftMessages = [];
                let paymentAdvices = [];
                let swiftAndAdviceRecords = [];
                if (amendmentResponse.hasOwnProperty('PaymentAdvices')) {
                    paymentAdvices = amendmentResponse.PaymentAdvices;
                    paymentAdvicesLength = paymentAdvices.length;
                }
                if (amendmentResponse.hasOwnProperty('SwiftMessages')) {
                    swiftMessages = amendmentResponse.SwiftMessages;
                    swiftMessagesLength = swiftMessages.length;
                }
                swiftAndAdviceRecords = [...paymentAdvices, ...swiftMessages];
                if (swiftMessagesLength > 0 || paymentAdvicesLength > 0) {
                    headerButtonsScope.flxSwiftAndAdvicesParent.setVisibility(true);
                    headerButtonsScope.btnSwiftAndAdvices.cursorType = "pointer";
                    headerButtonsScope.btnSwiftAndAdvices.text = kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices") + "(" + (swiftMessagesLength + paymentAdvicesLength) + ")";
                    headerButtonsScope.btnSwiftAndAdvices.onClick = scope.renderSwiftAndAdviceOptions.bind(scope, swiftAndAdviceRecords);
                } else {
                    headerButtonsScope.flxSwiftAndAdvicesParent.setVisibility(false);
                }
            } catch (err) {
                var errorObj = {
                    "method": "renderSwiftAndAdvices",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : renderSwiftAndAdviceOptions
          * Navigating to print
          * @param {array} : swiftAndAdviceRecords to lod in segment
          * @return : NA
          */
        renderSwiftAndAdviceOptions: function (swiftAndAdviceRecords) {
            var scope = this;
            try {
                headerButtonsScope.flxSwiftAndAdvices.setVisibility(!headerButtonsScope.flxSwiftAndAdvices.isVisible);
                headerButtonsScope.segSwiftAndAdvices.widgetDataMap = {
                    lblValue: "lblValue"
                };
                // Processing swiftAndAdviceRecords data
                let masterData = [];
                swiftAndAdviceRecords.map(item => {
                    let tempMasterData = {
                        lblValue: {
                            "text": item.hasOwnProperty('adviceName') ? kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice") + ' (' + scope.presenter.getConvertedDate(item, 'paymentDate') + ')' : kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + ' (' + scope.presenter.getConvertedDate(item, 'createdDate') + ')',
                            "cursorType": "pointer"
                        }
                    }
                    masterData.push(tempMasterData);
                });
                // setting data into segment
                headerButtonsScope.segSwiftAndAdvices.setData(masterData);
                headerButtonsScope.segSwiftAndAdvices.onRowClick = this.onRowClickOfSwiftAndAdvices.bind(scope, swiftAndAdviceRecords);
            } catch (err) {
                var errorObj = {
                    "method": "renderSwiftAndAdviceOptions",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : onRowClickOfSwiftAndAdvices
         * Displaying popup based on user click on Swift And Advices dropdown
         * @arg {swiftAndAdviceRecords} : Available records in Swift And Advices dropdown
         * @return : NA
         */
        onRowClickOfSwiftAndAdvices: function (swiftAndAdviceRecords) {
            var scope = this;
            try {
                // Selected item always at [1]
                let currentSelectedRowIndex = headerButtonsScope.segSwiftAndAdvices.selectedRowIndex[1]
                let selectedRecord = swiftAndAdviceRecords[currentSelectedRowIndex];
                headerButtonsScope.flxSwiftAndAdvices.setVisibility(false);
                contentPopupScope.flxSwiftDetailsPopup.setVisibility(false);
                contentPopupScope.flxPaymentAdvicePopup.setVisibility(false);
                if (selectedRecord.hasOwnProperty('adviceName')) {
                    // Payment Advice Logic
                    contentPopupScope.setVisibility(true);
                    contentPopupScope.flxPaymentAdvicePopup.setVisibility(true);
                    contentPopupScope.lblPaymentAdviceBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
                    // Configuring segments
                    contentPopupScope.segPaymentAdviceBank.widgetDataMap = {
                        lblLeft1: "lblLeft1",
                        lblRight1: "lblRight1"
                    };
                    // Processing swiftAndAdviceRecords data
                    let masterData = [{
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.TransfersEur.Beneficiary', true),
                        lblRight1: scope.presenter.getDynamicData(selectedRecord, 'beneficiary')
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.billPay.PaymentDate', true),
                        lblRight1: scope.presenter.getConvertedDate(selectedRecord, 'paymentDate')
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.common.creditedAmount', true),
                        lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'creditedAmount')
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.CreditedAccount', true),
                        lblRight1: selectedRecord.creditedAccount ? CommonUtilities.getMaskedAccName(selectedRecord.creditedAccount)[0] : NA
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.ChargesDebited', true),
                        lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'charges')
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.AdvisingBank', true),
                        lblRight1: scope.presenter.getDynamicData(selectedRecord, 'advisingBank')
                    }, {
                        lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.claimRefNoWithColon', false),
                        lblRight1: scope.presenter.getDynamicData(selectedRecord, 'orderId')
                    }];
                    // setting data into segment
                    contentPopupScope.segPaymentAdviceBank.setData(masterData);
                    contentPopupScope.flxSearchClose.cursorType = "pointer";
                    contentPopupScope.flxSearchClose.onClick = scope.closePopup.bind(scope, 'flxPaymentAdvicePopup');
                } else {
                    // Swift MT popup logic
                    contentPopupScope.setVisibility(true);
                    contentPopupScope.flxSwiftDetailsPopup.setVisibility(true);
                    contentPopupScope.flxCross.cursorType = 'pointer';
                    contentPopupScope.flxCross.onClick = scope.closePopup.bind(scope, 'flxSwiftDetailsPopup');
                    scope.renderSwiftMTPopup(selectedRecord);
                }
            } catch (err) {
                var errorObj = {
                    "method": "onRowClickOfSwiftAndAdvices",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : showSBLCPopup
          * This function for showing the SBLC details popup
          * @return : NA
          */
        showSBLCPopup: function () {
            var scope = this;
            try {
                contentPopupScope.setVisibility(true);
                contentPopupScope.flxSwiftDetailsPopup.setVisibility(false);
                contentPopupScope.flxViewSBLCDetailsPopup.setVisibility(true);
                this.setSBLCData();
            } catch (err) {
                var errorObj = {
                    "method": "showSBLCPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setSBLCData
         * This function for setting data in SBLC popup
         * @return : NA
         */
        setSBLCData: function () {
            var scope = this;
            try {
                scope.setLcPopupDetails(collectionResponse);
            } catch (err) {
                var errorObj = {
                    "method": "setSBLCData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setLcPopupDetails
         * Setting Lc PopupDetails
         * @return : NA
         */
        setLcPopupDetails: function (params) {
            var scope = this;
            try {
                var orientationHandler = new OrientationHandler();
                contentPopupScope.lblViewSBLCHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollection")  + " - " + collectionResponse.collectionSrmsId + " - " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                scope.setSegAmendmentWidgetDataMap("segDetails");
                let collectionDocData = kony.sdk.isNullOrUndefined(collectionResponse.documentsUploaded) || collectionResponse.documentsUploaded === "" ? "" : JSON.parse(collectionResponse.documentsUploaded.replace(/'/g, '"'));
                let collectionDetails = [];
                let collectionOverview = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionOverview", false)
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    },
                    "flxSeparator1": {
                        isVisible: true,
                        top: "0dp"
                    },
                    "flxDropDown": {
                        isVisible: true
                    },
                    "imgDropDown": "dropdown_collapse.png",
                    "flxDropDown": {
                        onClick: scope.onActionClick.bind(this, "segDetails")
                    },
                    "flxheaderWithDropdown": {
                        "skin": "ICSknFlxF8F7F8"
                    }
                },
                [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.transactionRefWithColon", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.collectionSrmsId ? params.collectionSrmsId : NA,
                        isVisible: true
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.documentNumber", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.documentNo ? params.documentNo : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.receivedOnWithColon", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.receivedOn ? scope.presenter.getConvertedDate(params, 'receivedOn') : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Status", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.status ? params.status : NA,
                        isVisible: true,
                        skin: "sknlbl424242SSP15pxSemibold"
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceEligible", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.usanceAcceptanceEligibility ? params.usanceAcceptanceEligibility : NA,
                        isVisible: true
                    },
                    flxCollectionAmendRowDetails: {
                        height: "63dp"
                    }
                }]
                ];
                collectionDetails.push(collectionOverview);
                let collectionDraweeConsent = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeConsent", false)
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    },
                    "flxSeparator1": {
                        isVisible: true,
                        top: "0dp"
                    },
                    "imgDropDown": "dropdown_collapse.png",
                    "flxDropDown": {
                        onClick: scope.onActionClick.bind(this, "segDetails")
                    },
                    "flxheaderWithDropdown": {
                        "skin": "ICSknFlxF8F7F8"
                    }
                },
                [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.draweeAcknowledgement", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.draweeAcknowledgement ? params.draweeAcknowledgement : NA,
                        isVisible: true
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptance", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.usanceAcceptance ? params.usanceAcceptance : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceAcceptanceDate", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.usanceAcceptanceDate ? scope.presenter.getConvertedDate(params, 'usanceAcceptanceDate') : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchangeStatus", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.billExchangeStatus ? params.billExchangeStatus : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFromWithColon", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.debitAmountFrom ? params.debitAmountFrom : "1",
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.chargesDebitFrom", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.chargesDebitFrom ? params.chargesDebitFrom : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.messageToBankWithColon", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.messageToBank ? params.messageToBank : NA,
                        isVisible: true
                    },
                    flxCollectionAmendRowDetails: {
                        height: "63dp"
                    }
                }]
                ];
                collectionDetails.push(collectionDraweeConsent);
                let tempMaturityDate = scope.presenter.calculateMaturityDate(params.maturityDate);
                let popupCollectionDetails = [{
                    lblTransactionHeader: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.collectionDetails", false)
                    },
                    "flxSeparator2": {
                        isVisible: true,
                        left: "0dp",
                        width: "100%"
                    },
                    "flxSeparator1": {
                        isVisible: true,
                        top: "0dp"
                    },
                    "imgDropDown": "dropdown_collapse.png",
                    "flxDropDown": {
                        onClick: scope.onActionClick.bind(this, "segDetails")
                    },
                    "flxheaderWithDropdown": {
                        "skin": "ICSknFlxF8F7F8"
                    }
                },
                [{
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.drawerDetails", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.drawerName ? params.drawerName : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ChequeManagement.Amount", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: (params.currency && params.amount) ? params.currency + " " + params.amount : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.accounts.charges", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.charges ? params.currency + params.amount : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.Wealth.maturityDate", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.maturityDate ? scope.presenter.getConvertedDate(params, 'maturityDate') : NA,
                        isVisible: true,
                        width: '90dp'
                    },
                    imgDaysLeft: {
                        isVisible: true,
                        src: tempMaturityDate.imageToLoad
                    },
                    lblDaysLeft: {
                        isVisible: true,
                        text: tempMaturityDate.daysLeft
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.tenorType ? params.tenorType : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.usanceDetails ? params.usanceDetails : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: "INCO Terms:",
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.incoTerms ? params.incoTerms : NA,
                        isVisible: true
                    }
                }, {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.TradeFinance.remittingBankDetails", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.remittingBank ? params.remittingBank : NA,
                        isVisible: true
                    }
                }]
                ];
                for (let i = 0; i < collectionDocData.length; i++) {
                    data = {
                        lblReviewLeft: {
                            text: i === 0 ? kony.i18n.getLocalizedString("i18n.wealth.Documents") + ":" : ""
                        },
                        lblDocumentName: {
                            text: collectionDocData[i].documentName ? collectionDocData[i].documentName : NA,
                            skin: "ICSknLbl424242SSPRegular15px"
                        },
                        flxreviewRows: {
                            isVisible: collectionDocData.length > 0 ? true : false,
                            left: (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "2.54%" : "1.54%"
                        },
                        flxDocument: {
                            "left": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "244dp" : "286dp"
                        },
                        imgDownloadIcon: {
                            isVisible: false
                        },
                        template: "flxReviewUploadDocumentsRowTemplate"
                    }
                    popupCollectionDetails[1].push(data);
                }
                let lcMessageFromBank = {
                    lblReview: {
                        text: this.presenter.renderI18nKeys("i18n.ImportDrawings.MessageFromBank", true),
                        isVisible: true
                    },
                    lblReviewValue1: {
                        text: params.messageFromBank ? params.messageFromBank : NA,
                        isVisible: true
                    },
                    flxReviewRows:{
                      top : "10dp"
                    },
                    flxCollectionAmendRowDetails: {
                        height: "50dp"
                    },
                    flxRowTemplateSeparator: {
                        isVisible: true
                    }
                };
                popupCollectionDetails[1].push(lcMessageFromBank);
                collectionDetails.push(popupCollectionDetails);
                contentPopupScope.segDetails.setData(collectionDetails);
            } catch (err) {
                var errorObj = {
                    "method": "setSBLCData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : renderSwiftMTPopup
          * Rendering the data into swift popup
          * @arg  {swiftData} : Data to render the swift popup
          * @return : NA
          */
        renderSwiftMTPopup: function (swiftData) {
            var scope = this;
            try {
                contentPopupScope.lblSwiftMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.inwardCollection") + " (" + scope.presenter.getConvertedDate(swiftData, 'createdDate') + ")";
                contentPopupScope.lblSwiftMessageHeading.text = SWIFT_MESSAGE_HEADER;
                contentPopupScope.lblSwiftMessageDetails.text = SWIFT_MESSAGE_DETAILS;
                contentPopupScope.lblSwiftMessageFooter.text = SWIFT_MESSAGE_FOOTER;
                contentPopupScope.segSwiftPrimaryDetails.widgetDataMap = {
                    lblSwiftDetailsKey: "lblSwiftDetailsKey"
                };
                let headerMasterData = [{
                    lblSwiftDetailsKey: scope.parseTheData(swiftData.bCode, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(swiftData.bic, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(swiftData.transferDateOrTime, HEADER)
                }, {
                    lblSwiftDetailsKey: scope.parseTheData(swiftData.type, HEADER)
                }];
                contentPopupScope.segSwiftPrimaryDetails.setData(headerMasterData);
                contentPopupScope.segSwiftDetails.widgetDataMap = {
                    lblSwiftDetailsKey: "lblSwiftDetailsKey",
                    lblSwiftDetailsValue: "lblSwiftDetailsValue"
                };
                let swiftKeys = Object.keys(swiftData);
                let masterData = [];
                masterData.push({
                    lblSwiftDetailsKey: 'MESSAGE BODY',
                    lblSwiftDetailsValue: '',
                });
                swiftKeys.map(item => {
                    if (swiftKeys !== 'bCode' || swiftKeys !== 'bic' || swiftKeys !== 'transferDateOrTime' || swiftKeys !== 'type' || swiftKeys !== 'createdDate') {
                        masterData.push({
                            lblSwiftDetailsKey: scope.parseTheData(swiftData[item], SWIFT_TAG),
                            lblSwiftDetailsValue: scope.parseTheData(swiftData[item])
                        });
                    }
                });
                contentPopupScope.segSwiftDetails.setData(masterData);
            } catch (err) {
                var errorObj = {
                    "method": "renderSwiftMTPopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : parseTheData
          * Convertin string to JSON 
          * @arg {partialResponse} : Response from the service
          * @arg {renderType} : What to render
          * @return : NA
          */
        parseTheData: function (partialResponse, renderType) {
            var scope = this;
            try {
                partialResponse = JSON.parse(partialResponse.replace(/'/g, "\""));
                if (renderType === HEADER) {
                    return partialResponse.fieldName + ": " + partialResponse.fieldValue;
                } else if (renderType === SWIFT_TAG) {
                    return partialResponse.swiftTag + ": " + partialResponse.fieldName;
                }
                return partialResponse.fieldValue;
            } catch (err) {
                var errorObj = {
                    "method": "parseTheData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : closePopup
          * Closing the popup based on popup name
          * @arg {popupFlexName} : Popup flex name
          * @return : NA
          */
        closePopup: function (popupFlexName) {
            var scope = this;
            try {
                contentPopupScope.setVisibility(false);
                contentPopupScope[popupFlexName].setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "method": "closePopup",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : submitAmendmentFromPopUp
          * Submitting the Amendment From PopUp
          * @return : NA
          */
        submitAmendmentFromPopUp: function () {
            var scope = this;
            try {
                scope.closePopup('flxConfirmPopup');
                var payLoad = {
                    "amendmentSrmsId": amendmentResponse.amendmentSrmsId,
                    "draweeAcknowledgement": contentScope.imgAcceptRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE ? ACCEPTED : REJECTED,
                    "reasonForRejection": contentScope.txtReasonForRejection.text,
                    "messageToBank": contentScope.txtMessageToBank.text
                }
                scope.presenter.updateInwardCollectionAmendment(payLoad, "frmInwardCollectionAmendmentViewDetails");
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
          * Updating the form UI based on service response
          * @return : NA
          */
        updateFormUI: function (viewModel) {
            var scope = this;
            try {
                // Toggling the loader
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.serverError) {
                    contentScope.imgAcknowledgement.src = 'failed_icon.png';
                    contentScope.lblMessage.text = viewModel.serverError;
                    contentScope.flxAcknowledgementMessage.setVisibility(true);
                }
                if (viewModel.updateInwardCollectionAmendment) {
                    contentScope.imgAcknowledgement.src = 'success_green.png';
                    contentScope.lblMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.submittedAmendmentSuccessfully");
                    contentScope.flxAcknowledgementMessage.setVisibility(true);
                    // Updating amendmentResponse
                    serviceResponse.amendmentResponse = viewModel.updateInwardCollectionAmendment;
                    serviceResponse.amendmentResponse.draweeAcknowledgement = contentScope.imgAcceptRadio.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE ? ACCEPTED : REJECTED;
                    serviceResponse.amendmentResponse.reasonForRejection = contentScope.txtReasonForRejection.text;
                    serviceResponse.amendmentResponse.messageToBank = contentScope.txtMessageToBank.text;
                    collectionResponse = serviceResponse.collectionResponse;
                    amendmentResponse = serviceResponse.amendmentResponse;
                    scope.setDataInUIBasedOnStatus();
                }
            } catch (err) {
                var errorObj = {
                    "method": "updateFormUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
          * @api : onError
          * Error thrown from catch block in component and shown on the form
          * @return : NA
          */
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmInwardCollectionAmendmentViewDetails";
            // kony.ui.Alert(errMsg);
        },
    };
});