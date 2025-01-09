define(['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    return {
        dataObj: {},
        documentTitle: {},
        parsedAddress: {},
        preShow: function() {
          var navMan = applicationManager.getNavigationManager();
            this.dataObj = navMan.getCustomInfo("frmRepaymentDayRequest");
            var scopeObj = this;
            if (this.dataObj.subType == "ChangeRepaymentDate") {
                this.setDataForDay();
            } else if (this.dataObj.subType == "ChangeRepaymentAccount") {
                this.setDataForAccount();
            } else if (this.dataObj.subType == "UpdatePrimaryAddress") {
                this.setDataForAddress();
            }
            this.setDocumentViewSegment("");
            //this.view.formTemplate12.flxPageFooter.flxBackButton.btnBack.onClick = this.backToServiceRequests;
            this.view.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
        },
        postShow: function() {
          scope=this;
             setTimeout(function() {
                scope.printCall();
            }, "17ms");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
      
        setDataForDay: function() {
            this.view.lblRequestTypeVal.text = this.dataObj.subType_description;
            this.view.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.facilityName + ' - ' + this.dataObj.accountName.slice(-4);
            this.view.lblNoOfLoansVal.text = this.dataObj.serviceReqRequestIn.numOfLoans;
            this.view.lblOutstandingBalanceVal.text = CommonUtilities.formatCurrencyWithCommas(this.dataObj.serviceReqRequestIn.currentOutstandingBalanceAmount, false, this.dataObj.serviceReqRequestIn.currentOutstandingBalanceCurrency);
            this.view.lblMaturityDateVal.text = this.getFormattedDate(this.dataObj.serviceReqRequestIn.currentMaturityDate);
            this.view.lblStatusVal.text = this.dataObj.serviceReqStatus;
            this.view.lblCommentsVal.text = "";
            this.view.flxAccountDetails.isVisible = false;
            this.view.flxSegLoanDetails.isVisible = true;
            this.view.flxAddress.isVisible = false;
            this.view.segLoanDetails.widgetDataMap = {
                "flxRepaymentDay": "flxRepaymentDay",
                "flxHead": "flxHead",
                "flxContent": "flxContent",
                "lblCurrentValue": "lblCurrentValue",
                "lblNewValue": "lblNewValue",
                "lblRepaymentDay": "lblRepaymentDay",
                "lblRepaymentDayCV": "lblRepaymentDayCV",
                "lblRepaymentDayNV": "lblRepaymentDayNV",
                "lblPaymentFrequency": "lblPaymentFrequency",
                "lblPaymentFrequencyCV": "lblPaymentFrequencyCV",
                "lblPaymentFrequencyNV": "lblPaymentFrequencyNV",
                "lblNextInstallmentDue": "lblNextInstallmentDue",
                "lblNextInstallmentDueCV": "lblNextInstallmentDueCV",
                "lblNextInstallmentDueNV": "lblNextInstallmentDueNV",
                "lblTransactionHeader": "lblTransactionHeader",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "imgDropDown": "imgDropDown"
            };
            var data = [];
            scopeObj = this;
            if (!(this.dataObj.serviceReqRequestIn.loansDetails == undefined)) plans = JSON.parse(this.dataObj.serviceReqRequestIn.loansDetails.replaceAll(/'/g, '\"'));
            else plans = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            plans.forEach(function(plan, i) {
                var dataobject = [];
                dataobject[0] = {
                    imgDropDown: {
                        isVisible: false
                    },
                    lblTransactionHeader: {
                        text: plan.loanName + '-' + plan.loanAccountNumber.substr(-4),
                        left: "30dp"
                    }
                };
                dataobject[1] = [{
                    template: "flxRepaymentDay",
                    lblRepaymentDayCV: plan.requestData[0].currentValue,
                    lblRepaymentDayNV: plan.requestData[0].newValue,
                    lblPaymentFrequencyCV: plan.requestData[2].currentValue,
                    lblPaymentFrequencyNV: plan.requestData[2].newValue,
                    lblNextInstallmentDueCV: plan.requestData[1].currentValue,
                    lblNextInstallmentDueNV: plan.requestData[1].newValue
                }]
                data.push(dataobject);
            })
            //this.view.segLoanDetails.setData(data);
            setTimeout(function() {
                scopeObj.view.segLoanDetails.setData(data);
            }, "17ms");
            this.setWidgetDataForAccountAndDay();
            this.setDocumentViewSegment("flxFileDownload");
            kony.application.dismissLoadingScreen();
        },
        setDataForAccount: function() {
            this.view.lblRequestTypeVal.text = this.dataObj.subType_description;
            this.view.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.facilityName + ' - ' + this.dataObj.serviceReqRequestIn.loanAccountNumber.slice(-4);
            this.view.lblNoOfLoansVal.text = this.dataObj.serviceReqRequestIn.loanName + ' - ' + this.dataObj.serviceReqRequestIn.loanAccountNumber.slice(-4);
            this.view.lblNoOfLoans.text = "Loan Name";
            this.view.flxSegLoanDetails.isVisible = false;
            this.view.lblOutstandingBalanceVal.isVisible = false;
            this.view.lblMaturityDateVal.isVisible = false;
            this.view.lblStatusVal.isVisible = false;
            this.view.lblCommentsVal.isVisible = false;
            this.view.lblOutstandingBalance.isVisible = false;
            this.view.lblMaturityDate.isVisible = false;
            this.view.lblStatus.isVisible = false;
            this.view.lblComments.isVisible = false;
            this.view.flxAddress.isVisible = false;
            this.view.flxAccountDetails.isVisible = true;
            this.view.lblLoanDetails.text = "Loan Details";


            this.view.flxFacilityContent.height = "180dp";
            temp = this.view;
            details = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            temp.lblHolderNameCV.text = details[0].currentValue;
            temp.lblHolderNameNV.text = details[0].newValue;
            temp.lblAccountNumberCV.text = details[1].currentValue;
            temp.lblAccountNumberNV.text = details[1].newValue;
            temp.lblBankNameCV.text = details[3].currentValue;
            temp.lblBankNameNV.text = details[3].newValue;
            this.setWidgetDataForAccountAndDay();
            this.setDocumentViewSegment("flxFileDownload");
        },
        /***
		      Function used to set data to Form based on UpdatePrimaryAddress subtype
      */
        setDataForAddress: function() {
            this.hideRepaymentDetails();
            this.view.lblRequestTypeVal.text = "Change of Address";
            this.view.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.lblFacilityName.text = "Status:";
            this.view.lblFacilityNameVal.text = this.dataObj.serviceReqStatus;
            this.view.lblNoOfLoans.text = "Comments:";
            this.view.lblNoOfLoansVal.text = "";
            this.view.flxFacilityContent.height = "180dp";
            this.view.lblLoanDetails.text = "Address Details";
            this.view.flxAddress.isVisible = true;
            this.view.lblExistingAddressVal1.text = this.existingAddress1();
            this.view.lblExistingAddressVal2.text = this.existingAddress2();
            this.view.lblNewAddressVal1.text = this.newAddress1();
            this.view.lblNewAddressVal2.text = this.newAddress2();
            this.view.flxSupportingDocsTitle.isVisible = true;
            this.setWidgetDataMapForAddress();
			scope = this;
            setTimeout(function() {
                scope.setDocumentViewSegment("flxChangeOfAddress");
            }, "17ms");
			this.view.imgInfoIcon.src = "info_grey.png";
            //this.setDocumentViewSegment("flxChangeOfAddress");
            this.view.lblKonyBank.isVisible = false;
            this.view.lblMyCheckingAccount.isVisible = false;
        },
        setDocumentViewSegment: function(template) {
            var documents = this.formatSegmentData(template);
            scope = this;
            setTimeout(function() {
                scope.view.segSupportingDocs.setData(documents);
            }, "17ms");
            //this.view.segSupportingDocs.setData(documents);
        },
        formatSegmentData: function(template) {
            var data = JSON.parse(this.dataObj.serviceReqRequestIn.supportingDocumentData.replaceAll(/'/g, '\"'));
            for (var proofCount = 0; proofCount < data.length; proofCount++) {
                var count = proofCount + 1;
                data[proofCount].lblProof = "Proof " + count + ":";
                data[proofCount].template = template; //"flxChangeOfAddress";flxFileDownload
                data[proofCount]["flxMainWrapper"] = {
                    "width": "90%"
                };
                data[proofCount].imgDoc = {"src" : "pdf_image.png"};
                data[proofCount].imgDownload = {"src" : "download.png"};
            }
            return data;
        },
        setWidgetDataMapForAddress: function() {
            var widgetDataMap = {
                flxDownload: "flxDownload",
                flxFileDownloadMobile: "flxFileDownload",
                fileName: "documentName",
                lblDocName: "fileName",
                imgDownload: "imgDownload",
                lblDownload: "lblDownload",
                imgFileType: "imgFileType",
                lblDocumentType: "lblDocumentType",
                lblProof: "lblProof",
                lblProofName: "documentType",
                template: "template",
                imgDoc: "imgDoc"
            };
            this.view.segSupportingDocs.rowTemplate = "flxChangeOfAddress";
            this.view.segSupportingDocs.widgetDataMap = widgetDataMap;
        },
        setWidgetDataForAccountAndDay: function() {
            var widgetDataMap = {
                flxDownload: "flxDownload",
                flxFileDownloadMobile: "flxDownload",
                lblFileName: "documentName",
                imgDownload: "imgDownload",
                lblDownload: "lblDownload",
                imgFileType: "imgFileType",
                template: "template",
                flxMainWrapper: "flxMainWrapper"
            };
            this.view.segSupportingDocs.rowTemplate = "flxFileDownload"
            this.view.segSupportingDocs.widgetDataMap = widgetDataMap;
        },
        hideRepaymentDetails: function() {
            this.view.lblOutstandingBalance.isVisible = false;
            this.view.lblOutstandingBalanceVal.isVisible = false;
            this.view.lblMaturityDate.isVisible = false;
            this.view.lblMaturityDateVal.isVisible = false;
            this.view.lblStatus.isVisible = false;
            this.view.lblStatusVal.isVisible = false;
            this.view.lblComments.isVisible = false;
            this.view.lblCommentsVal.isVisible = false;
            this.view.flxSegLoanDetails.isVisible = false;
            this.view.flxAccountDetails.isVisible = false;
            this.view.flxCheckBoxMain.isVisible = false;
        },
        existingAddress1: function() {
            data = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            this.parsedAddress = data[0].requestData;
            var formattedAddress = this.parsedAddress[2].currentValue === "1" && this.parsedAddress[5].currentValue === "lbl1" ? " " : this.parsedAddress[0].currentValue !== undefined ? this.parsedAddress[0].currentValue + "," + this.parsedAddress[1].currentValue + "," : this.parsedAddress[1].currentValue + ",";
            return formattedAddress;
        },
        newAddress1: function() {
            var formattedAddress = this.parsedAddress[0].newValue !== undefined ? this.parsedAddress[0].newValue + "," + this.parsedAddress[1].newValue + "," : this.parsedAddress[1].newValue + ",";
            return formattedAddress;
        },
        existingAddress2: function() {
            var formattedAddress = this.parsedAddress[2].currentValue === "1" && this.parsedAddress[5].currentValue === "lbl1" ? " " : this.parsedAddress[6].currentValue + "," + this.parsedAddress[5].currentValue + "," + this.parsedAddress[2].currentValue + "," + this.parsedAddress[3].currentValue;
            return formattedAddress;
        },
        newAddress2: function() {
            var formattedAddress = this.parsedAddress[6].newValue + "," + this.parsedAddress[5].newValue + "," + this.parsedAddress[2].newValue + "," + this.parsedAddress[3].newValue;
            return formattedAddress;
        },
		printCall: function() {

            var scope = this;

            //kony.os.print();

            kony.os.print();

            //timeout is required to allow print popup to be visible.

            setTimeout(function() {

                 scope.loadAccountsDetails();

            }, "17ms");

        },
        /**
         * loadAccountsDetails : Method to accounts details
         * @member of {frmPrintTransactionController}
         * @param {}
         * @return {}
         * @throws {}
         */
        loadAccountsDetails: function() { 
          var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "ServiceRequestsUIModule/frmRepaymentDayRequest"
        });
        },
      
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        
    }
});