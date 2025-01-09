define(['FormControllerUtility', 'IBANUtils', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, IBANUtils, CommonUtilities, ViewConstants, OLBConstants) {
     
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
            this.setActions();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.ProfileInfo.setVisibility(false);
            this.view.flxErrorFlow.setVisibility(false);
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblAddAccountHeading, kony.i18n.getLocalizedString("i18n.bulkWireTemplate.editRecipientsFileHeader"), accessibilityConfig);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },

        updateFormUI: function(uiData) {
            if (uiData.showLoadingIndicator) {
                if (uiData.showLoadingIndicator.status === true) {
                    FormControllerUtility.showProgressBar(this.view)
                } else {
                    FormControllerUtility.hideProgressBar(this.view)
                }
            }
            if (uiData.serverError) {
                this.showServerError(uiData.serverError);
            }
        },

        loadModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
        },

        setActions: function() {
            var self = this;
            this.view.lblDownload.onTouchStart = this.downloadSampleBulkFile;
            this.view.flxInfo.onClick = this.onInfoClick;
            this.view.ProfileInfo.flxCross.onClick = this.onInfoClose;
            this.view.filesFormActionsNew.btnCancel.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                self.loadModule().presentationController.navigateToEditRecipientsForm();
            }
            this.view.filesFormActionsNew.btnNext.onClick = this.uploadfile.bind(this);
            this.view.imgPlusSign.onTouchEnd = this.uploadfile;
        },

        getBase64: function(file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function() {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },

        uploadfile: function() {
            var config = {
                selectMultipleFiles: false,
                filter: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
            };
            this.isFileSelected = 0;
            kony.io.FileSystem.browse(config, this.selectedFileCallback.bind(this));
        },

        selectedFileCallback: function(events, files) {
            this.isFileSelected++;
            //Temporary workaround for platform issue (ticket #149759)
            if (this.isFileSelected == 1) {
                if (files[0].file.type === "application/vnd.ms-excel" || files[0].file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    FormControllerUtility.showProgressBar(self.view);
                    var requestObj = {};
                    requestObj.bulkWireFileName = files[0].name;
                    this.getBase64(files[0].file, function(base64String) {
                        base64String = base64String.replace(/data:;base64,/, "");
                        requestObj.bulkWireFileContents = base64String.replace(/^data:(.*,)?/, '');
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.uploadEditBulkWireTemplateFile(requestObj);
                    });
                } else {
                    this.view.flxErrorFlow.setVisibility(true);
                    this.view.forceLayout();
                }
            }
        },

        showServerError: function(data) {
            this.view.flxErrorFlow.setVisibility(true);
            this.view.lblUploadFailMessage.text = data;
            this.view.ProfileInfo.top = "330dp";
            FormControllerUtility.hideProgressBar();
            this.view.forceLayout();
        },

        onInfoClick: function() {
            this.view.ProfileInfo.setVisibility(true);
            this.view.forceLayout();
        },

        onInfoClose: function() {
            this.view.ProfileInfo.setVisibility(false);
            this.view.forceLayout();
        },

        downloadSampleBulkFile: function() {
            this.loadModule().presentationController.downloadSampleBulkWireFile(OLBConstants.FILE_CATEGORY.TEMPLATE);
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

    };
});