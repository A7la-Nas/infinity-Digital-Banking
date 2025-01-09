define(['FormControllerUtility', 'ViewConstants', 'CampaignUtility','CommonUtilities'], function(FormControllerUtility, ViewConstants, CampaignUtility,CommonUtilities) {
    var orientationHandler = new OrientationHandler();
    return {
        /*loadInformationModule- function to load InformationModule
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        loadInformationModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AboutUsMA","moduleName":"InformationContentUIModule"});
        },
        /*updateFormUI- function to update View
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - viewModel
         * @returns {void} - None
         * @throws {void} -None
         */
        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.loadingIndicator) {
                    if (viewModel.loadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view);
                    } else {
                        FormControllerUtility.hideProgressBar(this.view);
                    }
                }
                if (viewModel.viewType) this.showViewType(viewModel.viewType);
                if (viewModel.showContactUs) this.showContactUs(viewModel.showContactUs);
                if (viewModel.showPrivacyPolicy) this.showPrivacyPolicy(viewModel.showPrivacyPolicy);
                if (viewModel.showLoadingIndicatorPrivacyPolicy) this.showLoadingIndicatorPrivacyPolicy(viewModel.showLoadingIndicatorPrivacyPolicy.view);
                if (viewModel.showTnC) this.showTnC(viewModel.showTnC);
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMainContainer");
                }
                this.AdjustScreen();
            }
        },

        init: function() {
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyPC);
        },


        /**
         * Preshow method for the form to set UI
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        preShowfrmContactUs: function() {
          if (kony.i18n.getCurrentLocale() === "ar_AE") {
                if (kony.application.getCurrentBreakpoint() === 1366) {
                   this.view.CustomFooterMain.flxFooterMenu.width = "1207dp";
                   this.view.CustomFooterMain.lblCopyright.left = "11.5%";
                }
              }
            this.hideAll();
        },
        /**
         * Method to Show Terms and conditions basing on session token
         * @member of frmContactUsPrivacyTandCController
         * @param {JSON}viewModel - terms and conditions to be viewed
         * @returns {void} - None
         * @throws {void} -None
         */
        showTnC: function(viewModel) {
            this.preShowfrmContactUs();
            this.view.flxHeader.isVisible = true;
            this.view.flxMainContainer.isVisible = true;
            this.view.flxContactUs.isVisible = false;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.TnC");
            this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.common.TnC");
            this.view.title = kony.i18n.getLocalizedString("i18n.common.TnC");
            if (viewModel.serviceData === "error") {
                this.setServerError({
                    "show": true,
                    "errorMessage": viewModel.errorMessage
                });
                if (viewModel.param === "postLoginView") {
                    var self = this;
                    this.view.customheader.showPostLoginView();
                    this.view.customheader.headermenu.btnLogout.onClick = this.view.customheader.showLogout;
                    this.view.CustomPopup.btnYes.onClick = function() {
                        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                        context = {
                            "action": "Logout"
                        };
                        authModule.presentationController.doLogout(context);
                        self.view.flxPopup.left = "-100%";
                    };
                    this.view.CustomPopup.btnNo.onClick = function() {
                        self.view.flxPopup.left = "-100%";
                        self.view.flxPopup.setVisibility(false);
                    };
                    this.view.CustomPopup.flxCross.onClick = function() {
                        self.view.flxPopup.left = "-100%";
                        self.view.flxPopup.setVisibility(false);
                    };
                } else {
                    this.view.customheader.showPreLoginView();
                    this.view.customheader.headermenu.btnLogout.onClick = function() {
                        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                        authModule.presentationController.showLoginScreen();
                    };
                }
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
                if (viewModel.param === "postLoginView") {
                    this.showTnCPostLogin(viewModel);
                    CampaignUtility.fetchPopupCampaigns();
                } else {
                    this.showTnCPreLogin(viewModel);
                }
            }
            this.AdjustScreen();
            var collection = document.getElementsByTagName("iframe");
            collection[0].addEventListener( "load", this.setTnCHeight);
        },
        /**
         * Method to Show Terms and conditions before login
         * @member of frmContactUsPrivacyTandCController
         * @param {JSON}viewModel - terms and conditions to be viewed
         * @returns {void} - None
         * @throws {void} -None
         */
        showTnCPreLogin: function(viewModel) {
            this.view.flxContactUs.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.common.TnC");
            this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.common.TnC");
            this.view.title = kony.i18n.getLocalizedString("i18n.common.TnC");
            FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, viewModel.serviceData.termsAndConditionsContent);
            this.view.flxPrivacyPolicy.isVisible = false;
            this.view.customheader.showPreLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
            this.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = -1;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        /**
         * Method to show TnC page after login
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - viewmodel that has reponse data in serviceData and param that tell whether it is prelogin view or postlogin view
         * @returns {void} - None
         * @throws {void} -None
         */
        showTnCPostLogin: function(viewModel) {
            this.view.flxLoginMobile.isVisible = false;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Information Content");
            this.view.flxContactUs.setVisibility(false);
            this.view.flxPrivacyPolicy.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.title = kony.i18n.getLocalizedString("i18n.common.TnC");
            FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, viewModel.serviceData.termsAndConditionsContent);
            this.view.customheader.customhamburger.activateMenu("About Us", "Terms & Conditions");
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            var self = this;
            this.view.customheader.showPostLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = this.view.customheader.showLogout;
            this.view.CustomPopup.btnYes.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                context = {
                    "action": "Logout"
                };
                authModule.presentationController.doLogout(context);
                self.view.flxPopup.left = "-100%";
            };
            this.view.CustomPopup.btnNo.onClick = function() {
                self.view.flxPopup.left = "-100%";
                self.view.flxPopup.setVisibility(false);
            };
            this.view.CustomPopup.flxCross.onClick = function() {
                self.view.flxPopup.left = "-100%";
                self.view.flxPopup.setVisibility(false);
            };
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = -1;
                collection[i].ariaLabel = "Terms and conditions";
            }
        },
        /**
         * Method to handle Server error
         * @member of {frmContactUsPrivacyTandCController}
         * @param {object} data - Service error object
         * @return {}
         * @throws {}
         */
        setServerError: function(context) {
            var scopeObj = this;
            scopeObj.view.flxDowntimeWarning.setVisibility(context.show);
            if (context.show) {
                scopeObj.view.rtxDowntimeWarning.text = context.errorMessage || kony.i18n.getLocalizedString("i18n.footerLinks.serverError");
            }
            scopeObj.updateProgressBarState(false);
            scopeObj.view.forceLayout();
        },
        /**
         * updateProgressBarState : Method to show or hide Loading progress bar
         * @param {boolena} isError , error flag to show/hide error flex.
         * @member of {frmContactUsPrivacyTandCController}
         * @param {boolean} isLoading - loading flag
         * @return {}
         * @throws {}
         */
        updateProgressBarState: function(isLoading) {
            if (isLoading) {
                this.setServerError({
                    "show": false
                });
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        /**
         * To show loading indicator
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        showLoadingIndicatorPrivacyPolicy: function(view) {
            FormControllerUtility.showProgressBar(this.view);
            this.hideAll();
            this.showViewType(view);
            if (view == "postLogin") {
                this.view.customheader.customhamburger.activateMenu("About Us", "PrivacyPolicy");
                CampaignUtility.fetchPopupCampaigns();
            }
            this.loadInformationModule().presentationController.showPrivacyPolicyAfterLoading();
        },
        /**
         * Method to show privacy policies
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        showPrivacyPolicy: function(viewModel) {
            this.hideAll();
            this.preShowfrmContactUs();
            this.view.flxHeader.isVisible = true;
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.footer.privacy");
            this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.footer.privacy");
            this.view.title = kony.i18n.getLocalizedString("i18n.footer.privacy");
            this.view.flxMainContainer.isVisible = true;
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Information Content");
            this.view.flxContactUs.isVisible = false;
            if (viewModel.serviceData === "error") {
                self.view.flxDowntimeWarning.setVisibility(true);
                FormControllerUtility.hideProgressBar(this.view);
                self.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.footerLinks.serverError");
            } else {
                self.view.flxDowntimeWarning.setVisibility(false);
                FormControllerUtility.hideProgressBar(this.view);
                self.showPrivacyPolicyView(viewModel);
            }
            this.view.flxLoginMobile.isVisible = false;
            this.AdjustScreen();
            var collection = document.getElementsByTagName("iframe");
            collection[0].addEventListener( "load", this.setPPHeight);
        },
        /**
         * Method to show privacy policy page
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - viewmodel that has reponse data in serviceData and param that tell whether it is prelogin view or postlogin view
         * @returns {void} - None
         * @throws {void} -None
         */
        showPrivacyPolicyView: function(viewModel) {
            this.view.flxPrivacyPolicy.setVisibility(true);
            this.view.customheader.customhamburger.activateMenu("About Us", "Privacy Policy");
            FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyPC, viewModel.serviceData.records[0].Description);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
            var collection = document.getElementsByTagName("iframe");
            for (let i = 0; i < collection.length; i++) {
                collection[i].tabIndex = -1;
                collection[i].ariaLabel = "Privacy Policy";
            }
        },
        setPPHeight: function(){
            var bheight=document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById('viewer').offsetHeight;
            this.view.flxPrivacyPolicy.height = bheight + 30 + "dp";
            this.view.brwBodyPC.height = bheight + 40 + "dp";
        },
        setTnCHeight: function(){
            var bheight=document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById('viewer').offsetHeight;
            this.view.flxTermsAndConditions.height = bheight + 30 + "dp";
            this.view.brwBodyTnC.height = bheight + 40 + "dp";
        },
        /**
         * Method to hide all the flex of main body
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        hideAll: function() {
            this.view.flxContactUs.setVisibility(false);
            this.view.flxPrivacyPolicy.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(false);
        },
        /**
         * Method for checking view type be it prelogin or postlogin
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - viewtype
         * @returns {void} - None
         * @throws {void} -None
         */
        showViewType: function(viewType) {
            FormControllerUtility.showProgressBar(this.view);
            if (viewType === "preLogin") {
                this.showPreLoginView();
            } else {
                this.showPostLoginView();
            }
        },
        /**
         * method to show pre login view
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        showPreLoginView: function() {
            this.view.customheader.forceCloseHamburger();
            this.hideAll();
            this.view.flxLoginMobile.isVisible = false;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
               this.view.flxFormContent.top = "50dp";
                this.view.flxLoginMobile.isVisible = true;
                this.view.flxLoginMobile.onClick = function() {
                    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                    authModule.presentationController.showLoginScreen();
                };
            } else {
               this.view.flxFormContent.top = "70dp";
            }
            this.view.customheader.showPreLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
            this.view.forceLayout();
        },
        /**
         * method to show post login view
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        showPostLoginView: function() {
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
               this.view.flxFormContent.top = "50dp";
            } else {
               this.view.flxFormContent.top = "120dp";
            }
            this.hideAll();
            this.view.flxLoginMobile.isVisible = false;
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Information Content");
            this.view.customheader.showPostLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                self.view.flxPopup.isVisible = true;
                self.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
                self.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
                var height = self.view.flxHeader.frame.height + self.view.flxMainContainer.frame.height + self.view.flxFooter.frame.height;
                self.view.flxPopup.left = "0%";
                self.view.CustomPopup.lblHeading.setActive(true);
            };
            this.view.CustomPopup.btnYes.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                context = {
                    "action": "Logout"
                };
                authModule.presentationController.doLogout(context);
                self.view.flxPopup.left = "-100%";
            };
            this.view.CustomPopup.btnNo.onClick = function() {
                self.view.flxPopup.left = "-100%";
                self.view.flxPopup.setVisibility(false);
                self.view.customheader.headermenu.btnLogout.setFocus(true);
            };
            this.view.CustomPopup.flxCross.onClick = function() {
                self.view.flxPopup.left = "-100%";
                self.view.flxPopup.setVisibility(false);
                self.view.customheader.headermenu.btnLogout.setFocus(true);
            };
            this.view.forceLayout();
        },
        /**
         * Method to Show contactUs flex
         * @member of frmContactUsPrivacyTandCController
         * @param {JSON} - ContactUs records from backend
         * @returns {void} - None
         * @throws {void} -None
         */
        showContactUs: function(viewModel) {
            var newViewModel = [];
            for (var i in viewModel) {
                var email = [];
                var phone = [];
                var heading = viewModel[i].serviceTitle;
                for (var j in viewModel[i].Email) {
                    email.push(viewModel[i].Email[j].value);
                }
                for (j in viewModel[i].Phone) {
                    phone.push(viewModel[i].Phone[j].value);
                }
                newViewModel.push({
                    Email: email,
                    Phone: phone,
                    heading: heading,
                });
            }
            this.hideAll();
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.footer.contactUs");
            this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.footer.contactUs");
            this.view.title = kony.i18n.getLocalizedString("i18n.footer.contactUs");
            if (viewModel.status === "error") {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (applicationManager.getUserPreferencesManager().isUserLoggedin()) {
                this.view.customheader.customhamburger.activateMenu("About Us", "Contact Us");
                this.showPostLoginView();
                CampaignUtility.fetchPopupCampaigns();
            } else {
                this.showPreLoginView();
            }
            this.view.flxContactUs.isVisible = true;
            this.view.contactUs.lblCustomerSupport.text = kony.i18n.getLocalizedString("i18n.auth.customerSupport");
            this.view.contactUs.lblCorporateOffice.text= kony.i18n.getLocalizedString("i18n.auth.corporateOffice");
            this.view.contactUs.lblContactCustomerService.text=kony.i18n.getLocalizedString("i18n.auth.contactCustomerService");
            this.setContactUsData(newViewModel);
            this.AdjustScreen();
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * Method to Populate data with contactUs data
         * @member of frmContactUsPrivacyTandCController
         * @param {JSON} - contactUs records from backend
         * @returns {void} - None
         * @throws {void} -None
         */
        setContactUsData: function(viewModel) {
            this.view.contactUs.rtxContactCustomerServiceMsg.text = kony.i18n.getLocalizedString("i18n.ContactUs.ContactCustomerServiceMsg");
            var segData = [];
            for (var data in viewModel) {
                var i,
                    tempPhone = "",
                    tempEmail = "";
                if (viewModel[data].Email.length > 0) {
                    for (i in viewModel[data].Email) {
                        tempEmail = tempEmail + viewModel[data].Email[i] + "<br>";
                    }
                } else {
                    tempEmail = tempEmail + kony.i18n.getLocalizedString("i18n.common.NA");
                }
                if (viewModel[data].Phone.length > 0) {
                    for (i in viewModel[data].Phone) {
                        tempPhone = tempPhone + "Phone: " + viewModel[data].Phone[i] + "<br>";
                    }
                } else {
                    tempPhone = tempPhone + kony.i18n.getLocalizedString("i18n.common.NA");
                }
                segData.push({
                    imgDot: ViewConstants.IMAGES.PAGEOFFDOT,
                    lblEmailId: "Email Address:",
                    lblHeading: viewModel[data].heading,
                    rtxEmailId: tempEmail,
                    rtxPhoneNumber: tempPhone
                });
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.contactUs.segCustomerService.rowTemplate = "flxCustomerServiceMobile";
            } else {
                this.view.contactUs.segCustomerService.rowTemplate = "flxCustomerService";
            }
            this.view.contactUs.segCustomerService.setData(segData);
        },
        /**
         * method to render form
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        postShowRenderBody: function() {
            var scopeObj = this;
            kony.timer.schedule("renderBody", scopeObj.renderBodyFunction, 2, false);
            this.AdjustScreen();
        },
        //UI Code
        /**
         * UI method to adjust alignments
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        AdjustScreen: function() {
            var mainheight;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.frame.height + this.view.flxMainContainer.frame.height;
            var isMobile = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            if (!isMobile) {
                var diff = screenheight - mainheight;
                if (mainheight < screenheight) {
                    diff = diff - this.view.flxFooter.frame.height;
                   if (diff > 0) {
                        if (this.view.flxTermsAndConditions.isVisible ) {
                            this.view.flxFooter.top = mainheight + diff + 120 + "dp";
                        }else if(this.view.flxPrivacyPolicy.isVisible){
							this.view.flxFooter.top = mainheight + diff + 140 + "dp";
						} else {
                            this.view.flxFooter.top = mainheight + diff + "dp";
                        }
                    } else this.view.flxFooter.top = mainheight + "dp";
                } else {
                    this.view.flxFooter.top = mainheight + "dp";
                }
            }
            this.view.forceLayout();
        },
        preshow: function() {
            var scopeObj = this;
          if(applicationManager.getStorageManager().getStoredItem("langObj").language === "Arabic"){
            this.view.flxLogout.left="-100%";
          }
//          if(applicationManager.getStorageManager().getStoredItem("langObj").language === "Arabic"){
//             this.view.flxLogout.left="-100%";
//           }
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxMainContainer", "flxFooter", "customheader", "brwBodyPC", "brwBodyTnC",'flxFormContent']);
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            this.view.customheader.topmenu.btnHamburger.skin = "btnHamburgerskn";
            this.view.customheader.topmenu.flxTransfersAndPay.skin = "slFbox";
            this.view.customheader.topmenu.flxContextualMenu.setVisibility(false);
            this.view.customheader.topmenu.flxaccounts.skin = "slFbox";
            this.view.customheader.forceCloseHamburger();
            this.view.flxLogout.setVisibility(false)
            this.view.customheader.btnSkip.onClick = this.skipNav;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxPopup.isModalContainer = true;
            this.view.flxLogout.isModalContainer = true;
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
        if (eventPayload.keyCode === 27) {
          if (this.view.flxPopup.isVisible === true) {
            this.view.flxPopup.isVisible = false;
            this.view.customheader.headermenu.btnLogout.setFocus(true);
          }
          if (this.view.flxLogout.isVisible === true) {
            this.view.flxLogout.isVisible = false;
            this.view.customheader.headermenu.btnLogout.setFocus(true);
          }
          this.view.customheader.onKeyPressCallBack(eventObject,eventPayload);
        }
      },
        skipNav: function() {
          this.view.lblContentHeader.setActive(true);
        },
        /**
         * method to render form
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        renderBodyFunction: function() {
            if (this.view.flxContactUs.isVisible) {
                this.view.contactUs.renderBody();
            }
            if (this.view.flxPrivacyPolicy.isVisible) {
                this.view.privacyPolicy.renderBodyPP();
            }
            if (this.view.flxTermsAndConditions.isVisible) {
                this.view.termsAndConditions.renderBodyTnC();
            }
            this.view.forceLayout();
        },
        /**
         * method to render form  for privacy policies flow
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        renderBodyPP: function() {
            var height = this.view.brwBodyPC.frame.height + 30;
            if (height < 378) {
                this.view.flxScrollDetailsPP.height = "378px";
            } else if (height < 634) {
                this.view.flxScrollDetailsPP.height = height + "px";
            } else {
                this.view.flxScrollDetailsPP.height = "634px";
            }
        },
        /**
         * method to render form  for terms and conditions flow
         * @member of frmContactUsPrivacyTandCController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        renderBodyTnC: function() {
            var height = this.view.brwBodyTnC.frame.height + 30;
            if (height < 378) {
                this.view.flxScrollDetails.height = "378px";
            } else if (height < 634) {
                this.view.flxScrollDetails.height = height + "px";
            } else {
                this.view.flxScrollDetails.height = "634px";
            }
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopup.flxCross.accessibilityConfig = {
                a11yLabel: "Close the sign out dialog",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup.btnNo.accessibilityConfig = {
                a11yLabel: "No, stay signed in",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.view.CustomPopup.btnYes.accessibilityConfig = {
                a11yLabel: "Yes, sign me out",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            };
            this.AdjustScreen();
        },
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            orientationHandler.onOrientationChange(this.onBreakpointChange, function() {
                this.AdjustScreen();
            }.bind(this));
            this.view.customheader.onBreakpointChangeComponent(width);
            this.setupFormOnTouchEnd(width);
        },
        setupFormOnTouchEnd: function(width) {
            if (width == 640) {
                this.view.onTouchEnd = function() {}
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
                        hidePopups();
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function() {}
                    this.nullifyPopupOnTouchStart();
                }
            }
        },
        nullifyPopupOnTouchStart: function() {}
    };
});