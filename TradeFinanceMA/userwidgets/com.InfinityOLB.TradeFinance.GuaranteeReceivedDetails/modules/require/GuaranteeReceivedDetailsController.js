define([], function () {
  let segGuaranteeReceivedData = [];
  let segRejectionHistoryData = [];
  let data;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * Sets the context 
     */
    setContext: function (context) {
      try {
        data = context;
        this.setReceivedGTAndSBLCDetails();
      } catch (err) {
        const errorObj = {
          level: "ComponentController",
          method: "setContext",
          error: err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Sets the Received Guarantee/Standby LC data
     */
    setReceivedGTAndSBLCDetails: function () {
      const scope = this;
      segGuaranteeReceivedData = [];
      const formatUtilManager = applicationManager.getFormatUtilManager();
      let presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesReceivedUIModule'
      });
      try {
        this.view.segDetails.widgetDataMap = {
          "lblHeading": "lblHeading",
          "lblDropdownIcon": "lblDropdownIcon",
          "flxDropdown": "flxDropdown",
          "flxMain": "flxMain",
          "lblKey": "lblKey",
          "lblValue": "lblValue",
          "flxDocument": "flxDocument",
          "flxDownloadImage": "flxDownloadImage",
          "lblDocumentName": "lblDocumentName",
          "flxAddress": "flxAddress",
          "lblAddress1": "lblAddress1",
          "lblAddress2": "lblAddress2",
          "lblAddress3": "lblAddress3",
          "btnAction": "btnAction"
        };
        let issuanceSummaryDetails = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionReferenceWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.guaranteeSrmsId || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.receivedOnWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.receivedOn ? formatUtilManager.getFormattedCalendarDate(data.receivedOn) : NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.requestStatusWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.status || NA,
              isVisible: true
            }
          }
        ];
        if (this.isEmptyNullOrUndefined(data.selfRejectionHistory)) {
          issuanceSummaryDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.currentSelfAcceptanceWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.selfAcceptance || NA,
                isVisible: true
              }
            }
          );
        } else {
          const rejectionHistory = JSON.parse(data.selfRejectionHistory.replace(/'/g, '"'));
          this.setRejectionHistoryData(rejectionHistory);
          const lastRejection = rejectionHistory.slice(-1)[0];
          issuanceSummaryDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.currentSelfAcceptanceWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.selfAcceptance || NA,
                isVisible: true
              },
              btnAction: {
                text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.viewHistory")} (${rejectionHistory.length})`,
                left: '100dp',
                isVisible: true,
                onClick: this.showRejectionHistory
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.lastDateOfAcceptanceWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.selfAcceptanceDate ? formatUtilManager.getFormattedCalendarDate(data.selfAcceptanceDate) : NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.lastReasonForRejectionWithColon"),
                isVisible: true
              },
              lblValue: {
                text: lastRejection.reasonForSelfRejection || NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.lastMessageToBankWithColon"),
                isVisible: true
              },
              lblValue: {
                text: lastRejection.messageToBank || NA,
                isVisible: true
              }
            }
          );
        }

        let productDetails = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.productTypeWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.productType || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.lcType || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.relatedTransactionReferenceOptionalWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.relatedTransactionReference || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.transactionModeWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.modeOfTransaction || NA,
              isVisible: true
            }
          }
        ];
        if (data.modeOfTransaction === 'Swift') {
          productDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicantPartyWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.applicantParty || NA,
                isVisible: true
              }
            }
          );
        }

        if (data.beneficiaryDetails) {
          const abn = JSON.parse(data.beneficiaryDetails.replace(/'/g, '"'));
          for (let i = 0; i < abn.length; i++) {
            let beneficiaryName = abn[i].beneficiaryName + "-" + abn[i].payeeId;
            productDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryWithColon"),
                isVisible: i === 0 ? true : false

              },

              lblValue: {
                text: beneficiaryName || NA,
                isVisible: true
              }
            });
          }
        }
        let releaseLiabilityDetails = [];
        if(data.liabilityDetails) {
          const ld = JSON.parse(data.liabilityDetails.replace(/'/g, '"'));
          for(i = 0 ; i < ld.length; i++) {
                releaseLiabilityDetails.push(
                  {
                    lblKey: {
                      text: presenter.renderI18nKeys("i18n.TradeFinance.releaseLiabilityStatus", true),
                      isVisible: true
                    },
                    lblValue: {
                      text: ld[i].status || NA,
                      isVisible: true
                    }
                  });
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.submittedOn", true),
                    isVisible: true
                  },
                  lblValue: {
                    text: formatUtilManager.getFormattedCalendarDate(ld[i].createdDate) || NA,
                    isVisible: true
                  }
                });
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.dateOfRelease", true),
                    isVisible: true
                  },
                  lblValue: {
                    text: ld[i].releaseDate || NA,
                    isVisible: true
                  }
                });
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.amountToBeReleased", true),
                    isVisible: true
                  },
                  lblValue: {
                    text: data.currency + " " + ld[i].amountToRelease || NA,
                    isVisible: true
                  }
                });
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.outstandingAmount", true),
                    isVisible: true
                  },
                  lblValue: {
                    text: data.currency + " " + data.amount || NA,
                    isVisible: true
                  }
                });
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.releaseLiabilityDetails", true),
                    isVisible: true
                  },
                  lblValue: {
                    text: ld[i].liabilityDetails || NA,
                    isVisible: true
                  }
                });          
                releaseLiabilityDetails.push({
                  lblKey: {
                    text: presenter.renderI18nKeys("i18n.TradeFinance.messageToBankOptionalWithColon", false),
                    isVisible: true
                  },
                  lblValue: {
                    text: ld[i].messageToBank || NA,
                    isVisible: true
                  }
                });
            }
        }
        let transactionDetails = [

          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.requestAmountWithColon"),
              isVisible: true
            },
            lblValue: {
              text: (data.currency && data.amount) ? `${data.currency} ${formatUtilManager.formatAmount(data.amount)}` : NA,
              isVisible: true
            }
          }
        ];
        if (data.productType === 'Standby LC' && data.demandAcceptance) {
          transactionDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.demandAcceptanceWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.demandAcceptance || NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.transferableOptionalWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.transferable || NA,
                isVisible: true
              }
            }
          );
        }
        transactionDetails.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.expectedIssueDateWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.expectedIssueDate ? formatUtilManager.getFormattedCalendarDate(data.expectedIssueDate) : NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryTypeWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.expiryType || NA,
              isVisible: true
            }
          }
        );
        if (data.expiryType === 'Date' || data.expiryType === 'Conditions') {
          transactionDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryDateOptWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.expiryDate ? formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA,
                isVisible: true
              }
            }
          );
        }
        if (data.expiryType === 'Conditions') {
          transactionDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryConditionsOptWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.expiryConditions || NA,
                isVisible: true
              }
            }
          );
        }
        if (data.modeOfTransaction === 'Swift' && data.autoExtensionExpiry) {
          transactionDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.autoExtensionOptWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.autoExtensionExpiry || NA,
                isVisible: true
              }
            }
          );
          if (data.autoExtensionExpiry === 'Yes') {
            transactionDetails.push(
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionPeriodWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: data.extensionPeriod || NA,
                  isVisible: true
                }
              },
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionCapPeriodWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: data.extensionCapPeriod ? formatUtilManager.getFormattedCalendarDate(data.extensionCapPeriod) : NA,
                  isVisible: true
                }
              },
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.notificationPeriodWithColon"),
                  isVisible: true
                },
                lblValue: {
                  text: data.notificationPeriod || NA,
                  isVisible: true
                }
              }
            );
          }
          transactionDetails.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.extensionDetailsWithColon"),
                isVisible: true
              },
              lblValue: {
                text: data.extensionDetails || NA,
                isVisible: true
              }
            }
          );
        }
        transactionDetails.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.governingLawWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.governingLaw || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicableRulesOptionalWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.applicableRules || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.deliveryInstructionsOptionalWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.deliveryInstructions || NA,
              isVisible: true
            }
          }
        );
        let applicantAndIssuingBankDetails = [];
        let applicantAddress = this.getFormattedAddress(data.applicantAddress ? JSON.parse(data.applicantAddress.replace(/'/g, "\"")) : {});
        applicantAndIssuingBankDetails.push({
            lblKey: {
                text: kony.i18n.getLocalizedString('i18n.ExportLC.Applicant') + ' ' + (i + 1),
                isVisible: true,
                skin: "ICSknLbl424242SSPRegular15px"
            }
        }, {
            lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicantNameWithColon"),
                isVisible: true
            },
            lblValue: {
                text: data.applicantName || NA,
                isVisible: true
            }
        }, Object.assign({
            lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicantAddressWithColon"),
                isVisible: true
            },
            lblValue: {
                isVisible: !applicantAddress['flxAddress']['isVisible'],
                text: NA
            }
        }, applicantAddress));
        const bankAddress = this.getFormattedAddress(data.issuingBankAddress ? JSON.parse(data.issuingBankAddress.replace(/'/g, "\"")) : {});
        applicantAndIssuingBankDetails.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuingBankDetails"),
              isVisible: true,
              skin: "ICSknLbl424242SSPRegular15px"
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.payee.bankname"),
              isVisible: true
            },
            lblValue: {
              text: data.issuingBankName || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.swift/BicCodeWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.issuingBankSwiftBicCode || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.Accounts.IBAN"),
              isVisible: true
            },
            lblValue: {
              text: data.issuingBankIban || NA,
              isVisible: true
            }
          },
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.localCodeWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.issuingBankLocalCode || NA,
              isVisible: true
            }
          },
          Object.assign(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.bankAddressWithColon"),
                isVisible: true
              },
              lblValue: {
                isVisible: !bankAddress['flxAddress']['isVisible'],
                text: NA
              }
            }, bankAddress)
        );
        let additionalInstructionAndDocumentDetails = [
          {
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.messageFromBankWithColon"),
              isVisible: true
            },
            lblValue: {
              text: data.messageFromBank || NA,
              isVisible: true
            }
          }
        ];
        if (data.uploadedDocuments) {
          const documents = JSON.parse(data.uploadedDocuments.replace(/'/g, '"'));
          if (documents && documents.length > 0) {
            additionalInstructionAndDocumentDetails.push(
              {
                lblKey: {
                  text: kony.i18n.getLocalizedString("i18n.TradeFinance.SupportingDocuments"),
                  isVisible: true,
                  skin: "ICSknLbl424242SSPRegular15px"
                }
              }
            );
            for (let i = 0; i < documents.length; i++) {
              additionalInstructionAndDocumentDetails.push(
                {
                  lblKey: {
                    text: kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedFilesWithColon"),
                    isVisible: i === 0
                  },
                  flxDocument: {
                    isVisible: true,
                    left: i === 0 ? '0dp' : '40dp'
                  },
                  flxDownloadImage: {
                    cursorType: 'pointer',
                    onClick: this.downloadDocument.bind(this, documents[i].documentReferences)
                  },
                  lblDocumentName: {
                    text: documents[i].documentName
                  }
                }
              );
            }
          }
        }
        segGuaranteeReceivedData.push(
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuanceSummary")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              },
              "flxMain": {
                top: "0dp"
              }
            },
            issuanceSummaryDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.releaseLiabilityDetails")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            releaseLiabilityDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.productDetails")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            productDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("kony.mb.transaction.transactionDetails")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            transactionDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicant&IssuingBankDetails")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            applicantAndIssuingBankDetails
          ],
          [
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.additionalInstructions&Documents")
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            additionalInstructionAndDocumentDetails
          ]
        );
        segGuaranteeReceivedData.forEach(section => {
          section[1].forEach(row => {
            if (!row.lblValue) row.lblValue = { isVisible: false };
            if (!row.btnAction) row.btnAction = { isVisible: false };
            if (!row.flxDocument) row.flxDocument = { isVisible: false };
            if (!row.flxAddress) row.flxAddress = { isVisible: false };
          });
        });
        scope.view.segDetails.removeAll();
        scope.view.segDetails.setData(segGuaranteeReceivedData);
        if(!data.liabilityDetails) {
          scope.view.segDetails.removeSectionAt(1);
        }
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "setReceivedGTAndSBLCDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * Method to toggle section header dropdown
     */
    toggleSectionHeader: function ({ sectionIndex, rowIndex, segmentId }) {
      const scope = this;
      try {
        let segmentData = {
          'segDetails': segGuaranteeReceivedData,
          'segRejectionHistory': segRejectionHistoryData
        }[segmentId];
        let newSegData = JSON.parse(JSON.stringify(scope.view[segmentId].data));
        if (newSegData[sectionIndex][0]['lblDropdownIcon']['text'] === 'O') {
          newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = 'P';
          newSegData[sectionIndex][1] = segmentData[sectionIndex][1];
        } else {
          newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = 'O';
          newSegData[sectionIndex][1] = [];
        }
        for (let i = 0; i < segmentData.length; i++) {
          if (newSegData[i][1].length > 0) {
            newSegData[i][1] = segmentData[i][1];
          }
        }
        segmentData[sectionIndex][0]['lblDropdownIcon']['text'] = newSegData[sectionIndex][0]['lblDropdownIcon']['text']
        if (segmentId === 'segDetails') {
          this.view[segmentId].setData(newSegData);
        } else {
          kony.application.getCurrentForm().segRejectionHistory.setData(newSegData);
        }
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "toggleSectionHeader",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    downloadDocument: function (docReference) {
      applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).retrieveDocument(docReference, kony.application.getCurrentForm().id);
    },
    getFormattedAddress: function (data) {
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
    },
    getOrdinalNumeral: function (n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },
    setRejectionHistoryData: function (rejectionHistoryData) {
      const formatUtilManager = applicationManager.getFormatUtilManager();
      this.view.segRejectionHistory.widgetDataMap = {
        "lblHeading": "lblHeading",
        "lblDropdownIcon": "lblDropdownIcon",
        "flxDropdown": "flxDropdown",
        "flxMain": "flxMain",
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxDocument": "flxDocument",
        "flxDownloadImage": "flxDownloadImage",
        "lblDocumentName": "lblDocumentName",
        "flxAddress": "flxAddress",
        "lblAddress1": "lblAddress1",
        "lblAddress2": "lblAddress2",
        "lblAddress3": "lblAddress3",
        "btnAction": "btnAction"
      };
      segRejectionHistoryData = [];
      for (let i = rejectionHistoryData.length - 1; i >= 0; i--) {
        segRejectionHistoryData.push([
          {
            "lblHeading": {
              "text": `${kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection")} (${this.getOrdinalNumeral(i + 1)})`
            },
            "lblDropdownIcon": {
              text: 'P',
              cursorType: 'pointer'
            },
            "flxMain": {
              top: i === rejectionHistoryData.length - 1 ? "0dp" : "20dp"
            }
          },
          [
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.dateOfRejectionWithColon"),
                isVisible: true
              },
              lblValue: {
                text: rejectionHistoryData[i].rejectionDate ? formatUtilManager.getFormattedCalendarDate(rejectionHistoryData[i].rejectionDate) : NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForRejectionWithColon"),
                isVisible: true
              },
              lblValue: {
                text: rejectionHistoryData[i].reasonForSelfRejection || NA,
                isVisible: true
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.messageToBankOptionalWithColon"),
                isVisible: true
              },
              lblValue: {
                text: rejectionHistoryData[i].messageToBank || NA,
                isVisible: true
              }
            }
          ]
        ]);
      }
      segRejectionHistoryData.forEach(section => {
        section[1].forEach(row => {
          if (!row.lblValue) row.lblValue = { isVisible: false };
          if (!row.btnAction) row.btnAction = { isVisible: false };
          if (!row.flxDocument) row.flxDocument = { isVisible: false };
          if (!row.flxAddress) row.flxAddress = { isVisible: false };
        });
      });
      this.view.segRejectionHistory.setData(segRejectionHistoryData);
    },
    showRejectionHistory: function () {
      try {
        let form = kony.application.getCurrentForm();
        let popupObj = this.view.flxRejectionHistory.clone();
        form.add(popupObj);
        popupObj.isVisible = true;
        popupObj.height = "100%";
        popupObj.flxRejectionHistoryMain.flxRejectionHistoryHeader.lblRejectionHistoryClose.onTouchEnd = () => form.remove(popupObj);
        this.view.forceLayout();
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "showRejectionHistory",
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
     * Method to verify whether the value is empty, null or undefined
     * @param {any} data - value to be verified
     * @returns {boolean} - validity of the value passed
     */
    isEmptyNullOrUndefined: function (data) {
      try {
        data = JSON.parse(data);
      } catch (err) { }
      if (data === null || data === undefined || (typeof data === "string" && data.trim() === "")) return true;
      if (typeof data === "object") {
        if (Array.isArray(data)) return data.length === 0;
        return Object.keys(data).length === 0;
      }
      return false;
    },
    /**
     * Error thrown from catch block of component
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});