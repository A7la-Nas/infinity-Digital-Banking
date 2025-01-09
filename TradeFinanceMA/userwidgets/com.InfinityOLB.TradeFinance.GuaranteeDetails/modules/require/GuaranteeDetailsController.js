define(['CommonUtilities', 'OLBConstants'], function (CommonUtilities, OLBConstants) {
  let segData = [];
  let data;
  let swiftTagEnabled;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * @api : preShow
     * Gets invoked initially before rendering of UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        if (data) {
          scope.setGuaranteeAndSBLCDetails();
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
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
    postShow: function (param) {
      var scope = this;
      try {

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function (param) {
      var scope = this;
      try {
        data = param.data;
        swiftTagEnabled = param.showSwiftTags;
        scope.setGuaranteeAndSBLCDetails();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : setGuaranteeAndSBLCDetails
     * Gets invoked to set the Issued GT and SBLC data into segment
     * @return : NA
     */
    setGuaranteeAndSBLCDetails: function () {
      const scope = this;
      segData = [];
      const configurationManager = applicationManager.getConfigurationManager();
      const formatUtilManager = applicationManager.getFormatUtilManager();
      const guaranteeSwiftTags = configurationManager.guaranteeSwiftTags;
      try {
        scope.view.segDetails.widgetDataMap = {
          "lblHeading": "lblHeading",
          "lblDropdownIcon": "lblDropdownIcon",
          "flxDropdown": "flxDropdown",
          "flxMain": "flxMain",
          "flxSwiftTag": "flxSwiftTag",
          "lblSwiftTag": "lblSwiftTag",
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
          "flxGuaranteeDetailsHeader": "flxGuaranteeDetailsHeader"
        };
        if (data.guaranteesSRMSId) {
          let issuanceSummaryDetails = [
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.guaranteesSRMSId || NA
              },
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionReferenceWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.relatedTransactionReference || data.guaranteesSRMSId || NA,
                isVisible: true
              }
            },
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.createdOn || NA
              },
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.createdOnWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.createdOn ? formatUtilManager.getFormattedCalendarDate(data.createdOn) : NA,
                isVisible: true
              }
            },
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.beneficiaryName || NA
              },
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.createdByWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.beneficiaryName || NA,
                isVisible: true
              }
            }
          ];
          if (data.status.toLowerCase() !== (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase()) {
            issuanceSummaryDetails.push(
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.status || NA
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceStatusWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: data.status || NA,
                  isVisible: true
                }
              }
            );
          } else {
            const returnHistory = JSON.parse(data.returnHistory.replace(/'/g, '"'));
            this.setReturnedHistoryData(returnHistory);
            const lastReturn = returnHistory.slice(-1)[0];
            issuanceSummaryDetails.push(
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.status || NA
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceStatusWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: `${data.status} (${this.getOrdinalNumeral(returnHistory.length)})`,
                  isVisible: true
                },
                btnAction: {
                  text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.viewHistory")} (${returnHistory.length - 1})`,
                  left: '200dp',
                  isVisible: returnHistory.length > 1 ? true : false,
                  onClick: this.showReturnedHistory
                }
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.status || NA
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.returnedOnWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: lastReturn.returnedTime ? formatUtilManager.getFormattedCalendarDate(lastReturn.returnedTime) : NA,
                  isVisible: true
                }
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.status || NA
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.returnedReasonWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: lastReturn.reasonForReturn || NA,
                  isVisible: true
                }
              }
            );
          }
          issuanceSummaryDetails.push(
            {
              flxMain: {
                isVisible: false
              },
              flxSeparator: {
                isVisible: true
              }
            }
          );
          segData.push([
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceSummary"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxDropdown": {
                isVisible: false
              },
              "flxMain":{
                "left": "0dp",
                "width": "100%"
              }, 
            },
            issuanceSummaryDetails
          ]);
        }
        let productDetails = [
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.productType || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.GTAndSBLCType || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.relatedTransactionReference || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.modeofTransaction || NA
            },
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
          }
        ];
        if (data.modeOfTransaction === 'Swift') {
          productDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.instructingParty || NA
              },
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
            },
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.applicantParty || NA
              },
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
            }
          );
        }
        productDetails.push(
          {
            flxMain: {
              isVisible: false
            },
            flxSeparator: {
              isVisible: true
            }
          }
        );
        let transactionDetails = [
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.currencyAndAmount || NA
            },
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
          }
        ];
        if (data.productType !== 'Guarantee') {
          transactionDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.demand || NA
              },
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
            },
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.transferable || NA
              },
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
            }
          );
        }
        transactionDetails.push(
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.expectedIssueDate || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.expiryType || NA
            },
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
          }
        );
        if (data.expiryType === 'Date' || data.expiryType === 'Conditions') {
          transactionDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.expiryDate || NA
              },
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
            }
          );
        }
        if (data.expiryType === 'Conditions') {
          transactionDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.expiryConditions || NA
              },
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
            }
          );
        }
        if (data.modeOfTransaction === 'Swift' && data.extendExpiryDate) {
          transactionDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.autoExtension || NA
              },
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
            }
          );
          if (data.extendExpiryDate === 'Yes') {
            transactionDetails.push(
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.extensionPeriod || NA
                },
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
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.extensionCapPeriod || NA
                },
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
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.notificationPeriod || NA
                },
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
              }
            );
          }
          transactionDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.extensionDetails || NA
              },
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
            }
          );
        }
        transactionDetails.push(
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.governingLaw || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.applicableRules || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.deliveryInstructions || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.otherInstructions || NA
            },
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
          },
          {
            flxMain: {
              isVisible: false
            },
            flxSeparator: {
              isVisible: true
            }
          }
        );
        let beneficiaryAndAdvisingBankDetails = [];
        if (data.beneficiaryDetails) {
          const beneficiaryDetails = JSON.parse(data.beneficiaryDetails.replace(/'/g, '"'));
          for (let i = 0; i < beneficiaryDetails.length; i++) {
            let beneficiaryAddress = this.getFormattedAddress(beneficiaryDetails[i], 'beneficiary');
            beneficiaryAndAdvisingBankDetails.push(
              {
                flxSwiftTag: {
                  isVisible: false
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString('i18n.TradeFinance.Beneficiary') + ' ' + (i + 1),
                  isVisible: true,
                  skin: "ICSknLbl424242SSPRegular15px"
                }
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: guaranteeSwiftTags.beneficiaryName || NA
                },
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
              },
              Object.assign(
                {
                  flxSwiftTag: {
                    isVisible: swiftTagEnabled
                  },
                  lblSwiftTag: {
                    text: guaranteeSwiftTags.beneficiaryAddress || NA
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
                }, beneficiaryAddress)
            );
          }
        }
        let bankAddress = this.getFormattedAddress(data, 'bank');
        beneficiaryAndAdvisingBankDetails.push(
          {
            flxSwiftTag: {
              isVisible: false
            },
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.advisingBankDetailsOptional"),
              isVisible: true,
              skin: "ICSknLbl424242SSPRegular15px"
            }
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.advisingBankName || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.swiftCode || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.iban || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.countrySpecificCode || NA
            },
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
          },
          Object.assign(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.advisingBankAddress || NA
              },
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
            }, bankAddress),
          {
            flxMain: {
              isVisible: false
            },
            flxSeparator: {
              isVisible: true
            }
          }
        );
        let bankInstructionAndDocumentDetails = [];
        if (data.instructionCurrencies) {
          const currencies = Array.from(new Set(JSON.parse(data.instructionCurrencies.replace(/'/g, '"')).map(acc => acc.accountCurrency)));
          const settlementAccount = JSON.parse(data.instructionCurrencies.replace(/'/g, '"')).reduce((acc, obj) => {
            (acc[obj['accountCurrency']] = acc[obj['accountCurrency']] || {})[obj['accountType']] = obj['account'];
            return acc;
          }, []);
          bankInstructionAndDocumentDetails.push(
            {
              flxSwiftTag: {
                isVisible: swiftTagEnabled
              },
              lblSwiftTag: {
                text: guaranteeSwiftTags.productType || NA
              },
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.settlementAccountsOpt"),
                isVisible: true,
                skin: "ICSknLbl424242SSPRegular15px"
              }
            }
          );
          for (const currency of currencies) {
            bankInstructionAndDocumentDetails.push(
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
                lblSwiftTag: {
                  text: NA
                },
                lblKey: {
                  text: kony.i18n.getLocalizedString("kony.i18n.verifyDetails.currency"),
                  isVisible: true
                },
                lblValue: {
                  text: currency + " - " + configurationManager.getCurrency(currency) || NA,
                  isVisible: true
                }
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
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
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
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
              },
              {
                flxSwiftTag: {
                  isVisible: swiftTagEnabled
                },
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
              }
            );
          }
        }
        bankInstructionAndDocumentDetails.push(
          {
            flxSwiftTag: {
              isVisible: false
            },
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.additionalDetails") + ":",
              isVisible: true,
              skin: "ICSknLbl424242SSPRegular15px"
            }
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.limitInstructions || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.otherInstructions || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: swiftTagEnabled
            },
            lblSwiftTag: {
              text: guaranteeSwiftTags.messageToBank || NA
            },
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
          },
          {
            flxSwiftTag: {
              isVisible: false
            },
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.payments.supportingDocumentsWithColon"),
              isVisible: true,
              skin: "ICSknLbl424242SSPRegular15px"
            }
          }
        );
        if (data.documentName) {
          const documentNames = this.isJSON(data.documentName) ? JSON.parse(data.documentName.replace(/'/g, '"')) : data.documentName.split(',');
          const documentReferences = this.isJSON(data.documentReferences) ? JSON.parse(data.documentReferences.replace(/'/g, '"')) : data.documentReferences.split(',');
          if (documentNames && documentNames.length > 0) {
            for (let i = 0; i < documentNames.length; i++) {
              bankInstructionAndDocumentDetails.push(
                {
                  flxSwiftTag: {
                    isVisible: swiftTagEnabled && i === 0
                  },
                  lblSwiftTag: {
                    text: NA
                  },
                  lblKey: {
                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedFilesWithColon"),
                    isVisible: i === 0
                  },
                  flxDocument: {
                    isVisible: true,
                    left: (i === 0 || !swiftTagEnabled) ? '0dp' : '40dp'
                  },
                  flxDownloadImage: {
                    cursorType: 'pointer',
                    onClick: this.downloadDocument.bind(this, documentReferences[i])
                  },
                  lblDocumentName: {
                    text: documentNames[i]
                  },
              flxMain: {
                isVisible: !!documentNames[i]
			  }
                }
              );
            }
          }
        }
        bankInstructionAndDocumentDetails.push(
          {
            flxMain: {
              isVisible: false
            },
            flxSeparator: {
              isVisible: true
            }
          }
        );
        let clauseConditionDetails = [];
        if (data.clauseConditions) {
          const clauseConditions = JSON.parse(data.clauseConditions.replace(/'/g, '"'));
          for (const { clauseDescription } of clauseConditions) {
            clauseConditionDetails.push(
              {
                lblDescription: {
                  text: clauseDescription,
                },
                template: 'flxClausesDescription'
              }
            );
          }
        } else {
          clauseConditionDetails.push(
            {
              lblDescription: {
                text: NA,
              },
              template: 'flxClausesDescription'
            }
          );
        }
        segData.push(
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.productDetails"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxGuaranteeDetailsHeader": {
                skin: data.guaranteesSRMSId ? "sknFlxf9f9f9" : "slFboxffffff"
              },
              "flxMain": {
                "left": "0%",
                "width": "100%"
              },
              "flxDropdown": {
                isVisible: data.guaranteesSRMSId ? true : false, 
                "right": "2.5%"
              }
            },
            productDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("kony.mb.transaction.transactionDetails"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxGuaranteeDetailsHeader": {
                skin: "sknFlxf9f9f9"
              },
              "flxMain": {
                "left": "0%",
                "width": "100%"
              },
              "flxDropdown": {
                "right": "2.5%"
              }
            },
            transactionDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiary&AdvisingBankDetails"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxGuaranteeDetailsHeader": {
                skin: "sknFlxf9f9f9"
              },
              "flxMain": {
                "left": "0%",
                "width": "100%"
              },
              "flxDropdown": {
                "right": "2.5%"
              }
            },
            beneficiaryAndAdvisingBankDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.bankInstructions&Documents"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxGuaranteeDetailsHeader": {
                skin: "sknFlxf9f9f9"
              },
              "flxMain": {
                "left": "0%",
                "width": "100%"
              },
              "flxDropdown": {
                "right": "2.5%"
              }
            },
            bankInstructionAndDocumentDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.clauses&Conditions"),
                left: "2.5%"
              },
              "lblDropdownIcon": {
                text: 'P'
              },
              "flxGuaranteeDetailsHeader": {
                skin: "sknFlxf9f9f9"
              },
              "flxMain": {
                "left": "0%",
                "width": "100%"
              },
              "flxDropdown": {
                "right": "2.5%"
              }
            },
            clauseConditionDetails
          ]
        );
        segData.forEach(section => {
          section[1].forEach(row => {
            if (!row.lblValue) row.lblValue = { isVisible: false };
            if (!row.btnAction) row.btnAction = { isVisible: false };
            if (!row.flxDocument) row.flxDocument = { isVisible: false };
            if (!row.flxAddress) row.flxAddress = { isVisible: false };
            if (!row.flxSeparator) row.flxSeparator = { isVisible: false };
          });
        });
        scope.view.segDetails.removeAll();
        scope.view.segDetails.setData(segData);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "setGuaranteeAndSBLCDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : toggleDropdown
     * Triggerd on click of dropdown in segment
     * @return : NA
     */
    toggleDropdown: function ({ sectionIndex, rowIndex }) {
      const scope = this;
      try {
        let newSegData = JSON.parse(JSON.stringify(scope.view.segDetails.data));
        if (newSegData[sectionIndex][0]['lblDropdownIcon']['text'] === 'O') {
          newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = 'P';
          newSegData[sectionIndex][1] = segData[sectionIndex][1];
        } else {
          newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = 'O';
          newSegData[sectionIndex][1] = [];
        }
        for (let i = 0; i < segData.length; i++) {
          if (newSegData[i][1].length > 0) {
            newSegData[i][1] = segData[i][1];
          }
        }
        segData[sectionIndex][0]['lblDropdownIcon']['text'] = newSegData[sectionIndex][0]['lblDropdownIcon']['text']
        this.view.segDetails.setData(newSegData);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "toggleDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    downloadDocument: function (docReference) {
      applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).retrieveDocument(docReference, kony.application.getCurrentForm().id);
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
    getOrdinalNumeral: function (n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },
    setReturnedHistoryData: function (returnedHistoryData) {
      const formatUtilManager = applicationManager.getFormatUtilManager();
      this.view.lblReturnedHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${returnedHistoryData.length - 1})`;
      this.view.segReturnedHistory.widgetDataMap = {
        "lblReturnBank": "lblReturnBank",
        "lblReturnDate": "lblReturnDate",
        "lblKey1": "lblKey1",
        "lblValue1": "lblValue1",
        "lblKey2": "lblKey2",
        "lblValue2": "lblValue2",
        "lblKey3": "lblKey3",
        "lblValue3": "lblValue3",
      };
      let segReturnedHistoryData = [];
      for (let i = returnedHistoryData.length - 2; i >= 0; i--) {
        const record = returnedHistoryData[i];
          segReturnedHistoryData.push({
            "lblReturnBank": {
              "text": `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank")} (${this.getOrdinalNumeral(i + 1)})`
            },
            "lblReturnDate": {
              "text": record.returnedTime ? `${formatUtilManager.getFormattedCalendarDate(record.returnedTime)}, ${new Date(record.returnedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` : NA
            },
            "lblKey1": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturnedWithColon")
            },
            "lblValue1": {
              "text": record.reasonForReturn || NA
            },
            "lblKey2": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.returnMessageToBankWithColon")
            },
            "lblValue2": {
              "text": record.returnMessageToBank || NA
            },
            "lblKey3": {
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.corporateUserNameWithColon")
            },
            "lblValue3": {
              "text": record.corporateUserName || NA
            },
            "template": "flxLGReturnedHistory"
          });
      }
      this.view.segReturnedHistory.setData(segReturnedHistoryData)
    },
    showReturnedHistory: function () {
      try {
        let form = kony.application.getCurrentForm();
        let popupObj = this.view.flxReturnedHistory.clone();
        form.add(popupObj);
        popupObj.isVisible = true;
        popupObj.height = "100%";
        popupObj.flxReturnedHistoryMain.flxReturnedHistoryHeader.lblCross.onTouchEnd = () => form.remove(popupObj);
        this.view.forceLayout();
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "showReturnedHistory",
          "error": err
        };
        this.onError(errorObj);
      }
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
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});