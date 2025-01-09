/**
 * Description of Module representing a Confirm form.
 * @module frmBulkPayeesController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmBulkPayeesController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            }
            if (!uiDataMap.isLoading) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (uiDataMap.manageBeneficiary) {
                this.bindManagePayeeData(uiDataMap.manageBeneficiary, uiDataMap.selectedBeneficiaries);
            }
			if (uiDataMap.backToBeneficiariesLandingPage) {
                this.bindSelectedPayeeData(uiDataMap.backToBeneficiariesLandingPage);
            }

        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.initActions();
        },
        preShow: function() {
            var scope = this;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
      this.view.customheadernew.btnSkipNav.onClick = function(){
        scope.view.lblTransactions.setActive(true);
      };
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.title="Pay Multiple Beneficiaries";
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");     
            this.view.txtSearch.text = "";     
            //this.view.btnBulkConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            //this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            //this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            this.view.lblEbillDetails.setVisibility(!CommonUtilities.isMirrorLayoutEnabled());
            this.view.lblEbillDetailsArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
            this.view.btnBypass.onClick=function(){
              scope.view.flxAddPayee.setActive(true);
            };
            
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
           var self = this;
           if (eventPayload.keyCode === 27) {
               if (self.view.flxLogout.isVisible === true) {
                  self.view.flxLogout.isVisible = false;
                  self.view.flxDialogs.isVisible = false;
                  self.view.customheadernew.btnHamburgerNew.setFocus(true);
               }
           }
       },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.flxAddPayeeMakeOneTimePayment.onClick = function() {
                this.presenter.showPayMultipleBeneficiaries({
                    "showAddBeneficiary": true
                })
            }.bind(this);
            //scopeObj.setSorting();
        },
        /**
         * sorting configurations to beneficiaries
         */
        setSorting: function() {
            var scopeObj = this;
            scopeObj.beneficiaryNameSortMap = [{
                    name: 'beneficiaryName',
                    imageFlx: scopeObj.view.imgSortBeneficiaryName,
                    clickContainer: scopeObj.view.flxBeneficiaryNameWrapper
                },
                {
                    name: 'bankName',
                    imageFlx: scopeObj.view.imgSortBankName,
                    clickContainer: scopeObj.view.flxBankName
                },
                {
                    name: 'accountNumber',
                    imageFlx: scopeObj.view.imgSortAccountNumber,
                    clickContainer: scopeObj.view.flxAccountNumber
                },
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.beneficiaryNameSortMap, scopeObj.onBeneficiaryNameClickHandler, scopeObj);
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            //this.view.btnAllPayees.setFocus(true);
            var scopeObj = this;
            var data = this.collectSelectedData();
            if (data.length > 0) {
                CommonUtilities.enableButton(this.view.btnBulkConfirm);
            } else {
                CommonUtilities.disableButton(this.view.btnBulkConfirm);
            }  
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
            scopeObj.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            
        },
        showAddBeneficiaryFlx: function() {
            this.view.flxRight.setVisibility(true);
        },
        hideAddBeneficiaryFlx: function() {
            this.view.flxRight.setVisibility(false);
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtSearch, this.view.flxtxtSearchandClearbtn]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
        },

        /**
         * Manage payee biller name sorting handler
         * @param {object} event
         * @param {object} data
         */
        onBeneficiaryNameClickHandler: function(event, data) {
            FormControllerUtility.showProgressBar(this.view);
            this.presenter.manageBeneficiaryPagination(data);
        },
        /**
         * method used to enable or disable the clear button.
         * @param {object} event event
         */
        onTxtSearchKeyUp: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxSearchBeneficiaries.forceLayout();
        },
        /**
         * method to handle the search payee functionality
         */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            var records = this.collectSelectedData();
            var allData = this.view.segmentBeneficiaries.data;
            scopeObj.presenter.searchBeneficiaries({
                'searchKeyword': searchKeyword
            }, records, allData);
        },
        /**
         * method used to call the service.
         */
        onSearchClearBtnClick: function() {
            var scopeObj = this;
            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            var records = this.collectSelectedData();
            var allData = this.view.segmentBeneficiaries.data;
            scopeObj.presenter.searchBeneficiaries({
                'searchKeyword': ""
            }, records, allData);
        },

        bindManagePayeeData: function(data, selectedData) {
            this.setManageBeneficiariesSegmentData({
                "manageBeneficiary": data.manageBeneficiary ? data.manageBeneficiary : data,
                "noOfRecords": data.noOfRecords,
                "selectedList": selectedData,
                "noHistory": data.noHistory
            });
            FormControllerUtility.updateSortFlex(this.beneficiaryNameSortMap, data.noOfRecords);
        },
		bindSelectedPayeeData: function (data) {
            var self = this;
            var selectPayees = self.view.segmentBeneficiaries.data;
            var selectedPayees = data;
            var selectedId = selectedPayees.map(idNo => idNo.id);
            selectPayees.forEach(x => {
                if (selectedId.includes(x["id"]["text"])) {
                    x.isSelected = true;
                    x.lblChecbox.text = "C"
                    x.flxCheckbox.accessibilityConfig ={
                        "a11yLabel": "Select all beneficiaries",
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true,
                            "tabindex": 0
                        }
                    };
                }
                else {
                    x.isSelected = false;
                    x.lblChecbox.text = "D"
                    x.flxCheckbox.accessibilityConfig ={
                        "a11yLabel": "Select all beneficiaries",
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "tabindex": 0
                        }
                    };
                }
            });
            this.view.segmentBeneficiaries.setData(selectPayees);
        },
        /**
         *  Method to set data for Manage Beneficiary Segment
         * @param {object}  data list of payees
         */
        setManageBeneficiariesSegmentData: function(data) {
            var scopeObj = this;
            this.view.btnBulkConfirm.onClick = this.onContinueClicked.bind(this, data.selectedList);
            beneficiariesData = data.manageBeneficiary;
            // beneficiariesData = beneficiariesData.filter(function (data) {
            //   return data.isInternationalAccount === false; 
            // })
            if (data.noHistory) {
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.payments.noDomesticBeneficiaries");
                this.view.flxSearchBeneficiaries.setVisibility(false);
                this.view.flxSegmentWithHeader.setVisibility(false);
                this.view.flxPagination.setVisibility(false);
                this.view.flxNoPayment.setVisibility(true);
                this.view.forceLayout();
                return;
            } else if (beneficiariesData.length === 0) {
                this.view.rtxNoPaymentMessage.text =kony.i18n.getLocalizedString("i18n.payments.searchItem");
                this.view.flxSegmentWithHeader.setVisibility(false);
                this.view.flxPagination.setVisibility(false);
                this.view.flxSearchBeneficiaries.setVisibility(true);
                this.view.flxNoPayment.setVisibility(true);
                this.view.forceLayout();
            } else {
                this.view.lblChecbox.text = "D";
                this.view.flxCheckbox.accessibilityConfig = {
                    "a11yLabel": "Select all beneficiaries",
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "tabindex": 0
                    }
                };
                this.view.flxNoPayment.setVisibility(false);
                this.view.flxSegmentWithHeader.setVisibility(true);
                this.view.flxPagination.setVisibility(true);
                this.view.flxSearchBeneficiaries.setVisibility(true);
                this.view.flxContainerNew.setVisibility(true);
                this.view.forceLayout();
            }
            var dataMap = {
                "flxBeneficiariesWrapper": "flxBeneficiariesWrapper",
                "flxCheckbox": "flxCheckbox",
                "lblChecbox": "lblChecbox",
                "lblPayeeName": "lblPayeeName",
                "lblPayeeNameduplicate" : "lblPayeeNameduplicate",
                "lblBankName": "lblBankName",
                "lblBankNameduplicate": "lblBankNameduplicate",
                "lblAccountNumber": "lblAccountNumber",
                "lblAccountNumberduplicate": "lblAccountNumberduplicate",
                "lblSeparatorBottom": "lblSeparatorBottom",
                "lblBankNameWithAccountNumber": "lblBankNameWithAccountNumber",
                "id": "id",
                "isSelected": "isSelected",
                "isInstantPayAvailable": "isInstantPayAvailable"
            };
            if (data.manageBeneficiary.noMoreRecords) {
                scopeObj.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                scopeObj.view.flxPaginationNext.onClick = null;
                kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
                return;
            }
            if (data.noOfRecords) {
                scopeObj.setPagination({
                    'show': true,
                    'offset': data.noOfRecords.offset,
                    'limit': data.noOfRecords.limit,
                    'recordsLength': data.manageBeneficiary.length,
                    'text': ""
                }, scopeObj.prevManageBeneficiaries, scopeObj.nextManageBeneficiaries);
            } else {
                scopeObj.setPagination({
                    'show': false
                });
            }
            if (beneficiariesData.length > 0) {
                var manageBeneficiaries = beneficiariesData.map(function(dataItem, index) {
                    var manageBeneficiary = {
                        "lblSeparatorBottom": {
                            "text": ""
                        },
                        "lblPayeeName": {
                            "text": dataItem.beneficiaryName ? dataItem.beneficiaryName : (dataItem.nickName ? dataItem.nickName : dataItem.accountNumber),
                        },
                        "lblPayeeNameduplicate": {
                            "text": "Beneficiary Name" + dataItem.beneficiaryName
                    
                        },
                        "lblBankName": {
                            "text": dataItem.bankName ? dataItem.bankName : "",
                        },
                        "lblBankNameduplicate": {
                            "text": "Bank Name" + dataItem.bankName ? dataItem.bankName : "",
                        },
                        "lblAccountNumber": {
                            "text": dataItem.accountNumber
                        },
                        "lblAccountNumberduplicate": {
                            "text": "Account Number" + dataItem.accountNumber,
                        },
                        "lblBankNameWithAccountNumber": {
                            "text": dataItem.bankName ? (dataItem.bankName + " | " + dataItem.accountNumber) : dataItem.accountNumber,
                            "accessibilityConfig": {
                                "a11yLabel": dataItem.bankName + " | " + dataItem.accountNumber
                            }
                        },
                        "lblChecbox": {
                            "text": "D"
                        },
                        "flxCheckbox": {
                            "height": "30dp",
                            "onClick": scopeObj.toggleCheckbox.bind(scopeObj, index),
                            "accessibilityConfig": {
                                "a11yLabel":"Select beneficiary" + dataItem.beneficiaryName,
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": "false",
                                    "aria-labelledby": "lblchecbox",
                                    "tabindex": 0
                                }
                            }
                        },
                        "flxBeneficiariesWrapper": {
                            "height": "50dp",
                            "skin": "sknflxffffffnoborder"
                        },
                        "id": {
                            "text": dataItem.Id
                        },
                        "isSelected": false,
                        "isInstantPayAvailable": dataItem.isSameBankAccount === "false" && dataItem.isInternationalAccount === "false"
                    };
                    return manageBeneficiary;
                });
                this.view.flxCheckbox.onClick = this.checkAllBoxes.bind(this);
                this.view.segmentBeneficiaries.widgetDataMap = dataMap;
            this.view.segmentBeneficiaries.setData(manageBeneficiaries);
            }
            // if(beneficiariesData.length < 10)
            //   this.view.tablePagination.setVisibility(false);'
            
            if (data.selectedList.length > 0)
                this.showSelectedData(data.selectedList, beneficiariesData.length);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        /**
         * used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
        setPagination: function(data, previousCallBack, nextCallBack) {
            var scopeObj = this;
            if (data && data.show === true) {
                scopeObj.view.flxPagination.setVisibility(true);
                var offset = data.offset;
                var limit = data.limit || OLBConstants.PAGING_ROWS_LIMIT;
                var recordsLength = data.recordsLength;
                var start = 1 + (offset - 1) * 10;
                CommonUtilities.setText(this.view.lblPagination, (start) + " of " + (start) + " Pages " + data.text, CommonUtilities.getaccessibilityConfig());
                if (data.offset > 1) {
                    scopeObj.view.imgPaginationPrevious.src = kony.i18n.getCurrentLocale() === "ar_AE" ? ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE : ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                    scopeObj.view.flxPaginationPrevious.onClick = kony.i18n.getCurrentLocale() === "ar_AE" ? nextCallBack : previousCallBack;
                } else {
                    scopeObj.view.imgPaginationPrevious.src = kony.i18n.getCurrentLocale() === "ar_AE" ? ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE : ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                    scopeObj.view.flxPaginationPrevious.onClick = null;
                }
                if (recordsLength >= OLBConstants.PAGING_ROWS_LIMIT) {
                    scopeObj.view.imgPaginationNext.src = kony.i18n.getCurrentLocale() === "ar_AE" ? ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE : ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                    scopeObj.view.flxPaginationNext.onClick = kony.i18n.getCurrentLocale() === "ar_AE" ? previousCallBack : nextCallBack;
                } else {
                    scopeObj.view.imgPaginationNext.src = kony.i18n.getCurrentLocale() === "ar_AE" ? ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE : ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                    scopeObj.view.flxPaginationNext.onClick = null;
                }
            } else {
                scopeObj.view.flxPagination.setVisibility(false);
                scopeObj.view.flxPaginationPrevious.onClick = null;
                scopeObj.view.flxPaginationNext.onClick = null;
            }
        },
        /**
         * fetches the previous Beneficiaries records
         */
        prevManageBeneficiaries: function() {
            var scopeObj = this;
            var records = this.collectSelectedData();
            var allData = this.view.segmentBeneficiaries.data;
            scopeObj.presenter.fetchPreviousBeneficiaries(records, allData);
        },
        /**
         * fetches the next Beneficiaries records
         */
        nextManageBeneficiaries: function() {
            var scopeObj = this;
            var records = this.collectSelectedData();
            var allData = this.view.segmentBeneficiaries.data;
            scopeObj.presenter.fetchNextBeneficiaries(records, allData);
        },

        checkAllBoxes: function() {
            var data = this.view.segmentBeneficiaries.data;
            if (this.view.lblChecbox.text === "D") {
                this.view.lblChecbox.text = "C";
                this.view.flxCheckbox.accessibilityConfig = {
                    "a11yLabel": "Select all beneficiaries",
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "tabindex": 0
                    }
                };
                CommonUtilities.enableButton(this.view.btnBulkConfirm);
                for (var record in data) {
                    data[record].lblChecbox.text = "C";
                    data[record].isSelected = true;
                    data[record].flxCheckbox.accessibilityConfig ={
                        "a11yLabel": "Select beneficiary " + data[record].lblPayeeName["text"], //dataItem.beneficiaryName, //osama
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true,
                            "tabindex": 0
                        }
                    };
                }
            } else {
                this.view.lblChecbox.text = "D";
                this.view.flxCheckbox.accessibilityConfig = {
                    "a11yLabel": "Select all beneficiaries",
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": false,
                        "tabindex": 0
                    }
                };
                CommonUtilities.disableButton(this.view.btnBulkConfirm);
                for (var record in data) {
                    data[record].lblChecbox.text = "D";
                    data[record].isSelected = false;
                    data[record].flxCheckbox.accessibilityConfig ={
                        "a11yLabel": "Select beneficiary " + data[record].lblPayeeName["text"], //dataItem.beneficiaryName, //osama
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "tabindex": 0
                        }
                    };
                }
            }
            this.view.segmentBeneficiaries.setData(data);
            this.view.flxCheckbox.setActive(true);
        },

        showSelectedData: function(selectedList, length) {
            var self = this;
            var data = this.view.segmentBeneficiaries.data;
            var count = 0;
            data.filter(function(value, index) {
                for (var record in selectedList) {
                    if (selectedList[record].id === value.id.text) {
                        count++;
                        value.lblChecbox.text = 'C';
                        value.flxCheckbox.accessibilityConfig = {
                            "a11yLabel": "Select beneficiary " + data[record].lblPayeeName["text"], //dataItem.beneficiaryName, //osama
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-checked": true,
                                "tabindex": 0
                            }
                        };
                        value.isSelected = true;
                        self.view.segmentBeneficiaries.setDataAt(value, index);
                    }
                }
            });
            if (count === length){ 
                this.view.lblChecbox.text = "C";
                this.view.flxCheckbox.accessibilityConfig = {
                    "a11yLabel": "Select all beneficiaries",
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-checked": true,
                        "tabindex": 0
                    }
                };
            }
        },

        toggleCheckbox: function(index) {
            var data = this.view.segmentBeneficiaries.data;
            CommonUtilities.disableButton(this.view.btnBulkConfirm);
            if (data[index].lblChecbox.text === 'D') {
                data[index].lblChecbox.text = 'C';
                data[index].isSelected = true;
                data[index].flxCheckbox.accessibilityConfig ={
                        "a11yLabel": "Select beneficiary " + data[index].lblPayeeName["text"], //dataItem.beneficiaryName, //osama
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true,
                            "tabindex": 0
                        }
                    };
            } else {
                data[index].lblChecbox.text = 'D';
                data[index].isSelected = false;
                 data[index].flxCheckbox.accessibilityConfig ={
                        "a11yLabel":"Select beneficiary " + data[index].lblPayeeName["text"], //dataItem.beneficiaryName, //osama
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "tabindex": 0
                        }
                    };
            }
            this.view.segmentBeneficiaries.setDataAt(data[index], index);
            for (var record in data) {
                if(data[record].lblChecbox.text === "C"){
                    CommonUtilities.enableButton(this.view.btnBulkConfirm);
                    break;
                }
            }
            this.view.segmentBeneficiaries.setActive(index,-1,"flxBeneficiariesWrapper.flxCheckbox")
            this.view.forceLayout();
        },

        collectSelectedData: function() {
            var data = this.view.segmentBeneficiaries.data;
            if (!data || data.length === 0) return [];
            var records = [];
            var self = this;
            var isInputSelected = false;
            for (var record of data) {
                if (record.lblChecbox && record.lblChecbox.text === "C") {
                    isInputSelected = true;
                    records.push({
                        "lblBeneficiaryName": record.lblPayeeName.text,
                        "lblBankName": record.lblBankName.text,
                        "accountNumber": record.lblAccountNumber.text,
                        "lblBankNameWithAccountNumber": record.lblBankNameWithAccountNumber.text,
                        "id": record.id.text,
                        "isSelected": record.isSelected,
                        "isInstantPayAvailable": record.isInstantPayAvailable
                    });
                }
            }
            return records;
        },

        onContinueClicked: function(data) {
            var records = this.collectSelectedData();
            if (records.length > 0) {
                this.hideErrorFlex();
                var allData = this.view.segmentBeneficiaries.data;
                this.presenter.showPayMultipleBeneficiaries({
                    "selectedBeneficiaries": records,
                    "allData": allData
                });
            } else {
                if (data.length > 0) {
                    this.hideErrorFlex();
                    this.presenter.showPayMultipleBeneficiaries({
                        "selectedBeneficiaries": data
                    });
                } else {
                    var errMsg;
                    if (this.view.flxNoPayment.isVisible === true) errMsg = kony.i18n.getLocalizedString("i18n.TransfersEur.YouHaveNoSavedBeneficiaries");
                    else errMsg = kony.i18n.getLocalizedString("i18n.Transfers.PleaseSelectAtLeastOneBeneficiaryToContinue");
                    this.setServerError(errMsg);
                }
            }
        },

        setServerError: function(errorMessage) {
            this.view.rtxDowntimeWarning.text = errorMessage;
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.flxFormContent.forceLayout();
        },

        hideErrorFlex: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
        }
    };
});