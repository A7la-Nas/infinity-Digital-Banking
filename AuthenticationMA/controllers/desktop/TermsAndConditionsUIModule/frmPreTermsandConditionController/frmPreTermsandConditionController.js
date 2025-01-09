define(['CommonUtilities', 'FormControllerUtility', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    return {
        updateFormUI: function(context) {
            if (context.TnCcontent) {
                this.setTnCDATASection(context.TnCcontent);
            }
            if (context.error) {
                this.showError(context.error);
            }
        },
        preShow: function() {
            CommonUtilities.disableButton(this.view.btnProceed);
            this.view.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            //this.view.flxCloseFontIconParent.onClick = this.showLoginOnCancel;
            this.view.flxCloseFontIcon.onClick = this.showLogoutOnCancel;
            this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_MAIN_BAKGROUND;
            //this.view.flxFooterMenu.setVisibility(false);
            this.view.flxLoading.isModalContainer = true;
            this.view.flxLoadingWrapper.isModalContainer = true;
            this.view.flxImageContainer.isModalContainer = true;
            this.view.flxTC.doLayout = this.centerPopupFlex;
        },
        postShow: function() {
            var scope = this;
            applicationManager.getNavigationManager().applyUpdates(this);
            //this.view.lblCopyright.setVisibility(false);
            this.setAccessibility();
            // this.view.flxTermsAndConditions.setVisibility(false);
            document.addEventListener('keydown', function(event) {
                if (event.which === 27) {
                    scope.view.flxTermsAndConditions.setVisibility(false);
                    scope.view.flxTC.isModalContainer = false;
                    scope.view.btnTandC.setFocus(true);
                }
            });
        },
        centerPopupFlex: function(popupWidget) {
            popupWidget = this.view.flxTC;
            popupWidget.info = popupWidget.frame;
            if (kony.os.deviceInfo().screenHeight - 40 <= popupWidget.info.height) {
                popupWidget.top = "20dp";
                popupWidget.height = kony.os.deviceInfo().screenHeight - 40 + "dp";
                this.view.brwScroll.height = kony.os.deviceInfo().screenHeight - 124 + "dp";
                popupWidget.centerY = "";
            } else {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    popupWidget.height = "325dp";
                } else if (kony.application.getCurrentBreakpoint() === 768) {
                    popupWidget.height = "400dp";
                } else if (kony.application.getCurrentBreakpoint() === 1024) {
                    popupWidget.height = "500dp";
                } else {
                    popupWidget.height = "650dp";
                }
                popupWidget.top = "";
                popupWidget.centerY = "50%";
            }
            this.view.forceLayout();
        },
        setAccessibility: function() {
            this.view.flxLoading.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxLoadingWrapper.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxImageContainer.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTCContents.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxSeperator1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblWrongInformation.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxMain.accessibilityConfig = {
                a11yARIA: {
                    "role": "main",
                    tabindex: -1,
                }
            }
            this.view.flxCloseFontIconParent.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxCloseFontIcon.accessibilityConfig = {
                a11yLabel: "Close and log out",
                a11yARIA: {
                    "role": "button"
                }
            }
            this.view.lblCloseFontIconCommon.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgKony.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "aria-hidden": true
                }
            }
            this.view.lblWelcome.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.imgDowntimeWarning.accessibilityConfig= {
                a11yHidden: true,
                a11yARIA: {
                    role: "presentation",
                    tabindex: -1,
                }
            }
            this.view.lblDowntimeWarning.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblBeyondBanking.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblBeyondBankingDesc.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxLblFontIcon.accessibilityConfig = {
                a11yLabel: "terms and conditions",
                a11yARIA: {
                    "role": "checkbox",
                    "aria-checked": false,
                }
            }
            this.view.lblFavoriteEmailCheckBox.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblIAccept.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnTandC.accessibilityConfig = {
                a11yARIA: {
                    // "role": "button"
                }
            }
            this.view.btnProceed.accessibilityConfig = {
                a11yLabel : "proceed, Accepting terms and conditions",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            this.view.btnViewMore.accessibilityConfig = {
                a11yLabel:"Learn more about our Bank's offerings. Opens in a new tab",
                a11yARIA: {
                    "role": "button"
                }
            }
            this.view.flxFooterContainer.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar1.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar2.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar3.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxVBar4.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnLocateUs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnContactUs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnPrivacy.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.btnFaqs.accessibilityConfig = {
                a11yARIA: {
                    "role": "link"
                }
            }
            this.view.lblTermsAndConditions.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.btnClose.accessibilityConfig = {
                a11yLabel : "close, pre-terms and conditions dialog",
                  a11yARIA : {
                      tabindex : 0,
                      role : "button"
                    }
            }
            this.view.imgClose.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.rtxTC.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.brwBodyTnC.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblCopyrightTab1.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblCopyrightTab2.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxTC.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                    "role": "dialog",
                    "aria-live":"off"
                },
              }
            this.view.imgLoading.accessibilityConfig = {
                a11yHidden: true,
                a11yARIA: {
                    tabindex: -1,
                }
            }
        },
        initActions: function() {
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            this.view.btnClose.onClick = this.hideTermsAndConditionPopUp;
            this.view.btnViewMore.onClick = function() {
                var config = applicationManager.getConfigurationManager();
                kony.application.openURL(config.getConfigurationValue("LINK_TO_DBX"));
            };
            this.view.btnProceed.onClick = this.agreeTnc;
            this.view.flxLblFontIcon.onClick = this.toggleTnC.bind(this, this.view.lblFavoriteEmailCheckBox);
        },
        /*showLoginOnCancel: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            authModule.presentationController.showLoginScreen();
        },*/
        showLogoutOnCancel: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            authModule.presentationController.onTnCNotSelect();
        },
        showTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.flxTC.isModalContainer = true;
            this.view.lblTermsAndConditions.setActive(true);
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = 0;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxTC.isModalContainer = false;
            this.view.btnTandC.setFocus(true);
        },
        setTnCDATASection: function(content) {
            this.view.lblWrongInformation.setVisibility(false);
            if (content.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                this.view.btnTandC.onClick = function() {
                    window.open(content.termsAndConditionsContent);
                }
            } else {
                this.view.btnTandC.onClick = this.showTermsAndConditionPopUp;
                this.view.rtxTC.text = content.termsAndConditionsContent;
                FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content.termsAndConditionsContent);
            }
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view)
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = 0;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        toggleTnC: function(widget) {
            CommonUtilities.toggleFontCheckbox(widget);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                this.view.flxLblFontIcon.accessibilityConfig = {
                    a11yLabel: "terms and conditions",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": false,
                    }
                }
                CommonUtilities.disableButton(this.view.btnProceed);
                widget.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN
            } else {
                this.view.flxLblFontIcon.accessibilityConfig = {
                    a11yLabel: "terms and conditions",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": true,
                    }
                }
                CommonUtilities.enableButton(this.view.btnProceed);
                widget.skin = OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN
            }
        },
        agreeTnc: function() {
            FormControllerUtility.showProgressBar(this.view);
            var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsUIModule");
            termsAndConditionModule.presentationController.createTnC(OLBConstants.TNC_FLOW_TYPES.Login_TnC);
        },
        showError: function(error) {
            this.view.lblWrongInformation.setVisibility(true);
            this.view.lblWrongInformation.text = error.errorMessage;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        }
    };
});