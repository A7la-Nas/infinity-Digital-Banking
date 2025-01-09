define(['CommonUtilities', 'ViewConstants', 'OLBConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, OLBConstants, FormControllerUtility, CampaignUtility) {

    var orientationHandler = new OrientationHandler();

    return {

        /** Global Variables **/
        bulkPaymentsModule: null,
        isEditFlow: "",
        btnTextApprovalReq: "",
        bulkPaymentRecordData: {},
        isMakerFlow: 1,
        isMakerHistoryFlow: 0,
        isMakerUploadFlow: 0,
        fetchParams: {},
        paymentOrdersData: {},
        isackFlow: "",
		ackMsg: "",
        activeTab: "",
		errDetails: "",
		responseDetails: "",
        dashboardSortParams: {},
        recordStatus: "",
        isErrorFlow: "",
        isSubmitPaymentOrder: "",
        isErrorPaymentRecord : false,

        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */

        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            } else if (context.key === BBConstants.REVIEW_PAYMENT) {
                this.isMakerFlow = 1;
                this.isEditFlow = false;
                this.isErrorFlow = false;
                this.isMakerHistoryFlow = 0;
                if(!(kony.sdk.isNullOrUndefined(context.responseData.activeTab))){
                this.activeTab = context.responseData.activeTab;
                if(context.responseData.activeTab !== kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedFiles")) {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                } else {
                this.isMakerUploadFlow = 1;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");  
                 }
                } else {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                }
                this.bulkPaymentRecordData = context.responseData;
                this.fetchBulkPaymentOrders(context.responseData);
              //  this.view.flxSearchBar.flxRecipientTab.lblRecordHeader.top="13px";
            } else if (context.key === BBConstants.MAKER_VIEW_PAYMENT) {
                this.isMakerFlow = 1;
                this.isEditFlow = true;
                this.isErrorFlow = false;
                this.isMakerHistoryFlow = 0;
                if(!(kony.sdk.isNullOrUndefined(context.responseData.activeTab))){
                if(context.responseData.activeTab !== kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedFiles")) {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                } else {
                this.isMakerUploadFlow = 1;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");  
                 }
                } else {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                }
                this.bulkPaymentRecordData = context.responseData;
                this.fetchBulkPaymentOrders(context.responseData);
                if(!kony.sdk.isNullOrUndefined(context.responseData) && context.responseData.status.toLowerCase()===BBConstants.TRANSACTION_STATUS.WAITACK)
				{
					this.recordStatus=BBConstants.TRANSACTION_STATUS.WAITACK;
				}
               // this.view.flxSearchBar.flxRecipientTab.lblRecordHeader.top="9px";
            } else if (context.key === BBConstants.ERROR_PAYMENT) {
                this.isMakerFlow = 1;
                this.isEditFlow = true;
                this.isErrorFlow = true;
                this.isMakerHistoryFlow = 0;
                if(!(kony.sdk.isNullOrUndefined(context.responseData.activeTab))){
                if(context.responseData.activeTab !== kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedFiles")) {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                } else {
                this.isMakerUploadFlow = 1;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");  
                 }
                } else {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                }
                this.bulkPaymentRecordData = context.responseData;
                this.fetchBulkPaymentOrders(context.responseData);
                if(!kony.sdk.isNullOrUndefined(context.responseData) && context.responseData.status.toLowerCase()===BBConstants.TRANSACTION_STATUS.WAITACK)
                {
                  this.recordStatus=BBConstants.TRANSACTION_STATUS.WAITACK;
                }
              // this.view.flxSearchBar.flxRecipientTab.lblRecordHeader.top="9px";
            }  else if (context.key === BBConstants.MAKER_VIEW_PAYMENT_HISTORY) {
                this.isMakerFlow = 1;
                this.isEditFlow = true;
                this.isMakerHistoryFlow = 1;
                this.isErrorFlow = false;
                if(!(kony.sdk.isNullOrUndefined(context.responseData.activeTab))){
                if(context.responseData.activeTab !== kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedFiles")) {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
                } else {
                this.isMakerUploadFlow = 1;
                this.isMakerHistoryFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");  
                 }
                } else {
                this.isMakerUploadFlow = 0;
                this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
                }
                this.bulkPaymentRecordData = context.responseData;
                this.fetchBulkPaymentOrders(context.responseData);
               // this.view.flxSearchBar.flxRecipientTab.lblRecordHeader.top="9px";
            } else if (context.key === BBConstants.APPROVER_VIEW_PAYMENT) {
                this.isMakerFlow = 0;
                this.isEditFlow = true;
                this.isErrorFlow = false;
                if (context.responseData.isHistoryFlow) {
                    this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToApprovalHistory");
                } else {
                    this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingApprovals");
                }
                this.isMakerHistoryFlow = 0;
                this.isMakerUploadFlow = 0;
                this.bulkPaymentRecordData = context.responseData;
                this.fetchTransactionOrders(context.responseData);
            } else if (context.submitBMRFailure) {
                this.onSubmitBMRFailure(context.submitBMRFailure.serverErrorRes);
            } else if (context.bulkPaymentRejectErrorMessage) {
                this.showPaymentApproveRejectaAcknowledgment(context.bulkPaymentRejectErrorMessage.serverErrorRes, BBConstants.TRANSACTION_STATUS.REJECTED);
            } else if (context.key === BBConstants.REQUESTS_VIEW_PAYMENT) {
                this.isMakerFlow = 0;
                this.isEditFlow = true;
                this.isErrorFlow = false;
                if (context.responseData.isHistoryFlow) {
                    this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToRequestHistory");
                } else {
                    this.btnTextApprovalReq = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingRequests");
                }
                this.isMakerHistoryFlow = 0;
                this.isMakerUploadFlow = 0;
                this.bulkPaymentRecordData = context.responseData;
                this.fetchTransactionOrders(context.responseData);
            } else if (context.fetchPaymentOrdersSuccess) {
                this.paymentOrdersData = context.fetchPaymentOrdersSuccess;
                if (this.isMakerFlow) {
                    this.getRecipientData(this.isEditFlow, this.btnTextApprovalReq);
					this.setGenericMessage();
				} else {
                    this.onViewPaymentsScreenForApprovalDashboard(this.isEditFlow, this.btnTextApprovalReq);
                }
            } else if (context.getExistingBeneficiariesSuccess) {
                this.mapBeneficiaryListingData(context.getExistingBeneficiariesSuccess);
            } else if (context.getExistingBeneficiariesFailure) {
                this.showBeneficiaryListingErrorMessage(context.getExistingBeneficiariesFailure.errorMessage);
            } else if (context.serverError === true) {
                if (context.closePopup === true) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.view.flxDialogs.setVisibility(false);
                    this.adjustScreen(0);
                }
                this.showServerErrorMessage({
                    show: true,
                    errorMessage: context.errorMessage
                });

            } else if (context.updateBulkPaymentRecordSuccess) {
                this.onupdateBulkPaymentRecordSuccess(context.updateBulkPaymentRecordSuccess);
            } else if (context.cancelBulkPaymentRecordSuccess) {
                this.oncancelBulkPaymentRecordSuccess(context.cancelBulkPaymentRecordSuccess);
            } else if (context.addPaymentOrderSuccess) {
                this.fetchBulkPaymentRecordDetailsById();
                isackFlow = true;
				responseDetails = context.addPaymentOrderSuccess;
                ackMsg = context.addPaymentOrderSuccess.successMsg;
			} else if (context.addPaymentOrderFailure) {
                FormControllerUtility.hideProgressBar(this.view);
                isackFlow = true;
                responseDetails = context.addPaymentOrderFailure;
                ackMsg = kony.i18n.getLocalizedString("i18n.payments.unableToAddPaymentOrder");
                errDetails = context.addPaymentOrderFailure.errorDetails;
				this.setGenericMessage();
            } else if (context.deletePaymentOrderSuccess) {
                this.fetchBulkPaymentRecordDetailsById();
                isackFlow = true;
				responseDetails = context.deletePaymentOrderSuccess;
                ackMsg = kony.i18n.getLocalizedString("kony.i18n.common.ItemRemoved");
            }  else if (context.deletePaymentOrderFailure) {
				FormControllerUtility.hideProgressBar(this.view);
                isackFlow = true;
				responseDetails = context.deletePaymentOrderFailure;
                ackMsg = kony.i18n.getLocalizedString("i18n.payments.unableToDeletePaymentOrder");
				errDetails = context.deletePaymentOrderFailure.errorDetails;
				this.setGenericMessage();
            } else if (context.editPaymentOrderSuccess) {
                this.fetchBulkPaymentRecordDetailsById();
                isackFlow = true;
				responseDetails = context.editPaymentOrderSuccess;
                ackMsg = kony.i18n.getLocalizedString("kony.i18n.common.recipientUpdate");
            } else if (context.editPaymentOrderFailure) {
                FormControllerUtility.hideProgressBar(this.view);
                isackFlow = true;
				responseDetails = context.editPaymentOrderFailure;
                ackMsg = kony.i18n.getLocalizedString("i18n.payments.unabletoUpdateRecipientDetails");
				this.setGenericMessage();
            } else if (context.submitPaymentOrderSuccess) {
                this.isSubmitPaymentOrder = true;
                this.onSubmitForApproval(context.submitPaymentOrderSuccess);
            } else if (context.onApproveSuccess) {
                this.showPaymentApproveRejectaAcknowledgment(context.onApproveSuccess, BBConstants.TRANSACTION_STATUS.APPROVED);
            } else if (context.onRejectSuccess) {
                this.showPaymentApproveRejectaAcknowledgment(context.onRejectSuccess, BBConstants.TRANSACTION_STATUS.REJECTED);
            } else if (context.onRequestsHistorySuccess) {
                this.showRequestHistoryData(context.onRequestsHistorySuccess.RequestHistory);
            } else if (context.fetchBulkPaymentRecordDetailsByIdSuccess) {
                this.bulkPaymentRecordData.totalAmount = context.fetchBulkPaymentRecordDetailsByIdSuccess.totalAmount;
                this.bulkPaymentRecordData.totalTransactions = context.fetchBulkPaymentRecordDetailsByIdSuccess.totalTransactions;
                this.fetchBulkPaymentOrders(this.bulkPaymentRecordData);
            } else if (context.fetchCancellationReasonsSuccess) {
                FormControllerUtility.hideProgressBar(false);
                this.showCancellationReasonsDropdown(context.fetchCancellationReasonsSuccess.cancellationreasons);
            } else if (context.getBeneficiaryNameSuccess) {
                if(context.getBeneficiaryNameSuccess.beneficiaryName === ""){
                    this.showBeneficiaryAccountErrorMessage(kony.i18n.getLocalizedString("i18n.TransferEur.inValidAccountNumber"));
                  }else{
                this.mapBeneficiaryName(context.getBeneficiaryNameSuccess);
                 }
            } else if (context.getBeneficiaryNameFailure) {
                this.showBeneficiaryAccountErrorMessage(context.getBeneficiaryNameFailure.errorMessage);
            } else if (context.validateIBANandGetBankDetailsSuccess) {
                this.OnValidatingIBAN(context.validateIBANandGetBankDetailsSuccess);
            } else if (context.validateIBANandGetBankDetailsFailure) {
                this.showInvalidIBANErrorMessage(context.validateIBANandGetBankDetailsFailure.errorMessage || context.validateIBANandGetBankDetailsFailure.dbpErrMsg);
            } else if (context.getBankDetailsFromBICSuccess) {
                this.OnValidatingSwiftCode(context.getBankDetailsFromBICSuccess);
            } else if (context.getBankDetailsFromBICFailure) {
                this.showInvalidSwiftCodeErrorMessage(context.getBankDetailsFromBICFailure.errorMessage);
            } else if (context.getAllBICsAndBankDetailsSuccess) {
                this.setLookUpSegmentData(context.getAllBICsAndBankDetailsSuccess.bankDetails);
            } else if (context.viewDeatilsApprovals) {
                this.paymentOrdersData = context.viewDeatilsApprovals;
                if (this.isMakerFlow) {
                    this.getRecipientData(this.isEditFlow, this.btnTextApprovalReq);
                    this.setAcknowledgementMessage();
                } else {
                    this.onViewDetailsScreenForApprovalDashboard(this.isEditFlow, this.btnTextApprovalReq);
                }
            } else if(context.key === BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP) {
              this.showPendingApprovalData(context.responseData);
            } else if(context.key === BBConstants.REQUEST_HISTORY_FAILURE_SIGNATORYGROUP) {
              this.showPendingApprovalData();
            } else if(context.key === BBConstants.RENOTIFY_PENDING_APPROVERS_SUCCESS) {
              this.reNotifySuccessCallback(context.responseData);
            } else if(context.key === BBConstants.RENOTIFY_PENDING_APPROVERS_FAILURE) {
              this.reNotifyFailureCallback();
            }
            this.view.forceLayout();
          if(kony.application.getCurrentBreakpoint() >1024 && this.isEditFlow)
            this.adjustScreen(-190);
          else if(kony.application.getCurrentBreakpoint() >1024 && !this.isEditFlow)
            this.adjustScreen(-160);
          else
            this.adjustScreen(-160);
        },

        /**
         * onPreShow :  onPreshow event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */

        onPreShow: function() {

            var scopeObj = this;
            this.view.customheader.forceCloseHamburger();
            this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"),
                kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentsStatus"));
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_FLEX_POINTER;
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.flxTitle.isVisible = false;
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.flxTitle.btnEdit.onClick = this.onEditReviewClick.bind(this);

            var onSegReload = function() {
                scopeObj.view.forceLayout();
                scopeObj.adjustScreen(10);
            };
            var paymentOrderAddPermissions = applicationManager.getConfigurationManager().getBulkPaymentRequestPaymentOrderAddPermissionList();
            var paymentOrderEditPermissions = applicationManager.getConfigurationManager().getBulkPaymentRequestPaymentOrderEditPermissionList();
            var paymentOrderRemovePermissions = applicationManager.getConfigurationManager().getBulkPaymentRequestPaymentOrderRemovePermissionList();
            this.hasPaymentOrderAddPermission = applicationManager.getConfigurationManager().checkAtLeastOnePermission(paymentOrderAddPermissions);
            this.hasPaymentOrderEditPermission = applicationManager.getConfigurationManager().checkAtLeastOnePermission(paymentOrderEditPermissions);
            this.hasPaymentOrderRemovePermission = applicationManager.getConfigurationManager().checkAtLeastOnePermission(paymentOrderRemovePermissions);
            this.view.TabBodyNew.setSegmentReloadAction(onSegReload);
            this.view.TabBodyNew.setExpandableRowHeight(202);
            this.view.TabBodyNew1.setSegmentReloadAction(onSegReload);
            this.view.TabBodyNew1.setExpandableRowHeight(202);
            this.initializeFetchParams();
            this.initializeDashboardSortParams();
            isackFlow = false;
            FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmountFormat);
            this.validateAmountFormat();
            this.view.forceLayout();
            //other lines of the below assignment can be removed but require testing.
            this.view.GenericMessageNew.closepopup = function() {
                scopeObj.view.flxGenericMessage.setVisibility(false);
            }
            this.adjustScreen(30);
        },

        /**
         * onPostShow :  postShow event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */

        onPostShow: function() {
            this.accessibilityFocusSetup();
         	this.view.NonEditableBulkPaymentDetails.flxTitle.top = "-45dp";
            this.view.NonEditableBulkPaymentDetails.flxBtmSeperator.width="100%";
            this.view.tbxSearchBox.placeholderSkin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
            this.view.tbxSearchBox.skin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
            this.view.tbxSearch.placeholderSkin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
            this.view.tbxSearch.skin = ViewConstants.SKINS.BULKPAYMENTS_SEARCHBOX_NORMAL;
            this.view.forceLayout();
            this.adjustScreen(10);
        },

        /**
         * onInit : onInit event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */

        onInit: function() {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer', 'flxHeaderMain','flxFormContent']);
            this.bulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            this.restrictSpecialCharacters();
        },


        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmACHDashboardController}
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
            this.adjustScreen(10);
        },

        /**
         * adjustScreen : Handles ui changes based on the screen size
         * @member of {frmBulkPaymentsDashboardController}
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
          
          this.view.flxFooter.top = "30dp";
          this.view.forceLayout();
        },

        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.tbxSearchBox, this.view.flxSearchRecipientsBox],
                [this.view.tbxSearch, this.view.flxBoxSearch],
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },

        /**
         * resetUI : function that hides all the UI flexes in frmBulkPaymentReview    
         */


        resetUI: function() {
			this.view.flxGenericMessage.isVisible = false;
            this.view.flxAcknowledgementContainer.isVisible = false;
            this.view.flxErrorMessage.isVisible = false;
            this.view.flxAddRecipientDetails.isVisible = false;
            this.view.flxApprovalsHistoryInformation.isVisible = false;
            this.view.flxAddRecipientsManually.isVisible = false;
            this.view.flxPaymentReview.isVisible = false;
            this.view.flxAckMessage.isVisible = false;
            this.view.flxPrint.isVisible = false;
            this.view.flxDownload.isVisible = false;
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.flxDisplayErrorMessage.isVisible = false;
            this.view.flxInformationText.isVisible = false;

            var breakpoint = kony.application.getCurrentBreakpoint();
            if (breakpoint <= 1024 || orientationHandler.isTablet) {
                this.view.CommonFormActionsNew.btnOption.width = "25%";
                this.view.CommonFormActionsNew.btnCancel.width = "25%";
                this.view.CommonFormActionsNew.btnNext.width = "25%";
                this.view.CommonFormActionsNew.btnBack.width = "25%";
            } else {
                this.view.CommonFormActionsNew.btnOption.width = "13%";
                this.view.CommonFormActionsNew.btnCancel.width = "13%";
                this.view.CommonFormActionsNew.btnNext.width = "13%";
                this.view.CommonFormActionsNew.btnBack.width = "13%";
            }
            this.view.CommonFormActionsNew.isVisible = true;
            this.view.formActionsNew.isVisible = false;
            this.view.flxAddPayment.isVisible = true;
            this.view.TabBodyNew1.isVisible = true;
            this.view.flxSearchRecipients.isVisible = true;
            this.view.CommonFormActionsExt.isVisible = false;
            this.view.PaginationContainer.isVisible = false;
            this.view.flxMainWrapper.setVisibility(false);

            this.adjustScreen(10);
            this.view.forceLayout();
        },
      
      validateAmountFormat: function(){
			this.view.forceLayout();
		},

        resetRecipientsUI: function() {
            this.view.flxAddType.isVisible = true;
            this.view.flxAccountType.isVisible = false;
            this.view.flxBankType.isVisible = true;
            this.view.flxRecipientDetailsInfinity.isVisible = true;
            this.view.flxRecipientDetailsExternal.isVisible = true;
            this.view.flxRecipientDetailsExisting.isVisible = true;
            this.view.flxAmount.isVisible = true;
            this.view.flxRecipientName.isVisible = true;
            this.view.flxFeesPaid.isVisible = true;
            this.view.flxInformationText.isVisible = false;
            this.view.flxPaymentRef.isVisible = true;
            this.view.flxAddToList.isVisible = false;
            this.view.flxInfo.isVisible = true;
            this.view.flxSwiftExisting.isVisible = true;
            this.view.lbxCurrency.isVisible = true;
            this.view.tbxCurrency.isVisible = false;
            this.view.tbxRecipientName.setEnabled(true);
            this.view.flxAccTypeRadio2.setEnabled(true);
            this.view.lblAccTypeRadio2.setEnabled(true);
            this.view.lblAccTypeRadio2.skin = ViewConstants.SKINS.BULKPAYMENTS_NOHYPERLINK_SKIN;
            this.view.btnLookUp.isVisible = false;
            this.view.flxLookupPopup.isVisible = false;
            this.setCurrencyData();

            var breakpoint = kony.application.getCurrentBreakpoint();
            if (breakpoint <= 1024 || orientationHandler.isTablet) {
                this.view.flxPaymentRef.bottom = "0dp";
            }
            this.adjustScreen(10);
            this.view.forceLayout();
        },

        clearRecipientsFields: function() {
            this.view.tbxRecipAccNumber.text = "";
            this.view.tbxRecipAccNumberExt.text = "";
            this.view.tbxSwift.text = "";
            this.view.tbxRecipientBankName.text = "";
            this.view.tbxAmount.text = "";
            this.view.tbxAmount.placeholder=CommonUtilities.formatCurrencyWithCommas("0", true);
            this.setCurrencyData();
            this.view.lbxCurrency.setEnabled(false);
            this.view.tbxSwift.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.tbxRecipAccNumberExt.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.tbxRecipientName.setEnabled(true);
            this.view.lblInvalidIBANInfinity.setVisibility(false);
            this.view.lblInvalidSwift.setVisibility(false);
            this.view.lblInvalidIBAN.setVisibility(false);
            this.view.tbxSwift.setEnabled(true);
            this.view.tbxRecipientBankName.setEnabled(true);
            this.view.tbxRecipientName.text = "";
            this.view.tbxPaymentRef.text = "";
            this.OnRadioBtnClickFeesPaidBy(3);
            this.view.flxInformationText.isVisible = false;
            this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.adjustScreen(10);
            this.view.forceLayout();
        },
      
      restrictSpecialCharacters: function() {
        var scopeObj = this;
        var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
        var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
        var numbersSet = "0123456789";

        scopeObj.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace('.', '') + alphabetsSet + alphabetsSet.toUpperCase();        
      },

        validateIBAN: function() {
            var scopeObj = this;
            var validationUtilityManager = applicationManager.getValidationUtilManager();
            var IBAN = scopeObj.view.tbxRecipAccNumberExt.text;
            if (IBAN !== "") {
                var regex = /^[0-9]+$/;
                if (IBAN.match(regex)) {
                    if (!validationUtilityManager.isValidAccountNumber(IBAN)) {
                        scopeObj.showInvalidIBANErrorMessage(kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidAccountNumberMessage"));
                    } else {
                        this.view.tbxSwift.text = "";
                        this.view.tbxRecipientBankName.text = "";
                        this.view.tbxSwift.setEnabled(true);
                        this.view.btnLookUp.isVisible = true;
                        this.view.tbxRecipientBankName.setEnabled(true);
                    }
                } else {
                        scopeObj.bulkPaymentsModule.presentationController.validateIBANandGetBankDetails(IBAN);
                }
            }
            scopeObj.view.forceLayout();
        },

        validateSwiftCode: function() {
            var scopeObj = this;
            var swiftCode = scopeObj.view.tbxSwift.text;
            var validationUtilityManager = applicationManager.getValidationUtilManager();
            if (swiftCode !== "") {
                if (!(validationUtilityManager.isValidSwiftCode(swiftCode))) {
                    scopeObj.showInvalidSwiftCodeErrorMessage(kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidSwiftCodeMessage"));
                } else {
                    scopeObj.bulkPaymentsModule.presentationController.getBankDetailsFromBIC(swiftCode);
                }
            }
            scopeObj.view.forceLayout();
        },

        mapBeneficiaryName: function(data) {
            this.view.tbxRecipientName.text = data.beneficiaryName;
            this.view.tbxRecipientName.setEnabled(false);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        OnValidatingIBAN: function(data) {
            this.view.tbxRecipientBankName.text = data.bankName;
            this.view.tbxRecipientBankName.setEnabled(false);
            this.view.tbxSwift.text = data.bic;
            this.view.tbxSwift.setEnabled(false);
            this.view.btnLookUp.isVisible = false;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        OnValidatingSwiftCode: function(data) {
            this.view.tbxRecipientBankName.text = data.bankName;
            this.view.tbxRecipientBankName.setEnabled(false);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        showBeneficiaryAccountErrorMessage: function(errmsg) {
            this.view.lblInvalidIBANInfinity.setVisibility(true);
            this.view.lblInvalidIBANInfinity.text = errmsg;
            this.view.tbxRecipientName.text = "";
            this.view.tbxRecipientName.setEnabled(true);
            this.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.BORDER;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        showInvalidSwiftCodeErrorMessage: function(errmsg) {
            this.view.lblInvalidSwift.setVisibility(true);
            this.view.lblInvalidSwift.text = errmsg;
            this.view.tbxRecipientBankName.text = "";
            this.view.tbxRecipientBankName.setEnabled(true);
            this.view.tbxSwift.skin = ViewConstants.SKINS.BORDER;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        showInvalidIBANErrorMessage: function(errmsg) {
            this.view.tbxRecipAccNumberExt.skin = ViewConstants.SKINS.BORDER;
            this.view.lblInvalidIBAN.text = errmsg;
            this.view.lblInvalidIBAN.setVisibility(true);
            this.view.tbxSwift.text = "";
            this.view.tbxSwift.setEnabled(true);
            this.view.tbxRecipientBankName.text = "";
            this.view.tbxRecipientBankName.setEnabled(true);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        showSwiftLookupPopup: function() {
          
          	var scope = this;
            scope.view.flxLookupPopup.height = scope.view.customheader.info.frame.height + scope.view.flxMain.info.frame.height + scope.view.flxFooter.info.frame.height;
            FormControllerUtility.scrollToCenterY(scope.view.flxLookupPopup.height);
            
          this.view.flxLookupPopup.setVisibility(true);
            this.view.flxNoResults.setVisibility(false);
            this.view.txtBankName.text = '';
            this.view.txtCity1.text = '';
            this.view.txtCountry1.text = '';
            this.view.segResults.setData([]);
            this.view.flxCrossLookup.onClick = function() {
                var scopeObj = this;
                scopeObj.view.flxLookupPopup.setVisibility(false);
            }.bind(this);
            this.view.btnSearch.onClick = this.searchSwiftLookUp;
            this.view.btnClearSearchBic.onClick = this.clearSwiftLookUpSearch;
            this.view.segResults.onRowClick = this.mapSwiftLookUpData;
        },

        setLookUpSegmentData: function(data) {

            var dataMap = {
                lblSwiftCodeValue: "swiftCode",
                lblBankValue: "bankName",
                lblCityNameValue: "cityName",
                lblCountryNameValue: "countryName",
                lblSelectSwift: "select",
            };

            if (data && data.length > 0) {
                this.view.segResults.widgetDataMap = dataMap;
                this.view.segResults.setData(data);
                this.view.flxNoResults.setVisibility(false);
                this.view.segResults.setVisibility(true);
            } else {
                this.view.flxNoResults.setVisibility(true);
                this.view.segResults.setVisibility(false);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        mapSwiftLookUpData: function(context) {
            var rowindex = this.view.segResults.selectedRowIndex[1];
            this.view.tbxSwift.text = this.view.segResults.data[rowindex].swiftCode;
            this.view.tbxRecipientBankName.text = this.view.segResults.data[rowindex].bankName;
            this.view.tbxSwift.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.lblInvalidSwift.setVisibility(false);
            this.view.tbxRecipientBankName.setEnabled(false);
            this.view.flxLookupPopup.setVisibility(false);
        },

        clearSwiftLookUpSearch: function() {
            this.view.txtBankName.text = '';
            this.view.txtCity1.text = '';
            this.view.txtCountry1.text = '';
            this.view.segResults.setData([]);
        },

        searchSwiftLookUp: function() {
            this.bulkPaymentsModule.presentationController.getAllBICsAndBankDetails();
        },

        fetchBeneficiaryName: function() {
            var accNumber = this.view.tbxRecipAccNumber.text;
            if(/^\d+$/.test(accNumber)){
            this.bulkPaymentsModule.presentationController.getBeneficiaryNameForCreateTemplate(accNumber);
            }else{
            this.showBeneficiaryAccountErrorMessage(kony.i18n.getLocalizedString("i18n.common.InvalidRecipientNumber"));
            }
        },

        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.BULKWIRETRANSFERCONSTANT.CURRENCIES;
        },

        setCurrencyData: function() {

            var formatManager = applicationManager.getFormatUtilManager();
            var defaultCurrency = formatManager.getCurrencySymbol(this.bulkPaymentRecordData.currency);
            var currencyList = FormControllerUtility.getListBoxDataFromObjects(this.getCurrency(), "name", "symbol");
            for (var i = 0; i < currencyList.length; i++) {
                switch (currencyList[i][0]) {
                    case "$":
                        currencyList[i][1] = "$ - USD";
                        break;
                    case "€":
                        currencyList[i][1] = "€ - EUR";
                        break;
                    case "₹":
                        currencyList[i][1] = "₹ - INR";
                        break;
                    case "£":
                        currencyList[i][1] = "£ - GBP";
                        break;
                }
            }
            this.view.lbxCurrency.masterData = currencyList;
            this.view.lbxCurrency.selectedKey = defaultCurrency !== "" ? defaultCurrency : currencyList[0][0];
        },

        enableOrDisableCurrencyListBox: function() {

            if (this.bulkPaymentRecordData.batchMode === BBConstants.BATCH_MODE_MULTI) {
                this.view.lbxCurrency.setEnabled(true);
            } else {
                this.view.lbxCurrency.setEnabled(false);
            }
            this.view.forceLayout();
        },


        initializeFetchParams: function() {
            this.fetchParams = {
                "limit": 10,
                "offset": 0,
                "order": "desc",
                "resetSorting": true,
                "sortBy": "createdOn"
            };

        },

        initializeDashboardSortParams: function() {
            this.dashboardSortParams = {
                "beneficiaryListing": {
                    "Name": "sortingfinal.png",
                    "Bank": "sortingfinal.png",
                    "Type": "sortingfinal.png"
                }
            };
        },

        updateFetchParams: function(sortParam, sortOrder) {
            this.fetchParams.searchString = CommonUtilities.validateSearchString(this.view.tbxSearch.text);
            if (!kony.sdk.isNullOrUndefined(sortParam))
                this.fetchParams.sortByParam = sortParam;
            if (!kony.sdk.isNullOrUndefined(sortOrder))
                this.fetchParams.sortOrder = sortOrder;

            if (!kony.sdk.isNullOrUndefined(sortParam))
                this.fetchParams.sortBy = sortParam;
            if (!kony.sdk.isNullOrUndefined(sortOrder))
                this.fetchParams.order = sortOrder;
            this.fetchParams.pageSize = this.view.PaginationContainer.getPageSize() + 1;
            this.fetchParams.pageOffset = this.view.PaginationContainer.getPageOffset();
            this.fetchParams.offset = this.view.PaginationContainer.getPageOffset();

            this.fetchParams.filterByParam = "";
            this.fetchParams.filterByValue = "";
        },

        showServerErrorMessage: function(context) {
            if (context.show) {
                this.view.flxDisplayErrorMessage.setVisibility(true);
                this.view.lblDisplayError.text = context.errorMessage || kony.i18n.getLocalizedString(context.errMsgi18nKey || "i18n.common.OoopsServerError");
                this.view.lblDisplayError.setFocus();
            } else {
                this.view.flxDisplayErrorMessage.setVisibility(false);
            }
            this.hidePopup();
            FormControllerUtility.hideProgressBar(this.view);
            this.adjustScreen(30);
        },


        setAcknowledgementMessage: function() {

            if (isackFlow === true) {
                this.view.flxAcknowledgementContainer.isVisible = true;
                this.view.flxAcknowledgementNew.rTextSuccess.skin = "sknRtxSSPLight42424224Px";
                this.view.flxAcknowledgementNew.rTextSuccess.text = ackMsg;
                this.view.flxAcknowledgementNew.imgTick.src="success_green.png";
                this.view.flxAcknowledgementNew.flxImgdownload.isVisible=true;
                this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                    var scopeObj = this;
                    scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
                    this.view.forceLayout();
                }.bind(this);

                isackFlow = false;
                this.adjustScreen(10);
                this.view.forceLayout();
            }
        },
      
      deFormatAmount: function(amount) {
            if (amount === undefined || amount === null) {
                return;
            }
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },


        mapBenificiaryData: function(isEditFlow, context) {
            if (!kony.sdk.isNullOrUndefined(isEditFlow) && isEditFlow === true) {
                var data = this.view.TabBodyNew1.getData()[context.sectionIndex][1];
                this.view.lblNameValue.text = data[context.rowIndex].lblViewRecipientName.text;
                this.view.lblAccountValue.text = data[context.rowIndex].accountNumber;
                this.view.lblBankNameValue.text = data[context.rowIndex].lblSwiftCodeValue.text;                
                this.view.tbxAmount.text= CommonUtilities.formatCurrencyWithCommas(data[context.rowIndex].amount, true);  
                if (!kony.sdk.isNullOrUndefined(data[context.rowIndex].paymentReference)) {
                    this.view.tbxPaymentRef.text = data[context.rowIndex].paymentReference;
                }

                if (data[context.rowIndex].feesPaidBy === BBConstants.SHARED) {
                    this.OnRadioBtnClickFeesPaidBy(3);
                } else if (data[context.rowIndex].feesPaidBy === BBConstants.BENEFICIARY) {
                    this.OnRadioBtnClickFeesPaidBy(2);
                } else {
                    this.OnRadioBtnClickFeesPaidBy(1);
                }

                if (data[context.rowIndex].lblPaymentMethodValue.text === BBConstants.INTERNAL) {
                    this.view.flxSwiftExisting.isVisible = false;
                    this.view.lblSwiftValue.text = "";
                    this.enableOrDisableCurrencyListBox();
                } else if (data[context.rowIndex].lblPaymentMethodValue.text === BBConstants.DOMESTIC) {
                    this.view.flxSwiftExisting.isVisible = true;
                    this.view.lblSwiftValue.text = data[context.rowIndex].lblAccTypeValue.text;
                    this.enableOrDisableCurrencyListBox();
                } else if (data[context.rowIndex].lblPaymentMethodValue.text === BBConstants.INTERNATIONAL) {
                    this.view.flxSwiftExisting.isVisible = true;
                    this.view.lblSwiftValue.text = data[context.rowIndex].lblAccTypeValue.text;
                    this.enableOrDisableCurrencyListBox();                                    
                }
              
              this.view.flxFeesPaid.isVisible = false;
              var formatManager = applicationManager.getFormatUtilManager();
              var defaultCurrency = formatManager.getCurrencySymbol(data[context.rowIndex].currency);
              this.view.lbxCurrency.selectedKey = defaultCurrency;
              this.view.lbxCurrency.setEnabled(false);
              this.view.lblSwiftValue.text = data[context.rowIndex].lblAccTypeValue.text;
			
            } else {
                var data = this.view.TabBodyNew.getData()[0][1];
                var selectedRow = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].lblSelect.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                        selectedRow = i;
                    }
                }
                this.view.lblNameValue.text = data[selectedRow].beneficiaryName;
                this.view.lblAccountValue.text = data[selectedRow].lblAccountNoValue.text;
                this.view.lblBankNameValue.text = data[selectedRow].lblBankName.text;
                this.view.lblBankNameKey.text = kony.i18n.getLocalizedString("i18n.payee.bankname");
                if (data[selectedRow].lblAccountType.text === BBConstants.INTERNAL) {
                    this.view.flxSwiftExisting.isVisible = false;
                    this.view.flxFeesPaid.isVisible = false;
                    this.view.lblSwiftValue.text = "";
                    this.enableOrDisableCurrencyListBox();
                } else if (data[selectedRow].lblAccountType.text === BBConstants.DOMESTIC) {
                    this.view.flxSwiftExisting.isVisible = true;
                    this.view.flxFeesPaid.isVisible = true;
                    this.view.lblSwiftValue.text = data[selectedRow].lblAccTypeValue.text;
                    this.enableOrDisableCurrencyListBox();
                } else if (data[selectedRow].lblAccountType.text === BBConstants.INTERNATIONAL) {
                    this.view.flxSwiftExisting.isVisible = true;
                    this.view.flxFeesPaid.isVisible = true;
                    this.view.lblSwiftValue.text = data[selectedRow].lblAccTypeValue.text;
                    this.enableOrDisableCurrencyListBox();
                }

            }
          FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmountFormat);
          this.validateAmountFormat();
        },

        /**
         * function to display the add recipients screen  on continue
         */

        onClickContinueAddExistingRecipients: function() {
            this.resetUI();
            this.clearRecipientsFields();
            this.resetRecipientsUI();
            this.mapBenificiaryData();
            this.view.tbxSearch.text = "";
            this.view.imgClear.isVisible = false;
            this.view.flxAddRecipientsManually.isVisible = true;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.AddPaymentHeader");
            this.view.lblAddHeader.text = kony.i18n.getLocalizedString("i18n.common.PaymentDetails");
            this.view.flxAddType.isVisible = false;
            this.view.flxBankType.isVisible = false;
            this.view.flxRecipientDetailsInfinity.isVisible = false;
            this.view.flxRecipientDetailsExternal.isVisible = false;
            this.view.flxRecipientName.isVisible = false;
            this.view.flxAddToList.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
            this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnBack.onClick = this.fetchBulkPaymentOrders.bind(this, this.bulkPaymentRecordData);
            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.CommonFormActionsNew.btnCancel.onClick = this.showAddRecipientsScreenUI.bind(this);
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnOption.isVisible = true;
            this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
            this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
            this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnOption.hoverSkin = ViewConstants.SKINS.HOVER;
            FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnOption);
            this.view.CommonFormActionsNew.btnNext.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.onClick = this.addExistingRecipientsPaymentOrder.bind(this);
            this.view.flxFeesTypeRadio1.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 1);
            this.view.flxFeesTypeRadio2.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 2);
            this.view.flxFeesTypeRadio3.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 3);
            this.view.flxInfo.onClick = this.OnFlxInfoClick.bind(this);

            var breakpoint = kony.application.getCurrentBreakpoint();
            if (breakpoint <= 1024 || orientationHandler.isTablet) {
                this.view.flxPaymentRef.bottom = "75dp";
            }
            FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmountFormat);
            this.view.tbxPaymentRef.onKeyUp = this.enableOrDisableAddOrEditForPaymentOrders.bind(this);
            this.view.tbxAmount.onKeyUp = this.enableOrDisableAddOrEditForPaymentOrders.bind(this);
            this.adjustScreen(0);
            this.view.forceLayout();
        },

        enableOrDisableAddOrEditForPaymentOrders: function() {
            var scopeObj = this;
            var regEx =  /^[ A-Za-z0-9-.,'?+:/()]*$/;
            if ((CommonUtilities.isEmptyString(scopeObj.view.tbxAmount.text)) ||
                (CommonUtilities.isEmptyString(scopeObj.view.tbxPaymentRef.text)) || 
                !regEx.test(this.view.tbxPaymentRef.text)) {
                FormControllerUtility.disableButton(scopeObj.view.CommonFormActionsNew.btnOption);
            } else {
                FormControllerUtility.enableButton(scopeObj.view.CommonFormActionsNew.btnOption);
            }
            if (regEx.test(this.view.tbxPaymentRef.text)) {
                this.view.tbxPaymentRef.skin = "sknTbxSSPffffff15PxBorder727272opa20";
                this.view.lblValidDescription.setVisibility(true);
                this.view.lblInvalidDescription.setVisibility(false);
            } else{
                this.view.tbxPaymentRef.skin = "ICSknskntxtSSP424242BorderFF0000Op100Radius2px";
                this.view.lblValidDescription.setVisibility(false);
                this.view.lblInvalidDescription.setVisibility(true);
            }
            FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmountFormat);
            this.validateAmountFormat();
        },

        addExistingRecipientsPaymentOrder: function() {

            var feesPaid = "";
            if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt1.text;
            } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt2.text;
            } else {
                feesPaid = this.view.lblFeesOpt3.text;
            }

            var data = this.view.TabBodyNew.getData()[0][1];
            var selectedRow = "";
            for (var i = 0; i < data.length; i++) {
                if (data[i].lblSelect.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    selectedRow = i;
                }
            }
            var paymentMethod = data[selectedRow].lblAccountType.text;
            var formatManager = applicationManager.getFormatUtilManager();
            var currency = formatManager.getCurrencySymbolCode(this.view.lbxCurrency.selectedKey);

            var requestParams = {
                "recordId": this.bulkPaymentRecordData.recordId,
                "recipientName": this.view.lblNameValue.text,
                "accountNumber": this.view.lblAccountValue.text,
                "bankName":  kony.sdk.isNullOrUndefined(data[selectedRow].bankName) ? "" : data[selectedRow].bankName,
                "swift": this.view.lblSwiftValue.text,
                "currency": currency,
                "amount": this.deFormatAmount(this.view.tbxAmount.text),
                "feesPaidBy": feesPaid,
                "paymentReference": this.view.tbxPaymentRef.text,
                "paymentMethod": paymentMethod,
                "addToList": false,
                "paymentOrderProduct": this.bulkPaymentRecordData.paymentOrderProduct,
                "fromAccount": this.bulkPaymentRecordData.fromAccount
            }

            this.bulkPaymentsModule.presentationController.addPaymentOrder(requestParams);
        },

        setPaginationComponentForBeneficiaries: function(pageHeader) {
            this.view.PaginationContainer.setPageSize(BBConstants.PAGE_SIZE);
            this.view.PaginationContainer.setPageHeader(pageHeader);
            this.view.PaginationContainer.setLowerLimit(1);
            this.view.PaginationContainer.setServiceDelegate(this.fetchBeneficiaries);
        },

        fetchBeneficiaries: function() {
            this.updateFetchParams();
            this.view.PaginationContainer.setIntervalHeaderForBulkpayments();
            this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams, this.bulkPaymentRecordData.batchMode, this.bulkPaymentRecordData.fromAccount);
        },

        invokefetchBeneficiaries: function() {
            this.setPaginationComponentForBeneficiaries(BBConstants.RECORDS);
            this.fetchBeneficiaries();
        },

        updatePaginationContainerUI: function(responseData) {
            var isMaxLimitReached = responseData.length + 1 < this.view.PaginationContainer.getPageSize();
            this.view.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
            this.view.PaginationContainer.updateUI();
        },

        onExisitngBeneficiariesSearchDone: function() {
            this.updateFetchParams();
            this.view.PaginationContainer.isVisible = false;
            this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams, this.bulkPaymentRecordData.batchMode, this.bulkPaymentRecordData.fromAccount);
        },

        onExisitngBeneficiariesKeyUp: function() {
            this.view.imgClear.isVisible = true;
            this.view.imgClear.onTouchStart = function() {
                this.view.tbxSearch.text = "";
                this.view.imgClear.isVisible = false;
                this.view.PaginationContainer.isVisible = true;
                this.invokefetchBeneficiaries();
            }.bind(this);
        },

        showNoBeneficiaries: function(msgText) {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxBulkPayementRowHeader: {
                    "isVisible": false
                },
                flxBulkPayementRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                }
            };
            var sectionData = this.getBeneficiaryListingSectionData();
            this.view.TabBodyNew.setSectionData([sectionData]);
            this.view.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabBodyNew.setDefaultValues([defValues]);
            var rowData = [{
                "lblMsg": {
                    "text": msgText
                }
            }];
            this.view.TabBodyNew.addRowsData([rowData]);
            this.view.PaginationContainer.isVisible = false;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        /**
         * function to display the add recipients screen  
         */

        showAddRecipientsScreenUI: function() {

            this.resetUI();
            this.clearRecipientsFields();
            this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            this.view.CommonFormActionsExt.isVisible = true;
            this.view.CommonFormActionsNew.isVisible = false;
            this.view.PaginationContainer.isVisible = true;
            this.view.flxAddRecipientDetails.isVisible = true;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.AddPaymentHeader");
            this.view.lblRecordHeader1.text = kony.i18n.getLocalizedString("i18n.common.PaymentDetails");
            this.view.TabBodyNew.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
            this.view.TabBodyNew.segTemplates.sectionHeaderTemplate = "flxBulkPayementHeader";
            this.view.CommonFormActionsExt.btnBack.isVisible = true;
            this.view.CommonFormActionsExt.btnBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.CommonFormActionsExt.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.CommonFormActionsExt.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsExt.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsExt.btnNext.isVisible = true;
            this.view.CommonFormActionsExt.btnNext.text = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.CommonFormActionsExt.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.CommonFormActionsExt.btnNext.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsExt.btnNext.hoverSkin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsExt.btnNext.onClick = this.onClickContinueAddExistingRecipients.bind(this);
            this.view.CommonFormActionsExt.btnBack.onClick = this.fetchBulkPaymentOrders.bind(this, this.bulkPaymentRecordData);
            this.view.flxAddType2Radio1.onClick = this.showAddRecipientsManuallyScreenUI.bind(this);
            this.view.CommonFormActionsExt.btnCancel.isVisible = false;
            this.view.CommonFormActionsExt.btnOption.isVisible = false;
            this.view.tbxSearch.onDone = this.onExisitngBeneficiariesSearchDone.bind(this);
            this.view.tbxSearch.onKeyUp = this.onExisitngBeneficiariesKeyUp.bind(this);
            FormControllerUtility.disableButton(this.view.CommonFormActionsExt.btnNext);
            var scopeObj = this;
			scopeObj.setPermissionBasedUIonAddPOClick();
            scopeObj.invokefetchBeneficiaries();
			scopeObj.view.forceLayout();
      },

        showBeneficiaryListingErrorMessage: function(msgText) {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "450dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxBulkPayementRowHeader: {
                    "isVisible": false
                },
                flxBulkPayementRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true
                }
            };
            var sectionData = this.getBeneficiaryListingSectionData();
            this.view.TabBodyNew.setSectionData([sectionData]);
            this.view.TabBodyNew.setRowDataMap([dataMap]);
            this.view.TabBodyNew.setDefaultValues([defValues]);
            this.view.TabBodyNew.addRowsData([
                [{
                    "lblMsg": {
                        "skin": ViewConstants.SKINS.RTEXT_ERROR_DESKTOP,
                        "text": msgText
                    },
                }]
            ]);
            this.view.PaginationContainer.isVisible = false;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        getBeneficiaryListingSectionData: function() {

            var sectionData = {
                flxAddRecipients: {
                    "isVisible": true
                },
                flxEditRecipients: {
                    "isVisible": false
                },
                flxViewRecipients: {
                    "isVisible": false
                },
                btnRecipientName: {
                    "text":  kony.i18n.getLocalizedString("kony.mb.BenName.Title")
                },
                imgSortRecpName: this.dashboardSortParams.beneficiaryListing.Name,
                btnBankName: {
                    "text":  kony.i18n.getLocalizedString("i18n.verifyDetails.bankName")
                },
                imgSortBankName: this.dashboardSortParams.beneficiaryListing.Bank,
                btnAccountType: {
                    "text":  kony.i18n.getLocalizedString("kony.mb.common.paymentMethod")
                },
                imgSortAccountType: this.dashboardSortParams.beneficiaryListing.Type,
                btnSelectAll: {
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.selectBatchMode")
                },
                flxRecipientName: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.beneficiaryListing.Name;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "desc";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "desc" : "asc";
                        }
                        this.dashboardSortParams.beneficiaryListing.Name = img;
                        this.updateFetchParams("beneficiaryName", order);
                        this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams, this.bulkPaymentRecordData.batchMode, this.bulkPaymentRecordData.fromAccount);
                    }.bind(this)
                },
                flxBankName: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.beneficiaryListing.Bank;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "desc";
                        } else {
                            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
                            var order = (img === "sorting_next.png") ? "desc" : "asc";
                        }
                        this.dashboardSortParams.beneficiaryListing.Bank = img;
                        this.updateFetchParams("bankName", order);
                        this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams, this.bulkPaymentRecordData.batchMode,this.bulkPaymentRecordData.fromAccount);
                    }.bind(this)
                },
                flxAccountType: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        var img = this.dashboardSortParams.beneficiaryListing.Type;
                        if (img === "sortingfinal.png") {
                            img = "sorting_next.png";
                            var order = "asc";
                            var param = "isInternationalAccount";

                            this.dashboardSortParams.beneficiaryListing.Type = img;
                            this.updateFetchParams(param, order);
                            this.bulkPaymentsModule.presentationController.getExistingBeneficiaries(this.fetchParams, this.bulkPaymentRecordData.batchMode,this.bulkPaymentRecordData.fromAccount);
                        } else {
                            this.view.TabBodyNew.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
                            this.dashboardSortParams.beneficiaryListing.Type = "sortingfinal.png";
                        }
                    }.bind(this)
                }

            };

            return sectionData;
        },

        mapBeneficiaryListingData: function(response) {

            var sectionData = this.getBeneficiaryListingSectionData();
            var defaultValues = {
                flxMain: {
                    "height": "51dp"
                },
                flxBulkPayementRowHeader: {
                    "skin": "bbSKnFlxffffff"
                },
                flxRecipientsType: {
                    "isVisible": false
                },
                flxSeperator: {
                    "isVisible": false
                },
                flxAddRecipientsRowHeader: {
                    "isVisible": true
                },
                flxEditRecipientsRowHeader: {
                    "isVisible": false
                },
                flxViewRecipientsRowHeader: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": false
                },
                flxBulkPayementRowDetails: {
                    "isVisible": true
                },
                imgDropDown: {
                    "skin": ViewConstants.SKINS.DRP_DWN_OTHER,
                    "text": ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS,
                    "isVisible": true
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj = {
                      "section": secIndex,
                      "row": rowIndex,
                      "direction": 1
                    };
                    this.view.TabBodyNew.showOrHideDetails(conObj);
                  }.bind(this)
                },
                lblSelect: {
                    "isVisible": true
                },
                flxActions: {
                    "isVisible": false
                },
                flxSelect: {
                    "isVisible": true,
                    "onClick": function(eventobject, context) {
                        this.onSelectExistingRecipient(eventobject, context);
                    }.bind(this)
                },
                lblAccountNo: {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
                    "isVisible": true,
                },
                lblSwiftCode: {
                    "text": kony.i18n.getLocalizedString("kony.mb.Manage.NickName"),
                    "isVisible": true,
                },
                lblPayRef: {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
                    "isVisible": false,
                },
                lblFees: {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                    "isVisible": false,
                },
                lblPayRefValue: {
                    "isVisible": false
                },
                lblFeesValue: {
                    "isVisible": false
                }

            };
            var rowDataMap = {
                lblRecipientName: "beneficiaryName",
                lblBankName: "lblBankName",
                lblAccountType: "lblAccountType",
                lblAccountNo: "lblAccountNo",
                lblAccountNoValue: "lblAccountNoValue",
                lblAccType: "lblSwiftName",
                lblAccTypeValue: "lblAccTypeValue",
                lblSwiftCode: "lblSwiftCode",
                lblSwiftCodeValue: "lblNickName"
            };
			 var internationalBeneficiaries = [];
			 var domesticBeneficiaries = [];
			 var internalBeneficiaries = [];
			 response.forEach(function(transaction) {
				if (transaction.lblAccountType.text == "International") {
                    internationalBeneficiaries.push(transaction);
                }
                if (transaction.lblAccountType.text == "Domestic") {
                    domesticBeneficiaries.push(transaction);
                }
				if (transaction.lblAccountType.text == "Internal") {
                    internalBeneficiaries.push(transaction);
                }				
                        
              
			});
			var finaldata=[];
			if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === true)) {
                finaldata = internalBeneficiaries;
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === true)) {
                finaldata = finaldata.concat(internationalBeneficiaries);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === true)) {
                finaldata = finaldata.concat(domesticBeneficiaries);
            }
            if (kony.sdk.isNullOrUndefined(finaldata)) finaldata = [this.view.TabBodyNew.getData()[0][1]];
            this.updatePaginationContainerUI(finaldata);
            this.view.TabBodyNew.setSectionData([sectionData]);
            if (finaldata.length === 0) {
                this.showNoBeneficiaries(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noExistingBeneficiaries"));
            } else {
                this.view.TabBodyNew.setRowDataMap([rowDataMap]);
                this.view.TabBodyNew.setDefaultValues([defaultValues]);
                this.view.TabBodyNew.addDataForSections([finaldata]);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.adjustScreen(-50);
            this.view.forceLayout();
        },

        onSelectExistingRecipient: function(eventobject, context) {
            var row = context.rowIndex;
            var section = context.sectionIndex;
            var data = this.view.TabBodyNew.getData()[section][1];
            var lblSelect = "";

            for (var i = 0; i < data.length; i++) {
                lblSelect = data[i].lblSelect;
                lblSelect.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                lblSelect.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.TabBodyNew.updateKeyAt("lblSelect", lblSelect, i, section);
            }


            lblSelect = data[row].lblSelect;
            lblSelect.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            lblSelect.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.TabBodyNew.updateKeyAt("lblSelect", lblSelect, row, section);
            FormControllerUtility.enableButton(this.view.CommonFormActionsExt.btnNext);

        },

        OnFlxInfoClick: function() {

            if (this.view.flxInformationText.isVisible === true) {
                this.view.flxInformationText.isVisible = false;
            } else {
                this.view.flxInformationText.isVisible = true;
                this.view.flxCross.onTouchEnd = function() {
                    var scopeObj = this;
                    scopeObj.view.flxInformationText.isVisible = false;
                }.bind(this);
            }
            this.view.forceLayout();
            this.adjustScreen(10);
        },

        OnRadioBtnClickFeesPaidBy: function(btnId) {
            var RadioBtn1 = this.view.imgFees1Type2;
            var RadioBtn2 = this.view.imgFees2Type2;
            var RadioBtn3 = this.view.imgFees3Type2;

            if (btnId === 1) {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.adjustScreen(10);
            } else if (btnId === 2) {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.adjustScreen(10);
            } else {
                RadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.adjustScreen(10);
            }

        },

        RadioBtnAction: function() {
            var RadioBtn1 = this.view.imgRadioBtnRecipientType1;
            var RadioBtn2 = this.view.imgRadioBtnRecipientType2;

            this.view.imgRadioBtnACCType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnACCType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgRadioBtnACCType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;

            if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.flxRecipientDetailsInfinity.isVisible = false;
                this.view.flxRecipientDetailsExternal.isVisible = true;
                this.view.flxFeesPaid.isVisible = true;
                this.view.btnLookUp.isVisible = true;
                this.view.flxAccountType.isVisible = true;
              	this.OnRadioBtnClickFeesPaidBy(3);
                if (this.bulkPaymentRecordData.batchMode === BBConstants.BATCH_MODE_MULTI) {
                    this.view.flxAccTypeRadio2.setEnabled(true);
                    this.view.lblAccTypeRadio2.setEnabled(true);
                } else {
                     /*this.view.flxAccTypeRadio2.setEnabled(false);
                    this.view.lblAccTypeRadio2.setEnabled(false);
                    this.view.lblAccTypeRadio2.skin = ViewConstants.SKINS.RADIOBTN_LBL_DISABLED_FONT;
                    this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_DISABLED_FONT;*/
                }
                this.view.forceLayout();
                this.adjustScreen(10);
            } else {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.flxRecipientDetailsInfinity.isVisible = true;
                this.view.flxRecipientDetailsExternal.isVisible = false;
                this.view.flxFeesPaid.isVisible = false;
                this.view.flxAccountType.isVisible = false;
                this.view.btnLookUp.isVisible = false;
                this.adjustScreen(10);
            }
            FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnNext);
            this.clearRecipientsFields();
            this.enableOrDisableCurrencyListBox();
            this.setPermissionBasedUIonExternalClick();
        },

        OnRadioBtnClickAccountType: function() {
            var RadioBtn1 = this.view.imgRadioBtnACCType1;
            var RadioBtn2 = this.view.imgRadioBtnACCType2;
            if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.clearRecipientsFields();
                this.enableOrDisableCurrencyListBox();
                this.adjustScreen(10);
            } else {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.clearRecipientsFields();
                this.enableOrDisableCurrencyListBox();
                this.adjustScreen(10);
            }
          	this.OnRadioBtnClickFeesPaidBy(3);
            FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnNext);
        },

        /**
         * function to display the add recipients screen manually 
         */

        showAddRecipientsManuallyScreenUI: function() {

            this.resetUI();
            this.clearRecipientsFields();
            this.resetRecipientsUI();
            this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            this.view.tbxSearch.text = "";
            this.view.imgClear.isVisible = false;
            this.view.flxAddRecipientsManually.isVisible = true;
            this.view.flxAddToList.isVisible = true;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.AddPaymentHeader");
            this.view.lblAddHeader.text = kony.i18n.getLocalizedString("i18n.common.PaymentDetails");
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.flxRecipientDetailsInfinity.isVisible = true;
            this.view.flxRecipientDetailsExternal.isVisible = false;
            this.view.flxRecipientDetailsExisting.isVisible = false;
            this.view.flxFeesPaid.isVisible = false;
            this.view.btnLookUp.onClick = this.showSwiftLookupPopup.bind(this);
            this.view.tbxSwift.onEndEditing = this.validateSwiftCode.bind(this);
            this.view.tbxSwift.onBeginEditing = function() {
                var scopeObj = this;
                scopeObj.view.tbxSwift.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                scopeObj.view.lblInvalidSwift.setVisibility(false);
                scopeObj.view.forceLayout();
            }.bind(this);
            this.view.tbxRecipAccNumberExt.onEndEditing = this.validateIBAN.bind(this);
            this.view.tbxRecipAccNumberExt.onBeginEditing = function() {
                var scopeObj = this;
                scopeObj.view.tbxRecipAccNumberExt.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                scopeObj.view.lblInvalidIBAN.setVisibility(false);
                scopeObj.view.forceLayout();
            }.bind(this);
			this.view.tbxRecipAccNumber.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
            this.view.tbxRecipAccNumber.onEndEditing = this.fetchBeneficiaryName.bind(this);
            this.view.tbxRecipAccNumber.onBeginEditing = function() {
                var scopeObj = this;
                scopeObj.view.tbxRecipAccNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
                scopeObj.view.lblInvalidIBANInfinity.setVisibility(false);
                scopeObj.view.forceLayout();
            }.bind(this);
            this.view.flxTypeRadio1.onClick = this.RadioBtnAction.bind(this);
            this.view.flxTypeRadio2.onClick = this.RadioBtnAction.bind(this);
            this.view.flxAccTypeRadio1.onClick = this.OnRadioBtnClickAccountType.bind(this);
            this.view.flxAccTypeRadio2.onClick = this.OnRadioBtnClickAccountType.bind(this);
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
            this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnNext.isVisible = true;
            this.view.CommonFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
            this.view.CommonFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
            this.view.CommonFormActionsNew.btnNext.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnNext.onClick = this.addNewRecipientsPaymentOrder.bind(this);
            FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnNext);
            this.view.CommonFormActionsNew.btnBack.onClick = this.fetchBulkPaymentOrders.bind(this, this.bulkPaymentRecordData);
            this.view.flxAddTypeRadio2.onClick = this.showAddRecipientsScreenUI.bind(this);
            this.view.flxFeesTypeRadio1.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 1);
            this.view.flxFeesTypeRadio2.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 2);
            this.view.flxFeesTypeRadio3.onClick = this.OnRadioBtnClickFeesPaidBy.bind(this, 3);
            this.view.flxInfo.onClick = this.OnFlxInfoClick.bind(this);
            this.view.CommonFormActionsNew.btnCancel.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.isVisible = false;
            this.view.lblSelect.onTouchEnd = this.onCheckBoxClick.bind(this);
            this.view.tbxRecipAccNumber.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxRecipAccNumberExt.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxSwift.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxRecipientBankName.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxAmount.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxRecipientName.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.view.tbxPaymentRef.onKeyUp = this.enableOrDisableAddOnValidRecipientDetails.bind(this);
            this.enableOrDisableCurrencyListBox();
            this.setPermissionBasedUIonAddPOClick();
            this.adjustScreen(10);
            this.view.forceLayout();
        },

        addNewRecipientsPaymentOrder: function() {

            var feesPaid = "";
            var accNum = "";
            var bankName = "";
            var paymentMethod = "";

            if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt1.text;
            } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt2.text;
            } else {
                feesPaid = this.view.lblFeesOpt3.text;
            }

            if (this.view.tbxRecipAccNumber.text === "") {
                accNum = this.view.tbxRecipAccNumberExt.text;
            } else {
                accNum = this.view.tbxRecipAccNumber.text;
            }

            if (this.view.tbxRecipientBankName.text === "") {
                bankName = this.view.lblRadioOpt1.text;
            } else {
                bankName = this.view.tbxRecipientBankName.text;
            }

            if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                paymentMethod = BBConstants.INTERNAL;
            } else {
                if (this.view.imgRadioBtnACCType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    paymentMethod = BBConstants.DOMESTIC;
                } else {
                    paymentMethod = BBConstants.INTERNATIONAL;
                }
            }
            var addToList = false;
            if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                addToList = true;
            }

            var formatManager = applicationManager.getFormatUtilManager();
            var currency = formatManager.getCurrencySymbolCode(this.view.lbxCurrency.selectedKey);

            var requestParams = {
                "recordId": this.bulkPaymentRecordData.recordId,
                "recipientName": this.view.tbxRecipientName.text,
                "accountNumber": accNum,
                "bankName": bankName,
                "swift": this.view.tbxSwift.text,
                "currency": currency,
                "amount": this.deFormatAmount(this.view.tbxAmount.text),
                "feesPaidBy": feesPaid,
                "paymentReference": this.view.tbxPaymentRef.text,
                "paymentMethod": paymentMethod,
                "addToList": addToList,
                "paymentOrderProduct": this.bulkPaymentRecordData.paymentOrderProduct,
              	"fromAccount": this.bulkPaymentRecordData.fromAccount
            }

            this.bulkPaymentsModule.presentationController.addPaymentOrder(requestParams);
        },


        /* validate all recipient details */
        enableOrDisableAddOnValidRecipientDetails: function() {

            var RadioBtn1 = this.view.imgRadioBtnRecipientType1;
            var regEx =  /^[ A-Za-z0-9-.,'?+:/()]*$/;
            if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                this.view.tbxRecipAccNumber.text = this.view.tbxRecipAccNumber.text.toUpperCase();
                if ((CommonUtilities.isEmptyString(this.view.tbxRecipAccNumber.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxAmount.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxRecipientName.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxPaymentRef.text)) ||
                    !regEx.test(this.view.tbxPaymentRef.text)) {
                    FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnNext);
                } else {
                    FormControllerUtility.enableButton(this.view.CommonFormActionsNew.btnNext);
                }
            } else {
                this.view.tbxRecipAccNumberExt.text = this.view.tbxRecipAccNumberExt.text.toUpperCase();
                this.view.tbxSwift.text = this.view.tbxSwift.text.toUpperCase();
                if ((CommonUtilities.isEmptyString(this.view.tbxRecipAccNumberExt.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxSwift.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxRecipientBankName.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxAmount.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxRecipientName.text)) ||
                    (CommonUtilities.isEmptyString(this.view.tbxPaymentRef.text)) ||
                    !regEx.test(this.view.tbxPaymentRef.text)) {
                    FormControllerUtility.disableButton(this.view.CommonFormActionsNew.btnNext);
                } else {
                    FormControllerUtility.enableButton(this.view.CommonFormActionsNew.btnNext);
                }
            }
            if (regEx.test(this.view.tbxPaymentRef.text)) {
                this.view.tbxPaymentRef.skin = "sknTbxSSPffffff15PxBorder727272opa20";
                this.view.lblValidDescription.setVisibility(true);
                this.view.lblInvalidDescription.setVisibility(false);
            } else{
                this.view.tbxPaymentRef.skin = "ICSknskntxtSSP424242BorderFF0000Op100Radius2px";
                this.view.lblValidDescription.setVisibility(false);
                this.view.lblInvalidDescription.setVisibility(true);
            }
          FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmountFormat);
          this.validateAmountFormat();
        },

        onCheckBoxClick: function() {

            if (this.view.lblSelect.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
            } else {
                this.view.lblSelect.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            }
        },
      
      onTransactionOrdersSearchDone: function() {
            var requestData = {};
            requestData.recordId = this.bulkPaymentRecordData.transactionId;
            requestData.searchString = this.view.tbxSearchBox.text;
            this.getTransactionOrders(requestData);			
        },
        onTransactionOrdersKeyUp: function() {
            var requestData = {};
            requestData.recordId = this.bulkPaymentRecordData.transactionId;
            this.view.imgClearIcon.isVisible = true;
            this.view.imgClearIcon.onTouchStart = function() {
                this.view.tbxSearchBox.text = "";
                this.view.imgClearIcon.isVisible = false;
                this.getTransactionOrders(requestData);
            }.bind(this);
        },

        onPaymentOrdersSearchDone: function() {
            var requestData = {};
            requestData.recordId = this.bulkPaymentRecordData.recordId;
            requestData.searchString = this.view.tbxSearchBox.text;
            this.getPaymentOrders(requestData);
        },

        onPaymentOrdersKeyUp: function() {
            var requestData = {};
            requestData.recordId = this.bulkPaymentRecordData.recordId;
            this.view.imgClearIcon.isVisible = true;
            this.view.imgClearIcon.onTouchStart = function() {
                this.view.tbxSearchBox.text = "";
                this.view.imgClearIcon.isVisible = false;
                this.getPaymentOrders(requestData);
            }.bind(this);
        },

        getRecipientData: function(isEditFlow, BackButtonText) {
            this.resetUI();
            var flag;
            if (isEditFlow === true) flag = false;
            else flag = true;
            this.view.flxAckMessage.isVisible = false;
            this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentsReview");
            
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let noOfTrans = kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let status = kony.i18n.getLocalizedString("i18n.serviceRequests.Status");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let errDes = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ErrorDescription");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            var templateData = {};
            templateData[fromAccount] = this.bulkPaymentRecordData.fromAccountMasked ;
            templateData[paymentDes] =  this.bulkPaymentRecordData.description ;
            templateData[exeDate] = this.bulkPaymentRecordData.paymentDate;
            templateData[totalAm] = this.bulkPaymentRecordData.totalAmount;
            templateData[noOfTrans] = this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] = this.bulkPaymentRecordData.recordId;
            templateData[status] = this.bulkPaymentRecordData.status;
            templateData[processMode] = this.bulkPaymentRecordData.batchMode;
            templateData[errDes] = "--";

          if(this.isErrorFlow){
            
            var errorData ="";
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.bulkErrorDetails) 
                && this.bulkPaymentRecordData.bulkErrorDetails.length > 0) {
              for(var i=0; i<this.bulkPaymentRecordData.bulkErrorDetails.length;i++){
                var x=i+1;
                errorData= errorData + x + ". " + this.bulkPaymentRecordData.bulkErrorDetails[i].errorDescription + "\n" + "\n";
              }
            } 
            else{
              errorData ="--";
            }

            var templateData = {};
            templateData[fromAccount] = this.bulkPaymentRecordData.fromAccountMasked;
            templateData[paymentDes] =  this.bulkPaymentRecordData.description;
            templateData[exeDate] =  this.bulkPaymentRecordData.paymentDate;
            templateData[totalAm] =  this.bulkPaymentRecordData.totalAmount;
            templateData[noOfTrans] = this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] = this.bulkPaymentRecordData.recordId;
            templateData[status] =  this.bulkPaymentRecordData.status;
            templateData[processMode] =this.bulkPaymentRecordData.batchMode ;
            templateData[errDes] = errorData;                    
                                
          }
            if (this.isMakerHistoryFlow) {
                var templateData = {};
                let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
                templateData[paymentDes] = this.bulkPaymentRecordData.description;
                templateData[intiatedBy] = this.bulkPaymentRecordData.initiatedBy;
                templateData[transferInitiatedOn]= this.bulkPaymentRecordData.scheduledDate;
                templateData[exeDate] = this.bulkPaymentRecordData.paymentDate;
                templateData[totalAm] =   this.bulkPaymentRecordData.totalAmount;
                templateData[fromAccount] = this.bulkPaymentRecordData.fromAccountMasked;
                templateData[noOfTrans] =  this.bulkPaymentRecordData.totalTransactions;
                templateData[bulkPaymentID] =  this.bulkPaymentRecordData.recordId;
                templateData[processMode] = this.bulkPaymentRecordData.batchMode ;
                this.view.flxPaymentReview.NonEditableBulkPaymentDetails.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentSummary");
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentsViewpaymentdetails");
            }

            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.NonEditableBulkPaymentDetails.isVisible = true;
            this.view.flxPaymentReview.isVisible = true;
            this.view.flxSearchBar.isVisible = true;
            this.view.tbxSearch.text = "";
            this.view.imgClear.isVisible = false;
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            this.view.lblRecordHeader.skin = "bbSknLbl424242SSPS15Px";
            this.view.lblRecordHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
            this.view.TabBodyNew1.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
            this.view.TabBodyNew1.segTemplates.sectionHeaderTemplate = "flxBulkPayementHeader";
            if(!flag)
            this.view.TabBodyNew1.segTemplates.bottom = "-2dp";
		    else
			this.view.TabBodyNew1.segTemplates.bottom = "0dp";	
            this.view.flxAddExistingRecipients.onClick = this.showAddRecipientsScreenUI.bind(this);
            this.view.TabBodyNew1.addOnlySectionHeaders(this.getSectionHeadersForNewAccounts());
            this.view.lblAddExistingRecipients.text = "+ " + kony.i18n.getLocalizedString("kony.i18n.common.addExistingRecipients");
            if (this.hasPaymentOrderAddPermission) {
                this.view.lblAddPayment.text = kony.i18n.getLocalizedString("kony.i18n.common.newPayment");
                this.view.lblAddPayment.setVisibility(true);
                this.view.flxAddPayment.setVisibility(true);
              var breakpoint = kony.application.getCurrentBreakpoint();
              if (breakpoint <= 1024 || orientationHandler.isTablet) {
                this.view.flxSearchRecipientsBox.width = "78%";
                this.view.flxAddPayment.width = "20%"
              }              
              else{
                this.view.flxSearchRecipientsBox.width = "82%";
                this.view.flxAddPayment.width = "15%"
              }
                this.view.flxAddPayment.onClick = this.showAddRecipientsScreenUI.bind(this);
              } else {
                this.view.lblAddPayment.setVisibility(false);
                this.view.flxAddPayment.setVisibility(false);
                this.view.flxSearchRecipientsBox.width = "98%";
            }

            var self = this;
          this.view.CommonFormActionsNew.btnOption.onClick = function() {
            self.view.flxLoading.isVisible = true;
            self.view.flxAcknowledgementContainer.setVisibility(false);
            for(i=0;i< self.paymentOrdersData.length;i++){
              if(!kony.sdk.isNullOrUndefined(self.paymentOrdersData[i].status)){
                if(self.paymentOrdersData[i].status ===  BBConstants.IN_ERROR || self.paymentOrdersData[i].status === "Error"){
                  self.isErrorPaymentRecord = true;
                  break;
                }
              }
            }
            if(self.isErrorPaymentRecord){
              self.showServerErrorMessage({
                show: true,
                errorMessage: kony.i18n.getLocalizedString("i18n.BulkPayments.PaymentOrder.InErrorStatus.ErrorMessage")
              });
              self.view.flxFormContent.setContentOffset({
                'x': 0,
                'y': 0
              }, false);
              self.view.flxLoading.isVisible = false;
            }else{
              self.bulkPaymentsModule.presentationController.submitPaymentOrder({
                "recordId": self.bulkPaymentRecordData.recordId
              });
              self.view.flxLoading.isVisible = false;
            };
            self.isErrorPaymentRecord = false;
          };

            this.view.flxDropDown.onClick = this.showHidePaymentsSeg.bind(this);
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                var scopeObj = this;
                scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
            }.bind(this);
            this.view.tbxSearchBox.onKeyUp = this.onPaymentOrdersKeyUp.bind(this);
            this.view.tbxSearchBox.onDone = this.onPaymentOrdersSearchDone.bind(this);

            var sectionData = {
                "flxAddRecipients": {
                    "isVisible": false
                },
                "flxViewRecipients": {
                    "isVisible": true
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "btnViewRecipientName": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary"),
                    "onClick": function(eventobject, context) {
                        if (nameSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Asc");
                            this.accountSortType = "AccountNameAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Desc");
                            this.accountSortType = "AccountNameDesc";
                        }
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewRecipientName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                    "onClick": function(eventobject, context) {
                        if (numberSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Asc");
                            this.accountSortType = "AccountNumberAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Desc");
                            this.accountSortType = "AccountNumberDesc";
                        }
                        numberSort = !numberSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewBankName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewAmount": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Status"),
                    "onClick": function(eventobject, context) {
                        if (typeSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Asc");
                            this.accountSortType = "AccountTypeAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
                            this.accountSortType = "AccountTypeDesc";
                        }
                        typeSort = !typeSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewAmount": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewAction": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions"),
                    "isVisible": this.checkUserPermission("BULK_PAYMENT_REQUEST_EDIT_PO"),
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxBottomSeperator": {
                    "isVisible": true
                },
            };
            var rowDataMap = {
                "lblRecipientsType": "lblRecipientsType",
                "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
                "imgFlxSeperator": "imgFlxSeperator",
                "imgFlxBottomSeparator": "imgFlxBottomSeparator",
                "imgDropDown": "imgDropDown",
                "lblViewRecipientName": "lblViewRecipientName",
                "lblViewBankName": "lblViewBankName",
                "lblViewAmount": "lblViewAmount",
                "btnViewActions": "btnViewActions",
                "imgFlxTopSeparator": "imgFlxTopSeparator",
                "imgSample": "imgSample",
                "lblAccountNo": "lblAccountNo",
                "lblAccountNoValue": "lblAccountNoValue",
                "lblAccType": "lblAccType",
                "lblAccTypeValue": "lblAccTypeValue",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblPayRef": "lblPayRef",
                "lblPayRefValue": "lblPayRefValue",
                "lblFees": "lblFees",
                "lblFeesValue": "lblFeesValue",
                "lblPaymentMethod": "lblPaymentMethod",
                "lblPaymentMethodValue": "lblPaymentMethodValue",
				"lblErrorDescription": "lblErrorDescription",
                "lblErrorDescriptionValue": "lblErrorDescriptionValue",
                "btnEdit": "btnEdit",
                "flxActions": "flxActions",
              	"flxViewActions": "flxViewActions",
                "btnViewRecipientName": "btnViewRecipientName",
                "imgSortViewRecipientName": "imgSortViewRecipientName",
                "btnViewBankName": "btnViewBankName",
                "imgSortViewBankName": "imgSortViewBankName",
                "btnViewAmount": "btnViewAmount",
                "imgSortViewAmount": "imgSortViewAmount",
                "btnViewAction": "btnViewAction",
                "flxAddRecipients": "flxAddRecipients",
                "flxViewRecipients": "flxViewRecipients",
                "flxRecipientsType": "flxRecipientsType",
                "flxMain": "flxMain",
                "flxTopSeperator": "flxTopSeperator",
                "flxSeperator": "flxSeperator"
            };
            var defaultValues = {
                flxMain: {
                    "height": "52dp"
                },
                "btnViewActions": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
                    "onClick": function(eventobject, context) {
                        this.resetUI();
                        this.clearRecipientsFields();
                        this.enableOrDisableCurrencyListBox();
                        this.view.lblBankNameKey.text = kony.i18n.getLocalizedString("i18n.CheckImages.Bank") + ":";
                        this.view.lblFeesOpt2.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary");
                        this.view.lblFeesOpt3.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Both5050");
                        this.view.flxAckMessage.isVisible = false;
                        this.view.flxPrint.isVisible = false;
                        this.view.flxDownload.isVisible = false;
                        this.resetRecipientsUI();
                        this.mapBenificiaryData(true, context);
                        var scopeObj = this;
                        this.view.tbxAmount.onKeyUp = this.enableOrDisableAddOrEditForPaymentOrders.bind(this);
                        this.view.flxAddRecipientsManually.isVisible = true;
                        this.view.flxAddRecipientsManually.isVisible = true;
                        this.view.flxAddType.isVisible = false;
                        this.view.flxBankType.isVisible = false;
                        this.view.tbxSearchBox.text = "";
                        this.view.imgClearIcon.isVisible = false;
                        this.view.flxRecipientDetailsInfinity.isVisible = false;
                        this.view.flxRecipientDetailsExternal.isVisible = false;
                        this.view.flxRecipientName.isVisible = false;
                        this.view.flxAddToList.isVisible = false;
                        this.view.flxInfo.isVisible = true;
                        this.view.lblAddHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
                        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.editPayment");
                        this.view.CommonFormActionsNew.btnNext.isVisible = false;
                        this.view.CommonFormActionsNew.btnCancel.isVisible = false;
                        this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
                        this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
                        this.view.CommonFormActionsNew.btnBack.onClick = this.fetchBulkPaymentOrders.bind(this, this.bulkPaymentRecordData);
                        this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.onClick = this.navBackToPaymentOrders.bind(this, eventobject, context);
                        this.view.tbxPaymentRef.onKeyUp = this.enableOrDisableAddOrEditForPaymentOrders.bind(this);
                        this.view.flxInfo.onClick = this.OnFlxInfoClick.bind(this);
                        this.view.lbxCurrency.onSelection = function() {
                            this.enableOrDisableAddOrEditForPaymentOrders();
                        }.bind(this);
                        this.view.flxFeesTypeRadio1.onClick = function() {
                            this.enableOrDisableAddOrEditForPaymentOrders();
                            this.OnRadioBtnClickFeesPaidBy(1);
                        }.bind(this);
                        this.view.flxFeesTypeRadio2.onClick = function() {
                            this.enableOrDisableAddOrEditForPaymentOrders();
                            this.OnRadioBtnClickFeesPaidBy(2);
                        }.bind(this);
                        this.view.flxFeesTypeRadio3.onClick = function() {
                            this.enableOrDisableAddOrEditForPaymentOrders();
                            this.OnRadioBtnClickFeesPaidBy(3);
                        }.bind(this);
                        FormControllerUtility.disableButton(scopeObj.view.CommonFormActionsNew.btnOption);
                        this.adjustScreen(10);
                    }.bind(this),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxSeperator": {
                    "text": "-"
                },
                "flxBulkPayementRowHeader": {
                    "skin": "bbSKnFlxffffff"
                },
                "flxBottomSeparator": {
                    "isVisible": false
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgDropDown": {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O",
                    "isVisible": true
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                    this.view.TabBodyNew1.showOrHideDetails(conObj);
                    if(kony.application.getCurrentBreakpoint() >1024 && !flag)
                      this.adjustScreen(-190);
                    else if(kony.application.getCurrentBreakpoint() >1024 && flag)
                      this.adjustScreen(-160);
                  }.bind(this)
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "flxDetailsHighlighter": {
                    "isVisible": true
                },
                "lblAccountNo": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
                    "isVisible": true,
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.CheckImages.Bank"),
                    "isVisible": true,
                },
                "lblPayRef": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
                    "isVisible": true,
                },
                "lblFees": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                    "isVisible": true,
                },
                "lblAccType": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode"),
                    "isVisible": true,
                },
                "lblPaymentMethod": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod"),
                    "isVisible": false,
                },
				"lblErrorDescription": {
                    "text": kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ErrorDescription"),
                    "isVisible": true,
                },
                "btnEdit": {
                    "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    "isVisible": flag === true ? true : false,
                    "onClick": function(eventobject, context) {
                        this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.confirm");
                        this.showPopUp(kony.i18n.getLocalizedString("kony.i18n.common.removePayments"), this.removePaymentOrder.bind(this, eventobject, context))
                    }.bind(this)
                },
                "btnDelete": {
                    "isVisible": false
                },
                "btnViewDetails": {
                    "isVisible": false
                }
            };
            if(!this.isSubmitPaymentOrder){
            this.view.TabBodyNew1.setSectionData([sectionData]);
            if (this.paymentOrdersData.length === 0) {
                this.showNoPaymentOrders(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noPaymentOrders"));
            } else {
               this.view.NonEditableBulkPaymentDetails.flxBtmSeperator.setVisibility(true);
               this.view.flxSearchBar.setVisibility(true);
                this.view.TabBodyNew1.setRowDataMap([rowDataMap]);
                this.view.TabBodyNew1.setDefaultValues([defaultValues]);
                //this.view.TabBodyNew1.addOnlySectionHeaders(this.getSectionHeadersForNewAccounts());
                //this.view.TabBodyNew1.addDataForSections([this.paymentOrdersData]);
                if (!kony.sdk.isNullOrUndefined(this.paymentOrdersData)) {
                    this.view.TabBodyNew1.addDataForSections([this.paymentOrdersData]);
                }
            }
             } else {
				this.view.NonEditableBulkPaymentDetails.flxBtmSeperator.setVisibility(false);
               this.view.flxSearchBar.setVisibility(false);
			}
            this.enableReviewButtons();
            if (flag === false) {
                this.disableReviewButtons();
            }
            if(this.isSubmitPaymentOrder !== true){
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) && this.bulkPaymentRecordData.requestId !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                this.fetchRequestHistory(this.bulkPaymentRecordData.requestId);
            } else {
                this.view.flxApprovalsHistoryInformation.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            }
            }
            if(this.recordStatus===BBConstants.TRANSACTION_STATUS.WAITACK){
              this.view.CommonFormActionsNew.btnOption.isVisible = false;
              this.view.CommonFormActionsNew.btnCancel.isVisible = false;
            }
          if(this.isErrorFlow){
            this.view.flxPrint.isVisible = false;
            this.view.flxDownload.isVisible = false;
            this.showHidePaymentsSeg();
            this.view.formActionsNew.btnCancel.isVisible = (this.bulkPaymentRecordData.status === BBConstants.TRANSACTION_STATUS.READYFORREVIEW ? true : false) ;
            this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.formActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnCancel.width = "20%";
            this.view.formActionsNew.btnCancel.left = "58%";
            this.view.formActionsNew.btnCancel.onClick = this.onCancelBulkPaymentRecord.bind(this.bulkPaymentRecordData);
            this.view.flxAcknowledgementContainer.isVisible = true;
            this.view.flxAcknowledgementNew.rTextSuccess.skin = "sknRtxSSPLight42424224Px";
            this.view.flxAcknowledgementNew.imgTick.src="close_red.png";
            this.view.flxAcknowledgementNew.flxImgdownload.isVisible=false;
            this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ReviewErrorMessage");
          }
            this.recordStatus="";
            if(kony.application.getCurrentBreakpoint() >1024 && !flag)
            this.adjustScreen(-190);
			else if(kony.application.getCurrentBreakpoint() >1024 && flag)
			this.adjustScreen(-160);
            this.view.forceLayout();
        },

        showNoPaymentOrders: function(msgText) {
            var dataMap = {
                lblNoRecords: "lblMsg"
            };
            var NODATAFLEXHEIGHT = "100dp";
            var defValues = {
                flxMain: {
                    "height": NODATAFLEXHEIGHT
                },
                flxBulkPayementRowHeader: {
                    "isVisible": false
                },
                flxBulkPayementRowDetails: {
                    "isVisible": false
                },
                flxNoRecords: {
                    "isVisible": true,
                    "height": NODATAFLEXHEIGHT
                }
            };

            this.view.TabBodyNew1.setRowDataMap([dataMap]);
            this.view.TabBodyNew1.setDefaultValues([defValues]);
            var rowData = [{
                "lblMsg": {
                    "text": msgText
                }
            }];
            this.view.TabBodyNew1.addRowsData([rowData]);
            this.view.forceLayout();
        },

        navBackToPaymentOrders: function(eventobject, context) {

            var data = this.view.TabBodyNew1.getData()[context.sectionIndex][1];
            var feesPaid = "";

            if (this.view.imgFees1Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt1.text;
            } else if (this.view.imgFees2Type2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                feesPaid = this.view.lblFeesOpt2.text;
            } else {
                feesPaid = this.view.lblFeesOpt3.text;
            }

            var formatManager = applicationManager.getFormatUtilManager();
            var currency = formatManager.getCurrencySymbolCode(this.view.lbxCurrency.selectedKey);

            var requestParams = {
                "recordId": this.bulkPaymentRecordData.recordId,
                "paymentOrderId": data[context.rowIndex].paymentOrderId,
                "currency": currency,
                "amount": this.deFormatAmount(this.view.tbxAmount.text),
                "feesPaidBy": feesPaid,
                "paymentReference": this.view.tbxPaymentRef.text
            }
            this.bulkPaymentsModule.presentationController.editPaymentOrder(requestParams);

        },

        navToOngoingPayments: function() {
            this.view.tbxSearchBox.text = "";
          	this.view.imgClearIcon.isVisible = false;
          var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", BBConstants.VIEW_REQUESTS);
        },
      
       navToUploadStatus: function() {
            this.view.tbxSearchBox.text = "";
          	this.view.imgClearIcon.isVisible = false;
          var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadedFiles"));
        },

        navToPaymentHistory: function() {
            this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var BulkPaymentsModule  = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", BBConstants.VIEW_HISTORY);
        },

        removePaymentOrder: function(eventobject, context) {
            this.view.flxDialogs.setVisibility(false);
            this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var data = this.view.TabBodyNew1.getData()[context.sectionIndex][1];

            var requestParams = {
                "recordId": this.bulkPaymentRecordData.recordId,
                "paymentOrderId": data[context.rowIndex].paymentOrderId
            }
            this.bulkPaymentsModule.presentationController.deletePaymentOrder(requestParams);
        },

        showPopUp: function(message, onYes) {
            var scope = this;
            // scope.view.flxDialogs.height = scope.view.customheader.info.frame.height + scope.view.flxMain.info.frame.height + scope.view.flxFooter.info.frame.height;            
          	// FormControllerUtility.scrollToTop();
			// scope.view.PopupHeaderUM.centerY="20%";

            function closePopUp() {
                this.view.flxDialogs.setVisibility(false);
                this.adjustScreen(0);
            }
            scope.view.PopupHeaderUM.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
            scope.view.PopupHeaderUM.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
            scope.view.PopupHeaderUM.lblPopupMessage.text = message;
            //scope.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");//head
            scope.view.PopupHeaderUM.flxCross.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnNo.onClick = closePopUp.bind(this);
            scope.view.PopupHeaderUM.btnYes.onClick = onYes;
            scope.view.flxDialogs.setVisibility(true);
            scope.adjustScreen(0);
        },

        getWidgetDataMapForRecipients: function() {
            var widgetDataMap = {
                "lblRecipientsType": "lblRecipientsType",
                "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
                "imgFlxSeperator": "imgFlxSeperator",
                "imgDropDown": "imgDropDown",
                "lblViewRecipientName": "lblViewRecipientName",
                "lblViewBankName": "lblViewBankName",
                "lblViewAmount": "lblViewAmount",
                "btnViewActions": "btnViewActions",
                "imgFlxTopSeparator": "imgFlxTopSeparator",
                "imgSample": "imgSample",
                "lblAccountNo": "lblAccountNo",
                "lblAccountNoValue": "lblAccountNoValue",
				"lblErrorDescriptionValue": "lblErrorDescriptionValue",
                "lblAccType": "lblAccType",
                "lblAccTypeValue": "lblAccTypeValue",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblPayRef": "lblPayRef",
                "lblPayRefValue": "lblPayRefValue",
                "imgFlxBottomSeparator": "imgFlxBottomSeparator",
                "btnEdit": "btnEdit",
                "btnDelete": "btnDelete",
                "btnViewDetails": "btnViewDetails",
                "btnViewRecipientName": "btnViewRecipientName",
                "imgSortViewRecipientName": "imgSortViewRecipientName",
                "btnViewBankName": "btnViewBankName",
                "imgSortViewBankName": "imgSortViewBankName",
                "btnViewAmount": "btnViewAmount",
                "imgSortViewAmount": "imgSortViewAmount",
                "btnViewAction": "btnViewAction",
                "flxAddRecipients": "flxAddRecipients",
                "flxViewRecipients": "flxViewRecipients",
                "flxRecipientsType": "flxRecipientsType",
                "flxMain": "flxMain",
            };
            return widgetDataMap;
        },
        getSectionHeadersForNewAccounts: function() {
            var res;
            res = {
                "flxAddRecipients": {
                    "isVisible": false
                },
                "flxViewRecipients": {
                    "isVisible": true
                },
                "btnViewRecipientName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.benificiaryName")
                },
                "imgSortViewRecipientName": {
                    "isVisible": true
                },
                "btnViewBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankName")
                },
                "imgSortViewBankName": {
                    "isVisible": true
                },
                "btnViewAmount": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Status")
                },
                "imgSortViewAmount": {
                    "isVisible": true
                },
                "btnViewAction": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblAction"),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
            }
            return res;
        },

        onSubmitForApproval: function(response) {
          	this.isEditFlow = true;
            this.getRecipientData(true);
            var templateData = {};
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let totalTrans = kony.i18n.getLocalizedString("i18n.bulkWire.totalTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            templateData[paymentDes] = this.bulkPaymentRecordData.description;
            templateData[intiatedBy] = this.bulkPaymentRecordData.initiatedBy;
            templateData[transferInitiatedOn] = this.bulkPaymentRecordData.scheduledDate;
            templateData[exeDate] = this.bulkPaymentRecordData.paymentDate;
            templateData[totalAm] = this.bulkPaymentRecordData.totalAmount;
            templateData[fromAccount] =this.bulkPaymentRecordData.fromAccountMasked;
            templateData[totalTrans] = this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] = this.bulkPaymentRecordData.recordId;
            templateData[processMode] =this.bulkPaymentRecordData.batchMode;
            if (!kony.sdk.isNullOrUndefined(response.requestId) && !kony.sdk.isNullOrUndefined(response.status)  &&
                !kony.sdk.isNullOrUndefined(response.receivedApprovals)) {
                this.bulkPaymentRecordData.requestId = response.requestId;
                this.bulkPaymentRecordData.status = response.status;
              //  this.bulkPaymentRecordData.requiredApprovals = response.requiredApprovals;
                this.bulkPaymentRecordData.receivedApprovals = response.receivedApprovals;

                if ((response.status === BBConstants.TRANSACTION_STATUS.PENDING) && (!kony.sdk.isNullOrUndefined(response.receivedApprovals)) && (!kony.sdk.isNullOrUndefined(response.requiredApprovals))) {
                    this.bulkPaymentRecordData.Approver = response.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + response.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
                } else if (response.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
                    this.bulkPaymentRecordData.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
                } else if (!kony.sdk.isNullOrUndefined(response.requiredApprovals)) {
                    this.bulkPaymentRecordData.Approver = response.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
                } else {
                    this.bulkPaymentRecordData.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
                }
            }
            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.flxAddPayment.isVisible = false;
            this.view.NonEditableBulkPaymentDetails.btnEdit.isVisible = false;
            this.view.CommonFormActionsNew.isVisible = false;
            this.view.formActionsNew.isVisible = true;
            this.view.formActionsNew.btnBack.isVisible = false;
            this.view.formActionsNew.btnNext.text = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
            this.view.formActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
            this.view.formActionsNew.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.width = "20%";
            this.view.formActionsNew.btnNext.onClick = this.navToOngoingPayments.bind(this);
            this.view.formActionsNew.btnNext.isVisible = true;
            this.view.formActionsNew.btnOption.isVisible = false;
            this.view.formActionsNew.btnCancel.isVisible = false;
            this.view.flxAckMessage.isVisible = true;
            this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
            if (response.status === BBConstants.TRANSACTION_STATUS.PENDING) {
              if(!kony.sdk.isNullOrUndefined(response.messageDetails)){
                this.view.flxAckMessage.isVisible = false;
                var responseDetails=response;
                responseDetails.i18n = kony.i18n.getLocalizedString("kony.i18n.common.bulkApproval");
                this.view.flxGenericMessage.setVisibility(true);
                this.view.GenericMessageNew.setContext(responseDetails);
                this.view.flxGenericMessage.width="90%";
                this.view.GenericMessageNew.closepopup = function() {
                    this.view.flxGenericMessage.setVisibility(false);
                }.bind(this);
                this.view.GenericMessageNew.setVisibility(true);
              }
              else
                this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkApproval");
            } else {
              if(!kony.sdk.isNullOrUndefined(response.messageDetails)){
                this.view.flxAckMessage.isVisible = false;
                var responseDetails=response;
                responseDetails.i18n = kony.i18n.getLocalizedString("kony.i18n.common.bulkSentStatus");
                this.view.flxGenericMessage.setVisibility(true);
                this.view.GenericMessageNew.setContext(responseDetails);
                this.view.flxGenericMessage.width="90%";
                this.view.GenericMessageNew.closepopup = function() {
                    this.view.flxGenericMessage.setVisibility(false);
                }.bind(this);
                this.view.GenericMessageNew.setVisibility(true);
              }
              else
                this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkSentStatus");
            }
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);
            this.view.flxAckMessage.flxRightContainerInfo.lblReferenceHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.paymentID");
            this.view.flxAckMessage.flxRightContainerInfo.lblReferenceNumber.text = this.bulkPaymentRecordData.recordId;
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.TabBodyNew1.isVisible = false;
            this.view.flxSearchRecipients.isVisible = false;
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) && this.bulkPaymentRecordData.requestId !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                this.fetchRequestHistory(this.bulkPaymentRecordData.requestId);
            } else {
                this.view.flxApprovalsHistoryInformation.setVisibility(false);
				FormControllerUtility.hideProgressBar(this.view);
            }
            this.isSubmitPaymentOrder = "";
            this.adjustScreen(10);
            this.view.forceLayout();
        },

      showRequestHistoryData: function(segRowData) {
       // this.bulkPaymentRecordData["isGroupMatrix"] = true;
        var signatoryVisiblility = false;
      if (!(kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData)) && this.bulkPaymentRecordData.hasOwnProperty("isGroupMatrix")) {
                        if (this.bulkPaymentRecordData.isGroupMatrix === "true" || this.bulkPaymentRecordData.isGroupMatrix === true) {
                            signatoryVisiblility = true;
                        } else {
                            signatoryVisiblility = false;
                        }
                    } else {
                        if (segRowData.length != 0) {
                            segRowData.forEach(function(record) {
                                    if (record.hasOwnProperty('groupName')) {
                                        signatoryVisiblility = true;
                                        return false;
                                    }
                                });
                            }
                        }
        this.view.flxOverlay.setVisibility(false);
        this.view.flxPendingApprovers.setVisibility(false);
        this.view.flxApprovalHistoryContent.isVisible = true;
        this.view.flxApprovalsHistoryErrorMessage = false;
        this.view.lblApprovalStatusValue.text = this.bulkPaymentRecordData.status;
        this.view.lblApproveCountVal.text = this.bulkPaymentRecordData.receivedApprovals; 
        if (signatoryVisiblility === true) {
          this.view.btnPendingAprrovers.setVisibility(true);
        } else {
          this.view.btnPendingAprrovers.setVisibility(false);
        }
        var scope = this;
        scope.view.btnPendingAprrovers.onClick = this.viewPendingApprovalsDetails.bind(scope, scope.bulkPaymentRecordData);																																			  
        scope.view.imgPopupclose.onTouchEnd = function() {
          scope.view.flxOverlay.setVisibility(false);
          scope.view.flxPendingApprovers.setVisibility(false);
        }
        scope.view.btnClose.onClick = function() {
          scope.view.flxOverlay.setVisibility(false);
          scope.view.flxPendingApprovers.setVisibility(false);
        }
        var breakpoint = kony.application.getCurrentBreakpoint();
        if(breakpoint === 640 || orientationHandler.isMobile){ 
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
              var actiontsValue = (kony.sdk.isNullOrUndefined(record.Actionts)) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getDateAndTimeInUTC(record.Actionts);
              var userNameValue = (kony.sdk.isNullOrUndefined(record.userName)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.userName;
              if (record.Action === "Approved") {
                record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.ApprovedRequest");
              } else if (record.Action === "Pending") {
                record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.createdRequest");
              }
              var actionValue = (kony.sdk.isNullOrUndefined(record.Action)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.Action;
              //  var status = record.Status === "Rejected" ? false : true; // set status as true if it is not rejected. || status
              var commentsValue = (kony.sdk.isNullOrUndefined(record.Comments)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.Comments;
              record.flxApprovalHsitoryInformation = {
                "height": "60dp"
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
                skin : "bbSKnFlxffffff"
              };
            });
            var dataMap = {
              "flxApprovalHsitoryInformation": "flxApprovalHsitoryInformation",
              "imgDropdown": "imgDropdown",
              "flxApprovalsHistoryHeader" : "flxApprovalsHistoryHeader",
              //  "flxApprovalsInformationMain": "flxApprovalsInformationMain",
              "lblApprovetypeval": "userName",
              "lblSentByVal": "Action",
              "lblApprovalInformationDate": "lblApprovalInformationDate",
              "lblApprovalInformationComments": "lblApprovalInformationComments",
              "lblApprovalInformationDateVal": "lblApprovalInformationDateVal",
              "lblApprovalInformationCommentsVal": "lblApprovalInformationCommentsVal",
            };
            var segDataModel = [
              [{}, segRowData]
            ];
            this.view.segApprovalDetails.widgetDataMap = dataMap;
            this.view.segApprovalDetails.setData(segDataModel);
          }



        }else {
			var statusHeaderLeftValue = signatoryVisiblility === true ? "6%" : "12%"; 
		    var dateTimeHeaderLeftValue = signatoryVisiblility === true ? "6.57%" : "13%"; 
			var commentsHeaderLeftValue = signatoryVisiblility === true ? "5.03%" : "13%";
          var segHeader = {
            "lblDateAndTimeKey": {
              "text": kony.i18n.getLocalizedString("i18n.konybb.common.dateAndTime"),
			  "left" : dateTimeHeaderLeftValue
            },
            "lblSignatoryGroupKey": {
              "text": kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup"),
              "isVisible": signatoryVisiblility              
            },
            "lblUserIDKey": {
              "text": kony.i18n.getLocalizedString("kony.i18n.common.username"),
            },
            "lblActionKey": {
              "text": kony.i18n.getLocalizedString("i18n.ChequeManagement.Status"),
			  "left" : statusHeaderLeftValue
            },
            "lblCommentsKey": {
              "text": kony.i18n.getLocalizedString("i18n.konybb.myRequests.comments"),
              isVisible: true,
			  "left" : commentsHeaderLeftValue
            }
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
              segRowData.forEach(function(record) {
                /*var signatoryColumnVisibility = false;
                if(!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData)){
                    if (this.bulkPaymentRecordData.isGroupMatrix === "true" || this.bulkPaymentRecordData.isGroupMatrix === true) {
                        signatoryColumnVisibility = true;
                    } else {
                        signatoryColumnVisibility = false;
                    }
                     }*/
                var scope = this;
                var skinValue = (breakpoint === 640 || orientationHandler.isMobile) ? "sknLblSSP42424213px" : "bbSknLbl424242SSP15Px";
                var actiontsValue = (kony.sdk.isNullOrUndefined(record.Actionts)) ?kony.i18n.getLocalizedString("i18n.common.NA"): CommonUtilities.getDateAndTimeInUTC(record.Actionts);
                var userNameValue = (kony.sdk.isNullOrUndefined(record.userName)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.userName;
                if (record.Action === "Approved") {
                  record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.ApprovedRequest");
                } else if (record.Action === "Pending") {
                  record.Action = kony.i18n.getLocalizedString("i18n.konybb.common.createdRequest");
                }
                var actionValue = (kony.sdk.isNullOrUndefined(record.Action)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.Action;
                var commentsValue = (kony.sdk.isNullOrUndefined(record.Comments)) ? kony.i18n.getLocalizedString("i18n.common.NA") : record.Comments;
				var actionLeftValue = signatoryVisiblility === true ? "6%" : "6.9%"; 
				var actiontsLeftValue = signatoryVisiblility === true ? "1.7%" : "8%"; 
				var commentsLeftValue = signatoryVisiblility === true ? "3%" : "11%"; 
                if(record.groupName !== undefined){
                  var signatoryGroupValue = record.groupName;
                }else{
                  signatoryGroupValue = kony.i18n.getLocalizedString("i18n.common.NA");
                }
                  record.Actionts = {
                    "text": actiontsValue,
                    "skin": skinValue,
					"left" : actiontsLeftValue
                  };
                  record.Action = {
                    "text": actionValue,
                    "skin": skinValue,
					"left" : actionLeftValue
                  };
                  record.userName = {
                    "text": userNameValue,
                    "skin": skinValue,
                  };
                  record.lblComments = {
                    "text": commentsValue,
                    "skin": skinValue,
                    isVisible: true,
					"left" : commentsLeftValue
                  };
                  record.flxTopSeperator = {
                    "left": "0dp",
                    "width": "100%",
                  };
                  record.SignatoryGroup = {
                    "text": signatoryGroupValue,
                    "skin": skinValue,
                    "isVisible": signatoryVisiblility                       
                  };
                });
                this.view.flxApprovalStatus.isVisible = true;
            }
            var dataMap = {
                "lblDateAndTimeKey": "lblDateAndTimeKey",
                "lblUserIDKey": "lblUserIDKey",
                "lblDateAndTime": "Actionts",
                "lblUserID": "userName",
                "lblAction": "Action",
                "lblActionKey": "lblActionKey",
                "lblSignatoryGroup": "SignatoryGroup",
                "lblSignatoryGroupKey": "lblSignatoryGroupKey",
                "flxNoRecords": "flxNoRecords",
                "lblNoRecords": "lblNoRecords",
                "lblCommentsKey": "lblCommentsKey",
                "lblComments": "lblComments",
                "flxTopSeperator": "flxTopSeperator"
            };
            var segDataModel = [
                [segHeader, segRowData]
            ];
            this.view.segApprovalDetails.widgetDataMap = dataMap;
            this.view.segApprovalDetails.setData(segDataModel);
            this.view.flxApprovalsHistoryInformation.setVisibility(true);
			}
			this.view.flxApprovalsHistoryInformation.setVisibility(true);
            FormControllerUtility.hideProgressBar(this.view);
            this.adjustScreen(0);
        },
      // Button Action for pending Approvals Popup
      buttonPendingApprovers: function(pendingData){
        this.viewPendingApprovalsDetails(this.bulkPaymentRecordData);
      },
      viewPendingApprovalsDetails: function(pendingData){
        this.view.flxOverlay.setVisibility(true);
        this.view.flxPendingApprovers.setVisibility(true);
        this.view.flxApprovalLimitHeader.setVisibility(false);
        this.view.flxPerTransaction.setVisibility(false);
        this.view.flxDailyTransaction.setVisibility(false);
        this.view.flxWeekelyTransaction.setVisibility(false);
        this.view.flxApproverList.removeAll(this.view.flxApproverList.widgets());       
        this.fetchRequestHistoryDataSignatoryGroups(pendingData.requestId);                               
      },     
      // Service call for getRequestHistory for signatory groups
      fetchRequestHistoryDataSignatoryGroups: function(requestId) {
        var navObj = {
          requestData: {
            "Request_id": requestId
          },
          onSuccess: {
            form: "frmBulkPaymentsReview",
            module: "BulkPayments",
            context: {
              key: BBConstants.REQUEST_HISTORY_SUCCESS_SIGNATORYGROUP,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBulkPaymentsReview",
            module: "BulkPayments",
            context: {      
              key: BBConstants.REQUEST_HISTORY_FAILURE_SIGNATORYGROUP,
              responseData: {}
            }
          }
        };
        this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
        this.ApprovalRequestsModule.presentationController.getRequestsHistorySignatoryGroup(navObj);
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
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
                }
              }
              if (kony.sdk.isNullOrUndefined(firstTab)) {
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
                    firstTabGroupListPerTxn = groupListPerTxn;
                    firstTabGroupRuleValuePerTxn = groupRuleValuePerTxn;
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
                    firstTabGroupListPerTxn = groupListPerTxn;
                    firstTabGroupRuleValuePerTxn = groupRuleValuePerTxn;
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
              }
            }
            if(firstTabGroupListPerTxn && firstTabGroupRuleValuePerTxn)
            this.setApprovalPendingData(firstTabGroupListPerTxn, firstTabGroupRuleValuePerTxn);
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
          "skin": "sknFlxffffffBordere3e3e3Radius3px",
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
          "text": "Any "+data.approvalCount+" "+ kony.i18n.getLocalizedString("i18n.accounts.pending"),
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
          "skin": "ICSknflxe3e3e3",
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
              "lblApproverStatus": kony.i18n.getLocalizedString("i18n.accounts.pending")
            };
            masterTableSingle["btnReNotify"] = {
              "text": kony.i18n.getLocalizedString("i18n.payments.reNotify"),
              "onClick": this.reNotify.bind(this, masterTableSingle["lblApproverName"])
            }
            masterTableSingleData.push(masterTableSingle);
          }
          segSingleExpandDetails.setData(masterTableSingleData);
        }
        this.note = this.note + " any " + data.approvalCount + " of the " + data.signatoryName;
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
          "skin": "sknFlxffffffBordere3e3e3Radius3px",
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
            "text": "Any "+data[i].approvalCount+ " " + kony.i18n.getLocalizedString("i18n.accounts.pending"),
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
            "skin": "ICSknflxe3e3e3",
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
            this.view[chevronName].src = "listboxuparrow.png";
        } else {
            this.view[flxName].setVisibility(false);
          this.view[chevronName].src = "listboxdownarrow.png";
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
                                "approverUserId": pendingApprovers[j].userId,
                                "requestId": this.pendingApprovalData.RequestHistory[i].Request_id,
                                "featureActionId": this.bulkPaymentRecordData.featureActionId,
                                "TransactionId": this.bulkPaymentRecordData.transactionId
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
            form: "frmBulkPaymentsReview",
            module: "BulkPayments",
            context: {
              key: BBConstants.RENOTIFY_PENDING_APPROVERS_SUCCESS,
              responseData: {}
            }
          },
          onFailure: {
            form: "frmBulkPaymentsReview",
            module: "BulkPayments",
            context: {
              key: BBConstants.RENOTIFY_PENDING_APPROVERS_FAILURE,
              responseData: {}
            }
          }
        };       
        this.ApprovalRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
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
                flxApprovalHsitoryInformation.height =kony.flex.USE_PREFERED_SIZE;// "180dp";
				flxApprovalsHistoryHeader.skin = "bbSknFlxf9fafb" ;
            } else {
                imgDropdown = {
                    text: "O",
                    skin: "sknLblFontTypeIcon1a98ff12pxOther"
                };
                flxApprovalHsitoryInformation.height = "60dp";
				flxApprovalsHistoryHeader.skin = "bbSKnFlxffffff" ;
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
                        data[i][1][j].flxApprovalHsitoryInformation.skin = "bbSKnFlxffffff";
                        data[i][1][j].imgDropdown.text = "O";
                        data[i][1][j].imgDropdown.skin = "sknLblFontTypeIcon1a98ff12pxOther";
						data[i][1][j].flxApprovalsHistoryHeader.skin = "bbSKnFlxffffff" ;
                        this.view.segApprovalDetails.setDataAt(data[i][1][j], j, i);
                    }
                }
            }
			this.adjustScreen(0);
        },

        showHidePaymentsSeg: function() {
            if (this.view.TabBodyNew1.isVisible === true) this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            else this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            this.view.TabBodyNew1.isVisible = !this.view.TabBodyNew1.isVisible;
            this.view.flxSearchRecipients.isVisible = !this.view.flxSearchRecipients.isVisible;
            var existingData = this.view.TabBodyNew1.segTemplates.data[0][1];
            this.view.TabBodyNew1.addDataForSections([existingData]);
        },

        onEditReviewClick: function() {
            var editAccounts = this.fetchBulkPaymentEditAccounts();
            this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.masterData = this.objectToListBoxArrayFromService(editAccounts);
            if (editAccounts.findIndex(account => account.Name === this.bulkPaymentRecordData.fromAccountMasked) != -1) {
                this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.selectedKey = this.bulkPaymentRecordData.fromAccount;
            } else {
                this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.selectedKey = editAccounts[0].Id;
            }
            this.view.flxPaymentReview.flxEditableDetails.flxTextBox.txtDescription.text = kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.description.toolTip) ? this.bulkPaymentRecordData.description : this.bulkPaymentRecordData.description.toolTip;
            this.view.flxPaymentReview.flxEditableDetails.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.editPaymentDetails");
            this.view.flxPaymentReview.flxEditableDetails.setVisibility(true);
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.setVisibility(false);
            this.view.flxPaymentReview.flxEditableDetails.NonEditableBulkPaymentDetailsEdit.setVisibility(true);
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let noOfTrans = kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let status = kony.i18n.getLocalizedString("i18n.common.status");
            var templateData = {};
            templateData[fromAccount] = this.bulkPaymentRecordData.fromAccountMasked;
            templateData[totalAm] = this.bulkPaymentRecordData.totalAmount;
            templateData[noOfTrans] =this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] =this.bulkPaymentRecordData.recordId;
            templateData[status] = this.bulkPaymentRecordData.recordId;
            templateData[processMode] =  this.bulkPaymentRecordData.batchMode;
            this.view.NonEditableBulkPaymentDetailsEdit.setData(templateData, true);
            this.view.flxAckMessage.isVisible = false;
            this.view.flxPrint.isVisible = false;
            this.view.flxDownload.isVisible = false;
            this.view.flxPaymentReview.flxSearchBar.setVisibility(false);
            this.view.flxPaymentReview.TabBodyNew1.setVisibility(false);
            this.view.CommonFormActionsNew.btnNext.isVisible = true;
            this.view.CommonFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.CommonFormActionsNew.btnNext.onClick = this.onCancelEditReview.bind(this);
            this.view.CommonFormActionsNew.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnOption.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = false;
            this.view.CommonFormActionsNew.btnCancel.onClick = this.onSaveAndUpdateReviewclick.bind(this);
            this.adjustScreen(10);
            this.view.forceLayout();
        },

        showCancellationReasonsDropdown: function(cancellationReasons) {
            this.view.flxPopupNew.flxDropdown.lstCancellationReason.masterData = this.convertToArrayCancellationReason(cancellationReasons);
            this.view.flxPopupNew.flxDropdown.lstCancellationReason.selectedKey = cancellationReasons[0].reason;
        },

        onCancelEditReview: function() {
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentSummary");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentsReview");
            this.view.flxPaymentReview.flxEditableDetails.setVisibility(false);
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.setVisibility(true);
            this.view.flxPaymentReview.flxSearchBar.setVisibility(true);
            this.view.flxPaymentReview.TabBodyNew1.setVisibility(true);
            this.setButtonsForReview();
            this.adjustScreen(10);
            this.view.forceLayout();
        },

        onSaveAndUpdateReviewclick: function() {
            this.bulkPaymentRecordData.fromAccountMasked = this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.selectedKeyValue[1];
            this.bulkPaymentRecordData.fromAccount = this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.selectedKeyValue[0];
            this.bulkPaymentRecordData.description = this.view.flxPaymentReview.flxEditableDetails.flxTextBox.txtDescription.text;
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.PaymentSummary");
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentsReview");
            this.view.flxPaymentReview.flxEditableDetails.setVisibility(false);
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.setVisibility(true);
            this.view.flxPaymentReview.flxSearchBar.setVisibility(true);
            this.view.flxPaymentReview.TabBodyNew1.setVisibility(true);
            this.setButtonsForReview();
            this.updateBulkPaymentRecord(this.bulkPaymentRecordData);
            this.adjustScreen(10);
            this.view.forceLayout();
        },

        disableReviewButtons: function() {
			this.view.flxAddPayment.isVisible = false;
            if(kony.application.getCurrentBreakpoint() >= 1024)
            this.view.flxSearchRecipientsBox.width = "98%";
            this.view.NonEditableBulkPaymentDetails.btnEdit.isVisible = false;
            this.view.CommonFormActionsNew.isVisible = false;
            this.view.formActionsNew.isVisible = true;
            this.view.formActionsNew.btnNext.text = this.btnTextApprovalReq;
            this.view.formActionsNew.btnNext.toolTip = this.btnTextApprovalReq;
            this.view.formActionsNew.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.width = "20%";
            this.view.formActionsNew.btnNext.top = "0px";
            this.view.formActionsNew.btnNext.onClick = this.navToOngoingPayments.bind(this);
            if (this.isMakerHistoryFlow) {
                this.view.formActionsNew.btnNext.onClick = this.navToPaymentHistory.bind(this);
            }
            if (this.isMakerUploadFlow){
               this.view.formActionsNew.btnNext.onClick = this.navToUploadStatus.bind(this);
            }
            this.view.formActionsNew.btnNext.isVisible = true;
            this.view.formActionsNew.btnOption.isVisible = false;
            this.view.formActionsNew.btnCancel.isVisible = false;
			if (this.bulkPaymentRecordData.status === BBConstants.TRANSACTION_STATUS.SCHEDULED) {
                this.view.formActionsNew.btnCancel.isVisible = true;
                this.view.formActionsNew.btnNext.skin = ViewConstants.SKINS.NORMAL;
				this.view.formActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.HOVER;
				this.view.formActionsNew.btnCancel.text = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
				this.view.formActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
				this.view.formActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
				this.view.formActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
				this.view.formActionsNew.btnCancel.width = "17%";
				this.view.formActionsNew.btnCancel.onClick = this.onCancelBulkPaymentRecord.bind(this.bulkPaymentRecordData);
            }
        },

        enableReviewButtons: function() {
            this.view.flxAddPayment.isVisible = true;
            this.view.NonEditableBulkPaymentDetails.btnEdit.isVisible = this.checkUserPermission("BULK_PAYMENT_REQUEST_EDIT");
            this.view.CommonFormActionsNew.isVisible = true;
            this.view.formActionsNew.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
             if (this.isMakerHistoryFlow) {
				this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
			}else if(this.isMakerUploadFlow) {
				this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");
            } else {
                this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
            }
            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.width = "20%";
            this.view.CommonFormActionsNew.btnBack.onClick = this.navToOngoingPayments.bind(this);
            if (this.isMakerHistoryFlow) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToPaymentHistory.bind(this);
            }
            if (this.isMakerUploadFlow){
               this.view.CommonFormActionsNew.btnBack.onClick = this.navToUploadStatus.bind(this);
            }
            this.view.CommonFormActionsNew.btnNext.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.isVisible = true;
            if((this.bulkPaymentRecordData.batchMode === "SINGLE" && this.checkUserPermission("BULK_PAYMENT_SINGLE_SUBMIT")) || (this.bulkPaymentRecordData.batchMode === "MULTI" && this.checkUserPermission("BULK_PAYMENT_MULTIPLE_SUBMIT"))){
                CommonUtilities.enableButton(this.view.CommonFormActionsNew.btnOption);
                this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.NORMAL;
            } else {
                CommonUtilities.disableButton(this.view.CommonFormActionsNew.btnOption);
                this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.LOCATE_BTNSHARESEND;
            }
            this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
            this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
            this.view.CommonFormActionsNew.btnOption.hoverSkin = ViewConstants.SKINS.HOVER;
            this.view.CommonFormActionsNew.btnOption.width = "20%";
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.width = "20%";
			var breakpoint = kony.application.getCurrentBreakpoint();
			if (breakpoint <= 1024 || orientationHandler.isTablet) {
                this.view.CommonFormActionsNew.btnBack.width = "25%";
            }
            this.view.CommonFormActionsNew.btnCancel.onClick = this.onCancelBulkPaymentRecord.bind(this.bulkPaymentRecordData);
        },

        setButtonsForReview: function() {
            this.view.formActionsNew.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
            if (this.isMakerHistoryFlow) {
				this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backtoPaymentsHistory");
			}else if(this.isMakerUploadFlow) {
				this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");
            } else {
                this.view.CommonFormActionsNew.btnBack.text = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
                this.view.CommonFormActionsNew.btnBack.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.BackToReviewRequests");
            }
            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.width = "20%";
            this.view.CommonFormActionsNew.btnBack.onClick = this.navToOngoingPayments.bind(this);
            if (this.isMakerUploadFlow){
               this.view.CommonFormActionsNew.btnBack.onClick = this.navToUploadStatus.bind(this);
            }
            this.view.CommonFormActionsNew.btnNext.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.isVisible = true;
            this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
            this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.CustomerFeedback.Submit");
            this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnOption.hoverSkin = ViewConstants.SKINS.HOVER;
            this.view.CommonFormActionsNew.btnOption.width = "20%";
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("kony.i18n.common.cancelBulkPayment");
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.width = "20%";
            this.view.CommonFormActionsNew.btnOption.onClick = this.onSubmitForApproval.bind(this);
        },


        onViewPaymentsScreenForApprovalDashboard: function(isEditFlow, BackButtonText) {

            this.resetUI();
            var flag;
            if (isEditFlow === true) flag = false;
            else flag = true;
            this.view.flxPaymentReview.isVisible = true;
            this.view.flxAddPayment.isVisible = false;
            this.view.flxSearchBar.isVisible = true;
            this.view.flxSearchRecipientsBox.width = "98%";
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveReviewPayment");
            this.view.NonEditableBulkPaymentDetails.btnEdit.isVisible = false;
            this.view.NonEditableBulkPaymentDetails.isVisible = true;
            this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);

            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let noOfTrans = kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            var templateData = {};
            templateData[paymentDes] = this.bulkPaymentRecordData.description;
            templateData[intiatedBy] = this.bulkPaymentRecordData.initiatedBy;
            templateData[transferInitiatedOn] = this.bulkPaymentRecordData.scheduledDate;
            templateData[exeDate] = this.bulkPaymentRecordData.paymentDate;
            templateData[totalAm] = this.bulkPaymentRecordData.totalAmount;
            templateData[fromAccount] = this.bulkPaymentRecordData.fromAccount;
            templateData[noOfTrans] = this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] =this.bulkPaymentRecordData.recordId;
            templateData[processMode] = this.bulkPaymentRecordData.batchMode;
            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.lblRecordHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
            this.view.TabBodyNew1.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
            this.view.TabBodyNew1.segTemplates.sectionHeaderTemplate = "flxBulkPayementHeader";
            this.view.TabBodyNew1.segTemplates.bottom = "0dp";
            this.view.TabBodyNew1.addOnlySectionHeaders(this.getSectionHeadersForNewAccounts());
            this.view.CommonFormActionsNew.isVisible = true;
            this.view.formActionsNew.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
            this.view.CommonFormActionsNew.btnBack.text = BackButtonText;
            this.view.CommonFormActionsNew.btnBack.toolTip = BackButtonText;
            var approveRejectButtonsVisibilty = false;
            if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingApprovals")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToPendingApprovals.bind(this);
                approveRejectButtonsVisibilty = true;
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingRequests")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToPendingRequests.bind(this);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.requestReviewPayment");
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToApprovalHistory")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToApprovalHistory.bind(this);
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToRequestHistory")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToRequestHistory.bind(this);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.requestReviewPayment");
            }

            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.width = "20%";
            this.view.CommonFormActionsNew.btnNext.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.isVisible = true;
            this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveAndInitiatePayment");
            this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveAndInitiatePayment");
            this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnOption.hoverSkin = ViewConstants.SKINS.HOVER;
            this.view.CommonFormActionsNew.btnOption.width = "20%";
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectPayment");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectPayment");
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.width = "20%";
            this.view.CommonFormActionsNew.btnOption.onClick = this.approvePayment.bind(this, this.bulkPaymentRecordData.requestId, BackButtonText);
            this.view.CommonFormActionsNew.btnCancel.onClick = this.showRejectBulkpaymentPopup.bind(this, this.bulkPaymentRecordData.requestId, BackButtonText);
            if (!approveRejectButtonsVisibilty) {
                this.view.CommonFormActionsNew.btnCancel.isVisible = false;
                this.view.CommonFormActionsNew.btnOption.isVisible = false;
            }
            var sysDate = CommonUtilities.getServerDateObject();
            sysDate.setHours(0, 0, 0, 0);
            if (sysDate > new Date(this.bulkPaymentRecordData.paymentDate)) {
                CommonUtilities.disableButton(this.view.CommonFormActionsNew.btnOption);
                this.bulkPaymentRecordData.Approver = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentExpiredError");
            } else {
                CommonUtilities.enableButton(this.view.CommonFormActionsNew.btnOption);
            }
            this.view.flxDropDown.onClick = this.showHidePaymentsSeg.bind(this);
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                var scopeObj = this;
                scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
            }.bind(this);
            this.view.tbxSearchBox.onKeyUp = this.onPaymentOrdersKeyUp.bind(this);
            this.view.tbxSearchBox.onDone = this.onPaymentOrdersSearchDone.bind(this);

            var sectionData = {
                "flxAddRecipients": {
                    "isVisible": false
                },
                "flxViewRecipients": {
                    "isVisible": true
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "btnViewRecipientName": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary"),
                    "onClick": function(eventobject, context) {
                        if (nameSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Asc");
                            this.accountSortType = "AccountNameAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Desc");
                            this.accountSortType = "AccountNameDesc";
                        }
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewRecipientName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                    "onClick": function(eventobject, context) {
                        if (numberSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Asc");
                            this.accountSortType = "AccountNumberAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Desc");
                            this.accountSortType = "AccountNumberDesc";
                        }
                        numberSort = !numberSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewBankName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewAmount": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Status"),
                    "onClick": function(eventobject, context) {
                        if (typeSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Asc");
                            this.accountSortType = "AccountTypeAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
                            this.accountSortType = "AccountTypeDesc";
                        }
                        typeSort = !typeSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewAmount": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                },
                "btnViewAction": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions"),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxBottomSeperator": {
                    "isVisible": true
                },
            };
            var rowDataMap = {
                "lblRecipientsType": "lblRecipientsType",
                "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
                "imgFlxSeperator": "imgFlxSeperator",
                "imgFlxBottomSeparator": "imgFlxBottomSeparator",
                "imgDropDown": "imgDropDown",
                "lblViewRecipientName": "lblViewRecipientName",
                "lblViewBankName": "lblViewBankName",
                "lblViewAmount": "lblViewAmount",
                "btnViewActions": "btnViewActions",
                "imgFlxTopSeparator": "imgFlxTopSeparator",
                "imgSample": "imgSample",
                "lblAccountNo": "lblAccountNo",
                "lblAccountNoValue": "lblAccountNoValue",
                "lblAccType": "lblAccType",
				"lblErrorDescriptionValue": "lblErrorDescriptionValue",
                "lblAccTypeValue": "lblAccTypeValue",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblPayRef": "lblPayRef",
                "lblPayRefValue": "lblPayRefValue",
                "lblFees": "lblFees",
                "lblFeesValue": "lblFeesValue",
                "btnEdit": "btnEdit",
                "btnViewRecipientName": "btnViewRecipientName",
                "imgSortViewRecipientName": "imgSortViewRecipientName",
                "btnViewBankName": "btnViewBankName",
                "imgSortViewBankName": "imgSortViewBankName",
                "btnViewAmount": "btnViewAmount",
                "imgSortViewAmount": "imgSortViewAmount",
                "btnViewAction": "btnViewAction",
                "flxAddRecipients": "flxAddRecipients",
                "flxViewRecipients": "flxViewRecipients",
                "flxRecipientsType": "flxRecipientsType",
                "flxMain": "flxMain",
                "flxTopSeperator": "flxTopSeperator",
                "flxSeperator": "flxSeperator"
            };
            var defaultValues = {
                flxMain: {
                    "height": "51dp"
                },
                "btnViewActions": {
                    "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"),
                    "onClick": function(eventobject, context) {
                        this.view.lblBankNameKey.text = kony.i18n.getLocalizedString("i18n.CheckImages.Bank");
                        this.view.lblFeesOpt2.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary");
                        this.view.lblFeesOpt3.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Both5050");
                        this.view.flxAckMessage.isVisible = false;
                        this.view.flxPrint.isVisible = false;
                        this.view.flxDownload.isVisible = false;
                        this.onClickContinueAddExistingRecipients();
                        this.view.flxInfo.isVisible = false;
                        this.view.lblAddHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
                        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.editPayment");
                        this.view.CommonFormActionsNew.btnNext.isVisible = false;
                        this.view.CommonFormActionsNew.btnCancel.isVisible = false;
                        this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.onClick = this.navBackToPaymentOrders.bind(this);
                    }.bind(this),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxSeperator": {
                    "text": "-"
                },
                "flxBulkPayementRowHeader": {
                    "skin": "bbSKnFlxffffff"
                },
                "flxBottomSeparator": {
                    "isVisible": false
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgDropDown": {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O",
                    "isVisible": true
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "flxDetailsHighlighter": {
                    "isVisible": true
                },
                "lblAccountNo": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
                    "isVisible": true,
                },
                "lblAccType": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode"),
                    "isVisible": true,
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.CheckImages.Bank"),
                    "isVisible": true,
                },
                "lblPayRef": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
                    "isVisible": true,
                },
                "lblFees": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                    "isVisible": true,
                },
                "btnEdit": {
                    "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    "isVisible": flag === true ? true : false,
                    "onClick": function(eventobject, context) {
                        this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.confirm");
                        this.showPopUp(kony.i18n.getLocalizedString("kony.i18n.common.removePayments"), this.removePaymentOrder.bind(this, eventobject, context))
                    }.bind(this)
                },
                "btnDelete": {
                    "isVisible": false
                },
                "btnViewDetails": {
                    "isVisible": false
                }
            };
            this.view.TabBodyNew1.setSectionData([sectionData]);
            if (this.paymentOrdersData.length === 0) {
                this.showNoPaymentOrders(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noPaymentOrders"));
            } else {
                this.view.TabBodyNew1.setRowDataMap([rowDataMap]);
                this.view.TabBodyNew1.setDefaultValues([defaultValues]);
                this.view.TabBodyNew1.addDataForSections([this.paymentOrdersData]);
            }
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.TabBodyNew1.isVisible = false;
            this.view.flxSearchRecipients.isVisible = false;
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) && this.bulkPaymentRecordData.requestId !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                this.fetchRequestHistory(this.bulkPaymentRecordData.requestId);
            } else {
                this.view.flxApprovalsHistoryInformation.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            }
        },

        approvePayment: function(requestId, btnText) {
            var params = {
                "requestId": requestId
            }
            this.bulkPaymentsModule.presentationController.approvePayment(params, btnText);
        },

        showPaymentApproveRejectaAcknowledgment: function(data, status) {
          if("errorDetails" in data){
            var responseDetails=data;
            responseDetails.i18n = kony.i18n.getLocalizedString("i18n.payments.unableToRejectBulkPayment");
            this.view.flxGenericMessage.setVisibility(true);
            this.view.GenericMessageNew.setContext(responseDetails);
            this.view.flxGenericMessage.width="90%";
            this.view.GenericMessageNew.closepopup = function() {
                this.view.flxGenericMessage.setVisibility(false);
            }.bind(this);
            this.view.GenericMessageNew.setVisibility(true);
            FormControllerUtility.hideProgressBar(this.view);
          }
          else{
            this.view.flxGenericMessage.setVisibility(false);
            var BackButtonText = data.btnText;
            this.bulkPaymentRecordData.status = status;
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.receivedApprovals) && status === BBConstants.TRANSACTION_STATUS.APPROVED) {
              //  this.bulkPaymentRecordData.receivedApprovals = Number.parseInt(this.bulkPaymentRecordData.receivedApprovals) + 1;
              var approveCount = Number.parseInt(this.bulkPaymentRecordData.receivedApprovals) + 1;
              this.bulkPaymentRecordData.receivedApprovals = ''+ approveCount;
            }
            if ((status === BBConstants.TRANSACTION_STATUS.APPROVED) && (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.receivedApprovals)) && (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requiredApprovals))) {
                this.bulkPaymentRecordData.Approver = this.bulkPaymentRecordData.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + this.bulkPaymentRecordData.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
            } else if (status === BBConstants.TRANSACTION_STATUS.REJECTED) {
                this.bulkPaymentRecordData.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
            } else {
                this.bulkPaymentRecordData.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
            }
            this.bulkPaymentRecordData.approvals=this.bulkPaymentRecordData.Approver;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.transactionStatus");
            this.view.flxDisplayErrorMessage.isVisible = false;
            this.view.flxSearchBar.isVisible = false;
            this.view.flxPaymentReview.NonEditableBulkPaymentDetails.lblACHTitleText.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
            this.view.flxAddPayment.isVisible = false;
            this.view.CommonFormActionsNew.isVisible = false;
            this.view.formActionsNew.isVisible = true;
            this.view.formActionsNew.btnBack.isVisible = false;
            this.view.formActionsNew.btnNext.text = BackButtonText;
            this.view.formActionsNew.btnNext.toolTip = BackButtonText;
            if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingApprovals")) {
                this.view.formActionsNew.btnNext.onClick = this.navToPendingApprovals.bind(this);
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingRequests")) {
                this.view.formActionsNew.btnNext.onClick = this.navToPendingRequests.bind(this);
            }

            this.view.formActionsNew.btnNext.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
            this.view.formActionsNew.btnNext.width = "20%";
            this.view.formActionsNew.btnNext.isVisible = true;
            this.view.formActionsNew.btnOption.isVisible = false;
            this.view.formActionsNew.btnCancel.isVisible = false;
            this.view.flxAckMessage.isVisible = true;
            this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
            if (status == BBConstants.TRANSACTION_STATUS.APPROVED)
                this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.successmessageApprovals");
            else
                this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectPaymentOrder");
            this.view.flxAckMessage.flxRightContainerInfo.isVisible = false;
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let noOfTrans = kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
            let  refId = kony.i18n.getLocalizedString("i18n.konybb.common.referenceId");
            let  reqtype = kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType");
            let cusNameID = kony.i18n.getLocalizedString("i18n.payments.customerNameandID");
            var templateData = {}; 
            templateData[paymentDes] = this.bulkPaymentRecordData.description; // also known as transaction type
            templateData[intiatedBy] = this.bulkPaymentRecordData.sentBy,
            templateData[transferInitiatedOn] = this.bulkPaymentRecordData.sentDate,
            templateData[exeDate] =  this.bulkPaymentRecordData.processingDate,
            templateData[totalAm] = this.bulkPaymentRecordData.amount,
            templateData[fromAccount] = this.bulkPaymentRecordData.accountId,
            templateData[noOfTrans] = this.bulkPaymentRecordData.totalTransactions,
            templateData[bulkPaymentID] =  this.bulkPaymentRecordData.transactionId,
            templateData[processMode] =this.bulkPaymentRecordData.processingMode,
               // "Payee": this.bulkPaymentRecordData.Payee,
              //  "Frequency": this.bulkPaymentRecordData.frequency,
            templateData[refId] =this.bulkPaymentRecordData.confirmationNumber,
            templateData[reqtype] =this.bulkPaymentRecordData.featureActionName,
            templateData[cusNameID] = this.bulkPaymentRecordData.customerName.text,
              //  "Payment File":  this.bulkPaymentRecordData.FileName
                // supporting documents to be added 
            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.TabBodyNew1.isVisible = false;
            this.view.flxSearchRecipients.isVisible = false;
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) && this.bulkPaymentRecordData.requestId !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                this.fetchRequestHistory(this.bulkPaymentRecordData.requestId);
            } else {
                this.view.flxApprovalsHistoryInformation.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            }
            }
          this.view.flxFormContent.setContentOffset({x:"0%",y:"0%"}, true);
        },

        showRejectBulkpaymentPopup: function(requestId, BackButtonText) {
            var popupConfig = {};
            popupConfig.header = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectBMR");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.areYouSureWantToReject");
            popupConfig.DropdownHeader = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.whyAreYouRejecting");
            popupConfig.commentsVisibility = true;
            popupConfig.reasonVisibility = true;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = this.rejectPayment.bind(this, requestId, BackButtonText);
          	popupConfig.maxChars  = true;
            this.showPopup(popupConfig);
        },

        showPopup: function(popupConfig) {
            // this.view.flxPopupConfirmation.height = this.view.customheader.info.frame.height + this.view.flxContentContainer.info.frame.height + this.view.flxFooter.info.frame.height;
            // FormControllerUtility.scrollToTop();
			// this.view.flxPopupNew.flxPopupContainer.centerY="25%"; 
 	   		this.view.flxPopupNew.lblHeader.text = popupConfig.header;
            this.view.flxPopupNew.lblPopupMsg.text = popupConfig.msg;
            this.view.flxPopupNew.flxComments.isVisible = popupConfig.commentsVisibility;
            this.view.flxPopupNew.flxDropdown.isVisible = popupConfig.reasonVisibility;
            if (popupConfig.reasonVisibility === true) {
                this.fetchCancellationReasons();
            }
           if ((!kony.sdk.isNullOrUndefined(popupConfig.maxChars)) &&
               popupConfig.maxChars === true) {
               this.view.flxPopupNew.trComments.maxTextLength = 35;
            }
          else {
             this.view.flxPopupNew.trComments.maxTextLength = 256;
          }
            this.view.flxPopupNew.trComments.text = popupConfig.commentsText;
            this.view.flxPopupNew.formActionsNew.btnNext.text = popupConfig.nextText;
            this.view.flxPopupNew.formActionsNew.btnCancel.text = popupConfig.cancelText;
            this.view.flxPopupNew.formActionsNew.btnNext.onClick = popupConfig.nextOnClick;
            this.view.flxPopupNew.formActionsNew.btnCancel.onClick = this.hidePopup;
            this.view.flxPopupNew.flxClose.isVisible = true;
            this.view.flxPopupNew.flxClose.cursorType = "pointer";
            this.view.flxPopupNew.flxClose.onClick = this.hidePopup;
            this.view.flxPopupConfirmation.isVisible = true;
            this.view.flxPopupNew.trComments.onKeyUp = function() {
                if (this.view.flxPopupNew.trComments.text.trim() !== "" && this.view.flxPopupNew.trComments.text !== null) {
                    CommonUtilities.enableButton(this.view.flxPopupNew.formActionsNew.btnNext);
                } else {
                    CommonUtilities.disableButton(this.view.flxPopupNew.formActionsNew.btnNext);
                }
            }.bind(this);
            CommonUtilities.disableButton(this.view.flxPopupNew.formActionsNew.btnNext);
            this.view.flxPopupNew.trComments.placeholder = "";
            if (!kony.sdk.isNullOrUndefined(popupConfig.commentsHeader)) {
                this.view.flxPopupNew.lblCommnets.text = popupConfig.commentsHeader;
            }
            if (!kony.sdk.isNullOrUndefined(popupConfig.DropdownHeader)) {
                this.view.flxPopupNew.lblCancellationReason.text = popupConfig.DropdownHeader;
            }
            this.view.forceLayout();
          	this.adjustScreen(0);
        },

        hidePopup: function() {
            this.view.flxPopupNew.trComments.text = "";
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.forceLayout();
        },

        rejectPayment: function(requestId, BackButtonText) {
            var Comments = this.view.flxPopupNew.trComments.text;
            var rejectionreason = this.view.flxPopupNew.lstCancellationReason.selectedKeyValue[1];
            var params = {
                "requestId": requestId,
                "comments": Comments,
                "rejectionreason": rejectionreason
            }
            this.bulkPaymentsModule.presentationController.rejectPayment(params, BackButtonText);
            this.hidePopup();
        },

        downloadBulkRequestAck: function() {
            var requestParams = {
                "recordId": !kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.recordId) ? this.bulkPaymentRecordData.recordId :  this.bulkPaymentRecordData.confirmationNumber,
                "requestId": kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) ? "" : this.bulkPaymentRecordData.requestId
            };
            this.bulkPaymentsModule.presentationController.initiateBulkPaymentFileDownload(requestParams);
        },

        navToPendingApprovals: function() {
          	this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
            ApprovalsAndRequestsModule.presentationController.noServiceNavigateToForm({"appName" : "ApprovalRequestMA", "friendlyName" : "ApprovalsReqUIModule/frmBBApprovalsDashboard"}, BBConstants.MYAPPROVALS_BULK_PAYMENTS);
        },

        navToPendingRequests: function() {
          	this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
            ApprovalsAndRequestsModule.presentationController.noServiceNavigateToForm({"appName" : "ApprovalRequestMA", "friendlyName" : "ApprovalsReqUIModule/frmBBRequestsDashboard"}, BBConstants.MYREQUESTS_BULK_PAYMENTS);
        },

        navToApprovalHistory: function() {
          	this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
            ApprovalsAndRequestsModule.presentationController.noServiceNavigateToFormBBUsers({"appName" : "ApprovalRequestMA", "friendlyName" : "ApprovalsReqUIModule/frmBBApprovalsDashboard"}, BBConstants.DASHBOARD_DEFAULT_TAB, "", true);
        },

        navToRequestHistory: function() {
          	this.view.tbxSearchBox.text = "";
            this.view.imgClearIcon.isVisible = false;
            var ApprovalsAndRequestsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ApprovalsReqUIModule",
                "appName": "ApprovalRequestMA"
            });
            ApprovalsAndRequestsModule.presentationController.noServiceNavigateToFormBBUsers({"appName" : "ApprovalRequestMA", "friendlyName" : "ApprovalsReqUIModule/frmBBRequestsDashboard"}, BBConstants.DASHBOARD_DEFAULT_TAB, "", true);
        },

        getPaymentOrders: function(reqData) {
            this.bulkPaymentsModule.presentationController.fetchPaymentOrders(reqData, this.isMakerHistoryFlow);
        },

        fetchBulkPaymentOrders: function(bulkPaymentRecordData) {
            this.getPaymentOrders({
                "recordId": bulkPaymentRecordData.recordId
            });
        },
        fetchTransactionOrders: function(transactions) {
            this.getTransactionOrders({
                "recordId": transactions.confirmationNumber
            });
        },
        getTransactionOrders: function(transactionId) {
            this.bulkPaymentsModule.presentationController.fetchTransactionOrders(transactionId);
        },

        fetchBulkPaymentRecordDetailsById: function() {

            var params = {
                "recordId": this.bulkPaymentRecordData.recordId
            }

            this.bulkPaymentsModule.presentationController.fetchBulkPaymentRecordDetailsById(params);
        },

        fetchCancellationReasons: function() {
            var params = {};
            this.bulkPaymentsModule.presentationController.fetchCancellationReasons(params);
        },

        fetchRequestHistory: function(requestId) {
            this.bulkPaymentsModule.presentationController.getRequestsHistory({
                "Request_id": requestId
            });
        },

        cancelBulkPaymentRecord: function(bulkPaymentRecordData) {
            var Comments = this.view.flxPopupNew.trComments.text;
            var cancellationreason = this.view.flxPopupNew.lstCancellationReason.selectedKeyValue[1];
            var cancellationReasonId = this.view.flxPopupNew.lstCancellationReason.selectedKeyValue[0];
           	var statusCode;
          	if(this.bulkPaymentRecordData.status.toUpperCase()=== BBConstants.TRANSACTION_STATUS.SCHEDULED.toUpperCase())
              {
                statusCode=BBConstants.TRANSACTION_STATUS.CANCELWAREHOUSE.toUpperCase();
              }
         	 else
              {
                statusCode=BBConstants.TRANSACTION_STATUS.CANCELLED.toUpperCase();
              }
            this.cancelBMR({
                "recordId": this.bulkPaymentRecordData.recordId,
                "comments": Comments,
                "cancellationreason": cancellationreason,
              	"cancellationReasonId" : cancellationReasonId,
              	"statusCode" : statusCode
            });
        },

        updateBulkPaymentRecord: function(bulkPaymentRecordData) {
            this.saveAndUpdateBMR({
                "recordId": bulkPaymentRecordData.recordId,
                "fromAccount": bulkPaymentRecordData.fromAccount,
                "description": bulkPaymentRecordData.description
            });
        },

        saveAndUpdateBMR: function(reqData) {
            this.bulkPaymentsModule.presentationController.updateBulkPaymentRecord(reqData);
        },

        cancelBMR: function(reqData) {
            this.bulkPaymentsModule.presentationController.cancelBulkPaymentRecord(reqData);
        },

        onupdateBulkPaymentRecordSuccess: function(reqData) {
            this.bulkPaymentRecordData.fromAccountMasked = this.view.flxPaymentReview.flxEditableDetails.flxListBox.lstFrmAccount.selectedKeyValue[1];
            this.bulkPaymentRecordData.description = this.view.flxPaymentReview.flxEditableDetails.flxTextBox.txtDescription.text;
            var templateData = {}; 
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let totalTrans = kony.i18n.getLocalizedString("i18n.bulkWire.totalTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            templateData[paymentDes] = this.bulkPaymentRecordData.description;
            templateData[intiatedBy] =  this.bulkPaymentRecordData.initiatedBy;
            templateData[transferInitiatedOn] = this.bulkPaymentRecordData.scheduledDate;
            templateData[exeDate] = this.bulkPaymentRecordData.paymentDate;
            templateData[totalAm] = this.bulkPaymentRecordData.totalAmount;
            templateData[fromAccount] = this.bulkPaymentRecordData.fromAccountMasked;
            templateData[totalTrans] = this.bulkPaymentRecordData.totalTransactions;
            templateData[bulkPaymentID] = this.bulkPaymentRecordData.recordId;
            templateData[processMode] =  this.bulkPaymentRecordData.batchMode;
            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.flxAckMessage.isVisible = true;
            this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);
            this.view.flxAckMessage.lblSuccessMessage.text = kony.i18n.getLocalizedString("kony.i18n.common.ItemUpdated");
            this.view.flxAckMessage.flxRightContainerInfo.lblReferenceHeader.isVisible = false;
            this.view.flxAckMessage.flxRightContainerInfo.lblReferenceNumber.isVisible = false;
            var self = this;
            this.view.CommonFormActionsNew.btnOption.onClick = function() {
                self.bulkPaymentsModule.presentationController.submitPaymentOrder({
                    "recordId": self.bulkPaymentRecordData.recordId
                });
            };
            FormControllerUtility.hideProgressBar(this.view);
        },

        onCancelBulkPaymentRecord: function(bulkPaymentRecordData) {
            var popupConfig = {};
            popupConfig.header = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.cancelBMRHeader");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.cancelBMR");
            popupConfig.DropdownHeader = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.whyAreYouCancelling");
            popupConfig.commentsVisibility = true;
            popupConfig.reasonVisibility = true;
          	popupConfig.maxChars = false;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = this.cancelBulkPaymentRecord.bind(this);
            this.showPopup(popupConfig);
        },
      
        onSubmitBMRFailure: function(reqData){
          if("errorDetails" in reqData){
            var responseDetails=reqData;
            responseDetails.i18n = kony.i18n.getLocalizedString("i18n.payments.unableToSubmitBulkRequest");
            this.view.flxGenericMessage.setVisibility(true);
            this.view.GenericMessageNew.setContext(responseDetails);
            this.view.flxGenericMessage.width="90%";
            this.view.GenericMessageNew.closepopup = function() {
                this.view.flxGenericMessage.setVisibility(false);
            }.bind(this);
            this.view.GenericMessageNew.setVisibility(true);
          }
          else{
            this.showServerErrorMessage({
                    show: true,
                    errorMessage: reqData.dbpErrMsg
                });
          }
          FormControllerUtility.hideProgressBar(this.view);
          this.view.flxFormContent.setContentOffset({x:"0%",y:"0%"}, true);
        },

        oncancelBulkPaymentRecordSuccess: function(reqData) {
            this.hidePopup();
            if("errorDetails" in reqData){
              var responseDetails=reqData;
              responseDetails.i18n = kony.i18n.getLocalizedString("i18n.payments.unableToCancelBulkRequest");
              this.view.flxGenericMessage.setVisibility(true);
              this.view.GenericMessageNew.setContext(responseDetails);
              this.view.flxGenericMessage.width="90%";
              this.view.GenericMessageNew.closepopup = function() {
                this.view.flxGenericMessage.setVisibility(false);
              }.bind(this);
              this.view.GenericMessageNew.setVisibility(true);
            }
            else{
          	this.bulkPaymentRecordData.status= BBConstants.TRANSACTION_STATUS.CANCELLED; 
			this.getRecipientData(true);
            this.view.flxAcknowledgementContainer.isVisible = true;
            this.view.flxAcknowledgementNew.rTextSuccess.skin = "sknRtxSSPLight42424224Px";
            this.view.flxAcknowledgementNew.rTextSuccess.text = kony.i18n.getLocalizedString("kony.i18n.common.cancelledSuccessfully");
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                var scopeObj = this;
                scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
                this.view.forceLayout();
            }.bind(this);
         	this.view.flxAcknowledgementNew.flxImgdownload.isVisible=true;
         	this.view.CommonFormActionsNew.btnOption.isVisible = false;
            this.view.CommonFormActionsNew.btnCancel.isVisible = false;
          	this.view.flxAcknowledgementNew.imgTick.src = "success_green.png";
 			this.view.formActionsNew.btnCancel.isVisible=false;
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.flxFormContent.setContentOffset({x:"0%",y:"0%"}, true);
        },

        fetchBulkPaymentEditAccounts: function() {
            var editAccounts = [];
            applicationManager.getConfigurationManager().userAccounts.forEach(function(obj) {
                var account = {
                    "Id": obj.accountID,
                    "Name": CommonUtilities.getMaskedAccName(obj.accountID)[0]
                };
                if (applicationManager.getConfigurationManager().checkAccountAction(obj.accountID, "BULK_PAYMENT_REQUEST_EDIT"))
                    editAccounts.push(account);
            });
            return editAccounts;
        },

        objectToListBoxArrayFromService: function(objArray) {
            var list = [];
            for (var i = 0; i < objArray.length; i++) {
                list.push([objArray[i].Id, objArray[i].Name]);
            }
            return list;
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);        
        },

        convertToArrayCancellationReason: function(objArray) {
            var list = [];
            for (var i = 0; i < objArray.length; i++) {
                list.push([objArray[i].id, objArray[i].reason]);
            }
            return list;
        },
        onViewDetailsScreenForApprovalDashboard: function(isEditFlow, BackButtonText) {
            this.resetUI();
            var flag;
            if (isEditFlow === true) flag = false;
            else flag = true;
            this.view.flxPaymentReview.isVisible = true;
            this.view.flxAddPayment.isVisible = false;
            this.view.flxSearchBar.isVisible = true;
            this.view.flxSearchRecipientsBox.width = "98%";
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveReviewPayment");
            this.view.NonEditableBulkPaymentDetails.btnEdit.isVisible = false;
            this.view.NonEditableBulkPaymentDetails.isVisible = true;
            let featureSubmitData = this.bulkPaymentRecordData.featureActionId;
			if(featureSubmitData === "BULK_PAYMENT_SINGLE_SUBMIT" ||featureSubmitData === "BULK_PAYMENT_MULTIPLE_SUBMIT"){
				this.view.flxPrint.isVisible = true;
            this.view.flxDownload.isVisible = true;
			}else{
				this.view.flxPrint.isVisible = false;
            this.view.flxDownload.isVisible = false;
			}
            this.view.flxDownload.onClick = this.downloadBulkRequestAck.bind(this);
            this.view.flxPrint.onClick = function() {
                window.print();
            }.bind(this);
            let fromAccount = kony.i18n.getLocalizedString("kony.mb.common.FromAccount");
            let paymentDes = kony.i18n.getLocalizedString("kony.i18n.common.paymentDescription");
            let exeDate = kony.i18n.getLocalizedString("kony.i18n.common.executionDate");
            let totalAm = kony.i18n.getLocalizedString("i18n.bulkpayments.batchAmount");
            let noOfTrans = kony.i18n.getLocalizedString("kony.i18n.common.numberofTransactions");
            let bulkPaymentID = kony.i18n.getLocalizedString("kony.i18n.common.bulkPaymentID");
            let transType = kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
            let processMode = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ProcessingMode");
            let tempName = kony.i18n.getLocalizedString("i18n.konybb.common.templateName");
            let  intiatedBy = kony.i18n.getLocalizedString("kony.i18n.common.initiatedBy");
            let  reqtype = kony.i18n.getLocalizedString("i18n.konybb.Common.RequestType");
            let  debAccount = kony.i18n.getLocalizedString("i18n.konybb.Common.DebitAccount");
            let status = kony.i18n.getLocalizedString("i18n.serviceRequests.Status");
            let creatOn = kony.i18n.getLocalizedString("i18n.AccountsDetails.Createdon");
            let creatBy = kony.i18n.getLocalizedString("i18n.AccountsDetails.Createdby");
            let effDate = kony.i18n.getLocalizedString("i18n.konybb.common.effectiveDate");
            let referId = kony.i18n.getLocalizedString("i18n.konybb.common.referenceId");
            let fileName = kony.i18n.getLocalizedString("i18n.bulkWire.fileName");
            let uploadBy = kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadedBy");
            let uploadDate = kony.i18n.getLocalizedString("kony.mb.achfiledetail.uploadDate");
            let totaldebitAmt = kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt");
            let totalCredAmt = kony.i18n.getLocalizedString("kony.mb.achfiledetail.totalCreditAmount");
            let noOfDebts = kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfDebits");
            let noOfCredits = kony.i18n.getLocalizedString("kony.mb.achfiledetail.numberOfCredits");
            let noOfPreNotes = kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfPreNotes");
            let noOfrecords = kony.i18n.getLocalizedString("kony.mb.achfiledetail.NoOfRecords");
            let amount = kony.i18n.getLocalizedString("kony.mb.common.Amount");
            let payee = kony.i18n.getLocalizedString("i18n.konybb.Common.Payee");
            let recurrences =  kony.i18n.getLocalizedString("kony.mb.TransfersEurope.Recurrences");
            let freq =  kony.i18n.getLocalizedString("kony.mb.transaction.frequency");
            let transferInitiatedOn = kony.i18n.getLocalizedString("i18n.payments.transferInitiatedOn");
            let cusNameID = kony.i18n.getLocalizedString("i18n.payments.customerNameandID");
            let maxTransAmount = kony.i18n.getLocalizedString("i18n.konybb.common.MaximumTransferAmount");
            if (featureSubmitData === "BULK_PAYMENT_SINGLE_SUBMIT" || featureSubmitData === "BULK_PAYMENT_MULTIPLE_SUBMIT") {
                    var templateData = {};
                    templateData[paymentDes] = this.bulkPaymentRecordData.description; // also known as transaction type
                    templateData[intiatedBy] = this.bulkPaymentRecordData.sentBy;
                    templateData[transferInitiatedOn] = this.bulkPaymentRecordData.sentDate;
                    templateData[exeDate] = this.bulkPaymentRecordData.processingDate;
                    templateData[totalAm] = this.bulkPaymentRecordData.amount;
                    templateData[fromAccount] =  this.bulkPaymentRecordData.accountId.toolTip; //CommonUtilities.getMaskedAccName(this.bulkPaymentRecordData.accountId)[0],
                    templateData[noOfTrans] =   this.bulkPaymentRecordData.totalTransactions;
                    templateData[bulkPaymentID] =    this.bulkPaymentRecordData.transactionId;
                    templateData[processMode] =   this.bulkPaymentRecordData.processingMode;
                    // "Payee": {isVisible : (this.bulkPaymentRecordData.Payee === "-")?false:true} ,
                    //   "Frequency": this.bulkPaymentRecordData.frequency,
                  //  "Reference Id": this.bulkPaymentRecordData.confirmationNumber,
                   templateData[reqtype] =  this.bulkPaymentRecordData.featureActionName;
                   templateData[cusNameID]= this.bulkPaymentRecordData.customerName.text ;
                  //  "Payment File": this.bulkPaymentRecordData.FileName
                        // supporting documents to be added
            }else if(this.bulkPaymentRecordData.featureActionId === "ACH_COLLECTION_CREATE" || this.bulkPaymentRecordData.featureActionId === "ACH_PAYMENT_CREATE"  ) {
				     var templateData = {};
                    templateData[tempName] =  this.bulkPaymentRecordData.templateName; // also known as transaction type
                    templateData[transType] =  this.bulkPaymentRecordData.featureActionName;
                    templateData[reqtype] = this.bulkPaymentRecordData.requestType;
                    templateData[debAccount] =this.bulkPaymentRecordData.accountId.toolTip;
                    templateData[creatOn] =this.bulkPaymentRecordData.sentDate;
                    templateData[creatBy] =this.bulkPaymentRecordData.sentBy;
                    templateData[effDate] =this.bulkPaymentRecordData.processingDate; //CommonUtilities.getMaskedAccName(this.bulkPaymentRecordData.accountId)[0],
                    templateData[maxTransAmount]= this.bulkPaymentRecordData.amount;
                    templateData[status] = this.bulkPaymentRecordData.status;
                    templateData[referId] = this.bulkPaymentRecordData.confirmationNumber;
                    templateData[cusNameID] = this.bulkPaymentRecordData.customerName.text;
                    
                        // supporting documents to be added
			}else if(this.bulkPaymentRecordData.featureActionId === "ACH_FILE_UPLOAD"){
				  var templateData = {};
                    templateData[fileName] =  this.bulkPaymentRecordData.FileName; // also known as transaction type
                    templateData[status] = this.bulkPaymentRecordData.status;
                    templateData[uploadBy] =  this.bulkPaymentRecordData.sentBy;
                    templateData[uploadDate] =  this.bulkPaymentRecordData.sentDate;
                    templateData[totaldebitAmt] =  this.bulkPaymentRecordData.totalDeditAmount;
                    templateData[totalCredAmt] =  this.bulkPaymentRecordData.totalCreditAmount;
                    templateData[noOfDebts] = this.bulkPaymentRecordData.numberOfDebits; //CommonUtilities.getMaskedAccName(this.bulkPaymentRecordData.accountId)[0],
                    templateData[noOfCredits] =this.bulkPaymentRecordData.numberOfCredits;
                    templateData[noOfPreNotes] =this.bulkPaymentRecordData.numberOfPrenotes;
                    templateData[noOfrecords] = this.bulkPaymentRecordData.numberOfRecords;
                    templateData[cusNameID] = this.bulkPaymentRecordData.customerName.text ;
                        // supporting documents to be added
			}
			else {
                this.view.flxSearchBar.isVisible = false;
                var templateData = {};
                    templateData[debAccount] = this.bulkPaymentRecordData.accountId.toolTip, // also known as transaction type
                    templateData[cusNameID] =  this.bulkPaymentRecordData.customerName.text;
                    templateData[amount] = this.bulkPaymentRecordData.amount;
                    templateData[payee] = this.bulkPaymentRecordData.payee;
                    templateData[creatOn] =this.bulkPaymentRecordData.sentDate;
                    templateData[creatBy] = this.bulkPaymentRecordData.sentBy;
                    templateData[recurrences] = this.bulkPaymentRecordData.recurrence; //CommonUtilities.getMaskedAccName(this.bulkPaymentRecordData.accountId)[0],
                    templateData[freq] = this.bulkPaymentRecordData.frequency;
                    templateData[transType] = this.bulkPaymentRecordData.featureActionName;
                    //"Processing Mode": this.bulkPaymentRecordData.processingMode,
                    templateData[reqtype] = this.bulkPaymentRecordData.requestType;

                        // supporting documents to be added
            }
           
          if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
				this.view.NonEditableBulkPaymentDetails.segNonEditableDetails.rowTemplate = "flxNonEditableDetailsMobile";
				
			}
            this.view.NonEditableBulkPaymentDetails.setData(templateData, true);
            this.view.lblRecordHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
            this.view.TabBodyNew1.segTemplates.rowTemplate = "flxBulkPayementRowTemplate";
            this.view.TabBodyNew1.segTemplates.sectionHeaderTemplate = "flxBulkPayementHeader";
            this.view.TabBodyNew1.addOnlySectionHeaders(this.getSectionHeadersForNewAccounts());
            this.view.CommonFormActionsNew.isVisible = true;
            this.view.formActionsNew.isVisible = false;
            this.view.CommonFormActionsNew.btnBack.isVisible = true;
            this.view.CommonFormActionsNew.btnBack.text = BackButtonText;
            this.view.CommonFormActionsNew.btnBack.toolTip = BackButtonText;
            var approveRejectButtonsVisibilty = false;
            if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingApprovals")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToPendingApprovals.bind(this);
                approveRejectButtonsVisibilty = true;
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToPendingRequests")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToPendingRequests.bind(this);
                this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.requestReviewPayment");
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToApprovalHistory")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToApprovalHistory.bind(this);
                this.view.lblContentHeader.text = this.bulkPaymentRecordData.featureActionName + " - Approve Payment";
            } else if (BackButtonText === kony.i18n.getLocalizedString("i18n.kony.BulkPayments.backToRequestHistory")) {
                this.view.CommonFormActionsNew.btnBack.onClick = this.navToRequestHistory.bind(this);
                //  this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.requestReviewPayment");
                this.view.lblContentHeader.text = this.bulkPaymentRecordData.featureActionName + " - Request Payment";
            }
            this.view.CommonFormActionsNew.btnBack.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnBack.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
           if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
			 this.view.CommonFormActionsNew.btnBack.width = "92%";
				 this.view.CommonFormActionsNew.btnOption.width = "92%";
				 this.view.CommonFormActionsNew.btnCancel.width = "92%";
			}else{
				 this.view.CommonFormActionsNew.btnBack.width = "20%";
				  this.view.CommonFormActionsNew.btnOption.width = "20%";
				   this.view.CommonFormActionsNew.btnCancel.width = "20%";
			}
        //    this.view.CommonFormActionsNew.btnBack.width = "20%";
            this.view.CommonFormActionsNew.btnNext.isVisible = false;
            this.view.CommonFormActionsNew.btnOption.isVisible = true;
            this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveAndInitiatePayment");
            this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.approveAndInitiatePayment");
            this.view.CommonFormActionsNew.btnOption.skin = ViewConstants.SKINS.NORMAL;
            this.view.CommonFormActionsNew.btnOption.hoverSkin = ViewConstants.SKINS.HOVER;
         //   this.view.CommonFormActionsNew.btnOption.width = "20%";
            this.view.CommonFormActionsNew.btnCancel.isVisible = true;
            this.view.CommonFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectPayment");
            this.view.CommonFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.rejectPayment");
            this.view.CommonFormActionsNew.btnCancel.skin = ViewConstants.SKINS.NEXT_BTN;
            this.view.CommonFormActionsNew.btnCancel.hoverSkin = ViewConstants.SKINS.NEXT_BTN;
           // this.view.CommonFormActionsNew.btnCancel.width = "20%";
            this.view.CommonFormActionsNew.btnOption.onClick = this.approvePayment.bind(this, this.bulkPaymentRecordData.requestId, BackButtonText);
            this.view.CommonFormActionsNew.btnCancel.onClick = this.showRejectBulkpaymentPopup.bind(this, this.bulkPaymentRecordData.requestId, BackButtonText);
            if (!approveRejectButtonsVisibilty) {
                this.view.CommonFormActionsNew.btnCancel.isVisible = false;
                this.view.CommonFormActionsNew.btnOption.isVisible = false;
            }
            var sysDate = CommonUtilities.getServerDateObject();
            sysDate.setHours(0, 0, 0, 0);
            if (sysDate > new Date(this.bulkPaymentRecordData.paymentDate)) {
                CommonUtilities.disableButton(this.view.CommonFormActionsNew.btnOption);
                this.bulkPaymentRecordData.Approver = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.paymentExpiredError");
            } else {
                CommonUtilities.enableButton(this.view.CommonFormActionsNew.btnOption);
            }
            this.view.flxDropDown.onClick = this.showHidePaymentsSeg.bind(this);
            this.view.flxAcknowledgementNew.flxImgdownload.onTouchEnd = function() {
                var scopeObj = this;
                scopeObj.view.flxAcknowledgementContainer.setVisibility(false);
            }.bind(this);
            this.view.tbxSearchBox.onKeyUp = this.onTransactionOrdersKeyUp.bind(this);
            this.view.tbxSearchBox.onDone = this.onTransactionOrdersSearchDone.bind(this);
            var sectionData = {
                "flxAddRecipients": {
                    "isVisible": false
                },
                "flxViewRecipients": {
                    "isVisible": true
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "btnViewRecipientName": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary"),
                    "onClick": function(eventobject, context) {
                        if (nameSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Asc");
                            this.accountSortType = "AccountNameAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountName", "String", "Desc");
                            this.accountSortType = "AccountNameDesc";
                        }
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewRecipientName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                    "left" : (kony.application.getCurrentBreakpoint() === 640) ? "5dp" : "12dp",
                },
                "btnViewBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                    "onClick": function(eventobject, context) {
                        if (numberSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Asc");
                            this.accountSortType = "AccountNumberAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountNumber", "ObjectNumber", "Desc");
                            this.accountSortType = "AccountNumberDesc";
                        }
                        numberSort = !numberSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewBankName": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                  "left" : (kony.application.getCurrentBreakpoint() === 640) ? "5dp" : "12dp",
                },
                "btnViewAmount": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.Status"),
                    "onClick": function(eventobject, context) {
                        if (typeSort) {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Asc");
                            this.accountSortType = "AccountTypeAsc";
                        } else {
                            this.view.TabBodyNew1.sortData(context.sectionIndex, "", "", "lblAccountType", "ObjectText", "Desc");
                            this.accountSortType = "AccountTypeDesc";
                        }
                        typeSort = !typeSort;
                    }.bind(this),
                    "isVisible": true
                },
                "imgSortViewAmount": {
                    "isVisible": true,
                    "src": "sortingfinal.png",
                  "left" : (kony.application.getCurrentBreakpoint() === 640) ? "5dp" : "12dp",
                },
                "btnViewAction": {
                    "text": kony.i18n.getLocalizedString("i18n.wireTransfers.Actions"),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgFlxTopSeparator": {
                    "text": "-"
                },
                "flxBottomSeperator": {
                    "isVisible": true
                },
            };
            var rowDataMap = {
                "lblRecipientsType": "lblRecipientsType",
                "imgRecipTypeDrpdown": "imgRecipTypeDrpdown",
                "imgFlxSeperator": "imgFlxSeperator",
                "imgFlxBottomSeparator": "imgFlxBottomSeparator",
                "imgDropDown": "imgDropDown",
                "lblViewRecipientName": "lblViewRecipientName",
                "lblViewBankName": "lblViewBankName",
                "lblViewAmount": "lblViewAmount",
                "btnViewActions": "btnViewActions",
                "imgFlxTopSeparator": "imgFlxTopSeparator",
                "imgSample": "imgSample",
                "lblAccountNo": "lblAccountNo",
                "lblAccountNoValue": "lblAccountNoValue",
                "lblAccType": "lblAccType",
                "lblAccTypeValue": "lblAccTypeValue",
                "lblSwiftCode": "lblSwiftCode",
                "lblSwiftCodeValue": "lblSwiftCodeValue",
                "lblPayRef": "lblPayRef",
                "lblPayRefValue": "lblPayRefValue",
                "lblFees": "lblFees",
                "lblFeesValue": "lblFeesValue",
                "btnEdit": "btnEdit",
                "btnViewRecipientName": "btnViewRecipientName",
                "imgSortViewRecipientName": "imgSortViewRecipientName",
                "btnViewBankName": "btnViewBankName",
                "imgSortViewBankName": "imgSortViewBankName",
                "btnViewAmount": "btnViewAmount",
                "imgSortViewAmount": "imgSortViewAmount",
                "btnViewAction": "btnViewAction",
                "flxAddRecipients": "flxAddRecipients",
                "flxViewRecipients": "flxViewRecipients",
                "flxRecipientsType": "flxRecipientsType",
                "flxMain": "flxMain",
                "flxTopSeperator": "flxTopSeperator",
                "flxSeperator": "flxSeperator"
            };
            var defaultValues = {
                flxMain: {
                    "height": "51dp"
                },
                "btnViewActions": {
                    "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"),
                    "onClick": function(eventobject, context) {
                        this.view.lblBankNameKey.text = kony.i18n.getLocalizedString("i18n.CheckImages.Bank");
                        this.view.lblFeesOpt2.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary");
                        this.view.lblFeesOpt3.text = kony.i18n.getLocalizedString("i18n.TransfersEur.Both5050");
                        this.view.flxAckMessage.isVisible = false;
                        this.view.flxPrint.isVisible = false;
                        this.view.flxDownload.isVisible = false;
                        this.onClickContinueAddExistingRecipients();
                        this.view.flxInfo.isVisible = false;
                        this.view.lblAddHeader.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentDetails");
                        this.view.lblContentHeader.text = kony.i18n.getLocalizedString("kony.i18n.common.editPayment");
                        this.view.CommonFormActionsNew.btnNext.isVisible = false;
                        this.view.CommonFormActionsNew.btnCancel.isVisible = false;
                        this.view.CommonFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
                        this.view.CommonFormActionsNew.btnOption.onClick = this.navBackToPaymentOrders.bind(this);
                    }.bind(this),
                    "isVisible": flag === true ? true : false,
                },
                "imgFlxSeperator": {
                    "text": "-"
                },
                "flxBulkPayementRowHeader": {
                    "skin": "bbSKnFlxffffff"
                },
                "flxBottomSeparator": {
                    "isVisible": false
                },
                "imgFlxBottomSeparator": {
                    "text": "-"
                },
                "imgDropDown": {
                    "skin": "sknLblFontTypeIcon1a98ff12pxOther",
                    "text": "O",
                    "isVisible": true
                },
                flxDropDown: {
                  "isVisible": true,
                  "onClick": function(eventobject, context) {
                    var secIndex = context["sectionIndex"];
                    var rowIndex = context["rowIndex"];
                    var conObj={"section": secIndex, "row": rowIndex, "direction": 1};
                    this.view.TabBodyNew1.showOrHideDetails(conObj);
                  }.bind(this)
                },
                "flxTopSeperator": {
                    "isVisible": true
                },
                "flxDetailsHighlighter": {
                    "isVisible": true
                },
                "lblAccountNo": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.accountNumber"),
                    "isVisible": true,
                },
                "lblAccType": {
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode"),
                    "isVisible": true,
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.CheckImages.Bank"),
                    "isVisible": true,
                },
                "lblPayRef": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference"),
                    "isVisible": true,
                },
                "lblFees": {
                    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy"),
                    "isVisible": true,
                },
                "btnEdit": {
                    "text": kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister"),
                    "isVisible": flag === true ? true : false,
                    "onClick": function(eventobject, context) {
                        this.view.PopupHeaderUM.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.confirm");
                        this.showPopUp(kony.i18n.getLocalizedString("kony.i18n.common.removePayments"), this.removePaymentOrder.bind(this, eventobject, context))
                    }.bind(this)
                },
                "btnDelete": {
                    "isVisible": false
                },
                "btnViewDetails": {
                    "isVisible": false
                }
            };
            this.view.TabBodyNew1.setSectionData([sectionData]);
            

            if (this.paymentOrdersData.length === 0) {
                this.showNoPaymentOrders(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.noPaymentOrders"));
            } else {
                this.view.TabBodyNew1.setRowDataMap([rowDataMap]);
                this.view.TabBodyNew1.setDefaultValues([defaultValues]);
                this.view.TabBodyNew1.addDataForSections([this.paymentOrdersData]);
            }
            this.view.imgDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
            this.view.TabBodyNew1.isVisible = false;
            this.view.flxSearchRecipients.isVisible = false;
            if (!kony.sdk.isNullOrUndefined(this.bulkPaymentRecordData.requestId) && this.bulkPaymentRecordData.requestId !== kony.i18n.getLocalizedString("i18n.common.NA")) {
                this.fetchRequestHistory(this.bulkPaymentRecordData.requestId);
            } else {
                this.view.flxApprovalsHistoryInformation.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
            }
          
          if(this.view.tbxSearchBox.text !="")
			{
				this.showHidePaymentsSeg();
			}
        },
      
      setPermissionBasedUIonAddPOClick: function() {
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
                this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd2.setEnabled(false);
            }
            /* if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
                this.view.imgAdd2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgAdd1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgAdd2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgAdd1.setEnabled(false);
                this.view.imgAdd2.setEnabled(false);
            } */
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === true) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
               this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
				this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
				this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
				this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
				this.view.imgRadioBtnRecipientType1.setEnabled(false);
                this.view.imgRadioBtnRecipientType2.setEnabled(false);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === false) && ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === true) || (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === true))) {
                this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnRecipientType1.setEnabled(false);
                this.view.imgRadioBtnRecipientType2.setEnabled(false);
                this.view.flxRecipientDetailsInfinity.isVisible = false;
                this.view.flxRecipientDetailsExternal.isVisible = true;
                this.view.flxFeesPaid.isVisible = true;
                this.view.btnLookUp.isVisible = true;
                this.view.flxAccountType.isVisible = true;
                this.OnRadioBtnClickFeesPaidBy(3);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_SAMEBANK") === true) && ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === true) || (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === true))) {
                this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnRecipientType2.setEnabled(true);
                this.view.flxRecipientDetailsInfinity.isVisible = true;
                this.view.flxRecipientDetailsExternal.isVisible = false;
                this.view.flxFeesPaid.isVisible = false;
                this.view.flxAccountType.isVisible = false;
                this.view.btnLookUp.isVisible = false;
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === true)) {
                this.view.imgRadioBtnACCType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnACCType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnACCType2.setEnabled(false);
                this.view.imgRadioBtnACCType1.setEnabled(false);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === true) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
                this.view.imgRadioBtnACCType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnACCType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnACCType1.setEnabled(false);
                this.view.imgRadioBtnACCType2.setEnabled(false);
            }
        },
        setPermissionBasedUIonExternalClick: function() {
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === false) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === true)) {
                this.view.imgRadioBtnACCType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnACCType1.setEnabled(false);
                this.view.imgRadioBtnACCType2.setEnabled(false);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_INATIONAL") === true) && (this.checkUserPermission("BULK_PAYMENT_REQUEST_ADD_PO_EXTERNAL_DOMESTIC") === false)) {
                this.view.imgRadioBtnACCType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnACCType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                this.view.imgRadioBtnACCType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnACCType1.setEnabled(false);
                this.view.imgRadioBtnACCType2.setEnabled(false);
            }
        },
		
		setGenericMessage: function() {
            if (isackFlow === true) {
				responseDetails.i18n = ackMsg;
				this.view.flxGenericMessage.setVisibility(true);
                this.view.GenericMessageNew.setContext(responseDetails);
				this.view.GenericMessageNew.closepopup = function() {
                    this.view.flxGenericMessage.setVisibility(false);
                }.bind(this);
                isackFlow = false;
                this.view.flxFormContent.setContentOffset({x:"0%",y:"0%"}, true)
                this.adjustScreen(10);
                this.view.forceLayout();
            }
        },
		

    }
});