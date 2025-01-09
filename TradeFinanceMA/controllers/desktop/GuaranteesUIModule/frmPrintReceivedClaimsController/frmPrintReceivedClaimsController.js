define(["OLBConstants"], function (OLBConstants) {
  let guaranteeData = {};
  let claimData = {};
  let segData = [];
  let formatUtilManager = applicationManager.getFormatUtilManager();
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesUIModule'
      });
    },
    preShow: function () {
      guaranteeData = JSON.parse(JSON.stringify(this.presenter.guaranteeData));
      claimData = JSON.parse(JSON.stringify(this.presenter.receivedClaimData));
    },
    postShow: function () {
      const scope = this;
      this.view.segDetails.widgetDataMap = {
        "lblHeader": "lblHeader",
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "rtxValue": "rtxValue"
      };
      this.constructPrintData();
      this.view.segDetails.setData(segData);
      this.view.forceLayout();
      kony.os.print();
      setTimeout(function () {
        const prevForm = kony.application.getPreviousForm().id;
        if (prevForm === 'frmViewReceivedClaim') {
          scope.presenter.showView({
            form: 'frmViewReceivedClaim'
          });
        } else {
          scope.presenter.showGuaranteesScreen({
            context: 'viewAllReceivedClaims'
          });
        }
      }, "17ms");
    },
    constructPrintData: function () {
      segData = [];
      let guaranteeDetails = [{
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.beneficiaryName || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionRefWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.guaranteesSRMSId || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.productType || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.guaranteeAndSBLCType || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.wealth.amountColon"),
          isVisible: true
        },
        lblValue: {
          text: (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount)}` : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.issueDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.issueDate) : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryTypeWithColon"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.expiryType || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
          isVisible: true
        },
        lblValue: {
          text: guaranteeData.expiryDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.expiryDate) : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingBankWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.advisingBank || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      }];
      let claimDetails = [{
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimStatusWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.claimStatus || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimRefNoWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.claimsSRMSId || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimTypeWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.claimType || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimAmountWithColon"),
          isVisible: true
        },
        lblValue: {
          text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.receivedOnWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.receivedOn ? formatUtilManager.getFormattedCalendarDate(claimData.receivedOn) : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.expectedSettlementDateWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.expectedSettlementDate ? formatUtilManager.getFormattedCalendarDate(claimData.expectedSettlementDate) : NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        }
      }];
      if (claimData.claimType == "Demand") {
        claimDetails.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.demandTypeWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.demandType || NA,
            isVisible: true
          },
          rtxValue: {
            isVisible: false
          }
        });
        if (claimData.demandType === 'Pay/Extend') {
          claimDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
            },
            lblValue: {
              text: claimData.newExtensionDate ? formatUtilManager.getFormattedCalendarDate(claimData.newExtensionDate) : NA
            }
          });
        }
        if (claimData.documents) {
          const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
          for (let i = 0; i < documents.length; i++) {
            claimDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMappping: {
                top: i === 0 ? "20dp" : "10dp"
              }
            });
          }
        }
        claimDetails.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
          },
          lblValue: {
            text: claimData.otherDemandDetails || NA
          }
        });
      } else {
        claimDetails.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.presentationDetailsWithColon')
          },
          lblValue: {
            text: claimData.presentationDetails || NA
          }
        });
      }
      claimDetails.push({
        lblKey: {
          text: kony.i18n.getLocalizedString("i18n.TradeFinance.messageFromBankWithColon"),
          isVisible: true
        },
        lblValue: {
          text: claimData.messageFromBank || NA,
          isVisible: true
        },
        rtxValue: {
          isVisible: false
        },
      });
      segData.push(
        [
          {
            lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.GuaranteeAndStandbyLCSummary")
          },
          guaranteeDetails
        ],
        [
          {
            lblHeader: kony.i18n.getLocalizedString("i18n.TradeFinance.claimDetails")
          },
          claimDetails
        ]
      );
      if ([OLBConstants.CLAIMS_RECEIVED_STATUS.NEW, OLBConstants.CLAIMS_RECEIVED_STATUS.RETURNED_BY_BANK, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT].every(s => { return s.toLowerCase() !== claimData.claimStatus.toLowerCase(); })) {
        let paymentInstructionDetails = [];
        if (claimData.claimType === "Presentation") {
          const documents = claimData.documents ? JSON.parse(claimData.documents.replace(/'/g, '"')) : [];
          paymentInstructionDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.totalDocumentsWithColon"),
            },
            lblValue: {
              text: documents.length.toString() || NA,
              isVisible: true
            },
            rtxValue: {
              isVisible: false
            }
          });
          for (let i = 0; i < documents.length; i++) {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMappping: {
                top: i === 0 ? "20dp" : "10dp"
              }
            });
          }
          paymentInstructionDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.documentStatusWithColon"),
              isVisible: true
            },
            lblValue: {
              text: claimData.documentStatus || NA,
              isVisible: true
            }
          });
          if (claimData.documentStatus === "Discrepant") {
            let discrepancies = JSON.parse(claimData.discrepancyDetails.replace(/'/g, '"')), i = 0;
            for (const discrepancy of discrepancies) {
              i++;
              paymentInstructionDetails.push({
                lblKey: {
                  text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i}:`
                },
                lblValue: {
                  text: discrepancy || NA,
                }
              });
            }
          }
          if (claimData.discrepancyAcceptance) {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
              },
              lblValue: {
                text: claimData.discrepancyAcceptance || NA,
                isVisible: true
              }
            });
          }
          if (claimData.discrepancyAcceptance === 'Rejected') {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA,
                isVisible: true
              }
            });
          } else {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccount ? this.presenter.getAccountDisplayName(claimData.debitAccount) : NA,
                isVisible: true
              }
            }, {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA
              }
            });
          }
        } else {
          paymentInstructionDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
            },
            lblValue: {
              text: claimData.claimAcceptance,
              isVisible: true
            }
          });
          if (claimData.claimAcceptance === 'Accepted to Pay') {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccount ? this.presenter.getAccountDisplayName(claimData.debitAccount) : NA,
                isVisible: true
              }
            }, {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA,
                isVisible: true
              }
            });
          } else if (claimData.claimAcceptance === 'Accepted to Extend') {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
              },
              lblValue: {
                text: claimData.newExtensionDate ? this.presenter.getAccountDisplayName(claimData.newExtensionDate) : NA
              }
            });
          } else if (claimData.claimAcceptance === 'Rejected') {
            paymentInstructionDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            });
          }
        }
        paymentInstructionDetails.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
          },
          lblValue: {
            text: claimData.messageToBank || NA
          }
        });
        segData.push(
          [
            {
              lblHeader: kony.i18n.getLocalizedString(claimData.claimType === "Presentation" ? "i18n.TradeFinance.presentationDetails" : "i18n.TradeFinance.demandDetails")
            },
            paymentInstructionDetails
          ]
        );
      }
      if ([OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT.toLowerCase(), OLBConstants.CLAIMS_RECEIVED_STATUS.REJECTED.toLowerCase(), OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED.toLowerCase(), OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_APPLICANT_REJECTED.toLowerCase()].some(s => { return s.toLowerCase() === claimData.claimStatus.toLowerCase(); })) {
        let paymentDetails = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.paymentStatusWithColon')
            },
            lblValue: {
              text: claimData.paymentStatus || NA
            }
          }
        ];
        if (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.REJECTED.toLowerCase()) {
          paymentDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.rejectedDateWithColon')
            },
            lblValue: {
              text: claimData.rejectedDate ? formatUtilManager.getFormattedCalendarDate(claimData.rejectedDate) : NA
            }
          }, {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
            },
            lblValue: {
              text: claimData.reasonForRejection || NA
            }
          });
        } else {
          paymentDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.settledDateWithColon')
            },
            lblValue: {
              text: claimData.settledDate ? formatUtilManager.getFormattedCalendarDate(claimData.settledDate) : NA
            }
          }, {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalAmountToBePaidWithColon')
            },
            lblValue: {
              text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
            }
          });
        }
        if (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED.toLowerCase()) {
          paymentDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimDebitAccountWithColon')
            },
            lblValue: {
              text: claimData.debitAccount ? this.presenter.getAccountDisplayName(claimData.debitAccount) : NA
            }
          });
        }
        segData.push(
          [
            {
              lblHeader: kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails")
            },
            paymentDetails
          ]
        );
      }
    },
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: NA
     * @return : NA
     */
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      kony.ui.Alert(errMsg);
    },
  }
});