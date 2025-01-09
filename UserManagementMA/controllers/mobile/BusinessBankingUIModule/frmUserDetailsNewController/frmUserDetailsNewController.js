define({
  //Type your controller code here 
  init: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    this.view.preShow = this.preShowfunction;
  },
  preShowfunction: function() {
    try {
      this.bindevents();
      this.userDetailGetView();
    } catch (err) {}
  },
  bindevents: function() {
    try {
      var device = kony.os.deviceInfo();
      var type = device.name;
      if (type !== "iPhone") {
        this.view.flxHeader.isVisible = true;
        this.view.flxFooter.isVisible = false;
        this.view.customHeader.imgBack.src = "backbutton.png";
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = false;
      }
      this.view.customHeader.flxBack.onClick = this.navigateBack;
      this.view.onDeviceBack = this.navigateBack;
    } catch (er) {
      kony.print("bindevents--->error" + er);
    }
  },
  navigateBack: function() {
    try {
      kony.print("navigatetoPermission--->");
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    } catch (er) {
      kony.print("navigatetoPermission--->error" + er);
    }
  },
  userDetailGetView: function() {
    try {
      var configManager = applicationManager.getConfigurationManager();
      this.view.lblCustomerName.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.customerName");
      this.view.lblCustomerID.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.customerID");
      this.view.lblContract.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.contract");
      this.view.lblUserRole.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.userRole");
      this.view.lblAccountAccess.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.accountAccess");
      this.view.lblAccountAccessPermission.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.accountLevelPermission");
      this.view.lblOtherPermissions.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.otherPermission");
      this.view.lbIndTransLimit.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.individualTransactionLimits");
      this.view.lblBulkTransactionLimit.text = kony.i18n.getLocalizedString("kony.mb.usermanagement.bulkTransactionLimits");
      this.view.lblPerTransaction.text = kony.i18n.getLocalizedString("kony.mb.user.PerTransaction");
      this.view.lblDaily.text = kony.i18n.getLocalizedString("kony.mb.user.Daily");
      this.view.lblWeekly.text = kony.i18n.getLocalizedString("kony.mb.user.Weekly");
      this.view.lblBulkPerTrans.text = kony.i18n.getLocalizedString("kony.mb.user.PerTransaction");
      this.view.lblBulkDaily.text = kony.i18n.getLocalizedString("kony.mb.user.Daily");
      this.view.lblBulkWeekly.text = kony.i18n.getLocalizedString("kony.mb.user.Weekly");
      var navManager = applicationManager.getNavigationManager();
      var userDetails = navManager.getCustomInfo("UserDetailsNew");
      this.view.lblCustomerVal.text = userDetails.data.companyName ? userDetails.data.companyName : "";
      this.view.lblAutoSyncVal.text =  userDetails.data.autoSyncAccounts ? (userDetails.data.autoSyncAccounts === "false" ? kony.i18n.getLocalizedString("kony.mb.Off") : "On") : "";
      this.view.lblStatus.text = userDetails.data.status ? userDetails.data.status : ""
     // this.view.lblCustomerIDVal.text = userDetails.data.contractId ? userDetails.data.contractId : "";
     var getUserdetail = navManager.getCustomInfo("Usermanagement");
     this.view.lblCustomerIDVal.text = getUserdetail.UserName ? getUserdetail.UserName : "-";
        
     this.view.lblContractVal.text = userDetails.data.contractName ? userDetails.data.contractName : "";
      // this.view.lblUserRoleVal.text = userDetails.data.userRoleSelected ?userDetails.data.userRoleSelected:"";  
      this.view.lblUserRoleVal.text = userDetails.data.userRole ?userDetails.data.userRole:"";  
      var noOfAccounts = userDetails.data.accounts.length;
      var enabledAccountCount = 0;
      for(var i = 0;i<userDetails.data.accounts.length;i++){
        var account = userDetails.data.accounts[i];
        if(account.isEnable || account.isEnabled === "true"){
          enabledAccountCount++;
        }
      }
      this.view.lblAccountAccessVal.text = enabledAccountCount  +  kony.i18n.getLocalizedString("i18n.konybb.Common.of")  + noOfAccounts ;
      var isEnabledCount = 0;
      var totalCount = 0;
      var isEnabledCountGlobalPermission = 0;
      var totalCountGlobalPermission = 0;
      var navManager = applicationManager.getNavigationManager();
      var permission = navManager.getCustomInfo("accountLevelPermissions");
      var globalLevelPermission = navManager.getCustomInfo("globalLevelPermissions");
      var transactionLimits = navManager.getCustomInfo("transactionLimits");
      for (var i = 0; i < transactionLimits.length; i++) {
        var companyName = transactionLimits[i].companyName;
        if (companyName === userDetails.data.companyName) {

          var individualTransaction = [];
          var bulkTransactionLimits = [];
          var limitGroups = transactionLimits[i].limitGroups
          for (var k = 0; k < limitGroups.length; k++) {
            var limitGroupId = limitGroups[k].limitGroupId
            var limits = limitGroups[k].limits
            switch (limitGroupId) {
              case "SINGLE_PAYMENT":
                individualTransaction = limits;
                break;
              case "BULK_PAYMENT":
                bulkTransactionLimits = limits;
                break;
            }
          }
          var j = 0;
          for (j = 0; j < individualTransaction.length; j++) {
            if (individualTransaction[j].id === "DAILY_LIMIT") {
              this.view.lblDailyVal.text = configManager.getCurrencyCode() + "" + parseFloat(individualTransaction[j].value).toFixed(2);
            } else if (individualTransaction[j].id === "WEEKLY_LIMIT") {
              this.view.lblWeeklyVal.text = configManager.getCurrencyCode() + "" + parseFloat(individualTransaction[j].value).toFixed(2);
            } else if (individualTransaction[j].id === "MAX_TRANSACTION_LIMIT") {
              this.view.lbPerTransactionVal.text = configManager.getCurrencyCode() + "" + parseFloat(individualTransaction[j].value).toFixed(2);
            }
          }
          for (j = 0; j < bulkTransactionLimits.length; j++) {
            if (bulkTransactionLimits[j].id === "DAILY_LIMIT") {
              this.view.lblBulkDailyVal.text = configManager.getCurrencyCode() + "" + parseFloat(bulkTransactionLimits[j].value).toFixed(2);
            } else if (bulkTransactionLimits[j].id === "WEEKLY_LIMIT") {
              this.view.lblBulkWeeklyVal.text = configManager.getCurrencyCode() + "" + parseFloat(bulkTransactionLimits[j].value).toFixed(2);
            } else if (bulkTransactionLimits[j].id === "MAX_TRANSACTION_LIMIT") {
              this.view.lblBulkPerTransVal.text = configManager.getCurrencyCode() + "" + parseFloat(bulkTransactionLimits[j].value).toFixed(2);
            }
          }
        };
      }
      for (var i = 0; i < permission.length; i++) {
        var companyName = permission[i].companyName;
        if (companyName === userDetails.data.companyName) {
          var accounts = permission[i].accounts;
          for (var j = 0; j < accounts.length; j++) {
            var featurepermission = accounts[j].featurePermissions;
            for (var k = 0; k < featurepermission.length; k++) {
              var features = featurepermission[k].permissions;
              for (var z = 0; z < features.length; z++) {
                if (features[z].isEnabled || features[z].isEnabled === "true") {
                  isEnabledCount++;
                }
                totalCount++;
              }
            }
          }
        }
      }
      this.view.lblAccountLevelPermissionVal.text = isEnabledCount + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + totalCount;
      for (var i = 0; i < globalLevelPermission.length; i++) {
        var companyName = globalLevelPermission[i].companyName;
        if (companyName === userDetails.data.companyName) {
          var features = globalLevelPermission[i].features;
          for (var j = 0; j < features.length; j++) {
            var permissions = features[j].permissions;
            for (var z = 0; z < permissions.length; z++) {
              if (permissions[z].isEnabled || permissions[z].isEnabled === "true") {
                isEnabledCountGlobalPermission++;
              }
              totalCountGlobalPermission++;
            }
          }
        }
      }
      this.view.lblOtherPermissionsVal.text = isEnabledCountGlobalPermission + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of")  + " " + totalCountGlobalPermission;
    } catch (er) {
      kony.print(er);
    }
  }
});