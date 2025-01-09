/**
 * Description of Module representing a Confirm form.
 * @module frmMakePaymentController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
    var keyCharCode = 0;
    var fromAccountSaerchTerm = '';
    var toAccountSearchTerm = '';
    var fromAccounts = [];
    var toAccounts = [];
    var filesToBeUploaded = [];
    var fileTypeArray = [];
    var base64Content = [];
    var count = 0;
    var attachments = [];
    var uploadedAttachments = [];
    var existingAttachments = [];
    var deletedAttachments = [];
    var editMode = false;
    var modifiedCurrency;
    var scheduledMode;
    var isOwnAccountsFlow = false;
    var preSelectAccountFrom = null;
    var preSelectAccountTo = null;
    var orientationHandler = new OrientationHandler();
    var isPaidBy = '';
    var new_benificiary = false;
    var oneTimeSameBank = false;
    var bank_name;
    var bank_country;
    var isSameBankAccount;
    var isInternationalAccount;
    var paymentType = '';
    var sameBankAccountCurrencyCode;
    var transactionCurrency;
    var fromScroll = false;
    var toScroll = false;
    var currency = {
        'EUR': "€ EURO",
        'GBP': "£ GBP",
        'USD': "$ USD",
        'JPY': "¥ JPY",
        'RUB': "₽ RUB",
        'AED': "د.إ AED",
        'YER': "YER",
        'SAR': "SAR",
    };
    var frequencies = {
        'Once': "i18n.transfers.frequency.once",
        'Daily': "i18n.Transfers.Daily",
        'Weekly': "i18n.Transfers.Weekly",
        'BiWeekly': "i18n.Transfers.EveryTwoWeeks",
        'Monthly': "i18n.Transfers.Monthly",
        'Quarterly': "i18n.Transfers.Quaterly",
        'Half Yearly': "i18n.Transfers.HalfYearly",
        'Yearly': "i18n.Transfers.Yearly"
    };
    var forHowLong = {
        ON_SPECIFIC_DATE: "i18n.transfers.lbxOnSpecificDate"
            // NO_OF_RECURRENCES: "i18n.transfers.lblNumberOfRecurrences"
    };
    var fromSeg = true,
        toSeg = true;
    return {
        bankDate: null,
        cutOffFlow: null,
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            this.presenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "TransferEurUIModule"
            });
            this.initActions();
        },
        initActions: function() {
            var self = this;
            this.view.flxDialogs.setVisibility(false);
            this.view.txtTransferFrom.onKeyUp = CommonUtilities.debounce(self.onKeyUpFrom.bind(self), OLBConstants.FUNCTION_WAIT, false);
            this.view.txtTransferTo.onKeyUp = CommonUtilities.debounce(self.onKeyUpTo.bind(self), OLBConstants.FUNCTION_WAIT, false);
            this.view.txtAccountNumber.onEndEditing = this.validateIBAN.bind(this);
            this.view.txtAccountNumber.onBeginEditing = this.normalizeAccountTextbox.bind(this);
            FormControllerUtility.disableButton(self.view.btnSearch);
            this.view.btnSearch.onClick = self.searchSwift;
            this.view.txtCountry1.onTextChange = this.enableSwiftSearch;
            this.view.txtCity1.onTextChange = this.enableSwiftSearch;
            this.view.txtBankName.onTextChange = this.enableSwiftSearch;
            this.view.btnPaymentActivities.onClick = function() {
                self.ManageActivitiesPresenter.showTransferScreen({
                    context: "ScheduledPayments"
                });
            };
            this.view.btnManageBeneficiaries.onClick = function() {
                self.ManageActivitiesPresenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                });
            };
            this.view.flxWrapImage.onClick = this.browseSupportingDoc;
            filesToBeUploaded = [];
            uploadedAttachments = [];
            attachments = [];
            this.view.flxAttachmentUploadError.setVisibility(false);
            this.renderCalendars();
            this.view.BtnLookup.onClick = function() {
                FormControllerUtility.disableButton(self.view.btnSearch);
                self.view.flxLookup.setVisibility(true);
                self.view.flxLookup.isModalContainer = true;
                //self.view.btnLookupClose.setFocus(true);
                self.view.lblHeading.setActive(true);
                self.view.flxNoResults.setVisibility(false);
                self.view.txtBankName.text = '';
                self.view.txtCity1.text = '';
                self.view.txtCountry1.text = '';
                self.view.segResults.setData([]);
            }
            this.view.btnLookupClose.accessibilityConfig = {
                a11yLabel: "Close this lookup dialog",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.btnLookupClose.onClick = function() {
                self.view.flxLookup.setVisibility(false);
                self.view.flxLookup.isModalContainer = false;
                self.view.BtnLookup.setFocus(true);
            }
            this.view.btnModify.onClick = function() {
                if (editMode && scheduledMode) {
                    self.ManageActivitiesPresenter.showTransferScreen({
                        context: "ScheduledPayments"
                    });
                } else if (editMode && !scheduledMode) {
                    self.ManageActivitiesPresenter.showTransferScreen({
                        context: "PastPayments"
                    });
                } else {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "HomepageMA"
                    });
                    accountsModule.presentationController.showAccountsDashboard();
                }
            };
            this.view.btnConfirm.onClick = function() {
                this.presenter.showConfirmation();
            }.bind(this);
            this.restrictSpecialCharacters();
            this.view.btnSearch.onClick = self.searchSwift;
            this.view.btnClearSearch.onClick = self.clearSearch;
            this.view.segResults.onRowClick = this.segRowClick;
        },
        setSkinToCalendar: function(widgetId) {
            widgetId.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            // this.hideFieldError();
        },
        removeAttachments: function(data) {
            for (var i = 0; i < filesToBeUploaded.length; i++) {
                if (filesToBeUploaded[i] === data.filename.text) {
                    filesToBeUploaded.splice(i, 1);
                    if (data.fileID) {
                        deletedAttachments.push(data.fileID);
                    } else {
                        attachments.splice(i, 1);
                        uploadedAttachments.splice(i, 1);
                    }
                    break;
                }
            }
            if (uploadedAttachments.length === 0) {
                this.view.flxAttachmentsList.setVisibility(false);
            }
            this.view.flxAttachmentUploadError.setVisibility(false);
            this.setAttachmentsDataToSegment();
            this.view.flxWrapImage.setActive(true);
        },
        closeAttachmentsPopup: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxAttachmentsPopup.setVisibility(false);
        },
        closeDropDownOnTouchDevice: function() {
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.flxToSegment.setVisibility(false);
                this.showOrHideClearToAccBtn(false);
            }
        },
        preShow: function() {
            this.view.segTransferTo.enableLazyLoad = true;
            this.view.segTransferTo.height = "300dp";
            this.view.segTransferTo.top = "-1dp";
            this.view.flxLogout.skin="sknBackground000000Op35";
            this.view.calSendOnNew.calendarIconAlignment = constants.CALENDAR_ICON_ALIGN_AUTO;
            this.view.calEndingOnNew.calendarIconAlignment = constants.CALENDAR_ICON_ALIGN_AUTO;
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var self = this;
            this.accountToIsPreSelectedFlow = false;
            this.viewsVisibilityStore = null;
            fromAccountSaerchTerm = "";
            toAccountSearchTerm = "";
            editMode = false;
            this.selectedFromAccount = null;
            this.selectedToAccount = null;
            preSelectAccountFrom = null;
            preSelectAccountTo = null;
            attachments = [];
            filesToBeUploaded = [];
            uploadedAttachments = [];
            this.view.lblCount2.setVisibility(false);
            this.view.lblNew.setVisibility(false);
            this.hideLoanView();
            this.view.lbxFrequency.masterData = this.getFrequencies();
            this.view.flxFeePaidBy.setVisibility(false);
            this.view.lbxpay.masterData = this.getForHowLong();
            this.view.lbxpay.selectedKey = this.view.lbxpay.masterData[0][0];
            this.view.BtnLookup.setVisibility(false);
            this.view.calSendOnNew.onSelection = this.setSkinToCalendar.bind(this, this.view.calSendOnNew);
            this.view.lbxCurrency.masterData = this.onCurrencyChange();
            this.view.lblCount1.text = "140";
            this.view.lblCount2.text = "18";
            this.limitLengthAndUpdateIndicator(140, this.view.lblCount1, this.view.txtPaymentReference);
            this.limitLengthAndUpdateIndicator(18, this.view.lblCount2, this.view.txtBeneficiaryNickName);
            this.view.txtAccountNumber.onKeyUp = this.checkValidityMakeFastTransferForm.bind(this);
            this.view.txtSwift.onKeyUp = this.checkValidityMakeFastTransferForm.bind(this);
            this.onClickRadioButton(this.view.flxRadioBtn);
            this.view.segAddedDocuments.setData([]);
            this.view.flxRadioBtn1.onClick = this.onClickMeRadioButton.bind(this);
            this.view.flxRadioBtn2.onClick = this.onClickBeneficiaryRadioButton.bind(this);
            this.view.flxRadioBtn3.onClick = this.onClickShareRadioButton.bind(this);
            this.view.lblRadioBtn1.onTouchEnd = this.onClickMeRadioButton.bind(this);
            this.view.lblRadioBtn2.onTouchEnd = this.onClickBeneficiaryRadioButton.bind(this);
            this.view.lblRadioBtn3.onTouchEnd = this.onClickShareRadioButton.bind(this);
            this.view.flxWrapRadio1.onClick = this.onClickRadioButton;
            this.view.flxWrapRadio2.onClick = this.onClickRadioButton;
            this.view.flxInstantPayment.onClick = this.onClickRadioButtonPaymentCutoff;
            this.view.flxOptionTwo.onClick = this.onClickRadioButtonPaymentCutoff;
            this.view.lblNew.onTouchEnd = this.closeDropDownOnTouchDevice;
            this.view.flxWrapRadio9.onClick = this.onInstantPaymentonTouchStart.bind(this);
            this.view.flxWrapRadio10.onClick = this.onNextBankingDayPaymentonTouchStart.bind(this);
            this.view.lbxFrequency.onSelection = this.onFrequencyChanged.bind(this, true);
            this.view.lbxpay.onSelection = this.onHowLongChange.bind(this);
            this.makeTransferAmountField = FormControllerUtility.wrapAmountField(this.view.txtAmount).onKeyUp(this.checkValidityMakeFastTransferForm);
            this.view.flxBankOption1.onClick = this.onClickBeneficiaryBankRadioButton.bind(this);
            this.view.flxBankOption2.onClick = this.onClickBeneficiaryBankRadioButton.bind(this);
            this.view.flxBeneficiaryBank.setVisibility(false);
            this.view.flxLoadingContainerTo.setVisibility(false);
            this.view.segTransferFrom.widgetDataMap = {
                "flxTransfersFrom": "flxTransfersFrom",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "flxGroup2": "flxGroup2",
                "flxGroupMain": "flxGroupMain",
            };
            this.view.segTransferTo.widgetDataMap = {
                "flxTransfersFrom": "flxTransfersFrom",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "lblAccountName": "lblAccountName",
                "flxBankName": "flxBankName",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "flxFastTransfersActivate": "flxFastTransfersActivate",
                "lblContent": "lblContent",
                "lblActivePayAPerson": "lblActivePayAPerson",
                "flxGroup": "flxGroup",
                "flxTransfersTo": "flxTransfersTo",
                "flxTransfersToMobile": "flxTransfersToMobile",
                "lblBankName": "lblBankName",
            };
            this.view.flxFrom.onClick = function() {
                if (self.view.txtTransferFrom.isVisible === false) {
                    self.view.txtTransferFrom.setVisibility(true);
                    self.view.lblSelectAccount.setVisibility(false);
                    self.view.flxFrom.accessibilityConfig = {
                        "a11yLabel": "Select the From account",
                        a11yARIA: {
                            "tabindex": -1,
                        }
                    };
                    self.view.flxFromSegment.setVisibility(true);
                    self.showOrHideClearFromAccBtn(true);
                    self.view.txtTransferFrom.text = "";
                    self.view.txtTransferFrom.setFocus(true);
                }
            };
            this.view.segTransferFrom.onRowClick = this.segFromAccountRowClick.bind(this);
            this.view.segTransferTo.onRowClick = this.segToAccountRowClick.bind(this);
            this.view.txtTransferFrom.onTouchStart = function() {
                if (keyCharCode === 27) {
                    self.view.flxFromSegment.setVisibility(false);
                    self.showOrHideClearFromAccBtn(false);
                    return;
                }
                self.view.flxFromSegment.setVisibility(true);
                self.showOrHideClearFromAccBtn(true);
                self.view.flxToSegment.setVisibility(false);
                self.showOrHideClearToAccBtn(false);
                self.view.forceLayout();
            };
            this.view.txtTransferTo.onTouchStart = function() {
                if (keyCharCode === 27) {
                    self.view.flxToSegment.setVisibility(false);
                    self.showOrHideClearToAccBtn(false);
                    return;
                } else {
                    self.view.flxToSegment.setVisibility(true);
                    self.showOrHideClearToAccBtn(true);
                    self.view.flxFromSegment.setVisibility(false);
                    self.showOrHideClearFromAccBtn(false);
                    self.view.forceLayout();
                }
            };
            this.view.flxTo.onClick = function() {
                if (self.view.txtTransferTo.isVisible === false) {
                    self.view.txtTransferTo.setVisibility(true);
                    self.view.lblSelectAccountTo.setVisibility(false);
                    self.view.flxTo.accessibilityConfig = {
                        "a11yLabel": "Select the To account",
                        a11yARIA: {
                            "tabindex": -1,
                        }
                    };
                    self.view.flxToSegment.setVisibility(true);
                    self.showOrHideClearToAccBtn(true);
                    self.view.txtTransferTo.setFocus(true);
                }
            };
            this.view.flxCancelFilterTo.onClick = function() {
                self.toggleNewBeneficiary(true);
            };
            this.view.flxFromSegment.onScrolling = function() {
                fromScroll = true;
            };
            this.view.flxToSegment.onScrolling = function() {
                toScroll = true;
            };
            this.view.txtPaymentReference.onKeyUp = this.limitLengthAndUpdateIndicator.bind(this, 140, this.view.lblCount1);
            this.view.txtBeneficiaryNickName.onKeyUp = this.limitLengthAndUpdateIndicator.bind(this, 18, this.view.lblCount2);
            this.view.btnConfirm.onClick = this.submitTransfersForm.bind(this);
            this.toggleNewBeneficiary(false);
            this.checkValidityMakeFastTransferForm();
            // this.view.BtnLookup.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.LookUp");
            // this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            // this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            // this.view.btnDownload.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            // this.view.btnClearSearch.toolTip = kony.i18n.getLocalizedString("i18n.payments.clearSelection");
            // this.view.btnSearch.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Search");
            this.view.btnModify.accessibilityConfig = {
                "a11yLabel": "Cancel money transfer"
            };
            this.view.btnConfirm.accessibilityConfig = {
                "a11yLabel": "Continue to confirmation screen "
            };
            // this.view.btnByPass.onClick = this.byPassFun;
            // this.view.btnByPass.accessibilityConfig = {
            //     "a11yLabel": "Skip to Payment Options",
            //     a11yARIA: {
            //         role: "button"
            //     },
            // };
            this.view.flxClearFromText.onClick = this.clearFromText;
            this.view.flxClearToText.onClick = this.clearToText;
            this.view.segTransferFrom.onKeyPress = this.keyFromCall;
        },
        dropdownKeyPress : function(eventobject, eventPayload,context){
            if (eventPayload.keyCode === 27 ) {
                this.view.flxFromSegment.setVisibility(false);
                this.view.txtTransferFrom.setVisibility(false);
                this.view.flxFrom.accessibilityConfig = {
                 "a11yLabel": "Select the From account",
                 a11yARIA: {
                     "tabindex": 0,
                     "role": "button"
                  }
                }
                eventPayload.preventDefault();
                this.view.flxFrom.setActive(true);
             }
             if(eventPayload.keyCode === 9){
                 if (eventPayload.shiftKey === true) {
                    if(context.sectionIndex===0){
                     this.view.flxFromSegment.setVisibility(false);
                     this.view.txtTransferFrom.setVisibility(false);
                     this.view.flxFrom.accessibilityConfig = {
                         "a11yLabel": "Select the From account",
                         a11yARIA: {
                             "tabindex": 0,
                             "role": "button"
                         }
                     }
                     eventPayload.preventDefault();
                     this.view.flxFrom.setActive(true);
                    }
                }
             }
        },
        dropdownKeyPressToAccount: function(eventobject, eventPayload, context) {
            if (eventPayload.keyCode === 27) {
              this.view.flxToSegment.setVisibility(false);
              this.view.txtTransferTo.setVisibility(false);
              this.view.flxTo.accessibilityConfig = {
                 "a11yLabel": "Select the To account",
                   a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                 }
                }
              eventPayload.preventDefault();
              this.view.flxTo.setActive(true);
            }
           if (eventPayload.keyCode === 9) {
              if (eventPayload.shiftKey === true) {
                if (context.rowIndex === 0) {
                   this.view.flxToSegment.setVisibility(false);
                   this.view.txtTransferTo.setVisibility(false);
                   this.view.flxTo.accessibilityConfig = {
                     "a11yLabel": "Select the To account",
                        a11yARIA: {
                          "tabindex": 0,
                          "role": "button"
                       }
                }
                eventPayload.preventDefault();
                this.view.flxTo.setActive(true);
               }
            }
         }
       },
        keyFromCall: function(eventobject, eventPayload) {
            if (eventPayload.keyCode === 27 ) {
               this.view.flxFromSegment.setVisibility(false);
               this.view.txtTransferFrom.setVisibility(false);
               this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                 }
               }
               eventPayload.preventDefault();
               this.view.flxFrom.setActive(true);
            }
        },
        showOrHideClearFromAccBtn: function(isDropdownHidden) {
            if (!isDropdownHidden) {
                this.view.flxClearFromText.isVisible = false;
                return;
            }
            if (this.view.txtTransferFrom.text.length !== 0) {
                this.view.flxClearFromText.isVisible = true;
            } else {
                this.view.flxClearFromText.isVisible = false;
            }
        },
        clearFromText: function() {
            this.view.txtTransferFrom.text = "";
            this.selectedFromAccount = null;
            this.onKeyUpFrom(this.view.txtTransferFrom);
            this.view.txtTransferFrom.setFocus(true);
            this.checkValidityMakeFastTransferForm();
            //hiding of the clear button is taken care in on key up from
        },
        showOrHideClearToAccBtn: function(isDropdownHidden) {
            if (!isDropdownHidden) {
                this.view.flxClearToText.isVisible = false;
                return;
            }
            if (this.view.txtTransferTo.text.length !== 0) {
                this.view.flxClearToText.isVisible = true;
            } else {
                this.view.flxClearToText.isVisible = false;
            }
        },
        clearToText: function() {
            this.view.txtTransferTo.text = "";
            this.onKeyUpTo(this.view.txtTransferTo);
            this.view.txtTransferTo.setFocus(true);
            //hiding of the clear button is taken care in on key up from
        },
        swiftKeyCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode == 27) {
                var self = this;
                self.view.flxLookup.setVisibility(false);
                self.view.flxLookup.isModalContainer = false;
                self.view.BtnLookup.setFocus(true);
            }
        },
        byPassFun: function() {
            this.view.btnNewPayment.setFocus(true);
        },
        showManageBeneficiaryFlx: function() {
            this.view.btnManageBeneficiaries.setVisibility(true);
        },
        hideManageBeneficiaryFlx: function() {
            this.view.btnManageBeneficiaries.setVisibility(false);
        },
        browseSupportingDoc: function() {
            this.view.flxAttachmentUploadError.setVisibility(false);
            var config = {
                selectMultipleFiles: false,
                filter: []
            };
            kony.io.FileSystem.browse(config, this.selectedFileCallback);
            count = filesToBeUploaded.length;
        },
        getBase64: function(file, successCallback) {
            var reader = new FileReader();
            reader.onloadend = function() {
                successCallback(reader.result);
            };
            reader.readAsDataURL(file);
        },
        selectedFileCallback: function(events, files) {
            var configManager = applicationManager.getConfigurationManager();
            var maxAttachmentsAllowed = configManager.maxAttachmentsAllowed;
            this.view.flxAttachmentUploadError.setVisibility(false);
            var fileNameRegex = new RegExp("^[a-zA-Z0-9]*[.][.a-zA-Z0-9]*[^.]$");
            if (count === filesToBeUploaded.length) {
                if (files.length > 0) {
                    var fileName = files[0].file.name;
                    var extension = files[0].file.name.split('.');
                    if (extension.length > 0 && extension[extension.length - 1] !== "jpeg" && extension[extension.length - 1] !== "pdf") {
                        this.view.flxAttachmentUploadError.setVisibility(true);
                        this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg2");
                        this.view.forceLayout();
                        return;
                    }
                    if (files[0].file.size >= 2000000) {
                        this.view.flxAttachmentUploadError.setVisibility(true);
                        this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentSizeErrorMsg");
                        this.view.forceLayout();
                        return;
                    } else if (fileName !== null && (!fileNameRegex.test(fileName) || extension.length > 2)) {
                        this.view.flxAttachmentUploadError.setVisibility(true);
                        this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentFileNameErrorMsg");
                        this.view.forceLayout();
                        return;
                    } else if (filesToBeUploaded.length >= maxAttachmentsAllowed) {
                        this.view.flxAttachmentUploadError.setVisibility(true);
                        this.view.lblAttachmentUploadError.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentLimitExceededErrorMsg");
                        this.view.forceLayout();
                        return;
                    } else {
                        var fileData = {};
                        filesToBeUploaded.push(files[0].name);
                        fileTypeArray.push(files[0].file.type);
                        fileData.fileName = files[0].name;
                        fileData.fileType = files[0].file.type;
                        this.getBase64(files[0].file, function(base64String) {
                            attachments = [];
                            base64String = base64String.replace("data:;base64\,", "");
                            base64String = base64String.replace("data:application\/octet-stream;base64\,", "");
                            base64String = base64String.replace("data:image\/jpeg;base64\,", "");
                            fileData.fileContents = base64String.replace("data:application/pdf;base64\,", "");
                            attachments.push(fileData);
                            var fileDataItemParsed = attachments.map(function(item) {
                                return item['fileName'] + "-" + item['fileType'] + "-" + item['fileContents'];
                            });
                            uploadedAttachments.push(fileDataItemParsed);
                            base64Content.push(fileData.fileContents);
                        });
                    }
                }
            } else return;
            if (filesToBeUploaded.length <= maxAttachmentsAllowed) {
                this.setAttachmentsDataToSegment();
            }
            this.view.forceLayout();
        },
        setAttachmentsDataToSegment: function() {
            this.view.flxAttachmentsList.setVisibility(true);
            var attachmentsData = [];
            for (var i = 0; i < filesToBeUploaded.length; i++) {
                attachmentsData[i] = {};
                attachmentsData[i].filename = {
                    "text": CommonUtilities.truncateStringWithGivenLength(filesToBeUploaded[i], 32),
                };
                if (existingAttachments[i] && (existingAttachments[i].fileName == filesToBeUploaded[i])) {
                    attachmentsData[i].fileID = existingAttachments[i].fileID;
                }
                attachmentsData[i]["imgRemoveAttachment"] = {
                    "src": "bbcloseicon.png"
                };
                attachmentsData[i]["flxImgRemove"] = {
                    "onClick": this.removeAttachments.bind(this, attachmentsData[i])
                };
            }
            this.view.segAddedDocuments.widgetDataMap = {
                "lblAttachedDocument": "filename",
                "imgRemoveAttachment": "imgRemoveAttachment",
                "lblAttachedDocumentID": "fileID",
                "flxImgRemove": "flxImgRemove"
            };
            this.view.segAddedDocuments.setData(attachmentsData);
            this.view.forceLayout();
        },
        downloadAttachment: function(data) {
            if (data.fileID) {
                var requestParam = {};
                requestParam.fileID = data.fileID;
                requestParam.fileName = data.filename;
                FormControllerUtility.showProgressBar(this.view);
                var url = applicationManager.getTransactionManager().getDownloadAttachmentUrl(requestParam);
                this.downloadFileFromURL(url);
            } else {
                for (var index = 0; index < filesToBeUploaded.length; index++) {
                    if (data.filename.text === filesToBeUploaded[index]) {
                        var obj = document.createElement('object');
                        obj.type = fileTypeArray[index];
                        obj.data = 'data:' + fileTypeArray[index] + ';base64,' + base64Content[index];
                        document.body.appendChild(obj);
                        var link = document.createElement('a');
                        link.download = data.filename.text;
                        link.href = 'data:application/octet-stream;base64,' + base64Content[index];
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            }
        },
        downloadFileFromURL: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
            FormControllerUtility.hideProgressBar(this.view);
        },
        onRadioLoanListener: function(selectedAccount, button) {
            if (button === "lblLoan1") {
                this.showDueAmount(selectedAccount);
            } else {
                this.showOtherAmount(selectedAccount);
            }
        },
        validateData: function() {
            var formData = this.getFormDetails();
            var formatUtilManager = applicationManager.getFormatUtilManager();
            var sendOnDate = formatUtilManager.getDateObjectFromDateComponents(formData.sendOnDateComponent);
            if (formData.endOnDateComponent !== null) {
                var endOnDate = formatUtilManager.getDateObjectFromDateComponents(formData.endOnDateComponent);
            }
            var currDateComponent = this.bankDateObj.currentWorkingDate ? this.getDateComponents(this.bankDateObj.currentWorkingDate) : CommonUtilities.getServerDateComponent();
            var currDate = formatUtilManager.getDateObjectFromDateComponents(currDateComponent);
            if (formData.fromAccount.accountID === formData.toAccount.accountID) {
                this.showFieldError("i18n.transfers.error.cannotTransferToSame");
                return false;
            } else if (formData.frequency !== 'Once' && formData.endOnDateComponent !== null) {
                if (endOnDate.getTime() < currDate.getTime()) {
                    this.showFieldError("i18n.transfers.errors.invalidEndOnDate");
                    this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                    return false;
                }
                if (endOnDate.getTime() === sendOnDate.getTime()) {
                    this.showFieldError("i18n.transfers.errors.sameEndDate");
                    this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                    return false;
                }
                if (endOnDate.getTime() < sendOnDate.getTime()) {
                    this.showFieldError("i18n.transfers.errors.beforeEndDate");
                    this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                    return false;
                }
            }
            this.view.tbxNoOfRecurrences.skin = ViewConstants.SKINS.TRANSFERS_TEXTBOX_NOERROR;
            this.view.calEndingOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.calSendOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.hideFieldError();
            return true;
        },
        showNewBenficiaryUI: function() {
            this.view.flxBeneficiaryBank.setVisibility(true);
            this.view.BtnLookup.setVisibility(true);
            if (this.isModify) {
                this.view.BtnLookup.setVisibility(false);
            }
        },
        resetFormForOneTimePayment: function() {
            this.selectedToAccount = '';
            this.selectedToAccount.nickName = this.view.txtTransferTo.text;
            if (oneTimeSameBank !== true) {
                this.view.lblBankRadioBtn01.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                this.view.lblBankRadioBtn01.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                this.view.lblBankRadioBtn02.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
                this.view.lblBankRadioBtn02.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            } else {
                this.view.lblBankRadioBtn01.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                this.view.lblBankRadioBtn01.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.lblBankRadioBtn02.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
                this.view.lblBankRadioBtn02.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                this.view.txtSwift.text = "";
                this.view.txtSwift.placeholder = "";
            }
            FormControllerUtility.enableTextbox(this.view.txtBeneficiaryNickName);
            this.view.lbxFrequency.selectedKey = 'Once';
            this.view.lbxFrequency.setEnabled(false);
            this.view.lblpay.setVisibility(false);
            this.view.lbxpay.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(false);
            this.view.tbxNoOfRecurrences.setVisibility(false);
            this.view.tbxNoOfRecurrences.text = '';
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.flxFeePaidBy.setVisibility(true);
            this.checkShowPaym(false);
        },
        toggleNewBeneficiary: function(flag) {
            if (flag === true) {
                this.showNewBenficiaryUI();
                new_benificiary = true;
                if (!this.isModify) {
                    this.resetFormForOneTimePayment()
                }
            } else {
                new_benificiary = false;
                this.view.flxBeneficiaryBank.setVisibility(false);
                this.view.BtnLookup.setVisibility(false);
                this.view.segTransferTo.setVisibility(true);
                this.view.flxNoResultsTo.setVisibility(false);
                this.view.lbxFrequency.setEnabled(true);
            }
            this.checkValidityMakeFastTransferForm();
        },
        showFieldError: function(errorKey) {
            this.view.lblWarning.setVisibility(true);
            CommonUtilities.setText(this.view.lblWarning, kony.i18n.getLocalizedString(errorKey), CommonUtilities.getaccessibilityConfig());
        },
        isCutOffFlow: function() {
            return this.view.flxPaymemtsCutOff.isVisible === true;
        },
        /**
         * Method to send transaction data to confirmation page
         */
        submitTransfersForm: function() {
            if (this.validateData()) {
                var data = this.getFormDetails();
                data.paymentMethod = this.getPaymentMethod(data.toAccount);
                if (isOwnAccountsFlow && data.toAccount.accountType === "CreditCard") {
                    this.presenter.showConfirmation(data);
                } else {
                    this.presenter.validateTransfer(data);
                }
            }
        },
        limitLengthAndUpdateIndicator: function(noOfCharacters, widgetLengthIndicatorLabel, textWidget) {
            var self = this;
            var text = (textWidget === this.view.lblCount2) ? " Characters Remaining" : "";
            //var expression = /^[ A-Za-z0-9.?:+/()]*$/;
            var expression = /^[ A-Za-z0-9.?:+/()\u0600-\u06FF]*$/;
            if (textWidget.text.length <= noOfCharacters && expression.test(textWidget.text)) {
                let num = 140 - textWidget.text.length;
                self.view.flxRef.accessibilityConfig = {
                    "a11yLabel": "used " + textWidget.text.length + " of 140",
                    "a11yARIA": {
                        "tabindex": -1,
                        "aria-live": "polite",
                    }
                }
            } else {
                //textWidget.text = textWidget.text.replace(/[^a-zA-Z0-9.?:/()+ ]/g, "");
                textWidget.text = textWidget.text.replace(/[^a-zA-Z0-9.?:/()+ \u0600-\u06FF]/g, "");

            }
            this.view.lblCount1.text = 140 - this.view.txtPaymentReference.text.length + ""
        },
        getPaymentMedium: function(toAccount, frequency) {
            if (this.isCutOffFlow() && this.cutOffFlow === "choice" && this.view.lblradioButton1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                return kony.i18n.getLocalizedString("i18n.TransfersEur.InstantPayment")
            } else {
                if (toAccount && toAccount.isInternationalAccount === "false" && toAccount.isSameBankAccount === "false" && frequency === "Once") {
                    return this.view.lblRadioBtn4.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO ? kony.i18n.getLocalizedString("i18n.TransfersEur.InstantPayment") : kony.i18n.getLocalizedString("i18n.TransfersEur.NormalPayment");
                } else {
                    // Always falling back to Instant payment. 
                    return kony.i18n.getLocalizedString("i18n.TransfersEur.InstantPayment");
                }
            }
        },
        /**
         * Method to get Payment Method value
         * @param {Object} toAccount contains to Account details
         */
        getPaymentMethod: function(toAccount) {
            if (isOwnAccountsFlow) return "Within Bank";
            if (toAccount) {
                if (toAccount.isInternationalAccount === "false" && toAccount.isSameBankAccount === "false") {
                    return "Domestic";
                } else if (toAccount.isInternationalAccount === "true") {
                    return "International";
                } else {
                    return "Within Bank";
                }
            }
        },
        onClickRadioButtonPaymentCutoff: function(radioButton) {
            var self = this;
            var selectedButton;
            var allRadioButtions = ["lblradioButton1", "lblradioButton2"];
            if (radioButton && radioButton.widgets()) {
                selectedButton = radioButton.widgets()[0].id;
            } else {
                return;
            }
            var selectRadioButton = function(button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            }
            var unSelectRadioButton = function(button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
            }
            allRadioButtions.forEach(function(button) {
                if (button === selectedButton) {
                    selectRadioButton(button);
                } else {
                    unSelectRadioButton(button);
                }
            });
        },
        getNextWorkingDay: function() {
            return applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(this.bankDate.nextWorkingDate, "yyyy-mm-dd").format("d/m/yy");
        },
        getSendOnDate: function() {
            if (this.isCutOffFlow() && (this.cutOffFlow === "nextday" || this.view.lblradioButton2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO)) {
                return this.getNextWorkingDay();
            } else {
                return this.view.calSendOnNew.formattedDate;
            }
        },
        getServiceName: function(isOneTimePayment, isOwnAccountsFlow, isInternationalAccount, isSameBankAccount) {
            if (isOwnAccountsFlow) {
                return "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE"
            }
            if (isSameBankAccount === "true") {
                return "INTRA_BANK_FUND_TRANSFER_CREATE"
            }
            if (isInternationalAccount === "true") {
                return "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE"
            }
            return "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
        },
        getFormDetails: function() {
            var formDetails = {};
            var fileAttachments = uploadedAttachments.toString();
            if (this.selectedToAccount) {
                formDetails.toAccount = this.getToAccount(this.selectedToAccount.accountNumber || this.selectedToAccount.accountID);
            } else if (preSelectAccountTo) {
                formDetails.toAccount = preSelectAccountTo;
            } else {
                formDetails.toAccount = ({
                    nickName: this.view.txtBeneficiaryNickName.text.trim(),
                    accountNumber: this.view.txtAccountNumber.text.trim(),
                    accountType: "Savings",
                    beneficiaryName: this.view.txtTransferTo.text.trim(),
                    swiftCode: this.view.txtSwift.text,
                    IBAN: this.view.txtAccountNumber.text.trim(),
                    currencyCode: this.view.lbxCurrency.selectedKey,
                    bankCountry: bank_country,
                    bankName: bank_name
                });
                if (this.view.lblBankRadioBtn01.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                    formDetails.toAccount["isSameBankAccount"] = "true";
                    formDetails.toAccount["isInternationalAccount"] = "false";
                } else {
                    formDetails.toAccount["isSameBankAccount"] = isSameBankAccount;
                    formDetails.toAccount["isInternationalAccount"] = isInternationalAccount;
                }
            }
            if (this.selectedFromAccount) {
                formDetails.fromAccount = this.getFromAccount(this.selectedFromAccount.accountID);
            } else if (preSelectAccountFrom) {
                formDetails.fromAccount = preSelectAccountFrom;
            }
            formDetails.accountNumber = this.view.txtAccountNumber.text.trim();
            formDetails.swiftCode = this.view.txtSwift.text;
            formDetails.currency = this.view.lbxCurrency.selectedKey;
            formDetails.amount = this.deFormatAmount(this.view.txtAmount.text);
            formDetails.frequency = this.view.lbxFrequency.selectedKey;
            formDetails.addressLine1 = this.view.txtAddressLine01.text.trim();
            formDetails.addressLine2 = this.view.txtAddressLine02.text.trim();
            formDetails.supportedDocuments = filesToBeUploaded;
            formDetails.supportedDocumentObjects = fileAttachments;
            formDetails.deletedDocuments = deletedAttachments.toString();
            formDetails.oneTimeSameBank = oneTimeSameBank;
            formDetails.paymentMedium = this.getPaymentMedium(formDetails.toAccount, formDetails.frequency);
            formDetails.city = this.view.txtCity.text.trim();
            if (isOwnAccountsFlow && formDetails.toAccount && (formDetails.toAccount.accountType === "Loan" || formDetails.toAccount.accountType === "CreditCard")) {
                formDetails.sendOnDate = this.view.calSendOnLoans.formattedDate;
                formDetails.paymentType = paymentType;
                formDetails.accountDetails = this.accountDetails;
            } else {
                formDetails.sendOnDate = this.getSendOnDate();
            }
            formDetails.sendOnDateComponent = this.view.calSendOnNew.dateComponents;
            formDetails.EndingVisbility = this.view.lbxFrequency.selectedKey !== "Once" ? true : false;
            formDetails.EndingOnDate = this.view.calEndingOnNew.formattedDate;
            formDetails.paymentReference = this.view.txtPaymentReference.text.trim();
            formDetails.postCode = this.view.txtPostCode.text.trim();
            formDetails.country = this.view.txtCountry.text.trim();
            formDetails.endOnDate = this.view.calEndingOnNew.formattedDate;
            formDetails.endOnDateComponent = this.view.calEndingOnNew.dateComponents;
            formDetails.isEditMode = editMode;
            formDetails.isScheduled = scheduledMode;
            formDetails.isInternational = isInternationalAccount;
            formDetails.isOwnAccount = isOwnAccountsFlow;
            formDetails.oneTimePayment = new_benificiary;
            this.view.flxPopup.onKeyPress = this.swiftKeyCallBack;
            formDetails.serviceName = this.getServiceName(new_benificiary, isOwnAccountsFlow, isInternationalAccount, isSameBankAccount);
            //add label paid to data 
            formDetails.isPaidBy = isPaidBy;
            return formDetails;
        },
        /** Manages the search in To Accounts
         * @param  {String} data search string in case of pre-selected accounts
         */
        fetchToAccountsBySearch: function(context, data) {
            if (this.view.txtTransferTo.text === "") {
                this.view.flxCancelFilterTo.setVisibility(false);
            } else {
                this.view.flxCancelFilterTo.setVisibility(true);
            }
            var searchString = this.view.txtTransferTo.text;
            if (data) {
                searchString = data;
            }
            if (this.view.segTransferFrom.selectedRowItems.length) {
                var accountId = this.view.segTransferFrom.selectedRowItems[0].accountID;
            }
            this.view.flxToSegment.setVisibility(true);
            this.showOrHideClearToAccBtn(true);
        },
        resetTransfersForm: function() {
            // Resetting From 
            if (!this.view.flxFromSegment.isVisible) {
                this.view.lblSelectAccount.setVisibility(false);
                this.view.flxFrom.accessibilityConfig = {
                    "a11yLabel": "Select the From account",
                    a11yARIA: {
                        "tabindex": -1,
                    }
                };
                this.view.txtTransferFrom.setVisibility(true);
                this.view.txtTransferFrom.text = "";
                this.view.txtBeneficiaryNickName.text = "";
            }
            //Resetting TO
            this.view.flxToSegment.setVisibility(false);
            this.showOrHideClearToAccBtn(false);
            this.view.txtTransferTo.setVisibility(true);
            this.view.lblSelectAccountTo.setVisibility(false);
            this.view.flxTo.accessibilityConfig = {
                "a11yLabel": "Select the To account",
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.txtTransferTo.text = "";
            // Resetting All fields
            this.view.lbxFrequency.masterData = this.getFrequencies();
            this.view.txtAccountNumber.text = "";
            this.view.lblWarning.setVisibility(false);
            this.view.txtSwift.text = "";
            FormControllerUtility.disableTextbox(this.view.txtAccountNumber);
            FormControllerUtility.enableTextbox(this.view.txtSwift);
            this.view.flxAttachmentUploadError.setVisibility(false);
            this.view.lbxFrequency.masterData = this.getFrequencies();
            this.view.lbxFrequency.selectedKey = this.view.lbxFrequency.masterData[0][0];
            this.view.lbxCurrency.masterData = this.onCurrencyChange();
            this.view.lbxCurrency.selectedKey = this.view.lbxCurrency.masterData[0][0];
            this.view.tbxNoOfRecurrences.text = "";
            this.view.txtPaymentReference.text = "";
            this.view.lblCount1.text = "140";
            this.view.txtAmount.text = "";
            this.view.txtAddressLine01.text = "";
            this.view.txtAddressLine02.text = "";
            this.view.txtCity.text = "";
            this.view.txtPostCode.text = "";
            this.view.txtCountry.text = "";
            this.view.calEndingOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.calSendOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            FormControllerUtility.enableTextbox(this.view.txtAmount);
            filesToBeUploaded = [];
            uploadedAttachments = [];
            attachments = [];
            this.setAttachmentsDataToSegment();
            this.hideTransferError();
            this.checkValidityMakeFastTransferForm();
            this.onFrequencyChanged();
            //put the default value to fees paid by
            this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
            this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
            this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
            this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
            this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
            this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
        },
        /**
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function() {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var numbersSet = "0123456789";
            scopeObj.view.txtTransferFrom.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.txtTransferTo.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.txtAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
            scopeObj.view.txtBankName.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.txtCity1.restrictCharactersSet = specialCharactersSet + numbersSet;
            scopeObj.view.txtCountry1.restrictCharactersSet = specialCharactersSet + numbersSet;
        },
        hideFieldError: function() {
            this.view.lblWarning.setVisibility(false);
        },
        checkValidityMakeFastTransferForm: function() {
            var formData = this.getFormDetails();
            //On any field change we turn off payment cut off flex
            this.hidePaymentCutOff();
            if (formData.amount === null || formData.amount === "" || formData.amount === "NaN" || formData.amount === undefined) {
                CommonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (!this.selectedFromAccount && !preSelectAccountFrom) {
                CommonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (!this.selectedToAccount && !preSelectAccountTo && this.view.txtTransferTo.text === "") {
                CommonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (!isOwnAccountsFlow) {
                if (formData.accountNumber.trim().length === 0) {
                    CommonUtilities.disableButton(this.view.btnConfirm);
                    return;
                }
                if (formData.isInternational === "true" && formData.swiftCode.trim().length === 0) {
                    CommonUtilities.disableButton(this.view.btnConfirm);
                    return;
                }
            }
            var selected = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            if (this.view.flxFeePaidBy.isVisible && (this.view.lblRadioBtn1.text !== selected && this.view.lblRadioBtn2.text !== selected && this.view.lblRadioBtn3.text !== selected)) {
                this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
                this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
                this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
                CommonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            CommonUtilities.enableButton(this.view.btnConfirm);
            this.hideFieldError();
            this.view.forceLayout();
        },
        formatAmount: function(amount) {
            if (amount === undefined || amount === null) return;
            return applicationManager.getFormatUtilManager().formatAmount(amount);
        },
        deFormatAmount: function(amount) {
            if (amount === undefined || amount === null) {
                return;
            }
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        getFromAccount: function(accountID) {
            return fromAccounts.filter(function(account) {
                return account.accountID === accountID
            })[0];
        },
        getToAccount: function(accountNumber, searchByAccountNumber) {
            if (isOwnAccountsFlow) {
                return fromAccounts.filter(function(account) {
                    return account.accountID === accountNumber
                })[0];
            } else {
                return toAccounts.filter(function(account) {
                    if (searchByAccountNumber) {
                        return account.accountNumber === accountNumber
                    } else {
                        return account.Id === accountNumber
                    }
                })[0];
            }
        },
        onKeyUpFrom: function(textWidget) {
            fromAccountSaerchTerm = textWidget.text.toLowerCase();
            if (keyCharCode === 27) {
                this.view.flxFromSegment.setVisibility(false);
                this.showOrHideClearFromAccBtn(false);
                return;
            }
            this.view.flxFromSegment.setVisibility(true);
            this.showOrHideClearFromAccBtn(true);
            this.view.flxToSegment.setVisibility(false);
            this.showOrHideClearToAccBtn(false);
            this.showFromAccounts();
            this.view.forceLayout();
        },
        closeFromSegmentDropDown: function(params) {
            this.view.flxFromSegment.setVisibility(false);
            this.view.txtTransferFrom.setVisibility(false);
            params[1].preventDefault();
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            this.view.flxFrom.setActive(true);
        },
        closeToSegmentDropDown: function(params) {
            this.view.flxToSegment.setVisibility(false);
            this.view.txtTransferTo.setVisibility(false);
            params[1].preventDefault();
            this.view.flxTo.accessibilityConfig = {
                "a11yLabel": "Select the To account",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            this.view.flxTo.setActive(true);
        },
        onKeyUpTo: function(textWidget) {
            toAccountSearchTerm = textWidget.text.toLowerCase();
            if (textWidget.text === "" || textWidget.text === this.view.txtTransferTo.text) {
                this.selectedToAccount = null;
                preSelectAccountTo = null;
                this.view.txtAccountNumber.text = "";
                this.view.txtSwift.text = "";
                this.view.txtBeneficiaryNickName.text = "";
                this.view.txtAddressLine01.text = "";
                this.view.txtAddressLine02.text = "";
                this.view.txtCity.text = "";
                this.view.txtPostCode.text = "";
                this.view.txtCountry.text = "";
                this.view.lblNew.setVisibility(true);
                this.toggleNewBeneficiary(false);
                FormControllerUtility.enableTextbox(this.view.txtAccountNumber);
                FormControllerUtility.enableTextbox(this.view.txtSwift);
                FormControllerUtility.enableTextbox(this.view.txtBeneficiaryNickName);
                FormControllerUtility.enableTextbox(this.view.txtAddressLine01);
                FormControllerUtility.enableTextbox(this.view.txtCity);
                FormControllerUtility.enableTextbox(this.view.txtPostCode);
                FormControllerUtility.enableTextbox(this.view.txtCountry);
                FormControllerUtility.enableTextbox(this.view.txtAddressLine02);
                this.checkValidityMakeFastTransferForm();
            }
            if (keyCharCode === 27) {
                this.view.flxToSegment.setVisibility(false);
                this.showOrHideClearToAccBtn(false);
                return;
            } else {
                this.view.flxToSegment.setVisibility(true);
                this.showOrHideClearToAccBtn(true);
                this.view.flxFromSegment.setVisibility(false);
                this.showOrHideClearFromAccBtn(false);
                this.view.forceLayout();
            }
            this.showToAccounts(toAccountSearchTerm);
        },
        /**call when frequency is changed in make transfer form - Resets the UI
         */
        onFrequencyChanged: function(resetCalendar) {
            this.getFrequencyAndFastTransferFormLayout(this.view.lbxFrequency.selectedKey);
            this.checkValidityMakeFastTransferForm();
            this.checkPaymentMedium();
            if (resetCalendar) this.resetCalendarForFrequency(this.view.lbxFrequency.selectedKey);
        },
        /**Call Back when for how long listbox value is changed - Resets UI based on selection
         */
        onHowLongChange: function() {
            this.getForHowLongandFormLayout(this.view.lbxpay.selectedKey);
            this.checkValidityMakeFastTransferForm();
        },
        /** sets the Frequency with i18 value
         */
        onCurrencyChange: function() {
            var list = [];
            for (var key in currency) {
                if (currency.hasOwnProperty(key)) {
                    list.push([key, currency[key]]);
                }
            }
            return list;
        },
        /** sets the Frequency with i18 value
         */
        getFrequencies: function() {
            var list = [];
            for (var key in frequencies) {
                if (frequencies.hasOwnProperty(key)) {
                    list.push([key, kony.i18n.getLocalizedString(frequencies[key])]);
                }
            }
            return list;
        },
        /** sets the duration of the transaction with i18 value
         */
        getForHowLong: function() {
            var list = []
            for (var key in forHowLong) {
                if (forHowLong.hasOwnProperty(key)) {
                    list.push([key, kony.i18n.getLocalizedString(forHowLong[key])]);
                }
            }
            return list;
        },
        getFrequencyAndFastTransferFormLayout: function(frequencyValue) {
            if (frequencyValue !== "Once") {
                this.makeLayoutfrequencyWeeklyDate();
            } else {
                this.makeLayoutfrequencyOnce();
            }
        },
        makeLayoutfrequencyWeeklyDate: function() {
            this.view.lblpay.setVisibility(true);
            this.view.lbxpay.setVisibility(true);
            this.view.lblNoOfRecOrEndingOn.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(true);
        },
        makeLayoutfrequencyOnce: function() {
            this.view.lblpay.setVisibility(false);
            this.view.lbxpay.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(false);
            this.view.flxCalEndingOn.setVisibility(false);
        },
        getForHowLongandFormLayout: function(value) {
            if (value === "ON_SPECIFIC_DATE") {
                this.makeLayoutfrequencySpecificDate();
            } else if (value === "NO_OF_RECURRENCES") {
                this.makeLayoutfrequencyWeeklyRecurrences();
            }
        },
        makeLayoutfrequencySpecificDate: function() {
            this.view.lblNoOfRecOrEndingOn.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(true);
            CommonUtilities.setText(this.view.lblNoOfRecOrEndingOn, kony.i18n.getLocalizedString("i18n.transfers.end_date"), CommonUtilities.getaccessibilityConfig());
            this.view.tbxNoOfRecurrences.setVisibility(false);
        },
        makeLayoutfrequencyWeeklyRecurrences: function() {
            this.view.lblNoOfRecOrEndingOn.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.tbxNoOfRecurrences.setVisibility(true);
            CommonUtilities.setText(this.view.lblNoOfRecOrEndingOn, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"), CommonUtilities.getaccessibilityConfig());
        },
        /**
         * Method to set the position of calendar widgets
         */
        renderCalendars: function() {
            var context1 = {
                "widget": this.view.flxCalSendOn,
                "anchor": "bottom"
            };
            this.view.calSendOnNew.setContext(context1);
            var context2 = {
                "widget": this.view.flxCalEndingOn,
                "anchor": "bottom"
            };
            this.view.calEndingOnNew.setContext(context2);
            var context3 = {
                "widget": this.view.flxCalLoans,
                "anchor": "bottom"
            };
            this.view.calSendOnLoans.setContext(context3);
        },
        /** Creates the segment data along with Section Headers
         * @param  {object} toAccounts list of accounts
         * @param  {string} type specifies either from or to accounts
         * @param  {boolean} p2pEnabledStatus specifies whether p2p is enabled or not
         * @param  {boolean} p2pServiceStatus specifies whether the p2p service has failed or not
         */
        segFromAccountRowClick: function() {
            if (!this.accountToIsPreSelectedFlow) {
                this.resetTransfersForm();
            }
            var selectedAccount = this.view.segTransferFrom.selectedRowItems[0];
            this.selectedFromAccount = selectedAccount;
            var accountId = selectedAccount.accountID;
            this.view.lbxCurrency.selectedKey = selectedAccount.currencyCode;
            this.selectFromAccount(selectedAccount);
            preSelectAccountFrom = null;
            let toAccountsList;
            if (isOwnAccountsFlow) {
                let filteredAccounts = fromAccounts.filter(function(account) {
                    /* return CommonUtilities.substituteforIncludeMethod(account.accountName.toLowerCase(), toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.accountID, toAccountSearchTerm) */
			  return CommonUtilities.substituteforIncludeMethod(account.accountName.toLowerCase(), toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.accountID, toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.nickName.toLowerCase(),toAccountSearchTerm)
                })
                filteredAccounts = this.removeFromAccount(filteredAccounts);
                toAccountsList = this.presenter.filterToAccountsByMembershipId(selectedAccount.Membership_id, filteredAccounts);
                toAccountsList = toAccountsList.concat(this.presenter.filterCreditCardAccount("CreditCard", filteredAccounts));
            } else {
                toAccountsList = this.presenter.filterToAccountsByMembershipId(selectedAccount.Membership_id, toAccounts);
            }
            if (toAccountsList.length == 0) {
                let widgetFromData;
                this.view.segTransferTo.setVisibility(false);
                this.view.flxNoResultsTo.setVisibility(true);
                this.view.txtTransferTo.text = "";
                this.view.lblToAmount.setVisibility(false);
                this.view.lblSelectAccountTo.setVisibility(false);
                this.view.flxTo.accessibilityConfig = {
                    "a11yLabel": "Select the To account",
                    a11yARIA: {
                        "tabindex": -1,
                    }
                };
                this.view.txtAccountNumber.text = "";
                this.view.txtSwift.text = "";
            } else {
                this.view.segTransferTo.setVisibility(true);
                this.view.flxNoResultsTo.setVisibility(false);
                if (isOwnAccountsFlow) {
                    widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(toAccountsList, "from") : this.getDataWithSections(toAccountsList, "from");
                    this.view.segTransferTo.setData(widgetFromData);
                } else {
                    widgetFromData = this.mapToAccounts(toAccountsList);
                    this.view.segTransferTo.setData(widgetFromData);
                }
            }
        },
        selectFromAccount: function(selectedAccount) {
            this.selectedFromAccount = selectedAccount;
            this.view.txtTransferFrom.text = selectedAccount.lblAccountName;
            this.view.txtTransferFrom.setVisibility(false);
            this.view.lblSelectAccount.text = selectedAccount.lblAccountName;
            this.view.flxFromSegment.setVisibility(false);
            this.showOrHideClearFromAccBtn(false);
            this.view.lblSelectAccount.setVisibility(true);
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "From (My Account). Currently selected " + this.view.lblSelectAccount.text + ". Click to select another from account",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            };
            this.onFrequencyChanged();
            if (!editMode) this.checkCurrency();
            if (isOwnAccountsFlow) {
                this.showToAccounts();
            }
            this.view.flxFrom.setActive(true);
        },
        segToAccountRowClick: function() {
            var selectedAccount = this.view.segTransferTo.selectedRowItems[0];
            this.selectedToAccount = selectedAccount;
            isSameBankAccount = selectedAccount.isSameBankAccount;
            isInternationalAccount = selectedAccount.isInternational
            this.toggleNewBeneficiary(false);
            this.selectToAccount(selectedAccount);
            this.view.flxCancelFilterTo.setVisibility(false);
            this.view.lblNew.setVisibility(false);
            this.accountToIsPreSelectedFlow = false;
            if (!selectedAccount.hasOwnProperty("accountID")) {
                if (isSameBankAccount === "true") {
                    this.presenter.getBeneficiaryName(selectedAccount.ExternalAccountNumber, this.view.id);
                }
            }
            this.view.flxTo.setActive(true);
        },
        selectToAccount: function(selectedAccount) {
            this.view.txtTransferTo.text = selectedAccount.lblAccountName;
            this.view.txtTransferTo.setVisibility(false);
            this.view.lblSelectAccountTo.text = selectedAccount.lblAccountName;
            this.view.flxToSegment.setVisibility(false);
            this.showOrHideClearToAccBtn(false);
            this.view.lblSelectAccountTo.setVisibility(true);
            this.view.flxTo.accessibilityConfig = {
                "a11yLabel": "Beneficiary's name. Currently selected " + this.view.lblSelectAccountTo.text + ". Click to select another beneficiary",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            };
            this.view.txtAccountNumber.text = selectedAccount.ExternalAccountNumber || "";
            this.view.txtAddressLine01.text = selectedAccount.addressLine1 || "";
            this.view.txtAddressLine02.text = selectedAccount.addressLine2 || "";
            this.view.txtCity.text = selectedAccount.city || "";
            this.view.txtPostCode.text = selectedAccount.zipcode || "";
            this.view.txtCountry.text = selectedAccount.country || "";
            this.view.txtSwift.text = selectedAccount.swiftCode || "";
            FormControllerUtility.disableTextbox(this.view.txtAccountNumber);
            FormControllerUtility.disableTextbox(this.view.txtSwift);
            FormControllerUtility.disableTextbox(this.view.txtBeneficiaryNickName);
            FormControllerUtility.disableTextbox(this.view.txtAddressLine01);
            FormControllerUtility.disableTextbox(this.view.txtCity);
            FormControllerUtility.disableTextbox(this.view.txtPostCode);
            FormControllerUtility.disableTextbox(this.view.txtCountry);
            FormControllerUtility.disableTextbox(this.view.txtAddressLine02);
            this.view.txtBeneficiaryNickName.text = selectedAccount.nickName || "";
            this.view.lblCount2.setVisibility(false);
            this.prevPayeeId = selectedAccount.Id || selectedAccount.accountNumber;
            if (selectedAccount.isInternational !== undefined) this.checkShowPaym(selectedAccount.isInternational === "false");
            this.onFrequencyChanged();
            this.checkPaymentMedium();
            this.checkCurrency();
            if (isOwnAccountsFlow) {
                this.showFromAccounts();
                var selectedAccountObject = this.getToAccount(selectedAccount.accountID)
                if (selectedAccountObject.accountType === "Loan") {
                    this.hideCreditCardView();
                    this.showLoanView(selectedAccountObject);
                    this.presenter.fetchAmountDueBalance(selectedAccount);
                } else if (selectedAccountObject.accountType === "CreditCard") {
                    this.hideLoanView();
                    this.showCreditCardView(selectedAccountObject);
                } else {
                    this.hideLoanView();
                    this.hideCreditCardView();
                    FormControllerUtility.enableTextbox(this.view.txtAmount);
                }
            } else {
                this.hideLoanView();
                this.hideCreditCardView();
                FormControllerUtility.enableTextbox(this.view.txtAmount);
            }
            this.checkValidityMakeFastTransferForm();
            this.view.flxTo.setActive(true);
        },
        checkPaymentMedium: function() {
            var formData = this.getFormDetails();
            if (new_benificiary) {
                if (isInternationalAccount === "false" && isSameBankAccount === "false" && formData.frequency === "Once") {
                    this.view.flxPaymentMedium.setVisibility(true);
                    this.checkShowPaym(true);
                } else {
                    this.view.flxPaymentMedium.setVisibility(false);
                }
                return;
            }
            if (formData.toAccount && formData.toAccount.isInternationalAccount === "false" && formData.toAccount.isSameBankAccount === "false" && formData.frequency === "Once") {
                this.view.flxPaymentMedium.setVisibility(true);
                this.view.flxFeePaidBy.setVisibility(true);
            } else {
                this.view.flxPaymentMedium.setVisibility(false);
            }
        },
        showLoanView: function(selectedAccount) {
            this.view.flxLoan.setVisibility(true);
            this.view.lblSendOnLoans.setVisibility(true);
            this.view.flxCalLoans.setVisibility(true);
            this.view.lblFrequency.setVisibility(false);
            this.view.flxContainer5.setVisibility(false);
            this.view.lbxFrequency.setVisibility(false);
            this.view.lbxFrequency.selectedKey = "Once";
            this.view.flxWrapRadio3.onClick = this.onClickRadioButtonLoan.bind(this, this.onRadioLoanListener.bind(this, selectedAccount));
            this.view.flxWrapRadio4.onClick = this.onClickRadioButtonLoan.bind(this, this.onRadioLoanListener.bind(this, selectedAccount));
            if (this.view.lblLoan1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                this.radioButtonOnClick(this.view.lblLoan1, this.view.flxWrapRadio3, this.view.lblRadioLoan1.id);
                this.showDueAmount(selectedAccount);
            } else {
                this.showOtherAmount(selectedAccount);
            }
        },
        hideLoanView: function() {
            this.view.flxLoan.setVisibility(false);
            this.view.lblSendOnLoans.setVisibility(false);
            this.view.flxCalLoans.setVisibility(false);
            this.view.flxContainer5.setVisibility(true);
            this.view.lblFrequency.setVisibility(true);
            this.view.lbxFrequency.setVisibility(true);
            if (this.clearAmount) {
                this.view.txtAmount.text = "";
                this.clearAmount = false;
            }
        },
        showDueAmount: function(selectedAccount) {
            this.clearAmount = true;
            paymentType = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount");
            this.showLoanAccountDetails();
        },
        showOtherAmount: function(selectedAccount) {
            paymentType = kony.i18n.getLocalizedString("i18n.TransfersEur.PayOtherAmount");
            FormControllerUtility.enableTextbox(this.view.txtAmount);
        },
        logoutKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
                self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);

            }
        },
        setFlowActions: function() {
            var scopeObj = this;
            this.view.btnTooltipFeesImg.onClick = function() {
                if (!scopeObj.view.Allforms.isVisible) {
                    scopeObj.view.Allforms.isVisible = true;
                    //scopeObj.view.Allforms.btnCross.setFocus(true);
                    scopeObj.view.Allforms.lblInfo.setActive(true);
                } else {
                    scopeObj.view.Allforms.isVisible = false;
                    scopeObj.view.btnTooltipFeesImg.setFocus(true);
                }
            }
            this.view.Allforms.btnCross.onClick = function() {
                scopeObj.view.Allforms.isVisible = false;
                scopeObj.view.btnTooltipFeesImg.setFocus(true);
            }
        },
        postShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.hideLoanView();
            this.view.flxPaymentMedium.setVisibility(false);
            this.accessibilityFocusSetup();
            this.setFlowActions();
            applicationManager.executeAuthorizationFramework(this);
            this.viewsVisibilityStore = FormControllerUtility.getVisiblityStore([
                this.view.flxLoan,
                this.view.flxCreditCard,
                this.view.flxBeneficiaryBank,
                this.view.lblFrequency,
                this.view.lbxFrequency,
                this.view.flxCalLoans,
                this.view.flxCalEndingOn,
                this.view.flxFeePaidBy,
                this.view.flxPaymentMedium,
                this.view.flxPaymentReference,
                this.view.flxBeneficiaryNickName,
                this.view.flxAddress,
                this.view.flxAddress,
                this.view.flxAttachments,
                this.view.flxPaymemtsCutOff
            ])
            var scopeObj = this;
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scopeObj.view.lblTransfers.setActive(true);
            };
            document.addEventListener('keydown', function(event) {
                var self = scopeObj;
                keyCharCode = event.which;
                if (event.which === 27) {
                    if (scopeObj.view.Allforms.isVisible === true || scopeObj.view.flxLogout.isVisible === true) {
                        if (scopeObj.view.Allforms.isVisible === true) {
                            scopeObj.view.btnTooltipFeesImg.setFocus(true);
                        }
                        scopeObj.view.Allforms.setVisibility(false);
                        // scopeObj.view.btnTooltipFeesImg.setFocus(true);
                        scopeObj.view.flxLogout.setVisibility(false);
                        scopeObj.view.flxDialogs.setVisibility(false);
                        scopeObj.hidePopups();
                    } else {
                        scopeObj.hidePopups();
                    }
                }
            });
            this.view.flxAttachmentsList.setVisibility(false);
            this.setAccessibility();
            this.view.Allforms.onKeyPress = this.onKeyPressCallBack;
            this.view.Allforms.btnCross.onKeyPress = this.btnKeyPressCallBack;
            this.view.Allforms.lblInfo.onKeyPress = this.lblKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.logoutKeyPressCallBack;
            //this.view.flxFrom.onKeyPress = this.fromKeyPressCallBack;
           // this.view.flxTo.onKeyPress = this.toKeyPressCallBack;
            this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
            this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
            this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
            this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
            this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
            this.radioButtonOnClick(this.view.lblRadioBtn4, this.view.flxWrapRadio1, this.view.lblInstantPayment.id);
            this.radioButtonOnClick(this.view.lblRadioBtn5, this.view.flxWrapRadio2, this.view.lblNormalPayment.id);
            this.radioButtonOnClick(this.view.lblLoan1, this.view.flxWrapRadio3, this.view.lblRadioLoan1.id);
            this.radioButtonOnClick(this.view.lblLoan2, this.view.flxWrapRadio4, this.view.lblRadioLoan2.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn1, this.view.flxWrapRadio5, this.view.lblMinimumDue.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn2, this.view.flxWrapRadio6, this.view.lblStatementDue.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn3, this.view.flxWrapRadio7, this.view.lblOutstandingBalance.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn4, this.view.flxWrapRadio8, this.view.lblPayOtherAmount.id);
        },
        fromKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    this.view.flxFromSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    //this.view.btnByPass.isVisible ? this.view.btnByPass.setActive(true) : this.view.lblTransfers.setActive(true);
                }
            }
        },
        toKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    this.view.flxToSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    this.view.flxFrom.setActive(true);
                }
            }
        },
        btnKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (self.view.Allforms.isVisible === true) {
                    self.view.Allforms.setVisibility(false);
                    eventPayload.preventDefault();
                    self.view.btnTooltipFeesImg.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (self.view.Allforms.isVisible === true) {
                        eventPayload.preventDefault();
                        self.view.Allforms.lblInfo.setActive(true);
                    }
                }
            }
        },
        lblKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                if (self.view.Allforms.isVisible === true) {
                    self.view.Allforms.setVisibility(false);
                    eventPayload.preventDefault();
                    self.view.btnTooltipFeesImg.setActive(true);
                }
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.Allforms.isVisible === true) {
                    self.view.Allforms.setVisibility(false);
                    eventPayload.preventDefault();
                    self.view.btnTooltipFeesImg.setActive(true);
                }
            }
        },
        setAccessibility: function() {
            this.view.Allforms.btnCross.accessibilityConfig = {
                "a11yARIA": {
                  "tabindex": 0,
                  "role":"button",
                  "aria-label":"close this info Pop-up"
              }
              };
            this.view.flxRef.accessibilityConfig = {
                "a11yLabel": "used 0 of 140",
                "a11yARIA": {
                    "tabindex": -1,
                }
            }
            this.view.lbxCurrency.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblCurrency",
                }
            };
            this.view.lbxFrequency.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblFrequency",
                }
            };
            this.view.lbxpay.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblpay",
                }
            };
            this.view.flxToSegment.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            };
            this.view.flxFromSegment.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
            };
            this.view.txtTransferTo.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lbTransferTo",
                }
            };
            this.view.txtTransferFrom.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lbTransferFrom",
                }
            };
            this.view.txtAccountNumber.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblAccountNumber",
                }
            };
            this.view.txtSwift.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblSwift",
                }
            };
            this.view.flxMain.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    role: "main",
                }
            };
            this.view.calSendOnNew.accessibilityConfig = {
                a11yARIA: {
                    "aria-required": true,
                    "aria-labelledby": "lblSendOn",
                }
            };
            this.view.calEndingOnNew.accessibilityConfig = {
                a11yARIA: {
                    "aria-required": true,
                    "aria-labelledby": "lblSendOn",
                }
            };
            this.view.txtAmount.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblAmount",
                }
            };
            this.view.txtPaymentReference.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblPaymentReference",
                }
            };
            this.view.txtBeneficiaryNickName.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblBeneficiaryNickName",
                }
            };
            this.view.txtAddressLine02.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblAddressLine02",
                }
            };
            this.view.txtAddressLine01.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblAddressLine01",
                }
            };
            this.view.txtCity.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblCity",
                }
            };
            this.view.txtPostCode.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblPostCode",
                }
            };
            this.view.txtCountry.accessibilityConfig = {
                a11yARIA: {
                    "aria-labelledby": "lblCountry",
                }
            };
            this.view.flxMakeTransferError.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "role": "status"
                }
            };
            this.view.lblDueDate.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxCutOffWarning.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.imgCutOffWarning.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.rtxCutOffWarning.accessibilityConfig = {
                a11yLabel: "You have reached the payment cut off for today. You can only schedule a payment from the next banking day.",
                a11yARIA: {
                    "tabindex": -1,
                }
            }
            this.view.lblWarning.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                    "role": "alert"
                }
            };
            this.view.lblSelectAccount.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblTransfers.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lbTransferFrom.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lbTransferTo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblpay.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNoOfRecOrEndingOn.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblAmount.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCurrency.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSwift.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblAccountNumber.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSelectAccountTo.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblFrequency.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSendOn.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblFeesPaidBy.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblByMe.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.btnTooltipFeesImg.accessibilityConfig = {
                a11yLabel: "Read more information about fees paid by",
                a11yARIA: {}
            };
            this.view.btnPaymentActivities.accessibilityConfig = {                
                "a11yARIA": {
                    "role":"link"
                }
            };
            this.view.lblByBeneficiary.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn3.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblByBoth.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblPaymentMedium.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn4.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblInstantPayment.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn5.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNormalPayment.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCount1.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1,
                    "aria-hidden": true
                }
            };
            this.view.lblRadioBtn4.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblPaymentReference.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBeneficiaryNickName.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBeneficiaryAddress.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblAddressLine01.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblAddressLine02.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCity.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblPostCode.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCountry.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSwift.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNew.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn2.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn3.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSameBank.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblOtherBank.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblPaymentMedium.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblInstantPayment.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNormalPayment.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn4.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioBtn5.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblPaymentType.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblLoan1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioLoan1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblLoan2.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblRadioLoan2.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBeneficiaryBank.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSendOnLoans.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxGroupRadioLoanPay.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            };
            this.view.flxPaymentMediumOptions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            };
            this.view.flxPaidByOptions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            };
            this.view.flxCreditCardPaymentOptions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            };
            this.view.flxBeneficiaryBankOptions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "radiogroup",
                },
            };
            this.view.flxDueDate.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblDueDateKey.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblDueDateValue.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.imgAddAttachment.accessibilityConfig = {
                a11yHidden: true,
				a11yLabel: "Add Supporting Documents",
                a11yARIA: {
                    "tabindex": -1,
					"aria-labelledby": "lblAddAttachment",
                }
            };
            this.view.flxAddAttachment.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.lblInfo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNote.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNew11.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.txtFeesTextMe.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.txtFeesTextBen.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.txtFeesShared.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.txtFeesTextShared.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.Allforms.txtFeesTextShared2.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxTo.accessibilityConfig = {
                "a11yLabel": "Select the To account",
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNoResultsTo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSendMoneyToNewRecipientTo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNoResultsFrom.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblOpenNewAccounttFrom.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxWrapImage.accessibilityConfig = {
                a11yLabel: "Attach documents",
                a11yARIA: {
                    role: "button",
                }
            };
            this.view.lblBankRadioBtn01.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBankRadioBtn02.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.imgAttachmentUploadError.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblradioButton1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblradioButton2.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblInstantPayment1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblInstantPayment2.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBankingDay1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBankingDay2.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.CopylblNote0a433caed42d04f.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxPaymentCutOffNote.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCutOff.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.imgCutOff.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxCutOff1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.NoAccounts.lblHeader.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.NoAccounts.flxMessage.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.NoAccounts.imgError.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.NoAccounts.txtMessage.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.NoAccounts.flxButtons.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblHeading.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSwiftText.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBankName.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCity1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCountry1.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblBank.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblSwiftCode.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCountryName.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblCityName.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxNoResults.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNoResults.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxFormContent.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxLookup.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1,
                }
            };
        },
        radioButtonOnClick: function(labelText, parentFlex, ariaText) {
            if (labelText.text === 'M') {
                parentFlex.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": ariaText,
                        "aria-checked": true,
                    },
                }
            } else if (labelText.text === 'L') {
                parentFlex.accessibilityConfig = {
                    a11yARIA: {
                        "role": "radio",
                        "aria-labelledby": ariaText,
                        "aria-checked": false,
                    },
                }
            }
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtTransferFrom, this.view.flxFrom],
                [this.view.txtTransferTo, this.view.flxTo]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        checkCurrency: function() {
            var formDetails = this.getFormDetails();
            var toAccountDetails = formDetails.toAccount;
            var fromAccountDetails = formDetails.fromAccount;
            if (!fromAccountDetails || !toAccountDetails) {
                this.enableCurrency();
                return;
            }
            if (isOwnAccountsFlow || (isSameBankAccount === "true")) {
                var toCurrencyCode = (isSameBankAccount === "true") ? sameBankAccountCurrencyCode : toAccountDetails.currencyCode;
                if (toCurrencyCode === fromAccountDetails.currencyCode) {
                    this.view.lbxCurrency.selectedKey = fromAccountDetails.currencyCode;
                    this.view.lbxCurrency.setEnabled(false);
                } else {
                    if ((!kony.sdk.isNullOrUndefined(toCurrencyCode) && toCurrencyCode !== "") && (!kony.sdk.isNullOrUndefined(fromAccountDetails.currencyCode) && fromAccountDetails.currencyCode !== "")) {
                        let list = [];
                        list.push([fromAccountDetails.currencyCode, currency[fromAccountDetails.currencyCode]]);
                        list.push([toCurrencyCode, currency[toCurrencyCode]]);
                        this.view.lbxCurrency.masterData = list;
                        this.view.lbxCurrency.selectedKey = (editMode && transactionCurrency) ? transactionCurrency : fromAccountDetails.currencyCode; //default selection
                        this.view.lbxCurrency.setEnabled(true);
                    }
                }
                return;
            }
            if (new_benificiary) {
                if (isInternationalAccount === "true") {
                    this.enableCurrency();
                    return;
                }
                if (isInternationalAccount === "false") {
                    this.disableAndLockCurrency();
                    return;
                }
            }
            if (toAccountDetails.isSameBankAccount === "false" && toAccountDetails.isInternationalAccount === "false") {
                this.disableAndLockCurrency();
            } else {
                this.enableCurrency();
            }
        },
        checkShowPaym: function(isDomestic) {
            var formData = this.getFormDetails();
            if (formData.toAccount && formData.toAccount.isSameBankAccount === "true") {
                isPaidBy = '';
                this.view.flxFeePaidBy.setVisibility(false);
            } else {
                this.view.flxFeePaidBy.setVisibility(true);
                if (isDomestic) {
                    this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
                    this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
                    this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
                    this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                    isPaidBy = 'SHA';
                    this.view.flxRadioBtn1.setEnabled(false);
                    this.view.flxRadioBtn2.setEnabled(false);
                    this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
                    this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn1.skin = "sknC0C0C020pxNotFontIconsMOD";
                    this.view.lblByMe.skin = "sknlbla0a0a015px";
                    this.view.lblRadioBtn2.skin = "sknC0C0C020pxNotFontIconsMOD";
                    this.view.lblByBeneficiary.skin = "sknlbla0a0a015px";
                } else {
                    this.view.flxRadioBtn1.setEnabled(true);
                    this.view.flxRadioBtn2.setEnabled(true);
                    isPaidBy = '';
                    this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
                    this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
                    this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
                    this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn1.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
                    this.view.lblByMe.skin = "sknLblSSP33333315px";
                    this.view.lblRadioBtn2.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
                    this.view.lblByBeneficiary.skin = "sknLblSSP33333315px";
                }
            }
            this.checkValidityMakeFastTransferForm();
        },
        disableAndLockCurrency: function() {
            this.view.lbxCurrency.selectedKey = 'EUR';
            this.view.lbxCurrency.setEnabled(false);
        },
        enableCurrency: function() {
            this.view.lbxCurrency.masterData = this.onCurrencyChange();
            if (editMode && transactionCurrency) {
                this.view.lbxCurrency.selectedKey = Object.keys(currency).includes(transactionCurrency) ? transactionCurrency : this.view.lbxCurrency.masterData[0][0];
            } else if (this.isModify) {
                this.view.lbxCurrency.selectedKey = modifiedCurrency;
            } else {
                this.view.lbxCurrency.selectedKey = this.view.lbxCurrency.masterData[0][0];
            }
            this.view.lbxCurrency.setEnabled(true);
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.viewsVisibilityStore && this.viewsVisibilityStore.onBreakpointChange();
            this.view.flxContainer4.height = "70dp";
            this.view.flxContainer4.forceLayout();
            this.view.flxContainer4.height = kony.flex.USE_PREFERRED_SIZE;
            this.view.flxContainer4.forceLayout();
        },
        onClickBeneficiaryBankRadioButton: function(radioButton) {
            var RadioBtn1 = this.view.lblBankRadioBtn01;
            var RadioBtn2 = this.view.lblBankRadioBtn02;
            if (radioButton.id === "flxBankOption2") {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.txtAccountNumber.placeholder = "BeneficiaryLocalAccountNumber/IBAN";
                FormControllerUtility.enableTextbox(this.view.txtSwift);
                this.view.txtSwift.text = "";
                this.view.txtSwift.placeholder = kony.i18n.getLocalizedString("i18n.TransfersEur.EnterSWIFTBICCode");
                this.view.BtnLookup.setVisibility(true);
                this.view.flxFeePaidBy.setVisibility(true);
                this.view.lbxCurrency.setEnabled(true);
                oneTimeSameBank = false;
                this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
            } else {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                this.view.txtAccountNumber.placeholder = "BeneficiaryLocalAccountNumber/IBAN";
                FormControllerUtility.disableTextbox(this.view.txtSwift);
                this.view.txtSwift.text = "";
                this.view.txtSwift.placeholder = "";
                this.view.BtnLookup.setVisibility(false);
                this.view.flxFeePaidBy.setVisibility(false);
                this.view.lbxCurrency.setEnabled(false);
                oneTimeSameBank = true;
                isPaidBy = '';
                this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
            }
            this.view.txtAccountNumber.text = "";
            this.normalizeAccountTextbox();
            this.checkValidityMakeFastTransferForm();
            this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
            this.radioButtonOnClick(this.view.lblBankRadioBtn02, this.view.flxBankOption2, this.view.lblOtherBank.id);
        },
        onClickMeRadioButton: function() {
            this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
            this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
            this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
            this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            isPaidBy = 'OUR';
            this.checkValidityMakeFastTransferForm();
        },
        onClickBeneficiaryRadioButton: function() {
            this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
            this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
            this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
            this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            isPaidBy = 'BEN';
            this.checkValidityMakeFastTransferForm();
        },
        onClickShareRadioButton: function() {
            this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
            this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
            this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
            this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            isPaidBy = 'SHA';
            this.checkValidityMakeFastTransferForm();
        },
        // COMMON
        onClickRadioButton: function(radioButton) {
            var self = this;
            var selectedButton;
            var allRadioButtions = ["lblRadioBtn4", "lblRadioBtn5"];
            if (radioButton && radioButton.widgets()) {
                selectedButton = radioButton.widgets()[0].id;
            } else {
                return;
            }
            var selectRadioButton = function(button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
                self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
            }
            var unSelectRadioButton = function(button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
                self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
            }
            allRadioButtions.forEach(function(button) {
                if (button === selectedButton) {
                    selectRadioButton(button);
                } else {
                    unSelectRadioButton(button);
                }
            });
            self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
            self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
        },
        // COMMON
        onClickRadioButtonLoan: function(onChange, radioButton) {
            var self = this;
            var selectedButton;
            var allRadioButtions = ["lblRadioBtn4", "lblRadioBtn5", "lblLoan1", "lblLoan2"];
            if (radioButton && radioButton.widgets()) {
                selectedButton = radioButton.widgets()[0].id;
            } else {
                return;
            }
            var selectRadioButton = function(button) {
                if (onChange) {
                    onChange(button);
                }
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
                self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
                self.radioButtonOnClick(self.view.lblLoan1, self.view.flxWrapRadio3, self.view.lblRadioLoan1.id);
                self.radioButtonOnClick(self.view.lblLoan2, self.view.flxWrapRadio4, self.view.lblRadioLoan2.id);
            }
            var unSelectRadioButton = function(button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
                self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
                self.radioButtonOnClick(self.view.lblLoan1, self.view.flxWrapRadio3, self.view.lblRadioLoan1.id);
                self.radioButtonOnClick(self.view.lblLoan2, self.view.flxWrapRadio4, self.view.lblRadioLoan2.id);
            }
            allRadioButtions.forEach(function(button) {
                if (button === selectedButton) {
                    selectRadioButton(button);
                } else {
                    unSelectRadioButton(button);
                }
            });
            self.radioButtonOnClick(self.view.lblRadioBtn4, self.view.flxWrapRadio1, self.view.lblInstantPayment.id);
            self.radioButtonOnClick(self.view.lblRadioBtn5, self.view.flxWrapRadio2, self.view.lblNormalPayment.id);
            self.radioButtonOnClick(self.view.lblLoan1, self.view.flxWrapRadio3, self.view.lblRadioLoan1.id);
            self.radioButtonOnClick(self.view.lblLoan2, self.view.flxWrapRadio4, self.view.lblRadioLoan2.id);
        },
        /** @alias module:frmMakePaymentController */
        /** updates the present Form based on required function.
         * @param {list} viewModel used to load a view
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.bankDate) {
                this.bankDateObj = viewModel.bankDate;
                this.setBankDate(viewModel.bankDate);
            }
            if (viewModel.fromAccounts) {
                this.showUserAccounts(viewModel);
            }
            if (viewModel.accountDetails) {
                this.accountDetails = viewModel.accountDetails;
                this.showLoanAccountDetails();
            }
            if (viewModel.serverError) {
                this.showTransferError(viewModel.serverError);
            }
            if (viewModel.IBanerror) {
                this.showIbanError();
            }
            if (viewModel.toAccounts) {
                toAccounts = this.sortToAccounts(viewModel.toAccounts)
                this.showToAccounts();
                if (viewModel.context.accountTo) {
                    this.preSelectToAccount(viewModel.context.accountTo);
                }
                if (viewModel.context.modifyTransaction) {
                    this.preSelectToAccount(viewModel.context.modifyTransaction.toAccount.Id);
                }
                if (viewModel.context.editTransaction) {
                    this.preSelectToAccount(viewModel.context.editTransaction.toAccountNumber, viewModel.context.editTransaction.isScheduled, true)
                } else {
                    editMode = false;
                    this.view.flxAttachments.setVisibility(true);
                }
            }
            if (viewModel.OwnAccounts) {
                isOwnAccountsFlow = true;
                isSameBankAccount = "false";
                this.showOwnAccountsPage(viewModel.modifyTransaction);
                if (viewModel.editTransaction) {
                    this.preFillTransactionForm(viewModel.editTransaction);
                } else {
                    editMode = false;
                    this.view.flxAttachments.setVisibility(true);
                }
            }
            if (viewModel.ExternalAccounts) {
                isOwnAccountsFlow = false;
                this.showExternalAccountsPage(viewModel.modifyTransaction);
                if (viewModel.editTransaction) {
                    this.preFillTransactionForm(viewModel.editTransaction);
                } else {
                    editMode = false;
                    this.view.flxAttachments.setVisibility(true);
                }
            }
            if (viewModel.validationSuccess) {
                this.cutOffFlow = null;
                this.presenter.confirmTransferDetails(viewModel);
            }
            if (viewModel.validationFailed) {
                this.cutOffFlow = viewModel.validationFailed.productOverride ? "choice" : "nextday";
                this.showPaymentCutOff();
            }
            if (viewModel.beneficiaryName) {
                this.populateBeneficiaryName(viewModel.beneficiaryName);
            }
            if (viewModel.BICdetails) {
                this.populateBIC(viewModel.BICdetails);
            }
            if (viewModel.transferError) {
                this.showTransferError(viewModel.transferError);
            }
        },
        /**
         * Method to populate Beneficiary name value
         * @param {Object} data object containing BIC value
         */
        populateBeneficiaryName: function(data) {
            var scopeObj = this;
            (this.view.BtnLookup.isVisible) ? scopeObj.view.BtnLookup.setActive(true): scopeObj.view.lbxCurrency.setActive(true);
            if (data.beneficiaryName === "") {
                scopeObj.view.lblWarning.setVisibility(true);
                scopeObj.view.txtTransferTo.text = "";
                scopeObj.view.txtAccountNumber.skin = ViewConstants.SKINS.BORDER;
                sameBankAccountCurrencyCode = "";
                CommonUtilities.setText(scopeObj.view.lblWarning, kony.i18n.getLocalizedString("i18n.TransferEur.inValidAccountNumber"), CommonUtilities.getaccessibilityConfig());
            } else {
                scopeObj.view.lblWarning.setVisibility(false);
                isSameBankAccount = "true";
                sameBankAccountCurrencyCode = data.currency;
                isInternationalAccount = "false"
                this.checkCurrency();
                CommonUtilities.setText(scopeObj.view.txtTransferTo, data.beneficiaryName, CommonUtilities.getaccessibilityConfig());
            }
			scopeObj.view.flxTo.setActive(true);
        },
        populateBIC: function(data) {
            var scopeObj = this;
            CommonUtilities.setText(scopeObj.view.txtSwift, data.bic, CommonUtilities.getaccessibilityConfig());
            bank_name = data.bankName;
            bank_country = data.country;
            FormControllerUtility.disableTextbox(this.view.txtSwift);
            scopeObj.view.BtnLookup.setVisibility(false);
            if (data.sepaMember === undefined || data.sepaMember === "" || data.sepaMember === "Y") {
                isSameBankAccount = "false";
                isInternationalAccount = "false";
                this.checkCurrency();
                this.checkPaymentMedium();
            } else if (data.sepaMember === "N") {
                isSameBankAccount = "false";
                isInternationalAccount = "true";
                this.checkCurrency();
                this.checkPaymentMedium()
            }
        },
        /**
         * Normalize Account Number textbox
         */
        normalizeAccountTextbox: function() {
            var scopeObj = this;
            FormControllerUtility.enableTextbox(scopeObj.view.txtAccountNumber);
            scopeObj.view.lblWarning.setVisibility(false);
            scopeObj.view.flxFormContent.forceLayout();
        },
        showLoanAccountDetails: function() {
            if (this.accountDetails && !this.isModify) {
                var dueAmount = parseFloat(this.accountDetails.nextPaymentAmount ? this.accountDetails.nextPaymentAmount : 0) + parseFloat(this.accountDetails.paymentDue ? this.accountDetails.paymentDue : 0);
                if (dueAmount == "" || dueAmount == null || dueAmount == undefined || dueAmount == 0) {
                    dueAmount = "0.00";
                }
                this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(dueAmount);
                FormControllerUtility.disableTextbox(this.view.txtAmount);
                this.view.lblDueDate.setVisibility(false);
                this.checkValidityMakeFastTransferForm();
            }
            this.isModify = false;
        },
        showUserAccounts: function(viewModel) {
            var modifyTransaction = viewModel.context.modifyTransaction;
            var editTransaction = viewModel.context.editTransaction;
            //From Quick Action
            var accountFrom = viewModel.context.accountFrom;
            var accountTo = null;
            var isScheduled;
            if (modifyTransaction) {
                accountFrom = modifyTransaction.fromAccount.accountID;
                if (isOwnAccountsFlow) {
                    accountTo = modifyTransaction.toAccount.accountID;
                }
            }
            if (editTransaction) {
                accountFrom = editTransaction.fromAccountNumber;
                if (isOwnAccountsFlow) {
                    accountTo = editTransaction.toAccountNumber;
                }
                isScheduled = editTransaction.isScheduled;
            } else {
                editMode = false;
            }
            this.showOwnAccounts(viewModel.fromAccounts, accountFrom, accountTo, isScheduled);
            if (modifyTransaction) {
                this.view.lbxCurrency.selectedKey = modifyTransaction.currency;
            }
        },
        sortFromAccounts: function(fromAccounts) {
            var self = this;
            var fromAccountsNew = JSON.parse(JSON.stringify(fromAccounts));
            fromAccountsNew.sort(function compare(a, b) {
                if (self.getFromAccountName(a) < self.getFromAccountName(b)) {
                    return -1;
                }
                if (self.getFromAccountName(b) < self.getFromAccountName(a)) {
                    return 1;
                }
                return 0;
            })
            return fromAccountsNew;
        },
        sortToAccounts: function(toAccounts) {
            var self = this;
            var toAccountsNew = JSON.parse(JSON.stringify(toAccounts));
            toAccountsNew.sort(function compare(a, b) {
                if (self.getToAccountName(a) < self.getToAccountName(b)) {
                    return -1;
                }
                if (self.getToAccountName(b) < self.getToAccountName(a)) {
                    return 1;
                }
                return 0;
            })
            return toAccountsNew;
        },
        showOwnAccounts: function(userAccounts, fromAccountNumber, toAccountNumber, isScheduled) {
            fromAccounts = this.sortFromAccounts(userAccounts);
            if (fromAccountNumber) {
                this.accountFromPreSelected = fromAccounts.filter(x => x.accountID === fromAccountNumber)[0];
            }
            if (isOwnAccountsFlow) {
                this.showFromAccounts(fromAccountNumber);
                this.showToAccounts();
            } else {
                this.showFromAccounts();
            }
            this.preSelectFromAccount(fromAccountNumber);
            this.preSelectToAccount(toAccountNumber, isScheduled);
        },
        showOwnAccountsPage: function(modifyTransaction) {
            var scopeObj = this;
            scopeObj.hidePopups();
            this.view.btnNewPayment.onClick = function() {
                scopeObj.presenter.showTransferScreen({
                    context: "MakePaymentOwnAccounts"
                })
            };
            this.view.btnNewPayment.text = kony.i18n.getLocalizedString("i18n.TransfersEur.NewTransferbetweenAccounts");
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Transfer Between Accounts");
            CommonUtilities.setText(scopeObj.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.hamburger.transfers"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnPaymentActivities, kony.i18n.getLocalizedString("i18n.FastTransfer.TransferActivities"), CommonUtilities.getaccessibilityConfig());
            this.view.btnManageBeneficiaries.setVisibility(false);
            this.view.flxContainer3.setVisibility(false);
            this.view.flxFeePaidBy.setVisibility(false);
            this.view.flxBeneficiaryNickName.setVisibility(false);
            this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
            this.view.lblPaymentReference.text = kony.i18n.getLocalizedString("i18n.TransfersEur.TransferReferenceOptional");
            this.view.txtPaymentReference.placeholder = kony.i18n.getLocalizedString("i18n.TransfersEur.EnterTransferReferenceHere");
            this.view.flxLoan.setVisibility(false);
            this.view.flxCreditCard.setVisibility(false);
            this.view.flxAddress.setVisibility(false);
            this.view.flxAddress1.setVisibility(false);
            this.view.lblSelectAccount.setVisibility(false);
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.flxPaymentMedium.setVisibility(false);
            this.view.lblNew.setVisibility(false);
            this.view.flxBeneficiaryBank.setVisibility(false);
            this.disableAndLockCurrency();
            this.view.lbTransferTo.text = kony.i18n.getLocalizedString("i18n.common.To");
            this.view.txtTransferTo.placeholder = kony.i18n.getLocalizedString("i18n.TransfersEur.SelecttheToaccount");
            this.resetTransfersForm();
            if (modifyTransaction) {
                this.isModify = true;
                this.preFillFromFormData(modifyTransaction);
            } else {
                this.isModify = false;
            }
            this.view.forceLayout();
        },
        showExternalAccountsPage: function(modifyTransaction) {
            var scopeObj = this;
            scopeObj.hidePopups();
            this.view.btnNewPayment.onClick = function() {
                scopeObj.presenter.showTransferScreen({
                    context: "MakePayment"
                })
            };
            this.view.btnNewPayment.text = kony.i18n.getLocalizedString("i18n.TransfersEur.NewPayment");
            this.view.customheadernew.activateMenu("EUROTRANSFERS", "Make a Payment");
            CommonUtilities.setText(scopeObj.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.AccountsDetails.PAYMENTS"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnPaymentActivities, kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentActivities"), CommonUtilities.getaccessibilityConfig());
            this.view.btnManageBeneficiaries.setVisibility(true);
            this.view.flxContainer3.setVisibility(true);
            this.view.flxFeePaidBy.setVisibility(true);
            this.view.flxBeneficiaryNickName.setVisibility(true);
            this.view.flxAddress.setVisibility(true);
            this.view.flxAddress1.setVisibility(true);
            this.view.flxLoan.setVisibility(false);
            this.view.flxCreditCard.setVisibility(false);
            this.view.flxPaymentMedium.setVisibility(true);
            this.view.lblSelectAccount.setVisibility(false);
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": -1,
                }
            };
            this.view.lblNew.setVisibility(false);
            this.view.flxBeneficiaryBank.setVisibility(false);
            this.view.lblPaymentReference.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReferenceOptional");
            this.view.txtPaymentReference.placeholder = kony.i18n.getLocalizedString("i18n.TransfersEur.EnterPaymentReferenceHere");
            this.view.lbTransferTo.text = kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryName");
            this.view.txtTransferTo.placeholder = kony.i18n.getLocalizedString("i18n.TransfersEur.EnterBeneficiaryFullNameHere");
            this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.AccountsDetails.PAYMENTS");
            this.resetTransfersForm();
            if (modifyTransaction) {
                this.isModify = true;
                this.preFillFromFormData(modifyTransaction);
            } else {
                this.isModify = false;
            }
            this.view.forceLayout();
        },
        preFillFromFormData: function(formDetails) {
            this.resetCalendarForFrequency(formDetails.frequency);
            this.view.txtAccountNumber.text = formDetails.accountNumber;
            this.view.txtSwift.text = formDetails.swiftCode;
            FormControllerUtility.disableTextbox(this.view.txtSwift);
            this.view.lbxCurrency.selectedKey = formDetails.currency;
            modifiedCurrency = formDetails.currency;
            this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(formDetails.amount);
            this.view.lbxFrequency.selectedKey = formDetails.frequency
            this.view.calSendOnNew.dateComponents = formDetails.sendOnDateComponent;
            this.view.calEndingOnNew.dateComponents = formDetails.endOnDateComponent;
            this.view.txtPaymentReference.text = formDetails.paymentReference;
            this.view.lblCount1.text = 140 - this.view.txtPaymentReference.text.length + "";
            this.view.txtAddressLine01.text = formDetails.addressLine1;
            this.view.txtAddressLine02.text = formDetails.addressLine2;
            this.view.txtCity.text = formDetails.city;
            this.view.txtPostCode.text = formDetails.postCode;
            this.toggleNewBeneficiary(formDetails.oneTimePayment);
            if (formDetails.oneTimePayment === true) {
                this.view.txtTransferTo.text = formDetails.toAccount.beneficiaryName;
                this.view.txtBeneficiaryNickName.text = formDetails.toAccount.nickName;
            };
            if (formDetails.isPaidBy === "SHA") {
                this.onClickShareRadioButton();
            } else {
                if (formDetails.isPaidBy === "BEN") {
                    this.onClickBeneficiaryRadioButton();
                } else {
                    if (formDetails.isPaidBy === "OUR") {
                        this.onClickMeRadioButton();
                    } else {
                        this.view.flxFeePaidBy.setVisibility(false);
                    }
                }
            }
            if (formDetails.isOwnAccount && formDetails.toAccount.accountType === "CreditCard") {
                if (formDetails.paymentType === kony.i18n.getLocalizedString("i18n.Transfers.OtherAmount")) {
                    FormControllerUtility.enableTextbox(this.view.txtAmount);
                } else {
                    FormControllerUtility.disableTextbox(this.view.txtAmount);
                }
            }
            if (!editMode) {
                filesToBeUploaded = formDetails.supportedDocuments;
                if (!kony.sdk.isNullOrUndefined(formDetails.supportedDocumentObjects)) uploadedAttachments = formDetails.supportedDocumentObjects.split(",");
                else uploadedAttachments = [];
                this.setAttachmentsDataToSegment();
            }
        },
        showTransferError: function(errorMsg) {
            this.view.flxFormContent.setContentOffset({
                x: "0%",
                y: "0%"
            }, true);
            this.view.flxMakeTransferError.setVisibility(true);
            this.view.flxDialogs.setVisibility(false);
            this.view.flxLookup.setVisibility(false);
            this.view.flxLookup.isModalContainer = false;
            this.view.imgMakeTransferError.setVisibility(false);
            this.view.rtxMakeTransferError.setVisibility(false);
            this.view.GenericMessageNew.setVisibility(true);
            this.view.GenericMessageNew.setContext(errorMsg);
            this.view.forceLayout();
        },
        hideTransferError: function() {
            this.view.flxMakeTransferError.setVisibility(false);
            this.view.forceLayout();
        },
        getDateObjectFromServer: function(dateString) {
            var formatUtilManager = applicationManager.getFormatUtilManager();
            return formatUtilManager.getDateObjectfromString(dateString, "YYYY-MM-DD");
        },
        getCurrDateString: function() {
            return CommonUtilities.getFrontendDateString(CommonUtilities.getServerDateObject().toUTCString());
        },
        /**
         * Method to get the date components
         * @param {object} dateString date string
         * @returns {object} date components
         */
        getDateComponents: function(dateString) {
            var dateObj = applicationManager.getFormatUtilManager().getDateObjectfromString(dateString, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
            return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
        },
        /**
         * Method to populate fields for edit transaction scenario
         * @param {object} transaction contains the transaction data
         */
        preFillTransactionForm: function(transaction) {
            var scopeObj = this;
            editMode = true;
            this.resetCalendarForFrequency(transaction.frequencyType);
            transactionCurrency = transaction.transactionCurrency;
            this.view.lbxFrequency.selectedKey = transaction.frequencyType || "Once";
            this.view.flxTo.onClick = null;
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var bankDate = this.bankDateObj.currentWorkingDate || CommonUtilities.getServerDate();
            if (transaction.frequencyStartDate && this.getDateObjectFromServer(transaction.frequencyStartDate) > this.getDateObjectFromServer(bankDate)) {
                this.view.calSendOnNew.date = CommonUtilities.getFrontendDateString(transaction.frequencyStartDate, dateFormat);
                this.view.calSendOnNew.dateComponents = scopeObj.getDateComponents(transaction.frequencyStartDate);
            }
            if (transaction.frequencyEndDate && this.getDateObjectFromServer(transaction.frequencyEndDate) > this.getDateObjectFromServer(bankDate)) {
                this.view.calEndingOnNew.date = CommonUtilities.getFrontendDateString(transaction.frequencyEndDate, dateFormat);
                this.view.calEndingOnNew.dateComponents = scopeObj.getDateComponents(transaction.frequencyEndDate);
            } else {
                this.view.calEndingOnNew.dateComponents = null;
            }
            var amount = transaction.amount || 0;
            this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(amount);
            this.view.txtPaymentReference.text = transaction.transactionsNotes || "";
            this.view.lblCount1.text = 140 - this.view.txtPaymentReference.text.length + "";
            if (transaction.serviceName === "INTRA_BANK_FUND_TRANSFER_CREATE") {
                this.view.flxFeePaidBy.setVisibility(false);
            } else {
                const chargeBearer = transaction.chargeBearer;
                if (chargeBearer) {
                    if (chargeBearer === "OUR") this.onClickMeRadioButton();
                    else if (chargeBearer === "BEN") this.onClickBeneficiaryRadioButton();
                    else if (chargeBearer === "SHA") this.onClickShareRadioButton();
                }
            }
            this.ManageActivitiesPresenter.retrieveAttachments(transaction.transactionId, this.preFillAttachmentsDataToSegment.bind(this));
        },
        preFillAttachmentsDataToSegment: function(response) {
            var attachmentsArray = (response && response.fileNames) ? response.fileNames : [];
            this.view.flxAttachmentsList.setVisibility(true);
            var attachmentsData = [];
            existingAttachments = attachmentsArray;
            for (var i = 0; i < attachmentsArray.length; i++) {
                attachmentsData[i] = {};
                attachmentsData[i].filename = {
                    "text": CommonUtilities.truncateStringWithGivenLength(attachmentsArray[i].fileName, 32),
                    "accessibilityConfig": {
                        "a11yLabel": attachmentsArray[i].fileName
                    },
                };
                attachmentsData[i].fileID = attachmentsArray[i].fileID;
                filesToBeUploaded.push(attachmentsArray[i].fileName);
                attachmentsData[i]["imgRemoveAttachment"] = {
                    "src": "bbcloseicon.png"
                };
                attachmentsData[i]["flxImgRemove"] = {
                    "onClick": this.removeAttachments.bind(this, attachmentsData[i])
                };
            }
            this.view.segAddedDocuments.widgetDataMap = {
                "lblAttachedDocument": "filename",
                "imgRemoveAttachment": "imgRemoveAttachment",
                "lblAttachedDocumentID": "fileID",
                "flxImgRemove": "flxImgRemove"
            };
            this.view.segAddedDocuments.setData(attachmentsData);
            this.view.forceLayout();
        },
        preSelectFromAccount: function(fromAccountNumber) {
            if (fromAccountNumber) {
                var selectedAccount = fromAccounts.filter(function(fromAccount) {
                    return fromAccount.accountID === fromAccountNumber
                })[0];
                if (selectedAccount) {
                    preSelectAccountFrom = selectedAccount;
                    this.selectFromAccount({...selectedAccount,
                        lblAccountName: this.getFromAccountName(selectedAccount)
                    })
                }
            }
            this.view.forceLayout();
        },
        preSelectToAccount: function(toAccountNumber, isScheduled, searchByAccountNumber) {
            if (!toAccountNumber) {
                return;
            }
            if (isScheduled == "false") scheduledMode = false;
            else if (isScheduled == "true") {
                scheduledMode = true
            }
            if (isOwnAccountsFlow) {
                var selectedAccount = this.getToAccount(toAccountNumber);
                if (selectedAccount) {
                    preSelectAccountTo = selectedAccount;
                    this.selectedToAccount = null;
                    this.selectToAccount({
                        lblAccountName: this.getFromAccountName(selectedAccount),
                        nickName: selectedAccount.nickName,
                        accountNumber: selectedAccount.accountNumber,
                        swiftCode: selectedAccount.swiftCode,
                        nickName: selectedAccount.nickName,
                        accountID: selectedAccount.accountID,
                        currencyCode: selectedAccount.currencyCode,
                        cif: selectedAccount.cif,
                    })
                }
            } else {
                var selectedAccount = this.getToAccount(toAccountNumber, searchByAccountNumber);
                if (selectedAccount) {
                    preSelectAccountTo = selectedAccount;
                    this.selectedToAccount = null;
                    isSameBankAccount = selectedAccount.isSameBankAccount;
                    if (isSameBankAccount === "true") {
                        this.presenter.getBeneficiaryName(selectedAccount.accountNumber, this.view.id);
                    }
                    this.selectToAccount({
                        lblAccountName: this.getToAccountName(selectedAccount),
                        nickName: selectedAccount.nickName,
                        accountNumber: selectedAccount.accountNumber,
                        ExternalAccountNumber: selectedAccount.accountNumber,
                        swiftCode: selectedAccount.swiftCode,
                        nickName: selectedAccount.nickName,
                        addressLine1: selectedAccount.addressLine1,
                        country: selectedAccount.country,
                        city: selectedAccount.city,
                        zipcode: selectedAccount.zipcode,
                        cif: selectedAccount.cif,
                        Id: selectedAccount.Id
                    });
                }
            }
            if (selectedAccount) {
                this.accountToPreSelected = selectedAccount;
                this.accountToIsPreSelectedFlow = true;
                this.showFromAccounts();
            }
            this.view.forceLayout();
        },
        closeSegmentFromDropDown: function(params) {
            this.view.flxFromSegment.setVisibility(false);
            this.view.txtTransferFrom.setVisibility(false);
            params[1].preventDefault();
            this.view.flxFrom.setActive(true);
            this.view.flxFrom.accessibilityConfig = {
                "a11yLabel": "Select the From account",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            }
        },
        showFromAccounts: function() {
            this.view.segTransferFrom.rowTemplate = "flxFromAccountsList";
            this.view.segTransferFrom.sectionHeaderTemplate = "flxTransfersFromListHeader";
            this.view.segTransferFrom.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "imgBankIcon": "imgBankIcon",
                "flxBankIcon": "flxBankIcon",
                "lblAccType": "lblAccType",
                "flxGroup2": "flxGroup2",
                "flxGroupMain": "flxGroupMain",
                "flxTransfersFrom": "flxTransfersFrom",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "lblAccountName": "lblAccountName",
            };
            var filteredAccounts = fromAccounts.filter(function(account) {
                return account.accountType !== "Loan" && account.accountType !== "CreditCard" && account.accountType !== "Deposit" && account.externalIndicator !== "true"
            }).filter(function(account) {
                return CommonUtilities.substituteforIncludeMethod(account.nickName.toLowerCase(), fromAccountSaerchTerm) || CommonUtilities.substituteforIncludeMethod(account.accountID, fromAccountSaerchTerm)
            })
            var filteredAccounts = this.removeToAccount(filteredAccounts);
            if (this.accountToPreSelected && this.accountToPreSelected.cif) {
                let toMemId = [];
                JSON.parse(this.accountToPreSelected.cif).forEach(x => toMemId.push(...x.coreCustomerId.split(',')));
                filteredAccounts = filteredAccounts.filter(x => toMemId.includes(x.Membership_id));
                delete this.accountToPreSelected;
            }
            if (filteredAccounts.length == 0) {
                this.view.segTransferFrom.setVisibility(false);
                this.view.flxNoResultsTo.setVisibility(false);
                this.view.flxToSegment.setVisibility(false);
                this.selectedFromAccount = null;
                this.resetTransfersForm()
            } else {
                this.view.segTransferFrom.setVisibility(true);
                this.view.flxNoResultsFrom.setVisibility(false);
                var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(filteredAccounts, "from") : this.getDataWithSections(filteredAccounts, "from");
                this.view.segTransferFrom.setData(widgetFromData);
            }
            this.view.forceLayout();
        },
        getFromAccountName: function(account) {
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            return (account.accountID || account.Account_id) ? (isMobileDevice ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account)) : (account.payPersonId ? account.nickName : account.nickName + " ...." + CommonUtilities.getLastFourDigit(account.accountNumber))
        },
        getDisplayAmount: function(account) {
            if (account.accountType === "Loan" || account.accountType === "CreditCard") {
                return CommonUtilities.formatCurrencyWithCommas(account.principalBalance, true, account.currencyCode);
            }
            return CommonUtilities.formatCurrencyWithCommas(account.availableBalance, true, account.currencyCode);
        },
        mapFromAccounts: function(fromAccounts) {
            return fromAccounts.map(function(account) {
                return {
                    "lblAccountName": this.getFromAccountName(account),
                    "lblAmount": this.getDisplayAmount(account),
                    "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                    "lblCurrencySymbol": applicationManager.getConfigurationManager().getCurrency(account.currencyCode),
                    "imgIcon": (account.isBusinessAccount === "true") ? "r" : "s",
                    "lblAccType": {
                        "text": account.accountType,
                        "left": this.profileAccess === "both" ? "7px" : "20px",
                    },
                    "lblSeparator": {
                        "isVisible": true
                    }
                };
            }.bind(this))
        },
        showToAccounts: function(accountTo) {
            this.view.segTransferTo.sectionHeaderTemplate = "flxTransfersFromListHeader";
            this.view.segTransferTo.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "lblBankName": "lblBankName",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "imgBankIcon": "imgBankIcon",
                "lblAccType": "lblAccType",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "flxBankName": "flxBankName",
                "flxGroup": "flxGroup",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "flxTransfersTo": "flxTransfersTo",
                "flxTransfersToMobile": "flxTransfersToMobile"
            };
            if (isOwnAccountsFlow) {
                this.view.segTransferTo.rowTemplate = "flxTransfersFrom";
                var filteredAccounts = fromAccounts.filter(function(account) {
                    /*return CommonUtilities.substituteforIncludeMethod(account.accountName.toLowerCase(), toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.accountID, toAccountSearchTerm)*/
                    return CommonUtilities.substituteforIncludeMethod(account.accountName.toLowerCase(), toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.accountID, toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(account.nickName.toLowerCase(),toAccountSearchTerm)
                })
                filteredAccounts = this.removeFromAccount(filteredAccounts);
                let toAccountsList = filteredAccounts;
                if (this.accountFromPreSelected) {
                    filteredAccounts = this.presenter.filterToAccountsByMembershipId(this.accountFromPreSelected.Membership_id, filteredAccounts);
                    delete this.accountFromPreSelected;
                } else if (this.selectedFromAccount && this.selectedFromAccount.Membership_id) {
                    filteredAccounts = this.presenter.filterToAccountsByMembershipId(this.selectedFromAccount.Membership_id, filteredAccounts);
                }
                filteredAccounts = filteredAccounts.concat(this.presenter.filterCreditCardAccount("CreditCard", toAccountsList));
                if (filteredAccounts.length == 0) {
                    this.view.segTransferTo.setVisibility(false);
                    this.view.flxNoResultsTo.setVisibility(false);
                    this.view.flxToSegment.setVisibility(false);
                } else {
                    this.view.segTransferTo.setVisibility(true);
                    this.view.flxNoResultsTo.setVisibility(false);
                    var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(filteredAccounts, "from") : this.getDataWithSections(filteredAccounts, "from");
                    this.view.segTransferTo.setData(widgetFromData);
                }
            } else {
                this.view.segTransferTo.rowTemplate = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxTransfersToMobile" : "flxTransfersTo"
                var filteredAccounts = toAccounts.filter(function(account) {
                    var searchBy = account.beneficiaryName || "";
                    var searchByNickName = account.nickName || "";
                    return CommonUtilities.substituteforIncludeMethod(searchBy.toLowerCase(), toAccountSearchTerm) || CommonUtilities.substituteforIncludeMethod(searchByNickName.toLowerCase(), toAccountSearchTerm)
                });
                if (this.accountFromPreSelected) {
                    filteredAccounts = this.presenter.filterToAccountsByMembershipId(this.accountFromPreSelected.Membership_id, filteredAccounts);
                    delete this.accountFromPreSelected;
                } else if (this.selectedFromAccount && this.selectedFromAccount.Membership_id) {
                    filteredAccounts = this.presenter.filterToAccountsByMembershipId(this.selectedFromAccount.Membership_id, filteredAccounts);
                }
                if (filteredAccounts.length == 0) {
                    this.view.segTransferTo.setVisibility(false);
                    this.view.flxNoResultsTo.setVisibility(false);
                    this.view.flxToSegment.setVisibility(false);
                } else {
                    this.view.segTransferTo.setVisibility(true);
                    this.view.flxNoResultsTo.setVisibility(false);
                    this.view.segTransferTo.setData(this.mapToAccounts(filteredAccounts));
                }
                if (this.view.txtTransferTo.text !== "") {
                    this.view.flxCancelFilterTo.setVisibility(true);
                    this.view.lblNew.setVisibility(true);
                    this.toggleNewBeneficiary(true);
                    this.view.lblRadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn1, this.view.flxRadioBtn1, this.view.lblByMe.id);
                    this.view.lblRadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn2, this.view.flxRadioBtn2, this.view.lblByBeneficiary.id);
                    this.view.lblRadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                    this.view.lblRadioBtn3.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.radioButtonOnClick(this.view.lblRadioBtn3, this.view.flxRadioBtn3, this.view.lblByBoth.id);
                    this.view.lblRadioBtn3.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                }
            }
            this.view.forceLayout();
        },
        removeToAccount: function(accounts) {
            var toAccount = this.getFormDetails().toAccount;
            if (toAccount) {
                return accounts.filter(function(account) {
                    return account.accountID != toAccount.accountID
                })
            }
            return accounts;
        },
        removeFromAccount: function(accounts) {
            var fromAccount = this.getFormDetails().fromAccount;
            if (fromAccount) {
                return accounts.filter(function(account) {
                    return account.accountID != fromAccount.accountID
                })
            }
            return accounts;
        },
        showIbanError: function() {
            var scopeObj = this;
            CommonUtilities.setText(scopeObj.view.lblWarning, kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidIBANMessage"), CommonUtilities.getaccessibilityConfig());
            scopeObj.view.txtAccountNumber.skin = ViewConstants.SKINS.BORDER;
            scopeObj.view.lblWarning.setVisibility(true);
        },
        /**
         * Method to check valid IBAN & get BIC
         */
        validateIBAN: function() {
            var scopeObj = this;
            var validationUtilityManager = applicationManager.getValidationUtilManager();
            var IBAN = scopeObj.view.txtAccountNumber.text.trim();
            if (IBAN !== "") {
                if (scopeObj.view.lblBankRadioBtn01.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                    if (!validationUtilityManager.isValidAccountNumber(IBAN)) {
                        scopeObj.view.txtAccountNumber.skin = ViewConstants.SKINS.BORDER;
                        CommonUtilities.setText(scopeObj.view.lblWarning, kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidAccountNumberMessage"), CommonUtilities.getaccessibilityConfig());
                        scopeObj.view.lblWarning.setVisibility(true);
                    } else {
                        scopeObj.validateExistingorNot(IBAN);
                    }
                } else {
                    scopeObj.view.BtnLookup.setVisibility(true);
                    //By default considering the account as international
                    isInternationalAccount = "true";
                    isSameBankAccount = "false";
                    this.checkCurrency();
                    this.checkPaymentMedium();
                    this.view.txtSwift.text = "";
                    FormControllerUtility.enableTextbox(this.view.txtSwift);
                    if (!validationUtilityManager.isValidAccountNumber(IBAN) && /^[a-z]/i.test(IBAN.charAt(0))) {
                        scopeObj.validateExistingorNot(IBAN);
                    }
                }
            }
            scopeObj.view.flxFormContent.forceLayout();
        },
        /**
         * Method to check existed accountnumber or not 
         */
        validateExistingorNot: function(IBAN) {
            var scopeObj = this;
            if (scopeObj.view.lblBankRadioBtn01.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                this.radioButtonOnClick(this.view.lblBankRadioBtn01, this.view.flxBankOption1, this.view.lblSameBank.id);
                scopeObj.presenter.getBeneficiaryName(IBAN, this.view.id);
            } else {
                scopeObj.presenter.isValidIBAN(IBAN, this.view.id);
            }
        },
        hidePopups: function() {
            var currFormObj = kony.application.getCurrentForm();
            var scope = this;
            if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === true) || (currFormObj.flxToSegment.isVisible === true && toSeg === true)) {
                fromSeg = false;
                toSeg = false;
            } else if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === false) || (currFormObj.flxToSegment.isVisible === true && toSeg === false)) {
                if (this.view.txtTransferFrom.text !== "" && currFormObj.flxFromSegment.isVisible === true) {}
                setTimeout(function() {
                    if (!fromScroll) {
                        currFormObj.flxFromSegment.setVisibility(false);
                        scope.showOrHideClearFromAccBtn(false);
                        fromSeg = true;
                    }
                    fromScroll = false;
                }, "17ms");
                if (this.view.txtTransferTo.text !== "" && currFormObj.flxToSegment.isVisible === true) {
                    this.fetchToAccountsBySearch();
                }
                setTimeout(function() {
                    if (!toScroll) {
                        currFormObj.flxToSegment.setVisibility(false);
                        scope.showOrHideClearToAccBtn(false);
                        toSeg = true;
                    }
                    toScroll = false;
                }, "17ms")
            } else if ((currFormObj.flxFromSegment.isVisible === false && fromSeg === false) || (currFormObj.flxToSegment.isVisible === false && toSeg === false)) {
                fromSeg = true;
                toSeg = true;
            }
            if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
                setTimeout(function() {
                    currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
                    currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                    currFormObj.customheadernew.imgLblTransfers.text = "O";
                }, "17ms")
            }
        },
        setupFormOnTouchEnd: function(width) {
            var self = this;
            if (width == 640) {
                this.view.onTouchEnd = function() {}
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {}
                } else {
                    this.view.onTouchEnd = function() {
                        self.hidePopups();
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function() {}
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function() {}
                }
            }
        },
        getToAccountName: function(toAccount) {
            var accountName = toAccount.beneficiaryName || toAccount.nickName;
            var nameToShow = "";
            if (accountName) {
                nameToShow = accountName + "...." + CommonUtilities.getLastFourDigit(toAccount.accountNumber);
            } else {
                nameToShow = toAccount.accountNumber;
            }
            return nameToShow;
        },
        mapToAccounts: function(toAccounts) {
			let scopeObj = this;
            return toAccounts.map(function(toAccount) {
                return {
                    "lblAccountName": this.getToAccountName(toAccount),
                    "lblSeparator": {
                        "isVisible": true
                    },
                    "accountNumber": toAccount.Id || toAccount.accountID,
                    "ExternalAccountNumber": toAccount.accountNumber,
                    "isSameBankAccount": toAccount.isSameBankAccount,
                    "swiftCode": toAccount.swiftCode,
                    "nickName": toAccount.nickName,
                    "isInternational": toAccount.isInternationalAccount,
                    "addressLine1": toAccount.addressLine1,
                    "addressLine2": toAccount.addressLine2,
                    "country": toAccount.country,
                    "city": toAccount.city,
                    "zipcode": toAccount.zipcode,
                    "lblBankName": toAccount.bankName ? toAccount.bankName : applicationManager.getUserPreferencesManager().getUserObj().bankName,
                    "flxTransfersTo": {
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button",
                                "aria-label": "Account Name" + " " + (this.getToAccountName(toAccount)) + " " + "BankName" + " " + (toAccount.bankName ? toAccount.bankName : applicationManager.getUserPreferencesManager().getUserObj().bankName)
                            },
                        },
                        "onKeyPress": scopeObj.dropdownKeyPressToAccount
                    },
                    "flxTransfersToMobile": {
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button",
                                "aria-label": "Account Name" + " " + (this.getToAccountName(toAccount)) + " " + "BankName" + " " + (toAccount.bankName ? toAccount.bankName : applicationManager.getUserPreferencesManager().getUserObj().bankName)
                            },
                        },
                    },
                };
            }.bind(this))
        },
        SetRadioBtnInstantNextDay: function(RadioBtnSelected, RadioBtnUnselected) {
            RadioBtnSelected.text = "M";
            RadioBtnSelected.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
            RadioBtnUnselected.text = "L";
            RadioBtnUnselected.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
        },
        onInstantPaymentonTouchStart: function(event) {
            var scopeObj = this;
            scopeObj.SetRadioBtnInstantNextDay(this.view.lblradioButton1, this.view.lblradioButton2);
        },
        onNextBankingDayPaymentonTouchStart: function(event) {
            var scopeObj = this;
            scopeObj.SetRadioBtnInstantNextDay(this.view.lblradioButton2, this.view.lblradioButton1);
        },
        /**
         * Method to set the current working bank date
         * @param {Object} bankDateObj object containing bank date
         */
        setBankDate: function(bankDateObj) {
            if (this.isModify) return;
            var scopeObj = this;
            scopeObj.bankDate = bankDateObj;
            var bankDate = bankDateObj.currentWorkingDate || CommonUtilities.getServerDate();
            if (bankDate.length == 10)
                bankDate += " 00:00:00";
            else {
                bankDate = bankDate.replace("T", " ");
                bankDate = bankDate.replace("Z", " ");
            }
            scopeObj.disableOldDaySelection(scopeObj.view.calSendOnNew, bankDate);
            scopeObj.disableOldDaySelection(scopeObj.view.calEndingOnNew, bankDate);
            scopeObj.disableOldDaySelection(scopeObj.view.calSendOnLoans, bankDate);
        },
        /**
         * Method to disable the selection of past dates and sets the date range for a calendar widget.
         * @param {String} widgetId - calendar widget ID
         * @param {String} bankDate - calendar widget's date selection will be disabled for backdated dates of bankDate
         */
        disableOldDaySelection: function(widgetId, bankDate) {
            var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
            var today = new Date(bankDate);
            var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
            widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
            widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        },
        /**
         * Method to toggle credit card payment type radio buttons
         * @param {function} onChange - call back function to handle amount field
         * @param {Object} radioButton - widget to be toggled
         */
        onClickRadioButtonCreditCard: function(onChange, radioButton) {
            var scopeObj = this;
            var selectedButton;
            var allRadioButtons = ["lblCCRadioBtn1", "lblCCRadioBtn2", "lblCCRadioBtn3", "lblCCRadioBtn4"];
            if (radioButton && radioButton.widgets()) {
                selectedButton = radioButton.widgets()[0].id;
            } else {
                return;
            }
            var selectRadioButton = function(button) {
                if (onChange) {
                    onChange(button);
                }
                var RadioBtn = scopeObj.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn1, scopeObj.view.flxWrapRadio5, scopeObj.view.lblMinimumDue.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn2, scopeObj.view.flxWrapRadio6, scopeObj.view.lblStatementDue.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn3, scopeObj.view.flxWrapRadio7, scopeObj.view.lblOutstandingBalance.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn4, scopeObj.view.flxWrapRadio8, scopeObj.view.lblPayOtherAmount.id);
            }
            var unSelectRadioButton = function(button) {
                var RadioBtn = scopeObj.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn1, scopeObj.view.flxWrapRadio5, scopeObj.view.lblMinimumDue.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn2, scopeObj.view.flxWrapRadio6, scopeObj.view.lblStatementDue.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn3, scopeObj.view.flxWrapRadio7, scopeObj.view.lblOutstandingBalance.id);
                scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn4, scopeObj.view.flxWrapRadio8, scopeObj.view.lblPayOtherAmount.id);
            }
            allRadioButtons.forEach(function(button) {
                button === selectedButton ? selectRadioButton(button) : unSelectRadioButton(button);
            });
            scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn1, scopeObj.view.flxWrapRadio5, scopeObj.view.lblMinimumDue.id);
            scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn2, scopeObj.view.flxWrapRadio6, scopeObj.view.lblStatementDue.id);
            scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn3, scopeObj.view.flxWrapRadio7, scopeObj.view.lblOutstandingBalance.id);
            scopeObj.radioButtonOnClick(scopeObj.view.lblCCRadioBtn4, scopeObj.view.flxWrapRadio8, scopeObj.view.lblPayOtherAmount.id);
        },
        /**
         * Method to handle amount field in credit card payments
         * @param {Object} selectedAccount - object containing selected credit card account data
         * @param {Object} button - widget on basis which amount value is assigned
         */
        onRadioCreditCardListener: function(selectedAccount, button) {
            this.clearAmount = true;
            FormControllerUtility.disableTextbox(this.view.txtAmount);
            switch (button) {
                case "lblCCRadioBtn1":
                    this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(selectedAccount.minimumDue);
                    paymentType = kony.i18n.getLocalizedString("i18n.TransfersEur.MinimumDue");
                    break;
                case "lblCCRadioBtn2":
                    this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(selectedAccount.paymentDue);
                    paymentType = kony.i18n.getLocalizedString("i18n.TransfersEur.StatementDue");
                    break;
                case "lblCCRadioBtn3":
                    this.view.txtAmount.text = applicationManager.getFormatUtilManager().formatAmount(selectedAccount.outstandingBalance);
                    paymentType = kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance");
                    break;
                case "lblCCRadioBtn4":
                    this.view.txtAmount.text = "";
                    FormControllerUtility.enableTextbox(this.view.txtAmount);
                    paymentType = kony.i18n.getLocalizedString("i18n.Transfers.OtherAmount");
                    break;
            }
            this.checkValidityMakeFastTransferForm();
            this.radioButtonOnClick(this.view.lblCCRadioBtn1, this.view.flxWrapRadio5, this.view.lblMinimumDue.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn2, this.view.flxWrapRadio6, this.view.lblStatementDue.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn3, this.view.flxWrapRadio7, this.view.lblOutstandingBalance.id);
            this.radioButtonOnClick(this.view.lblCCRadioBtn4, this.view.flxWrapRadio8, this.view.lblPayOtherAmount.id);
        },
        /**
         * Method to show Credit Card payment view
         * @param {Object} selectedAccount - object containing selected credit card account data
         */
        showCreditCardView: function(selectedAccount) {
            this.view.flxCreditCard.setVisibility(true);
            this.view.lblSendOnLoans.setVisibility(true);
            this.view.flxCalLoans.setVisibility(true);
            this.view.lblFrequency.setVisibility(false);
            this.view.flxContainer5.setVisibility(false);
            this.view.lbxFrequency.setVisibility(false);
            this.view.lbxFrequency.selectedKey = "Once";
            this.view.lblDueDateValue.text = this.getDateComponents(selectedAccount.dueDate).join('/');
            this.view.flxWrapRadio5.onClick = this.onClickRadioButtonCreditCard.bind(this, this.onRadioCreditCardListener.bind(this, selectedAccount));
            this.view.flxWrapRadio6.onClick = this.onClickRadioButtonCreditCard.bind(this, this.onRadioCreditCardListener.bind(this, selectedAccount));
            this.view.flxWrapRadio7.onClick = this.onClickRadioButtonCreditCard.bind(this, this.onRadioCreditCardListener.bind(this, selectedAccount));
            this.view.flxWrapRadio8.onClick = this.onClickRadioButtonCreditCard.bind(this, this.onRadioCreditCardListener.bind(this, selectedAccount));
            if (!this.isModify) {
                this.onClickRadioButtonCreditCard(this.onRadioCreditCardListener.bind(this, selectedAccount), this.view.flxWrapRadio5);
            }
            this.isModify = false;
        },
        /**
         * Method to hide Credit Card payment view
         */
        hideCreditCardView: function() {
            this.view.flxCreditCard.setVisibility(false);
            this.view.lblSendOnLoans.setVisibility(false);
            this.view.flxCalLoans.setVisibility(false);
            this.view.flxContainer5.setVisibility(true);
            this.view.lblFrequency.setVisibility(true);
            this.view.lbxFrequency.setVisibility(true);
            if (this.clearAmount) {
                this.view.txtAmount.text = "";
                this.clearAmount = false;
            }
        },
        showPaymentCutOff: function(viewModel) {
            this.view.flxPaymemtsCutOff.setVisibility(true);
            if (this.cutOffFlow === "choice") {
                this.view.flxPaymentSelection.setVisibility(true);
                this.view.flxPaymentCutOffNote.setVisibility(false);
                CommonUtilities.setText(this.view.lblCutOff, kony.i18n.getLocalizedString("i18n.TransfersEur.CutOffNote"), CommonUtilities.getaccessibilityConfig());
            } else {
                this.view.flxPaymentCutOffNote.setVisibility(true);
                CommonUtilities.setText(this.view.lblCutOff, kony.i18n.getLocalizedString("i18n.TransfersEur.CutOffNote"), CommonUtilities.getaccessibilityConfig());
                this.view.flxPaymentSelection.setVisibility(false);
            }
        },
        hidePaymentCutOff: function() {
            this.cutOffFlow = false;
            this.view.flxPaymemtsCutOff.setVisibility(false);
        },
        hideNewPayment: function() {
            this.view.btnNewPayment.setVisibility(false)
        },
        hidePaymentActivities: function() {
            this.view.btnNewPayment.setVisibility(false);
        },
        hideManageBeneficiaries: function() {
            this.view.btnManageBeneficiaries.setVisibility(false);
        },
        showNewPayment: function() {
            this.view.btnNewPayment.setVisibility(true);
        },
        showPaymentActivities: function() {
            this.view.btnNewPayment.setVisibility(true);
        },
        showManageBeneficiaries: function() {
            this.view.btnManageBeneficiaries.setVisibility(true);
        },
        enableSwiftSearch: function() {
            var scopeObj = this;
            if (this.view.txtCountry1.text !== "" || this.view.txtCity1.text !== "" || this.view.txtBankName.text !== "") {
                FormControllerUtility.enableButton(scopeObj.view.btnSearch);
            } else {
                FormControllerUtility.disableButton(scopeObj.view.btnSearch);
            }
        },
        searchSwift: function() {
            var searchData = [];
            if (this.view.txtCountry1.text && this.view.txtCountry1.text.length > 0) {
                searchData.country = this.view.txtCountry1.text;
            }
            if (this.view.txtCity1.text && this.view.txtCity1.text.length > 0) {
                searchData.city = this.view.txtCity1.text;
            }
            if (this.view.txtBankName.text && this.view.txtBankName.text.length > 0) {
                searchData.bankName = this.view.txtBankName.text;
            }
            var transferMod = applicationManager.getModulesPresentationController("TransferEurUIModule");
            transferMod.searchAllSwiftBICCode(searchData, "frmMakePayment");
        },
        setSegmentData: function(data) {
            if (data && data.length > 0) {
                this.view.segResults.widgetDataMap = this.getWidgetDataMap();
                this.view.segResults.setData(data);
                this.view.segResults.setVisibility(true);
                this.view.flxNoResults.setVisibility(false);
            } else {
                this.view.flxNoResults.setVisibility(true);
                this.view.segResults.setVisibility(false);
            }
        },
        segRowClick: function() {
            var rowindex;
            rowindex = Math.floor(this.view.segResults.selectedRowIndex[1]);
            selectedAccount = this.view.segResults.data[rowindex];
            this.view.txtSwift.text = selectedAccount.bic;
            bank_country = selectedAccount.country;
            bank_name = selectedAccount.bankName;
            isSameBankAccount = "false";
            isInternationalAccount = "true";
            this.view.flxLookup.setVisibility(false);
            this.view.flxLookup.isModalContainer = false;
        },
        getWidgetDataMap: function() {
            var dataMap = {
                lblSwiftCodeValue: "bic",
                lblBankValue: "bankName",
                lblCityNameValue: "city",
                lblCountryNameValue: "country",
            };
            return dataMap;
        },
        clearSearch: function() {
            this.view.txtBankName.text = '';
            this.view.txtCity1.text = '';
            this.view.txtCountry1.text = '';
            this.view.segResults.setData([]);
        },
        /**
         * creates segment with account numbers and other details with particular header values
         * @param typeOfTransfer - differentiate whether it is "to" or "from" account transaction
         */
        getDataWithSections: function(accounts, typeOfTransfer) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = ["Personal Accounts"];
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";
                var accountTypeIcon = "";
                var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
                var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
                if (account.isBusinessAccount === "false") {
                    if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                        accountTypeIcon = "s";
                    } else {
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
                    finalData[accountType][1].push(scopeObj.createSegmentData(account, typeOfTransfer));
                } else {
                    if (accountType != "Personal Accounts") {
                        prioritizeAccountTypes.push(accountType);
                    }
                    finalData[accountType] = [{
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            lblSeparator: {
                                "isVisible": true
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "aria-expanded": true,
                                        "aria-label": "dropdown expanded",
                                        "role": "button"
                                    }
                                },
                                "onKeyPress":scopeObj.dropdownKeyPress,
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentData(account, typeOfTransfer)]
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
        getDataWithAccountTypeSections: function(accounts, typeOfTransfer) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentData(account, typeOfTransfer));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": true
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "accessibilityConfig": {
                                    a11yARIA: {
                                        "aria-expanded": true,
                                        "aria-label": "dropdown expanded",
                                        "role": "button"
                                    }
                                },
                                "onKeyPress":scopeObj.dropdownKeyPress,
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                        },
                        [scopeObj.createSegmentData(account, typeOfTransfer)]
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
        /*create segment data grouped by membership name
         */
        getToDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = [];
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";
                var accountTypeIcon = "";
                var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
                var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
                if (account.isBusinessAccount === "false") {
                    if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                        accountType = "Personal Accounts";
                        accountTypeIcon = "s";
                    } else {
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
                    finalData[accountType][1].push(scopeObj.createSegmentDataTo(account));
                } else {
                    prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblTransactionHeader: account.MembershipNam,
                            lblSeparator: {
                                "isVisible": true
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "aria-expanded": true,
                                        "aria-label": "dropdown expanded",
                                        "role": "button"
                                    }
                                },
                                "onKeyPress":scopeObj.dropdownKeyPress,
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentDataTo(account)]
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
        getToDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentDataTo(account, typeOfTransfer));
                } else {
                    finalData[accountType] = [{
                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": true
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "aria-expanded": true,
                                        "aria-label": "dropdown expanded",
                                        "role": "button"
                                    }
                                },
                                "onKeyPress":scopeObj.dropdownKeyPress,
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",
                        },
                        [scopeObj.createSegmentDataTo(account, typeOfTransfer)]
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
         *  @param typeOfTransfer - differentiate whether it is "to" or "from" account transaction 
         */
        createSegmentData: function(account, typeOfTransfer) {
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().singleCustomerProfile;
            var fromOrToAccountNumber = (typeOfTransfer === "from") ? account.fromAccountNumber : account.toAccountNumber;
            var fromOrToAccountName = (typeOfTransfer === "from") ? account.fromAccountName : account.toAccountName;
            var dataObject = {
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : (kony.sdk.isNullOrUndefined(CommonUtilities.getAccountDisplayName(account)) ? CommonUtilities.getAccountDisplayName(account) : fromOrToAccountName),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId || fromOrToAccountNumber,
                "currencyCode": account.currencyCode,
                "Membership_id": account.Membership_id,
                "imgIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    "isVisible": this.profileAccess === "both" ? true : false,
                },
                "lblSeparator": {
                    "isVisible": true
                },
                "lblAccType": {
                    "text": account.accountType,
                    "left": this.profileAccess === "both" ? "7px" : "20px",
                },
                "flxIcons": {
                    "left": this.profileAccess === "both" ? "15px" : "0px"
                },
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                },
                "imgBankIcon": {
                    "src": "bank_icon_hdfc.png"
                },
                "flxAccountListItem": {
                    "isVisible": true
                },
                "lblCurrencySymbol": {
                    "isVisible": false
                },
                "flxFromAccountsList": {
                    "height": "76dp",
                    "accessibilityConfig": {
                        "a11yLabel": ("Account Name" + " " + 
                        (CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) )+ +account.Account_id.substr(-4) + " " + "Account Type" + " " + account.accountType + " " + "Amount" + " " + account.currencyCode + account.currentBalance),
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button"
                        },
                    },
                }
            };
            return dataObject;
        },
        createSegmentDataTo: function(toAccount) {
            var data = {
                "lblAccountName": this.getToAccountName(toAccount),
                "lblSeparator": {
                    "isVisible": true
                },
                "accountNumber": toAccount.Id || toAccount.accountID,
                "ExternalAccountNumber": toAccount.accountNumber,
                "isSameBankAccount": toAccount.isSameBankAccount,
                "swiftCode": toAccount.swiftCode,
                "nickName": toAccount.nickName,
                "isInternational": toAccount.isInternationalAccount,
                "addressLine1": toAccount.addressLine1,
                "country": toAccount.country,
                "city": toAccount.city,
                "zipcode": toAccount.zipcode
            }
            return data;
        },
        /**
         * It shows or hides the particular section 
         */
        showOrHideAccountRows: function(context) {
            fromScroll = true;
            var section = this.view.segTransferFrom.selectedRowIndex[0];
            var segData = this.view.segTransferFrom.data;
            var isRowVisible = true;
            if (segData[section][0].imgDropDown.text === "O") {
                segData[section][0]["imgDropDown"] = {
                    text: "P"
                };
                isRowVisible = true;
                segData[section][0].flxDropDown.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-expanded": true,
                        "aria-label": "dropdown expanded",
                        "role": "button"
                    }
                }
            } else {
                segData[section][0]["imgDropDown"] = {
                    text: "O"
                };
                isRowVisible = false;
                segData[section][0].flxDropDown.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-expanded": false,
                        "aria-label": "dropdown collapsed",
                        "role": "button"
                    }
                }
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxFromAccountsList = JSON.parse(JSON.stringify(segData[section][1][i].flxFromAccountsList));
                flxFromAccountsList["isVisible"] = isRowVisible;
                flxFromAccountsList["height"] = isRowVisible ? "76dp" : "0dp";
                this.updateKeyAt("flxFromAccountsList", flxFromAccountsList, i, section);
            }
            segData = this.view.segTransferFrom.data;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
            this.setFromAccountsDropdownHeight(segData);
            this.view.segTransferFrom.setActive(-1, section, "flxTransfersFromListHeader.flxDropDown")
                //this.view.segTransferFrom.setActive(0,-1,"flxTransfersFromListHeader.flxDropDown")
        },
        setFromAccountsDropdownHeight: function(data) {
            var totalHeight = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i][1][0]["flxFromAccountsList"].height !== "0dp") {
                    totalHeight += data[i][1].length * 76;
                }
            }
            if (totalHeight === 0) {
                totalHeight += data.length * 40;
            }
            this.view.flxFromSegment.height = totalHeight >= 300 ? "300dp" : totalHeight + "dp";
        },
        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
        },
        resetCalendarForFrequency: function(frequencyValue) {
            if (!frequencyValue) return;
            var scopeObj = this;
            var startDate = new Date(this.bankDateObj.currentWorkingDate || CommonUtilities.getServerDate());
            if (frequencyValue !== "Once") {
                startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
            }
            scopeObj.view.calSendOnNew.dateComponents = null;
            scopeObj.view.calEndingOnNew.dateComponents = null;
            scopeObj.disableOldDaySelection(scopeObj.view.calSendOnNew, startDate);
            scopeObj.disableOldDaySelection(scopeObj.view.calEndingOnNew, startDate);
        }
    };
});