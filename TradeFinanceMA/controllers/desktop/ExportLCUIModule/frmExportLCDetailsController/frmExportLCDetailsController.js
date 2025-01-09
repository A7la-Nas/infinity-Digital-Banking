define(["FormControllerUtility", "CommonUtilities", "OLBConstants", "ViewConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let presenter, contentScope, contentPopupScope, titleActionScope, breakpoint, segTemplate, frmName, isTablet = false;
    LCData = {},
    amendSortFields = {
      imgASort1: 'applicantName',
      imgASort2: 'exportlcReferenceNo',
      imgASort3: 'lcType',
      imgASort4: 'amendmentReceivedDate',
      imgASort5: 'amendmentNo',
      imgASort6: 'amendmentStatus'
    },
    drawingsSortFields = {
      imgDSort1: 'applicant',
      imgDSort2: 'drawingReferenceNo',
      imgDSort3: 'drawingAmount',
      imgDSort4: 'drawingCreatedDate',
      imgDSort5: 'status',
    },
    payload = {},
    LOC = kony.i18n.getLocalizedString("i18n.ImportLC.LetterofCredits"),
    DRAWINGS = kony.i18n.getLocalizedString("i18n.ImportLC.Drawings"),
    AMENDMENTS = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"),
    activeTab = LOC;
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
    onNavigate: function () {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    onBreakpointChange: function (form, width) {
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
        isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
        isTablet = false;
      }
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      LCData = JSON.parse(JSON.stringify(presenter.LCData));
      (LCData.SwiftMessages || LCData.PaymentAdvices) && this.setSwiftAdvises();
      this.resetForm();
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.formTemplate12.pageTitle = `${kony.i18n.getLocalizedString("i18n.ImportLC.ExportLC")} - ${LCData.lcReferenceNo}`;
      contentPopupScope.flxSAContent.doLayout = CommonUtilities.centerPopupFlex;
      titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'ExportLCUIModule'
      });
      frmName = this.view.id;
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentPopupScope = this.view.formTemplate12.flxContentPopup;
      titleActionScope = this.view.formTemplate12.flxTCButtons;
      contentScope.btnTab1.onClick = this.onTabClick.bind(this, LOC);
      contentScope.btnTab2.onClick = this.onTabClick.bind(this, AMENDMENTS);
      contentScope.btnTab3.onClick = this.onTabClick.bind(this, DRAWINGS);
      titleActionScope.flxSwiftAndAdvices.onClick = () => titleActionScope.flxSwiftAndAdvicesInfo.setVisibility(!titleActionScope.flxSwiftAndAdvicesInfo.isVisible);
      contentPopupScope.btnSAClose.onClick = () => {
        contentPopupScope.setVisibility(false)
        contentPopupScope.flxSAPopup.setVisibility(false)
      };
      contentScope.btnSubmit.onClick = this.showPopup;
      contentScope.btnCreateDrawing.onClick = () => presenter.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: 'frmExportLCCreateDrawings' }, false, LCData);
      contentScope.btnBack.onClick = () => presenter.navigationManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportLettersOfCredit'
      });
      contentScope.btnViewAllExportLC.onClick = () => presenter.navigationManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportLettersOfCredit'
      });
      contentScope.flxConsentOption1.onClick = this.toggleConsentOptions.bind(this, 1);
      contentScope.flxConsentOption2.onClick = this.toggleConsentOptions.bind(this, 2);
      contentScope.txtReasonForRejection.onTextChange = this.enableOrDisableSubmitButton;
      contentScope.btnViewConsolidated.onClick = () => presenter.showExportLCScreen({
        context: 'viewConsolidated',
        data: {
          exportLCId: LCData.exportLCId
        },
        form: this.view.id
      });
      for (let i = 1; i < 7; i++) {
        contentScope['imgASort' + i].onTouchStart = scope.toggleSort.bind(scope, 'imgASort' + i, AMENDMENTS);
      }
      for (let i = 1; i < 6; i++) {
        contentScope['imgDSort' + i].onTouchStart = scope.toggleSort.bind(scope, 'imgDSort' + i, DRAWINGS);
      }
      contentScope.tbxSearch.onDone = this.getListData;
      contentScope.tbxSearch.onTextChange = () => contentScope.lblCross.setVisibility(contentScope.tbxSearch.text !== "");
      contentScope.flxCross.onClick = () => {
        contentScope.flxSearch.tbxSearch.text = "";
        contentScope.lblCross.setVisibility(false);
        this.getListData();
      }
      titleActionScope.flxVerticalEllipsis.onClick = this.renderPrintAndDownload.bind(this);
      titleActionScope.lblVerticalEllipsis.onTouchEnd = () => {
        if (titleActionScope.flxVerticalEllipsisDropdown.isVisible) {
          titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
        }
        else {
          titleActionScope.flxVerticalEllipsisDropdown.setVisibility(true);
        }
      };
      this.setWidgetDataMap();
    },
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.getExportLCAmmendments) {
        this.setSegmentData(viewModel.getExportLCAmmendments.ExportLcAmendments);
      }
      if (viewModel.ExportLcAmendments) {
        amendData = presenter.amendmentsData
        this.switchToAmendments();
      }
      if (viewModel.ExportLCDrawings) {
        this.setSegmentData(viewModel.ExportLCDrawings);
      }
      if (viewModel.fileResponse) {
        this.showSAPopup(viewModel.fileResponse)
      }
      if (viewModel.beneficiaryConsent) {
        this.showBeneficiaryConsentAck();
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.showBannerError({ dbpErrMsg: viewModel.serverError });
      }
    },
    showPopup: function () {
      let beneficiaryConsentPayload = {
        exportLCId: LCData.exportLCId,
        messageToBank: contentScope.txtMessageToBank.text
      };
      if (contentScope.lblConsentOptionIcon1.text === presenter.resourcesConstants.fontIcons.radioSelected) {
        beneficiaryConsentPayload['beneficiaryConsent'] = 'Accepted';
      } else {
        beneficiaryConsentPayload['beneficiaryConsent'] = 'Rejected';
        beneficiaryConsentPayload['reasonForRejection'] = contentScope.txtReasonForRejection.text;
      }
      const submitPopupContext = {
        heading: kony.i18n.getLocalizedString('i18n.TradeFinance.beneficiaryConsent'),
        message: kony.i18n.getLocalizedString('i18n.TradeFinance.areYouSureYouWantToSubmitYourBeneficiaryConsent'),
        yesText: kony.i18n.getLocalizedString('i18n.CustomerFeedback.Submit'),
        yesClick: () => presenter.submitBeneficiaryConsent(beneficiaryConsentPayload, frmName)
      };
      this.view.formTemplate12.setPopup(submitPopupContext);
    },
    resetForm: function () {
      this.view.formTemplate12.hideBannerError();
      titleActionScope.setVisibility(true);
      contentPopupScope.setVisibility(false);
      contentScope.flxContentSwitch.setVisibility(true);
      contentScope.flxBeneficiaryConsent.setVisibility(false);
      FormControllerUtility.disableButton(contentScope.btnSubmit);
      contentScope.btnBack.setVisibility(true);
      contentScope.btnViewAllExportLC.setVisibility(false);
      contentScope.txtMessageToBank.text = '';
      contentScope.txtReasonForRejection.text = '';
      contentScope.flxReasonForRejection.setVisibility(false);
      contentScope.flxConsentOption1.width = breakpoint <= 1024 ?  '12%' : '9%';
      contentScope.txtReasonForRejection.width = breakpoint <= 1024 ? '78%' : '35%';
      contentScope.txtMessageToBank.width = breakpoint <= 1024 ?  '78%' : '35%';
      contentScope.btnBack.width = breakpoint <= 1024 ?  '150dp' : '14%';
      contentScope.btnCreateDrawing.width = breakpoint <= 1024 ?  '170dp' : '14%';
      contentScope.btnSubmit.width = breakpoint <= 1024 ?  '150dp' : '14%';
      contentScope.btnViewAllExportLC.width = breakpoint <= 1024 ?  '150dp' : '14%';
      for (let i = 1; i <= 2; i++) {
        contentScope['lblConsentOptionIcon' + i].text = presenter.resourcesConstants.fontIcons.radioUnselected;
        contentScope['lblConsentOptionIcon' + i].skin = presenter.resourcesConstants.skins.radioUnselected;
      }
      for (let i = 1; i <= 3; i++) {
        contentScope['btnTab' + i].skin = i === 1 ? 'ICSknBtnAccountSummarySelected2' : 'ICSknBtnAccountSummaryUnselected2';
      };
      activeTab = LOC;
      this.switchToLoC();
    },
    setPaginationComponent: function (pageHeader) {
      contentScope.PaginationContainer.setPageSize(10);
      contentScope.PaginationContainer.setLowerLimit(1);
      contentScope.PaginationContainer.setPageHeader(pageHeader);
      contentScope.PaginationContainer.setServiceDelegate(this.getListData.bind(this, 'pagination'));
      contentScope.PaginationContainer.setIntervalHeader();
    },
    setWidgetDataMap: function (data) {
      contentScope.segTransactionList.widgetDataMap = {
        "btnAction": "btnAction",
        "btnAction1": "btnAction1",
        "btnAction2": "btnAction2",
        "btnAction3": "btnAction3",
        "flxDropdown": "flxDropdown",
        "flxExportAmendmentList": "flxExportAmendmentList",
        "flxExportAmendmentListTablet": "flxExportAmendmentListTablet",
        "flxIdentifier": "flxIdentifier",
        "flxTempExportLCList1": "flxTempExportLCList1",
        "flxTempExportLCList2": "flxTempExportLCList2",
        "flxTempExportLCList3": "flxTempExportLCList3",
        "flxTempExportLCList4": "flxTempExportLCList4",
        "lblColumn1": "lblColumn1",
        "lblColumn2": "lblColumn2",
        "lblColumn3": "lblColumn3",
        "lblColumn4": "lblColumn4",
        "lblColumn5": "lblColumn5",
        "lblColumn6": "lblColumn6",
        "lblDropdown": "lblDropdown",
        "lblIdentifier": "lblIdentifier",
        "lblRow2Column1Key": "lblRow2Column1Key",
        "lblRow2Column1Value": "lblRow2Column1Value",
        "lblRow2Column2Key": "lblRow2Column2Key",
        "lblRow2Column2Value": "lblRow2Column2Value",
        "lblRow2Column3Key": "lblRow2Column3Key",
        "lblRow2Column3Value": "lblRow2Column3Value",
        "lblRow3Column1Key": "lblRow3Column1Key",
        "lblRow3Column1Value": "lblRow3Column1Value",
        "lblRowColumn1Key": "lblRowColumn1Key",
        "lblRowColumn1Value": "lblRowColumn1Value",
        "lblRowColumn2Key": "lblRowColumn2Key",
        "lblRowColumn2Value": "lblRowColumn2Value",
        "lblRowColumn3Key": "lblRowColumn3Key",
        "lblRowColumn3Value": "lblRowColumn3Value",
        "lblRowColumn4Key": "lblRowColumn4Key",
        "lblRowColumn4Value": "lblRowColumn4Value"
      }
    },
    getSegmentData: function (data) {
      let segData = []
      switch (activeTab) {
        case AMENDMENTS:
          if (breakpoint > 1024) {
            segTemplate = 'flxExportAmendmentList';
            for (const record of data) {
              segData.push({
                "lblDropdown": "O",
                "flxExportAmendmentList": {
                  "height": "41dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.applicantName || NA,
                "lblColumn2": record.exportlcReferenceNo || NA,
                "lblColumn3": record.lcType || NA,
                "lblColumn4": record.amendmentReceivedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.amendmentReceivedDate) : NA,
                "lblColumn5": record.amendmentNo || NA,
                "lblColumn6": record.amendmentStatus || NA,
                "template": segTemplate,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference"),
                "lblRowColumn1Value": record.lcIssueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcIssueDate) : NA,
                "lblRowColumn2Value": record.lcExpiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcExpiryDate) : NA,
                "lblRowColumn3Value": record.amendmentReferenceNo || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    presenter.showExportLCScreen({
                      context: 'viewAmendment',
                      data: {
                        exportlcSRMSRequestId: record.exportlcSRMSRequestId,
                        amendmentSRMSRequestId: record.amendmentSRMSRequestId
                      },
                      form: frmName
                    })
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    presenter.generateExportAmendment({
                      'amendmentReferenceNo': record.amendmentReferenceNo || record.amendmentSRMSRequestId
                    }, frmName)
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule").presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmAmendmentsPrint", {
                      "Data": Object.assign(record, {
                        frmName: frmName
                      }),
                      "LOCNavData": LCData
                    })
                  }
                }
              });
            }
          } else {
            segTemplate = 'flxExportAmendmentListTablet';
            for (const record of data) {
              segData.push({
                "flxExportAmendmentListTablet": {
                  "height": "41dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblDropdown": "O",
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "template": segTemplate,
                "lblColumn1": record.applicantName || NA,
                "lblColumn2": record.exportlcReferenceNo || NA,
                "lblColumn3": record.amendmentReceivedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.amendmentReceivedDate) : NA,
                "lblColumn4": record.amendmentStatus || NA,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.ImportLC.LCType"),
                "lblRowColumn1Value": record.lcType || NA,
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
                "lblRowColumn2Value": record.lcIssueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcIssueDate) : NA,
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
                "lblRowColumn3Value": record.lcExpiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcExpiryDate) : NA,
                "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo") + ".",
                "lblRowColumn4Value": record.amendmentNo || NA,
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference"),
                "lblRow2Column1Value": record.amendmentReferenceNo || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    presenter.showExportLCScreen({
                      context: 'viewAmendment',
                      data: {
                        exportlcSRMSRequestId: record.exportlcSRMSRequestId,
                        amendmentSRMSRequestId: record.amendmentSRMSRequestId
                      },
                      form: frmName
                    })
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    presenter.generateExportAmendment({
                      'amendmentReferenceNo': record.amendmentReferenceNo || record.amendmentSRMSRequestId
                    }, frmName)
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule").presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmAmendmentsPrint", {
                      "Data": Object.assign(record, {
                        frmName: frmName
                      }),
                      "LOCNavData": LCData
                    })
                  }
                }
              })
            }
          }
          break;
        case DRAWINGS:
          if (breakpoint > 1024) {
            segTemplate = 'flxTempExportLCList2';
            for (const record of data) {
              segData.push({
                "lblDropdown": "O",
                "flxTempExportLCList2": {
                  "height": "40dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.applicant || NA,
                "lblColumn2": record.drawingReferenceNo || NA,
                "lblColumn3": record.drawingAmount ? presenter.formatUtilManager.formatAmount(record.drawingAmount) : NA,
                "lblColumn4": record.drawingCreatedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.drawingCreatedDate) : NA,
                "lblColumn5": record.status || NA,
                "template": segTemplate,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.ImportLC.LCType"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DocStatus"),
                "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.common.Currency"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings"),
                "lblRowColumn1Value": record.lcReferenceNo || NA,
                "lblRowColumn2Value": record.lcType || NA,
                "lblRowColumn3Value": record.documentStatus || NA,
                "lblRowColumn4Value": record.currency || NA,
                "lblRow2Column1Value": record.messageToBank || NA,
                "btnAction": {
                  "text": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    presenter.getExportDrawingSummary({
                      exportLCId: LCData.exportLCId,
                      drawingReferenceNo: record.drawingReferenceNo,
                      flowType: 'viewDetails'
                    }, frmName)
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    presenter.generateExportDrawing({
                      'drawingReferenceNo': record.drawingReferenceNo
                    }, frmName)
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    presenter.getExportDrawingSummary({
                      exportLCId: LCData.exportLCId,
                      drawingReferenceNo: record.drawingReferenceNo,
                      flowType: 'print'
                    }, frmName)
                  }
                }
              });
            }
          } else {
            segTemplate = 'flxTempExportLCList4';
            for (const record of data) {
              segData.push({
                "lblDropdown": "O",
                "flxTempExportLCList4": {
                  "height": "40dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.applicant || NA,
                "lblColumn2": record.drawingCreatedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.drawingCreatedDate) : NA,
                "lblColumn3": record.status || NA,
                "template": segTemplate,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingReference"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.wealth.amount"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DocStatus"),
                "lblRow2Column3Key": kony.i18n.getLocalizedString("i18n.common.Currency"),
                "lblRowColumn1Value": record.lcReferenceNo,
                "lblRowColumn2Value": record.drawingReferenceNo || NA,
                "lblRowColumn3Value": record.drawingAmount ? presenter.formatUtilManager.formatAmount(record.drawingAmount) : NA,
                "lblRow2Column1Value": record.messageToBank || NA,
                "lblRow2Column2Value": record.documentStatus || NA,
                "lblRow2Column3Value": record.currency || NA,
                "btnAction": {
                  "text": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    presenter.getExportDrawingSummary({
                      exportLCId: LCData.exportLCId,
                      drawingReferenceNo: record.drawingReferenceNo,
                      flowType: 'viewDetails'
                    })
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    presenter.generateExportDrawing({
                      'drawingReferenceNo': record.drawingReferenceNo
                    }, frmName)
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    presenter.getExportDrawingSummary({
                      exportLCId: LCData.exportLCId,
                      drawingReferenceNo: record.drawingReferenceNo,
                      flowType: 'print'
                    })
                  }
                }
              })
            }
          }
          break;
      }
      return segData;
    },
    onTabClick: function (context) {
      switch (context) {
        case LOC:
          activeTab = LOC
          if (breakpoint >= 1024) {
            this.switchToLoC()
          }
          break;
        case DRAWINGS:
          activeTab = DRAWINGS
          if (breakpoint >= 1024) {
            this.setPaginationComponent(kony.i18n.getLocalizedString('i18n.ImportLC.Drawings'));
            this.switchToDrawings();
          }
          break;
        case AMENDMENTS:
          activeTab = AMENDMENTS;
          if (breakpoint >= 1024) {
            this.setPaginationComponent(kony.i18n.getLocalizedString('i18n.ImportLC.Amendments'));
            this.switchToAmendments();
          }
          break;
      }
      titleActionScope.setVisibility(activeTab === LOC);
    },
    switchToLoC: function () {
      for (let i = 1; i <= 3; i++) {
        contentScope['btnTab' + i].skin = i === 1 ? 'ICSknBtnAccountSummarySelected2' : 'ICSknBtnAccountSummaryUnselected2';
      }
      contentScope.flxListingContent.setVisibility(false);
      contentScope.flxPagination.setVisibility(false);
      contentScope.flxLCDetails.setVisibility(true);
      contentScope.flxActions.setVisibility(true);
      contentScope.flxLCDetails.setVisibility(true);
      if (LCData.status === OLBConstants.EXPORT_LC_STATUS.NEW || LCData.status === OLBConstants.EXPORT_LC_STATUS.RETURNED_BY_BANK) {
        contentScope.flxContentSwitch.setVisibility(false);
        contentScope.flxBeneficiaryConsent.setVisibility(true);
        contentScope.btnSubmit.setVisibility(true);
        contentScope.flxLCDetails.top = '0dp';
      } else {
        contentScope.btnSubmit.setVisibility(false);
        contentScope.flxLCDetails.top = '20dp';
      }
      contentScope.btnCreateDrawing.setVisibility(LCData.status === OLBConstants.EXPORT_LC_STATUS.APPROVED);
      contentScope.ExportLCDetails.setContext(LCData);
    },
    switchToAmendments: function () {
      for (let i = 1; i <= 3; i++) {
        contentScope['btnTab' + i].skin = i === 2 ? 'ICSknBtnAccountSummarySelected2' : 'ICSknBtnAccountSummaryUnselected2';
      }
      contentScope.tbxSearch.text = '';
      contentScope.flxLCDetails.setVisibility(false);
      contentScope.flxActions.setVisibility(false);
      contentScope.segTransactionList.rowTemplate = 'flxExportAmendmentList';
      payload = {
        searchString: '',
        pageSize: '11',
        pageOffset: '0',
        sortByParam: 'amendmentReceivedDate',
        sortOrder: 'DESC',
        timeParam: '',
        timeValue: '',
        filterByValue: LCData.exportLCId,
        filterByParam: 'exportlcSRMSRequestId'
      },
      this.getListData();
      contentScope.flxListingContent.setVisibility(true);
      contentScope.flxPagination.setVisibility(true);
      contentScope.btnViewConsolidated.setVisibility(true);
      contentScope.flxAColumnHeader.setVisibility(true);
      contentScope.flxDColumnHeader.setVisibility(false);
      contentScope.flxSearch.width = '88%';
      for (const key in amendSortFields) {
        contentScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      contentScope['imgASort4'].src = ViewConstants.IMAGES.SORTING_NEXT;
    },
    switchToDrawings: function () {
      for (let i = 1; i <= 3; i++) {
        contentScope['btnTab' + i].skin = i === 3 ? 'ICSknBtnAccountSummarySelected2' : 'ICSknBtnAccountSummaryUnselected2';
      }
      contentScope.tbxSearch.text = '';
      contentScope.flxLCDetails.setVisibility(false);
      payload = {
        searchString: '',
        pageSize: '11',
        pageOffset: '0',
        sortByParam: 'drawingCreatedDate',
        sortOrder: 'DESC',
        timeParam: '',
        timeValue: '',
        filterByValue: LCData.exportLCId,
        filterByParam: 'exportLCId'
      },
      this.getListData()
      contentScope.flxListingContent.setVisibility(true);
      contentScope.flxListingSegment.setVisibility(true);
      contentScope.flxAColumnHeader.setVisibility(false);
      contentScope.flxDColumnHeader.setVisibility(true);
      contentScope.flxPagination.setVisibility(true);
      contentScope.flxActions.setVisibility(false);
      contentScope.btnViewConsolidated.setVisibility(false);
      contentScope.flxSearch.width = '100%';
      for (const key in drawingsSortFields) {
        contentScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      contentScope['imgDSort4'].src = ViewConstants.IMAGES.SORTING_NEXT;
    },
    getListData: function (params) {
      payload.searchString = contentScope.tbxSearch.text;
      if (params !== 'pagination' && params !== "sort") {
        contentScope.flxPagination.PaginationContainer.setLowerLimit(1);
        contentScope.flxPagination.PaginationContainer.setPageSize(10);
        contentScope.flxPagination.PaginationContainer.setIntervalHeader();
      }
      payload.pageOffset = (params === "pagination") ? contentScope.flxPagination.PaginationContainer.getPageOffset() : 0;
      if (activeTab === AMENDMENTS) {
        presenter.getExportLCAmmendments(payload, this.view.id);
      } else if (activeTab === DRAWINGS) {
        presenter.getExportLCDrawings(payload, this.view.id);
      }
    },

    renderPrintAndDownload: function () {
      var scope = this;
      try {
        titleActionScope.segVerticalDropdownEllipsis.widgetDataMap = {
          flxLCAccountType: 'flxLCAccountType',
          imgLCCheckbox: 'imgLCCheckbox',
          lblLCCheckbox: 'lblLCCheckbox',
          lblLCAccountType: 'lblLCAccountType'
        };
        let masterData = [];
        presenter.contextualMenuData.map(item => {
          masterData.push({
            flxLCAccountType: {
              bottom: '0dp',
              height: '40dp',
              onClick: scope.onPrintAndDownloadRowClick.bind(scope, item.id),
              cursorType: 'pointer',
              isVisible: scope.contextualItemCondition(item.id)
            },
            imgLCCheckbox: {
              isVisible: true,
              src: item.src
            },
            lblLCCheckbox: {
              isVisible: false
            },
            lblLCAccountType: item.text
          });
        });
        titleActionScope.segVerticalDropdownEllipsis.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderPrintAndDownload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    contextualItemCondition: function (id) {
      var scope = this;
      try {
        if (id == 'raiseQuery') {
          if (LCData.status.toLowerCase() === (OLBConstants.EXPORT_LC_STATUS.APPROVED).toLowerCase()) {
            return true;
          } else {
            return false;
          }
        }
        if (isTablet && id == 'print') {
          return false;
        }
        return true;
      } catch (err) {
        var errorObj = {
          "method": "contextualItemCondition",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'download') {
          presenter.generateExportLC({
            'exportLCId': LCData.exportLCId || LCData.exportlcSRMSRequestId
          }, this.view.id);
        } else if (id == 'print') {
          presenter.navigationManager.navigateTo({
            appName: "TradeFinanceMA",
            friendlyName: "frmPrintExportDrawing"
          }, false, {
            drawingSummary: LCData,
            printCallback: function () {
              applicationManager.getNavigationManager().navigateTo({
                appName: 'TradeFinanceMA',
                friendlyName: scope.view.id
              });
            }
          });
        } else if (id == 'raiseQuery') {
          let queryObj = {};
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${LCData.exportLCId}`;
          queryObj.descriptionObj = {};
          LCData.amountFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = LCData.amountFormatted);
          LCData.goodsDescription && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ExportLC.GoodsDescription")] = LCData.goodsDescription);
          LCData.latestShipmentDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ExportLC.LatestShipmentDate")] = LCData.latestShipmentDateFormatted);
          LCData.expiryDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate")] = LCData.expiryDateFormatted);
          LCData.beneficiaryName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.BeneficiaryName")] = LCData.beneficiaryName);
          queryObj.tradeModule = true;
          presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setSwiftAdvises: function () {
      if (LCData.SwiftMessages.length === 0 && LCData.PaymentAdvices.length === 0) return;
      const scope = this;
      let PaymentAdvices = LCData.PaymentAdvices
      let SwiftMessages = LCData.SwiftMessages
      titleActionScope.flxSwiftAndAdvices.setVisibility(true);
      titleActionScope.lblSwiftAndAdvices.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.SwiftAndAdvices')} (${SwiftMessages.length + PaymentAdvices.length})`
      titleActionScope.segSwiftAndAdvicesInfo.widgetDataMap = {
        "lblListValue": "lblListValue",
        "flxListDropdown": "flxListDropdown"
      };
      let segData = [];
      for (const paymentAdvice of PaymentAdvices) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice")} (${presenter.formatUtilManager.getFormattedCalendarDate(paymentAdvice.uploadedTimeStamp)})`,
            skin: 'sknLblSSP72727215px',
          },
          flxListDropdown: {
            onClick: scope.populateSwiftAndPaymentAdvice.bind(scope, paymentAdvice)
          }
        });
      }
      for (const swiftMessage of SwiftMessages) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMTHash")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.adviceOfExportLc")} (${presenter.formatUtilManager.getFormattedCalendarDate(swiftMessage.uploadedTimeStamp)})`,
            skin: 'sknLblSSP72727215px',
          },
          flxListDropdown: {
            onClick: scope.populateSwiftAndPaymentAdvice.bind(scope, swiftMessage)
          }
        });
      }
      titleActionScope.segSwiftAndAdvicesInfo.setData(segData);
    },
    populateSwiftAndPaymentAdvice: function (record) {
      titleActionScope.flxSwiftAndAdvicesInfo.setVisibility(false);
      let filePayload = {
        fileName: record.fileName,
        fileId: record.fileId
      };
      presenter.selectedSARecord = record;
      presenter.getFileResponse(filePayload, this.view.id);
    },
    showSAPopup: function (record) {
      contentPopupScope.setVisibility(true);
      contentPopupScope.flxSAPopup.setVisibility(true);
      if (presenter.selectedSARecord.category === 'SWIFT') {
        contentPopupScope.lblSAHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMTHash")} - ${kony.i18n.getLocalizedString("i18n.TradeFinance.adviceOfExportLc")} (${presenter.formatUtilManager.getFormattedCalendarDate(presenter.selectedSARecord.uploadedTimeStamp)})`;
        contentPopupScope.flxSAContent.width = '73%';
      } else {
        contentPopupScope.lblSAHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice")} (${presenter.formatUtilManager.getFormattedCalendarDate(presenter.selectedSARecord.uploadedTimeStamp)})`;
        contentPopupScope.flxSAContent.width = breakpoint > 1024 ? '51%' : '64%';
      }
      contentPopupScope.rtxSA.text = record;
      contentPopupScope.flxSADownload.onClick = () => {
        let downloadUrl = `${KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url}/operations/LCDocuments/downloadDocument`;
        CommonUtilities.downloadAttachment(downloadUrl, {"fileId": presenter.selectedSARecord.fileId});
      };
    },
    toggleConsentOptions: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          contentScope['lblConsentOptionIcon' + i].text = presenter.resourcesConstants.fontIcons.radioSelected;
          contentScope['lblConsentOptionIcon' + i].skin = presenter.resourcesConstants.skins.radioSelected;
        } else {
          contentScope['lblConsentOptionIcon' + i].text = presenter.resourcesConstants.fontIcons.radioUnselected;
          contentScope['lblConsentOptionIcon' + i].skin = presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      contentScope.flxReasonForRejection.setVisibility(idx === 2);
      this.enableOrDisableSubmitButton();
    },
    toggleSort: function (widget, context) {
      if (contentScope[widget].src === ViewConstants.IMAGES.SORTING_PREVIOUS) {
        contentScope[widget].src = ViewConstants.IMAGES.SORTING_NEXT;
        payload.sortOrder = 'DESC';
      } else {
        contentScope[widget].src = ViewConstants.IMAGES.SORTING_PREVIOUS;
        payload.sortOrder = 'ASC';
      }
      let sortFields = context === DRAWINGS ? drawingsSortFields : amendSortFields
      for (const key in sortFields) {
        if (key === widget) continue;
        contentScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      payload.pageOffset = contentScope.PaginationContainer.getPageOffset();
      payload.sortByParam = sortFields[widget];
      this.getListData("sort");
    },
    handleSegmentRowView: function () {
      try {
        scope = this;
        const rowIndex = contentScope.segTransactionList.selectedRowIndex[1];
        const data = contentScope.segTransactionList.data;
        let expandedHeight = activeTab === AMENDMENTS ? (breakpoint === 1024 ? "175dp" : "105dp") : (breakpoint === 1024 ? "205dp" : "210dp")
        var prevIndex, requiredView = [];
        const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "41dp", "sknflxffffffnoborder"];
        const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "ICSknFlxfbfbfb"];
        if (this.previousIndex === rowIndex) {
          requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
          this.toggleSegmentRowView(rowIndex, requiredView);
        } else {
          if (this.previousIndex >= 0) {
            prevIndex = this.previousIndex;
            this.toggleSegmentRowView(prevIndex, collapsedView);
          }
          prevIndex = rowIndex;
          this.toggleSegmentRowView(rowIndex, expandedView);
        }
        this.previousIndex = rowIndex;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "handleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to toggle the segment row view
     * @param {Number} index - index of segment row to toggle
     * @param {Array} viewData - data which need to be assigned to toggled view
     */
    toggleSegmentRowView: function (index, viewData) {
      try {
        scope = this;
        let data = contentScope.segTransactionList.data[index];
        const template = data.template;
        data.lblDropdown = viewData[0];
        data.flxIdentifier.isVisible = viewData[1];
        data.flxIdentifier.skin = viewData[2];
        data.lblIdentifier.skin = viewData[3];
        data[template].height = viewData[4];
        data[template].skin = viewData[5];
        contentScope.segTransactionList.setDataAt(data, index);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "toggleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    setSegmentData: function (data) {
      contentScope.flxListingContent.setVisibility(true);
      contentScope.flxLCDetails.setVisibility(false)
      if (data && data.length > 0) {
        contentScope.flxListingSegment.setVisibility(true);
        contentScope.flxPagination.setVisibility(true);
        contentScope.flxNoTransactions.setVisibility(false);
        contentScope.btnViewConsolidated.setVisibility(true)
        contentScope.flxSearch.width = breakpoint > 1024 ? '88%' : '80%';
      } else {
        contentScope.flxListingSegment.setVisibility(false);
        contentScope.flxPagination.setVisibility(false);
        contentScope.flxNoTransactions.setVisibility(true);
        contentScope.btnViewConsolidated.setVisibility(false)
        contentScope.flxSearch.width = '100%'
        return;
      }
      let segData = this.getSegmentData(data)
      this.previousIndex = undefined;
      contentScope.segTransactionList.setData(segData);
      const offset = contentScope.PaginationContainer.getPageOffset();
      if (offset === 0) {
        contentScope.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
      } else {
        contentScope.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
      }
      if (data.length > 10) {
        contentScope.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
      } else {
        contentScope.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
      }
      contentScope.PaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      contentScope.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
    },
    enableOrDisableSubmitButton: function () {
      if (contentScope.flxReasonForRejection.isVisible && !contentScope.txtReasonForRejection.text) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
      } else {
        FormControllerUtility.enableButton(contentScope.btnSubmit);
      }
    },
    showBeneficiaryConsentAck: function () {
      this.view.formTemplate12.pageTitle = `${kony.i18n.getLocalizedString("i18n.ImportLC.ExportLC")} - ${LCData.lcReferenceNo} - ${kony.i18n.getLocalizedString('i18n.wealth.acknowledgement')}`;
      this.view.formTemplate12.showBannerError({ i18n: kony.i18n.getLocalizedString('i18n.TradeFinance.yourBeneficiaryConsentHasBeenSubmittedSuccessfully') });
      titleActionScope.setVisibility(false);
      contentScope.flxBeneficiaryConsent.setVisibility(false);
      contentScope.btnBack.setVisibility(false);
      contentScope.btnSubmit.setVisibility(false);
      contentScope.btnViewAllExportLC.setVisibility(true);
      contentScope.btnCreateDrawing.setVisibility(false);
      contentScope.ExportLCDetails.setContext(JSON.parse(JSON.stringify(presenter.LCData)));
    }
  };
});