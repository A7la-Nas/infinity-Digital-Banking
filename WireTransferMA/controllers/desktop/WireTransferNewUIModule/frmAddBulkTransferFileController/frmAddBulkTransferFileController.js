define(['FormControllerUtility', 'IBANUtils', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, IBANUtils, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    return {
        openfiledata: null,
        isFileSelected: 0,
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.onDeviceBack = function() {};
        },

        preShow: function() {
            this.AddNewFile();
            this.onInfoClose();
            this.setInitialActions();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            //  this.campaignSuccess();
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.bulkwire.uploadbulkfile");
            this.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.bulkwire.UploadCancelMsg");
            this.view.customheadernew.activateMenu("Wire Transfer", "Add Bulk Transfer File");
        },

        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
            this.view.forceLayout();
        },

        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.btnOpenFile.onClick = this.openUplaodfile;
            this.view.filesFormActionsNew.btnNext.onClick = this.Uploadfile;
            this.view.filesFormActionsNew.btnNext.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.browse");
            this.view.filesFormActionsNew.btnCancel.onClick = this.CancelUplaod;
            this.view.filesFormActionsNew.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.filesUploadAckOptions.btnCancel.onClick = this.AddNewFile;
            this.view.filesUploadAckOptions.btnNext.onClick = this.MakeTransfer;
            this.view.CustomPopup.flxCross.onClick = this.HidePopup;
            this.view.CustomPopup.btnNo.onClick = this.HidePopup;
            this.view.CustomPopup.btnYes.onClick = this.ViewBulkFiles;
            this.view.flxDownloadSample.onClick = this.downloadSampleBulkFile.bind(this);
            this.view.filesUploadAckOptions.btnOption.onClick = this.ViewBulkFiles;
            this.view.flxInfo.onClick = this.onInfoClick;
          	this.view.imgPlusSign.onTouchEnd = this.Uploadfile;
            this.view.ProfileInfo.flxCross.onClick = this.onInfoClose;
        },

        Uploadfile: function() {
            var config = {
                selectMultipleFiles: false,
                filter: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
            };
            this.isFileSelected = 0;
            kony.io.FileSystem.browse(config, this.selectedFileCallback.bind(this));
        },
        selectedFileCallback: function(events, files) {
            var scopeObj = this;
            scopeObj.isFileSelected++;
            //Temporary workaround for platform issue (ticket #149759)
            if (scopeObj.isFileSelected == 1) {
                if (files[0].file.type === "application/vnd.ms-excel" || files[0].file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || files[0].file.type === "text/csv") {
                    FormControllerUtility.showProgressBar(self.view);
                    this.view.lblFIleName.text = CommonUtilities.truncateStringWithGivenLength(files[0].name, 20);
                    this.view.lblFIleName.toolTip = files[0].name;
                    var requestObj = {};
                    requestObj.bulkWireFileName = files[0].name;
                    this.getBase64(files[0].file, function(base64String) {
                        base64String = base64String.replace(/data:;base64,/, "");
                        requestObj.bulkWireFileContents = base64String.replace(/^data:(.*,)?/, '');
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.uploadBulkWireFile(requestObj);
                    });
                } else {
                    this.view.flxErrorFlow.setVisibility(true);
                    // CommonUtilities.setText(this.view.settings.lblImageError, kony.i18n.getLocalizedString("i18n.profile.notAValidImage") , CommonUtilities.getaccessibilityConfig());
                    this.view.forceLayout();
                }
            }
        },

        getBase64: function(file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function() {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },

        downloadSampleBulkFile: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.downloadSampleBulkWireFile();
        },

        ViewBulkFiles: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxPopup.setVisibility(false);
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var params = {
                "formName": "frmBulkTransferFiles"
            };
            wireTransferModule.presentationController.showBulkwirefiles(params);
        },

        showUploadBWAck: function() {
            this.view.flxUploadFile.setVisibility(false);
            this.view.flxFilesBulkWireFileActions.setVisibility(false);
            this.view.flxErrorFlow.setVisibility(false);
            this.view.lblUploadFilesHeader.text = "Acknowledgment";
            this.view.lblAddAccountHeading.text = "Wire Transfer - Upload Document";
            if (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES, OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE]) ||
                this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE])) {
                this.view.filesUploadAckOptions.btnNext.setVisibility(true);
            } else {
                this.view.filesUploadAckOptions.btnNext.setVisibility(false);
            }
            this.view.filesUploadAckOptions.btnCancel.setVisibility(this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPLOAD_BULK_FILES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPLOAD_BULK_FILES]));
            this.view.filesUploadAckOptions.btnOption.setVisibility(this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
            ]));
            this.view.btnOpenFile.setVisibility(this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES]));
            this.view.flxAckContainer.setVisibility(true);
            this.view.flxFilesUplaodAckOptions.setVisibility(true);
            this.view.forceLayout();
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        UploadFailed: function(error) {
            this.view.flxErrorFlow.setVisibility(true);
            this.view.lblUploadFailMessage.text = error;
            this.view.forceLayout();
        },
        CancelUplaod: function() {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
            this.view.flxErrorFlow.setVisibility(false);
            this.view.forceLayout();
        },
        HidePopup: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxPopup.setVisibility(false);
            this.view.forceLayout();
        },
        openUplaodfile: function() {
            var response = this.openfiledata;
            var params = {
                "bulkWireFileID": response.bulkWireFileID,
                "bulkWireFileName": response.bulkWireFileName,
                "addedOn": CommonUtilities.getServerDateObject().toLocaleDateString('en-US'),
                "addedBy": applicationManager.getUserPreferencesManager().getUserObj().userfirstname + " " + applicationManager.getUserPreferencesManager().getUserObj().userlastname
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireLineItems(params);
        },
        MakeTransfer: function() {
            var response = this.openfiledata;

            var params = {
                "bulkWireFileID": response.bulkWireFileID,
                "bulkWireFileName": response.bulkWireFileName
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireConfirmTransfer(params);
        },
        openfile: function(data) {
            this.openfiledata = data;
            return data;
        },
        AddNewFile: function() {
            this.view.lblUploadFilesHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument");
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.transfers.wireTransfer");
            this.view.flxUploadFile.setVisibility(true);
            this.view.flxFilesBulkWireFileActions.setVisibility(true);
            this.view.flxAckContainer.setVisibility(false);
            this.view.flxFilesUplaodAckOptions.setVisibility(false);
            this.view.flxErrorFlow.setVisibility(false);
            this.view.forceLayout();
        },
        onInfoClick: function() {
            this.view.ProfileInfo.isVisible = true;
            if(kony.application.getCurrentBreakpoint() === 1024) {
              this.view.ProfileInfo.left = "62%";
              this.view.ProfileInfo.top = "258dp";
            } else {
              this.view.ProfileInfo.left = "44%";
              this.view.ProfileInfo.top = "250dp";
            }
            this.view.forceLayout();
        },
        onInfoClose: function() {
            this.view.ProfileInfo.isVisible = false;
            this.view.forceLayout();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
        }

    };
});