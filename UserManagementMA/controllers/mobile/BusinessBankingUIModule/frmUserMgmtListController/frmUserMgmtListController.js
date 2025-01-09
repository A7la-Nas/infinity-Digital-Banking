define(['CommonUtilities'], function(CommonUtilities) {
  /*This function is first called when a form is ready to use */
  return {
    navManager: "",
    timerCounter: 0,
    onNavigate: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        this.navManager = navManager;
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("onNavigate inside");
      } catch (er) {
        //alert(er);
        kony.print("onNavigate" + er);
      }
    },
    /*This function is called during the app lifecycle*/
    formPreShow: function() {
      try {
        this.view.tbxSearch.setFocus(false);
        this.view.tbxSearch.text = "";
        this.view.flxSearch.isVisible = true;
        this.view.flxPopup.isVisible = false;
        this.view.flxNoTransactions.setVisibility(false);
        this.view.segUserManagement.setVisibility(true);
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          this.view.flxHeader.isVisible = true;
          this.view.flxFooter.isVisible = false;
        } else {
          this.view.flxHeader.isVisible = false;
          this.view.flxFooter.isVisible = true;
          var MenuHandler = applicationManager.getMenuHandler();
          MenuHandler.setUpHamburgerForForm(this, "Manage User");
          var navManager = applicationManager.getNavigationManager();
          var currentForm = navManager.getCurrentForm();
          applicationManager.getPresentationFormUtility().logFormName(currentForm);
        }
        this.view.flxuserList.isVisible = true;
        this.view.flxFilters.isVisible = false;
        this.view.flxAllUser.top = "1dp";
        var searchText = this.navManager.getCustomInfo("frmUserMgmntSearch");
        if (searchText !== "" && searchText !== null && searchText !== undefined) {
          this.view.tbxSearch.setFocus(true);
        } else {
          this.view.tbxSearch.setFocus(false);
        }
        this.configureSearch(searchText);
        this.view.onDeviceBack = this.flxBackOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.flxConfirmTick.onClick = this.showFilters;
        this.view.segUserManagement.onRowClick = this.userManagementSegmentOnClick;
        this.view.segFilters.onRowClick = this.onFilterSelect;
      } catch (er) {
        //alert(er);
      }
    },
    /*This function is called during the app lifecycle*/
    formPostShow: function() {
      try {
        this.showUserListandSetFilters();
      } catch (er) {}
    },
    /*This function is used to perform onRowfClcik events of user list segment*/
    userManagementSegmentOnClick: function() {
      try {
        kony.print("try of userSegmentClick");
        var selectedItems = this.view.segUserManagement.selectedRowItems[0];
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmUserMgmntSearch", "");
        navManager.setCustomInfo("frmUserMgmtListdetails", "");
        navManager.setCustomInfo("Usermanagement", selectedItems);
        applicationManager.getPresentationUtility().showLoadingScreen();
        var userManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
        userManagementModule.presentationController.getInfinityUser(selectedItems.userId, this.successCallBack, this.errorCallBack);
      } catch (er) {
        kony.print("catch of userSegmentClick" + er);
      }
    },
    /*This function is used to search users 
         *@param {String} obj  -searchtext
         */
    tbxSearchOnTextDone: function(obj) {
      var searchData = CommonUtilities.sortAndSearchJSON(this.filterData, null, null, "name,id", this.view.tbxSearch.text);
      if (searchData != -1) {
        this.setUserManagementSegment(searchData);
      } else {
        this.setUserManagementSegment(false);
      }
    },
    /**
         * Method to configure search logic  for the list of users
         * @param {String} searchText - search String
         */
    configureSearch: function(searchText) {
      this.view.tbxSearch.text = searchText || "";
      var scope = this;
      this.view.tbxSearch.onTextChange = function() {
        if (scope.view.tbxSearch.text.length === 0) {
          scope.tbxSearchOnTextDone({
            searchString: scope.view.tbxSearch.text.trim()
          });
        }
      };
      this.view.tbxSearch.onDone = function() {
        scope.tbxSearchOnTextDone({
          searchString: scope.view.tbxSearch.text.trim()
        });
      };
      this.view.imgSearchIcon.onTouchEnd = function() {
        scope.tbxSearchOnTextDone({
          searchString: scope.view.tbxSearch.text.trim()
        });
      };
    },
    flxBackOnClick: function() {
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmUserMgmntSearch", "");
      navMan.setCustomInfo("frmUserMgmtListdetails", "");
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
      accountMod.presentationController.showDashboard();
    },
    fetchErrorBack: function(response) {
      try {
        if (!kony.sdk.isNullOrUndefined(response)) {
          var scopeObj = this;
          var errorResponse = "";
          if (!kony.sdk.isNullOrUndefined(response.errorMessage)) {
            errorResponse = response.errorMessage;
          } else {
            errorResponse = kony.i18n.getLocalizedString("kony.mb.servicesErrormsg");
          }
          this.view.customPopup.lblPopup.text = errorResponse;
          if (!kony.sdk.isNullOrUndefined(this.timerCounter)) {
            this.timerCounter = parseInt(this.timerCounter) + 1;
          } else {
            this.timerCounter = 1;
          }
          var timerId = "timerPopupError" + this.timerCounter;
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";
          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
          }, 1.5, false);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    showFilters: function() {
      if (this.view.flxFilters.isVisible === false) {
        this.view.flxuserList.isVisible = false;
        this.view.flxFilters.isVisible = true;
        this.view.flxAllUser.top = "1dp";
      } else {
        this.view.flxuserList.isVisible = true;
        this.view.flxFilters.isVisible = false;
        this.view.flxAllUser.top = "1dp";
        this.applyFilterToUserList();
      }
    },
    applyFilterToUserList: function() {
      var segData = this.view.segFilters.data;
      var filterList = [];
      this.filterData = [];
      var searchData = {};
      for (var i = 0; i < segData.length; i++) {
        for (var j = 0; j < segData[i][1].length; j++) {
          if (segData[i][1][j].imgConfirmTick.isVisible === true) {
            filterList.push(segData[i][1][j].coreCustomerId);
          }
        }
      }
      for (var i = 0; i < this.existingUsers.length; i++) {
        var flag = false;
        for (var j = 0; j < filterList.length; j++) {
          for (var k = 0; k < this.existingUsers[i].coreCustomerId.length; k++) {
            if (filterList[j] === this.existingUsers[i].coreCustomerId[k]) {
              this.filterData.push(this.existingUsers[i]);
              flag = true;
              break;
            }
          }
          if (flag === true) {
            break;
          }
        }
      }
      if (this.view.tbxSearch.text != "") {
        searchData = CommonUtilities.sortAndSearchJSON(this.filterData, null, null, "name,id", this.view.tbxSearch.text)
        if (searchData != -1) {
          this.setUserManagementSegment(searchData);
        } else {
          this.setUserManagementSegment(false);
        }
      }
      else{
        this.setUserManagementSegment(this.filterData);
      }

      //CommonUtilities.sortAndSearchJSON();
    },
    successCallBack: function(response) {
      try {
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("GetContractUserDetails", response);
        navMan.setCustomInfo("accountLevelPermissions", response.accountLevelPermissions);
        navMan.setCustomInfo("globalLevelPermissions", response.globalLevelPermissions);
        navMan.setCustomInfo("transactionLimits", response.transactionLimits);
        navMan.navigateTo("UserDetails");
      } catch (er) {
        kony.print(er);
      }
    },
    errorCallBack: function(response) {
      applicationManager.getPresentationUtility().showLoadingScreen();
      try {
        if (!kony.sdk.isNullOrUndefined(response)) {
          var scopeObj = this;
          var errorResponse = "";
          if (!kony.sdk.isNullOrUndefined(response.errorMessage)) {
            errorResponse = response.errorMessage;
          } else {
            errorResponse = kony.i18n.getLocalizedString("kony.mb.servicesErrormsg");
          }
          this.view.customPopup.lblPopup.text = errorResponse;
          if (!kony.sdk.isNullOrUndefined(this.timerCounter)) {
            this.timerCounter = parseInt(this.timerCounter) + 1;
          } else {
            this.timerCounter = 1;
          }
          var timerId = "timerPopupError" + this.timerCounter;
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";
          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
          }, 1.5, false);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    showUserListandSetFilters: function() {
      var navMan = applicationManager.getNavigationManager();
      var response = navMan.getCustomInfo("frmUserManagementUserList");
      this.generateExistingUsersArr(response.userExists);
      this.setUserManagementSegment(this.existingUsers);
      this.setFilterSegmentData();
    },
    /*This function is used to populate  user list on segment*/
    setUserManagementSegment: function(userDataTemp) {
      var navManager = applicationManager.getNavigationManager();
   //   var userList = userData.userExists;
      var userData = [],
          rowObj, dateFormat;
      var userValues = userDataTemp; //userData.userExists.companyList;
      var isIphone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      if (userValues !== false) {
          for (i = 0; i < userValues.length; i++) {
              var lastlogin = "",lastloginDet = "";
              if (userValues[i].lastSignedIn !== undefined && userValues[i].lastSignedIn !== "") {
                  userValues[i].lastSignedIn = userValues[i].lastSignedIn.replace(" ", "T");
                  dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                  lastlogin = CommonUtilities.getFrontendDateString(userValues[i].lastSignedIn, dateFormat);
                  lastloginDet = lastlogin + " " + userValues[i].lastSignedIn.split("T")[1];
              } else {
                  lastlogin = kony.i18n.getLocalizedString("i18n.common.NA");
                  lastloginDet = kony.i18n.getLocalizedString("i18n.common.NA");
              }
              var status = userValues[i].status.toLowerCase();
            if(status==="new"|| status==="New"){
              status= kony.i18n.getLocalizedString( "i18n.userManagement.new");
             }else if(status==="active"|| status==="Active"){
              status= kony.i18n.getLocalizedString("kony.mb.cardManage.Active");
              }
              status = status.substring(0, 1).toUpperCase() + status.substring(1);
              rowObj = {
                  "lblUserName": {
                      "text": userValues[i].name //"" + userValues[i].FirstName + " " + userValues[i].LastName
                  },
                  "lblTimeStamp": {
                      "text": "" + lastloginDet
                  }, //lastlogin 
                  "lblUserLevel": {
                      "text": kony.sdk.isNullOrUndefined(userValues[i].roleId) ? "-" : ("" + this.formatRoleName(userValues[i].roleId))
                  }, //(userValues[i].role_name)},
                  "lblUserStatus": {
                      "text": ""  + status
                  },
                  "UserName": userValues[i].userName,
                  "Lastlogin": lastloginDet,
                  //"DateOfBirth": CommonUtilities.getFrontendDateString(userValues[i].DateOfBirth, "mm/dd/yyyy"),
                  "Status": kony.sdk.isNullOrUndefined(userValues[i].status) ? "-" : userValues[i].status,
                  "Email": kony.sdk.isNullOrUndefined(userValues[i].email) ? "-" : userValues[i].email,
                  //"FirstName": kony.sdk.isNullOrUndefined(userValues[i].FirstName) ? "-" : userValues[i].FirstName,
                  //"LastName": kony.sdk.isNullOrUndefined(userValues[i].LastName) ? "-" : userValues[i].LastName,
                  //"DrivingLicenseNumber": kony.sdk.isNullOrUndefined(userValues[i].DrivingLicenseNumber) ? "-" : userValues[i].DrivingLicenseNumber,
                  // "Ssn": kony.sdk.isNullOrUndefined(userValues[i].Ssn) ? "-" : userValues[i].Ssn,
                  //"Phone": kony.sdk.isNullOrUndefined(userValues[i].Phone) ? "-" : userValues[i].Phone,
                  "Rolename": kony.sdk.isNullOrUndefined(userValues[i].roleId) ? "-" : userValues[i].roleId,
                "userId" :	kony.sdk.isNullOrUndefined(userValues[i].id) ? "-" : userValues[i].id,
              };
              if (userValues[i].userName === applicationManager.getUserPreferencesManager().getCurrentUserName()) {
                  rowObj.lblUserName.text += " " + kony.i18n.getLocalizedString("kony.mb.userMgmt.loggedInUserTitle");
              }
              userData.push(rowObj);
          }
          this.view.flxuserList.setVisibility(true);              
          this.view.segUserManagement.setVisibility(true);
          this.view.segUserManagement.setData(userData);
          this.view.lblUsersCount.text = "(" + userData.length + ")";
          this.view.flxNoTransactions.setVisibility(false);
      } else {
          this.view.lblUsersCount.text = "(0)";
          this.view.flxuserList.setVisibility(false);
          this.view.segUserManagement.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
      }
  },
     formatRoleName : function(roleid)
      {
        var rolename = roleid;
        if(!kony.sdk.isNullOrUndefined(roleid)){
          if(roleid.includes("_")){
            var rolenameSplit = roleid.split("_");
            rolename = rolenameSplit[ rolenameSplit.length - 1]
            rolename = rolename.substring(0,1).toUpperCase()+rolename.substring(1).toLowerCase();
          }
        }
        else{
          rolename = "--";
        }
        return rolename;
      },
    
    generateExistingUsersArr: function(existingUsers) {
      let self = this;
      let usernames = {};
      this.existingUsers = [];
      let i = -1;
      existingUsers.companyList.forEach(function(companyList) {
        companyList.companies.forEach(function(company) {
          company.users.forEach(function(user) {
            if (!usernames.hasOwnProperty(user.userName)) {
              usernames[user.userName] = ++i;
              self.existingUsers.push(user);
              self.existingUsers[i].coreCustomerId = [company.coreCustomerId];
              self.existingUsers[i].contractId = [companyList.contractId];
              self.existingUsers[i].contractName = [companyList.contractName];
            } else {
              self.existingUsers[usernames[user.userName]].coreCustomerId.push(company.coreCustomerId);
              if (self.existingUsers[usernames[user.userName]].contractId.indexOf(companyList.contractId) < 0) {
                self.existingUsers[usernames[user.userName]].contractId.push(companyList.contractId);
              }
              if (self.existingUsers[usernames[user.userName]].contractName.indexOf(companyList.contractName) < 0) {
                self.existingUsers[usernames[user.userName]].contractName.push(companyList.contractName);
              }
            }
          });
        });
      });
      this.filterData = JSON.parse(JSON.stringify(this.existingUsers));
    },
    setFilterSegmentData: function() {
      var scopeObj = this;
      var navManager = applicationManager.getNavigationManager();
      var contractUser = navManager.getCustomInfo("frmUserManagementUserList");
      var companyList = contractUser.userExists.companyList;
      this.filterDataCompany = [];
      for (var i = 0; i < companyList.length; i++) {
        var companyObj = [];
        var subCompanyObj = [];
        var companyHeader = {
          "contractId": companyList[i].contractId,
          "contractName": companyList[i].contractName,
          "flxUsrmgmtMain2": {
            "enable": false
          }
        };
        companyObj.push(companyHeader);
        for (var j = 0; j < companyList[i].companies.length; j++) {
          var displayName = companyList[i].companies[j].coreCustomerId;
          if(displayName.length > 4){
            displayName = companyList[i].companies[j].coreCustomerName + " - " + displayName.substring(displayName.length - 4, displayName.length);
          }
          else{
            displayName = companyList[i].companies[j].coreCustomerName + " - " + displayName;
          }
          var subCompanyDetails = {
            "coreCustomerId": companyList[i].companies[j].coreCustomerId,
            "coreCustomerName": companyList[i].companies[j].coreCustomerName,
            "displayName" : displayName,
            "imgConfirmTick": {
              "isVisible": true
            }
          }
          subCompanyObj.push(subCompanyDetails);
        }
        companyObj.push(subCompanyObj);
        this.filterDataCompany.push(companyObj);
      }
      if (this.filterDataCompany.length < 1) {} else {
        this.getWidgetDataMapforFilters();
        this.view.segFilters.setData(this.filterDataCompany);
      }
    },
    onFilterSelect: function() {
      var sectionIndex = this.view.segFilters.selectedIndex[0];
      var rowIndex = this.view.segFilters.selectedIndex[1];
      var rowData = this.view.segFilters.selectedItems[0];
      if (rowData.imgConfirmTick.isVisible === false) {
        rowData.imgConfirmTick.isVisible = true;
      } else {
        rowData.imgConfirmTick.isVisible = false;
      }
      this.view.segFilters.setDataAt(rowData, rowIndex, sectionIndex);
    },
    getWidgetDataMapforFilters: function() {
      var dataMap = {
        "lblCompanyName": "displayName",
        "imgConfirmTick": "imgConfirmTick",
        "lblUserName": "contractName",
        "flxUsrmgmtMain1": "flxUsrmgmtMain1",
        "flxUsrmgmtMain2": "flxUsrmgmtMain2"
      }
      this.view.segFilters.widgetDataMap = dataMap;
    }
  };
});