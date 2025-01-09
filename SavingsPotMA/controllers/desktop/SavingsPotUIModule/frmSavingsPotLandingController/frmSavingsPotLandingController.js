define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    selectedAccount: {},
    accountList: [],
    updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.serverError) {
          this.showServerError(uiData.serverError);
        } else {
          if (uiData.showLoadingIndicator) {
            if (uiData.showLoadingIndicator.status === true) {
              FormControllerUtility.showProgressBar(this.view)
            } else {
              FormControllerUtility.hideProgressBar(this.view)
            }
          }

        }
        if (uiData.accountList) {
          this.updateAccountList(uiData.accountList);
          this.accountList = uiData.accountList;
        }
        if (uiData.accountDetails) {
          this.accountType = uiData.accountDetails.accountType;
          this.showAccountTypes();
          this.updateAccountDetails(uiData.accountDetails);
        }
        if (uiData.savingsPotDetails) {
          this.setSavingsPotData(uiData.savingsPotDetails)
        }
        if (uiData.closeSavingsPotSuccess) {
          this.closeSavingsPotSuccessMsg();
        }
        if (uiData.selectedAccount) {
          this.setSelectedAccountView(uiData.selectedAccount);
        }
        if (uiData.errorMsg) {
          this.setErrorMsg(uiData.errorMsg);
        }
      }
    },
    /**
         * Method to update account details- account details section
         * @param {JSON} account Account whose details needs to be updated
         */
    updateAccountDetails: function(account) {
      this.selectedAccount = account;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      var updatedAccountID = account.accountID;
      CommonUtilities.setText(this.view.lblAccountTypes, CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), updatedAccountID), accessibilityConfig)
      this.view.lblAccountTypes.toolTip = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), updatedAccountID);

    },

    setSelectedAccountView: function(account) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.selectedAccount = account;
      var accountID = account.accountID;
      CommonUtilities.setText(this.view.lblAccountTypes, CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID), accessibilityConfig)
      this.view.lblAccountTypes.toolTip = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
    },

    /**
         * Method to update accounts list segment
         * @param {Collection} accountList List of accounts
         */
    updateAccountList: function(accountList_inp) {
      var filterList = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch(err){
          return input;
        }
      };
      var accountList = filterList(accountList_inp);
      var accounts = accountList.map(this.createAccountListSegmentsModel);
      var dataMap = {
        "flxAccountTypes": "flxAccountTypes",
        "flxAccountTypesMobile": "flxAccountTypesMobile",
        "lblSeparator": "lblSeparator",
        "lblUsers": "lblUsers"
      };

      this.view.accountTypes.segAccountTypes.widgetDataMap = dataMap;
      this.view.accountTypes.segAccountTypes.setData(accounts);
      this.view.accountTypes.forceLayout();

    },
    /**
         * Method to create Accounts List segment view model
         * @param {JSON} account Account for which you want to create view Model
         * @returns {JSON} View model
         */
    createAccountListSegmentsModel: function(account) {
      var self = this;
      return {
        "lblUsers": {
          "text": CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), account.accountID),
          "toolTip": CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), account.accountID)
        },
        "lblSeparator": "Separator",
        "flxAccountTypes": {
          "onClick": function() {
            self.savingsPotPresentationController.fetchSavingsPot(account.Account_id)
          }
        },
        "flxAccountTypesMobile": {
          "onClick": function() {
            self.savingsPotPresentationController.fetchSavingsPot(account.Account_id)
          }
        },
        template: kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile ? "flxAccountTypesMobile" : "flxAccountTypes"
      };
    },

    onBreakpointChange: function(form, width) {
      var scope = this;
      this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
      this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
      this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooter.onBreakpointChangeComponent(width);
      this.setupFormOnTouchEnd();
      this.updateAccountList(this.accountList);
    },
    hidePopups: function() {
      var currFormObj = kony.application.getCurrentForm();
      if (currFormObj.flxAccountList.isVisible === true) {
        if (currFormObj.accountTypes.segAccountTypes.contentOffsetMeasured.y == 0) {
          setTimeout(function() {
            currFormObj.flxAccountList.isVisible = false;
            if (currFormObj.imgAccountTypes.src === "arrow_up.png" || currFormObj.imgAccountTypes.src === "chevron_up.png") {
              currFormObj.imgAccountTypes.src = "arrow_down.png";
            }
          }, "17ms")
        }
      }
    },
    setupFormOnTouchEnd: function(width) {
      var scope = this;
      if (width == 640) {
        this.view.onTouchEnd = function() {}
        this.nullifyPopupOnTouchStart();
      } else {
        if (width == 1024) {
          this.view.onTouchEnd = function() {}
          this.nullifyPopupOnTouchStart();
        } else {
          this.view.onTouchEnd = function() {
            scope.hidePopups();
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
    nullifyPopupOnTouchStart: function() {
      this.view.flxAccountTypes.onTouchStart = null;
    },

    /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
    showServerError: function(status) {
      if (status === false) {
        this.view.flxMakeTransferError.setVisibility(false);
      } else {
        this.view.rtxError.text = status;
        this.view.rtxError.toolTip = status;
        this.view.flxMakeTransferError.setVisibility(true);
        this.view.flxMakeTransferError.setFocus(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      this.view.forceLayout();
    },
    /**
         * Init Method 
         */

    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function() {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.flxActionTablet.onClick = this.navigateToCreateSavingsPot;
      this.view.flxCreateNewSavingsPot.onClick = this.navigateToCreateSavingsPot;
      this.view.flxNoBudgetsPermission.setVisibility(false);
      this.view.flxNoGoalNoPermission.setVisibility(false);
      this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.mySavingsPot");
      CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("ii18n.savingsPot.mySavingsPot"), accessibilityConfig);
    },
    /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
         */
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    viewConfirmationClosePopUp: function(data) {
      var scopeObj = this;
      scopeObj.view.flxDialogs.setVisibility(true);
      scopeObj.view.flxCloseSavingsGoalConfirmation.setVisibility(true);
      scopeObj.view.flxCloseSavingsGoalConfirmation.left = "0%";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      if (data.potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
        this.view.deletePopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.savingsPot.closeSavingsGoal");
        this.view.lblGoalClosedSuccess.text = data.potName + " " + kony.i18n.getLocalizedString("i18n.savingsPot.goalClosed");
        if (data.availableBalance !== "0") {
          this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.goalCloseMsg1") + " " + data.potName + " " + kony.i18n.getLocalizedString("i18n.savingsPot.goalCloseMsg2") + " " + CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(this.selectedAccount), this.selectedAccount.Account_id) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.goalCloseMsg3") + ".";
        } else {
          this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingspot.savingsPotCloseGoal") + " " + data.potName + ".";
        }
      }
      if (data.potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
        this.view.deletePopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.savingsPot.closeBudget");
        this.view.lblGoalClosedSuccess.text = data.potName + " " + kony.i18n.getLocalizedString("i18n.savingsPot.closeBudgetMsg");
        if (data.availableBalance !== "0") {
          this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.BudgetCloseMsg1") + " " + data.potName + " " + kony.i18n.getLocalizedString("i18n.savingsPot.goalCloseMsg2") + " " + CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(this.selectedAccount), this.selectedAccount.Account_id) + " " + kony.i18n.getLocalizedString("i18n.savingsPot.goalCloseMsg3") + ".";
        } else {
          this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingspot.savingsPotCloseBudget") + " " + data.potName + ".";
        }
      }
      var popupComponent = scopeObj.view.flxCloseSavingsGoalConfirmation.widgets()[0];
      popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
      //  popupComponent.width="93%";
      popupComponent.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
      popupComponent.btnYes.onClick = function() {
        scopeObj.savingsPotPresentationController.closeSavingsPot(data.savingsPotId, scopeObj.selectedAccount.Account_id);
      };
      popupComponent.btnNo.setVisibility(true);
      popupComponent.btnNo.onClick = function() {
        scopeObj.view.flxDialogs.setVisibility(false);
        scopeObj.view.flxCloseSavingsGoalConfirmation.left = "-100%";
      }
      popupComponent.flxCross.onClick = function() {
        scopeObj.view.flxDialogs.setVisibility(false);
        scopeObj.view.flxCloseSavingsGoalConfirmation.left = "-100%";
      }
    },

    closeSavingsPotSuccessMsg: function() {
      var scopeObj = this;
      scopeObj.view.flxDialogs.setVisibility(false);
      scopeObj.view.flxCloseSavingsGoalConfirmation.left = "-100%";
      scopeObj.view.flxSavingsPotClosedSuccess.setVisibility(true);
      scopeObj.view.flxSavingsPotClosedSuccess.setFocus(true);
      FormControllerUtility.hideProgressBar(this.view)
    },

    /**
         * on click action of flxActionTablet,flxCreateNewSavingsPot
         */
    navigateToCreateSavingsPot: function() {
      FormControllerUtility.showProgressBar(this.view);
      applicationManager.getNavigationManager().navigateTo("frmCreateSavingsPot");
    },

    /**
         * on click action of flxActionTablet,flxCreateNewSavingsPot
         */
    navigateToCreateSavingsGoal: function() {
      FormControllerUtility.showProgressBar(this.view);
      applicationManager.getNavigationManager().navigateTo("frmCreateSavingsGoal");
      applicationManager.getNavigationManager().updateForm({
        createGoalData: {}
      });
    },

    /**
         * on click action of flxActionTablet,flxCreateNewSavingsPot
         */
    navigateToCreateSavingsBudget: function() {
      FormControllerUtility.showProgressBar(this.view);
      applicationManager.getNavigationManager().navigateTo("frmCreateBudget");
      applicationManager.getNavigationManager().updateForm({
        createBudgetData: {}
      });
    },
    /**
         * post show Method 
         */
    postShow: function() {
      this.view.customheadernew.forceCloseHamburger();
      this.setActiveHeaderHamburger();
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setNoDataUI();
      this.setNoPermissionData();
      this.checkPermissionToCreateSavingsPot();
    },
    /**
         * pre show Method 
         */
    preShow: function() {
      var scopeObj = this;
      var currBreakpoint = kony.application.getCurrentBreakpoint();
      this.view.customheadernew.setFocus(true);
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.flxGoalCreationWarning.setVisibility(false);
      this.view.imgGoalSuccessClose.onTouchEnd = function() {
        scopeObj.view.flxSavingsPotClosedSuccess.setVisibility(false);
      }
      this.view.imgCloseGoalCreationWarning.onTouchEnd = function() {
        scopeObj.view.flxGoalCreationWarning.setVisibility(false);
      }
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
      this.view.flxAccountList.isVisible = false;
      this.view.flxAccountTypes.onClick = function() {
        if (currBreakpoint === 640 || orientationHandler.isMobile) {
          flag = 0;
        }
        scopeObj.showAccountTypes();
      };
      this.view.lblTotalBalanceValue.text = "";
      this.view.lblMyGoalsValue.text = "";
      this.view.lblMyBudgetsValue.text = "";
      this.view.imgPotType1.src = "goal_icon.png";
      this.view.imgGoalSuccessClose.setVisibility(false);
      this.view.flxSavingsPotClosedSuccess.setVisibility(false);
      this.view.flxNoGoalNoPermission.setVisibility(false);
      this.view.flxNoBudgetsPermission.setVisibility(false);
      this.view.flxCloseSavingsGoalConfirmation.setVisibility(false);
    },
    checkPermissionToCreateSavingsPot: function() {
//       if (applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_CREATE) || applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_CREATE)) {
      if (true){  
      this.view.flxActionTablet.setVisibility(true);
        this.view.flxCreateNewSavingsPot.setVisibility(true);
        if (applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_CREATE) && applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_CREATE)) {
          this.view.flxActionTablet.onClick = this.navigateToCreateSavingsPot;
          this.view.flxCreateNewSavingsPot.onClick = this.navigateToCreateSavingsPot;
        } else if (applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_CREATE)) {
          this.view.flxActionTablet.onClick = this.navigateToCreateSavingsGoal;
          this.view.flxCreateNewSavingsPot.onClick = this.navigateToCreateSavingsGoal;
        } else if (applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_CREATE)) {
          this.view.flxActionTablet.onClick = this.navigateToCreateSavingsBudget;
          this.view.flxCreateNewSavingsPot.onClick = this.navigateToCreateSavingsBudget;
        }
      } else {
        this.view.flxActionTablet.setVisibility(false);
        this.view.flxCreateNewSavingsPot.setVisibility(false);
      }
    },
    setNoDataUI: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //Setting No Goals Data
      CommonUtilities.setText(this.view.lblNoGoalTitle, kony.i18n.getLocalizedString("i18n.savingsPot.myGoals") + " " + "(0)", accessibilityConfig);
      CommonUtilities.setText(this.view.lblPotType1Name, kony.i18n.getLocalizedString("i18n.savingsPot.savingsGoal"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblPotType1Description, kony.i18n.getLocalizedString("i18n.savingsPot.savingsGoalDescrition"), accessibilityConfig);
      // CommonUtilities.setText(this.view.lblCreateGoal, kony.i18n.getLocalizedString("i18n.SavingsPot.createGoal"), accessibilityConfig);
      this.view.lblCreateGoal.onTouchEnd = this.onCreateGoal;

      //Setting No Budgets Data
      CommonUtilities.setText(this.view.lblNoBudgetTitle, kony.i18n.getLocalizedString("i18n.savingsPot.myBudgets") + " " + "(0)", accessibilityConfig);
      CommonUtilities.setText(this.view.lblPotType, kony.i18n.getLocalizedString("i18n.savingsPot.savingsBudget"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblPotTypeDetails, kony.i18n.getLocalizedString("i18n.savingsPot.savingsBudgetDescription"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblCreateBudget, kony.i18n.getLocalizedString("i18n.savingsPot.createBudget"), accessibilityConfig);
      this.view.lblCreateBudget.onTouchEnd = this.onCreateBudget;
    },

    setNoPermissionData: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      CommonUtilities.setText(this.view.lblNoGoalTitlePermission, kony.i18n.getLocalizedString("i18n.savingsPot.myGoals") + " " + "(0)", accessibilityConfig);
      CommonUtilities.setText(this.view.lblGoalTypePermission, kony.i18n.getLocalizedString("i18n.savingspot.noGoalPermission"), accessibilityConfig);

      CommonUtilities.setText(this.view.lblNoBudgetTitlePermission, kony.i18n.getLocalizedString("i18n.savingsPot.myBudgets") + " " + "(0)", accessibilityConfig);
      CommonUtilities.setText(this.view.lblPotTypeBudgetPermission, kony.i18n.getLocalizedString("i18n.savingspot.noBudgetPermission"), accessibilityConfig);
    },

    /**
         * Method that initiates create goal flow
         */
    onCreateGoal: function() {
      FormControllerUtility.showProgressBar(this.view);
      applicationManager.getNavigationManager().navigateTo("frmCreateSavingsGoal");
      applicationManager.getNavigationManager().updateForm({
        createGoalData: {}
      });
    },

    /**
         * Method that initiates create budget flow
         */
    onCreateBudget: function() {
      FormControllerUtility.showProgressBar(this.view);
      applicationManager.getNavigationManager().navigateTo("frmCreateBudget");
      applicationManager.getNavigationManager().updateForm({
        createBudgetData: {}
      });
    },

    setErrorMsg: function(errMsg) {
      this.view.lblGoalCreationWarning.text = errMsg.serverError;
      this.view.flxGoalCreationWarning.setVisibility(true);
    },

    setSavingsPotData: function(savingsPotData) {
      var data1 = [];
      var data2 = [];
      var data = [];
      this.setSavingsPotBalances(savingsPotData);
      for (var index = 0; index < savingsPotData.length; index++) {
        if (savingsPotData[index].potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
          data1.push(this.createData('full', savingsPotData[index].potAmountPercentage, savingsPotData[index]));
        }
        if (savingsPotData[index].potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
          data2.push(this.createData('half', savingsPotData[index].potAmountPercentage, savingsPotData[index]));
        }
      }
      if (data1.length > 0 && this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_VIEW)) {
        var myGoalsTitle;
        if (data1.length > 1) {
          myGoalsTitle = kony.i18n.getLocalizedString("i18n.savingsPot.myGoals") + " " + "(" + data1.length + ")";
        } else {
          myGoalsTitle = kony.i18n.getLocalizedString("i18n.savingsPot.myGoal") + " " + "(" + data1.length + ")";
        }
        data.push({
          title: myGoalsTitle,
          data: data1
        });
        this.view.flxMyGoals.setVisibility(true);
        this.view.flxNoGoals.setVisibility(false);
      } else {
        this.setNoGoalView(data1);
      }
      if (data2.length > 0 && this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_VIEW)) {
        var myBudgetsTitle;
        if (data2.length > 1) {
          myBudgetsTitle = kony.i18n.getLocalizedString("i18n.savingsPot.myBudgets") + " " + "(" + data2.length + ")";
        } else {
          myBudgetsTitle = kony.i18n.getLocalizedString("i18n.savingsPot.myBudget") + " " + "(" + data2.length + ")";
        }
        data.push({
          title: myBudgetsTitle,
          data: data2
        });
        this.view.flxNoBudgets.setVisibility(false);
      } else {
        this.setNoBudgetView(data2);
      }
      if (data.length > 0) {
        this.view.goalsAndBudgets.setData(data);
        this.view.flxSavingsPotSegmentContainer.setVisibility(true);
      } else {
        this.view.flxSavingsPotSegmentContainer.setVisibility(false);
      }
      FormControllerUtility.hideProgressBar(this.view);
    },

    setNoGoalView: function(data) {
                   var viewPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_VIEW);
                   var createPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_CREATE);
      //var viewPermission = true;
      //var createPermission = true;
      if (viewPermission === false) {
        this.view.flxMyGoals.setVisibility(false);
        this.view.flxNoGoalNoPermission.setVisibility(false);
        this.view.flxNoGoals.setVisibility(false);
        return;
      }
      if (data.length == 0 && createPermission === true) {
        this.view.flxMyGoals.setVisibility(true);
        this.view.flxNoGoalNoPermission.setVisibility(false);
        this.view.flxNoGoals.setVisibility(true);
        return;
      }
      if (data.length === 0 && createPermission === false) {
        this.view.flxMyGoals.setVisibility(true);
        this.view.flxNoGoalNoPermission.setVisibility(true);
        this.view.flxNoGoals.setVisibility(false);
        return;
      }
    },

    setNoBudgetView: function(data) {
                   var viewPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_VIEW);
                  var createPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_CREATE);
      //var viewPermission = true;
      //var createPermission = true;
      if (viewPermission === false) {
        this.view.flxMyBudgets.setVisibility(false);
        this.view.flxNoBudgetsPermission.setVisibility(false);
        this.view.flxNoBudgets.setVisibility(false);
        return;
      }
      if (data.length == 0 && createPermission === true) {
        this.view.flxMyBudgets.setVisibility(true);
        this.view.flxNoBudgetsPermission.setVisibility(false);
        this.view.flxNoBudgets.setVisibility(true);
        return;
      }
      if (data.length === 0 && createPermission === false) {
        this.view.flxMyBudgets.setVisibility(true);
        this.view.flxNoBudgetsPermission.setVisibility(true);
        this.view.flxNoBudgets.setVisibility(false);
        return;
      }
    },

    setSavingsPotBalances: function(savingsPotData) {
      var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
      //             var goalViewPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_VIEW);
      //             var budgetViewPermission = this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_VIEW);
      var goalViewPermission = true;
      var budgetViewPermission = true;
      var myGoalsAmount = this.getTotalAmount(savingsPotData, OLBConstants.SAVINGS_POT_TYPE.GOAL, goalViewPermission);
      var myBudgetAmount = this.getTotalAmount(savingsPotData, OLBConstants.SAVINGS_POT_TYPE.BUDGET, budgetViewPermission);
      var totalAmount = myGoalsAmount + myBudgetAmount;
      var myGoalsCount = this.getTotalCount(savingsPotData, OLBConstants.SAVINGS_POT_TYPE.GOAL, goalViewPermission);
      var myBudgetCount = this.getTotalCount(savingsPotData, OLBConstants.SAVINGS_POT_TYPE.BUDGET, budgetViewPermission);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      CommonUtilities.setText(this.view.lblTotalBalance, kony.i18n.getLocalizedString("i18n.savingsPot.totalBalanceHeader"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblTotalBalanceValue, CommonUtilities.formatCurrencyWithCommas(totalAmount, false, currencySymbol), accessibilityConfig);
      CommonUtilities.setText(this.view.lblMyGoals, kony.i18n.getLocalizedString("i18n.savingsPot.myGoals") + " (" + myGoalsCount + ")", accessibilityConfig);
      CommonUtilities.setText(this.view.lblMyGoalsValue, CommonUtilities.formatCurrencyWithCommas(myGoalsAmount, false, currencySymbol), accessibilityConfig);
      CommonUtilities.setText(this.view.lblMyBudgets, kony.i18n.getLocalizedString("i18n.savingsPot.myBudgets") + " (" + myBudgetCount + ")", accessibilityConfig);
      CommonUtilities.setText(this.view.lblMyBudgetsValue, CommonUtilities.formatCurrencyWithCommas(myBudgetAmount, false, currencySymbol), accessibilityConfig);
    },

    getTotalAmount: function(savingsPotData, type, permit) {
      var sum = 0;
      if (permit === false) {
        return sum;
      }
      for (var index = 0; index < savingsPotData.length; index++) {
        if (savingsPotData[index].potType.toLowerCase() === type) {
          sum = sum + Number(savingsPotData[index].availableBalance);
        }
      }
      return sum;
    },

    getTotalCount: function(savingsPotData, type, permit) {
      var count = 0;
      if (permit === false) {
        return count;
      }
      for (var index = 0; index < savingsPotData.length; index++) {
        if (savingsPotData[index].potType.toLowerCase() === type) {
          count++;
        }
      }
      return count;
    },

    getSatusImageIcon: function(status) {
      if (status) {
        if (status.toLowerCase() === OLBConstants.SAVING_POT_STATUS.ON_TRACK.toLowerCase()) {
          return "bb_user_active1.png";
        }
        if (status.toLowerCase() === OLBConstants.SAVING_POT_STATUS.NOT_ON_TRACK.toLowerCase()) {
          return "bb_user_suspended.png";
        }
        if (status.toLowerCase() === OLBConstants.SAVING_POT_STATUS.COMPLETED.toLowerCase()) {
          return "bb_user_active1.png";
        }
        if (status.toLowerCase() === OLBConstants.SAVING_POT_STATUS.PARTIALLY_FUNDED.toLowerCase()) {
          return "aa_password_error.png";
        }
        if (status.toLowerCase() === OLBConstants.SAVING_POT_STATUS.YET_TO_FUND.toLowerCase()) {
          return "aa_password_error.png";
        }
      }
      return "bb_user_active1.png";
    },

    createData: function(chartType, percentage, data) {
      var self = this;
      var dataItem = {};
      dataItem.chart = {
        type: chartType,
        percentage: percentage
      };
      dataItem.title = {
        "title": data.potName,
        "status": data.potCurrentStatus || OLBConstants.SAVING_POT_STATUS.ON_TRACK,
        "statusIcon": this.getSatusImageIcon(data.potCurrentStatus)
      }
      // Instructions : the order of key and value should be same    
      dataItem.data = {
        keys: this.getKeysBasedOnType(data.potType, data),
        values: this.geValuesBasedOnKeys(data.potType, data)
      }
      dataItem.actions = this.getSavingsPotActionsBasedOnTypes(data.potType, data)
      dataItem.alert = {
        text: this.getAlertText(data),
        icon: this.getAlertText(data) === "" ? "" : "bulk_billpay_success_2.png"
      }
      return dataItem;
    },

    getAlertText: function(data) {
      var msg = "";
      if (data.potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL && (data.potCurrentStatus && data.potCurrentStatus.toLowerCase() === OLBConstants.SAVING_POT_STATUS.COMPLETED.toLowerCase())) {
        if (this.isEarlyMaturity(data.endDate)) {
          msg = kony.i18n.getLocalizedString("i18n.savingsPot.alertMsgEarly") + " " + data.endDate + "!!";
          return msg
        } else {
          msg = kony.i18n.getLocalizedString("i18n.savingsPot.alertMsgOnTime");
          return msg;
        }
      }
      return msg;
    },

    isEarlyMaturity: function(endDateString) {
      var endDate = new Date(endDateString);
      var todaysDate = new Date();
      if (todaysDate < endDate)
        return true;
      return false;
    },

    getKeysBasedOnType: function(type, data) {
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
        return this.getGoalsKeys(data);
      }
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
        return this.getBudgetKeys(data);
      }
    },

    geValuesBasedOnKeys: function(type, data) {
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
        return this.getGoalsValues(data);
      }
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
        return this.getBudgetValues(data);
      }
    },

    getGoalsKeys: function(data) {
      var remainingSavings = data.targetAmount - data.availableBalance;
      var keys = [];
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"));
      if (remainingSavings > 0) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.remainingSavings"));
      }
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.finalDate"));
      if (data.amountWithdrawn > 0) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmount"));
      }
      if (remainingSavings < 0) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingspot.excessAmount"));
      }
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.periodicContribution"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.createdDate"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.startDate"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.goalType"));
      if (data.lastModifiedDate) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.modifiedDate"));
      }
      return keys;
    },

    getGoalsValues: function(data) {
      var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
      var remainingSavings = data.targetAmount - data.availableBalance;
      if (Number(remainingSavings) < 0)
        remainingSavings = 0;
      var values = [];
      values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.targetAmount, currencySymbol));
      values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.availableBalance, currencySymbol));
      if (remainingSavings > 0) {
        values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(remainingSavings, currencySymbol));
      }
      values.push(CommonUtilities.getFrontendDateString(data.endDate));
      if (data.amountWithdrawn > 0) {
        values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.amountWithdrawn, currencySymbol));
      }
      if (data.targetAmount - data.availableBalance < 0) {
        values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(Math.abs(data.targetAmount - data.availableBalance), currencySymbol))
      }
      values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.periodicContribution, currencySymbol));
      values.push(this.getFrequency(data));
      values.push(CommonUtilities.getFrontendDateString(data.creationDate));
      values.push(CommonUtilities.getFrontendDateString(data.startDate));
      values.push(this.getCategory(data.savingsType));
      if (data.lastModifiedDate) {
        values.push(CommonUtilities.getFrontendDateString(data.lastModifiedDate));
      }
      return values;
    },

    getCategory: function(category) {
      var categories = this.savingsPotPresentationController.getSavingsPotCategories();
      for (var index = 0; index < categories.length; index++) {
        if (categories[index].name === category) {
          return categories[index].description;
        }
      }
      return null;
    },

    getBudgetKeys: function(data) {
      var remainingSavings = data.targetAmount - data.availableBalance;
      var keys = [];
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"));
      keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.createdDate"));
      if (data.amountWithdrawn > 0) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmount"));
      }
      if (remainingSavings < 0) {
        keys.push(kony.i18n.getLocalizedString("i18n.savingspot.excessAmount"));
      }
      return keys;
    },

    getBudgetValues: function(data) {
      var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
      var remainingSavings = data.targetAmount - data.availableBalance;
      var values = [];
      values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.targetAmount, currencySymbol));
      values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.availableBalance, currencySymbol));
      values.push(CommonUtilities.getFrontendDateString(data.creationDate));
      if (data.amountWithdrawn > 0) {
        values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.amountWithdrawn, currencySymbol));
      }
      if (remainingSavings < 0) {
        values.push(applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(Math.abs(data.targetAmount - data.availableBalance), currencySymbol));
      }
      return values;
    },

    getFrequency: function(data) {
      return data.frequencyDay;
    },

    getSavingsPotActionsBasedOnTypes: function(type, data) {
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
        return this.getSavingsActions(data);
      }
      if (type.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
        return this.getBudgetActions(data);
      }
    },

    getSavingsActions: function(data) {
      var self = this;
      var savingsIdObj = {
        "savingsPotId": data.savingsPotId
      }
      var isCurrentBalance = (data.availableBalance === "0") ? false : true;
      var actions = [];
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_ADHOC_FUND)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.savingsPot.fund"),
          onClick: function() {
            self.savingsPotPresentationController.showFundGoal(savingsIdObj);
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_WITHDRAW_FUND)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw"),
          onClick: function() {
            if (isCurrentBalance) {
              self.savingsPotPresentationController.showWithdrawGoal(savingsIdObj);
            } else {
              self.showNoBalanceMessage(data);
            }
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_EDIT)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
          onClick: function() {
            self.savingsPotPresentationController.showEditGoalScreen(savingsIdObj);
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.GOAL_POT_CLOSE)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount"),
          onClick: function() {
            self.viewConfirmationClosePopUp(data);
          }
        });
      }
      return actions;
    },

    checkForPermission: function(permission) {
      return applicationManager.getConfigurationManager().checkUserPermission(permission);
      //return true;
    },

    getBudgetActions: function(data) {
      var self = this;
      var savingsIdObj = {
        "savingsPotId": data.savingsPotId
      }
      var isCurrentBalance = (data.availableBalance === "0") ? false : true;
      var actions = [];
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_ADHOC_FUND)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.savingsPot.fund"),
          onClick: function() {
            self.savingsPotPresentationController.showFundBudgetScreen(savingsIdObj);
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_WITHDRAW_FUND)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.konybb.myRequests.Withdraw"),
          onClick: function() {
            if (isCurrentBalance) {
              self.savingsPotPresentationController.showWithdrawBudgetScreen(savingsIdObj);
            } else {
              self.showNoBalanceMessage(data);
            }
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_EDIT)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.billPay.Edit"),
          onClick: function() {
            self.savingsPotPresentationController.showEditBudgetScreen(savingsIdObj);
          }
        });
      }
      if (this.checkForPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_CLOSE)) {
        actions.push({
          text: kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount"),
          onClick: function() {
            self.viewConfirmationClosePopUp(data);
          }
        });
      }
      return actions;
    },

    showNoBalanceMessage: function(data) {
      var scopeObj = this;
      scopeObj.view.flxDialogs.setVisibility(true);
      scopeObj.view.flxCloseSavingsGoalConfirmation.setVisibility(true);
      scopeObj.view.flxCloseSavingsGoalConfirmation.left = "0%";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      if (data.potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.GOAL) {
        this.view.deletePopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.savingsPot.savingsGoal");
        this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.zeroBalanceGoal") + " " + data.potName + ". " + kony.i18n.getLocalizedString("i18n.savingsPot.closeGoalNow");
      }
      if (data.potType.toLowerCase() === OLBConstants.SAVINGS_POT_TYPE.BUDGET) {
        this.view.deletePopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.savingsPot.savingsBudget");
        this.view.deletePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.zeroBalanceGoal") + " " + data.potName + ". " + kony.i18n.getLocalizedString("i18n.savingsPot.closeBudgetNow");
      }
      var popupComponent = scopeObj.view.flxCloseSavingsGoalConfirmation.widgets()[0];
      popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
      popupComponent.btnYes.text = kony.i18n.getLocalizedString("i18n.savingsPot.ok");
      popupComponent.btnYes.onClick = function() {
        scopeObj.view.flxCloseSavingsGoalConfirmation.setVisibility(false);
        scopeObj.view.flxDialogs.setVisibility(false);
      };
      popupComponent.btnNo.setVisibility(false);
      popupComponent.flxCross.onClick = function() {
        scopeObj.view.flxDialogs.setVisibility(false);
        scopeObj.view.flxCloseSavingsGoalConfirmation.left = "-100%";
      }
    },
    /**
         * Method to show Account Types popup
         */
    showAccountTypes: function() {
      if (this.view.accountTypes.origin) {
        this.view.accountTypes.origin = false;
        return;
      }
      if (this.view.flxAccountList.isVisible == false) {
        this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
        this.view.flxAccountList.isVisible = true;
      } else {
        this.view.flxAccountList.isVisible = false;
        this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
      }
      this.view.forceLayout();
    },

  };
});