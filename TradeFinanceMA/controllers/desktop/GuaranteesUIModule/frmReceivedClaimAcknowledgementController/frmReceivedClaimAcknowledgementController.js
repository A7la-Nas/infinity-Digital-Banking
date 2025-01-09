define(["FormControllerUtility"], function (FormControllerUtility) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let guaranteeData = {}, claimData = {}, contentScope, contentPopupScope, formatUtilManager;
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    onBreakpointChange: function (form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      guaranteeData = JSON.parse(JSON.stringify(this.presenter.guaranteeData));
      claimData = JSON.parse(JSON.stringify(this.presenter.receivedClaimData));
      contentPopupScope.setVisibility(false);
      this.populateGtAndSblcDetails();
      this.populateClaimDetails();
      this.populatePaymentInstructions();
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      contentPopupScope.flxGtAndSblcDetails.GuaranteeDetails.setContext({ data: guaranteeData, showSwiftTags: false });
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      formatUtilManager = applicationManager.getFormatUtilManager();
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentPopupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.btnViewGtAndSblcDetails.onClick = () => {
        contentPopupScope.setVisibility(true);
        contentPopupScope.flxGtAndSblcDetailsPopup.setVisibility(true);
      };
      contentPopupScope.flxGtAndSblcDetailsClose.onClick = () => {
        contentPopupScope.setVisibility(false);
        contentPopupScope.flxGtAndSblcDetailsPopup.setVisibility(false);
      };
      contentScope.btnAction1.onClick = () => scope.presenter.updateReceivedClaim(scope.view.id);
      contentScope.btnAction2.onClick = () => scope.presenter.showGuaranteesScreen({ context: 'viewAllReceivedClaims' });
      contentScope.btnAction3.onClick = () => scope.presenter.showGuaranteesScreen({ context: 'viewGuarantees' });
    },
    /**
     * Entry point method for the form controller
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.claimsSRMSId) {
        this.showSuccessMessage();
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    populateGtAndSblcDetails: function () {
      contentScope.lblValue1.text = guaranteeData.beneficiaryName || NA;
      contentScope.lblValue2.text = guaranteeData.guaranteesSRMSId || NA;
      contentScope.lblValue3.text = guaranteeData.productType || NA;
      contentScope.lblValue4.text = guaranteeData.guaranteeAndSBLCType || NA;
      contentScope.lblValue5.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount)}` : NA;
      contentScope.lblValue6.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount - (guaranteeData.utilizedAmount || 0))}` : NA;
      contentScope.lblValue7.text = guaranteeData.issueDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.issueDate) : NA;
      contentScope.lblValue8.text = guaranteeData.expiryType || NA;
      contentScope.lblValue9.text = guaranteeData.expiryDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.expiryDate) : NA;
      contentScope.lblValue10.text = claimData.advisingBank || NA;
      contentPopupScope.lblGtAndSblcDetailsHeading.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.GuaranteeAndStandbyLC')} - ${guaranteeData.guaranteesSRMSId}`;
    },
    populateClaimDetails: function () {
      contentScope.segClaimDetails.widgetDataMap = {
        "imgCountdown": "imgCountdown",
        "lblCountdown": "lblCountdown",
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxCountdown": "flxCountdown",
        "flxMain": "flxMain"
      };
      const countdown = this.presenter.getCountdownValues(claimData.receivedOn, claimData.expectedSettlementDate);
      let segData = [
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimStatusWithColon')
          },
          lblValue: {
            text: claimData.claimStatus || NA,
            skin: "sknLblSSP42424215pxBold"
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon')
          },
          lblValue: {
            text: claimData.claimsSRMSId || NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimTypeWithColon')
          },
          lblValue: {
            text: claimData.claimType || NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.wealth.amountColon')
          },
          lblValue: {
            text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.receivedOnWithColon')
          },
          lblValue: {
            text: claimData.receivedOn ? formatUtilManager.getFormattedCalendarDate(claimData.receivedOn) : NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.expectedSettlementDateWithColon')
          },
          lblValue: {
            text: claimData.expectedSettlementDate ? formatUtilManager.getFormattedCalendarDate(claimData.expectedSettlementDate) : NA
          },
          flxCountdown: {
            isVisible: !!countdown,
            left: "100dp"
          },
          imgCountdown: {
            src: countdown ? countdown.imgCountdown : ''
          },
          lblCountdown: {
            text: countdown ? countdown.lblCountdown : ''
          }
        }
      ];
      if (claimData.claimType === 'Demand') {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.demandTypeWithColon')
            },
            lblValue: {
              text: claimData.demandType
            }
          }
        );
        if (claimData.demandType === 'Pay/Extend') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
              },
              lblValue: {
                text: claimData.newExtensionDate ? formatUtilManager.getFormattedCalendarDate(claimData.newExtensionDate) : NA
              }
            }
          );
        }
        const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
        for (let i = 0; i < documents.length; i++) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            }
          );
        }
        if (claimData.physicalDocuments) {
          const physicalDocuments = JSON.parse(claimData.physicalDocuments.replace(/'/g, '"'));
          for (let i = 0; i < physicalDocuments.length; i++) {
            segData.push(
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon'),
                  isVisible: i === 0
                },
                lblValue: {
                  text: `${physicalDocuments[i].documentTitle} (${physicalDocuments[i].originalsCount} ${physicalDocuments[i].originalsCount === 'Will not submit' ? '' : 'Originals'}, ${physicalDocuments[i].copiesCount} ${physicalDocuments[i].copiesCount === 'Will not submit' ? '' : 'Copies'})`
                },
                flxMain: {
                  top: i === 0 ? "20dp" : "10dp"
                }
              }
            );
          }
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
              },
              lblValue: {
                text: claimData.forwardDocuments === 'Unselected' ? claimData.forwardDocuments : `${claimData.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
              }
            }
          );
        }
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
            },
            lblValue: {
              text: claimData.otherDemandDetails
            }
          }
        );
      } else {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.presentationDetailsWithColon')
            },
            lblValue: {
              text: claimData.presentationDetails || NA
            }
          }
        );
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageFromBankWithColon')
          },
          lblValue: {
            text: claimData.messageFromBank || NA
          }
        }
      );
      contentScope.segClaimDetails.setData(segData);
    },
    populatePaymentInstructions: function () {
      contentScope.lblPaymentInstructionsHeading.text = kony.i18n.getLocalizedString(claimData.claimType === 'Demand' ? 'i18n.TradeFinance.demandDetails' : 'i18n.TradeFinance.presentationDetails');
      contentScope.segPaymentInstructions.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [];
      if (claimData.claimType === 'Presentation') {
        const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
            },
            lblValue: {
              text: documents.length.toString()
            }
          }
        );
        for (let i = 0; i < documents.length; i++) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            }
          );
        }
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
            },
            lblValue: {
              text: claimData.documentStatus || NA,
              skin: "sknLblSSP42424215pxBold"
            }
          }
        );
        if (claimData.discrepancyDetails) {
          const discrepancies = JSON.parse(claimData.discrepancyDetails.replace(/'/g, '"'));
          for (let i = 0; i < discrepancies.length; i++) {
            segData.push({
              lblKey: {
                text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i + 1}:`
              },
              lblValue: {
                text: discrepancies[i] || NA
              }
            });
          }
        }
        if (claimData.discrepancyAcceptance) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
              },
              lblValue: {
                text: claimData.discrepancyAcceptance,
                skin: "sknLblSSP42424215pxBold"
              }
            }
          );
        }
        if (claimData.discrepancyAcceptance === 'Rejected') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            }
          );
        } else {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccountFormatted || NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA
              }
            }
          );
        }
      } else {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
            },
            lblValue: {
              text: claimData.claimAcceptance,
              skin: "sknLblSSP42424215pxBold"
            }
          }
        );
        if (claimData.claimAcceptance === 'Accepted to Pay') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccountFormatted || NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA
              }
            }
          );
        } else if (claimData.claimAcceptance === 'Accepted to Extend') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
              },
              lblValue: {
                text: claimData.newExtensionDate || NA
              }
            }
          );
        } else if (claimData.claimAcceptance === 'Rejected') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            }
          );
        }
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
          },
          lblValue: {
            text: claimData.messageToBank || NA
          }
        }
      );
      contentScope.segPaymentInstructions.setData(segData);
    },
    showSuccessMessage: function () {
      contentScope.btnAction1.setVisibility(false);
      contentScope.btnAction2.skin = "sknBtnNormalSSPFFFFFF15Px";
      this.view.formTemplate12.showBannerError({i18n: kony.i18n.getLocalizedString('i18n.TradeFinance.yourClaimHasBeenSubmittedSuccessfully')});
    },
    showServerError: function (errorMsg) {
      contentScope.btnAction1.setVisibility(true);
      contentScope.btnAction2.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
      this.view.formTemplate12.showBannerError({dbpErrMsg: errorMsg});
    },
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  }
});