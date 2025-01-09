define(["CommonUtilities", "ViewConstants", "OLBConstants"], function(CommonUtilities, ViewConstants, OLBConstants) {

    /**
     * Bulk Payment Presenation to handle all BulkPayment related functionalities. intialize members.
     * @class
     * @alias module:BulkPayment_PresentationController
     */
    function BulkPaymentPresentationController() {

        kony.mvc.Presentation.BasePresenter.call(this);
        this.initializePresentationController();
    }

    inheritsFrom(BulkPaymentPresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Method to intialize Enroll presentation scope data.
     */
    BulkPaymentPresentationController.prototype.initializePresentationController = function() {
            this.bulkPaymentFormName = "frmBulkPaymentsDashboard";
        },

        /**
         * no service call navigation to frmBulkPaymentsDashboard
         */
        BulkPaymentPresentationController.prototype.noServiceNavigate = function(formName, id, resData) {
            // Null check for empty parameter
            if (!kony.sdk.isNullOrUndefined(formName)) {
                if (!kony.sdk.isNullOrUndefined(id)) {
                    applicationManager.getNavigationManager().navigateTo(formName);
                    applicationManager.getNavigationManager().updateForm({
                        "key": id,
                        "responseData": resData
                    }, formName);
                }
            }
        };
  
        BulkPaymentPresentationController.prototype.noServiceNavigateTemp = function(navObj) {
          applicationManager.getNavigationManager().navigateTo({
            "appName": navObj.onSuccess.appName,
            "friendlyName": navObj.onSuccess.module + "/" + navObj.onSuccess.form
          });
          applicationManager.getNavigationManager().updateForm({
            "key": BBConstants.LOADING_INDICATOR,
            "responseData": null
          }, navObj.onSuccess.form);
          applicationManager.getNavigationManager().updateForm({
            "key": navObj.onSuccess.context.key,
            "responseData": navObj.requestData
          }, navObj.onSuccess.form);
        };

    BulkPaymentPresentationController.prototype.getBulkPayCampaigns = function() {
        var self = this;
      if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS && OLBConstants.CLIENT_PROPERTIES.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
            var directMktManager = applicationManager.getDirectMarketingManager();
            directMktManager.getAds("accountDashboardCampaignsWeb", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
        } else {
            self.getCampaignsSuccess([]);
        }
//         var asyncManager = applicationManager.getAsyncManager();
//         var accountsManager = applicationManager.getAccountManager();
//         var breakpoint = kony.application.getCurrentBreakpoint();
//         asyncManager.callAsync(
//             [
//                 asyncManager.asyncItem(accountsManager, 'getCampaigns', [{
//                     "screenName": "ACCOUNT_DASHBOARD",
//                     "scale": (breakpoint >= 1366) ? "1366" : breakpoint
//                 }])
//             ],
//             function(asyncResponses) {
//                 scope.getCampaigns(asyncResponses.responses[0].data);
//             })
    };

    /**
     *Method is used for fetching of campaigns
     * @param {Object}- list of campaigns
     */
    BulkPaymentPresentationController.prototype.getCampaigns = function(response) {
        if (response.campaignSpecifications)
            this.getCampaignsSuccess(response);
        else
            this.getCampaignsFailure(response);
    };

    /**
     * Method that gets called when fetching unread messages is successful
     * @param {Object} messagesObj List of messages Object
     */
    BulkPaymentPresentationController.prototype.getCampaignsSuccess = function(res) {
      applicationManager.getNavigationManager().updateForm({
        "campaignRes": res,
      }, "frmBulkPaymentsDashboard");
    };

    /**
     * Method that gets called when there is an error in fetching unread messages for account dashboard
     * @param {Object} error Error Object
     */
    BulkPaymentPresentationController.prototype.getCampaignsFailure = function(error) {        
      applicationManager.getNavigationManager().updateForm({
        "campaignError": error,
      }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.downloadSampleFile = function() {
        applicationManager.getBulkManager().fetchSampleFileforDownload({}, this.dowloadSampleFileSuccess.bind(this), this.downloadSampleFileFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.dowloadSampleFileSuccess = function(response) {
        var data = response["sampleFiles"];
        for (var i = 0; i < data.length; i++) {
            var csvContent = atob(data[i].content)
            var blob = new Blob([csvContent], {
                type: "data:application/octet-stream;base64"
            });
            var url = window.URL.createObjectURL(blob);

            var element = document.createElement('a');
            element.setAttribute('href', url);
            element.setAttribute('download', data[i].fileName + "." + data[i].description.toLowerCase());
            element.setAttribute('target', '_blank');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };

    BulkPaymentPresentationController.prototype.downloadSampleFileFailure = function(responseError) {
        kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
    };

    BulkPaymentPresentationController.prototype.uploadBulkPaymentFile = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsUploadFile");
        applicationManager.getBulkManager().uploadBulkPaymentFile(params, this.uploadBulkPaymentFileSuccess.bind(this), this.uploadBulkPaymentFileFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.uploadBulkPaymentFileSuccess = function(response) {
        if (!kony.sdk.isNullOrUndefined(response.dbpErrMsg) && "" !== response.dbpErrMsg) {
            applicationManager.getNavigationManager().updateForm({
                "serverError": true,
                "errorMessage": response.dbpErrMsg,
            }, "frmBulkPaymentsUploadFile");
        } else {
            applicationManager.getNavigationManager().updateForm({
                "uploadFileSuccess": response,
            }, "frmBulkPaymentsUploadFile");
        }
    };

    BulkPaymentPresentationController.prototype.uploadBulkPaymentFileFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsUploadFile");
    };

    BulkPaymentPresentationController.prototype.fetchOnGoingPayments = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");
        applicationManager.getBulkManager().fetchOnGoingPayments(params, this.fetchOnGoingPaymentsSuccess.bind(this), this.fetchOnGoingPaymentsFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchOnGoingPaymentsSuccess = function(response) {
        var formattedResponse = this.formatOngoingPaymentsData(response.onGoingPayments);
        applicationManager.getNavigationManager().updateForm({
            "fetchOnGoingPaymentsSuccess": formattedResponse,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.fetchOnGoingPaymentsFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.fetchCancellationReasons = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().fetchCancellationReasons(params, this.fetchCancellationReasonsSuccess.bind(this), this.fetchCancellationReasonsFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchCancellationReasonsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "fetchCancellationReasonsSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.fetchCancellationReasonsFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.formatOngoingPaymentsData = function(response) {
        var formatManager = applicationManager.getFormatUtilManager();
        response.forEach(function(transaction) {
            if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.DISCARDED.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAITACK.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.READY.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAITEXEC.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.COMPLETED.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAREHOUSED.toLowerCase()) || (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELWAREHOUSE.toLowerCase())) {
                transaction.actionsValue = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewPayment");
            } else {
                transaction.actionsValue = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ReviewPayment");
            }


            if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (!kony.sdk.isNullOrUndefined(transaction.receivedApprovals)) && (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals))) {
                transaction.Approver = transaction.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.REJECTED.toLowerCase()) {
                transaction.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
            } else if (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals)) {
                transaction.Approver = transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
            } else {
                transaction.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
            }

          transaction.fromAccountMasked = CommonUtilities.getMaskedAccName(transaction.fromAccount)[0];          

            transaction.description = {
                "text": kony.sdk.isNullOrUndefined(transaction.description) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.truncateStringWithGivenLength(transaction.description, 25),
                "toolTip": kony.sdk.isNullOrUndefined(transaction.description) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.description
            };
            if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.REJECTED.toLowerCase()) {
                transaction.cancellationreason = kony.sdk.isNullOrUndefined(transaction.rejectionreason) ? "-" : transaction.rejectionreason;
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase()) {
                transaction.cancellationreason = kony.sdk.isNullOrUndefined(transaction.cancellationreason) ? "-" : transaction.cancellationreason;
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELLEDANDAUTHORIZED.toLowerCase()) {
                transaction.cancellationreason = kony.sdk.isNullOrUndefined(transaction.cancellationreason) ? "-" : transaction.cancellationreason;
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.DISCARDED.toLowerCase()) {
                transaction.cancellationreason = kony.sdk.isNullOrUndefined(transaction.cancellationreason) ? "-" : transaction.cancellationreason;
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELWAREHOUSE.toLowerCase()) {
                transaction.cancellationreason = kony.sdk.isNullOrUndefined(transaction.cancellationreason) ? "-" : transaction.cancellationreason;
            } else {
                transaction.cancellationreason = "-";
            }
            if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.DISCARDED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.CANCELLED;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAITEXEC.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.PROCESSINGPAYMENTS;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAITACK.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.PROCESSINGPAYMENTS;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PROCESSED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.PROCESSINGPAYMENTS;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CREATED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.READYFORREVIEW;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.CANCELLED;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.REJECTED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.REJECTEDBYAPPROVER;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.READY.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.PENDINGFORAPPROVAL;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.PENDINGFORAPPROVAL;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.COMPLETED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.COMPLETED;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WAREHOUSED.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.SCHEDULED;
            } else if ((transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELWAREHOUSE.toLowerCase())) {
                transaction.status = BBConstants.TRANSACTION_STATUS.CANCELLED;
            } else {
                transaction.status = kony.sdk.isNullOrUndefined(transaction.status) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.status;
            }
          
          if(!kony.sdk.isNullOrUndefined(transaction.bulkErrorDetails)
             && transaction.bulkErrorDetails.length>0)
          {
            transaction.errorDescription = transaction.bulkErrorDetails[0].errorDescription;
          }
          else{
            transaction.errorDescription ="-";
          }
            transaction.fromAccountMasked = {
                    "text": kony.sdk.isNullOrUndefined(transaction.fromAccountMasked) ? kony.i18n.getLocalizedString("i18n.common.NA"): transaction.fromAccountMasked,
                    "toolTip": CommonUtilities.getMaskedAccName(transaction.fromAccount)[1]
                },
            transaction.totalAmount = kony.sdk.isNullOrUndefined(transaction.totalAmount) ? kony.i18n.getLocalizedString("i18n.common.NA") : formatManager.formatAmount(transaction.totalAmount);
            transaction.scheduledDate = kony.sdk.isNullOrUndefined(transaction.scheduledDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.scheduledDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            transaction.actionsValue = kony.sdk.isNullOrUndefined(transaction.actionsValue) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.actionsValue;           
            transaction.paymentDate = kony.sdk.isNullOrUndefined(transaction.paymentDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.paymentDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            transaction.paymentOrderProduct = kony.sdk.isNullOrUndefined(transaction.paymentOrderProduct) ? "" : transaction.paymentOrderProduct;
            transaction.recordId = {
                "text": kony.sdk.isNullOrUndefined(transaction.recordId) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.truncateStringWithGivenLength(transaction.recordId, 20),
                "toolTip": kony.sdk.isNullOrUndefined(transaction.recordId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.recordId
            };
        });
        return (response);
    };

    BulkPaymentPresentationController.prototype.createTemplate = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");
        applicationManager.getBulkManager().createTemplate(params, this.createTemplateSuccess.bind(this), this.createTemplateSuccessFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.createTemplateSuccess = function(response) {
        if (!kony.sdk.isNullOrUndefined(response.templateId)) {
            applicationManager.getNavigationManager().updateForm({
                "templateCreationSuccess": response,
            }, "frmBulkPaymentsTemplate");
        } else {
            applicationManager.getNavigationManager().updateForm({
                "templateCreationError": response,
            }, "frmBulkPaymentsTemplate");
        }
    };

    BulkPaymentPresentationController.prototype.createTemplateSuccessFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "templateCreationError": responseError,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.fetchSingleUploadedFile = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");
        applicationManager.getBulkManager().fetchUploadedFiles(params, this.fetchSingleUploadedFileSuccess.bind(this), this.fetchUploadedFilesFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchSingleUploadedFileSuccess = function(response) {
        var formattedResponse = this.formatUploadedFilesData(response.uploadedFiles);
        applicationManager.getNavigationManager().updateForm({
            "fetchSingleUploadedFileSuccess": formattedResponse,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.fetchUploadedFiles = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");
        applicationManager.getBulkManager().fetchUploadedFiles(params, this.fetchUploadedFilesSuccess.bind(this), this.fetchUploadedFilesFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchUploadedFilesSuccess = function(response) {
        var formattedResponse = this.formatUploadedFilesData(response.uploadedFiles);
        applicationManager.getNavigationManager().updateForm({
            "fetchUploadedFilesSuccess": formattedResponse,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.fetchUploadedFilesFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.formatUploadedFilesData = function(response) {
        response.forEach(function(transaction) {
          transaction.lblFileName= {
				"text": kony.i18n.getLocalizedString("kony.i18n.bulkpayments.fileName")
			};
			transaction.lblSystemFileName={
				"text": kony.i18n.getLocalizedString("kony.i18n.bulkpayments.uploadID")
			};
			transaction.lblBulkReference={
				"text": kony.i18n.getLocalizedString("kony.i18n.bulkpayments.bmrID")
			};
            transaction.fileName = {
                "text": kony.sdk.isNullOrUndefined(transaction.fileName) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.truncateStringWithGivenLength(transaction.fileName, 25),
                "toolTip": kony.sdk.isNullOrUndefined(transaction.fileName) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.fileName
            };
            transaction.uploadedDate = kony.sdk.isNullOrUndefined(transaction.uploadedDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.uploadedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
          if (!kony.sdk.isNullOrUndefined(transaction.status)){  
          if (transaction.status.toLowerCase() != BBConstants.TRANSACTION_STATUS.PROCESSED.toLowerCase()) {
                transaction.lblSystemFileNameValue = {
                    "skin": ViewConstants.SKINS.BULKPAYMENTS_NOHYPERLINK_SKIN,
                    "text": "-"
                };
            } else {
                transaction.lblSystemFileNameValue = {
                    "skin": ViewConstants.SKINS.BULKPAYMENTS_NOHYPERLINK_SKIN,
                    "text": transaction.confirmationNumber
                };
            }  
          }
          else{
            transaction.status = kony.i18n.getLocalizedString("i18n.common.NA");
            transaction.actionValue = "";
          }
            if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PROCESSED.toLowerCase()) {
                transaction.status = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionSuccessful");
                transaction.actionValue = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PROCESSING.toLowerCase()) {
                transaction.status = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractingPayments");
                transaction.actionValue = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                transaction.confirmationNumber = "--";
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.ERRORINPROCESSING.toLowerCase()) {
                transaction.status = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.extractionFailed");
                transaction.actionValue = kony.i18n.getLocalizedString("kony.i18n.bulkpayments.uploadAgain");
                transaction.confirmationNumber = "--";
            } else if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.UPLOADED.toLowerCase() || transaction.status === "RECEIVED") {
                transaction.status = BBConstants.TRANSACTION_STATUS.UPLOADED;
                transaction.actionValue = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
                transaction.confirmationNumber = "--";
            }
            transaction.status = {
                "text": kony.sdk.isNullOrUndefined(transaction.status) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.truncateStringWithGivenLength(transaction.status, 26),
                "toolTip": kony.sdk.isNullOrUndefined(transaction.status) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.status
            };  
        });
        return (response);
    };

    BulkPaymentPresentationController.prototype.fetchHistory = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");
        applicationManager.getBulkManager().fetchHistory(params, this.fetchHistorySuccess.bind(this), this.fetchHistoryFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchHistorySuccess = function(response) {
        var formattedResponse = this.formatHistoryData(response.history);
        applicationManager.getNavigationManager().updateForm({
            "fetchHistorySuccess": formattedResponse,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.fetchHistoryFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.formatHistoryData = function(response) {
        var formatManager = applicationManager.getFormatUtilManager();
        response.forEach(function(transaction) {
            if ((transaction.status === BBConstants.TRANSACTION_STATUS.PENDING) && (!kony.sdk.isNullOrUndefined(transaction.receivedApprovals)) && (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals))) {
                transaction.Approver = transaction.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
            } else if (transaction.status === BBConstants.TRANSACTION_STATUS.REJECTED) {
                transaction.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
            } else if (!kony.sdk.isNullOrUndefined(transaction.requiredApprovals)) {
                transaction.Approver = transaction.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
            } else {
                transaction.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
            }
                     
            transaction.fromAccountMasked = CommonUtilities.getMaskedAccName(transaction.fromAccount)[0];
            transaction.paymentDate = kony.sdk.isNullOrUndefined(transaction.paymentDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.paymentDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            transaction.scheduledDate = kony.sdk.isNullOrUndefined(transaction.scheduledDate) ? kony.i18n.getLocalizedString("i18n.common.NA"): CommonUtilities.getFrontendDateStringInUTC(transaction.scheduledDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
            transaction.totalAmount = kony.sdk.isNullOrUndefined(transaction.totalAmount) ? kony.i18n.getLocalizedString("i18n.common.NA") : formatManager.formatAmount(transaction.totalAmount);
            transaction.fromAccountMasked = {
                "text": kony.sdk.isNullOrUndefined(transaction.fromAccountMasked) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.fromAccountMasked,
                "toolTip": CommonUtilities.getMaskedAccName(transaction.fromAccount)[1]
            };
            transaction.status = kony.sdk.isNullOrUndefined(transaction.status) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getModifiedstatusForPending(transaction.status);
        });
        return (response);
    };

    BulkPaymentPresentationController.prototype.fetchPaymentOrders = function(params, isMakerHistoryFlow) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().fetchPaymentOrders(params, isMakerHistoryFlow, this.fetchPaymentOrdersSuccess.bind(this), this.fetchPaymentOrdersFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchPaymentOrdersSuccess = function(response, id) {
        var formattedResponse = this.formatPaymentOrdersData(response.paymentOrders, id);
        applicationManager.getNavigationManager().updateForm({
            "fetchPaymentOrdersSuccess": formattedResponse,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.fetchPaymentOrdersFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsReview");
    };
    BulkPaymentPresentationController.prototype.fetchTransactionOrders = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().fetchTransactionOrders(params, this.fetchTransactionOrdersSuccess.bind(this), this.fetchTransactionOrdersFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchTransactionOrdersSuccess = function(response) {
        var formattedResponse = this.formatPaymentOrdersData(response.paymentOrders);
        applicationManager.getNavigationManager().updateForm({
            "viewDeatilsApprovals": formattedResponse,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.fetchTransactionOrdersFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsReview");
    };


    /**
     *   formatPaymentOrdersData : formatting the data as required for the form controller.
     */
    BulkPaymentPresentationController.prototype.formatPaymentOrdersData = function(response, id) {
        var res = [];
        var extractedRecords = [];
        var newRecords = [];
        var formattedRecords = [];

        response.forEach(function(transaction) {
            if (transaction.status.toLowerCase() === BBConstants.TRANSACTION_STATUS.CANCELLED.toLowerCase() && (id === 1))
			{	
              //DO NOTHING
            }
			else{
            res.push({
                "lblViewBankName": {
                    "text": kony.sdk.isNullOrUndefined(transaction.amount) ? "-" : CommonUtilities.formatCurrencyWithCommas(transaction.amount, false, transaction.currency),
                },
                "lblFeesValue": {
                    "text": kony.sdk.isNullOrUndefined(transaction.feesPaidBy) ? "-" : transaction.feesPaidBy,
                },
                "lblViewAmount": {
                    "text": (id == 1) ? (kony.sdk.isNullOrUndefined(transaction.paymentStatus) ? transaction.status : transaction.paymentStatus) : (kony.sdk.isNullOrUndefined(transaction.status) ? "-" : transaction.status),
                },
                "lblAccountNoValue": {
                    "text": kony.sdk.isNullOrUndefined(transaction.accountNumber) ? "-" : (transaction.accountNumber.length > 7 ? CommonUtilities.truncateStringWithGivenLength(transaction.accountNumber + "....", 6) + CommonUtilities.getLastFourDigit(transaction.accountNumber) : transaction.accountNumber),
                },
                "lblAccTypeValue": {
                    "text": (kony.sdk.isNullOrUndefined(transaction.swift) || CommonUtilities.isEmptyString(transaction.swift)) ? "-" : transaction.swift,
                },
                "lblSwiftCodeValue": {
                    "text": kony.sdk.isNullOrUndefined(transaction.bankName) ? "-" : transaction.bankName,
                },
                "lblViewRecipientName": {
                    "text": kony.sdk.isNullOrUndefined(transaction.recipientName) ? "-" : transaction.recipientName,
                },
                "lblPayRefValue": {
                    "text": (kony.sdk.isNullOrUndefined(transaction.paymentReference) || CommonUtilities.isEmptyString(transaction.paymentReference)) ? "-" : transaction.paymentReference,
                },
                "lblPaymentMethodValue": {
                    "isVisible": false,
                    "text": kony.sdk.isNullOrUndefined(transaction.paymentMethod) ? "-" : transaction.paymentMethod,
                },
                "lblErrorDescriptionValue": {
                    "isVisible": true,
                    "text": kony.sdk.isNullOrUndefined(transaction.errorDescription) ? "-" : transaction.errorDescription,
                },
                "flxRecipientsType": {
                    "isVisible": false,
                },
                "flxSeperator": {
                    "isVisible": false,
                },
                "flxActions": {
                    "isVisible": transaction.status === BBConstants.TRANSACTION_STATUS.CANCELLED ?  false : applicationManager.getConfigurationManager().checkUserPermission("BULK_PAYMENT_REQUEST_REMOVE_PO"),
                },
                "flxViewActions": {
                      "isVisible": transaction.status === BBConstants.TRANSACTION_STATUS.CANCELLED ? false : applicationManager.getConfigurationManager().checkUserPermission("BULK_PAYMENT_REQUEST_EDIT_PO"),
                  },
                "paymentOrderId": kony.sdk.isNullOrUndefined(transaction.paymentOrderId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.paymentOrderId,
                "recipientName": kony.sdk.isNullOrUndefined(transaction.recipientName) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.recipientName,
                "accountNumber": kony.sdk.isNullOrUndefined(transaction.accountNumber) ? "-" : transaction.accountNumber,
                "bankName": kony.sdk.isNullOrUndefined(transaction.bankName) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.bankName,
                "swift": kony.sdk.isNullOrUndefined(transaction.switft) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.swift,
                "currency": kony.sdk.isNullOrUndefined(transaction.currency) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.currency,
                "amount": kony.sdk.isNullOrUndefined(transaction.amount) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.amount,
                "feesPaidBy": kony.sdk.isNullOrUndefined(transaction.feesPaidBy) ? kony.i18n.getLocalizedString("i18n.common.NA"): transaction.feesPaidBy,
                "paymentReference": transaction.paymentReference,
                "status": transaction.status,
                "paymentStatus": transaction.paymentStatus,
            });
        }});

        res.forEach(function(transaction) {

            if (transaction.status === BBConstants.READY_FOR_EXECUTION || transaction.status === BBConstants.IN_ERROR
                || transaction.status === BBConstants.TRANSACTION_STATUS.PROCESSING) {
                extractedRecords.push(transaction);
            } else {
                newRecords.push(transaction);
            }
        });

        formattedRecords.push({
            "flxRecipientsType": {
                "isVisible": true,
            },
            "lblRecipientsType": {
                "isVisible": true,
                "text": kony.i18n.getLocalizedString("i18n.payments.newlyAddedOrModified") + " (" + newRecords.length + ")",
            },
            "flxSeperator": {
                "isVisible": true
            },
        });

        newRecords.forEach(function(transaction) {
            formattedRecords.push(transaction);
        });

        formattedRecords.push({
            "flxRecipientsType": {
                "isVisible": true,
            },
            "lblRecipientsType": {
                "isVisible": true,
                "text": kony.i18n.getLocalizedString("i18n.payments.readyForExecution") + " (" + extractedRecords.length + ")",
            },
            "flxSeperator": {
                "isVisible": true
            },
        });

        extractedRecords.forEach(function(transaction) {
            formattedRecords.push(transaction);
        });

      if(id===1)  return(res);

      else return (formattedRecords);
    };

    BulkPaymentPresentationController.prototype.editPaymentOrder = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().editPaymentOrder(params, this.editPaymentOrderSuccess.bind(this), this.editPaymentOrderFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.editPaymentOrderSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "editPaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.editPaymentOrderFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "editPaymentOrderFailure": {dbpErrCode:responseError.serverErrorRes.dbpErrCode,dbpErrMsg:responseError.serverErrorRes.dbpErrMsg,errorDetails:responseError.serverErrorRes.errorDetails,errorMessage:responseError.errorMessage},
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.deletePaymentOrder = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().deletePaymentOrder(params, this.deletePaymentOrderSuccess.bind(this), this.deletePaymentOrderFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.deletePaymentOrderSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "deletePaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.deletePaymentOrderFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
        	"deletePaymentOrderFailure": {dbpErrCode:responseError.serverErrorRes.dbpErrCode,dbpErrMsg:responseError.serverErrorRes.dbpErrMsg,errorDetails:responseError.serverErrorRes.errorDetails,errorMessage:responseError.errorMessage},
        }, "frmBulkPaymentsReview");
    };
  
    BulkPaymentPresentationController.prototype.getCIF = function(accNumber) {
      var coreCustomerId="";
      var contractId="";
      var userAccounts = applicationManager.getConfigurationManager().getConfigurationValue("userAccounts");
      for(var i=0;i<userAccounts.length;i++)
      {
        if(userAccounts[i].accountID==accNumber){
          coreCustomerId = userAccounts[i].Membership_id;
        }
      }
      var userObj =applicationManager.getUserPreferencesManager().getUserObj();
      var coreCustomersArray =kony.sdk.isNullOrUndefined(userObj.CoreCustomers) ? "" : userObj.CoreCustomers;

      for(var j=0;j<coreCustomersArray.length;j++){
        if(coreCustomersArray[j].coreCustomerID==coreCustomerId){
          contractId = coreCustomersArray[j].contractId;
        }
      }
      var cif= [{"contractId":contractId,"coreCustomerId":coreCustomerId}];
      return cif;
    };

    BulkPaymentPresentationController.prototype.addPaymentOrder = function(params) {

        var addBeneficiaryParams = {};
        addBeneficiaryParams = params;      

        if (params.addToList === true) {
            if (params.paymentMethod === BBConstants.INTERNATIONAL) {
                addBeneficiaryParams.displayName = "INTERNATIONAL_ACCOUNT";
                addBeneficiaryParams.isSameBankAccount = "false";
                addBeneficiaryParams.isInternationalAccount = "true";
                addBeneficiaryParams.isVerified = "true";
            } else if (params.paymentMethod === BBConstants.DOMESTIC) {
                addBeneficiaryParams.displayName = "OTHER_EXTERNAL_ACCOUNT";
                addBeneficiaryParams.isSameBankAccount = "false";
                addBeneficiaryParams.isInternationalAccount = "false";
                addBeneficiaryParams.isVerified = "true";
            } else {
                addBeneficiaryParams.displayName = "OTHER_INTERNAL_MEMBER";
                addBeneficiaryParams.isSameBankAccount = "true";
                addBeneficiaryParams.isInternationalAccount = "false";
                addBeneficiaryParams.isVerified = "true";
            }
            addBeneficiaryParams.nickName = params.recipientName;
            addBeneficiaryParams.beneficiaryName = params.recipientName;
            addBeneficiaryParams.swiftCode = params.swift;
          
            var cif =JSON.stringify(this.getCIF(params.fromAccount));
            addBeneficiaryParams.cif=cif;

            applicationManager.getNavigationManager().updateForm({
                "progressBar": true
            }, "frmBulkPaymentsReview");

            applicationManager.getBulkManager().addPaymentOrder(params, this.addNewBeneficiaryFromPOData.bind(this, addBeneficiaryParams), this.addPaymentOrderFailure.bind(this));
        } else {
            applicationManager.getNavigationManager().updateForm({
                "progressBar": true
            }, "frmBulkPaymentsReview");
            applicationManager.getBulkManager().addPaymentOrder(params, this.addPaymentOrderSuccess.bind(this), this.addPaymentOrderFailure.bind(this));
        }
    };

    BulkPaymentPresentationController.prototype.addNewBeneficiaryFromPOData = function(params, response) {
        applicationManager.getAccountManager().createExternalAccounts(params, this.addNewBeneficiaryFromPODataSuccess.bind(this), this.addNewBeneficiaryFromPODataFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.addNewBeneficiaryFromPODataSuccess = function(response) {

        response.successMsg = kony.i18n.getLocalizedString("i18n.common.paymentSucessMsg") + " , " + kony.i18n.getLocalizedString("i18n.common.BeneficiaryCreated");
        applicationManager.getNavigationManager().updateForm({
            "addPaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.addNewBeneficiaryFromPODataFailure = function(response) {

        response.successMsg = kony.i18n.getLocalizedString("i18n.common.paymentSucessMsg") + " , " + kony.i18n.getLocalizedString("i18n.common.BeneficiaryCreationFailed");
        applicationManager.getNavigationManager().updateForm({
            "addPaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.addPaymentOrderSuccess = function(response) {

        response.successMsg = kony.i18n.getLocalizedString("i18n.common.paymentSucessMsg");
        applicationManager.getNavigationManager().updateForm({
            "addPaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.addPaymentOrderFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "addPaymentOrderFailure": {dbpErrCode:responseError.serverErrorRes.dbpErrCode,dbpErrMsg:responseError.serverErrorRes.dbpErrMsg,errorDetails:responseError.serverErrorRes.errorDetails,errorMessage:responseError.errorMessage},
        }, "frmBulkPaymentsReview");
    };
		    
    BulkPaymentPresentationController.prototype.addBeneficiary = function (params) { 
      
        var addBeneficiaryParams={} ;
        addBeneficiaryParams = params;
      
        if(params.accountType === BBConstants.INTERNATIONAL){
            addBeneficiaryParams.displayName = "INTERNATIONAL_ACCOUNT";
            addBeneficiaryParams.isSameBankAccount = "false";
            addBeneficiaryParams.isInternationalAccount = "true";
            addBeneficiaryParams.isVerified = "true";     
        }
        else if(params.accountType === BBConstants.DOMESTIC){
            addBeneficiaryParams.displayName = "OTHER_EXTERNAL_ACCOUNT";
            addBeneficiaryParams.isSameBankAccount = "false";
            addBeneficiaryParams.isInternationalAccount = "false";
            addBeneficiaryParams.isVerified = "true";
        }
        else{
            addBeneficiaryParams.displayName = "OTHER_INTERNAL_MEMBER";
            addBeneficiaryParams.isSameBankAccount = "true";
            addBeneficiaryParams.isInternationalAccount = "false";
            addBeneficiaryParams.isVerified = "true";
        }
        addBeneficiaryParams.nickName =params.recipientName;
        addBeneficiaryParams.beneficiaryName =params.recipientName;
        addBeneficiaryParams.swiftCode =params.swift;
        
        var cif =JSON.stringify(this.getCIF(params.fromAccount));
        addBeneficiaryParams.cif=cif;

        applicationManager.getNavigationManager().updateForm({
          "progressBar": true
        }, "frmBulkPaymentsTemplate");
         
        applicationManager.getAccountManager().createExternalAccounts(params,this.addNewBeneficiarySuccess.bind(this),this.addNewBeneficiaryFailure.bind(this));  
      
    };
     
    BulkPaymentPresentationController.prototype.addNewBeneficiarySuccess = function(response) { 

        response.successMsg=kony.i18n.getLocalizedString("i18n.common.paymentSucessMsg") +" , " +kony.i18n.getLocalizedString("i18n.common.BeneficiaryCreated");
          applicationManager.getNavigationManager().updateForm({			  
            "addBeneficiarySuccess" : response,			
          }, "frmBulkPaymentsTemplate");
      };

    BulkPaymentPresentationController.prototype.addNewBeneficiaryFailure = function(response) {

      response.errorMessage= kony.i18n.getLocalizedString("i18n.common.BeneficiaryCreationFailed");
      applicationManager.getNavigationManager().updateForm({
        "addBeneficiaryFailure" : response,
      }, "frmBulkPaymentsTemplate");
    };    

    BulkPaymentPresentationController.prototype.submitPaymentOrder = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().submitPaymentOrder(params, this.submitPaymentOrderSuccess.bind(this), this.submitPaymentOrderFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.submitPaymentOrderSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "submitPaymentOrderSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.submitPaymentOrderFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "submitBMRFailure": responseError,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.cancelBulkPaymentRecord = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().cancelBulkPaymentRecord(params, this.cancelBulkPaymentRecordSuccess.bind(this), this.cancelBulkPaymentRecordFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.cancelBulkPaymentRecordSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "cancelBulkPaymentRecordSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.cancelBulkPaymentRecordFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
            "closePopup": true,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.updateBulkPaymentRecord = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().updateBulkPaymentRecord(params, this.updateBulkPaymentRecordSuccess.bind(this), this.updateBulkPaymentRecordFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.updateBulkPaymentRecordSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "updateBulkPaymentRecordSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.updateBulkPaymentRecordFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsReview");
    };

    /** Get External accounts from backend
     * @param {object} value - Sorting and pagination parameters
     */
    BulkPaymentPresentationController.prototype.getExistingBeneficiaries = function(params, batchMode ,fromAccount) {

        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchAllExternalAccountsWithPagination(params, this.getExistingBeneficiariesSuccess.bind(this, batchMode ,fromAccount), this.getExistingBeneficiariesFailure.bind(this, batchMode,fromAccount));
    };

    BulkPaymentPresentationController.prototype.getExistingBeneficiariesSuccess = function(batchMode,fromAccount, response) {

        response = response.ExternalAccounts;
        var formattedRecords = [];
        var filterResponse = [];
        var accountCIF =this.getCIF(fromAccount);

        response.forEach(function(responseObj) {

            responseObj.lblAccountNoValue = {
                "isVisible": true,
                "text": kony.sdk.isNullOrUndefined(responseObj.accountNumber) ? "-" : responseObj.accountNumber
            };
            responseObj.lblBankName = {
                  "isVisible": true,
                  "text": kony.sdk.isNullOrUndefined(responseObj.bankName) ? "-" : responseObj.bankName
              };
            responseObj.address = "";
            if(!kony.sdk.isNullOrUndefined(responseObj.addressLine1)){
                if(responseObj.addressLine1 !== "null" ){
                    responseObj.address += responseObj.addressLine1;
                }
            }
            if(!kony.sdk.isNullOrUndefined(responseObj.addressLine2)){
                if(responseObj.addressLine2 !== "null" ){
                    responseObj.address = responseObj.address.length > 0 ? responseObj.address + ", "  : responseObj.address;
                    responseObj.address += responseObj.addressLine2;
                }
            }
            if(!kony.sdk.isNullOrUndefined(responseObj.city)){
                if(responseObj.city !== "null" ){
                    responseObj.address = responseObj.address.length > 0 ? responseObj.address + ", "  : responseObj.address;
                    responseObj.address += responseObj.city;
                }
            }
            if(!kony.sdk.isNullOrUndefined(responseObj.country)){
                if(responseObj.country !== "null" ){
                    responseObj.address = responseObj.address.length > 0 ? responseObj.address + ", "  : responseObj.address;
                    responseObj.address += responseObj.country;
                }
            }
            responseObj.currency = kony.sdk.isNullOrUndefined(responseObj.currency) ? "-" : responseObj.currency === "null" ? "-" : responseObj.currency;
            responseObj.feesPaidBy = kony.sdk.isNullOrUndefined(responseObj.feesPaidBy) ? "-" : responseObj.feesPaidBy === "null" ? "-" : responseObj.feesPaidBy;

            if (responseObj.isInternationalAccount === "true") {
                responseObj.lblAccountType = {
                    "isVisible": true,
                    "text": BBConstants.INTERNATIONAL
                };
                responseObj.lblAccTypeValue = {
                    "isVisible": true,
                    "text": kony.sdk.isNullOrUndefined(responseObj.swiftCode) ? "-" : responseObj.swiftCode
                };
                responseObj.lblSwiftName = {
                    "isVisible": true,
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode")
                };
            } else if (responseObj.isSameBankAccount === "true") {
                responseObj.lblAccountType = {
                    "isVisible": true,
                    "text": BBConstants.INTERNAL
                };
                responseObj.lblAccTypeValue = {
                    "isVisible": false,
                    "text": kony.sdk.isNullOrUndefined(responseObj.swiftCode) ? "-" : responseObj.swiftCode
                };
                responseObj.lblSwiftName = {
                    "isVisible": false,
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode")
                };
            } else if ((responseObj.isInternationalAccount === "false") && (responseObj.isSameBankAccount === "false")) {
                responseObj.lblAccountType = {
                    "isVisible": true,
                    "text": BBConstants.DOMESTIC
                };
                responseObj.lblAccTypeValue = {
                    "isVisible": true,
                    "text": kony.sdk.isNullOrUndefined(responseObj.swiftCode) ? "-" : responseObj.swiftCode
                };
                responseObj.lblSwiftName = {
                    "isVisible": true,
                    "text": kony.i18n.getLocalizedString("kony.i18n.common.swiftcode")
                };
            }

            responseObj.lblNickName = {
                "isVisible": true,
                "text": kony.sdk.isNullOrUndefined(responseObj.nickName) ? "-" : responseObj.nickName
            };

        });
      
        response.forEach(function(transaction) {
                  var responseCIF = JSON.parse(transaction.cif);
                  for(var i=0;i<responseCIF.length;i++)
                  {
                      if(responseCIF[i].contractId==accountCIF[0].contractId)
                      {
                        var coreCustomers = responseCIF[i].coreCustomerId.split(',');
                        for(var j=0;j<coreCustomers.length;j++)
                        {
                          if(coreCustomers[j]==accountCIF[0].coreCustomerId)
                          {
                            filterResponse.push(transaction);
                          }
                        }
                      }
                  }                                  
              });

        if (batchMode === BBConstants.BATCH_MODE_SINGLE) {
            filterResponse.forEach(function(transaction) {
                if ((transaction.lblAccountType.text === BBConstants.INTERNAL) || (transaction.lblAccountType.text === BBConstants.DOMESTIC)) {
                    formattedRecords.push(transaction);
                }
            });
            applicationManager.getNavigationManager().updateForm({
                "getExistingBeneficiariesSuccess": filterResponse,
            }, kony.application.getCurrentForm().id);
        } else {
            applicationManager.getNavigationManager().updateForm({
                "getExistingBeneficiariesSuccess": filterResponse,
            }, kony.application.getCurrentForm().id);
        }
    };

    BulkPaymentPresentationController.prototype.getExistingBeneficiariesFailure = function(batchMode,fromAccount, responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, kony.application.getCurrentForm().id);
    };

    BulkPaymentPresentationController.prototype.showProgressBar = function() {
        applicationManager.getNavigationManager().updateForm({
            isLoading: true
        });
    }

    BulkPaymentPresentationController.prototype.approvePayment = function(params, btnText) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().approvePayment(params, this.approvePaymentSuccess.bind(this, btnText), this.approvePaymentFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.approvePaymentSuccess = function(btnText, response) {
        response.btnText = btnText;
        applicationManager.getNavigationManager().updateForm({
            "onApproveSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.approvePaymentFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.rejectPayment = function(params, btnText) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().rejectPayment(params, this.rejectPaymentSuccess.bind(this, btnText), this.rejectPaymentFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.rejectPaymentSuccess = function(btnText, response) {
        response.btnText = btnText;
        applicationManager.getNavigationManager().updateForm({
            "onRejectSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.rejectPaymentFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
           "bulkPaymentRejectErrorMessage": responseError,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getRequestsHistory = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().getRequestsHistory(params, this.getRequestsHistorySuccess.bind(this), this.getRequestsHistoryFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getRequestsHistorySuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "onRequestsHistorySuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getRequestsHistoryFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.fetchBulkPaymentRecordDetailsById = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().fetchBulkPaymentRecordDetailsById(params, this.fetchBulkPaymentRecordDetailsByIdSuccess.bind(this), this.fetchBulkPaymentRecordDetailsByIdFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.fetchBulkPaymentRecordDetailsByIdSuccess = function(response) {
       response.totalAmount = CommonUtilities.formatCurrencyWithCommas(response.totalAmount, false, response.currency);
        applicationManager.getNavigationManager().updateForm({
            "fetchBulkPaymentRecordDetailsByIdSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.fetchBulkPaymentRecordDetailsByIdFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.initiateBulkPaymentFileDownload = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().initiateDownloadBulkPaymentAck(params, this.initiateBulkPaymentFileDownloadSuccess.bind(this), this.initiateBulkPaymentFileDownloadFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.initiateBulkPaymentFileDownloadSuccess = function(response) {
        var scopeObj = this;
        var requestInputs = response.fileId;
        var downloadReportURL = applicationManager.getBulkManager().downloadBulkPaymentFileAck(requestInputs);
        var data = {
            "url": downloadReportURL
        };
        CommonUtilities.downloadFile(data);
        applicationManager.getNavigationManager().updateForm({
            "progressBar": false
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.initiateBulkPaymentFileDownloadFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.viewTemplates = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");
        applicationManager.getBulkManager().getTemplates(params, this.viewTemplatesSuccess.bind(this), this.viewTemplatesFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.viewTemplatesSuccess = function(response) {
        var formattedResponse = this.formatViewTemplatesData(response.bulkPaymentTemplates);
        applicationManager.getNavigationManager().updateForm({
            "viewTemplatesSuccess": formattedResponse,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.viewTemplatesFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError,
        }, "frmBulkPaymentsDashboard");
    };

    BulkPaymentPresentationController.prototype.formatViewTemplatesData = function(response) {
        if (!kony.sdk.isNullOrUndefined(response)) {
            var topSeparatordisable;
            var formatManager = applicationManager.getFormatUtilManager();
            if (response.length > 10) {
                topSeparatordisable = response.length - 2;
            } else {
                topSeparatordisable = response.length - 1;
            }
            response.forEach(function(transaction) {

                transaction.actionsValue = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.createBulkRequest");

                if (response.length === topSeparatordisable) {
                    transaction.topseparatorval = false;
                } else {
                    transaction.topseparatorval = true;
                }           
                transaction.fromAccountMasked = CommonUtilities.getMaskedAccName(transaction.fromAccount)[0];
                var formatManager = applicationManager.getFormatUtilManager();
                var currencySymbol = formatManager.getCurrencySymbol(transaction.currency);
                transaction.lblVTCreatedBy = {
                    "text": kony.sdk.isNullOrUndefined(transaction.initiatedBy) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.initiatedBy,
                };
                transaction.lblVTTemplateName = {
                    "text": kony.sdk.isNullOrUndefined(transaction.templateName) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.templateName,
                };
                transaction.lblVTCreatedOn = {              
                   "text": kony.sdk.isNullOrUndefined(transaction.createdts) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.createdts, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")),
                };
                transaction.lblDefaultFromAccountValue = {
                    "text": kony.sdk.isNullOrUndefined(transaction.fromAccountMasked) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.fromAccountMasked,
                };
                transaction.lblTotalBeneficiariesValue = {
                    "text": kony.sdk.isNullOrUndefined(transaction.totalBeneficiaries) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.totalBeneficiaries,
                };
                transaction.lblVTTotalAmountValue = {
                    "text": kony.sdk.isNullOrUndefined(transaction.totalAmount) ? kony.i18n.getLocalizedString("i18n.common.NA") : formatManager.formatAmount(transaction.totalAmount),
                };
                transaction.lblProcessingModeValue = {
                    "text": kony.sdk.isNullOrUndefined(transaction.processingMode) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.processingMode,
                };
                transaction.lblVTActions = {
                    "text": kony.sdk.isNullOrUndefined(transaction.actionsValue) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.actionsValue,
                };
                transaction.flxTopSeperator = {
                    "isVisible": transaction.topseparatorval,
                };
                transaction.lblDefaultFromAccountIcon = {
                    "isVisible": kony.sdk.isNullOrUndefined(transaction.fromAccount) ? false : true,
                };
                transaction.lblDefaultCurrencyValue = {
                    "text": kony.sdk.isNullOrUndefined(currencySymbol) ? kony.i18n.getLocalizedString("i18n.common.NA") : currencySymbol,
                };
                transaction.flxDelete = {
                    "isVisible": (applicationManager.getConfigurationManager().checkAccountAction(transaction.fromAccount, "BULK_PAYMENT_TEMPLATE_DELETE"))
                };
                transaction.flxEdit = {
                    "isVisible": (applicationManager.getConfigurationManager().checkAccountAction(transaction.fromAccount, "BULK_PAYMENT_TEMPLATE_VIEW"))
                };
                transaction.templateName = kony.sdk.isNullOrUndefined(transaction.templateName) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.templateName;
                transaction.initiatedBy = kony.sdk.isNullOrUndefined(transaction.initiatedBy) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.initiatedBy;
                transaction.createdon = kony.sdk.isNullOrUndefined(transaction.createdts) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.createdts, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
                transaction.totalAmount = kony.sdk.isNullOrUndefined(transaction.totalAmount) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.formatCurrencyWithCommas(transaction.totalAmount, false, transaction.currency);
                transaction.fromAccount = kony.sdk.isNullOrUndefined(transaction.fromAccount) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.fromAccount;
                transaction.totalBeneficiaries = kony.sdk.isNullOrUndefined(transaction.totalBeneficiaries) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.totalBeneficiaries;
                transaction.templateId = kony.sdk.isNullOrUndefined(transaction.templateId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.templateId;
                transaction.processingMode = kony.sdk.isNullOrUndefined(transaction.processingMode) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.processingMode;
                transaction.currency = kony.sdk.isNullOrUndefined(transaction.currency) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.currency;
                transaction.paymentDate = kony.sdk.isNullOrUndefined(transaction.paymentDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.paymentDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
                transaction.scheduledDate = kony.sdk.isNullOrUndefined(transaction.scheduledDate) ? kony.i18n.getLocalizedString("i18n.common.NA") : CommonUtilities.getFrontendDateStringInUTC(transaction.scheduledDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
                transaction.fileId = kony.sdk.isNullOrUndefined(transaction.fileId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.fileId;
                transaction.confirmationNumber = kony.sdk.isNullOrUndefined(transaction.confirmationNumber) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.confirmationNumber;
                transaction.templateId = kony.sdk.isNullOrUndefined(transaction.templateId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.templateId;
                transaction.paymentId = kony.sdk.isNullOrUndefined(transaction.paymentId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.paymentId;
                transaction.description = kony.sdk.isNullOrUndefined(transaction.description) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.description;
                transaction.companyId = kony.sdk.isNullOrUndefined(transaction.companyId) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.companyId;
                transaction.totalTransactions = kony.sdk.isNullOrUndefined(transaction.totalTransactions) ? kony.i18n.getLocalizedString("i18n.common.NA") : transaction.totalTransactions;

            });
        }
        return (response);
    };

    BulkPaymentPresentationController.prototype.getPOsforTemplate = function(params) {

        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");
        applicationManager.getBulkManager().getPOsforTemplate(params, this.getPOsforTemplateSuccess.bind(this), this.getPOsforTemplateFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getPOsforTemplateSuccess = function(response) {

        var formattedResponse = this.formatPOsforTemplate(response.paymentOrders);
        applicationManager.getNavigationManager().updateForm({
            "getPaymentOrdersSuccess": formattedResponse,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.getPOsforTemplateFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.dbpErrMsg,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.formatPOsforTemplate = function(response) {
        if (!kony.sdk.isNullOrUndefined(response)) {
            response.forEach(function(record) {

                record.paymentOrderId = kony.sdk.isNullOrUndefined(record.paymentOrderId) ? "-" : record.paymentOrderId;
                record.templateId = kony.sdk.isNullOrUndefined(record.templateId) ? "-" : record.templateId;
                record.fromAccount = !kony.sdk.isNullOrUndefined(record.accountNumber) && record.accountNumber !== "null"? record.accountNumber : kony.sdk.isNullOrUndefined(record.beneficiaryIBAN) ? "-" : record.beneficiaryIBAN;
                record.accountNumber = !kony.sdk.isNullOrUndefined(record.accountNumber) && record.accountNumber !== "null" ? record.accountNumber : kony.sdk.isNullOrUndefined(record.beneficiaryIBAN) ? "-" : record.beneficiaryIBAN;  
                record.bankName = kony.sdk.isNullOrUndefined(record.bankName) ? "-" : record.bankName;
                record.swift = kony.sdk.isNullOrUndefined(record.swift) ? "-" : record.swift;
                record.currency = kony.sdk.isNullOrUndefined(record.currency) ? "-" : record.currency === "null" ? "-" : record.currency;
                record.amount = kony.sdk.isNullOrUndefined(record.amount) ? "-" : record.amount;
                record.feesPaidBy = kony.sdk.isNullOrUndefined(record.feesPaidBy) ? "-" : record.feesPaidBy === "null" ? "-" : record.feesPaidBy;
                record.paymentReference = kony.sdk.isNullOrUndefined(record.paymentReference) ? "" : record.paymentReference;
                record.beneficiaryName = kony.sdk.isNullOrUndefined(record.beneficiaryName) ? "-" : record.beneficiaryName;
                record.nickName = kony.sdk.isNullOrUndefined(record.beneficiaryNickName) ? "-" : record.beneficiaryNickName;
                record.beneficiaryAddress = kony.sdk.isNullOrUndefined(record.beneficiaryAddress) ? "-" : record.beneficiaryAddress;
                record.paymentMethod = kony.sdk.isNullOrUndefined(record.paymentMethod) ? "-" : record.paymentMethod;
                record.status = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                record.beneficiaryId = kony.sdk.isNullOrUndefined(record.paymentOrderId) ? "-" : record.paymentOrderId;
                record.accType = kony.sdk.isNullOrUndefined(record.accType) ? "-" : record.accType;
                record.beneficiaryType = kony.sdk.isNullOrUndefined(record.beneficiaryType) ? "-" : record.beneficiaryType;
                record.addToExistingFlag = kony.sdk.isNullOrUndefined(record.addToExistingFlag) ? "0" : record.addToExistingFlag;
                record.btnEdit = {
                    "isVisible": record.addToExistingFlag === "1" ? true : false,
                };
                record.flxActions = {
                    "isVisible": record.addToExistingFlag === "1" ? true : false,
                };
            });
        }

        return (response);
    };

    BulkPaymentPresentationController.prototype.deleteBulkPaymentTemplate = function(templateId) {

        const requestParams = {
            "templateId": templateId
        }

        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsDashboard");

        applicationManager.getBulkManager().deleteBulkPaymentTemplate(requestParams,
            this.deleteBulkPaymentTemplateSuccess.bind(this),
            this.deleteBulkPaymentTemplateFailure.bind(this));
    }

    BulkPaymentPresentationController.prototype.deleteBulkPaymentTemplateSuccess = function(response) {

        applicationManager.getNavigationManager().updateForm({
            "deleteTemplateSuccess": response,
        }, "frmBulkPaymentsDashboard");

    }

    BulkPaymentPresentationController.prototype.deleteBulkPaymentTemplateFailure = function(errorMessage) {

        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errormessage": errorMessage
        }, "frmBulkPaymentsDashboard");

    }

    BulkPaymentPresentationController.prototype.createBulkRequest = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");
        applicationManager.getBulkManager().createBulkRequest(params, this.createBulkRequestSuccess.bind(this), this.createBulkRequestFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.createBulkRequestSuccess = function(response) {
        if (!kony.sdk.isNullOrUndefined(response.dbpErrMsg) && "" !== response.dbpErrMsg) {
            applicationManager.getNavigationManager().updateForm({
                "serverError": true,
                "errorMessage": response.dbpErrMsg,
            }, "frmBulkPaymentsTemplate");
        } else {
            applicationManager.getNavigationManager().updateForm({
                "createRequestSuccess": response,
            }, "frmBulkPaymentsTemplate");
        }
    };

    BulkPaymentPresentationController.prototype.createBulkRequestFailure = function(responseError) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": responseError.errorMessage,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryName = function(accountNumber) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");

        var params = {
            "accountNumber": accountNumber
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.getBeneficiaryName(params, this.getBeneficiaryNameSuccess.bind(this), this.getBeneficiaryNameFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryNameSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBeneficiaryNameSuccess": response.bankDetails[0],
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryNameFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBeneficiaryNameFailure": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getBankDetailsFromBIC = function(swiftCode) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");

        var params = {
            "swiftCode": swiftCode
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.getBankDetailsFromBIC(params, this.getBankDetailsFromBICSuccess.bind(this), this.getBankDetailsFromBICFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getBankDetailsFromBICSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBankDetailsFromBICSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getBankDetailsFromBICFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBankDetailsFromBICFailure": response.errorMessage,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.validateIBANandGetBankDetails = function(iban) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");

        var params = {
            "iban": iban,
            "countryCode":iban.slice(0,2)
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.searchSwiftorBICCode(params, this.validateIBANandGetBankDetailsSuccess.bind(this), this.validateIBANandGetBankDetailsFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.validateIBANandGetBankDetailsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "validateIBANandGetBankDetailsSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.validateIBANandGetBankDetailsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "validateIBANandGetBankDetailsFailure": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getAllBICsAndBankDetails = function() {

        var params = {};
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsReview");

        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.getAllBICsAndBankDetails(params, this.getAllBICsAndBankDetailsSuccess.bind(this), this.getAllBICsAndBankDetailsFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getAllBICsAndBankDetailsSuccess = function(response) {

        response.bankDetails.forEach(function(transaction) {
            transaction.select = kony.i18n.getLocalizedString("i18n.ACH.Select");
        });
        applicationManager.getNavigationManager().updateForm({
            "getAllBICsAndBankDetailsSuccess": response,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.getAllBICsAndBankDetailsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": response.errorMessage,
        }, "frmBulkPaymentsReview");
    };

    BulkPaymentPresentationController.prototype.editBulkPaymentTemplate = function(params) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");
        applicationManager.getBulkManager().editBulkPaymentTemplate(params, this.editTemplateSuccess.bind(this), this.editTemplateFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.editTemplateSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "editTemplateSuccess": true,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.editTemplateFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "serverError": true,
            "errorMessage": response.errorMessage,
        }, "frmBulkPaymentsTemplate")
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryNameForCreateTemplate = function(accountNumber) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");

        var params = {
            "accountNumber": accountNumber
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.getPayeeName(params, this.getBeneficiaryNameSuccessForCreateTemplate.bind(this), this.getBeneficiaryNameFailureForCreateTemplate.bind(this));
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryNameSuccessForCreateTemplate = function(response) {
		let formName = kony.application.getCurrentForm().id;
        applicationManager.getNavigationManager().updateForm({
            "getBeneficiaryNameSuccess": response,
        }, formName);
    };

    BulkPaymentPresentationController.prototype.getBeneficiaryNameFailureForCreateTemplate = function(response) {
		let formName = kony.application.getCurrentForm().id;
        applicationManager.getNavigationManager().updateForm({
            "getBeneficiaryNameFailure": response,
        }, formName);
    };
	
	BulkPaymentPresentationController.prototype.validateIBANforTemplates = function(iban) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");

        var params = {
            "iban": iban,
           "countryCode": iban.slice(0,2)
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.searchSwiftorBICCode(params, this.validateIBANForTemplatesGetBankDetailsSuccess.bind(this), this.validateIBANForTemplatesBankDetailsFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.validateIBANForTemplatesGetBankDetailsSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "validateIBANandGetBankDetailsSuccess": response,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.validateIBANForTemplatesBankDetailsFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "validateIBANandGetBankDetailsFailure": response,
        }, "frmBulkPaymentsTemplate");
    };
	
	BulkPaymentPresentationController.prototype.getBankDetailsFromBICTemplates = function(swiftCode) {
        applicationManager.getNavigationManager().updateForm({
            "progressBar": true
        }, "frmBulkPaymentsTemplate");

        var params = {
            "swiftCode": swiftCode
        };
        var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.getBankDetailsFromBIC(params, this.getBankDetailsFromBICTemplatesSuccess.bind(this), this.getBankDetailsFromBICTemplatesFailure.bind(this));
    };

    BulkPaymentPresentationController.prototype.getBankDetailsFromBICTemplatesSuccess = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBankDetailsFromBICTemplatesSuccess": response,
        }, "frmBulkPaymentsTemplate");
    };

    BulkPaymentPresentationController.prototype.getBankDetailsFromBICTemplatesFailure = function(response) {
        applicationManager.getNavigationManager().updateForm({
            "getBankDetailsFromBICTemplatesFailure": response.errorMessage,
        }, "frmBulkPaymentsTemplate");
    };
	
	BulkPaymentPresentationController.prototype.getBankDate = function () {
		var recipientManager = applicationManager.getRecipientsManager();
        recipientManager.fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
    };
   
    BulkPaymentPresentationController.prototype.getBankDateSuccess = function (response) {       
        applicationManager.getNavigationManager().updateForm({
            "getBankDateSuccess": response.date[0],
        }, "frmBulkPaymentsTemplate");		
    };

    BulkPaymentPresentationController.prototype.getBankDateFailure = function (response) {
        applicationManager.getNavigationManager().updateForm({
            "getBankDateFailure": response.errorMessage,
        }, "frmBulkPaymentsTemplate");	
    };
    BulkPaymentPresentationController.prototype.noServiceNavigateApproval = function(formName, id, resData, frm) {
            // Null check for empty parameter
            if (!kony.sdk.isNullOrUndefined(formName)) {
                if (!kony.sdk.isNullOrUndefined(id)) {
                    applicationManager.getNavigationManager().navigateTo(formName);
                    applicationManager.getNavigationManager().updateForm({
                        "key": id,
                        "responseData": resData
                    }, frm);
                }
            }
        };

    return BulkPaymentPresentationController;
});