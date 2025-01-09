define(['OLBConstants'], function (OLBConstants) {
    let pritDataObj;
    let presenter;
    let previousForm;
    const NA = kony.i18n.getLocalizedString("i18n.common.NA");
    return {
        /**
         * @api : onNavigate
         * Will execute when navigation came from another form
         * @arg : param - Obj - Data used to load in UI
         * @return : NA
        */
        onNavigate: function (data) {
            var scope = this;
            try {
                pritDataObj = data.navData;
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
         * @api : preShow
         * Will trigger before loading of UI
         * @return : NA
         */
        preShow: function () {
            var scope = this;
            try {
                presenter = applicationManager.getModulesPresentationController({
                    appName: 'TradeFinanceMA',
                    moduleName: 'GuaranteesReceivedUIModule'
                });
                scope.setDynamicData();
                scope.seti18nKeys();
                scope.setDynamicDataInPaymentAdviceDetails();
            } catch (err) {
                var errorObj =
                {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : postShow
         * Will trigger when UI is loaded
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
                var errorObj =
                {
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
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `GuaranteesReceivedUIModule/${previousForm}`
                }).navigate(pritDataObj);
            } catch (err) {
                var errorObj =
                {
                    "method": "afterPrintCallback",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDynamicData
         * Setting dynamic data in UI based on response
         * @return : NA
         */
        setDynamicData: function () {
            var scope = this;
            try {
                const formatUtilManager = applicationManager.getFormatUtilManager();
                scope.view.segSummeryList.widgetDataMap = { lblHeader: "lblHeader", flxKeyHeading: "flxKeyHeading", lblKeyHeading: "lblKeyHeading", flxKey: "flxKey", lblKey: "lblKey", lblValue: "lblValue", flxAddress: "flxAddress", lblAddress1: "lblAddress1", lblAddress2: "lblAddress2", lblAddress3: "lblAddress3" };

                // Processing issuenceSummery data
                let partialIssuenceSummery = [
                    {
                        "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.transactionReference', true),
                        "lblValue": presenter.getDynamicData(pritDataObj, 'guaranteeSrmsId')
                    },
                    {
                        "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.ReceivedOn', true),
                        "lblValue": presenter.getConvertedDate(pritDataObj, 'receivedOn')
                    },
                    {
                        "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.requestStatus', false),
                        "lblValue": presenter.getDynamicData(pritDataObj, 'status')
                    },
                    {
                        "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.currentSelfAcceptance', true),
                        "lblValue": presenter.getDynamicData(pritDataObj, 'selfAcceptance')
                    }
                ];
                // Processing selfRejectionHistory
                let selfRejectionHistory = [];
                if (pritDataObj.selfAcceptance !== OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED) {
                    if (pritDataObj.hasOwnProperty('selfRejectionHistory')) {
                        let selfRejectionHistoryData = JSON.parse(pritDataObj.selfRejectionHistory.replace(/'/g, "\""));
                        let rejectionHistoryLength = selfRejectionHistoryData.length - 1;
                        selfRejectionHistory = [
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.lastDateAcceptance', true),
                                "lblValue": presenter.getConvertedDate(pritDataObj, 'selfAcceptanceDate')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.lastReasonForRejection', true),
                                "lblValue": presenter.getDynamicData(selfRejectionHistoryData[rejectionHistoryLength], 'reasonForSelfRejection')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.lastMessageToBank', true),
                                "lblValue": presenter.getDynamicData(selfRejectionHistoryData[rejectionHistoryLength], 'messageToBank')
                            }
                        ]
                    }
                }
                // Processing Last Date of Acceptance
                let lastDateOfAcceptance = [];
                if (pritDataObj.selfAcceptance === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED) {
                        lastDateOfAcceptance = [
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.lastDateAcceptance', true),
                                "lblValue": presenter.getConvertedDate(pritDataObj, 'selfAcceptanceDate')
                            }
                        ]
                }
                // Appending Issuance Summary data into Issuance Summary array
                let issuenceSummery = [
                    [
                        { "lblHeader": presenter.renderI18nKeys('i18n.TradeFinance.issuanceSummary', false) }, // Section Header Template
                        [
                            ...partialIssuenceSummery, ...selfRejectionHistory, ...lastDateOfAcceptance
                        ]
                    ]
                ];

                // Processing Product Details
                // Processing Beneficiary Details
                let beneficiaryDetails = '';
                if (pritDataObj.hasOwnProperty('beneficiaryDetails')) {
                    let beneficiaryDetailsData = JSON.parse(pritDataObj.beneficiaryDetails.replace(/'/g, "\""));
                    let beneficiaryDetailsLength = beneficiaryDetailsData.length - 1;
                    beneficiaryDetailsData.map((item, index) => {
                        beneficiaryDetails += item.beneficiaryName + " - " + item.payeeId + (beneficiaryDetailsLength !== index ? '\n' : '');
                    });
                }
                let productDetailsArray = [
                    [
                        { "lblHeader": presenter.renderI18nKeys('i18n.TradeFinance.productDetails', false) }, // Section Header Template
                        [
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.productType', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'productType')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.GTAndSlbc', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'lcType')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.relatedTransactionReferenceOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'relatedTransactionReference')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.modeOfTransaction', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'modeOfTransaction')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.ApplicantParty', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'applicantParty')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.Beneficiary', true),
                                "lblValue": beneficiaryDetails.length > 0 ? beneficiaryDetails : NA
                            }
                        ]
                    ]
                ];

                // Processing Transaction Details
                let transactionDetails = [
                    [
                        { "lblHeader": presenter.renderI18nKeys('i18n.TradeFinance.TransactionDetails', false) }, // Section Header Template
                        [
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.requestAmountWithColon', false),
                                "lblValue": (pritDataObj.currency && pritDataObj.amount) ? `${pritDataObj.currency} ${formatUtilManager.formatAmount(pritDataObj.amount)}` : NA,
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.expectedIssueDateOptional', true),
                                "lblValue": presenter.getConvertedDate(pritDataObj, 'expectedIssueDate')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.expiryType', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'expiryType')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.expiryDateOptional', true),
                                "lblValue": presenter.getConvertedDate(pritDataObj, 'expiryDate')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.expiryConditionsOptWithColon', false),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'expiryConditions')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.autoExtensionOptWithColon', false),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'autoExtensionExpiry')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.extensionPeriod', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'extensionPeriod')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.extensionCapPeriodOptional', true),
                                "lblValue": presenter.getConvertedDate(pritDataObj, 'extensionCapPeriod')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.notificationPeriodOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'notificationPeriod')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.extensionDetailsOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'extensionDetails')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.governingLawOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'governingLaw')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.applicableRulesOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'applicableRules')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.deliveryInstructionsOptional', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'deliveryInstructions')
                            }
                        ]
                    ]
                ];

                // Processing Applicant & Issuing Bank Details
                let bankAddress = this.getFormattedAddress(pritDataObj.issuingBankAddress);
                let applicantAddress = this.getFormattedAddress(pritDataObj.applicantAddress);
                let applicantAndIssuingBankDetails = [
                    [
                        { "lblHeader": presenter.renderI18nKeys('i18n.TradeFinance.applicant&IssuingBankDetails', false) }, // Section Header Template
                        [
                            {
                                "flxKeyHeading": { "isVisible": true },
                                "lblKeyHeading": presenter.renderI18nKeys('i18n.ExportLC.Applicant', false),
                                "flxKey": { "isVisible": false },
                                "lblValue": ''
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.applicantName', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'applicantName')
                            },
                            Object.assign(
                                {
                                    "lblKey": presenter.renderI18nKeys('i18n.ExportLC.ApplicantAddress', true),
                                    "lblValue": {
                                        isVisible: !applicantAddress['flxAddress']['isVisible'],
                                        text: NA
                                    }
                                }, applicantAddress),
                            {
                                "flxKeyHeading": { "isVisible": true },
                                "lblKeyHeading": presenter.renderI18nKeys('i18n.TradeFinance.issuingBankDetails', false),
                                "flxKey": { "isVisible": false },
                                "lblValue": ''
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.transfers.bankName', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'issuingBankName')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('kony.mb.TransfersEurope.SwiftorBIC', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'issuingBankSwiftBicCode')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.WireTransfer.IBAN', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'issuingBankIban')
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.localCode', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'issuingBankLocalCode')
                            },
                            Object.assign(
                                {
                                    "lblKey": presenter.renderI18nKeys('i18n.transfers.bankAddress', true),
                                    "lblValue": {
                                        isVisible: !bankAddress['flxAddress']['isVisible'],
                                        text: NA
                                    }
                                }, bankAddress)
                        ]
                    ]
                ];

                // Processing Additional Instructions & Documents
                // Processing documents data
                let documentsList;
                let uploadedDocumentsArray = JSON.parse(pritDataObj.uploadedDocuments.replace(/'/g, "\""));
                let documentsLength = uploadedDocumentsArray.length - 1;
                uploadedDocumentsArray.map((item, index) => {
                    documentsList += item.documentName + (documentsLength !== index ? '\n' : '');
                });
                let additionalInstructionsAndDocuments = [
                    [
                        { "lblHeader": presenter.renderI18nKeys('i18n.TradeFinance.additionalInstructions&Documents', false) }, // Section Header Template
                        [
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.TradeFinance.MessagefromBank', true),
                                "lblValue": presenter.getDynamicData(pritDataObj, 'messageFromBank')
                            },
                            {
                                "flxKeyHeading": { "isVisible": true },
                                "lblKeyHeading": presenter.renderI18nKeys('i18n.unified.supportingDocuments', false),
                                "flxKey": { "isVisible": false },
                                "lblValue": ''
                            },
                            {
                                "lblKey": presenter.renderI18nKeys('i18n.ImportLC.UploadedFiles', true),
                                "lblValue": documentsList.length > 0 ? documentsList : NA
                            }
                        ]
                    ]
                ];

                // Appending whole print data into segment
                let wholePrintData = [
                    ...issuenceSummery,
                    ...productDetailsArray,
                    ...transactionDetails,
                    ...applicantAndIssuingBankDetails,
                    ...additionalInstructionsAndDocuments
                ];

                // setting data into segment
                scope.view.segSummeryList.setData(wholePrintData);
            } catch (err) {
                var errorObj =
                {
                    "method": "setDynamicData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : seti18nKeys
         * Setting i18n keys
         * @return : NA
         */
        seti18nKeys: function () {
            var scope = this;
            try {
                scope.view.lblTitle.text = presenter.renderI18nKeys('i18n.TradeFinance.ReceivedGuaranteesStandbyLC', false);
                scope.view.lblAdviceName.text = presenter.renderI18nKeys('i18n.TradeFinance.AdviseName', false);
				scope.view.lblAdviceDate.text = presenter.renderI18nKeys('i18n.ChequeManagement.Date', false);
				scope.view.lblAdviceParty.text = presenter.renderI18nKeys('i18n.TradeFinance.AdviceParty', false);
				scope.view.lblAdviceMessage.text = presenter.renderI18nKeys('i18n.AlertsAndMessages.Message', false);
				scope.view.lblPaymentAdvice.text = presenter.renderI18nKeys('i18n.TradeFinance.PaymentAdvice', false);
            } catch (err) {
                var errorObj =
                {
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

      /**
         * @api : setDynamicDataInPaymentAdviceDetails
         * Setting data in PaymentAdvice block
         * @arg1 : objKey - input key to get the value
         * @return : objValue - Value based on provided input key
         */
        setDynamicDataInPaymentAdviceDetails: function () {
            var scope = this;
            try {
                if (pritDataObj.hasOwnProperty('PaymentAdvices') && pritDataObj.PaymentAdvices.length > 0) {
                    scope.view.segPaymentAdviceList.setVisibility(true);
                    scope.view.lblNoRecordsAvailable.setVisibility(false);
                    scope.view.segPaymentAdviceList.widgetDataMap = {
                        lblAdviceName: "lblAdviceName",
                        lblAdviceDate: "lblAdviceDate",
                        lblAdviceParty: "lblAdviceParty",
                        lblAdviceMessage: "lblAdviceMessage"
                    };
    
                    // Processing payment Advice data
                    let masterData = [];
                    pritDataObj.PaymentAdvices.map((item) => {
                        masterData.push({
                            lblAdviceName: presenter.getDynamicData(item, 'adviceName'),
                            lblAdviceDate: presenter.getConvertedDate(item, 'paymentDate'),
                            lblAdviceParty: presenter.getDynamicData(item, 'advisingBank'),
                            lblAdviceMessage: presenter.getDynamicData(item, 'message')
                        });
                    });
    
                    // setting data into segment
                    scope.view.segPaymentAdviceList.setData(masterData);
                } else {
                    scope.view.segPaymentAdviceList.setVisibility(false);
                    scope.view.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound");
                    scope.view.lblNoRecordsAvailable.setVisibility(true);
                }
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "setDynamicDataInPaymentAdviceDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getFormattedAddress
         * Formatting the address
         * @arg: data - Address object based on response
         * @return : Object of widgets with content
        */
        getFormattedAddress: function (data) {
            var scope = this;
            try {
                data = JSON.parse(data.replace(/'/g, "\""));
                let address1, address2, address3;
                address1 = data.address1;
                address2 = data.address2;
                address3 = [data.city, data.state, data.country, data.zipcode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
                return {
                    'flxAddress': {
                        isVisible: !!address1 || !!address2 || !!address3
                    },
                    'lblAddress1': {
                        isVisible: !!address1,
                        text: address1
                    },
                    'lblAddress2': {
                        isVisible: !!address2,
                        text: address2
                    },
                    'lblAddress3': {
                        isVisible: !!address3,
                        text: address3
                    }
                };
            } catch (err) {
                var errorObj = {
                    "method": "getFormattedAddress",
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
            errMsg.level = "frmPrintReceivedGuarantees";
            // kony.ui.Alert(errMsg);
        },
    };
});
