define(['CommonUtilities'], function (CommonUtilities) {
    let data, NA = kony.i18n.getLocalizedString("i18n.common.NA");
    return {
        /**
         * @api : onNavigate
         * Will trigger when navigating from other form to this form
         * @return : NA
         */
        onNavigate: function (printData) {
            var scope = this;
            try {
                data = printData.navData;
                scope.view.postShow = scope.postShow;
                scope.view.preShow = scope.preShow;
                previousForm = data.previousFormName;
            } catch (err) {
                var errorObj = {
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
                scope.setDetails();
            } catch (err) {
                var errorObj = {
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
            kony.os.print();
            //timeout is required to allow print popup to be visible.
            setTimeout(function () {
                const previousForm = kony.application.getPreviousForm().id;
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `GuaranteesUIModule/${previousForm}`
                }).navigate(data);
            }, "17ms");
        },
        setDetails: function () {
            const scope = this;
            segData = [];
            const configurationManager = applicationManager.getConfigurationManager();
            const formatUtilManager = applicationManager.getFormatUtilManager();
            try {
                scope.view.segDetails.widgetDataMap = {
                    "flxMain": "flxMain",
                    "lblKey": "lblKey",
                    "lblValue": "lblValue",
                    "flxSeparator": "flxSeparator",
                    "lblDescription": "lblDescription",
                    "flxDocument": "flxDocument",
                    "flxDownloadImage": "flxDownloadImage",
                    "lblDocumentName": "lblDocumentName",
                    "flxAddress": "flxAddress",
                    "lblAddress1": "lblAddress1",
                    "lblAddress2": "lblAddress2",
                    "lblAddress3": "lblAddress3",
                    "btnAction": "btnAction",
                };
                if (data.guaranteesSRMSId) {
                    let issuanceSummaryDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceSummary"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionReferenceWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.guaranteesSRMSId || NA,
                            isVisible: true
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.createdOnWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.createdOn ? formatUtilManager.getFormattedCalendarDate(data.createdOn) : NA,
                            isVisible: true
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.createdByWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.beneficiaryName || NA,
                            isVisible: true
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceStatusWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.status || NA,
                            isVisible: true
                        }
                    }];
                    let productDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.productDetails"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.productType || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.productType
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.guaranteeAndSBLCType || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.guaranteeAndSBLCType
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.relatedTransactionReferenceOptionalWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.guaranteesReferenceNo || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.guaranteesReferenceNo
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionModeWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.modeOfTransaction || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.modeOfTransaction
                        }
                    }];
                    if (data.modeOfTransaction === 'Swift') {
                        productDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.instructingPartyWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.instructingParty || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.instructingParty
                            }
                        }, {
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.selectTheApplicantPartyWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.applicantParty || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.applicantParty
                            }
                        });
                    }
                    let transactionDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.requestAmountWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: (data.currency && data.amount) ? (data.currency + ' ' + formatUtilManager.formatAmount(data.amount)) : NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!(data.currency && data.amount)
                        }
                    }];
                    if (data.productType !== 'Guarantee') {
                        transactionDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.demandAcceptanceWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.demandAcceptance || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.demandAcceptance
                            }
                        }, {
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.transferableOptionalWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.transferable || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.transferable
                            }
                        });
                    }
                    transactionDetails.push({
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.expectedIssueDateWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.issueDate ? formatUtilManager.getFormattedCalendarDate(data.issueDate) : NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.issueDate
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryTypeWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.expiryType || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.expiryType
                        }
                    });
                    if (data.expiryType === 'Date' || data.expiryType === 'Conditions') {
                        transactionDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryDateOptWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.expiryDate ? formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.expiryDate
                            }
                        });
                    }
                    if (data.expiryType === 'Conditions') {
                        transactionDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryConditionsOptWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.expiryCondition || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.expiryCondition
                            }
                        });
                    }
                    if (data.modeOfTransaction === 'Swift' && data.extendExpiryDate) {
                        transactionDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.autoExtensionOptWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.extendExpiryDate || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.extendExpiryDate
                            }
                        });
                        if (data.extendExpiryDate === 'Yes') {
                            transactionDetails.push({
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionPeriodWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: data.extensionPeriod || NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!data.extensionPeriod
                                }
                            }, {
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionCapPeriodWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: data.extensionCapPeriod ? formatUtilManager.getFormattedCalendarDate(data.extensionCapPeriod) : NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!data.extensionCapPeriod
                                }
                            }, {
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.notificationPeriodWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: data.notificationPeriod || NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!data.notificationPeriod
                                }
                            });
                        }
                        transactionDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionDetailsWithColon"),
                                isVisible: true
                            },
                            lblValue: {
                                text: data.extensionDetails || NA,
                                isVisible: true
                            },
                            flxMain: {
                                isVisible: !!data.extensionDetails
                            }
                        });
                    }
                    transactionDetails.push({
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.governingLawWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.governingLaw || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.governingLaw
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicableRulesOptionalWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.applicableRules || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.applicableRules
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.deliveryInstructionsOptional"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.deliveryInstructions || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.deliveryInstructions
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.otherInstructionsWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.otherInstructions || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.otherInstructions
                        }
                    });
                    let beneficiaryAndAdvisingBankDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiary&AdvisingBankDetails"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }];
                    if (data.beneficiaryDetails) {
                        const beneficiaryDetails = JSON.parse(data.beneficiaryDetails.replace(/'/g, '"'));
                        for (let i = 0; i < beneficiaryDetails.length; i++) {
                            let beneficiaryAddress = this.getFormattedAddress(beneficiaryDetails[i], 'beneficiary');
                            beneficiaryAndAdvisingBankDetails.push({
                                lblKey: {
                                    text: kony.i18n.getLocalizedString('i18n.TradeFinance.Beneficiary') + ' ' + (i + 1),
                                    isVisible: true,
                                    skin: "ICSknLbl424242SSPRegular15px"
                                }
                            }, {
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("kony.mb.TransferEurope.beneficairyNameColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: beneficiaryDetails[i].beneficiaryName || NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!beneficiaryDetails[i].beneficiaryName
                                }
                            }, Object.assign({
                                lblSwiftTag: {
                                    text: ''
                                },
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("kony.i18n.verifyDetails.beneficiaryAddressOptional"),
                                    isVisible: true
                                },
                                lblValue: {
                                    isVisible: !beneficiaryAddress['flxAddress']['isVisible'],
                                    text: NA
                                },
                                flxMain: {
                                    isVisible: !!beneficiaryAddress['flxAddress']['isVisible']
                                }
                            }, beneficiaryAddress));
                        }
                    }
                    let bankAddress = this.getFormattedAddress(data, 'bank');
                    beneficiaryAndAdvisingBankDetails.push({
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.advisingBankDetailsOptional"),
                            isVisible: true,
                            skin: "ICSknLbl424242SSPRegular15px"
                        },
                        flxMain: {
                            isVisible: !!data.bankName || !!data.swiftCode || !!data.iban || !!data.localCode || !!bankAddress['flxAddress']['isVisible']
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.payee.bankname"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.bankName || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.bankName
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.swift/BicCodeWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.swiftCode || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.swiftCode
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.Accounts.IBAN"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.iban || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.iban
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.localCodeWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.localCode || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.localCode
                        }
                    }, Object.assign({
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.bankAddressWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            isVisible: !bankAddress['flxAddress']['isVisible'],
                            text: NA
                        },
                        flxMain: {
                            isVisible: !!bankAddress['flxAddress']['isVisible']
                        }
                    }, bankAddress));
                    let bankInstructionAndDocumentDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.bankInstructions&Documents"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }];
                    if (data.instructionCurrencies) {
                        const currencies = Array.from(new Set(JSON.parse(data.instructionCurrencies.replace(/'/g, '"')).map(acc => acc.accountCurrency)));
                        const settlementAccount = JSON.parse(data.instructionCurrencies.replace(/'/g, '"')).reduce((acc, obj) => {
                            (acc[obj['accountCurrency']] = acc[obj['accountCurrency']] || {})[obj['accountType']] = obj['account'];
                            return acc;
                        }, []);
                        bankInstructionAndDocumentDetails.push({
                            lblKey: {
                                text: kony.i18n.getLocalizedString("i18n.TradeFinance.settlementAccountsOpt"),
                                isVisible: true
                            }
                        });
                        for (const currency of currencies) {
                            bankInstructionAndDocumentDetails.push({
                                lblSwiftTag: {
                                    text: NA
                                },
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("kony.i18n.verifyDetails.currency"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: currency ? `${currency} - ${configurationManager.getCurrency(currency)}` : NA,
                                    isVisible: true
                                }
                            }, {
                                lblSwiftTag: {
                                    text: NA
                                },
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.chargeAccountWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: settlementAccount[currency]['Charge'] ? this.getAccountDisplayName(settlementAccount[currency]['Charge']) : NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!settlementAccount[currency]['Charge']
                                }
                            }, {
                                lblSwiftTag: {
                                    text: NA
                                },
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.commissionAccountWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: settlementAccount[currency]['Commission'] ? this.getAccountDisplayName(settlementAccount[currency]['Commission']) : NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!settlementAccount[currency]['Commission']
                                }
                            }, {
                                lblSwiftTag: {
                                    text: NA
                                },
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.cashMarginAccountWithColon"),
                                    isVisible: true
                                },
                                lblValue: {
                                    text: settlementAccount[currency]['Cash Margin'] ? this.getAccountDisplayName(settlementAccount[currency]['Cash Margin']) : NA,
                                    isVisible: true
                                },
                                flxMain: {
                                    isVisible: !!settlementAccount[currency]['Cash Margin']
                                }
                            });
                        }
                    }
                    bankInstructionAndDocumentDetails.push({
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.additionalDetails"),
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.limitInstructions || !!data.otherBankInstructions || !!data.messageToBank
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.limitInstructionsWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.limitInstructions ? (this.isJSON(data.limitInstructions) ? Object.values(JSON.parse(data.limitInstructions.replace(/'/g, '"'))).join(' - ') : data.limitInstructions) : NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.limitInstructions
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.otherInstructionsWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.otherBankInstructions || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.otherBankInstructions
                        }
                    }, {
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.messageToBankWithColon"),
                            isVisible: true
                        },
                        lblValue: {
                            text: data.messageToBank || NA,
                            isVisible: true
                        },
                        flxMain: {
                            isVisible: !!data.messageToBank
                        }
                    });
                    if (data.documentName) {
                        const documentNames = this.isJSON(data.documentName) ? JSON.parse(data.documentName.replace(/'/g, '"')) : data.documentName.split(',');
                        if (documentNames && documentNames.length > 0) {
                            bankInstructionAndDocumentDetails.push({
                                lblKey: {
                                    text: kony.i18n.getLocalizedString("i18n.unified.supportingDocuments"),
                                    isVisible: true,
                                    skin: "ICSknLbl424242SSPRegular15px"
                                }
                            });
                            for (let i = 0; i < documentNames.length; i++) {
                                bankInstructionAndDocumentDetails.push({
                                    lblKey: {
                                        text: kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedFilesWithColon"),
                                        isVisible: i === 0
                                    },
                                    lblValue: {
                                        text: documentNames[i]
                                    },
                                    flxMain: {
                                        isVisible: !!documentNames[i]
                                    }
                                });
                            }
                        }
                    }
                    let clauseConditionDetails = [{
                        lblKey: {
                            text: kony.i18n.getLocalizedString("i18n.TradeFinance.clauses&Conditions"),
                            isVisible: true,
                            skin: 'bblblskn424242Bold'
                        },
                        lblValue: {
                            isVisible: false
                        }
                    }];
                    if (data.clauseConditions) {
                        const clauseConditions = JSON.parse(data.clauseConditions.replace(/'/g, '"'));
                        for (const {
                            clauseDescription
                        }
                            of clauseConditions) {
                            clauseConditionDetails.push({
                                lblDescription: {
                                    text: clauseDescription,
                                },
                                template: 'flxClausesDescription'
                            });
                        }
                    } else {
                        clauseConditionDetails.push({
                            lblDescription: {
                                text: NA,
                            },
                            template: 'flxClausesDescription'
                        });
                    }
                    segData.push(...issuanceSummaryDetails, ...productDetails, ...transactionDetails, ...beneficiaryAndAdvisingBankDetails, ...bankInstructionAndDocumentDetails, ...clauseConditionDetails);
                    // segData.forEach(row => {
                    //     if (!row.lblValue) row.lblValue = {
                    //         isVisible: false
                    //     };
                    //     if (!row.btnAction) row.btnAction = {
                    //         isVisible: false
                    //     };
                    //     if (!row.flxDocument) row.flxDocument = {
                    //         isVisible: false
                    //     };
                    //     if (!row.flxAddress) row.flxAddress = {
                    //         isVisible: false
                    //     };
                    //     if (!row.flxSeparator) row.flxSeparator = {
                    //         isVisible: false
                    //     };
                    // });
                    this.view.segDetails.removeAll();
                    this.view.segDetails.setData(segData);
                }
            } catch (err) {
                const errorObj = {
                    "level": "FormController",
                    "method": "setDetails",
                    "error": err
                };
                this.onError(errorObj);
            }
        },
        getFormattedAddress: function (data, type) {
            let address1, address2, address3;
            if (type === 'beneficiary') {
                address1 = data.address1;
                address2 = data.address2;
                address3 = [data.city, data.state, data.country, data.zipcode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
            } else {
                address1 = data.bankAddress1;
                address2 = data.bankAddress2;
                address3 = [data.bankCity, data.bankState, data.bankCountry, data.bankZipCode].join(',').replace(/^,+|,+$/g, '').replace(/,+/g, ', ');
            }
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
        },
        /**
         * Method to check whether a string is JSON object or not
         * @param {string} val - contains value to be checked
         * @returns {boolean} - validity of value
         */
        isJSON: function (val) {
            try {
                val = val.replace(/'/g, '"');
                return (JSON.parse(val) && !!val);
            } catch (e) {
                return false;
            }
        },
        getAccountDisplayName: function (selectedAccountId) {
            const accounts = applicationManager.getAccountManager().getInternalAccounts();
            for (const account of accounts) {
                if (account.accountID === selectedAccountId) {
                    return CommonUtilities.getAccountDisplayName(account);
                }
            }
            return kony.i18n.getLocalizedString("i18n.common.NA");
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