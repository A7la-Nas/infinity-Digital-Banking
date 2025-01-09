define("ArrangementsMA/AccountServicesUIModule/frmConfirmClosureController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        selectedReason: "",
        updateFormUI: function(uiData) {
            //alert('ok');
            if (uiData) {
                
            }
        },
        frmPreShow: function() {
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": false
                }
            }
            this.view.formAccountClosure.setContext(formTemplateContext);
            this.view.formAccountClosure.onError = this.onError;
            scopeObj= this;
            this.setupResponsiveUI();
            this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.onTouchStart = function(){
                scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDropDownMenu.isVisible = ! (scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDropDownMenu.isVisible);
                scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.lblDropdownIcon.text = scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.lblDropdownIcon.text=== "O" ? "P" : "O";
                if(kony.application.grtCurrentBreakpoint <= 640 || orientationHandler.isMobile){
                    scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.left = "10dp";
                    scopeObj.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.width = "90%";
                }
            }
        },
        setupResponsiveUI: function(){
            if(kony.application.grtCurrentBreakpoint <= 640 || orientationHandler.isMobile){
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.left = "10dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxClosingDropdown.flxDropdown.width = "90%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnContinue.left = "5%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnContinue.width = "90%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnContinue.top = "50dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnCancel.left = "5%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnCancel.top = "110dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.btnCancel.width = "90%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.left = "0dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.width = "100%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.height = "160dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.flxCheckBoxMain.top = "10dp";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.flxCheckBoxMain.width = "100%";
                this.view.formAccountClosure.flxContentTCCenter.flxAccountClosure.flxSelectRepaymentDay.flxDocumentComponent.flxButtons.flxCheckBoxMain.height = "20%";



            }
        },
        reset: function() {
            this.view.formChangeRepaymentDay.flxContentTCCenter.flxContentCPD.flxMainCPD.flxChangeRepaymentDay.flxSelectRepaymentDay.flxRepaymentDropdown.lblDropdown.text = "Select";
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        //         setDataForForm: function(account, details, plans) {
        //             this.view.formChangeRepaymentDay.flxContentTCCenter.flxContentCPD.flxMainCPD.flxChangeRepaymentDay.flxCont.lblValFacilityName.text = account.accountName + ' - ' + account.account_id.substr(-4);
        //             this.view.formChangeRepaymentDay.flxContentTCCenter.flxContentCPD.flxMainCPD.flxChangeRepaymentDay.flxCont.lblValCurrentOutstandingBal.text = CommonUtilities.formatCurrencyWithCommas(details.totalOutstandingBalance, false, details.currencyCode);
        //             this.view.formChangeRepaymentDay.flxContentTCCenter.flxContentCPD.flxMainCPD.flxChangeRepaymentDay.flxCont.lblValNoOfLoans.text = plans.length.toString();
        //             this.view.formChangeRepaymentDay.flxContentTCCenter.flxContentCPD.flxMainCPD.flxChangeRepaymentDay.flxCont.lblValCurrentMaturityDt.text = this.getFormattedDate(details.maturityDate);
        //             kony.application.dismissLoadingScreen();
        //         },
        setDataForUploadFileComp: function() {
            var isMandatory = true;
            var navMan = applicationManager.getNavigationManager();
            var files = navMan.getCustomInfo("modifyFileData");
            var filesData = [];
            if (kony.sdk.isNullOrUndefined(files)) {
                this.fileCompRef.removeAllDocs();
            }
            var config = {
                "selectMultipleFiles": false,
                "filter": ['image/jpeg', 'application/pdf']
            }
            var dataComp = {
                // "title": kony.i18n.getLocalizedString("kony.onboarding.documents.adddocuments"),
                // "description": kony.i18n.getLocalizedString("kony.onboarding.documents.lblUploadDescription.text"),
                // "uploadFilesDocCallback": this.uploadFilesCallback.bind(this, userActionName, false, key, coApplicantKey, isMandatory, applicantType,areMultipleUserActionsPresent),//userActions[key][i].ActionMetaData.Skippable),
                // "fileSelectedCallback": this.fileSelectedCallBack.bind(this, userActionName),
                // "downloadCallback": this.downloadCallback.bind(this),
                "removeFileCallback": this.removeFileCallback.bind(this, isMandatory),
                // "checkEvidenceCallback": this.checkEvidenceCallback.bind(this, isMandatory),
                // "deleteEvidenceCallback": this.deleteEvidenceCallback.bind(this, isMandatory),
                // "removeFileUpdateCallback": this.removeFileUpdateCallback.bind(this, isMandatory),
                // "removeFileDropdownCallback": this.removeFileDropdownCallback.bind(this, isMandatory),
                // "filesData": filesData,
                "config": config,
                // "fulfilmentId": fulfilmentId,
                // "hasUploadState": false
            };
            this.fileCompRef.setData(dataComp);
        },
        getFormattedFileDataForComp: function(files) {
            var fileData = [];
            files.forEach(function(file) {
                var fileObject = {
                    "fileObj": {
                        "documentName": file[1]
                    },
                    documentDescription: "file a added",
                    clientDocID: file[2]
                };
                fileData.push(fileObject);
            })
            return fileData;
        },
        removeFileCallback: function(isMandatory, file, uniqueId, removeSuccess, removeFailure, removeSuccessDocument, isUpload, componentParentData) {
            removeSuccess();
        },
        backToFacility: function() {
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showAccountDetails(account);
        },
        showConfirmation: function() {
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmChangeRepaymentDayCn", scopeObj.selectedDay);
            this.getFileData();
        },
        getFileData: function() {
            var browsedFiles = this.fileCompRef.getData();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("modifyFileData", browsedFiles);
            var attachments = [],
                fileData = {};
            var reader = new FileReader();

            function readFile(index) {
                if (index >= browsedFiles.length) {
                    navMan.setCustomInfo("frmChangeRepaymentDayCnFileData", attachments);
                    navMan.navigateTo({
                        "appName": "ArrangementsMA",
                        "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentDayCn"
                    });
                } else {
                    var newFile = browsedFiles[index];
                    fileData = {};
                    fileData.fileName = newFile[0].name;
                    fileData.fileType = newFile[0].file.type;
                    fileData.fileInfo = newFile[1];
                    fileData.fileClientId = newFile[2];
                    fileData.documentStatus = "Pending";
                    reader.onloadend = function(e) {
                        var base64String = e.target.result;
                        base64String = base64String.replace("data:;base64,", "");
                        base64String = base64String.replace("data:image/png;base64,", "");
                        base64String = base64String.replace("data:application/octet-stream;base64,", "");
                        base64String = base64String.replace("data:image/jpeg;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                        base64String = base64String.replace("data:application/vnd.ms-excel;base64,", "");
                        fileData.fileContents = base64String.replace("data:application/pdf;base64,", "");
                        attachments.push(fileData);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(newFile[0].file);
                }
            }
            readFile(0);
        },
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        onError: function() {
            FormControllerUtility.hideProgressBar(this.view);
        },
    }
});