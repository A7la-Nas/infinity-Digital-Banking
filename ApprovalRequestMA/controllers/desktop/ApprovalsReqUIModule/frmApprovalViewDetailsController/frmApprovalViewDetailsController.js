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
    beneficiaryActionIdArray : ['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'],
	beneficiaryRequestType:"",
    beneficiaryRequestFeatureActionid:"",
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
          case BBConstants.DASHBOARD_DEFAULT_TAB:
            this.showDefaultDashboard();
            break;
          case BBConstants.SHOW_ACH_TEMPLATES_TAB:
            this.showDefaultDashboard();
            this.view.customheader.customhamburger.activateMenu("ACH", "Make Payment With Template");
            this.view.forceLayout();
            break;
          case BBConstants.SHOW_ACH_TRANSACTIONS_TAB:
            this.showApprovalViewDetailsSelectedTab(
              2,
              kony.i18n.getLocalizedString("i18n.konybb.ACH.ACHHistory"),
              kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions")
            );
            this.view.customheader.customhamburger.activateMenu("ACH", "ACH History");
            this.activeTab = BBConstants.ACH_TRANSACTIONS;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.hideOrShowCloseIcon();
            this.invokeFetchACHTransactions();
            break;
          case BBConstants.SHOW_ACH_FILES_TAB:
            this.showApprovalViewDetailsSelectedTab(
              3,
              kony.i18n.getLocalizedString("i18n.konybb.ACH.Files"),
              kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")
            );
            this.view.customheader.customhamburger.activateMenu("ACH", "Files");
            this.activeTab = BBConstants.ACH_FILES;
            this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
            this.hideOrShowCloseIcon();
            this.invokeFetchACHFiles();
            break;
          case BBConstants.SHOW_ACH_APPROVALS_TAB:
            this.showApprovalViewDetailsSelectedTab(
              4,
              kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
              kony.i18n.getLocalizedString("i18n.konybb.hamburger.ACHApprovals")
            );
            this.activeTab = BBConstants.ACH_APPROVALS;
            this.setupApprovalsView();
            break;
          case BBConstants.TRANSACTION_WITHOUT_TEMPLATE:
            this.createTransactionWithoutTemplate(true);
            this.view.customheader.customhamburger.activateMenu("ACH", "Make One Time Payment");
            break;
          case BBConstants.SET_ACH_TEMPLATES:
            this.setupACHTemplatesViewFetchData(uiModel.responseData);
            break;
          case BBConstants.SET_ACH_TRANSACTIONS:
            this.setupTransactionsViewFetchData(uiModel.responseData);
            break;
          case BBConstants.SET_ACH_FILES:
            this.setupACHFilesView(uiModel.responseData);
            break;
          case BBConstants.SET_PENDING_ACH_APPROVALS:
            var SHOWREJECTED = false;
            this.setDataForApprovals(SHOWREJECTED, uiModel.responseData);
            break;
          case BBConstants.SET_REJECTED_ACH_APPROVALS:
            SHOWREJECTED = true;
            this.setDataForApprovals(SHOWREJECTED, uiModel.responseData);
            break;
          case BBConstants.APPROVED_TRANSACTION_ACK:
            this.showApprovedTransaction(uiModel.responseData);
            break;
          case BBConstants.REJECTED_TRANSACTION_ACK:
            this.showRejectedTransaction(uiModel.responseData);
            break;
          case BBConstants.WITHDRAWN_TRANSACTION_ACK:
            this.showWithdrawnTransaction(uiModel.responseData);
            break;
          case BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE:
            this.showApprovedACHFile(uiModel);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_FILES_TAB);
            break;
          case BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE:
            this.showRejectedACHFile(uiModel);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_FILES_TAB);
            break;
          case BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE:
            this.showWithdrawnACHFile(uiModel);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_FILES_TAB);
            break;
          case BBConstants.APPROVED_ACH_FILE_ACK:
            this.showApprovedACHFile(uiModel);
            break;
          case BBConstants.REJECTED_ACH_FILE_ACK:
            this.showRejectedACHFile(uiModel);
            break;
          case BBConstants.WITHDRAWN_ACH_FILE_ACK:
            this.showWithdrawnACHFile(uiModel);
            break;
          case BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION:
            this.showApprovedACHTransaction(uiModel, true);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_TRANSACTIONS_TAB);
            break;
          case BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION:
            this.showRejectedACHTransaction(uiModel);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_TRANSACTIONS_TAB);
            break;
          case BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHTRANSACTION:
            this.showWithdrawnACHTransaction(uiModel);
            this.actionAcknowledgementUIFromDashboard(BBConstants.SHOW_ACH_TRANSACTIONS_TAB);
            break;
          case BBConstants.APPROVED_ACH_TRANSACTION_ACK:
            this.showApprovedACHTransaction(uiModel, true);
            break;
          case BBConstants.REJECTED_ACH_TRANSACTION_ACK:
            this.showRejectedACHTransaction(uiModel);
            break;
          case BBConstants.WITHDRAWN_ACH_TRANSACTION_ACK:
            this.showWithdrawnACHTransaction(uiModel);
            break;
          case BBConstants.SET_TEMPLATE_DETAILS_PAYMENT:
            this.setfetchedTemplateRecordsForPayment(uiModel.responseData);
            break;
          case BBConstants.CREATE_TRANSACTION_SUCCESS:
          case BBConstants.EXECUTE_TEMPLATE_SUCCESS:
            this.showCreatedTransaction(uiModel.responseData);
            break;
          case BBConstants.SAVE_TEMPLATE_SUCCESS:
            this.showCreatedTemplate(uiModel.responseData);
            break;
          case BBConstants.CREATED_ACH_TEMPLATE:
            this.showCreatedTemplate(uiModel.responseData);
            break;
          case BBConstants.EDIT_ACH_TEMPLATE_SUCCESS:
            this.showUpdatedTemplate(uiModel.responseData, true);
            break;
          case BBConstants.SHOW_ACH_RECORDS_DATA:
            this.showFetchedTemplateOrTransationRecords(uiModel.responseData);
            break;
          case BBConstants.SHOW_ACH_FILES_DATA:
            this.showFetchedFileRecords(uiModel.responseData);
            break;
          case BBConstants.SHOW_ACH_TNC:
            this.showACHTnC(uiModel.responseData);
            break;
          case BBConstants.HIDE_ACH_TNC:
            this.hideACHTnC();
            break;
          case BBConstants.TEMPLATE_RECORDS_FAILURE:
            this.showTemplateRecordsErrorMessage();
            break;
          case BBConstants.DELETE_TEMPLATE_SUCCESS:
            this.onDeleteACHTemplateSuccess(uiModel.responseData);
            break;
          case BBConstants.SHOW_ACH_RECORDS_FOR_EDIT:
            this.setTemplateRecordsForEdit(uiModel.responseData);
            break;
          default:
            this.updateTheFormUI(uiModel);
        }
      }
    },

    /**
         *	This method is an extension to the updateFormUI.
         **/
    updateTheFormUI: function(uiModel) {
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
          this.viewGeneralTransactionDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData,uiModel.responseData.isHistory,uiModel.responseData.InfinityUserContractData);
          break;
        case BBConstants.ACH_FILE_VIEW_DETAILS:
          this.viewACHFileDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData,uiModel.responseData.isHistory);
          break;
        case BBConstants.ACH_TRANSACTION_VIEW_DETAILS:
          this.viewACHTransactionDetails(uiModel.responseData.selectedRowData, uiModel.responseData.isApprovalData, uiModel.responseData.isRequestData,uiModel.responseData.isHistory);
          break;
        case BBConstants.SERVICE_ERROR:
          this.showDownTimeMessage(uiModel.responseData);
          break;
        case BBConstants.REQUEST_HISTORY_SUCCESS:
          var requestedBy=this.getUsernameOrCompanyId(uiModel.responseData[0]);
          this.showRequestHistoryData(uiModel.responseData);
          this.populateBeneficiaryRequestTypeByDetails(this.beneficiaryRequestType,requestedBy,this.beneficiaryRequestFeatureActionid);
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
        case "achViewDetails" :
          this.showUploadedFileApprovals(uiModel.responseData[0]);
          break;
        case "SET_BENEFICIARY_DETAILS" :
          this.setBeneficiaryDetailsInSameScreen(uiModel.responseData);
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

    campaignSuccess: function(data) {
      var CampaignManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
      CampaignManagementModule.presentationController.updateCampaignDetails(data);
      var self = this;
      if (data.length === 0) {

        this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(false);
      } else {
        this.view.dbRightContainerNew.flxBannerWrapper.setVisibility(true);

        this.view.dbRightContainerNew.imgBanner.src = data[0].imageURL;
        this.view.dbRightContainerNew.imgBanner.onTouchStart = function() {
          CampaignUtility.onClickofInAppCampaign(data[0].destinationURL);
        };
      }

      this.adjustScreen(50);
    },

    /**
         * onInit : onInit event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onInit: function() {
      FormControllerUtility.setRequestUrlConfig(this.view.browserTnC);
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.view.NonEditableDetailsNew.lblACHTitleText.skin = ViewConstants.SKINS.LABEL_HEADER_BOLD;
    },

    checkUserFeature: function(feature) {
      return applicationManager.getConfigurationManager().checkUserFeature(feature);
    },
    checkAtLeastOneFeaturePresent: function(features) {
      return features.some(this.checkUserFeature);
    },

    checkUserPermission: function(permission) {
      return applicationManager.getConfigurationManager().checkUserPermission(permission);
    },

    checkAtLeastOnePermission: function(permissions) {
      return permissions.some(this.checkUserPermission);
    },

    invokeFetchACHTemplates: function() {
      this.updateFetchParams();
      this.setPaginationComponentForACHTemplates();
      this.fetchACHTemplates();
    },

    invokeFetchACHTransactions: function() {
      this.updateFetchParams();
      this.setPaginationComponentForACHTransactions();
      this.fetchACHTransactions("createdts", "DESC");
    },

    invokeFetchACHFiles: function() {
      this.updateFetchParams();
      this.setPaginationComponentForACHFiles();
      this.fetchACHFiles();
    },

    /**
        	method is used to set UI when fetching template records fails
        **/
    showTemplateRecordsErrorMessage: function() {
      this.view.lblTemplateRecordsError.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.UnableToFetchData");
      this.view.flxTemplateRecordsErrorMessage.setVisibility(true);
      this.view.TemplateRecordsNew.setVisibility(false);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    /**
        	method is used to set UI when fetching template records is sucess
        **/
    hideTemplateRecordsErrorMessage: function() {
      this.view.flxTemplateRecordsErrorMessage.setVisibility(false);
      this.view.TemplateRecordsNew.setVisibility(true);
      this.adjustScreen(0);
    },
    /**
         * onPreShow :  onPreshow event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onPreShow: function() {
      this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
      this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      this.executeTemplateData = null;
      this.paymentAccounts = [];
      this.collectionAccounts = [];
      this.view.customheader.forceCloseHamburger();
      this.setupPermissionBasedView();
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxContentContainer', 'flxFooter', 'flxHeaderMain', 'flxMain','flxFormContent']);
      this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
      this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX;
      this.view.flxSeperator4.isVisible = false;
      this.toggleErrorMessage("", false, 0);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.flxContentContainer.setVisibility(true);
      this.view.flxDowntimeWarning.setVisibility(false);
      this.view.flxPopup.isVisible = false;
      this.view.flxPopup.trComments.placeholderSkin="sknlbla0a0a015px";
      this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
      this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);

      var scopeObj = this;
      var break_point = kony.application.getCurrentBreakpoint();


      this.view.onBreakpointChange = function() {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(555);
        this.view.TabPaneNew.flxContentContainer.skin = "sknFlxffffffShadowdddcdcnoradius";
      } else {
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(202);
      }

      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
        this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHViewRowTemplateMobile";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.rowTemplate = "flxACHTemplateRecordDetailsMobile";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
        this.view.TabPaneNew.TabSearchBarNew.skin = "bbsknf8f7f8WithoutBorder";
        this.view.TabPaneNew.TabSearchBarNew.flxSearch.skin = "sknbgFBFBFBbre3e3e3";
        this.view.NonEditableDetailsNew.segDetails.rowTemplate = "flxNonEditableDetailsMobile";
        this.view.TabPaneNew.TabBodyNew.skin = "slFbox";
      } else {
        this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHViewHeader";
        this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHViewRowTemplate";
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.rowTemplate = "flxACHTemplateRecordDetails";
        this.view.TabPaneNew.TabSearchBarNew.skin = "slFbox";
        this.view.TabPaneNew.TabSearchBarNew.flxSearch.skin = "slFbox";
        this.view.TabPaneNew.TabBodyNew.skin = "slFbox";
        this.view.NonEditableDetailsNew.segDetails.rowTemplate = "flxNonEditableDetails";
      }

      


      //Basic Actions
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.onClick = function() {
        if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
          this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = true;
        }
      }.bind(this);
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.isVisible = false;
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.onClick = function() {
        if (this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.isVisible) {
          this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.origin = true;
        }
      }.bind(this);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
        this.setDropdownVisiblility();
      }.bind(this);
      this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
        this.setDropdownVisiblilityMobile();
      }.bind(this);
      //       this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick=function(){
      // 		this.segViewTypesRowClick(this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
      // 	  }.bind(this);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.skin = "slFBox";
      this.view.TabPaneNew.TabBodyNew.setSegmentReloadAction(this.segReloadAction);
      this.view.TemplateRecordsNew.TabBodyNew.setSegmentReloadAction(this.segReloadAction);
      this.view.TemplateRecordsNew.setOnClickUpdateDefaultAmount(this.updateAmountOnClick.bind(this));

      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onKeyUp = this.hideOrShowCloseIcon.bind(this);
      this.view.tbxTemplateDescription.onKeyUp = this.validateFormFields.bind(this, kony.i18n.getLocalizedString("i18n.konybb.Common.Template"));
      this.view.tbxTemplateName.onKeyUp = this.validateFormFields.bind(this, kony.i18n.getLocalizedString("i18n.konybb.Common.Template"));

      this.view.calEffectiveDate.dateEditable = false;
      this.view.calEffectiveDate1.dateEditable = false;

      this.loadDashboard();
      this.initializeDashboardSortParams();
      this.initializeFetchParams();
      this.initializeFilterParams();

      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(555);
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Search.ACHTransaction");
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholderSkin = "skntbxplaceholdere3e3e3SSP15px";

      } else {
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(202);
      }
      this.view.NonEditableDetailsNew.flxTitle.height="50dp";
      this.view.NonEditableDetailsNew.flxBtmSeperator.width = "100%";
      this.view.NonEditableDetailsNew.flxBtmSeperator.left = "0%";
      this.view.lblApprovalHistoryInformation.top = "13px";
      this.view.btnClose.top = "35px";

      this.view.forceLayout();
      this.adjustScreen(0);

    },

    segViewTypesRowClick: function(lblvalue) {
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (lblvalue !== kony.i18n.getLocalizedString("i18n.accounts.allTransactions")) {
        if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")) {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Payment";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")) {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Collection";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.accounts.pending")) {
          this.fetchParams.filterByParam = "achtransaction.status";
          this.fetchParams.filterByValue = "Pending";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.ach.collectionsPending")) {
          this.fetchParams.filterByParam = "transactionTypeName,achtransaction.status";
          this.fetchParams.filterByValue = "Collection,Pending";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.ach.paymentsPending")) {
          this.fetchParams.filterByParam = "transactionTypeName,achtransaction.status";
          this.fetchParams.filterByValue = "Payment,Pending";
        }
        this.filterParams.ACHTransactions = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

      } else {
        this.fetchParams.filterByParam = "";
        this.fetchParams.filterByValue = "";
      }
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      this.invokeFetchACHTransactions();
    },

    segViewTypesRowClickMobile: function(lblvalue) {
      this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (lblvalue !== kony.i18n.getLocalizedString("i18n.accounts.allTransactions")) {
        if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")) {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Payment";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")) {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Collection";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.accounts.pending")) {
          this.fetchParams.filterByParam = "achtransaction.status";
          this.fetchParams.filterByValue = "Pending";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.ach.collectionsPending")) {
          this.fetchParams.filterByParam = "transactionTypeName,achtransaction.status";
          this.fetchParams.filterByValue = "Collection,Pending";
        }
        if (lblvalue == kony.i18n.getLocalizedString("i18n.ach.paymentsPending")) {
          this.fetchParams.filterByParam = "transactionTypeName,achtransaction.status";
          this.fetchParams.filterByValue = "Payment,Pending";
        }
        this.filterParams.ACHTransactions = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

      } else {
        this.fetchParams.filterByParam = "";
        this.fetchParams.filterByValue = "";
      }
      this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      this.invokeFetchACHTransactions();
    },

    segSetupACHTemplatesRowClick: function(lblvalue) {
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (lblvalue !== "All Templates") {
        if (lblvalue == "Payment Templates") {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Payment";
        }
        if (lblvalue == "Collection Templates") {
          this.fetchParams.filterByParam = "transactionTypeName";
          this.fetchParams.filterByValue = "Collection";
        }
        this.filterParams.ACHTemplates = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

      } else {
        this.fetchParams.filterByParam = "";
        this.fetchParams.filterByValue = "";
      }
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      this.invokeFetchACHTemplates();
    },

    segSetupACHFilesViewRowClick: function(lblvalue) {
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = lblvalue;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (lblvalue !== "All ACH Files") {
        if (lblvalue == "All Sent Files") {
          this.fetchParams.filterByParam = "achfile.status";
          this.fetchParams.filterByValue = "Sent";
        }
        if (lblvalue == "All Completed Files") {
          this.fetchParams.filterByParam = "achfile.status";
          this.fetchParams.filterByValue = "Executed";
        }
        if (lblvalue == "All Pending Files") {
          this.fetchParams.filterByParam = "achfile.status";
          this.fetchParams.filterByValue = "Pending";
        }
        this.filterParams.ACHFiles = this.fetchParams.filterByValue + "," + this.fetchParams.filterByParam;

      } else {
        this.fetchParams.filterByParam = "";
        this.fetchParams.filterByValue = "";
      }
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      this.invokeFetchACHFiles();
    },

    setDropdownVisiblility: function() {
      if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin = false;
        return;
      }
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (!this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible) {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.clipBounds = false;
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = true;
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(true);
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
      } else {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.isVisible = false;
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      }
    },

    setDropdownVisiblilityMobile: function() {
      if (this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.origin) {
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.origin = false;
        return;
      }
      this.view.TabPaneNew.MobileCustomDropdown.flxStatus.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxApproveType.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxTimePeriod.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxButtons.setVisibility(false);
      if (!this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.isVisible) {
        this.view.TabPaneNew.MobileCustomDropdown.clipBounds = false;
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.clipBounds = false;
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.isVisible = true;
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(true);
        this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.setVisibility(true);
        this.view.TabPaneNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
        this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
      } else {
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.isVisible = false;
        this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
        this.view.TabPaneNew.MobileCustomDropdown.imgDropdown.centerX = "50%";
        this.view.TabPaneNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      }
    },

    initializeDashboardSortParams: function() {
      this.dashboardSortParams = {
        "ACHTemplates": {
          "TemplateName": "sorting_next.png",
          "RequestType": "sorting_next.png",
          "AccountType": "sorting_next.png"
        },
        "ACHTransactions": {
          "Date": "sorting_next.png",
          "Amount": "sorting_next.png"
        },
        "ACHFiles": {
          "DebitAmount": "sorting_next.png",
          "CreditAmount": "sorting_next.png",
          "FileStatus": "sorting_next.png"
        }
      };
    },

    initializeFetchParams: function() {
      this.fetchParams = {
        "searchString": "",
        "sortByParam": "",
        "sortOrder": "",
        "pageSize": "",
        "pageOffset": "",
        "filterByParam": "",
        "filterByValue": ""
      };
    },

    initializeFilterParams: function() {
      this.filterParams = {
        "ACHTemplates": ".",
        "ACHTransactions": ".",
        "ACHFiles": ".",
      };
    },

    /**
         * viewACHTransactionDetails : This method is called inorder to show ACH Transaction Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHTransactionDetails: function(selectedRowData, isApprovalData, isRequestData,ishistory) {
		this.selectedRowData = selectedRowData;
      if(!kony.sdk.isNullOrUndefined(isApprovalData) && isApprovalData === true){
        if(!kony.sdk.isNullOrUndefined(ishistory) && ishistory === true){
          this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.approvalHistory") + " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + " " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
          
        }
        else{
          this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals") + " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + " " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        }
      }
      else{
        if(!kony.sdk.isNullOrUndefined(ishistory) && ishistory === true){
          this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.requestHistory") + " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + " " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        }
        else{
          this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.MyRequests") + " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + " " + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        }
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
      this.view.flxAcknowledgementContainer.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);

      if (isApprovalData) {
        if(ishistory === true){
          this.btnConfigForApprovalViewDetailsHistory(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);
        }else {
          this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);
        }

        //  this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);

        this.view.ApprovalFormActions.btnOption.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve") +
          " " + kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
        this.view.ApprovalFormActions.btnOption.onClick = function() {
          this.approveACHTransaction(selectedRowData, BBConstants.APPROVED_ACH_TRANSACTION_ACK);
        }.bind(this);

        this.view.ApprovalFormActions.btnCancel.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject") +
          " " + kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
        this.view.ApprovalFormActions.btnCancel.onClick = function() {
          this.rejectACHTransaction(selectedRowData, BBConstants.REJECTED_ACH_TRANSACTION_ACK);
        }.bind(this);

      } else {
        this.view.ApprovalFormActions.btnNext.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amICreator === "true"));
        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw") +
          " " + kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
        this.view.ApprovalFormActions.btnNext.onClick = function() {
          this.showWithdrawPopup(selectedRowData, BBConstants.WITHDRAWN_ACH_TRANSACTION_ACK);
        }.bind(this);
        if(ishistory === true){
          this.btnConfigForRequestsViewDetailsHistory(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);
        }else {
          this.btnConfigForRequestsViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS);
        }
        //  this.btnConfigForRequestsViewDetails(BBConstants.FETCH_ACH_TRANSACTIONS_REQUESTS);

      }
	  this.view.flxRequestCreateEditUpdateEditDetails.isVisible=false;
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
    viewGeneralTransactionDetails: function(selectedRowData, isApprovalData, isRequestData,ishistory,InfinityUserContractData) {
      this.selectedRowData = selectedRowData;									  
      selectedRowData.Payee = selectedRowData.Payee.toolTip;
      this.view.flxOverlay.setVisibility(false);
      this.view.flxPendingApprovers.setVisibility(false);
      var approvalStatus = selectedRowData.Approval;
      this.view.lblApprovalStatusValue.text = selectedRowData.status; 
      this.view.lblApproveCountVal.text = approvalStatus.split(' ')[0]; 
      if (ishistory === false || ishistory === "false" || kony.sdk.isNullOrUndefined(ishistory) || selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if(!kony.sdk.isNullOrUndefined(selectedRowData)){
          if (selectedRowData.isGroupMatrix === "true" || selectedRowData.isGroupMatrix === true) {
            this.view.btnPendingAprrovers.setVisibility(true);
          } else {
            this.view.btnPendingAprrovers.setVisibility(false);
          }
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
      }else {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      var scope = this;
      scope.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(this,selectedRowData, InfinityUserContractData);																																			  
      scope.view.imgPopupclose.onTouchEnd = function() {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }
      scope.view.btnClose.onClick = function() {
        scope.view.flxOverlay.setVisibility(false);
        scope.view.flxPendingApprovers.setVisibility(false);
      }
      if (isApprovalData) {
        selectedRowData.DebitOrCreditAccount = selectedRowData.DebitAccount;
        selectedRowData.CreatedOn = selectedRowData.Date;
        selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
        this.view.flxApprovalDetailsStatus.setVisibility(true);
        this.view.flxApprovedCountDetails.setVisibility(true);
      } else if (isRequestData) {
        selectedRowData.contentHeaderName = kony.i18n.getLocalizedString("i18n.konybb.ACH.Requests");
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));            
        this.view.flxApprovalDetailsStatus.setVisibility(true);
        this.view.flxApprovedCountDetails.setVisibility(true);
      } else {
        //Data Mapping is Not Required
      }

      this.generalTransactionsAcknowledgement(selectedRowData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);

      this.view.flxAcknowledgementContainer.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      //history section expand/collpase
      this.view.flxApprovalHistoryCollapseArrow.setVisibility(true);
      this.view.flxApprovalHistoryCollapseArrow.onClick = function(){
        var showSection = true;
        this.view.lblDropdown.text = this.view.lblDropdown.text === "O" ? "P" : "O";
        showSection = this.view.lblDropdown.text === "O" ? true : false;
        this.showHideApprovalHistorySection(showSection);
      }.bind(this);
      this.view.NonEditableDetailsNew.flxDetailsCollapseArrow.setVisibility(true);
      this.view.NonEditableDetailsNew.flxDetailsCollapseArrow.onClick = function(){
        var showSection = true;
        this.view.NonEditableDetailsNew.lblCollapseArrow.text = this.view.NonEditableDetailsNew.lblCollapseArrow.text === "O" ? "P" : "O";
        showSection = this.view.NonEditableDetailsNew.lblCollapseArrow.text === "O" ? true : false;
        this.view.NonEditableDetailsNew.flxDetailsBottomContainer.setVisibility(showSection);
      }.bind(this);
      if (isApprovalData) {

        if(ishistory === true){
          this.btnConfigForApprovalViewDetailsHistory(BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        }else {
          this.btnConfigForApprovalViewDetails(BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
        }

        this.view.ApprovalFormActions.btnOption.isVisible = (!ishistory && (selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.onClick = function() {
          if(selectedRowData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE)
            this.approveChequeBookRequest(selectedRowData);
          else
            this.approveGeneralTransaction(selectedRowData, InfinityUserContractData);
        }.bind(this);

        this.view.ApprovalFormActions.btnCancel.isVisible = (!ishistory && (selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.onClick = function() {
          this.rejectGeneralTransaction(selectedRowData, InfinityUserContractData);
        }.bind(this);

      } else {

        if(ishistory === true){
          this.btnConfigForRequestsViewDetailsHistory(BBConstants.FETCH_TRANSACTIONS_REQUESTS);
        }else {
          this.btnConfigForRequestsViewDetails(BBConstants.FETCH_TRANSACTIONS_REQUESTS);
        }

        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnNext.isVisible = (!ishistory && (selectedRowData.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amICreator === "true"));
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
        this.view.ApprovalFormActions.btnNext.onClick = function() {
          if(selectedRowData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE){
            this.showWithdrawPopup(selectedRowData, BBConstants.WITHDRAWN_CHEQUEBOOK_ACK);
          }
          else{
            this.showWithdrawPopup(selectedRowData, BBConstants.WITHDRAWN_TRANSACTION_ACK);
          }
        }.bind(this);

        // this.btnConfigForRequestsViewDetails(BBConstants.FETCH_TRANSACTIONS_REQUESTS);
      }
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(selectedRowData.featureActionId)){
		this.beneficiaryRequestType =selectedRowData.featureActionName;
        this.beneficiaryRequestFeatureActionid=selectedRowData.featureActionId
        this.view.flxRequestCreateEditUpdateEditDetails.isVisible=true;
        this.view.flxRejectedCountDetails.setVisibility(true);
        this.view.NonEditableDetailsNew.lblACHTitleText.text = "Request Details"; // need to provide i18N key
        this.view.NonEditableDetailsNew.segDetails.rowTemplate = "flxNonEditableRecipientanditsbankDetails";
        if(kony.sdk.isNullOrUndefined(InfinityUserContractData)) {
                InfinityUserContractData = [];
//                 this.view.lblRecipientsLinkedWith.setVisibility(false);
                this.view.contractListRecipient.setVisibility(false);
            }else {
//                 this.view.lblRecipientsLinkedWith.setVisibility(true);
                this.view.contractListRecipient.setVisibility(true);
            }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT'].includes(selectedRowData.featureActionId)){
          this.setBeneficiaryManagementDataCreateFlow(selectedRowData,InfinityUserContractData);
        }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(selectedRowData.featureActionId)){
          this.setBeneficiaryManagementDataDeleteFlow(selectedRowData,InfinityUserContractData);
        }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(selectedRowData.featureActionId)){
          this.view.btnTab1.onClick = this.showTab1.bind(this,selectedRowData,InfinityUserContractData);
          this.view.btnTab2.onClick = this.showTab2.bind(this,selectedRowData,InfinityUserContractData);
          var showingUpdatedDetails = true;
          this.setBeneficiaryManagementDataEDITFlow(selectedRowData,InfinityUserContractData,showingUpdatedDetails);
        }
      }else{
        this.view.flxRequestCreateEditUpdateEditDetails.isVisible=false;
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(-60);
    },
    btnConfigForApprovalViewDetailsHistory : function(transactionType) {
      this.view.ApprovalFormActions.btnNext.isVisible = false;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToApprovalHistory");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        ApprovalsAndRequestsModule.presentationController.noServiceNavigateToFormBBUsers("frmBBApprovalsDashboard", BBConstants.DASHBOARD_DEFAULT_TAB, "", true);
      }.bind(this);
      /*this.view.flxBackToPending.onClick = function(){
        var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        ApprovalsAndRequestsModule.presentationController.noServiceNavigateToFormBBUsers("frmBBApprovalsDashboard", BBConstants.DASHBOARD_DEFAULT_TAB, "", true);
      }.bind(this);*/
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

    /**
         * viewACHFileDetails : This method is called inorder to show ACH File Details Pending for Approval
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected Record Data
         * @param {boolean} isApprovalData - true if data is from approvals or false if data is from requests
         * @return {}
         * @throws {}
         */
    viewACHFileDetails: function(selectedRowData, isApprovalData, isRequestData,ishistory) {
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

      if (isApprovalData) {
        if(ishistory === true){
          this.btnConfigForApprovalViewDetailsHistory(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        }else {
          this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        }
        //  this.btnConfigForApprovalViewDetails(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);

        this.view.ApprovalFormActions.btnOption.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve") +
          " " + kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
        this.view.ApprovalFormActions.btnOption.onClick = function() {
          this.approveACHFile(selectedRowData, BBConstants.APPROVED_ACH_FILE_ACK);
        }.bind(this);

        this.view.ApprovalFormActions.btnCancel.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amIApprover === "true"));
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject") + " " + kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
        this.view.ApprovalFormActions.btnCancel.onClick = function() {
          this.rejectACHFile(selectedRowData, BBConstants.REJECTED_ACH_FILE_ACK);
        }.bind(this);

      } else {

        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.isVisible = ((selectedRowData.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (selectedRowData.amICreator === "true"));
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw") +
          " " + kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
        this.view.ApprovalFormActions.btnNext.onClick = function() {
          this.showWithdrawPopup(selectedRowData, BBConstants.WITHDRAWN_ACH_FILE_ACK);
        }.bind(this);

        if(ishistory === true){
          this.btnConfigForRequestsViewDetailsHistory(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        }else {
          this.btnConfigForRequestsViewDetails(BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS);
        }
        //  this.btnConfigForRequestsViewDetails(BBConstants.FETCH_ACH_FILES_REQUESTS);

      }
      this.view.forceLayout();
      this.adjustScreen(0);
      FormControllerUtility.hideProgressBar(this.view);
    },

    /**
         * btnConfigForRequestsViewDetails : This method is called inorder to configure action buttons in Approval View Details form
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} transactionType - Type of transaction
         * @return {}
         * @throws {}
         */
    btnConfigForRequestsViewDetails: function(transactionType) {


      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
     // this.view.lblBackToPending.text = kony.i18n.getLocalizedString("i18n.approvals.BackToRequestssDashboard");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: transactionType,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBRequestsDashboard",
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
    },
    btnConfigForRequestsViewDetailsHistory : function(transactionType) {
      this.view.ApprovalFormActions.btnNext.isVisible = false;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToRequestHistory");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        ApprovalsAndRequestsModule.presentationController.noServiceNavigateToFormBBUsers("frmBBRequestsDashboard", BBConstants.DASHBOARD_DEFAULT_TAB, "", true);
      }.bind(this);
    },
    approveACHFileViewDetails: function(selectedRowData, successKey) {
      var scopeObj = this;
      var Request_id = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": Request_id,
        "featureActionId": featureActionId,
        "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),

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
      //scopeObj.ApprovalRequestsModule.presentationController.approveTransactions(navObj);
      scopeObj.ApprovalRequestsModule.presentationController.approveACHFiles(navObj);
    },

    /**
         * btnConfigForApprovalViewDetails : This method is called inorder to configure action buttons in Approval View Details form
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} transactionType - Type of transaction
         * @return {}
         * @throws {}
         */
    btnConfigForApprovalViewDetails: function(transactionType) {

      this.view.ApprovalFormActions.btnNext.isVisible = false;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;

      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");

      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",//"frmBBMyApproval",
            module: "ApprovalsReqUIModule",
            context: {
              key: transactionType,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBApprovalsDashboard",//"frmBBMyApprovals",
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

    },

    fetchACHAccountTypes: function() {
      if (this.ACHAccountTypes === null || this.ACHAccountTypes === []) {
        var navigationObject = {
          "requestData": null,
          "onSuccess": {
            "form": "frmApprovalViewDetails",
            "module": "ApprovalsReqUIModule",
            "context": {
              "key": BBConstants.SET_ACH_ACCOUNT_TYPES,
              "responseData": null
            }
          },
          "onFailure": {
            "form": "frmApprovalViewDetails",
            "module": "ApprovalsReqUIModule",
            "context": {
              "key": BBConstants.SERVICE_ERROR,
              "responseData": null
            }
          }
        };
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.getACHAccountTypes(navigationObject);
      }
    },

    fetchTaxTypes: function() {
      if (this.TaxTypes === null || this.TaxTypes === []) {
        var navigationObject = {
          "requestData": null,
          "onSuccess": {
            "form": "frmApprovalViewDetails",
            "module": "ApprovalsReqUIModule",
            "context": {
              "key": BBConstants.SET_TAX_TYPES,
              "responseData": null
            }
          },
          "onFailure": {
            "form": "frmApprovalViewDetails",
            "module": "ApprovalsReqUIModule",
            "context": {
              "key": BBConstants.SERVICE_ERROR,
              "responseData": null
            }
          }
        };
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.getTaxTypes(navigationObject);
      }
    },

    /**
         * onPostShow :  onPostShow event Function for the form
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    onPostShow: function() {
      var scopeObj = this;
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.onBreakpointChange = function() {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      if (kony.application.getCurrentBreakpoint() <= 640) {
        this.view.TemplateRecordsNew.lblTotalAmmount.left = "0%";
      }
      this.view.btnPendingAprrovers.top="20dp";
      if (kony.application.getCurrentBreakpoint() <= 1024) {
        this.view.customfooter.lblCopyright.left = "17.5%";
        this.view.customfooter.flxFooterMenu.left = "16%";
      } 
      else if (kony.application.getCurrentBreakpoint() > 1024) {
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
      this.view.SegmentRecipientInfoDetails.rowTemplate = "flxNonEditableRecipientanditsbankDetails";
      this.view.SegmentRecipientBankDetails.rowTemplate = "flxNonEditableRecipientanditsbankDetails";
      //this.view.btnTab1.onClick = this.showTab1.bind(this);
      //this.view.btnTab2.onClick = this.showTab2.bind(this); In the edit flow we are assigning these functions
      this.accessibilityFocusSetup();
      this.adjustScreen(0);
    },
                //this.view.flxApprovalStatus.height="205dp";

    /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
    accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.tbxMaxAmt, this.view.flxMaxAmt],
      ]
      for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    },

    /**
         * setupPermissionBasedView :  show the UI based on the Permissions
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupPermissionBasedView: function() {
      this.view.TabPaneNew.TabsHeaderNew.btnTab1.isVisible = (this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getViewACHTemplatePermissionsList()
      ) && this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
      ));
      this.view.TabPaneNew.TabsHeaderNew.btnTab2.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getACHTransactionsTabPermissionsList()
      );
      this.view.TabPaneNew.TabsHeaderNew.btnTab3.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getACHFilesTabPermissionsList()
      );
      this.view.TabPaneNew.TabsHeaderNew.btnTab4.isVisible = false;
    },

    showApprovedTransaction: function(responseData) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.generalTransactionsAcknowledgementApprove(responseData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      var tran_id = responseData.Transaction_id || responseData.transactionId;

      if(!kony.sdk.isNullOrUndefined(tran_id))
        tran_id = tran_id.replace("_PSD2","");

      this.view.lblApprovalStatusValue.text = responseData.Approval;
      this.view.lblApproveCountVal.text = Number(this.view.lblApprovalStatusValue.text.split(' ')[0])+1+"";
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") +
        kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
        kony.i18n.getLocalizedString("i18n.konybb.Common.Approved").toLowerCase() + " \n " +
        kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + tran_id;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    showRejectedTransaction: function(responseData) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      this.generalTransactionsAcknowledgementApprove(responseData, "frmBBApprovalsDashboard", BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS);
      var tran_id = responseData.Transaction_id || responseData.transactionId;
      if(!kony.sdk.isNullOrUndefined(tran_id))
        tran_id = tran_id.replace("_PSD2","");
      this.view.lblApprovalStatusValue.text = responseData.Approval;
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") +
        kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
        kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected").toLowerCase() +
        " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + tran_id;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    showWithdrawnTransaction: function(responseData) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));
      this.generalTransactionsAcknowledgementApprove(responseData, "frmBBRequestsDashboard", BBConstants.FETCH_TRANSACTIONS_REQUESTS);
      var tran_id = responseData.Transaction_id;
      if(!kony.sdk.isNullOrUndefined(tran_id))
        tran_id = tran_id.replace("_PSD2","");
      this.view.lblApprovalStatusValue.text = responseData.Approval;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToRequests");
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") +
        kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
        kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn").toLowerCase() +
        " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + tran_id;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    setACHAccounts: function(responseData) {
      this.ACHAccountTypes = this.objectToListBoxArrayFromService(responseData);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    setACHFileTypes: function(responseData) {
      this.view.lstbFormatType.masterData = this.objectToListBoxArray(responseData);
      this.view.lstbFormatType.selectedKey = "0";
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    //*************************************************************** DASH BOARD COMMON CODE ***************************************************************************//

    loadDashboard: function() {
      this.view.TabPaneNew.TabsHeaderNew.btnTab1.onClick = this.onClickAnyTab;
      this.view.TabPaneNew.TabsHeaderNew.btnTab1.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
      this.view.TabPaneNew.TabsHeaderNew.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.konybb.template.ACH");
      this.view.TabPaneNew.TabsHeaderNew.btnTab1.text = kony.i18n.getLocalizedString("i18n.konybb.template.ACH");


      this.view.TabPaneNew.TabsHeaderNew.btnTab2.onClick = this.onClickAnyTab;
      this.view.TabPaneNew.TabsHeaderNew.btnTab2.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
      this.view.TabPaneNew.TabsHeaderNew.btnTab2.toolTip = kony.i18n.getLocalizedString("i18n.common.transactions");
      this.view.TabPaneNew.TabsHeaderNew.btnTab2.text = kony.i18n.getLocalizedString("i18n.common.transactions");


      this.view.TabPaneNew.TabsHeaderNew.btnTab3.onClick = this.onClickAnyTab;
      this.view.TabPaneNew.TabsHeaderNew.btnTab3.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
      this.view.TabPaneNew.TabsHeaderNew.btnTab3.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
      this.view.TabPaneNew.TabsHeaderNew.btnTab3.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");

      this.view.TabPaneNew.TabsHeaderNew.btnTab4.isVisible = false;
      this.view.TabPaneNew.TabsHeaderNew.btnTab4.onClick = this.onClickAnyTab;
      this.view.TabPaneNew.TabsHeaderNew.btnTab4.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
      this.view.TabPaneNew.TabsHeaderNew.btnTab4.toolTip = kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals");
      this.view.TabPaneNew.TabsHeaderNew.btnTab4.text = kony.i18n.getLocalizedString("i18n.konybb.MyApprovals.Header");
    },


    /**
         * onTabClick : to be executed on every tab click based on tab name.
         * @member of {frmBBMyApprovalsController}
         * @param {JSON Object} eventobject - Event object details of a Button
         * @return {}
         * @throws {}
         */
    onTabClick: function(eventobject) {
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
      this.hideOrShowCloseIcon();
      this.initializeFetchParams();
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.template.ACH")) {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllTemplates");
        this.activeTab = BBConstants.ACH_TEMPLATES;
        this.invokeFetchACHTemplates();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.common.transactions")) {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = kony.i18n.getLocalizedString("i18n.accounts.allTransactions");
        this.activeTab = BBConstants.ACH_TRANSACTIONS;
        this.invokeFetchACHTransactions();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles")) {
        this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text =  kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllACHFiles");
        this.activeTab = BBConstants.ACH_FILES;
        this.invokeFetchACHFiles();
      } else if (eventobject.text === kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals")) {
        this.activeTab = BBConstants.ACH_APPROVALS;
        this.setupApprovalsView();
      }
    },


    segReloadAction: function() {
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    onClickAnyTab: function(eventobject) {
      this.view.TabPaneNew.TabsHeaderNew.clickTab(eventobject);
      this.onTabClick(eventobject);
    },


    /**
         * showDashboard : Basic UI settings to Hide other flows and show Dashboard
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    showDashboard: function() {
      this.view.flxContentDashBoard.isVisible = true;
      this.view.flxTerms.isVisible = false;
      this.view.flxTabPaneContainer.isVisible = true;
      this.view.flxDashboard.skin = "slFbox";
      this.view.flxDashboard.top = "0dp";
      this.view.flxCreateUI.isVisible = false;
      this.view.flxACHFilesUpload.isVisible = false;
      this.view.flxTransactionDetails.isVisible = false;
      this.view.flxApprovalrequestHistorySection.isVisible = false;
      this.view.flxCommonActionsCont.isVisible = false;
      this.view.flxRequestCreateEditUpdateEditDetails.isVisible = false;
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxImgDownloadAch.isVisible = false;
      this.view.flxImgPrintAch.isVisible = false;
      this.view.flxDisplayErrorMessage.isVisible = false;
      this.view.dbRightContainerNew.lblActionHeader.isVisible = false;
      this.view.dbRightContainerNew.flxActionHeaderSeperator.isVisible = false;
      this.view.dbRightContainerNew.btnAction1.skin = "sknBtnSSP0dabb3e467ecc44";
    },


    /**
         * showDefaultDashboard : UI settings to show Default Tab - Currently Default is Templates
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    showDefaultDashboard: function() {
      this.view.customheader.customhamburger.activateMenu("ACH", "Make Payment With Template");
      this.showApprovalViewDetailsSelectedTab(
        1,
        kony.i18n.getLocalizedString("i18n.konybb.ACH.MakePaymentWithTemplate"),
        kony.i18n.getLocalizedString("i18n.konybb.ach.TemplateType")
      );
      this.activeTab = BBConstants.ACH_TEMPLATES;
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
      this.hideOrShowCloseIcon();
      this.invokeFetchACHTemplates();
    },


    /**
        This method is used to set pagination component data for ach templates dashboard
        **/
    setPaginationComponentForACHTemplates: function() {
      this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
      this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
      this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.template.ACH"));
      this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchACHTemplates);
      this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
    },

    /**
        This method is used to set pagination component data for ach transactions dashboard
        **/
    setPaginationComponentForACHTransactions: function() {
      this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
      this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
      this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"));
      this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchACHTransactions);
      this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
    },

    /**
        This method is used to set pagination component data for ach files dashboard
        **/
    setPaginationComponentForACHFiles: function() {
      this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
      this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
      this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"));
      this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchACHFiles);
      this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
    },

    /**
        This method is used to set pagination component data for ach approvals dashboard
        **/
    setPaginationComponentForACHApprovals: function(isRejected) {
      this.view.TabPaneNew.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
      this.view.TabPaneNew.PaginationContainer.setLowerLimit(1);
      this.view.TabPaneNew.PaginationContainer.setPageHeader(kony.i18n.getLocalizedString("i18n.konybb.hamburger.ACHApprovals"));
      if (!isRejected) {
        this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchPendingApprovals);
      } else {
        this.view.TabPaneNew.PaginationContainer.setServiceDelegate(this.fetchRejectedApprovals);
      }
      this.view.TabPaneNew.PaginationContainer.setIntervalHeader();
    },

    /**
         * showTemplatesDashboard : UI settings to show Dashboard with the particular selected tab and data
         * @member of {frmApprovalViewDetailsController}
         * @param {integer} tabIndex - number of the Selected Tab to be shown or highlighted
         * @param {string} menuTabName - Menu Name to be highlighted in the Hamburger Menu
         * @param {string} contentHeaderName - Title of the ACH Dashboard for the Selected Tab
         * @return {}
         * @throws {}
         */
    showApprovalViewDetailsSelectedTab(tabIndex, menuTabName, contentHeaderName) {
      if (tabIndex == 2) {
        this.view.customheader.customhamburger.activateMenu("ACH", "ACH History");
      }
      if (tabIndex == 3) {
        this.view.customheader.customhamburger.activateMenu("ACH", "Files");
      }
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxContentHeader.lblContentHeader.text = contentHeaderName;
      this.view.lblType.text = kony.i18n.getLocalizedString("i18n.konybb.template.ACH");
      this.view.TabPaneNew.TabsHeaderNew.focusTab(tabIndex);
      this.showDashboard();
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    //*********************************************************************** ACH TEMPLATES TAB SETUP *********************************************************************//

    updateFetchParams: function(sortParam, sortOrder) {
      this.fetchParams.searchString = CommonUtilities.validateSearchString(this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text);
      if (!kony.sdk.isNullOrUndefined(sortParam))
        this.fetchParams.sortByParam = sortParam;
      if (!kony.sdk.isNullOrUndefined(sortOrder))
        this.fetchParams.sortOrder = sortOrder;
      this.fetchParams.pageSize = this.view.TabPaneNew.PaginationContainer.getPageSize() + 1;
      this.fetchParams.pageOffset = this.view.TabPaneNew.PaginationContainer.getPageOffset();
      if ((this.activeTab === BBConstants.ACH_TRANSACTIONS && this.filterParams.ACHTransactions === ".") ||
          (this.activeTab === BBConstants.ACH_TEMPLATES && this.filterParams.ACHTemplates === ".") ||
          (this.activeTab === BBConstants.ACH_FILES && this.filterParams.ACHFiles === ".")) {
        this.fetchParams.filterByParam = "";
        this.fetchParams.filterByValue = "";
      }
    },

    /**
         * fetchACHTemplates : call to presentation controller to fetch ACHTemplates
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchACHTemplates: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_ACH_TEMPLATES,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getACHTemplatesData(navigationObject);
    },


    serachACHTemplates: function() {
      var searchTxt = this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text;
      this.showACHTemplates();
      if (kony.sdk.isNullOrUndefined(searchTxt) || searchTxt === "") {
        var lstBoxWidget = this.view.TabPaneNew.TabSearchBarNew.listBoxViewType;
        this.view.TabPaneNew.TabBodyNew.filterData(0, "lblRequestType", new RegExp(lstBoxWidget.selectedKeyValue[0]));
      } else {
        this.view.TabPaneNew.searchAndFilterData();
      }
      if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
        this.showNoACHTemplates();
      }
    },

    updatePaginationContainerUI: function(responseData) {
      var isMaxLimitReached = responseData.length <= this.view.TabPaneNew.PaginationContainer.getPageSize();
      this.view.TabPaneNew.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
      this.view.TabPaneNew.PaginationContainer.updateUI();
    },

    /**
         * setupACHTemplatesViewFetchData : Set the UI on the ACH Dashboard to View the ACH Template with the fetched Data
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array } ACHTemplatesData - list of JSON Objects related with the ACH Template Data
         * @return {}
         * @throws {}
         */
    setupACHTemplatesViewFetchData: function(ACHTemplatesData) {
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.MakePaymentWithTemplate"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.template.ACH");
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.ACH.searchPlaceHolder");
      this.view.TabPaneNew.setSearchData([
        ["lblTemplate", "lblAccountType", "lblRequestType", "lblCreatedByValue"]
      ]);

      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchACHTemplates;
      this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
        this.hideOrShowCloseIcon();
        this.invokeFetchACHTemplates();
      }.bind(this);
      this.view.TabPaneNew.TabSearchBarNew.flxSearch.isVisible = true;
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.paymentAccounts = [];
        this.collectionAccounts = [];
        this.setupRightContainerForTransactions();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }

      var sectionData = {
        flxTopSeperator: {
          "skin": "lblSeparator"
        },
        flxBottomSeperator: {
          "skin": "lblSeparator"
        },
        flxApprovalHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": false
        },
        flxTransactions: {
          "isVisible": false
        },
        flxTemplates: {
          "isVisible": true
        },
        flxTemplateName: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTemplates.TemplateName;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTemplates.TemplateName = img;
            this.fetchACHTemplates("templateName", order);
          }.bind(this)
        },
        flxRequestType: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTemplates.RequestType;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTemplates.RequestType = img;
            this.fetchACHTemplates("templateRequestTypeName", order);
          }.bind(this)
        },
        flxAccountType: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTemplates.AccountType;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTemplates.AccountType = img;
            this.fetchACHTemplates("accountName", order);
          }.bind(this)
        },
        btnAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount"),
        lblActions: kony.i18n.getLocalizedString("i18n.billPay.Actions"),
        btnRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
        btnTemplate: kony.i18n.getLocalizedString("i18n.konybb.Common.Template"),
        imgSortTempName: this.dashboardSortParams.ACHTemplates.TemplateName,
        imgRequestType: this.dashboardSortParams.ACHTemplates.RequestType,
        imgAccountType: this.dashboardSortParams.ACHTemplates.AccountType
      };

      this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
      if (ACHTemplatesData.length === 0) {
        /* Data to show when there is no ACH Template */
        this.view.TabPaneNew.PaginationContainer.isVisible = false;
        this.showNoACHTemplates();
      } else {
        this.showACHTemplates();
        this.view.TabPaneNew.PaginationContainer.isVisible = true;
        this.updatePaginationContainerUI(ACHTemplatesData);
        if (ACHTemplatesData.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
          ACHTemplatesData.pop();
        }
        this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHTemplatesData]);
      }
      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = [
      //         [".", "All Templates"],
      //         ["Payment,transactionTypeName", "Payment Templates"],
      //         ["Collection,transactionTypeName", "Collection Templates"]
      //       ];

      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.ACHTemplates;
      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function (eventobject) {
      //         var selectedKey = eventobject.selectedKey;
      //         this.filterParams.ACHTemplates = selectedKey;
      //         if(selectedKey !== "."){
      //           var params = eventobject.selectedKey.split(",")
      //           this.fetchParams.filterByValue = params.splice(0,params.length/2).toString();
      //           this.fetchParams.filterByParam = params.toString();
      //         }
      //         else{
      //           this.fetchParams.filterByParam = "";
      //           this.fetchParams.filterByValue = "";
      //         }
      //           this.invokeFetchACHTemplates();
      //       }.bind(this);
      //       if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
      // 			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin=false;
      // 			return;
      // 		}
      var obj_arr = [];
      obj_arr = [{
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllTemplates"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("konybb.userMgmt.PaymentTemp"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("konybb.userMgmt.CollectionTemp"),
        }

      }];

      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);

      var scope = this;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
        scope.segSetupACHTemplatesRowClick(scope.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    showACHTemplates: function() {
      var defaultValues = {
        flxMain: {
          "height": "51dp"
        },
        flxACHViewHeader: {
          "skin": "slFboxffffff"
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxTransactionHeader: {
          "isVisible": false
        },
        flxTransactionDetails: {
          "isVisible": false
        },
        flxAcknowledgementContainer: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": false
        },
        flxFileDetails: {
          "isVisible": false
        },
        flxTemplateHeader: {
          "isVisible": true
        },
        flxTemplateDetails: {
          "isVisible": true
        },
        lblAccountIcon: {
          //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
          "isVisible": this.profileAccess === "both" ? true : false,
        },
        flxAction: {
          "onClick": this.transactionWithTemplate
        },
        lblCurrrSym: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        imgDropDown: {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O"
        },
        lblCreatedOn: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn")
        },
        lblDefaultAmount: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.MaxAmount")
        },

        lblCreatedBy: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy")
        },
        lblLastUsed: {
          "text": kony.i18n.getLocalizedString("konybb.userMgmt.LastUsed")
        },
        btnEdit: {
          "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "isVisible": true,
          "onClick": this.onClickTemplateViewDetails

        },
        btnDelete: {
          "isVisible": false

        },
        btnViewDetails: {
          "isVisible": false
        },
      };

      var rowDataMap = {
        lblTemplate: "TemplateName",
        lblRequestType: "RequestType",
        lblAccountIcon: "lblAccountIcon",
        lblAccountType: "AccountName",
        lblActions: "Actions",
        lblCreatedOnValue: "CreatedOn",
        lblDefaultAmountValue: "MaxAmount",
        lblCreatedByValue: "userName",
        lblLastUsedValue: "EffectiveDate",
        lblDescription: "TemplateDescription"
      };

      this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
    },

    showNoACHTemplates: function() {
      var dataMap = {
        lblNoRecords: "lblMsg"
      };
      var defValues = {
        flxMain: {
          "height": "450dp"
        },
        flxACHViewHeader: {
          "isVisible": false
        },

        flxACHTemplateDetails: {
          "isVisible": false
        },

        flxNoRecords: {
          "height": "450dp",
          "isVisible": true
        },
      };
      this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
      this.view.TabPaneNew.TabBodyNew.addRowsData([
        [{
          "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.ApprovalViewDetails.NoACHTemplates")
        }]
      ]);
    },

    //*********************************************************************** ACH TRANSACTIONS TAB SETUP *********************************************************************//

    /**
         * setupRightContainerForTransactions : Setup the UI to show the Side Actions for ACH Transactions Dashboard
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForTransactions: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.createATemplate");

      this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTemplatePermissionsList()
      ) && this.createTemplateAccountCheck();
      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.createAnACHTemplate");
      this.view.dbRightContainerNew.btnAction1.onClick = this.createACHTemplate.bind(this, true);

      this.view.dbRightContainerNew.flxAction2.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
      );
      this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.common.createTransactionWithoutTemplate");
      this.view.dbRightContainerNew.btnAction2.onClick = this.createTransactionWithoutTemplate.bind(this, true);

      this.view.dbRightContainerNew.flxAction3.isVisible = false;
      this.view.dbRightContainerNew.flxActionHeaderSeperator.setVisibility(false);
      this.view.dbRightContainerNew.lblActionHeader.setVisibility(false);
      this.setRightContainerUI();
      this.view.dbRightContainerNew.setVisibility(true);
    },

    createTemplateAccountCheck: function() {
      var scopeObj = this;
      scopeObj.collectionAccounts = [];
      scopeObj.paymentAccounts = [];
      applicationManager.getConfigurationManager().userAccounts.forEach(function(obj) {
        var account = {
          "Id": obj.accountID,
          "Name": CommonUtilities.getMaskedAccount(obj.accountName, obj.accountID)
        };
        if (obj.accountType === "Savings" || obj.accountType === "Checking") {
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_COLLECTION_CREATE_TEMPLATE"))
            scopeObj.collectionAccounts.push(account);
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_PAYMENT_CREATE_TEMPLATE"))
            scopeObj.paymentAccounts.push(account);
        }

      });
      return scopeObj.paymentAccounts.length > 0 || scopeObj.collectionAccounts.length > 0;
    },

    setRightContainerUI: function() {
      if (this.view.dbRightContainerNew.btnAction1.isVisible === true && this.view.dbRightContainerNew.btnAction2.isVisible === true) {
        this.view.dbRightContainerNew.flxActionSeperator.isVisible = true;
      } else {
        this.view.dbRightContainerNew.flxActionSeperator.isVisible = false;
      }
      if (this.view.dbRightContainerNew.btnAction3.isVisible === true && (this.view.dbRightContainerNew.btnAction2.isVisible === true || this.view.dbRightContainerNew.btnAction1.isVisible === true)) {
        this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = true;
      } else {
        this.view.dbRightContainerNew.flxACtionSeperator2.isVisible = false;
      }
    },
    /**
         * fetchACHTransactions : call to presentation controller to fetch ACHTransactions
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchACHTransactions: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_ACH_TRANSACTIONS,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getACHTransactionsData(navigationObject);
    },

    serachACHTransactions: function() {
      var searchTxt = this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text;
      this.showACHTransactions();
      if (kony.sdk.isNullOrUndefined(searchTxt) || searchTxt === "") {
        var lstBoxWidget = this.view.TabPaneNew.TabSearchBarNew.listBoxViewType;
        this.view.TabPaneNew.TabBodyNew.filterData(0, "lblTrRequestType", new RegExp(lstBoxWidget.selectedKeyValue[0]));
      } else {
        this.view.TabPaneNew.searchAndFilterData();
      }
      if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
        this.showNoACHTransactions();
      }
    },

    /**
         * setupTransactionsViewFetchData : Set the UI on the ACH Dashboard to View the ACH Transaction with the fetched Data
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array } ACHTransactionsData - list of JSON Objects related with the ACH Transaction Data
         * @return {}
         * @throws {}
         */
    setupTransactionsViewFetchData: function(ACHTransactionsData) {
      var scopeObj = this;
      var break_point = kony.application.getCurrentBreakpoint();
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.ACHHistory"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
      this.view.TabPaneNew.TabSearchBarNew.flxSearch.isVisible = true;
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;

      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Search.ACHTransaction");
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholderSkin = "skntbxplaceholdere3e3e3SSP15px";
        this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
        this.view.customheader.lblHeaderMobile.isVisible = true;
      } else {
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Search.ACHTransaction");
        this.view.customheader.lblHeaderMobile.isVisible = false;
      }

      this.view.TabPaneNew.setSearchData([
        ["lblTrTemplateNameValue", "lblTrRequestType", "lblTrAccountType"]
      ]);

      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchACHTransactions;
      this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
        this.hideOrShowCloseIcon();
        this.invokeFetchACHTransactions();
      }.bind(this);
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForTransactions();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }
      var sectionData = {
        flxTopSeperator: {
          "skin": "lblSeparator"
        },
        flxBottomSeperator: {
          "skin": "lblSeparator"
        },
        flxApprovalHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": false
        },
        flxTransactions: {
          "isVisible": true
        },
        flxTemplates: {
          "isVisible": false
        },
        imgSortDate: this.dashboardSortParams.ACHTransactions.Date,
        imgSortAmount: this.dashboardSortParams.ACHTransactions.Amount,
        btnTransmittedDate: kony.i18n.getLocalizedString("i18n.konybb.common.CreatedDate"),
        lblTrAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount"),
        lblTrRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
        btnTrAmount: kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
        lblTrActions: kony.i18n.getLocalizedString("i18n.billPay.Actions"),
        flxTransmittedDate: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTransactions.Date;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTransactions.Date = img;
            this.fetchACHTransactions("createdts", order);
          }.bind(this)
        },
        flxTrAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTransactions.Amount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTransactions.Amount = img;
            this.fetchACHTransactions("totalAmount", order);
          }.bind(this)
        },
      };

      this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
      if (ACHTransactionsData.length === 0) {
        /* Flow to show the when there are no ACH Transactions to Show */
        this.view.TabPaneNew.PaginationContainer.isVisible = false;
        this.showNoACHTransactions();
      } else {
        this.showACHTransactions();
        this.view.TabPaneNew.PaginationContainer.isVisible = true;
        this.updatePaginationContainerUI(ACHTransactionsData);
        if (ACHTransactionsData.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
          ACHTransactionsData.pop();
        }
        this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHTransactionsData]);
      }

      //   	  this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = [
      //           [".", kony.i18n.getLocalizedString("i18n.accounts.allTransactions")],
      //           ["Payment,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly")],
      //           ["Collection,transactionTypeName", kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly")],
      //           ["Pending,achtransaction.status","Pending"],
      //           ["Collection,Pending,transactionTypeName,achtransaction.status","Collections Pending"],
      //           ["Payment,Pending,transactionTypeName,achtransaction.status","Payments Pending"]
      //         ];

      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.ACHTransactions;
      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function (eventobject) {
      //         var selectedKey = eventobject.selectedKey;
      //         this.filterParams.ACHTransactions = selectedKey;
      //         if(selectedKey !== "."){
      //           var params = eventobject.selectedKey.split(",")
      //           this.fetchParams.filterByValue = params.splice(0,params.length/2).toString();
      //           this.fetchParams.filterByParam = params.toString();
      //         }
      //         else{
      //           this.fetchParams.filterByParam = "";
      //           this.fetchParams.filterByValue = "";
      //         }
      //         this.invokeFetchACHTransactions();
      //       }.bind(this);


      //       if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
      //         this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin=false;
      //         return;
      //       }
      var obj_arr = [];
      obj_arr = [{
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.accounts.allTransactions"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.konybb.Common.PaymentsOnly"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.konybb.Common.CollectionsOnly"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.Search.Pending"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.ach.collectionsPending"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("i18n.ach.paymentsPending"),
        }
      }];

      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.setVisibility(false);

      var scope = this;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
        scope.segViewTypesRowClick(scope.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
      }.bind(this);
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
        scope.segViewTypesRowClickMobile(scope.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    showACHTransactions: function() {

      var break_point = kony.application.getCurrentBreakpoint();
      var height;
      if (break_point === 640 || orientationHandler.isMobile) {
        height = "62dp";
      } else {
        height = "51dp";
      }
      var defaultValues = {
        flxMain: {
          "height": height
        },
        flxACHViewHeader: {
          "skin": "slFboxffffff"
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxTransactionHeader: {
          "isVisible": true
        },
        flxTransactionDetails: {
          "isVisible": true
        },
        flxTranscationActions: {
          "isVisible": true
        },
        flxAcknowledgementContainer: {
          "isVisible": true
        },
        flxTemplateDetails: {
          "isVisible": false
        },
        flxTemplateHeader: {
          "isVisible": false
        },
        lblIcon: {
          //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true"? true : false
          "isVisible": this.profileAccess === "both" ? true : false,
        },
        flxFiles: {
          "isVisible": false
        },
        flxFileDetails: {
          "isVisible": false
        },
        lblCurSym: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        imgDropDown: {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O"
        },
        btnTrActions: {
          "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": this.onClickTransactionViewDetails
        },
        lblTrCreatedOn: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn")
        },
        lblTrTemplateName: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.templateName")
        },
        lblTrEffectiveDate: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate")
        },
        lblTrReferenceID: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")
        },
        lblTrCreatedBy: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy")
        },
        lblTrApprover: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals")
        },
        lblTrStatus: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.status")
        },
        btnReject: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.approveACHTransactionACH(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.Approve")
        },
        btnViewDetailsTr: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.rejectACHTransactionACH(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject")
        },
        btnWithdraw: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.withdrawRequest(selectedRowData, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHTRANSACTION);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")
        },
        lblSeparator1: "A"
      };
      var rowDataMap = {
        lblTransmittedDate: "CreatedOn",
        lblIcon: "lblIcon",
        lblTrAccountType: "AccountName",
        lblTrRequestType: "RequestType",
        lblTrAmount: "TotalAmount",
        lblTrCreatedOnValue: "CreatedOn",
        lblTrTemplateNameValue: "TemplateName",
        lblTrEffectiveDateValue: "EffectiveDate",
        lblTrReferenceIDValue: "Transaction_id",
        lblTrCreatedByValue: "userName",
        lblTrApproverValue: "Approver",
        lblTrStatusValue: "Status",
        lblSeparator1: "lblSeparator1",
        btnViewDetailsTr: "btnViewDetailsTr",
        btnReject: "btnReject",
        flxViewDetailsTr: "flxViewDetailsTr",
        flxRejectTr: "flxRejectTr",
        flxWithdrawTr: "flxWithdrawTr",
        flxTranscationActions: "flxTranscationActions",
        flxTrMainAction: "flxTrMainAction"
      };

      this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
    },
    approveACHTransactionACH: function (selectedRowData, successKey) {
      var ACHTransactionId = selectedRowData["Request_id"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": ACHTransactionId,
        "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
        "featureActionId": featureActionId
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
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.approveACHTransactions(navObj);
    },

    showNoACHTransactions: function() {
      var defHeight = "450dp";
      var defHeight2 = "450dp";
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        defHeight = "350dp";
        defHeight2 = "66dp";
      }
      var dataMap = {
        lblNoRecords: "lblMsg",
        imgError: "imgError"
      };
      var defValues = {
        flxMain: {
          "height": defHeight,
        },
        flxACHViewHeader: {
          "isVisible": false
        },

        flxACHTemplateDetails: {
          "isVisible": false
        },

        flxNoRecords: {
          "height": defHeight2,
          "isVisible": true
        },
        imgError: {
          "src": "info_grey.png"
        }
      };
      this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
      this.view.TabPaneNew.TabBodyNew.addRowsData([
        [{
          "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.ApprovalViewDetails.NoACHTransactions")
        }]
      ]);
    },

    //*********************************************************************** ACH FILES TAB SETUP *********************************************************************//

    /**
         * setupRightContainerForACHFiles : Setup the UI to show the Side Actions for ACH Files Dashboard
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForACHFiles: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");

      this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getUploadACHFilePermissionsList()
      );
      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadACH");
      this.view.dbRightContainerNew.btnAction1.onClick = this.showACHFilesUpload;

      this.view.dbRightContainerNew.flxAction2.isVisible = false;

      this.view.dbRightContainerNew.flxAction3.isVisible = false;

      this.view.dbRightContainerNew.setVisibility(true);
    },

    /**
         * setupRightContainerForUploadACHFiles : Setup the UI to show the Side Actions for ACH Files Upload UI
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForUploadACHFiles: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
      this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getViewACHFilePermissionsList()
      );

      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      this.view.dbRightContainerNew.btnAction1.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_FILES_TAB
      });
      this.view.dbRightContainerNew.flxAction2.isVisible = false;
      this.view.dbRightContainerNew.flxAction3.isVisible = false;

      this.view.dbRightContainerNew.setVisibility(true);
    },


    /**
         * fetchACHFiles : call to presentation controller to fetch ACHFiles
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchACHFiles: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_ACH_FILES,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getAllACHFiles(navigationObject);
    },

    serachACHFiles: function() {
      var searchTxt = this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text;
      this.showACHFiles();
      if (kony.sdk.isNullOrUndefined(searchTxt) || searchTxt === "") {
        var lstBoxWidget = this.view.TabPaneNew.TabSearchBarNew.listBoxViewType;
        this.view.TabPaneNew.TabBodyNew.filterData(0, "lblFileStatus", new RegExp(lstBoxWidget.selectedKeyValue[0]));
      } else {
        this.view.TabPaneNew.searchAndFilterData();
      }
      if (this.view.TabPaneNew.TabBodyNew.getData()[0][1].length <= 0) {
        this.showNoACHFiles();
      }
    },

    /**
         * setupACHFilesView : Set the UI on the ACH Dashboard to View the ACH Files with the fetched Data
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array } ACHFilesData - list of JSON Objects related with the ACH Files Data
         * @return {}
         * @throws {}
         */
    setupACHFilesView: function(ACHFilesData) {
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Files"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
      this.view.TabPaneNew.TabSearchBarNew.flxSearch.isVisible = true;
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = this.fetchParams.searchString;
      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.placeholder = "Search by file name or request type";
      this.view.TabPaneNew.setSearchData([
        ["lblFileName", "lblFileRequestTypeValue"]
      ]);

      this.view.TabPaneNew.TabSearchBarNew.tbxSearch.onDone = this.invokeFetchACHFiles;
      this.view.TabPaneNew.TabSearchBarNew.imgClear.onTouchStart = function() {
        this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text = "";
        this.hideOrShowCloseIcon();
        this.invokeFetchACHFiles();
      }.bind(this);
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = false;
      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForACHFiles();
        this.view.dbRightContainerNew.flxActions.isVisible = this.checkAtLeastOnePermission(
          applicationManager.getConfigurationManager().getUploadACHFilePermissionsList()
        );
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }

      var sectionData = {
        flxTopSeperator: {
          "skin": "lblSeparator"
        },
        flxBottomSeperator: {
          "skin": "lblSeparator"
        },
        flxApprovalHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": true
        },
        flxTransactions: {
          "isVisible": false
        },
        flxTemplates: {
          "isVisible": false
        },
        imgTotalDebitAmount: this.dashboardSortParams.ACHFiles.DebitAmount,
        imgTotalCreditAmount: this.dashboardSortParams.ACHFiles.CreditAmount,
        imgSortFileStatus: this.dashboardSortParams.ACHFiles.FileStatus,
        lblFileName: kony.i18n.getLocalizedString("i18n.bulkWire.fileName"),
        btnTotalDebitAmount: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
        btnTotalCreditAmount: kony.i18n.getLocalizedString("i18n.pfm.totalCreditAmt"),
        btnFileStatus: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
        lblFileActions: kony.i18n.getLocalizedString("i18n.billPay.Actions"),
        flxFileStatus: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.FileStatus;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.FileStatus = img;
            this.fetchACHFiles("status", order);
          }.bind(this)
        },
        flxTotalDebitAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.DebitAmount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.DebitAmount = img;
            this.fetchACHFiles("debitAmount", order);
          }.bind(this)
        },
        flxTotalCreditAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.CreditAmount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.CreditAmount = img;
            this.fetchACHFiles("creditAmount", order);
          }.bind(this)
        },
      };

      this.view.TabPaneNew.TabBodyNew.setSectionData([sectionData]);
      if (ACHFilesData.length === 0) {
        /* Data to show when there is no ACH File to show */
        this.view.TabPaneNew.PaginationContainer.isVisible = false;
        this.showNoACHFiles();
      } else {
        this.showACHFiles();
        this.view.TabPaneNew.PaginationContainer.isVisible = true;
        this.updatePaginationContainerUI(ACHFilesData);
        if (ACHFilesData.length === this.view.TabPaneNew.PaginationContainer.getPageSize() + 1) {
          ACHFilesData.pop();
        }
        this.view.TabPaneNew.TabBodyNew.addDataForSections([ACHFilesData]);
      }

      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = [
      //         [".", "All ACH Files"],
      //         ["Sent,achfile.status", "All Sent Files"],
      //         ["Executed,achfile.status", "All Completed Files"],
      //         ["Pending,achfile.status", "All Pending Files"]
      //       ];
      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.selectedKey = this.filterParams.ACHFiles;
      //       this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function (eventobject) {
      //         var selectedKey = eventobject.selectedKey;
      //         this.filterParams.ACHFiles = selectedKey;
      //         if (selectedKey !== ".") {
      //           var params = eventobject.selectedKey.split(",")
      //           this.fetchParams.filterByValue = params.splice(0,params.length/2).toString();
      //           this.fetchParams.filterByParam = params.toString();
      //         } else {
      //           this.fetchParams.filterByParam = "";
      //           this.fetchParams.filterByValue = "";
      //         }
      //         this.invokeFetchACHFiles();
      //       }.bind(this);

      //       if (this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin) {
      // 			this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.origin=false;
      // 			return;
      // 		}
      var obj_arr = [];
      obj_arr = [{
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("kony.i18n.userMgmt.AllACHFiles"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("konybb.userMgmt.AllSentFiles"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("konybb.userMgmt.AllCompFiles"),
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: kony.i18n.getLocalizedString("konybb.userMgmt.AllPndgFiles"),
        }

      }];
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.setVisibility(false);

      var scope = this;
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(obj_arr);
      this.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function() {
        scope.segSetupACHFilesViewRowClick(scope.view.TabPaneNew.TabSearchBarNew.MobileCustomDropdown.flxDropdown.segViewTypes.selectedRowItems[0].lblViewTypeName.text);
      }.bind(this);

      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);

    },

    showACHFiles: function() {
      var defaultValues = {
        flxMain: {
          "height": "51dp"
        },
        flxACHViewHeader: {
          "skin": "slFboxffffff"
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxTransactionHeader: {
          "isVisible": false
        },
        flxTransactionDetails: {
          "isVisible": false
        },
        flxAcknowledgementContainer: {
          "isVisible": false
        },
        flxTemplateDetails: {
          "isVisible": false
        },
        flxTemplateHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": true
        },
        flxFileDetails: {
          "isVisible": true
        },
        flxACHFileActions: {
          "isVisible": true
        },
        lblCurSymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        lblCurrSymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        imgDropDown: {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O"
        },
        btnFileActions: {
          "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": this.onClickACHFileViewDetails
        },
        lblUpdatedDateAndTime: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadDateTime")
        },
        lblUploadedBy: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadedBy")
        },
        lblNumberOfDebits: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfDebits")
        },
        lblNumberOfCredits: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfCredits")
        },
        lblFileRequestType: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType")
        },
        lblNumberOfPrenotes: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
        },
        btnRejectFile: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.approveACHFileFromACH(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.Approve")
        },
        btnViewFileDet: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.rejectACHFileApprovalViewDetails(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject")
        },
        btnWithdrawFile: {
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.withdrawRequest(selectedRowData, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE);
          }.bind(this),
          "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw")
        }
      };

      var rowDataMap = {
        lblFileName: "FileName",
        lblTotalDebitAmount: "TotalDebitAmount",
        lblTotalCreditAmount: "TotalCreditAmount",
        lblFileStatus: "FileStatus",
        lblUpdatedDateAndTimeValue: "UpdatedDateAndTime",
        lblNumberOfDebitsValue: "NumberOfDebits",
        lblNumberOfCreditsValue: "NumberOfCredits",
        lblFileRequestTypeValue: "FileRequestType",
        lblUploadedByValue: "userName",
        lblNumberOfPrenotes: "ApprovalStatus",
        lblNumberOfPrenotesValue: "Approver",
        flxWithdrawButton: "flxWithdrawButton",
        flxRejectButton: "flxRejectButton",
        flxViewDetailsButton: "flxViewDetailsButton"
      };

      this.view.TabPaneNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defaultValues]);
    },
    rejectACHFileApprovalViewDetails: function (selectedRowData, successKey) {
      var Request_id = selectedRowData["Request_id"];

      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectFileConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHFileServiceApprovalViewDetails.bind(this, selectedRowData, successKey));
    },
    rejectACHFileServiceApprovalViewDetails: function (selectedRowData, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": selectedRowData["Request_id"],
        "comments": Comments,
        "featureActionId":  BBConstants.ACH_FILE_UPLOAD
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
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHFiles(navObj);
    },

    showNoACHFiles: function() {
      var dataMap = {
        lblNoRecords: "lblMsg"
      };
      var defValues = {
        flxMain: {
          "height": "450dp"
        },
        flxACHViewHeader: {
          "isVisible": false
        },

        flxACHTemplateDetails: {
          "isVisible": false
        },

        flxNoRecords: {
          "height": "450dp",
          "isVisible": true
        },
      };
      this.view.TabPaneNew.TabBodyNew.setRowDataMap([dataMap]);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues([defValues]);
      this.view.TabPaneNew.TabBodyNew.addRowsData([
        [{
          "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.ApprovalViewDetails.NoACHFiles")
        }]
      ]);
    },

    //*********************************************************************** ACH APPROVALS TAB SETUP *********************************************************************//

    /**
         * setupRightContainerForACHApprovals : Setup the UI to show the Side Actions for ACH Approvals Dashboard
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForACHApprovals: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
      this.view.dbRightContainerNew.btnAction1.isVisible = (this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getViewACHTemplatePermissionsList()
      ) && this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
      ));
      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.createACHTranUsingTemp");
      this.view.dbRightContainerNew.btnAction1.onClick = this.createTransactionWithoutTemplate.bind(this, true);

      this.view.dbRightContainerNew.flxAction2.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTemplatePermissionsList()
      );
      this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.common.createAnACHTemplate");
      this.view.dbRightContainerNew.btnAction2.onClick = this.createACHTemplate.bind(this, true);

      this.view.dbRightContainerNew.flxAction3.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getUploadACHFilePermissionsList()
      );
      this.view.dbRightContainerNew.btnAction3.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadACH");
      this.view.dbRightContainerNew.btnAction3.onClick = this.showACHFilesUpload;

      this.view.dbRightContainerNew.setVisibility(true);
    },


    /**
         * fetchPendingApprovals : call to presentation controller to fetch ACH Files, and ACH Transactions waiting for Approvals
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchPendingApprovals: function() {
      this.updateFetchParams();
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_PENDING_ACH_APPROVALS,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getACHPendingApprovals(navigationObject);
    },


    /**
         * fetchRejectedApprovals : call to presentation controller to fetch ACH Files, and ACH Transactions which are Rejected
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    fetchRejectedApprovals: function() {
      this.updateFetchParams();
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_REJECTED_ACH_APPROVALS,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getACHRejectedApprovals(navigationObject);
    },

    fetchACHTransactionsPendingForApproval: function(sortByParam, sortOrder) {
      this.updateFetchParams(sortByParam, sortOrder);
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.ACH_SET_ACH_TRANSACTIONS_PENDING_APPROVALS_DATA,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getACHTransactionsPendingForMyApprovals(navigationObject);
    },
    fetchACHFilesPendingForApproval: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.ACH_SET_ACH_FILES_PENDING_APPROVALS_DATA,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getACHFilesPendingForMyApprovals(navigationObject);
    },

    fetchRejectedACHTransactions: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.ACH_SET_ACH_TRANSACTIONS_REJECTED_DATA,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getRejectedACHTransactions(navigationObject);
    },

    fetchRejectedACHFiles: function(sortParam, sortOrder) {
      this.updateFetchParams(sortParam, sortOrder);
      this.fetchParams.pageSize = "";
      this.fetchParams.pageOffset = "";
      var navigationObject = {
        "requestData": this.fetchParams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.ACH_SET_ACH_FILES_REJECTED_DATA,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.getRejectedACHFiles(navigationObject);
    },

    /**
         * setupApprovalsView : Set the UI on the ACH Dashboard to View the ACH Approvals Which are Pending
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupApprovalsView: function() {
      this.setupApprovalsCommonView();
      this.view.TabPaneNew.TabSearchBarNew.imgOption0.onTouchStart();
    },

    setupApprovalsCommonView: function() {
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.hamburger.ACHApprovals");
      this.view.TabPaneNew.TabSearchBarNew.flxSearch.isVisible = false;
      this.view.TabPaneNew.TabSearchBarNew.flxOptions.isVisible = true;
      this.view.TabPaneNew.TabSearchBarNew.imgOption0.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
      this.view.TabPaneNew.TabSearchBarNew.imgOption1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;

      this.view.TabPaneNew.TabSearchBarNew.lblOption0.text = kony.i18n.getLocalizedString("i18n.konybb.ViewPendingApprovals");
      this.view.TabPaneNew.TabSearchBarNew.lblOption1.text = kony.i18n.getLocalizedString("i18n.konybb.ViewRejectedApprovals");

      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForACHApprovals();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }

      var masterData = [
        [-1, "All "],
      ];

      var i = 0;

      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHTransactionApprovalsFeaturePermissionsList())) {
        masterData.push([i, "Transactions"]);
        i++;
      }
      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHFileApprovalsFeaturePermissionsList())) {
        masterData.push([i, "Files"]);
      }

      this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.masterData = masterData;

      this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.onSelection = function(eventobject) {
        this.view.TabPaneNew.TabBodyNew.filterSelectedSection(eventobject.selectedKeyValue[0]);
      }.bind(this);

      this.view.TabPaneNew.TabSearchBarNew.setOnOptionToggle(this.onToogle.bind(this));
    },

    onToogle: function() {
      this.setDataMappingForApprovals();
      this.invokeFetchOperationForApprovals();
    },

    updateApprovalsData: function(response, isRejectedData) {
      var data = {};
      var segData = this.view.TabPaneNew.TabBodyNew.segTemplates.data;
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

    /**
         * setDataMappingForApprovals : Set the UI on the ACH Dashboard to View the ACH Approvals Rejected or Pending based on Toggle
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setDataMappingForApprovals: function() {

      var fileSectionData = {
        flxTopSeperator: {
          "skin": "lblSeparator"
        },
        flxBottomSeperator: {
          "skin": "lblSeparator"
        },
        flxApprovalHeader: {
          "isVisible": true
        },
        lblApprovalHeader: {
          text: "2. " + kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles") + " - " + kony.i18n.getLocalizedString("i18n.konybb.PendingApprovals"),
          skin: "bbSknLblF5A623SSPBold15Px"
        },
        flxFiles: {
          "isVisible": true
        },
        flxTransactions: {
          "isVisible": false
        },
        flxTemplates: {
          "isVisible": false
        },
        imgTotalDebitAmount: this.dashboardSortParams.ACHFiles.DebitAmount,
        imgTotalCreditAmount: this.dashboardSortParams.ACHFiles.CreditAmount,
        imgSortFileStatus: this.dashboardSortParams.ACHFiles.FileStatus,
        lblFileName: kony.i18n.getLocalizedString("i18n.bulkWire.fileName"),
        btnTotalDebitAmount: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
        btnTotalCreditAmount: kony.i18n.getLocalizedString("i18n.pfm.totalCreditAmt"),
        btnFileStatus: kony.i18n.getLocalizedString("i18n.konybb.myRequests.status"),
        lblFileActions: kony.i18n.getLocalizedString("i18n.billPay.Actions"),
        flxFileStatus: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.FileStatus;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.FileStatus = img;
            // ACH files doesnot go for approval queue in this release
            //             if(this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO){
            //               this.fetchACHFilesPendingForApproval("status", order);
            //             }
            //             else{
            //               this.fetchRejectedACHFiles("status", order);
            //             }
          }.bind(this)
        },
        flxTotalDebitAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.DebitAmount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.DebitAmount = img;
            // ACH files doesnot go for approval queue in this release
            //             if(this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO){
            //               this.fetchACHFilesPendingForApproval("debitAmount", order);
            //             }
            //             else{
            //               this.fetchRejectedACHFiles("debitAmount", order);
            //             }
          }.bind(this)
        },
        flxTotalCreditAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHFiles.CreditAmount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHFiles.CreditAmount = img;
            // ACH files doesnot go for approval queue in this release
            //             if(this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO){
            //               this.fetchACHFilesPendingForApproval("creditAmount", order);
            //             }
            //             else{
            //               this.fetchRejectedACHFiles("creditAmount", order);
            //             }
          }.bind(this)
        },
      };

      var trSectionData = {
        flxTopSeperator: {
          "skin": "lblSeparator"
        },
        flxBottomSeperator: {
          "skin": "lblSeparator"
        },
        flxApprovalHeader: {
          "isVisible": true
        },
        lblApprovalHeader: {
          text: "1. " + kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions") + " - " + kony.i18n.getLocalizedString("i18n.konybb.PendingApprovals"),
          skin: "bbSknLblF5A623SSPBold15Px"
        },
        flxFiles: {
          "isVisible": false
        },
        flxTransactions: {
          "isVisible": true
        },
        flxTemplates: {
          "isVisible": false
        },
        imgSortDate: this.dashboardSortParams.ACHTransactions.Date,
        imgSortAmount: this.dashboardSortParams.ACHTransactions.Amount,
        btnTransmittedDate: kony.i18n.getLocalizedString("i18n.konybb.TransmittedDate"),
        lblTrAccountType: kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount"),
        lblTrRequestType: kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType"),
        btnTrAmount: kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
        lblTrActions: kony.i18n.getLocalizedString("i18n.billPay.Actions"),
        flxTransmittedDate: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTransactions.Date;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTransactions.Date = img;
            if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
              this.fetchACHTransactionsPendingForApproval("createdts", order);
            } else {
              this.fetchRejectedACHTransactions("createdts", order);
            }
          }.bind(this)
        },
        flxTrAmount: {
          "isVisible": true,
          "onClick": function(eventobject, context) {
            var img = this.dashboardSortParams.ACHTransactions.Amount;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var order = (img === "sorting_next.png") ? "DESC" : "ASC";
            this.dashboardSortParams.ACHTransactions.Amount = img;
            if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
              this.fetchACHTransactionsPendingForApproval("totalAmount", order);
            } else {
              this.fetchRejectedACHTransactions("totalAmount", order);
            }
          }.bind(this)
        },
      };

      var optionData = [
        ["Pending", kony.i18n.getLocalizedString("i18n.konybb.ViewPendingRequests")],
        ["Rejected", kony.i18n.getLocalizedString("i18n.konybb.ViewRejectedApprovals")]
      ];

      var skins = {
        "Pending": "bbSknLblF5A623SSPBold15Px",
        "Rejected": "bbSknLblFF001FLatoBold15Px"
      };

      var selectedOption;
      if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        selectedOption = optionData[0][0];
      } else {
        selectedOption = optionData[1][0];
      }

      var i = 0;
      var sectionData = [];
      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHTransactionApprovalsFeaturePermissionsList())) {
        i++;
        trSectionData.lblApprovalHeader = {
          text: i + ". " + kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions") + " - " + selectedOption + " " + kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
          skin: skins[selectedOption]
        };
        sectionData.push(trSectionData);
      }
      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHFileApprovalsFeaturePermissionsList())) {
        i++;
        fileSectionData.lblApprovalHeader = {
          text: i + ". " + kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles") + " - " + selectedOption + " " + kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
          skin: skins[selectedOption]
        };
        sectionData.push(fileSectionData);
      }

      this.view.TabPaneNew.TabBodyNew.setSectionData(sectionData);
    },

    invokeFetchOperationForApprovals: function() {
      if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
        //this.setPaginationComponentForACHApprovals(false); commenting code for this release
        this.fetchPendingApprovals();
      } else {
        //this.setPaginationComponentForACHApprovals(true); commenting code for this release
        this.fetchRejectedApprovals();
      }
    },

    /**
         * setDataForApprovals : Set the Data on the ACH Dashboard for ACH Approvals based on the parameters
         * @member of {frmApprovalViewDetailsController}
         * @param {Boolean } isRejectedData - is TRUE if Data of ACH Transaction and ACH Files is Rejected Approvals, else is Pending Approvals
         * @param {JSON Array } achTransactions - list of JSON Objects related with the ACH Transactions
         * @param {JSON Array } achFiles - list of JSON Objects related with the ACH Files Data
         * @return {}
         * @throws {}
         */
    setDataForApprovals: function(isRejectedData, data) {
      var achTransactions = data.ACHTransactions;
      var achFiles = data.ACHFiles;

      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));

      var trDefaultValues = {
        flxMain: {
          "height": "51dp"
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxTransactionHeader: {
          "isVisible": true
        },
        flxTransactionDetails: {
          "isVisible": true
        },
        flxAcknowledgementContainer: {
          "isVisible": true
        },
        flxTemplateDetails: {
          "isVisible": false
        },
        flxTemplateHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": false
        },
        flxFileDetails: {
          "isVisible": false
        },
        lblCurSym: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        imgDropDown: {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O"
        },
        lblTrCreatedOn: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn")
        },
        lblTrTemplateName: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.templateName")
        },
        lblTrEffectiveDate: {
          "isVisible": false,
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate")
        },
        lblTrReferenceID: {
          "isVisible": false,
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")
        },
        lblTrCreatedBy: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy")
        },
        lblTrApprovals: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals")
        },
        lblTrStatus: {
          "isVisible": false,
          "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.status")
        }
      };
      var fileDefaultValues = {
        flxMain: {
          "height": "51dp"
        },
        flxNoRecords: {
          "isVisible": false
        },
        flxTransactionHeader: {
          "isVisible": false
        },
        flxTransactionDetails: {
          "isVisible": false
        },
        flxAcknowledgementContainer: {
          "isVisible": false
        },
        flxTemplateDetails: {
          "isVisible": false
        },
        flxTemplateHeader: {
          "isVisible": false
        },
        flxFiles: {
          "isVisible": true
        },
        flxFileDetails: {
          "isVisible": true
        },
        lblCurSymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        lblCurrSymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        imgDropDown: {
          "skin": "sknLblFontTypeIcon1a98ff12pxOther",
          "text": "O"
        },
        lblUpdatedDateAndTime: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadDateTime")
        },
        lblUploadedBy: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.UploadedBy")
        },
        lblNumberOfDebits: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfDebits")
        },
        lblNumberOfCredits: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfCredits")
        },
        lblCompanyID: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.CompanyID")
        },
        lblFileRequestType: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType")
        },
        lblNumberOfPrenotes: {
          "text": kony.i18n.getLocalizedString("i18n.konybb.Files.NumbOfPrenotes"),
          "isVisible": false
        }
      };

      if (isRejectedData) {
        trDefaultValues.btnTrActions = {
          "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": function(eventobject, context) {
            this.onClickTransactionViewDetails(eventobject, context);
            this.view.ApprovalFormActions.btnNext.isVisible = true;
            this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
            this.view.ApprovalFormActions.btnNext.onClick = this.backToRejectedApprovals;
            this.view.ApprovalFormActions.btnCancel.isVisible = false;
            this.view.ApprovalFormActions.btnOption.isVisible = false;
            this.view.ApprovalFormActions.btnBack.isVisible = false;
            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        };
        fileDefaultValues.btnFileActions = {
          "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": function(eventobject, context) {
            this.onClickACHFileViewDetails(eventobject, context);
            this.view.ApprovalFormActions.btnNext.isVisible = true;
            this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
            this.view.ApprovalFormActions.btnNext.onClick = this.backToRejectedApprovals;
            this.view.ApprovalFormActions.btnCancel.isVisible = false;
            this.view.ApprovalFormActions.btnOption.isVisible = false;
            this.view.ApprovalFormActions.btnBack.isVisible = false;
            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        };
      } else {
        trDefaultValues.btnViewDetailsTr = {
          text: kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": function(eventobject, context) {
            this.onClickTransactionViewDetails(eventobject, context);
            var row = context.rowIndex;
            var section = context.sectionIndex;
            //var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.view.ApprovalFormActions.btnNext.isVisible = true;
            this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve") +
              " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction");
            this.view.ApprovalFormActions.btnNext.onClick = function(selectedRowData) {
              this.approveACHTransaction(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION);
            }.bind(this);

            this.view.ApprovalFormActions.btnCancel.isVisible = true;
            this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject") +
              " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction");
            this.view.ApprovalFormActions.btnCancel.onClick = function(selectedRowData) {
              this.rejectACHTransaction(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION);
            }.bind(this);

            this.view.ApprovalFormActions.btnBack.isVisible = false;
            this.view.ApprovalFormActions.btnOption.isVisible = true;
            this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
            this.view.ApprovalFormActions.btnOption.onClick = this.updateFormUI.bind(this, {
              "key": BBConstants.SHOW_ACH_APPROVALS_TAB
            });

            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        };
        trDefaultValues.btnTrActions = {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.Approve"),
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.approveACHTransaction(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION);
          }.bind(this)
        };
        trDefaultValues.btnReject = {
          text: kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject"),
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.rejectACHTransaction(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION);
          }.bind(this)
        };
        fileDefaultValues.btnFileActions = {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.Approve"),
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.approveACHFile(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);
          }.bind(this)
        };
        fileDefaultValues.btnRejectFile = {
          text: kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject"),
          "onClick": function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.rejectACHFile(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);
          }.bind(this)
        };
        fileDefaultValues.btnViewFileDet = {
          text: kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
          "onClick": function(eventobject, context) {
            this.onClickACHFileViewDetails(eventobject, context);
            var row = context.rowIndex;
            var section = context.sectionIndex;
            //var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
            this.view.ApprovalFormActions.btnNext.isVisible = true;
            this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve") +
              " " + kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
            this.view.ApprovalFormActions.btnNext.onClick = function(selectedRowData) {
              this.approveACHFile(selectedRowData, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);
            }.bind(this);

            this.view.ApprovalFormActions.btnCancel.isVisible = true;
            this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject") +
              " " + kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile");
            this.view.ApprovalFormActions.btnCancel.onClick = function(selectedRowData) {
              this.rejectACHFile(selectedRowData, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);
            }.bind(this);

            this.view.ApprovalFormActions.btnBack.isVisible = false;
            this.view.ApprovalFormActions.btnOption.isVisible = true;
            this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
            this.view.ApprovalFormActions.btnOption.onClick = this.updateFormUI.bind(this, {
              "key": BBConstants.SHOW_ACH_APPROVALS_TAB
            });

            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        };
      }
      var trRowDataMap = {
        lblTransmittedDate: "TransmittedDate",
        lblTrAccountType: "DebitOrCreditAccount",
        lblTrRequestType: "RequestType",
        lblTrAmount: "Amount",
        lblTrCreatedOnValue: "CreatedOn",
        lblTrTemplateNameValue: "TemplateName",
        lblTrCreatedByValue: "CreatedBy",
        lblTrApprovalsValue: "Approvals",
        StatusValue: "StatusValue",
        flxTrMainAction: "flxTrMainAction"
      };

      var fileRowDataMap = {
        lblFileName: "FileName",
        lblTotalDebitAmount: "TotalDebitAmount",
        lblTotalCreditAmount: "TotalCreditAmount",
        lblFileStatus: "FileStatus",
        lblUpdatedDateAndTimeValue: "UpdatedDateAndTime",
        lblNumberOfDebitsValue: "NumberOfDebits",
        lblNumberOfCreditsValue: "NumberOfCredits",
        lblCompanyIDValue: "CompanyID",
        lblFileRequestTypeValue: "FileRequestType",
        lblUploadedByValue: "userName",
        lblTrRequestType: "Request_id"
      };

      var dataMap = {
        lblNoRecords: "lblMsg"
      };
      var defValues = {
        flxMain: {
          "height": "100dp"
        },
        flxACHViewHeader: {
          "isVisible": false
        },

        flxACHTemplateDetails: {
          "isVisible": false
        },

        flxNoRecords: {
          "height": "100dp",
          "isVisible": true
        },
      };

      var areFilesEmpty = false;
      var areTransactionsEmpty = false;
      var isACHTransactionMaxLimitReached = false;
      var isACHFileMaxLimitReached = false;
      var rowDataMap = [];
      var defaultValues = [];
      var sectionData = [];
      var i = 0;

      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHTransactionApprovalsFeaturePermissionsList())) {
        if (kony.sdk.isNullOrUndefined(achTransactions) || achTransactions.length === 0) {
          trDefaultValues = defValues;
          trRowDataMap = dataMap;
          if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
            achTransactions = [{
              "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHTransactions")
            }];
          } else {
            achTransactions = [{
              "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHTransactionsRejection")
            }];
          }
          areTransactionsEmpty = true;
        }
        isACHTransactionMaxLimitReached = achTransactions.length < BBConstants.PAGE_SIZE;
        rowDataMap.push(trRowDataMap);
        defaultValues.push(trDefaultValues);
        sectionData.push(achTransactions);
      }

      if (this.checkAtLeastOnePermission(applicationManager.getConfigurationManager().getACHFileApprovalsFeaturePermissionsList())) {
        if (kony.sdk.isNullOrUndefined(achFiles) || achFiles.length === 0) {
          fileDefaultValues = defValues;
          fileRowDataMap = dataMap;
          if (this.view.TabPaneNew.TabSearchBarNew.imgOption0.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
            achFiles = [{
              "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHFiles")
            }];
          } else {
            achFiles = [{
              "lblMsg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.NoACHFilesRejection")
            }];
          }
          areFilesEmpty = true;
        }
        isACHFileMaxLimitReached = achFiles.length < BBConstants.PAGE_SIZE;
        rowDataMap.push(fileRowDataMap);
        defaultValues.push(fileDefaultValues);
        sectionData.push(achFiles);
      }

      //if( areFilesEmpty && areTransactionsEmpty ){ out of the scope for 2020.04 release
      this.view.TabPaneNew.PaginationContainer.isVisible = false;
      //}
      //		 out of the scope for 2020.04 release
      //       var isMaxLimitReached = isACHFileMaxLimitReached && isACHFileMaxLimitReached;
      //       this.view.TabPaneNew.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
      //       this.view.TabPaneNew.PaginationContainer.updateUI();

      this.view.TabPaneNew.TabBodyNew.setRowDataMap(rowDataMap);
      this.view.TabPaneNew.TabBodyNew.setDefaultValues(defaultValues);
      this.view.TabPaneNew.TabBodyNew.addDataForSections(sectionData);

      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    backToRejectedApprovals: function() {
      this.showApprovalViewDetailsSelectedTab(
        4,
        kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"),
        kony.i18n.getLocalizedString("i18n.konybb.hamburger.ACHApprovals")
      );
      this.setupApprovalsCommonView();
      this.view.TabPaneNew.TabSearchBarNew.imgOption1.onTouchStart();
    },

    //************************************************************** CREATING TRANSACTION OR TEMPLATES **************************************************************//

    /**
         * setupRightContainerForCreateTransaction : Setup the UI to show the Side Actions for Create ACH Transactions
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForCreateTransaction: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHTransfer");

      this.view.dbRightContainerNew.btnAction1.isVisible = (this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getViewACHTemplatePermissionsList()
      ) && this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
      ));
      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.createTransactionUsingTemplate");
      this.view.dbRightContainerNew.btnAction1.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });

      this.view.dbRightContainerNew.flxAction2.isVisible = false;

      this.view.dbRightContainerNew.flxAction3.isVisible = false;

      this.view.dbRightContainerNew.setVisibility(true);
    },


    /**
         * setupRightContainerForCreateTemplate : Setup the UI to show the Side Actions for Create ACH Template
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    setupRightContainerForCreateTemplate: function() {
      this.view.dbRightContainerNew.lblActionHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHTransfer");

      this.view.dbRightContainerNew.btnAction1.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getCreateACHTransactionPermissionsList()
      );
      this.view.dbRightContainerNew.btnAction1.text = kony.i18n.getLocalizedString("i18n.konybb.common.createTransactionWithoutTemplate");
      this.view.dbRightContainerNew.btnAction1.onClick = this.createTransactionWithoutTemplate.bind(this, true);

      this.view.dbRightContainerNew.flxAction2.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getViewACHTemplatePermissionsList()
      );
      this.view.dbRightContainerNew.btnAction2.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.dbRightContainerNew.btnAction2.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });

      this.view.dbRightContainerNew.flxAction3.isVisible = false;

      this.view.dbRightContainerNew.setVisibility(true);
    },


    /**
         * createUIForCreateTemplateOrCreateTransaction : Common UI setup for Template or Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {string} UIType - to identify the type as Template or Transaction
         * @param {boolean} isNotBack - to identify if it is on Back flow, if no then clear the previous Data
         * @return {}
         * @throws {}
         */
    createUIForCreateTemplateOrCreateTransaction: function(UIType, isNotBack, params) {

      this.view.flxContentDashBoard.isVisible = true;
      this.view.flxTerms.isVisible = true;
      this.view.flxTabPaneContainer.isVisible = false;
      this.view.flxDashboard.skin = "slfBoxffffffB1R5";
      this.view.flxDashboard.top = "5dp";
      this.view.flxACHFilesUpload.isVisible = false;
      this.view.flxCreateUI.isVisible = true;
      this.view.dbRightContainerNew.lblActionHeader.isVisible = false;
      this.view.dbRightContainerNew.flxActionHeaderSeperator.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxTransactionDetails.isVisible = false;
      this.view.flxApprovalrequestHistorySection.isVisible = false;
      this.view.flxCommonActionsCont.isVisible = false;
      this.view.flxRequestCreateEditUpdateEditDetails.isVisible = false;
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.toggleErrorMessage("", false, 0);
      var context = {
        "widget": this.view.calEffectiveDate,
        "anchor": "top"
      };
      this.view.calEffectiveDate.setContext(context);
      this.view.calEffectiveDate.clear();
      if (isNotBack)
        this.setPlaceHolderForListBoxes();

      if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
        this.view.lblEffectiveDate.isVisible = false;
        this.view.flxDate.isVisible = false;
        this.view.calEffectiveDate.isVisible = false;
      } else
        if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
          this.view.calEffectiveDate.validStartDate = CommonUtilities.getServerDateComponent();
          this.view.calEffectiveDate.dateComponents = CommonUtilities.getServerDateComponent();
          this.view.lblNotTodayMsg.isVisible = false;
          this.view.lblEffectiveDate.isVisible = true;
          this.view.flxDate.isVisible = true;
          this.view.calEffectiveDate.isVisible = true;
        }

      this.setValidationEventsForWidgets(UIType);
      this.view.flxCreateUI.createFlowFormActionsNew.btnNext.onClick = this.proceedNext.bind(this, UIType, params);

      if (isNotBack) {
        var scopeObj = this;
        this.createUIType = UIType;

        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmApprovalViewDetails",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.SET_ACH_TEMPLATE_TYPES,
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
        scopeObj.ApprovalsReqUIModule.presentationController.getTemplateTypes(navObj);

        this.view.lstbRequestType.selectedKeys = null;
        this.view.lstbCompanyName.selectedKeys = null;
        this.view.tbxMaxAmt.text = "";
      } else {
        //maintain the data inside widegts
      }

      this.view.lblPaymentType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount");
      this.view.lstbRequestType.placeholder = kony.i18n.getLocalizedString("i18n.NUO.Select");

      //Cache the TaxTypes and ACHAccountTypes for the next step
      this.fetchTaxTypes();
      this.fetchACHAccountTypes();
    },


    /**
         * setFetchtedTemplateTypes : to set the fetched Template Types to the UI LIstBOx
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} tempTypeOptions - template options form service
         * @return {}
         * @throws {}
         */
    setFetchtedTemplateTypes: function(tempTypeOptions) {
      var templateTypes = [];

      if (tempTypeOptions.length == 1) {
        templateTypes.push([tempTypeOptions[0].Id, tempTypeOptions[0].Name]);
        this.view.lstbTemplateType.masterData = templateTypes;
        this.view.lstbTemplateType.selectedKey = tempTypeOptions[0].Id;
        this.getRequestTypesOnSelection(tempTypeOptions[0].Name, tempTypeOptions[0].Id, this.createUIType);
        this.view.lstbTemplateType.skin = "sknListBoxDisableBgf6f6f6Lato15Px";
        this.view.lstbTemplateType.enable = false;
      } else {
        templateTypes = this.objectToListBoxArrayFromService(tempTypeOptions);
        if (this.paymentAccounts.length === 0)
          templateTypes.splice(2, 1);
        if (this.collectionAccounts.length === 0)
          templateTypes.splice(1, 1);
        this.view.lstbTemplateType.masterData = templateTypes;
        this.view.lstbTemplateType.selectedKey = "-1";
        this.view.lstbTemplateType.skin = "bbSknListBox455574SSP15Px";
        this.view.lstbTemplateType.enable = true;
      }

      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    /**
         * setFetchedRequestTypes : set the fetched Request types to the listBox
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} RequestTypes - JSON object with request type and ID
         * @return {}
         * @throws {}
         */
    setFetchedRequestTypes: function(RequestTypes) {
      this.view.lstbRequestType.masterData = this.objectToListBoxArrayFromService(RequestTypes);
      this.view.lstbRequestType.selectedKey = "-1";
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    setPlaceHolderForListBoxes: function() {
      if (orientationHandler.isDesktop && navigator.appVersion.indexOf("Mac") > -1) {
        this.view.lstbRequestType.masterData = [
          ["Select", " Select", "i18n.ACH.Select"]
        ];
        this.view.lstbRequestType.selectedKey = "Select";
        this.view.lstbAccount.masterData = [
          ["Select", " Select", "i18n.ACH.Select"]
        ];
        this.view.lstbAccount.selectedKey = "Select";
        this.view.lstbTemplateType.masterData = [
          ["Select", " Select", "i18n.ACH.Select"]
        ];
        this.view.lstbTemplateType.selectedKey = "Select";
      } else {
        this.view.lstbRequestType.masterData = [
          ["Select", "Select", "i18n.NUO.Select"]
        ];
        this.view.lstbRequestType.selectedKey = "Select";
        this.view.lstbAccount.masterData = [
          ["Select", "Select", "i18n.NUO.Select"]
        ];
        this.view.lstbAccount.selectedKey = "Select";
        this.view.lstbTemplateType.masterData = [
          ["Select", "Select", "i18n.NUO.Select"]
        ];
        this.view.lstbTemplateType.selectedKey = "Select";
      }
    },
    /**
         *method to be invoked when clicked on edit in ach template creation.
         */
    editACHTemplateDetails: function(data, isEdit) {
      this.setPlaceHolderForListBoxes();
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.flxFrom.setVisibility(false);
      this.view.flxPaymentType.isVisible = true;
      this.view.flxTemplate.isVisible = true;
      this.view.dbRightContainerNew.lblActionHeader.isVisible = false;
      this.view.dbRightContainerNew.flxActionHeaderSeperator.isVisible = false;
      var flag = !kony.sdk.isNullOrUndefined(isEdit) ? isEdit : true;
      if (flag) {
        this.fetchTermsAndConditionsForACH();
      }
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"),
      //                                                   kony.i18n.getLocalizedString("i18n.konybb.ACH.MakePaymentWithTemplate"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH") + " " +
        kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.billPay.Edit") + " " +
        kony.i18n.getLocalizedString("i18n.konybb.Common.Template");
      this.createUIForCreateTemplateOrCreateTransaction(kony.i18n.getLocalizedString("i18n.konybb.Common.Template"), flag, data);
      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForCreateTemplate();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.yourTemplateDetails");
      var params = {
        "Template Name": data.TemplateName,
        "Template Description": data.TemplateDescription,
        "Request Type": data.TemplateRequestTypeValue,
        "Transaction Type": data.TransactionTypeValue,
      };

      if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Collection"))
        this.view.lstbAccount.masterData = this.objectToListBoxArrayFromService(this.collectionAccounts);
      else if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Payment"))
        this.view.lstbAccount.masterData = this.objectToListBoxArrayFromService(this.paymentAccounts);

      this.view.flxCreateDetails.isVisible = false;
      this.view.NonEditableDetails.isVisible = true;
      this.view.NonEditableDetails.setData(params, true);
      this.view.tbxTemplateName.text = data.TemplateName;
      this.view.tbxTemplateDescription.text = data.TemplateDescription;
      //this.view.lstbTemplateType.selectedKey = data.TransactionType_id;
      //this.view.lstbRequestType.selectedKey = data.TemplateRequestType_id;
      this.view.flxLoadingContainerFrom.setVisibility(false);
      this.view.lstbAccount.selectedKey = data.DebitAccount;
      this.view.tbxMaxAmt.text = data.MaxAmount;
      this.view.ApprovalFormActions.enableNextButton();
      this.view.createFlowFormActionsNew.btnCancel.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.tbxMaxAmt.onKeyUp = this.validateFormFields.bind(this, kony.i18n.getLocalizedString("i18n.konybb.Common.Template"));
      this.view.flxHeaderMain.setFocus(true);
      this.view.forceLayout();
      this.adjustScreen(0);
    },
    /**
         * createACHTemplate : onClick to create ACH Template - Setup UI, Setup Actions
         * @member of {frmApprovalViewDetailsController}
         * @param {boolean} isNotBack - to identify if it is on Back flow, if no then clear the previous Data
         * @return {}
         * @throws {}
         */
    createACHTemplate: function(isNotBack) {
      if (isNotBack)
        this.setPlaceHolderForListBoxes();
      this.view.customheader.customhamburger.activateMenu("ACH", "Create a Template");
      this.view.NonEditableDetails.isVisible = false;
      this.view.flxCreateDetails.isVisible = true;
      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.flxTemplate.isVisible = true;
      this.view.dbRightContainerNew.lblActionHeader.isVisible = false;
      this.view.dbRightContainerNew.flxActionHeaderSeperator.isVisible = false;

      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"),
      //                                                    kony.i18n.getLocalizedString("i18n.konybb.ACH.MakePaymentWithTemplate"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.createACHTemplate");

      this.createUIForCreateTemplateOrCreateTransaction(kony.i18n.getLocalizedString("i18n.konybb.Common.Template"), isNotBack);

      this.createTemplateAccountCheck();

      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForCreateTemplate();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.yourTemplateDetails");

      if (isNotBack) {
        this.view.NonEditableDetails.setVisibility(false);
        this.view.flxCreateDetails.setVisibility(true);
        this.clearUIContent();
        this.view.createFlowFormActionsNew.disableNextButton();
      } else {
        //data is stored inside widgets
        this.view.ApprovalFormActions.enableNextButton();
        this.view.NonEditableDetails.setVisibility(false);
        this.view.flxCreateDetails.setVisibility(true);
      }
      this.fetchTermsAndConditionsForACH();
      this.view.createFlowFormActionsNew.btnCancel.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.tbxMaxAmt.onKeyUp = this.validateFormFields.bind(this, kony.i18n.getLocalizedString("i18n.konybb.Common.Template"));
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    createTransactionWithoutTemplate: function(isNotBack) {
      this.view.customheader.customhamburger.activateMenu("ACH", "Make One Time Payment");
      this.createUIType = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction");
      var scopeObj = this;
      scopeObj.collectionAccounts = [];
      scopeObj.paymentAccounts = [];
      applicationManager.getConfigurationManager().userAccounts.forEach(function(obj) {
        var account = {
          "Id": obj.accountID,
          "Name": CommonUtilities.getMaskedAccount(obj.accountName, obj.accountID)
        };
        if (obj.accountType === "Savings" || obj.accountType === "Checking") {
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_COLLECTION_CREATE"))
            scopeObj.collectionAccounts.push(account);
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_PAYMENT_CREATE"))
            scopeObj.paymentAccounts.push(account);
        }
      });
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.NonEditableDetails.setVisibility(false);
      this.view.flxCreateDetails.setVisibility(true);
      //this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.MakeOneTimePayment"));
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHTransfer");
      this.createUIForCreateTemplateOrCreateTransaction(kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction"), isNotBack);
      this.view.flxTemplate.isVisible = false;
      this.fetchTermsAndConditionsForACH();
      if (applicationManager.getConfigurationManager().isRequestACHEnabled()) {
        this.setupRightContainerForCreateTransaction();
        this.view.dbRightContainerNew.flxActions.setVisibility(true);
      } else {
        this.view.dbRightContainerNew.flxActions.setVisibility(false);
      }
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
      if (isNotBack) {
        this.clearUIContent();
        this.fetchTermsAndConditionsForACH();
        this.view.createFlowFormActionsNew.disableNextButton();
      } else {
        //data is stored inside widegts
        this.view.ApprovalFormActions.enableNextButton();
      }
      this.view.tbxMaxAmt.onKeyUp = this.validateFormFields.bind(this, kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction"));
      this.view.createFlowFormActionsNew.btnCancel.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.lblType.text = kony.i18n.getLocalizedString("i18n.konybb.transfers.TransferType");
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    /**
         * transactionWithTemplate : Onclick of makePayment/Collectpayment action in Templates Tab, execute the function by changing the UI and Viewing details
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventobject - object JSOn of the button which triggered the event
         * @param {JSON Object} context - give the data of the clicked button in the segment
         * @return {}
         * @throws {}
         */
    transactionWithTemplate: function(eventobject, context) {
      if (eventobject.btnActions.text === "" || kony.sdk.isNullOrUndefined(eventobject.btnActions.text))
        return;
      this.displayErrorWhileExecutingTemplate("", false);
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
      this.makeTransactionWithTemplate(selectedRowData);
    },
    /* create TemplateParams from selectedRowData inlcluding Template_id and also fetch and Effective date from UI */
    makeTransactionWithTemplate: function(selectedRowData) {
      var templateParams = selectedRowData;
      this.executeTemplateData = selectedRowData;
      this.createUIType = kony.i18n.getLocalizedString("i18n.konybb.Common.Template");
      this.showTransactionDetails();
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.FillTheDetails");
      this.view.flxAcknowledgementNew.flxImgdownload.setVisibility(false);
      this.view.flxAcknowledgementNew.flxImgPrint.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      var templateData = {
        "Template Name": selectedRowData.TemplateName.toolTip,
        "Template Description": selectedRowData.TemplateDescription,
        "Transaction Type": selectedRowData.TransactionTypeValue,
        "Request Type": selectedRowData.RequestType,
        "Debit Account": selectedRowData.AccountName,
        //"Created On"				: selectedRowData.CreatedOn,
        //"Created By"				: selectedRowData.userName,
        //"Status" 					: selectedRowData.StatusValue,
        "Maximum transfer Amount": kony.i18n.getLocalizedString("i18n.common.currencySymbol") + selectedRowData.MaxAmount
      };

      this.view.NonEditableDetailsNew.setData(templateData, true);
      this.view.flxDateContainer.isVisible = true;
      var context1 = {
        "widget": this.view.calEffectiveDate1,
        "anchor": "top"
      };
      this.view.calEffectiveDate1.setContext(context1);

      this.view.calEffectiveDate1.clear();
      this.view.calEffectiveDate1.validStartDate = CommonUtilities.getServerDateComponent();
      this.view.calEffectiveDate1.dateComponents = CommonUtilities.getServerDateComponent();
      this.view.lblNotTodayDate.isVisible = false;
      this.view.flxEffectDate1.skin = "skne3e3e3br3pxradius";
      this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NORMAL;
      this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
      FormControllerUtility.enableButton(this.view.ApprovalFormActions.btnCancel);
      this.view.ApprovalFormActions.btnCancel.isVisible = true;

      this.view.calEffectiveDate1.onSelection = function(eventobject) {
        if (this.validateEffectiveDate(eventobject)) {
          this.view.flxEffectDate1.skin = "skne3e3e3br3pxradius";
          this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NORMAL;
          this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
          FormControllerUtility.enableButton(this.view.ApprovalFormActions.btnCancel);
        } else {
          this.view.flxEffectDate1.skin = "bbSknFlxBdrff0000Radius3Px";
          this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
          this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
          FormControllerUtility.disableButton(this.view.ApprovalFormActions.btnCancel);
        }
      }.bind(this);

      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxPaymentInstruction.isVisible = false;
      this.view.flxSeperator4.isVisible = false;
      this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.common.next");
      this.view.ApprovalFormActions.btnCancel.onClick = this.fetchTemplateRecordsForPayment.bind(this, {
        "Template_id": selectedRowData.Template_id
      }, templateParams);

      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * fetchTemplateRecordsForPayment : service call to fetch the template Records to display in the UI
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} templateParams - basic Template details from the Dashboard to be saved or cached for further process
         * @param {JSON Object} inputparams - JSON Template Details to fetch the records
         * @return {}
         * @throws {}
         */
    fetchTemplateRecordsForPayment: function(inputparams, templateParams) {
      var scopeObj = this;
      templateParams["EffectiveDate"] = CommonUtilities.getDateFromCalendarInBackendSupportedFormat(this.view.calEffectiveDate1);
      templateParams["Template_id"] = inputparams.Template_id;
      var templateData = this.view.NonEditableDetailsNew.getData();
      templateData.EffectiveDate = CommonUtilities.getFrontendDateString(templateParams.EffectiveDate, "mm/dd/yyyy");
      this.view.NonEditableDetailsNew.setData(templateData, true);
      this.setSelectedTemplateDetails(templateParams);
      var navigationObject = {
        "requestData": inputparams,
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SET_TEMPLATE_DETAILS_PAYMENT,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SERVICE_ERROR,
            "responseData": null
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getACHTemplateRecords(navigationObject);
      var featureAction = null;
      if (templateParams.TransactionType_id === "1") {
        featureAction = "ACH_COLLECTION_CREATE";
      } else if (templateParams.TransactionType_id === "2") {
        featureAction = "ACH_PAYMENT_CREATE";
      }
      scopeObj.accountForTemplateExecution = templateParams.DebitAccountUnmasked;
      scopeObj.callGetCustomerActionLimits(featureAction, BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_IN_EXECUTE_TEMPLATE_FLOW,
                                           BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_FAILURE_IN_EXECUTE_TEMPLATE_FLOW);
    },


    /**
         * setfetchedTemplateRecordsForPayment : Populate the UI for the fetched Template Records and set the actions for the UI. If no Records go back to Templates Dashboard
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} templateParams - basic Template details from the Dashboard
         * @param {JSON Array} response - Array of JSON Templates fetched from the service
         * @return {}
         * @throws {}
         */
    setfetchedTemplateRecordsForPayment: function(response) {
      var scopeObj = this;
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (response.length > 0) {
        var requestType = response[0].TemplateRequestTypeValue;

        response.forEach(function(obj) {
          var amountValue = (typeof obj.Amount === 'string') ? obj.Amount : obj.Amount.text;
          obj.Amount = {
            "text": CommonUtilities.getFloatValueOfCurrency(amountValue).toString()
          };
          if (/CCD|CTX|Web/.test(requestType)) {
            if (kony.sdk.isNullOrUndefined(obj.AdditionalInfo)) {
              obj.AdditionalInfo = "NA";
            }
            obj.AdditionalInfo = {
              "isVisible": true,
              "text": obj.AdditionalInfo
            };
          }
        });
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.Proceed");
        if (/Tax/.test(requestType)) {
          scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = null;
        } else if (breakpoint === 640 || orientationHandler.isMobile) {
          scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
        } else {
          scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeader";
        }
        this.populatePaymentTemplateRecords(requestType, this.getTRPaymentRowDataMap(requestType), [response]);
        this.view.flxApprovalrequestHistorySection.isVisible = false;
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
        this.adjustScreen(0);
      } else {
        kony.print("No records found for the particular Template");
        this.updateFormUI({
          "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
        });
      }
    },


    /**
         * setSelectedTemplateDetails : Populate the UI for the Selected Template Details
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} templateParams - basic Template details from the Dashboard
         * @return {}
         * @throws {}
         */
    setSelectedTemplateDetails: function(templateParams) {
      this.view.ApprovalFormActions.btnCancel.onClick = this.checkTotalAmountAgainstMaxAmount.bind(this, templateParams);
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
    },


    /**
         * saveAsTemplate : to save the transaction as a template
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    saveAsTemplate: function() {
      var scopeObj = this;
      var inputparams = {
        Transaction_id: this.view.tbxTemplateName.text,
        TemplateName: kony.i18n.getLocalizedString("i18n.konybb.common.testTemplate"),
        TemplateDescription: kony.i18n.getLocalizedString("i18n.konybb.common.templateDesc")
      };

      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SAVE_TEMPLATE_SUCCESS,
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
      scopeObj.ApprovalsReqUIModule.presentationController.saveTransaction(navObj);
    },

    showTransactionDetails: function() {
      this.view.scrollToBeginning();
      this.view.flxContentDashBoard.isVisible = false;
      this.view.flxTerms.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxACHFilesUpload.isVisible = false;
      this.view.flxTransactionDetails.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxCommonActionsCont.isVisible = true;
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxPaymentInstruction.isVisible = false;
      this.view.imgRadiobtn1.onTouchEnd = function() {
        this.view.imgRadiobtn2.src = "radioinactivebb.png";
        this.view.imgRadiobtn1.src = "radioactivebb.png";
      }.bind(this);
      this.view.imgRadiobtn2.onTouchEnd = function() {
        this.view.imgRadiobtn2.src = "radioactivebb.png";
        this.view.imgRadiobtn1.src = "radioinactivebb.png";
      }.bind(this);
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = true;
      this.view.flxDateContainer.isVisible = false;
      this.view.flxDisplayErrorMessage.isVisible = false;
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
    populateACKTemplateRecords: function(requestType, rowDataMap, rows) {

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
         * populatePaymentTemplateRecords : Populate the Segment for Template Records based on Request Type
         * @member of {frmApprovalViewDetailsController}
         * @param {String} requestType - Name or Type of Template
         * @param {JSON Object} rowDataMap - RowDataMap to Map the data with the segment
         * @param {JSON Array} rows - Array of JSON Template REcords fetched from the service
         * @return {}
         * @throws {}
         */
    populatePaymentTemplateRecords: function(requestType, rowDataMap, rows) {

      FormControllerUtility.showProgressBar(this.view);
      this.rowsDataForSending = rows;
      var sectionData = this.getTRSectionData(requestType);
      var defaultValues = this.getTrPaymentDefaultValues(requestType);

      if (kony.sdk.isNullOrUndefined(rows))
        rows = [this.view.TabPaneNew.TabBodyNew.getData()[0][1]];

      this.view.TemplateRecordsNew.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxDateContainer.isVisible = false;
      this.view.TemplateRecordsNew.TabBodyNew.setSectionData([sectionData]);
      this.view.TemplateRecordsNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TemplateRecordsNew.TabBodyNew.setDefaultValues([defaultValues]);
      this.view.TemplateRecordsNew.TabBodyNew.addDataForSections(rows);
      if (/Tax/.test(requestType)) {
        this.view.TemplateRecordsNew.setRemoveButtonName("btnRemoveSubCategory");
      } else {
        this.view.TemplateRecordsNew.setRemoveButtonName("btnRemoveRecord");
      }
      this.setTemplateRecordsForExecute(rows[0]);
      this.view.TemplateRecordsNew.TabBodyNew.setProceedWidget(this.view.ApprovalFormActions.btnNext);
      this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
        id: "Amount"
      });

      this.view.TemplateRecordsNew.flxTotalAmountCreate.isVisible = false;
      this.view.TemplateRecordsNew.flxTotalAmount.isVisible = true;

      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    //************************************************************* DEFAULT UI DATA FOR TRANSACTIONS AND TEMPLATES ****************************************************//


    /**
         * getTRACKRowDataMap : set the rowDataMap based on the template/Transaction type
         * @member of {frmApprovalViewDetailsController}
         * @param {string} requestType - value of the template/transaction type
         * @return {JSON Object} rowDataMap - rowDataMap for the Segment to show the Records in the Transaction/Template
         * @throws {}
         */
    getTRACKRowDataMap: function(requestType) {
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
         * getTRPaymentRowDataMap : generate a RowDataMap to Map the fetched Backend Data based on the request type
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} requestType - Name or the Type of Transaction or Template whose Records are to be Mapped
         * @return {JSON Object} rowDataMap - rowDataMap for the Segment to show the Records in the Transaction/Template for Payment
         * @throws {}
         */
    getTRPaymentRowDataMap: function(requestType) {
      var rowDataMap = {
        lblName: "Record_Name",
        lblAccountNumber: "ToAccountNumber",
        lblAccountType: "ToAccountTypeValue",
        lblABAOrTRCNumber: "ABATRCNumber",
        lblDetailsID: "Detail_id",
        tbxAmount: "Amount",
        lblAccTypeVal: "ToAccountType_id",
        btnRemoveRecord: "btnRemoveRecord"
      };

      if (/CCD|CTX|Web/.test(requestType)) {
        rowDataMap["lblAdditionalInfoVal"] = "AdditionalInfo";
      } else if (/Tax/.test(requestType)) {
        rowDataMap = {
          lblEmpIdtNumVal: "EIN",
          lblAccountNumVal: "ToAccountNumber",
          lblAccTypeVal: "ToAccountTypeValue",
          lblAccountType: "ToAccountType_id",
          lblTrcNumVal: "ABATRCNumber",
          lblAckEffDateVal: "EffectiveDate",
          lblTaxTypeVal: "TaxType",
          lblTaxSubCategoryVal: "taxSubType",
          lblZeroTaxDueVal: "IsZeroTaxDue",
          tbxTaxSubAmount: "Amount",
          lblBxSubCategoryType: "TaxSubCategory_id",
          lblBXTaxType: "TaxType_id"
        };
      }
      return rowDataMap;
    },

    getTRSectionData: function(requestType) {
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

    getAckTRSectionData: function(requestType) {
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

    getTRViewDefaultValues: function(requestType) {
      var defaultValues = {
        flxPaymentTemplate: {
          "isVisible": true
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
        flxTaxTemplate: {
          "isVisible": false
        },
        flxAckTaxTemplate: {
          "isVisible": false
        },
        lblCurrencySymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        }
      };

      if (/CCD|CTX|Web/.test(requestType)) {
        defaultValues["flxAdditionalInfoTemplate"] = {
          "isVisible": true
        };
        defaultValues["lblAdditionalInfoVal"] = {
          "isVisible": false
        };
        defaultValues["lblAdditionalInfo"] = {
          "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
        };
        defaultValues["imgInfo"] = {
          "src": "info_grey.png"
        };
      } else if (/Tax/.test(requestType)) {
        defaultValues = {
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
            "isVisible": false
          },
          flxTaxTemplate: {
            "isVisible": true
          },
          lblEmpIdtNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.EIN")
          },
          lblAccountNum: {
            "text": kony.i18n.getLocalizedString("i18n.common.accountNumber")
          },
          lblAccType: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.accountType")
          },
          lblTrcNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC")
          },
          lblEffectiveDate: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate")
          },
          lblZeroTaxDue: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.zeroTaxDue")
          },
          lblTaxType: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.selectTaxType")
          },
          lblTaxSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.taxSubCategory")
          },
          lblTaxAmount: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.amountlabel")
          },
          lblAccountType: "Savings",
          lblCurrSymbolTax: {
            "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
          },
          btnRemoveSubCategory: {
            "isVisible": false
          },
          lstBxAccountType: {
            "isVisible": false
          },
          lblBXTaxType: " ",
          lstBxTaxType: {
            "isVisible": false
          },
          lblBxSubCategoryType: "94103",
          lstBxSubCategoryType: {
            "isVisible": false
          },
          btnAddSubCategory: {
            "isVisible": false
          },
        };
      }

      return defaultValues;

    },

    fetchTaxSubTypes: function(taxTypeId, eventobject, context) {
      var navObj = {
        requestData: {
          "TaxType": taxTypeId
        },
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SET_SUBTAX_TYPES,
            responseData: {
              eventobject: eventobject,
              context: context,
              data: null
            }
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.FETCH_TAX_SUBTYPE_FAILURE,
            responseData: {}
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getTaxSubTypes(navObj);
    },

    getTRCreateDefaultValues: function(requestType) {
      var defaultValues = {
        flxPaymentTemplate: {
          "isVisible": false
        },
        flxAckTemplateDetails: {
          "isVisible": false
        },
        flxCreatePaymentTemplate: {
          "isVisible": true
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
        lblAccountType: "Savings",
        lstbxCrAccountType: {
          "skin": "sknLbxSSP42424215PxBorder727272",
          "masterData": this.ACHAccountTypes,
          "selectedKey": "-1",
          "onSelection": function(eventobject, context) {
            this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
            this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lblAccountType",
                                                                eventobject.selectedKeyValue[1],
                                                                context.rowIndex, context.sectionIndex);
            /* alternative for "getElementById" yet to be found
                        var listboxElement = document.getElementById('frmApprovalViewDetails_TemplateRecordsNew_TabBodyNew_segTemplates').getElementsByTagName('ul')[0].getElementsByTagName('li')[context.rowIndex + 1].getElementsByTagName('select')[0];
                        if(!kony.sdk.isNullOrUndefined(listboxElement)){
                          listboxElement.focus();
                        }*/
            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        },
        btnRemove: {
          "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
          "isVisible": false,
          "left": (kony.application.getCurrentBreakpoint() === 1024) ? "92%" : "94.5%",
          "onClick": function(eventobject, context) {
            this.view.TemplateRecordsNew.removeRowAndUpdateTotal(context.rowIndex, context.sectionIndex, ["tbxCrAmount", "tbxAmount"]);
            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        },
        lblCurrSymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
      };

      if (/CCD|CTX|Web/.test(requestType)) {
        defaultValues["flxAdditionalInfoTemplate"] = {
          "isVisible": true
        };
        defaultValues["lblAdditionalInfoVal"] = {
          "isVisible": false
        };
        defaultValues["lblAdditionalInfo"] = {
          "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
        };
        defaultValues["imgInfo"] = {
          "src": "info_grey.png"
        };
      } else if (/Tax/.test(requestType)) {
        defaultValues = {
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
            "isVisible": false
          },
          flxTaxTemplate: {
            "isVisible": true
          },
          lblEmpIdtNumVal: {
            "isVisible": false
          },
          lblAccountNumVal: {
            "isVisible": false
          },
          lblEffectiveDateVal: {
            "isVisible": false
          },
          lblTaxTypeVal: {
            "isVisible": false
          },
          lblZeroTaxDueVal: {
            "isVisible": false
          },
          lblEmpIdtNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.EIN")
          },
          lblAccountNum: {
            "text": kony.i18n.getLocalizedString("i18n.common.accountNumber")
          },
          lblAccType: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.accountType")
          },
          lblTrcNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC")
          },
          lblZeroTaxDue: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.zeroTaxDue")
          },
          lblTaxType: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.selectTaxType")
          },
          lblTaxSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.taxSubCategory")
          },
          lblTaxAmount: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.amountlabel")
          },
          lblAccountType: "Savings",
          lblCurrSymbolTax: {
            "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
          },
          btnRemoveSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
            "isVisible": false,
            "onClick": function(eventobject, context) {
              this.view.TemplateRecordsNew.removeRowAndUpdateTotal(context.rowIndex, context.sectionIndex, ["tbxCrAmount", "tbxAmount"]);
              this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
                id: "Amount"
              });
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
          lstBxAccountType: {
            "masterData": this.ACHAccountTypes,
            "selectedKey": "-1",
            "onSelection": function(eventobject, context) {
              this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
              this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lblAccountType",
                                                                  eventobject.selectedKeyValue[1],
                                                                  context.rowIndex, context.sectionIndex);
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
          lblBXTaxType: " ",
          lstBxTaxType: {
            "masterData": this.TaxTypes,
            "selectedKey": "-1",
            "onSelection": function(eventobject, context) {
              this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
              var TaxType = eventobject.selectedKeyValue[0];
              this.fetchTaxSubTypes(TaxType, eventobject, context);
            }.bind(this)
          },
          lblBxSubCategoryType: "94103",
          lstBxSubCategoryType: {
            "masterData": [
              ["key1", "Select"]
            ],
            "selectedKey": "key1",
            "onSelection": function(eventobject, context) {
              this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
              this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lblBxSubCategoryType",
                                                                  eventobject.selectedKeyValue[1],
                                                                  context.rowIndex, context.sectionIndex);
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
          btnAddSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.addTaxSubCategory"),
            "isVisible": false,
            "onClick": function(eventobject, context) {
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
          flxChkZeroTax: {
            "isVisible": true,
            "onClick": function(eventobject, context) {
              var isChecked = eventobject.imgChkZeroTax.src === "checkedboxbb.png";
              var updatedImgSrc = isChecked ? "unchecked_box.png" : "checkedboxbb.png";
              this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("imgChkZeroTax", {
                "src": updatedImgSrc
              }, context.rowIndex, context.sectionIndex);
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
        };
      }

      return defaultValues;
    },

    setTaxTypes: function(responseData) {
      this.TaxTypes = this.objectToListBoxArrayFromService(responseData);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    setTaxSubTypes: function(responseObj) {
      var eventobject = responseObj.eventobject;
      var context = responseObj.context;
      var response = responseObj.data;
      var masterData = this.objectToListBoxArrayFromService(response);
      var subTypeData = {
        "masterData": masterData,
        "selectedKey": "-1",
        "onSelection": function(eventobject, context) {
          this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
          this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lblBxSubCategoryType", eventobject.selectedKeyValue[1], context.rowIndex, context.sectionIndex);
          this.view.forceLayout();
          this.adjustScreen(0);
        }.bind(this)
      };
      if (kony.sdk.isNullOrUndefined(context.isEdit)) {
        this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lblBXTaxType", eventobject.selectedKeyValue[1], context.rowIndex, context.sectionIndex);
        this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lstBxSubCategoryType", subTypeData, context.rowIndex, context.sectionIndex);
      } else {
        var subTaxType = this.view.TemplateRecordsNew.TabBodyNew.segTemplates.data[0][1][context.rowIndex].lstBxSubCategoryType;
        var subTaxTypeSelectedKey = CommonUtilities.getListBoxSelectedKeyFromMasterData(context.TaxSubCategory_id, masterData);
        subTaxType.selectedKey = subTaxTypeSelectedKey;
        subTaxType.masterData = masterData;
        this.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lstBxSubCategoryType", subTaxType, context.rowIndex, 0);
        this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
        CommonUtilities.disableButton(this.view.TemplateRecordsNew.TabBodyNew.getProceedWidget());
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    getTrACKDefaultValues: function(requestType) {
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

    getTrPaymentDefaultValues: function(requestType) {
      var ackDefaultValues = {
        flxPaymentTemplate: {
          "isVisible": true
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
        },
        lblCurrencySymbol: {
          "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
        },
        btnRemoveRecord: {
          "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
          "isVisible": false,
          "left": (kony.application.getCurrentBreakpoint() === 1024) ? "92%" : "94.5%",
          "onClick": function(eventobject, context) {
            this.view.TemplateRecordsNew.removeRowAndUpdateTotal(context.rowIndex, context.sectionIndex, ["tbxAmount", "lblTotalAmount"]);
            this.view.forceLayout();
            this.adjustScreen(0);
          }.bind(this)
        },
      };
      if (/CCD|CTX|Web/.test(requestType)) {
        ackDefaultValues["flxAdditionalInfoTemplate"] = {
          "isVisible": true
        };
        ackDefaultValues["flxAddinfoTitle"] = {
          "isVisible": true
        };
        ackDefaultValues["lblAdditionalInfo"] = {
          "text": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation")
        };
        ackDefaultValues["tbxAdditionalInfo"] = {
          "isVisible": false
        };
        ackDefaultValues["flxContainer2"] = {
          "isVisible": false
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
            "isVisible": false
          },
          flxTaxTemplate: {
            "isVisible": true
          },
          flxContainer2: {
            "isVisible": false
          },
          tbxEmpIDNum: {
            "isVisible": false
          },
          lstBxAccountType: {
            "isVisible": false
          },
          tbxTrcNum: {
            "isVisible": false
          },
          tbxAccNum: {
            "isVisible": false
          },
          lstBxTaxType: {
            "isVisible": false
          },
          lstBxSubCategoryType: {
            "isVisible": false
          },
          lblEmpIdtNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.tax.EIN") + " :"
          },
          lblAccountNum: {
            "text": kony.i18n.getLocalizedString("i18n.common.accountNumber") + " :"
          },
          lblAccType: {
            "text": kony.i18n.getLocalizedString("i18n.transfers.accountType") + " :"
          },
          lblTrcNum: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.ABA/TRC") + " :"
          },
          lblAckEffDate: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate") + " :"
          },
          lblTaxType: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.taxType") + " :"
          },
          lblTaxSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.subCategoryType") + " :"
          },
          lblTaxAmount: {
            "text": kony.i18n.getLocalizedString("i18n.StopCheckPayments.Amount")
          },
          lblAckSubCateAmt: {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.subCategoryAmount") + " :"
          },
          lblAckTaxCurrSymbol: {
            "text": kony.i18n.getLocalizedString("i18n.common.currencySymbol")
          },
          btnRemoveSubCategory: {
            "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
            "isVisible": false,
            "onClick": function(eventobject, context) {
              this.view.TemplateRecordsNew.removeRowAndUpdateTotal(context.rowIndex, context.sectionIndex, ["tbxCrAmount", "tbxAmount"]);
              this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
                id: "Amount"
              });
              this.view.forceLayout();
              this.adjustScreen(0);
            }.bind(this)
          },
        };
      }
      return ackDefaultValues;
    },


    approveTemplate: function(eventobject, context) {
      this.onClickTemplateViewDetails(eventobject, context);
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.konybb.template.ACH") +
        kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
        kony.i18n.getLocalizedString("i18n.konybb.Common.Approved").toLowerCase() +
        " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + selectedRowData.Template_id;

      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_APPROVALS_TAB
      });

      this.view.forceLayout();
      this.adjustScreen(0);
    },

    /**
         * setValidationEventsForWidgets : this method is used to set all events for form validation purpose
         * @member of {frmApprovalViewDetailsController}
         * @param {string} UIType - to identify the type as Template or Transaction
         * @return {}
         * @throws {}
         */
    setValidationEventsForWidgets: function(UIType) {

      this.view.tbxTemplateName.onTextChange = function(templateName) {
        if (this.validateTemplateName(templateName.text)) {
          this.view.flxTemplate.flxTemplateNAme.skin = "skne3e3e3br3pxradius";
        } else {
          this.view.flxTemplate.flxTemplateNAme.skin = "bbSknFlxBdrff0000Radius3Px";
        }
      }.bind(this);

      this.view.tbxTemplateDescription.onTextChange = function(templateDesc) {
        if (this.validateTemplateDescription(templateDesc.text)) {
          this.view.flxTemplate.flxTemplateDescription.skin = "skne3e3e3br3pxradius";
        } else {
          this.view.flxTemplate.flxTemplateDescription.skin = "bbSknFlxBdrff0000Radius3Px";
        }
      }.bind(this);

      this.view.tbxMaxAmt.onTextChange = function(maxAmt) {
        maxAmt.text = maxAmt.text.replace(".00", "");
        var maxTransactionLimitPostiveCheck = (kony.sdk.isNullOrUndefined(this.selectedAccountMaxTransactionLimit) || Number(maxAmt.text) <= Number(this.selectedAccountMaxTransactionLimit));
        var maxTransactionLimitNegativeCheck = (!kony.sdk.isNullOrUndefined(this.selectedAccountMaxTransactionLimit) && Number(maxAmt.text) > Number(this.selectedAccountMaxTransactionLimit));
        if (this.validateAmount(maxAmt.text) && maxTransactionLimitPostiveCheck) {
          if (maxAmt.text.trim().slice(-2) == ".0")
            maxAmt.text = maxAmt.text.replace(".0", "");
          else {
            this.view.flxMaxAmt.skin = "skne3e3e3br3pxradius";
            maxAmt.text = CommonUtilities.formatCurrencyWithCommas(maxAmt.text, true);
          }
          if (maxTransactionLimitPostiveCheck) {
            this.toggleErrorMessage("", false, 0);
          }
        } else {
          this.view.flxMaxAmt.skin = "bbSknFlxBdrff0000Radius3Px";
          if (maxTransactionLimitNegativeCheck) {
            this.toggleErrorMessage(kony.i18n.getLocalizedString("i18n.ach.amountExceedsMaxTransactionLimitError"), true, 66);
          }
        }
        this.validateFormFields(UIType);
      }.bind(this);

      this.view.lstbRequestType.onSelection = function() {
        if (this.validateTypes(this.view.lstbRequestType)) {
          this.view.flxRequestType.skin = "skne3e3e3br3pxradius";
        } else {
          this.view.flxRequestType.skin = "bbSknFlxBdrff0000Radius3Px";
        }
        this.validateFormFields(UIType);
      }.bind(this);

      this.view.lstbAccount.onSelection = function() {
        if (this.validateTypes(this.view.lstbAccount)) {
          if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
            this.selectedAccountMaxTransactionLimit = this.getMaxTransactionLimitForSelectedAccount(this.view.lstbAccount.selectedKey);
          } else {
            this.selectedAccountMaxTransactionLimit = null;
          }

          this.view.flxPaymentType.skin = "skne3e3e3br3pxradius";
        } else {
          this.view.flxPaymentType.skin = "bbSknFlxBdrff0000Radius3Px";
        }
        this.validateFormFields(UIType);
      }.bind(this);

      this.view.calEffectiveDate.validStartDate = CommonUtilities.getServerDateComponent();
      this.view.calEffectiveDate.onSelection = function(eventobject) {
        if (this.validateEffectiveDate(eventobject)) {
          this.view.flxEffectiveDate.skin = "skne3e3e3br3pxradius";
        } else {
          this.view.flxEffectiveDate.skin = "bbSknFlxBdrff0000Radius3Px";
        }
        this.validateFormFields(kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction"));
      }.bind(this);

      this.view.lstbTemplateType.onSelection = function() {
        var selectedTemplateType = this.view.lstbTemplateType.selectedKeyValue[1];
        if (this.view.lstbTemplateType.selectedKeyValue[0] === "-1") {
          this.validateFormFields();
          this.view.lblPaymentType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Debit/CreditAccount");
          this.view.flxType.skin = "skne3e3e3br3pxradius";
          this.view.lstbRequestType.masterData = [];
        } else {
          var transactionTypeId = this.view.lstbTemplateType.selectedKeyValue[0];
          this.getRequestTypesOnSelection(selectedTemplateType, transactionTypeId, UIType);
        }

        this.view.lstbTemplateType.setFocus(true);
        this.view.forceLayout();
      }.bind(this);

      this.view.tbxMaxAmt.onBeginEditing = function(tbxAmount) {
        if (!kony.sdk.isNullOrUndefined(tbxAmount.text)) {
          tbxAmount.text = applicationManager.getFormatUtilManager().deFormatAmount(tbxAmount.text, ",");
        }
      }.bind(this);
    },

    /*
         * Method to get request types and set to request types list box
         */
    getRequestTypesOnSelection: function(selectedTemplateType, transactionTypeId, UIType) {
      var scopeObj = this;
      var inputParams = {
        "TransactionType_id": transactionTypeId
      };

      var navObj = {
        requestData: inputParams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SET_ACH_REQUEST_TYPES,
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
      scopeObj.ApprovalsReqUIModule.presentationController.getRequestTypes(navObj);

      if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
        var featureAction = null;
        if (transactionTypeId === "1") {
          featureAction = "ACH_COLLECTION_CREATE";
        } else if (transactionTypeId === "2") {
          featureAction = "ACH_PAYMENT_CREATE";
        }
        scopeObj.callGetCustomerActionLimits(featureAction, BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS,
                                             BBConstants.ON_FETCH_CUSTOMER_ACTION_LIMITS_FAILURE);
      } else if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
        if (transactionTypeId === "1") {
          //             if(applicationManager.getConfigurationManager().isCombinedUser === "true" || applicationManager.getConfigurationManager().isSMEUser === "true")
          //             {              
          this.view.flxPaymentType.setVisibility(false);
          this.view.flxFrom.setVisibility(true);
          this.initializeFromSegment(scopeObj.collectionAccounts);
          //             }
          //             else{
          //               this.view.lstbAccount.masterData = this.objectToListBoxArrayFromService(scopeObj.collectionAccounts);
          //             }
        } else if (transactionTypeId === "2") {
          //             if(applicationManager.getConfigurationManager().isCombinedUser === "true" || applicationManager.getConfigurationManager().isSMEUser === "true")
          //             {
          this.view.flxPaymentType.setVisibility(false);
          this.view.flxFrom.setVisibility(true);
          this.initializeFromSegment(scopeObj.paymentAccounts);
          //             }
          //             else{
          //               this.view.lstbAccount.masterData = this.objectToListBoxArrayFromService(scopeObj.paymentAccounts);
          //             }
        }
      }
      if (applicationManager.getConfigurationManager().isRetailUser === "true") {
        this.view.lstbAccount.selectedKey = "-1";
      }
      if (selectedTemplateType === kony.i18n.getLocalizedString("i18n.konybb.Common.Payment")) {
        this.view.lblPaymentType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.DebitAccount");
        this.view.flxType.skin = "skne3e3e3br3pxradius";
      } else if (selectedTemplateType === kony.i18n.getLocalizedString("i18n.konybb.Common.Collection")) {
        this.view.lblPaymentType.text = kony.i18n.getLocalizedString("i18n.konybb.Common.CreditAccount");
        this.view.flxType.skin = "skne3e3e3br3pxradius";
      }
      this.validateFormFields(UIType);
    },

    initializeFromSegment: function(accounts) {
      var scopeObj = this;
      scopeObj.view.flxCancelFilterFrom.setVisibility(true);
      scopeObj.view.imgCancelFilterFrom.src = "tooltip_arrow_blue.png";
      scopeObj.view.txtTransferFrom.setVisibility(true);
      scopeObj.view.txtTransferFrom.text = "";
      scopeObj.view.lblSelectAccount.text = "";
      scopeObj.view.lblFromAmount.text = "";
      scopeObj.view.flxTypeIcon.setVisibility(false);
      this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
      this.view.segTransferFrom.sectionHeaderTemplate = "flxTransfersFromListHeader";
      this.view.segTransferFrom.widgetDataMap = {
        "flxFromAccountsList": "flxFromAccountsList",
        "flxAccountListItem": "flxAccountListItem",
        "lblAccountName": "lblAccountName",
        "flxAmount": "flxAmount",
        "flxSeparator": "flxSeparator",
        "lblSeparator": "lblSeparator",
        "lblAmount": "lblAmount",
        "lblCurrencySymbol": "lblCurrencySymbol",
        "flxTransfersFromListHeader": "flxTransfersFromListHeader",
        "lblTransactionHeader": "lblTransactionHeader",
        "imgDropDown": "imgDropDown",
        "flxDropDown": "flxDropDown",
        "flxIcons": "flxIcons",
        "imgIcon": "imgIcon",
        "flxBankIcon": "flxBankIcon",
        "imgBankIcon": "imgBankIcon",
        "lblAccType": "lblAccType"
      };
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
      var responseAccounts = accountsModule.presentationController.accounts;
      var accountsInfo = [];
      accounts.forEach(function(account) {
        var accountType = "Personal Accounts";
        for (var i = 0; i < responseAccounts.length; i++) {
          if (responseAccounts[i].accountID === account.Id) {
            accountsInfo.push(responseAccounts[i]);
          }
        }
      });
      var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(accountsInfo) : this.getDataWithSections(accountsInfo);
      if (widgetFromData) {
        this.view.segTransferFrom.setData(widgetFromData);
        this.view.flxLoadingContainerFrom.setVisibility(false);
        this.view.flxNoResultsFrom.setVisibility(false);
      }
      this.view.txtTransferFrom.onTouchStart = function() {
        scopeObj.view.flxTypeIcon.setVisibility(false);
        scopeObj.view.lblSelectAccount.setVisibility(false);
        scopeObj.view.flxFromSegment.setVisibility(true);
        scopeObj.view.segTransferFrom.setVisibility(true);
        scopeObj.view.lblFromAmount.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.segTransferFrom.onRowClick = function() {
        var segData = scopeObj.view.segTransferFrom.selectedRowItems[0];
        scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
        //this.accountId = segData.accountID;
        // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
        scopeObj.view.txtTransferFrom.setVisibility(false);
        //scopeObj.view.flxCancelFilterFrom.setVisibility(false);
        scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
        scopeObj.view.lblSelectAccount.accountName = segData.accountName;
        scopeObj.view.lblSelectAccount.accountID = segData.accountID;
        scopeObj.view.lblSelectAccount.setVisibility(true);
        scopeObj.view.flxTypeIcon.setVisibility(true);
        scopeObj.view.lblTypeIcon.setVisibility(true);
        //applicationManager.getConfigurationManager().isCombinedUser==="true"?scopeObj.view.flxTypeIcon.setVisibility(true):scopeObj.view.flxTypeIcon.setVisibility(false);
        this.profileAccess === "both" ? scopeObj.view.flxTypeIcon.setVisibility(true) : scopeObj.view.flxTypeIcon.setVisibility(false);
        scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
        scopeObj.view.lblFromAmount.setVisibility(true);
        scopeObj.view.lblFromAmount.text = segData.lblAmount;
        scopeObj.view.flxFromSegment.setVisibility(false);
        // scopeObj.checkValidityBillPay();
      };
      this.view.flxCancelFilterFrom.onClick = function() {
        scopeObj.view.txtTransferFrom.text = "";
        scopeObj.view.lblSelectAccount.text = "";
        // scopeObj.view.flxCancelFilterFrom.setVisibility(false);
        scopeObj.view.flxFromSegment.setVisibility(!scopeObj.view.flxFromSegment.isVisible);
      };
      this.view.flxFrom.onClick = function() {
        if (scopeObj.view.txtTransferFrom.isVisible === false) {
          scopeObj.view.txtTransferFrom.setVisibility(true);
          scopeObj.view.txtTransferFrom.setFocus();
          scopeObj.view.lblSelectAccount.setVisibility(false);
          scopeObj.view.flxTypeIcon.setVisibility(false);
          scopeObj.view.lblFromAmount.setVisibility(false);
          scopeObj.view.flxCancelFilterFrom.setVisibility(true);
          scopeObj.view.flxFromSegment.setVisibility(true);
        }
      };
    },

    /**
         * creates segment with account numbers and other details with particular header values
         */
    getDataWithSections: function(accounts) {
      var scopeObj = this;
      var finalData = {};
      var prioritizeAccountTypes = ["Personal Accounts"];
      accounts.forEach(function(account) {
        var accountType = "Personal Accounts";
        if (account.isBusinessAccount === "false") {
          //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
          if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
            accountType = "Personal Accounts";
            accountTypeIcon = "s";
          }
          //                      }
          else {
            accountType = account.Membership_id;
            accountTypeIcon = "s";
          }
        } else {
          accountType = account.Membership_id;
          accountTypeIcon = "r";
        }

        if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
          if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
            finalData[accountType][1].pop();
          }
          finalData[accountType][1].push(scopeObj.createSegmentData(account));
        } else {
          if(accountType !== "Personal Accounts")
            prioritizeAccountTypes.push(accountType);
          finalData[accountType] = [{
            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
            lblSeparator: {
              "isVisible": "true"
            },
            imgDropDown: "P",
            flxDropDown: {
              "onClick": function(context) {
                scopeObj.showOrHideAccountRows(context);
              }.bind(this),
              "isVisible": false
            },
            template: "flxTransfersFromListHeader",
            membershipId: account.Membership_id
          },
                                    [scopeObj.createSegmentData(account)]
                                   ];
        }
      });
      var data = [];

      for (var key in prioritizeAccountTypes) {
        var accountType = prioritizeAccountTypes[key];
        if (finalData.hasOwnProperty(accountType)) {
          data.push(finalData[accountType]);
        }
      }
      return data;
    },

    /*create segment data with account type grouping
         */
    getDataWithAccountTypeSections: function(accounts) {
      var scopeObj = this;
      var finalData = {};
      var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      accounts.forEach(function(account) {
        var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
        if (finalData.hasOwnProperty(accountType)) {
          finalData[accountType][1].push(scopeObj.createSegmentData(account));
        } else {
          finalData[accountType] = [{

            lblTransactionHeader: {
              text: accountType,
              left: "10dp"
            },
            lblSeparator: {
              "isVisible": "true"
            },
            imgDropDown: "P",
            flxDropDown: {
              "onClick": function(context) {
                scopeObj.showOrHideAccountRows(context);
              }.bind(this),
              "isVisible": false
            },
            template: "flxTransfersFromListHeader",

          },
                                    [scopeObj.createSegmentData(account)]
                                   ];
        }
      });
      this.sectionData = [];
      var data = [];
      for (var key in prioritizeAccountTypes) {
        var accountType = prioritizeAccountTypes[key];
        if (finalData.hasOwnProperty(accountType)) {
          data.push(finalData[accountType]);
          this.sectionData.push(accountType);
        }
      }
      return data;
    },

    /**
         *  creates the row template with account number and other details
         */

    createSegmentData: function(account) {
      //var combineduser = applicationManager.getConfigurationManager().isCombinedUser;
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var accountId = account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId;
      var dataObject = {
        //"lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
        "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
        "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
        "accountID": accountId,
        "accountName": CommonUtilities.getMaskedAccName(accountId)[1],
        "currencyCode": account.currencyCode,
        "imgIcon": {
          "text": account.isBusinessAccount === "true" ? "r" : "s",
          //"isVisible" : combineduser==="true"?true:false,
          "isVisible": this.profileAccess === "both" ? true : false,
        },
        "lblSeparator": {
          "isVisible": "true",
          "bottom": "1dp"
        },
        "lblAccType": account.accountType,
        "flxIcons": {
          //"left": (combineduser==="true")?"0px":"15px"
          "left": this.profileAccess === "both" ? "15px" : "0px"
        },
        "flxBankIcon": {
          "isVisible": account.externalIndicator === "true" ? true : false,
        },
        "imgBankIcon": {
          "src": "bank_icon_hdfc.png"
        },
        "flxAccountListItem": {
          "isVisible": true,
          "height": "80dp"
        }

      };
      //} 
      return dataObject;
    },

    /**
         * It shows or hides the particular section 
         */
    showOrHideAccountRows: function(context) {
      var section = context.rowContext.sectionIndex;
      var segData = this.view.segTransferFrom.data;
      var isRowVisible = true;
      if (segData[section][0].imgDropDown.text === "O") {
        segData[section][0]["imgDropDown"] = {
          text: "P"
        };
        isRowVisible = true;
      } else {
        segData[section][0]["imgDropDown"] = {
          text: "O"
        };
        isRowVisible = false;
      }
      for (var i = 0; i < segData[section][1].length; i++) {
        var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
        flxAccountListItem["isVisible"] = isRowVisible;
        this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section);
      }
      segData = this.view.segTransferFromData;
      this.view.segTransferFrom.setSectionAt(segData[section], section);
    },

    updateKeyAt: function(widgetName, value, row, section) {
      var data = this.view.segTransferFrom.data;
      var rowDataTobeUpdated = data[section][1][row];
      rowDataTobeUpdated[widgetName] = value;
      this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
    },

    callGetCustomerActionLimits: function(featureAction, successScenario, failureScenario) {
      var scopeObj = this;
      var navigationObject = {
        requestData: featureAction,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: successScenario,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: failureScenario,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getCustomerActionLimits(navigationObject);
    },

    setTransactionAccountsAndTheirLimits: function(accounts) {
      this.view.txtTransferFrom.text = "";
      this.view.lblSelectAccount.text = "";
      this.view.lblFromAmount.text = "";
      this.view.flxTypeIcon.setVisibility(false);
      var configurationManager = applicationManager.getConfigurationManager();
      var finalAccounts = [];
      this.elligibleAccountsAndTheirLimits = [];
      var accountsPostLogin = configurationManager.userAccounts;

      for (var i = 0; i < accounts.length; i++) {
        for (var j = 0; j < accountsPostLogin.length; j++) {
          if ((accounts[i].accountId == accountsPostLogin[j].accountID) && (accountsPostLogin[j].accountType === "Savings" || accountsPostLogin[j].accountType === "Checking")) {
            var account = {
              "Id": accountsPostLogin[j].accountID,
              "Name": CommonUtilities.getMaskedAccount(accountsPostLogin[j].accountName, accountsPostLogin[j].accountID)
            };
            finalAccounts.push(account);

            this.elligibleAccountsAndTheirLimits.push({
              "Id": accountsPostLogin[j].accountID,
              "MaxTransactionLimit": accounts[i]["limits"]["MAX_TRANSACTION_LIMIT"]
            });
            break;
          }
        }
      }
      if (finalAccounts.length === 0) {
        this.toggleErrorMessage(kony.i18n.getLocalizedString("kony.ach.noAccountWithTheFeatureAction"), true, 66);
      }
      if (applicationManager.getConfigurationManager().isRetailUser === "true") {
        this.view.lstbAccount.masterData = this.objectToListBoxArrayFromService(finalAccounts);
        this.view.lstbAccount.selectedKey = "-1";
      } else {
        this.view.flxPaymentType.setVisibility(false);
        this.view.flxFrom.setVisibility(true);
        this.initializeFromSegment(finalAccounts);
      }
    },

    toggleErrorMessage: function(error, toShow, adjustScreenHeight) {
      if (toShow) {
        this.view.lblDisplayError.text = error;
        this.view.flxDisplayErrorMessage.setVisibility(true);
      } else {
        this.view.lblDisplayError.text = "";
        this.view.flxDisplayErrorMessage.setVisibility(false);
      }
      this.adjustScreen(adjustScreenHeight);
      FormControllerUtility.hideProgressBar(this.view);
    },

    getMaxTransactionLimitForSelectedAccount: function(accountId) {
      for (var i = 0; i < this.elligibleAccountsAndTheirLimits.length; i++) {
        if (this.elligibleAccountsAndTheirLimits[i]["Id"] == accountId) {
          return this.elligibleAccountsAndTheirLimits[i]["MaxTransactionLimit"];
        }
      }
      return 0;
    },

    proceedNext: function(UIType, params) {
      var data = {};
      var isEdit = false;
      if (this.view.tbxMaxAmt.text === "0.00" || this.view.flxMaxAmt.skin === "bbSknFlxBdrff0000Radius3Px") {
        this.view.flxMaxAmt.skin = "bbSknFlxBdrff0000Radius3Px";
        return;
      } else {
        this.displayErrorWhileExecutingTemplate("", false);
      }
      if (kony.sdk.isNullOrUndefined(params)) {
        var templateParams = {
          "MaxAmount": this.view.tbxMaxAmt.text,
          "TemplateType_id": "1",
          "TemplateRequestType_id": this.view.lstbRequestType.selectedKeyValue[0],
          "TemplateRequestTypeValue": this.view.lstbRequestType.selectedKeyValue[1],
          "TransactionType_id": this.view.lstbTemplateType.selectedKeyValue[0],
          "TransactionTypeValue": this.view.lstbTemplateType.selectedKeyValue[1],
          "DebitAccount": applicationManager.getConfigurationManager().isRetailUser === "true" ? this.view.lstbAccount.selectedKeyValue[0] : this.view.lblSelectAccount.accountID,
          "DebitAccountName": applicationManager.getConfigurationManager().isRetailUser === "true" ? this.view.lstbAccount.selectedKeyValue[1] : this.view.lblSelectAccount.accountName,
          "Records": ""
        };
        isEdit = false;
      } else {
        var templateParams = params;
        templateParams.DebitAccount = this.view.lstbAccount.selectedKeyValue[0];
        templateParams.DebitAccountName = this.view.lstbAccount.selectedKeyValue[1];
        templateParams.MaxAmount = this.view.tbxMaxAmt.text;
        isEdit = true;
      }
      this.templateTypeToCreate = templateParams.TransactionTypeValue;

      if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
        templateParams["TemplateName"] = this.view.tbxTemplateName.text;
        templateParams["TemplateDescription"] = this.view.tbxTemplateDescription.text;
        data["Template Name"] = templateParams.TemplateName;
        data["Template Description"] = templateParams.TemplateDescription;
        data["Created By"] = applicationManager.getUserPreferencesManager().getCurrentUserName();
        var currDateObj = CommonUtilities.getServerDateObject();
        var currDate = (currDateObj.getMonth() + 1).toString().padStart(2, '0') + "/" + (currDateObj.getDate()).toString().padStart(2, '0') + "/" + currDateObj.getFullYear() + "";
        data["Created On"] = currDate;

      }
      data["Request Type"] = templateParams.TemplateRequestTypeValue;
      data["Template Type"] = templateParams.TransactionTypeValue;
      data["Debit Account"] = templateParams.DebitAccountName;
      data["Maximum transfer Amount"] = kony.i18n.getLocalizedString("i18n.common.currencySymbol") + templateParams.MaxAmount;
      if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
        var self = this;
        templateParams["EffectiveDate"] = CommonUtilities.getDateFromCalendarInBackendSupportedFormat(self.view.calEffectiveDate);
        data["Effective Date"] = CommonUtilities.getFrontendDateString(templateParams.EffectiveDate, "mm/dd/yyyy");
      }
      this.view.NonEditableDetailsNew.setData(data, true);
      this.addTransactionRecords(UIType, templateParams, isEdit);
    },

    addTransactionRecords: function(UIType, templateParams, isEdit) {
      var breakPoint = kony.application.getCurrentBreakpoint();
      var requestType = templateParams.TemplateRequestTypeValue;

      this.view.TemplateRecordsNew.flxTotalAmountCreate.skin = "skne3e3e3br3pxradius";
      this.view.TemplateRecordsNew.lblAmountColon.setVisibility(false);
      this.showTransactionDetails();
      this.view.flxPaymentInstruction.isVisible = false;

      if (breakPoint === 1024) {
        if (/Tax/.test(requestType)) {
          this.view.TemplateRecordsNew.flxTotalAmountCreate.left = "66%";
          this.view.TemplateRecordsNew.lblTotalAmmount.right = "35%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.width = "23%";
        } else {
          this.view.TemplateRecordsNew.lblUpdateDefaultAmount.left = "38%";
          this.view.TemplateRecordsNew.lblTotalAmmount.right = "26%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.left = "76%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.width = "15%";
        }
      } else {
        if (/Tax/.test(requestType)) {
          this.view.TemplateRecordsNew.flxTotalAmountCreate.left = "66.25%";
          this.view.TemplateRecordsNew.lblTotalAmmount.right = "35%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.width = "26%";
        } else {
          this.view.TemplateRecordsNew.lblUpdateDefaultAmount.left = "55%";
          this.view.TemplateRecordsNew.lblTotalAmmount.right = "23%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.left = "79%";
          this.view.TemplateRecordsNew.flxTotalAmountCreate.width = "15%";
        }
      }

      if (/Tax/.test(requestType))
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = null;
      else if (breakPoint === 640 || orientationHandler.isMobile)
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeaderMobile";
      else
        this.view.TemplateRecordsNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBBACHTemplateRecordHeader";

      this.view.createFlowFormActionsNew.enableNextButton();
      this.view.ApprovalFormActions.btnOption.isVisible = true;
      if (!kony.sdk.isNullOrUndefined(isEdit) && isEdit) {
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
      } else {
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Proceed");
      }

      var context = {
        "UIType": UIType,
        "isEdit": isEdit
      };
      this.view.ApprovalFormActions.btnOption.onClick = this.checkTotalAmountAgainstMaxAmount.bind(this, templateParams, context);
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });

      this.view.ApprovalFormActions.btnCancel.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");

      if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
        if (isEdit) {
          this.view.ApprovalFormActions.btnCancel.onClick = this.editACHTemplateDetails.bind(this, templateParams, isEdit);
        } else {
          this.view.ApprovalFormActions.btnCancel.onClick = this.createACHTemplate.bind(this, false);
        }
      } else if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
        this.view.ApprovalFormActions.btnCancel.onClick = this.createTransactionWithoutTemplate.bind(this, false);
      }

      this.view.TemplateRecordsNew.flxUpdateAmount.isVisible = true; /* default its set to visible */
      this.view.TemplateRecordsNew.tbxUpdateDefaultAmount.text = "";

      var defaultValues = this.getTRCreateDefaultValues(requestType);

      var sectionData = this.getTRSectionData(requestType);

      var rowDataMap = {
        tbxCrName: "Name",
        tbxCrAccountNumber: "AccountNumber",
        tbxCrTRCNumber: "ABAOrTRC",
        tbxCrDetailID: "DetailID",
        tbxCrAmount: "Amount",
        flxAmount: "flxAmount"
      };

      var blankRow = {
        ABAOrTRC: {
          "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.ABAOrTRC"),
          "text": ""
        },
        AccountNumber: {
          "placeholder": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
          "text": ""
        },
        AccountType: {
          "placeholder": kony.i18n.getLocalizedString("i18n.transfers.accountType"),
          "text": ""
        },
        Name: {
          "placeholder": kony.i18n.getLocalizedString("i18n.konybb.Common.Name"),
          "text": ""
        },
        DetailID: {
          "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.detailId"),
          "text": ""
        },
        Amount: {
          "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
          "text": ""
        },
        AddInfo: {
          "placeholder": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation"),
          "text": ""
        },
        flxAmount: {
          "left": (breakPoint === 1024) ? "76%" : "79%"
        }
      };

      var ackRowDataMap = {
        lblAckName: "tbxCrName",
        lblAckAccountNumber: "tbxCrAccountNumber",
        lblAckAccountType: "lblAccountType",
        lblAckABAOrTRCNumber: "tbxCrTRCNumber",
        lblAckDetailsID: "tbxCrDetailID",
        lblAckAmount: "tbxCrAmount",
        lblAckAdditionalInfo: "lblAdditionalInfo",
        imgAckInfo: "imgInfo",
        lblAckAdditionalInfoValue: "tbxAdditionalInfo"
      };

      if (/CCD|CTX|Web/.test(requestType)) {
        rowDataMap["tbxAdditionalInfo"] = "AddInfo";
      } else if (/Tax/.test(requestType)) {
        rowDataMap = {
          tbxEmpIDNum: "EmpIDNumber",
          tbxAccNum: "AccountNumber",
          tbxTrcNum: "ABAOrTRC",
          calEffectiveDate: "EffectiveDate",
          tbxTaxSubAmount: "Amount",
          imgChkZeroTax: "zeroCheckbox",
          flxSubTaxAmt: "flxSubTaxAmt"
        };

        blankRow = {
          EmpIDNumber: {
            "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.tax.EIN"),
            "text": ""
          },
          AccountNumber: {
            "placeholder": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
            "text": ""
          },
          ABAOrTRC: {
            "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.ABAOrTRC"),
            "text": ""
          },
          EffectiveDate: {
            "placeholder": "mm/dd/yyyy"
          },
          Amount: {
            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
            "text": ""
          },
          zeroCheckbox: {
            "src": "unchecked_box.png"
          },
          flxSubTaxAmt: {
            "width": (breakPoint === 1024) ? "23%" : "25.83%"
          }
        };

        ackRowDataMap = {
          lblEINValue: "tbxEmpIDNum",
          lblAccNumVal: "tbxAccNum",
          lblAckAccTypeVal: "lblAccountType",
          lblAckTRCorARBVal: "tbxTrcNum",
          lblAckEffDateVal: "calEffectiveDate",
          lblAckTaxTypeVal: "lblBXTaxType",
          lblAckSubCateVal: "lblBxSubCategoryType",
          lblAckSubCatAmtVal: "tbxTaxSubAmount"
        };
        this.view.TemplateRecordsNew.flxUpdateAmount.isVisible = false;
      } else {
        kony.print("PPD View will be setup");
      }

      this.view.TemplateRecordsNew.TabBodyNew.setSectionData([sectionData]);
      this.view.TemplateRecordsNew.TabBodyNew.setRowDataMap([rowDataMap]);
      this.view.TemplateRecordsNew.TabBodyNew.setDefaultValues([defaultValues]);
      this.view.TemplateRecordsNew.TabBodyNew.setEmptyRowData([blankRow]);

      if (isEdit) {
        this.fetchTemplateRecords({
          "Template_id": templateParams.Template_id
        }, isEdit);
      } else {
        this.view.TemplateRecordsNew.TabBodyNew.addDataForSections([
          [blankRow]
        ]);
      }

      this.view.TemplateRecordsNew.TabBodyNew.updateTotal({
        id: "Amount"
      });

      if(!isEdit) {
        this.displayErrorWhileExecutingTemplate("", false);
      }

      if (/Tax/.test(requestType)) {
        this.view.TemplateRecordsNew.setRemoveButtonName("btnRemoveSubCategory");
      } else {
        this.view.TemplateRecordsNew.setRemoveButtonName("btnRemove");
      }

      this.view.TemplateRecordsNew.btnAddAdditionalDetailsRow.isVisible = true;
      this.view.TemplateRecordsNew.flxTotalAmountCreate.isVisible = true;
      this.view.TemplateRecordsNew.flxTotalAmount.isVisible = false;
      this.view.TemplateRecordsNew.TabBodyNew.setProceedWidget(this.view.ApprovalFormActions.btnOption);
      CommonUtilities.disableButton(this.view.ApprovalFormActions.btnOption);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    updateAmountOnClick: function() {
      this.view.customheader.imgKony.setFocus(true);
      this.view.scrollToBeginning();
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.updateDefaultAmount"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.updateDefaultAmountMsg"),
        "commentsVisibility": false,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };
      this.showPopup(popupConfig, this.updateDefaultAmount);

    },

    updateDefaultAmount: function() {
      this.view.TemplateRecordsNew.updateAmount(["tbxCrAmount", "tbxAmount", "tbxTaxSubAmount"]);
      this.view.flxPopup.isVisible = false;
      this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    //***************************************************************** ACH FILE UPLOAD CODE **************************************************************************//
    /**
         * getACHSupportedFileTypes : function to fetch ACH Upload Files Screen With appropriate fileTypes
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    getACHSupportedFileTypes: function() {
      var scopeObj = this;
      var navObj = {
        requestData: "",
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SET_ACH_FILE_TYPES,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.ACH_FILE_TYPES_FETCH_FAIL,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.getSupportedFileTypes(navObj);
    },


    /**
         * showFilesFromDevice : fetch the files based on the fileType selected
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    showFilesFromDevice: function() {
      var fileType = this.view.lstbFormatType.selectedKey;
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      var mimeString = this.ApprovalsReqUIModule.presentationController.getMIMEType(fileType);
      this.browseFiles(mimeString);
    },


    /**
         * browseFiles :This function is used for opening the browser for uploading the files on click of the
         * attachment icon based on files config like which type of files to be uploaded
         * @member of {frmApprovalViewDetailsController}
         * @param { string } fileTypeMime - selected file MIME Type
         * @return {}
         * @throws {}
         */
    browseFiles: function(fileTypeMime) {
      var config = {
        selectMultipleFiles: true,
        filter: ((kony.os.deviceInfo().osName) === "windows") ? [fileTypeMime] : []
      };
      kony.io.FileSystem.browse(config, this.browseFilesCallback);
    },


    /**
         * browseFilesCallback :This function executes once the files are uploded so that  the uploaded files are binded to the Segment while creating a new Message
         * @member of {frmApprovalViewDetailsController}
         * @param {object}  event - event object
         * @param {object}   fileData - data of the files which are uploaded
         * @return {}
         * @throws {}
         */
    browseFilesCallback: function(event, fileData) {
      this.bindFileToFlex(fileData, "error messsage");
    },

    /**
    	Method used to show any error message occured during uploading a file
    **/
    showUploadErrMsg: function(errMsg) {
      if (errMsg !== "" && !kony.sdk.isNullOrUndefined(errMsg)) {
        this.view.lblUploadFailMessage.text = errMsg;
        this.view.flxErrorFlow.isVisible = true;
        this.view.forceLayout();
      }
    },

    getBase64: function(file, successCallback) {
      var reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },

    /**
         * bindFileToFlex :This function binds the attachment data to the flex
         * @member of {frmApprovalViewDetailsController}
         * @param {object}  Selectedfile - is a  JSON which consists of the data of the files attached
         * @param {string} warningLabel - warningLabel
         * @return {}
         * @throws {}
         */
    bindFileToFlex: function(Selectedfile, warningLabel) {
      var self = this;
      var isErrorState = false;
      this.fileObject = this.fileObject || {};
      if (Selectedfile.length !== 1) {
        this.showUploadErrMsg(kony.i18n.getLocalizedString("i18n.konybb.common.ACHFileUploadMsg"));
      } else if (Selectedfile[0].file.size > BBConstants.MAX_ACH_FILE_SIZE) {
        this.showUploadErrMsg(kony.i18n.getLocalizedString("i18n.konybb.uploadACHError"));
      } else {
        if (Selectedfile && Selectedfile.length > 0) {
          Selectedfile.forEach(function(item) {
            var fileData = {};
            var fileName = item.file.name;
            var fileType = fileName.split('.').pop();
            self.getBase64(item.file, function(base64String) {
              base64String = base64String.replace(/data:;base64,/, "");
              fileData.Contents = base64String.replace(/data:application\/octet-stream;base64\,/, "");
            });
            fileData.FileName = fileName;
            fileData.FileSize = item.file.size;
            fileData.FileType = fileType;
            if (BBConstants.SUPPORTED_ACH_FILE_TYPES.indexOf(fileType) >= 0) {
              self.fileObject = fileData;
              isErrorState = false;
            } else {
              self.showUploadErrMsg(kony.i18n.getLocalizedString("i18n.ach.uploadTypeFailure"));
              isErrorState = true;
            }
          });
        }
        if (isErrorState === false) {
          this.view.lblFormatTypeValue.text = Selectedfile[0].file.type;
          this.view.lblFIleName.text = Selectedfile[0].file.name;
          this.view.flxUploadFile.isVisible = false;
          this.view.flxUploadedFileDetails.isVisible = true;
          this.view.flxErrorFlow.isVisible = false;
          CommonUtilities.enableButton(this.view.filesFormActionsNew.btnNext);
          this.adjustScreen(0);
        }
      }
    },


    /**
         * uploadACHFile : function to Presentation controller to Upload ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} requestParam - request params of a file Object to create a upload
         * @return {}
         * @throws {}
         */
    uploadACHFile: function(requestParam) {
      var scopeObj = this;
      var navObj = {
        requestData: requestParam,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.FETCH_UPLOADED_ACH_FILE,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.UPLOAD_ACHFILE_FAILURE,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.uploadACHFile(navObj);
    },


    /**
         * fetchUploadedACHFile : function to fetch details of the successfully uploaded ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} requestParam - ACH File Id to fetch details
         * @return {}
         * @throws {}
         */
    fetchUploadedACHFile: function(requestParam) {
      var scopeObj = this;
      var navObj = {
        requestData: requestParam,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_UPLOADED_ACH_FILE,
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
      scopeObj.ApprovalsReqUIModule.presentationController.getACHFileByID(navObj);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    /**
         * uploadFailed : function to show User ACH File has Failed
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    uploadFailed: function(response) {
      if (!kony.sdk.isNullOrUndefined(response) && !kony.sdk.isNullOrUndefined(response.errorMessage))
        this.showUploadErrMsg(response.errorMessage);
      else
        this.showUploadErrMsg(kony.i18n.getLocalizedString("i18n.konybb.ach.ACHFileErrorMessage"));
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    /**
         * showUploadedFile : to show the uploaded file details in ACK
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} ACHFileData - JSON Data of the Uploaded File
         * @return {}
         * @throws {}
         */
    showUploadedFile: function(ACHFileData) {
      var fileACKData = this.generateViewDetailRecords(ACHFileData);
      this.view.lblFormatTypeValue.text = ACHFileData.FileFormatType;
      this.view.lblRequestTypeValue.text = ACHFileData.FileRequestType;
      this.view.lblFileNameAck.text = ACHFileData.FileName.toolTip;
      if (ACHFileData.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      } else {
        this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUploadExecute"));
      }
      this.showACHFileUploadAck(fileACKData);
      if (kony.sdk.isNullOrUndefined(ACHFileData.Request_id) || kony.sdk.isEmptyObject(ACHFileData.Request_id)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = ACHFileData.Approver;
        this.fetchRequestHistoryData(ACHFileData.Request_id);
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },


    /**
         * showACHFilesUpload : to show the File Upload UI for User to Upload ACH Files
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    showACHFilesUpload: function() {
      this.fileObject = {};
      CommonUtilities.disableButton(this.view.filesFormActionsNew.btnNext);
      this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.userMgmt.UploadACHFiles");
      this.view.flxContentDashBoard.isVisible = true;
      this.view.flxDisplayErrorMessage.isVisible = false;
      this.view.flxTerms.isVisible = false;
      this.view.flxTabPaneContainer.isVisible = false;
      this.view.flxDashboard.skin = "slfBoxffffffB1R5";
      this.view.flxDashboard.top = "5dp";
      this.view.flxCreateUI.isVisible = false;
      this.view.flxACHFilesUpload.isVisible = true;
      this.view.flxTransactionDetails.isVisible = false;
      this.view.flxCommonActionsCont.isVisible = false;
      this.view.flxRequestCreateEditUpdateEditDetails.isVisible = false;
      this.view.flxApprovalrequestHistorySection.isVisible = false;
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxErrorFlow.isVisible = false;
      this.getACHSupportedFileTypes();

      this.view.flxUploadFile.isVisible = true;
      this.view.flxUploadedFileDetails.isVisible = false;
      this.view.btnRemoveFile.onClick = function() {
        this.fileObject = {};
        this.view.flxUploadFile.isVisible = true;
        this.view.flxUploadedFileDetails.isVisible = false;
        CommonUtilities.disableButton(this.view.filesFormActionsNew.btnNext);
        this.view.forceLayout();
        this.adjustScreen(0);
      }.bind(this);

      this.view.filesFormActionsNew.btnNext.onClick = function() {
        var scopeObj = this;
        var selectedFileType = scopeObj.view.lstbFormatType.selectedKeyValue[1];
        var uploadedFileType = scopeObj.fileObject.FileType;
        var FormatTypeID = scopeObj.ApprovalsReqUIModule.presentationController.validateFileFormatAndGetFormatTypeId(selectedFileType, uploadedFileType);
        if (!kony.sdk.isNullOrUndefined(FormatTypeID)) {
          scopeObj.fileObject.FormatTypeID = FormatTypeID;
          scopeObj.uploadACHFile(scopeObj.fileObject);
        } else {
          scopeObj.showUploadErrMsg(kony.i18n.getLocalizedString("i18n.ach.uploadTypeFailure"));
        }
      }.bind(this);
      this.view.filesFormActionsNew.btnCancel.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_FILES_TAB
      });
      this.view.flxUploadFile.onClick = this.showFilesFromDevice;
      this.setupRightContainerForUploadACHFiles();
      this.view.dbRightContainerNew.setVisibility(true);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showACHFileUploadAck : UI setup for the Acknowledgment screen to show the ACH File Uploaded
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} fileDetails - basic ACH File details
         * @return {}
         * @throws {}
         */
    showACHFileUploadAck: function(fileDetails) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles") +
        kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.TradeFinance.viewDetails");
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = true;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxApprovalsHistoryInformation.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxDateContainer.isVisible = false;

      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadFileContent");
      this.view.NonEditableDetailsNew.setData(fileDetails, true);

      this.view.ApprovalFormActions.btnCancel.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NORMAL;
      this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
      this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadAnother");
      this.view.ApprovalFormActions.btnCancel.onClick = this.showACHFilesUpload;
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_FILES_TAB
      });

      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
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
    fetchTemplateRecords: function(inputparams, isEdit) {
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
    fetchFileRecords: function(inputparams) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_FILES_DATA,
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
      scopeObj.ApprovalsReqUIModule.presentationController.getACHFileRecords(navObj);
    },

    /**
         * fetchTransactionRecords : fetch the required transaction Records.
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Onject} inputparams - transaction details from Template or Transaction
         * @return {}
         * @throws {}
         */
    fetchTransactionRecords: function(inputparams) {
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


    /**
         * showFetchedTemplateOrTransationRecords : set the fetched Data based on the template/Transaction type
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} response - array of transaction/template records data
         * @return {}
         * @throws {}
         */
    showFetchedTemplateOrTransationRecords: function(response) {
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


    showFetchedFileRecords: function(response) {

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
         * invokeCreateTemplateService : function to call the create Template Service
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON oBject} inputparams - data of the Template to be sent to create an ACH Template
         * @return {}
         * @throws {}
         */
    invokeCreateTemplateService: function(inputparams, isEdit) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: !kony.sdk.isNullOrUndefined(isEdit) && isEdit ? BBConstants.EDIT_ACH_TEMPLATE_SUCCESS : BBConstants.CREATED_ACH_TEMPLATE,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.CREATE_TEMPLATE_FAILURE,
            responseData: {}
          }
        }
      };
      if (!kony.sdk.isNullOrUndefined(isEdit) && isEdit) {
        scopeObj.ApprovalsReqUIModule.presentationController.editACHTemplate(navObj);
      } else {
        scopeObj.ApprovalsReqUIModule.presentationController.createACHTemplate(navObj);
      }
    },

    /**
         * showCreatedTemplate : Setup the UI to show the Created Template
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} response - Details of Template created
         * @return {}
         * @throws {}
         */
    showCreatedTemplate: function(response, isEdit) {
      var ackMessage = kony.i18n.getLocalizedString("kony.i18n.ach.your") + " " + this.templateTypeToCreate + " " +
          kony.i18n.getLocalizedString("i18n.konybb.ACH.createTemplateComplete");
      this.setupUIForACK(ackMessage);
      if (!kony.sdk.isNullOrUndefined(isEdit) && isEdit) {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.templateUpdateSuccess");
      } else {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.createACHTemplate") +
          kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
          kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      }
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewTemplates");
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;

      this.view.flxApprovalsHistoryInformation.isVisible = false;
      this.view.flxApprovalrequestHistorySection.isVisible = false;

      this.fetchTemplateRecords({
        "Template_id": response.Template_id
      });
      this.view.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },

    showUpdatedTemplate: function(response) {
      var data = response[0];
      this.achTemplateViewDetails(data, true);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    /**
         * invokeCreateTransactionService : create Transaction Service call with the Navigation Object
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Array} inputparams - transaction details from Template or Transaction
         * @return {}
         * @throws {}
         */
    invokeCreateTransactionService: function(inputparams) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.CREATE_TRANSACTION_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.CREATE_TRANSACTION_FAILURE,
            responseData: {}
          }
        },
        onCancel: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_TEMPLATES_TAB,
            responseData: {}
          }
        }
      };
      scopeObj.ApprovalsReqUIModule.presentationController.createACHTransaction(navObj);
    },

    setTemplateRecordsForExecute: function(records) {
      var scopeObj = this;
      if (records.isTaxType) {
        records.forEach(function(obj, index) {
          var data = scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.data[0][1][index];
          if (records.length > 1) {
            var btnRemoveSubCategory = data.btnRemoveSubCategory;
            btnRemoveSubCategory.isVisible = true;
            scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("btnRemoveSubCategory",
                                                                    btnRemoveSubCategory, index, 0);
          }
        });
      } else {
        records.forEach(function(obj, index) {
          var data = scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.data[0][1][index];
          if (records.length > 1) {
            var btnRemove = data.btnRemoveRecord;
            btnRemove.isVisible = true;
            scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("btnRemoveRecord",
                                                                    btnRemove, index, 0);
          }
        });
      }
    },

    setTemplateRecordsForEdit: function(records) {
      var scopeObj = this;
      this.view.TemplateRecordsNew.TabBodyNew.addDataForSections([records]);
      if (records.isTaxType) {
        records.forEach(function(obj, index) {
          var data = scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.data[0][1][index];
          var toAccountSelectedKey = CommonUtilities.getListBoxSelectedKeyFromMasterData(obj.ToAccountType_id, scopeObj.ACHAccountTypes);
          var taxTypeSelectedKey = CommonUtilities.getListBoxSelectedKeyFromMasterData(obj.TaxType_id, scopeObj.TaxTypes);
          var toAccountValue = data.lstBxAccountType;
          var taxTypeValue = data.lstBxTaxType;
          toAccountValue.selectedKey = toAccountSelectedKey;
          taxTypeValue.selectedKey = taxTypeSelectedKey;

          var subTaxTypeContext = {
            "sectionIndex": 0,
            "rowIndex": index,
            "isEdit": true,
            "TaxSubCategory_id": obj.TaxSubCategory_id
          };
          scopeObj.fetchTaxSubTypes(obj.TaxType_id, taxTypeValue, subTaxTypeContext);
          scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lstBxAccountType",
                                                                  toAccountValue, index, 0);
          scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lstBxTaxType",
                                                                  taxTypeValue, index, 0);
          if (records.length > 1) {
            var btnRemoveSubCategory = data.btnRemoveSubCategory;
            btnRemoveSubCategory.isVisible = true;
            scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("btnRemoveSubCategory",
                                                                    btnRemoveSubCategory, index, 0);
          }
        });
      } else {
        records.forEach(function(obj, index) {
          var data = scopeObj.view.TemplateRecordsNew.TabBodyNew.segTemplates.data[0][1][index];
          var selectedKey = CommonUtilities.getListBoxSelectedKeyFromMasterData(obj.ToAccountType_id, scopeObj.ACHAccountTypes);
          var accountTypeValue = data.lstbxCrAccountType;
          accountTypeValue.selectedKey = selectedKey;
          scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("lstbxCrAccountType",
                                                                  accountTypeValue, index, 0);
          if (records.length > 1) {
            var btnRemove = data.btnRemove;
            btnRemove.isVisible = true;
            scopeObj.view.TemplateRecordsNew.TabBodyNew.updateKeyAt("btnRemove",
                                                                    btnRemove, index, 0);
          }
        });
      }
      this.view.TemplateRecordsNew.TabBodyNew.enableOrDisableProceedWidget();
      CommonUtilities.disableButton(this.view.TemplateRecordsNew.TabBodyNew.getProceedWidget());
      FormControllerUtility.hideProgressBar(this.view);
    },

    invokeExecuteTemplateService: function(inputparams) {
      var scopeObj = this;
      var navObj = {
        requestData: inputparams,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.EXECUTE_TEMPLATE_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.TEMPLATE_EXECUTION_FAILURE,
            responseData: {}
          }
        },
        onCancel: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.SHOW_ACH_TEMPLATES_TAB,
            responseData: {}
          }
        },
      };
      scopeObj.ApprovalsReqUIModule.presentationController.executeTemplate(navObj);
    },

    /**
         * showCreatedTransaction : set the UI to show the Created Transaction Details
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} response - JSON of details for the created Transaction with or without Template
         * @return {}
         * @throws {}
         */
    showCreatedTransaction: function(response) {

      var transactionId = null;

      //resetting mfa flow type after successful transaction
      applicationManager.getMFAManager().setMFAFlowType("");

      //if its a create transaction without template response
      if (!kony.sdk.isNullOrUndefined(response.Transaction_id)) {
        transactionId = response.Transaction_id;
      }
      //if its a execute template response
      else if (!kony.sdk.isNullOrUndefined(response.transaction_id)) {
        transactionId = response.transaction_id;
      }

      var referenceId = null;

      //if its a execute template response
      if (!kony.sdk.isNullOrUndefined(response.referenceId)) {
        referenceId = response.referenceId;
      }
      //if its a create transaction without template response
      else if (!kony.sdk.isNullOrUndefined(response.ReferenceID)) {
        referenceId = response.ReferenceID;
      }

      if (response.Status === "Pending") {
        this.setupUIForACK(kony.i18n.getLocalizedString("i18n.PayAPerson.PendingMoneyMessage") +
                           " \n" + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                           referenceId);
      } else {
        this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.transactionSubmittedSuccess") +
                           " \n" + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                           transactionId);
      }

      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHTransfer") +
        kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      var scopeObj = this;
      if (applicationManager.getConfigurationManager().isApproveTransactionEnabled() || applicationManager.getConfigurationManager().isApproveACHEnabled()) {
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.backToTransactions");
        this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
          "key": BBConstants.SHOW_ACH_TRANSACTIONS_TAB
        });
        this.view.ApprovalFormActions.btnCancel.isVisible = true;
        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.makeAnotherTransfer");
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
        if (scopeObj.createUIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template"))
          scopeObj.view.CommonFormActionsNew.btnCancel.onClick = scopeObj.makeTransactionWithTemplate.bind(scopeObj, scopeObj.executeTemplateData);
        else if (scopeObj.createUIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction"))
          scopeObj.view.CommonFormActionsNew.btnCancel.onClick = scopeObj.createTransactionWithoutTemplate.bind(scopeObj, true);
      } else {
        this.view.ApprovalFormActions.btnCancel.isVisible = false;
        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.NORMAL;
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.makeAnotherTransfer");
        if (scopeObj.createUIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template"))
          scopeObj.view.CommonFormActionsNew.btnNext.onClick = scopeObj.makeTransactionWithTemplate.bind(scopeObj, scopeObj.executeTemplateData);
        else if (scopeObj.createUIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction"))
          scopeObj.view.CommonFormActionsNew.btnNext.onClick = scopeObj.createTransactionWithoutTemplate.bind(scopeObj, true);
      }

      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.template.Save");
      this.view.tbxTemplateName.text = transactionId;
      this.view.ApprovalFormActions.btnOption.onClick = this.saveAsTemplate;
      this.view.ApprovalFormActions.btnBack.isVisible = false;

      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);


      this.fetchTransactionRecords({
        "Transaction_id": transactionId
      });
      this.view.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    failureCallbackCreateTransaction: function(error) {
      FormControllerUtility.hideProgressBar(this.view);
      this.showDownTimeMessage();
      this.adjustScreen(0);
    },


    /**
         * fetchRecordsForPayment : Read the entered data for creating the Payment of the Template/Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {String} requestType - Type or Name of the Transaction/Template
         * @param {JSON Array} recordsData - Array of JSON Templates Records Data fetched from the UI
         * @return {JSON Array} records - JSON Data to tbe sent for Creating the Payment
         * @throws {}
         */
    fetchRecordsForPayment: function(requestType, recordsData) {
      var data = recordsData[0][1];
      var records = [];
      data.forEach(function(obj) {
        var recordDetails = {};
        if (/Tax/.test(requestType)) {
          recordDetails = {
            "TemplateRecord_id": obj.TemplateRecord_id,
            "SubRecords": [{
              "Amount": obj.tbxTaxSubAmount.text,
              "TemplateSubRecord_id": obj.TemplateSubRecord_id
            }]
          };
        } else {
          recordDetails = {
            "Amount": obj.tbxAmount.text,
            "TemplateRecord_id": obj.TemplateRecord_id
          };
        }
        if (/CCD|CTX|Web/.test(requestType)) {
          recordDetails["AdditionalInfo"] = obj.lblAdditionalInfoVal.text;
        }
        records.push(recordDetails);
      });
      return records;
    },


    /**
         * fetchRecords : Read the entered data for creating the Template/Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {String} requestType - Type or Name of the Transaction/Template
         * @param {JSON Array} recordsData - Array of JSON Templates Records Data fetched from the UI
         * @return {JSON Array} records - JSON Data to tbe sent for Creating the ACH template or transaction
         * @throws {}
         */
    fetchRecords: function(requestType, recordsData) {
      var data = recordsData[0][1];
      var records = [];
      data.forEach(function(obj) {
        var recordDetails = {};

        if (/Tax/.test(requestType)) {
          recordDetails = {
            "EIN": obj.tbxEmpIDNum.text,
            "ToAccountNumber": obj.tbxAccNum.text,
            "ToAccountType": obj.lstBxAccountType.selectedKey,
            "ABATRCNumber": obj.tbxTrcNum.text,
            "IsZeroTaxDue": (obj.imgChkZeroTax.src === "unchecked_box.png") ? "0" : "1",
            "TaxType_id": obj.lstBxTaxType.selectedKey,
            "TaxType": obj.lstBxTaxType.selectedKey,
            "SubRecords": [{
              "Amount": obj.tbxTaxSubAmount.text,
              "TaxSubCategory_id": obj.lstBxSubCategoryType.selectedKey,
              "TaxSubCategory": obj.lblBxSubCategoryType.text,
            }]
          };
        } else {
          recordDetails = {
            "Record_Name": obj.tbxCrName.text,
            "ToAccountNumber": obj.tbxCrAccountNumber.text,
            "ToAccountType": obj.lstbxCrAccountType.selectedKey,
            "ABATRCNumber": obj.tbxCrTRCNumber.text,
            "Detail_id": obj.tbxCrDetailID.text,
            "Amount": obj.tbxCrAmount.text
          };
        }

        if (/CCD|CTX|Web/.test(requestType)) {
          recordDetails["AdditionalInfo"] = obj.tbxAdditionalInfo.text;
        }

        records.push(recordDetails);
      });
      return records;
    },


    actionAcknowledgementUIFromDashboard: function(contextKey) {
      if (contextKey === BBConstants.SHOW_ACH_TRANSACTIONS_TAB)
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
          kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
          kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      else if (contextKey === BBConstants.SHOW_ACH_FILES_TAB)
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
          kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
          kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      if (contextKey === BBConstants.SHOW_ACH_TRANSACTIONS_TAB)
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.backToTransactions");
      else if (contextKey === BBConstants.SHOW_ACH_FILES_TAB)
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.backToFiles");
      this.view.ApprovalFormActions.btnNext.onClick = this.updateFormUI.bind(this, {
        "key": contextKey
      });
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    //******************************************************************* ACH TEMPLATES ACTIONS & ACKNOWLEDGMENTS ********************************************************//

    /**
         * onClickTemplateViewDetails : onClick of View Template Details
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Obj} eventobject - JSON of the button  which triggered the event
         * @param {JSON Obj} context - context of the segment in which the widget has triggered the action
         * @return {}
         * @throws {}
         */
    onClickTemplateViewDetails: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
      this.achTemplateViewDetails(selectedRowData);
    },


    /**
         * achTemplateViewDetails : set the UI to show the Acknowledgement/Details Screen for the Templates
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} data - JSON object of the selected segment row of the Templates
         * @return {}
         * @throws {}
         */
    achTemplateViewDetails: function(data, isEdit) {

      this.view.flxImgPrintAch.setVisibility(false);
      this.view.flxImgDownloadAch.setVisibility(false);
      if (!kony.sdk.isNullOrUndefined(isEdit) && isEdit) {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTemplate") +
          kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
          kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.templateUpdateSuccess"));
        this.view.flxAcknowledgementContainer.isVisible = true;
      } else {
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTemplate") +
          kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
          kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        this.setupUIForACK("");
        this.view.flxAcknowledgementContainer.isVisible = false;
      }
      var currDateObj = CommonUtilities.getServerDateObject();
      var currDate = (currDateObj.getMonth() + 1).toString().padStart(2, '0') + "/" + (currDateObj.getDate()).toString().padStart(2, '0') + "/" + currDateObj.getFullYear() + "";
      data["CreatedOn"] = currDate;
      var templateData = {
        "Template Name": data.TemplateName.toolTip,
        "Template Description": data.TemplateDescription,
        "Transaction Type": data.TransactionTypeValue,
        "Request Type": data.RequestType,
        "Debit Account": data.AccountName,
        "Created On": data.CreatedOn,
        "Created By": data.userName,
        "Status": data.Status,
        "Maximum transfer Amount": kony.i18n.getLocalizedString("i18n.common.currencySymbol") + data.MaxAmount
      };
      var templateparams = {
        "Template_id": data.Template_id,
        "TemplateName": data.TemplateName.toolTip,
        "TemplateDescription": data.TemplateDescription,
        "TransactionType_id": data.TransactionType_id,
        "TransactionTypeValue": data.TransactionTypeValue,
        "TemplateRequestType_id": data.TemplateRequestType_id,
        "TemplateRequestTypeValue": data.RequestType,
        "DebitAccount": data.DebitAccount,
        "DebitAccountName": data.AccountName,
        "MaxAmount": data.MaxAmount,
        "CreatedOn": data.CreatedOn,
        "CreatedBy": data.userName,
        "Status": data.StatusValue,
      }
      this.view.NonEditableDetailsNew.setData(templateData, true);
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTemplate");
      this.view.ApprovalFormActions.enableNextButton();
      this.view.ApprovalFormActions.btnOption.isVisible = true;
      this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.MakeAPayment");
      this.view.ApprovalFormActions.btnOption.onClick = this.makeTransactionWithTemplate.bind(this, data);
      this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
      this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
      var scopeObj = this;
      scopeObj.paymentAccounts = [];
      scopeObj.collectionAccounts = [];
      this.view.lstbAccount.masterData = [];
      applicationManager.getConfigurationManager().userAccounts.forEach(function(obj) {
        var account = {
          "Id": obj.accountID,
          "Name": CommonUtilities.getMaskedAccount(obj.accountName, obj.accountID)
        };
        if (obj.accountType === "Savings" || obj.accountType === "Checking") {
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_COLLECTION_EDIT_TEMPLATE"))
            scopeObj.collectionAccounts.push(account);
          if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "ACH_PAYMENT_EDIT_TEMPLATE"))
            scopeObj.paymentAccounts.push(account);
        }
      });
      var featureAction = null;
      if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Payment"))
        featureAction = "ACH_PAYMENT_EDIT_TEMPLATE";
      else if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Collection"))
        featureAction = "ACH_COLLECTION_EDIT_TEMPLATE";
      this.view.ApprovalFormActions.btnCancel.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getEditACHTemplatePermissionsList()
      ) && (applicationManager.getConfigurationManager().checkAccountAction(data.DebitAccount, featureAction));
      this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.ACH.EditTemplate");
      this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnCancel.onClick = this.editACHTemplateDetails.bind(this, templateparams);
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Payment"))
        featureAction = "ACH_PAYMENT_DELETE_TEMPLATE";
      else if (data.TransactionTypeValue === kony.i18n.getLocalizedString("i18n.konybb.Common.Collection"))
        featureAction = "ACH_COLLECTION_DELETE_TEMPLATE";
      this.view.ApprovalFormActions.btnNext.isVisible = this.checkAtLeastOnePermission(
        applicationManager.getConfigurationManager().getDeleteACHTemplatePermissionsList()
      ) && (applicationManager.getConfigurationManager().checkAccountAction(data.DebitAccount, featureAction));
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
      this.view.ApprovalFormActions.btnNext.onClick = this.deleteSelectedACHTemplate.bind(this, data)
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
      this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });

      this.fetchTemplateRecords({
        "Template_id": data.Template_id
      });

      this.view.flxApprovalsHistoryInformation.isVisible = false;
      this.view.flxApprovalrequestHistorySection.isVisible = false;

      this.view.forceLayout();
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
    approveACHFile: function(selectedRowData, successKey) {
      var scopeObj = this;
      var Request_id = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": Request_id,
        "featureActionId":featureActionId,
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
    approveACHFileFromACH: function (selectedRowData, successKey) {
      var scopeObj = this;
      var Request_id = selectedRowData["Request_id"];
      var req = {
        "requestId": Request_id,
        "featureActionId": BBConstants.ACH_FILE_UPLOAD,
        "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
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
    rejectACHFile: function(selectedRowData, successKey) {
      var Request_id = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var params ={
        "requestId":Request_id,
        "featureActionId":featureActionId
      };
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectFileConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHFileService.bind(this, params, successKey));
    },


    /**
         * rejectACHFileService : onclick Pop - UP Yes, the action for Reject ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {String} Request_id - request to delete the ACH File of ID
         * @return {}
         * @throws {}
         */
    rejectACHFileService: function(params, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": params.requestId,
        "featureActionId":params.featureActionId,
        "Comments": Comments,

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
    rejectGeneralTransaction: function(selectedRowData, infinityUserContractsData) {
      var Request_id = selectedRowData["Request_id"];
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };
      if(selectedRowData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE)
        this.showPopup(popupConfig, this.rejectChequeBookRequest.bind(this, selectedRowData));
      else
        this.showPopup(popupConfig, this.rejectTransactionService.bind(this, selectedRowData, infinityUserContractsData));
    },


    rejectChequeBookRequest: function( recordData) {
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
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REJECTED_TRANSACTION_ACK,
            responseData: recordData
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
      scopeObj.ApprovalRequestsModule.presentationController.rejectChequeBookRequest(navObj);
    },
    /**
         * rejectTransactionService : onclick Pop - UP Yes, the action for Reject General Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {String} Request_id - request to delete the ACH Transaction of given Id
         * @return {}
         * @throws {}
         */
    rejectTransactionService: function(selectedRowData, infinityUserContractsData) {
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
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REJECTED_TRANSACTION_ACK,
            responseData: selectedRowData
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
      scopeObj.ApprovalRequestsModule.presentationController.rejectTransactions(navObj);
      if(this.beneficiaryActionIdArray.includes(selectedRowData.featureActionId)){
        this.updateFormUI({
          "key": "SET_BENEFICIARY_DETAILS",
          "responseData":{"selectedRowData": selectedRowData,
          				  "infinityUserContractsData": infinityUserContractsData}
         });
      }
    },


    /**
         * onClickACHFileViewDetails : onclick action for the View Details for ACH File
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventobject - JSON object of the button which triggered the event
         * @param {JSON Object} context - segment details for the selected or the triggered event
         * @return {}
         * @throws {}
         */
    onClickACHFileViewDetails: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
      this.achFileViewDetails(selectedRowData);
    },


    /**
         * achFileViewDetails : UI setup for showing the Selected ACH File Details
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventobject - JSON object of the button which triggered the event
         * @param {JSON Object} context - segment details for the selected or the triggered event
         * @return {}
         * @throws {}
         */
    achFileViewDetails: function(data) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxImgPrintAch.setVisibility(false);
      this.view.flxImgDownloadAch.setVisibility(false);

      var fileACKData = {
        "File Name": data.FileName.toolTip,
        "Status": data.FileStatus,
        "Uploaded by": data.userName.toolTip,
        "Upload date": data.UpdatedDateAndTime,
        "Total Debit Amount": CommonUtilities.formatCurrencyWithCommas(data.TotalDebitAmount, false),
        "Total Credit Amount": CommonUtilities.formatCurrencyWithCommas(data.TotalCreditAmount, false),
        "Number of Debits": data.NumberOfDebits,
        "Number of Credits": data.NumberOfCredits,
        "Number of Prenotes": data.NumberOfPrenotes,
        "Number of Records": data.NumberOfRecords
      };

      this.view.lblFormatTypeValue.text = data.FileFormatType;
      this.view.lblRequestTypeValue.text = data.FileRequestType;
      this.view.lblFileNameAck.text = data.FileName.toolTip;

      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      this.showACHFileUploadAck(fileACKData);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
        " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      if (kony.sdk.isNullOrUndefined(data.Request_id) || kony.sdk.isEmptyObject(data.Request_id)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = data.Status;
        this.fetchRequestHistoryData(data.Request_id);
      }
      this.view.flxAcknowledgementContainer.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.viewAchFiles");
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
      this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_FILES_TAB
      });

      if (!kony.sdk.isNullOrUndefined(data.flxACHFileActions) && data.amICreator === "true" && data.amIApprover === "true" && data.FileStatus.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
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
        this.view.ApprovalFormActions.btnOption.onClick = this.approveACHFileFromACH.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);

        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.isVisible = true;
        this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHFileApprovalViewDetails.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
      } else if (!kony.sdk.isNullOrUndefined(data.flxACHFileActions) && data.amICreator === "true" && data.FileStatus.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
        this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw");
        this.view.ApprovalFormActions.btnNext.isVisible = true;
        this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnNext.hoverSkin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnNext.onClick = this.withdrawRequest.bind(this, data, BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE);
      } else if (!kony.sdk.isNullOrUndefined(data.flxACHFileActions) && data.amIApprover === "true" && data.FileStatus.toLowerCase() === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending").toLowerCase()) {
        this.view.ApprovalFormActions.btnNext.isVisible = false;
        this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
        this.view.ApprovalFormActions.btnOption.isVisible = true;
        this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.ACH_NEXT_BUTTON_SKIN;
        this.view.ApprovalFormActions.btnOption.onClick = this.approveACHFileFromACH.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE);

        this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        this.view.ApprovalFormActions.btnCancel.isVisible = true;
        this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.ACH_NEXT_BUTTON_WHITE_SKIN;
        this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHFileApprovalViewDetails.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE);

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
        "achFileId": data.ACHFileID
      });
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    achFileViewDetailsApprovals: function(data) {
      FormControllerUtility.showProgressBar(this.view);
      this.achData = data;
      this.view.flxImgPrintAch.setVisibility(false);
      this.view.flxImgDownloadAch.setVisibility(false);
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
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.btnPendingAprrovers.setVisibility(false);
      }
      this.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(scope, data);           
      scope.view.imgPopupclose.onTouchEnd = scope.pendingApproversVisibility;
      scope.view.btnClose.onClick = scope.pendingApproversVisibility;
      this.view.lblFormatTypeValue.text = data.fileType;
      this.view.lblRequestTypeValue.text = data.requestType;
      this.view.lblFileNameAck.text = data.FileName;

      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      this.showACHFileUploadAck(fileACKData);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
        " " + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      if (kony.sdk.isNullOrUndefined(data.requestId) || kony.sdk.isEmptyObject(data.requestId)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = data.Approver;
        this.fetchRequestHistoryData(data.requestId);
      }
      this.view.flxAcknowledgementContainer.isVisible = false;
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
         * showApprovedACHFile : function to show Ack screen for ACH Files When Approved
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showApprovedACHFile: function(uiModel) {

      if (uiModel.key == BBConstants.APPROVED_ACH_FILE_ACK) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (uiModel.key == BBConstants.ACH_DASHBOARD_APPROVED_ACHFILE) {
        this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));
      }
      this.achFileViewDetails(uiModel.responseData);
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") + " " +
                         kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Approved").toLowerCase() + " \n " +
                         kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") + uiModel.responseData.ACHFileID);

      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS,
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
        FormControllerUtility.hideProgressBar(this.view);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showRejectedACHFile : function to show Ack screen for ACH File When Rejected
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showRejectedACHFile: function(uiModel) {

      if (uiModel.key == BBConstants.REJECTED_ACH_FILE_ACK) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (uiModel.key == BBConstants.ACH_DASHBOARD_REJECTED_ACHFILE) {
        this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));
      }

      this.achFileViewDetails(uiModel.responseData);
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
                         kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected").toLowerCase() +
                         " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                         uiModel.responseData.ACHFileID);

      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_FILES_PENDING_APPROVALS,
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
        FormControllerUtility.hideProgressBar(this.view);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showWithdrawnACHFile : function to show Ack screen for ACH File When Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showWithdrawnACHFile: function(uiModel) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));
      this.achFileViewDetails(uiModel.responseData);
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACHFile") +
                         kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn").toLowerCase() +
                         " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                         uiModel.responseData.ACHFileID);

      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToRequests");
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_FILES_REQUESTS,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBRequestsDashboard",
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
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    //******************************************************************* ACH TRANSACTION ACTIONs & ACKNOWLEDGMENT ********************************************************//

    /**
         * approveACHTransaction : action to approve an ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventObject - Object triggered by the widget
         * @param {JSON Object} context - segment context
         * @return {}
         * @throws {}
         */
    approveACHTransaction: function(selectedRowData, successKey) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule").presentationController.writeDataStore("selectedRowData",selectedRowData);
      var ACHTransactionId = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": ACHTransactionId,
        "featureActionId":featureActionId,
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
      //this.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.approveACHTransactions(navObj);
    },
    approveACHTransactionViewDetails: function(selectedRowData, successKey) {
      var ACHTransactionId = selectedRowData["requestId"];
      var featureActionId = selectedRowData["featureActionId"];
      var req = {
        "requestId": ACHTransactionId,
        "featureActionId": featureActionId,
        "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),

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
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      // this.ApprovalRequestsModule.presentationController.approveACHTransactions(navObj);
    },


    /**
         * rejectACHTransaction : show an pop - up to confirm Reject ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} eventObject - Object triggered by the widget
         * @param {JSON Object} context - segment context
         * @return {}
         * @throws {}
         */
    rejectACHTransaction: function(selectedRowData, successKey) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule").presentationController.writeDataStore("selectedRowData",selectedRowData);
      var Request_id = selectedRowData["requestId"];
      var faetureActionId = selectedRowData["featureActionId"] ;
      var param ={
        "requestId":Request_id,
        "featureActionId":faetureActionId
      };

      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions"),
        "msg": kony.i18n.getLocalizedString("i18n.konybb.myApproval.RejectTransConfirm"),
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.rejectACHTransactionService.bind(this, param, successKey));
    },


    /**
         * rejectACHTransactionService : reject the ACH Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {string} request_id  - id of the ACH Transaction to be deleted
         * @return {}
         * @throws {}
         */
    rejectACHTransactionService: function(param, successKey) {
      var Comments = this.view.flxPopup.trComments.text;
      var req = {
        "requestId": param.requestId,
        "featureActionId": param.featureActionId,
        "comments": Comments
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
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHTransactions(navObj);
    },

    fetchRequestHistoryData: function(requestId) {
      var navObj = {
        requestData: {
          "Request_id": requestId
        },
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
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

    showRequestHistoryData: function(segRowData) {
      this.view.flxApprovalHistoryContent.isVisible = true;
      this.view.flxApprovalsHistoryErrorMessage = false;
      var breakpoint = kony.application.getCurrentBreakpoint();
      if (breakpoint === 640 || orientationHandler.isMobile) {
        this.view.segApprovalDetails.rowTemplate = "flxApprovalHsitoryInformation";
        this.view.segApprovalDetails.sectionHeaderTemplate = "flxempty";
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
          segRowData.forEach(function(record) {
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
            record.flxApprovalHsitoryInformation = {
              "height" : "60dp"
            },
              record.lblApprovalInformationDateVal = {
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
            record.lblApprovalInformationCommentsVal = {
              "text": commentsValue,
              "skin": skinValue,
              //"left": (breakpoint === 640 || orientationHandler.isMobile) ? "80%" : "73%"
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
            record.flxApprovalsHistoryHeader = {
              skin : "slFboxffffff"
            };

          });
          var dataMap = {
            "flxApprovalHsitoryInformation" : "flxApprovalHsitoryInformation",
            "imgDropdown": "imgDropdown",
            "flxApprovalsHistoryHeader" : "flxApprovalsHistoryHeader",
            "flxHistoryInforamtion" :"flxHistoryInforamtion",
            //  "flxApprovalsInformationMain": "flxApprovalsInformationMain",
            "lblApprovetypeval": "userName",
            "lblSentByVal": "Action",
            "lblApprovalInformationDate" : "lblApprovalInformationDate" ,
            "lblApprovalInformationComments" : "lblApprovalInformationComments",
            "lblApprovalInformationDateVal": "lblApprovalInformationDateVal",
            "lblApprovalInformationCommentsVal": "lblApprovalInformationCommentsVal",
          };
          var segDataModel = [
            [{}, segRowData]
          ];
          this.view.segApprovalDetails.widgetDataMap = dataMap;
          this.view.segApprovalDetails.setData(segDataModel);
        }
      } else {
        var signatoryVisiblility = false;
        if(!(kony.sdk.isNullOrUndefined(this.selectedRowData))){
          if(this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true){
            signatoryVisiblility = true;
          }else{
            signatoryVisiblility = false;    
          }
        }
        if(!(kony.sdk.isNullOrUndefined(this.achData))){
          if(this.achData.isGroupMatrix === "true" || this.achData.isGroupMatrix === true){
            signatoryVisiblility = true;
          }else{
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
          if(!kony.sdk.isNullOrUndefined(this.selectedRowData)){
            if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
              var signatoryColumnVisibility = true;
            } else {
              signatoryColumnVisibility = false;
            }
          }
          if(!kony.sdk.isNullOrUndefined(this.achData)){
            if (this.achData.isGroupMatrix === "true" || this.achData.isGroupMatrix === true) {
              signatoryColumnVisibility = true;
            } else {
              signatoryColumnVisibility = false;
            }
          }
          if(segRowData[segRowData.length-1].Status === "Approval Pending")
            this.view.lblApprovalStatusValue.text = kony.i18n.getLocalizedString("i18n.accounts.pending");
          else{
            this.view.lblApprovalStatusValue.text = segRowData[segRowData.length-1].Status;
            if (this.selectedRowData.isGroupMatrix === "true" || this.selectedRowData.isGroupMatrix === true) {
              this.view.btnPendingAprrovers.setVisibility(false);
            }
          }    
          var break_point = kony.application.getCurrentBreakpoint();
          if (break_point === 640 || orientationHandler.isMobile) {
            this.view.btnPendingAprrovers.setVisibility(false);
          }
          segRowData.forEach(function(record) {
            var skinValue = (breakpoint === 640 || orientationHandler.isMobile) ? "sknLblSSP42424213px" : "bbSknLbl424242SSP15Px";
            var actiontsValue = (kony.sdk.isNullOrUndefined(record.Actionts)) ? "N/A" : CommonUtilities.getDateAndTimeInUTC(record.Actionts);
            var userNameValue = (kony.sdk.isNullOrUndefined(record.userName)) ? "N/A" : record.userName;
            if (record.Action === "Approved") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.ApprovedRequest");
            } else if (record.Action === "Pending") {
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.createdRequest");
            }   else if (record.Action === "Rejected"){
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected");
            } else if (record.Action === "Withdrawn"){
              record.Action = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
            }
            var actionValue = (kony.sdk.isNullOrUndefined(record.Action)) ? "N/A" : record.Action;
            //  var status = record.Status === "Rejected" ? false : true; // set status as true if it is not rejected. || status
            var commentsValue = (kony.sdk.isNullOrUndefined(record.Comments)) ? "N/A" : record.Comments;
            if(record.groupName !== undefined){
              var signatoryGroupValue = record.groupName;
            }else{
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
        for(var i=0; i<segRowData.length; i++){
          if(segRowData[i].Status !== "Approval Pending"){
            segRowViewData.push(segRowData[i])
          }
        }
        var segDataModel = [
          [segHeader, segRowViewData]
        ];
        this.view.segApprovalDetails.widgetDataMap = dataMap;
        this.view.segApprovalDetails.setData(segDataModel);
        this.view.lblApproveCountVal.text = this.getNumberOfApprovals(segRowViewData).toString();
        this.view.lblRejectCountVal.text = this.getNumberOfRejected(segRowViewData).toString();
      }
      this.view.flxApprovalsHistoryInformation.setVisibility(true);
      this.view.flxApprovalrequestHistorySection.setVisibility(true);
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
    showOrHideMobile: function(content) {
      var row = content.row;
      var sectionIndex = content.section;
      var imgDropdown = this.view.segApprovalDetails.data[sectionIndex][1][row].imgDropdown;
      var flxApprovalHsitoryInformation = this.view.segApprovalDetails.data[sectionIndex][1][row].flxApprovalHsitoryInformation;
      var flxApprovalsHistoryHeader = this.view.segApprovalDetails.data[sectionIndex][1][row].flxApprovalsHistoryHeader ; 
      if (imgDropdown.text === "O") {
        imgDropdown = {
          text: "P",
          skin: "sknLblFontTypeIcon1a98ff12pxOther"
        };
        flxApprovalHsitoryInformation.height = kony.flex.USE_PREFERED_SIZE;//"180dp";
        flxApprovalsHistoryHeader.skin = "slFboxBGf8f7f8B0" ;
      } else {
        imgDropdown = {
          text: "O",
          skin: "sknLblFontTypeIcon1a98ff12pxOther"
        };
        flxApprovalHsitoryInformation.height = "60dp";
        flxApprovalsHistoryHeader.skin = "slFboxffffff" ;
      }
      var data = this.view.segApprovalDetails.data;
      var rowDataUpdate = data[sectionIndex][1][row];
      rowDataUpdate["flxApprovalHsitoryInformation"] = flxApprovalHsitoryInformation;
      rowDataUpdate["imgDropdown"] = imgDropdown;
      rowDataUpdate["flxApprovalsHistoryHeader"] = flxApprovalsHistoryHeader;
      this.view.segApprovalDetails.setDataAt(rowDataUpdate, row, sectionIndex);
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i][1].length; j++) {
          if (j === row) {} else {

            data[i][1][j].flxApprovalHsitoryInformation.height = "60dp";
            data[i][1][j].flxApprovalHsitoryInformation.skin = "slFboxffffff";
            data[i][1][j].imgDropdown.text = "O";
            data[i][1][j].imgDropdown.skin = "sknLblFontTypeIcon1a98ff12pxOther";
            data[i][1][j].flxApprovalsHistoryHeader.skin = "slFboxffffff" ;
            this.view.segApprovalDetails.setDataAt(data[i][1][j], j, i);
          }
        }
      }
      this.adjustScreen(0);
    },

    showRequestHistoryFailure: function() {
      this.view.flxApprovalHistoryContent.isVisible = false;
      this.view.flxApprovalsHistoryErrorMessage = true;
      this.view.lblApprovalHistoryError.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.UnableToFetchData");
      FormControllerUtility.hideProgressBar(this.view);
    },

    /**
            	View Details for TEmplate and Transactions. Needs to relooked.
            **/
    onClickTransactionViewDetails: function(eventobject, context) {
      var row = context.rowIndex;
      var section = context.sectionIndex;
      var selectedRowData = this.view.TabPaneNew.TabBodyNew.getData()[section][1][row];
      this.achTransactionViewDetails(selectedRowData);
      this.setupUIForACK("", true);
      this.view.flxAcknowledgementContainer.setVisibility(false);
    },

    achTransactionViewDetails: function(data, isApproved, isReject) {
      var tempData = false;
      if(!kony.sdk.isNullOrUndefined(isApproved)) {
        tempData = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule").presentationController.readDataStore("selectedRowData");
      }
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
        kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      this.view.flxImgPrintAch.setVisibility(false);
      this.view.flxImgDownloadAch.setVisibility(false);


      this.view.flxAcknowledgementContainer.isVisible = false;

      var templateData = {
        "Template Name": data.TemplateName.toolTip || data.TemplateName,
        "Transaction Type": data.TransactionTypeValue,
        "Request Type": data.RequestType,
        "Debit Account": (tempData != false)?tempData.accountId.text:this.achData.accountId,
        "Created On": data.CreatedOn,
        "Created By": data.userName.toolTip,
        "Effective Date": CommonUtilities.getFrontendDateString(data.EffectiveDate, "mm/dd/yyyy"),
        "Maximum transfer Amount": CommonUtilities.formatCurrencyWithCommas(
          (data.MaxAmount && !kony.sdk.isEmptyObject(data.MaxAmount)) ?
          data.MaxAmount : data.Amount,
          false),
        "Status": data.Status
      };
      if (data.Status == "Executed") {
        templateData["Confirmation Number"] = data.ConfirmationNumber;
      } else if (data.Status.toLowerCase() == BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() ) {
        templateData["Reference Id"] = data.Transaction_id;
      }

      if (data.StatusValue === "Approved") {
        templateData["Approver"] = kony.sdk.isNullOrUndefined(data.Approver) ? "N/A" : data.Approver.toolTip;
      } else if (data.StatusValue === "Rejected") {
        templateData["Rejected By"] = kony.sdk.isNullOrUndefined(data.Approver) ? "N/A" : data.Approver.toolTip;
      } else {
        //do not show Approver/Rejected By in details
      }

      this.view.NonEditableDetailsNew.setData(templateData, true);
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
      if (kony.sdk.isNullOrUndefined(data.Request_id)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(data.Request_id);
        this.view.lblApprovalStatusValue.text = data.Approver;
      }
      this.view.ApprovalFormActions.btnBack.isVisible = true;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.backToTransactions");
      this.view.ApprovalFormActions.btnBack.onClick = this.updateFormUI.bind(this, {
        "key": BBConstants.SHOW_ACH_TRANSACTIONS_TAB
      });
      this.view.ApprovalFormActions.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
      if (data.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase() && !isApproved && kony.sdk.isNullOrUndefined(isReject)) {
        if (!kony.sdk.isNullOrUndefined(data.amIApprover) && (data.amIApprover === "true")) {
          this.view.ApprovalFormActions.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.Approve");
          this.view.ApprovalFormActions.btnOption.isVisible = true;
          this.view.ApprovalFormActions.btnOption.skin = ViewConstants.SKINS.NORMAL;
          this.view.ApprovalFormActions.btnOption.hoverSkin = ViewConstants.SKINS.NORMAL;
          this.view.ApprovalFormActions.btnOption.onClick = this.approveACHTransactionACH.bind(this, data, BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION);
          this.view.ApprovalFormActions.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
          this.view.ApprovalFormActions.btnCancel.isVisible = true;
          this.view.ApprovalFormActions.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
          this.view.ApprovalFormActions.btnCancel.onClick = this.rejectACHTransactionACH.bind(this, data, BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION);
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
        "Transaction_id": data.Transaction_id
      });

      this.view.forceLayout();
      this.adjustScreen(0);
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
      this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalRequestsModule.presentationController.rejectACHTransactions(navObj);
    },


    achTransactionViewDetailsApprove: function(data, isApproved) {
      this.achData = data;
      // this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
      //     kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
      //     kony.i18n.getLocalizedString("i18n.common.ViewDetails");
      this.view.flxImgPrintAch.setVisibility(false);
      this.view.flxImgDownloadAch.setVisibility(false);


      this.view.flxAcknowledgementContainer.isVisible = false;

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

      this.view.NonEditableDetailsNew.setData(templateData, true);
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction");
      if (kony.sdk.isNullOrUndefined(data.requestId)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(data.requestId);
        this.view.lblApprovalStatusValue.text = data.Status;
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
      if (break_point === 640 || orientationHandler.isMobile) {
        this.view.btnPendingAprrovers.setVisibility(true);
      }

      this.view.btnPendingAprrovers.onClick = this.buttonPendingApprovers.bind(this,data);	
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


    /**
         * showApprovedACHTransaction : function to show Ack screen for ACH Transaction When Approved
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showApprovedACHTransaction: function(uiModel, isApproved) {
      if (uiModel.key == BBConstants.APPROVED_ACH_TRANSACTION_ACK) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (uiModel.key == BBConstants.ACH_DASHBOARD_APPROVED_ACHTRANSACTION) {
        this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));
      }
      uiModel.responseData.userName = {
        text: CommonUtilities.truncateStringWithGivenLength(uiModel.responseData.userName, 15),
        toolTip: uiModel.responseData.userName
      };
      this.view.ApprovalFormActions.enableNextButton();
      this.achTransactionViewDetails(uiModel.responseData, isApproved);
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
                         kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Approved").toLowerCase() +
                         " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                         uiModel.responseData.Transaction_id);
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS,
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
        FormControllerUtility.hideProgressBar(this.view);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showRejectedACHTransaction : function to show Ack screen for ACH Transaction When Rejected
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showRejectedACHTransaction: function(uiModel) {
      if (uiModel.key == BBConstants.REJECTED_ACH_TRANSACTION_ACK) {
        this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.Common.MyApprovals"));
      } else if (uiModel.key == BBConstants.ACH_DASHBOARD_REJECTED_ACHTRANSACTION) {
        this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH"), kony.i18n.getLocalizedString("i18n.konybb.ACH.Approvals"));
      }
      uiModel.responseData.userName = {
        text: CommonUtilities.truncateStringWithGivenLength(uiModel.responseData.userName, 15),
        toolTip: uiModel.responseData.userName
      };
      this.achTransactionViewDetails(uiModel.responseData, false, false);
      this.view.flxApprovalsHistoryInformation.setVisibility(false);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.ApprovalFormActions.enableNextButton();
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
                         kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected").toLowerCase() +
                         " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                         uiModel.responseData.Transaction_id);
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBApprovalsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_TRANSACTIONS_PENDING_APPROVALS,
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
        FormControllerUtility.hideProgressBar(this.view);
        this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
        this.ApprovalsReqUIModule.presentationController.noServiceNavigate(navObj);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showWithdrawnACHTransaction : function to show Ack screen for ACH Transaction When Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} uiModel - Key for navigation and ResponseData to show in ACK
         * @return {}
         * @throws {}
         */
    showWithdrawnACHTransaction: function(uiModel) {
      this.view.customheader.customhamburger.activateMenu("Approvals Requests", kony.i18n.getLocalizedString("i18n.konybb.myRequests.Header"));
      uiModel.responseData.userName = {
        text: CommonUtilities.truncateStringWithGivenLength(uiModel.responseData.userName, 15),
        toolTip: uiModel.responseData.userName
      };
      this.achTransactionViewDetails(uiModel.responseData);
      this.view.flxApprovalrequestHistorySection.setVisibility(false);
      this.view.ApprovalFormActions.enableNextButton();
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransaction") +
                         " " + kony.i18n.getLocalizedString("i18n.konybb.hasBeenSuccessfully") +
                         kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn").toLowerCase() +
                         " \n " + kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceNumber") +
                         uiModel.responseData.Transaction_id);
      this.view.ApprovalFormActions.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToRequests");
      this.view.ApprovalFormActions.btnBack.onClick = function() {
        var scopeObj = this;
        FormControllerUtility.showProgressBar(this.view);
        var navObj = {
          requestData: "",
          onSuccess: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: BBConstants.FETCH_ACH_TRANSACTIONS_REQUESTS,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBRequestsDashboard",
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
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    //*********************************************************************** GENERAL TRANSACTIONS ACKNOWLEDGE *********************************************************//

    /**
         * generalTransactionsAcknowledgement : function to show Ack screen for General Transactions When Approved/ Rejected/ Withdrawn
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} context - data of the general transaction
         * @return {}
         * @throws {}
         */
    generalTransactionsAcknowledgement: function(context, formName, contextKey) {
      this.context.Data = context;
      this.view.ApprovalFormActions.enableNextButton();
      this.showACKForOtherTransactions(this.context.Data);
      var transactionType = this.context.Data.featureActionName;
      if(contextKey === BBConstants.FETCH_TRANSACTIONS_PENDING_APPROVALS){
        //this.view.flxContentHeader.lblContentHeader.text = context.contentHeaderName + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + kony.i18n.getLocalizedString("i18n.common.ViewDetails");
        this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.approvals.RequestDetails");
        
      }
      else{
       this.view.flxContentHeader.lblContentHeader.text = transactionType + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        
      }
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.CardManagement.Back");
      this.view.ApprovalFormActions.btnNext.onClick = function() {
        var scopeObj = this;
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
    },

    /**
         * approveTransaction : onClick of Approve a General Transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Selected segment Row Data
         * @return {}
         * @throws {}
         */
    approveGeneralTransaction: function(selectedRowData, infinityUserContractsData) {
      var TransactionId = selectedRowData["requestId"];
      var featureActionID = selectedRowData["featureActionId"];
      var scopeObj = this;
      var params = {
        "requestId": TransactionId,
        "featureActionId":featureActionID,
        "Comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),

      };
      var navObj = {
        requestData: params,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.APPROVED_TRANSACTION_ACK,
            responseData: selectedRowData
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
      // scopeObj.ApprovalsReqModule.presentationController.approveTransactions(navObj);
      scopeObj.ApprovalRequestsModule.presentationController.approveTransactions(navObj);
      if(this.beneficiaryActionIdArray.includes(featureActionID)){
        this.updateFormUI({
          "key": "SET_BENEFICIARY_DETAILS",
          "responseData":{"selectedRowData": selectedRowData,
          				  "infinityUserContractsData": infinityUserContractsData}
         });
      }
    },

    approveChequeBookRequest: function(selectedRowData) {
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
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.APPROVED_TRANSACTION_ACK,
            responseData: selectedRowData
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
      scopeObj.ApprovalRequestsModule.presentationController.approveChequeBookRequest(navObj);
    },

    /**
            	funciton to show acknowledgement page for Transactions
            **/
    showACKForOtherTransactions: function(transactionData) {
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails");
      this.setupUIForACK("");
      if(!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && transactionData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE){
        var formattedData = {};
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.RequestAccount")] = transactionData.accountId;
        formattedData[kony.i18n.getLocalizedString("i18n.accounts.TransactionType")] = transactionData.featureActionName;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.NoOfBooks")] = transactionData.noOfBooks;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee")] = transactionData.amount;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentDate")] = transactionData.sentDate;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentBy")] = transactionData.sentBy;
        formattedData[kony.i18n.getLocalizedString("i18n.CardManagement.requestId")] = transactionData.transactionId;
        formattedData[kony.i18n.getLocalizedString("i18n.accountDetail.customerName")] = transactionData.customerName;
        this.view.NonEditableDetailsNew.setData(formattedData, true);
      }
      else{
        var formattedData = {};
        formattedData[kony.i18n.getLocalizedString("i18n.wealth.datePicker.from")] = transactionData.accountId || transactionData.DebitOrCreditAccount;

        if(!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)){
          formattedData[kony.i18n.getLocalizedString("kony.i18n.common.beneficiary")] = transactionData.toAccountName;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.common.accountNumber")] = transactionData.payee||transactionData.Payee;

        if(!kony.sdk.isNullOrUndefined(transactionData.paymentType) && !kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)  && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)){
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod")] = transactionData.paymentType;
        }

        if(!kony.sdk.isNullOrUndefined(transactionData.swiftCode) && transactionData.swiftCode.length >0){
          formattedData[kony.i18n.getLocalizedString("i18n.accounts.swiftCode")] = transactionData.swiftCode;
        }

        if(!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)  && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)){
          formattedData[kony.i18n.getLocalizedString("i18n.transfers.bankAddress")] = transactionData.beneficiaryBankAddress;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = CommonUtilities.formatCurrencyWithCommas(transactionData.transactionAmount, false, transactionData.transactionCurrency);

        if ((transactionData.lblExchangeRateVal.isVisible)) {
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate")] = transactionData.lblExchangeRateVal;
        }

        if(transactionData.lblServiceChargeVal.isVisible){
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeeBreakdown")] = transactionData.lblServiceChargeVal;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.TotalDebitAmt")] = CommonUtilities.formatCurrencyWithCommas(transactionData.TotalDebitAmount, false, transactionData.fromAccountCurrency) || CommonUtilities.formatCurrencyWithCommas(transactionData.Amount, false);

        if(!kony.sdk.isNullOrUndefined(transactionData.paidBy) && !kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)  && !transactionData.featureActionId.includes(BBConstants.INTRA_BANK_FUND_TRANSFER)){
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy")]=transactionData.paidBy;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.transfers.lblFrequency")] = transactionData.Frequency;
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.SendOn")] = transactionData.processingDate || transactionData.TransactionDate;

        if(transactionData.lblCreditValueDateVal.isVisible && transactionData.Frequency === kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
          formattedData[kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate")] = transactionData.lblCreditValueDateVal;
        }

        if(transactionData.Frequency !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
          formattedData[kony.i18n.getLocalizedString("i18n.transfers.end_date")] = transactionData.frequencyEndDate;
        }
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails")] = transactionData.paymentDetails;
        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryNickname")] = transactionData.beneficiaryNickName;

        if(!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && !transactionData.featureActionId.includes(BBConstants.TRANSFER_BETWEEN_OWN_ACCOUNT)){
          formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryAddress")] = transactionData.beneficiaryAddress;
        }

        formattedData[kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference")] = transactionData.confirmationNumberVal || transactionData.confirmationNumber || transactionData.transactionIdVal ||transactionData.Transaction_id;
        formattedData[kony.i18n.getLocalizedString("i18n.accounts.TransactionType")] = transactionData.featureName;
        formattedData[kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")] = transactionData.Request_id;
        formattedData[kony.i18n.getLocalizedString("i18n.accountDetail.customerName")] = transactionData.customerName;

        this.view.NonEditableDetailsNew.setData(formattedData, true);

        if (Array.isArray(transactionData.fileNames)  && transactionData.fileNames.length > 0) {
          this.view.NonEditableDetailsNew.flxSupportingDocuments.flxSupportingDocumentsValue.removeAll();
          this.view.NonEditableDetailsNew.flxSupportingDocuments.flxSupportingDocumentsKey.lblSupportingDocumentsKey.text = kony.i18n.getLocalizedString("i18n.TransfersEur.SupportingDocuments") + ":";
          this.view.NonEditableDetailsNew.flxSupportingDocuments.setVisibility(true);

          var break_point = kony.application.getCurrentBreakpoint();
          if (break_point === 640 || orientationHandler.isMobile) {
            this.view.NonEditableDetailsNew.flxSupportingDocuments.flxSupportingDocumentsKey.lblSupportingDocumentsKey.skin = "sknLblSSP72727213px";
            this.view.NonEditableDetailsNew.flxSupportingDocuments.width = "96.6%";
            this.view.NonEditableDetailsNew.flxSupportingDocuments.centerX = "50%";
            this.view.NonEditableDetailsNew.flxError.width = "96.6%";
            this.view.NonEditableDetailsNew.flxError.centerX = "50%";
            this.view.NonEditableDetailsNew.flxSupportingDocuments.flxSupportingDocumentsValue.left = "18%";
          }
          for (var i = 0; i < transactionData.fileNames.length; i++) {
            var obj = {
              "fileId" : transactionData.fileNames[i].fileId, 
              "fileNameValue" : transactionData.fileNames[i].fileNameValue
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
              "onTouchEnd" :  this.ApprovalRequestsModule.presentationController.downloadAttachments.bind(this, true,obj, null, "frmApprovalViewDetails")
            }, {
              "contentAlignment": constants.CONTENT_ALIGN_CENTER,
              "padding": [2, 0, 2, 0],
              "paddingInPixel": false
            }, {});
            this.view.NonEditableDetailsNew.flxSupportingDocuments.flxSupportingDocumentsValue.add(lblSupportingDocumentName);
          }
        } else {
          this.view.NonEditableDetailsNew.flxSupportingDocuments.setVisibility(false);
        }
      }

      if (kony.sdk.isNullOrUndefined(transactionData.Request_id)) {
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(transactionData.Request_id);
      }
      this.view.NonEditableDetailsNew.isVisible = true;
      this.view.flxPaymentInstruction.isVisible = false;
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxDateContainer.isVisible = false;
      this.view.forceLayout();
      this.adjustScreen(20);
    },

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


    /**
         * validateTemplateName : This method is used to validate the template name
         * @member of {frmApprovalViewDetailsController}
         * @param {string} templateName - template Name
         * @return {}
         * @throws {}
         */
    validateTemplateName: function(templateName) {
      var expression = /^[a-zA-Z]+[\_\ \da-zA-z]*$/;
      return templateName.match(expression);
    },


    /**
         * validateTemplateDescription : This method is used to validate the template description
         * @member of {frmApprovalViewDetailsController}
         * @param {string} templateDesc - template Description
         * @return {}
         * @throws {}
         */
    validateTemplateDescription: function(templateDesc) {
      var expression = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\ ]+$/;
      return templateDesc.match(expression);
    },


    /**
         * validateTypes : This method is used to validate the template type, request type and type of the account that is selected by the user
         * @member of {frmApprovalViewDetailsController}
         * @param {string} listBoxRef - listbox name
         * @return {}
         * @throws {}
         */
    validateTypes: function(listBoxRef) {
      return listBoxRef.selectedKey !== "-1" && listBoxRef.selectedKey !== null;
    },


    /**
         * validateTypes : This method is used to validate the amount entered by the user for creating a transaction
         * @member of {frmApprovalViewDetailsController}
         * @param {string} amount - amount
         * @return {}
         * @throws {}
         */
    validateAmount: function(amount) {
      var expression = /^(\d+|\d{1,3}(,\d{3})*)((\.|\,)\d+)?$/;
      if (amount.match(expression)) {
        return true;
      } else {
        return false;
      }
    },

    /**
         * validateEffectiveDate : This method validates the effective date
         * @member of {frmApprovalViewDetailsController}
         * @param {JSOn Object} calWid - calendar widget Object
         * @return {}
         * @throws {}
         */
    validateEffectiveDate: function(calWid) {
      return (calWid.Date !== null);
    },

    /**
         * validateFormFields : Following method will enable or disable the proceed button based on the values entered in the fields
         * @member of {frmApprovalViewDetailsController}
         * @param { string } UIType - Template or Transaction
         * @return {}
         * @throws {}
         */
    validateFormFields: function(UIType) {
      var enableButton;
      //       if(applicationManager.getConfigurationManager().isCombinedUser === "true" || applicationManager.getConfigurationManager().isSMEUser === "true"){
      enableButton = !kony.sdk.isNullOrUndefined(this.view.lblSelectAccount.text) && this.view.lblSelectAccount.text !== "" ? true : false;
      //       } else {
      //       	enableButton = this.validateTypes(this.view.lstbAccount);
      //       }
      enableButton = enableButton && this.validateAmount(this.view.tbxMaxAmt.text) && (kony.sdk.isNullOrUndefined(this.selectedAccountMaxTransactionLimit) || Number(this.view.tbxMaxAmt.text) <= Number(this.selectedAccountMaxTransactionLimit));

      if (this.view.flxCreateDetails.isVisible) {
        enableButton = enableButton && this.validateTypes(this.view.lstbTemplateType);
        enableButton = enableButton && this.validateTypes(this.view.lstbRequestType);
        if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
          enableButton = enableButton && this.validateEffectiveDate(this.view.calEffectiveDate);
        } else if (UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
          enableButton = enableButton && this.validateTemplateName(this.view.tbxTemplateName.text) && this.validateTemplateDescription(this.view.tbxTemplateDescription.text);
        }
      } else {
        // no further validation required.
      }
      if (enableButton) {
        this.view.createFlowFormActionsNew.enableNextButton();
      } else {
        this.view.createFlowFormActionsNew.disableNextButton();
      }
    },


    /**
         * checkTotalAmountAgainstMaxAmount : function to check the total amount against the Max Amount and enable to poceed
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} templateData - templateData.MaxAmount contains the stored Maximum Amount possible in the Template/Transaction
         * @return {}
         * @throws {}
         */
    checkTotalAmountAgainstMaxAmount: function(templateData, context) {
      this.toggleErrorMessage("", false, 0);  // Reset already existing error messages if any        
      if (this.view.TemplateRecordsNew.TabBodyNew.isAllFieldsAreValid()) {
        var totalAmount = CommonUtilities.getFloatValueOfCurrency(this.view.TemplateRecordsNew.lblTotalAmount.text);
        var maxAmount = CommonUtilities.getFloatValueOfCurrency(templateData.MaxAmount);
        var requestType = templateData.TemplateRequestTypeValue;
        var recordsData = this.view.TemplateRecordsNew.TabBodyNew.getData();
        if (totalAmount <= maxAmount) {
          this.toggleErrorMessage("", false, 0);
          var templateParams = templateData;

          if (context.UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Template")) {
            templateParams["MaxAmount"] = maxAmount;
            templateParams["TotalAmount"] = totalAmount;
            templateParams.Records = JSON.stringify(this.fetchRecords(requestType, recordsData));
            if (!context.isEdit) {
              this.invokeCreateTemplateService(templateParams);
              this.view.NonEditableDetails.isVisible = false;
              this.view.flxCreateDetails.isVisible = true;
            } else {
              this.invokeCreateTemplateService(templateParams, true);
            }
          } else if (context.UIType === kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction")) {
            templateParams["MaxAmount"] = CommonUtilities.getFloatValueOfCurrency(maxAmount).toString();
            templateParams["TotalAmount"] = totalAmount;
            templateParams.Records = JSON.stringify(this.fetchRecords(requestType, recordsData));
            this.invokeCreateTransactionService(templateParams);
          } else {
            var inputs = {};
            inputs["Template_id"] = templateParams["Template_id"];
            inputs["EffectiveDate"] = templateParams["EffectiveDate"];
            inputs.Records = JSON.stringify(this.fetchRecordsForPayment(templateParams["RequestType"], recordsData));

            if (kony.sdk.isNullOrUndefined(this.limitForCurrentTemplateExecution)) {
              this.toggleErrorMessage(kony.i18n.getLocalizedString("kony.ach.failedToFetchLimit"), true, 66);
            } else if (this.limitForCurrentTemplateExecution.length == 0) {
              this.toggleErrorMessage(kony.i18n.getLocalizedString("kony.ach.noAccountWithTheFeatureAction"), true, 66);
            } else if (totalAmount > this.limitForCurrentTemplateExecution) {
              this.displayErrorWhileExecutingTemplate(kony.i18n.getLocalizedString("kony.ach.totalAmountAndLimitComparisonMessage") + " " + this.limitForCurrentTemplateExecution, true);
            } else {
              this.invokeExecuteTemplateService(inputs);
            }

          }
        } else {
          this.displayErrorWhileExecutingTemplate(kony.i18n.getLocalizedString("i18n.konybb.ach.TotalAmountExceeding"), true);
        }
      }
    },

    setLimitForCurrentTemplateExecution: function(accounts) {
      this.limitForCurrentTemplateExecution = [];
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].accountId == this.accountForTemplateExecution) {
          this.limitForCurrentTemplateExecution = accounts[i]["limits"]["MAX_TRANSACTION_LIMIT"];
          break;
        }
      }
    },

    displayErrorWhileExecutingTemplate: function(error, toShow) {
      if (toShow) {
        this.view.TemplateRecordsNew.flxTotalAmountCreate.skin = "bbSknFlxBdrff0000Radius3Px";
      } else {
        this.view.TemplateRecordsNew.flxTotalAmountCreate.skin = "skne3e3e3br3pxradius";
      }
      toShow == true ? this.toggleErrorMessage(error, toShow, 66) : this.toggleErrorMessage(error, toShow, 0);
    },


    /**
         * clearUIContent : This method is used to clear the contents of the widgets
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    clearUIContent: function() {
      this.view.tbxTemplateName.text = "";
      this.view.tbxTemplateDescription.text = "";
      this.view.tbxMaxAmt.text = "";
      this.view.txtTransferFrom.setVisibility(true);
      this.view.flxFrom.setVisibility(false);
      this.view.flxPaymentType.setVisibility(true);
      this.view.txtTransferFrom.text = "";
      this.view.txtTransferFrom.placeholder = kony.i18n.getLocalizedString("i18n.ACH.Select");
      this.view.lblSelectAccount.text = "";
      this.view.lblFromAmount.text = "";
      this.view.flxTypeIcon.setVisibility(false);
      this.view.flxTemplateNAme.skin = "skne3e3e3br3pxradius";
      this.view.flxTemplateDescription.skin = "skne3e3e3br3pxradius";
      this.view.flxType.skin = "skne3e3e3br3pxradius";
      this.view.flxRequestType.skin = "skne3e3e3br3pxradius";
      this.view.flxPaymentType.skin = "skne3e3e3br3pxradius";
      this.view.flxMaxAmt.skin = "skne3e3e3br3pxradius";
      this.view.flxEffectiveDate.skin = "skne3e3e3br3pxradius";
    },


    /**
         * generateViewDetailRecords : function to format the ACHFile Data to show in UI
         * @member of {frmApprovalViewDetailsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    generateViewDetailRecords: function(ACHFileData) {
      if (!kony.sdk.isNullOrUndefined(ACHFileData.responseData)) {
        ACHFileData = ACHFileData.responseData;
      }
      var dataRecord = {
        "File Name": ACHFileData.FileName,//.toolTip,
        "Status": ACHFileData.FileStatus,
        "Uploaded by": ACHFileData.userName,//.toolTip,
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
    setupUIForACK: function(successMsg, isNonAcknowledgment) {
      this.view.flxContentDashBoard.isVisible = false;
      this.view.flxTerms.isVisible = false;
      this.view.flxAuthenticator.isVisible = false;
      this.view.flxACHFilesUpload.isVisible = false;
      this.view.flxTransactionDetails.isVisible = true;
      this.view.flxCommonActionsCont.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxAcknowledgementNew.rTextSuccess.text = successMsg;

      this.view.TemplateRecordsNew.btnAddAdditionalDetailsRow.isVisible = false;

      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        if (!kony.sdk.isNullOrUndefined(isNonAcknowledgment) && isNonAcknowledgment) {
          this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
        } else {
          this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        }
        this.view.customheader.lblHeaderMobile.isVisible = true;
      } else {
        this.view.customheader.lblHeaderMobile.isVisible = false;
      }

      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxPaymentInstruction.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxApprovalsHistoryInformation.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxDateContainer.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.TemplateRecordsNew.flxUpdateAmount.isVisible = false;
      this.view.NonEditableDetailsNew.flxSupportingDocuments.setVisibility(false);
      this.view.NonEditableDetailsNew.flxError.setVisibility(false);
	  this.view.flxAcknowledgementNew.imgDownload.src ="bbcloseicon_1.png";
	  this.view.flxAcknowledgementNew.flxImgdownload.setVisibility(true);
	  this.view.flxAcknowledgementNew.flxImgdownload.onClick = this.closeackpopup.bind(this);
    },

    //*******************************************************************  BREAK POINT CHANGE & SERVICE ERROR  ********************************************************//
    responsiveViews: {},
	closeackpopup: function() {
            this.view.flxAcknowledgementContainer.setVisibility(false);
        },

    initializeResponsiveViews: function() {
      this.responsiveViews["flxContentDashBoard"] = this.isViewVisible("flxContentDashBoard");
      this.responsiveViews["flxTransactionDetails"] = this.isViewVisible("flxTransactionDetails");
      this.responsiveViews["flxApprovalrequestHistorySection"] = this.isViewVisible("flxApprovalrequestHistorySection");
      this.responsiveViews["flxCommonActionsCont"] = this.isViewVisible("flxCommonActionsCont");
      this.responsiveViews["flxRequestCreateEditUpdateEditDetails"] = this.isViewVisible("flxRequestCreateEditUpdateEditDetails");
      this.responsiveViews["flxTabPaneContainer"] = this.isViewVisible("flxTabPaneContainer");
      this.responsiveViews["flxACHFilesUpload"] = this.isViewVisible("flxACHFilesUpload");
      this.responsiveViews["flxPaymentType"] = this.isViewVisible("flxPaymentType");
      this.responsiveViews["flxFrom"] = this.isViewVisible("flxFrom");
    },

    isViewVisible: function(container) {
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
    onBreakpointChange: function(width) {
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      var scope = this;
      var responsiveFonts = new ResponsiveFonts();
      this.view.customheader.onBreakpointChangeComponent(width);
      if (break_point === 640 || orientationHandler.isMobile) {
        this.setMobileFilterData();
        this.view.TabPaneNew.flxContentContainer.skin = "sknFlxffffffShadowdddcdcnoradius";
        this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxempty";
        this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHViewRowTemplateMobile";
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(555);
        this.view.customheader.lblHeaderMobile.text = this.view.flxContentHeader.lblContentHeader.text;
        this.view.customheader.lblHeaderMobile.isVisible = true;
        this.view.flxDashboard.skin = "slFbox";
        this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "sknlistbxMobile";
        this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "slFboxffffff";
        this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "bbSknFlxop100Bordere3e3e3Radius3Px";
        var views = Object.keys(this.responsiveViews);
        views.forEach(function(e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        responsiveFonts.setMobileFonts();
      } else {
        views = Object.keys(this.responsiveViews);
        views.forEach(function(e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        responsiveFonts.setDesktopFonts();
        this.view.TabPaneNew.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxACHViewHeader";
        this.view.TabPaneNew.TabBodyNew.segTemplates.rowTemplate = "flxACHViewRowTemplate";
        this.view.TabPaneNew.TabBodyNew.setExpandableRowHeight(202);
        this.view.customheader.lblHeaderMobile.isVisible = false;
        this.view.customheader.lblHeaderMobile.text = "";
        this.view.TabPaneNew.TabSearchBarNew.listBoxViewType.skin = "bbSknListBox424242SSP15px";
        this.view.TabPaneNew.TabSearchBarNew.flxDropDown.skin = "skne3e3e3br3pxradius";
        this.view.TabPaneNew.TabSearchBarNew.flxBoxSearch.skin = "skne3e3e3br3pxradius";
        if (this.view.flxTabPaneContainer.isVisible) {
          this.view.flxDashboard.skin = "slFbox";
        } else {
          this.view.flxDashboard.skin = "slfBoxffffffB1R5";
        }
      }
      this.adjustScreen(0);
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      if(applicationManager.getConfigurationManager().isMicroAppPresent('CampaignMA')){
        this.ApprovalsReqUIModule.presentationController.getAchCampaigns();  
      }

    },

    /**
         * showWithdrawPopup : onclick of withdraw button it shows Pop - Up with the given config
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} selectedRowData - Rowdata of selected row
         * @param {String constant} transactionType - type of transaction
         * @return {}
         * @throws {}
         */
    showWithdrawPopup: function(selectedRowData, transactionType) {
      var inputParams = {
        "Request_id": selectedRowData.Request_id,
        "featureActionId":selectedRowData.featureActionId
      };
      var headerValue;
      var msgValue;

      if (transactionType === BBConstants.WITHDRAWN_TRANSACTION_ACK) {
        headerValue = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
        msgValue = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
      } else if (transactionType === BBConstants.WITHDRAWN_ACH_TRANSACTION_ACK) {
        headerValue = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
        msgValue = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
      } else if (transactionType === BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHTRANSACTION) {
        headerValue = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTransactions");
        msgValue = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
      } else if (transactionType === BBConstants.WITHDRAWN_ACH_FILE_ACK) {
        headerValue = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles");
        msgValue = kony.i18n.getLocalizedString("i18n.konybb.myRequests.FileWithdrawConfirm");
      } else if(transactionType === BBConstants.WITHDRAWN_CHEQUEBOOK_ACK){
        headerValue = kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions");
        msgValue = kony.i18n.getLocalizedString("i18n.konybb.myRequests.TransWithdrawConfirm");
      } else {
        //configure for more transaction types
      }

      var popupConfig = {
        "header": headerValue,
        "msg": msgValue,
        "commentsVisibility": true,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
        "commentsText": ""
      };

      this.showPopup(popupConfig, this.withdrawRequest.bind(this, inputParams, transactionType));
    },

    /**
         * withdrawRequest : call the presentation controller with navigation object to withdraw
         * @member of {frmApprovalViewDetailsController}
         * @param {JSON Object} inputParams - object with request_id and other needed data to withdraw
         * @param {String constant} transactionType - type of transaction
         * @return {}
         * @throws {}
         */
    withdrawRequest: function(inputParams, transactionType) {
      var scopeObj = this;
      this.hidePopup();

      if(transactionType === BBConstants.WITHDRAWN_CHEQUEBOOK_ACK){
        var navObj = {
          requestData: {
            "requestId": inputParams.Request_id,
            "featureActionId": BBConstants.CHEQUE_BOOK_REQUEST_CREATE,
            "comments": ""        
          },
          onSuccess: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: "SHOW_WITHDRAWN_TRANSACTION_ACKNOWLEDGMENT",
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: "SERVICE_ERROR",
              responseData: {}
            }
          }
        };
      }
      else if (transactionType === BBConstants.WITHDRAWN_TRANSACTION_ACK) {
        var navObj = {
          requestData: {
            "requestId": inputParams.Request_id,
            "featureActionId": inputParams.featureActionId,
            "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn")
          },
          onSuccess: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: "SHOW_WITHDRAWN_TRANSACTION_ACKNOWLEDGMENT",
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBBRequestsDashboard",
            module: "ApprovalsReqUIModule",
            context: {
              key: "SERVICE_ERROR",
              responseData: {}
            }
          }
        };
      }
      else {
        var navObj = {
          requestData: {
            "requestId": inputParams.Request_id,
            "featureActionId":inputParams.featureActionId,
            "comments": kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn")     
          },
          onSuccess: {
            form: "frmApprovalViewDetails",
            module: "ApprovalsReqUIModule",
            context: {
              key: transactionType,
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
      }

      if (transactionType === BBConstants.WITHDRAWN_TRANSACTION_ACK) {
        scopeObj.ApprovalRequestsModule.presentationController.withdraw(navObj);
      } else if (transactionType === BBConstants.WITHDRAWN_ACH_TRANSACTION_ACK) {
        scopeObj.ApprovalRequestsModule.presentationController.withdrawACHTransactionRequest(navObj);
      } else if (transactionType === BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHTRANSACTION) {
        scopeObj.ApprovalRequestsModule.presentationController.withdrawACHTransactionRequest(navObj);
      } else if (transactionType === BBConstants.WITHDRAWN_ACH_FILE_ACK) {
        navObj.requestData.featureActionId = BBConstants.ACH_FILE_UPLOAD;
        scopeObj.ApprovalRequestsModule.presentationController.withdrawACHFileRequest(navObj);
      } else if (transactionType === BBConstants.ACH_DASHBOARD_WITHDRAWN_ACHFILE) {
        navObj.requestData.featureActionId = BBConstants.ACH_FILE_UPLOAD;
        scopeObj.ApprovalRequestsModule.presentationController.withdrawACHFileRequest(navObj);
      } else if(transactionType === BBConstants.WITHDRAWN_CHEQUEBOOK_ACK){
        scopeObj.ApprovalRequestsModule.presentationController.withdraw(navObj);
      } else {
        //configure for more transaction types
      }

    },
    generalTransactionsAcknowledgementApprove: function(context, formName, contextKey) {
      this.context.Data = context;
      this.view.ApprovalFormActions.enableNextButton();
      this.showACKForOtherTransactionsApprove(this.context.Data);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Transaction") +
        kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") +
        kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
      this.view.flxAcknowledgementContainer.isVisible = true;
      this.view.ApprovalFormActions.btnNext.isVisible = true;
      this.view.ApprovalFormActions.btnCancel.isVisible = false;
      this.view.ApprovalFormActions.btnOption.isVisible = false;
      this.view.ApprovalFormActions.btnBack.isVisible = false;
      this.view.ApprovalFormActions.btnNext.skin=ViewConstants.SKINS.NEXT_BTN;
      this.view.ApprovalFormActions.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.BackToApprovals");
      this.view.ApprovalFormActions.btnNext.onClick = function () {
        var scopeObj = this;
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
    },
    showACKForOtherTransactionsApprove : function(transactionData) {
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.billPay.TransactionDetails");
      this.setupUIForACK("");
      if(!kony.sdk.isNullOrUndefined(transactionData.featureActionId) && transactionData.featureActionId === BBConstants.CHEQUE_BOOK_REQUEST_CREATE){
        var formattedData = {};
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.RequestAccount")] = transactionData.accountId;
        formattedData[kony.i18n.getLocalizedString("i18n.accounts.TransactionType")] = transactionData.featureActionName;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeBookReq.NoOfBooks")] = transactionData.noOfBooks;
        formattedData[kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee")] = transactionData.amount;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentDate")] = transactionData.sentDate;
        formattedData[kony.i18n.getLocalizedString("konybb.Approvals.SentBy")] = transactionData.sentBy;
        formattedData[kony.i18n.getLocalizedString("i18n.CardManagement.requestId")] = transactionData.transactionId;
        formattedData[kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType")] = transactionData.requestType;
        formattedData[kony.i18n.getLocalizedString("i18n.accountDetail.customerName")] = transactionData.customerName;
      }
      else{
        var formattedData = {
          "Debit Account": transactionData.accountId ? transactionData.accountId.text :"",
          "Amount": transactionData.Amount ? CommonUtilities.formatCurrencyWithCommas(transactionData.Amount, false) : "",
          "Payee": transactionData.Payee,
          "Transaction Date": CommonUtilities.getFrontendDateString(transactionData.TransactionDate, "mm/dd/yyyy"),
          "Created By": transactionData.customerName,
          "Recurrence": transactionData.Reccurence,
          "Frequency": transactionData.Frequency
        };
      }
      //set transaction details if its not a benefeciary related feature
      if(!this.beneficiaryActionIdArray.includes(transactionData.featureActionId)){
        this.view.NonEditableDetailsNew.setData(formattedData, true);
      }
      if (kony.sdk.isNullOrUndefined(transactionData.Request_id)) {
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.fetchRequestHistoryData(transactionData.Request_id);
      }
      this.view.NonEditableDetailsNew.isVisible = true;
      this.view.flxPaymentInstruction.isVisible = false;
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = false;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxDateContainer.isVisible = false;
      this.view.forceLayout();
      this.adjustScreen(20);
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
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + data + "dp";
        else
          this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = mainheight + data + "dp";
        this.view.forceLayout();
      }
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
    showPopup: function(popupConfig, nextOnClick) {
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.lblHeader.text = popupConfig.header;
      this.view.flxPopup.lblPopupMsg.text = popupConfig.msg;
      this.view.flxPopup.flxComments.isVisible = popupConfig.commentsVisibility;
      if (this.view.flxPopup.flxComments.isVisible === false) {
        this.view.flxPopup.formActionsNew.top = 60 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "268px";
      } else {
        this.view.flxPopup.formActionsNew.top = 0 + "dp";
        this.view.flxPopup.flxPopupContainer.height = "400px";
      }
      this.view.flxPopup.trComments.text = popupConfig.commentsText;
      this.view.flxPopup.formActionsNew.btnNext.text = popupConfig.nextText;
      this.view.flxPopup.formActionsNew.btnCancel.text = popupConfig.cancelText;
      this.view.flxPopup.formActionsNew.btnNext.onClick = nextOnClick;

      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;

      this.view.flxPopup.trComments.onKeyUp = function() {
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
    hidePopup: function() {
      this.view.flxPopup.trComments.text = "";
      this.view.flxPopup.isVisible = false;
      this.view.forceLayout();
      this.adjustScreen(0);
    },


    /**
         * showAuthenticator : TO show Authenticator screen, to take the OTP and validation
         * @member of {frmBBMyApprovalsController}
         * @param {}
         * @return {}
         * @throws {}
         */
    //     showAuthenticator: function(context) {
    //       if(this.view.TemplateRecordsNew.TabBodyNew.isAllFieldsAreValid()){
    //       	this.view.scrollToBeginning();
    // 		this.view.flxContentDashBoard.isVisible = false;
    //         if(context === "setSelectedTemplateDetails"){
    //             this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.achTransferAuth");
    //         }
    //         else if(context === "addTransactionRecords"){
    //           this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.common.achTemplateAuth");
    //         }
    //      	this.view.flxTransactionDetails.isVisible = false;
    //       	this.view.flxAuthenticator.isVisible = true;
    //       	this.view.OTPAuthenticator.preShow();
    //         this.view.OTPAuthenticator.showSecureCode();
    //       	this.view.flxACHFilesUpload.isVisible = false;
    //       	this.view.flxTerms.isVisible = false;
    //       	this.view.forceLayout();
    //       	this.adjustScreen(0);
    //       }
    //       else{
    //         //fields are not valid
    //       }
    //     },


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

    /**
         * Method to check whether the user typed anything in the search bar and making the UI compatible according to the actions of the user
         */
    hideOrShowCloseIcon: function() {
      if (this.view.TabPaneNew.TabSearchBarNew.tbxSearch.text.trim() === "") {
        this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(false);
      } else {
        this.view.TabPaneNew.TabSearchBarNew.imgClear.setVisibility(true);
      }
      this.view.TabPaneNew.TabSearchBarNew.forceLayout();
    },

    /*
        	Method to fetch Terms And Conditions
        */
    fetchTermsAndConditionsForACH: function() {
      var navigationObject = {
        "requestData": {
          "termsAndConditionsCode": BBConstants.ACH_TnC,
          "languageCode": kony.i18n.getCurrentLocale().replace("_", "-")
        },
        "onSuccess": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.SHOW_ACH_TNC,
            "responseData": null
          }
        },
        "onFailure": {
          "form": "frmApprovalViewDetails",
          "module": "ApprovalsReqUIModule",
          "context": {
            "key": BBConstants.HIDE_ACH_TNC,
            "responseData": null
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.getACHTermsAndCondtions(navigationObject);
    },

    /*
        	Show ACH Terms and Conditions
        */
    showACHTnC: function(response) {
      this.view.flxTerms.setVisibility(true);
      FormControllerUtility.setHtmlToBrowserWidget(this, this.view.browserTnC, response.termsAndConditionsContent);
      this.view.forceLayout();
      this.adjustScreen(0);
      FormControllerUtility.hideProgressBar(this.view);
    },

    deleteSelectedACHTemplate: function(selectedRowData) {
      var Template_id = selectedRowData["Template_id"];
      var popupConfig = {
        "header": kony.i18n.getLocalizedString("i18n.konybb.Common.ACHTemplate"),
        "msg": kony.i18n.getLocalizedString("i18n.ACH.DeleteTemplateAlertMessage"),
        "commentsVisibility": false,
        "nextText": kony.i18n.getLocalizedString("i18n.common.yes"),
        "cancelText": kony.i18n.getLocalizedString("i18n.common.no"),
      };

      this.showAlert(popupConfig, this.deleteACHTemplate.bind(this, Template_id));
    },

    showAlert: function(popupConfig, nextOnClick) {
      this.view.flxPopup.height = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + this.view.flxFooter.info.frame.height;
      this.view.flxPopup.flxPopupContainer.top = (this.view.flxPopup.height) / 2;
      FormControllerUtility.scrollToCenterY(this.view.flxPopup.height);
      this.view.flxPopup.lblHeader.text = popupConfig.header;
      this.view.flxPopup.lblPopupMsg.text = popupConfig.msg;
      this.view.flxPopup.flxComments.isVisible = popupConfig.commentsVisibility;
      this.view.flxPopup.formActionsNew.btnNext.text = popupConfig.nextText;
      this.view.flxPopup.formActionsNew.btnCancel.text = popupConfig.cancelText;
      this.view.flxPopup.formActionsNew.btnNext.onClick = nextOnClick;
      this.view.flxPopup.formActionsNew.btnCancel.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.onClick = this.hidePopup;
      this.view.flxPopup.flxClose.cursorType = "pointer";
      this.view.flxPopup.isVisible = true;

      this.view.forceLayout();
      this.adjustScreen(0);
    },

    onDeleteACHTemplateSuccess: function(templateData) {
      this.updateFormUI({
        "key": BBConstants.SHOW_ACH_TEMPLATES_TAB
      });

      if (templateData.isDeleted) {
        this.view.flxDisplayErrorMessage.setVisibility(true);
        this.view.imgDisplayError.src = "success_green.png";
        this.view.lblDisplayError.text = kony.i18n.getLocalizedString("i18n.ACH.TemplateDeletedSuccesfully");
        this.view.lblDisplayError.skin = "slFbox";
      } else {
        this.view.flxDisplayErrorMessage.setVisibility(false);
      }
      kony.timer.schedule("AchTimer1", this.disableAlertMessage, 10, false);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    disableAlertMessage: function() {
      this.view.flxDisplayErrorMessage.setVisibility(false);
      this.view.forceLayout();
      this.adjustScreen(0);
    },

    deleteACHTemplate: function(Template_id) {
      this.hidePopup();
      var req = {
        "Template_id": Template_id
      };
      var navObj = {
        requestData: req,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.DELETE_TEMPLATE_SUCCESS,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.DELETE_TEMPLATE_FAILURE,
            responseData: {}
          }
        }
      };
      this.ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");
      this.ApprovalsReqUIModule.presentationController.deleteACHTemplates(navObj);
    },

    /*
        	Set Filter data for mobile segment
        */
    setMobileFilterData: function() {
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
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.widgetDataMap = widgetDataMap;
      this.view.TabPaneNew.MobileCustomDropdown.flxDropdown.segViewTypes.setData(data);
    },
    fetchUploadedACHFileApprovals: function(requestParam) {
      var scopeObj = this;
      var navObj = {
        requestData: requestParam,
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: "achViewDetails",
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
      scopeObj.ApprovalsReqUIModule.presentationController.getACHFileByID(navObj);
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },
    showUploadedFileApprovals: function(ACHFileData) {
      var fileACKData = this.generateViewDetailRecords(ACHFileData);
      this.view.lblFormatTypeValue.text = ACHFileData.FileFormatType;
      this.view.lblRequestTypeValue.text = ACHFileData.FileRequestType;
      this.view.lblFileNameAck.text = ACHFileData.FileName;//.toolTip;
      //  if (ACHFileData.FileStatus === BBConstants.TRANSACTION_STATUS.PENDING) {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUpload"));
      //  } else {
      //      this.setupUIForACK(kony.i18n.getLocalizedString("i18n.konybb.common.ACKFileUploadExecute"));
      // }
      this.showACHFileUploadAckApprovals(fileACKData);
      if (kony.sdk.isNullOrUndefined(ACHFileData.Request_id) || kony.sdk.isEmptyObject(ACHFileData.Request_id)) {
        this.view.flxApprovalsHistoryInformation.setVisibility(false);
        this.view.flxApprovalrequestHistorySection.setVisibility(false);
      } else {
        this.view.lblApprovalStatusValue.text = ACHFileData.FileStatus;
        this.fetchRequestHistoryData(ACHFileData.Request_id);
      };
      FormControllerUtility.hideProgressBar(this.view);
      this.adjustScreen(0);
    },
    showACHFileUploadAckApprovals: function(fileDetails) {
      FormControllerUtility.showProgressBar(this.view);
      this.view.flxContentHeader.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.konybb.Common.ACHFiles") + kony.i18n.getLocalizedString("i18n.konybb.common.hyphen") + kony.i18n.getLocalizedString("i18n.TradeFinance.viewDetails");
      this.view.flxAckPaymentInstruction.isVisible = false;
      this.view.flxTemplateRecordHeader.isVisible = false;
      this.view.flxACHFileUploadDetails.isVisible = true;
      this.view.TemplateRecordsNew.isVisible = false;
      this.view.flxApprovalsHistoryInformation.isVisible = true;
      this.view.flxApprovalrequestHistorySection.isVisible = true;
      this.view.flxDateContainer.isVisible = false;
      this.view.NonEditableDetailsNew.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.konybb.common.uploadFileContent");
      this.view.NonEditableDetailsNew.setData(fileDetails, true);
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

    /*
        	hide ACH Terms and Conditions
        */
    hideACHTnC: function() {
      this.view.flxTerms.setVisibility(false);
      this.view.forceLayout();
      this.adjustScreen(0);
      FormControllerUtility.hideProgressBar(this.view);
    },

    downloadAttachmentsFile: function(fileUrl) {
      var scope = this;
      try{
        var httpClient = new kony.net.HttpRequest();
        httpClient.timeout = 10000;

        httpClient.onReadyStateChange = onReadyStateChanged;
        httpClient.open("GET", fileUrl);
        httpClient.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        var postdata = new kony.net.FormData();
        postdata.append("auth_token",kony.sdk.getCurrentInstance().currentClaimToken);
        httpClient.send(postdata);
        function onReadyStateChanged(){
          var readyState = Number(this.readyState.toString());
          var status = Number(this.status.toString());

          if(readyState === 4){
            if(status === 200){
              var obj;
              try {
                var parsedObj = JSON.parse(this.response);
                if (!kony.sdk.isNullOrUndefined(parsedObj))
                  obj= true;
                else 
                  obj = false;
              } catch (e) {
                obj = false;
              }
              if(!obj){
                var data = {
                  "url": fileUrl
                };
                CommonUtilities.downloadFile(data);
              }
              else{
                scope.view.NonEditableDetailsNew.flxError.setVisibility(true);
                scope.view.NonEditableDetailsNew.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
              }			 
            }
            else{
              scope.view.NonEditableDetailsNew.flxError.setVisibility(true);
              scope.view.NonEditableDetailsNew.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
            }
          }
        }
      }catch(err){
        scope.view.NonEditableDetailsNew.flxError.setVisibility(true);
        scope.view.NonEditableDetailsNew.flxError.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess");
      }

      FormControllerUtility.hideProgressBar(this.view);
    },
    //flex creation for single functionality
    pendingApprovalsSingleCondition: function(count, data){
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
        "text": kony.i18n.getLocalizedString("kony.i18n.Common.Any")+" "+data.approvalCount+" "+kony.i18n.getLocalizedString("i18n.Search.Pending"),
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
      if(data.pendingApprovers.length !==0 && data.pendingApprovers !== undefined){
        imgDetailsArrow["isVisible"] = true;
      }else{
        imgDetailsArrow["isVisible"] = false;
      }
      imgDetailsArrow["onTouchEnd"] = this.showExpandedView.bind(this, "flxApproveDetailsSingleExpand"+count, "imgDetailsArrow"+count);
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
      this.note = this.note + " " +kony.i18n.getLocalizedString("i18n.common.any") + " " + data.approvalCount + " " + kony.i18n.getLocalizedString("i18n.common.ofthe") + " "  +data.signatoryName;
      this.count = count;
      this.count++;
      return flxConditionGroupSingle;
    },
    //OR Condition flex
    pendingApprovalsORCondition: function(count){
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
      this.note = this.note+" (or) ";
      this.count = count;
      this.count++;
      return flxCondition;
    },
    // Multiple Condition flex group
    pendingApprovalsMultipleCondition: function(count, data){
      var flxConditionGroupMultiple = new kony.ui.FlexContainer({
        "id": "flxConditionGroupMultiple"+count,
        "isVisible": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "left": "0dp",
        "width": "100%",
        "clipBounds": false,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "skin": "slFbox",
        "zIndex": 1
      });
      if(this.view.flxApproverList.widgets.length !==0){
        flxConditionGroupMultiple["top"] = "0dp";
      }else{
        flxConditionGroupMultiple["top"] = "20dp";
      }
      var flxApproverPendingMultiple = new kony.ui.FlexContainer({
        "id": "flexApproverPendingMultiple"+count,
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
        if(i !==0){
          count ++;
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
          "text": kony.i18n.getLocalizedString("kony.i18n.Common.Any")+" " +data[i].approvalCount+" "+kony.i18n.getLocalizedString("i18n.Search.Pending"),
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
        if(data[i].pendingApprovers.length !==0 && data[i].pendingApprovers !== undefined){
          imgDetailsArrowMultiple["isVisible"] = true;
        }else{
          imgDetailsArrowMultiple["isVisible"] = false;
        }
        imgDetailsArrowMultiple["onTouchEnd"] = this.showExpandedView.bind(this, "flxApproveDetailsMultipleExpand"+count, "imgDetailsArrowMultiple"+count);
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
          this.note = this.note+" any "+data[i].approvalCount+" of the "+data[i].signatoryName;
          this.note = this.note+" and ";
        } else {
          this.note = this.note+" any "+data[i].approvalCount+" of the "+data[i].signatoryName;
          flxApproverPendingMultiple.add(flxApproverPendingGroupMultiple);
        }
        var  masterTableMultipleData = [];
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
    reNotify: function(row_items) {
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
    fetchReNotifyPendingApprovalRequest: function(objectData) {
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
    reNotifySuccessCallback: function(responseData){
      var x = responseData;
      FormControllerUtility.hideProgressBar(this.view);
    },
    reNotifyFailureCallback: function(responseData){
      var x = "error";
      FormControllerUtility.hideProgressBar(this.view);
    },
    viewPendingApprovalsDetails: function(selectedRowData, contractsArr){
      this.view.flxOverlay.setVisibility(true);
      this.view.flxPendingApprovers.setVisibility(true);
      this.view.flxApprovalLimitHeader.setVisibility(false);
      this.view.flxPerTransaction.setVisibility(false);
      this.view.flxDailyTransaction.setVisibility(false);
      this.view.flxWeekelyTransaction.setVisibility(false);
      this.view.flxApproverList.removeAll(this.view.flxApproverList.widgets());       
      if(contractsArr && contractsArr.length > 1){
        this.view.flxMultiContractMsg.setVisibility(true);
      }else{
         this.view.flxMultiContractMsg.setVisibility(false);
      }
      this.fetchRequestHistoryDataSignatoryGroups(selectedRowData.requestId);                               
    },     
    // Service call for getRequestHistory for signatory groups
    fetchRequestHistoryDataSignatoryGroups: function(requestId) {
      var navObj = {
        requestData: {
          "Request_id": requestId
        },
        onSuccess: {
          form: "frmApprovalViewDetails",
          module: "ApprovalsReqUIModule",
          context: {
            key: BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP,
            responseData: {}
          }
        },
        onFailure: {
          form: "frmApprovalViewDetails",
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
    pendingApproversVisibility: function(){
      this.view.flxOverlay.setVisibility(false);
      this.view.flxPendingApprovers.setVisibility(false);
    },
    // successCallback for pending approval request data
    showPendingApprovalData: function(pendingData) {
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
              } else if(firstTab !== "MAX_TRANSACTION_LIMIT" && limitType[i] === "DAILY_LIMIT"){
                firstTab = limitType[i];
              } else if(firstTab !== "MAX_TRANSACTION_LIMIT" && firstTab !== "DAILY_LIMIT" && limitType[i] === "WEEKLY_LIMIT"){
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
                  if(limitType.length === 1){
                    this.setApprovalPendingData(groupListPerTxn, groupRuleValuePerTxn);
                  }
                } else {
                  this.setApprovalPendingData(groupListPerTxn, groupRuleValuePerTxn);
                }
                this.view.flxPerTransaction.onTouchEnd = function() {
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
                  if(limitType.length === 1){
                    this.setApprovalPendingData(groupListDaily, groupRuleValueDaily);
                  }
                } else {
                  this.setApprovalPendingData(groupListDaily, groupRuleValueDaily);
                }
                this.view.flxDailyTransaction.onTouchEnd = function() {
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
                }else{
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
                  if(limitType.length === 1){
                    this.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                  }
                } else {
                  this.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                }
                this.view.flxWeekelyTransaction.onTouchEnd = function() {
                  scope.setApprovalPendingData(groupListWeekly, groupRuleValueWeekly);
                  if (tabSwitch === true) {
                    this.view.flxWeeklyTransactionSelected.setVisibility(true);
                    this.view.flxDailyTransactionSelected.setVisibility(false);
                    this.view.flxPerTransactionSelected.setVisibility(false);
                  }
                }.bind(this);
              }
              if(limitType[j] === "NON_MONETARY_LIMIT"){
                var firstTabGroupListPerTxn = pendingGroupRules[j].groupList;
                var firstTabGroupRuleValuePerTxn = pendingGroupRules[j].groupRuleValue;                      
              }
            }
          }
          if(!kony.sdk.isNullOrUndefined(firstTabGroupListPerTxn) && !kony.sdk.isNullOrUndefinedfirstTabGroupRuleValuePerTxn && firstTabGroupListPerTxn !== "" &&  firstTabGroupRuleValuePerTxn !== ""){
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
    setApprovalPendingData: function(groupList, groupRuleValue) {
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
          }else {
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
          }else{
            this.view.flxApproverList.remove(ORFlex);
            this.note = this.note.slice(0, -6);
          }
          groupRuleValueArrayLength--;

        }          
      }
      if(this.view.flxApprovalLimitHeader.isVisible === true){
        this.note = kony.i18n.getLocalizedString("i18n.pendingApprovers.limitBreachText");
      }else{
        this.note = kony.i18n.getLocalizedString("i18n.payments.noteTobeApprovedBy") + this.note + ".";
      }
      this.view.lblInfo.text = this.note;
    },

    // failureCallback for pending approval request data
    showPendingApprovalFailure: function(){
      FormControllerUtility.hideProgressBar(this.view);
    },  

    buttonPendingApprovers: function(selectedRowData, contractsArr){
      this.viewPendingApprovalsDetails(selectedRowData, contractsArr);
    },

    getPendingApprovalsCount: function(selectedRowData){
      var approvalStatus = selectedRowData.Approval;
      this.view.lblApprovalStatusValue.text = selectedRowData.status; 
      return approvalStatus.split(' ')[0]; 
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
            segData.push(temp);
        }
        this.view.SegmentRecipientBankDetails.setData(segData);
    },
    

showTab1: function(selectedRowData,InfinityUserContractData) {
    var showingUpdatedDetails = true;
    this.setBeneficiaryManagementDataEDITFlow(selectedRowData,InfinityUserContractData,showingUpdatedDetails)
  },
  showTab2: function(selectedRowData,InfinityUserContractData) {
    var showingUpdatedDetails = false;
    this.setBeneficiaryManagementDataEDITFlow(selectedRowData,InfinityUserContractData,showingUpdatedDetails)
  },

resetTab: function() {
  this.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected";
  this.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected";
  },
    setBeneficiaryManagementDataCreateFlow: function(selectedRowData,InfinityUserContractData){
      this.view.flxTabs.isVisible = false;
      this.view.SegmentRecipientBankDetails.isVisible = true;
      this.view.lblCreatedDetails.isVisible = true;
      this.view.lblCreatedDetails.text = "Created Details" // Need to give i18N Key.
      this.view.contractListRecipient.lblCol3.setVisibility(false);
      this.view.contractListRecipient.imgCol3.setVisibility(false);
      this.view.flxSeperator.setVisibility(true);
      this.view.lblRecipientInforation.setVisibility(true);
      this.view.SegmentRecipientInfoDetails.setVisibility(true);
      this.view.flxSeperatorBankDetails.setVisibility(true);
      this.view.lblRecipientBankInfo.setVisibility(true);
      this.view.lblRecipientsLinkedWith.setVisibility(true);
    this.view.flxBelowSeparatorBankDetails.setVisibility(true);
      this.view.SegmentRecipientBankDetails.setVisibility(true);
      var dataToShow = this.getBeneficiaryManagementData(selectedRowData,InfinityUserContractData,true)
      //this.view.NonEditableDetailsNew.setData(dataToShow.requestDetails, true);
      var contractsData = {};
      contractsData.contracts = this.getSelectedContractList(dataToShow.contractsData, selectedRowData.cif);
      this.view.contractListRecipient.preshow(contractsData,"CREATE");
      this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true);
      this.setDataToSegmentRecipientBankDetails(dataToShow.recipienBankDetails,true);

    },
    setBeneficiaryManagementDataDeleteFlow: function(selectedRowData,InfinityUserContractData){
      this.view.flxTabs.isVisible = false;
      this.view.SegmentRecipientBankDetails.isVisible = true;
      this.view.lblCreatedDetails.isVisible = true;
      this.view.lblCreatedDetails.text = "Deleted Details" // Need to give i18N Key.
      this.view.contractListRecipient.lblCol3.setVisibility(false);
      this.view.contractListRecipient.imgCol3.setVisibility(false);
      this.view.flxSeperator.setVisibility(true);
      this.view.lblRecipientInforation.setVisibility(true);
      this.view.SegmentRecipientInfoDetails.setVisibility(true);
      this.view.flxSeperatorBankDetails.setVisibility(true);
      this.view.lblRecipientBankInfo.setVisibility(true);
      this.view.SegmentRecipientBankDetails.setVisibility(true);
      var dataToShow = this.getBeneficiaryManagementData(selectedRowData,InfinityUserContractData)
      //this.view.NonEditableDetailsNew.setData(dataToShow.requestDetails, true);
      
	  //For deleted record no need to show Contract/CIF information
		//var contractsData = {};
        //contractsData.contracts = this.getSelectedContractList(dataToShow.contractsData, selectedRowData.cif);
		//this.view.contractListRecipient.preshow(contractsData);
	  this.view.lblRecipientsLinkedWith.setVisibility(false);
    this.view.flxBelowSeparatorBankDetails.setVisibility(false);
	  this.view.contractListRecipient.setVisibility(false);
      this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true);
      this.setDataToSegmentRecipientBankDetails(dataToShow.recipienBankDetails,true);
    },

    setBeneficiaryManagementDataEDITFlow: function(selectedRowData,InfinityUserContractData,showingUpdatedDetails){
      this.view.flxTabs.isVisible = true;
      this.view.lblCreatedDetails.isVisible = false;
      this.resetTab();
      var dataToShow = this.getBeneficiaryManagementData(selectedRowData,InfinityUserContractData, showingUpdatedDetails);
      //this.view.NonEditableDetailsNew.setData(dataToShow.requestDetails, true);
      this.view.contractListRecipient.lblCol3.setVisibility(true);
      this.view.contractListRecipient.imgCol3.setVisibility(true);
      this.view.lblRecipientsLinkedWith.setVisibility(true);
      this.view.flxBelowSeparatorBankDetails.setVisibility(true);
      if(showingUpdatedDetails){ //Tab1 Active to show Updated details
        this.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        this.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected";
        var oldInfoJSON = this.getOldInfoDataObject(selectedRowData);
        //adding nickname with  "-" value as nickname field is not part of oldJson when nickname is not provided 
        if (oldInfoJSON.nickName === null || oldInfoJSON.nickName === undefined) {
          oldInfoJSON["nickName"] = "-";
        }
        var rowdatawithoutoldInfo = CommonUtilities.cloneJSON(selectedRowData);
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
        if (typeof(oldInfoJSON) == 'string') {
          oldInfoJSON = JSON.parse(oldInfoJSON);
        }
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo, selectedRowData.cif);
        contractsData.contracts = contractDiffData;
        this.view.contractListRecipient.preshow(contractsData,"EDIT_UPDATED");
        this.setDataToSegmentRecipientInfoDetails(recipientInformation,true);
        this.setDataToSegmentRecipientBankDetails(bankInformation,true);
      }else{ //Tab2 Active to show existing details
        this.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected";
        this.view.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
        this.view.flxSeperator.setVisibility(true);
        this.view.lblRecipientInforation.setVisibility(true);
        this.view.SegmentRecipientInfoDetails.setVisibility(true);
        this.view.flxSeperatorBankDetails.setVisibility(true);
        this.view.lblRecipientBankInfo.setVisibility(true);
        this.view.SegmentRecipientBankDetails.setVisibility(true);
        var contractsData = {};
        var oldInfoJSON = this.getOldInfoDataObject(selectedRowData); 
        var oldCIFInfo = oldInfoJSON.cif.length > 0 ? oldInfoJSON.cif : null;
        var contractDiffData = this.getUpdatedContractDetailsFromDiff(dataToShow.contractsData, oldCIFInfo);
        contractsData.contracts = contractDiffData;
        this.view.contractListRecipient.preshow(contractsData,"EDIT_EXISTING");
        this.setDataToSegmentRecipientInfoDetails(dataToShow.recipientData,true);
        this.setDataToSegmentRecipientBankDetails(dataToShow.recipienBankDetails,true);
      }
    },

    getBeneficiaryManagementData: function(selectedRowData,InfinityUserContractData, isUpdatedData){
      var finalData ={};
      var selectedRowFeatureActionId =selectedRowData.featureActionId;
      // For Delete flow we have to populate data from oldInfo JSON and SelectedRowData so this variable act as a backupdata of slectedRow
      var dataforCreateAndDeleteFlow =selectedRowData;
      var selectedRowData;
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(selectedRowFeatureActionId)){
        selectedRowData = this.getOldInfoDataObject(selectedRowData);
      }else{
         selectedRowData = isUpdatedData === true ? selectedRowData : this.getOldInfoDataObject(selectedRowData);
      }
      var contractsData =InfinityUserContractData;
      var name =(selectedRowData.beneficiaryName) ?selectedRowData.beneficiaryName :"-";
      var recipient_Type = "-";
      if(selectedRowData.featureActionId){
      if(selectedRowFeatureActionId.toUpperCase().includes("INTER_BANK")){
        recipient_Type = "Inter Bank"
      }else{
        recipient_Type = "International"
      }
    }else{
          if(selectedRowData.isInternationalAccount.toUpperCase()==="TRUE"){
            recipient_Type = "International"
          }else{
            recipient_Type = "Inter Bank"
          }
    }
    var address = "";
    if(selectedRowData.addressLine1){
      address = address+selectedRowData.addressLine1+", "
    }
    if(selectedRowData.addressLine2){
      address = address+selectedRowData.addressLine2+", "
    }
    if(selectedRowData.city){
      address = address+selectedRowData.city+", "
    }
    if(selectedRowData.country){
      address = address+selectedRowData.country+", "
    }
    if(selectedRowData.zipcode){
      address = address+selectedRowData.zipcode
    }
      var recipientData = {
        "Name": {"Value": name ,"isItUpdatedValue":false},
        "Recipient Type": {"Value": recipient_Type,"isItUpdatedValue":false},
        "Phone Number": {"Value":(selectedRowData.phoneNumber) ?selectedRowData.phoneNumber :"-","isItUpdatedValue":false},
        "Email ID": {"Value":(selectedRowData.email) ?selectedRowData.email :"-","isItUpdatedValue":false},
        "Address": {"Value":(address) ?address : "-" ,"isItUpdatedValue":false}
      }
      var recipienBankDetails = {
        "BIC/SWIFT": {"Value": (selectedRowData.swiftCode) ?selectedRowData.swiftCode :"-", "isItUpdatedValue":false},
        "Account Number": {"Value":(selectedRowData.iban) ?selectedRowData.iban :"-","isItUpdatedValue":false},
        "Bank Name": {"Value":(selectedRowData.bankName) ?selectedRowData.bankName :"-","isItUpdatedValue":false},
        "Account Nickname": {"Value":(selectedRowData.nickName) ?selectedRowData.nickName :"-","isItUpdatedValue":false}
      }
      //var requestDetails = {
      //  "Request Type": dataforCreateAndDeleteFlow.featureActionName,
      //  "Requested By": dataforCreateAndDeleteFlow.customerId
      //}
      finalData.recipientData = recipientData;
      finalData.contractsData = contractsData;
      finalData.recipienBankDetails = recipienBankDetails;
      //finalData.requestDetails = requestDetails;
      return finalData;
      
    },
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
    *  set beneficiary related information on click of approve in view details page
    * @param: {"selectedRowData":{},"InfinityUserContractData":[]}
    */
    setBeneficiaryDetailsInSameScreen : function(responseData){
      var selectedRowData = responseData.selectedRowData;
      var InfinityUserContractData = responseData.infinityUserContractsData;
      if(this.beneficiaryActionIdArray.includes(selectedRowData.featureActionId)){
        this.view.flxRequestCreateEditUpdateEditDetails.isVisible=true;
        this.view.NonEditableDetailsNew.lblACHTitleText.text = "Request Details"; // need to provide i18N key
        this.view.NonEditableDetailsNew.segDetails.rowTemplate = "flxNonEditableRecipientanditsbankDetails";
        if(kony.sdk.isNullOrUndefined(InfinityUserContractData)) {
          InfinityUserContractData = [];
          this.view.contractListRecipient.setVisibility(false);
        }else {
          this.view.contractListRecipient.setVisibility(true);
        }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT'].includes(selectedRowData.featureActionId)){
          this.setBeneficiaryManagementDataCreateFlow(selectedRowData,InfinityUserContractData);
        }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT'].includes(selectedRowData.featureActionId)){
          this.setBeneficiaryManagementDataDeleteFlow(selectedRowData,InfinityUserContractData);
        }
        if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(selectedRowData.featureActionId)){
          this.view.btnTab1.onClick = this.showTab1.bind(this,selectedRowData,InfinityUserContractData);
          this.view.btnTab2.onClick = this.showTab2.bind(this,selectedRowData,InfinityUserContractData);
          var showingUpdatedDetails = true;
          this.setBeneficiaryManagementDataEDITFlow(selectedRowData,InfinityUserContractData,showingUpdatedDetails);
        }
      }else{
        this.view.flxRequestCreateEditUpdateEditDetails.isVisible=false;
      }
    },
	getUsernameOrCompanyId: function(obj) {
            if (obj && obj.userName) {
                return obj.userName;
            } else if (obj && obj.Company_id) {
                const companyIdParts = obj.Company_id.split('_');
                return companyIdParts[0]; // Return the first part of the Company_id before the underscore (_)
            } else {
                return "--";
            }
        },
    populateBeneficiaryRequestTypeByDetails : function(requestType,requestedBy,beneficiaryRequestFeatureActionid){
      if(['INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTERNATIONAL_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_DELETE_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTER_BANK_ACCOUNT_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL','INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_DELETE_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_LINKAGE','INTRA_BANK_FUND_TRANSFER_EDIT_RECEPIENT_OPTIONAL'].includes(beneficiaryRequestFeatureActionid)){
      var requestDetails = {
        "Request Type": requestType,
        "Requested By": requestedBy
      }
      this.view.NonEditableDetailsNew.setData(requestDetails, true);
    }
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
