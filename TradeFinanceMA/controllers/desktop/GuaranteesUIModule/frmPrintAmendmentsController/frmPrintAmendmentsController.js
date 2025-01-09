define(['CommonUtilities'], function (CommonUtilities) {
    let pritDataObj;
    let previousForm;
    let widgetDataMapObj = { "lblHeader": "lblHeader", "lblKey": "lblKey", "lblValue": "lblValue" };
    let regExpForCheckArrayInString = /[\[\]]+/;
    let NA = kony.i18n.getLocalizedString("i18n.common.NA");
    return {
        /**
         * @api : onNavigate
         * Will trigger when navigating from other form to this form
         * @return : NA
         */
        onNavigate: function (data) {
            var scope = this;
            try {
                pritDataObj = data.navData;
                previousForm = data.previousFormName;
                scope.view.postShow = scope.postShow;
                scope.view.preShow = scope.preShow;
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
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
                scope.seti18nKeys();
                scope.setDynamicDataInLcSummery();
                scope.setDynamicDataInAmendmentDetails();
                scope.setDynamicDataInAmendmentReqDetails();
                scope.setDynamicDataInAmendmentAdviceDetails();
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
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
                    "level": "FormController",
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
                    "friendlyName": `GuaranteesUIModule/${previousForm}`
                }).navigate(pritDataObj);
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "afterPrintCallback",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDynamicDataInLcSummery
         * Setting data in LC Summery block
         * @return : NA
         */
        setDynamicDataInLcSummery: function () {
            var scope = this;
            try {
                let instructingParty = kony.i18n.getLocalizedString("i18n.common.NA");
                if (pritDataObj.hasOwnProperty('instructingParty')) {
                    if (regExpForCheckArrayInString.test(pritDataObj.instructingParty)) {
                        instructingParty = JSON.parse(pritDataObj.instructingParty.replace(/'/g, "\""))[0].contractId;
                    } else {
                        instructingParty = pritDataObj.instructingParty;
                    }
                }
                scope.view.segSummeryList.widgetDataMap = widgetDataMapObj;
                let segDataArray = [
                    [
                        { "lblHeader": scope.renderI18nKeys('i18n.TradeFinance.LCSummary', false) },
                        [
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.BeneficiaryDetails', true),
                                "lblValue": pritDataObj.hasOwnProperty('beneficiaryDetails') ? JSON.parse(pritDataObj.beneficiaryDetails.replace(/'/g, "\""))[0].beneficiaryName : NA
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.TransactionRef', true),
                                "lblValue": scope.getDynamicData('amendmentReference')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.productType', true),
                                "lblValue": scope.getDynamicData('productType')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.GTAndSlbc', true),
                                "lblValue": scope.getDynamicData('billType')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('kony.mb.common.Amount', true),
                                "lblValue": scope.getConvertedCurrency('currency', 'amount')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.IssueDate', true),
                                "lblValue": scope.getConvertedDate('issueDate')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.expiryType', true),
                                "lblValue": scope.getDynamicData('expiryType')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.ExpiryDate', true),
                                "lblValue": scope.getConvertedDate('expiryDate')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.InstructingParty', true),
                                "lblValue": instructingParty
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.ApplicantParty', true),
                                "lblValue": scope.getDynamicData('applicantParty')
                            }
                        ]
                    ]
                ];
                scope.view.segSummeryList.setData(segDataArray);
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "setDynamicDataInLcSummery",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDynamicDataInAmendmentDetails
         * Setting data in AmendmentDetails block
         * @return : NA
         */
        setDynamicDataInAmendmentDetails: function () {
            var scope = this;
            try {
                scope.view.segAmendmentDetailsList.widgetDataMap = widgetDataMapObj;
                let segDataArray = [
                    [
                        { "lblHeader": scope.renderI18nKeys('i18n.TradeFinance.AmendmentDetails', false) },
                        [
                            {
                                "lblKey": scope.renderI18nKeys('i18n.billPay.Status', true),
                                "lblValue": scope.getDynamicData('amendStatus')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.ApprovedDate', true),
                                "lblValue": scope.getConvertedDate('approvedDate')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.AmendmentNo', true),
                                "lblValue": scope.getDynamicData('amendmentNo')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.RequestedDate', true),
                                "lblValue": scope.getConvertedDate('amendRequestedDate')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.AmendmentReference', true),
                                "lblValue": scope.getDynamicData('amendmentReference')
                            }
                        ]
                    ]
                ];
                scope.view.segAmendmentDetailsList.setData(segDataArray);
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "setDynamicDataInAmendmentDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getDynamicData
         * Returning the dynamic data based on input parameter
         * @arg1 : objKey - input key to get the value
         * @return : objValue - Value based on provided input key
         */
        setDynamicDataInAmendmentReqDetails: function () {
            var scope = this;
            try {
                scope.view.segAmendmentRequestedList.widgetDataMap = widgetDataMapObj;
                let segDataArray = [
                    [
                        { "lblHeader": scope.renderI18nKeys('i18n.TradeFinance.AmendmentsRequested', false) },
                        [
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.AmendmentEffectiveDate', true),
                                "lblValue": scope.getConvertedDate('amendmentEffectiveDate')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('kony.mb.common.Amount', true),
                                "lblValue": scope.getConvertedCurrency('currency', 'amendAmount')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.expiryType', true),
                                "lblValue": scope.getDynamicData('amendExpiryType')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.BeneficiaryDetails', true),
                                "lblValue": pritDataObj.hasOwnProperty('beneficiaryDetails') ? JSON.parse(pritDataObj.beneficiaryDetails.replace(/'/g, "\""))[0].beneficiaryName : NA
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.AmendmentDetails', true),
                                "lblValue": scope.getDynamicData('amendDetails')
                            },
                            {
                                "lblKey": scope.renderI18nKeys('i18n.TradeFinance.MessageOrResponseToBank', true),
                                "lblValue": scope.getDynamicData('messageToBank')
                            }
                        ]
                    ]
                ];
                scope.view.segAmendmentRequestedList.setData(segDataArray);
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "postShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : setDynamicDataInAmendmentAdviceDetails
         * Setting data in AmendmentAdvice block
         * @arg1 : objKey - input key to get the value
         * @return : objValue - Value based on provided input key
         */
        setDynamicDataInAmendmentAdviceDetails: function () {
            var scope = this;
            try {
                if (pritDataObj.hasOwnProperty('SwiftsAndAdvices') && pritDataObj.SwiftsAndAdvices.length > 0) {
                    scope.view.segAmendmentAdviceList.setVisibility(true);
                    scope.view.lblNoRecordsAvailable.setVisibility(false);
                    scope.view.segAmendmentAdviceList.widgetDataMap = {
                        lblAdviceName: "lblAdviceName",
                        lblAdviceDate: "lblAdviceDate",
                        lblAdviceParty: "lblAdviceParty",
                        lblAdviceMessage: "lblAdviceMessage"
                    };
    
                    // Processing Amendment Advice data
                    let masterData = [];
                    pritDataObj.SwiftsAndAdvices.map((item) => {
                        masterData.push({
                            lblAdviceName: item.adviceName,
                            lblAdviceDate: scope.getConvertedDate(item.messageDate),
                            lblAdviceParty: item.receiver,
                            lblAdviceMessage: item.message
                        });
                    });
    
                    // setting data into segment
                    scope.view.segAmendmentAdviceList.setData(masterData);
                } else {
                    scope.view.segAmendmentAdviceList.setVisibility(false);
                    scope.view.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.permissionTemplate.noRecordFound");
                    scope.view.lblNoRecordsAvailable.setVisibility(true);
                }
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "setDynamicDataInAmendmentAdviceDetails",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getDynamicData
         * Returning the dynamic data based on input parameter
         * @arg1 : objKey - input key to get the value
         * @return : objValue - Value based on provided input key
         */
        getDynamicData: function (objKey) {
            var scope = this;
            try {
                let tempDynamicData = kony.i18n.getLocalizedString("i18n.common.NA");
                if (pritDataObj.hasOwnProperty(objKey)) {
                    if (!scope.isNullOrUndefined(pritDataObj[objKey])) {
                        tempDynamicData = pritDataObj[objKey];
                    }
                }
                return tempDynamicData;
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "getDynamicData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getConvertedDate
         * Getting the date based on input
         * @arg1 : objKey - input key to get the value
         * @return : stringValue - Value based on provided input key
         */
        getConvertedDate: function (rawDateKey) {
            var scope = this;
            try {
                let tempConvertedDate = kony.i18n.getLocalizedString("i18n.common.NA");
                if (pritDataObj.hasOwnProperty(rawDateKey)) {
                    if (!scope.isNullOrUndefined(pritDataObj[rawDateKey])) {
                        tempConvertedDate = CommonUtilities.getFrontendDateStringInUTC(scope.getDynamicData(rawDateKey), applicationManager.getConfigurationManager().getConfigurationValue(scope.getDynamicData('frontendDateFormat')))
                    }
                }
                return tempConvertedDate;
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "getConvertedDate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : getConvertedCurrency
         * Getting the currency based on input
         * @arg1 : rawCurrencyKey - input key to get the value
         * @return : stringValue - Value based on provided input key
         */
        getConvertedCurrency: function (rawCurrencyKey, rawAmountKey) {
            var scope = this;
            try {
                let notAvailable = kony.i18n.getLocalizedString("i18n.common.NA");
                let tempAmount;
                let tempCurrency = notAvailable;
                if (pritDataObj.hasOwnProperty(rawCurrencyKey)) {
                    if (!scope.isNullOrUndefined(pritDataObj[rawCurrencyKey])) {
                        tempCurrency = applicationManager.getConfigurationManager().getCurrency(pritDataObj[rawCurrencyKey]);
                    }
                }
                tempAmount = scope.getDynamicData(rawAmountKey);

                if (tempCurrency === notAvailable && tempAmount === notAvailable) {
                    return notAvailable;
                } else if (tempCurrency === notAvailable || tempAmount === notAvailable) {
                    if (tempAmount !== notAvailable) {
                        return tempAmount;
                    } else if (tempCurrency !== notAvailable) {
                        return tempCurrency;
                    }
                } else {
                    return tempCurrency + " " + tempAmount;
                }
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "getConvertedCurrency",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : renderI18nKeys
         * Rendering 
         * @return : NA
         */
        renderI18nKeys: function (i18nKeyString, renderColon) {
            var scope = this;
            try {
                let i18nValue = kony.i18n.getLocalizedString(i18nKeyString);
                if (renderColon)
                    i18nValue = i18nValue + ":";
                return i18nValue;
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "renderI18nKeys",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : isNullOrUndefined
         * Checking response is having null or undefined
         * @arg : Response of service
         * @return : Boolean value
         */
        isNullOrUndefined: function (reponse) {
            var scope = this;
            try {
                let isNullOrUndefinedTemp = false;
                if (reponse === null || reponse === 'null' || reponse === undefined || reponse === 'undefined' || reponse === '') {
                    isNullOrUndefinedTemp = true;
                }
                return isNullOrUndefinedTemp;
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "isNullOrUndefined",
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
                scope.view.lblTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTSBLC");
                scope.view.lblBankNameKey.text = kony.i18n.getLocalizedString("kony.tab.addBen.bankName") + " :";
                scope.view.lblCustCareKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CustomerCare") + " :";
                scope.view.lblAddressKey.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Address") + " :";
                scope.view.lblEmailKey.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId") + " :";
                scope.view.lblWebsiteKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Website") + " :";
                // Amendment Advice
                scope.view.lblAmendmentAdviceTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentAdvice");
                scope.view.lblAdviceName.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdviseName");
                scope.view.lblAdviceDate.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date");
                scope.view.lblAdviceParty.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdviceParty");
                scope.view.lblAdviceMessage.text = kony.i18n.getLocalizedString("kony.tab.common.Message");
            } catch (err) {
                var errorObj =
                {
                    "level": "FormController",
                    "method": "seti18nKeys",
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
            // kony.ui.Alert(errMsg);
        }
    };
});