/**
 * Description of Module representing a Confirm form.
 * @module frmOneTimePaymentConfirmController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    return /** @alias module:frmOneTimePaymentConfirmController */ {
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} uiDataMap - it contains the set of view properties and keys.
         */
        profileAccess: "",
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiDataMap.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.view.rtxDowntimeWarning.text = uiDataMap.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
            if (uiDataMap.payABill) {
                this.bindSingleBillPayData(uiDataMap.payABill);
                this.bindTnCData(uiDataMap.payABill.TnCcontentTransfer);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
           // this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
           // this.view.CancelPopup.onBreakpointChangeComponent(scopeObj.view.CancelPopup, width);
        },
        preShow: function() {
            let self = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Make One Time Payment");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
           // this.view.imgCloseWarning.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            //this.view.btnTermsAndConditions.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions");
           // this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
           // this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.common.modifiy");
            //this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
           // this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
            this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
            this.view.customheadernew.btnSkipNav.onClick = function(){
                self.view.lblConfirmBillPay.setActive(true);
            };
            //this.setAccessibiliyValues();
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
             this.view.flxTermsAndConditionsPopUp.flxTC.onKeyPress = this.onTCKeyPressCallBack;
             this.view.flxCancelPopup.CancelPopup.onKeyPress = this.onKeyPressCallBack;
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setAccessibiliyValues();
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CancelPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxTC.doLayout = CommonUtilities.centerPopupFlex;
            this.view.lblConfirmBillPay.text="One-Time Bill Payment- Confirmation";
            this.view.lblConfirmBillPay.accessibilityConfig={
                "a11yARIA":{
                    tabindex:-1
                }
            }
        },

         setAccessibiliyValues: function(){
             // this.view.flxImgCheckBox.accessibilityConfig = {
              //  "a11yLabel": "I accept all terms and conditions",
              //  a11yARIA: {
                //    "tabindex" : 0,
                  //  "aria-checked": false,
                  //  "role": "checkbox"
                 // },
            // };
            
            this.view.flxTC.isModalContainer = true;
            this.view.flxTC.accessibilityConfig = {
                "a11yARIA": {
                    "role": "dialog",
                    "tabindex": -1,
                },
                };
            this.view.flxTC.flxClose.accessibilityConfig = {
                "a11yLabel": "Close this pop-up",
                a11yARIA: {
                    "tabindex" : 0,
                    role: "button"
                  },
            };
            this.view.flxTC.lblTermsAndConditions.accessibilityConfig = {
                "a11yARIA": {
                "tabindex": -1,
                },
            };
            this.view.CancelPopup.btnYes.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0
                },
                "a11yLabel": "Yes, cancel this transaction"
            }
            this.view.CancelPopup.btnNo.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "No, don't cancel this transaction"
            }
            this.view.CancelPopup.flxCross.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "Close this pop-up"
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    self.view.flxLogout.isVisible = false;
                    self.view.customheadernew.btnLogout.setActive(true);
                } else if (self.view.flxCancelPopup.isVisible === true) {
					self.view.flxDialogs.isVisible = false;
                    self.view.flxCancelPopup.isVisible = false;					
                    self.view.btnCancel.setFocus(true);
                }      
            }
        },

         onTCKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxTermsAndConditionsPopUp.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    self.view.flxTermsAndConditionsPopUp.isVisible = false;
                    self.view.btnTermsAndConditions.setActive(true);
                }
                
            }
        },
        /**
         * bind one time billPay Data values
         * @param {object} data
         */
        bindSingleBillPayData: function(data) {
            var scopeObj = this;
            var transactionCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency);
            if (data.statusOfDefaultAccountSetUp === true) {
                scopeObj.view.flxWarning.setVisibility(true);
                CommonUtilities.setText(this.view.lblWarning, data.defaultAccountBillPay + kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpConfirmBillPayee"), CommonUtilities.getaccessibilityConfig());
            } else {
                scopeObj.view.flxWarning.setVisibility(false);
            }
            // this.view.imgCloseWarning.onTouchEnd = function() {
            //     scopeObj.view.flxWarning.setVisibility(false);
            //     scopeObj.view.forceLayout();
            // };
             this.view.flxCloseWarning.onClick = function() {
                scopeObj.view.flxWarning.setVisibility(false);
                scopeObj.view.forceLayout();
            };
            CommonUtilities.setText(scopeObj.view.lblFromValue, data.payFrom, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblToValue, data.payeeName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + transactionCurrency + ")" +":", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountValue, data.amount, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.sendOn, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDeliverByValue, data.deliveryDate, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFrequencyValue, data.frequencyType, CommonUtilities.getaccessibilityConfig());
            if(data.notes=== ""){
			   data.notes="None";
		   }
            CommonUtilities.setText(scopeObj.view.lblNotesValue, data.notes, CommonUtilities.getaccessibilityConfig());
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                this.view.flxFromIcon.setVisibility(true);
                //this.view.flxToIcon.setVisibility(true);
                //this.view.lblToIcon.setVisibility(true);
                this.view.lblFromIcon.setVisibility(true);
                this.view.lblFromIcon.text = scopeObj.presenter.isBusinessAccount(data.fromAccountNumber) === "true" ? "r" : "s";
            }
            scopeObj.view.btnCancel.onClick = function() {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnModify.onClick = function () {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    callbackModelConfig: {
                        oneTimePayment: true
                    }
                });
            }.bind(this);
            scopeObj.view.btnConfirm.onClick = function() {
                if ((data.gettingFromOneTimePayment && CommonUtilities.isCSRMode()) || (data.isScheduleEditFlow && CommonUtilities.isCSRMode())) {
                    scopeObj.viewbtnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
                    scopeObj.view.btnConfirm.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                    scopeObj.view.btnConfirm.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
                } else {
                    FormControllerUtility.showProgressBar(this.view);
                    data.languageAmount = data.amount;
                    var deformatedAmount = this.deformatAmount(data.amount);
                    data.amount = deformatedAmount;
                    scopeObj.presenter.checkMFAForOneTimePayment(data);
                }
            }.bind(this);
            scopeObj.view.flxContent.forceLayout();
        },
        /**
         * used to get the amount
         * @param {number} amount amount
         * @returns {number} amount
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**
         * used to bind Terms and condition data on Activation screen
         * @param {object} TnCcontent bill pay supported sccounts
         */
        bindTnCData: function(TnCcontent) {
            var scopeObj = this;
            if (TnCcontent.alreadySigned) {
                scopeObj.view.flxCheckBoxTnC.setVisibility(false);
            } else {
                CommonUtilities.disableButton(scopeObj.view.btnConfirm);
                scopeObj.view.imgCheckBox.text = "D";
                scopeObj.view.imgCheckBox.skin="skn0273e320pxolbfonticons";
                scopeObj.view.flxImgCheckBox.onClick = this.toggleCheckBox.bind(scopeObj);
                scopeObj.view.flxCheckBoxTnC.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    scopeObj.view.btnTermsAndConditions.onClick = function() {
                        window.open(TnCcontent.termsAndConditionsContent);
                    }
                } else {
                    scopeObj.view.btnTermsAndConditions.onClick = function() {
                        scopeObj.view.flxDialogs.setVisibility(true);
                        scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(true);
                        scopeObj.view.flxTermsAndConditionsPopUp.lblTermsAndConditions.setActive(true);
                    };
                    scopeObj.view.rtxTC.text = TnCcontent.termsAndConditionsContent;
                    /*  if (document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer")) {
                        document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                      } else {
                        if (!document.getElementById("iframe_brwBodyTnC").newOnload) {
                          document.getElementById("iframe_brwBodyTnC").newOnload = document.getElementById("iframe_brwBodyTnC").onload;
                        }
                        document.getElementById("iframe_brwBodyTnC").onload = function () {
                          document.getElementById("iframe_brwBodyTnC").newOnload();
                          document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                        };
                      } */
                }
                scopeObj.view.flxClose.onClick = function() {
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
                    scopeObj.view.btnTermsAndConditions.setActive(true);
                };
            }
        },
        /**
         * used to toggle checkbox and confirm button
         */
        toggleCheckBox: function() {
            var scopeObj = this;
            if (scopeObj.view.imgCheckBox.text === "D") {
                scopeObj.view.imgCheckBox.text = "C";
                scopeObj.view.imgCheckBox.skin="sknFontIconCheckBoxSelected";
                this.view.flxImgCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex" : 0,
                        "aria-checked": true,
                        "role": "checkbox"
                      },
                };
                CommonUtilities.enableButton(scopeObj.view.btnConfirm);
            } else {
                scopeObj.view.imgCheckBox.text = "D";
                scopeObj.view.imgCheckBox.skin="skn0273e320pxolbfonticons";
                this.view.flxImgCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex" : 0,
                        "aria-checked": false,
                        "role": "checkbox"
                      },
                };
                CommonUtilities.disableButton(scopeObj.view.btnConfirm);
            }
            scopeObj.view.flxImgCheckBox.setActive(true);
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CancelPopup.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.presenter.showBillPaymentScreen({
                    context: "BulkPayees",
                    loadBills: true
                });
            };
            scopeObj.view.CancelPopup.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
            };
            scopeObj.view.CancelPopup.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setFocus(true);
            };
            scopeObj.view.CancelPopup.lblHeading.setActive(true);
        },
    };
});