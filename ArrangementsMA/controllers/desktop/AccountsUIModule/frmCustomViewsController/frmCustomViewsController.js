define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
   var orientationHandler = new OrientationHandler();
    //   var responsiveUtils = new ResponsiveUtils();
  return {
    /**
	 * Method to patch update UI
	 * @param {Object} uiData Data from presentation controller
	 */
    accountsFlag: '',
    editCustomView: false,
    selectedAccounts: [],
    editName: '',
        isFavAccAvailable: false,
        isExtAccAvailable: false,
    sectionData: [],
    profileAccess: "",
    updateFormUI: function(uiData) {
      if (uiData) {
                if (uiData.customView.type === "Create") {
          this.showCreateCustomView();
        }      
                if (uiData.customView.type === "Edit") {
            this.showEditCustomView(uiData.customView);
          }
        if (uiData.showLoadingIndicator) {
          if (uiData.showLoadingIndicator.status === true) {
            FormControllerUtility.showProgressBar(this.view)
          } else {
            FormControllerUtility.hideProgressBar(this.view)
          }
        }
        if (uiData.serviceError) {
          this.setServiceError(uiData.serviceError)
        }  

                if (uiData.TnCresponse) {
          this.bindTnC(uiData.TnCresponse);
        }
                if (uiData.errorMsg) {
          this.showError(uiData.errorMsg);
        }
      }
    },   
        ActivatePopupFlag: false,
        CancelPopupFlag: false,
     /**
       * used perform the initialize activities.
       *
      */
        init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsModule');      
    },
    
     /**
       * used perform the pre show activities.
       *
      */
        preShow: function() {
      //this.showCreateCustomView();     
      this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      this.initializeSearchActions();
      this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "My Accounts");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader','flxFooter', 'flxFromCustomViews', 'flxLogout']);
    },
   
    /**
     * used to perform the post show activities
     *
     */
        postShow: function() {

      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      applicationManager.executeAuthorizationFramework(this);
      this.accessibilityFocusSetup();
      this.view.customheader.topmenu.flxFeedback.right = "-3%";
    },

	/**
       * used perform the breakpoint change activities.
       *
      */
        onBreakpointChange: function(form, width) {
      var scopeObj = this;      
      this.view.customheader.onBreakpointChangeComponent(width);
      this.view.customfooter.onBreakpointChangeComponent(width);      
      this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);      
    },          

        accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.txtSearch, this.view.flxSearch],
        [this.view.txtCustomViewName, this.view.flxtxtCVName]
      ];
            for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this);
      }
    },
    
     /**
       * method to show create custom views
       *
      */
        showCreateCustomView: function() {
      this.accountsFlag = 0;     
      this.selectedAccounts = [];
      this.editName = '';
      this.editCustomView = false;
      this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.customViews.createCustomView");
      this.view.lblCustomView.text = kony.i18n.getLocalizedString("i18n.customViews.createCustomView");
      this.view.lblMakeCustomView.text = kony.i18n.getLocalizedString("i18n.customViews.makeCriteriaCustomView");
      this.view.lblCustomVIewName.text = kony.i18n.getLocalizedString("i18n.customViews.nameCustomViews");
      this.view.lblSelectAccounts.text = kony.i18n.getLocalizedString("i18n.customViews.selectAccount");
      this.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.customViews.createAndApply");
      FormControllerUtility.disableButton(this.view.btnCreate);
      this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      this.view.btnDelete.setVisibility(false);
            if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile))
        this.view.btnCancel.right = "190dp";
      this.view.txtCustomViewName.text = "";
      this.view.txtCustomViewName.placeholder = "Enter Name";
      this.view.txtCustomViewName.onKeyUp = this.validateNameOnKeyUpOrKeyDown.bind(this);
      this.view.txtCustomViewName.onKeyDown = this.validateNameOnKeyUpOrKeyDown.bind(this);        
      var accounts = this.presenter.presentationController.accounts; 
            for (var i = 0; i < accounts.length; i++) {
                if (!kony.sdk.isNullOrUndefined(accounts[i].isChecked) && accounts[i].isChecked === "true")
          accounts[i].isChecked = "false";
      }
      this.setCustomViewsSegmentData(accounts);
            this.view.btnCancel.onClick = function() {
	applicationManager.getNavigationManager().navigateTo("frmDashboard");
      };
	this.view.btnCreate.onClick = this.setCreateCustomViewData.bind(this);        
      this.view.forceLayout();
    },	

    validateNameOnKeyUpOrKeyDown: function() {      
      this.view.flxtxtCVName.skin = "skne3e3e3br3pxradius";
      this.view.lbltxtCustomViewNameValid.setVisibility(false);      
      this.view.flxStatus.setVisibility(false);
            if (this.editName === this.view.txtCustomViewName.text && this.editCustomView === true) {
        this.view.lbltxtCustomViewNameValid.text = "Valid";
      } else {
      if (this.view.txtCustomViewName.text.length <= 50 && this.view.txtCustomViewName.text.length > 0) {
        var customViews = this.presenter.presentationController.customViews;
        this.view.lbltxtCustomViewNameValid.setVisibility(false);
        this.view.lbltxtCustomViewNameValid.text = kony.i18n.getLocalizedString("i18n.customViews.valid");
        this.view.flxtxtCustomViewName.top = kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile ? "6dp" : "8dp";
        this.view.flxStatus.setVisibility(true);
        //this.editName = this.view.txtCustomViewName.text;
        if (this.editCustomView === true && this.accountsFlag >= 1) {   
          FormControllerUtility.enableButton(this.view.btnCreate);
        }          
        for (i = 0; i < customViews.length; i++) {
          if (this.view.txtCustomViewName.text.toLowerCase() === customViews[i].name.toLowerCase()) {
                            if (!kony.sdk.isNullOrUndefined(this.editName) && customViews[i].name.toLowerCase() === this.editName.toLowerCase()) {} else {
            this.view.flxtxtCVName.skin = "sknborderff0000error";
            this.view.lbltxtCustomViewNameValid.setVisibility(true);
            this.view.lbltxtCustomViewNameValid.text = kony.i18n.getLocalizedString("i18n.customViews.checkNameValidity");
            this.view.flxtxtCustomViewName.top = "15dp";
            this.view.flxStatus.setVisibility(false);
            //FormControllerUtility.disableButton(this.view.btnCreate);
            break;
          } 
         }
        }
      } else if (this.view.txtCustomViewName.text.length > 50) {
        //FormControllerUtility.disableButton(this.view.btnCreate);
        this.view.flxtxtCVName.skin = "sknborderff0000error";
        this.view.lbltxtCustomViewNameValid.setVisibility(true);
        this.view.lbltxtCustomViewNameValid.text = kony.i18n.getLocalizedString("i18n.customViews.inValid");
        this.view.flxtxtCustomViewName.top = "15dp";
        this.view.flxStatus.setVisibility(false);
                } else if (this.view.txtCustomViewName.text.length === 0) {
        //FormControllerUtility.disableButton(this.view.btnCreate);
        this.view.flxtxtCVName.skin = "sknborderff0000error";
        this.view.lbltxtCustomViewNameValid.setVisibility(true);
        this.view.lbltxtCustomViewNameValid.text = "Please enter any valid CustomView Name";
        this.view.flxtxtCustomViewName.top = "15dp";
        this.view.flxStatus.setVisibility(false);
      }  
     }
    },
    
        setCreateCustomViewData: function() {
      this.validateNameOnKeyUpOrKeyDown();
            if (this.view.lbltxtCustomViewNameValid.text === "Valid") {
        this.view.flxtxtCVName.skin = "skne3e3e3br3pxradius";
        var param = {
        "name": this.view.txtCustomViewName.text,
        "accountIds": this.selectedAccounts.join(",")
      };
      this.presenter.presentationController.createCustomViews(param);
      }      
    },
    
    /**
       * method to show edit custom views
       *
      */
        showEditCustomView: function(response) {
      this.accountsFlag = 0;    
      this.editCustomView = true;
      this.selectedAccounts = [];
      this.view.customheader.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.customViews.EditCustomView");
      this.view.lblCustomView.text = kony.i18n.getLocalizedString("i18n.customViews.EditCustomView");
      this.view.lblMakeCustomView.text = kony.i18n.getLocalizedString("i18n.customViews.makeCriteriaCustomView");
      this.view.lblCustomVIewName.text = kony.i18n.getLocalizedString("i18n.customViews.nameCustomViews");
      this.view.txtCustomViewName.placeholder = "Enter Name";
      this.view.txtCustomViewName.text = response.name;
      this.view.lblSelectAccounts.text = kony.i18n.getLocalizedString("i18n.customViews.selectAccount");
      this.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.customViews.updateAndApply");
      FormControllerUtility.disableButton(this.view.btnCreate);
      this.view.btnDelete.setVisibility(true);
            if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile))
        this.view.btnCancel.right = "360dp";
      else
        this.view.flxButtons.height = "181dp";
      this.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel"); 
      this.view.txtCustomViewName.onKeyUp = this.validateNameOnKeyUpOrKeyDown.bind(this);
      this.view.txtCustomViewName.onKeyDown = this.validateNameOnKeyUpOrKeyDown.bind(this);        
      var accountsEdit = this.presenter.presentationController.accounts; 
      for (var i = 0; i < accountsEdit.length; i++) {
        if (!kony.sdk.isNullOrUndefined(accountsEdit[i].isChecked) && accountsEdit[i].isChecked === "true") accountsEdit[i].isChecked = "false";
      }
      this.editName = response.name;
      var responseAccounts = response.accountIds.split(',');
            for (i = 0; i < responseAccounts.length; i++) {
                for (j = 0; j < accountsEdit.length; j++) {
                    if (responseAccounts[i] === accountsEdit[j].Account_id) {
            accountsEdit[j].isChecked = "true";
                        this.accountsFlag++;
			this.selectedAccounts.push(accountsEdit[j].accountID);
            break;
          }
        }
      }
      this.setCustomViewsSegmentData(accountsEdit);
      this.view.btnDelete.onClick = this.setDeletePopup.bind(this);
      this.view.btnCancel.onClick = function() {
        applicationManager.getNavigationManager().navigateTo("frmDashboard");
      };
      this.view.btnCreate.onClick = this.setEditCustomViewData.bind(this, response);
      this.view.forceLayout();
      this.view.deletePopup.btnYes.onClick = this.setDeleteCustomView.bind(this, response);
      this.view.deletePopup.btnNo.onClick = this.setDeletePopupNo.bind(this);
      this.view.deletePopup.flxCross.onClick = this.setDeleteCancel.bind(this);
    },
    
    setEditCustomViewData: function(response) {      
      this.validateNameOnKeyUpOrKeyDown();
            if (this.view.lbltxtCustomViewNameValid.text === "Valid") {
        this.view.flxtxtCVName.skin = "skne3e3e3br3pxradius";
        var param = {
          "id": response.id,
          "name": this.view.txtCustomViewName.text,
          "accountIds": this.selectedAccounts.join(",")
        };
        this.presenter.presentationController.updateCustomViews(param);
      }
    },
    
    setDeleteCustomView: function(response) {
            var param = {
                "id": response.id
            };
            this.presenter.presentationController.deleteCustomViews(param);
        },
		setDeletePopup: function() {
			this.view.flxDelete.setVisibility(true);            
		},
		setDeletePopupNo: function() {
			this.view.flxDelete.setVisibility(false);
		},
		setDeleteCancel: function() {
			this.view.flxDelete.setVisibility(false);
		},
    /**
       * method to set segment data for custom views
       *
      */
        setCustomViewsSegmentData: function(accounts) {
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            if (accounts.length > 0) {
        this.view.flxNoRecords.setVisibility(false);
        this.view.segCustomViews.setVisibility(true);
        this.view.segCustomViews.pressedSkin = "seg2Normal0";
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          this.view.segCustomViews.rowTemplate = "flxAccountsListCustomViewMobile";
          this.view.segCustomViews.sectionHeaderTemplate = "flxAccountsHeaderCustomViewMobile";        
        } else {
          this.view.segCustomViews.rowTemplate = "flxAccountsListCustomView";
          this.view.segCustomViews.sectionHeaderTemplate = "flxAccountsHeaderCustomView";
        }
        this.view.segCustomViews.widgetDataMap = {
          "flxAccountsListCustomView": "flxAccountsListCustomView",
          "flxAccountsListCustomViewMobile": "flxAccountsListCustomViewMobile",
          "flxAccountsListWrapper": "flxAccountsListWrapper",
          "flxAccountListItem": "flxAccountListItem",
          "lblAccountName": "lblAccountName",   
          "flxIcons": "flxIcons",
          "imgIcon": "imgIcon",
          "flxFavorite": "flxFavorite",
          "imgFavorite": "imgFavorite",
          "flxBankIcon": "flxBankIcon",
          "imgBankIcon": "imgBankIcon",
          "lblAccType": "lblAccType",
          "flxChecked": "flxChecked",
          "imgChecked": "imgChecked",
          "flxAccountListItem1": "flxAccountListItem1",
          "lblAccountName1": "lblAccountName1",   
          "flxIcons1": "flxIcons1",
          "imgIcon1": "imgIcon1",
          "flxFavorite1": "flxFavorite1",
          "lblFavorite1": "lblFavorite1",
          "flxBankIcon1": "flxBankIcon1",
          "imgBankIcon1": "imgBankIcon1",
          "lblAccType1": "lblAccType1",
          "flxChecked1": "flxChecked1",
          "imgChecked1": "imgChecked1",
          "flxAccountsHeaderCustomView": "flxAccountsHeaderCustomView",        
          "flxAccountsHeaderCustomViewMobile": "flxAccountsHeaderCustomViewMobile",
          "lblTopSeparator": "lblTopSeparator",
          "flxAccountRoleType": "flxAccountRoleType",
          "lblAccountRoleType": "lblAccountRoleType",
          "lblAccountTypeHeader": "lblAccountTypeHeader",
          "lblSeparator": "lblSeparator",
          "lblSelectAll": "lblSelectAll",        
          "lblDropDown": "lblDropDown",
          "flxDropDown": "flxDropDown",  
          "lblBottomSeparator": "lblBottomSeparator",
          "flxCustomViewsSelectAllMobile": "flxCustomViewsSelectAllMobile"
        };
        var widgetFromData = isSingleCustomerProfile === true ? this.getDataWithAccountTypeSections(accounts) : this.getDataWithSections(accounts);
        if (widgetFromData) {
          this.view.segCustomViews.setData(widgetFromData);
        }
      } else {
        this.view.flxNoRecords.setVisibility(true);
        this.view.segCustomViews.setVisibility(false);
      }
    },

    /**
         * Method to set error message if service call fails
         * @param {boolean} status true/false
         */
    setServiceError: function(status) {
      if (status) {
        this.view.flxDowntimeWarning.setVisibility(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblDowntimeWarning, kony.i18n.getLocalizedString("i18n.common.OoopsServerError"), accessibilityConfig);
        this.view.lblDowntimeWarning.setFocus(true);
      } else {
        this.view.flxDowntimeWarning.setVisibility(false);
      }
      this.AdjustScreen();
    },

        showError: function(errorMsg) {
      if (errorMsg) {
        this.view.flxDowntimeWarning.setVisibility(true);
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblDowntimeWarning, errorMsg, accessibilityConfig);
        this.view.lblDowntimeWarning.setFocus(true);
      } else {
        this.view.flxDowntimeWarning.setVisibility(false);
      }
      this.AdjustScreen();
    },
    
        getDataWithAccountTypeSections: function(accounts) {
      var scopeObj = this;
      var finalData = {};
      var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
      var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
        var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
          finalData[accountType][1].push(account);
                } else {
          finalData[accountType] = [{
                            flxAccountRoleType: {
                                "isVisible": false
                            },
                            lblAccountRoleType: {
                                "text": ""
                            },
                            lblDropDown: {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                            },
                            flxChecked: {
                                "onClick": scopeObj.toggleHeaderCheckBox.bind(scopeObj)
                            },
                            imgChecked: {
                                "text": "D",
                                "skin": "sknLblFontTypeIcon003E7520px"
                            },
            lblAccountTypeHeader: {
              "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
              "accessibilityconfig": {
                "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
              }
            },
                            lblSelectAll: {
                                text: "Select All"
                            },
                            lblTopSeparator: {
                                "isVisible": true
                            },
                            lblBottomSeparator: {
                                "isVisible": true
                            },
                            flxDropDown: {
                                "onTouchEnd": function(eventobject, xcord, ycord, context) {
                scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
              template: kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile ? "flxAccountsHeaderCustomViewMobile" : "flxAccountsHeaderCustomView"
                        },
                        [account]
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
            for (i = 0; i < data.length; i++) {
            var sortedData = data[i][1];
            if (!this.isFavAccAvailable) this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
            if (!this.isExtAccAvailable) this.isExtAccAvailable = sortedData.filter(this.isExternal).length > 0;
          }
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            for (var section = 0; section < data.length; section++) {
              var sectionAccounts = data[section][1];   
              for (j = 0; j < sectionAccounts.length; j++) {                       
                        data[section][1][j] = this.createSegmentData(sectionAccounts[j], null, flag);
              }
            }        
          } else {
                for (var section = 0; section < data.length; section++) {
                    var row = 0;
                    var flag = data[section][1].length === 2 ? true : false;
              var sectionAccounts = data[section][1];			  
                    for (j = 0; j < sectionAccounts.length; j++) {
                        if (j !== sectionAccounts.length - 1) {
                            data[section][1][row] = this.createSegmentData(sectionAccounts[j], sectionAccounts[j + 1], flag);
                  j++;
                  row++;
                        } else {
                  data[section][1][row] = this.createSegmentData(sectionAccounts[j]);
                }
              }
                    if (data[section][1].length % 2 !== 0) {
                        data[section][1] = data[section][1].slice(0, (data[section][1].length / 2) + 1);
                    } else {
                        data[section][1] = data[section][1].slice(0, (data[section][1].length / 2));
                    }
            }
          }
          return data;
        },
    
    isFavourite: function(account) {
      return account.favouriteStatus && account.favouriteStatus === '1';
    },
    
    isExternal: function(account) {
            if (account.isExternalAccount) {
                if (account.isExternalAccount === "true")
          return true;
            } else if (account.externalIndicator) {
                if (account.externalIndicator === "true")
          return true;
            } else
        return false;
    },

    /**
    * creates segment with account numbers and other details with particular header values
    */
        getDataWithSections: function(accounts) {
      var scopeObj = this;
      var finalData = {};
            var prioritizeAccountTypes = [];
      var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;      
            for (i = 0; i < accounts.length; i++) {
        var account = accounts[i];
        var accountType = "";
        var accountTypeIcon = "";
        if (account.isBusinessAccount === "false") { 					
                    if (primaryCustomerId.id === account.Membership_id && primaryCustomerId.type === 'personal') {
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
          finalData[accountType][1].push(account);
        } else {
          prioritizeAccountTypes.push(accountType);
          finalData[accountType] = [{
                            flxAccountRoleType: {
                                "isVisible": this.profileAccess === "both" ? true : false
                            },
                            lblAccountRoleType: {
                                "text": accountTypeIcon
                            },
                            lblDropDown: {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                            },
                            flxChecked: {
                                "onClick": this.toggleHeaderCheckBox.bind(this)
                            },
                            imgChecked: {
                                "text": "D",
                                "skin": "sknLblFontTypeIcon003E7520px"
                            },
                            lblAccountTypeHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            lblSelectAll: {
                                text: "Select All"
                            },
                            lblTopSeparator: {
                                "isVisible": true
                            },
                            lblBottomSeparator: {
                                "isVisible": true
                            },
                            flxDropDown: {
                                "onTouchEnd": function(eventobject, xcord, ycord, context) {
              scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
            membershipId: account.Membership_id,
            template: kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile ? "flxAccountsHeaderCustomViewMobile" : "flxAccountsHeaderCustomView"
                        },
                        [account]
                    ];
        }
      }
      var data = [];
      for (var key in prioritizeAccountTypes) {
        var accountsType = prioritizeAccountTypes[key];
        if (finalData.hasOwnProperty(accountsType)) {
          data.push(finalData[accountsType]);
        }
      }   
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        for (var section = 0; section < data.length; section++) {
          var sectionAccounts = data[section][1];   
          for (j = 0; j < sectionAccounts.length; j++) {                       
                        data[section][1][j] = this.createSegmentData(sectionAccounts[j], null, flag);
          }
        }        
      } else {
                for (var section = 0; section < data.length; section++) {
                    var row = 0;
                    var flag = data[section][1].length === 2 ? true : false;
          var sectionAccounts = data[section][1];			  
                    for (j = 0; j < sectionAccounts.length; j++) {
                        if (j !== sectionAccounts.length - 1) {
                            data[section][1][row] = this.createSegmentData(sectionAccounts[j], sectionAccounts[j + 1], flag);
              j++;
              row++;
                        } else {
              data[section][1][row] = this.createSegmentData(sectionAccounts[j]);
            }
          }
                    if (data[section][1].length % 2 !== 0) {
                        data[section][1] = data[section][1].slice(0, (data[section][1].length / 2) + 1);
                    } else {
                        data[section][1] = data[section][1].slice(0, (data[section][1].length / 2));
                    }
        }
      }
      return data;
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
            if (kony.application.getCurrentBreakpoint() <= 640 || (orientationHandler.isMobile)) {
        var truncatedAccountName = CommonUtilities.getAccountName(account);
        truncatedAccountName = truncatedAccountName.substring(0, 20);
                updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID);
      }
            if (kony.application.getCurrentBreakpoint() <= 1024 || (orientationHandler.isTablet)) {
          var truncatedAccountName = account.accountType + " " + CommonUtilities.getAccountName(account);
          truncatedAccountName = truncatedAccountName.substring(0, 20);
                updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID);
            } else {
                updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName, updatedAccountID);
                if (updatedAccountName.length > 45) {
          var truncatedAccountName = CommonUtilities.getAccountName(account);
          truncatedAccountName = truncatedAccountName.substring(0, 25);
          updatedAccountName = account.accountType + " " + CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID);
        }
      }
      return updatedAccountName;
    },

    /**
    *  creates the row template with account number and other details
    */
    createSegmentData: function(account, account1, flag) {
      var dataObject;      
            if (!kony.sdk.isNullOrUndefined(account1)) {
        dataObject = {          
          "lblAccountName": this.formatAccountName(account),
          "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
          "imgIcon": {
            "text": account.isBusinessAccount === "true" ? "r" : "s",
            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
            "isVisible": this.profileAccess === "both" ? true : false,
          },
          "flxFavorite": {
            "isVisible": account.favouriteStatus === "1" ? true : false,
          },
          "imgFavorite": "F",
          "lblAccType": account.accountType,
          "flxBankIcon": {
            "isVisible": account.externalIndicator === "true" ? true : false,
          },
          "imgBankIcon": {
            "src": "bank_icon_hdfc.png"
          },
          "imgChecked": {
                        "text": (!kony.sdk.isNullOrUndefined(account.isChecked)) && account.isChecked === "true" ? "C" : "D",
            "skin": "sknLblFontTypeIcon003E7520px"
          },
          "flxChecked": {
            "onClick": this.toggleCheckBox.bind(this)
          },
          "flxAccountListItem": {
            "isVisible": true,
            "left": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "3.25%" : "20px",
            "width": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "45%" : "40%",
          },
          "lblAccountName1": this.formatAccountName(account1),
          "accountID1": account1.Account_id || account1.accountID || account1.accountNumber || account1.payPersonId || account1.PayPersonId,
          "imgIcon1": {
            "text": account1.isBusinessAccount === "true" ? "r" : "s",
            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
            "isVisible": this.profileAccess === "both" ? true : false,
          },
          "flxFavorite1": {
            "isVisible": account1.favouriteStatus === "1" ? true : false,
          },
          "lblFavorite1": "F",
          "lblAccType1": account1.accountType,
          "flxBankIcon1": {
            "isVisible": account1.externalIndicator === "true" ? true : false,
          },
          "imgBankIcon1": {
            "src": "bank_icon_hdfc.png"
          },
          "imgChecked1": {
                        "text": (!kony.sdk.isNullOrUndefined(account1.isChecked)) && account1.isChecked === "true" ? "C" : "D",
            "skin": "sknLblFontTypeIcon003E7520px"
          },
          "flxChecked1": {
            "onClick": this.toggleCheckBox1.bind(this)
          },
          "flxAccountListItem1": {
            "isVisible": true,
            "left": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "3.25%" : "101px",
            "width": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "45%" : "40%",
          },
          "flxAccountsListWrapper": {
            "isVisible": true
          },
          "flxAccountsListCustomView": {
           "height": flag === true ? "140dp" : "110dp"
          }          
        };
            } else {
        dataObject = {          
          "lblAccountName": this.formatAccountName(account),
          "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
          "imgIcon": {
            "text": account.isBusinessAccount === "true" ? "r" : "s",
            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
            "isVisible": this.profileAccess === "both" ? true : false,
          },
          "flxFavorite": {
            "isVisible": account.favouriteStatus === "1" ? true : false,
          },
          "imgFavorite": "F",
          "lblAccType": account.accountType,
          "flxBankIcon": {
            "isVisible": account.externalIndicator === "true" ? true : false,
          },
          "imgBankIcon": {
            "src": "bank_icon_hdfc.png"
          },
          "imgChecked": {
                        "text": (!kony.sdk.isNullOrUndefined(account.isChecked)) && account.isChecked === "true" ? "C" : "D",
            "skin": "sknLblFontTypeIcon003E7520px"
          },          
          "flxChecked": {
            "onClick": this.toggleCheckBox.bind(this)
          },
          "flxAccountListItem1": {
            "isVisible": false
          },
          "flxAccountsListWrapper": {
            "isVisible": true
          },
          "flxAccountsListCustomView": {
            "height": "140dp"
          },
          "flxAccountsListCustomViewMobile": {
            "height": "70dp"
          },          
          "template": kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile ? "flxAccountsListCustomViewMobile" : "flxAccountsListCustomView"
        };
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          dataObject.flxAccountListItem = {
            "isVisible": true
          };
        } else {
          dataObject.flxAccountListItem = {
            "isVisible": true,
            "left": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "3.25%" : "20px",
            "width": (kony.application.getCurrentBreakpoint() > 640 && kony.application.getCurrentBreakpoint() <= 1024 && (orientationHandler.isTablet)) ? "45%" : "40%",
          };
        }
      }
      return dataObject;
    },
    
    /**
     * It shows or hides the particular section 
     */
    showOrHideAccountRows: function(context) {
     var section = context.sectionIndex;
      var segData = this.view.segCustomViews.data;
      var isRowVisible = true;
      if (segData[section][0].lblDropDown.text === "O") {
        segData[section][0]["lblDropDown"] = {
          text: "P"
        };
        isRowVisible = true;
      } else {
        segData[section][0]["lblDropDown"] = {
          text: "O"
        };
        isRowVisible = false;
      }
      for (var i = 0; i < segData[section][1].length; i++) {
        var flxAccountsListCustomView;
                if (isRowVisible === false) {
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            flxAccountsListCustomView = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsListCustomViewMobile));
            flxAccountsListCustomView["height"] = "0dp";
          	this.updateKeyAt("flxAccountsListCustomViewMobile", flxAccountsListCustomView, i, section);
                    } else {
            flxAccountsListCustomView = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsListCustomView));
            flxAccountsListCustomView["height"] = "0dp";
            this.updateKeyAt("flxAccountsListCustomView", flxAccountsListCustomView, i, section);
          }
                } else {
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            flxAccountsListCustomView = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsListCustomViewMobile));
          	flxAccountsListCustomView["height"] = "70dp";
            this.updateKeyAt("flxAccountsListCustomViewMobile", flxAccountsListCustomView, i, section);
          } else {
            flxAccountsListCustomView = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountsListCustomView));
                        if (i === segData[section][1].length - 1) {
              flxAccountsListCustomView["height"] = "140dp";
                        } else {
              flxAccountsListCustomView["height"] = "110dp";
            }
            this.updateKeyAt("flxAccountsListCustomView", flxAccountsListCustomView, i, section);
          }          
        }
      }      
      segData = this.view.segCustomViews.data;
      this.view.segCustomViews.setSectionAt(segData[section], section);
      this.view.forceLayout();
    },

    updateKeyAt: function(widgetName, value, row, section) {
      var data = this.view.segCustomViews.data;
      var rowDataTobeUpdated = data[section][1][row];
      rowDataTobeUpdated[widgetName] = value;
      this.view.segCustomViews.setDataAt(rowDataTobeUpdated, row, section);
    },

    /* to check or uncheck the checkbox in the row template */
        toggleCheckBox: function() {
      var section = this.view.segCustomViews.selectedRowIndex[0];
      var row = this.view.segCustomViews.selectedRowIndex[1];
      var segData = this.view.segCustomViews.data;
      var accountsCheckBox = this.presenter.presentationController.accounts;
      segData[section][1][row].imgChecked.text = segData[section][1][row].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED ?  OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : OLBConstants.FONT_ICONS.CHECBOX_SELECTED; 
      segData[section][1][row].imgChecked.skin = segData[section][1][row].imgChecked.skin === OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN ?  OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN : OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN; 
      if (segData[section][1][row].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
        this.selectedAccounts.push(segData[section][1][row].accountID);
        this.accountsFlag++;
                if (this.accountsFlag >= 1) // && this.view.txtCustomViewName.text.length > 0)
          FormControllerUtility.enableButton(this.view.btnCreate);
        else 
          FormControllerUtility.disableButton(this.view.btnCreate);
            } else {
        this.accountsFlag--;
        this.selectedAccounts = this.selectedAccounts.filter(function(item) {
            return item !== segData[section][1][row].accountID
        });  
                if (segData[section][0].imgChecked.text === "C")
			segData[section][0].imgChecked.text = "D";
        if (this.accountsFlag >= 1) FormControllerUtility.enableButton(this.view.btnCreate); 
        else FormControllerUtility.disableButton(this.view.btnCreate); 
      }      
      accountsCheckBox.forEach(function(item) {
        if (segData[section][1][row].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) { 
          if (item.accountID === segData[section][1][row].accountID) item.isChecked = "true";					          
                } else {
          if (item.accountID === segData[section][1][row].accountID) item.isChecked = "false";
        }        
      });      
      this.view.segCustomViews.setData(segData);	      
    },

        toggleCheckBox1: function() {
      var section = this.view.segCustomViews.selectedRowIndex[0];
      var row = this.view.segCustomViews.selectedRowIndex[1];
      var segData = this.view.segCustomViews.data;
      var accountsCheckBox1 = this.presenter.presentationController.accounts;
      segData[section][1][row].imgChecked1.text = segData[section][1][row].imgChecked1.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED ?  OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : OLBConstants.FONT_ICONS.CHECBOX_SELECTED; 
      segData[section][1][row].imgChecked1.skin = segData[section][1][row].imgChecked1.skin === OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN ?  OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN : OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN; 
      if (segData[section][1][row].imgChecked1.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
        this.accountsFlag++;
        this.selectedAccounts.push(segData[section][1][row].accountID1);
                if (this.accountsFlag >= 1) // && this.view.txtCustomViewName.text.length > 0)
          FormControllerUtility.enableButton(this.view.btnCreate);
        else 
          FormControllerUtility.disableButton(this.view.btnCreate);
            } else {
        this.accountsFlag--;
        this.selectedAccounts = this.selectedAccounts.filter(function(item) {
            return item !== segData[section][1][row].accountID1
        }); 
                if (segData[section][0].imgChecked.text === "C")
			segData[section][0].imgChecked.text = "D";
        if (this.accountsFlag >= 1) FormControllerUtility.enableButton(this.view.btnCreate); 
        else FormControllerUtility.disableButton(this.view.btnCreate); 
      }      
      accountsCheckBox1.forEach(function(item) {
        if (segData[section][1][row].imgChecked1.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {				
          if (item.accountID === segData[section][1][row].accountID1) item.isChecked = "true";					          
                } else {
          if (item.accountID === segData[section][1][row].accountID1) item.isChecked = "false";
        }        
      });      
      this.view.segCustomViews.setData(segData);	  
    },

    /* to check or uncheck the checkbox in the header template */
        toggleHeaderCheckBox: function() {
      var section = this.view.segCustomViews.selectedRowIndex[0];
      var segData = this.view.segCustomViews.data;
      var accountsHeaderCheck = this.presenter.presentationController.accounts;
      var accountsSelectedInSection = 0;
      var totalAccountsInASection = 0;
            for (var temp = 0; temp < segData[section][1].length; temp++) {
                if (segData[section][1][temp].accountID)
            totalAccountsInASection++;
          if (!kony.sdk.isNullOrUndefined(segData[section][1][temp].accountID1))
            totalAccountsInASection++;
                if (segData[section][1][temp].imgChecked.text === "C")
            accountsSelectedInSection++;
          if (!kony.sdk.isNullOrUndefined(segData[section][1][temp].imgChecked1) && segData[section][1][temp].imgChecked1.text === "C")
            accountsSelectedInSection++;
        }     
      segData[section][0].imgChecked.text = segData[section][0].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED ?  OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : OLBConstants.FONT_ICONS.CHECBOX_SELECTED; 
      segData[section][0].imgChecked.skin = segData[section][0].imgChecked.skin === OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN ?  OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN : OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN; 
            if (segData[section][0].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
        this.accountsFlag = this.accountsFlag + totalAccountsInASection - accountsSelectedInSection;
                if (this.accountsFlag >= 1)
          FormControllerUtility.enableButton(this.view.btnCreate);
        else 
          FormControllerUtility.disableButton(this.view.btnCreate);
            } else {
        this.accountsFlag = this.accountsFlag - totalAccountsInASection;
        if (this.accountsFlag >= 1) FormControllerUtility.enableButton(this.view.btnCreate); 
        else FormControllerUtility.disableButton(this.view.btnCreate); 
      }      
            for (i = 0; i < segData[section][1].length; i++) {
        segData[section][1][i].imgChecked.text = segData[section][0].imgChecked.text;
        segData[section][1][i].imgChecked.skin = segData[section][0].imgChecked.skin;
                if (segData[section][0].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                    if (!this.selectedAccounts.includes(segData[section][1][i].accountID))
          	this.selectedAccounts.push(segData[section][1][i].accountID);
                    accountsHeaderCheck.forEach(function(item) {
            if (item.accountID === segData[section][1][i].accountID) item.isChecked = "true";			
          });
                } else {
          this.selectedAccounts = this.selectedAccounts.filter(function(item) {
            return item !== segData[section][1][i].accountID
        });
                    accountsHeaderCheck.forEach(function(item) {
            if (item.accountID === segData[section][1][i].accountID) item.isChecked = "false";			
          });
        }        
                if (!kony.sdk.isNullOrUndefined(segData[section][1][i].imgChecked1)) {
          segData[section][1][i].imgChecked1.text = segData[section][0].imgChecked.text;
                    if (segData[section][0].imgChecked.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED) {
                        if (!this.selectedAccounts.includes(segData[section][1][i].accountID1))
            	this.selectedAccounts.push(segData[section][1][i].accountID1);
                        accountsHeaderCheck.forEach(function(item) {
            if (item.accountID === segData[section][1][i].accountID1) item.isChecked = "true";			
          });
                    } else {
          this.selectedAccounts = this.selectedAccounts.filter(function(item) {
            return item !== segData[section][1][i].accountID1
        });
                        accountsHeaderCheck.forEach(function(item) {
            if (item.accountID === segData[section][1][i].accountID1) item.isChecked = "false";			
          });
        }
          segData[section][1][i].imgChecked1.skin = segData[section][0].imgChecked.skin;
        }
      }
      this.view.segCustomViews.setData(segData);	  
    },
  
    loadAccountModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
    },

        setupFormOnTouchEnd: function(width) {
            if (width === 640) {
                this.view.onTouchEnd = function() {};
        this.nullifyPopupOnTouchStart();
            } else {
                if (width === 1024) {
                    this.view.onTouchEnd = function() {};
          this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
            hidePopups();
          };
        }
        var userAgent = kony.os.deviceInfo().userAgent;
        if (userAgent.indexOf("iPad") !== -1) {
                    this.view.onTouchEnd = function() {};
          this.nullifyPopupOnTouchStart();
        } else if (userAgent.indexOf("Android") !== -1 && userAgent.indexOf("Mobile") === -1) {
                    this.view.onTouchEnd = function() {};
          this.nullifyPopupOnTouchStart();
        }
      }
    },
        
        layoutWarningFlexes: function() {
      this.view.flxDowntimeWarning.height = "preferred";
      this.view.imgDowntimeWarning.centerY = "";
      this.view.imgDowntimeWarning.top = "10dp";
      this.view.lblDowntimeWarning.centerY = "";
      this.view.lblDowntimeWarning.height = "preferred";
      this.view.lblImgCloseDowntimeWarning.centerY = "";
      this.view.lblImgCloseDowntimeWarning.top = "10dp";
            this.view.lblImgCloseDowntimeWarning.left = "";
            this.view.lblImgCloseDowntimeWarning.right = "10dp";
            this.view.lblImgCloseDowntimeWarning.height = "20dp";
            this.view.lblImgCloseDowntimeWarning.width = "20dp";
      this.view.flxDeviceRegistrationWarning.height = "preferred";
      this.view.DeviceRegisrationWarning.centerY = "";
      this.view.DeviceRegisrationWarning.top = "10dp";
      this.view.lblDeviceRegistrationWarning.centerY = "";
      this.view.lblDeviceRegistrationWarning.height = "preferred";
      this.view.lblImgDeviceRegistrationClose.centerY = "";
      this.view.lblImgDeviceRegistrationClose.top = "10dp";
            this.view.lblImgDeviceRegistrationClose.left = "";
            this.view.lblImgDeviceRegistrationClose.right = "10dp";
            this.view.lblImgDeviceRegistrationClose.height = "20dp";
            this.view.lblImgDeviceRegistrationClose.width = "20dp";
      this.view.flxPasswordResetWarning.height = "preferred";
      this.view.ingPasswordResetWarning.centerY = "";
      this.view.ingPasswordResetWarning.top = "10dp";
      this.view.lblPasswordResetWarning.centerY = "";
      this.view.lblPasswordResetWarning.height = "preferred";
      this.view.lblImgClosePasswordResetWarning.centerY = "";
      this.view.lblImgClosePasswordResetWarning.top = "10dp";
            this.view.lblImgClosePasswordResetWarning.left = "";
            this.view.lblImgClosePasswordResetWarning.right = "10dp";
            this.view.lblImgClosePasswordResetWarning.height = "20dp";
            this.view.lblImgClosePasswordResetWarning.width = "20dp";
      this.view.flxOverdraftWarning.height = "preferred";
      this.view.imgOverDraft.centerY = "";
      this.view.imgOverDraft.top = "10dp";
      this.view.lblOverdraftWarning.centerY = "";
      this.view.lblOverdraftWarning.height = "preferred";
      this.view.lblImgCloseWarning.centerY = "";
      this.view.lblImgCloseWarning.top = "10dp";
            this.view.lblImgCloseWarning.left = "";
            this.view.lblImgCloseWarning.right = "10dp";
            this.view.lblImgCloseWarning.height = "20dp";
            this.view.lblImgCloseWarning.width = "20dp";
      this.view.flxOutageWarning.height = "preferred";
      this.view.imgInfoIconWarning.centerY = "";
      this.view.imgInfoIconWarning.top = "10dp";
      this.view.lblOutageWarning.centerY = "";
      this.view.lblOutageWarning.height = "preferred";
      this.view.lblImgCloseOutageWarning.centerY = "";
      this.view.lblImgCloseOutageWarning.top = "10dp";
            this.view.lblImgCloseOutageWarning.left = "";
            this.view.lblImgCloseOutageWarning.right = "10dp";
            this.view.lblImgCloseOutageWarning.height = "20dp";
            this.view.lblImgCloseOutageWarning.width = "20dp";
    },
    
        bindTnC: function(TnCcontent) {
      var checkboxFlex = this.view.AddExternalAccounts.LoginUsingSelectedBank.flxIAgree;
      var checkboxIcon = this.view.AddExternalAccounts.LoginUsingSelectedBank.flxCheckbox;
      var btnTnC = this.view.AddExternalAccounts.LoginUsingSelectedBank.btnTermsAndConditions;
      var confirmButton = this.view.AddExternalAccounts.LoginUsingSelectedBank.btnLogin;
            if (TnCcontent.alreadySigned) {
        checkboxFlex.setVisibility(false);
            } else {
        CommonUtilities.disableButton(confirmButton);
        checkboxIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                checkboxIcon.onClick = this.toggleTnC.bind(this, checkboxIcon, confirmButton);
        checkboxFlex.setVisibility(true);
                if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                    btnTnC.onClick = function() {
            window.open(TnCcontent.termsAndConditionsContent);
          }
                } else {
          btnTnC.onClick = this.showTermsAndConditionPopUp;
          this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                    if (document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer")) {
            document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
          } else {
                        if (!document.getElementById("iframe_brwBodyTnC").newOnload) {
              document.getElementById("iframe_brwBodyTnC").newOnload = document.getElementById("iframe_brwBodyTnC").onload;
            }
            document.getElementById("iframe_brwBodyTnC").onload = function() {
              document.getElementById("iframe_brwBodyTnC").newOnload();
              document.getElementById("iframe_brwBodyTnC").contentWindow.document.getElementById("viewer").innerHTML = TnCcontent.termsAndConditionsContent;
            };
          }
        }
        this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
      }
      this.view.forceLayout();
    },
    
        showTermsAndConditionPopUp: function() {
      var height = this.view.flxFooter.frame.y + this.view.flxFooter.frame.height;
            this.view.flxTermsAndConditionsPopUp.height = height + "dp";
      this.view.flxTermsAndConditionsPopUp.setVisibility(true);
      this.view.forceLayout();
    },
    
        hideTermsAndConditionPopUp: function() {
      this.view.flxTermsAndConditionsPopUp.setVisibility(false);
    },
    
        setTnCDATASection: function(content) {
      this.view.rtxTC.text = content;
    },
    
        toggleTnC: function(widget, confirmButton) {
            CommonUtilities.toggleFontCheckbox(widget, confirmButton);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED)
        CommonUtilities.disableButton(confirmButton);
      else
        CommonUtilities.enableButton(confirmButton);
    },

    /*
    * Method to initialize search and filter actions
    */
        initializeSearchActions: function() {
      var accounts = this.presenter.presentationController.accounts;
      this.view.txtSearch.text = "";
      this.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.konybb.SearchPlaceholder");
      this.view.flxClearBtn.setVisibility(false);
      this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, accounts);
      this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
      this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, accounts);
      this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, accounts);            
    },
            
    /**
    * method used to enable or disable the clear button.
    */
        onTxtSearchKeyUp: function() {
      var scopeObj = this;
      var searchKeyword = scopeObj.view.txtSearch.text.trim();
      if (searchKeyword.length > 0) {
        scopeObj.view.flxClearBtn.setVisibility(true);
      } else {
        scopeObj.view.flxClearBtn.setVisibility(false);
      }
      this.view.flxtxtSearchandClearbtn.forceLayout();
    },
		
    /**
    * method used to clear search
    */
        onSearchClearBtnClick: function(accounts) {
      var scopeObj = this;      
      scopeObj.view.txtSearch.text = "";
      scopeObj.view.flxClearBtn.setVisibility(false);      
      this.setCustomViewsSegmentData(accounts);      
    },
    
    /**
    * method to handle the search account functionality
    */
        onSearchBtnClick: function(accounts) {
      var scopeObj = this;     
      var data = scopeObj.getSearchData(accounts);          
      this.setCustomViewsSegmentData(data);
      scopeObj.view.forceLayout();     
    },        
    
    /**
    * method to get data from search and filter values
    */
        getSearchData: function(accounts) {
      var scopeObj = this;      
      var searchQuery = scopeObj.view.txtSearch.text.trim();      
            if (searchQuery !== "") {
      var data = accounts;
                var searchresults = [];
      if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {        
                    var j = 0;
        for (var i = 0; i < data.length; i++) {   
          var rowdata = null;
                        if ((data[i].Account_id && data[i].Account_id.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].accountID && data[i].accountID.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].accountNumber && data[i].accountNumber.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].accountName && data[i].accountName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].MembershipName && data[i].MembershipName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].accountType && data[i].accountType.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
                        ) {
            rowdata = data[i];
          }
                        if (kony.sdk.isNullOrUndefined(rowdata)) {
            data[i].isNoRecords = true;
                            data[i].lblNoResultsFound = {
              "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
            };
            var noRecordsData = data[i];            
                            if (data[i].isNoRecords === false) {
                  searchresults[j].push(noRecordsData);
                  j++;
              }
                        } else {
            searchresults[j] = rowdata;            
            j++;
          }
        }
      }
      return searchresults;
            } else {
        return accounts;
      }
    },
  };
});