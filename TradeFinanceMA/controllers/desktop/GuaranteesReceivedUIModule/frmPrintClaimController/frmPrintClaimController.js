define(['CommonUtilities'], function (CommonUtilities) {
  let data, formatUtilManager;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesReceivedUIModule'
      });
      formatUtilManager = applicationManager.getFormatUtilManager();
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      guaranteeData = this.presenter.guaranteeData;
      claimData = this.presenter.claimData;
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      const scope = this;
      this.setGuaranteeDetails();
      this.setClaimDetails();
      this.setDocumentDetails();
      this.setPaymentDetails();
      this.setPaymentAdviceDetails();
      this.view.forceLayout();
      kony.os.print();
      setTimeout(function() {
        const prevForm = kony.application.getPreviousForm().id;
        if (prevForm === 'frmViewClaimDetails') {
            scope.presenter.showView({
                form: 'frmViewClaimDetails'
            });
        } else {
            scope.presenter.showGuaranteesReceivedScreen({
                context: 'viewAllInitiatedClaims'
            });
        }
    }, "17ms");
    },
    /**
     * Method to set GT & SBLC Summary Details
     */
     setGuaranteeDetails: function () {
      try {
        this.view.SegGuaranteeDetails.widgetDataMap = {
          "flxMappping": "flxMappping",
          "lblKey": "lblKey",
          "lblValue": "lblValue"
        };
        data = guaranteeData;
        let segData = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.applicantName || NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber") + ":",
            isVisible: true
          },
          lblValue: {
            text: data.guaranteeSrmsId || NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.productType || NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.lcType || NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.wealth.amountColon"),
            isVisible: true
          },
          lblValue: {
            text: (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount)}` : NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.expectedIssueDate ? formatUtilManager.getFormattedCalendarDate(data.expectedIssueDate) : NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryTypeWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.expiryType || NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
            isVisible: true
          },
          lblValue: {
            text: data.expiryDate ? formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA,
            isVisible: true
          },
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuingBankWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.issuingBankName || NA,
            isVisible: true
          }
        }];
        this.view.SegGuaranteeDetails.setData(segData);
      } catch (err) {
        const errorObj = {
          "level": "FormController",
          "method": "setGuaranteeDetails",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to set Claim Details
     */
    setClaimDetails: function () {
      try {
        this.view.segClaimDetails.widgetDataMap = {
          "flxMappping": "flxMappping",
          "lblKey": "lblKey",
          "lblValue": "lblValue"
        };
        let data = claimData;
        let segClaimData = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimStatusWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.status || NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimRefNoWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.claimsSRMSId || NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimCreatedDateWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.createdOn ? formatUtilManager.getFormattedCalendarDate(data.createdOn) : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.wealth.amountColon"),
            isVisible: true
          },
          lblValue: {
            text: (data.claimCurrency && data.claimAmount) ? `${data.claimCurrency} ${formatUtilManager.formatAmount(data.claimAmount)}` : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimCreditAccountWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.claimCreditAccount ? this.getAccountDisplayName(data.claimCreditAccount) : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.chargesDebitAccountWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.chargesDebitAccount ? this.getAccountDisplayName(data.chargesDebitAccount) : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.demandTypeWithColon"),
            isVisible: true
          },
          lblValue: {
            text: data.demandType || NA,
            isVisible: true
          }
        }];
        if (data.demandType === 'Pay/Extend') {
          segClaimData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
            },
            lblValue: {
              text: data.newExtensionDate || NA
            }
          });
        }
        if (data.documentInformation) {
          const documents = JSON.parse(data.documentInformation.replace(/'/g, '"'));
          for (let i = 0; i < documents.length; i++) {
            segClaimData.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName,
                left: i===0 ? '2%' : '47%'
              },
              flxMappping: {
                height: i === documents.length - 1 ? "35dp" : "25dp"
              }
            });
          }
        } else {
          segClaimData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
              isVisible: true
            },
            lblValue: {
              text: NA,
              isVisible: true
            }
          });
        }
        if (data.productType === 'Standby LC') {
          if (data.physicalDocuments) {
            const physicalDocuments = JSON.parse(data.physicalDocuments.replace(/'/g, '"'));
            for (let i = 0; i < physicalDocuments.length; i++) {
              segClaimData.push({
                lblKey: {
                  text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon'),
                  isVisible: i === 0
                },
                lblValue: {
                  text: `${physicalDocuments[i].documentTitle} (${physicalDocuments[i].originalsCount} ${physicalDocuments[i].originalsCount === 'Will not submit' ? '' : 'Originals'}, ${physicalDocuments[i].copiesCount} ${physicalDocuments[i].copiesCount === 'Will not submit' ? '' : 'Copies'})`,
                  left: i===0 ? '2%' : '47%'
                },
                flxMappping: {
                  height: i === physicalDocuments.length - 1 ? "35dp" : "25dp"
                }
              });
            }
          } else {
            segClaimData.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon')
              },
              lblValue: {
                text: NA
              }
            });
          }
          segClaimData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
            },
            lblValue: {
              text: data.forwardDocuments === 'Unselected' ? data.forwardDocuments : `${data.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
            },
            flxMappping: {
              height: '55dp'
          }
          });
        }
        segClaimData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
          },
          lblValue: {
            text: data.otherDemandDetails || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
          },
          lblValue: {
            text: data.messageToBank || NA
          }
        });
        this.view.segClaimDetails.setData(segClaimData)
      } catch (err) {
        const errorObj = {
          "level": "FormController",
          "method": "setClaimDetails",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to set Document/Discrepancies details
     */
    setDocumentDetails: function () {
      try {
        if (this.presenter.isEmptyNullOrUndefined(claimData.returnedDocuments)) {
          this.view.flxDocumentsStatusContainer.setVisibility(false);
          return;
        }
        this.view.lblDocumentsStatusTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Document&Status")
        this.view.flxDocumentsStatusContainer.setVisibility(true);
        this.view.segDocuments.widgetDataMap = {
          "flxMappping": "flxMappping",
          "lblKey": "lblKey",
          "lblValue": "lblValue"
        };
        const documents = claimData.returnedDocuments.split(',');
        let segDocumentData = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.totalDocuments/DiscrepanciesWithColon"),
              isVisible: true
            },
            lblValue: {
              text: documents.length.toString(),
              isVisible: true
            }
          }
        ];
        for (let i = 0; i < documents.length; i++) {
          segDocumentData.push({
            lblKey: {
              text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.documentsWithColon") : '',
            },
            lblValue: {
              text: documents[i],
              left: i===0 ? '2%' : '47%'
            },
            flxMappping: {
              height: i === documents.length - 1 ? "35dp" : "25dp"
            }
          });
        }
        segDocumentData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.documentStatusWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.documentStatus || NA,
            isVisible: true
          }
        });
        segDocumentData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.messageFromBankWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.messageFromBank || NA,
            isVisible: true
          }
        });
        this.view.segDocuments.setData(segDocumentData);
      } catch (err) {
        const errorObj = {
          "level": "FormController",
          "method": "setDocumentDetails",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to set Payment Details
     */
    setPaymentDetails: function () {
      try {
        let data = claimData;
        if (this.presenter.isEmptyNullOrUndefined(data.paymentStatus)) {
          this.view.flxPaymentDetails.setVisibility(false);
          return;
        }
        this.view.flxPaymentDetails.setVisibility(true);
        this.view.segPaymentDetails.widgetDataMap = {
          "flxMappping": "flxMappping",
          "lblKey": "lblKey",
          "lblValue": "lblValue"
        };
        let segPaymentData = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.paymentStatusWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.paymentStatus || NA,
              isVisible: true
            }
          }
        ];
        if (data.paymentStatus == "Rejected") {
          segPaymentData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.rejectedDateWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.paymentSettledDate ? formatUtilManager.getFormattedCalendarDate(data.paymentSettledDate) : NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForRejectionWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.reasonForReturn || NA,
                isVisible: true
              }
            }
          );
        } else {
          if (data.paymentStatus == "Done") {
            segPaymentData.push(
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.paymentDateWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: data.paymentSettledDate ? formatUtilManager.getFormattedCalendarDate(data.paymentSettledDate) : NA,
                  isVisible: true
                }
              }
            );
          }
          segPaymentData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.totalAmountToBePaidWithColon"),
                isVisible: true
              },
              lblValue: {
                text: (data.claimCurrency && data.claimAmount) ? `${data.claimCurrency} ${formatUtilManager.formatAmount(data.claimAmount)}` : NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimCreditAccountWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.claimCreditAccount ? this.getAccountDisplayName(data.claimCreditAccount) : NA,
                isVisible: true
              }
            }
          );
        }
        this.view.segPaymentDetails.setData(segPaymentData);
      } catch (err) {
        const errorObj = {
          "level": "FormController",
          "method": "setPaymentDetails",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to set Payment Advice Details
     */
    setPaymentAdviceDetails: function () {
      try {
        let data = claimData;
        if (this.presenter.isEmptyNullOrUndefined(data.PaymentAdvices)) {
          this.view.flxPaymentAdvices.setVisibility(false);
          return;
        }
        this.view.flxPaymentAdvices.setVisibility(true);
        this.view.segAmendmentAdviceList.widgetDataMap = {
          lblAdviceName: "lblAdviceName",
          lblAdviceDate: "lblAdviceDate",
          lblAdviceParty: "lblAdviceParty",
          lblAdviceMessage: "lblAdviceMessage"
        };
        let segPaymentAdvicesData = [];
        for (const advice of data.PaymentAdvices) {
          segPaymentAdvicesData.push({
            lblAdviceName: advice.adviceName || NA,
            lblAdviceDate: advice.paymentDate ? formatUtilManager.getFormattedCalendarDate(advice.paymentDate) : NA,
            lblAdviceParty: advice.advisingBank || NA,
            lblAdviceMessage: advice.message || NA
          });
        }
        this.view.segAmendmentAdviceList.setData(segPaymentAdvicesData);
      } catch (err) {
        const errorObj = {
          "level": "FormController",
          "method": "setPaymentAdviceDetails",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    getAccountDisplayName: function (accId) {
      const accounts = applicationManager.getAccountManager().getInternalAccounts() || [];
      for (const account of accounts) {
        if (account.accountID === accId) return CommonUtilities.getAccountDisplayName(account);
      }
      return accId;
    },
    /**
     * Error thrown from catch block of form controller
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});