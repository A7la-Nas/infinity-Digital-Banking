/**
 * Description of Module representing a Confirm form.
 * @module frmBulkBillPayConfirmController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmBulkBillPayConfirmController */ {
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
            if (uiDataMap.selectedBeneficiariesConfirm) {
                this.enableTnC();
                this.setDataForConfirmBulkPay(uiDataMap.selectedBeneficiariesConfirm);
                //this.bindTnCData(uiDataMap.TnCcontentTransfer);
            }
            if (uiDataMap.TnCcontentTransfer) {
                this.bindTnCData(uiDataMap.TnCcontentTransfer);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayMultipleBeneficiariesUIModule").presentationController;
            this.initActions();
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            this.setAccessibility(false);
            var scope = this;
            this.view.customheadernew.btnSkipNav.onClick = function(){
              scope.view.lblAddPayee.setActive(true);
            }
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressLogoutCallBack;
            this.view.CustomPopupCancel.onKeyPress = this.onKeyPressCancelCallBack;
            this.view.flxTC.onKeyPress = this.onKeyPressTncCallBack;
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxTC.doLayout = CommonUtilities.centerPopupFlex;
            if(kony.application.getCurrentBreakpoint() >= 1366){
                this.view.customheadernew.flximgKony.left="0dp";
            }
            else if(kony.application.getCurrentBreakpoint() === 1024){
                this.view.customheadernew.flximgKony.left="17dp";
                this.view.customheadernew.imgKony.left="0dp";
            } 
            this.view.customheadernew.collapseAll();
        },

        onKeyPressLogoutCallBack: function (eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
              if (this.view.flxDialogs.isVisible) {
                this.view.flxDialogs.isVisible = false;
                this.view.flxLogout.isVisible = false;
              }
             this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
          }
        },

        onKeyPressCancelCallBack: function (eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
              if (this.view.flxDialogs.isVisible) {
                this.view.flxDialogs.isVisible = false;
                this.view.flxCancelPopup.isVisible = false;
              }
             this.view.btnCancel.setActive(true);
          }
        },

        onKeyPressTncCallBack: function (eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
              if (this.view.flxDialogs.isVisible) {
                this.view.flxDialogs.isVisible = false;
                this.view.flxTermsAndConditionsPopUp.isVisible = false;
              }
             this.view.btnTermsAndConditions.setActive(true);
          }
        },
        
        enableTnC: function() {
            CommonUtilities.disableButton(this.view.btnConfirm);
            //this.view.flxAgree.setVisibility(true);
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
         * setting data in bulk pay screen
         * @param {object}   bulkPayRecords list of transactions
         */
        setDataForConfirmBulkPay: function(selectedBeneficiaries) {
            var self = this;
            this.presenter.getTnC();
            var selectedBeneficiariesWidgetDataMap = {
                "flxConfirmBulkBeneficiaries": "flxConfirmBulkBeneficiaries",
                "lblBeneficiaryName": "lblBeneficiaryName",
                "lblBankDetails": "lblBankDetails",
                "lblAccountName": "lblAccountName",
                "lblEndingBalanceAccount": "lblEndingBalanceAccount",
                "lblPaymentType": "lblPaymentType",
                "lblAmount": "lblAmount",
                "lblBeneficiaryNameDuplicate": "lblBeneficiaryNameDuplicate",
                "lblAccountNameDuplicate": "lblAccountNameDuplicate",
                "lblPaymentTypeDuplicate": "lblPaymentTypeDuplicate",
                "lblAmountDuplicate": "lblAmountDuplicate"
            };
            var beneficiariesData = selectedBeneficiaries.records.map(function(dataItem, index) {
                return {
                    "lblBeneficiaryName": {
                        "text": dataItem.lblBeneficiaryName
                    },
                    "lblBeneficiaryNameDuplicate": {
                        "text": "Beneficiary "+ dataItem.lblBeneficiaryName +" "+ dataItem.lblBankNameWithAccountNumber
                    },
                    "lblBankDetails": {
                        "text": dataItem.lblBankNameWithAccountNumber
                    },
                    "lblAccountName": {
                        "text": dataItem.lblAccountName
                    },
                    "lblAccountNameDuplicate": {
                         "text": "Payment Account "+ dataItem.lblAccountName +" "+ dataItem.lblEndingBalance
                    },
                    "lblEndingBalanceAccount": {
                        "text": dataItem.lblEndingBalance
                    },
                    "lblPaymentType": {
                        "text": dataItem.paymentType
                    },
                    "lblPaymentTypeDuplicate": {
                        "text": "Payment Type "+ dataItem.paymentType
                    },
                    "lblAmount": {
                        "text": dataItem.lblAmount
                    },
                    "lblAmountDuplicate": {
                        "text": "Amount "+ dataItem.lblAmount
                    }
                }
            });
            this.view.btnConfirm.onClick = this.onContinueClicked.bind(this, selectedBeneficiaries);
            this.view.CustomPopupCancel.lblHeading.text = kony.i18n.getLocalizedString('i18n.transfers.Cancel');
            //CommonUtilities.setText(this.view.CustomPopupCancel.lblHeading, kony.i18n.getLocalizedString('i18n.transfers.Cancel'), CommonUtilities.getaccessibilityConfig());
            this.view.btnCancel.onClick = function() {
                self.view.flxDialogs.setVisibility(true);
                self.view.flxCancelPopup.setVisibility(true);
                self.view.CustomPopupCancel.lblHeading.setActive(true);
                //self.view.CustomPopupCancel.lblHeading.setFocus(true);
            };
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.presenter.showPayMultipleBeneficiaries({
                    "showManageBeneficiaries": true
                });
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.btnCancel.setActive(true);
                self.view.forceLayout();
            };
            this.view.CustomPopupCancel.flxCross.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.btnCancel.setActive(true);
                self.view.forceLayout();
            };
            this.view.btnModify.onClick = self.presenter.modifyBulkPayement.bind(self.presenter);
            //CommonUtilities.setText(this.view.lblAmountValue, bulkPayRecords.totalSum, CommonUtilities.getaccessibilityConfig());
            this.view.segBill.widgetDataMap = selectedBeneficiariesWidgetDataMap;
            this.view.segBill.setData(beneficiariesData);
            this.view.lblAmountValue.text = selectedBeneficiaries.totalAmount;
            this.view.lblAmountValueDuplicate.text = selectedBeneficiaries.totalAmount;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },

        onContinueClicked: function(selectedBeneficiaries) {
            this.presenter.createBulkTransfer(selectedBeneficiaries);
        },

        /**
         * used to bind Terms and condition data on Activation screen
         * @param {object} TnCcontent bill pay supported sccounts
         */
        bindTnCData: function(TnCcontent) {
            this.bindTnC(TnCcontent, this.view.flxCheckBoxTnC, this.view.lblCheckBoxIcon, this.view.btnTermsAndConditions, this.view.btnConfirm);
            this.view.forceLayout();
        },

        /**
         * used to bind the terms and conditions
         */

        bindTnC: function(TnCcontent, checkboxFlex, checkboxIcon, btnTnC, confirmButton) {
            if (TnCcontent.alreadySigned) {
                checkboxFlex.setVisibility(false);
                CommonUtilities.enableButton(confirmButton);
            } else {
                CommonUtilities.disableButton(confirmButton);
                checkboxIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                checkboxIcon.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                this.view.flxCheckBox.onClick = this.toggleTnC.bind(this, checkboxIcon, confirmButton);
                checkboxFlex.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    btnTnC.onClick = function() {
                        window.open(TnCcontent.termsAndConditionsContent);
                    }
                } else {
                    btnTnC.onClick = this.showTermsAndConditionPopUp;
                    this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                    /*   if (document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer")) {
                         document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                       } else {
                         if (!document.getElementById("iframe_brwBodyTnC").newOnload) {
                           document.getElementById("iframe_brwBodyTnC").newOnload = document.getElementById("iframe_brwBodyTnC").onload;
                         }
                         document.getElementById("iframe_brwBodyTnC").onload = function () {
                           document.getElementById("iframe_brwBodyTnC").newOnload();
                           document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
                         };
                       }*/
                }
                this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
            }
        },

        /**
         * used to hide the terms and conditons popup
         */
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditionsPopUp.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
            var scope = this;
            scope.view.btnTermsAndConditions.setActive(true);
        },
        /**
         * used to set the content
         */
        setTnCDATASection: function(content) {
            this.view.rtxTC.text = content;
        },
        /**
         * used to show the terms and conditions
         */
        showTermsAndConditionPopUp: function() {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxTermsAndConditionsPopUp.setVisibility(true);
            this.view.lblTermsAndConditions.setActive(true);
            this.view.forceLayout();
        },
        /**
         * used to toggling the checkbox
         */
        toggleTnC: function(widget, confirmButton) {
            CommonUtilities.toggleFontCheckbox(widget, confirmButton);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.setAccessibility(false);
                CommonUtilities.disableButton(confirmButton);
            } else {
                this.setAccessibility(true);
                CommonUtilities.enableButton(confirmButton);
            }    
            this.view.flxCheckBox.setActive(true);
        },

        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmBulkBillPayConfirmController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        /**
         * setAccessibility : to set the accessibiluity
         * @param {String} visibility
         * @return {}
         * @throws {}
         */
        setAccessibility: function(visibility) {
            this.view.flxCheckBox.accessibilityConfig = {
              "a11yLabel": "I agree with the payment's Terms & Conditions",
              "a11yARIA": {
                 "tabindex": 0,
                 "aria-checked": visibility,
                 "role": "checkbox",
                }
            }
        }
    }
});