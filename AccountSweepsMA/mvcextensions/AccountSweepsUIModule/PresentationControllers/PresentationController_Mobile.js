define([], function () {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function AccountSweeps_PresentationController() {
	this.sweeps = {};
	this.bankDate = {};
	this.flowType = "";
	this.startDate = "";
    this.formattedNewStartDate = "";
    scope_SweepsPresentationController = this;
    scope_SweepsPresentationController.isStartDateSelected=false;
    scope_SweepsPresentationController.serverDate = null;
    scope_SweepsPresentationController.frequencies = {
            'Daily': "i18n.Transfers.Daily",
            'Weekly': "i18n.Transfers.Weekly",
            'Monthly': "i18n.Transfers.Monthly",
            'Every 6 Months': "i18n.accountSweeps.everySixMonths"
    };
    scope_SweepsPresentationController.frequencyDesc = {
            'Daily': "konymb.accSweep.Freq.daily",
            'Weekly': "konymb.accSweep.Freq.weekly",
            'Monthly': "konymb.accSweep.Freq.monthly",
            'Every 6 Months': "konymb.accSweep.Freq.Every6Months"
             
            };
    scope_SweepsPresentationController.isSecondaryEdit = false;
    scope_SweepsPresentationController.coreCustomerId = "";
    scope_SweepsPresentationController.custDashboard = "false";
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(
    AccountSweeps_PresentationController,
    kony.mvc.Presentation.BasePresenter
  );

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  AccountSweeps_PresentationController.prototype.initializePresentationController =
    function () {};

  /**
   * This method is used to handle the cancel navigation across the flow at a central place based on the entry points.
   */
  AccountSweeps_PresentationController.prototype.cancelCommon = function (navigateToForm) {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    accountSweepMan.clearSweepsObject();
    scope_SweepsPresentationController.isStartDateSelected=false;
    var navManager = applicationManager.getNavigationManager();
    navigateToForm === "frmAccountSweepsDashBoard" ? scope_SweepsPresentationController.getSweeps(this.coreCustomerId) : navManager.navigateTo(navigateToForm);
  };
  /**
   * This method is used to handle the params for service call
   */
  AccountSweeps_PresentationController.prototype.dataFormattingForCall =
    function (context) {
      var param = {
        primaryAccountNumber: context.primaryAccountNumber,
        secondaryAccountNumber: context.secondaryAccountNumber,
        belowSweepAmount: context.belowSweepAmount,
        aboveSweepAmount: context.aboveSweepAmount,
        frequency: context.frequency,
        startDate: context.startDate,
        endDate: context.endDate,
        currencyCode: context.currencyCode,
        primaryAccountName: context.primaryAccountName,
        secondaryAccountName: context.secondaryAccountName,
      };
      return param;
    };
    /**
   * This method is used to delete service call
   */
  AccountSweeps_PresentationController.prototype.getSweepsDelete = function (
    data
  ) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    let param = scope_SweepsPresentationController.dataFormattingForCall(data);
    let navManager = applicationManager.getNavigationManager();
    let currentForm=kony.application.getCurrentForm().id;
    navManager.setEntryPoint("AccountSweepsFlow", "Delete");
	param.startDate = data.formattedStartDate;
    if(param.endDate !== ""){
    param.endDate = data.formattedEndDate;
    }
    accountSweepMan.deleteAccountSweep(
      param,
      scope_SweepsPresentationController.getDeleteSuccessCallback.bind(this,currentForm),
      scope_SweepsPresentationController.getDeleteErrorCallback.bind(this,currentForm)
    );
  };
  /**
   * This method is used to success call  for delete service call
   */
  AccountSweeps_PresentationController.prototype.getDeleteSuccessCallback =
    function (currentForm,response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      switch(currentForm)
      {
        case "frmViewAccountSweep":
        let navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("AccountBySweep", response);
        scope_SweepsPresentationController.commonFunctionForNavigation(
          "frmSweepsAcknowledgement"
        );
        break;
        case "frmAccountSweepsDashBoard":
        let  controller = applicationManager
        .getPresentationUtility()
        .getController("frmAccountSweepsDashBoard", true);
      controller.PopupHandler(response);
      break;
          }
          applicationManager.getAccountManager().fetchInternalAccounts(function() {}, function() {});

    };
/**
   * This method is used to failure call  for delete service call
   */
  AccountSweeps_PresentationController.prototype.getDeleteErrorCallback =
    function (currentForm,error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"]) {
        applicationManager
          .getPresentationInterruptHandler()
          .showErrorMessage("postLogin", error);
      } 
      else{
      switch(currentForm)
      {
        case "frmViewAccountSweep":
          let navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("AccountBySweep", error);
        scope_SweepsPresentationController.commonFunctionForNavigation(
          "frmSweepsAcknowledgement"
        );
        break;
        case "frmAccountSweepsDashBoard":
          let controller = applicationManager
          .getPresentationUtility()
          .getController("frmAccountSweepsDashBoard", true);
        controller.PopupHandler(error);
        break;
      }}
    };
  /**
   * This method is used to handle the cancel navigation across the flow at a central place based on the entry points.
   */
  AccountSweeps_PresentationController.prototype.commonFunctionForgoBack =
    function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
  AccountSweeps_PresentationController.prototype.setPrimaryAccounts = function (
    res
  ) {
    let fromSupportedAccounts = res.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
    fromSupportedAccounts = scope_SweepsPresentationController.fetchAccounts(fromSupportedAccounts);
    fromSupportedAccounts = scope_SweepsPresentationController.getAllowedAccounts(fromSupportedAccounts);
    fromSupportedAccounts =
      scope_SweepsPresentationController.isEmptyNullUndefined(
        fromSupportedAccounts
      )
        ? []
        : fromSupportedAccounts;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("fromAccounts", fromSupportedAccounts);
  };
  AccountSweeps_PresentationController.prototype.fetchAccounts = function (
    fromSupportedAccounts
  ) {
    let accounts = fromSupportedAccounts.filter(function (account) {
      return (
        (account.accountType === "Savings" ||
          account.accountType === "Checking") &&
        account.isSweepCreated === false && account.externalIndicator !== "true"
      );
    }); 
    return accounts;
  };
/**
* method to filter the accounts based in permissions
*/
AccountSweeps_PresentationController.prototype.getAllowedAccounts = function (accounts) {
    var permission = ["ACCOUNT_SWEEP_CREATE"];
    return accounts.filter(this.isAccountHaveAtleastOneActions.bind(this, permission));
};
  AccountSweeps_PresentationController.prototype.isAccountHaveAtleastOneActions =
    function (permissions, accountObject) {
      return permissions.some(function (permission) {
        return applicationManager
          .getConfigurationManager()
          .checkAccountAction(accountObject.accountID, permission);
      });
    };

  AccountSweeps_PresentationController.prototype.processAccountsData =
    function (data, type) {
      var accProcessedData = [];
      for (var i = 0; i < data.length; i++) {
        accProcessedData[i] = {};
        var name = "";
        name = data[i].accountName;
        accProcessedData[i].accountName = data[i].accountName;
        accProcessedData[i].nickName = data[i].nickName;
        accProcessedData[i].availableBalance =
          scope_SweepsPresentationController.getAvailableBalanceCurrencyString(
            data[i]
          );
        accProcessedData[i].primaryAccountNumber =
          type === "primary" ? data[i].accountID : undefined;
        accProcessedData[i].secondaryAccountNumber =
          type !== "primary" ? data[i].accountID : undefined;

        accProcessedData[i].accountBalanceType =
          scope_SweepsPresentationController.getAvailableBalanceType(data[i]);
        accProcessedData[i].accountType = data[i].accountType;
        accProcessedData[i].currencyCode = data[i].currencyCode;
        type === "primary"
          ? (accProcessedData[i].primaryAccountName = data[i].accountName)
          : (accProcessedData[i].secondaryAccountName = data[i].accountName);
        accProcessedData[i].fromAccountBalance = data[i].availableBalance;
        accProcessedData[i].processedPrimaryName =
          type === "primary"
            ? applicationManager
                .getPresentationUtility()
                .formatText(name, 10, data[i].accountID, 4)
            : undefined;
        accProcessedData[i].processedSecondaryName =
          type !== "primary"
            ? applicationManager
                .getPresentationUtility()
                .formatText(name, 10, data[i].accountID, 4)
            : undefined;
        accProcessedData[i].isBusinessAccount = data[i].isBusinessAccount;
        accProcessedData[i].membershipID = data[i].Membership_id;
        accProcessedData[i].membershipName = data[i].MembershipName;
        accProcessedData[i].src = {
          isVisible: true,
        };
      }
      return accProcessedData;
    };

  AccountSweeps_PresentationController.prototype.getAvailableBalanceType =
    function (data) {
      var configManager = applicationManager.getConfigurationManager();
      switch (data.accountType) {
        case configManager.constants.SAVINGS:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        case configManager.constants.CHECKING:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
        default:
          return kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      }
    };
  /**
   * This method is used return the formatted amount along with the currency code
   * data - {Object} holds the account object
   * screenType - {string} specifies whether data required in to or from screen based on which type of balance needs to be included in formatting.
   */
  AccountSweeps_PresentationController.prototype.getAvailableBalanceCurrencyString =
    function (data) {
      var forUtility = applicationManager.getFormatUtilManager();
      var configManager = applicationManager.getConfigurationManager();
      var currencyCode = data["currencyCode"];
      switch (data.accountType) {
        case configManager.constants.SAVINGS:
          return forUtility.formatAmountandAppendCurrencySymbol(
            data["availableBalance"],
            currencyCode
          );
        case configManager.constants.CHECKING:
          return forUtility.formatAmountandAppendCurrencySymbol(
            data["availableBalance"],
            currencyCode
          );

        default:
          return forUtility.formatAmountandAppendCurrencySymbol(
            data["availableBalance"],
            currencyCode
          );
      }
    };
  AccountSweeps_PresentationController.prototype.processViewFormattedData =
    function (data) {
      var processedData = {};
      for (var i = 0; i < data.length; i++) {
        if (!processedData.hasOwnProperty(data[i].accountType)) {
          processedData[data[i].accountType] = [];
        }
        if (processedData.hasOwnProperty(data[i].accountType)) {
          processedData[data[i].accountType].push(data[i]);
        }
      }
      return processedData;
    };
  AccountSweeps_PresentationController.prototype.orderByPriority = function (
    data
  ) {
    var cm = applicationManager.getConfigurationManager();
    var prioritizedData = {};
    var metaData = cm.getAccountTypesMetaData();
    for (var key1 in metaData) {
      if (data[metaData[key1].backendValue]) {
        prioritizedData[metaData[key1].backendValue] =
          data[metaData[key1].backendValue];
      }
    }
    return prioritizedData;
  };
  AccountSweeps_PresentationController.prototype.sortByPrefrence = function (
    accountsCollection
  ) {
    if (accountsCollection.length > 1)
      accountsCollection.sort(function (record1, record2) {
        return record1.accountPreference - record2.accountPreference;
      });
    return accountsCollection;
  };
  AccountSweeps_PresentationController.prototype.processDataMembershipNameWise =
    function (data) {
      var userPrefManager = applicationManager.getUserPreferencesManager();
      var personalID = userPrefManager.primaryCustomerId;
      var personal = false;
      var others = false;

      for (var i = 0; i < data.length; i++) {
        if (data[i].isBusinessAccount == "true") {
          others = true;
        } else {
          personal = true;
        }
      }

      function isPersonal(id) {
        if (
          personalID &&
          id == personalID.id &&
          personalID.type === "personal"
        ) {
          return true;
        } else return false;
      }
      var processedData = {};

      for (var i = 0; i < data.length; i++) {
        if (personal && others) {
          data[i].flxAccountType = { isVisible: true };
          data[i].src =
            data[i].isBusinessAccount === "true"
              ? "businessaccount.png"
              : "personalaccount.png";
        } else {
          data[i].flxAccountType = { isVisible: false };
        }
        if (isPersonal(data[i].membershipID)) {
          if (!processedData.hasOwnProperty("Personal Accounts")) {
            processedData["Personal Accounts"] = [];
          }
          if (processedData.hasOwnProperty("Personal Accounts")) {
            processedData["Personal Accounts"].push(data[i]);
          }
        } else {
          if (!processedData.hasOwnProperty(data[i].membershipName)) {
            processedData[data[i].membershipName] = [];
          }
          if (processedData.hasOwnProperty(data[i].membershipName)) {
            processedData[data[i].membershipName].push(data[i]);
          }
        }
      }

      return processedData;
    };
  AccountSweeps_PresentationController.prototype.getAccountSweepsObject =
    function () {
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      var obj = accountSweepMan.getSweepsObject();
      return obj;
    };
  AccountSweeps_PresentationController.prototype.setPrimaryAccountsForTransactions =
    function (sweepAccounts) {
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      accountSweepMan.setSweepsAttribute(
        "primaryAccountNumber",
        sweepAccounts.primaryAccountNumber
      );
      accountSweepMan.setSweepsAttribute(
        "processedPrimaryName",
        sweepAccounts.processedPrimaryName
      );
      accountSweepMan.setSweepsAttribute(
        "primaryAccountName",
        sweepAccounts.primaryAccountName
      );
      accountSweepMan.setSweepsAttribute(
        "currencyCode",
        sweepAccounts.currencyCode
      );
    };
  /**
   * This method is called for the previous secondary account
   */
  AccountSweeps_PresentationController.prototype.setPreviousSecondaryAccountsForTransactions =
    function (sweepAccount) {
      let accountSweepMan = applicationManager.getAccountSweepsManager();
      let navManager = applicationManager.getNavigationManager();
      let accounts = navManager.getCustomInfo("fromAccounts");
      let defaultSelectedSecAc = navManager.getCustomInfo("selectedSecondaryAccount");
      let sweepsObj = accountSweepMan.getSweepsObject();
      let accountMan = applicationManager.getAccountManager();
      const accountList = accountMan.getInternalAccounts();
      if(defaultSelectedSecAc !== sweepAccount.secondaryAccountNumber){
      if (
        !scope_SweepsPresentationController.isEmptyNullUndefined(
          sweepAccount.secondaryAccountNumber
        ) && (sweepAccount.secondaryAccountNumber !== sweepsObj.secondaryAccountNumber) 
      ) {
        accountSweepMan.setSweepsAttribute(
          "previousSecondaryAccountNumber",
          sweepsObj.secondaryAccountNumber
        );
        let sweepsData = accountList.find(account =>account.accountID === sweepsObj.secondaryAccountNumber);
        navManager.setCustomInfo("fromAccounts", accounts.filter(existingData => existingData.accountID !== sweepsData.accountID).concat(sweepsData));
      } else {
        accountSweepMan.setSweepsAttribute(
          "previousSecondaryAccountNumber",
          sweepsObj.secondaryAccountNumber
        );
      }
     } else {
      accountSweepMan.setSweepsAttribute(
        "previousSecondaryAccountNumber",
        ""
      );
     }
    };
  /**
   * This method is called for on Row click of  secondary account
   */
  AccountSweeps_PresentationController.prototype.setSecondaryAccountsForTransactions =
    function (sweepAccounts) {
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      let navManager = applicationManager.getNavigationManager();
      let sweepflow = navManager.getEntryPoint("AccountSweepsFlow");
      if (sweepflow === "Edit") {
        scope_SweepsPresentationController.setPreviousSecondaryAccountsForTransactions(
          sweepAccounts
        );
      } 
        accountSweepMan.setSweepsAttribute(
          "secondaryAccountNumber",
          sweepAccounts.secondaryAccountNumber
        );
        accountSweepMan.setSweepsAttribute(
          "processedSecondaryName",
          sweepAccounts.processedSecondaryName
        );
        accountSweepMan.setSweepsAttribute(
          "secondaryAccountName",
          sweepAccounts.secondaryAccountName
        );
    };

  AccountSweeps_PresentationController.prototype.setSweepAccountsForTransactions =
    function (sweepAccounts) {
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      let navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("selectedSecondaryAccount", sweepAccounts.secondaryAccountNumber);
      accountSweepMan.setSweepsAttribute(
        "primaryAccountNumber",
        sweepAccounts.primaryAccountNumber
      );
      accountSweepMan.setSweepsAttribute(
        "secondaryAccountNumber",
        sweepAccounts.secondaryAccountNumber
      );
      accountSweepMan.setSweepsAttribute(
        "belowSweepAmount",
        sweepAccounts.belowSweepAmount
      );
      accountSweepMan.setSweepsAttribute(
        "aboveSweepAmount",
        sweepAccounts.aboveSweepAmount
      );
      accountSweepMan.setSweepsAttribute("frequency", sweepAccounts.frequency);
       accountSweepMan.setSweepsAttribute("formattedStartDate", sweepAccounts.startDate);
      var startDateOcj=applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(sweepAccounts.startDate,"dd/MM/yyyyy");
      sweepAccounts.startDate=applicationManager.getFormatUtilManager().getFormatedDateString(startDateOcj,applicationManager.getFormatUtilManager().getApplicationDateFormat());
      accountSweepMan.setSweepsAttribute("startDate", sweepAccounts.startDate);
      accountSweepMan.setSweepsAttribute(
        "currencyCode",
        sweepAccounts.currencyCode
      );
      accountSweepMan.setSweepsAttribute(
        "primaryAccountName",
        sweepAccounts.primaryAccountName
      );
      accountSweepMan.setSweepsAttribute(
        "secondaryAccountName",
        sweepAccounts.secondaryAccountName
      );
      accountSweepMan.setSweepsAttribute("formattedEndDate", sweepAccounts.endDate);
      var endDateOcj=applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(sweepAccounts.endDate,"dd/MM/yyyyy");
      sweepAccounts.endDate=applicationManager.getFormatUtilManager().getFormatedDateString(endDateOcj,applicationManager.getFormatUtilManager().getApplicationDateFormat());
      accountSweepMan.setSweepsAttribute("endDate", sweepAccounts.endDate);
      accountSweepMan.setSweepsAttribute("sweepType", sweepAccounts.sweepType);
      accountSweepMan.setSweepsAttribute(
        "sweepMessage",
        sweepAccounts.sweepMessage
      );
      accountSweepMan.setSweepsAttribute("processedPrimaryName", sweepAccounts.processedPrimaryName ? sweepAccounts.processedPrimaryName.text : "");
      accountSweepMan.setSweepsAttribute("processedSecondaryName", sweepAccounts.processedSecondaryName ? sweepAccounts.processedSecondaryName.text : "");
      accountSweepMan.setSweepsAttribute(
        "serviceRequestId",
        sweepAccounts.serviceRequestId
      );
      accountSweepMan.setSweepsAttribute("sweepStatus", sweepAccounts.lblStatus["text"] ? sweepAccounts.lblStatus["text"] : "");
      accountSweepMan.setSweepsAttribute("sweepStatusImage", sweepAccounts.imgStatusIndicator["src"] ? sweepAccounts.imgStatusIndicator["src"] : "inactivegreydot.png");
    };
	
	 AccountSweeps_PresentationController.prototype.setSweepAccountsForView =
    function (sweepAccounts) {
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      let navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("selectedSecondaryAccount", sweepAccounts.secondaryAccountNumber);
      accountSweepMan.setSweepsAttribute(
        "primaryAccountNumber",
        sweepAccounts.primaryAccountNumber
      );
      accountSweepMan.setSweepsAttribute(
        "secondaryAccountNumber",
        sweepAccounts.secondaryAccountNumber
      );
      accountSweepMan.setSweepsAttribute(
        "belowSweepAmount",
        sweepAccounts.belowSweepAmount
      );
      accountSweepMan.setSweepsAttribute(
        "aboveSweepAmount",
        sweepAccounts.aboveSweepAmount
      );
      accountSweepMan.setSweepsAttribute("frequency", sweepAccounts.frequency);
       accountSweepMan.setSweepsAttribute("formattedStartDate", sweepAccounts.startDate);
      var startDateOcj=applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(sweepAccounts.startDate,"dd/MM/yyyyy");
      sweepAccounts.startDate=applicationManager.getFormatUtilManager().getFormatedDateString(startDateOcj,applicationManager.getFormatUtilManager().getApplicationDateFormat());
      accountSweepMan.setSweepsAttribute("startDate", sweepAccounts.startDate);
      accountSweepMan.setSweepsAttribute(
        "currencyCode",
        sweepAccounts.currencyCode
      );
      accountSweepMan.setSweepsAttribute(
        "primaryAccountName",
        sweepAccounts.primaryAccountName
      );
      accountSweepMan.setSweepsAttribute(
        "secondaryAccountName",
        sweepAccounts.secondaryAccountName
      );
       accountSweepMan.setSweepsAttribute("formattedEndDate", sweepAccounts.endDate);
      var endDateOcj=applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(sweepAccounts.endDate,"dd/MM/yyyyy");
      sweepAccounts.endDate=applicationManager.getFormatUtilManager().getFormatedDateString(endDateOcj,applicationManager.getFormatUtilManager().getApplicationDateFormat());
      accountSweepMan.setSweepsAttribute("endDate", sweepAccounts.endDate);
      accountSweepMan.setSweepsAttribute("sweepType", sweepAccounts.sweepType);
      accountSweepMan.setSweepsAttribute(
        "sweepMessage",
        sweepAccounts.sweepMessage
      );
      accountSweepMan.setSweepsAttribute("processedPrimaryName", sweepAccounts.processedPrimaryName ? sweepAccounts.processedPrimaryName.text : "");
      accountSweepMan.setSweepsAttribute("processedSecondaryName", sweepAccounts.processedSecondaryName ? sweepAccounts.processedSecondaryName.text : "");
      accountSweepMan.setSweepsAttribute(
        "serviceRequestId",
        sweepAccounts.serviceRequestId
      );
      accountSweepMan.setSweepsAttribute("sweepStatus", sweepAccounts.status);
      accountSweepMan.setSweepsAttribute("sweepStatusImage", sweepAccounts.imgStatusIndicator);
    };

  /**
   * This method is used to handle the navigation across the flow at a central place based on the entry points.
   */
  AccountSweeps_PresentationController.prototype.commonFunctionForNavigation =
    function (formName) {
      let navManager = applicationManager.getNavigationManager();
      let formData = {
        appName: "AccountSweepsMA",
        friendlyName: "AccountSweepsUIModule/" + formName,
      };
      navManager.navigateTo(formData);
    };

  AccountSweeps_PresentationController.prototype.getSweeps = function (customerId) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var context = accountSweepMan.getSweepsObject();
    var param = {};
    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    var accountData = custominfoCD.accountData;
    if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
        this.custDashboard = "true";
        if(scope_SweepsPresentationController.isEmptyNullUndefined(customerId)){
            this.coreCustomerId = accountData[0].membershipId;
		}else{
			this.coreCustomerId = customerId;
		}        
        param = {
            searchString: "",
            pageSize: 0,
            pageOffset: "",
            sortByParam: "",
            sortOrder: "",
            timeParam: "",
            timeValue: "",
            filterByValue: scope_SweepsPresentationController.isEmptyNullUndefined(
                context.filterByValue
            )
                ? ""
                : context.filterByValue,
            filterByParam: scope_SweepsPresentationController.isEmptyNullUndefined(
                context.filterByParam
            )
                ? ""
                : context.filterByParam,
            coreCustomerId: this.coreCustomerId
        };
    }else{
        param = {
            searchString: "",
            pageSize: 0,
            pageOffset: "",
            sortByParam: "",
            sortOrder: "",
            timeParam: "",
            timeValue: "",
            filterByValue: scope_SweepsPresentationController.isEmptyNullUndefined(
                context.filterByValue
            )
                ? ""
                : context.filterByValue,
            filterByParam: scope_SweepsPresentationController.isEmptyNullUndefined(
                context.filterByParam
            )
                ? ""
                : context.filterByParam,
        };
    }    
    accountSweepMan.getAllSweeps(
      param,
      scope_SweepsPresentationController.getSweepsSuccessCallback.bind(this),
      scope_SweepsPresentationController.getSweepsErrorCallback.bind(this)
    );
  };

  AccountSweeps_PresentationController.prototype.getSweepsSuccessCallback =
    function (response) {
      var navMan = applicationManager.getNavigationManager();
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      navMan.setCustomInfo("AllSweeps", response);
      accountSweepMan.setSweepsAttribute("filterByValue", "");
      accountSweepMan.setSweepsAttribute("filterByParam", "");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SweepsPresentationController.commonFunctionForNavigation(
        "frmAccountSweepsDashBoard"
      );
    };

  AccountSweeps_PresentationController.prototype.getSweepsErrorCallback =function (error) {
    var navMan = applicationManager.getNavigationManager();
      var accountSweepMan = applicationManager.getAccountSweepsManager();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        } else {
          navMan.setCustomInfo("AllSweeps", error);
          accountSweepMan.setSweepsAttribute("filterByValue", "");
          accountSweepMan.setSweepsAttribute("filterByParam", "");
          scope_SweepsPresentationController.commonFunctionForNavigation(
            "frmAccountSweepsDashBoard"
          );
        }
      };

  AccountSweeps_PresentationController.prototype.getSweepsId = function (param) {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var param = {
      "accountId": param.accountID,
    };
    accountSweepMan.getSweepById(param, scope_SweepsPresentationController.getSweepsIdSuccessCallback.bind(this), scope_SweepsPresentationController.getSweepsIdErrorCallback.bind(this));
  };

  AccountSweeps_PresentationController.prototype.getSweepsIdSuccessCallback = function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	this.flowType = "AccountDetails";
    if(response["AccountSweep"].length === 1) {
    this.sweeps = response["AccountSweep"][0];
    scope_SweepsPresentationController.getBankDateView();
    } else {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
	  navMan.setEntryPoint("AccountSweepsFlow", "CreateFromAccountDetails");
      var accountsDetails = navMan.getCustomInfo("frmAccountDetails");
      var sweepsModule = applicationManager.getModulesPresentationController({"moduleName" : "AccountSweepsUIModule", "appName" : "AccountSweepsMA"});
      sweepsModule.setSweepsAttribute("primaryAccountNumber", accountsDetails.selectedAccountData.accountID);
	  sweepsModule.setSweepsAttribute("processedPrimaryName", accountsDetails.selectedAccountData.processedName || applicationManager.getPresentationUtility().formatText(accountsDetails.selectedAccountData.accountName,10,accountsDetails.selectedAccountData.accountID,4));
      sweepsModule.setSweepsAttribute("currencyCode", accountsDetails.selectedAccountData.currencyCode);
      sweepsModule.getAllAccounts("frmSweepsAmount", "frmAccountDetails");
    }
    };

  AccountSweeps_PresentationController.prototype.getSweepsIdErrorCallback = function (error) {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    } else {
      var controller = applicationManager.getPresentationUtility().getController("frmAccountDetails", true); // add frm name
      controller.showErrorPopup(error.errorMessage || error.dbpErrMsg);
    }
  };

  AccountSweeps_PresentationController.prototype.createSweep = function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var context = accountSweepMan.getSweepsObject(); 
    var param = {
      "primaryAccountNumber": context.primaryAccountNumber,
      "secondaryAccountNumber": context.secondaryAccountNumber,
      "belowSweepAmount": context.belowSweepAmount,
      "aboveSweepAmount": context.aboveSweepAmount,
      "frequency": context.frequency,
      "startDate": context.formattedStartDate,
      "endDate": context.formattedEndDate,
      "currencyCode": context.currencyCode,
      "primaryAccountName": context.primaryAccountName,
      "secondaryAccountName": context.secondaryAccountName,
    };
    accountSweepMan.createAccountSweep(
      param,
      scope_SweepsPresentationController.createSweepSuccessCallback.bind(this),
      scope_SweepsPresentationController.createSweepErrorCallback.bind(this)
    );
  };

  AccountSweeps_PresentationController.prototype.createSweepSuccessCallback =
    function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("Confirmation", response);
      scope_SweepsPresentationController.commonFunctionForNavigation(
        "frmSweepsAcknowledgement"
      );
      applicationManager.getAccountManager().fetchInternalAccounts(function() {}, function() {});
    };

  AccountSweeps_PresentationController.prototype.createSweepErrorCallback =
    function (error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"]) {
        applicationManager
          .getPresentationInterruptHandler()
          .showErrorMessage("postLogin", error);
      } else {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("Confirmation", error);
        scope_SweepsPresentationController.commonFunctionForNavigation(
          "frmSweepsAcknowledgement"
        );
      }
    };

  AccountSweeps_PresentationController.prototype.createSweepValidate = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var context = accountSweepMan.getSweepsObject();
      var param = {
        "primaryAccountNumber": context.primaryAccountNumber,
        "secondaryAccountNumber": context.secondaryAccountNumber,
        "belowSweepAmount": context.belowSweepAmount,
        "aboveSweepAmount": context.aboveSweepAmount,
        "frequency": context.frequency,
        "startDate": context.formattedStartDate,
        "endDate": context.formattedEndDate,
        "currencyCode": context.currencyCode,
        "primaryAccountName": context.primaryAccountName,
        "secondaryAccountName": context.secondaryAccountName,
        "validate": "true"
      };
    accountSweepMan.createAccountSweep(param, scope_SweepsPresentationController.createSweepSuccessCallbackValidate.bind(this), scope_SweepsPresentationController.createSweepErrorCallbackValidate.bind(this));
  };
  AccountSweeps_PresentationController.prototype.createSweepSuccessCallbackValidate = function(response) {

  if(response.message==="valid")
  {
    scope_SweepsPresentationController.createSweep()
  }
  };
  AccountSweeps_PresentationController.prototype.createSweepErrorCallbackValidate = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    } else {
      if(error.errorMessage!="")
      {
        var controller = applicationManager.getPresentationUtility().getController("frmCreateVerifyDetails", true);
        controller.showError(error.errorMessage);
      }
    }
  };
  

  AccountSweeps_PresentationController.prototype.editSweep = function () {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var context = accountSweepMan.getSweepsObject(); 
    var param = {
      primaryAccountNumber: context.primaryAccountNumber,
      secondaryAccountNumber: context.secondaryAccountNumber,
      belowSweepAmount: context.belowSweepAmount,
      aboveSweepAmount: context.aboveSweepAmount,
      frequency: context.frequency,
      startDate: context.formattedStartDate,
      endDate: context.formattedEndDate,
      currencyCode: context.currencyCode,
      primaryAccountName: context.primaryAccountName,
      secondaryAccountName: context.secondaryAccountName,
      previousSecondaryAccountNumber: context.previousSecondaryAccountNumber,
    };
	if(this.flowType === "AccountDetails"){
        param.startDate = this.formattedNewStartDate;
    }
    accountSweepMan.editAccountSweep(
      param,
      scope_SweepsPresentationController.editSweepSuccessCallback.bind(this),
      scope_SweepsPresentationController.editSweepErrorCallback.bind(this)
    );
  };

  AccountSweeps_PresentationController.prototype.editSweepSuccessCallback =
    function (response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("Confirmation", response);
      scope_SweepsPresentationController.commonFunctionForNavigation(
        "frmSweepsAcknowledgement"
      );
      applicationManager.getAccountManager().fetchInternalAccounts(function() {}, function() {});
    };

  AccountSweeps_PresentationController.prototype.editSweepErrorCallback =
    function (error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"]) {
        applicationManager
          .getPresentationInterruptHandler()
          .showErrorMessage("postLogin", error);
      } else {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("Confirmation", error);
        scope_SweepsPresentationController.commonFunctionForNavigation(
          "frmSweepsAcknowledgement"
        );
      }
    };
     AccountSweeps_PresentationController.prototype.editSweepValidate = function() {
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    var context = accountSweepMan.getSweepsObject();
       var param = {
      primaryAccountNumber: context.primaryAccountNumber,
      secondaryAccountNumber: context.secondaryAccountNumber,
      belowSweepAmount: context.belowSweepAmount,
      aboveSweepAmount: context.aboveSweepAmount,
      frequency: context.frequency,
      startDate: context.formattedStartDate,
      endDate: context.formattedEndDate,
      currencyCode: context.currencyCode,
      primaryAccountName: context.primaryAccountName,
      secondaryAccountName: context.secondaryAccountName,
      previousSecondaryAccountNumber: context.previousSecondaryAccountNumber,
      validate:"true"
      };
    accountSweepMan.editAccountSweep(param, scope_SweepsPresentationController.editSweepSuccessCallbackValidate.bind(this), scope_SweepsPresentationController.editSweepErrorCallbackValidate.bind(this));
  };
  AccountSweeps_PresentationController.prototype.editSweepSuccessCallbackValidate = function(response) {
    if(response.message==="valid")
    {
      scope_SweepsPresentationController.editSweep()
    }
  };
  AccountSweeps_PresentationController.prototype.editSweepErrorCallbackValidate = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    } else {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("Confirmation", error);
      scope_SweepsPresentationController.commonFunctionForNavigation("frmSweepsAcknowledgement");
    }
  };
    AccountSweeps_PresentationController.prototype.getAllAccounts = function(formName, currentForm) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var accountManager = applicationManager.getAccountManager();
        accountManager.fetchInternalAccounts(scope_SweepsPresentationController.primaryAndSecondaryAccountsSuccessCallBack.bind(this, formName), scope_SweepsPresentationController.primaryAndSecondaryAccountsErrorCallBack.bind(this, currentForm));
    };
    AccountSweeps_PresentationController.prototype.primaryAndSecondaryAccountsSuccessCallBack = function(formName, res) {
        scope_SweepsPresentationController.setPrimaryAccounts(res);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        formName ? scope_SweepsPresentationController.commonFunctionForNavigation(formName) : "";
    };
    AccountSweeps_PresentationController.prototype.primaryAndSecondaryAccountsErrorCallBack = function(formName, error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (error["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
        else {
            if (formName) {
                var controller = applicationManager.getPresentationUtility().getController(formName, true);
                controller.bindGenericError(error.errorMessage || error.dbpErrMsg);
            }
        }
    };

  AccountSweeps_PresentationController.prototype.getAllAccounts = function (formName, currentForm, customerId) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountManager = applicationManager.getAccountManager();
    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
    var accountData = custominfoCD.accountData;
    if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
        this.custDashboard = "true";
        if(scope_SweepsPresentationController.isEmptyNullUndefined(customerId)){
            this.coreCustomerId = accountData[0].membershipId;
        }else{
            this.coreCustomerId = customerId;
        }        
    	var params = {
			"Membership_id": this.coreCustomerId
		};
		applicationManager.getAccountManager().fetchInternalAccountBycustID(params, 
        scope_SweepsPresentationController.primaryAndSecondaryAccountsSuccessCallBack.bind(this, formName), 
        scope_SweepsPresentationController.primaryAndSecondaryAccountsErrorCallBack.bind(this, currentForm));		
    }else{
        accountManager.fetchInternalAccounts(
        scope_SweepsPresentationController.primaryAndSecondaryAccountsSuccessCallBack.bind(
            this , formName
        ),
        scope_SweepsPresentationController.primaryAndSecondaryAccountsErrorCallBack.bind(
            this, currentForm
        )
        );
    }
  };

  AccountSweeps_PresentationController.prototype.primaryAndSecondaryAccountsSuccessCallBack =
    function (formName, res) {
      scope_SweepsPresentationController.setPrimaryAccounts(res);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      formName ? scope_SweepsPresentationController.commonFunctionForNavigation(formName) : "";
    };

  AccountSweeps_PresentationController.prototype.primaryAndSecondaryAccountsErrorCallBack =
    function (formName, error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error["isServerUnreachable"])
        applicationManager
          .getPresentationInterruptHandler()
          .showErrorMessage("postLogin", error);
      else {
        if(formName){
          var controller = applicationManager.getPresentationUtility().getController(formName, true);
        controller.bindGenericError(error.errorMessage || error.dbpErrMsg);
        }
      }
    };

  // to set the every attribues of sweeps object
  AccountSweeps_PresentationController.prototype.setSweepsAttribute = function (
    key,
    value
  ) {
    let sweepsObj = applicationManager.getAccountSweepsManager();
    sweepsObj.setSweepsAttribute(key, value);
  };

  /**
   * This method is used to set to account data in transaction object
   */
  AccountSweeps_PresentationController.prototype.getVerifyScreenData =
    function () {
      var recipientManager = applicationManager.getRecipientsManager();
      applicationManager.getPresentationUtility().showLoadingScreen();
      recipientManager.fetchBankDate(
        {},
        scope_SweepsPresentationController.getBankDateSuccess.bind(this),
        scope_SweepsPresentationController.getBankDateFailure.bind(this)
      );
    };

  AccountSweeps_PresentationController.prototype.getBankDateSuccess = function (
    res
  ) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var sweepManager = applicationManager.getAccountSweepsManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var bankDate = res.date[0].currentWorkingDate;
    var formatedDateObject =
      formatUtilManager.getDateObjectfromString(bankDate);
    scope_SweepsPresentationController.serverDate = formatedDateObject;
    var calendarDate = formatUtilManager.getFormatedDateString(
        formatedDateObject,
        formatUtilManager.getApplicationDateFormat()
      );
    if(scope_SweepsPresentationController.isStartDateSelected)
        {
          sweepManager.setSweepsAttribute("startDate", sweepManager.sweepsObject.startDate);
          sweepManager.setSweepsAttribute("formattedStartDate",applicationManager.getFormatUtilManager().getDateObjectfromString(sweepManager.sweepsObject.startDate).toLocaleDateString('en-GB'))
        }
      else
      {
        sweepManager.setSweepsAttribute("startDate", calendarDate);
        sweepManager.setSweepsAttribute("formattedStartDate", formatedDateObject.toLocaleDateString('en-GB'));
      }
      sweepManager.setSweepsAttribute("serverDate", calendarDate);


    var controller = applicationManager
      .getPresentationUtility()
      .getController("frmCreateVerifyDetails", true);
    controller.setVerifyDetails();
  };

  AccountSweeps_PresentationController.prototype.getBankDateFailure = function (
    err
  ) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager
        .getPresentationInterruptHandler()
        .showErrorMessage("postLogin", err);
    else {
      var sweepManager = applicationManager.getAccountSweepsManager();
      var formatUtilManager = applicationManager.getFormatUtilManager();
      var serverDate = scope_SweepsPresentationController.getServerDate();
      scope_SweepsPresentationController.serverDate = serverDate;
      var calendarDate = formatUtilManager.getFormatedDateString(
          serverDate,
          formatUtilManager.getApplicationDateFormat()
      ); 
     if(scope_SweepsPresentationController.isStartDateSelected)
           {
             sweepManager.setSweepsAttribute("formattedStartDate",applicationManager.getFormatUtilManager().getDateObjectfromString(sweepManager.sweepsObject.startDate).toLocaleDateString('en-GB'))
             sweepManager.setSweepsAttribute("startDate", sweepManager.sweepsObject.startDate)
           }
          else
          {
            sweepManager.setSweepsAttribute("formattedStartDate", applicationManager.getFormatUtilManager().getDateObjectfromString(serverdate).toLocaleDateString('en-GB'));
            sweepManager.setSweepsAttribute("startDate", calendarDate);
          }
      var controller = applicationManager
        .getPresentationUtility()
        .getController("frmCreateVerifyDetails", true);
      controller.setVerifyDetails();
    }
  };

  AccountSweeps_PresentationController.prototype.getBankDate = function () {
    var recipientManager = applicationManager.getRecipientsManager();
      applicationManager.getPresentationUtility().showLoadingScreen();
      recipientManager.fetchBankDate(
        {},
        scope_SweepsPresentationController.bankDateSuccess.bind(this),
        scope_SweepsPresentationController.bankDateFailure.bind(this)
      )
  };
  
  AccountSweeps_PresentationController.prototype.bankDateSuccess = function (response) {
      scope_SweepsPresentationController.bankDate = response.date[0];
  };

  AccountSweeps_PresentationController.prototype.bankDateFailure = function () {
    kony.print("Error fetching bank date");
  };
  
  AccountSweeps_PresentationController.prototype.getBankDateView = function () {
    var recipientManager = applicationManager.getRecipientsManager();
      applicationManager.getPresentationUtility().showLoadingScreen();
      recipientManager.fetchBankDate(
        {},
        scope_SweepsPresentationController.getbankDateSuccess.bind(this),
        scope_SweepsPresentationController.getbankDateFailure.bind(this)
      )
  };
  
  AccountSweeps_PresentationController.prototype.getbankDateSuccess = function (response) {
	  this.bankDate = response.date[0];
      var bankDate = response.date[0].currentWorkingDate;
      var bankDate = new Date(bankDate).getTime();
      var sweepData = this.sweeps;
			if (!kony.sdk.isNullOrUndefined(sweepData.endDate)) {
                var endDate = sweepData.endDate.split("/");
                endDate = new Date(endDate[2], endDate[1] - 1, endDate[0])
                endDate = endDate.getTime();
				var status;
                var imgStatusIndicator;
                if (bankDate < endDate) {
                     status = "Active";
                     imgStatusIndicator = "activegreendot.png";     
                } else {        
                    status = "InActive";
                    imgStatusIndicator = "inactivegreydot.png"; 
                }
            } else {
				var status = "Active";
                var imgStatusIndicator = "activegreendot.png"; 
			}
           this.sweeps.status = status; 
           this.sweeps.imgStatusIndicator = imgStatusIndicator;
      scope_SweepsPresentationController.setSweepAccountsForView(this.sweeps);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SweepsPresentationController.commonFunctionForNavigation("frmViewAccountSweep");
  };

  AccountSweeps_PresentationController.prototype.getbankDateFailure = function () {
    kony.print("Error fetching bank date");
  };


  AccountSweeps_PresentationController.prototype.getServerDate = function (
    date
  ) {
    var config = applicationManager.getConfigurationManager();
    var offset = config.getOffset();
    var hours = offset[0];
    var minutes = offset[1];
    var dateUTC;
    if (date) dateUTC = new Date(date);
    else {
      var srh = applicationManager.getServiceResponseHandler();
      var serverdate = srh.getServerDate();
      if (kony.sdk.isNullOrUndefined(serverdate) || serverdate == "") {
        serverdate = Date.now();
      }
      dateUTC = new Date(serverdate);
    }
    var dateIST = new Date(dateUTC);
    dateIST.setUTCHours(dateIST.getUTCHours() + hours);
    dateIST.setUTCMinutes(dateIST.getUTCMinutes() + minutes);
    return dateIST;
  };

  AccountSweeps_PresentationController.prototype.isEmptyNullUndefined =
    function (data) {
      if (data === null || data === undefined || data === "") {
        return true;
      } else {
        return false;
      }
    };

  /**
   * This method is used to return the index of the type of frequency selected in the select frequency screen.
   */
  AccountSweeps_PresentationController.prototype.getSelectedFrequencyIndex = function() {
    let sweepManager = applicationManager.getAccountSweepsManager();
    let frequency = sweepManager.getSweepsObject().frequency;
    switch (frequency) {
      case "Daily":
        return 0;
        break;
      case "Weekly":
        return 1;
        break;
      case "Monthly":
        return 2;
        break;
      case "Every 6 Months":
        return 3;
        break;
      default:
        return "";
    }
  };

  return AccountSweeps_PresentationController;
});
