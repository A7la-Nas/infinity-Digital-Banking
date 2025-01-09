define(['OLBConstants'], function (OLBConstants) {
  let segExportLCData = [];
  let data, presenter;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
     * Sets the context 
     */
    setContext: function (context) {
      try {
        data = context;
        this.setExportLCDetails();
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
    setExportLCDetails: function () {
      const scope = this;
      segExportLCData = [];
      presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ExportLCUIModule' });
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
        let lcSummaryDetails = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":"
          },
          lblValue: {
            text: data.lcReferenceNo || NA
          }
        }];
        if (data.status !== OLBConstants.EXPORT_LC_STATUS.NEW) {
          lcSummaryDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.updatedOn") + ":"
            },
            lblValue: {
              text: data.lcUpdatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(data.lcUpdatedOn) : NA
            }
          });
        }
        lcSummaryDetails.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.serviceRequests.Status:")
          },
          lblValue: {
            text: data.status || NA,
            skin: 'sknlbl424242SSP15pxSemibold'
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.receivedOnWithColon")
          },
          lblValue: {
            text: data.lcCreatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(data.lcCreatedOn) : NA
          }
        });
        if (data.status === OLBConstants.EXPORT_LC_STATUS.NEW) {
          lcSummaryDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsentWithColon")
            },
            lblValue: {
              text: data.beneficiaryConsent || "Pending"
            }
          });
        }
        segExportLCData.push([
          {
            "lblHeading": {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary"),
              skin: 'sknlbl424242SSP15pxSemibold'
            },
            "lblDropdownIcon": {
              isVisible: false
            },
            "flxMain": {
              top: "0dp",
              skin: "ICSknbgffffff9topbottomBorder"
            }
          },
          lcSummaryDetails
        ]);
        if (data.status !== OLBConstants.EXPORT_LC_STATUS.NEW) {
          let beneficiaryConsentDetails = [{
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsentWithColon")
            },
            lblValue: {
              text: data.beneficiaryConsent || NA
            }
          }];
          if (data.beneficiaryConsent === OLBConstants.EXPORT_LC_STATUS.REJECTED) {
            beneficiaryConsentDetails.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: data.reasonForRejection || NA
              }
            });
          }
          beneficiaryConsentDetails.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankOptionalWithColon')
            },
            lblValue: {
              text: data.messageToBank || NA
            }
          });
          segExportLCData.push([
            {
              "lblHeading": {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.beneficiaryConsent"),
                skin: 'sknlbl424242SSP15pxSemibold'
              },
              "lblDropdownIcon": {
                text: 'P',
                cursorType: 'pointer'
              }
            },
            beneficiaryConsentDetails
          ]);
        }
        let lcDetails = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":"
          },
          lblValue: {
            text: data.lcType || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantWithColon")
          },
          lblValue: {
            text: data.applicant || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.applicantAddressWithColon")
          },
          lblValue: {
            text: data.applicantaddress || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issuingBankWithColon")
          },
          lblValue: {
            text: data.issuingBank || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.IssuingBankAddress") + ":"
          },
          lblValue: {
            text: data.issuingbankaddress || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.issueDateWithColon")
          },
          lblValue: {
            text: data.issueDate ? presenter.formatUtilManager.getFormattedCalendarDate(data.issueDate) : NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.Wealth.expiryDate")
          },
          lblValue: {
            text: data.expiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(data.expiryDate) : NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":"
          },
          lblValue: {
            text: (data.currency && data.amount) ? `${data.currency} ${presenter.formatUtilManager.formatAmount(data.amount)}` : NA
          }
        }];
        let beneficiaryDetails = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.userManagement.Name")
          },
          lblValue: {
            text: data.beneficiaryName || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address")
          },
          lblValue: {
            text: data.beneficiaryAddress || NA
          }
        }];
        let goodsAndShipmentDetails = [{
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.GoodsDescription") + ":"
          },
          lblValue: {
            text: data.goodsDescription || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions") + ":"
          },
          lblValue: {
            text: data.additionalConditions || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ConfirmationInstructionsWithColon")
          },
          lblValue: {
            text: data.confirmInstructions || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":"
          },
          lblValue: {
            text: data.latestShipmentDate ? presenter.formatUtilManager.getFormattedCalendarDate(data.latestShipmentDate) : NA
          }
        }];
        let documentDetails = [{
          lblKey: {
            text: 'Document Name:' //will add i18n key after creation
          },
          lblValue: {
            text: data.documentName || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.uploadedFilesWithColon")
          },
          lblValue: {
            text: data.uploadedFiles || NA
          }
        }];
        segExportLCData.push([
          {
            "lblHeading": {
              text: kony.i18n.getLocalizedString('i18n.ImportLC.LCDetails'),
              skin: 'sknlbl424242SSP15pxSemibold'
            },
            "lblDropdownIcon": {
              text: 'P',
              cursorType: 'pointer'
            }
          },
          lcDetails
        ], [
          {
            "lblHeading": {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.BeneficiaryDetails'),
              skin: 'sknlbl424242SSP15pxSemibold'
            },
            "lblDropdownIcon": {
              text: 'P',
              cursorType: 'pointer'
            }
          },
          beneficiaryDetails
        ], [
          {
            "lblHeading": {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.goodsAndShipmentDetails'),
              skin: 'sknlbl424242SSP15pxSemibold'
            },
            "lblDropdownIcon": {
              text: 'P',
              cursorType: 'pointer'
            }
          },
          goodsAndShipmentDetails
        ], [
          {
            "lblHeading": {
              text: kony.i18n.getLocalizedString('i18n.ImportLC.DocumentsandTerms'),
              skin: 'sknlbl424242SSP15pxSemibold'
            },
            "lblDropdownIcon": {
              text: 'P',
              cursorType: 'pointer'
            }
          },
          documentDetails
        ]);
        segExportLCData.forEach(section => {
          section[1].forEach(row => {
            if (!row.lblValue) row.lblValue = { isVisible: false };
            if (!row.btnAction) row.btnAction = { isVisible: false };
            if (!row.flxDocument) row.flxDocument = { isVisible: false };
            if (!row.flxAddress) row.flxAddress = { isVisible: false };
          });
        });
        scope.view.segDetails.removeAll();
        scope.view.segDetails.setData(segExportLCData);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "setExportLCDetails",
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
        let segmentData = segExportLCData;
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
        this.view[segmentId].setData(newSegData);
      } catch (err) {
        const errorObj = {
          "level": "ComponentController",
          "method": "toggleSectionHeader",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * Error thrown from catch block of component
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});