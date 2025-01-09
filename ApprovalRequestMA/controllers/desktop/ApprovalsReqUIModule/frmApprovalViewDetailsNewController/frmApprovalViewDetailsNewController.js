define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
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
    requestCount: 1,
    userContractsData : [],
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
          case BBConstants.SHOW_ACH_RECORDS_DATA:
            this.showFetchedTemplateOrTransationRecords(uiModel.responseData);
            break;
          case BBConstants.SHOW_ACH_FILES_DATA:
            this.showFetchedFileRecords(uiModel.responseData);
            break;
          case "achViewDetails":
            this.showUploadedFileApprovals(uiModel.responseData[0]);
            break;
          case "saving data":
            this.savingAckData(uiModel.responseData);
            break;
          case "initiator":
            this.initiator(uiModel.responseData);
            break;
          case "_CREATE_RECEPIENT":
          case "_DELETE_RECEPIENT":
          case "_EDIT_RECEPIENT_OPTIONAL":
          case "_EDIT_RECEPIENT":
            this.viewRecipientDetails(uiModel.responseData);
            break;
        }
        if (uiModel.transactionDownloadFile) {
          this.downloadAttachmentsFile(uiModel.transactionDownloadFile);
        }
      }
    },

    initiator: function (resData) {
      var CheckBoxData = this.ApprovalsReqUIModule.presentationController.getSelectedData();
      //initialize click event for history section expand/collapse arrow
      this.view.flxApprovalHistoryCollapseArrow.onClick = function(){
        var showSection = true;
        this.view.lblDropdown.text = this.view.lblDropdown.text === "O" ? "P" : "O";
        showSection = this.view.lblDropdown.text === "O" ? true : false;
        this.showHideApprovalHistorySection(showSection);
      }.bind(this);
      if (CheckBoxData.length != this.requestCount - 1) {
        //checkBoxData.shift();
        this.roadMapStructure();
        var transactionType = CheckBoxData[this.requestCount - 1].featureActionId;
        var selectedRequest = CheckBoxData[this.requestCount - 1];
        var transaction = BBConstants.GEN_TRANSACTION_VIEW_DETAILS;
        if (transactionType === "ACH_PAYMENT_CREATE" || transactionType === "ACH_COLLECTION_CREATE") {
          transaction = BBConstants.ACH_TRANSACTION_VIEW_DETAILS;
        } else if (transactionType === "ACH_FILE_UPLOAD") {
          transaction = BBConstants.ACH_FILE_VIEW_DETAILS;
        } else if (transactionType === "BULK_PAYMENT_FILES_SINGLE_UPLOAD_CSV" || transactionType === "BULK_PAYMENT_SINGLE_SUBMIT" || transactionType === "BULK_PAYMENT_MULTIPLE_SUBMIT") {
          this.navigateToviewDetails(eventobject, context);
        } else if (transactionType.includes("_CREATE_RECEPIENT")) {
          transaction = "_CREATE_RECEPIENT";
        } else if (transactionType.includes("_DELETE_RECEPIENT")) {
          transaction = "_DELETE_RECEPIENT";
        } else if (transactionType.includes("_EDIT_RECEPIENT_OPTIONAL")) {
          transaction = "_EDIT_RECEPIENT_OPTIONAL";
        } else if (transactionType.includes("_EDIT_RECEPIENT")) {
          transaction = "_EDIT_RECEPIENT";
        } else {
          transaction = BBConstants.GEN_TRANSACTION_VIEW_DETAILS;
        }
        //to store user contracts data in global variable
        if(transaction === "_CREATE_RECEPIENT" || transaction === "_DELETE_RECEPIENT" ||
           transaction === "_EDIT_RECEPIENT_OPTIONAL" || transaction === "_EDIT_RECEPIENT"){
          if(resData && resData.InfinityUserContractData){
            this.userContractsData = resData.InfinityUserContractData;
          }
          
        }   
        var navObj = {
          requestData: selectedRequest,
          onSuccess: {
            form: "frmApprovalViewDetailsNew",
            module: "ApprovalsReqUIModule",
            context: {
              key: transaction,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmApprovalViewDetailsNew",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SERVICE_ERROR,
              responseData: {}
            }
          }
        };
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      } else {
        this.requestCount = 1;
        var navObj = {
          onSuccess: {
            appName: "ApprovalRequestMA",
            form: "frmApprovalAcknowledgement",
            module: "ApprovalsReqUIModule",
            context: {
              key: "ack",
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
        //this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigation(navObj);
      }
    },
    savingAckData: function (data) {
      var count = this.ApprovalsReqUIModule.presentationController.getCount();
      var ApprovalDetails = this.ApprovalsReqUIModule.presentationController.getSelectedData();
      var ApprovalDetailsOfTransaction = ApprovalDetails[count];
      var AckData = {
        "requestId": kony.sdk.isNullOrUndefined(data.requestId) ? data.Request_id : data.requestId,
        "status": kony.sdk.isNullOrUndefined(data.status) ? (kony.sdk.isNullOrUndefined(data.Status) ? data.FileStatus : data.Status) : data.status,
        "from": ApprovalDetailsOfTransaction.customerName,
        "beneficiary": ApprovalDetailsOfTransaction.beneficiaryName,
        "accountNumber": ApprovalDetailsOfTransaction.accountId,
        "amount": ApprovalDetailsOfTransaction.amount,
        "transactionType": ApprovalDetailsOfTransaction.featureName,
        "referenceId": ApprovalDetailsOfTransaction.requestId,
        "featureActionId": ApprovalDetailsOfTransaction.featureActionId,
        "fullData": ApprovalDetailsOfTransaction.fullData,
        "userContractsData": this.userContractsData || []  //userContractsData for beneficiary related approvals
      };
      var finalCount = count + 1;
      this.ApprovalsReqUIModule.presentationController.setCount(finalCount);
      this.ApprovalsReqUIModule.presentationController.setMultiApprovalAckData(AckData);
      var navObj = {
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          requestData: this.userContractsData ? {"InfinityUserContractData":this.userContractsData} : null,
          context: {
            key: "initiator",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
    },
    roadMapStructure: function () {
      var CheckBoxData = this.ApprovalsReqUIModule.presentationController.getSelectedData();
      var length = CheckBoxData.length;
      var ackData = this.ApprovalsReqUIModule.presentationController.getMultiApprovalAckData();
      var componentConfig = [];
      var statcount = 0;
      var finalstatus = null;
      for (var i = 0; i < length + 1; i++) {
        var reqCount = i + 1;
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
          requestLabel: i == length ? kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement") : kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + reqCount.toString(),
          status: finalstatus,
          isCurrent: finalstatus == "In Progress" ? true : false,
          isLast: i == length ? true : false,
        }
        componentConfig.push(obj);
      }
      //callRoadMap
      this.view.ApprovalRoadMapElement.setRoadMapComponentConfig(componentConfig);
    },
    //         campaignSuccess: function(data) {
    //             var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
    //             CampaignManagementModule.presentationController.updateCampaignDetails(data);
    //             var self = this;
    //             if (data.length === 0) {

    //                 this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
    //             } else {
    //                 this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(true);

    //                 this.view.dbRightContainerNew.imgBanner.src = data[0].imageURL;
    //                 this.view.dbRightContainerNew.imgBanner.onTouchStart = function() {
    //                     CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
    //                 };
    //             }

    //             this.adjustScreen(50);
    //         },

    /**
         * onInit : onInit event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onInit: function () {
      FormControllerUtility.setRequestUrlConfig(this.view.browserTnC);
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.view.NonEditableDetailsforApprovals.lblACHTitleText.skin = ViewConstants.SKINS.LABEL_HEADER_BOLD;
    },

    /**
         * onPreShow :  onPreshow event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onPreShow: function () {
      this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
      this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      this.executeTemplateData = null;
      this.paymentAccounts = [];
      this.collectionAccounts = [];
      this.view.customheader.forceCloseHamburger();
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxContentContainerLeft', 'flxFooter', 'flxHeaderMain', 'flxMain', 'flxFormContent']);
      this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
      this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      // this.toggleErrorMessage("", false, 0);
      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalHistorySection.setVisibility(false);
      this.view.flxContentContainerLeft.setVisibility(true);
      this.view.flxDowntimeWarning.setVisibility(false);
      this.view.flxPopup.isVisible = false;
      this.view.flxPopup.trComments.placeholderSkin = "sknlbla0a0a015px";
      this.view.NonEditableDetailsforApprovals.lblCollapseArrow.text = "O";
      var scopeObj = this;
      var break_point = kony.application.getCurrentBreakpoint();


      this.view.onBreakpointChange = function () {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };

      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.NonEditableDetailsforApprovals.segDetails.rowTemplate = "flxNonEditableDetailsMobile";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.rowTemplate = "flxACHTemplateRecordDetailsMobile";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
      } else {
        this.view.NonEditableDetailsforApprovals.segDetails.rowTemplate = "flxNonEditableDetails";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.rowTemplate = "flxACHTemplateRecordDetails";
      }

      if (kony.application.getCurrentBreakpoint() <= 1024 || orientationHandler.isTablet) {
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


      //Basic Actions
      this.view.TemplateRecordsNew.TabBodyNew.setSegmentReloadAction(this.segReloadAction);
      //this.view.TemplateRecordsNew.setOnClickUpdateDefaultAmount(this.updateAmountOnClick.bind(this));

      this.view.NonEditableDetailsforApprovals.flxBtmSeperator.width = "100%";
      this.view.NonEditableDetailsforApprovals.flxBtmSeperator.left = "0%";
      this.view.lblApprovalHistoryInformation.top = "13px";
      this.view.btnClose.top = "35px";

      this.view.forceLayout();
      this.adjustScreen(0);

    },

    /**
         * viewACHTransactionDetails : This method is called inorder to show ACH Transaction Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHTransactionDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {
      this.selectedRowData = selectedRowData;
      this.view.flxACHFileUploadDetails.isVisible = false;
      if (!kony.sdk.isNullOrUndefined(isApprovalData) && isApprovalData === true) {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString();
      }

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
      this.view.lblApproveCountVal.text = this.getPendingApprovalsCount(selectedRowData);
      selectedRowData.Approver = selectedRowData.Approval;
      this.achTransactionViewDetailsApprove(selectedRowData);

      this.setupUIForACK("");
      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalHistorySection.setVisibility(false);

      if (isApprovalData) {
        //this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);
        this.skipOnclick(selectedRowData.requestId);

        //  this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);

        this.view.ApprovalFormActions.btnOption.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.onClick = () => {
          this.showApprovePopup();
          //this.approveACHTransaction(selectedRowData, BBConstants.APPROVED_ACH_TRANSACTION_ACK);
        };
        this.view.flxBackToPending.onClick = function () {
          this.showBackToPendingPopup("frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        }.bind(this);
        this.view.ApprovalFormActions.btnCancel.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.onClick = function () {
          this.rejectACHTransaction(selectedRowData, BBConstants.REJECTED_ACH_TRANSACTION_ACK);
        }.bind(this);

      }
      this.view.forceLayout();
      this.adjustScreen(50);
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
         * viewGeneralTransactionDetails : This method is called inorder to show general Transaction Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewGeneralTransactionDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {
      this.selectedRowData = selectedRowData;
      //selectedRowData.Payee = selectedRowData.Payee.toolTip;
      this.view.flxOverlay.setVisibility(false);
      this.view.flxPendingApprovers.setVisibility(false);
      this.view.NonEditableDetailsforApprovals.flxDetailsCollapseArrow.setVisibility(false);
      this.view.lblApprovalStatusValue.text = selectedRowData.status;
      this.view.lblApproveCountVal.text = selectedRowData.receivedApprovals;
      if (ishistory === false || ishistory === "false" || kony.sdk.isNullOrUndefined(ishistory) || selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if (!kony.sdk.isNullOrUndefined(selectedRowData)) {
          if (selectedRowData.isGroupMatrix === "true" || selectedRowData.isGroupMatrix === true) {
            this.view.btnPendingAprrovers.setVisibility(true);
          } else {
            this.view.btnPendingAprrovers.setVisibility(false);
          }
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
      } else {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var scope = this;
      scope.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(this, selectedRowData)
      scope.view.imgPopupclose.onTouchEnd = function() {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }
      scope.view.btnClose.onClick = function() {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }

      selectedRowData.DebitOrCreditAccount = selectedRowData.customerName + selectedRowData.accountID;
      selectedRowData.CreatedOn = selectedRowData.sentDate;
      selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.view.flxApprovalDetailsStatus.setVisibility(true);
      this.view.flxApprovedCountDetails.setVisibility(true);

      this.generalTransactionsAcknowledgement(selectedRowData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalHistorySection.setVisibility(false);

      if (isApprovalData) {
        //this.btnConfigForApprovalViewDetails(BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        this.skipOnclick(selectedRowData.requestId);

        this.view.ApprovalFormActions.btnOption.isVisible = (!ishistory && (selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.onClick = () => {
          this.showApprovePopup();
        };

        this.view.ApprovalFormActions.btnCancel.isVisible = (!ishistory && (selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.onClick = function () {
          this.rejectGeneralTransaction(selectedRowData);
        }.bind(this);

      }

      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-60);
    },


    /**
         * viewACHFileDetails : This method is called inorder to show ACH File Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHFileDetails: function (selectedRowData, isApprovalData, isRequestData, ishistory) {
      this.selectedRowData = selectedRowData;
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

      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalHistorySection.setVisibility(false);

      if (isApprovalData) {
        //this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        //  this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        this.skipOnclick(selectedRowData.requestId);

        this.view.ApprovalFormActions.btnOption.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.onClick = () => {
          this.showApprovePopup();
          //this.approveACHFile(selectedRowData, BBConstants.APPROVED_ACH_FILE_ACK);
        };
        this.view.flxBackToPending.onClick = function () {
          this.showBackToPendingPopup("frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        }.bind(this);
        this.view.ApprovalFormActions.btnCancel.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.onClick = function () {
          this.rejectACHFile(selectedRowData, BBConstants.REJECTED_ACH_FILE_ACK);
        }.bind(this);

      }
      this.view.forceLayout();
      this.adjustScreen(0);
      FormControllerUtility.hideProgressBar(this.view);
    },


    /**
         * btnConfigForApprovalViewDetails : This method is called inorder to configure action buttons in Approval View Details form
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} transactionType - Type of transaction
         * @return {}
         * @throws {}
         */
    skipOnclick: function (requestId) {
      this.view.ApprovalFormActions.btnNext.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("kony.mb.common.skip");
      this.view.ApprovalFormActions.btnBack.onClick = function () {
        this.showSkipPopup(requestId);
      }.bind(this);
    },

    /**
         * onPostShow :  onPostShow event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onPostShow: function () {
      var scopeObj = this;
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.onBreakpointChange = function () {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      if (kony.application.getCurrentBreakpoint() <= 640) {
        this.view.TemplateRecordsNew.lblTotalAmmount.left = "2.8%";
        this.view.ApprovalFormActions.btnBack.width = "97%";
        this.view.ApprovalFormActions.btnCancel.width = "97%";
        this.view.ApprovalFormActions.btnOption.width = "97%";
        this.view.ApprovalFormActions.btnNext.width = "97%";
        this.view.flxApprovalStatus.height = "205dp";
      }
      this.adjustScreen(0);
    },


    //**************************************************************** TRANSACTION AND TEMPLATE - CREATING & FETCHING ***************************************************//


    /**
         * fetchTemplateRecords : fetch the required Template Records.
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} inputparams - transaction details from Template
         * @return {}
         * @throws {}
         */
    fetchTemplateRecords: function (inputparams, isEdit) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: isEdit ? BBConstants.SHOW_ACH_RECORDS_FOR_EDIT : BBConstants.SHOW_ACH_RECORDS_DATA,
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
      scopeObj.ApprovalsReqUIModule.presentationController.getACHTemplateRecords(navObj);
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
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_FILES_DATA,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
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
         * fetchTransactionRecords : fetch the required transaction Records.
         * @member of {frmApprovalViewDetailsController}
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
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_RECORDS_DATA,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.TEMPLATE_RECORDS_FAILURE,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getACHTransactionRecords(navObj);
    },

    /**
         * showFetchedTemplateOrTransationRecords : set the fetched Data based on the template/Transaction type
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} response - array of transaction/template records data
         * @return {}
         * @throws {}
         */
    showFetchedTemplateOrTransationRecords: function (response) {
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (response.length > 0) {
        var requestType = response[0].TemplateRequestTypeValue;
        this.view.TemplateRecordsNew.lblAmountColon.setVisibility(false);
        if ((response.isTaxType || /Tax/.test(requestType)))
          this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = null;
        else if (breakpoint === 640 || orientationHandler.isMobile)
          this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
        else
          this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeader";
        this.populateACKTemplateRecords(requestType, this.getTRACKRowDataMap(requestType), [response]);
      } else {
        //need to work on this,since we are not supposed to use alert statements
        this.view.flxContentContainer.setVisibility(false);
        this.view.flxDowntimeWarning.setVisibility(true);
        this.view.lblDowntimeWarning.text = kony.i18n.getLocalizedString("kony.i18n.userMgmt.NoRecordsFound");
        this.view.imgCloseDowntimeWarning.setVisibility(false);
        this.view.flxDowntimeWarning.skin = "sknFFFFFFmodbr3px";
        this.view.lblDowntimeWarning.skin = "bbSknLblFF001FLatoBold15Px";
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
        this.adjustScreen(0);
      }
      this.hideTemplateRecordsErrorMessage();
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-120);
    },

    /**
         * populateACKTemplateRecords : Populate the ACK Segment for Template Records based on Request Type
         * @member of {frmApprovalViewDetailsController}
         * @param {String} requestType - Name or Type of Template
         * @param {JSON Object} rowDataMap - RowDataMap to Map the data with the segment
         * @param {JSON Array} rows - Array of JSON Template REcords fetched from the service
         * @return {}
         * @throws {}
         */
    populateACKTemplateRecords: function (requestType, rowDataMap, rows) {

      FormControllerUtility.showProgressBar(this.view);
      this.rowsDataForSending = rows;

      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640 || orientationHandler.isMobile) {
        var sectionData = this.getTRSectionData(requestType);
      } else {
        var sectionData = this.getAckTRSectionData(requestType);
      }

      var defaultValues = this.getTrACKDefaultValues(requestType);

      if (kony.sdk.isNullOrUndefined(rows))
        rows = [this.view.TabPaneNew.TabBodyNew.getData()[0][1]];

      this.view.TemplateRecordsNew.TabBodyNew.setSectionData([sectionData]);
      this.view.TemplateRecordsNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TemplateRecordsNew.TabBodyNew.setDefaultValues([defaultValues]);
      this.view.TemplateRecordsNew.TabBodyNew.addDataForSections(rows);
      this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
        id: "Amount"
      });

      this.view.TemplateRecordsNew.flxTotalAmountCreate.isVisible = false;
      this.view.TemplateRecordsNew.flxTotalAmount.isVisible = true;
      // this.view.TemplateRecordsNew.lblTotalAmount.text = rows[0][0].Amount.text;
      this.view.TemplateRecordsNew.lblTotalAmmount.skin = 'sknlbl424242Lato15pxWeight500';
      this.view.TemplateRecordsNew.lblColon.skin = 'sknlbl424242Lato15pxWeight500';
      this.view.TemplateRecordsNew.lblTotalAmount.skin = 'sknlbl424242Lato15pxWeight500';
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    /**
         * getTRACKRowDataMap : set the rowDataMap based on the template/Transaction type
         * @member of {frmApprovalViewDetailsController}
         * @param {string} requestType - value of the template/transaction type
         * @return {JSON Object} rowDataMap - rowDataMap for the Segment to show the Records in the Transaction/Template
         * @throws {}
         */
    getTRACKRowDataMap: function (requestType) {
      var rowDataMap = {
        lblAckName: "Record_Name",
        lblAckAccountNumber: "ToAccountNumber",
        lblAckAccountType: "ToAccountTypeValue",
        lblAckABAOrTRCNumber: "ABATRCNumber",
        lblAckDetailsID: "Detail_id",
        lblAckAmount: "Amount"
      };

      if (/CCD|CTX|Web/.test(requestType)) {
        rowDataMap["lblAckAdditionalInfoValue"] = "AdditionalInfo";
      } else if (/Tax/.test(requestType)) {
        rowDataMap = {
          lblEINValue: "EIN",
          lblAccNumVal: "ToAccountNumber",
          lblAckAccTypeVal: "ToAccountTypeValue",
          lblAckTRCorARBVal: "ABATRCNumber",
          lblAckEffDateVal: "EffectiveDate",
          lblAckTaxTypeVal: "TaxType",
          lblAckSubCateVal: "taxSubType",
          imgChkZeroTax: "IsZeroTaxDue",
          lblAckSubCatAmtVal: "Amount"
        };
      }
      return rowDataMap;
    },

    /**
          method is used to set UI when fetching template records is sucess
        **/
    hideTemplateRecordsErrorMessage: function () {
      //this.view.flxTemplateRecordsErrorMessage.setVisibility(false);
      this.view.TemplateRecordsNew.setVisibility(true);
      this.adjustScreen(0);
    },

    getTRSectionData: function (requestType) {
      var breakpoint = kony.application.getCurrentBreakpoint();
      var amountLeft = (breakpoint === 1024 || orientationHandler.isTablet) ? "7%" :
        (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "10.3%";
      var sectionData = {
        lblNameKey: kony.i18n.getLocalizedString("i18n.konybb.Common.Name"),
        lblAccountNumberKey: kony.i18n.getLocalizedString("i18n.common.accountNumber"),
        lblAccountTypeKey: kony.i18n.getLocalizedString("i18n.transfers.accountType"),
        lblABAOrTRCNumberKey: kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC"),
        lblDetailsIDKey: kony.i18n.getLocalizedString("i18n.konybb.common.detailId"),
        lblAmountKey: {
          "text": kony.i18n.getLocalizedString("i18n.transfers.lblAmount"),
          "left": amountLeft
        }
      };

      if (/Tax/.test(requestType))
        sectionData = {
          "flxMain": {
            "isvisible": false
          }
        };

      return sectionData;
    },

    getAckTRSectionData: function (requestType) {
      var breakpoint = kony.application.getCurrentBreakpoint();
      var amountLeft = (breakpoint >= 1024 || orientationHandler.isTablet) ? "4%" :
        (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "10.3%";
      var sectionData = {
        lblNameKey: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Name"),
          "left": "1.67%",
          "width": "8%"
        },
        lblAccountNumberKey: {
          "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
          "left": "8.2%",
          "width": "10%"
        },
        lblAccountTypeKey: {
          "text": kony.i18n.getLocalizedString("i18n.transfers.accountType"),
          "left": "6.2%",
          "width": "10%"
        },
        lblABAOrTRCNumberKey: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC"),
          "left": "6.2%",
          "width": "14%"
        },
        lblDetailsIDKey: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.detailId"),
          "left": "6.2%",
          "width": "10%"
        },
        lblAmountKey: {
          "text": kony.i18n.getLocalizedString("i18n.transfers.lblAmount"),
          "left": "4%",
          "width": "10%"
        }
      };

      if (/Tax/.test(requestType))
        sectionData = {
          "flxMain": {
            "isvisible": false
          }
        };

      return sectionData;
    },

    getTrACKDefaultValues: function (requestType) {
      var ackDefaultValues = {
        flxPaymentTemplate: {
          "isVisible": false
        },
        flxAckTemplateDetails: {
          "isVisible": true
        },
        flxCreatePaymentTemplate: {
          "isVisible": false
        },
        flxAdditionalInfoTemplate: {
          "isVisible": false
        },
        flxAckAdditionalInfo: {
          "isVisible": false
        },
        flxTaxTemplate: {
          "isVisible": false
        },
        flxAckTaxTemplate: {
          "isVisible": false
        },
        lblAckCurrencySymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        lblAckAdditionalInfo: {
          "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
        },
        imgAckInfo: {
          "src": "info_grey.png"
        }
      };


      if (/CCD|CTX|Web/.test(requestType)) {
        ackDefaultValues["flxAckAdditionalInfo"] = {
          "isVisible": true
        };
        ackDefaultValues["lblAckAdditionalInfo"] = {
          "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
        };
        ackDefaultValues["imgAckInfo"] = {
          "src": "info_grey.png"
        };
      } else if (/Tax/.test(requestType)) {

        ackDefaultValues = {
          flxPaymentTemplate: {
            "isVisible": false
          },
          flxAckTemplateDetails: {
            "isVisible": false
          },
          flxCreatePaymentTemplate: {
            "isVisible": false
          },
          flxAdditionalInfoTemplate: {
            "isVisible": false
          },
          flxAckAdditionalInfo: {
            "isVisible": false
          },
          flxAckTaxTemplate: {
            "isVisible": true
          },
          flxTaxTemplate: {
            "isVisible": false
          },
          lblEIN: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.tax.EIN") + " :"
          },
          lblAckAccNum: {
            "text": kony.i18n.getLocalizedString("i18n.common.accountNumber") + " :"
          },
          lblAckAccType: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.accountType") + " :"
          },
          lblAckTRCNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC") + " :"
          },
          lblAckEffDate: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate") + " :"
          },
          lblAckTaxType: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.taxType") + " :"
          },
          lblAckSubCate: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.subCategoryType") + " :"
          },
          lblAckSubCateAmt: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.subCategoryAmount") + " :"
          },
          lblAckTaxCurrSymbol: {
            "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
          },
        };
      }
      return ackDefaultValues;
    },

    showFetchedFileRecords: function (response) {

      if (!kony.sdk.isNullOrUndefined(response.transactionRecords)) {
        if (response.transactionRecords.length > 0) {
          this.view.TemplateRecordsNew.lblAmountColon.setVisibility(false);
          FormControllerUtility.showProgressBar(this.view);
          var breakpoint = kony.application.getCurrentBreakpoint();
          var amountLeft = (breakpoint >= 1024 || orientationHandler.isTablet) ? "4%" : (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "10.3%";
          if (breakpoint === 640 || orientationHandler.isMobile) {
            this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
          } else {
            this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeader";
          }
          var sectionData = {
            lblNameKey: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Name"),
              "left": "1.67%",
              "width": "8%"
            },
            lblAccountNumberKey: {
              "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
              "left": "8.2%",
              "width": "10%"
            },
            lblAccountTypeKey: {
              "text": kony.i18n.getLocalizedString("i18n.transfers.accountType"),
              "left": "6.2%",
              "width": "10%"
            },
            lblABAOrTRCNumberKey: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.Common.OffsetAccNum"),
              "left": "6.2%",
              "width": "14%"
            },
            lblDetailsIDKey: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
              "left": "6.2%",
              "width": "10%"
            },
            lblAmountKey: {
              "text": kony.i18n.getLocalizedString("i18n.transfers.lblAmount"),
              "left": amountLeft,
              "width": "10%"
            }

          };
          var ackDefaultValues = {
            flxPaymentTemplate: {
              "isVisible": false
            },
            flxAckTemplateDetails: {
              "isVisible": true
            },
            flxCreatePaymentTemplate: {
              "isVisible": false
            },
            flxAdditionalInfoTemplate: {
              "isVisible": false
            },
            flxAckAdditionalInfo: {
              "isVisible": false
            },
            flxTaxTemplate: {
              "isVisible": false
            },
            flxAckTaxTemplate: {
              "isVisible": false
            },
            lblAckCurrencySymbol: {
              "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
            },
            lblAckAdditionalInfo: {
              "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
            },
            imgAckInfo: {
              "src": "info_grey.png"
            }
          };
          var rowDataMap = {
            lblAckName: "receiverName",
            lblAckAccountNumber: "receiverAccountNumber",
            lblAckAccountType: "receiverAccountType",
            lblAckABAOrTRCNumber: "offsetAccountNumber",
            lblAckDetailsID: "receiverTransactionType",
            lblAckAmount: "amount"
          };

          if (kony.sdk.isNullOrUndefined(response.transactionRecords))
            response.transactionRecords = [this.view.TabPaneNew.TabBodyNew.getData()[0][1]];

          this.view.TemplateRecordsNew.TabBodyNew.setSectionData([sectionData]);
          this.view.TemplateRecordsNew.TabBodyNew.setRowDataMap([rowDataMap]);
          this.view.TemplateRecordsNew.TabBodyNew.setDefaultValues([ackDefaultValues]);
          this.view.TemplateRecordsNew.TabBodyNew.addDataForSections([response.transactionRecords]);
          this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
            id: "amount"
          });

          this.view.TemplateRecordsNew.flxTotalAmountCreate.isVisible = false;
          this.view.TemplateRecordsNew.flxTotalAmount.isVisible = true;
          this.hideTemplateRecordsErrorMessage();
        }
      } else {
        this.showTemplateRecordsErrorMessage();
      }
      this.view.flxTemplateRecordHeader.isVisible = true;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    /**
    method is used to set UI when fetching template records fails
  **/
    showTemplateRecordsErrorMessage: function () {
      this.view.lblTemplateRecordsError.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.UnableToFetchData");
      this.view.flxTemplateRecordsErrorMessage.setVisibility(true);
      this.view.TemplateRecordsNew.setVisibility(false);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },
      

    //******************************************************************* ACH FILE ACTIONS & ACKNOWLEDGMENTS ********************************************************//

    /**
         * approveACHFile : onclick action for the approving of an ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventobject - JSON object of the button which triggered the event
         * @param {JSON Object} context - segment details for the selected or the triggered event
         * @return {}
         * @throws {}
         */
    approveACHFile: function (selectedRowData, successKey) {
      var scopeObj = this;
      var Request_id = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": Request_id,
        "featureActionId": featureActionId,
        "Comments": "",

      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: successKey,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      //scopeObj.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      scopeObj.ApprovalRequestsModule.presentationController.approveACHFiles(navObj);
    },


    /**
         * rejectACHFile : onclick action for Rejecting an ACH File, Shows a confirmation Pop - Up
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventobject - JSON object of the button which triggered the event
         * @param {JSON Object} context - segment details for the selected or the triggered event
         * @return {}
         * @throws {}
         */
    rejectACHFile: function (selectedRowData, successKey) {
      var Request_id = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var params = {
        "requestId": Request_id,
        "featureActionId": featureActionId
      };
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectFileConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHFileService.bind(this, params, "saving data"));
    },


    /**
         * rejectACHFileService : onclick Pop - UP Yes, the action for Reject ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {String} Request_id - request to delete the ACH File of ID
         * @return {}
         * @throws {}
         */
    rejectACHFileService: function (params, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": params.requestId,
        "featureActionId": params.featureActionId,
        "Comments": Comments,

      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHFiles(navObj);
    },

    /**
         * rejectGeneralTransaction : onclick action for Rejecting a General Transaction, Shows a confirmation Pop - Up
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected segment Row Data
         * @return {}
         * @throws {}
         */
    rejectGeneralTransaction: function (selectedRowData) {
      var Request_id = selectedRowData["Request_id"];
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };
      if (selectedRowData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE)
        this.showPopup(popupConfig, this.rejectChequeBookRequest.bind(this, selectedRowData));
      else
        this.showPopup(popupConfig, this.rejectTransactionService.bind(this, selectedRowData));
    },


    rejectChequeBookRequest: function (recordData) {
      this.hidePopup();
      var scopeObj = this;
      FormControllerUtility.showProgressBar(this.view);
      var Comments = scopeObj.view.flxPopup.trComments.text;
      var params = {
        "requestId": recordData.requestId,
        "comments": Comments,
        "featureActionId": BBConstants.CHEQUE_BOOK_REQUEST_CREATE
      };
      var navObj = {
        requestData: params,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: recordData
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalRequestsModule.presentationController.rejectChequeBookRequest(navObj);
    },
    /**
         * rejectTransactionService : onclick Pop - UP Yes, the action for Reject General Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {String} Request_id - request to delete the ACH Transaction of given Id
         * @return {}
         * @throws {}
         */
    rejectTransactionService: function (selectedRowData) {
      var Comments = this.view.flxPopup.trComments.text;
      var scopeObj = this;
      scopeObj.hidePopup();
      FormControllerUtility.showProgressBar(this.view);
      var req = {
        "requestId": selectedRowData.requestId,
        "featureActionId": selectedRowData.featureActionId,
        "comments": Comments
      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: selectedRowData
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalRequestsModule.presentationController.rejectTransactions(navObj);
    },



    achFileViewDetailsApprovals: function (data) {
      FormControllerUtility.showProgressBar(this.view);
      this.achData = data;
      //this.view.flxImgPrintAch.setVisibility(false);
      //this.view.flxImgDownloadAch.setVisibility(false);
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
      var scope = this;
      if (!kony.sdk.isNullOrUndefined(data)) {
        if ((data.isGroupMatrix === "true" || data.isGroupMatrix === true) && data.status.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
          this.view.btnPendingAprrovers.setVisibility(true);
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
      } else {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var break_point = kony.application.getCurrentBreakpoint();
      this.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(scope, data);
      scope.view.imgPopupclose.onTouchEnd = scope.pendingApproversVisibility;
      scope.view.btnClose.onClick = scope.pendingApproversVisibility;
      this.view.lblFormatTypeValue.text = data.fileType;
      this.view.lblRequestTypeValue.text = data.requestType;
      this.view.lblFileNameAck.text = data.FileName;

      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString();
      kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      if (kony.sdk.isNullOrUndefined(data.requestId) || kony.sdk.isEmptyObject(data.requestId)) {
        this.view.flxApprovalHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = data.Approver;
        this.fetchRequestHistoryData(data.requestId);
      }
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
      this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_FILES_TAB
      });

      if (data.amICreator === "true" && data.amIApprover === "true" && data.status.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
        this.view.ApprovalFormActions.btnCancel.isVisible = false;

        this.view.ApprovalFormActions.btnBack.isVisible = true;
        this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
        this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
          "key": BBConstants.SHOW_ACH_FILES_TAB
        });
        this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");

        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
        this.view.ApprovalFormActions.btnNext.isVisible = true;
        this.view.ApprovalFormActions.btnNext.onClick = this.withdrawRequest.bind(this, data, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE);

        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;

        this.view.ApprovalFormActions.btnOption.isVisible = true;
        this.view.ApprovalFormActions.btnOption.onClick = this.approveACHFile.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);

        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.isVisible = true;
        this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHFile.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
      } else if (data.amICreator === "true" && data.status.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
        this.view.ApprovalFormActions.btnNext.isVisible = true;
        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnNext.onClick = this.withdrawRequest.bind(this, data, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE);
      } else if (data.amIApprover === "true" && data.status.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
        this.view.ApprovalFormActions.btnNext.isVisible = false;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.isVisible = true;
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnOption.onClick = this.approveACHFile.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);

        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.isVisible = true;
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
        this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHFile.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);

        this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
        this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
        this.view.ApprovalFormActions.btnBack.isVisible = true;
        this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
          "key": BBConstants.SHOW_ACH_FILES_TAB
        });
      } else {
        this.view.ApprovalFormActions.btnCancel.isVisible = false;
        this.view.ApprovalFormActions.btnOption.isVisible = false;
        this.view.ApprovalFormActions.btnNext.isVisible = false;
      }
      this.fetchFileRecords({
        "achFileId": data.transactionId // need to check
      });
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * approveACHTransaction : action to approve an ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventObject - Object triggered by the widget
         * @param {JSON Object} context - segment context
         * @return {}
         * @throws {}
         */
    approveACHTransaction: function (selectedRowData, successKey) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule").presentationController.writeDataStore("selectedRowData", selectedRowData);
      var ACHTransactionId = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": ACHTransactionId,
        "featureActionId": featureActionId,
      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      //this.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.approveACHTransactions(navObj);
    },



    /**
         * rejectACHTransaction : show an pop - up to confirm Reject ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventObject - Object triggered by the widget
         * @param {JSON Object} context - segment context
         * @return {}
         * @throws {}
         */
    rejectACHTransaction: function (selectedRowData, successKey) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule").presentationController.writeDataStore("selectedRowData", selectedRowData);
      var Request_id = selectedRowData["requestId"];
      var faetureActionId = selectedRowData["featureActionId"];
      var param = {
        "requestId": Request_id,
        "featureActionId": faetureActionId
      };

      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHTransactionService.bind(this, param, "saving data"));
    },


    /**
         * rejectACHTransactionService : reject the ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {string} request_id  - id of the ACH Transaction to be deleted
         * @return {}
         * @throws {}
         */
    rejectACHTransactionService: function (param, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": param.requestId,
        "featureActionId": param.featureActionId,
        "comments": Comments
      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHTransactions(navObj);
    },

    //need to check
    fetchRequestHistoryData: function (requestId) {
      var navObj = {
        requestData: {
          "Request_id": requestId
        },
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
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
    expandCollapseRowMobile : function(eventObj,context){
      var scopeObj =this;
      var rowInd = context.rowIndex;
      var segData = scopeObj.view.segApprovalDetails.data;
      var rowData = segData[0][1][context.rowIndex];
      rowData.flxHistoryInforamtion.isVisible = rowData.flxHistoryInforamtion.isVisible === true ? false:true;
      rowData.imgDropdown.text = rowData.imgDropdown.text === "O" ? "P": "O";
      segData[0][1][context.rowIndex] = rowData
      scopeObj.view.segApprovalDetails.setData(segData);
    },
    //need to check
    showRequestHistoryData: function (segRowData) {
      var scopeObj =this;
      var rowDataArr = [];
      this.view.flxApprovalHistoryContent.isVisible = true;
      this.view.flxApprovalsHistoryErrorMessage = false;
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
          this.view.segApprovalDetails.widgetDataMap = dataMap;
          this.view.segApprovalDetails.setData(segDataModel);
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
          this.view.flxApprovalStatus.isVisible = false;
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
            this.view.lblApprovalStatusValue.text = kony.i18n.getLocalizedString("i18n.accounts.pending");
          else {
            this.view.lblApprovalStatusValue.text = segRowData[segRowData.length - 1].Status;
            if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
              this.view.btnPendingAprrovers.setVisibility(false);
            }
          }
          var break_point = kony.application.getCurrentBreakpoint();
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
          this.view.flxApprovalStatus.isVisible = true;
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
        for (let i = 0; i < segRowData.length; i++) {
          if (segRowData[i].Status !== "Approval Pending") {
            segRowViewData.push(segRowData[i])
          }
        }
        var segDataModel = [
          [segHeader, segRowViewData]
        ];
        this.view.segApprovalDetails.widgetDataMap = dataMap;
        this.view.segApprovalDetails.setData(segDataModel);

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
                      } else if (typeof (segRowData[i]["userName"]) == 'string') {
                        createdByData = segRowData[i]["userName"];
                      }
                    }
                  }
                } else if (typeof (segRowData[i]["Comments"]) == 'string') {
                  if (segRowData[i]["Comments"] == "Request Created") {
                    if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"])) {
                      if (!kony.sdk.isNullOrUndefined(segRowData[i]["userName"]["text"])) {
                        createdByData = segRowData[i]["userName"]["text"];
                      } else if (typeof (segRowData[i]["userName"]) == 'string') {
                        createdByData = segRowData[i]["userName"];
                      }
                    }
                  }
                }
              }
            }
          }
        } catch (err) { }
        try {
          var currentData = this.view.NonEditableDetailsforApprovals.segDetails.data;
          for (var j = 0; j < currentData.length; j++) {
            if(currentData[j].lblKey == "Sent By") {
              currentData[j].lblKey = "Requested By";
              currentData[j].lblValue = createdByData;
            }
          }
          this.view.NonEditableDetailsforApprovals.segDetails.setData(currentData);
        } catch (err) { }
      }
      this.view.flxApprovalHistorySection.setVisibility(true);
      this.view.lblApproveCountVal.text = this.getNumberOfApprovals(segRowViewData).toString();
      this.view.lblRejectCountVal.text = this.getNumberOfRejected(segRowViewData).toString();
      this.adjustScreen(-60);
    },
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
    showRequestHistoryFailure: function () {
      this.view.flxApprovalHistoryContent.isVisible = false;
      this.view.flxApprovalsHistoryErrorMessage = true;
      this.view.lblApprovalHistoryError.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.UnableToFetchData");
      FormControllerUtility.hideProgressBar(this.view);
    },

    rejectACHTransactionACH: function (selectedRowData, successKey) {
      var Request_id = selectedRowData["Request_id"];

      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHTransactionServiceACH.bind(this, selectedRowData, successKey));
    },


    /**
         * rejectACHTransactionService : reject the ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {string} request_id  - id of the ACH Transaction to be deleted
         * @return {}
         * @throws {}
         */
    rejectACHTransactionServiceACH: function (selectedRowData, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": selectedRowData["Request_id"],
        "comments": Comments,
        "featureActionId": selectedRowData["featureActionId"]
      };

      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHTransactions(navObj);
    },


    achTransactionViewDetailsApprove: function (data, isApproved) {
      this.achData = data;
      // this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
      //     kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
      //     kony.i18n.getLocalizedString("i18n.common.ViewDetails");
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

      this.view.NonEditableDetailsforApprovals.setData(templateData, true);
      this.view.NonEditableDetailsforApprovals.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
      if (kony.sdk.isNullOrUndefined(data.requestId)) {
        this.view.flxApprovalHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(data.requestId);
        this.view.lblApprovalStatusValue.text = data.Status || data.status;
      }
      if (!kony.sdk.isNullOrUndefined(data)) {
        if ((data.isGroupMatrix === "true" || data.isGroupMatrix === true) && data.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
          this.view.btnPendingAprrovers.setVisibility(true);
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
      } else {
        this.view.btnPendingAprrovers.setVisibility(false);
      }

      var break_point = kony.application.getCurrentBreakpoint();
      this.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(this, data);
      var scope = this;
      scope.view.imgPopupclose.onTouchEnd = scope.pendingApproversVisibility;
      scope.view.btnClose.onClick = scope.pendingApproversVisibility;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.backToTransactions");
      this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TRANSACTIONS_TAB
      });
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      if (data.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !isApproved) {
        if (!kony.sdk.isNullOrUndefined(data.amIApprover) && (data.amIApprover === "true")) {
          this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
          this.view.ApprovalFormActions.btnOption.isVisible = true;
          this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
          this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
          this.view.ApprovalFormActions.btnOption.onClick = this.approveACHTransaction.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION);
          this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
          this.view.ApprovalFormActions.btnCancel.isVisible = true;
          this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
          this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHTransaction.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION);
        }
        if (!kony.sdk.isNullOrUndefined(data.amICreator) && (data.amICreator === "true")) {
          if (this.view.ApprovalFormActions.btnOption.isVisible === true) {
            this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
          }
          this.view.ApprovalFormActions.btnNext.isVisible = true;
          this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")
          this.view.ApprovalFormActions.btnNext.onClick = this.withdrawRequest.bind(this, data, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHTRANSACTION);
        }
      } else {
        this.view.ApprovalFormActions.btnCancel.isVisible = false;
        this.view.ApprovalFormActions.btnOption.isVisible = false;
        this.view.ApprovalFormActions.btnNext.isVisible = false;
      }

      this.fetchTransactionRecords({
        "Transaction_id": data.transactionId
      });

      this.view.forceLayout();
      this.adjustScreen(-120);
    },
    //*********************************************************************** GENERAL TRANSACTIONS ACKNOWLEDGE *********************************************************//

    /**
         * generalTransactionsAcknowledgement : function to show Ack screen for General Transactions When Approved/ Rejected/ Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} context - data of the general transaction
         * @return {}
         * @throws {}
         */
    generalTransactionsAcknowledgement: function (context, formName, contextKey) {
      this.context = context;
      this.view.ApprovalFormActions.enableNextButton();
      this.showACKForOtherTransactions(this.context);
      var transactionType = this.context.featureActionName;
      if (contextKey === BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS) {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString(); //need to check
      } else {
        this.view.flxContentHeader.lblContentHeader.text = transactionType + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      }
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.flxBackToPending.onClick = function () {
        this.showBackToPendingPopup(formName, contextKey);
      }.bind(this);
    },

    /**
         * approveTransaction : onClick of Approve a General Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected segment Row Data
         * @return {}
         * @throws {}
         */
    approveGeneralTransaction: function (selectedRowData) {
      var TransactionId = selectedRowData["requestId"];
      var featureActionID = selectedRowData["featureActionId"];
      var scopeObj = this;
      var params = {
        "requestId": TransactionId,
        "featureActionId": featureActionID,
        "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),

      };
      var navObj = {
        requestData: params,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      // scopeObj.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      scopeObj.ApprovalRequestsModule.presentationController.approveTransactions(navObj);
    },
    approveChequeBookRequest: function (selectedRowData) {
      var TransactionId = selectedRowData["requestId"];
      var featureActionID = selectedRowData["featureActionId"];
      var scopeObj = this;
      var params = {
        "requestId": TransactionId,
        "featureActionId": featureActionID,
        "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
      };
      var navObj = {
        requestData: params,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "saving data",
            responseData: selectedRowData
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SERVICE_ERROR,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalRequestsModule.presentationController.approveChequeBookRequest(navObj);
    },

    /**
              funciton to show acknowledgement page for Transactions
            **/
    showACKForOtherTransactions: function (transactionData) {
      this.view.NonEditableDetailsforApprovals.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails");
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
        this.view.NonEditableDetailsforApprovals.setData(formattedData, true);
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

        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt")] = CommonUtilities.formatCurrencyWithCommas(transactionData.amount, false, transactionData.fromAccountCurrency) || CommonUtilities.formatCurrencyWithCommas(transactionData.amount, false);

        if (!kony.sdk.isNullOrUndefined(transactionData.paidBy) && !kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT) && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)) {
          if (kony.sdk.isNullOrUndefined(transactionData.paidBy)) {
            formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy")] = transactionData.payee;
          } else {
            formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy")] = transactionData.paidBy;
          }
        }

        formattedData[kony.i18n.getLocalizedString("i18n.transfers.lblFrequency")] = transactionData.frequency;
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.SendOn")] = transactionData.processingDate || transactionData.TransactionDate;

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

        this.view.NonEditableDetailsforApprovals.setData(formattedData, true);

        if (Array.isArray(transactionData.fileNames) && transactionData.fileNames.length > 0) {

          var break_point = kony.application.getCurrentBreakpoint();
          if (break_point === 640 || orientationHandler.isMobile) {
            this.view.NonEditableDetailsforApprovals.flxError.width = "96.6%";
            this.view.NonEditableDetailsforApprovals.flxError.centerX = "50%";
          }
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
        this.view.flxApprovalHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(transactionData.requestId);
      }
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.NonEditableDetailsforApprovals.isVisible = true;
      this.view.flxRequestCreateEditUpdateEditDetails.setVisibility(false);
      this.view.forceLayout();
      this.adjustScreen(20);
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


    /**
         * setupUIForACK : set the UI to show the Acknowledgement/Details Screen for the Templates or Transactions or Approvals
         * @member of {frmApprovalViewDetailsController}
         * @param {string} successMsg - value of the Success Message to be displayed on the Title of the screen
         * @return {}
         * @throws {}
         */
    setupUIForACK: function (successMsg, isNonAcknowledgment) {
      this.view.flxTerms.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxTransactionDetails.isVisible = true;
      this.view.TemplateRecordsNew.btnAddAdditionalDetailsRow.isVisible = false;
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        if (!kony.sdk.isNullOrUndefined(isNonAcknowledgment) && isNonAcknowledgment) {
          this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
        }
        this.view.customheader.lblHeaderMobile.isVisible = true;
      } else {
        this.view.customheader.lblHeaderMobile.isVisible = false;
      }
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.TemplateRecordsNew.flxUpdateAmount.isVisible = false;
      this.view.flxApprovalsHistoryInformation.isVisible = true;
      this.view.flxApprovalHistorySection.isVisible = true;
      this.view.NonEditableDetailsforApprovals.flxError.setVisibility(false);
    },

    //*******************************************************************  BREAK POINT CHANGE & SERVICE ERROR  ********************************************************//
    responsiveViews: {},

    initializeResponsiveViews: function () {
      this.responsiveViews["flxTransactionDetails"] = this.isViewVisible("flxTransactionDetails");
    },

    isViewVisible: function (container) {
      if (this.view[container].isVisible) {
        return true;
      } else {
        return false;
      }
    },


    /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmApprovalViewDetailsController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
    onBreakpointChange: function (width) {
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      var responsiveFonts = new ResponsiveFonts();
      this.view.customheader.onBreakpointChangeComponent(width);
      if (break_point === 640 || orientationHandler.isMobile) {
        this.setMobileFilterData();
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString() + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.viewDetails");
        this.view.NonEditableDetailsforApprovals.segDetails.rowTemplate = "flxViewDetailsMobile";
        this.view.ApprovalRoadMapElement.initMobileView();
        this.view.customheader.lblHeaderMobile.isVisible = true;
        var views = Object.keys(this.responsiveViews);
        views.forEach(function (e) {
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
        //this.view.NonEditableDetailsforApprovals.flxMultiApprovalHeader.isVisible=false;
        views = Object.keys(this.responsiveViews);
        views.forEach(function (e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        responsiveFonts.setDesktopFonts();
        this.view.customheader.lblHeaderMobile.isVisible = false;
        this.view.customheader.lblHeaderMobile.text = "";
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
    adjustScreen: function (data) {
      this.view.flxFooter.isVisible = true;
      this.view.forceLayout();
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + data + "dp";
        else
          this.view.flxFooter.top = mainheight + data + "dp";
      } else {
        this.view.flxFooter.top = mainheight + data + "dp";
      }
      if (kony.application.getCurrentBreakpoint() >= 0 && kony.application.getCurrentBreakpoint() <= 640) {
        this.view.flxFooter.top = "0dp";
      }
      this.view.forceLayout();
      this.initializeResponsiveViews();
    },


    /**
         * hidePopup : This method is called to hide the already shown Pop - UP
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON OBject} popupconfig - values for header, msg, commentsVisibility, nextText, cancelText, and commenttext
         * @param {function} nextOnClick - onclick of yes in pop - Up action to perform the defined call
         * @return {}
         * @throws {}
         */
    showPopup: function (popupConfig, nextOnClick) {
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainerLeft.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.lblHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.RejectRequest");
      this.view.flxPopup.lblPopupMsg.text = kony.i18n.getLocalizedString("konybb.Approvals.RejectReason");
      this.view.flxPopup.lblPopupMsg.skin = "slLabel424242Regular17px";
      this.view.flxPopup.flxComments.isVisible = popupConfig.commentsVisibility;
      if (this.view.flxPopup.flxComments.isVisible === false) {
        this.view.flxPopup.flxPopupContainer.height = "268px";
        if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
          this.view.flxPopup.lblPopupMsg.skin = "sknlbla0a0a015px";
          this.view.flxPopup.lblHeader.skin = "slLabel424242Regular13px";
        }
      } else {
        this.view.flxPopup.formActionsNew.top = 0 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "376px";
      }
      this.view.flxPopup.trComments.text = popupConfig.commentsText;
      this.view.flxPopup.lblCommnets = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Comments");
      this.view.flxPopup.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.common.confirm");
      this.view.flxPopup.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
      this.view.flxPopup.formActionsNew.btnNext.onClick = () => {
        nextOnClick();
        this.requestCount++;
      }
      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;

      this.view.flxPopup.trComments.onKeyUp = function () {
        if (this.view.flxPopup.trComments.text !== "" && this.view.flxPopup.trComments.text !== null) {
          CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
        } else {
          CommonUtilities.disableButton(this.view.flxPopup.formActionsNew.btnNext);
        }
      }.bind(this);
      if (popupConfig.header !== kony.i18n.getLocalizedString("i18n.konybb.updateDefaultAmount")) {
        CommonUtilities.disableButton(this.view.flxPopup.formActionsNew.btnNext);
      } else {
        CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
      }
      this.view.forceLayout();
    },


    /**
         * hidePopup : This method is called to hide the already shown Pop - UP
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    hidePopup: function () {
      this.view.flxPopup.trComments.text = "";
      this.view.flxPopup.isVisible = false;
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    /**
         * showDownTimeMessage : This method is called inorder to show error messages related to server
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} errorData - Object from the service call - failure
         * @return {}
         * @throws {}
         */
    showDownTimeMessage: function (errorData) {
      this.view.flxContentContainerLeft.setVisibility(false);
      this.view.flxDowntimeWarning.setVisibility(true);
      this.view.lblDowntimeWarning.text = errorData.errorMessage;
      this.view.imgCloseDowntimeWarning.setVisibility(false);
      this.view.flxDowntimeWarning.skin = "sknFFFFFFmodbr3px";
      this.view.lblDowntimeWarning.skin = "bbSknLblFF001FLatoBold15Px";
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    /*
          Set Filter data for mobile segment
        */
    setMobileFilterData: function () {
      var data = [{
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.accounts.allTransactions")
        },
        "flxSeparator": {
          "isVisible": false
        }
      },
      {
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")
        },
        "flxSeparator": {
          "isVisible": false
        }
      },
      {
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")
        },
        "flxSeparator": {
          "isVisible": false
        }
      },
      {
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.accounts.pending")
        },
        "flxSeparator": {
          "isVisible": false
        }
      },
      {
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.ach.paymentsPending")
        },
        "flxSeparator": {
          "isVisible": false
        }
      },
      {
        "lblViewTypeName": {
          "text": kony.i18n.getLocalizedString("i18n.ach.collectionsPending")
        },
        "flxSeparator": {
          "isVisible": false
        }
      }
      ];

      var widgetDataMap = {
        "flxAccountListItemWrapper": "flxAccountListItemWrapper",
        "flxSeparator": "flxSeparator",
        "flxViewTypesList": "flxViewTypesList",
        "lblViewTypeName": "lblViewTypeName"
      };
    },
    fetchUploadedACHFileApprovals: function (requestParam) {
      var scopeObj = this;
      var navObj = {
        requestData: requestParam,
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: "achViewDetails",
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
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
    showUploadedFileApprovals: function (ACHFileData) {
      var fileACKData = this.generateViewDetailRecords(ACHFileData);
      this.view.lblFormatTypeValue.text = ACHFileData.FileFormatType;
      this.view.lblRequestTypeValue.text = ACHFileData.FileRequestType;
      this.view.lblFileNameAck.text = ACHFileData.FileName; //.toolTip;
      //  if (ACHFileData.FileStatus === BBConstants.TRANSACTION_STATUS.PENDING) {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      //  } else {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUploadExecute"));
      // }
      this.showACHFileUploadAckApprovals(fileACKData);
      if (kony.sdk.isNullOrUndefined(ACHFileData.Request_id) || kony.sdk.isEmptyObject(ACHFileData.Request_id)) {
        this.view.flxApprovalHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = ACHFileData.FileStatus;
        this.fetchRequestHistoryData(ACHFileData.Request_id);
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },
    showACHFileUploadAckApprovals: function (fileDetails) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString();
      this.view.flxApprovalHistorySection.isVisible = true;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.NonEditableDetailsforApprovals.flxDetailsCollapseArrow.setVisibility(false);
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

    downloadAttachmentsFile: function (fileUrl) {
      var scope = this;
      try {
        var httpClient = new kony.net.HttpRequest();
        httpClient.timeout = 10000;

        httpClient.onReadyStateChange = onReadyStateChanged;
        httpClient.open("GET", fileUrl);
        httpClient.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var postdata = new kony.net.FormData();
        postdata.append("auth_token", kony.sdk.getCurrentInstance().currentClaimToken);
        httpClient.send(postdata);

        function onReadyStateChanged() {
          var readyState = Number(this.readyState.toString());
          var status = Number(this.status.toString());

          if (readyState === 4) {
            if (status === 200) {
              var obj;
              try {
                var parsedObj = JSON.parse(this.response);
                if (!kony.sdk.isNullOrUndefined(parsedObj))
                  obj = true;
                else
                  obj = false;
              } catch (e) {
                obj = false;
              }
              if (!obj) {
                var data = {
                  "url": fileUrl
                };
                CommonUtilities.downloadFile(data);
              } else {
                scope.view.NonEditableDetailsforApprovals.flxError.setVisibility(true);
                scope.view.NonEditableDetailsforApprovals.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
              }
            } else {
              scope.view.NonEditableDetailsforApprovals.flxError.setVisibility(true);
              scope.view.NonEditableDetailsforApprovals.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
            }
          }
        }
      } catch (err) {
        scope.view.NonEditableDetailsforApprovals.flxError.setVisibility(true);
        scope.view.NonEditableDetailsforApprovals.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
      }

      FormControllerUtility.hideProgressBar(this.view);
    },
    //flex creation for single functionality
    pendingApprovalsSingleCondition: function (count, data) {
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
    pendingApprovalsORCondition: function (count) {
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
    pendingApprovalsMultipleCondition: function (count, data) {
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
    showExpandedView: function (flxName, chevronName) {
      if (this.view[flxName].isVisible === false) {
        this.view[flxName].setVisibility(true);
        this.view[chevronName].src = "listboxdownarrow.png";
      } else {
        this.view[flxName].setVisibility(false);
        this.view[chevronName].src = "listboxuparrow.png";
      }
    },
    reNotify: function (row_items) {
      for (var i = 0; i < this.pendingApprovalData.RequestHistory.length; i++) {
        var pendingApprovers = this.pendingApprovalData.RequestHistory[i].pendingApprovers;
        if (pendingApprovers !== undefined && pendingApprovers !== null) {
          pendingApprovers = (JSON.parse(pendingApprovers.toString()));
          for (var j = 0; j < pendingApprovers.length; j++) {
            if (pendingApprovers[j]["fullName"] === row_items) {
              //var groupDetails = this.pendingApprovalData.RequestHistory[i].groupName;
              var objectData = {
                "approverUserId": pendingApprovers[j].userName,
                "requestId": this.pendingApprovalData.RequestHistory[i].Request_id,
                "featureActionId": this.selectedRowData.featureActionId,
                "TransactionId": this.selectedRowData.transactionId
              }
            }
          }
        }
      }
      this.fetchReNotifyPendingApprovalRequest(objectData);
    },
    // Service call for getRequestHistory for signatory groups
    fetchReNotifyPendingApprovalRequest: function (objectData) {
      var navObj = {
        requestData: {
          "approverUserId": objectData.approverUserId,
          "requestId": objectData.requestId,
          "featureActionId": objectData.featureActionId,
          "TransactionId": objectData.TransactionId
        },
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.RENOTIFY_PENDING_APPROVERS_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.RENOTIFY_PENDING_APPROVERS_FAILURE,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getRenotifyPendingApprovalRequest(navObj);
    },
    reNotifySuccessCallback: function (responseData) {
      var x = responseData;
      FormControllerUtility.hideProgressBar(this.view);
    },
    reNotifyFailureCallback: function (responseData) {
      var x = "error";
      FormControllerUtility.hideProgressBar(this.view);
    },
    viewPendingApprovalsDetails: function (selectedRowData) {
      this.view.flxOverlay.setVisibility(true);
      this.view.flxPendingApprovers.setVisibility(true);
      this.view.flxApprovalLimitHeader.setVisibility(false);
      this.view.flxPerTransaction.setVisibility(false);
      this.view.flxDailyTransaction.setVisibility(false);
      this.view.flxWeekelyTransaction.setVisibility(false);
      this.view.flxApproverList.removeAll(this.view.flxApproverList.widgets());
      if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
        this.view.flxPendingApprovers.width = "95%";
        this.view.flxPendingApprovers.height = "95%";
      }
      var contractsArr = this.userContractsData;
      if(contractsArr && contractsArr.length > 1){
        this.view.flxMultiContractMsg.setVisibility(true);
      }else{
        this.view.flxMultiContractMsg.setVisibility(false);
      }
      this.fetchRequestHistoryDataSignatoryGroups(selectedRowData.requestId);
    },
    // Service call for getRequestHistory for signatory groups
    //need to look
    fetchRequestHistoryDataSignatoryGroups: function (requestId) {
      var navObj = {
        requestData: {
          "Request_id": requestId
        },
        onSuccess: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetailsNew",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_FAILURE_SIGNATORYGROUP,
            responseData: {}
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getRequestsHistorySignatoryGroup(navObj);
    },
    // function to turn on and off of overlay flex
    pendingApproversVisibility: function () {
      this.view.flxOverlay.setVisibility(false);
      this.view.flxPendingApprovers.setVisibility(false);
    },
    // successCallback for pending approval request data
    showPendingApprovalData: function (pendingData) {
      if (!kony.sdk.isNullOrUndefined(pendingData)) {
        var scope = this;
        var tabSwitch = false;
        this.pendingApprovalData = pendingData;
        var pendingApprovalRequest = this.pendingApprovalData.RequestHistory;
        var pendingGroupRules = this.pendingApprovalData.pendingGroupRules;
        var limitType = [];
        var firstTab = "";
        var firstTabGroupListPerTxn = "";
        var firstTabGroupRuleValuePerTxn = "";
        if (!(kony.sdk.isNullOrUndefined(pendingGroupRules))) {
          if (pendingGroupRules.length > 0) {
            this.view.flxGroupDetails.setVisibility(true);
            this.view.flxNoPendingData.setVisibility(false);
            for (var i = 0; i < pendingGroupRules.length; i++) {
              limitType[i] = pendingGroupRules[i].limitTypeId;
              if (limitType[i] === "MAX_TRANSACTION_LIMIT") {
                firstTab = limitType[i];
              } else if (firstTab !== "MAX_TRANSACTION_LIMIT" && limitType[i] === "DAILY_LIMIT") {
                firstTab = limitType[i];
              } else if (firstTab !== "MAX_TRANSACTION_LIMIT" && firstTab !== "DAILY_LIMIT" && limitType[i] === "WEEKLY_LIMIT") {
                firstTab = limitType[i];
              }
            }
            if (kony.sdk.isNullOrUndefined(firstTab) || firstTab === "") {
              firstTab = limitType[0];
            }
            for (var j = 0; j < limitType.length; j++) {
              if (limitType.length === 1) {
                tabSwitch = false;
                this.view.lblApprovalDetails.text = kony.i18n.getLocalizedString("i18n.pendingApprovers.ApprovalDetails");
                this.view.flxApprovalLimitHeader.setVisibility(false);
              } else {
                tabSwitch = true;
                this.view.lblApprovalDetails.text = kony.i18n.getLocalizedString("i18n.pendinApprovers.PendingApprovalDetails");
                this.view.flxApprovalLimitHeader.setVisibility(true);
              }
              if (limitType[j] === "MAX_TRANSACTION_LIMIT") {
                var groupListPerTxn = pendingGroupRules[j].groupList;
                var groupRuleValuePerTxn = pendingGroupRules[j].groupRuleValue;
                if (tabSwitch === true && firstTab !== "MAX_TRANSACTION_LIMIT") {
                  this.view.flxPerTransaction.setVisibility(true);
                } else if (tabSwitch === true && firstTab === "MAX_TRANSACTION_LIMIT") {
                  firstTabGroupListPerTxn = groupListPerTxn;
                  firstTabGroupRuleValuePerTxn = groupRuleValuePerTxn;
                  this.view.flxPerTransaction.setVisibility(true);
                  this.view.flxWeeklyTransactionSelected.setVisibility(false);
                  this.view.flxDailyTransactionSelected.setVisibility(false);
                  this.view.flxPerTransactionSelected.setVisibility(true);
                  if (limitType.length === 1) {
                    this.setApprovalPendingData(groupListPerTxn, groupRuleValuePerTxn);
                  }
                } else {
                  this.setApprovalPendingData(groupListPerTxn, groupRuleValuePerTxn);
                }
                this.view.flxPerTransaction.onTouchEnd = function () {
                  scope.setApprovalPendingData(groupListPerTxn, groupRuleValuePerTxn);
                  if (tabSwitch === true) {
                    this.view.flxWeeklyTransactionSelected.setVisibility(false);
                    this.view.flxDailyTransactionSelected.setVisibility(false);
                    this.view.flxPerTransactionSelected.setVisibility(true);
                  }
                }.bind(this);
              }
              if (limitType[j] === "DAILY_LIMIT") {
                var groupListDaily = pendingGroupRules[j].groupList;
                var groupRuleValueDaily = pendingGroupRules[j].groupRuleValue;
                if (tabSwitch === true && firstTab !== "DAILY_LIMIT") {
                  this.view.flxDailyTransaction.setVisibility(true);
                } else if (tabSwitch === true && firstTab === "DAILY_LIMIT") {
                  firstTabGroupListPerTxn = groupListDaily;
                  firstTabGroupRuleValuePerTxn = groupRuleValueDaily;
                  this.view.flxDailyTransaction.left = "20dp";
                  this.view.flxDailyTransaction.setVisibility(true);
                  this.view.flxWeeklyTransactionSelected.setVisibility(false);
                  this.view.flxDailyTransactionSelected.setVisibility(true);
                  this.view.flxPerTransactionSelected.setVisibility(false);
                  if (limitType.length === 1) {
                    this.setApprovalPendingData(groupListDaily, groupRuleValueDaily);
                  }
                } else {
                  this.setApprovalPendingData(groupListDaily, groupRuleValueDaily);
                }
                this.view.flxDailyTransaction.onTouchEnd = function () {
                  scope.setApprovalPendingData(groupListDaily, groupRuleValueDaily);
                  if (tabSwitch === true) {
                    this.view.flxWeeklyTransactionSelected.setVisibility(false);
                    this.view.flxDailyTransactionSelected.setVisibility(true);
                    this.view.flxPerTransactionSelected.setVisibility(false);
                  }
                }.bind(this);
              }
              if (limitType[j] === "WEEKLY_LIMIT") {
                var groupListWeekly = pendingGroupRules[j].groupList;
                var groupRuleValueWeekly = pendingGroupRules[j].groupRuleValue;
                if (this.view.flxDailyTransaction.isVisible === false && limitType.includes("DAILY_LIMIT") === false) {
                  this.view.flxWeekelyTransaction.left = "240dp";
                } else {
                  this.view.flxWeekelyTransaction.left = "395dp";
                }
                if (tabSwitch === true && firstTab !== "WEEKLY_LIMIT") {
                  this.view.flxWeekelyTransaction.setVisibility(true);
                } else if (tabSwitch === true && firstTab === "WEEKLY_LIMIT") {
                  firstTabGroupListPerTxn = groupListWeekly;
                  firstTabGroupRuleValuePerTxn = groupRuleValueWeekly;
                  this.view.flxWeekelyTransaction.left = "20dp";
                  this.view.flxWeekelyTransaction.setVisibility(true);
                  this.view.flxWeeklyTransactionSelected.setVisibility(true);
                  this.view.flxDailyTransactionSelected.setVisibility(false);
                  this.view.flxPerTransactionSelected.setVisibility(false);
                  if (limitType.length === 1) {
                    this.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                  }
                } else {
                  this.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                }
                this.view.flxWeekelyTransaction.onTouchEnd = function () {
                  scope.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                  if (tabSwitch === true) {
                    this.view.flxWeeklyTransactionSelected.setVisibility(true);
                    this.view.flxDailyTransactionSelected.setVisibility(false);
                    this.view.flxPerTransactionSelected.setVisibility(false);
                  }
                }.bind(this);
              }
              if (limitType[j] === "NON_MONETARY_LIMIT") {
                var firstTabGroupListPerTxn = pendingGroupRules[j].groupList;
                var firstTabGroupRuleValuePerTxn = pendingGroupRules[j].groupRuleValue;
              }
            }
          }
          if (!kony.sdk.isNullOrUndefined(firstTabGroupListPerTxn) && !kony.sdk.isNullOrUndefinedfirstTabGroupRuleValuePerTxn && firstTabGroupListPerTxn !== "" && firstTabGroupRuleValuePerTxn !== "") {
            this.setApprovalPendingData(firstTabGroupListPerTxn, firstTabGroupRuleValuePerTxn);
          }
        } else {
          this.view.flxGroupDetails.setVisibility(false);
          this.view.flxNoPendingData.setVisibility(true);
        }
      } else {
        this.view.flxGroupDetails.setVisibility(false);
        this.view.flxNoPendingData.setVisibility(true);
      }
      FormControllerUtility.hideProgressBar(this.view);
    },
    setApprovalPendingData: function (groupList, groupRuleValue) {
      this.view.flxApproverList.removeAll(this.view.flxApproverList.widgets());
      this.note = "";
      groupList = groupList.slice(1, groupList.length - 1);
      groupList = groupList.split(',');
      groupRuleValue = JSON.parse(groupRuleValue);
      this.count = 0;
      var lastIndex = "";
      var groupRuleValueArrayLength = groupRuleValue.length;
      for (var i = 0; i < groupRuleValue.length; i++) {
        var zeroCount = 0;
        var instance = [];
        var orFlag = false;
        for (var j = 0; j < groupRuleValue[i].length; j++) {
          if (groupRuleValue[i][j] === 0) {
            zeroCount = zeroCount + 1;
          } else {
            var instanceValue = {
              index: j,
              value: groupRuleValue[i][j]
            }
            instance.push(instanceValue);
          }
        }
        if (groupRuleValue[i].length - zeroCount === 1) {
          if (groupRuleValueArrayLength > 1) {
            orFlag = true;
          }
          var signatoryIdsingle = groupList[instance[0].index];
          signatoryIdsingle = signatoryIdsingle.replace(/\s/g, '');
          this.data = {};
          for (var k = 0; k < this.pendingApprovalData.RequestHistory.length; k++) {
            if (signatoryIdsingle === this.pendingApprovalData.RequestHistory[k].groupId) {
              var pendingApproversSingle = this.pendingApprovalData.RequestHistory[k].pendingApprovers;
              pendingApproversSingle = (JSON.parse(pendingApproversSingle.toString()));
              this.data = {
                approvalCount: instance[0].value,
                signatoryName: this.pendingApprovalData.RequestHistory[k].groupName,
                pendingApprovers: pendingApproversSingle
              };
            }
          }
          if (Object.keys(this.data).length !== 0 && this.data.constructor === Object) {
            var singleFlex = this.pendingApprovalsSingleCondition(this.count, this.data);
            this.view.flxApproverList.add(singleFlex);
            if (orFlag === true) {
              var ORFlex = this.pendingApprovalsORCondition(this.count);
              this.view.flxApproverList.add(ORFlex);
            }
          } else {
            this.view.flxApproverList.remove(ORFlex);
            this.note = this.note.slice(0, -6);
          }
          groupRuleValueArrayLength--;
        } else {
          this.data = [];
          if (groupRuleValueArrayLength > 1) {
            orFlag = true;
          }
          for (var s = 0; s < instance.length; s++) {
            var signatoryIdMultiple = groupList[instance[s].index];
            signatoryIdMultiple = signatoryIdMultiple.replace(/\s/g, '');
            for (var j = 0; j < this.pendingApprovalData.RequestHistory.length; j++) {
              var data = {};
              if (signatoryIdMultiple === this.pendingApprovalData.RequestHistory[j].groupId) {
                var pendingApproversMultiple = this.pendingApprovalData.RequestHistory[j].pendingApprovers;
                pendingApproversMultiple = (JSON.parse(pendingApproversMultiple.toString()));
                var data = {
                  approvalCount: instance[s].value,
                  signatoryName: this.pendingApprovalData.RequestHistory[j].groupName,
                  pendingApprovers: pendingApproversMultiple
                };
                this.data.push(data);
              }
            }
          }
          if (this.data.length !== 0) {
            var multipleFlex = this.pendingApprovalsMultipleCondition(this.count, this.data);
            this.view.flxApproverList.add(multipleFlex);
            if (orFlag === true) {
              var ORFlex = this.pendingApprovalsORCondition(this.count);
              this.view.flxApproverList.add(ORFlex);
            }
          } else {
            this.view.flxApproverList.remove(ORFlex);
            this.note = this.note.slice(0, -6);
          }
          groupRuleValueArrayLength--;

        }
      }
      if (this.view.flxApprovalLimitHeader.isVisible === true) {
        this.note = kony.i18n.getLocalizedString("i18n.pendingApprovers.limitBreachText");
      } else {
        this.note = kony.i18n.getLocalizedString("i18n.payments.noteTobeApprovedBy") + this.note + ".";
      }
      this.view.lblInfo.text = this.note;
    },

    // failureCallback for pending approval request data
    showPendingApprovalFailure: function () {
      FormControllerUtility.hideProgressBar(this.view);
    },

    buttonPendingApprovers: function (selectedRowData) {
      this.viewPendingApprovalsDetails(selectedRowData);
    },

    getPendingApprovalsCount: function (selectedRowData) {
      var approvalStatus = selectedRowData.receivedApprovals;
      this.view.lblApprovalStatusValue.text = selectedRowData.status;
      return approvalStatus;
    },

    showApprovePopup: function () {
      let selectedRowData = this.selectedRowData;
      let transactionType = this.selectedRowData.featureActionId;
      this.view.flxPopup.isVisible = true;
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainerLeft.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.lblHeader.text = kony.i18n.getLocalizedString("konybb.Approvals.ApprovalsRequest");
      this.view.flxPopup.lblPopupMsg.text = kony.i18n.getLocalizedString("konybb.Approval.AreYouSureApprove");
      this.view.flxPopup.lblPopupMsg.skin = "slLabel424242Regular17px";
      this.view.flxPopup.flxComments.isVisible = false;
      if (this.view.flxPopup.flxComments.isVisible === false) {
        this.view.flxPopup.flxPopupContainer.height = "294px";
        if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
          this.view.flxPopup.lblPopupMsg.skin = "sknlbla0a0a015px";
          this.view.flxPopup.lblHeader.skin = "slLabel424242Regular13px";
        } else if (kony.application.getCurrentBreakpoint() >= 1366) {
          this.view.flxPopup.flxPopupContainer.top = "158dp";
        }
      } else {
        this.view.flxPopup.formActionsNew.top = 0 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "370px";
      }
      //this.view.flxPopup.trComments.text = popupConfig.commentsText;
      this.view.flxPopup.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      this.view.flxPopup.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      this.view.flxPopup.formActionsNew.btnNext.onClick = () => {
        this.requestCount++;
        if (transactionType === BBConstants.ACH_COLLECTION_CREATE || transactionType === BBConstants.ACH_PAYMENT_CREATE) {
          this.approveACHTransaction(selectedRowData, BBConstants.APPROVED_ACH_TRANSACTION_ACK);
        }
        else if (transactionType === BBConstants.APPROVED_ACH_FILE_ACK) {
          this.approveACHFile(selectedRowData, BBConstants.APPROVED_ACH_FILE_ACK);
        }
        else if (transactionType === BBConstants.CHEQUE_BOOK_REQUEST_CREATE) {
          this.approveChequeBookRequest(selectedRowData);
        } else
          this.approveGeneralTransaction(selectedRowData);
      };

      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;
      CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
      this.view.forceLayout();

    },


    showSkipPopup: function (requestId) {
      this.view.flxPopup.isVisible = true;
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainerLeft.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.lblHeader.text = kony.i18n.getLocalizedString("konybb.Approvals.SkipRequest");
      this.view.flxPopup.lblPopupMsg.text = kony.i18n.getLocalizedString("konybb.Approvals.AreYouSureSkip");
      this.view.flxPopup.lblPopupMsg.skin = "slLabel424242Regular17px";
      this.view.flxPopup.flxComments.isVisible = false;
      if (this.view.flxPopup.flxComments.isVisible === false) {
        this.view.flxPopup.flxPopupContainer.height = "294px";
        if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
          this.view.flxPopup.lblPopupMsg.skin = "sknlbla0a0a015px";
          this.view.flxPopup.lblHeader.skin = "slLabel424242Regular13px";
        } else if (kony.application.getCurrentBreakpoint() >= 1366) {
          this.view.flxPopup.flxPopupContainer.top = "158dp";
        }
      } else {
        this.view.flxPopup.formActionsNew.top = 0 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "370px";
      }
      //this.view.flxPopup.trComments.text = popupConfig.commentsText;
      this.view.flxPopup.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      this.view.flxPopup.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      this.view.flxPopup.formActionsNew.btnNext.onClick = function () {
        var scopeObj = this;
        var skipData = {
          "requestId": requestId,
          "status": "Skipped"
        }
        this.requestCount++;
        var navObj = {
          requestData: skipData,
          onSuccess: {
            form: "frmApprovalViewDetailsNew", //"frmBBMyApproval",
            module: "ApprovalsReqUIModule",
            context: {
              key: "saving data",
              responseData: {}
            }
          },
          onFailure: {
            form: "frmApprovalViewDetailsNew", //"frmBBMyApprovals",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SERVICE_ERROR,
              responseData: {}
            }
          }
        };
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);

      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;
      CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
      this.view.forceLayout();

    },
    showBackToPendingPopup: function (formName, contextKey) {
      this.view.flxPopup.isVisible = true;
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainerLeft.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.lblHeader.text = kony.i18n.getLocalizedString("kony.approval.backToPending");
      this.view.flxPopup.lblPopupMsg.text = kony.i18n.getLocalizedString("konybb.Approvals.BackToPendingConfirmation");
      this.view.flxPopup.lblPopupMsg.skin = "slLabel424242Regular17px";
      this.view.flxPopup.flxComments.isVisible = false;
      if (this.view.flxPopup.flxComments.isVisible === false) {
        this.view.flxPopup.flxPopupContainer.height = "314px";
        if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
          this.view.flxPopup.lblPopupMsg.skin = "sknlbla0a0a015px";
          this.view.flxPopup.lblHeader.skin = "slLabel424242Regular13px";
        } else if (kony.application.getCurrentBreakpoint() >= 1366) {
          this.view.flxPopup.flxPopupContainer.top = "168dp";
        }
      } else {
        this.view.flxPopup.formActionsNew.top = 0 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "370px";
      }
      //this.view.flxPopup.trComments.text = popupConfig.commentsText;
      this.view.flxPopup.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      this.view.flxPopup.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      this.view.flxPopup.formActionsNew.btnNext.onClick = function () {
        var scopeObj = this;
        this.requestCount = 1;
        this.ApprovalsReqUIModule.presentationController.clearMultiApprovalData();
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: formName,
            module: "ApprovalsReqUIModule",
            context: {
              key: contextKey,
              responseData: {}
            }
          },
          onFailure: {
            form: formName,
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SERVICE_ERROR,
              responseData: {}
            }
          }
        };
        FormControllerUtility.hideProgressBar(this.view);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);
      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;
      CommonUtilities.enableButton(this.view.flxPopup.formActionsNew.btnNext);
      this.view.forceLayout();

    },

    /**
         * viewRecipientDetails : This method is called inorder to show general Transaction Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewRecipientDetails: function (selectedRowData) {
      var scopeObj =this;
      var isApprovalData = true;
      var isRequestData = false;
      var ishistory = false;
      this.selectedRowData = selectedRowData;
      //selectedRowData.Payee = selectedRowData.Payee.toolTip;
      this.view.flxOverlay.setVisibility(false);
      this.view.flxPendingApprovers.setVisibility(false);
      this.view.NonEditableDetailsforApprovals.flxDetailsCollapseArrow.setVisibility(true);
      this.view.NonEditableDetailsforApprovals.flxDetailsCollapseArrow.onClick = function(){
        var showSection = true;
        scopeObj.view.NonEditableDetailsforApprovals.lblCollapseArrow.text = scopeObj.view.NonEditableDetailsforApprovals.lblCollapseArrow.text === "O" ? "P" : "O";
        showSection = scopeObj.view.NonEditableDetailsforApprovals.lblCollapseArrow.text === "O" ? true : false;
        scopeObj.view.NonEditableDetailsforApprovals.flxDetailsBottomContainer.setVisibility(showSection);
      };
      this.view.lblApprovalStatusValue.text = selectedRowData.status;
      this.view.lblApproveCountVal.text = selectedRowData.receivedApprovals;
      if (ishistory === false || ishistory === "false" || kony.sdk.isNullOrUndefined(ishistory) || selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if (!kony.sdk.isNullOrUndefined(selectedRowData)) {
          if (selectedRowData.isGroupMatrix === "true" || selectedRowData.isGroupMatrix === true) {
            this.view.btnPendingAprrovers.setVisibility(true);
          } else {
            this.view.btnPendingAprrovers.setVisibility(false);
          }
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
      } else {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      scope.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(this, selectedRowData)
      scope.view.imgPopupclose.onTouchEnd = function () {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }
      scope.view.btnClose.onClick = function () {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }

      selectedRowData.DebitOrCreditAccount = selectedRowData.customerName + selectedRowData.accountID;
      selectedRowData.CreatedOn = selectedRowData.sentDate;
      selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.view.flxApprovalDetailsStatus.setVisibility(true);
      this.view.flxApprovedCountDetails.setVisibility(true);

      this.recipientTransactionsAcknowledgement(selectedRowData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      this.view.flxApprovalHistorySection.setVisibility(false);

      if (isApprovalData) {
        //this.btnConfigForApprovalViewDetails(BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        this.skipOnclick(selectedRowData.requestId);

        this.view.ApprovalFormActions.btnOption.isVisible = (!ishistory && (selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.onClick = () => {
          this.showApprovePopup();
        };

        this.view.ApprovalFormActions.btnCancel.isVisible = (!ishistory && (selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.onClick = function () {
          this.rejectGeneralTransaction(selectedRowData);
        }.bind(this);

      }

      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-60);
    },

    /**
         * recipientTransactionsAcknowledgement : function to show Ack screen for General Transactions When Approved/ Rejected/ Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} context - data of the general transaction
         * @return {}
         * @throws {}
         */
    recipientTransactionsAcknowledgement: function (context, formName, contextKey) {
      this.context = context;
      this.view.ApprovalFormActions.enableNextButton();
      this.showACKForRecipientTransactions(this.context);
      var transactionType = this.context.featureActionName;
      if (contextKey === BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS) {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Request") + " " + this.requestCount.toString(); //need to check
      } else {
        this.view.flxContentHeader.lblContentHeader.text = transactionType + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      }
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.flxBackToPending.onClick = function () {
        this.showBackToPendingPopup(formName, contextKey);
      }.bind(this);
    },

    /**
          funciton to show acknowledgement page for Transactions
        **/
    showACKForRecipientTransactions: function (transactionData) {
      this.view.NonEditableDetailsforApprovals.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.approvals.RequestDetails");
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
     this.view.NonEditableDetailsforApprovals.setData(formattedData, true);
      this.showRecepientDetails(transactionData.fullData, this.userContractsData);
      if (kony.sdk.isNullOrUndefined(transactionData.requestId)) {
        this.view.flxApprovalHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(transactionData.requestId);
      }

      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.NonEditableDetailsforApprovals.isVisible = true;
      this.view.flxRequestCreateEditUpdateEditDetails.setVisibility(true);
      this.view.forceLayout();
      this.adjustScreen(20);
    },
    /*
    * to show recipient information,bank information,recipients linked based on type of feature action
    * @param: recepients data, users contract data
    */
    showRecepientDetails : function(recepientDetails,userContractsData){
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].
         includes(recepientDetails.featureActionId)){
        this.setBeneficiaryDataCreateDeleteFlow(recepientDetails,userContractsData);
      }
      else if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(recepientDetails.featureActionId)){
        this.view.btnTab1.onClick = this.showTab1.bind(this,recepientDetails,userContractsData);
        this.view.btnTab2.onClick = this.showTab2.bind(this,recepientDetails,userContractsData);
        var showingUpdatedDetails = true;
        this.setBeneficiaryDataEditFlow(recepientDetails,userContractsData,showingUpdatedDetails);
      }
    },
    /*
    * set details for create,delete type flows
    * @param: recepients data, users contract data
    */
    setBeneficiaryDataCreateDeleteFlow : function(recepientDetails,userContractsData){
      var dataToShow = {};
	  this.view.lblRecipientsLinkedWith.setVisibility(false);
      this.view.lblCreatedDetails.setVisibility(true);
      this.view.flxTabs.setVisibility(false);
      this.view.contractListRecipient.lblCol3.setVisibility(false);
      this.view.contractListRecipient.imgCol3.setVisibility(false);
      //create flow
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT'].includes(recepientDetails.featureActionId)){
        var contractsData = {};
        dataToShow = this.getBeneficiaryManagementData(recepientDetails, userContractsData,true);
        contractsData.contracts = this.getSelectedContractList(dataToShow.contractsData, recepientDetails.cif);
        this.view.contractListRecipient.preshow(contractsData,"CREATE");
        this.view.lblRecipientsLinkedWith.setVisibility(true);
	    this.view.contractListRecipient.setVisibility(true);
        this.view.lblCreatedDetails.text = kony.i18n.getLocalizedString("i18n.approvals.CreatedDetails");
      } //delete flow
      else if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(recepientDetails.featureActionId)){
        dataToShow = this.getBeneficiaryManagementData(recepientDetails, userContractsData);
        this.view.lblCreatedDetails.text = kony.i18n.getLocalizedString("i18n.approvals.DeletedDetails");
        this.view.lblRecipientsLinkedWith.setVisibility(false);
	    this.view.contractListRecipient.setVisibility(false);
      }

      this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true);
      this.setDataToSegmentRecipientBankDetails(dataToShow.recipienBankDetails,true);
    },
    /*
    * set details for create,delete type flows
    * @param: recepients data, users contract data
    */
    setBeneficiaryDataEditFlow : function(recepientDetails, userContractsData, showingUpdatedDetails){
      this.view.flxTabs.setVisibility(true);
      this.view.lblCreatedDetails.setVisibility(false);
      this.resetTab();
      var dataToShow = this.getBeneficiaryManagementData(recepientDetails,userContractsData, showingUpdatedDetails);
      this.view.contractListRecipient.lblCol3.setVisibility(true);
      this.view.contractListRecipient.imgCol3.setVisibility(true);
      this.view.lblRecipientsLinkedWith.setVisibility(true);
	  this.view.contractListRecipient.setVisibility(true);
      if(showingUpdatedDetails){ //Tab1 Active to show Updated details
        this.view.btnTab1.skin =  (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummarySelected13px": "ICSknBtnAccountSummarySelected2";
        this.view.btnTab2.skin = (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummaryUnselected13px": "ICSknBtnAccountSummaryUnselected";
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
        this.view.flxSeperator.setVisibility(isAnyRecipientInfoUpdated);
        this.view.lblRecipientInforation.setVisibility(isAnyRecipientInfoUpdated);
        this.view.SegmentRecipientInfoDetails.setVisibility(isAnyRecipientInfoUpdated);
        this.view.flxSeperatorBankDetails.setVisibility(isAnyBankInfoUpdated);
        this.view.lblRecipientBankInfo.setVisibility(isAnyBankInfoUpdated);
        this.view.SegmentRecipientBankDetails.setVisibility(isAnyBankInfoUpdated);
        var contractsData = {};
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo, recepientDetails.cif);
        contractsData.contracts = contractDiffData;
        this.view.contractListRecipient.preshow(contractsData,"EDIT_UPDATED");
        this.setDataToSegmentRecipientInfoDetails(recipientInformation,true);
        this.setDataToSegmentRecipientBankDetails(bankInformation,true);
      }else{ //Tab2 Active to show existing details
        this.view.btnTab1.skin = (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummaryUnselected13px": "ICSknBtnAccountSummaryUnselected";
        this.view.btnTab2.skin =  (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummarySelected13px": "ICSknBtnAccountSummarySelected2";
        this.view.flxSeperator.setVisibility(true);
        this.view.lblRecipientInforation.setVisibility(true);
        this.view.SegmentRecipientInfoDetails.setVisibility(true);
        this.view.flxSeperatorBankDetails.setVisibility(true);
        this.view.lblRecipientBankInfo.setVisibility(true);
        this.view.SegmentRecipientBankDetails.setVisibility(true);
        var contractsData = {};
        var oldInfoJSON = this.getOldInfoDataObject(recepientDetails);
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo);
        contractsData.contracts = contractDiffData;
        this.view.contractListRecipient.preshow(contractsData,"EDIT_EXISTING");
        this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true);
        this.setDataToSegmentRecipientBankDetails(dataToShow.recipienBankDetails,true);
      }
      this.adjustScreen(0);
    },
    /*
    * create single object for all the beneficiary details
    * @param: recepients data, users contract data
    */
    getBeneficiaryManagementData: function(selRecepientDetails,userContractsData, isUpdatedData){
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
      var contractsData = userContractsData;
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
        address = address + "\n"+recepientDetails.email;
      }
      if(recepientDetails.phoneNumber){
        address = address + "\n" +recepientDetails.phoneNumber;
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
    setDataToSegmentRecipientInfoDetails: function(data, needColon) {
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
            if (key === "Debit Account") {
                temp.lblIcon = {
                    "isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "text": "r"
                };
            }
          temp.template = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 
                           "flxNonEditableRecipientanditsbankDetailsMobile":"flxNonEditableRecipientanditsbankDetails";
          segData.push(temp);
        }
        this.view.SegmentRecipientInfoDetails.setData(segData);
    },
    setDataToSegmentRecipientBankDetails: function(data, needColon) {
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
          temp.template = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? 
                        "flxNonEditableRecipientanditsbankDetailsMobile":"flxNonEditableRecipientanditsbankDetails";
          segData.push(temp);
        }
        this.view.SegmentRecipientBankDetails.setData(segData);
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
    showTab1: function(selectedRowData,userContractsData) {
      var showingUpdatedDetails = true;
      this.setBeneficiaryDataEditFlow(selectedRowData,userContractsData,showingUpdatedDetails)
    },
    /*
    * show existing details tab for edit beneficiary flow
    */
    showTab2: function(selectedRowData,userContractsData) {
      var showingUpdatedDetails = false;
      this.setBeneficiaryDataEditFlow(selectedRowData,userContractsData,showingUpdatedDetails)
    },
    /* reset tab skins */
    resetTab: function() {
      this.view.btnTab1.skin = (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummaryUnselected13px": "ICSknBtnAccountSummaryUnselected";
      this.view.btnTab2.skin = (kony.application.getCurrentBreakpoint() === 640) ? "ICSknBtnAccountSummaryUnselected13px": "ICSknBtnAccountSummaryUnselected";
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
    /*
    * show or hide approval history section
    */
    showHideApprovalHistorySection : function(option){
      this.view.flxApprovalStatus.setVisibility(option);
      this.view.flxSeparatorBottom.setVisibility(option);
      this.view.segApprovalDetails.setVisibility(option);
      this.view.flxTopSeperator.setVisibility(option);
    },

  };
});
