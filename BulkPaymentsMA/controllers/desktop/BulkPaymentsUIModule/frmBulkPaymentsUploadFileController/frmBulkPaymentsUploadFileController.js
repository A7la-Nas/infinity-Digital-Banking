define(['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    return {

        /** Global Variables **/
        errormsg: "",


        /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
        updateFormUI: function(context) {
            if (context.progressBar === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (context.progressBar === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.key === BBConstants.BULKPAYMENTS_UPLOAD_FILE) {
                this.showUploadFileUI();
            } else if (context.serverError === true) {
                this.showServerErrorMessage(context.errorMessage);
            } else if (context.uploadFileSuccess) {
                this.onFileUpload(context.uploadFileSuccess);
                FormControllerUtility.hideProgressBar(this.view);
            }
            var breakpoint = kony.application.getCurrentBreakpoint();
            this.initializeResponsiveViews();
            this.view.forceLayout();
        },
        /**
         * onPreShow :  onPreshow event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        onPreShow: function() {
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMain', 'flxHeader', 'flxFooter', 'flxContentContainer', 'flxHeaderMain','flxFormContent']);
            this.setActions();
            var scopeObj = this;
            this.fileDetails = {};
            this.view.customheader.forceCloseHamburger();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
            this.view.customheader.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
            this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
            this.view.customheader.customhamburger.activateMenu(kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHeader"), kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadFileAndMakeBulkPayments"));
            this.view.forceLayout();
            this.initializeResponsiveViews();
            this.view.flxFormContent.doLayout = function(){
                this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - 150 + "px"; //150 is height of footer.
            }.bind(this);
        },
        /**
         * onPostShow :  postShow event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        onPostShow: function() {
            FormControllerUtility.hideProgressBar(this.view);
            this.resetUI();
            this.view.forceLayout();
            this.initializeResponsiveViews();
            this.view.flxFooter.isVisible = true;
        },
        /**
         * onInit : onInit event Function for the form
         * @member of {frmBulkPaymentsDashboardController}
         * @param {}
         * @return {}
         * @throws {}
         */
        onInit: function() {
            this.BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
        },

        responsiveViews: {},

        initializeResponsiveViews: function() {
            this.responsiveViews["flxBPVerifyDetails"] = this.isViewVisible("flxBPVerifyDetails");
            this.responsiveViews["flxBPUpload"] = this.isViewVisible("flxBPUpload");
            this.responsiveViews["flxErrorFlow"] = this.isViewVisible("flxErrorFlow");
            this.responsiveViews["flxBPUploadFormActions"] = this.isViewVisible("flxBPUploadFormActions");
            this.responsiveViews["flxCancelPopup"] = this.isViewVisible("flxCancelPopup");
            this.responsiveViews["lblUploadFailMessage"] = this.isViewVisible("lblUploadFailMessage");
            this.responsiveViews["flxBPUploadFileActions"] = this.isViewVisible("flxBPUploadFileActions");
            this.responsiveViews["flxBPFileUploadDetails"] = this.isViewVisible("flxBPFileUploadDetails");
            this.responsiveViews["flxAcknowledgement"] = this.isViewVisible("flxAcknowledgement");
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
            var views = Object.keys(this.responsiveViews);
            views.forEach(function(e) {
                scope.view[e].isVisible = scope.responsiveViews[e];
            });

            if (!kony.sdk.isNullOrUndefined(this.errormsg) && this.view.flxErrorFlow.isVisible) {
                this.showServerErrorMessage(this.errormsg);
            }
            scope.view.filesFormActionsNew.btnOption.isVisible = scope.responsiveViews["flxBPVerifyDetails"];
            this.initializeResponsiveViews();
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
          this.initializeResponsiveViews();
        },

        showUploadFileUI: function() {
            var scopeObj = this;
            this.view.lblDownload.skin = "bbSknLbl0e73d8SSP15Px";
            this.setActions();
            this.view.flxBPVerifyDetails.isVisible = false;
            this.view.flxBPUpload.isVisible = true;
            this.view.flxErrorFlow.isVisible = false;
            this.view.flxBPUploadFormActions.isVisible = true;
            this.view.flxCancelPopup.setVisibility(false);
            this.view.lblUploadFilesHeader.text = kony.i18n.getLocalizedString("konybb.i18n.selectPaymentFile");
            this.view.imgPlusSign.onTouchEnd = this.uploadfile.bind(this);
          	if ((this.checkUserPermission("BULK_PAYMENT_FILES_MULTI_UPLOAD_CSV") === false) && (this.checkUserPermission("BULK_PAYMENT_FILES_MULTI_UPLOAD_XML") === false)) {
                this.view.lbxBatchMode.masterData = [
                    ["SINGLE", "Single"]
                ];
                this.view.lbxBatchMode.setVisibility(false);
				this.view.txtBatchMode.setVisibility(true);
				this.view.txtBatchMode.text=kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeSingle");
                this.view.txtBatchMode.setEnabled(false);
                this.view.txtBatchMode.skin = "CopyslTextBox0b8f036a4265846";
				this.view.txtBatchMode.top = "10px";
            } else if ((this.checkUserPermission("BULK_PAYMENT_FILES_SINGLE_UPLOAD_CSV") === false) && (this.checkUserPermission("BULK_PAYMENT_FILES_SINGLE_UPLOAD_XML") === false)) {
				this.view.lbxBatchMode.setVisibility(false);
				this.view.txtBatchMode.setVisibility(true);
				this.view.txtBatchMode.text=kony.i18n.getLocalizedString("i18n.kony.BulkPayments.batchModeMulti");
                this.view.lbxBatchMode.masterData = [
                    ["MULTI", "Multiple"]
                ];
                this.view.txtBatchMode.setEnabled(false);
                this.view.txtBatchMode.skin = "CopyslTextBox0b8f036a4265846";
				this.view.txtBatchMode.top = "10px";
            } else {
				this.view.lbxBatchMode.setVisibility(true);
				this.view.txtBatchMode.setVisibility(false);
                this.view.lbxBatchMode.masterData = [
                    ["SINGLE", "Single"],
                    ["MULTI", "Multiple"]
                ];
                this.view.lbxBatchMode.setEnabled(true);
            }
            if ((this.checkUserPermission("BULK_PAYMENT_FILES_MULTI_UPLOAD_CSV") === true) || (this.checkUserPermission("BULK_PAYMENT_FILES_MULTI_UPLOAD_XML") === true)) {
                this.view.lbxBatchMode.selectedKey = "MULTI";
            }
            if ((this.checkUserPermission("BULK_PAYMENT_FILES_SINGLE_UPLOAD_CSV") === true) || (this.checkUserPermission("BULK_PAYMENT_FILES_SINGLE_UPLOAD_XML") === true)) {
                this.view.lbxBatchMode.selectedKey = "SINGLE";
            }
            this.view.lblDownload.onTouchEnd = function() {
                scopeObj.BulkPaymentsModule.presentationController.downloadSampleFile();
            };
            if (this.view.lbxBatchMode.selectedKeyValue[0] === BBConstants.SELECT) {
                CommonUtilities.disableButton(this.view.filesFormActionsNew.btnNext);
                this.view.imgPlusSign.setEnabled(false);
            }
            this.view.flxInfo1.onClick = this.OnFlxInfoClick.bind(this);
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        setActions: function() {
            // Setting up formActions
            FormControllerUtility.enableButton(this.view.filesFormActionsNew.btnNext);
            this.view.filesFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.wireTemplate.selectFile");
            this.view.filesFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.selectFile");
            this.view.filesFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesFormActionsNew.btnOption.isVisible = false;
            // 
            this.view.filesFormActionsNew.btnCancel.onClick = this.showCancelPopupNew.bind(this);
            this.view.filesFormActionsNew.btnNext.onClick = this.uploadfile.bind(this);
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        uploadfile: function() {
            var config = {
                selectMultipleFiles: false,
                filter: ["application/vnd.ms-excel", "text/xml", "text/csv", ".csv", ".xml","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","text/comma-separated-values"]
            };
            kony.io.FileSystem.browse(config, this.selectedFileCallback.bind(this));
        },

        selectedFileCallback: function(events, files) {
            FormControllerUtility.showProgressBar(this.view);
            if (files.length <= 0 || files.length > 1) {
                this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.fileUploadMsg"));
            } else {
                if (files[0].file.type !== "application/vnd.ms-excel" && files[0].file.type !== "text/csv" && files[0].file.type !== "text/xml"
                   && files[0].file.type !=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                   && files[0].file.type !== "text/comma-separated-values") {
                    this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.invalidFileTypeMsg"));
                } else if (files[0].file.size > BBConstants.MAX_BULKPAYMENTS_FILE_SIZE) {
                    this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.uploadFileError"));
                } else {
                    this.showVerifyFileDetails(files[0]);
                }
            }
            FormControllerUtility.hideProgressBar(self.view);
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        showVerifyFileDetails: function(fileData) {
            FormControllerUtility.showProgressBar(this.view);
            var scopeObj = this;
            var currDate = applicationManager.getFormatUtilManager().getFormatedDateString(CommonUtilities.getServerDateObject(), applicationManager.getFormatUtilManager().getApplicationDateFormat());
            scopeObj.fileDetails = {
                "fileName": fileData.file.name,
                "uploadDate": currDate,
                "fileSize": scopeObj.convertFileSizeKbToMb(fileData.file.size) + " MB",
                "systemGeneratedFileName": fileData.file.name,
                "description": "",
                "batchMode": this.view.lbxBatchMode.selectedKeyValue[0]
            };
            this.view.flxInformationText.isVisible = false;
            this.view.filesFormActionsNew.btnOption.setVisibility(true);
            this.view.flxBPUpload.setVisibility(false);
            this.view.flxBPVerifyDetails.setVisibility(true);
            this.view.flxErrorFlow.setVisibility(false);
            this.view.filesFormActionsNew.btnNext.skin = "sknBtnNormalSSPE2E9F015PX";
            FormControllerUtility.disableButton(this.view.filesFormActionsNew.btnNext);
         	this.view.imgXLSType.isVisible =true;
			this.view.imgXLSType.src="csv_image.png";
            // Setting up formActions
            this.view.txtFieldDescription.text = "";
            this.view.filesFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadFiles");
            this.view.filesFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.uploadFiles");
            this.view.filesFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("konybb.i18n.changeFile");
            this.view.filesFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("konybb.i18n.changeFile");
            this.view.filesFormActionsNew.btnOption.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesFormActionsNew.btnOption.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            //
            // Setting up the data
            this.getBase64(fileData.file, this.base64SuccessCallBack.bind(this));
            this.view.lblUploadFilesHeader.text = kony.i18n.getLocalizedString("konybb.i18n.checkUploadFileDetails");
            this.view.lblFileNameVerifyValue.text = scopeObj.fileDetails["fileName"];
            this.view.lblVerifyUploadDateValue.text = scopeObj.fileDetails["uploadDate"];
            this.view.lblFileSizeValue.text = scopeObj.fileDetails["fileSize"];
            this.view.lblVerifyProcessingModeValue.text = scopeObj.fileDetails["batchMode"];
            // On click events
            this.view.txtFieldDescription.onKeyUp = function() {
                scopeObj.validateVerifyDetailsFields(scopeObj.view.txtFieldDescription.text);
                scopeObj.fileDetails["description"] = scopeObj.view.txtFieldDescription.text;
            };

            this.view.filesFormActionsNew.btnNext.onClick = function() {
                FormControllerUtility.showProgressBar(scopeObj.view);
                scopeObj.BulkPaymentsModule.presentationController.uploadBulkPaymentFile(scopeObj.fileDetails);
            };

            this.view.filesFormActionsNew.btnOption.onClick = this.showCancelPopupNew.bind(this);
            this.view.filesFormActionsNew.btnCancel.onClick = this.uploadfile.bind(this);

            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        validateVerifyDetailsFields: function(fieldDescriptionValue) {
            if (fieldDescriptionValue.trim() !== "" && /^[A-Za-z0-9 ]+$/.test(fieldDescriptionValue)) {
                this.view.flxErrorFlow.setVisibility(false);
                FormControllerUtility.enableButton(this.view.filesFormActionsNew.btnNext);
            } else if (fieldDescriptionValue.trim() === "") {
                this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.emptyFileDescription"));
                FormControllerUtility.disableButton(this.view.filesFormActionsNew.btnNext);
            } else if (!(/[^[A-Za-z0-9 ]+$]/.test(fieldDescriptionValue))) {
                this.showServerErrorMessage(kony.i18n.getLocalizedString("konybb.i18n.BulkPayments.descriptionContainsSpecialChars"));
                FormControllerUtility.disableButton(this.view.filesFormActionsNew.btnNext);
            } else {
                FormControllerUtility.disableButton(this.view.filesFormActionsNew.btnNext);
            }
        },

        onFileUpload: function(response) {
            var scopeObj = this;
            this.view.flxBPUpload.isVisible = false;
            this.view.flxBPVerifyDetails.isVisible = false;
            this.view.flxBPUploadSeperator2.isVisible = false;
            this.view.flxBPUploadFormActions.isVisible = false;
            this.view.flxAcknowledgement.isVisible = true;
            this.view.flxBPFileUploadDetails.isVisible = true;
            this.view.flxBPUploadFileActions.isVisible = true;
            this.view.flxErrorFlow.setVisibility(false);
            this.view.imgXLSTypeAck.isVisible =true;
			this.view.imgXLSTypeAck.src="csv_image.png";

			this.view.flxBPUploadFileActions.btnUploadAck.text = kony.i18n.getLocalizedString("konybb.i18n.uploadNewFile");
            this.view.flxBPUploadFileActions.btnBackAck.text = kony.i18n.getLocalizedString("konybb.i18n.backToUploadedFiles");
            this.view.flxBPUploadFileActions.btnUploadAck.onClick = this.resetUI.bind(this);
            this.view.flxBPUploadFileActions.btnBackAck.onClick = function() {
                scopeObj.BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles"));
            };
            // Setting up data
            this.view.lblReferenceNumber.text = response.confirmationNumber;
            this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.BulkPayments.successfulUpload");
            this.view.lblUploadFilesHeader.text = kony.i18n.getLocalizedString("konybb.i18n.fileUploadDetails");
            this.view.lblFileNameValueAck.text = scopeObj.fileDetails["fileName"];
            this.view.lblUploadDateAckValue.text = scopeObj.fileDetails["uploadDate"];
            this.view.lblFileSizeValueAck.text = scopeObj.fileDetails["fileSize"];
            if (!kony.sdk.isNullOrUndefined(scopeObj.fileDetails["description"]) && "" !== scopeObj.fileDetails["description"]) {
                this.view.lblDescriptionValueAck.text = scopeObj.fileDetails["description"];
            } else {
                this.view.lblDescriptionValueAck.text = kony.i18n.getLocalizedString("i18n.common.NA");;
            }
            //
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        resetUI: function() {
            this.view.flxBPVerifyDetails.isVisible = false;
            this.view.flxBPUpload.isVisible = true;
            this.view.flxErrorFlow.isVisible = false;
            this.view.flxBPUploadFormActions.isVisible = true;
            this.view.filesFormActionsNew.btnOption.setVisibility(false);
            this.view.flxBPUploadFileActions.isVisible = false;
            this.view.flxBPFileUploadDetails.isVisible = false;
            this.view.flxAcknowledgement.isVisible = false;
            this.view.flxBPUploadSeperator2.isVisible = true;
            this.view.flxCancelPopup.setVisibility(false);
            this.view.lblUploadFilesHeader.text = kony.i18n.getLocalizedString("konybb.i18n.selectPaymentFile");
            // Setting up formActions
            this.view.filesFormActionsNew.btnNext.text = kony.i18n.getLocalizedString("i18n.wireTemplate.selectFile");
            this.view.filesFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.wireTemplate.selectFile");
            this.view.filesFormActionsNew.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesFormActionsNew.btnCancel.onClick = this.showCancelPopupNew.bind(this);
            this.view.filesFormActionsNew.btnNext.onClick = this.uploadfile.bind(this);
            this.view.flxInformationText.isVisible = false;
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        delegateNoServiceNavigate: function(formName) {
          var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "BulkPaymentsUIModule",
            "appName": "BulkPaymentsMA"
          });
            BulkPaymentsModule.presentationController.noServiceNavigate(formName);
        },

        convertFileSizeKbToMb: function(sizeInKb) {
            return ((sizeInKb / Math.pow(10, 6)).toFixed(4));
        },

        /**
         * Method to display server error.
         * @param {object} context - server error context object
         */
        showServerErrorMessage: function(errMsg) {
            if (errMsg !== "" && !kony.sdk.isNullOrUndefined(errMsg)) {
                this.view.lblUploadFailMessage.text = errMsg;
                this.errormsg = errMsg;
                this.view.flxErrorFlow.setVisibility(true);
                this.view.forceLayout();
            } else {
                this.view.flxErrorFlow.setVisibility(false);
            }

            FormControllerUtility.hideProgressBar(this.view);
            this.initializeResponsiveViews();
        },

        getBase64: function(file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function() {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },

        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.flxCancelPopup.setVisibility(true);
            this.view.flxCancelPopup.setFocus(true);
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = (kony.os.deviceInfo().screenHeight / 2) + "%";
            popupComponent.bottom = (kony.os.deviceInfo().screenHeight / 2) + "%";
            popupComponent.btnYes.onClick = function() {
                scopeObj.BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles"));
            };
            popupComponent.btnNo.onClick = function() {
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            popupComponent.flxCross.onClick = function() {
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        showCancelPopupNew: function(requestId, BackButtonText) {
            var scopeObj = this;
            var popupConfig = {};
            popupConfig.header = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.cancelUpload");
            popupConfig.msg = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.cancelAlert");
            popupConfig.commentsVisibility = false;
            popupConfig.commentsText = "";
            popupConfig.nextText = kony.i18n.getLocalizedString("i18n.common.yes");
            popupConfig.cancelText = kony.i18n.getLocalizedString("i18n.common.no");
            popupConfig.nextOnClick = function() {
              var BulkPaymentsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "BulkPaymentsUIModule",
                "appName": "BulkPaymentsMA"
              });
              BulkPaymentsModule.presentationController.noServiceNavigate("frmBulkPaymentsDashboard", kony.i18n.getLocalizedString("i18n.kony.BulkPayments.viewUploadedfiles"));
              scopeObj.hidePopup();
            };            
            this.showPopup(popupConfig);
        },



        showPopup: function(popupConfig) {
            this.view.flxPopupNew.lblHeading.text = popupConfig.header;
            this.view.flxPopupNew.lblPopupMessage.text = popupConfig.msg;
            this.view.flxPopupNew.btnYes.text = popupConfig.nextText;
            this.view.flxPopupNew.btnNo.text = popupConfig.cancelText;
            this.view.flxPopupNew.btnYes.onClick = popupConfig.nextOnClick;
            this.view.flxPopupNew.btnNo.onClick = this.hidePopup;
            this.view.flxPopupNew.flxCross.onClick = this.hidePopup;
            this.view.flxPopupConfirmation.isVisible = true;
            this.view.flxPopupConfirmation.setFocus(true);
            this.view.flxInformationText.isVisible = false;
            CommonUtilities.enableButton(this.view.flxPopupNew.btnYes);
            this.initializeResponsiveViews();
            this.view.forceLayout();
        },

        hidePopup: function() {
            this.view.flxPopupConfirmation.isVisible = false;
            this.view.forceLayout();
            this.initializeResponsiveViews();
        },

        base64SuccessCallBack: function(base64String) {
            var scopeObj = this;
            var content;
            base64String = base64String.replace(/data:;base64,/, "");
            content = base64String.replace(/data:application\/vnd.ms-excel;base64\,/, "");
            content = base64String.replace(/^data:(.*,)?/, '');
            content = content.replace(/data:text\/xml;base64\,/, "");
            content = content.replace(/data:text\/csv;base64\,/, "");
            scopeObj.fileDetails.content = content;
        },

        onBatchModeSelect: function() {
            if (this.view.lbxBatchMode.selectedKeyValue[0] === BBConstants.SELECT) {
                CommonUtilities.disableButton(this.view.filesFormActionsNew.btnNext);
                this.view.imgPlusSign.setEnabled(false);
            } else {
                CommonUtilities.enableButton(this.view.filesFormActionsNew.btnNext);
                this.view.imgPlusSign.setEnabled(true);
            }
        },
      
        checkUserPermission: function(permission) {
           return applicationManager.getConfigurationManager().checkUserPermission(permission);
        }

    }
});