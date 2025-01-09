define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    var entryState = {};
    return {
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;

            var scopeObj = this;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            scopeObj.managePayeeSortMap = [{
                name: 'payeeNickName',
                imageFlx: scopeObj.view.imgBillerSort,
                clickContainer: scopeObj.view.flxBillerName
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.managePayeeSortMap, scopeObj.onManagePayeeBillerNameClickHandler, scopeObj);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.SearchMessageMobile");
            } else {
                scopeObj.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billPay.SearchMessage");
            }
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);

            this.setTabActions();
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
            this.view.DeletePopup.onBreakpointChangeComponent(scopeObj.view.DeletePopup, width);
        },
        onNavigate: function(context) {
            if (context) {
                if (context.refreshComponent !== undefined) {
                    entryState.refreshComponent = context.refreshComponent;
                } else
                    entryState.refreshComponent = "";
                if (context.showPreviousTab !== undefined) {
                    entryState.showPreviousTab = context.showPreviousTab;
                } else
                    entryState.showPreviousTab = "";
            } else
                entryState = {};
        },
        preShow: function() {
            var scopeObj = this;
            var params = {};
            var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            var isCombinedUser = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes.isCombinedUser;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            if (Object.keys(entryState).length > 0) {
                params.entryState = {};
                params.entryState = entryState;
            }
            params.entitlement = {};
            params.isCombinedUser = isCombinedUser;
            params.entitlement.features = JSON.parse(tokenParams.features);
            params.entitlement.permissions = JSON.parse(tokenParams.permissions);
            this.view.manageBiller.setContext(params);
            this.view.manageBiller.setParentScope(scopeObj);
            this.view.manageBiller.onError = this.onError;
            this.view.customheadernew.activateMenu("Bill Pay", "My Payee List");
            if (this.checkAtLeastOnePermission([
                    "BILL_PAY_DELETE_PAYEES",
                    "BILL_PAY_VIEW_PAYEES",
                    "BILL_PAY_CREATE_PAYEES"
                ])) {
                scopeObj.view.btnManagePayees.setVisibility(true);
            } else {
                scopeObj.view.btnManagePayees.setVisibility(false);
            }
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.flxEditBillerMobile.setVisibility(false);
            CampaignUtility.fetchPopupCampaigns();
            this.view.flxEditBiller.setVisibility(false);
            this.view.contractList.setVisibility(false);
            this.view.flxComponent.setVisibility(true);
            this.view.flxMainContainer.setVisibility(true);
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.customheadernew.btnSkipNav.onClick = function(){
            scopeObj.view.manageBiller.lableSetActive();
            }
        },
        executeEdit: function(data) {

            this.view.flxComponent.setVisibility(false);
            this.setEditBillerData(data);
            this.view.flxEditBiller.setVisibility(true);
            this.view.forceLayout();
            this.registerWidgetActions();

        },
        executeEditBiller: function (data) {
            applicationManager.getNavigationManager().setCustomInfo("frmAddPayee1", data);
            kony.mvc.getNavigationManager().navigate({
                context: this,
                callbackModelConfig: {
                    addPayee: true
                }
            });
        },
        executeViewActivity: function(dataItem) {
            var scopeObj = this;
            scopeObj.presenter.fetchPayeeBills({
                "payeeId": dataItem.payeeId,
                "payeeName": dataItem.payeeName,
                "payeeAccountNumber": dataItem.payeeAccountNumber,
                "isBusinessPayee": dataItem.isBusinessPayee
            });
        },
        executePayMoney: function(dataItem) {
            this.singleBillPayFromPayee(dataItem);
        },
        getPageHeight: function() {
            var height = this.view.flxMain.frame.height;
            return height + "Dp";
        },
        hideQuicklinks2: function() {
            //this.view.quicklinks1.isVisible = false;
        },
        showQuicklinks2: function() {
            if (kony.application.getCurrentBreakpoint() >= 1366) {
                //this.view.quicklinks1.isVisible = true;
            }
        },
        onTab1Click: function() {
            this.presenter.showBillPaymentScreen({
                context: "BulkPayees",
                loadBills: true
            })
        },
        onTab2Click: function() {
            this.presenter.showBillPaymentScreen({
                context: "DueBills",
                loadBills: true
            })
        },
        onTab3Click: function() {
            this.presenter.showBillPaymentScreen({
                context: "ScheduleBills",
                loadBills: true
            })
        },
        onTab4Click: function() {
            this.presenter.showBillPaymentScreen({
                context: "History",
                loadBills: true
            })
        },
        onError: function(err) {
            kony.application.dismissLoadingScreen();
           kony.print(JSON.stringify(err));
        },
        postShow: function() {
            // this.view.flxTabsChecking.setContentOffset({
            //     x: "100%",
            //     y: "100%"
            // }, true);
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.title="My Bills-Manage Payees";
            this.view.customheadernew.collapseAll();
            this.view.customheadernew.lblHeaderMobile.text="My Bills";
        },
        onKeyPressCallBack: function (eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxDialogs.isVisible) {
                    this.view.flxDialogs.isVisible = false;
                }
                this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },
        // /**
        //  * Set foucs handlers for skin of parent flex on input focus 
        //  */
        // accessibilityFocusSetup: function() {
        //     let widgets = [
        //         [this.view.txtSearch, this.view.flxtxtSearchandClearbtn]
        //     ]
        //     for (let i = 0; i < widgets.length; i++) {
        //         CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
        //     }
        // },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (viewModel.managePayee && viewModel.managePayee.searchvisibility) {
                this.bindManagePayeeData(viewModel.managePayee.managePayee, null, viewModel.managePayee.searchvisibility);
                this.initializeFilterSegments(viewModel.managePayee.managePayee);
            } else if (viewModel.managePayee) {
                this.bindManagePayeeData(viewModel.managePayee);
                this.initializeFilterSegments(viewModel.managePayee);
            } else if (viewModel.billDueData) {
                this.bindTotalEbillAmountDue(viewModel.billDueData);
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
            if (viewModel.contracts) {
                this.setContractsData(viewModel.contracts);
            }
        },
        setTabActions: function() {
            var scopeObj = this;
            //             this.view.btnAllPayees.onClick = function () { scopeObj.presenter.showBillPaymentScreen({ context: "BulkPayees", loadBills: true }) };
            //             this.view.btnPaymentDue.onClick = function () { scopeObj.presenter.showBillPaymentScreen({ context: "DueBills", loadBills: true }) };
            //             this.view.btnScheduled.onClick = function () { scopeObj.presenter.showBillPaymentScreen({ context: "ScheduleBills", loadBills: true }) };
            //             this.view.btnHistory.onClick = function () { scopeObj.presenter.showBillPaymentScreen({ context: "History", loadBills: true }) };
            //             this.view.btnManagePayees.onClick = function () { scopeObj.presenter.showBillPaymentScreen({ context: "ManagePayees", loadBills: true }) };
            this.view.flxAddPayee.onClick = function() {
                scopeObj.presenter.showBillPaymentScreen({
                    context: "AddPayee"
                })
            };
            this.view.flxMakeOneTimePayment.onClick = function() {
                scopeObj.presenter.showBillPaymentScreen({
                    context: "MakeOneTimePayment",
                    callbackModelConfig: {
                        managePayees: true
                    }
                })
            };
        },
        /**
         * used to bind the manage payees data
         * @param {object} data data
         * @param {object}  noofRecords no of records
         * @param {boolean} searchvisibility search visibulity
         */
        bindManagePayeeData: function(data, noofRecords, searchvisibility) {
            this.setManagePayeesSegmentData({
                "managePayee": data.managePayee ? data.managePayee : data,
                "noofRecords": data.noOfRecords,
                "searchView": searchvisibility
            });
            FormControllerUtility.updateSortFlex(this.managePayeeSortMap, data.noOfRecords);
        },
        /**
         * Manage payee biller name sorting handler
         * @param {object} event
         * @param {object} data
         */
        onManagePayeeBillerNameClickHandler: function(event, data) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            this.presenter.managePayeePagination(data);
        },
        /**
         *  Method to set data for Manage Payee Segment
         * @param {object}  data list of payees
         */
        setManagePayeesSegmentData: function(data) {
            var self = this;
            var scopeObj = this;
            scopeObj.view.flxMainContainer.setVisibility(true);
            scopeObj.view.segmentBillpay.setVisibility(true);
            scopeObj.view.flxSearch.setVisibility(true);
            if (configurationManager.isCombinedUser === "true") {
                scopeObj.view.flxtxtSearchandClearbtn.right = "30.5%";
                scopeObj.view.flxFiltersList.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    scopeObj.view.flxFiltersList.setVisibility(false);
                    scopeObj.view.flxtxtSearchandClearbtn.width = "90%";

                }
            }
            scopeObj.view.flxEditBillerMobile.setVisibility(false);
            scopeObj.view.flxNoPayment.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.FlxBillpayeeManagePayees.setVisibility(false);
            } else {
                scopeObj.view.FlxBillpayeeManagePayees.setVisibility(true);
            }
            if (data.managePayee.noMoreRecords) {
                this.view.imgPaginationNext.src = "pagination_next_inactive.png";
                this.view.flxPaginationNext.onClick = null;
                kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
                return;
            }
            if (data.managePayee.noHistory === true || data.managePayee.length === 0) {
                if (data.searchView && data.managePayee.length === 0) {
                    scopeObj.showNoPayementDetails({
                        noPaymentMessageI18Key: "i18n.PayAPerson.NoRecords"
                    });
                }
                if (data.managePayee.noHistory === true) {
                    scopeObj.showNoPayementDetails({
                        noPaymentMessageI18Key: "i18n.billPay.noPayeesMessage"
                    });
                    scopeObj.view.flxSearch.setVisibility(false);
                }
                if (data.managePayee.length === 0) {
                    scopeObj.showNoPayementDetails({
                        noPaymentMessageI18Key: "i18n.billPay.noPayeesMessage"
                    });
                    scopeObj.view.flxSearch.setVisibility(false);
                }

            } else {
                if (data.noofRecords) {
                    scopeObj.setPagination({
                        'show': true,
                        'offset': data.noofRecords.offset,
                        'limit': data.noofRecords.limit,
                        'recordsLength': data.managePayee.length,
                        'text': kony.i18n.getLocalizedString("i18n.billpay.payees")
                    }, scopeObj.prevManagePayees, scopeObj.nextManagePayees);
                }
                var searchView = data.searchView;
                data = data.managePayee;
                var dataMap = {
                    "flxIdentifier": "flxIdentifier",
                    "lblIdentifier": "lblIdentifier",
                    "lblDropdown": "lblDropdown",
                    "flxBillPaymentManagePayeesSelected": "flxBillPaymentManagePayeesSelected",
                    "flxBillPaymentManagePayeesSelectedMobile": "flxBillPaymentManagePayeesSelectedMobile",
                    "lblPayeeUser": "lblPayeeUser",
                    "flxPayeeUser": "flxPayeeUser",
                    "lblPayee": "lblPayee",
                    "btnEbill": "btnEbill",
                    "lblLastPayment": "lblLastPayment",
                    "lblLastPaymentDate": "lblLastPaymentDate",
                    "lblNextBill": "lblNextBill",
                    "lblNextBillDate": "lblNextBillDate",
                    "btnPayBill": "btnPayBill",
                    "lblSeparator": "lblSeparator",
                    "lblAccountNumberTitle": "lblAccountNumberTitle",
                    "lblAccountNumberValue": "lblAccountNumberValue",
                    "lblBankAddressOne": "lblBankAddressOne",
                    "lblBankAddressTwo": "lblBankAddressTwo",
                    "btnViewActivity": "btnViewActivity",
                    "btnViewEbill": "btnViewEbill",
                    "btnEditBiller": "btnEditBiller",
                    "btnDeleteBiller": "btnDeleteBiller",
                    "lblSeparatorBottom": "lblSeparatorBottom",
                    "lblError": "lblError",
                    "txtPayee": "txtPayee",
                    "txtBankName": "txtBankName",
                    "txtAddress": "txtAddress",
                    "txtCity": "txtCity",
                    "tbxState": "tbxState",
                    "tbxPinCode": "tbxPinCode",
                    "btnSave": "btnSave",
                    "btnCancel": "btnCancel",
                    "lblBillerName": "lblBillerName",
                    "lblBillerAddressTitle": "lblBillerAddressTitle",
                    "lblLastPaymentTitle": "lblLastPaymentTitle",
                    "lblPaymentDateTitle": "lblPaymentDateTitle",
                    "lblNextBillAmountTitle": "lblNextBillAmountTitle",
                    "lblDueDateTitle": "lblDueDateTitle"
                };
                if (data.length > 0) {
                    var managePayees = data.map(function(dataItem) {
                        var managePayee = {
                            "payeeId": {
                                "text": dataItem.payeeId,
                            },
                            "lblSeparatorTwo": {
                                "text": ""
                            },
                            "lblSeparatorBottom": {
                                "text": " "
                            },
                            "flxIdentifier": {
                                "skin": "sknFlxIdentifier",
                                "isVisibile": "false"
                            },
                            "lblIdentifier": {
                                "text": " ",
                                "skin": "sknffffff15pxolbfonticons"
                            },
                            "lblDropdown": {
                                "text": "O"
                            },
                            "flxBillPaymentManagePayeesSelected": {
                                "height": "70dp",
                                "skin": "sknflxffffffnoborder"
                            },
                            "flxBillPaymentManagePayeesSelectedMobile": {
                                "height": "70dp",
                                "skin": "sknflxffffffnoborder"
                            },
                            "flxPayeeUser": {
                                "isVisible": (this.profileAccess === "both") ? true : false
                                //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false
                            },
                            "lblPayeeUser": {
                                "isVisible": (this.profileAccess === "both") ? true : false,
                                //"isVisible": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? true : false,
                                "text": dataItem.isBusinessPayee === "1" ? "r" : "s"
                            },
                            "lblPayee": {
                                "text": dataItem.payeeNickName ? dataItem.payeeNickName : '',
                            },
                            "lblSeparator": {
                                "text": " "
                            },
                            "lblAccountNumberTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.AccountNumber"),
                            },
                            "lblAccountNumberValue": {
                                "text": dataItem.accountNumber ? dataItem.accountNumber : '',
                            },
                            "lblBankAddressOne": {
                                "text": (applicationManager.getConfigurationManager().isCombinedUser === "true") ? (dataItem.addressLine1 ? dataItem.addressLine1 : '') : (dataItem.payeeName ? dataItem.payeeName : ''),
                            },
                            "lblBankAddressTwo": {
                                "text": scopeObj.getAddress(dataItem),
                            },
                            "btnViewActivity": {
                                "text": kony.i18n.getLocalizedString("i18n.transfers.viewActivity"),
                                "onClick": scopeObj.viewBillPayActivity.bind(scopeObj, dataItem),
                                "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_VIEW_PAYMENTS")
                            },
                            "btnEditBiller": {
                                "text": kony.i18n.getLocalizedString("i18n.billPay.editBiller"),
                                "onClick": function(button, context) {
                                    scopeObj.changeToEditBiller(context);
                                },
                                "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES")
                            },
                            "btnDeleteBiller": {
                                "text": kony.i18n.getLocalizedString("i18n.billPay.deleteBiller"),
                                "onClick": CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : function() {
                                    scopeObj.editDeleteOnClick(arguments[1]);
                                },
                                "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_DELETE_PAYEES")
                            },
                            "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentManagePayeesSelectedMobile" : "flxBillPaymentManagePayeesSelected",
                            "txtPayee": {
                                "text": dataItem.payeeNickName,
                            },
                            "lblBillerName": {
                                "text": dataItem.payeeName,
                            },
                            "lblError": " ",
                            "txtBankName": {
                                "text": dataItem.addressLine1 ? dataItem.addressLine1 : '',
                                "placeholder": kony.i18n.getLocalizedString("i18n.transfers.bankName")
                            },
                            "txtAddress": {
                                "text": dataItem.addressLine2 ? dataItem.addressLine2 : '',
                                "placeholder": kony.i18n.getLocalizedString("i18n.ProfileManagement.Address")
                            },
                            "txtCity": {
                                "text": dataItem.cityName ? dataItem.cityName : '',
                                "placeholder": kony.i18n.getLocalizedString("i18n.common.city")
                            },
                            "tbxState": {
                                "text": dataItem.state ? dataItem.state : '',
                                "placeholder": kony.i18n.getLocalizedString("i18n.common.state")
                            },
                            "tbxPinCode": {
                                "text": dataItem.zipCode ? dataItem.zipCode : ' ',
                                "placeholder": kony.i18n.getLocalizedString("i18n.common.zipcode")
                            },
                            "btnSave": {
                                "text": kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"),
                                "onClick": CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : function(button, context) {
                                    scopeObj.editSaveOnClick(context);
                                }
                            },
                            "btnCancel": {
                                "text": kony.i18n.getLocalizedString("i18n.transfers.Cancel"),
                                "onClick": function(eventObject, context) {
                                    scopeObj.editCancelOnClick(dataItem, context);
                                }
                            }
                        };
                        var ebillRelatedPayeeDetails = scopeObj.setManagePayeeInfoByEBill(managePayee, dataItem);
                        var ebillRelatedPayeeDetailskeys = Object.keys(ebillRelatedPayeeDetails[0]);
                        for (var i in ebillRelatedPayeeDetailskeys) {
                            managePayee[ebillRelatedPayeeDetailskeys[i]] = ebillRelatedPayeeDetails[0][ebillRelatedPayeeDetailskeys[i]];
                        }
                        var notActivatedEbillRelatedPayeeDetailskeys = Object.keys(ebillRelatedPayeeDetails[1]);
                        for (var j in notActivatedEbillRelatedPayeeDetailskeys) {
                            managePayee[notActivatedEbillRelatedPayeeDetailskeys[j]] = ebillRelatedPayeeDetails[1][notActivatedEbillRelatedPayeeDetailskeys[j]];
                        }
                        return managePayee;
                    });
                    this.view.segmentBillpay.widgetDataMap = dataMap;
                    this.view.segmentBillpay.setData(managePayees);
                    scopeObj.view.flxNoPayment.setVisibility(false);
                    if (searchView) {
                        this.view.flxPagination.setVisibility(false);
                        scopeObj.view.FlxBillpayeeManagePayees.setVisibility(false);
                    } else {
                        scopeObj.view.txtSearch.text = "";
                        scopeObj.view.flxClearBtn.setVisibility(false);
                    }
                }
            }
            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                this.view.flxtxtSearchandClearbtn.right = "30.5%";
                this.view.flxDropdown.setVisibility(true);
            } else {
                //  this.view.flxSearchAllPayees.setVisibility(false);
                // this.view.flxHorizontalLine3.setVisibility(false);
                this.view.flxtxtSearchandClearbtn.right = "3.5%";
                this.view.flxDropdown.setVisibility(false);
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        /**
         *  Address concatenation for combined user
         */
        getAddress: function(dataItem) {
            var address;
            if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
                if (!kony.sdk.isNullOrUndefined(dataItem.addressLine2)) {
                    address = dataItem.addressLine2;
                    if (!kony.sdk.isNullOrUndefined(dataItem.cityName)) {
                        address = address + ',' + dataItem.cityName;
                    }
                    if (!kony.sdk.isNullOrUndefined(dataItem.state)) {
                        address = address + ',' + dataItem.state;
                    }
                    if (!kony.sdk.isNullOrUndefined(dataItem.zipCode)) {
                        address = address + ',' + dataItem.zipCode;
                    }
                } else {
                    address = '';
                }
            } else {
                address = (dataItem.addressLine1 ? dataItem.addressLine1 : '');
            }
            return address;
        },

        /**
         * method used to enable or disable the clear button.
         * @param {object} event event
         */
        onTxtSearchKeyUp: function(event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxSearch.forceLayout();
        },
        /**
         * method to handle the search payee functionality
         */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            scopeObj.presenter.searchBillPayPayees({
                'searchKeyword': searchKeyword
            });
            scopeObj.searchView = true;
        },
        /**
         * method used to call the service.
         */
        onSearchClearBtnClick: function() {
            var scopeObj = this;
            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            if (this.searchView === true) {
                scopeObj.presenter.showBillPaymentScreen({
                    "context": "ManagePayees",
                    "loadBills": true
                });
            }
            this.searchView = false;
        },

        /*
         * method to display the types of payees list
         */
        onFiltersBtnClick: function() {
            this.view.accountTypesBillPayManagePayees.setVisibility(!this.view.accountTypesBillPayManagePayees.isVisible);
            this.view.accountTypesBillPayManagePayees.skin = "slfBoxffffffB1R5";
            this.view.accountTypesBillPayManagePayees.flxAccountTypesSegment.skin = "slfBoxffffffB1R5";
            this.view.accountTypesBillPayManagePayees.segAccountTypes.rowSkin = "slfBoxffffffB1R5";
        },

        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function(managePayee) {
            // this.view.a = this.view.LisiBox1.masterData[0]; 

            //this.view.accountTypesBillPaySchedule.setVisibility(true);
            var data = [{
                    "lblUsers": "All Payees"
                },
                {
                    "lblUsers": "Personal Payees"
                },
                {
                    "lblUsers": "Business Payees"
                }
            ];
            this.view.accountTypesBillPayManagePayees.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers"
            };
            this.view.accountTypesBillPayManagePayees.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesBillPayManagePayees.segAccountTypes.data[0].lblUsers;
            this.view.accountTypesBillPayManagePayees.segAccountTypes.onRowClick = this.onFilterSelection.bind(this, managePayee);

        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(managePayeeData) {
            var scopeObj = this;
            //var segData = this.view.accountTypesBillPaySchedule.segAccountTypes.data;
            var payee = managePayeeData.managePayee;
            this.view.accountTypesBillPayManagePayees.setVisibility(false);
            var data = scopeObj.getFilterData(payee);
            managePayeeData.managePayee = data;
            this.setManagePayeesSegmentData(managePayeeData);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getFilterData: function(managePayee) {

            this.view.lblType.text = this.view.accountTypesBillPayManagePayees.segAccountTypes.selectedRowItems !== null ? this.view.accountTypesBillPayManagePayees.segAccountTypes.selectedRowItems[0].lblUsers : this.view.accountTypesBillPayManagePayees.segAccountTypes.data[0].lblUsers;
            var filterQuery = this.view.lblType.text;

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = managePayee;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < managePayee.length; i++) {
                    if (managePayee[i].isBusinessPayee === "0") {
                        accountlist.push(managePayee[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                managePayee = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < managePayee.length; i++) {
                    if (managePayee[i].isBusinessPayee === "1") {
                        accountlist.push(managePayee[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                managePayee = accountlist;
            }
            return managePayee;
        },

        /**
         * used to show the no payees flow.
         * @param {message} message used to show the no message message on the page
         */
        showNoPayementDetails: function(message) {
            var scopeObj = this;
            if (message) {
                scopeObj.view.flxNoPayment.setVisibility(true);
                scopeObj.view.segmentBillpay.setVisibility(false);
                scopeObj.view.FlxBillpayeeManagePayees.setVisibility(false);
                scopeObj.setPagination({
                    show: false
                });
                scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString(message.noPaymentMessageI18Key);
                if (message.showActionMessageI18Key) {
                    scopeObj.view.lblScheduleAPayment.setVisibility(false);
                    scopeObj.view.lblScheduleAPayment.text=kony.i18n.getLocalizedString(message.showActionMessageI18Key);
                } else {
                    scopeObj.view.lblScheduleAPayment.setVisibility(false);
                }
            }
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
                //                 scopeObj.view.flxPagination.setVisibility(true);
                var offset = data.offset;
                var limit = data.limit || OLBConstants.PAGING_ROWS_LIMIT;
                var recordsLength = data.recordsLength;
                this.view.lblPagination.text= (offset + 1) + " - " + (offset + recordsLength) + " " + data.text;
                if (data.offset > 0) {
                    scopeObj.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                    scopeObj.view.flxPaginationPrevious.onClick = previousCallBack;
                } else {
                    scopeObj.view.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                    scopeObj.view.flxPaginationPrevious.onClick = null;
                }
                if (recordsLength >= OLBConstants.PAGING_ROWS_LIMIT) {
                    scopeObj.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                    scopeObj.view.flxPaginationNext.onClick = nextCallBack;
                } else {
                    scopeObj.view.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                    scopeObj.view.flxPaginationNext.onClick = null;
                }
            } else {
                scopeObj.view.flxPagination.setVisibility(false);
                scopeObj.view.flxPaginationPrevious.onClick = null;
                scopeObj.view.flxPaginationNext.onClick = null;
            }
        },
        /**
         * previous Manage Payees
         */
        prevManagePayees: function() {
            var scopeObj = this;
            scopeObj.presenter.fetchPreviousManagePayees();
        },
        /**
         * next Manage Payees
         */
        nextManagePayees: function() {
            var scopeObj = this;
            scopeObj.presenter.fetchNextManagePayees();
        },
        /**
         * set Payee Information based on eBill Flag
         * @param {object}  managePayees manage payees
         * @param {object} dataItem data
         * @returns {object} manage payee object
         */
        setManagePayeeInfoByEBill: function(managePayees, dataItem) {
            var scopeObj = this;
            var notEnableEBillPayee = {};
            var billGeneratedPayee = {};
            if (CommonUtilities.isCSRMode()) {
                managePayees.btnDeleteBiller.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
                managePayees.btnSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
            }
            if (dataItem.billid === "0") {
                var lblPayment;
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    lblPayment = kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity");
                } else {
                    lblPayment = {
                        "text": kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity"),
                        "skin": "slLabel0d8a72616b3cc47",
                        "top": "10px",
                    };
                }
                billGeneratedPayee = {
                    "lblLastPayment": lblPayment,
                    "lblLastPaymentDate": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "-" : "",
                    "lblNextBill": lblPayment,
                    "lblNextBillDate": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "-" : ""
                };
            } else {
                billGeneratedPayee = {
                    "lblLastPayment": {
                        "text": dataItem.lastPaidAmount ? scopeObj.formatAmount(dataItem.lastPaidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : '',
                    },
                    "lblLastPaymentDate": {
                        "text": scopeObj.getDateFromDateString(dataItem.lastPaidDate, "YYYY-MM-DDTHH:MM:SS"),
                    },
                    "lblNextBill": {
                        "text": dataItem.dueAmount ? scopeObj.formatAmount(dataItem.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : '',
                    },
                    "lblNextBillDate": {
                        "text": kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": " + scopeObj.getDateFromDateString(dataItem.billDueDate, "YYYY-MM-DDTHH:MM:SS"),
                    },
                };
            }
            if (dataItem.eBillSupport === "false" || dataItem.isManuallyAdded === "true") {
                notEnableEBillPayee = {
                    "lblLastPayment": "-",
                    "lblLastPaymentDate": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "-" : "",
                    "lblNextBill": "-",
                    "lblNextBillDate": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "-" : "",
                    "btnPayBill": {
                        "text": kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
                        "onClick": scopeObj.singleBillPayFromPayee.bind(scopeObj, dataItem),
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
                    },
                    "lblAccountNumberTitle": "Acc Num : ",
                    "lblAccountNumberValue": {
                        "text": dataItem.accountNumber ? dataItem.accountNumber : '',
                    },
                    "lblBankAddressOne": {
                        "text": dataItem.payeeName ? dataItem.payeeName : '',
                    },
                    "lblBankAddressTwo": {
                        "text": dataItem.addressLine2 ? dataItem.addressLine2 : '',
                    },
                    "btnEbill": {
                        "text": "SOME TEXT",
                        "isVisible": false
                    }
                }
            } else if (dataItem.eBillStatus === "1") {
                notEnableEBillPayee = {
                    "btnEbill": {
                        "text": "SOME TEXT",
                        "skin": ViewConstants.SKINS.SKNBTNEBILLACTIVE,
                        "onClick": dataItem.billid === "0" ? null : scopeObj.viewEBill.bind(scopeObj, {
                            "billGeneratedDate": scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS"),
                            "amount": scopeObj.formatAmount(dataItem.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                            "ebillURL": dataItem.ebillURL
                        }),
                        "isVisible": true
                    },
                    "btnPayBill": {
                        "text": kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
                        "onClick": scopeObj.singleBillPayFromPayee.bind(scopeObj, dataItem),
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
                    },
                    "btnViewEbill": {
                        "text": kony.i18n.getLocalizedString("i18n.billpay.deactivate"),
                        "onClick": function(button, context) {
                            scopeObj.deactivateEbill(context);
                        },
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_ACTIVATE_OR_DEACTIVATE_EBILL")
                    }
                };
            } else {
                notEnableEBillPayee = {
                    "btnEbill": {
                        "text": "SOME TEXT",
                        "skin": ViewConstants.SKINS.SKNBTNIMGINACTIVEEBILL,
                        "onClick": null,
                        "isVisible": true
                    },
                    "btnPayBill": {
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "onClick": function() {
                            scopeObj.activateEbill(dataItem, "frmManagePayees");
                        },
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_ACTIVATE_OR_DEACTIVATE_EBILL")
                    },
                    "btnViewEbill": {
                        "isVisible": false
                    }
                };
            }
            return [notEnableEBillPayee, billGeneratedPayee];
        },
        /**
         * used to show the dueBills count and totalDueBills Amount
         * @param {object} dueBills contains the no of bills and toatalBillamount
         */
        bindTotalEbillAmountDue: function(dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(true);
                scopeObj.view.lblBills.text= dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills");
                scopeObj.view.lblEbillAmountDueValue.text= scopeObj.formatAmount(String(dueBills.totalDueAmount));
            }
            scopeObj.view.forceLayout();
        },
        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            return this.presenter.formatAmount(amount, currencySymbolNotRequired);
        },
        /**
         * used to convert the CalenderFormat Date
         * @param {String} dateString string formated date
         * @param {string} inputFormat input format
         * @returns {string} outputDate output date
         */
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },
        /**
         * construct a pay A Bill object and send to single Bill Pay
         * @param {object} dataItem payee Payment object
         */
        singleBillPayFromPayee: function(dataItem) {
            var scopeObj = this;
            var payABillData = {
                "payeeNickname": dataItem.payeeNickName,
                "lastPaidAmount": dataItem.lastPaidAmount,
                "isBusinessPayee": dataItem.isBusinessPayee,
                "lastPaidDate": dataItem.lastPaidDate,
                "dueAmount": scopeObj.formatAmount(dataItem.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)),
                "billDueDate": dataItem.billDueDate,
                "eBillSupport": dataItem.eBillSupport,
                "eBillStatus": dataItem.eBillStatus,
                "billid": dataItem.billid,
                "payeeId": dataItem.payeeId,
                "accountNumber": dataItem.accountNumber,
                "billGeneratedDate": dataItem.billGeneratedDate,
                "ebillURL": dataItem.ebillURL,
                "searchView": scopeObj.searchView,
                "transitDays": dataItem.transitDays
            };
            payABillData.onCancel = function () {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params: {
                        "refreshComponent": false
                    },
                    callbackModelConfig: {
                        managePayees: true
                    }
                });
            };
            scopeObj.presenter.showBillPaymentScreen({
                "sender": null,
                "context": "PayABill",
                "loadBills": false,
                "data": payABillData
            });
        },
        /**
         * method to view the bill payment view activity.
         * @param {object} dataItem data
         */
        viewBillPayActivity: function(dataItem) {
            var scopeObj = this;
            scopeObj.presenter.fetchPayeeBills({
                "payeeId": dataItem.payeeId,
                "payeeName": dataItem.payeeName,
                "payeeAccountNumber": dataItem.payeeAccountNumber,
                "isBusinessPayee": dataItem.isBusinessPayee
            });
        },
        /**
         * method to delete biller in Edit ManagePayee on click of Delete Biller button.
         * @param {number} offsetVal offset value
         */
        editDeleteOnClick: function(args) {
            var scopeObj = this;
            var data = this.view.segmentBillpay.data;
            var index = args.rowIndex;
            var deleteData = {
                "payeeId": data[index].payeeId.text
            };
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxDeletePopup.setVisibility(true);
            scopeObj.view.DeletePopup.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxDeletePopup.setVisibility(false);
                if (deleteData !== null || deleteData.payeeId !== null || deleteData.payeeId !== "") {
                    scopeObj.presenter.deleteManagePayee(deleteData);
                }
            };
            scopeObj.view.DeletePopup.btnNo.onClick = function() {
                scopeObj.view.flxDeletePopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
            scopeObj.view.DeletePopup.flxCross.onClick = function() {
                scopeObj.view.flxDeletePopup.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * Activates the E-Bill
         * @param {object} data data
         * @param {string} selectedTab selected tab
         */
        activateEbill: function(data, selectedTab) {
            var scopeObj = this;
            scopeObj.view.lblAccountNumberValue.text= data.accountNumber ? data.accountNumber : " ";
            scopeObj.view.lblBillerNameValue.text= data.payeeNickName ? data.payeeNickName : data.payeeName;
            scopeObj.view.flxActivateBiller.setVisibility(true);
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.btnProceed.onClick = function() {
                scopeObj.view.flxActivateBiller.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.presenter.activateEbill(data, selectedTab);
            };
            scopeObj.view.btnCancel.onClick = function() {
                scopeObj.view.flxActivateBiller.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
            scopeObj.view.flxCross.onClick = function() {
                scopeObj.view.flxActivateBiller.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * Deactivates the E-Bill
         * @param {number} offsetVal
         */
        deactivateEbill: function(context, offsetVal) {
            var scopeObj = this;
            var data = this.view.segmentBillpay.data;
            var index = context.rowIndex;
            if (data !== null && data[index].payeeId !== null && data[index].payeeId !== "") {
                scopeObj.presenter.deactivateEbill(data[index].payeeId.text, offsetVal);
            }
        },
        /**
         * method to validate data entered by user while editing manage payees
         * @param {object} updateData update data
         * @returns {boolean} status
         */
        validateEditManagePayees: function(updateData) {
            var isValid = false;
            if (updateData.payeeNickName) {
                isValid = true;
            }
            if (updateData.addressLine1) {
                isValid = true;
            }
            if (updateData.state) {
                if (/^[a-zA-Z]+$/.test(updateData.state))
                    isValid = true;
                else
                    isValid = false;
            }
            if (updateData.cityName) {
                if (/^[a-zA-Z]+$/.test(updateData.cityName))
                    isValid = true;
                else
                    isValid = false;
            }
            if (updateData.zipCode) {
                isValid = true;
            } else {
                isValid = false;
            }
            return isValid;
        },
        /**
         * method to show Edit column on click of EDIT in manage Bill Payee
         */
        changeToEditBiller: function(context) {
            var data = this.view.segmentBillpay.data;
            var index = context.rowIndex;
            for (var i = 0; i < data.length; i++) {
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    data[i].template = "flxBillPaymentManagePayeesSelectedMobile";
                } else {
                    data[i].template = "flxBillPaymentManagePayeesSelected";
                }
            }
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                data[index].template = "flxBillPaymentManagePayeesSelectedMobile";
                this.setEditBillerMobileUI(data[index]);
            } else {
                data[index].template = "flxBillPaymentManagePayeesEdit";
            }
            this.view.segmentBillpay.setDataAt(data[index], index);
        },
        /**
         * method to Save Edited data in Edit ManagePayee on click of Save button.
         */
        editSaveOnClick: function(context) {
            var scopeObj = this;
            var data = this.view.segmentBillpay.data;
            var index = context.rowIndex;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                data = this.view.segEditBillerMobile.data;
                index = 0;
            }
            var updateData = {
                "payeeId": data[index].payeeId.text,
                "payeeNickName": data[index].txtPayee.text,
                "addressLine1": data[index].txtBankName.text,
                "addressLine2": data[index].txtAddress.text,
                "state": data[index].tbxState.text,
                "zipCode": data[index].tbxPinCode.text,
                "cityName": data[index].txtCity.text
            };
            var isValid;
            if (data[index] !== undefined || data[index] !== null || data[index] !== "" || updateData.payeeId !== null || updateData.payeeId !== "" || updateData.payeeId !== undefined) {
                isValid = true;
            } else {
                isValid = false;
            }
            if (isValid) {
                if (this.validateEditManagePayees(updateData)) {
                    scopeObj.presenter.updateManagePayee(updateData);
                    data[index].lblError = " ";
                    if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                        data[index].template = "flxBillPaymentManagePayeesSelectedMobile";
                    } else {
                        data[index].template = "flxBillPaymentManagePayeesSelected";
                    }
                    this.view.segmentBillpay.setDataAt(data[index], index);
                } else {
                    data[index].template = kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile ? "flxBillPaymentManagePayeesEditMobile" : "flxBillPaymentManagePayeesEdit";
                    data[index].txtPayee = updateData.payeeNickName;
                    data[index].txtBankName.text = updateData.addressLine1 ? updateData.addressLine1 : '';
                    data[index].txtBankName.placeholder = kony.i18n.getLocalizedString("i18n.transfers.bankName");
                    data[index].txtAddress.text = updateData.addressLine2 ? updateData.addressLine2 : '';
                    data[index].txtAddress.placeholder = kony.i18n.getLocalizedString("i18n.ProfileManagement.Address");
                    data[index].txtCity.text = updateData.cityName ? updateData.cityName : '';
                    data[index].txtCity.placeholder = kony.i18n.getLocalizedString("i18n.common.city");
                    data[index].tbxState.text = updateData.state ? updateData.state : '';
                    data[index].tbxState.placeholder = kony.i18n.getLocalizedString("i18n.common.state");
                    data[index].tbxPinCode.text = updateData.zipCode ? updateData.zipCode : '';
                    data[index].tbxPinCode.placeholder = kony.i18n.getLocalizedString("i18n.common.zipcode");
                    data[index].lblError = kony.i18n.getLocalizedString("i18n.common.errorEditData");
                    if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                        this.view.segEditBillerMobile.setDataAt(data[index], index);
                    } else {
                        this.view.segmentBillpay.setDataAt(data[index], index);
                    }
                }
            }
            this.view.forceLayout();
        },
        /**
         * method for Cancel button in Edit Manage Payee
         * @param {object} dataItem data item
         */
        editCancelOnClick: function(dataItem, context) {
            var data = this.view.segmentBillpay.data;
            var index = context.rowIndex;
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                data[index].template = "flxBillPaymentManagePayeesSelectedMobile";
            } else {
                data[index].template = "flxBillPaymentManagePayeesSelected";
            }
            data[index].txtPayee = dataItem.payeeNickName;
            data[index].txtBankName = dataItem.addressLine1 ? dataItem.addressLine1 : ' ';
            data[index].txtAddress = dataItem.addressLine2 ? dataItem.addressLine2 : ' ';
            data[index].txtCity = dataItem.cityName ? dataItem.cityName : ' ';
            data[index].tbxState = dataItem.state ? dataItem.state : ' ';
            data[index].tbxPinCode = dataItem.zipCode ? dataItem.zipCode : ' ';
            data[index].lblError = " ";
            this.view.segmentBillpay.setDataAt(data[index], index);
            this.view.forceLayout();
        },
        /**
         * method to show Edit flex for Mobile Breakpoint
         */
        setEditBillerMobileUI: function(data) {
            var scopeObj = this;
            data.btnCancel = {
                "text": "Cancel",
                "onClick": function() {
                    scopeObj.view.flxEditBillerMobile.isVisible = false;
                    var data = scopeObj.view.segmentBillpay.data;
                    for (var i = 0; i < data.length; i++) {
                        data[i].template = "flxBillPaymentManagePayeesSelectedMobile";
                    }
                    scopeObj.view.segmentBillpay.setData(data);
                    scopeObj.view.flxMainContainer.isVisible = true;
                    //                 scopeObj.view.flxPagination.isVisible = true;
                    scopeObj.view.forceLayout();
                }
            };
            data.lblHeader = "Bill Payee Details";
            data.lblSeparatorOne = "DummyText";
            data.lblBillerName = kony.i18n.getLocalizedString("i18n.BillPay.BillerName");
            data.lblAddress = kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address");
            data.lblCity = kony.i18n.getLocalizedString("i18n.payments.cityWithColon");
            data.lblState = kony.i18n.getLocalizedString("i18n.payments.stateWithColon");
            data.lblCountry = kony.i18n.getLocalizedString("i18n.ProfileManagement.country");
            data.lblZipCode = kony.i18n.getLocalizedString("i18n.payments.zipCodeWithColon");
            data.lblSeparatorTwo = "Dummy Text";
            data.template = "flxBillPaymentManagePayeesEditMobile";
            var segData = [];
            segData.push(data);
            scopeObj.view.segEditBillerMobile.setData(segData);
            scopeObj.view.flxPagination.isVisible = false;
            scopeObj.view.flxMainContainer.isVisible = false;
            scopeObj.view.flxEditBillerMobile.isVisible = true;
            if (this.profileAccess === "both") {
                //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
                scopeObj.view.flxTypeIcon.setVisibility(true);
            }
            scopeObj.view.lblAccNumberValue.text = data.lblAccountNumberValue.text;
            scopeObj.view.lblBillerAddressValue.text = data.lblBankAddressOne.text;
            scopeObj.view.btnEbill.text = data.btnEbill != undefined ? data.btnEbill.text : "";
            scopeObj.view.btnEbill.onClick = data.btnEbill != undefined ? data.btnEbill.onClick : "";
            var index = scopeObj.view.segmentBillpay.selectedRowIndex[1];
            var skin = scopeObj.view.segmentBillpay.data[index].btnEbill.skin;
            scopeObj.view.btnEbill.skin = skin;
        },
        /**
         * method to view the ebill.
         * @param {object} viewModel ebill information
         */
        viewEBill: function(viewModel) {
            var scopeObj = this;
            if (viewModel) {
                var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
                scopeObj.view.lblPostDateValue.text=viewModel.billGeneratedDate || nonValue;
                scopeObj.view.lblAmountValue.text= viewModel.amount || nonValue;
                scopeObj.view.flxMemo.setVisibility(false);
                if (viewModel.ebillURL) {
                    scopeObj.view.flxDownload.onClick = scopeObj.downloadFile.bind(scopeObj, {
                        'url': viewModel.ebillURL
                    });
                    scopeObj.view.flxDownload.setVisibility(true);
                    scopeObj.view.imgEBill.src = viewModel.ebillURL;
                } else {
                    scopeObj.view.flxDownload.setVisibility(false);
                    scopeObj.view.flxDownload.onClick = null;
                }
                this.view.imgZoom.setVisibility(false)
                this.view.imgFlip.setVisibility(false)
                scopeObj.view.flxViewEbill.setVisibility(true);
                scopeObj.view.flxDialogs.setVisibility(true);
                scopeObj.view.lblTransactions1.setFocus(true);
            }
            scopeObj.view.flxImgCancel.onClick = function() {
                scopeObj.view.flxViewEbill.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * method to download the e-bill page.
         * @param {object} data information
         */
        downloadFile: function(data) {
            if (data) {
                CommonUtilities.downloadFile({
                    'url': data.url,
                    'filename': kony.i18n.getLocalizedString('i18n.billPay.Bill')
                })
            }
        },
        /**
         * used to show the permission based UI
         */
        showAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(true);
            this.view.btnPaymentDue.setVisibility(true);
            this.view.btnScheduled.setVisibility(true);
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(false);
            this.view.btnPaymentDue.setVisibility(false);
            this.view.btnScheduled.setVisibility(false);
            this.view.flxMakeOneTimePayment.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showHistoryOption: function() {
            this.view.btnHistory.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function() {
            this.view.btnHistory.setVisibility(false);
        },

        setEditBillerData: function(billerData) {

            this.view.tbxEnterName.text = billerData.payeeNickName;
            this.view.tbxEnterAccountNmber.text = billerData.accountNumber;
            this.view.tbxEnterAccountNmber.setEnabled(false);
            this.view.tbxEnterAddress.text = billerData.addressLine1;
            if (billerData.addressLine2) {
                this.view.tbxEnterAddressLine2.text = billerData.addressLine2;
            } else {
                this.view.tbxEnterAddressLine2.text = "";
            }
            if (billerData.state) {
                this.view.flxState.setVisibility(true);
                this.view.tbxState.text = billerData.state;
            } else {
                this.view.flxState.setVisibility(false);
            }
            this.view.tbxCity.text = billerData.cityName;
            this.view.tbxZipCode.text = billerData.zipCode;

            this.editCIFData = billerData.cif;

            this.view.btnContinue.onClick = function() {
                this.getContracts(false);
            }.bind(this)
            this.view.btnCancelEditBiller.onClick = function () {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params: {
                        "refreshComponent": false
                    },
                    callbackModelConfig: {
                        managePayees: true
                    }
                });
            }.bind(this);

            this.payeeId = billerData.payeeId;

            this.restrictSpecialCharacters();

        },

        restrictSpecialCharacters: function () {

            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var numericSet = "0123456789";

            this.view.tbxEnterName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            this.view.tbxEnterAddress.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            this.view.tbxEnterAddressLine2.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            this.view.tbxState.restrictCharactersSet = numericSet + specialCharactersSet;
            this.view.tbxCity.restrictCharactersSet = numericSet + specialCharactersSet;
            this.view.tbxZipCode.restrictCharactersSet = alphabetsSet + specialCharactersSet;

        },

        getContracts: function(modify) {

            if (!modify) {
                this.presenter.getContracts("BILL_PAY_CREATE_PAYEES");
            } else if (this.cif) {
                this.updateManagePayee();
            } else {
                this.view.contractList.setVisibility(true);
                this.view.flxMainContainer.setVisibility(false);
                this.view.lblPayABill.setVisibility(true);
                this.view.lblPayABill.text = kony.i18n.getLocalizedString("i18n.billPay.editBiller")
            }
        },

        setContractsData: function(contractsData) {

            if (contractsData.contracts.length > 0) {

                this.view.lblPayABill.setVisibility(true);
                this.view.lblPayABill.text = kony.i18n.getLocalizedString("i18n.billPay.editBiller")

                if (contractsData.contracts.length == 1 && contractsData.contracts[0].contractCustomers.length == 1) {
                    this.view.contractList.segContract.data = [];
                    this.cif = JSON.stringify([{
                        "contractId": contractsData.contracts[0].contractId,
                        "coreCustomerId": contractsData.contracts[0].contractCustomers[0].coreCustomerId
                    }]);
                    this.view.contractList.setVisibility(false);
                    // this.view.flxMainContainer.setVisibility(true);
                    this.updateManagePayee();
                } else {
                    this.view.contractList.setVisibility(true);
                    this.view.flxMainContainer.setVisibility(false);

                    contractsData.isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;

                    // if (this.isEdit) {
                    this.view.contractList.preshow(contractsData, this.editCIFData);
                    // } else {
                    //     this.view.contractList.preshow(contractsData);
                    // }

                    this.view.contractList.btnAction4.onClick = function () {
                        kony.mvc.getNavigationManager().navigate({
                            context: this,
                            params: {
                                "refreshComponent": false
                            },
                            callbackModelConfig: {
                                managePayees: true
                            }
                        });
                    }.bind(this);
                    this.view.contractList.btnAction5.onClick = function() {
                        this.view.flxMainContainer.setVisibility(true);
                        this.view.contractList.setVisibility(false);
                        this.view.lblPayABill.setVisibility(false);
                        this.view.btnContinue.onClick = function() {
                            this.getContracts(true);
                        }.bind(this);

                    }.bind(this);
                    this.view.contractList.btnAction6.onClick = function() {
                        this.updateManagePayee();
                    }.bind(this);
                }
            } else {
               kony.print("You Do not have permission for any contract")
            }
        },

        createCIFDataForUpdateManagePayee: function(segData) {
            let cif = [];
            segData.forEach(x => {

                if (x[0].lblCheckBoxSelect.text === "C") {
                    let coreCustomerIdArray = []
                    x[1].forEach(y => {
                        if (y.lblCustomerCheckbox.text === "C") {
                            coreCustomerIdArray.push(y.lblCustomerNumber.text)
                        }
                    });
                    cif.push({
                        "contractId": x[0].lblIdentityNumber.text,
                        "coreCustomerId": coreCustomerIdArray.join(',')
                    })
                }
            });
            return JSON.stringify(cif);
        },

        /**
         * validates the all manually added payee manidatory information
         */
        checkIfAllManualFieldsAreFilled: function() {

            let state;
            if (this.view.flxState.isVisible && this.view.tbxState.text.trim()) {
                state = true;
            } else if (!this.view.flxState.isVisible) {
                state = true
            } else {
                state = false;
            }

            if (this.view.tbxEnterName.text.trim() && this.view.tbxEnterAddress.text.trim() &&
                this.view.tbxCity.text.trim() && this.view.tbxZipCode.text.trim() && state) {
                FormControllerUtility.enableButton(this.view.btnContinue);
            } else {
                FormControllerUtility.disableButton(this.view.btnContinue);
            }

        },

        /**
         * used to register the widget actions
         */
        registerWidgetActions: function() {
            var scopeObj = this;
            FormControllerUtility.enableButton(this.view.btnContinue);
            let widgetArr = [
                this.view.tbxEnterName, this.view.tbxEnterAddress,
                this.view.tbxZipCode, this.view.tbxCity,
            ];

            if (this.view.flxState.isVisible) {
                widgetArr.push(this.view.tbxState);
            } else if (widgetArr.includes(this.view.tbxState)) {
                widgetArr.remove(this.view.tbxState);
            }

            widgetArr.forEach(function(element) {
                element.onKeyUp = scopeObj.checkIfAllManualFieldsAreFilled;
            });
        },

        updateManagePayee: function() {

            var updateData = {
                "payeeId": this.payeeId,
                "payeeNickName": this.view.tbxEnterName.text,
                "addressLine1": this.view.tbxEnterAddress.text,
                "addressLine2": this.view.tbxEnterAddressLine2.text,
                "state": this.view.tbxState.text,
                "zipCode": this.view.tbxZipCode.text,
                "cityName": this.view.tbxCity.text,
                "accountNumber": this.view.tbxEnterAccountNmber.text
            };

            if (this.cif) {
                updateData.cif = this.cif;
            } else {
                updateData.cif = this.createCIFDataForUpdateManagePayee(this.view.contractList.segContract.data);
            }
            this.presenter.updateManagePayee(updateData, this.view.contractList.segContract.data);
        }
    };
});