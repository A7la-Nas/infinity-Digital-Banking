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
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.bulkData) {
                this.setDataForConfirmBulkPay(uiDataMap.bulkData);
                this.bindTnCData(uiDataMap.TnCcontentTransfer);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
        },
        preShow: function() {
            var scope = this;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
          //  this.view.btnTermsAndConditions.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.TermsAndConditions");
           // this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
          //  this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.common.modifiy");
          //  this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
          //  this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
          this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
            this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())

          this.view.customheadernew.btnSkipNav.onClick = function() {
                scope.view.lblAddPayee.setActive(true);
            };

         this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
         this.view.flxTermsAndConditionsPopUp.flxTC.onKeyPress = this.onTCKeyPressCallBack;
         this.view.flxCancelPopup.CustomPopupCancel.onKeyPress = this.onKeyPressCallBack;

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
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setAccessibiliyValues();
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxTC.doLayout = CommonUtilities.centerPopupFlex;
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
           // var self = this;
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.flxLogout.isVisible = false;
                    this.view.customheadernew.btnLogout.setActive(true);
                } else if (this.view.flxCancelPopup.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.flxCancelPopup.isVisible = false;               
                    this.view.btnCancel.setFocus(true);
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
        
        setAccessibiliyValues: function() {
		this.view.flxTC.isModalContainer = true;
        this.view.CustomPopupCancel.lblHeading.accessibilityConfig = {
        "a11yARIA": {
                    "tabindex": 0
                },
            }
        this.view.flxFormContent.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
            }
        this.view.CustomPopupCancel.btnYes.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0
                },
                "a11yLabel": "Yes, cancel this bill payment"
            }
            this.view.CustomPopupCancel.btnNo.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "No, don't cancel this bill payment"
            }
            this.view.CustomPopupCancel.flxCross.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": 0,
                },
                "a11yLabel": "Close this pop-up"
            }			
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
        setDataForConfirmBulkPay: function(bulkPayRecords) {
            var self = this;
            var bulkPayWidgetDataMap = {
                "lblPaymentAccount": "lblPaymentAccount",
                "lblPayee": "lblPayee",
                "lblSendOn": "lblSendOn",
                "lblDeliverBy": "lblDeliverBy",
                "lblAmount": "lblAmount",
                "flxPayeeIcon": "flxPayeeIcon",
                "lblPayeeIcon": "lblPayeeIcon",
                "flxPaymentIcon": "flxPaymentIcon",
                "lblPaymentIcon": "lblPaymentIcon",
                "lblPayeeAddress": "lblPayeeAddress",
                "lblEndingBalanceAccount": "lblEndingBalanceAccount",
                "lblCol1":"lblCol1",
                "lblCol2":"lblCol2",
                "lblCol3":"lblCol3",
                "lblCol4":"lblCol4",
                "lblCol5":"lblCol5"
            };
            var bulkPayRecordsData = {};
            bulkPayRecordsData.records = bulkPayRecords.records;
            bulkPayRecordsData.gettingFromBulkBillPayment = true;
            this.view.btnConfirm.onClick = function() {
                self.presenter.createBulkPayments.call(self.presenter, bulkPayRecordsData);
            };
           // CommonUtilities.setText(this.view.CustomPopupCancel.lblHeading, kony.i18n.getLocalizedString('i18n.transfers.Cancel'), CommonUtilities.getaccessibilityConfig());
           this.view.CustomPopupCancel.lblHeading.text= kony.i18n.getLocalizedString('i18n.transfers.Cancel');
            this.view.btnCancel.onClick = function() {
                self.view.flxDialogs.setVisibility(true);
                self.view.flxCancelPopup.setVisibility(true);
                self.view.forceLayout();
                self.view.CustomPopupCancel.lblHeading.setActive(true);
            };
            this.view.CustomPopupCancel.btnYes.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.presenter.cancelBulkPay(self.presenter);
            };
            this.view.CustomPopupCancel.btnNo.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
                self.view.btnCancel.setFocus(true);
            };
            this.view.CustomPopupCancel.flxCross.onClick = function() {
                self.view.flxCancelPopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.view.forceLayout();
                self.view.btnCancel.setFocus(true);
            };
            self.view.CustomPopupCancel.lblHeading.setActive(true);
            this.view.btnModify.onClick = self.presenter.modifyBulkPayement.bind(self.presenter);
            this.view.lblAmountValue.text= bulkPayRecords.totalSum;
			this.view.lblAmountValue1.text= bulkPayRecords.totalSum;
            this.view.segBill.widgetDataMap = bulkPayWidgetDataMap;
            for(let i in bulkPayRecords.records){
                bulkPayRecords.records[i].lblCol1 = {
                    "text": "Payee " + bulkPayRecords.records[i].lblPayee.text + " " + bulkPayRecords.records[i].lblPayeeAddress.text
                };
                bulkPayRecords.records[i].lblCol2 = {
                    "text": "Payment Account " + bulkPayRecords.records[i].lblPaymentAccount.text + " " + bulkPayRecords.records[i].lblEndingBalanceAccount.text
                };
                bulkPayRecords.records[i].lblCol3 = {
                    "text": "Send On " + bulkPayRecords.records[i].lblSendOn
                };
                bulkPayRecords.records[i].lblCol4 = {
                    "text": "Deliver By " + bulkPayRecords.records[i].lblDeliverBy
                };
                bulkPayRecords.records[i].lblCol5 = {
                    "text": "Amount " + bulkPayRecords.records[i].lblAmount.text
                };
            }
            this.view.segBill.setData(bulkPayRecords.records);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },


        /**
         * used to bind Terms and condition data on Activation screen
         * @param {object} TnCcontent bill pay supported sccounts
         */
        bindTnCData: function(TnCcontent) {
            this.bindTnC(TnCcontent, this.view.flxCheckBoxTnC, this.view.flxCheckBox, this.view.btnTermsAndConditions, this.view.btnConfirm);
            this.view.forceLayout();
        },

        /**
         * used to bind the terms and conditions
         */

        bindTnC: function(TnCcontent, checkboxFlex, checkboxIcon, btnTnC, confirmButton) {
            if (TnCcontent.alreadySigned) {
                checkboxFlex.setVisibility(false);
            } else {
                CommonUtilities.disableButton(confirmButton);
                checkboxIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                checkboxIcon.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                checkboxIcon.onClick = this.toggleTnC.bind(this, checkboxIcon, confirmButton);
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
            this.view.btnTermsAndConditions.setActive(true);
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
            this.view.forceLayout();
            this.view.flxTermsAndConditionsHeader.lblTermsAndConditions.setActive(true);
        },
        /**
         * used to toggling the checkbox
         */
        toggleTnC: function(widget, confirmButton) {
            CommonUtilities.toggleFontCheckbox(widget, confirmButton);
            if (widget.lblCheckBoxIcon.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
				this.view.lblCheckBoxIcon.text="C"
			this.view.flxCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-checked": true,
                        "role": "checkbox"
                    },
                };
				
			CommonUtilities.enableButton(confirmButton);
		}
            else {
				this.view.lblCheckBoxIcon.text="D"
				this.view.flxCheckBox.accessibilityConfig = {
                    "a11yLabel": "I accept all terms and conditions",
                    a11yARIA: {
                        "tabindex": 0,
                        "aria-checked": false,
                        "role": "checkbox"
                    },
                };
				
				CommonUtilities.disableButton(confirmButton);
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
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
          //  this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
          //  this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        }
    }
});