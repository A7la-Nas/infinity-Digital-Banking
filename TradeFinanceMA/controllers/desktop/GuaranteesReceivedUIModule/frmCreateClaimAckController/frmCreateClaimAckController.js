define(["FormControllerUtility"], function (FormControllerUtility) {
  const responsiveUtils = new ResponsiveUtils();
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
      this.initFormActions();
    },
    /**
     * @api : onBreakpointChange
     * This function for changing the UI depending upon breakpoint
     * @return : NA
     */
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "GuaranteesReceived");
      this.populateGuaranteeSummaryDetails();
      this.populateClaimDetails();
      if (this.presenter.reviseClaimData.isRevise) {
        this.view.lblClaimDetails.text = kony.i18n.getLocalizedString('i18n.TradeFinance.reviseTheClaim')
        this.view.lblDiscrepancy.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.ResponsetoDiscrepancies')} (1st)`;
        this.view.flxReviseDetails.setVisibility(true);
        this.populateClaimSummaryDetails();
        this.populateReturnedHistory();
        this.populateResponseToDiscrepancies();
      } else {
        this.view.flxReviseDetails.setVisibility(false);
        this.view.lblClaimDetails.text = kony.i18n.getLocalizedString('i18n.TradeFinance.claimDetails')
      }
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxGuaranteeDetailsPopup.setVisibility(false);
      this.view.GuaranteeReceivedDetails.setContext(this.presenter.guaranteeData);
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesReceivedUIModule'
      });
      data = this.presenter.reviseClaimData
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessClose.onClick = () => scope.view.flxSuccessMessage.setVisibility(false);
      this.view.btnAction1.onClick = () => {
        (data.isRevise) ? scope.presenter.updateGuaranteeClaim(scope.view.id) : scope.presenter.createGuaranteeClaim(scope.view.id);
      };
      this.view.btnAction2.onClick = () => scope.presenter.showGuaranteesReceivedScreen({
        context: 'viewAllInitiatedClaims'
      });
      this.view.btnAction3.onClick = () => scope.presenter.showGuaranteesReceivedScreen({
        context: 'viewAllReceivedGtAndSblc'
      });
      this.view.btnViewGuaranteeDetails.onClick = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(true);
      this.view.flxGuaranteeDetailsClose.onClick = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(false);
      this.view.lblCross.onTouchEnd = () => scope.view.flxReturnedHistory.setVisibility(false);
      this.view.lblViewHistory.onTouchEnd = () => scope.view.flxReturnedHistory.setVisibility(true);
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
        this.setClaimsId();
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    showServerError: function (errorMsg) {
      if (errorMsg) {
        this.view.flxFormContent.setContentOffset({
          x: "0%",
          y: "0%"
        }, true);
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.lblErrorMessage.text = errorMsg;
        this.view.btnAction1.setVisibility(true);
        this.view.btnAction2.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
        this.view.forceLayout();
      }
    },
    showSuccessMessage: function () {
      this.view.flxFormContent.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.btnAction1.setVisibility(false);
      this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF15Px";
      this.view.forceLayout();
    },
    populateGuaranteeSummaryDetails: function () {
      const formatUtilManager = applicationManager.getFormatUtilManager();
      const data = this.presenter.guaranteeData;
      this.view.lblValue1.text = data.applicantName || data.beneficiaryName || NA;
      this.view.lblValue2.text = data.guaranteeSrmsId || data.guaranteesSRMSId || NA;
      this.view.lblValue3.text = data.productType || NA;
      this.view.lblValue4.text = data.lcType || data.guaranteeAndSBLCType || NA;
      this.view.lblValue5.text = (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount)}` : NA;
      this.view.lblValue6.text = (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount - (data.utilizedAmount || 0))}` : NA;
      this.view.lblValue7.text = data.expectedIssueDate ? formatUtilManager.getFormattedCalendarDate(data.expectedIssueDate) : NA;
      this.view.lblValue8.text = data.expiryType || NA;
      this.view.lblValue9.text = data.expiryDate ? formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA;
      this.view.lblValue10.text = data.issuingBankName || NA;
      this.view.lblGuaranteeDetailsHeading.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.GuaranteeAndStandbyLC')} - ${data.guaranteeSrmsId || data.guaranteesSRMSId}`
    },
    populateClaimDetails: function () {
      const formatUtilManager = applicationManager.getFormatUtilManager();
      const data = this.presenter.claimData;
      this.view.segClaimDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [{
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon')
        },
        lblValue: {
          text: data.claimsSRMSId || NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.createdOnWithColon')
        },
        lblValue: {
          text: data.createdOn ? formatUtilManager.getFormattedCalendarDate(data.createdOn) : NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.wealth.amountColon')
        },
        lblValue: {
          text: `${data.claimCurrency} ${formatUtilManager.formatAmount(data.claimAmount)}`
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimCreditAccountWithColon')
        },
        lblValue: {
          text: data.claimCreditAccount
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitAccountWithColon')
        },
        lblValue: {
          text: data.chargesDebitAccount
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.demandTypeWithColon')
        },
        lblValue: {
          text: data.demandType
        }
      }];
      if (data.newExtensionDate) {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
          },
          lblValue: {
            text: data.newExtensionDate
          }
        });
      }
      const documents = JSON.parse(data.documentInformation.replace(/'/g, '"'));
      for (let i = 0; i < documents.length; i++) {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
            isVisible: i === 0
          },
          lblValue: {
            text: documents[i].documentName
          },
          flxMain: {
            top: i === 0 ? "20dp" : "10dp"
          }
        });
      }
      if (data.physicalDocuments) {
        const physicalDocuments = JSON.parse(data.physicalDocuments.replace(/'/g, '"'));
        for (let i = 0; i < physicalDocuments.length; i++) {
          segData.push({
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
          });
        }
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
          },
          lblValue: {
            text: data.forwardDocuments === 'Unselected' ? data.forwardDocuments : `${data.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
          }
        });
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
        },
        lblValue: {
          text: data.otherDemandDetails
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
        },
        lblValue: {
          text: data.messageToBank || NA
        }
      });
      this.view.segClaimDetails.setData(segData);
      this.view.forceLayout();
    },
    populateClaimSummaryDetails: function () {
      const data = this.presenter.reviseClaimData;
      const formatUtilManager = applicationManager.getFormatUtilManager();
      this.view.lblClaimValue1.skin = "sknLblSSP42424215pxBold";
      this.view.lblClaimValue1.text = kony.i18n.getLocalizedString('i18n.TradeFinance.SubmittedToBank');
      this.view.lblClaimValue2.text = data.claimsSRMSId || NA;
      this.view.lblClaimValue3.text = data.createdOn ? formatUtilManager.getFormattedCalendarDate(data.createdOn) : NA;
    },
    populateResponseToDiscrepancies: function () {
      const data = this.presenter.claimData;
      this.view.segResponseToDiscrepancies.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      const documents = data.returnedDocuments ? data.returnedDocuments.split(',') : [];
      let segData = [{
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
        },
        lblValue: {
          text: documents.length.toString()
        }
      }];
      for (let i = 0; i < documents.length; i++) {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
            isVisible: i === 0
          },
          lblValue: {
            text: documents[i]
          },
          flxMain: {
            top: i === 0 ? "20dp" : "10dp"
          }
        });
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
        },
        lblValue: {
          text: data.documentStatus || NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForReturnedWithColon')
        },
        lblValue: {
          text: data.reasonForReturn || NA
        }
      });
      let discrepancies = JSON.parse(data.discrepancies.replace(/'/g, '"'));
      discrepanciesLength = (discrepancies[discrepancies.length - 1].reasonForReturn) ? discrepancies.length - 1 : discrepancies.length;
      for (let i = 0; i < discrepanciesLength; i++) {
        segData.push({
          lblKey: {
            text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i+1}:`
          },
          lblValue: {
            text: discrepancies[i].discrepancy || NA,
            skin: "sknLblSSP42424215pxBold"
          }
        })
        if (discrepancies[i].userResponse) {
          segData.push({
            lblKey: {
              text: `D${i+1} ${kony.i18n.getLocalizedString('i18n.TradeFinance.UserResponse')}:`
            },
            lblValue: {
              text: discrepancies[i].userResponse || NA
            }
          })
        };
        if (discrepancies[i].userComment) {
          segData.push({
            lblKey: {
              text: `D${i+1} ${kony.i18n.getLocalizedString('i18n.TradeFinance.UserComment')}:`
            },
            lblValue: {
              text: discrepancies[i].userComment || NA
            }
          })
        }
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.returnMessageToBankWithColon')
        },
        lblValue: {
          text: data.returnMessageToBank || NA
        }
      });
      this.view.segResponseToDiscrepancies.setData(segData);
      this.view.forceLayout();
    },
    getOrdinalNumeral: function (n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },
    populateReturnedHistory: function () {
      data = this.presenter.reviseClaimData;
      if (!data.returnedHistory) {
        this.view.lblViewHistory.setVisibility(false);
        this.view.lblDiscrepancyIcon.setVisibility(true);
        return
    };
      const formatUtilManager = applicationManager.getFormatUtilManager();
      let history = JSON.parse(data.returnedHistory.replace(/'/g, '"')).reverse();
      this.view.lblReturnedHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${history.length})`;
      this.view.lblViewHistory.setVisibility(true);
      this.view.lblDiscrepancyIcon.setVisibility(false);
      this.view.lblViewHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.viewHistory")} (${history.length})`;
      this.view.lblDiscrepancy.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies")} (${this.getOrdinalNumeral(history.length + 1)})` 
      this.view.lblReturnedHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${history.length})`;
      this.view.segReturnedHistory.widgetDataMap = {
        "flxHeader": "flxHeader",
        "lblReturnBank": "lblReturnBank",
        "lblReturnDate": "lblReturnDate",
        "flxSeparator1": "flxSeparator1",
        "flxSeparator2": "flxSeparator2",
        "lblKey1": "lblKey1",
        "lblValue1": "lblValue1",
        "lblKey2": "lblKey2",
        "lblValue2": "lblValue2",
        "lblKey3": "lblKey3",
        "lblValue3": "lblValue3",
      };
      let segReturnedHistoryData = [], i = 0;
      for (const record of history) {
        let historyObj = record.discrepancies.pop()
        segReturnedHistoryData.push({
          "flxHeader": {
            "skin": "sknflxbgf7f7f7op100Bordere3e3e3radius2pxTopBottom",
            "top": i === 0 ? "0dp" : "20dp",
            "width": "100%",
            "left": "0dp"
          },
          "flxSeparator1": {
            "isVisible": false
          },
          "flxSeparator2": {
            "isVisible": false
          },
          "lblReturnBank": {
            "text": `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank")} (${this.getOrdinalNumeral(history.length - i)})`,
            "left": "2.5%"
          },
          "lblReturnDate": {
            "text": record.returnedTime ? `${formatUtilManager.getFormattedCalendarDate(record.returnedTime)}, ${new Date(record.returnedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` : NA
          },
          "lblKey1": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturnedWithColon")
          },
          "lblValue1": {
            "text": historyObj.reasonForReturn || NA
          },
          "lblKey2": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.returnMessageToBankWithColon")
          },
          "lblValue2": {
            "text": historyObj.returnMessageToBank || NA
          },
          "lblKey3": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.corporateUserNameWithColon")
          },
          "lblValue3": {
            "text": historyObj.corporateUserName || NA
          },
          "template": "flxLGReturnedHistory"
        });
        i++
      }
      this.view.segReturnedHistory.setData(segReturnedHistoryData)
    },
    toggleSectionHeader: function (params) {
      this.view.GuaranteeReceivedDetails.toggleSectionHeader(params);
    },
    setClaimsId: function () {
      const data = this.presenter.claimData;
      let segData = this.view.segClaimDetails.data;
      segData[0].lblValue.text = data.claimsSRMSId;
      segData[1].lblValue.text = applicationManager.getFormatUtilManager().getFormattedCalendarDate(data.createdOn);
      this.view.segClaimDetails.setDataAt(segData[0], 0);
      this.view.segClaimDetails.setDataAt(segData[1], 1);
      this.view.flxFormContent.forceLayout();
    }
  };
});