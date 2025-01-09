define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  return /** @alias module:frmUserManagementController */ {
    currentVisibleFlex: "flxUserDetails",
    action: [],
    features: [],
    segData:"",
    onNavigate: function(context) {
      //var compName = context.slice(0, context.length - 10);
      // this.selectedCompany = compName;
      this.selectedCompany = context.companyName; //"Kony India Pvt Limited-infinityuser1SB";
      this.accountName = context.accountName; //"Business Gold Credit Card-X1663";	
      this.selectedCompanyWithId = context.companywithid;
      this.data= this.loadBusinessBankingModule().presentationController.getTransactionLimitsFromUserManagement();
      //this.data = applicationManager.getConfigurationManager().getLimitsData;
    },
    /**
         * Method to display the footer at the end of the screen by calculating the size of screen dynamically
         * @param {integer} data value
         **/
    adjustScreen: function() {
      this.view.forceLayout();
      this.view.flxFooter.isVisible = true;
      var mainheight = 0;
      var screenheight = kony.os.deviceInfo().screenHeight;
      mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height;
      var diff = screenheight - mainheight;
      if (mainheight < screenheight) {
        diff = diff - this.view.flxFooter.info.frame.height;
        if (diff > 0) {
          this.view.flxFooter.top = mainheight + diff + "dp";
        } else {
          this.view.flxFooter.top = mainheight + "dp";
        }
        this.view.forceLayout();
      } else {
        this.view.flxFooter.top = mainheight + "dp";
        this.view.forceLayout();
      }
    },
    /**
         * Breakpont change
         */
    onBreakpointChange: function(width) {
      this.view.customheadernew.onBreakpointChangeComponent(width);
      kony.print('on breakpoint change');
      var scope = this;
      scope.view.flxFooter.isVisible=false;
      this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
      //this.view.PopupHeaderUM.onBreakpointChangeComponent(scope.view.PopupHeaderUM,width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      //this.view.customheader.onBreakpointChangeComponent(width);
      //this.resetUI();
      this.view.flxHeader.isVisible=false;
      if (width <= 640 || orientationHandler.isMobile) {
        var data = this.segData;
        this.view.segTransactionLimits.rowTemplate = "flxAdvanceTransactionLimitContainerTab";
        this.view.segTransactionLimits.setData(data);

      } else if (width <= 1024) {
        //for tablet
        this.view.customheadernew.imgKony.isVisible=true;
        var data = this.segData;
        this.view.segTransactionLimits.rowTemplate = "flxAdvanceTransactionLimitContainerTab";
        this.view.segTransactionLimits.setData(data);

      } else if (width <= 1366) {
        //for desktop
        var data = this.segData;
        this.view.segTransactionLimits.rowTemplate = "flxAdvanceTransactionLimitContainer";
        this.view.segTransactionLimits.setData(data);
      } else {
        //for hd desktop
        var data = this.segData;
        this.view.segTransactionLimits.rowTemplate = "flxAdvanceTransactionLimitContainerTab";
        this.view.segTransactionLimits.setData(data);
      }
      this.view.customheadernew.onBreakpointChangeComponent(width);
       this.view.flxHeader.isVisible=true;
      scope.view.flxFooter.isVisible=true;
      //this.adjustScreen()
    },
    /**
         * hide all ui flexes in user management form
         */
    resetUI: function() {
      //this.adjustScreen();
    },
    /**
         * Method will invoke on form init
         */
    initActions: function() {
      var scopeObj = this;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate.onClick = function() {
        scopeObj.onUserTransactionAccessNextBtnClick()
        //scopeObj.navToNextForm();
      };
      this.view.btnViewAccountLevelPermissionsActionsCancel.onClick = function() {
        scopeObj.navToPrevForm();
      };
      this.view.btnViewNEdit.onClick = function() {
        scopeObj.resetToDefault();
      };
    },
    /**
         * Method will invoke on form pre show
         */
    preShow: function() {
      var navManager = applicationManager.getNavigationManager();
      this.generateTransactionlimitarray();
      this.view.customheadernew.forceCloseHamburger();
      this.view.flxErrorMessage.setVisibility(false);
      this.view.btnViewAccountLevelPermissionsActionsCancel.toolTip=kony.i18n.getLocalizedString("kony.mb.transaction.back");
      this.generateUserDetails();
      this.currencyCode = navManager.getCustomInfo('userCurrency');
    },

    /**
         * Method will invoke on form post show
         */
    postShow: function() {
      this.generateTransactionlimitarray();
      this.onBreakpointChange();
      this.setDataForAccountSegment();
      this.currentVisibleFlex = "flxUserDetails";
      this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate.toolTip= kony.i18n.getLocalizedString("i18n.payments.saveAndUpdate");
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
        if (kony.application.getCurrentBreakpoint() <= 1024) {
        this.view.btnViewNEdit.text=kony.i18n.getLocalizedString("konybb.i18n.resetToDefault");
        this.view.btnViewNEdit.right="0%";
        }
        }
      var flowType = this.loadBusinessBankingModule().presentationController.getUserManagementFlow();
      var createOrEditFlow = this.loadBusinessBankingModule().presentationController.getUserNavigationType();
      if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.CUSTOM_ROLE) {
        this.view.lblUserName.isVisible = false;
        this.view.lblEmail.isVisible = false;
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.customhamburger.activateMenu("User Management",  "Create Custom Role");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
          this.view.customheadernew.customhamburger.activateMenu("User Management",  "User Roles");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditRoleTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        }
      } else if (flowType === OLBConstants.USER_MANAGEMENT_TYPE.USER_CREATION) {
        this.userDetails = this.loadBusinessBankingModule().presentationController.getUserDetails();
        this.view.lblUserName.isVisible = true;
        this.view.lblEmail.isVisible = true;
        CommonUtilities.setText(this.view.lblUserName, this.userDetails.firstName + " " + this.userDetails.lastName, CommonUtilities.getaccessibilityConfig());
        CommonUtilities.setText(this.view.lblEmail, this.userDetails.email, CommonUtilities.getaccessibilityConfig());
        if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.CREATE) {
          this.view.customheadernew.customhamburger.activateMenu("User Management",  "Create UM User");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.CreateUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        } else if (createOrEditFlow === OLBConstants.USER_MANAGEMENT_TYPE.VIEW_EDIT) {
          this.view.customheadernew.customhamburger.activateMenu("User Management",  "All Users");
          CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.konybb.ViewEditUserTransactionLimits"), CommonUtilities.getaccessibilityConfig());
        }
      }
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);

    },
    generateUserDetails:function()
    {
       FormControllerUtility.disableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
      // this.setDataForAccountSegment();
      this.view.lblCompanyName.text = this.selectedCompany;
      this.view.lblAccountName.text = this.accountName;
//       var data =this.loadBusinessBankingModule().presentationController.getUserDetails();
//       var middleName;
//       if (!kony.sdk.isNullOrUndefined(data.middleName)) {
//         middleName = data.middleName;
//       } else {
//         middleName = "";
//       }
//       var name = data.firstName + " " + middleName + " " + data.lastName;
//       this.view.lblUserName.text = name;
//       this.view.lblEmail.text = data.email;
      FormControllerUtility.hideProgressBar(this.view);
      this.currentVisibleFlex = "flxUserDetails";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxMain', 'flxFooter']);

    },
    /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
    accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.tbLastName, this.view.flxLastName],
        [this.view.tbxDriversLicense, this.view.flxDriversLicense],
        [this.view.tbxEmail, this.view.flxEmail],
        [this.view.tbxMiddleName, this.view.flxMiddleName],
        [this.view.tbxName, this.view.flxName],
        [this.view.tbxPhoneNum, this.view.flxPhoneNum],
        [this.view.tbxSSN, this.view.flxSSN]
      ]
      for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    },
    /**
         * Method to update form using given context
         * @param {object} context depending on the context the appropriate function is executed to update view
         */
    updateFormUI: function() {},
    navToNextForm: function() {
      applicationManager.getNavigationManager().navigateTo("frmCreateUserManually");
    },
    navToPrevForm: function() {
      var selectedComp = this.selectedCompanyWithId;
     // var compName = selectedComp.slice(0, selectedComp.length - 10);
      var ntf = new kony.mvc.Navigation("frmUpdatePermissionsInBulk");
      ntf.navigate(selectedComp);
      // applicationManager.getNavigationManager().navigateTo("frmUpdatePermissionsInBulk");
    },
    resetToDefault: function() {
      var scopeObj=this;
      this.data = this.loadBusinessBankingModule().getTransactionLimitsFromUserManagement();
      this.onBreakpointChange();
      this.generateTransactionlimitarray();
      this.setDataForAccountSegment();
      this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate.onClick = function() {
        scopeObj.onUserTransactionAccessNextBtnClick()
        //scopeObj.navToNextForm();
      };
      this.view.btnViewAccountLevelPermissionsActionsCancel.onClick = function() {
        scopeObj.navToPrevForm();
      };
      this.currentVisibleFlex = "flxUserDetails";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFormContent', 'flxFooter']);
    },
    generateTransactionlimitarray: function() {
      var transactionArray = this.data;//.transactionLimits;
      var RowData = [];
      this.FeaturesData = [];
      var companyName = this.selectedCompany; //this.data.transactionLimits.companyName;
      var accountName = this.accountName;
      var transactionlimits;
      if(transactionArray!==undefined && transactionArray!==""){
      for (i in transactionArray) {
        var companynamex = transactionArray[i].companyName;
        if (companynamex === companyName) {
          for (j in transactionArray[i].accounts) {
            var accountnamex = transactionArray[i].accounts[j].accountName;
            if (accountnamex === accountName) {
              transactionlimits = transactionArray[i].accounts[j];
            }
          }
        }
      }
      var scope = this;
      //transactionlimit for limitgroupid
      var transactionlimitarray = [];
      for (i in transactionArray[0].limitGroups) {
        transactionlimitarray[transactionArray[0].limitGroups[i].limitGroupId] = transactionArray[0].limitGroups[i].limits;
      };
      for (i = 0; i < transactionlimits.featurePermissions.length; i++) {
        var limits = transactionlimits.featurePermissions[i].limits;
        var limitgroupID = transactionlimits.featurePermissions[i].limitGroupId;
        if (limits !== undefined) {
          for (var r = 0; r < limits.length; r++) {
            var oid = limits[r]["id"];
            if (!isNaN(parseFloat(limits[r]["value"]))) {
              switch (oid) {
                case "PRE_APPROVED_DAILY_LIMIT":
                  this.action["DAILY_APPROVE_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "AUTO_DENIED_DAILY_LIMIT":
                  this.action["DAILY_DENIAL_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "PRE_APPROVED_WEEKLY_LIMIT":
                  this.action["WEEKLY_APPROVE_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "AUTO_DENIED_WEEKLY_LIMIT":
                  this.action["WEEKLY_DENIAL_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "PRE_APPROVED_TRANSACTION_LIMIT":
                  this.action["PER_TRANSACTION_APPROVE_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "AUTO_DENIED_TRANSACTION_LIMIT":
                  this.action["PER_TRANSACTION_DENIAL_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "MAX_TRANSACTION_LIMIT":
                  this.action["MAX_TRANSACTION_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "DAILY_LIMIT":
                  this.action["DAILY_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
                case "WEEKLY_LIMIT":
                  this.action["WEEKLY_LIMIT"] = parseFloat(limits[r]["value"]);
                  break;
              }
            } //limits end	
          }
//           this.action["MAX_TRANSACTION_LIMIT"]="20";
//           this.action["DAILY_LIMIT"] ="30";// parseFloat(transactionlimit[k]["maxValue"]);
//           this.action["WEEKLY_LIMIT"] ="50";
          
//           var transactionlimit = transactionlimitarray[limitgroupID];
//           if (transactionlimit !== undefined) {
//             for (var k = 0; k < transactionlimit.length; k++) {
//               var oid = transactionlimit[k]["id"];
//               if (!isNaN(parseFloat(transactionlimit[k]["maxValue"]))) {
//                 switch (oid) {
//                   case "MAX_TRANSACTION_LIMIT":
//                     this.action["MAX_TRANSACTION_LIMIT"] = parseFloat(transactionlimit[k]["maxValue"]);
//                     break;
//                   case "DAILY_LIMIT":
//                     this.action["DAILY_LIMIT"] = parseFloat(transactionlimit[k]["maxValue"]);
//                     break;
//                   case "WEEKLY_LIMIT":
//                     this.action["WEEKLY_LIMIT"] = parseFloat(transactionlimit[k]["maxValue"]);
//                     break;
//                 }
//               } //limits end	
//             }
//           }
          var RowVal = {
            lblFeatureHeader: {
              "text": transactionlimits.featurePermissions[i]["featureName"] + " - " +transactionlimits.featurePermissions[i]["actionName"]
            },
            imgArrow: {
              "src": "listboxdownarrow.png"
            },
            lblHeaderSeperator: {
              "text": "-"
            },
            lblPerTransHeader: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.perTransaction")
            },
            lblPerTransLimit: {
              "text": this.currencyCode+this.action["MAX_TRANSACTION_LIMIT"]
            },
            maxTransLimit: this.action["MAX_TRANSACTION_LIMIT"].toString(),
            lblPerTransApproveSymbol: {
              "text": this.currencyCode,
            },
            tbxPerTransApproveAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text": applicationManager.getFormatUtilManager().formatAmount(this.action["PER_TRANSACTION_APPROVE_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
            lblPerTransDenialSymbol: {
              "text": this.currencyCode,
            },
            tbxPerTransDenialAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text": applicationManager.getFormatUtilManager().formatAmount(this.action["PER_TRANSACTION_DENIAL_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
            lblDailyTransHeader: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")
            },
            lblDailyTransLimit: {
              "text": this.currencyCode+this.action["DAILY_LIMIT"]
            },
            maxDailyLimit: this.action["DAILY_LIMIT"].toString(),
            lblDailyTransApproveSymbol: {
              "text": this.currencyCode,
            },
            tbxDailyTransApproveAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text": applicationManager.getFormatUtilManager().formatAmount(this.action["DAILY_APPROVE_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
            tbxDailyTransDenialAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text": applicationManager.getFormatUtilManager().formatAmount(this.action["DAILY_DENIAL_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
            lblDailyTransDenialSymbol: {
              "text": this.currencyCode,
             
            },
            lblWeeklyTransHeader: {
              "text": kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")
            },
            lblWeeklyTransLimit: {
              "text": this.currencyCode+this.action["WEEKLY_LIMIT"]//.toString()
            },
            maxWeeklyLimit: this.action["WEEKLY_LIMIT"].toString(),          
            lblWeeklyTransApproveSymbol:{
              "text":this.currencyCode,
            },
            lblWeeklyTransDenialSymbol: {
              "text": this.currencyCode,
            },
            tbxWeeklyTransApproveAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text":applicationManager.getFormatUtilManager().formatAmount( this.action["WEEKLY_APPROVE_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
            tbxWeeklyTransDenialAmount: {
              "placeholder": "",
              "skin": "skntbxffffffBordere3e3e3SSP15px424242",
              "text": applicationManager.getFormatUtilManager().formatAmount(this.action["WEEKLY_DENIAL_LIMIT"]),//.toString(),
              "onKeyUp": this.validateTransactionLimitsUI.bind(scope)
            },
             lblErrorMessage:
            {
              "isVisible":false              
            },
            flxPerTransApproveLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
            flxPerTransDenialLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
            flxDailyTransApproveLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
            flxDailyTransDenialLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
            flxWeeklyTransApproveLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
            flxWeeklyTransDenialLimitHolder: {
              "skin": "skntbxffffffBordere3e3e3SSP15px424242"
            },
          }
          }
        RowData.push(RowVal);
        this.FeaturesData.push(transactionlimits.featurePermissions[i]["actionName"]);
      }
      scope.view.segTransactionLimits.rowTemplate = "flxAdvanceTransactionLimitContainer";
      scope.datamap();
      scope.view.segTransactionLimits.setData(RowData);
      this.segData=RowData;
      }
    },
    /**
         * Method to handle validation of Transaction Limits
         */
    validateTransactionLimitsUI: function() {
      var scopeObj = this;
      //scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
      //this.adjustScreen();
      var limitsSegData = scopeObj.view.segTransactionLimits.data;
      FormControllerUtility.disableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
      for (var i in limitsSegData) {
        if (limitsSegData[i].tbxPerTransApproveAmount.text === "" || limitsSegData[i].tbxDailyTransApproveAmount.text === "" || limitsSegData[i].tbxWeeklyTransApproveAmount.text === "" || limitsSegData[i].tbxPerTransDenialAmount.text === "" || limitsSegData[i].tbxWeeklyTransDenialAmount.text === "") {
          FormControllerUtility.disableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
          return;
        }
      }
      FormControllerUtility.enableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
    },
    /**
         * Method to handle back of Transaction Limits
         */
    setDataForAccountSegment: function() {
      var scope = this;
      var obj_arr = [];
      obj_arr = [{
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: "Per Transaction",
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: "Daily Transaction",
        }
      }, {
        "flxSeparator": {
          "isVisible": false
        },
        "lblViewTypeName": {
          text: "Weekly Transaction",
        }
      }];

      var data = this.data;
      var res = [];
      for (i in this.FeaturesData) {
        res.push({
          "flxSeparator": {
            "isVisible": false
          },
          "lblViewTypeName": {
            text: this.FeaturesData[i].toString(),
          }
        });
      }

      this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setData(obj_arr);
      this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.onRowClick = function(context) {
        scope.setDropDownValue(context);
      };
      this.view.MobileCustomDropdown.flxDropdown.segViewTypes.setData(res);
      this.view.MobileCustomDropdown.flxDropdown.segViewTypes.onRowClick = function(context) {
        scope.setFeatureDropDownValue(context);
      };
      this.view.MobileCustomDropdown.flxDropdown.isVisible = false;
      this.view.MobileCustomDropdown.flxDropdown.onClick = function() {
        if (this.view.MobileCustomDropdown.flxDropdown.isVisible) {
          this.view.MobileCustomDropdown.flxDropdown.origin = true;
        }
      }.bind(this);
      this.view.MobileCustomDropdown.flxIphoneDropdown.onClick = function() {
        this.setDropdownVisiblility("MobileCustomDropdown");
      }.bind(this);
      /////
      this.view.MobileCustomDropdownTransaction.flxDropdown.isVisible = false;
      this.view.MobileCustomDropdownTransaction.flxDropdown.onClick = function() {
        if (this.view.MobileCustomDropdownTransaction.flxDropdown.isVisible) {
          this.view.MobileCustomDropdownTransaction.flxDropdown.origin = true;
        }
      }.bind(this);
      this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.onClick = function() {
        this.setDropdownVisiblility("MobileCustomDropdownTransaction");
      }.bind(this);
    },

    setDropDownValue: function(context) {
      this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.lblViewType.text = context.selectedRowItems[0].lblViewTypeName.text;
      this.view.MobileCustomDropdownTransaction.flxDropdown.segViewTypes.setVisibility(false);
      this.view.MobileCustomDropdownTransaction.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";

    },

    setFeatureDropDownValue: function(context) {
      this.view.MobileCustomDropdown.flxIphoneDropdown.lblViewType.text = context.selectedRowItems[0].lblViewTypeName.text;
      this.view.MobileCustomDropdown.flxDropdown.segViewTypes.setVisibility(false);
      this.view.MobileCustomDropdown.flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
    },
    setDropdownVisiblility: function(id) {
      if (this.view[id].flxDropdown.origin) {
        this.view[id].flxDropdown.origin = false;
        return;
      }
      if (!this.view[id].flxDropdown.isVisible) {
        this.view[id].clipBounds = false;
        this.view[id].flxDropdown.clipBounds = false;
        this.view[id].flxDropdown.isVisible = true;
        this.view[id].flxDropdown.segViewTypes.setVisibility(true);
        this.view[id].flxIphoneDropdown.flxImage.setVisibility(true);
        // this.view.MobileCustomDropdown.imgDropdown.centerX = "50%";
        this.view[id].flxIphoneDropdown.flxImage.imgDropdown.src = "listboxdownarrow.png";
      } else {
        this.view[id].flxDropdown.isVisible = false;
        this.view[id].flxDropdown.segViewTypes.setVisibility(false);
        //this.view[id].imgDropdown.centerX = "50%";
        this.view[id].flxIphoneDropdown.flxImage.imgDropdown.src = "listboxuparrow.png";
      }
    },
    /**
         * Method to handle validation of Transaction Limits
         */
    onUserTransactionAccessNextBtnClick: function() {
      var scopeObj = this;
      var limits = scopeObj.validateTransactionLimitsWithServiceLimits();
      if (limits.length) {
        //FormControllerUtility.showProgressBar(this.view)
        var data=scopeObj.updateLimitArray();
        this.loadBusinessBankingModule().presentationController.setTransactionLimitsFromUserManagement(data);
        applicationManager.getNavigationManager().navigateTo("frmConfirmAndAck");
        //scopeObj.loadBusinessBankingModule().presentationController.confirmTransactionLimits(limits);
      }
    },
    /**
         * Method to handle validation of Transaction Limits
         * @returns {object} limits
         */
    validateTransactionLimitsWithServiceLimits: function() {
      var scopeObj = this;
      // scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(false);
      scopeObj.view.flxErrorMessage.setVisibility(false);
      var limits = [];
      var flag = 0;
      var limitsSegData = scopeObj.view.segTransactionLimits.data; var toCheck = [];
      var count = 0;
      var tbxMaxTranValue ,tbxMaxDailyValue,tbxMaxWeeklyValue,tbxMinTransValue,tbxMinDailyValue,tbxMinWeeklyValue;
      for (var i in limitsSegData) {
         tbxMaxTranValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxPerTransApproveAmount.text));
         tbxMaxDailyValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxDailyTransApproveAmount.text));
         tbxMaxWeeklyValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxWeeklyTransApproveAmount.text));
         tbxMinTransValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxPerTransDenialAmount.text));
         tbxMinDailyValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxDailyTransDenialAmount.text));
         tbxMinWeeklyValue = Number.parseInt(applicationManager.getFormatUtilManager().deFormatAmount(limitsSegData[i].tbxWeeklyTransDenialAmount.text));

        var maxTranValue = Number.parseInt(limitsSegData[i].maxTransLimit);
        var maxDailyLimit = Number.parseInt(limitsSegData[i].maxDailyLimit);
        var maxWeeklyLimit = Number.parseInt(limitsSegData[i].maxWeeklyLimit);

        if ((tbxMaxTranValue <= maxTranValue && tbxMaxTranValue <= tbxMinTransValue && tbxMinTransValue <= maxTranValue)  &&
            (tbxMaxDailyValue <= maxDailyLimit && tbxMaxDailyValue <= tbxMinDailyValue && tbxMinDailyValue <= maxDailyLimit) && 
            (tbxMaxWeeklyValue <= maxWeeklyLimit && tbxMaxWeeklyValue <= tbxMinWeeklyValue && tbxMinWeeklyValue <= maxWeeklyLimit)  &&
           (tbxMaxDailyValue <= tbxMaxWeeklyValue &&tbxMaxTranValue <= tbxMaxDailyValue)&&(tbxMinTransValue <= tbxMinDailyValue&&tbxMinDailyValue <= tbxMinWeeklyValue)) {
          var limit = {
            //"Service_id": limitsSegData[i].serviceId,
            "Name": limitsSegData[i].lblFeatureHeader,
            "MaxTransactionLimit": CommonUtilities.deFormatAmount(limitsSegData[i].tbxDailyTransApproveAmount.text),
            "MaxDailyLimit": CommonUtilities.deFormatAmount(limitsSegData[i].tbxDailyTransApproveAmount.text)
          };
          limitsSegData[i].lblErrorMessage.isVisible = false;
          limitsSegData[i].tbxDailyTransApproveAmount.skin ="skntbxffffffBordere3e3e3SSP15px424242" ;//ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limitsSegData[i].tbxDailyTransDenialAmount.skin ="skntbxffffffBordere3e3e3SSP15px424242";// ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limitsSegData[i].tbxPerTransApproveAmount.skin ="skntbxffffffBordere3e3e3SSP15px424242";// ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limitsSegData[i].tbxPerTransDenialAmount.skin ="skntbxffffffBordere3e3e3SSP15px424242" ;//ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limitsSegData[i].tbxWeeklyTransApproveAmount.skin ="skntbxffffffBordere3e3e3SSP15px424242" ;//ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limitsSegData[i].tbxWeeklyTransDenialAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";//ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
          limits.push(limit);
          toCheck.push(0);
        } else {
          FormControllerUtility.disableButton(this.view.btnViewAccountLevelPermissionsActionsSaveAndUpdate);
          if (tbxMaxTranValue > maxTranValue || tbxMaxTranValue >= tbxMinTransValue||tbxMaxTranValue>tbxMaxDailyValue) {
            //tbxPerTransApproveAmount == flxPerTransApproveLimitHolder
            limitsSegData[i].tbxPerTransApproveAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxPerTransApproveAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }
          if (tbxMaxDailyValue > maxDailyLimit || tbxMaxDailyValue >= tbxMinDailyValue||tbxMaxDailyValue>tbxMaxWeeklyValue) {
            //flxDailyTransApproveLimitHolder == tbxDailyTransApproveAmount
            limitsSegData[i].tbxDailyTransApproveAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxDailyTransApproveAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }
          if (tbxMaxWeeklyValue > maxWeeklyLimit || tbxMaxWeeklyValue >= tbxMinWeeklyValue) {
            //flxWeeklyTransApproveLimitHolder ==tbxWeeklyTransApproveAmount
            limitsSegData[i].tbxWeeklyTransApproveAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxWeeklyTransApproveAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }

          if (tbxMinTransValue > maxTranValue || tbxMinTransValue <= tbxMaxTranValue||tbxMinDailyValue<tbxMinTransValue) {
            //flxPerTransDenialLimitHolder==tbxPerTransDenialAmount
            limitsSegData[i].tbxPerTransDenialAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxPerTransDenialAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }
          if (tbxMinDailyValue > maxDailyLimit || tbxMinDailyValue <= tbxMaxDailyValue||tbxMinWeeklyValue<tbxMinDailyValue) {
            //flxDailyTransDenialLimitHolder ==tbxDailyTransDenialAmount
            limitsSegData[i].tbxDailyTransDenialAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxDailyTransDenialAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }
          if (tbxMinWeeklyValue > maxWeeklyLimit || tbxMinWeeklyValue <= tbxMaxWeeklyValue) {
            //flxWeeklyTransDenialLimitHolder ==tbxWeeklyTransDenialAmount
            limitsSegData[i].tbxWeeklyTransDenialAmount.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            limitsSegData[i].lblErrorMessage.isVisible = true;
            count = count+1;
          } else {
            limitsSegData[i].tbxWeeklyTransDenialAmount.skin = "skntbxffffffBordere3e3e3SSP15px424242";
          }
          flag = 1;
          if (count == 0) {
            limitsSegData[i].lblErrorMessage.isVisible = false;
          }
        }
        toCheck.push(count);
        count = 0;
      }
      var counter = 0;
      for (var i = 0; i < toCheck.length; i++) {
        if (toCheck[i] > 0) {
          counter = counter + 1;
        }
      }
      if (counter > 1) {
        for (var i in limitsSegData) {
          limitsSegData[i].lblErrorMessage.isVisible = false;
        }
        // scopeObj.errorMessageVisibility();
        scopeObj.view.flxErrorMessage.setVisibility(true);
      }
      if (flag === 1) {
        // this.view.lblErrorMessageTransferPermissions.text = kony.i18n.getLocalizedString("i18n.konybb.createUser.ErrorMessageTransactionLimits");
        //scopeObj.view.flxErrorMessageTransferPermissions.setVisibility(true);
        // scopeObj.view.flxErrorMessageTransferPermissions.setFocus();
        limits = [];
      }
      scopeObj.view.segTransactionLimits.setData(limitsSegData);
     // scopeObj.adjustScreen();
      return limits;
    },
     errorMessageVisibility: function() {
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxErrorMessage.width ="89%";
        this.view.flxErrorMessage.bottom="20dp";
        this.view.flxErrorMessage.height = "70dp";
        this.view.flxErrorMessage.clipBounds=false;
        this.view.flxErrorMessage.left = "35dp";
        this.view.lblErrorMessage.text = "Please fill the right details, check the limit Information below.";
        this.view.lblErrorMessage.skin="bbSknLbl424242Lato20Px";
        this.view.lblErrorMessage.left = "80dp";
        this.view.lblErrorMessage.top="20dp";
        this.view.imgError.src = "close_red.png";
        this.view.imgError.left ="20dp";
        this.view.imgError.top="5dp";           
        this.view.imgError.width="50dp";
        this.view.imgError.bottom =     "20dp";
        this.view.imgError.height="60dp";
        this.view.flxErrorMessageContent.skin="sknFlxffffffShadowdddcdc";
        this.view.flxErrorMessageContent.left="5dp";          
        this.view.flxErrorMessageContent.height = "70dp";     
        this.view.flxErrorMessageContent.clipBounds=false;
        },
    updateLimitArray:function()
    {
      var scopeObj=this;
      var limitsSegData = scopeObj.view.segTransactionLimits.data;
      var transactionArray = this.data;//.transactionLimits;
      var companyName = this.selectedCompany; //this.data.transactionLimits.companyName;
      var accountName = this.accountName;
      var transactionlimits;
      for (k in transactionArray) {
        var companynamex = transactionArray[k].companyName;
        if (companynamex === companyName) {
          for (j in transactionArray[k].accounts) {
            var accountnamex = transactionArray[k].accounts[j].accountName;
            if (accountnamex === accountName) {
              transactionlimits = transactionArray[k].accounts[j];
              var scope = this;
              for (i = 0; i < transactionArray[k].accounts[j].featurePermissions.length; i++) {
                var limits = transactionArray[k].accounts[j].featurePermissions[i].limits;
                if (transactionArray[k].accounts[j].featurePermissions[i].limits !== undefined) {
                  for (var r = 0; r < transactionArray[k].accounts[j].featurePermissions[i].limits.length; r++) {
                    var oid = transactionArray[k].accounts[j].featurePermissions[i].limits[r]["id"];
                    if (!isNaN(parseFloat(transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]))) {
                      switch (oid) {
                        case "PRE_APPROVED_DAILY_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxDailyTransApproveAmount.text);
                          break;
                        case "AUTO_DENIED_DAILY_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxDailyTransDenialAmount.text);
                          break;
                        case "PRE_APPROVED_WEEKLY_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxWeeklyTransApproveAmount.text);
                          break;
                        case "AUTO_DENIED_WEEKLY_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxWeeklyTransDenialAmount.text);
                          break;
                        case "PRE_APPROVED_TRANSACTION_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxPerTransApproveAmount.text);
                          break;
                        case "AUTO_DENIED_TRANSACTION_LIMIT":
                          transactionArray[k].accounts[j].featurePermissions[i].limits[r]["value"]=CommonUtilities.deFormatAmount(limitsSegData[i].tbxPerTransDenialAmount.text);
                          break;
                      }
                    } //limits end	
                  }
                }
              }
            }
          }
        }
      }
      return transactionArray;
    },
    loadBusinessBankingModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
    },
    
    datamap: function() {
      var widgetdatamap = {
        "flxAdvanceHeader": "flxAdvanceHeader",
         "lblErrorMessage":"lblErrorMessage",
        "flxAdvanceTransactionLimitContainer": "flxAdvanceTransactionLimitContainer",
        "flxAdvanceTransactionLimitContainerTab": "flxAdvanceTransactionLimitContainerTab",
        "flxDailyTransApproveLimit": "flxDailyTransApproveLimit",
        "flxDailyTransApproveLimitHolder": "flxDailyTransApproveLimitHolder",
        "flxDailyTransDenialLimit": "flxDailyTransDenialLimit",
        "flxDailyTransDenialLimitHolder": "flxDailyTransDenialLimitHolder",
        "flxDailyTransaction": "flxDailyTransaction",
        "flxPerTransApproveLimit": "flxPerTransApproveLimit",
        "flxPerTransApproveLimitHolder": "flxPerTransApproveLimitHolder",
        "flxPerTransDenialLimit": "flxPerTransDenialLimit",
        "flxPerTransDenialLimitHolder": "flxPerTransDenialLimitHolder",
        "flxPerTransaction": "flxPerTransaction",
        "flxTransactionTable": "flxTransactionTable",
        "flxWeeklyTransApproveLimit": "flxWeeklyTransApproveLimit",
        "flxWeeklyTransApproveLimitHolder": "flxWeeklyTransApproveLimitHolder",
        "flxWeeklyTransDenialLimit": "flxWeeklyTransDenialLimit",
        "flxWeeklyTransDenialLimitHolder": "flxWeeklyTransDenialLimitHolder",
        "flxWeeklyTransaction": "flxWeeklyTransaction",
        "imgArrow": "imgArrow",
        "lblDailyTransApproveAmount": "lblDailyTransApproveAmount",
        "lblDailyTransApproveSymbol": "lblDailyTransApproveSymbol",
        "lblDailyTransDenialAmount": "lblDailyTransDenialAmount",
        "lblDailyTransDenialSymbol": "lblDailyTransDenialSymbol",
        "lblDailyTransHeader": "lblDailyTransHeader",
        "lblDailyTransLimit": "lblDailyTransLimit",
        "lblFeatureHeader": "lblFeatureHeader",
        "lblHeaderSeperator": "lblHeaderSeperator",
        "lblPerTransApproveLimit": "lblPerTransApproveLimit",
        "lblPerTransApproveSymbol": "lblPerTransApproveSymbol",
        "lblPerTransDenialLimit": "lblPerTransDenialLimit",
        "lblPerTransDenialSymbol": "lblPerTransDenialSymbol",
        "lblPerTransHeader": "lblPerTransHeader",
        "lblPerTransLimit": "lblPerTransLimit",
        "lblRowSeperator": "lblRowSeperator",
        "lblWeeklyTransApproveAmount": "lblWeeklyTransApproveAmount",
        "lblWeeklyTransApproveSymbol": "lblWeeklyTransApproveSymbol",
        "lblWeeklyTransDenialAmount": "lblWeeklyTransDenialAmount",
        "lblWeeklyTransDenialSymbol": "lblWeeklyTransDenialSymbol",
        "lblWeeklyTransHeader": "lblWeeklyTransHeader",
        "lblWeeklyTransLimit": "lblWeeklyTransLimit",
        "tbxDailyTransApproveAmount": "tbxDailyTransApproveAmount",
        "tbxDailyTransDenialAmount": "tbxDailyTransDenialAmount",
        "tbxPerTransApproveAmount": "tbxPerTransApproveAmount",
        "tbxPerTransDenialAmount": "tbxPerTransDenialAmount",
        "tbxWeeklyTransApproveAmount": "tbxWeeklyTransApproveAmount",
        "tbxWeeklyTransDenialAmount": "tbxWeeklyTransDenialAmount"
      };
      this.view.segTransactionLimits.widgetDataMap = widgetdatamap;
    }
  }
});
define("UserManagementMA/BusinessBankingUIModule/frmUserManagementTransactionLimitControllerActions", {
  /*
        This is an auto generated file and any modifications to it may result in corruption of the action sequence.
      */
  /** init defined for frmUserManagementTransactionLimit **/
  AS_Form_ib66883022a840b6b92989a6a6e43fdd: function AS_Form_ib66883022a840b6b92989a6a6e43fdd(eventobject) {
    var self = this;
    this.initActions();
  }
});
define("UserManagementMA/BusinessBankingUIModule/frmUserManagementTransactionLimitController", ["UserManagementMA/BusinessBankingUIModule/userfrmUserManagementTransactionLimitController", "UserManagementMA/BusinessBankingUIModule/frmUserManagementTransactionLimitControllerActions"], function() {
  var controller = require("UserManagementMA/BusinessBankingUIModule/userfrmUserManagementTransactionLimitController");
  var controllerActions = ["UserManagementMA/BusinessBankingUIModule/frmUserManagementTransactionLimitControllerActions"];
  return kony.visualizer.mixinControllerActions(controller, controllerActions);
});