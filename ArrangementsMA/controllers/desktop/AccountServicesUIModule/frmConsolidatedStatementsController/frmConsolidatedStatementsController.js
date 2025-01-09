define(['FormControllerUtility','CommonUtilities','ViewConstants', 'CampaignUtility'],function(FormControllerUtility,CommonUtilities,ViewConstants, CampaignUtility){
  var orientationHandler = new OrientationHandler();
  return{
    /**
         * Method to load AccountServicesModule Module
         */
    accountsSegmentData:[],
    sectionData: [],
    accounts: [],
    isFavAccAvailable : false,
    isExtAccAvailable : false,
    isSingleCustomerProfile : true,
    isMobileBreakpoint:null,
    selectedAccountsPayload:null,
    primaryCustomerId : [],
    accountGroups: [],
    filterIndex: '',
    isRetailUser:"",
    selectedBusinessAccountType:"",
    customerId:"",
    init:function(){
      var self=this;
      this.view.preShow = this.preShowConsolidatedStatements;
      this.view.postShow = this.postShowConsolidatedStatements;
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
      this.view.accountsFilter.skin = "sknFlxffffff";
	  this.view.flxAccountsFilter.skin = "sknFlxffffffShadowdddcdc";
      this.view.flxClosePopup.onClick = function() {
                this.view.flxDownladstatementspopup.setVisibility(false);
                this.view.btnDownloadStatements.setActive(true);
            }.bind(this);
        this.view.flxCloseNotificationPopup.onClick = function() {
                self.view.flxGenerateStatementsPopup.setVisibility(false);
                self.view.btnDownloadStatements.setActive(true);
            }.bind(this);
        this.view.btnCancel.onClick = function() {
            this.view.flxDownladstatementspopup.setVisibility(false);
            this.view.btnDownloadStatements.setActive(true);
        }.bind(this);
      this.view.flxDropDown.onClick = function() {
        if (!this.view.flxAccountsFilter.isVisible) {
          this.view.accountsFilter.origin = true;
          this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          this.view.lblDropDownAccounts.text =ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          this.view.flxAccountsFilter.setVisibility(true);
          this.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": true,
                            "role": "button"
                        }
                    };
          this.view.flxDropDown.setActive(true);
        }else{
          this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          this.view.lblDropDownAccounts.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          this.view.flxAccountsFilter.setVisibility(false);
          this.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
          this.view.flxDropDown.setActive(true);
        }
      }.bind(this);
      this.view.flxDropDownAccounts.onClick = function() {
        if (!this.view.flxAccountsFilter.isVisible) {
          this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          this.view.flxAccountsFilter.setVisibility(true);
        } else {
          this.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          this.view.flxAccountsFilter.setVisibility(false);
          this.view.flxDropDown.setActive(true);
        }
      }.bind(this);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.view.segAccounts.rowTemplate = "flxConsolidatedListItemMobile";
        this.view.segAccounts.sectionHeaderTemplate = "flxConsolidatedSectionHeaderMobile";
      }else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
        this.view.segAccounts.rowTemplate = "flxAccountsConsolidatedListItemTablet";
        this.view.segAccounts.sectionHeaderTemplate = "flxConsolidatedSectionHeaderTablet";
      }
      else {
        this.view.segAccounts.rowTemplate = "flxAccountsConsolidatedListItem";
        this.view.segAccounts.sectionHeaderTemplate = "flxAccountsConsolidatedSectionHeader";
      }
      this.view.lblImgCloseDowntimeWarning.onTouchEnd = function() {
        self.showServerError("",false);
        //self.checkEnableDownloadStatement();
      }
     this.view.flxFilterListBoxPopup.onClick = function() {
        if (!this.view.flxDefaultFiltersWrapper.isVisible) {
          this.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
          this.view.flxDefaultFiltersWrapper.setVisibility(true);
          this.AdjustScreen();
          this.view.flxFilterListBoxPopup.accessibilityConfig={
                        "a11yARIA": { 
                        "aria-expanded": true,
                        "aria-labelledby": "lblSelectFormat",
                        "role": "button"
                    }
                    }
        }else{
          this.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
          this.view.flxDefaultFiltersWrapper.setVisibility(false);
          this.AdjustScreen();
          this.view.flxFilterListBoxPopup.accessibilityConfig={
                        "a11yARIA": { 
                        "aria-expanded": false,
                        "aria-labelledby": "lblSelectFormat",
                        "role": "button"
                    }
                    }
        }
      }.bind(this);
    },
    /**
         * Method to load AccountServicesModule Module
         */
    loadAccountServicesModule: function () { 
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountServicesUIModule");
    },
    shouldUpdateUI: function (viewModel) {
      return viewModel !== undefined && viewModel !== null;
    },
    fileFiltersCallback : function(rowNumber){
      var scope =this;
      var rowIndex = rowNumber;
      var segData = scope.view.segFileFilters.data;
      let selectedFilter = segData[rowIndex].lblFilterValue;
      try{
        if(selectedFilter.indexOf("kony.i18n.getLocalizedString") >= 0){
          selectedFilter = eval(selectedFilter);
        }
      }
      catch(e){
        selectedFilter = segData[rowIndex].lblFilterValue;
      }
        
      scope.view.lblSelectedFilterpopup.text = selectedFilter;
      scope.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
      scope.view.flxDefaultFiltersWrapper.setVisibility(false);
      scope.AdjustScreen();
      scope.view.flxFilterListBoxPopup.accessibilityConfig={
                "a11yARIA": { 
                "aria-expanded": false,
                "aria-labelledby": "lblSelectFormat",
                "role": "button"
            }
            }
      scope.view.flxFilterListBoxPopup.setActive(true);
    },
    updateFormUI: function (AccountServicesViewModel) {
      if (AccountServicesViewModel.showLoadingIndicator) {
          if (AccountServicesViewModel.showLoadingIndicator.status === true) {
            FormControllerUtility.showProgressBar(this.view)
          } else {
            FormControllerUtility.hideProgressBar(this.view)
          }
        }
      if(AccountServicesViewModel.showProgressBar){
        FormControllerUtility.showProgressBar(this.view);
      }
      else if(AccountServicesViewModel.hideProgressBar){
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (AccountServicesViewModel.onServerDownError) {
        this.showServerDownForm(AccountServicesViewModel.onServerDownError);
      }
      if(AccountServicesViewModel.showServerError){
        this.showServerError(AccountServicesViewModel.showServerError);
      }
      this.AdjustScreen();
    },
    /**
     * Method to handle Server errors. Will navigate to serverdown page.
     * @member frmConsolidatedStatementsController
     * @param {object} onServerDownError
     * @returns {void} - None
     * @throws {void} - None
     */
    showServerDownForm: function (onServerDownError) {
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authModule.presentationController.navigateToServerDownScreen();
    },
    showServerError: function (errMessage,showErrorMessage) {
      if(showErrorMessage){
      this.view.flxDowntimeWarning.isVisible = showErrorMessage;
      this.view.lblDowntimeWarning.text = errMessage;
      this.view.lblImgCloseDowntimeWarning.setFocus();
      }else{
        this.view.flxDowntimeWarning.isVisible = showErrorMessage;
      }
      this.AdjustScreen();
      this.view.scrollToBeginning();
    },
    /**
     * Post show for frmConsolidatedStatements
     * @member frmConsolidatedStatementsController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    postShowConsolidatedStatements:function(){
      var self = this;
      var segData=[];
      this.view.flxDowntimeWarning.isVisible = false;
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
      CommonUtilities.disableButton(this.view.btnDownloadStatements);
      this.view.calFromDate.onSelection = this.checkEnableDownloadStatement;
      this.isMobileBreakpoint=kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile;
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxDowntimeWarning.isVisible = false;
      this.view.flxDownladstatementspopup.setVisibility(false);
      this.view.customPopupLogoutcs.doLayout = CommonUtilities.centerPopupFlex;
      this.view.flxDropDown.accessibilityConfig = {                
                "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                "a11yARIA": {
                    "aria-expanded": false,
                    "role": "button"
                }
            };
      this.view.segFileFilters.accessibilityConfig = {
                "a11yARIA":{
                    "tabindex":-1
                }
            }
      this.AdjustScreen();
      this.accounts = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"}).presentationController.accounts; 
      this.setCustomViewsSegmentData(this.accounts);
      this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "Account Statements");
      this.initializeFilterSegments();
      this.view.calFromDate.clear();
      this.setCalenderDates();
      this.view.lblImgCloseDowntimeWarning.onTouchStart = function(){
        self.view.flxDowntimeWarning.isVisible = false;
      }
      applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: false
          }
        });
        var calFromDateContext = {
          "widget": this.view.calFromDate,
          "anchor": "bottom"
      };
      this.view.calFromDate.setContext(calFromDateContext);
      var calToDateContext = {
          "widget": this.view.calToDate,
          "anchor": "bottom"
      };
      this.view.accountsFilter.segDefaultFilters.accessibilityConfig = {
					a11yARIA: {
                        tabindex: -1
                    }
				};
        segData[0]={
            "flxFileFilter":{
                "onKeyPress":self.onKeyPressCallBackFileTypeMenu,
                "onClick": function(eventobject, context) {
                        self.fileFiltersCallback(0);
                    }.bind(this),
                    "accessibilityConfig": {
                        "a11yLabel": "PDF",
                        "a11yARIA": {
                            "role": "button"
                        }
                    }
            },
            "lblFilterValue":"PDF"
        };
        segData[1]={
            "flxFileFilter":{
                "onKeyPress":self.onKeyPressCallBackFileTypeMenu,
                "onClick": function(eventobject, context) {
                        self.fileFiltersCallback(1);
                    }.bind(this),
                    "accessibilityConfig": {
                        "a11yLabel": "Excel",
                        "a11yARIA": {
                            "role": "button"
                        }
                    }
            },
            "lblFilterValue":"Excel"
        };
        segData[2]={
            "flxFileFilter":{
                "onKeyPress":self.onKeyPressCallBackFileTypeMenu,
                "onClick": function(eventobject, context) {
                        self.fileFiltersCallback(2);
                    }.bind(this),
                     "accessibilityConfig": {
                        "a11yLabel": "CSV",
                        "a11yARIA": {
                            "role": "button"
                        }
                    }
            },
            "lblFilterValue":"CSV"
        };
        this.view.segFileFilters.setData(segData);
      this.view.calToDate.setContext(calToDateContext);
      this.view.flxRightContainer.zIndex = 100;
    },
    /**
     * Funtion to adjust screen
     * @member frmConsolidatedStatementsController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    AdjustScreen: function() {
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.customheader.info.frame.height + this.view.flxMainContainer.info.frame.height;
      if(this.view.customheader.info.frame.height==0){
        mainheight+=120;
      }
      if(this.view.flxDowntimeWarning.isVisible){
        mainheight += 60;
      }
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0)
          this.view.flxFooter.top = mainheight + diff + "dp";
        else
          this.view.flxFooter.top = mainheight + "dp";
      } else {
        this.view.flxFooter.top = mainheight + "dp";
      }
      if(orientationHandler.isTablet || (kony.application.getCurrentBreakpoint() <= 1024 && kony.application.getCurrentBreakpoint() > 640)) {
        this.view.customFooterMaincs.centerX="";
        this.view.customFooterMaincs.left="0dp";
      }
      this.view.forceLayout();
    },
    /**
     * Pre show of frmConsolidatedStatements
     * @member frmConsolidatedStatementsController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    preShowConsolidatedStatements: function() {
      var scopeObj = this;
      this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
      this.isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
      this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      this.view.customheader.forceCloseHamburger();
      this.view.onBreakpointChange = function(){
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.view.customheader.topmenu.flxaccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU_HOVER;
      this.view.calFromDate.placeholder = kony.i18n.getLocalizedString("i18n.combinedStatements.selectDateHere");
      //this.view.btnDownloadStatements.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      //this.view.btnDownload.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
      //this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
     // this.view.btnOkay.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
      this.view.btnDownload = kony.i18n.getLocalizedString("i18n.mb.ButtonCreate");
      this.view.customheader.btnSkip.onClick = this.skipNav;
      this.view.flxLogout.setVisibility(false);
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
      this.view.flxDownladstatementspopup.onKeyPress = this.onKeyPressDownloadPopupCallBack;
      this.view.flxGenerateStatementsPopup.onKeyPress= this.onKeyPressGenerateStatementsCallBack;
      this.view.flxDropDownAccounts.onKeyPress = this.onKeyPressCallBackAccountListMenu;
      this.view.forceLayout();
      FormControllerUtility.updateWidgetsHeightInInfo(this,['customheader','flxMainContainer','flxHeaderPostLogin','flxFooter','flxHeader','flxFormContent']);
    },
    skipNav: function() {
            this.view.lblConsolidatedStatements.setActive(true);
        },
    onKeyPressCallBack: function(eventObject, eventPayload) {
        var self = this;
        if (eventPayload.keyCode === 27) {
            if (self.view.flxAccountsFilter.isVisible === true) {
                self.view.flxAccountsFilter.setVisibility(false);
                self.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                self.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
                self.view.flxDropDown.setActive(true);
            }
            if (self.view.flxLogout.isVisible === true) {
                self.view.flxLogout.isVisible = false;
                self.view.customheader.headermenu.btnLogout.setActive(true);
            }                
        }
    },
     onKeyPressCallBackAccountListMenu: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.accountsFilter.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxAccountsFilter.setVisibility(false);
                    self.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
                    self.view.flxDropDown.setActive(true);                    
                }             
            }  
            if (eventPayload.shiftKey && eventPayload.keyCode === 9){
                if (self.view.accountsFilter.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxAccountsFilter.setVisibility(false);
                    self.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
                    self.view.flxDropDown.setActive(true);                    
                }
            }
        },

        onKeyPressCallBackSegAccountListMenu: function(eventObject, eventPayload, context) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.accountsFilter.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxAccountsFilter.setVisibility(false);
                    self.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
                    self.view.flxDropDown.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
				self.view.flxAccountsFilter.setVisibility(false);
				self.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                self.view.flxDropDown.accessibilityConfig = {                
                        "a11yLabel": "currently showing "+kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")+". Click to show list of views.",
                        "a11yARIA": {
                            "aria-expanded": false,
                            "role": "button"
                        }
                    };
				self.view.flxDropDown.setActive(true);
				
            }            
        },
        onKeyPressCallBackFileTypeMenu: function(eventObject, eventPayload, context) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDefaultFiltersWrapper.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxDefaultFiltersWrapper.setVisibility(false);
                    self.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxFilterListBoxPopup.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-expanded": false,
                            "aria-labelledby": "lblSelectFormat",
                            "role": "button"
                        }
                    };
                    self.view.flxFilterListBoxPopup.setActive(true);
                }
            }
            if (eventPayload.keyCode === 9 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
                if (self.view.flxDefaultFiltersWrapper.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxDefaultFiltersWrapper.setVisibility(false);
                    self.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxFilterListBoxPopup.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-expanded": false,
                            "aria-labelledby": "lblSelectFormat",
                            "role": "button"
                        }
                    };
                    self.view.flxFilterListBoxPopup.setActive(true);
                }
            }
			
	if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (context.rowIndex === 0) {
                   if (self.view.flxDefaultFiltersWrapper.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxDefaultFiltersWrapper.setVisibility(false);
                    self.view.lblDropDownPopup.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    self.view.flxFilterListBoxPopup.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-expanded": false,
                            "aria-labelledby": "lblSelectFormat",
                            "role": "button"
                        }
                    };
                    self.view.flxFilterListBoxPopup.setActive(true);
                }
                }
            }
        },
        onKeyPressDownloadPopupCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDownladstatementspopup.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxDownladstatementspopup.setVisibility(false);                    
                    self.view.btnDownloadStatements.setActive(true);
                }
            }
        },
        onKeyPressGenerateStatementsCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxGenerateStatementsPopup.isVisible === true) {
                    eventPayload.preventDefault();
                    self.view.flxGenerateStatementsPopup.setVisibility(false);
                    self.view.btnDownloadStatements.setActive(true);
                }
            }
        },
        
    /**
     * Toggle checkbox
     * @member frmConsolidatedStatementsController
     * @param {String} lblCheckBox
     * @returns {void} - None
     * @throws {void} - None
     */
    toggleCheckBox: function (lblCheckBox) {
      CommonUtilities.toggleCheckbox(lblCheckBox);
    },
    /**
    * Disable button
    * @member frmConsolidatedStatementsController
    * @param {String} button
    * @returns {void} - None
    * @throws {void} - None
    */
    disableButton: function (button) {
      button.setEnabled(false);
      button.skin = ViewConstants.SKINS.BLOCKED;
      button.hoverSkin = ViewConstants.SKINS.BLOCKED;
      button.focusSkin = ViewConstants.SKINS.BLOCKED;
    },
    /**
    * Enable button
    * @member frmConsolidatedStatementsController
    * @param {String} button
    * @returns {void} - None
    * @throws {void} - None
    */
    enableButton: function (button) {
      button.setEnabled(true);
      button.skin = ViewConstants.SKINS.NORMAL;
      button.hoverSkin = ViewConstants.SKINS.HOVER;
      button.focusSkin = ViewConstants.SKINS.FOCUS;
    },
    /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmAccountsLandingController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
    onBreakpointChange: function(width) {
      var scope = this;
      //this.view.customPopupcs.onBreakpointChangeComponent(scope.view.customPopupcs,width);
      this.view.customPopupLogoutcs.onBreakpointChangeComponent(scope.view.customPopupLogoutcs,width);
      this.view.customFooterMaincs.lblCopyright.text = kony.i18n.getLocalizedString("i18n.footer.copyright");
      //this.orientationHandler.onOrientationChange(this.onBreakpointChange);
      this.view.customheader.onBreakpointChangeComponent(width);
      this.setupFormOnTouchEnd(width);
      var scope = this;
      if (width === 640) {
        this.view.customPopupLogoutcs.width = "75%";
      }
      this.AdjustScreen();
    },
    setupFormOnTouchEnd: function(width){
      if(width==640){
        this.view.onTouchEnd = function(){}
        this.nullifyPopupOnTouchStart();
      }else{
        if(width==1024){
          this.view.onTouchEnd = function(){}
          this.nullifyPopupOnTouchStart();
        }else{
          this.view.onTouchEnd = function(){
            hidePopups();
          }
        }
        var userAgent = kony.os.deviceInfo().userAgent;
        if (userAgent.indexOf("iPad") != -1) {
          this.view.onTouchEnd = function(){}
          this.nullifyPopupOnTouchStart();
        } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
          this.view.onTouchEnd = function(){}
          this.nullifyPopupOnTouchStart();
        }
      }
    },
    nullifyPopupOnTouchStart: function(){
    },
    /**
     * toggleSegmentAccountCheckbox : SelectAll functionality .
     */
    toggleSegmentAccountCheckbox: function (sectionIndex, rowIndex) {
      var data = this.view.segAccounts.data;
      var skin = "";
      var selectedAccountRowIndex = this.view.segAccounts.selectedRowIndex;
      var isDesktop = kony.application.getCurrentBreakpoint() > 1024 || orientationHandler.isDesktop;
      if (isDesktop) {
        skin = "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43"
        this.skinToggleSegmentAccountCheckbox(data, sectionIndex, rowIndex, skin);
      } else {
        skin = "skn0273e315pxolbfonticons"
        this.skinToggleSegmentAccountCheckbox(data, sectionIndex, rowIndex, skin);
      }
      this.view.segAccounts.setData(data);
      this.view.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsConsolidatedSectionHeader.flxHeaderWrapper.flxDropdown.flxCheckBox");
      this.checkEnableDownloadStatement();
      this.view.forceLayout();
    },
    skinToggleSegmentAccountCheckbox: function (data, sectionIndex, rowIndex, skin) {
      var checkboxUIValue;
      if (!kony.sdk.isNullOrUndefined(data[sectionIndex]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][0]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1])) {
        checkboxUIValue = data[sectionIndex][0].lblCheckBox.text === "D" ? "D" : "C";
        var SectionData = data[sectionIndex][1];
        if (checkboxUIValue === "D") {
          data[sectionIndex][0].lblCheckBox = {
            "skin": "skn0273e315pxolbfonticons",
            "text": "C"
          };
          data[sectionIndex][0].flxCheckBox.accessibilityConfig = {
            "a11yLabel": "select All " +data[sectionIndex][0].lblAccountTypeHeader.text,
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true
                        }
                    };
          for (var i = 0; i < SectionData.length; i++) {
            data[sectionIndex][1][i].lblCheckBox = {
              "skin": skin,
              "text": "C"
            };
            data[sectionIndex][1][i].flxCheckBox.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "aria-labelledby":"lblAccountName"
                        }
                    };
            if (!this.isMobileBreakpoint && data[sectionIndex][1][i].flxRightAccounts.isVisible === true) {
              data[sectionIndex][1][i].lblCheckBoxRight = {
                "skin": skin,
                "text": "C"
              };
              data[sectionIndex][1][i].flxRightCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblRightAccountName"
                                }
                            };
            }
          }
        } else {
          data[sectionIndex][0].lblCheckBox = {
            "skin": "skn0273e315pxolbfonticons",
            "text": "D"
          };
          data[sectionIndex][0].flxCheckBox.accessibilityConfig = {
                        "a11yLabel": "select All " +data[sectionIndex][0].lblAccountTypeHeader.text,
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false
                        }
                    };
          for (var i = 0; i < SectionData.length; i++) {
            data[sectionIndex][1][i].lblCheckBox = {
              "skin": skin,
              "text": "D"
            };
            data[sectionIndex][1][i].flxCheckBox.accessibilityConfig = {
                            "a11yARIA": {
                                "role": "checkbox",
                                "aria-checked": false,
                                "aria-labelledby": "lblAccountName"
                            }
                        };
            if (!this.isMobileBreakpoint && data[sectionIndex][1][i].flxRightAccounts.isVisible === true) {
              data[sectionIndex][1][i].lblCheckBoxRight = {
                "skin": skin,
                "text": "D"
              };
              data[sectionIndex][1][i].flxRightCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": false,
                                    "aria-labelledby": "lblRightAccountName"
                                }
                            };
            }
          }
        }
      }
    },

    toggleSegmentRowCheckbox: function (params) {
      var data = this.view.segAccounts.data;
      var checkboxUIValue;
      var selectedAccountRowIndex = this.view.segAccounts.selectedRowIndex;
      var sectionIndex = params.sectionIndex;
      var rowIndex = params.rowIndex;
      var isSecondRow = params.isSecondRow;
      var SectionData = data[sectionIndex][1];
      var areAllAccountsselected = true;
      //Getting the value of the checkbox in UI to see it is selected or not
      if (!kony.sdk.isNullOrUndefined(data[sectionIndex]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][0]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][1][rowIndex])) {
        if (isSecondRow) {
          checkboxUIValue = data[sectionIndex][1][rowIndex].lblCheckBoxRight.text === "D" ? "D" : "C";
        } else {
          checkboxUIValue = data[sectionIndex][1][rowIndex].lblCheckBox.text === "D" ? "D" : "C";
        }
        var isDesktop = kony.application.getCurrentBreakpoint() > 1024 || orientationHandler.isDesktop;
        if (isDesktop) {
          //toggling the value in the UI
          if (checkboxUIValue === "D") {
            if (isSecondRow) {
              data[sectionIndex][1][rowIndex].lblCheckBoxRight = {
                "skin": "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43",
                "text": "C"
              };
              data[sectionIndex][1][rowIndex].flxRightCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblRightAccountName"
                                }
                            };
            } else {
              data[sectionIndex][1][rowIndex].lblCheckBox = {
                "skin": "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43",
                "text": "C"
              };
              data[sectionIndex][1][rowIndex].flxCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblAccountName"
                                }
                            };
            }
          } else {
            if (isSecondRow) {
              data[sectionIndex][1][rowIndex].lblCheckBoxRight = {
                "skin": "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43",
                "text": "D"
              };
              data[sectionIndex][1][rowIndex].flxRightCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": false,
                                    "aria-labelledby": "lblRightAccountName"
                                }
                            };
            } else {
              data[sectionIndex][1][rowIndex].lblCheckBox = {
                "skin": "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43",
                "text": "D"
              };
              data[sectionIndex][1][rowIndex].flxCheckBox.accessibilityConfig = {
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked": false,
                                    "aria-labelledby": "lblAccountName"
                                }
                            };
            }
          }
        } else {
          if (checkboxUIValue === "D") {
            if (isSecondRow) {
              data[sectionIndex][1][rowIndex].lblCheckBoxRight = {
                "skin": "skn0273e315pxolbfonticons",
                "text": "C"
              };
            } else {
              data[sectionIndex][1][rowIndex].lblCheckBox = {
                "skin": "skn0273e315pxolbfonticons",
                "text": "C"
              };
            }
          } else {
            if (isSecondRow) {
              data[sectionIndex][1][rowIndex].lblCheckBoxRight = {
                "skin": "skn0273e315pxolbfonticons",
                "text": "D"
              };
            } else {
              data[sectionIndex][1][rowIndex].lblCheckBox = {
                "skin": "skn0273e315pxolbfonticons",
                "text": "D"
              };
            }
          }
        }
        //Checking is all the accounts of the section is selected
        for (var i = 0; i < SectionData.length; i++) {
          if (data[sectionIndex][1][i].lblCheckBox.text !== undefined && data[sectionIndex][1][i].lblCheckBox.text !== null) {
            if (data[sectionIndex][1][i].lblCheckBox.text === "D") {
              areAllAccountsselected = false;
            }
          }
          if (data[sectionIndex][1][i].lblCheckBoxRight.text !== undefined && data[sectionIndex][1][i].lblCheckBoxRight.text !== null && data[sectionIndex][1][i].flxRightAccounts.isVisible === true) {
            if (data[sectionIndex][1][i].lblCheckBoxRight.text === "D") {
              areAllAccountsselected = false;
            }
          }
        }
        if (areAllAccountsselected) {
          data[sectionIndex][0].lblCheckBox = {
            "skin": "skn0273e315pxolbfonticons",
            "text": "C"
          };
          data[sectionIndex][0].flxCheckBox.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true,
                            "aria-labelledby": "lblSelectAll"
                        }
                    };
        } else {
          data[sectionIndex][0].lblCheckBox = {
            "skin": "skn0273e315pxolbfonticons",
            "text": "D"
          };
          data[sectionIndex][0].flxCheckBox.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "aria-labelledby": "lblSelectAll"
                        }
                    };
        }
        this.view.segAccounts.setData(data);
        if(isSecondRow){
                    this.view.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsConsolidatedListItem.flxAccountListItemWrapper.flxRightAccounts.flxRightCheckBox");
                    }
                    else{
                    this.view.segAccounts.setActive(selectedAccountRowIndex[1], selectedAccountRowIndex[0],"flxAccountsConsolidatedListItem.flxAccountListItemWrapper.flxLeftAccounts.flxCheckBox");
                    }
        this.checkEnableDownloadStatement();
        this.view.forceLayout();
      }
    },
    toggleAccountsSegment: function (context) {
      var sectionIndex = context.sectionIndex;
      var data = this.view.segAccounts.data;
      var selectedAccountRowIndex = context.rowIndex;
      var dropDownUIValue;
      if (!kony.sdk.isNullOrUndefined(data[sectionIndex]) && !kony.sdk.isNullOrUndefined(data[sectionIndex][0])) {
        if (data[sectionIndex][0].lblDropDown.text !== undefined && data[sectionIndex][0].lblDropDown.text !== null) {
          dropDownUIValue = data[sectionIndex][0].lblDropDown.text;
        }
        if (data[sectionIndex] !== null) {
          if (dropDownUIValue === "P") {
            data[sectionIndex][0]["lblDropDown"] = {
              text: "O"
            };
            data[sectionIndex][0]["flxSelectAllDropdown"].accessibilityConfig ={          
                            "a11yLabel":"Show list of type of accounts",                  
                            "a11yARIA": {
                                "aria-expanded": false,
                                "role": "button"
                            },
                        };
            data[sectionIndex][0]["flxbottomSpace"] = {
              isVisible: false
            };
			data[sectionIndex][0]["lblCheckBox"] = {
                          skin:data[sectionIndex][0]["lblCheckBox"].skin,
                          text:data[sectionIndex][0]["lblCheckBox"].text,
						  isVisible:false
                            };
                                data[sectionIndex][0]["lblSelectAll"] = {
                                     isVisible: false 
                         };
                         data[sectionIndex][0]["flxCheckBox"] = {
                            isVisible: false
                        };
            if (data[sectionIndex][1] !== null)
              this.accountsSegmentData[sectionIndex] = [];
            this.accountsSegmentData[sectionIndex][1] = this.view.segAccounts.data[sectionIndex][1];
            data[sectionIndex][1] = [];
            this.view.segAccounts.setData(data);
            if (kony.application.getCurrentBreakpoint() === 640 ){
                 this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxConsolidatedSectionHeaderMobile.flxHeaderWrapper.flxDropDown");
                        }
            if (kony.application.getCurrentBreakpoint() === 1024) {
                            this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxConsolidatedSectionHeaderTablet.flxHeaderWrapper.flxDropdownTablet.flxSelectAllDropdown");
                        } 
                        else{
                            
                            this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxAccountsConsolidatedSectionHeader.flxHeaderWrapper.flxDropdown.flxSelectAllDropdown");
                        }
              } 
              else {
            data[sectionIndex][0]["lblDropDown"] = {
              text: "P"
            };
            data[sectionIndex][0]["flxSelectAllDropdown"].accessibilityConfig ={   
                            "a11yLabel":"Show list of type of accounts",                         
                            "a11yARIA": {
                                "aria-expanded": true,
                                "role": "button"
                            },
                        };
            data[sectionIndex][0]["flxbottomSpace"] = {
              isVisible: true
            };
			data[sectionIndex][0]["lblCheckBox"] = {
                          skin:data[sectionIndex][0]["lblCheckBox"].skin,
                          text:data[sectionIndex][0]["lblCheckBox"].text,
						  isVisible:true
                            };
                                data[sectionIndex][0]["lblSelectAll"] = {
                                     isVisible: true
                         };
                         data[sectionIndex][0]["flxCheckBox"] = {
                            isVisible: true,
                            "accessibilityConfig": {
                                "a11yLabel": "select All " + data[sectionIndex][0].lblAccountTypeHeader.text,
                                "a11yARIA": {
                                    "role": "checkbox",
                                    "aria-checked":(data[sectionIndex][0]["lblCheckBox"].text === 'C') ? true : false
                                }
                            }
                        };
            if (data[sectionIndex][1] !== null)
              data[sectionIndex][1] = this.accountsSegmentData[sectionIndex][1];
            this.view.segAccounts.setData(data);
            if (kony.application.getCurrentBreakpoint() === 640 ){
                this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxConsolidatedSectionHeaderMobile.flxHeaderWrapper.flxDropDown");                            
                        }
            if (kony.application.getCurrentBreakpoint() === 1024) {
                            this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxConsolidatedSectionHeaderTablet.flxHeaderWrapper.flxDropdownTablet.flxSelectAllDropdown");
                        } 
                        else{
                            this.view.segAccounts.setActive(selectedAccountRowIndex, sectionIndex, "flxAccountsConsolidatedSectionHeader.flxHeaderWrapper.flxDropdown.flxSelectAllDropdown");
                        }
            }
        }
      }
    },
    checkEnableDownloadStatement : function(){
      var data=this.view.segAccounts.data;
      var isAnyAccountSelected= false;
      var sectionData;
      //Checking is any of the account is selected
      for (var i = 0; i < data.length; i++) {
        sectionData=data[i][1];
        for(var j = 0; j < sectionData.length; j++){
          if(sectionData[j].lblCheckBox.text!==undefined && sectionData[j].lblCheckBox.text!==null ){
            if(sectionData[j].lblCheckBox.text==="C"){
              isAnyAccountSelected=true;
              break;
            }
          }
          if(!this.isMobileBreakpoint && sectionData[j].lblCheckBoxRight.text!==undefined && sectionData[j].lblCheckBoxRight.text!==null ){
            if(sectionData[j].lblCheckBoxRight.text==="C"){
              isAnyAccountSelected=true;
              break;
            }
          }
        }
      }
      var toDateObj = this.view.calToDate;
      var fromDateObj = this.view.calFromDate;
      if (isAnyAccountSelected && (fromDateObj.formattedDate || fromDateObj.formattedDate !== "")) {
          var fromDate = new Date(fromDateObj.year, fromDateObj.month - 1, fromDateObj.day);
          var toDate = new Date(toDateObj.year, toDateObj.month - 1, toDateObj.day);
          if(fromDate <= toDate){
              CommonUtilities.enableButton(this.view.btnDownloadStatements);
              return true;
          }
          else{
              CommonUtilities.disableButton(this.view.btnDownloadStatements);
              return false;
          }
      } else {
          CommonUtilities.disableButton(this.view.btnDownloadStatements);
          return false;
      }
    },
    
    getSelectedAccountsInfo : function(){
      var data=this.view.segAccounts.data;
      var sectionData;
      var selectedAccount;
      var selectedAccInfo={};
      var payload={};
      payload.userId = applicationManager.getUserPreferencesManager().getUserObj().userId;
      var fromDateArray=this.view.calFromDate.dateComponents;
      var toDateArray=this.view.calToDate.dateComponents;
      if(fromDateArray!==null && fromDateArray.length>=2 && toDateArray!==null && toDateArray.length>=2){
        var startMonth = fromDateArray[1] >= 10 ? fromDateArray[1] : ("0" + fromDateArray[1]);
        var startDay = fromDateArray[0] > 9 ? fromDateArray[0] : ("0" + fromDateArray[0]);
        payload.fromDate = fromDateArray[2] + "-" + startMonth + "-" + startDay;
        var endMonth = toDateArray[1] >= 10 ? toDateArray[1] : ("0" + toDateArray[1]);
        var endDay = toDateArray[0] > 9 ? toDateArray[0] : ("0" + toDateArray[0]);
        payload.toDate = toDateArray[2] + "-" + endMonth + "-" + endDay;
      }
      //Collecting the date of the selected accounts
      for (var i = 0; i < data.length; i++) {
        sectionData=data[i][1];
        for(var j = 0; j < sectionData.length; j++){
          if(sectionData[j].lblCheckBox.text!==undefined && sectionData[j].lblCheckBox.text!==null ){
            if(sectionData[j].lblCheckBox.text==="C"){
              selectedAccount=sectionData[j].selectedAccInfo;
              if(!(selectedAccInfo.hasOwnProperty(selectedAccount.coreCustomerId))){
                selectedAccInfo[selectedAccount.coreCustomerId] = [];
              }
              selectedAccInfo[selectedAccount.coreCustomerId].push(selectedAccount.accountID);
            }
          }
          //For second column accounts in the segment
          if(!this.isMobileBreakpoint && sectionData[j].lblCheckBoxRight.text!==undefined && sectionData[j].lblCheckBoxRight.text!==null ){
            if(sectionData[j].lblCheckBoxRight.text==="C"){
              selectedAccount=sectionData[j].selectedAccInfoRight;
              if(!(selectedAccInfo.hasOwnProperty(selectedAccount.coreCustomerId))){
                selectedAccInfo[selectedAccount.coreCustomerId] = [];
              }
              selectedAccInfo[selectedAccount.coreCustomerId].push(selectedAccount.accountID);
            }
          }
        }
      }
      payload.accountsInfo = JSON.stringify(selectedAccInfo).replace(/"/g, "'");
      return payload;
    },

    showdownloadpopup: function(){
      var message;
      var scope = this;
      if (!(message = this.getDateValidationErrorMessage())){
        var screenheight =this.view.flxFooter.info.frame.height +this.view.flxFooter.info.frame.y;
        this.view.flxDownladstatementspopup.height = screenheight + "dp";
        this.view.flxDownladstatementspopup.setVisibility(true);
        this.view.flxDownladstatementspopup.isModalContainer=true;
        this.view.flxHeaderPostLogin.setFocus(true);
        var fromDate=this.view.calFromDate.formattedDate;
        var toDate=this.view.calToDate.formattedDate;
        if(fromDate!=="" && fromDate!==undefined && fromDate!==null){
          var selectedDateRange="("+fromDate+" - "+toDate+")";
          this.view.lblSelectedDateRange.text=selectedDateRange;
        }else{
          this.view.lblSelectedDateRange.text="Please select valid StartDate";
        }
        this.view.forceLayout();
        this.view.lblHeader.setActive(true);
        this.view.scrollToBeginning();
      }else{
        this.showServerError(message,true);
      }
    },

    /**
       * method to set segment data for accounts
       *
      */
    setCustomViewsSegmentData : function(accounts){
        this.view.segAccounts.setVisibility(true);
        this.view.segAccounts.widgetDataMap = {
          "flxAccountsConsolidatedListItem": "flxAccountsConsolidatedListItem",
          "flxConsolidatedListItemMobile":"flxConsolidatedListItemMobile",
          "flxAccountsConsolidatedListItemTablet":"flxAccountsConsolidatedListItemTablet",
          "flxAccountListItemWrapper": "flxAccountListItemWrapper",
          "flxLeftAccounts": "flxLeftAccounts",
          "flxAccountName":"flxAccountName",
          "lblAccountName": "lblAccountName", 
          "lblAccountType": "lblAccountType",
          "flxCheckBox": "flxCheckBox",
          "lblCheckBox": "lblCheckBox",
          "flxRightAccounts": "flxRightAccounts",
          "flxRightAccountName": "flxRightAccountName",
          "lblRightAccountName": "lblRightAccountName",
          "lblRightAccountType": "lblRightAccountType",
          "flxRightCheckBox": "flxRightCheckBox",
          "lblCheckBoxRight": "lblCheckBoxRight",
          "flxAccountsConsolidatedSectionHeader": "flxAccountsConsolidatedSectionHeader",    
          "flxConsolidatedSectionHeaderMobile":"flxConsolidatedSectionHeaderMobile",
          "flxConsolidatedSectionHeaderTablet":"flxConsolidatedSectionHeaderTablet",
          "lblTopSeperator": "lblTopSeperator",
          "flxHeaderWrapper": "flxHeaderWrapper",
          "flxHeaderName": "flxHeaderName",
          "lblAccountTypeHeader": "lblAccountTypeHeader",
          "flxDropDown": "flxDropDown",
          "lblSelectAll": "lblSelectAll",     
          "flxSelectAllDropdown":"flxSelectAllDropdown",     
          "flxCheckBox": "flxCheckBox",
          "lblCheckBox": "lblCheckBox",  
          "lblDropDown": "lblDropDown",
          "lblBottomSeperator": "lblBottomSeperator",
          "flxbottomSpace":"flxbottomSpace",
          "flxSelectAllMobile":"flxSelectAllMobile",
          "selectedAccInfo":"selectedAccInfo",
		      "selectedAccInfoRight":"selectedAccInfoRight"
        };
        var widgetFromData =this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(accounts) : this.getDataWithSections(accounts);
        if (widgetFromData) {
          this.view.segAccounts.setData(widgetFromData);
        }
    },
    /**
    *navigate  back  to viewstatment
    */
    backToViewStatement:function(account) {
                        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "appName": "ArrangementsMA",
                            "moduleName": "AccountsUIModule"
                        });
                        accountsModule.presentationController.showFormatEstatements(account);
                    },
    /**
    *  creates the segment row data with section header , account number and other details
    */
    getDataWithAccountTypeSections: function(accounts){
      var scopeObj = this;
      var finalData = {};
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
      var headerTemplate="";
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
        headerTemplate="flxConsolidatedSectionHeaderMobile";
      }else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
        headerTemplate="flxConsolidatedSectionHeaderTablet";
      }else{
        headerTemplate="flxAccountsConsolidatedSectionHeader";
      }
      accounts.forEach(function(account){
        var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
        if(finalData.hasOwnProperty(accountType)){
          finalData[accountType][1].push(account);
        }else{
          finalData[accountType] = [{
            lblDropDown: {"text": "P"},
            lblAccountTypeHeader: {
              "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
              "accessibilityconfig": {
                "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
              }
            },
            lblSelectAll: {text: kony.i18n.getLocalizedString("konybb.i18n.selectAll")},
            flxSelectAllDropdown: {
                "onClick": function(eventobject, context) {
                scopeObj.toggleAccountsSegment(context);
            }.bind(this),
              "accessibilityConfig": {
                "a11yLabel":"Show list of type of accounts",
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": true
                }
            }
            },
            flxDropDown: {
                                "onClick": function(eventobject, context) {
                                    scopeObj.toggleAccountsSegment(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": true,
                                        "aria-labelledby": "lblSelectAll",
                                    }
                                }
                            },
            lblTopSeperator: { "isVisible" : true},
            lblBottomSeperator: { "isVisible" : true},
            lblCheckBox:{"skin": "skn0273e315pxolbfonticons","text": "D","accessibilityconfig": {
              "a11yHidden": true,
          }},
            flxCheckBox: {
                               "onClick": function(eventobject, context) {
                                    scopeObj.toggleSegmentAccountCheckbox(context["sectionIndex"],context["rowIndex"]);
                                }.bind(this),
                                "accessibilityConfig": {
                                "a11yLabel": "select All "+(applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")),
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
            template: headerTemplate
          },[account]];
        }});
      this.sectionData = [];
      var data=[];
      for(var key in prioritizeAccountTypes){
        var accountType=prioritizeAccountTypes[key];
        if(finalData.hasOwnProperty(accountType)){
          data.push(finalData[accountType]);
          this.sectionData.push(accountType);
        }
      }
      for(i=0;i<data.length;i++){
        var sortedData = data[i][1];
        if (!this.isFavAccAvailable) this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
        if (!this.isExtAccAvailable) this.isExtAccAvailable = sortedData.filter(this.isExternal).length > 0;
      }
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        for (var section = 0; section < data.length; section++) {
          var sectionAccounts = data[section][1];   
          for (j = 0; j < sectionAccounts.length; j++) {                       
            data[section][1][j] = this.createSegmentData(sectionAccounts[j],null,flag);
          }
        }        
      } 
      else {
        for(var section=0; section<data.length; section++)
        {
          var row=0;var flag = data[section][1].length === 2 ? true : false;
          var sectionAccounts = data[section][1];			  
          for(j=0; j<sectionAccounts.length; j++)
          {
            if(j !== sectionAccounts.length-1)
            {
              data[section][1][row] = this.createSegmentData(sectionAccounts[j],sectionAccounts[j+1], flag);
              j++;
              row++;
            }
            else{
              data[section][1][row] = this.createSegmentData(sectionAccounts[j]);
            }
          }
          if(data[section][1].length%2 !== 0){
            data[section][1] = data[section][1].slice(0,(data[section][1].length/2)+1);
          } else { data[section][1] = data[section][1].slice(0,(data[section][1].length/2)); }
        }
      }
      return data;
    },
    
    getDataWithSections: function(accounts){
      var scopeObj = this;
      var finalData = {};
      var headerTemplate="";
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
        headerTemplate="flxConsolidatedSectionHeaderMobile";
      }else if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
        headerTemplate="flxConsolidatedSectionHeaderTablet";
      }else{
        headerTemplate="flxAccountsConsolidatedSectionHeader";
      }
      accounts.forEach(function(account){
        var accountRoleType = kony.i18n.getLocalizedString("i18n.accounts.personalAccounts");
        if (account.isBusinessAccount === "false") {
          if(scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal'){
            accountRoleType = "Personal Accounts";
          }
          else {
            accountRoleType = account.Membership_id;
          }
        }
        else {
          accountRoleType = account.Membership_id;
        }
        account.accountRoleType = accountRoleType;
        if(finalData.hasOwnProperty(accountRoleType) && account.Membership_id === finalData[accountRoleType][0]["membershipId"] ){
          finalData[accountRoleType][1].push(account);
        }
        else{
          finalData[accountRoleType] = [{
            lblDropDown: {"text": "P"},
            lblAccountTypeHeader: {
              "text": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName,
              "accessibilityconfig": {
                "a11yLabel": accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName
              }
            },
            lblSelectAll: {text: kony.i18n.getLocalizedString("konybb.i18n.selectAll")},
            flxSelectAllDropdown: {
                "onClick": function(eventobject, context) {
                scopeObj.toggleAccountsSegment(context);
            }.bind(this),
              "accessibilityConfig": {
                "a11yLabel": "Show list of type of accounts",
                "a11yARIA": {
                    "role": "button",
                    "aria-expanded": true
                }
            }
            },
            flxDropDown: {
                                "onClick": function(eventobject, context) {
                                    scopeObj.toggleAccountsSegment(context);
                                }.bind(this),
                                "accessibilityConfig": {
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": true,
                                        "aria-labelledby": "lblSelectAll",
                                    }
                                }
                            },
            lblTopSeperator: { "isVisible" : true},
            lblBottomSeperator: { "isVisible" : true},
            lblCheckBox:{"skin": "skn0273e315pxolbfonticons","text": "D","accessibilityconfig": {
              "a11yHidden": true,
          }},
          flxCheckBox: {
                                "onClick": function(eventobject, context) {
                                    scopeObj.toggleSegmentAccountCheckbox(context["sectionIndex"], context["rowIndex"]);
                                }.bind(this),
                                "accessibilityConfig": {
                                "a11yLabel": "select All "+(accountRoleType === "Personal Accounts" ? accountRoleType : account.MembershipName),
                                    "a11yARIA": {
                                        "role": "checkbox",
                                        "aria-checked": false
                                    }
                                }
                            },
            membershipId: account.Membership_id,
            membershipName: account.MembershipName,
            template: headerTemplate
          },[account]];
        }});
      var data= this.sortAccountData(finalData);
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        for (var section = 0; section < data.length; section++) {
          var sectionAccounts = data[section][1];   
          for (j = 0; j < sectionAccounts.length; j++) {                       
            data[section][1][j] = this.createSegmentData(sectionAccounts[j],null,flag);
          }
        }        
      } 
      else {
        for(var section=0; section<data.length; section++)
        {
          var row=0;var flag = data[section][1].length === 2 ? true : false;
          var sectionAccounts = data[section][1];			  
          for(j=0; j<sectionAccounts.length; j++)
          {
            if(j !== sectionAccounts.length-1)
            {
              data[section][1][row] = this.createSegmentData(sectionAccounts[j],sectionAccounts[j+1], flag);
              j++;
              row++;
            }
            else{
              data[section][1][row] = this.createSegmentData(sectionAccounts[j]);
            }
          }
          if(data[section][1].length%2 !== 0){
            data[section][1] = data[section][1].slice(0,(data[section][1].length/2)+1);
          } else { data[section][1] = data[section][1].slice(0,(data[section][1].length/2)); }
        }
      }
      return data;
    },

    sortAccountData : function(finalData){
      var data = [];
      var prioritizeAccountRoleTypes = [];
      var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');

      var sections = Object.keys(finalData);
      var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
      if (index > -1) {
        sections.splice(index, 1);
      }
      index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
      if (index > -1) {
        sections.splice(index, 1);
      }
      prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
      prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"));
      prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);
      this.sectionData = [];
      for (var i = 0; i < prioritizeAccountRoleTypes.length; i++) {
        var accountType = prioritizeAccountRoleTypes[i];
        if (finalData.hasOwnProperty(accountType)) {
          data.push(finalData[accountType]);
          this.sectionData.push(accountType);
          this.accountGroups[accountType] = {
            membershipId: finalData[accountType][0]["membershipId"],
            membershipName: finalData[accountType][0]["membershipName"]
          };
        }
      }
      this.isFavAccAvailable = false;
      for (var i = 0; i < data.length; i++) {
        var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
        var sortedData = data[i][1];
        sortedData.sort(function(a, b) {
          return accoountTypeOrder.indexOf(a.lblAccountType) - accoountTypeOrder.indexOf(b.lblAccountType);
        });
        data[i][1] = sortedData;
        if(!this.isFavAccAvailable)
          this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
      }
      return data;
    },
    /**
    *  creates the row template with account number and other details
    */
  createSegmentData: function(account, account1, flag) {
		var dataObject;
		if (!kony.sdk.isNullOrUndefined(account1)) {
			var isDesktop = kony.application.getCurrentBreakpoint() > 1024;
			if (isDesktop) {
				dataObject = this.settingRowData(account, account1, "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43", "D");
			} else {
				dataObject = this.settingRowData(account, account1, "skn0273e315pxolbfonticons", "D");
			}
		} else {
			var isDesktop = kony.application.getCurrentBreakpoint() > 1024;
			if (isDesktop) {
				dataObject = this.settingRowDataForSingleAccount(account, "ICSknLblCheckBoxUnSelectedFontIcon0f28183f788fe43", "D");

			} else {
				dataObject = this.settingRowDataForSingleAccount(account, "skn0273e315pxolbfonticons", "D");
			}
		}
		return dataObject;
	},
	settingRowDataForSingleAccount: function(account, skin, checkBoxValue) {
		var dataObject = {
			"lblAccountName": this.formatAccountName(account),
			"lblAccountType": account.accountType,
			"flxLeftAccounts": {
				"isVisible": true,
                "width":(kony.application.getCurrentBreakpoint() === 640)?"89%":"40%"
			},
			"flxRightAccounts": {
				"isVisible": false
			},
			"flxAccountListItemWrapper": {
				"isVisible": true
			},
			"lblCheckBox": {
				"skin": skin,
				"text": checkBoxValue,
        "accessibilityconfig": {
          "a11yHidden": true,
      }
			},
            "flxCheckBox": {                    
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "aria-labelledby": "lblAccountName",
                        }
                    }
                },
			"lblCheckBoxRight": {
				"skin": skin,
				"text": checkBoxValue,
        "accessibilityconfig": {
          "a11yHidden": true,
      }
			},
			"selectedAccInfo": account,
		};
		return dataObject;
	},
	settingRowData: function(account, account1, skin, checkBoxValue) {
		var dataObject = {
			"lblAccountName": this.formatAccountName(account),
			"lblAccountType": account.accountType,
			"flxLeftAccounts": {
				"isVisible": true,
                "width":(kony.application.getCurrentBreakpoint() === 640)?"89%":"40%"
			},
			"lblRightAccountName": this.formatAccountName(account1),
			"lblRightAccountType": account1.accountType,
			"flxRightAccounts": {
				"isVisible": true
			},
			"flxAccountListItemWrapper": {
				"isVisible": true
			},
			"lblCheckBox": {
				"skin": skin,
				"text": checkBoxValue,
        "accessibilityconfig": {
          "a11yHidden": true,
      }
			},
            "flxCheckBox": {
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "aria-labelledby": "lblAccountName",
                        }
                    }
                },
			"lblCheckBoxRight": {
				"skin": skin,
				"text": checkBoxValue,
        "accessibilityconfig": {
          "a11yHidden": true,
      }
			},
            "flxRightCheckBox": {                    
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": false,
                            "aria-labelledby": "lblRightAccountName",
                        }
                    }
                },
			"selectedAccInfo": account,
			"selectedAccInfoRight": account1
		};
		return dataObject;
	},  
    /* formats the account name with account number */
    formatAccountName: function(account) {
      var updatedAccountID;
      var updatedAccountName;
      var accountID = account.accountID;
      var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));     
      if (account.externalIndicator && account.externalIndicator === "true") {
        updatedAccountID = externalaccountID;
      } else {
        updatedAccountID = account.accountID
      }
      if (kony.application.getCurrentBreakpoint() <= 640){
        var truncatedAccountName = CommonUtilities.getAccountName(account);
        truncatedAccountName = truncatedAccountName.substring(0, 20);
        updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(truncatedAccountName , updatedAccountID);
      }
      if(kony.application.getCurrentBreakpoint() <= 1024)
      {
        var truncatedAccountName = account.accountType + " " + CommonUtilities.getAccountName(account);
        truncatedAccountName = truncatedAccountName.substring(0, 20);
        updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName , updatedAccountID);
      }
      else{
        updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName , updatedAccountID);      
        if(updatedAccountName.length > 45) {
          var truncatedAccountName = CommonUtilities.getAccountName(account);
          truncatedAccountName = truncatedAccountName.substring(0, 25);
          updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID);
        }
      }
      return updatedAccountName;
    },
    isFavourite: function(account) {
      return account.favouriteStatus && account.favouriteStatus === '1';
    },
    isExternal: function(account) {
      if(account.isExternalAccount){
        if(account.isExternalAccount === "true")
          return true;
      }
      else if(account.externalIndicator){
        if(account.externalIndicator === "true")
          return true;
      }
      else
        return false;
    },
    /**
         * Returns if a account is a DBX account or not
         * @param {JSON} account Account whose DBX status needs to be checked
         * @returns {boolean} true/false
         */
    isDbx: function(account) {
      if(account.isExternalAccount){
        if(account.isExternalAccount === "true")
          return false;
      }
      else if(account.externalIndicator){
        if(account.externalIndicator === "true")
          return false;
      }
      else
        return true;
    },

    /*
    * Method to return Business account status
    */
    isBusinessAccount: function(account) {
      return account.isBusinessAccount && account.isBusinessAccount === 'true';
    },
    filterForBusinessAccounts: function(account) {
      return account.accountRoleType && account.accountRoleType === this.selectedBusinessAccountType;
    },

    /*
    * Method to return Personal Accounts status
    */
    isPersonalAccount: function(account) {
      return account.isBusinessAccount && account.isBusinessAccount === 'false';
    },

    /*
      * Method to return accounts grouped by selected cif
    */
    cifFilter: function(account) {
      var membershipId = this.view.accountsFilter.segDefaultFilters.data[this.filterIndex]["membershipId"];
      return account.Membership_id && account.Membership_id === membershipId;
      //return account.MembershipName && account.MembershipName === this.view.lblSelectedFilter.text;
    },
    /*
    * Method to add data to filter segment
    */

    initializeFilterSegments : function(){
      var scopeObj = this;
      var accountTypes = this.sectionData;
      var dataMap = {
        "lblRadioButton": "lblRadioButton",
        "lblFilterValue": "lblFilterValue",
        "flxAccountFilterRowTemplate": "flxAccountFilterRowTemplate"
      };
      this.view.accountsFilter.segDefaultFilters.widgetDataMap = dataMap;
      var filterData = [];
      var allAccountsFilterValue;
      var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');
      allAccountsFilterValue = kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts");
      var allAccounts = {
        "lblRadioButton": {
          "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO
        },
        "lblFilterValue": {
          "text": allAccountsFilterValue
        },
        "flxAccountFilterRowTemplate": {
          "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.onKeyPressCallBackSegAccountListMenu,
                            "onClick":this.onFilterSelection}
      };
      filterData.push(allAccounts);
      this.view.lblSelectedFilter.text = allAccountsFilterValue;
      if(this.isFavAccAvailable){
        var favoriteAccounts = {
          "lblRadioButton": {
            "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
            "skin": "sknRadioGreyUnselectedFonticon"
          },
          "lblFilterValue": {
            "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.Accounts.FavouriteAccounts")
          },
          "flxAccountFilterRowTemplate": {
            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.onKeyPressCallBackSegAccountListMenu,
                            "onClick":this.onFilterSelection}
        };
        filterData.push(favoriteAccounts);
      }
      if(this.isSingleCustomerProfile && this.isExtAccAvailable){
        if(kony.sdk.isNullOrUndefined(this.bankName))
          for(var i=0; i<this.accounts.length;i++)
            if((kony.sdk.isNullOrUndefined(this.accounts[i].externalIndicator)) || (this.accounts[i].externalIndicator==="false")){
              this.bankName = this.accounts[i].bankName;
              break;
            }
        var dbxAccounts = {
          "lblRadioButton": {
            "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
            "skin": "sknRadioGreyUnselectedFonticon"
          },
          "lblFilterValue": {
            "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + this.bankName + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
          },
          "flxAccountFilterRowTemplate": {
            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.onKeyPressCallBackSegAccountListMenu,
                            "onClick":this.onFilterSelection
          }
        };
        filterData.push(dbxAccounts);
        //if(this.isExtAccAvailable) {
          var externalAccounts = {
            "lblRadioButton": {
              "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
              "skin": "sknRadioGreyUnselectedFonticon"
            },
            "lblFilterValue": {
              "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts")
            },
            "flxAccountFilterRowTemplate": {
              "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.onKeyPressCallBackSegAccountListMenu,
                            "onClick":this.onFilterSelection
            }
          };
          filterData.push(externalAccounts);
        //}
      }
      if(!this.isSingleCustomerProfile){
       //newly added code
        var userMan = applicationManager.getUserPreferencesManager();
        if (userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
          scopeObj.customerId = userMan.primaryCustomerId.id;
        }
        for(var i = 0; i < accountTypes.length ; i++){
          var accountName = scopeObj.accountGroups[accountTypes[i]]["membershipName"];
          if ([accountTypes[0]] == "Personal Accounts" && scopeObj.customerId == scopeObj.accountGroups[accountTypes[i]]["membershipId"]) {
            accountName=kony.i18n.getLocalizedString("i18n.accounts.personalAccounts")
          }
          var otherAccounts = {
            "lblRadioButton": {
              "text": ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
              "skin": "sknRadioGreyUnselectedFonticon"
            },
            "lblFilterValue": {
              //"text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + accountTypes[i]// + " " + kony.i18n.getLocalizedString("i18n.Accounts.accounts")
              "text": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + accountName// + " " + kony.i18n.getLocalizedString("i18n.Accounts.accounts")
            },
            "flxAccountFilterRowTemplate": {
              "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "radio",
                                    "aria-checked": true,
                                    "aria-labelledby": "lblFilterValue"
                                }
                            },
                            "onKeyPress":this.onKeyPressCallBackSegAccountListMenu,
                            "onClick":this.onFilterSelection},
            "membershipId": scopeObj.accountGroups[accountTypes[i]]["membershipId"]
          };
          filterData.push(otherAccounts);
        }
      }
      this.view.accountsFilter.segDefaultFilters.setData(filterData);
    },
    onFilterSelection: function(context) {
      var accounts = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule","appName": "HomepageMA"
            }).presentationController.accounts;
      var rowIndex = context.rowIndex;
      var scopeObj = this;
      var segData = scopeObj.view.accountsFilter.segDefaultFilters.data;
      this.currentView = segData[rowIndex].lblFilterValue.text.slice(5);
      for(var i = 0; i < segData.length; i++) {
        if(i === rowIndex){
          segData[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
          delete segData[i].lblRadioButton.skin;
          scopeObj.view.lblSelectedFilter.text =  segData[i].lblFilterValue.text.slice(5);
          if(!this.isRetailUser){
            this.selectedBusinessAccountType= segData[i].lblFilterValue.text.slice(5);
          }
          scopeObj.view.lblSelectedFilter.text = segData[rowIndex].lblFilterValue.text;
        }
        else{
          segData[i].lblRadioButton.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
          segData[i].lblRadioButton.skin = "sknRadioGreyUnselectedFonticon";
        }
        scopeObj.view.accountsFilter.segDefaultFilters.setDataAt(segData[i], i);
      }
      scopeObj.view.lblDropDown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
      scopeObj.view.flxAccountsFilter.setVisibility(false);
      // scopeObj.view.accountsFilter.setVisibility(false);
      this.isDefaultFilterApplied = true;
      this.filterIndex = rowIndex;
      var filteredAccounts = scopeObj.getSearchAndFilterData(accounts);
      this.setCustomViewsSegmentData(filteredAccounts);
      scopeObj.view.forceLayout();
      scopeObj.AdjustScreen();
    },
    getSearchAndFilterData: function(accounts){
      var scopeObj = this;
      var filterQuery = scopeObj.view.lblSelectedFilter.text;
      if(this.isDefaultFilterApplied){
        if (filterQuery === kony.i18n.getLocalizedString("i18n.locateus.view") + " " +  kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts")) {
        } else if (filterQuery === kony.i18n.getLocalizedString("i18n.locateus.view") + " " +  kony.i18n.getLocalizedString("i18n.Accounts.FavouriteAccounts")) {
          accounts = accounts.filter(this.isFavourite);
        } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.locateus.view") + " " +  kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"))) {
          accounts = accounts.filter(this.isPersonalAccount);
        } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.locateus.view") + " " +  kony.i18n.getLocalizedString("i18n.accounts.businessAccounts"))) {
          accounts = accounts.filter(this.isBusinessAccount);
        } else if (filterQuery.includes(this.bankName)) {
          accounts = accounts.filter(this.isDbx);
        } else if (filterQuery.includes(kony.i18n.getLocalizedString("i18n.locateus.view") + " " +  kony.i18n.getLocalizedString("i18n.hamburger.externalAccounts"))) {
          accounts = accounts.filter(this.isExternal);
        } 
        else {
          accounts = accounts.filter(this.cifFilter);
        }
        // else if(!this.isRetailUser){
        //   accounts = accounts.filter(this.filterForBusinessAccounts);
        // }
      }
      return accounts;
    },
    generateCombinedStatement:function(){
      var self=this;
      applicationManager.getNavigationManager().updateForm({
        showLoadingIndicator: {
          status: true
        }
      });
      
      this.selectedAccountsPayload=this.getSelectedAccountsInfo();
      var selectedFileType=this.view.lblSelectedFilterpopup.text;
      if(selectedFileType==="CSV"){
        this.selectedAccountsPayload.fileType="csv"
      }else if((selectedFileType==="Excel")){
        this.selectedAccountsPayload.fileType="xlsx"
      }else{
        this.selectedAccountsPayload.fileType="pdf"
      }
      this.loadAccountServicesModule().presentationController.generateCombinedStatement(this.selectedAccountsPayload, function sucess(data){
        self.generateCombinedStatementSuccessCallback(data);
      }, function failure(data){
        applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: false
          }
        })
        self.generateCombinedStatementFailureCallback(data);
        kony.print("FailureCallback");
      })
    },
    
    generateCombinedStatementSuccessCallback: function(response){
      this.view.flxGenerateStatementsPopup.setVisibility(true);
      applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: false
          }
        })
        this.view.lblSystemNotification.accessibilityConfig = {
                "tagName": "h2",
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.lblSystemNotification.setActive(true);
    },
    
    generateCombinedStatementFailureCallback: function(response){
      applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: false
          }
        })
    },
    
    navigateToAccountDetails : function(){
      applicationManager.getNavigationManager().updateForm({
          showLoadingIndicator: {
            status: true
          }
        });
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule");
      if(this.accounts!==null && this.accounts!==undefined &&  this.accounts.length>0){
      accountsModule.presentationController.showFormatEstatements(this.accounts[0],true);
    }
      this.view.flxGenerateStatementsPopup.setVisibility(false);
    },
    
    setCalenderDates: function(){
      this.view.calFromDate.dateEditable=false;
      this.view.calToDate.dateEditable=false;
      this.view.calFromDate.dateFormat = "MM/dd/yyyy";
      this.view.calToDate.dateFormat = "MM/dd/yyyy";
      var allowedPreviousMonths=parseInt(applicationManager.getConfigurationManager().getCombinedStatementsAllowedPeriod());
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
        "appName": "ArrangementsMA",
        "moduleName": "AccountsUIModule"
      });
      var transactCurrentDate = accountsModule.presentationController.bankDate;
      var startDate = transactCurrentDate.currentWorkingDate.split('-');
      var month;
      var day;
      var year;
      startDate[1] = startDate[1] - allowedPreviousMonths;
      month = (startDate[1] + 1) >= 6 ? (startDate[1] + 1) : (startDate[1] + 13);
      day = startDate[2] > 9 ? startDate[2] : ("0" + startDate[2]);
      year = (startDate[1] < 6 ? (startDate[0] - 1) : startDate[0]);
      this.view.calFromDate.validStartDate = [day, month, year];

      var endDate = transactCurrentDate.currentWorkingDate.split('-');
      month = endDate[1];
      day = endDate[2];
      this.view.calToDate.dateComponents = [day, month, endDate[0]];
      this.view.calToDate.validEndDate = [day, month, endDate[0]];
      this.view.calFromDate.validEndDate = [day, month, endDate[0]];
      this.view.calFromDate.dateComponents = [day,month,endDate[0]];
    },
    
    getDateValidationErrorMessage: function(obj) {
      	var fromDateObj = this.view.calFromDate;
       var toDateObj = this.view.calToDate;
       var todayDate = CommonUtilities.getServerDateObject();
      	if (!fromDateObj.formattedDate || fromDateObj.formattedDate === "") {
        	return kony.i18n.getLocalizedString("i18n.Calendar.fromDateEmpty");
      	}
      	if (!toDateObj.formattedDate || toDateObj.formattedDate === "") {
          return kony.i18n.getLocalizedString("i18n.Calendar.toDateEmpty");
      	}
      	var fromDate = new Date(fromDateObj.year, fromDateObj.month - 1, fromDateObj.day);
      	var toDate = new Date(toDateObj.year, toDateObj.month - 1, toDateObj.day);
      	if (fromDate > todayDate) {
          return kony.i18n.getLocalizedString("i18n.Calendar.futureFromDate");
      	}
      	if (toDate > todayDate) {
          return kony.i18n.getLocalizedString("i18n.Calendar.futureToDate");
      	}
      	if (fromDate > toDate) {
          return kony.i18n.getLocalizedString("i18n.Calendar.fromDateGreater");
      	}
        if (!this.checkEnableDownloadStatement()) {
        	return kony.i18n.getLocalizedString("i18n.combinedStatement.accountSelectionError");
      	}
      	return false;
      }
  }
});