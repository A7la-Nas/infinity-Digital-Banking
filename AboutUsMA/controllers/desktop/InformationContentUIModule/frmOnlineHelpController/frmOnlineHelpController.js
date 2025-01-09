define(['FormControllerUtility', 'ViewConstants', 'CampaignUtility', 'CommonUtilities'], function(FormControllerUtility, ViewConstants, CampaignUtility, CommonUtilities) {
    var orientationHandler = new OrientationHandler();
    var segData = null;
    var flag = true;
    return {
        /*loadInformationModule- function to load InformationModule
         * @member of frmOnlineHelpController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        loadInformationModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AboutUsMA","moduleName":"InformationContentUIModule"});
        },
        /*toggleSideMenu- function to toggle Side Menus of FAQs
         * @member of frmOnlineHelpController
         * @param {widgetImg} - path of dropdown img widget
         * @param {widgetFlx} - path of Sub menu flex Widget
         * @returns {void} - None
         * @throws {void} -None
         */
        toggleSideMenu: function(widgetImg, widgetFlx) {
            if (widgetImg.src === ViewConstants.IMAGES.ARROW_UP) {
                widgetImg.src = ViewConstants.IMAGES.ARROW_DOWN;
                widgetFlx.setVisibility(false);
            } else {
                widgetImg.src = ViewConstants.IMAGES.ARROW_UP;
                widgetFlx.setVisibility(true);
            }
            this.AdjustScreen();
        },
        /*updateFormUI- function to update View
         * @member of frmOnlineHelpController
         * @param {viewModel} - viewModel
         * @returns {void} - None
         * @throws {void} -None
         */
        updateFormUI: function(viewModel) {
            var self = this;
            var param;
            if (viewModel !== undefined) {
                if (viewModel.showOnlineHelp) {
                    if (viewModel.showOnlineHelp.param === "preLoginView") {
                        this.view.help.flxRight.setVisibility(false);
                        this.showPreLoginView();
                    }
                    if (viewModel.showOnlineHelp.param != "preLoginView") {
                        this.view.help.flxRight.setVisibility(false);
                        this.showPostLoginView();
                        CampaignUtility.fetchPopupCampaigns();
                    }
                    this.view.customheader.flxTopmenu.topmenu.flxaccounts.skin = ViewConstants.SKINS.COPYSLFBOXL;
                    this.view.customheader.flxTopmenu.topmenu.flxTransfersAndPay.skin = ViewConstants.SKINS.COPYSLFBOXL;
                    this.view.help.imgSearchIcon.setVisibility(true);
                    this.showOnlineHelpLogin(viewModel.showOnlineHelp);
                    this.menuClick(viewModel.showOnlineHelp.param);
                    //           this.view.help.flxMenu1.onClick=this.toggleSideMenu.bind(this,this.view.help.imgMenu1Collapse, this.view.help.flxSubMenu1);
                    //           this.view.help.flxMenu2.onClick=this.toggleSideMenu.bind(this,this.view.help.imgSecuritySettingsCollapse, this.view.help.flxSubMenu2);
                    //           this.view.help.flxMenu3.onClick=this.toggleSideMenu.bind(this,this.view.help.imgAccountSettingsCollapse, this.view.help.flxSubMenu3);
                    this.view.help.imgSearchIcon.onClick = function() {
                        if (self.view.help.flxSearch.isVisible === true) {
                            self.loadInformationModule().presentationController.showFAQs();
                        } else {
                            self.view.help.flxSearch.setVisibility(true);
                            self.view.help.tbxHelpSearch.setFocus(true);
                            self.disableSearch();
                        }
                    }
                    this.view.help.flxClearSearch.onClick = function() {
                        self.view.help.tbxHelpSearch.text = "";
                        self.view.help.btnSearchGo.setEnabled(false);
                       // self.loadInformationModule().presentationController.showFAQs();
                       self.view.help.segResults.setData(segData);
                        if (self.view.help.tbxHelpSearch.text === "") {
                            self.view.help.flxClearSearch.setVisibility(false);
                            self.view.help.flxHelpHeader.setVisibility(false);
                            self.view.help.tbxHelpSearch.setActive(true);
                            self.view.help.lblFAQ.text = kony.i18n.getLocalizedString("i18n.informationContent.FrequentlyAskedQuestions");
                        }
                    }
                    this.view.help.tbxHelpSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
                    this.view.help.tbxHelpSearch.onDone = this.onSearchClick.bind(this);
                    this.view.help.btnSearchGo.onClick = this.onSearchClick.bind(this);
                    this.view.help.flxSubMenu1Option1.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu1Option2.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu1Option3.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu1Option4.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu2Option1.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu2Option2.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu2Option3.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu2Option4.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu3Option1.onClick = this.menuClick.bind(this);
                    this.view.help.flxSubMenu3Option2.onClick = this.menuClick.bind(this);
                }
                if (viewModel.showOnlineHelpResponse) {
                    if (viewModel.showOnlineHelpResponse.responseData === null || viewModel.showOnlineHelpResponse.status == "error") {
                        this.view.flxMainContainer.setVisibility(true);
                        this.view.flxHelp.setVisibility(false);
                        this.view.flxDowntimeWarning.setVisibility(true);
                        this.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.footerLinks.serverError");
                        FormControllerUtility.hideProgressBar(this.view);
                        this.AdjustScreen();
                    } else {
                        this.view.flxMainContainer.setVisibility(true);
                        this.view.help.flxRight.isVisible = true;
                        this.view.flxHelp.setVisibility(true);
                        this.view.help.flxHelpDetails.isVisible = true;
                        if (kony.application.getCurrentBreakpoint() == 640) {
                            this.view.help.flxHelpHeader.isVisible = false;
                        } else {
                            this.view.help.flxHelpHeader.isVisible = true;
                        }
                        this.view.help.flxDescriptionAndFAQHeader.isVisible = true;
                        this.view.help.lblFAQ.text = kony.i18n.getLocalizedString("i18n.informationContent.FrequentlyAskedQuestions");
                        FormControllerUtility.hideProgressBar(this.view);
                        if (viewModel.showOnlineHelpResponse.responseData != null && viewModel.showOnlineHelpResponse.responseParam != null) {
                            var searchStr = viewModel.showOnlineHelpResponse.responseParam;
                            var searchStrInUpper = searchStr ? searchStr.toUpperCase() : "";
                        }
                        var isSearchString = viewModel.showOnlineHelpResponse.isSearchString;
                        viewModel = viewModel.showOnlineHelpResponse.responseData;
                        if (viewModel.categories.length > 0) {
                            if (isSearchString === true) {
                                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.onlineHelp.searchResultsHeader") + "  " +  searchStr;
                                this.hideAllHighlighters();
                                this.view.help.imgIndicatorM1O1.width = this.view.help.lblM1O1.frame.width + 0 + "dp";
                                this.view.help.imgIndicatorM1O1.setVisibility(true);
                          		this.view.help.lblHelpHeader.setActive(true);	
                            } else {
                                this.view.help.lblHelpHeader.text = searchStr;
                                this.view.help.lblHelpHeader.setActive(true);
                            }
                            this.view.help.flxDescriptionAndFAQHeader.setVisibility(false);
                            var catLen = viewModel.categories.length;
                            var i, j;
                            param = new Array();
                            for (i = 0; i < catLen; i++) {
                                var faqsLen = viewModel.categories[i].faqs.length;
                                for (j = 0; j < faqsLen; j++) {
                                    if (isSearchString !== null && isSearchString !== undefined && isSearchString === true && viewModel.categories[i].faqs[j].question.toUpperCase().indexOf(searchStrInUpper) >= 0) {
                                        param.push({
                                            "question": viewModel.categories[i].faqs[j].question,
                                            "answer": viewModel.categories[i].faqs[j].answer
                                        });
                                    } else if (isSearchString === false && viewModel.categories[i].categoryName.toUpperCase().indexOf(searchStrInUpper) >= 0) {
                                        param.push({
                                            "question": viewModel.categories[i].faqs[j].question,
                                            "answer": viewModel.categories[i].faqs[j].answer
                                        });
                                    }
                                }
                            }
                        } else {
                            param = viewModel.categories[0].faqs;
                        }
                        if (param.length === 0) {
                            this.view.help.lblFAQ.setVisibility(true);
                            this.view.help.lblFAQ.text = kony.i18n.getLocalizedString("i18n.onlineHelp.noSearchResults");
                        }
                        this.setDataToSegment(param);
                        this.view.help.lblHelpHeader.setActive(true);
                    }
                }
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMainContainer");
                }
                this.updateHamburgerMenu();
            }
        },
        /**
         * preshow for form
         */
        preShow: function() {
            var self = this;
          self.view.help.lblImgMenu1.left = "11%";
          self.view.help.lblImgMenu1.centerY = "53%";
          
          self.view.help.lblImgMenu2.left = "11%";
          self.view.help.lblImgMenu2.centerY = "52%";
          
          self.view.help.lblImgMenu3.left = "11%";
          self.view.help.lblImgMenu3.centerY = "53%";
          FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['customheader', 'flxMainContainer', 'flxFooter', 'flxHeader', 'help.lblM1O1', 'help.lblM1O2', 'help.lblM1O3', 'help.lblM1O4', 'help.lblM2O1', 'help.lblM2O2', 'help.lblM2O3', 'help.lblM2O4', 'help.lblM3O1', 'help.lblM3O2', 'flxFormContent']);
            this.view.customheader.forceCloseHamburger();
            this.view.help.flxMenu1Collapse.setVisibility(false);
            this.view.help.flxMenu2Collapse.setVisibility(false);
            this.view.help.flxMenu3Collapse.setVisibility(false);
            this.view.help.flxSubMenu1.setVisibility(true);
            this.view.help.flxSubMenu2.setVisibility(true);
            this.view.help.flxSubMenu3.setVisibility(true);
            this.view.help.lblMenu1.text = kony.i18n.getLocalizedString("i18n.Profile.profilesettings");
            this.view.help.lblMenu2.text= kony.i18n.getLocalizedString("i18n.topmenu.transferpay");
            this.view.help.lblMenu3.text=kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            applicationManager.getNavigationManager().applyUpdates(this);
            CampaignUtility.fetchPopupCampaigns();
            this.view.flxLogout.setVisibility(false);
            this.view.customheader.btnSkip.onClick = this.skipNav;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.help.tbxHelpSearch.onKeyPress=this.onKeyPressCallBackSearchbox;
            this.view.help.flxSubMenu3Option2.onKeyPress= this.onKeyPressCallBackFinalSubmenuOption;
            this.view.help.flxSubMenu1Option1.onKeyPress= this.onKeyPressCallBackFirstSubmenuOption;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.customheader.lblHeaderMobile.accessibilityConfig = {
              a11yARIA: {
                tabindex: -1
              }
            }
            this.view.help.segResults.accessibilityConfig = {
              a11yARIA: {
                 tabindex: -1
              }
           }
        },
        skipNav: function() {
          this.view.help.lblHeading.setActive(true);
        },
        onKeyPressCallBackSearchbox: function (eventObject, eventPayload) {
            var self = this;
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (self.view.help.flxSearch.isVisible === true) {
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        eventPayload.preventDefault();
                        self.view.flxDropdownMobile.setActive(true);
                    }
                    else {
                        self.view.help.flxSearch.isVisible = false;
                        eventPayload.preventDefault();
                        self.view.help.imgSearchIcon.setActive(true);
                    }
                }
            }
        },
        onKeyPressCallBackFirstSubmenuOption: function (eventObject, eventPayload) {
            var self = this;
            if (kony.application.getCurrentBreakpoint() === 640) {
                if (self.view.help.flxMenuWrapper.isVisible === true) {
                    if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                        self.view.help.flxMenuWrapper.isVisible = false;
                        self.view.imgDropdownMobile.text = "O";
                        eventPayload.preventDefault();
                        self.view.flxDropdownMobile.setActive(true);
                        self.view.flxDropdownMobile.accessibilityConfig = {
                            a11yARIA: {
                                "aria-expanded": false,
                                "role": "button",
                                "aria-labelledby": "lblMobileContentHeader"
                            }
                        }
                    }
                    else if (eventPayload.keyCode === 27) {
                        self.view.help.flxMenuWrapper.isVisible = false;
                        self.view.imgDropdownMobile.text = "O";
                        eventPayload.preventDefault();
                        self.view.flxDropdownMobile.setActive(true);
                        self.view.flxDropdownMobile.accessibilityConfig = {
                            a11yARIA: {
                                "aria-expanded": false,
                                "role": "button",
                                "aria-labelledby": "lblMobileContentHeader"
                            }
                        }
                    }
                }
            }
        },
        onKeyPressCallBackFinalSubmenuOption : function(eventObject, eventPayload) {
            var self = this;
            if (kony.application.getCurrentBreakpoint() === 640) {
                if (self.view.help.flxMenuWrapper.isVisible === true) {
                    if (eventPayload.keyCode === 9 || eventPayload.keyCode === 27) {
                        if (eventPayload.shiftKey) {
                            eventPayload.preventDefault();
                            self.view.help.flxSubMenu3Option1.setActive(true);
                        }
                        else {
                            self.view.help.flxMenuWrapper.isVisible = false;
                            self.view.imgDropdownMobile.text = "O";
                            eventPayload.preventDefault();
                            self.view.flxDropdownMobile.setActive(true);
                            self.view.flxDropdownMobile.accessibilityConfig = {
                                a11yARIA: {
                                    "aria-expanded": false,
                                    "role": "button",
                                    "aria-labelledby": "lblMobileContentHeader"
                                }
                            }
                        }
                    }
                }
            }
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
        var self = this;
          if (eventPayload.keyCode === 27) {
            if (self.view.flxLogout.isVisible === true) {
              self.view.flxLogout.isVisible = false;
            }
            self.view.customheader.onKeyPressCallBack(eventObject,eventPayload);
            if (self.view.flxDialogs.isVisible === true) {
              self.view.flxDialogs.isVisible = false;
              self.view.customheader.headermenu.btnLogout.setFocus(true);
            }
          self.view.customheader.onKeyPressCallBack(eventObject,eventPayload);
          if(kony.application.getCurrentBreakpoint()===640){
            if(self.view.help.flxMenuWrapper.isVisible === true) {
              self.view.help.flxMenuWrapper.isVisible = false;
              self.view.imgDropdownMobile.text = "O";
              self.view.flxDropdownMobile.setActive(true);
           }
         }
        }
       },
        /*onSearchClick- function to search in help
         * @member of frmOnlineHelpController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        onSearchClick: function() {
            if (this.view.help.tbxHelpSearch.text.trim().length !== 0) {
                this.getSearchResults(this.view.help.tbxHelpSearch.text);
            }
        },
        /**
         *AdjustScreen- function to adjust the footer
         * @member of frmOnlineHelpController
         * @param {void} - None
         * @returns {void} - None
         * @throws {void} -None
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.frame.height + this.view.flxMainContainer.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.frame.height;
                if (diff > 0) this.view.flxFooter.top = mainheight + diff +550+ "dp";
                else this.view.flxFooter.top = mainheight + "dp";
            } else {
                this.view.flxFooter.top = mainheight - 250 + "dp";
            }
            if(kony.application.getCurrentBreakpoint()=== 640){
                this.view.flxFooter.top = mainheight + diff + 700 + "dp";
                this.view.help.flxMenuWrapper.height="70%";
                this.view.help.btnSearchGo.right="15px";
                this.view.help.flxSearchTextBox.right = "125px";
                this.view.help.flxSearchTextBox.left="25px";                
            }
            this.view.forceLayout();
        },
        /** On Search Text Key Up
         * @member  frmOnlineHelpController.js
         * @param  {object} event object
         * @returns {void} None
         * @throws {void} None
         */
        onTxtSearchKeyUp: function(event) {
            var self = this;
            var searchKeyword = self.view.help.tbxHelpSearch.text.trim();
            if (searchKeyword.length > 0) {
                self.enableSearch();
            } else {
                self.disableSearch();
            }
        },
        /** For enabling search icon
         * @member  frmOnlineHelpController.js
         * @param  {void} none
         * @returns {void} None
         * @throws {void} None
         */
        enableSearch: function() {
            var self = this;
            this.view.help.btnSearchGo.setEnabled(true);
            this.view.help.btnSearchGo.skin = ViewConstants.SKINS.NORMAL;
            this.view.help.btnSearchGo.focusSkin = ViewConstants.SKINS.FOCUS;
            this.view.help.btnSearchGo.hoverSkin = ViewConstants.SKINS.HOVER;
        },
        /** For disabling search icon
         * @member  frmOnlineHelpController.js
         * @param  {void} none
         * @returns {void} None
         * @throws {void} None
         */
        disableSearch: function() {
            var self = this;
            this.view.help.btnSearchGo.setEnabled(false);
            this.view.help.flxClearSearch.setVisibility(false);
            this.view.help.btnSearchGo.skin = ViewConstants.SKINS.BLOCKED;
            this.view.help.btnSearchGo.hoverSkin = ViewConstants.SKINS.BLOCKED;
            this.view.help.btnSearchGo.focusSkin = ViewConstants.SKINS.BLOCKED;
        },
        /**
         * getSearchResults: method that returns all faqs on the basis of matching string
         * @member of {frmOnlineHelpController}
         * @param none
         * @returns {void} - None
         * @throws {void} -None
         */
        getSearchResults: function(param) {
            var isSearchString = true;
            this.view.help.flxHelpDetails.setVisibility(false);
            this.loadInformationModule().presentationController.showOnlineHelpSubmenu(param.trim(), isSearchString);
            FormControllerUtility.showProgressBar(this.view);
        },
        /**
         * Method that takes category name as param and calls showOnlineHelpSubmenu of presentation controller.
         * @member of {frmOnlineHelpController}
         * @param {type} param - category name
         * @returns {void} - None
         * @throws {void} -None
         */
        onlineHelpSubmenuClicked: function(param) {
            if (kony.application.getCurrentBreakpoint() == 640) {
                this.view.lblMobileContentHeader.text = param;
                this.view.help.flxMenuWrapper.isVisible = false;
                this.view.imgDropdownMobile.text = "O";
            }
            var isSearchString = false;
            this.view.help.flxRight.setVisibility(false);
            this.loadInformationModule().presentationController.showOnlineHelpSubmenu(param, isSearchString);
            FormControllerUtility.showProgressBar(this.view);
        },
        /**
         * Method that renders form as per pre login conditions
         * @member of {frmOnlineHelpController}
         * @param {type} param - none
         * @returns {void} - None
         * @throws {void} -None
         */
        showPreLoginView: function() {
            this.view.flxFormContent.top = "70dp";
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.customheader.showPreLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
            this.view.customheader.imgKony.onTouchEnd = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                authModule.presentationController.showLoginScreen();
            };
        },
        /**
         * Method that renders form as per psot login conditions
         * @member of {frmOnlineHelpController}
         * @param {type} param - none
         * @returns {void} - None
         * @throws {void} -None
         */
        showPostLoginView: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxFormContent.top = "50dp";
            } else {
                this.view.flxFormContent.top = "120dp";
            }
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Help and Suopport");
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.customheader.showPostLoginView();
            this.view.customheader.headermenu.btnLogout.onClick = function() {
                self.view.flxDialogs.isVisible = true;
                self.view.CustomPopup.lblHeading.setActive(true);
                self.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
                self.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
                var height = self.view.flxHeader.frame.height + self.view.flxMainContainer.frame.height + self.view.flxFooter.frame.height;
                self.view.flxDialogs.left = "0%";
                self.view.forceLayout();
            };
            this.view.flxDropdownMobile.onClick = function() {
                if (self.view.help.flxMenuWrapper.isVisible === true) {
                    self.view.help.flxMenuWrapper.isVisible = false;
                    self.view.imgDropdownMobile.text = "O";
                    self.view.flxDropdownMobile.accessibilityConfig = {
                      a11yARIA: {
                        "aria-expanded": false,
                        "role": "button",
                        "aria-labelledby": "lblMobileContentHeader"
                      }
                    }
                } else {
                    self.view.help.flxMenuWrapper.isVisible = true;
                    self.view.imgDropdownMobile.text = "P";
                    self.view.flxDropdownMobile.accessibilityConfig = {
                      a11yARIA: {
                        "aria-expanded": true,
                        "role": "button",
                        "aria-labelledby": "lblMobileContentHeader"
                      }
                    }
                    //ARB-11726 - waiting for lblM1O1's width
                    if (self.view.help.lblM1O1.frame.width === 0) {
                        setTimeout(function() {
                            self.view.help.imgIndicatorM1O1.width = self.view.help.lblM1O1.frame.width + 0 + "dp";
                            self.view.help.forceLayout();
                        }, 0);
                    }
                }
            }
            this.view.CustomPopup.btnYes.onClick = function() {
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
                context = {
                    "action": "Logout"
                };
                authModule.presentationController.doLogout(context);
                self.view.flxDialogs.left = "-100%";
            };
            this.view.CustomPopup.btnNo.onClick = function() {
                self.view.flxDialogs.left = "-100%";
                self.view.flxLogout.isVisible = false;
                self.view.flxDialogs.isVisible = false;
                self.view.customheader.headermenu.btnLogout.setFocus(true);
            };
            this.view.CustomPopup.flxCross.onClick = function() {
                self.view.flxDialogs.left = "-100%";
                self.view.flxLogout.isVisible = false;
                self.view.flxDialogs.isVisible = false;
                self.view.customheader.headermenu.btnLogout.setFocus(true);
            };
            this.view.forceLayout();
        },
        /**
         * Method that hide all left side submenu highlighters
         * @member of {frmOnlineHelpController}
         * @param {type} none
         * @returns {void} - None
         * @throws {void} -None
         */
        hideAllHighlighters: function() {
            this.view.help.imgIndicatorM1O1.isVisible = false;
            this.view.help.imgIndicatorM1O2.isVisible = false;
            this.view.help.imgIndicatorM1O3.isVisible = false;
            this.view.help.imgIndicatorM1O4.isVisible = false;
            this.view.help.imgIndicatorM2O1.isVisible = false;
            this.view.help.imgIndicatorM2O2.isVisible = false;
            this.view.help.imgIndicatorM2O3.isVisible = false;
            this.view.help.imgIndicatorM2O4.isVisible = false;
            this.view.help.imgIndicatorM3O1.isVisible = false;
            this.view.help.imgIndicatorM3O2.isVisible = false;
        },
        /**
         * Method that takes either form name as parameter or onClick event as paramter and accordingly displays help of particular section
         * @member of {frmOnlineHelpController}
         * @param {type} param - Either form name or onClick event of form
         * @returns {void} - None
         * @throws {void} -None
         */
        menuClick: function(event) {
            var param;
            param = 'Sign In';
            this.view.help.lblFAQ.text = "";
            this.view.help.tbxHelpSearch.text = "";
            this.view.help.flxSearch.setVisibility(false);
            this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.common.login");
            this.hideAllHighlighters();
            this.view.help.imgIndicatorM1O1.width = 6 * this.view.help.lblM1O1.text.length + 2 + "dp";
            this.view.help.imgIndicatorM1O1.isVisible = true;
            if ((event && event.id === "flxSubMenu1Option1") || event === 'frmLogin') {
                this.view.help.imgIndicatorM1O1.width = 6 * this.view.help.lblM1O1.text.length + 2 + "dp";
                this.view.help.imgIndicatorM1O1.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.Login");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.common.login");
                param = 'Sign In';
            } else if ((event && event.id === "flxSubMenu1Option2") || event === 'frmAccountsDetails' || event === 'frmAccountsLanding' || event === 'frmBBAccountsLanding' || event === 'frmDashboard' || event === 'frmPersonalFinanceManagement' || event === 'frmPrintTransaction') {
                this.view.help.imgIndicatorM1O2.width = 6 * this.view.help.lblM1O2.text.length + 2 + "dp";
                this.view.help.imgIndicatorM1O2.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.AccountActivity");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.AccountActivityHeader");
                param = 'Account Activity';
            } else if ((event && event.id === "flxSubMenu1Option3") || event === '') {
                this.view.help.imgIndicatorM1O3.width = 6 * this.view.help.lblM1O3.text.length + 2 + "dp";
                this.view.help.imgIndicatorM1O3.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.StatementsDocs");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.StatementsDocsHeader");
                param = 'Statements And Documents';
            } else if ((event && event.id === "flxSubMenu1Option4") || event === 'frmMultiFactorAuthentication') {
                this.view.help.imgIndicatorM1O4.width = 6 * this.view.help.lblM1O4.text.length + 2 + "dp";
                this.view.help.imgIndicatorM1O4.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.Security");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.SecurityHeader");
                param = 'Security';
            } else if ((event && event.id === "flxSubMenu2Option1") || event === 'frmTransfers' || event === 'frmAddExternalAccount' || event === 'frmAddInternalAccount' || event === 'frmVerifyAccount' || event === 'frmConfirmAccount' || event === 'frmPayDueAmount' || event === 'frmPrintTransfer' || event === 'frmWireTransfer') {
                this.view.help.imgIndicatorM2O1.width = 6 * this.view.help.lblM2O1.text.length + 2 + "dp";
                this.view.help.imgIndicatorM2O1.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.Transfers");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
                param = 'Transfers';
            } else if ((event && event.id === "flxSubMenu2Option2") || event === 'frmBillPay' || event === 'frmAddPayee') {
                this.view.help.imgIndicatorM2O2.width = 6 * this.view.help.lblM2O2.text.length + 2 + "dp";
                this.view.help.imgIndicatorM2O2.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.BillPayments");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.BillPaymentsHeader");
                param = "Bill Payments";
            } else if ((event && event.id === "flxSubMenu2Option3") || event === 'frmPayAPerson') {
                this.view.help.imgIndicatorM2O3.width = 6 * this.view.help.lblM2O3.text.length + 2 + "dp";
                this.view.help.imgIndicatorM2O3.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.PayAPerson");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.p2p.PayAPerson");
                param = 'Person-to-Person';
            } else if ((event && event.id === "flxSubMenu2Option4") || event === 'frmCardManagement') {
                this.view.help.imgIndicatorM2O4.width = 6 * this.view.help.lblM2O4.text.length + 2 + "dp";
                this.view.help.imgIndicatorM2O4.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.Cards");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.CardsHeader");
                param = 'Cards';
            } else if ((event && event.id === "flxSubMenu3Option1") || event === 'frmProfileManagement') {
                this.view.help.imgIndicatorM3O1.width = 6 * this.view.help.lblM3O1.text.length + 2 + "dp";
                this.view.help.imgIndicatorM3O1.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.ProfileManagment");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.ProfileManagement");
                param = 'Profile Management';
            } else if ((event && event.id === "flxSubMenu3Option2") || event === 'frmNotificationsAndMessages') {
                this.view.help.imgIndicatorM3O2.width = 6 * this.view.help.lblM3O2.text.length + 2 + "dp"
                this.view.help.imgIndicatorM3O2.isVisible = true;
                this.view.help.rtxDescription.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.AlertsManagement");
                this.view.help.lblHelpHeader.text = kony.i18n.getLocalizedString("i18n.OnlineHelp.AlertsManagementHeader");
                param = 'Alerts and Communication';
            }
            if (param !== 'Sign In') {
                this.view.help.imgIndicatorM1O1.isVisible = false;
            }
            this.view.help.lblHelpHeader.setFocus(true);
            this.onlineHelpSubmenuClicked(param);
            if(kony.application.getCurrentBreakpoint()===640){
              this.setSearchMobileView();
            }
            if(event!==undefined){
            for(var i=1;i<=3;i++){
                var x=4;
                if(i===3){
                    x=2;
                }
                for(var z=1;z<=x;z++){
                    var id = "flxSubMenu"+i+"Option"+z;
                    if(id===event.id){
                        this.view.help[id].accessibilityConfig={
                            a11yARIA:{
                                "role":"tab",
                                "tabindex":0,
                                "aria-selected":true
                            }
                        }
                    }
                    else{
                        this.view.help[id].accessibilityConfig={
                            a11yARIA:{
                                "role":"tab",
                                "tabindex":0,
                                "aria-selected":false
                            }
                        }
                    }
                }
            }
            }
        },
        /**
         * Method that takes array of FAQ's as inout param and then maps data to segment
         * @member of {frmOnlineHelpController}
         * @param {type} param - response contains array of FAQ's
         * @returns {void} - None
         * @throws {void} -None
         */
        setDataToSegment: function(response) {
            var dataMap = {
                "flxHelp": "flxHelp",
                "flxQuestion": "flxQuestion",
                "flxAnswer": "flxAnswer",
                "rtxQuestion": "rtxQuestion",
                "rtxAnswer": "rtxAnswer"
            };
            var data = [];
            for (var i = 0; i < response.length; i++) {
                var list = {};
                list = {
                    "rtxQuestion": this.convertToRoman(i + 1) + ". " + response[i].question,
                    "rtxAnswer": response[i].answer,
                };
                data.push(list);
            }
            if (flag) {
                segData = data;
                flag = false;
            }
            this.view.help.segResults.widgetDataMap = dataMap;
            this.view.help.segResults.setData(data);
            this.AdjustScreen();
        },
        setSearchMobileView: function(){
          this.view.help.flxSearch.isVisible = true;
        },
        /**
         * Method that takes number as parameter and converts it to roman numeral
         * @member of {frmOnlineHelpController}
         * @param {type} param - any number
         * @returns {void} - roman numeral in string format
         * @throws {void} -None
         */
        convertToRoman: function(num) {
            var roman = {
                "M": 1000,
                "CM": 900,
                "D": 500,
                "CD": 400,
                "C": 100,
                "XC": 90,
                "L": 50,
                "XL": 40,
                "X": 10,
                "IX": 9,
                "V": 5,
                "IV": 4,
                "I": 1
            };
            var str = "";
            Object.keys(roman).forEach(function(i) {
                var q = Math.floor(num / roman[i]);
                num -= q * roman[i];
                var k = 0;
                while (k < q) {
                    str = str + i;
                    k++;
                }
                //str += i.repeat(q);
            });
            return str;
        },
        /**
         * Renders frmOnlineHelpController(turns on visibility of required flexs)
         * @member of {frmOnlineHelpController}
         * @param {type} param - none
         * @returns {void} - None
         * @throws {void} -None
         */
        showOnlineHelpLogin: function() {
            this.view.flxHeader.isVisible = true;
            this.view.help.flxHeader.isVisible = true;
            this.view.help.flxMenuWrapper.isVisible = true;
            this.view.help.flxHelpDetails.isVisible = true;
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.help.flxSeperator1.isVisible = false;
            } else {
                this.view.help.flxSeperator1.isVisible = true;
            }
        },
        updateHamburgerMenu: function() {
            this.view.customheader.customhamburger.activateMenu("About Us", "FAQs");
        },
        onBreakpointChange: function(width) {
            kony.print('on breakpoint change');
            orientationHandler.onOrientationChange(this.onBreakpointChange, function() {
                this.AdjustScreen();
            }.bind(this));
            this.view.customheader.onBreakpointChangeComponent(width);
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width)
            this.setupFormOnTouchEnd(width);
            this.view.flxMobileHeader.setVisibility(false);
            if (width === 640 || orientationHandler.isMobile) {
                this.view.flxMobileHeader.setVisibility(true);
                this.setSearchMobileView();
                this.view.help.flxMenuWrapper.height = "70%";
                this.view.help.flxMenuWrapper.skin = "sknFlxffffffShadowdddcdcTopRadiius0";
                this.view.customheader.customhamburger.width = "90%";
                this.view.help.flxMenuWrapper.accessibilityConfig={
                a11yARIA: {
                  "aria-live": "off",
                  "tabindex" : -1
                }
              };
              this.view.help.flxRight.accessibilityConfig={
                a11yARIA: {
                  "aria-live": "off",
                  "tabindex" : -1
                }
              }
            } else if (width === 1024) {
                this.view.customheader.customhamburger.width = "60%";
                this.view.help.flxMenuWrapper.accessibilityConfig={
                a11yARIA: {
                  "tabindex": -1
                }
              }
              this.view.help.flxRight.accessibilityConfig={
                a11yARIA: {
                  "tabindex": -1
                }
              }
            } else {
                this.view.help.flxMenuWrapper.height = "70%";
                this.view.help.flxMenuWrapper.skin = "slfSbox";
                this.view.customheader.customhamburger.width = "35%";
                this.view.help.flxMenuWrapper.accessibilityConfig={
                a11yARIA: {
                  "tabindex": -1
                }
              }
              this.view.help.flxRight.accessibilityConfig={
                a11yARIA: {
                  "tabindex": -1
                }
              }
            }
            this.AdjustScreen();
          
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
        nullifyPopupOnTouchStart: function() {},
        postShow: function() {
           // this.view.help.imgIndicatorM1O1.width = this.view.help.lblM1O1.frame.width + 2 + "dp";
            CommonUtilities.setA11yFoucsHandlers(this.view.help.tbxHelpSearch, this.view.help.flxSearchTextBox, this)
            this.AdjustScreen();
            this.view.help.flxClearSearch.setVisibility(false);
            var scopeObj =this;
            this.view.help.btnSearchGo.skin = "sknBtnBlockedSSP0273e315px";
            this.view.help.btnSearchGo.text = "Search";
            this.view.help.tbxHelpSearch.onTextChange = function () {
                scopeObj.view.help.flxClearSearch.setVisibility(true);
            };
            this.view.help.lblHelpHeader.setActive(true);
            this.view.help.tbxHelpSearch.accessibilityConfig = {
                a11yARIA: {
                    tabindex: 0,
                    "aria-autocomplete": "none"
                }
            };
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
            this.view.help.flxSubMenu1Option1.accessibilityConfig = {
                a11yARIA: {
                    "role": "tab",
                    "tabindex": 0,
                    "aria-selected": true
                }
            };
        }
    };
});