define(['FormControllerUtility', 'OLBConstants', 'CommonUtilities'], function (FormControllerUtility, OLBConstants, CommonUtilities) {
  let presenter,breakpoint;
  return {
    onNavigate: function (selectedRecord) {
      presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' });
      FormControllerUtility.hideProgressBar(this.view);
      let accounts = applicationManager.getConfigurationManager().userAccounts;
      let data = [];
      if (selectedRecord && selectedRecord.hasOwnProperty("contextData"))
        data["LetterOfCredit"] = selectedRecord.contextData;
      else
        data["LetterOfCredit"] = selectedRecord ? selectedRecord : undefined;
      data["DigitalArrangements"] = accounts;
      this.view.LCIssuance.setContext(data);
      this.view.CopyDetails.flxClose.onClick = this.toggleCopyDetailsPopup.bind(this, false);
      this.view.CopyDetails.btnClose.onClick = this.toggleCopyDetailsPopup.bind(this, false);
      this.view.CopyDetails.btnCopyDetails.onClick = this.copyDetails;
    },
    preShow: function () {
      var scope = this;
      scope.view.lblHeading.text = "Import LC - Create New Letter of Credit";
      scope.view.flxServiceResponse.isVisible = false;
      scope.view.customheadernew.forceCloseHamburger();
      scope.view.customheadernew.activateMenu("TradeFinance", "Imports");
      scope.view.LCIssuance.updateProgressBar = function (context) {
        scope.view.ProgressTracker.setData(context);
      };
      scope.view.LCIssuance.showServiceMessage = function (serviceResponse) {
        scope.checkServiceResponse(serviceResponse);
      };
      scope.view.LCIssuance.handleNavigation = function (context) {
        scope.handleNavigation(context);
      };
      scope.view.ProgressTracker.lblCoptyStatus.onTouchEnd = this.toggleCopyDetailsPopup.bind(this, true);
      scope.view.ProgressTracker.flxCopy.onClick = this.toggleCopyDetailsPopup.bind(this, true);
      scope.view.LCIssuance.setHeaderText = function (context) {
        scope.setHeaderText(context);
      };
      var data = [
        { "currentRow": true, "rowLabel": "Credit Details", "rowStatus": "Inprogress" },
        { "currentRow": false, "rowLabel": "Beneficiary Details", "rowStatus": "Incomplete" },
        { "currentRow": false, "rowLabel": "Shipment Details", "rowStatus": "Incomplete" },
        { "currentRow": false, "rowLabel": "Documents and Terms", "rowStatus": "Incomplete" },
        { "currentRow": false, "rowLabel": "Review & Submit", "rowStatus": "Incomplete" }
      ];
      data['showCopyDetails'] = true;
      scope.view.ProgressTracker.setData(data);
      this.view.flxCopyDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
    },
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    /**
       * updateFormUI - the entry point method for the form controller.
       * @param {Object} viewModel - it contains the set of view properties and keys.
       */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.LetterOfCredits) {
        if (this.view.flxCopyDetailsPopup.isVisible) {
          this.view.CopyDetails.setData(viewModel.LetterOfCredits, 'importLC');
        }
      }
      if (viewModel.serverError) {
        this.showErrorMessage({ dbpErrMsg: viewModel.serverError });
      }
    },
    setHeaderText: function (flowType) {
      var scope = this;
      if (flowType === "ReviewAndSubmit" && kony.application.getCurrentBreakpoint() !== 640)
        scope.view.lblHeading.text = "Import LC - Create New Letter of Credit - Review & Submit";
      else
        scope.view.lblHeading.text = "Import LC - Create New Letter of Credit";
      if (flowType === "Credit details" && kony.application.getCurrentBreakpoint() === 640) {
        scope.view.ProgressTracker.flxCopy.isVisible = true;
      }
      if (flowType === "Credit details" && kony.application.getCurrentBreakpoint() !== 640) {
        scope.view.ProgressTracker.lblCoptyStatus.isVisible = true;
      }
      scope.view.flxServiceResponse.isVisible = false;
    },
    checkServiceResponse: function (serviceResponse) {
      var scope = this;
      scope.view.imgServiceMessageClose.onTouchEnd = function () {
        scope.view.flxServiceResponse.isVisible = false;
      };
      scope.view.flxServiceResponse.isVisible = true;
      if (serviceResponse.saveMessage) {
        scope.view.imgServiceResponse.src = "success_green.png";
        scope.view.lblResponseMessage.text = serviceResponse.saveMessage;
      } else if (serviceResponse.clearMessage) {
        scope.view.imgServiceResponse.src = "success_green.png";
        scope.view.lblResponseMessage.text = serviceResponse.clearMessage;
      }
      else if (serviceResponse.errObjFail) {
        scope.view.imgServiceResponse.src = "error_yellow.png";
        scope.view.lblResponseMessage.text = serviceResponse.errObjFail;
      }
      else if (serviceResponse.errcode) {
        scope.view.imgServiceResponse.src = "close_red.png";
        scope.view.lblResponseMessage.text = "Unable to submit the Application. Please try Again.";
      }
    },
    handleNavigation: function (contextData) {
      var obj;
      if (!contextData) {
        obj = { "context": this, "callbackModelConfig": { "Dashboard": true } };
        kony.mvc.getNavigationManager().navigate(obj);
      } else {
        obj = { "context": this, "params": { contextData }, "callbackModelConfig": { "Acknowledgement": true } };
        kony.mvc.getNavigationManager().navigate(obj);
      }
    },
    toggleCopyDetailsPopup: function (visibility) {
      breakpoint = kony.application.getCurrentBreakpoint();
      this.view.flxCopyDetailsPopup.setVisibility(visibility);
      if (breakpoint > 640 && breakpoint <= 1024) {
        this.view.flxCopyDetailsContainer.width = "90%";
      } else if (breakpoint === 1366 || breakpoint === 1380) {
        this.view.flxCopyDetailsContainer.width = "65%";
      }
      if (visibility) {
        FormControllerUtility.disableButton(this.view.CopyDetails.btnCopyDetails);
        presenter.getImportLetterOfCredits({
          filterByParam: "status",
          filterByValue: OLBConstants.IMPORT_LC_STATUS.APPROVED || OLBConstants.IMPORT_LC_STATUS.CLOSED,
          sortByParam: "lcCreatedOn",
          sortOrder: "DESC"
        }, this.view.id);
      }
      this.view.forceLayout();
    },
    getSearchedRecords: function () {
      presenter.getImportLetterOfCredits({
        searchString: this.view.CopyDetails.txtSearchBox.text,
        filterByParam: "status",
        filterByValue: OLBConstants.IMPORT_LC_STATUS.APPROVED || OLBConstants.IMPORT_LC_STATUS.CLOSED,
        sortByParam: "lcCreatedOn",
        sortOrder: "DESC"
      }, this.view.id);
    },
    copyDetails: function () {
      let data = this.view.CopyDetails.getData();
      data['isCopyDetail'] = true;
      this.toggleCopyDetailsPopup(false);
      this.view.LCIssuance.setContext({ LetterOfCredit: data });
    },
  }
});