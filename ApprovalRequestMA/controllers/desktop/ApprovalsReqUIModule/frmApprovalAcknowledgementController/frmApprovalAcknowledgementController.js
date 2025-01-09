define("ApprovalRequestMA/ApprovalsReqUIModule/userfrmApprovalAcknowledgementController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  return {
    /** Global Variables **/
    ApprovalRequestsModule: null,
    ApprovalsReqUIModule: null,
    context: {},
    ACHAccountTypes: null,
    TaxTypes: null,
    dashboardSortParams: {},
    fetchParams: {},
    filterParams: {},
    activeTab: null,
    createUIType: null,
    accountId: '',
    isSingleCustomerProfile: true,
    primaryCustomerId: [],
    profileAccess: "",
    isSingleApprovalMode: false,
    /**
         * updateFormUI : Will be called by the navigate method, when current form is to be updated
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - with 2 values, Key and ResponseData
         * @return {}
         * @throws {}
         */
    updateFormUI: function(uiModel) {
      if (uiModel) {
        switch (uiModel.key) {
          case BBConstants.LOADING_INDICATOR:
            FormControllerUtility.showProgressBar(this.view);
            break;
          case BBConstants.DISMISS_LOADING_INDICATOR:
            FormControllerUtility.hideProgressBar(this.view);
            break;
          case BBConstants.GEN_TRANSACTION_VIEW_DETAILS:
            this.viewGeneralTransactionDetails(uiModel.responseData, true, false, false);
            break;
          case "_CREATE_RECEPIENT":
          case "_DELETE_RECEPIENT":
          case "_EDIT_RECEPIENT_OPTIONAL":
          case "_EDIT_RECEPIENT":
            this.viewReceipientTransactionDetails(uiModel.responseData);
            break;
          case BBConstants.ACH_FILE_VIEW_DETAILS:
            this.viewACHFileDetails(uiModel.responseData, true, false, false);
            break;
          case BBConstants.ACH_TRANSACTION_VIEW_DETAILS:
            this.viewACHTransactionDetails(uiModel.responseData, true, false, false);
            break;
          case BBConstants.REQUEST_HISTORY_SUCCESS:
            this.showRequestHistoryData(uiModel.responseData);
            break;
          case BBConstants.REQUEST_HISTORY_FAILURE:
            this.showRequestHistoryFailure();
            break;
          case BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP:
            this.showPendingApprovalData(uiModel.responseData);
            break;
          case BBConstants.REQUEST_HISTORY_FAILURE_SIGNATORYGROUP:
            this.showPendingApprovalFailure();
            break;
          case "achViewDetails":
            this.showUploadedFileApprovals(uiModel.responseData[0]);
            break;
          case "saving data":
            this.savingAckData(uiModel.responseData);
            break;
          case "initiator":
            this.initiator();
            break;
          case "ack":
            this.updateAck(uiModel.responseData);
            break;
          default:
            this.updateTheFormUI(uiModel);
            break;

            if (uiModel.campaignRes) {
              //                             this.campaignSuccess(uiModel.campaignRes);
            }
            //                         if (uiModel.campaignError) {
            //                             this.view.flxBannerContainerDesktop.setVisibility(false);
            //                             this.view.flxBannerContainerMobile.setVisibility(false);
            //                         }
            if (uiModel.transactionDownloadFile) {
              this.downloadAttachmentsFile(uiModel.transactionDownloadFile);
            }

        }
      }
    },
    /**
         *	This method is an extension to the updateFormUI.
         **/
    updateTheFormUI: function (uiModel) {
      switch (uiModel.key) {
        case BBConstants.SET_ACH_TEMPLATE_TYPES:
          this.setFetchtedTemplateTypes(uiModel.responseData);
          break;
        case BBConstants.SET_ACH_REQUEST_TYPES:
          this.setFetchedRequestTypes(uiModel.responseData);
          break;
        case BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS:
          this.setTransactionAccountsAndTheirLimits(uiModel.responseData);
          break;
        case BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_IN_EXECUTE_TEMPLATE_FLOW:
          this.setLimitForCurrentTemplateExecution(uiModel.responseData);
          break;
        case BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_FAILURE_IN_EXECUTE_TEMPLATE_FLOW:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.CREATE_TRANSACTION_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.CREATE_TEMPLATE_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.DELETE_TEMPLATE_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.TEMPLATE_EXECUTION_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.FETCH_TAX_SUBTYPE_FAILURE:
          this.toggleErrorMessage(uiModel.responseData.errorMessage, true, 66);
          break;
        case BBConstants.SET_ACH_ACCOUNT_TYPES:
          this.setACHAccounts(uiModel.responseData);
          break;
        case BBConstants.SET_TAX_TYPES:
          this.setTaxTypes(uiModel.responseData);
          break;
        case BBConstants.SET_SUBTAX_TYPES:
          this.setTaxSubTypes(uiModel.responseData);
          break;
        case BBConstants.FETCH_UPLOADED_ACH_FILE:
          this.fetchUploadedACHFile(uiModel.responseData);
          break;
        case BBConstants.UPLOAD_ACHFILE_FAILURE:
          this.uploadFailed(uiModel.responseData);
          break;
        case BBConstants.SHOW_UPLOADED_ACH_FILE:
          this.showUploadedFile(uiModel.responseData[0]);
          break;
        case BBConstants.SET_ACH_FILE_TYPES:
          this.setACHFileTypes(uiModel.responseData);
          break;
        case BBConstants.ACH_FILE_TYPES_FETCH_FAIL:
          this.setACHFileTypes([kony.i18n.getLocalizedString("i18n.konybb.common.NoData")]);
          break;
        case BBConstants.GEN_TRANSACTION_VIEW_DETAILS:
          this.viewGeneralTransactionDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData, uiModel.responseData.isHistory);
          break;
        case BBConstants.ACH_FILE_VIEW_DETAILS:
          this.viewACHFileDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData, uiModel.responseData.isHistory);
          break;
        case BBConstants.ACH_TRANSACTION_VIEW_DETAILS:
          this.viewACHTransactionDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData, uiModel.responseData.isHistory);
          break;
        case BBConstants.SERVICE_ERROR:
          this.showDownTimeMessage(uiModel.responseData);
          break;
        case BBConstants.REQUEST_HISTORY_SUCCESS:
          this.showRequestHistoryData(uiModel.responseData);
          break;
        case BBConstants.REQUEST_HISTORY_FAILURE:
          this.showRequestHistoryFailure();
          break;
        case BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP:
          this.showPendingApprovalData(uiModel.responseData);
          break;
        case BBConstants.REQUEST_HISTORY_FAILURE_SIGNATORYGROUP:
          this.showPendingApprovalFailure();
          break;
        case BBConstants.RENOTIFY_PENDING_APPROVERS_SUCCESS:
          this.reNotifySuccessCallback(uiModel.responseData);
          break;
        case BBConstants.RENOTIFY_PENDING_APPROVERS_FAILURE:
          this.reNotifyFailureCallback();
          break;
        case BBConstants.LOADING_INDICATOR:
          FormControllerUtility.showProgressBar(this.view);
          break;
        case BBConstants.DISMISS_LOADING_INDICATOR:
          FormControllerUtility.hideProgressBar(this.view);
          break;
        case BBConstants.CREATE_ACH_TEMPLATES:
          this.createACHTemplate(true);
          this.view.customheader.customhamburger.activateMenu("ACH", "Create a Template");
          break;
        case BBConstants.ACH_SET_ACH_TRANSACTIONS_PENDING_APPROVALS_DATA:
          var response = {};
          response.ACHTransactions = uiModel.responseData;
          this.updateApprovalsData(response, false);
          break;
        case BBConstants.ACH_SET_ACH_FILES_PENDING_APPROVALS_DATA:
          response = {};
          response.ACHFiles = uiModel.responseData;
          this.updateApprovalsData(response, false);
          break;
        case BBConstants.ACH_SET_ACH_TRANSACTIONS_REJECTED_DATA:
          response = {};
          response.ACHTransactions = uiModel.responseData;
          this.updateApprovalsData(response, true);
          break;
        case BBConstants.ACH_SET_ACH_FILES_REJECTED_DATA:
          response = {};
          response.ACHFiles = uiModel.responseData;
          this.updateApprovalsData(response, true);
          break;
        case "achViewDetails":
          this.showUploadedFileApprovals(uiModel.responseData[0]);
          break;
      }
      if (uiModel.campaignRes) {
        this.campaignSuccess(uiModel.campaignRes);
      }
      if (uiModel.campaignError) {
        //this.view.flxBannerContainerDesktop.setVisibility(false);
        //this.view.flxBannerContainerMobile.setVisibility(false);
      }
      if (uiModel.transactionDownloadFile) {
        this.downloadAttachmentsFile(uiModel.transactionDownloadFile);
      }
    },
    campaignSuccess: function (data) {
      var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
      CampaignManagementModule.presentationController.updateCampaignDetails(data);
      var self = this;
      if (data.length === 0) {
        this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
      } else {
        this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(true);
        this.view.dbRightContainerNew.imgBanner.src = data[0].imageURL;
        this.view.dbRightContainerNew.imgBanner.onTouchStart = function () {
          CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
        };
      }
      this.adjustScreen(50);
    },
    /**
         * onInit : onInit event Function for the form
         * @member of {frmApprovalAcknowledgementController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onInit: function() {
      FormControllerUtility.setRequestUrlConfig(this.view.browserTnC);
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.initBtnBack();
      this.initFlxBack();
      this.view.preShow = this.onPreShow;
      this.view.postShow = this.onPostShow;
      this.view.onBreakpointChange = function() {
        this.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }.bind(this);

    },
    /**
         * onPreShow :  onPreshow event Function for the form
         * @member of {frmApprovalAcknowledgementController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onPreShow: function() {
      kony.print("pre-show");
      this.executeTemplateData = null;
      this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
      this.view.customheader.forceCloseHamburger();
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));

      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxContentContainer', 'flxFooter', 'flxHeaderMain', 'flxMain', 'flxFormContent']);
      this.view.flxContentContainer.setVisibility(true);
      //this.toggleErrorMessage("", false, 0);
      //this.view.flxDowntimeWarning.setVisibility(false);
      //this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
      //this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
      var scopeObj = this;
      var break_point = kony.application.getCurrentBreakpoint();
      this.view.onBreakpointChange = function() {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      if (break_point === 640 || orientationHandler.isMobile) {
      } else {
        //this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(202);
      }
      if (break_point === 640 || orientationHandler.isMobile) {
      } else {
      }
      if (kony.application.getCurrentBreakpoint() <= 1024 || this.orientationHandler.isTablet) {
        this.view.customfooter.lblCopyright.left = "17.5%";
        this.view.customfooter.flxFooterMenu.left = "16%";
      } else if (kony.application.getCurrentBreakpoint() > 1024) {
        this.view.customfooter.lblCopyright.left = "6%";
        this.view.customfooter.flxFooterMenu.left = "6%";
      } else {
        this.view.customfooter.flxFooterMenu.width = "40%"
        if (kony.application.getCurrentBreakpoint() <= 1366 && kony.application.getCurrentBreakpoint() > 1024) {
          this.view.customfooter.lblCopyright.left = "10%";
          this.view.customfooter.flxFooterMenu.left = "10%";
        } else {
          this.view.customfooter.lblCopyright.left = "6%";
          this.view.customfooter.flxFooterMenu.left = "6%";
        }
      }
      //this.loadDashboard();
      //this.initializeDashboardSortParams();
      //this.initializeFetchParams();
      //this.initializeFilterParams();
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    getApprovalsModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
    },
    updateAck: function() {
      var scopeObj = this;
      this.roadMapStructure();
      var summaryData = this.getApprovalsModule().presentationController.getMultiApprovalAckData();

      var totalCount = summaryData.length;
      if(totalCount == 1){
        this.isSingleApprovalMode = true;
        this.singleApproval(summaryData);
      } else {
        this.isSingleApprovalMode = false;
        this.multiApproval(summaryData);
      }
      this.setAckDetails(summaryData);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    multiApproval: function (summaryData) {
      var breakPoint = kony.application.getCurrentBreakpoint();
      this.view.flxTransactionDetails.width = "100%";
      if (breakPoint === 640 || orientationHandler.isMobile) {
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        //this.view.flxContentContainerLeft.top="56dp";
        this.view.flxBackToPendingTop.isVisible = true;
        this.view.flxAcknowledgementMobile.setVisibility(false);
      }
      this.view.lblTotalRequestVal.text = summaryData.length.toString();
      var approvedcount = summaryData.filter(function (item) {
        return item.status == 'Approved';
      }).length
      this.view.lblTotalApprovedVal.text = approvedcount.toString();
      this.view.flxTotalApproved.setVisibility(approvedcount > 0);
      var rejectedcount = summaryData.filter(function (item) {
        return item.status == 'Rejected';
      }).length
      this.view.lblTotalRejectedVal.text = rejectedcount.toString();
      this.view.flxTotalRejected.setVisibility(rejectedcount > 0);
      var skippedcount = summaryData.filter(function (item) {
        return item.status == 'Skipped';
      }).length
      this.view.lblSkippedVal.text = skippedcount.toString();
      this.view.flxSkipped.setVisibility(skippedcount > 0);
      this.view.flxAcknowledgementContainer.setVisibility(false);
      this.view.flxSummary.setVisibility(true);
      this.view.flxContentContainerRight.setVisibility(true);
    },
    singleApproval: function (summaryData) {
      var breakPoint = kony.application.getCurrentBreakpoint();
      var statusVal = summaryData.map(function (item) {
        return item.status;
      })

      if (breakPoint === 640 || orientationHandler.isMobile) {
        this.view.flxAcknowledgementMobile.isVisible = true;
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
        this.view.flxAcknowledgementContainer.isVisible = false;
        this.view.flxBackToPendingTop.isVisible = false;
        if (statusVal == "Approved") {
          this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullyApproved.");
          this.view.lblRequestIdValue.text = summaryData[0].referenceId.toString();
        } else if (statusVal == "Rejected") {
          this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullyRejected.");
          this.view.lblRequestIdValue.text = summaryData[0].referenceId.toString();
        } else {
          this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullySkipped.");
          this.view.lblRequestIdValue.text = summaryData[0].referenceId.toString();
        }
      }
      else {
        this.view.flxAcknowledgementNew.lblRefrenceId.isVisible = true;
        this.view.flxAcknowledgementNew.lblRefrenceId.text = kony.i18n.getLocalizedString("i18n.CardManagement.requestId") + ":  " + summaryData[0].requestId;
        this.view.flxAcknowledgementNew.rTextSuccess.top = "37dp";
        this.view.flxAcknowledgementContainer.isVisible = true;
        if (statusVal == "Approved") {
          this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullyApproved.");
        } else if (statusVal == "Rejected") {
          this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullyRejected.");
        } else {
          this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.ApprovalRequests.SuccessfullySkipped");
        }
      }
      this.view.flxSummary.isVisible = false;
      this.view.flxContentContainerRight.isVisible = false;
      this.view.flxContentContainerLeft.left = (breakPoint == "1024") ? "1.5%" : (breakPoint == "640") ? "3%" : "19%";
      this.view.flxButton.left = (breakPoint == "1024") ? "67%" : (breakPoint == "640") ? "1%" : "689dp";
      this.view.flxTransactionDetails.width = (breakPoint == "1024") ? "100%" : (breakPoint == "640") ? "1%" : "144%";
      if (breakPoint == 1024) {
        this.view.flxContentContainerLeft.width = "97%";
        this.view.flxAcknowledgementNew.rTextSuccess.top = "23dp";
        this.view.flxAcknowledgementNew.rTextSuccess.height = "28dp";
        this.view.flxAcknowledgementNew.lblRefrenceId.top = "43dp";
        this.view.flxAcknowledgementNew.lblRefrenceId.top = "82dp";
      }

    },
    setAckDetails: function (requestsData) {
      var dataMap = {
        "lblReqSum": "lblReqSum",
        "lblStatusValue": "lblStatusValue",
        "lblFromValue": "lblFromValue",
        "imgStatus": "imgStatus",
        "lblBeneficiaryValue": "lblBeneficiaryValue",
        "lblAccNumValue": "lblAccNumValue",
        "lblAmountValue": "lblAmountValue",
        "lblTransactionValue": "lblTransactionValue",
        "lblReferenceIdValue": "lblReferenceIdValue",
        "flxStatus": "flxStatus",
        "flxFrom": "flxFrom",
        "flxBeneficary": "flxBeneficary",
        "flxAccNum": "flxAccNum",
        "flxAmount": "flxAmount",
        "flxTransactionType": "flxTransactionType",
        "flxReferenceId": "flxReferenceId",
        "flxViewDetails": "flxViewDetails",
        "lblFrom": "lblFrom",
        "lblReferenceId": "lblReferenceId",
        "flxBeneficiary": "flxBeneficiary"
      };
      this.view.segTransactionDetails.widgetDataMap = dataMap;
      var defaultValues = [];
      var count = 0;

      requestsData.forEach((item) => {
        count++;
        var isReceipient = false;
        if (item.status === "Approved" || item.status === "Rejected") {
          if (item.featureActionId.includes("_CREATE_RECEPIENT")) {
            isReceipient = true;
          } else if (item.featureActionId.includes("_DELETE_RECEPIENT")) {
            isReceipient = true;
          } else if (item.featureActionId.includes("_EDIT_RECEPIENT_OPTIONAL")) {
            isReceipient = true;
          } else if (item.featureActionId.includes("_EDIT_RECEPIENT")) {
            isReceipient = true;
          }
          if (!isReceipient) {
            defaultValues.push({
              "lblReqSum": kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + (this.isSingleApprovalMode ? "" : count) + " " + kony.i18n.getLocalizedString("i18n.payments.summary"),
              "imgStatus": item.status === "Approved" ? "success.png" : item.status === "Rejected" ? "close_red.png" : "",
              "lblStatusValue": item.status,
              "lblFromValue": item.from,
              "lblBeneficiaryValue": item.beneficiary,
              "lblAmountValue": CommonUtilities.formatCurrencyWithCommas(item.amount, false, item.transactionCurrency),
              "lblAccNumValue": item.accountNumber,
              "lblTransactionValue": item.transactionType,
              "lblReferenceIdValue": item.referenceId,
              "flxViewDetails": {
                "onClick": function (eventobject, context) {
                  this.setDataViewDetails(item.requestId, item.featureActionId);
                }.bind(this)
              }
            });
          } else {
            var name = "";
            switch (item.featureActionId) {
              case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT':
                name = "International Transfer - Create Beneficiary";
                break;
              case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT':
                name = "Domestic Transfer - Create Beneficiary";
                break;
              case 'INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT':
                name = "Same Bank Transfer - Create Beneficiary";
                break;
              case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT':
                name = "International Transfer - Delete Beneficiary";
                break;
              case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT':
                name = "International Transfer - Edit Beneficiary";
                break;
              case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                name = "International Transfer - Edit Recipient Linkage";
                break;
              case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                name = "International Transfer - Edit Recipient Optional Fields";
                break;
              case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT':
                name = "Domestic Transfer - Delete Beneficiary";
                break;
              case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT':
                name = "Domestic Transfer - Edit Beneficiary";
                break;
              case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                name = "Domestic Transfer - Edit Recipient Linkage";
                break;
              case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                name = "Domestic Transfer - Edit Recipient Optional Fields";
                break;
              case 'INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT':
                name = "Domestic Transfer - Delete Beneficiary";
                break;
              case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT':
                name = "Domestic Transfer - Edit Beneficiary";
                break;
              case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                name = "Domestic Transfer - Edit Recipient Linkage";
                break;
              case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                name = "Domestic Transfer - Edit Recipient Optional Fields";
                break;
            }
            defaultValues.push({
              "lblReqSum": kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + (this.isSingleApprovalMode ? "" : count) + " " + kony.i18n.getLocalizedString("i18n.payments.summary"),
              "imgStatus": item.status === "Approved" ? "success.png" : item.status === "Rejected" ? "close_red.png" : "aa_password_error.png",
              "lblStatusValue": item.status,
              "lblFrom": "Request Type:",
              "lblFromValue": name + " ",
              "lblReferenceId": "Requested By:",
              "lblReferenceIdValue": item.whosentit,
              "flxAccNum": { isVisible: false },
              "flxAmount": { isVisible: false },
              "flxTransactionType": { isVisible: false },
              "flxBeneficiary": { isVisible: false },
              "flxViewDetails": {
                "onClick": function (eventobject, context) {
                  this.setDataViewDetails(item.referenceId, item.featureActionId,item.userContractsData);
                }.bind(this)
              }
            });
          }
        }
      });
      this.view.segTransactionDetails.setData(defaultValues);
      this.view.segTransactionDetailsMobile.setData(defaultValues);
      this.view.forceLayout();
    },

    setDataViewDetails: function (reqId, actionId,userContractsData) {
      var selectedData = this.getApprovalsModule().presentationController.getSelectedData();
      var index = -1;
      for (var i = 0; i < selectedData.length; i++) {
        if (selectedData[i].requestId == reqId) {
          index = i;
          break;
        }
      }
      var selectedRequest = selectedData[index];
      var transactionType = actionId;
      var transaction= "";
      if (transactionType === "ACH_PAYMENT_CREATE" || transactionType === "ACH_COLLECTION_CREATE") {
        transaction = BBConstants.ACH_TRANSACTION_VIEW_DETAILS;
      } else if (transactionType === "ACH_FILE_UPLOAD") {
        transaction = BBConstants.ACH_FILE_VIEW_DETAILS;
      } else if (transactionType === "BULK_PAYMENT_FILES_SINGLE_UPLOAD_CSV" || transactionType === "BULK_PAYMENT_SINGLE_SUBMIT" || transactionType === "BULK_PAYMENT_MULTIPLE_SUBMIT") {
        this.navigateToviewDetails(eventobject, context);
      } else if (transactionType.includes("_CREATE_RECEPIENT")) {
        transaction = "_CREATE_RECEPIENT";
        selectedRequest["userContractsData"] = userContractsData;
      } else if (transactionType.includes("_DELETE_RECEPIENT")) {
        transaction = "_DELETE_RECEPIENT";
        selectedRequest["userContractsData"] = userContractsData;
      } else if (transactionType.includes("_EDIT_RECEPIENT_OPTIONAL")) {
        transaction = "_EDIT_RECEPIENT_OPTIONAL";
        selectedRequest["userContractsData"] = userContractsData;
      } else if (transactionType.includes("_EDIT_RECEPIENT")) {
        transaction = "_EDIT_RECEPIENT";
        selectedRequest["userContractsData"] = userContractsData;
      } else {
        transaction = BBConstants.GEN_TRANSACTION_VIEW_DETAILS;
      }
      var navObj = {
        requestData: selectedRequest,
        onSuccess: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: transaction,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      this.view.flxAckPopup.isVisible = true;
      this.view.ApprovalViewDetails.flxButtons.isVisible = false;
      this.view.ApprovalViewDetails.btnPendingApprovers.isVisible = false;
      this.view.ApprovalViewDetails.flxClose.onClick = this.hidePopup;
      var isBenfFeature = ["_CREATE_RECEPIENT", "_DELETE_RECEPIENT", "_EDIT_RECEPIENT_OPTIONAL", "_EDIT_RECEPIENT"].includes(transaction);
      this.view.ApprovalViewDetails.flxBeneficiaryDetails.setVisibility(isBenfFeature);
    },

    hidePopup: function () {
      var summaryData = this.getApprovalsModule().presentationController.getMultiApprovalAckData();

      orientationHandler.onOrientationChange(this.onBreakpointChange);
      this.view.flxAckPopup.isVisible = false;
      var breakPoint = kony.application.getCurrentBreakpoint();
      if (breakPoint === 640 || orientationHandler.isMobile) {
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.flxTransactionDetails.isVisible = false;
      }
      if (this.isSingleApprovalMode) {
        this.singleApproval(summaryData);
      }
      this.view.forceLayout();
    },

    initBtnBack: function () {
      var scopeObj = this;
      this.view.btnBackToPending.text = kony.i18n.getLocalizedString("kony.approval.backToPending");
      this.view.btnBackToPending.onClick = function () {
        this.getApprovalsModule().presentationController.clearMultiApprovalData();
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SERVICE_ERROR,
              responseData: {}
            }
          }
        };
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule"),
          this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj)
      }.bind(this)
    },

    initFlxBack: function () {
      var scopeObj = this;
      this.view.lblBackToPendingTop.text = kony.i18n.getLocalizedString("kony.approval.backToPending");
      this.view.flxBackToPendingTop.onClick = function () {
        this.getApprovalsModule().presentationController.clearMultiApprovalData();
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SERVICE_ERROR,
              responseData: {}
            }
          }
        };
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule"),
          this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj)
      }.bind(this)
    },
    /**
         * viewGeneralTransactionDetails : This method is called inorder to show general Transaction Details Pending for Approval
         * @member of {frmApprovalAcknowledgementController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewGeneralTransactionDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {
      this.selectedRowData = selectedRowData;
      //selectedRowData.Payee = selectedRowData.Payee.toolTip;
      this.view.flxOverlay.setVisibility(false);
      //this.view.flxPendingApprovers.setVisibility(false);
      this.view.ApprovalViewDetails.lblApprovalStatusValue.text = selectedRowData.status;
      this.view.ApprovalViewDetails.lblApproveCountVal.text = selectedRowData.receivedApprovals;
      // scope.view.btnClose.onClick = function() {
      //     scope.view.flxOverlay.setVisibility(false);
      // }

      selectedRowData.DebitOrCreditAccount = selectedRowData.customerName + selectedRowData.accountID;
      selectedRowData.CreatedOn = selectedRowData.sentDate;
      selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.view.ApprovalViewDetails.flxApprovalDetailsStatus.setVisibility(true);
      this.view.ApprovalViewDetails.flxApprovedCountDetails.setVisibility(true);

      this.generalTransactionsAcknowledgement(selectedRowData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-60);
    },

    /**
         * viewACHTransactionDetails : This method is called inorder to show ACH Transaction Details Pending for Approval
         * @member of {frmApprovalAcknowledgementController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHTransactionDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {


      if (!isApprovalData && !isRequestData) {
        selectedRowData.transactionTypeValue = selectedRowData.templateType;
      } else {
        //Data Mapping is Not Required
      }

      if (isApprovalData) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (isRequestData) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));
      }
      this.view.ApprovalViewDetails.lblApproveCountVal.text = this.getPendingApprovalsCount(selectedRowData);
      selectedRowData.Approver = selectedRowData.Approval;
      this.achTransactionViewDetailsApprove(selectedRowData);

      this.setupUIForACK("");
      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.forceLayout();
      this.adjustScreen(50);
      FormControllerUtility.hideProgressBar(this.view);
    },

    /**
         * viewACHFileDetails : This method is called inorder to show ACH File Details Pending for Approval
         * @member of {frmApprovalAcknowledgementController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHFileDetails: function(selectedRowData, isApprovalData, isRequestData, ishistory) {
      if (isApprovalData) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (isRequestData) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));
      } else {
        //No need of variable change
      }
      this.fetchUploadedACHFileApprovals(selectedRowData.transactionId);
      //this.achFileViewDetails(selectedRowData);
      this.achFileViewDetailsApprovals(selectedRowData);

      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.forceLayout();
      this.adjustScreen(0);
      FormControllerUtility.hideProgressBar(this.view);
    },

    onPostShow: function() {
      var scopeObj = this;
      kony.print("post-show");
      applicationManager.getNavigationManager().applyUpdates(this);
      scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      if (kony.application.getCurrentBreakpoint() <= 640) {
        this.view.ApprovalViewDetails.flxApprovalStatus.height = "100dp";
      }
      //this.accessibilityFocusSetup();
      this.adjustScreen(0);
    },

    /**
         * generalTransactionsAcknowledgement : function to show Ack screen for General Transactions When Approved/ Rejected/ Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} context - data of the general transaction
         * @return {}
         * @throws {}
         */
    generalTransactionsAcknowledgement: function(context, formName, contextKey) {
      this.context = context;
      this.showACKForOtherTransactions(this.context);
    
    },
    /**
         funciton to show acknowledgement page for Transactions
       **/
    showACKForOtherTransactions: function(transactionData) {
      this.setupUIForACK("");
      if (!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && transactionData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE) {
        var formattedData = {};
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.RequestAccount")] = transactionData.accountId;
        formattedData[kony.i18n.getLocalizedString("i18n.accounts.TransactionType")] = transactionData.featureActionName;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.NoOfBooks")] = transactionData.noOfBooks;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee")] = transactionData.amount;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentDate")] = transactionData.sentDate;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentBy")] = transactionData.sentBy;
        formattedData[kony.i18n.getLocalizedString("i18n.CardManagement.requestId")] = transactionData.transactionId;
        formattedData[kony.i18n.getLocalizedString("i18n.accountDetail.customerName")] = transactionData.customerName;
        this.view.ApprovalViewDetails.setData(formattedData, true);
      } else {
        var formattedData = {};
        formattedData[kony.i18n.getLocalizedString("i18n.wealth.datePicker.from")] = transactionData.accountId || transactionData.DebitOrCreditAccount;

        if (!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)) {
          formattedData[kony.i18n.getLocalizedString("kony.i18n.common.beneficiary")] = transactionData.beneficiaryName;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.common.accountNumber")] = transactionData.payee || transactionData.Payee || transactionData.accountId;

        if (!kony.sdk.isNullOrUndefined(transactionData.paymentType) && !kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT) && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)) {
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod")] = transactionData.paymentType;
        }

        if (!kony.sdk.isNullOrUndefined(transactionData.swiftCode) && transactionData.swiftCode.length > 0) {
          formattedData[kony.i18n.getLocalizedString("i18n.accounts.swiftCode")] = transactionData.swiftCode;
        }

        if (!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT) && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)) {
          formattedData[kony.i18n.getLocalizedString("i18n.transfers.bankAddress")] = transactionData.beneficiaryBankAddress;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = CommonUtilities.formatCurrencyWithCommas(transactionData.transactionAmount, false, transactionData.transactionCurrency);

        //                 if ((transactionData.lblExchangeRateVal.isVisible)) {
        //                     formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate")] = transactionData.lblExchangeRateVal;
        //                 }

        //                 if (transactionData.lblServiceChargeVal.isVisible) {
        //                     formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeeBreakdown")] = transactionData.lblServiceChargeVal;
        //                 }

        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt")] = CommonUtilities.formatCurrencyWithCommas(transactionData.amount, false, transactionData.fromAccountCurrency) || CommonUtilities.formatCurrencyWithCommas(transactionData.amount, false);

        if (!kony.sdk.isNullOrUndefined(transactionData.paidBy) && !kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT) && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)) {
          if(kony.sdk.isNullOrUndefined(transactionData.paidBy)){
            formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy")] = transactionData.payee;
          }else{
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy")] = transactionData.paidBy;}
        }

        formattedData[kony.i18n.getLocalizedString("i18n.transfers.lblFrequency")] = transactionData.frequency;
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.SendOn")] = transactionData.processingDate || transactionData.TransactionDate;

        //                 if (transactionData.lblCreditValueDateVal.isVisible && transactionData.frequency === kony.i18n.getLocalizedString("i18n.transfers.frequency.once")) {
        //                     formattedData[kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate")] = transactionData.lblCreditValueDateVal;
        //                 }

        if (transactionData.Frequency !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once")) {
          if (kony.sdk.isNullOrUndefined(transactionData.frequencyEndDate)) {
            formattedData[kony.i18n.getLocalizedString("i18n.transfers.end_date")] = "-";
          } else {
            formattedData[kony.i18n.getLocalizedString("i18n.transfers.end_date")] = transactionData.frequencyEndDate;
          }
        }
        // if(kony.sdk.isNullOrUndefined(transactionData.paymentDetails)){
        //   formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails")] = "-";
        // }
        // else {
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails")] = transactionData.confirmationNumber;
        // }
        // if(kony.sdk.isNullOrUndefined(transactionData.beneficiaryNickName)){
        //   formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryNickname")] = "-";
        // }
        // else {
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryNickname")] = transactionData.beneficiaryName;
        //}

        if (!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)) {
          if (kony.sdk.isNullOrUndefined(transactionData.beneficiaryAddress)) {
            formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryAddress")] = "-";
          }
          else {
            formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryAddress")] = transactionData.beneficiaryAddress;
          }
        }

        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference")] = transactionData.confirmationNumberVal || transactionData.confirmationNumber || transactionData.transactionIdVal || transactionData.Transaction_id;
        formattedData[kony.i18n.getLocalizedString("i18n.accounts.TransactionType")] = transactionData.featureName;
        formattedData[kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")] = transactionData.requestId;
        formattedData[kony.i18n.getLocalizedString("i18n.accountDetail.customerName")] = transactionData.customerName;

        this.view.ApprovalViewDetails.setData(formattedData, true);

        if (Array.isArray(transactionData.fileNames) && transactionData.fileNames.length > 0) {
          for (var i = 0; i < transactionData.fileNames.length; i++) {
            var obj = {
              "fileId": transactionData.fileNames[i].fileId,
              "fileNameValue": transactionData.fileNames[i].fileNameValue
            };
            this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
            var lblSupportingDocumentName = new kony.ui.Label({
              "id": "lblSupportingDocumentName" + i,
              "isVisible": true,
              "left": "1%",
              "skin": "sknLabelSSP42424215pxBorder",
              "zIndex": 1,
              "top": "3px",
              "text": transactionData.fileNames[i].fileNameValue,
              "onTouchEnd": this.ApprovalRequestsModule.presentationController.downloadAttachments.bind(this, true, obj, null, "frmApprovalViewDetails")
            }, {
              "contentAlignment": constants.CONTENT_ALIGN_CENTER,
              "padding": [2, 0, 2, 0],
              "paddingInPixel": false
            }, {});
          }
        } else {

        }
      }

      if (kony.sdk.isNullOrUndefined(transactionData.requestId)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(transactionData.requestId);
      }
      this.view.forceLayout();
      this.adjustScreen(20);
    },

    achFileViewDetailsApprovals: function(data) {
      FormControllerUtility.showProgressBar(this.view);
      this.achData = data;
      var fileACKData = {
        "File Name": data.FileName,
        "Status": data.status,
        "Uploaded by": data.sentBy,
        "Upload date": data.TransactionDate,
        "Total Debit Amount": data.amount,
        "Total Credit Amount": data.TotalCreditAmount,
        "Number of Debits": data.numberOfDebits,
        "Number of Credits": data.numberOfCredits,
        "Number of Prenotes": data.numberOfPrenotes,
        "Number of Records": data.numberOfRecords
      };

      // this.view.lblFormatTypeValue.text = data.fileType;
      // this.view.lblRequestTypeValue.text = data.requestType;
      // this.view.lblFileNameAck.text = data.FileName;

      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      //this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
      " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      if (kony.sdk.isNullOrUndefined(data.requestId) || kony.sdk.isEmptyObject(data.requestId)) {
        this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      } else {
        this.view.ApprovalViewDetails.lblApprovalStatusValue.text = data.Approver;
        this.fetchRequestHistoryData(data.requestId);
      }
      // this.view.ApprovalFormActions.btnBack.isVisible = true;
      // this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      // this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
      // this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
      //   "key": BBConstants.SHOW_ACH_FILES_TAB
      // });
      this.fetchFileRecords({
        "achFileId": data.transactionId // need to check
      });
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    /**
     * setupUIForACK : set the UI to show the Acknowledgement/Details Screen for the Templates or Transactions or Approvals
     * @member of {frmApprovalAcknowledgementController}
     * @param {string} successMsg - value of the Success Message to be displayed on the Title of the screen
     * @return {}
     * @throws {}
     */
    setupUIForACK: function(successMsg, isNonAcknowledgment) {
      this.view.flxTerms.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxTransactionDetails.isVisible = true;
      // if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
      //     if (!kony.sdk.isNullOrUndefined(isNonAcknowledgment) && isNonAcknowledgment) {
      //         this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
      //     } else {
      //         this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      //     }
      //     this.view.customheader.lblHeaderMobile.isVisible = true;
      // } else {
      //     this.view.customheader.lblHeaderMobile.isVisible = false;
      // }
      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.isVisible = true;
      //this.view.ApprovalViewDetails.flxError.setVisibility(false);
    },

    fetchRequestHistoryData: function(requestId) {
      var navObj = {
        requestData: {
          "Request_id": requestId
        },
        onSuccess: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_FAILURE,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getRequestsHistory(navObj);
    },
    showRequestHistoryData: function (segRowData) {
      var segRowViewData = [], rowDataArr = [];
      this.view.ApprovalViewDetails.flxApprovalHistoryContent.isVisible = true;
      this.view.ApprovalViewDetails.flxApprovalsHistoryErrorMessage = false;
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (breakpoint === 640 || orientationHandler.isMobile) {
        var dataMap = {
          "flxApprovalHsitoryInformation": "flxApprovalHsitoryInformation",
          "imgDropdown": "imgDropdown",
          "flxDropDown":"flxDropDown",
          "flxApprovalsHistoryHeader": "flxApprovalsHistoryHeader",
          "flxHistoryInforamtion": "flxHistoryInforamtion",
          "flxSeparatorBottom":"flxSeparatorBottom",
          "flxBottomSeparatorApprovalRow":"flxBottomSeparatorApprovalRow",
          //  "flxApprovalsInformationMain": "flxApprovalsInformationMain",
          "lblApprovetypeval": "userName",
          "lblSentByVal": "Action",
          "lblApprovalInformationDate": "lblApprovalInformationDate",
          "lblApprovalInformationComments": "lblApprovalInformationComments",
          "lblApprovalInformationDateVal": "lblApprovalInformationDateVal",
          "lblApprovalInformationCommentsVal": "lblApprovalInformationCommentsVal",
        };
        this.view.segApprovalDetails.rowTemplate = "flxApprovalHsitoryInformation";
        this.view.segApprovalDetails.sectionHeaderTemplate = "flxempty";
        if (segRowData.length === 0) {
          rowDataArr = [{
            "lblNoRecords": {
              text: kony.i18n.getLocalizedString("konybb.i18n.requestHistory.NoRecordsFound")
            },
            "flxNoRecords": {
              isVisible: true,
              height: "51dp"
            }
          }];
          this.view.flxApprovalStatus.isVisible = false;
        } else {
          rowDataArr = segRowData.map(function (record) {
            var skinValue = (breakpoint === 640 || orientationHandler.isMobile) ? "sknLblSSP42424213px" : "bbSknLbl424242SSP15Px";
            var actiontsValue = (kony.sdk.isNullOrUndefined(record.Actionts)) ? "N/A" : CommonUtilities.getDateAndTimeInUTC(record.Actionts);
            var userNameValue = (kony.sdk.isNullOrUndefined(record.userName)) ? "N/A" : record.userName;
            if (record.Action === "Approved") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.ApprovedRequest");
            } else if (record.Action === "Pending") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.createdRequest");
            }
            var actionValue = (kony.sdk.isNullOrUndefined(record.Action)) ? "N/A" : record.Action;
            //  var status = record.Status === "Rejected" ? false : true; // set status as true if it is not rejected. || status
            var commentsValue = (kony.sdk.isNullOrUndefined(record.Comments)) ? "N/A" : record.Comments;

            record.flxHistoryInforamtion ={"isVisible": false};
            record.lblApprovalInformationDateVal = {
              "text": actiontsValue,
              "skin": skinValue,
            };
            record.Action = {
              "text": actionValue,
              "skin": skinValue,
            };
            record.userName = {
              "text": userNameValue,
              "skin": skinValue
            };
            record.lblApprovalInformationCommentsVal = {
              "text": commentsValue,
              "skin": skinValue,
            };
            record.lblApprovalInformationDate = {
              "text": kony.i18n.getLocalizedString("i18n.konybb.common.dateAndTime"),
            };
            record.lblApprovalInformationComments = {
              "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.comments"),
            };

            record.imgDropdown = {
              text: "O",
              skin: "sknLblFontTypeIcon1a98ff12pxOther"
            };
            record.flxDropDown = {"onClick": scopeObj.expandCollapseRowMobile};
            record.flxApprovalsHistoryHeader = {
              skin: "slFboxffffff"
            };
            return record;

          }).filter(function(rec){ return rec.Status !== "Approval Pending";});
          var segDataModel = [
            [{}, rowDataArr]
          ];
          this.view.ApprovalViewDetails.segApprovalDetails.widgetDataMap = dataMap;
          this.view.ApprovalViewDetails.segApprovalDetails.setData(segDataModel);
        }
      } else {
        var signatoryVisiblility = false;
        if (!(kony.sdk.isNullOrUndefined(this.selectedRowData))) {
          if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
            signatoryVisiblility = true;
          } else {
            signatoryVisiblility = false;
          }
        }
        if (!(kony.sdk.isNullOrUndefined(this.achData))) {
          if (this.achData.isGroupMatrix === "true" || this.achData.isGroupMatrix === true) {
            signatoryVisiblility = true;
          } else {
            signatoryVisiblility = false;
          }
        }
        var segHeader = {
          "lblUserIDKey": {
            "text": kony.i18n.getLocalizedString("kony.i18n.common.user")
          },
          "lblSignatoryGroupKey": {
            "text": kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup"),
            "isVisible": signatoryVisiblility,
            "left": (signatoryVisiblility === true) ? "9%" : "11%"
            //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "75%" : "68%"
          },
          "lblActionKey": {
            "text": kony.i18n.getLocalizedString("i18n.common.status"),
            "left": (signatoryVisiblility === true) ? "6%" : "11%"
          },
          "lblDateAndTimeKey": {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.dateAndTime"),
            "left": (signatoryVisiblility === true) ? "7%" : "6%"
            //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "60%" : "50%"
          },
          "lblCommentsKey": {
            "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.comments"),
            //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "73%"
            //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "75%" : "68%"
          },
        };
        if (segRowData.length === 0) {
          segRowData = [{
            "lblNoRecords": {
              text: kony.i18n.getLocalizedString("konybb.i18n.requestHistory.NoRecordsFound")
            },
            "flxNoRecords": {
              isVisible: true,
              height: "51dp"
            }
          }];
          this.view.ApprovalViewDetails.flxApprovalStatus.isVisible = false;
        } else {
          var signatoryColumnVisibility = false;
          if (!kony.sdk.isNullOrUndefined(this.selectedRowData)) {
            if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
              var signatoryColumnVisibility = true;
            } else {
              signatoryColumnVisibility = false;
            }
          }
          if (!kony.sdk.isNullOrUndefined(this.achData)) {
            if (this.achData.isGroupMatrix === "true" || this.achData.isGroupMatrix === true) {
              signatoryColumnVisibility = true;
            } else {
              signatoryColumnVisibility = false;
            }
          }
          if (segRowData[segRowData.length - 1].Status === "Approval Pending")
            this.view.ApprovalViewDetails.lblApprovalStatusValue.text = kony.i18n.getLocalizedString("i18n.accounts.pending");
          else {
            this.view.ApprovalViewDetails.lblApprovalStatusValue.text = segRowData[segRowData.length - 1].Status;
            // if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
            //     this.view.btnPendingAprrovers.setVisibility(false);
            // }
          }
          // var break_point = kony.application.getCurrentBreakpoint();
          // if (break_point === 640 || orientationHandler.isMobile) {
          //     this.view.btnPendingAprrovers.setVisibility(false);
          // }
          segRowData.forEach(function (record) {
            var skinValue = (breakpoint === 640 || orientationHandler.isMobile) ? "sknLblSSP42424213px" : "bbSknLbl424242SSP15Px";
            var actiontsValue = (kony.sdk.isNullOrUndefined(record.Actionts)) ? "N/A" : CommonUtilities.getDateAndTimeInUTC(record.Actionts);
            var userNameValue = (kony.sdk.isNullOrUndefined(record.userName)) ? "N/A" : record.userName;
            if (record.Action === "Approved") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.ApprovedRequest");
            } else if (record.Action === "Pending") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.createdRequest");
            } else if (record.Action === "Rejected") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected");
            } else if (record.Action === "Withdrawn") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
            }
            var actionValue = (kony.sdk.isNullOrUndefined(record.Action)) ? "N/A" : record.Action;
            //  var status = record.Status === "Rejected" ? false : true; // set status as true if it is not rejected. || status
            var commentsValue = (kony.sdk.isNullOrUndefined(record.Comments)) ? "N/A" : record.Comments;
            if (record.groupName !== undefined) {
              var signatoryGroupValue = record.groupName;
            } else {
              signatoryGroupValue = "N/A";
            }
            //var signatoryGroupValue = (kony.sdk.isNullOrUndefined(record.groupName)) ? "N/A" : record.SignatoryGroup;
            record.Actionts = {
              "text": actiontsValue,
              "skin": skinValue,
              //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "50%" : "50%"
            };
            record.Action = {
              "text": actionValue,
              "skin": skinValue,
              //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "75%" : "68%"
            };
            record.userName = {
              "text": userNameValue,
              "skin": skinValue
            };
            record.Comments = {
              "text": commentsValue,
              "skin": skinValue,
              //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "73%"
            };
            record.SignatoryGroup = {
              "text": signatoryGroupValue,
              "skin": skinValue,
              "isVisible": signatoryColumnVisibility
              //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "73%"
            };
          });
          this.view.ApprovalViewDetails.flxApprovalStatus.isVisible = true;
        }
        var dataMap = {
          "lblDateAndTimeKey": "lblDateAndTimeKey",
          "lblCommentsKey": "lblCommentsKey",
          "lblComments": "Comments",
          "lblUserIDKey": "lblUserIDKey",
          "lblDateAndTime": "Actionts",
          "lblUserID": "userName",
          "lblAction": "Action",
          "lblActionKey": "lblActionKey",
          "lblSignatoryGroup": "SignatoryGroup",
          "lblSignatoryGroupKey": "lblSignatoryGroupKey",
          "flxNoRecords": "flxNoRecords",
          "lblNoRecords": "lblNoRecords"
        };
        var segRowViewData = [];
        for (var i = 0; i < segRowData.length; i++) {
          if (segRowData[i].Status !== "Approval Pending") {
            segRowViewData.push(segRowData[i])
          }
        }
        var segDataModel = [
          [segHeader, segRowViewData]
        ];
        this.view.ApprovalViewDetails.segApprovalDetails.widgetDataMap = dataMap;
        this.view.ApprovalViewDetails.segApprovalDetails.setData(segDataModel);

        var createdByData = "-";
                try {
                    for (let i = 0; i < segRowData.length; i++) {
                        if (!kony.sdk.isNullOrUndefined(segRowData[i])) {
                            if (!kony.sdk.isNullOrUndefined(segRowData[i]["Comments"])) {
                                if (!kony.sdk.isNullOrUndefined(segRowData[i]["Comments"]["text"])) {
                                    if (segRowData[i]["Comments"]["text"] == "Request Created") {
                                        if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"])) {
                                            if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"]["text"])) {
                                                createdByData = segRowData[i]["userName"]["text"];
                                            } else if (typeof(segRowData[i]["userName"]) == 'string') {
                                                createdByData = segRowData[i]["userName"];
                                            }
                                        }
                                    }
                                } else if (typeof(segRowData[i]["Comments"]) == 'string') {
                                    if (segRowData[i]["Comments"] == "Request Created") {
                                        if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"])) {
                                            if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"]["text"])) {
                                                createdByData = segRowData[i]["userName"]["text"];
                                            } else if (typeof(segRowData[i]["userName"]) == 'string') {
                                                createdByData = segRowData[i]["userName"];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (err) {}
                try {
                    var currentData = this.view.ApprovalViewDetails.segDetails.data;
                    for (var j = 0; j < currentData.length; j++) {
                        if (currentData[j].lblKey == "Sent By") {
                            currentData[j].lblKey = "Requested By";
                            currentData[j].lblValue = createdByData;
                        }
                    }
                    this.view.ApprovalViewDetails.segDetails.setData(currentData);
                } catch (err) {}
      }
      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(true);
      var approvedCount = this.getNumberOfApprovals(segRowViewData);
      var rejectedCount =  this.getNumberOfRejected(segRowViewData);
      this.view.ApprovalViewDetails.flxApprovedCountDetails.setVisibility(approvedCount > 0);
      this.view.ApprovalViewDetails.flxRejectedCountDetails.setVisibility(rejectedCount > 0);
      this.view.ApprovalViewDetails.lblApproveCountVal.text = approvedCount.toString();
      this.view.ApprovalViewDetails.lblRejectedCountVal.text = rejectedCount.toString();
      this.adjustScreen(-60);
    },
    /*
    * function to get approved count
    */
    getNumberOfApprovals: function(requestHistoryArray) {
      if(!requestHistoryArray || requestHistoryArray.length === 0)
        return 0;
      return requestHistoryArray.reduce((acc, curr) => {
        if(curr && curr.Status && (curr.Status === BBConstants.TRANSACTION_STATUS.APPROVED || curr.Status === BBConstants.TRANSACTION_STATUS.SELF_APPROVED)) {
          ++acc;
        }
        return acc;
      }, 0);
    },
    /*
    * function to get rejected count
    */
    getNumberOfRejected: function(requestHistoryArray) {
      if(!requestHistoryArray || requestHistoryArray.length === 0)
        return 0;
      return requestHistoryArray.reduce((acc, curr) => {
        if(curr && curr.Status && (curr.Status === BBConstants.TRANSACTION_STATUS.REJECTED)) {
          ++acc;
        }
        return acc;
      }, 0);
    },

    achTransactionViewDetailsApprove: function (data, isApproved) {
      this.achData = data;
      // this.view.flxImgPrintAch.setVisibility(false);
      // this.view.flxImgDownloadAch.setVisibility(false);

      var templateData = {
        "Template Name": data.templateName,
        "Transaction Type": data.featureName,
        "Request Type": data.requestType,
        "Debit Account": data.accountId,
        "Created On": data.sentDate,
        "Created By": data.sentBy,
        "Effective Date": CommonUtilities.getFrontendDateString(data.processingDate, "mm/dd/yyyy"),
        "Maximum transfer Amount": CommonUtilities.formatCurrencyWithCommas(
          (data.MaxAmount && !kony.sdk.isEmptyObject(data.MaxAmount)) ?
            data.MaxAmount : data.amount,
          false),
        "Status": data.status
      };
      if (data.status == "Executed") {
        templateData["Confirmation Number"] = data.confirmationNumber;
      } else if (data.status == "Pending") {
        templateData["Reference Id"] = data.transactionId;
      }

      if (data.statusValue === "Approved") {
        templateData["Approver"] = kony.sdk.isNullOrUndefined(data.Approver) ? "N/A" : data.Approver.toolTip;
      } else if (data.statusValue === "Rejected") {
        templateData["Rejected By"] = kony.sdk.isNullOrUndefined(data.Approver) ? "N/A" : data.Approver.toolTip;
      } else {
        //do not show Approver/Rejected By in details
      }

      this.view.ApprovalViewDetails.setData(templateData, true);
      if (kony.sdk.isNullOrUndefined(data.requestId)) {
        this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(data.requestId);
        this.view.ApprovalViewDetails.lblApprovalStatusValue.text = kony.sdk.isNullOrUndefined(data.Status) ? data.status : data.Status;
      }

      this.fetchTransactionRecords({
        "Transaction_id": data.transactionId
      });

      this.view.forceLayout();
      this.adjustScreen(-120);
    },

    /**
         * fetchTransactionRecords : fetch the required transaction Records.
         * @member of {frmApprovalAcknowledgementController}
         * @param {JSON Onject} inputparams - transaction details from Template or Transaction
         * @return {}
         * @throws {}
         */
    //need to check
    fetchTransactionRecords: function (inputparams) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_RECORDS_DATA,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.TEMPLATE_RECORDS_FAILURE,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getACHTransactionRecords(navObj);
    },

    fetchUploadedACHFileApprovals: function(requestParam) {
      var scopeObj = this;
      var navObj = {
        requestData: requestParam,
        onSuccess: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: "achViewDetails",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getACHFileByID(navObj);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
    // accessibilityFocusSetup: function() {
    //     let widgets = [
    //         [this.view.tbxMaxAmt, this.view.flxMaxAmt],
    //     ]
    //     for (let i = 0; i < widgets.length; i++) {
    //         CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
    //     }
    // },
    //ADP-7021 may be required for single request approved
    showApprovedTransaction: function(responseData) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.generalTransactionsAcknowledgementApprove(responseData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      var tran_id = responseData.Transaction_id || responseData.transactionId;
      if (!kony.sdk.isNullOrUndefined(tran_id)) tran_id = tran_id.replace("_PSD2", "");
      this.view.lblApprovalStatusValue.text = responseData.Approval;
      this.view.lblApproveCountVal.text = Number(this.view.lblApprovalStatusValue.text.split(' ')[0]) + 1 + "";
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") + kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved").toLowerCase() + " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + tran_id;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    //ADP-7021 may be required for single request rejected
    showRejectedTransaction: function(responseData) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.generalTransactionsAcknowledgementApprove(responseData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      var tran_id = responseData.Transaction_id || responseData.transactionId;
      if (!kony.sdk.isNullOrUndefined(tran_id)) tran_id = tran_id.replace("_PSD2", "");
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") + kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected").toLowerCase() + " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + tran_id;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    /**
         * onTabClick : to be executed on every tab click based on tab name.
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventobject - Event object details of a Button
         * @return {}
         * @throws {}
         */
    //ADP-7021
    onTabClick: function(eventobject) {
      // this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
      this.hideOrShowCloseIcon();
      //this.initializeFetchParams();
      if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.template.ACH")) {
        //this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllTemplates");
        this.activeTab = BBConstants.ACH_TEMPLATES;
        this.invokeFetchACHTemplates();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.common.transactions")) {
        //this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.accounts.allTransactions");
        this.activeTab = BBConstants.ACH_TRANSACTIONS;
        this.invokeFetchACHTransactions();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")) {
        //this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllACHFiles");
        this.activeTab = BBConstants.ACH_FILES;
        this.invokeFetchACHFiles();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals")) {
        this.activeTab = BBConstants.ACH_APPROVALS;
        this.setupApprovalsView();
      }
    },
    //ADP-7021 if needed can be used for reload
    segReloadAction: function () {
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    onClickAnyTab: function (eventobject) {
      //this.view.TabPaneNew.TabsHeaderNew.clickTab(eventobject);
      this.onTabClick(eventobject);
    },

    updateApprovalsData: function (response, isRejectedData) {
      var data = {};
      //var segData = this.view.TabPaneNew.TabBodyNew.segTemplates.data;
      if (response.hasOwnProperty('ACHTransactions')) {
        data.ACHTransactions = response.ACHTransactions;
        data.ACHFiles = []; // ACH files doesnot go for approval queue in this release
      } else if (response.hasOwnProperty('ACHFiles')) {
        data.ACHFiles = response.ACHFiles;
        data.ACHTransactions = (segData[0][0].hasOwnProperty("lblMsg")) ? [] : segData[0];
      }
      this.setDataMappingForApprovals();
      this.setDataForApprovals(isRejectedData, data);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(50);
    },
    // toggleErrorMessage: function(error, toShow, adjustScreenHeight) {
    //     if (toShow) {
    //         this.view.lblDisplayError.text = error;
    //         this.view.flxDisplayErrorMessage.setVisibility(true);
    //     } else {
    //         this.view.lblDisplayError.text = "";
    //         this.view.flxDisplayErrorMessage.setVisibility(false);
    //     }
    //     this.adjustScreen(adjustScreenHeight);
    //     FormControllerUtility.hideProgressBar(this.view);
    //},
    //***********************************************************************  COMMON CODE & VALIDATIONS  ***********************************************************//
    /**
         * objectToListBoxArray : function to convert an JSON object to an Array (to be used for an ListBox)
         * @member of {frmApprovalViewDetailsController}
         * @param {JSOn Object} obj - JSON Object to be converted to an Array
         * @return {}
         * @throws {}
         */
    objectToListBoxArray: function(obj) {
      var list = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          list.push([key, obj[key]]);
        }
      }
      return list;
    },
    /**
         * objectToListBoxArray : function to convert an JSON object Array to an ListBox Array
         * @member of {frmApprovalViewDetailsController}
         * @param {JSOn Array} objArray - JSON Object Array to be converted to an Array
         * @return {}
         * @throws {}
         */
    objectToListBoxArrayFromService: function(objArray) {
      var list = [];
      list.push(["-1", "Select"]);
      for (var i = 0; i < objArray.length; i++) {
        list.push([objArray[i].Id, objArray[i].Name]);
      }
      return list;
    },
    //ADP-7021 reference for tab & mobile brkpoints
    //*******************************************************************  BREAK POINT CHANGE & SERVICE ERROR  ********************************************************//
    responsiveViews: {},
    // initializeResponsiveViews: function() {
    //     this.responsiveViews["flxContentDashBoard"] = this.isViewVisible("flxContentDashBoard");
    //     this.responsiveViews["flxTransactionDetails"] = this.isViewVisible("flxTransactionDetails");
    //     this.responsiveViews["flxTabPaneContainer"] = this.isViewVisible("flxTabPaneContainer");
    //     this.responsiveViews["flxACHFilesUpload"] = this.isViewVisible("flxACHFilesUpload");
    //     this.responsiveViews["flxPaymentType"] = this.isViewVisible("flxPaymentType");
    //     this.responsiveViews["flxFrom"] = this.isViewVisible("flxFrom");
    // },
    // isViewVisible: function(container) {
    //     if (this.view[container].isVisible) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },
    /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmApprovalViewDetailsController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
    onBreakpointChange: function(width) {
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      var responsiveFonts = new ResponsiveFonts();
      this.view.customheader.onBreakpointChangeComponent(width);
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.customfooter.lblCopyright.left = "17.5%";
        this.view.customfooter.flxFooterMenu.left = "16%";
        this.view.flxTransactionDetails.isVisible = false;
        this.view.flxTransactionDetailsMobile.isVisible = true;
        //this.setMobileFilterData();
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.customheader.lblHeaderMobile.isVisible = true;
        this.view.flxDashboard.skin = "slFbox";
        this.view.ApprovalRoadMapElement.initMobileView();
        this.view.ApprovalViewDetails.segDetails.rowTemplate = "flxViewDetailsMobile";
        this.view.ApprovalViewDetails.flxSeperatorBottom.isVisible = true;
        var views = Object.keys(this.responsiveViews);
        views.forEach(function(e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        responsiveFonts.setMobileFonts();
      } else {
        if (break_point <= 1024 || orientationHandler.isTablet) {
          this.view.ApprovalRoadMapElement.initTabletView();
        }
        else {
          this.view.ApprovalRoadMapElement.initDesktopView();
        }
        this.view.ApprovalViewDetails.flxSeperatorBottom.isVisible = false;
        this.view.flxTransactionDetails.isVisible = true;
        this.view.flxTransactionDetailsMobile.isVisible = false;
        this.view.ApprovalViewDetails.segDetails.rowTemplate = "flxNonEditableDetails";
        //views = Object.keys(this.responsiveViews);
        //views.forEach(function(e) {
        //scope.view[e].isVisible = scope.responsiveViews[e];
        //});
        responsiveFonts.setDesktopFonts();
        this.view.customheader.lblHeaderMobile.isVisible = false;
        this.view.customheader.lblHeaderMobile.text = "";
        // if (this.view.flxTabPaneContainer.isVisible) {
        //     this.view.flxDashboard.skin = "slFbox";
        // } else {
        //     this.view.flxDashboard.skin = "slfBoxffffffB1R5";
        // }
      }
      this.adjustScreen(0);
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      if (applicationManager.getConfigurationManager().isMicroAppPresent('CampaignMA')) {
        this.ApprovalsReqUIModule.presentationController.getAchCampaigns();
      }
    },
    /**
         * adjustScreen : Handles ui changes based on the screen size
         * @member of {frmApprovalViewDetailsController}
         * @param {integer} data - difference to be added to the screen
         * @return {}
         * @throws {}
         */
    adjustScreen: function(data) {
      this.view.flxFooter.isVisible = true;
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0) this.view.flxFooter.top = mainheight + diff + data + "dp";
        else this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      }
      //this.initializeResponsiveViews();
    },
    /**
         * showDownTimeMessage : This method is called inorder to show error messages related to server
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} errorData - Object from the service call - failure
         * @return {}
         * @throws {}
         */
    showDownTimeMessage: function(errorData) {
      this.view.flxContentContainer.setVisibility(false);
      this.view.flxDowntimeWarning.setVisibility(true);
      this.view.lblDowntimeWarning.text = errorData.errorMessage;
      this.view.imgCloseDowntimeWarning.setVisibility(false);
      this.view.flxDowntimeWarning.skin = "sknFFFFFFmodbr3px";
      this.view.lblDowntimeWarning.skin = "bbSknLblFF001FLatoBold15Px";
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    //flex creation for single functionality
    pendingApprovalsSingleCondition: function(count, data) {
      // Single condition flex
      var flxConditionGroupSingle = new kony.ui.FlexContainer({
        "id": "flexConditionGroupSingle" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "0dp",
        "top": "0dp",
        "width": "100%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "slFbox",
        "zIndex": 1
      });
      var flxApproverPendingSingle = new kony.ui.FlexContainer({
        "id": "flexApproverPendingSingle" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "20dp",
        "top": "20dp",
        "right": "20dp",
        "width": "94%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "sknFlxffffffborderradE3E3E3",
        "zIndex": 1
      });
      var flxApproverPendingGroupSingle = new kony.ui.FlexContainer({
        "id": "flxApproverPendingGroupSingle" + count,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "20dp",
        "top": "20dp",
        "bottom": "20dp",
        "width": "94%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "ICSknFlxffffffOuterShadowdddcdc",
        "zIndex": 1
      });
      //for single condition Collapse functionality
      var flxApproveDetailsSingleCollapse = new kony.ui.FlexContainer({
        "id": "flxApproveDetailsSingleCollapse" + count,
        "isVisible": true,
        "left": "0dp",
        "top": "0dp",
        "height": "50dp",
        "width": "100%",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
        "zIndex": 1
      });
      var imgApprover = new kony.ui.Image2({
        "id": "imgApprover" + count,
        "isVisible": true,
        "src": "manager_placeholder.png",
        "width": "20dp",
        "height": "20dp",
        "left": "20dp",
        "bottom": "10dp",
        "centerY": "50%",
        "zIndex": 1
      }, {
        "containerWeight": 100
      }, {});
      var lblApproverGroup = new kony.ui.Label({
        "id": "lblApproverGroup" + count,
        "isVisible": true,
        "skin": "ICSknLbl42424215PX",
        "text": data.signatoryName,
        "left": "60dp",
        "centerY": "50%",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
      }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      });
      var lblApproverGroupStatus = new kony.ui.Label({
        "id": "lblApproverGroupStatus" + count,
        "isVisible": true,
        "skin": "ICSknLbl42424215PX",
        "text": kony.i18n.getLocalizedString("kony.i18n.Common.Any") + " " + data.approvalCount + " " + kony.i18n.getLocalizedString("i18n.Search.Pending"),
        "right": "55dp",
        "centerY": "50%",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "width": kony.flex.USE_PREFERRED_SIZE
      }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      });
      var imgDetailsArrow = new kony.ui.Image2({
        "id": "imgDetailsArrow" + count,
        "src": "listboxuparrow.png",
        "width": "30dp",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "top": "18dp",
        "right": "10dp",
        "centerY": "50%",
        "zIndex": 1
      }, {
        "containerWeight": 100
      });
      if (data.pendingApprovers.length !== 0 && data.pendingApprovers !== undefined) {
        imgDetailsArrow["isVisible"] = true;
      } else {
        imgDetailsArrow["isVisible"] = false;
      }
      imgDetailsArrow["onTouchEnd"] = this.showExpandedView.bind(this, "flxApproveDetailsSingleExpand" + count, "imgDetailsArrow" + count);
      //for single condition expand functionality
      var flxApproveDetailsSingleExpand = new kony.ui.FlexContainer({
        "id": "flxApproveDetailsSingleExpand" + count,
        "isVisible": false,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "0dp",
        "top": "0dp",
        "bottom": "10dp",
        "width": "100%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "zIndex": 1
      });
      var flxViewSeparator = new kony.ui.FlexContainer({
        "id": "flxViewSeparator" + count,
        "isVisible": true,
        "left": "20dp",
        "right": "20dp",
        "top": "0dp",
        "width": "93%",
        "height": "1dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
        "skin": "lblSeparator",
        "zIndex": 1
      });
      var flxSingleApproverDetailsandStatus = new kony.ui.FlexContainer({
        "id": "flxSingleApproverDetailsandStatus" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "10dp",
        "right": "10dp",
        "width": "98%",
        "height": kony.flex.USE_PREFERRED_SIZE,
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
        "zIndex": 1
      });
      var segSingleExpandDetails = new kony.ui.SegmentedUI2({
        "id": "segSingleExpandDetails" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "0dp",
        "top": "0dp",
        "width": "100%",
        "rowTemplate": "flxApprovalDetailsExpandRowTemplate",
        "widgetDataMap": {
          "imgApproverProfile": "imgApproverProfile",
          "lblApproverName": "lblApproverName",
          "lblApproverGroup": "lblApproverGroup",
          "lblApproverStatus": "lblApproverStatus",
          "btnReNotify": "btnReNotify"
        }
      });
      flxApproveDetailsSingleCollapse.add(imgApprover);
      flxApproveDetailsSingleCollapse.add(lblApproverGroup);
      flxApproveDetailsSingleCollapse.add(lblApproverGroupStatus);
      flxApproveDetailsSingleCollapse.add(imgDetailsArrow);
      flxSingleApproverDetailsandStatus.add(segSingleExpandDetails);
      flxApproveDetailsSingleExpand.add(flxViewSeparator);
      flxApproveDetailsSingleExpand.add(flxSingleApproverDetailsandStatus);
      flxApproverPendingGroupSingle.add(flxApproveDetailsSingleCollapse);
      flxApproverPendingGroupSingle.add(flxApproveDetailsSingleExpand);
      flxApproverPendingSingle.add(flxApproverPendingGroupSingle);
      flxConditionGroupSingle.add(flxApproverPendingSingle);
      var masterTableSingleData = [];
      if (data.pendingApprovers.length !== 0) {
        for (var i = 0; i < data.pendingApprovers.length; i++) {
          var masterTableSingle = [];
          if (kony.sdk.isNullOrUndefined(data.pendingApprovers[i].userImage)) {
            var userImage = "profile_header.png";
          } else {
            userImage = data.pendingApprovers[i].userImage;
          }
          masterTableSingle = {
            "imgApproverProfile": userImage,
            "lblApproverName": data.pendingApprovers[i].fullName,
            "lblApproverGroup": data.pendingApprovers[i].role,
            "lblApproverStatus": "Pending"
          };
          masterTableSingle["btnReNotify"] = {
            "text": kony.i18n.getLocalizedString("i18n.payments.reNotify"),
            "onClick": this.reNotify.bind(this, masterTableSingle["lblApproverName"])
          }
          masterTableSingleData.push(masterTableSingle);
        }
        segSingleExpandDetails.setData(masterTableSingleData);
      }
      this.note = this.note + " " + kony.i18n.getLocalizedString("i18n.common.any") + " " + data.approvalCount + " " + kony.i18n.getLocalizedString("i18n.common.ofthe") + " " + data.signatoryName;
      this.count = count;
      this.count++;
      return flxConditionGroupSingle;
    },
    //OR Condition flex
    pendingApprovalsORCondition: function(count) {
      //OR Condition flex
      var flxCondition = new kony.ui.FlexContainer({
        "id": "flxCondition" + count,
        "isVisible": true,
        "left": "0dp",
        "top": "10dp",
        "width": "100%",
        "height": "40dp",
        "clipBounds": false,
        "layoutType": kony.flex.FREE_FORM,
        "zIndex": 1
      });
      var lblCondition = new kony.ui.Label({
        "id": "lblCondition" + count,
        "isVisible": true,
        "skin": "ICSknLbl42424215PX",
        "text": kony.i18n.getLocalizedString("i18n.approvals.OR"),
        "centerX": "50%",
        "centerY": "50%"
      }, {
        "containerWeight": 100,
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "margin": [1, 1, 1, 1],
        "padding": [0, 0, 0, 0],
      });
      flxCondition.add(lblCondition);
      this.note = this.note + " (or) ";
      this.count = count;
      this.count++;
      return flxCondition;
    },
    // Multiple Condition flex group
    pendingApprovalsMultipleCondition: function(count, data) {
      var flxConditionGroupMultiple = new kony.ui.FlexContainer({
        "id": "flxConditionGroupMultiple" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "0dp",
        "width": "100%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "slFbox",
        "zIndex": 1
      });
      if (this.view.flxApproverList.widgets.length !== 0) {
        flxConditionGroupMultiple["top"] = "0dp";
      } else {
        flxConditionGroupMultiple["top"] = "20dp";
      }
      var flxApproverPendingMultiple = new kony.ui.FlexContainer({
        "id": "flexApproverPendingMultiple" + count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "20dp",
        "top": "0dp",
        "right": "20dp",
        "width": "94%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "sknFlxffffffborderradE3E3E3",
        "zIndex": 1
      });
      var nextCount = false;
      for (var i = 0; i < data.length; i++) {
        if (i !== 0) {
          count++;
        }
        if (i === data.length - 1) {
          nextCount = false;
        } else {
          nextCount = true;
        }
        // Multiple Condition flex group
        var flxApproverPendingGroupMultiple = new kony.ui.FlexContainer({
          "id": "flxApproverPendingGroupMultiple" + count,
          "isVisible": true,
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "left": "20dp",
          "top": "20dp",
          "bottom": "20dp",
          "width": "94%",
          "clipBounds": false,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "skin": "ICSknFlxffffffOuterShadowdddcdc",
          "zIndex": 1
        });
        //for multiple condition Collapse functionality
        var flxApproveDetailsMultipleCollapse = new kony.ui.FlexContainer({
          "id": "flxApproveDetailsMultipleCollapse" + count,
          "isVisible": true,
          "left": "0dp",
          "top": "0dp",
          "height": "50dp",
          "width": "100%",
          "clipBounds": false,
          "layoutType": kony.flex.FREE_FORM,
          "zIndex": 1
        });
        var imgApproverMultiple = new kony.ui.Image2({
          "id": "imgApproverMultiple" + count,
          "isVisible": true,
          "src": "manager_placeholder.png",
          "width": "20dp",
          "height": "20dp",
          "left": "20dp",
          "bottom": "10dp",
          "centerY": "50%",
          "zIndex": 1
        }, {
          "containerWeight": 100
        }, {});
        var lblApproverGroupMultiple = new kony.ui.Label({
          "id": "lblApproverGroupMultiple" + count,
          "isVisible": true,
          "skin": "ICSknLbl42424215PX",
          "text": data[i].signatoryName,
          "left": "60dp",
          "centerY": "50%",
          "height": kony.flex.USE_PREFERRED_SIZE,
          "width": kony.flex.USE_PREFERRED_SIZE,
          "wrapping": constants.WIDGET_TEXT_WORD_WRAP
        }, {
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        });
        var lblApproverGroupStatusMultiple = new kony.ui.Label({
          "id": "lblApproverGroupStatusMultiple" + count,
          "isVisible": true,
          "skin": "ICSknLbl42424215PX",
          "text": kony.i18n.getLocalizedString("kony.i18n.Common.Any") + " " + data[i].approvalCount + " " + kony.i18n.getLocalizedString("i18n.Search.Pending"),
          "right": "55dp",
          "centerY": "50%",
          "height": kony.flex.USE_PREFERRED_SIZE,
          "width": kony.flex.USE_PREFERRED_SIZE
        }, {
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        });
        var imgDetailsArrowMultiple = new kony.ui.Image2({
          "id": "imgDetailsArrowMultiple" + count,
          "src": "listboxdownarrow.png",
          "width": "30dp",
          "height": kony.flex.USE_PREFERRED_SIZE,
          "top": "18dp",
          "right": "10dp",
          "centerY": "50%",
          "zIndex": 1
        }, {
          "containerWeight": 100
        });
        if (data[i].pendingApprovers.length !== 0 && data[i].pendingApprovers !== undefined) {
          imgDetailsArrowMultiple["isVisible"] = true;
        } else {
          imgDetailsArrowMultiple["isVisible"] = false;
        }
        imgDetailsArrowMultiple["onTouchEnd"] = this.showExpandedView.bind(this, "flxApproveDetailsMultipleExpand" + count, "imgDetailsArrowMultiple" + count);
        //for Multiple condition expand functionality
        var flxApproveDetailsMultipleExpand = new kony.ui.FlexContainer({
          "id": "flxApproveDetailsMultipleExpand" + count,
          "isVisible": false,
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "left": "0dp",
          "top": "0dp",
          "bottom": "10dp",
          "width": "100%",
          "clipBounds": false,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "zIndex": 1
        });
        var flxViewSeparatorMultiple = new kony.ui.FlexContainer({
          "id": "flxViewSeparatorMultiple" + count,
          "isVisible": true,
          "left": "20dp",
          "right": "20dp",
          "top": "0dp",
          "width": "93%",
          "height": "1dp",
          "clipBounds": false,
          "layoutType": kony.flex.FREE_FORM,
          "skin": "lblSeparator",
          "zIndex": 1
        });
        var flxMultipleApproverDetailsandStatus = new kony.ui.FlexContainer({
          "id": "flxMultipleApproverDetailsandStatus" + count,
          "isVisible": true,
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "left": "10dp",
          "right": "10dp",
          "width": "98%",
          "height": kony.flex.USE_PREFERRED_SIZE,
          "clipBounds": false,
          "layoutType": kony.flex.FREE_FORM,
          "zIndex": 1
        });
        var segMultipleExpandDetails = new kony.ui.SegmentedUI2({
          "id": "segMultipleExpandDetails" + count,
          "isVisible": true,
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "left": "0dp",
          "top": "0dp",
          "width": "100%",
          "rowTemplate": "flxApprovalDetailsExpandRowTemplate",
          "widgetDataMap": {
            "imgApproverProfile": "imgApproverProfile",
            "lblApproverName": "lblApproverName",
            "lblApproverGroup": "lblApproverGroup",
            "lblApproverStatus": "lblApproverStatus",
            "btnReNotify": "btnReNotify"
          }
        });
        // AND Condition
        var flxConditionMultiple = new kony.ui.FlexContainer({
          "id": "flxConditionMultiple" + count,
          "isVisible": true,
          "left": "0dp",
          "top": "0dp",
          "width": "100%",
          "height": "40dp",
          "clipBounds": false,
          "layoutType": kony.flex.FREE_FORM,
          "zIndex": 1
        });
        var lblConditionMultiple = new kony.ui.Label({
          "id": "lblConditionMultiple" + count,
          "isVisible": true,
          "skin": "ICSknLbl42424215PX",
          "text": kony.i18n.getLocalizedString("i18n.approvals.AND"),
          "centerX": "50%",
          "centerY": "50%"
        }, {
          "containerWeight": 100,
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "margin": [1, 1, 1, 1],
          "padding": [0, 0, 0, 0],
        });
        flxApproveDetailsMultipleCollapse.add(imgApproverMultiple);
        flxApproveDetailsMultipleCollapse.add(lblApproverGroupMultiple);
        flxApproveDetailsMultipleCollapse.add(lblApproverGroupStatusMultiple);
        flxApproveDetailsMultipleCollapse.add(imgDetailsArrowMultiple);
        flxMultipleApproverDetailsandStatus.add(segMultipleExpandDetails);
        flxApproveDetailsMultipleExpand.add(flxViewSeparatorMultiple);
        flxApproveDetailsMultipleExpand.add(flxMultipleApproverDetailsandStatus);
        flxApproverPendingGroupMultiple.add(flxApproveDetailsMultipleCollapse);
        flxApproverPendingGroupMultiple.add(flxApproveDetailsMultipleExpand);
        if (nextCount === true) {
          flxApproverPendingMultiple.add(flxApproverPendingGroupMultiple);
          flxConditionMultiple.add(lblConditionMultiple);
          flxApproverPendingMultiple.add(flxConditionMultiple);
          this.note = this.note + " any " + data[i].approvalCount + " of the " + data[i].signatoryName;
          this.note = this.note + " and ";
        } else {
          this.note = this.note + " any " + data[i].approvalCount + " of the " + data[i].signatoryName;
          flxApproverPendingMultiple.add(flxApproverPendingGroupMultiple);
        }
        var masterTableMultipleData = [];
        if (data[i].pendingApprovers.length !== 0) {
          for (var j = 0; j < data[i].pendingApprovers.length; j++) {
            if (kony.sdk.isNullOrUndefined(data[i].pendingApprovers[j].userImage)) {
              var masterTableMultiple = [];
              var userImage = "profile_header.png";
            } else {
              userImage = data[i].pendingApprovers[j].userImage;
            }
            var masterTableMultiple = {
              "imgApproverProfile": userImage,
              "lblApproverName": data[i].pendingApprovers[j].fullName,
              "lblApproverGroup": data[i].pendingApprovers[j].role,
              "lblApproverStatus": "Pending"
            };
            masterTableMultiple["btnReNotify"] = {
              "text": kony.i18n.getLocalizedString("i18n.payments.reNotify"),
              "onClick": this.reNotify.bind(this, masterTableMultiple["lblApproverName"])
            }
            masterTableMultipleData.push(masterTableMultiple);
          }
          segMultipleExpandDetails.setData(masterTableMultipleData);
        }
      }
      flxConditionGroupMultiple.add(flxApproverPendingMultiple);
      this.count = count;
      this.count++;
      return flxConditionGroupMultiple;
    },
    showExpandedView: function(flxName, chevronName) {
      if (this.view[flxName].isVisible === false) {
        this.view[flxName].setVisibility(true);
        this.view[chevronName].src = "listboxdownarrow.png";
      } else {
        this.view[flxName].setVisibility(false);
        this.view[chevronName].src = "listboxuparrow.png";
      }
    },
    getPendingApprovalsCount: function(selectedRowData) {
      var approvalStatus = selectedRowData.receivedApprovals;
      this.view.ApprovalViewDetails.lblApprovalStatusValue.text = selectedRowData.status;
      return approvalStatus;
    },
    roadMapStructure: function () {
      var CheckBoxData = this.ApprovalsReqUIModule.presentationController.getSelectedData();
      var length = CheckBoxData.length;
      var ackData = this.ApprovalsReqUIModule.presentationController.getMultiApprovalAckData();
      var componentConfig = [];
      var statcount = 0;
      var finalstatus = null;
      for (var i = 0; i < length + 1; i++) {
        if (ackData.length >= i + 1) {
          finalstatus = ackData[i].status;
        }
        else if (i == ackData.length) {
          finalstatus = "In Progress";
        }
        else {
          finalstatus = null;
        }
        var obj =
        {
          requestLabel: i == length ? kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement") : kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + (i + 1).toString(),
          status: finalstatus,
          isCurrent: finalstatus == "In Progress" ? true : false,
          isLast: i == length ? true : false,
        }
        componentConfig.push(obj);
      }
      //callRoadMap
      this.view.ApprovalRoadMapElement.setRoadMapComponentConfig(componentConfig);
    },
    showUploadedFileApprovals: function (ACHFileData) {
      var fileACKData = this.generateViewDetailRecords(ACHFileData);
      // this.view.lblFormatTypeValue.text = ACHFileData.FileFormatType;
      //this.view.lblRequestTypeValue.text = ACHFileData.FileRequestType;
      //this.view.lblFileNameAck.text = ACHFileData.FileName; //.toolTip;
      //  if (ACHFileData.FileStatus === BBConstants.TRANSACTION_STATUS.PENDING) {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      //  } else {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUploadExecute"));
      // }
      this.showACHFileUploadAckApprovals(fileACKData);
      if (kony.sdk.isNullOrUndefined(ACHFileData.Request_id) || kony.sdk.isEmptyObject(ACHFileData.Request_id)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = ACHFileData.FileStatus;
        this.fetchRequestHistoryData(ACHFileData.Request_id);
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    /**
  * generateViewDetailRecords : function to format the ACHFile Data to show in UI
  * @member of {frmApprovalViewDetailsController}
  * @param {}
  * @return {}
  * @throws {}
  */
    generateViewDetailRecords: function (ACHFileData) {
      if (!kony.sdk.isNullOrUndefined(ACHFileData.responseData)) {
        ACHFileData = ACHFileData.responseData;
      }
      var dataRecord = {
        "File Name": ACHFileData.FileName, //.toolTip,
        "Status": ACHFileData.FileStatus,
        "Uploaded by": ACHFileData.userName, //.toolTip,
        "Upload date": CommonUtilities.getDateAndTime(ACHFileData.UpdatedDateAndTime),
        "Total Debit Amount": CommonUtilities.formatCurrencyWithCommas(ACHFileData.TotalDebitAmount, false),
        "Total Credit Amount": CommonUtilities.formatCurrencyWithCommas(ACHFileData.TotalCreditAmount, false),
        "Number of Debits": ACHFileData.NumberOfDebits,
        "Number of Credits": ACHFileData.NumberOfCredits,
        "Number of Prenotes": ACHFileData.NumberOfPrenotes,
        "Number of Records": ACHFileData.NumberOfRecords
      };
      return dataRecord;
    },
    showACHFileUploadAckApprovals: function (fileDetails) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxApprovalsHistoryInformation.isVisible = true;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.NonEditableDetailsforApprovals.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadFileContent");
      this.view.NonEditableDetailsforApprovals.setData(fileDetails, true);
      // this.view.ApprovalFormActions.btnCancel.isVisible = true;
      //   this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NORMAL;
      //  this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
      //  this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadAnother");
      // this.view.ApprovalFormActions.btnCancel.onClick = this.showACHFilesUpload;
      // this.view.ApprovalFormActions.btnNext.isVisible = true;
      //  this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      //  this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      //  this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
      //        "key": BBConstants.SHOW_ACH_FILES_TAB
      //    });
      //   this.view.ApprovalFormActions.btnOption.isVisible = false;
      //   this.view.ApprovalFormActions.btnBack.isVisible = false;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    /**
             * fetchFileRecords : fetch the required file Records.
             * @member of {frmApprovalViewDetailsController}
             * @param {JSON Onject} inputparams - file details from Template or Transaction
             * @return {}
             * @throws {}
             */
    fetchFileRecords: function (inputparams) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_FILES_DATA,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalAcknowledgement",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.TEMPLATE_RECORDS_FAILURE,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getACHFileRecords(navObj);
    },

    /**
         * viewReceipientTransactionDetails : This method is called inorder to show general Transaction Details Pending for Approval
         * @member of {frmApprovalAcknowledgementController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewReceipientTransactionDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {
      this.selectedRowData = selectedRowData;
      this.view.flxOverlay.setVisibility(false);
      this.view.ApprovalViewDetails.lblApprovalStatusValue.text = selectedRowData.status;
      this.view.ApprovalViewDetails.lblApproveCountVal.text = selectedRowData.receivedApprovals;
      selectedRowData.DebitOrCreditAccount = selectedRowData.customerName + selectedRowData.accountID;
      selectedRowData.CreatedOn = selectedRowData.sentDate;
      selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.view.ApprovalViewDetails.flxApprovalDetailsStatus.setVisibility(true);
      this.view.ApprovalViewDetails.flxApprovedCountDetails.setVisibility(true);
      this.recipientTransactionsAcknowledgement(selectedRowData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-60);
    },

    recipientTransactionsAcknowledgement: function (context, formName, contextKey) {
      this.context = context;
      this.showACKForRecipientTransactions(this.context);
    },

        /**
         funciton to show acknowledgement page for Transactions
       **/
    showACKForRecipientTransactions: function (transactionData) {
      this.setupUIForACK("");
      

      var formattedData = {};
           
            switch (transactionData.featureActionId) {
                case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT':
                    formattedData["Request Type"] = "International Transfer - Create Beneficiary";
                    break;
                case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT':
                    formattedData["Request Type"] = "Domestic Transfer - Create Beneficiary";
                    break;
                case 'INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT':
                    formattedData["Request Type"] = "Same Bank Transfer - Create Beneficiary";
                    break;
                case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT':
                    formattedData["Request Type"] = "International Transfer - Delete Beneficiary";
                    break;
                case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT':
                    formattedData["Request Type"] = "International Transfer - Edit Beneficiary";
                    break;
                case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                    formattedData["Request Type"] = "International Transfer - Edit Recipient Linkage";
                    break;
                case 'INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                    formattedData["Request Type"] = "International Transfer - Edit Recipient Optional Fields";
                    break;
                case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT':
                    formattedData["Request Type"] = "Domestic Transfer - Delete Beneficiary";
                    break;
                case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Beneficiary";
                    break;
                case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Recipient Linkage";
                    break;
                case 'INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Recipient Optional Fields";
                    break;
                case 'INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT':
                    formattedData["Request Type"] = "Domestic Transfer - Delete Beneficiary";
                    break;
                case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Beneficiary";
                    break;
                case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Recipient Linkage";
                    break;
                case 'INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL':
                    formattedData["Request Type"] = "Domestic Transfer - Edit Recipient Optional Fields";
                    break;
            }
            formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentBy")] = transactionData.sentBy;


        this.view.ApprovalViewDetails.setData(formattedData, true);
      this.showRecepientDetails(transactionData.fullData, transactionData.userContractsData);
        if (kony.sdk.isNullOrUndefined(transactionData.requestId)) {
        this.view.ApprovalViewDetails.flxApprovalsHistoryInformation.setVisibility(false);
        } else {
          this.fetchRequestHistoryData(transactionData.requestId);
        }
        this.view.forceLayout();
        this.adjustScreen(20);
    },
    /*
    * to show recipient information,bank information,recipients linked based on type of feature action
    * @param: recepients data, users contract data
    */
    showRecepientDetails : function(recepientDetails,userContractsData){
      this.view.ApprovalViewDetails.flxBeneficiaryDetails.setVisibility(true);
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].
         includes(recepientDetails.featureActionId)){
        this.setBeneficiaryDataCreateDeleteFlow(recepientDetails,userContractsData);
      }
      else if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(recepientDetails.featureActionId)){
        this.view.ApprovalViewDetails.btnTab1.onClick = this.showTab1.bind(this,recepientDetails,userContractsData);
        this.view.ApprovalViewDetails.btnTab2.onClick = this.showTab2.bind(this,recepientDetails,userContractsData);
        var showingUpdatedDetails = true;
        this.setBeneficiaryDataEditFlow(recepientDetails,userContractsData,showingUpdatedDetails);
      }
    },
    /*
    * set details for create,delete type flows
    * @param: recepients data, users contract data
    */
    setBeneficiaryDataCreateDeleteFlow : function(recepientDetails,userContractsData){
      var dataToShow ={};
      this.view.ApprovalViewDetails.lblCreatedDetails.setVisibility(true);
      this.view.ApprovalViewDetails.flxTabs.setVisibility(false);
      this.view.ApprovalViewDetails.contractListRecipient.lblCol3.setVisibility(false);
      this.view.ApprovalViewDetails.contractListRecipient.imgCol3.setVisibility(false);
      //create flow
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT'].includes(recepientDetails.featureActionId)){
        var contractsData = {};
        dataToShow = this.getBeneficiaryManagementData(recepientDetails, userContractsData, true);
        contractsData.contracts = this.getSelectedContractList(dataToShow.contractsData, recepientDetails.cif);
        this.view.ApprovalViewDetails.contractListRecipient.preshow(contractsData,"CREATE");
        this.view.ApprovalViewDetails.lblCreatedDetails.text = kony.i18n.getLocalizedString("i18n.approvals.CreatedDetails");
        this.view.ApprovalViewDetails.contractListRecipient.setVisibility(true);
        this.view.ApprovalViewDetails.FlxRecipientsLinkedSeperator.setVisibility(true);
      } //delete flow
      else if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(recepientDetails.featureActionId)){
        dataToShow = this.getBeneficiaryManagementData(recepientDetails, userContractsData);
        this.view.ApprovalViewDetails.lblCreatedDetails.text = kony.i18n.getLocalizedString("i18n.approvals.DeletedDetails");
        this.view.ApprovalViewDetails.contractListRecipient.setVisibility(false);
        this.view.ApprovalViewDetails.FlxRecipientsLinkedSeperator.setVisibility(false);
      }

      this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true, this.view.ApprovalViewDetails.SegmentRecipientInfoDetails);
      this.setDataToSegmentRecipientInfoDetails(dataToShow.recipienBankDetails,true, this.view.ApprovalViewDetails.SegmentRecipientBankDetails);
    },
    /*
    * set details for create,delete type flows
    * @param: recepients data, users contract data
    */
    setBeneficiaryDataEditFlow : function(recepientDetails, userContractsData, showingUpdatedDetails){
      //hiding existing/updated tabs for view details popup
      this.view.ApprovalViewDetails.flxTabs.setVisibility(false);
      this.view.ApprovalViewDetails.lblCreatedDetails.setVisibility(true);
      this.view.ApprovalViewDetails.lblCreatedDetails.text = "Updated Details";
      this.resetTab();
      var dataToShow = this.getBeneficiaryManagementData(recepientDetails,userContractsData, showingUpdatedDetails);
      this.view.ApprovalViewDetails.contractListRecipient.lblCol3.setVisibility(true);
      this.view.ApprovalViewDetails.contractListRecipient.imgCol3.setVisibility(true);
      if(showingUpdatedDetails){ //Tab1 Active to show Updated details
        this.view.ApprovalViewDetails.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        this.view.ApprovalViewDetails.btnTab2.skin = "ICSknBtnAccountSummaryUnselected";
        var oldInfoJSON = this.getOldInfoDataObject(recepientDetails);
        //adding nickname with  "-" value as nickname field is not part of oldJson when nickname is not provided 
        if (oldInfoJSON.nickName === null || oldInfoJSON.nickName === undefined) {
          oldInfoJSON["nickName"] = "-";
        }
        var rowdatawithoutoldInfo = CommonUtilities.cloneJSON(recepientDetails);
        delete rowdatawithoutoldInfo.oldInfo;
        var isAnyRecipientInfoUpdated = false, isAnyBankInfoUpdated = false;
        var diff_Old_New_Data =this.compareJSONObjgetDiff(rowdatawithoutoldInfo,oldInfoJSON);
        var recipientInformation = {}
        if (diff_Old_New_Data.hasOwnProperty("beneficiaryName")) {
          recipientInformation["Name"] = {"Value": diff_Old_New_Data.beneficiaryName,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("phoneNumber")) {
          recipientInformation["Phone Number"] = {"Value": diff_Old_New_Data.phoneNumber,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("email")) {
          recipientInformation["Email ID"] = {"Value": diff_Old_New_Data.email,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("addressLine1")) {
          recipientInformation["AddressLine1"] = {"Value": diff_Old_New_Data.addressLine1,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("addressLine2")) {
          recipientInformation["AddressLine2"] = {"Value": diff_Old_New_Data.addressLine2,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("city")) {
          recipientInformation["City"] = {"Value": diff_Old_New_Data.city,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("country")) {
          recipientInformation["Country"] = {"Value": diff_Old_New_Data.country,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        if (diff_Old_New_Data.hasOwnProperty("zipcode")) {
          recipientInformation["Zipcode"] = {"Value": diff_Old_New_Data.zipcode,"isItUpdatedValue":true};
          isAnyRecipientInfoUpdated = true;
        }
        var bankInformation = {};
        if (diff_Old_New_Data.hasOwnProperty("nickName")) {
          bankInformation["Account Nickname"] = {"Value": diff_Old_New_Data.nickName,"isItUpdatedValue":true};
          isAnyBankInfoUpdated = true;
        }
        this.view.ApprovalViewDetails.flxSeperatorRecipientInfo.setVisibility(isAnyRecipientInfoUpdated);
        this.view.ApprovalViewDetails.lblRecipientInforation.setVisibility(isAnyRecipientInfoUpdated);
        this.view.ApprovalViewDetails.SegmentRecipientInfoDetails.setVisibility(isAnyRecipientInfoUpdated);
        this.view.ApprovalViewDetails.flxSeperatorBankDetails.setVisibility(isAnyBankInfoUpdated);
        this.view.ApprovalViewDetails.SegmentRecipientBankDetails.setVisibility(isAnyBankInfoUpdated);
        var contractsData = {};
        if (typeof(oldInfoJSON) == 'string') {
          oldInfoJSON = JSON.parse(oldInfoJSON);
        }
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo, recepientDetails.cif);
        contractsData.contracts = contractDiffData;
        this.view.ApprovalViewDetails.contractListRecipient.preshow(contractsData,"EDIT_UPDATED");
        this.setDataToSegmentRecipientInfoDetails(recipientInformation,true, this.view.ApprovalViewDetails.SegmentRecipientInfoDetails);
        this.setDataToSegmentRecipientInfoDetails(bankInformation,true, this.view.ApprovalViewDetails.SegmentRecipientBankDetails);
      }else{ //Tab2 Active to show existing details
        this.view.ApprovalViewDetails.btnTab1.skin = "ICSknBtnAccountSummaryUnselected";
        this.view.ApprovalViewDetails.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
        this.view.ApprovalViewDetails.flxSeperatorRecipientInfo.setVisibility(true);
        this.view.ApprovalViewDetails.lblRecipientInforation.setVisibility(true);
        this.view.ApprovalViewDetails.SegmentRecipientInfoDetails.setVisibility(true);
        this.view.ApprovalViewDetails.flxSeperatorBankDetails.setVisibility(true);
        this.view.ApprovalViewDetails.SegmentRecipientBankDetails.setVisibility(true);
        var contractsData = {};
        var oldInfoJSON = this.getOldInfoDataObject(recepientDetails);
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo);
        contractsData.contracts = contractDiffData;
        this.view.ApprovalViewDetails.contractListRecipient.preshow(contractsData,"EDIT_EXISTING");
        this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true, this.view.ApprovalViewDetails.SegmentRecipientInfoDetails);
        this.setDataToSegmentRecipientInfoDetails(dataToShow.recipienBankDetails,true, this.view.ApprovalViewDetails.SegmentRecipientBankDetails);
      }
    },
    /*
    * create single object for all the beneficiary details
    * @param: recepients data, users contract data
    */
    getBeneficiaryManagementData: function(selRecepientDetails,contractsMasterData, isUpdatedData){
      var finalData ={};
      var selectedRowFeatureActionId =selRecepientDetails.featureActionId;
      // For Delete flow we have to populate data from oldInfo JSON and recepientDetails so this variable act as a backupdata of slectedRow
      var dataforCreateAndDeleteFlow =selRecepientDetails;
      var recepientDetails;
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(selectedRowFeatureActionId)){
        recepientDetails = this.getOldInfoDataObject(selRecepientDetails);
      }else{
        recepientDetails = isUpdatedData === true ? selRecepientDetails :this.getOldInfoDataObject(selRecepientDetails);
      }
      var contractsData = contractsMasterData;
      var name =(recepientDetails.beneficiaryName) ?recepientDetails.beneficiaryName :"-";
      var recipient_Type = "-";
      if(recepientDetails.featureActionId){
        if(selectedRowFeatureActionId.toUpperCase().includes("INTER_BANK")){
          recipient_Type = "Inter Bank"
        }else{
          recipient_Type = "International"
        }
      }
      var address = "";
      if(recepientDetails.addressLine1){
        address = address+recepientDetails.addressLine1+", "
      }
      if(recepientDetails.addressLine2){
        address = address+recepientDetails.addressLine2+", "
      }
      if(recepientDetails.city){
        address = address+recepientDetails.city+", "
      }
      if(recepientDetails.country){
        address = address+recepientDetails.country+", "
      }
      if(recepientDetails.zipcode){
        address = address+recepientDetails.zipcode
      }
      if(recepientDetails.email){
        address = address + "\n"+ recepientDetails.email;
      }
      if(recepientDetails.phoneNumber){
        address = address + "\n"+ recepientDetails.phoneNumber;
      }
      var recipientData = {
        "Name": {"Value": name ,"isItUpdatedValue":false},
        "Recipient Type": {"Value": recipient_Type,"isItUpdatedValue":false},
        "Address": {"Value":(address) ?address : "-" ,"isItUpdatedValue":false}
      }
      var recipienBankDetails = {
        "BIC/SWIFT": {"Value": (recepientDetails.swiftCode) ?recepientDetails.swiftCode :"-", "isItUpdatedValue":false},
        "Account Number": {"Value":(recepientDetails.iban) ?recepientDetails.iban :"-","isItUpdatedValue":false},
        "Bank Name": {"Value":(recepientDetails.bankName) ?recepientDetails.bankName :"-","isItUpdatedValue":false},
        "Account Nickname": {"Value":(recepientDetails.nickName) ?recepientDetails.nickName :"-","isItUpdatedValue":false}
      }
      finalData.recipientData = recipientData;
      finalData.contractsData = contractsData;
      finalData.recipienBankDetails = recipienBankDetails;
      return finalData;
    },
    setDataToSegmentRecipientInfoDetails: function(data, needColon,segmentWidgetPath) {
      var Colon = "";
      var segData = [];
      if (needColon) {
        Colon = ":";
      }
      var keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var temp = {};
        temp.lblKey = key;
        temp.lblValue = data[key]["Value"];
        if(data[key]["isItUpdatedValue"]){
          temp.flxFlag = {
            "isVisible": true
          };
        }
        temp.lblColon = Colon;
        if (segmentWidgetPath.id === "SegmentRecipientInfoDetails" &&
            key === "Debit Account") {
          temp.lblIcon = {
            "isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
            "text": "r"
          };
        }
        temp.template = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 
                           "flxNonEditableRecipientanditsbankDetailsMobile":"flxNonEditableRecipientanditsbankDetails";
        segData.push(temp);
      }
      segmentWidgetPath.setData(segData);
    },
    /*
    * get the selected cif related contract data for create/delete benefeciary flows
    */
    getSelectedContractList : function(allContractData,selContractData){
      var allCifData = CommonUtilities.cloneJSON(allContractData);
      var selContractArr = selContractData ? JSON.parse(selContractData): [];
      var selCifIdArr = selContractArr.map(function(rec){return rec.coreCustomerId;});
      var filteredCifList = [];
      for(let i=0; i<allCifData.length; i++){
        var filteredCifArr = allCifData[i].contractCustomers.filter(function(currCust){
          if(selCifIdArr.includes(currCust.coreCustomerId)){
            return currCust;
          }
        });
        if(filteredCifArr.length > 0){
          allCifData[i].contractCustomers = filteredCifArr;
          filteredCifList.push(allCifData[i]);
        }
      }
      return filteredCifList;
    },
    /*
    * show updated details tab for edit beneficiary flow
    */
    showTab1: function(selectedRowData,InfinityuserContractsData) {
      var showingUpdatedDetails = true;
      this.setBeneficiaryDataEditFlow(selectedRowData,InfinityuserContractsData,showingUpdatedDetails)
    },
    /*
    * show existing details tab for edit beneficiary flow
    */
    showTab2: function(selectedRowData,InfinityuserContractsData) {
      var showingUpdatedDetails = false;
      this.setBeneficiaryDataEditFlow(selectedRowData,InfinityuserContractsData,showingUpdatedDetails)
    },
    /* reset tab skins */
    resetTab: function() {
      this.view.ApprovalViewDetails.btnTab1.skin = "ICSknBtnAccountSummaryUnselected";
      this.view.ApprovalViewDetails.btnTab2.skin = "ICSknBtnAccountSummaryUnselected";
    },
    /*
    * function to compare diff between 2 json objects
    */
    compareJSONObjgetDiff : function(json1, json2){
      var differences = {};
      // Compare values in json2
      for (var key in json2) {
        if (json2.hasOwnProperty(key)) {
          if (json1.hasOwnProperty(key) && json1[key] !== json2[key]) {
            differences[key] = json1[key];
          }
        }
      }
      // Compare values in json1 and add any missing keys
      for (var key in json1) {
        if (json1.hasOwnProperty(key) && !json2.hasOwnProperty(key)) {
          differences[key] = json1[key];
        }
      }
      return differences;
    },
    /*
    * get updated contract details based on diff from old and updated cif selections
    */
    getUpdatedContractDetailsFromDiff: function(contractsAllData, oldData, newData) {
      var oldContractObj = {},
          newContractObj = {},
          diffObj = {};
      var oldContractArr = oldData ? JSON.parse(oldData) : [];
      var newContractArr = newData ? JSON.parse(newData) : [];
      var allContractObj = contractsAllData.reduce(function(contractObj, currItem) {
        contractObj[currItem.contractId] = currItem.contractCustomers.reduce(function(cifObj, rec) {
          cifObj[rec.coreCustomerId] = {
            "id": rec.coreCustomerId,
            "isItUpdatedValue": false
          };
          cifObj["isItUpdatedValue"] = false;
          return cifObj;
        }, {});
        return contractObj;
      }, {});
      var oldContractObj = oldContractArr.reduce(function(contractObj, currItem) {
        contractObj[currItem.contractId] = currItem.cifs.reduce(function(cifObj, rec) {
          if (rec.id && !kony.sdk.isNullOrUndefined(allContractObj[currItem.contractId]) && allContractObj[currItem.contractId][rec.id]) {
            allContractObj[currItem.contractId][rec.id]["isLinked"] = rec.isLinked;
            cifObj[rec.id] = rec;
          }
          return cifObj;
        }, {});
        return contractObj;
      }, {});
      var newContractObj = newContractArr.reduce(function(contractObj, currItem) {
        var isUpdated = false;
        contractObj[currItem.contractId] = currItem.cifs.reduce(function(cifObj, rec) {
          if (rec.id && !kony.sdk.isNullOrUndefined(allContractObj[currItem.contractId]) && allContractObj[currItem.contractId][rec.id]) {
            if (!kony.sdk.isNullOrUndefined(allContractObj[currItem.contractId]) && allContractObj[currItem.contractId][rec.id].isLinked !== rec.isLinked) {
              isUpdated = true;
              allContractObj[currItem.contractId][rec.id]["isItUpdatedValue"] = true;
            }
            allContractObj[currItem.contractId][rec.id]["isLinked"] = rec.isLinked;
            cifObj[rec.id] = rec;
          }
          return cifObj;
        }, {});
        if (allContractObj[currItem.contractId]) {
          allContractObj[currItem.contractId]["isItUpdatedValue"] = isUpdated === true ? true : false;
        }
        return contractObj;
      }, {});
      for (let i = 0; i < contractsAllData.length; i++) {
        contractsAllData[i]["isItUpdatedValue"] = allContractObj[contractsAllData[i].contractId].isItUpdatedValue;
        for (let j = 0; j < contractsAllData[i].contractCustomers.length; j++) {
          if(!kony.sdk.isNullOrUndefined(allContractObj[contractsAllData[i].contractId][contractsAllData[i].contractCustomers[j].coreCustomerId].isLinked)){
            contractsAllData[i].contractCustomers[j]["isLinked"] = allContractObj[contractsAllData[i].contractId][contractsAllData[i].contractCustomers[j].coreCustomerId].isLinked;
          }
          else{
            contractsAllData[i].contractCustomers[j]["isLinked"]=false;
          }
          if(!kony.sdk.isNullOrUndefined(allContractObj[contractsAllData[i].contractId][contractsAllData[i].contractCustomers[j].coreCustomerId].isItUpdatedValue)){
            contractsAllData[i].contractCustomers[j]["isItUpdatedValue"] = allContractObj[contractsAllData[i].contractId][contractsAllData[i].contractCustomers[j].coreCustomerId].isItUpdatedValue || false;
          }else{
            contractsAllData[i].contractCustomers[j]["isItUpdatedValue"]=false;
          }
        }
      }
      return contractsAllData;
    },
    /*function parses and returns the oldInfo field as object */
    getOldInfoDataObject : function(selRecepientDetails){
      var recepientDetails ={};
      if(selRecepientDetails){
        if(selRecepientDetails.oldInfo && typeof selRecepientDetails.oldInfo === "string"){
          recepientDetails = JSON.parse(selRecepientDetails.oldInfo);
          //incase if reponse still needs to be parsed
          while(recepientDetails !== "" && typeof recepientDetails === "string"){
            recepientDetails = JSON.parse(recepientDetails);
          }
        }else{
          recepientDetails = selRecepientDetails.oldInfo || {};
        }
      }
      return recepientDetails;
    },
  };
});


