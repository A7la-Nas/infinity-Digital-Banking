define({

  selectedUserData: "",
  navManager: "",
  timerCounter: 0,
  userStatus: "",
  userName: "",
  /*This function is first called when a form is ready to use */
  init: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    this.view.preShow = this.preShowFunction;
    this.BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');
  },
  onNavigate: function() {
    try {
      kony.print("try of onNavigate");
    } catch (er) {
      kony.print("catch of onNavigate" + er);
    }
  },
  /*This function is called during the app lifecycle*/
  preShowFunction: function() {
    try {
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("Usermanagement");
      this.userName = data.UserName;
      this.bindEvents();
    } catch (er) {}
  },
  /*This function is called during the app lifecycle*/
  formPostShow: function() {
    this.fetchOrgEmployeeDetailsView();
    try {

    } catch (er) {}
  },

  bindEvents: function() {
    try {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      this.view.flxPopup.setVisibility(false);
      this.view.btnresendActLink.isVisible = false;
      this.view.btnActivate.isVisible = false;
      this.view.btnDeactivate.isVisible = false;
      this.view.btnViewUserDet.isVisible = false;
      this.view.segUserDetails.removeAll();
      this.view.customHeader.flxBack.onClick = this.backNavigation;
      this.view.btnresendActLink.onClick = this.resentActivationLink;
      this.view.btnViewUserDet.onClick = this.btnOnClick;
      this.view.btnDeactivate.onClick = this.btnOnClick;
      this.view.btnActivate.onClick = this.btnOnClick;
      this.view.flxConfirmationPopUp.onClick = this.closePopup;
      this.view.confirmationPopUp.onClickflxNo = this.closePopup;
      this.view.confirmationPopUp.onClickflxYes = this.confirmationYesActions;
      this.view.flxImg.onClick = this.rowClick;
    } catch (er) {}
  },

  resentActivationLink: function() {
    try {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var UserName = this.userName;
      this.BussinessBankingModule.presentationController.resendActivationLinks(UserName);
    } catch (er) {
      kony.print("navigatetoPermission--->error" + er);
    }
  },


  /*This function is used to load data into user details segement */
  fetchOrgEmployeeDetails: function() {
    try {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var getUserdetail = navManager.getCustomInfo("Usermanagement");
      this.btnConfigurationUserdetails(getUserdetail.Status);
      this.userStatus = getUserdetail.Status;
      var status = getUserdetail.Status.toLowerCase();
      status = status.substring(0, 1).toUpperCase() + status.substring(1);
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone" && !kony.sdk.isNullOrUndefined(getUserdetail.Lastlogin)) {
          getUserdetail.Lastlogin = getUserdetail.Lastlogin.slice(0, -3);
          if (getUserdetail.Lastlogin.includes("."))
            getUserdetail.Lastlogin = getUserdetail.Lastlogin.substring(0, s.indexOf('.'));
          if (!getUserdetail.Lastlogin.includes("T"))
            getUserdetail.Lastlogin = getUserdetail.Lastlogin.replace("T", " ");
        }
      } catch (err) {}
      var responseUserdetail=[
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.fullname")+" : ",
          "lblAttributeVal":{text:getUserdetail.FirstName+" "+getUserdetail.LastName,width:"60%"},
          "lblStaus" : {text :status, isVisible : true},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.EmailID")+" : ",
          "lblAttributeVal":{text:getUserdetail.Email,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.dob")+" : ",
          "lblAttributeVal":{text:getUserdetail.DateOfBirth,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.ssn")+" : ",
          "lblAttributeVal":{text:getUserdetail.Ssn,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },

        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.DriverLicense")+" : ",
          "lblAttributeVal":{text:getUserdetail.DrivingLicenseNumber,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber")+" : ",
          "lblAttributeVal":{text:getUserdetail.Phone,width:"90%"},
          "lblStaus" : {text :status, isVisible : false},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.Username")+" : ",
          "lblAttributeVal":{text:getUserdetail.UserName,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.UserRole")+" : ",
          "lblAttributeVal":{text:getUserdetail.Rolename,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : true}
        },  
        {
          "lblAttribute":kony.i18n.getLocalizedString("Kony.mb.userdetail.LastSigned")+" : ",
          "lblAttributeVal":{text:kony.sdk.isNullOrUndefined(getUserdetail.Lastlogin)?"N/A": getUserdetail.Lastlogin,width:"90%"},
          "lblStaus" : {text : status, isVisible : false},
          "flxSep": {isVisible : false}
        },
      ];
      this.view.segUserDetails.setData(responseUserdetail);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    } catch (er) {}
  },
  fetchOrgEmployeeDetailsView: function() {
    try {
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.view.segUserDetails.isVisible = false;
      var navManager = applicationManager.getNavigationManager();
      var getUserdetail = navManager.getCustomInfo("Usermanagement");
      var getUserdetailData = navManager.getCustomInfo("GetContractUserDetails");
      var userInfo = getUserdetailData.userDetails[0];
      this.btnConfigurationUserdetails(getUserdetail.Status);
      this.userStatus = getUserdetail.Status;
      var status = getUserdetail.Status.toLowerCase();
      if(status==="new"||status==="New"){
         status= kony.i18n.getLocalizedString( "i18n.userManagement.new");
      }else if(status==="active"||status==="Active"){
         status= kony.i18n.getLocalizedString("kony.mb.cardManage.Active");
      }
      status = status.substring(0, 1).toUpperCase() + status.substring(1);
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone" && !kony.sdk.isNullOrUndefined(getUserdetail.Lastlogin)) {
          getUserdetail.Lastlogin = getUserdetail.Lastlogin.slice(0, -3);
          if (getUserdetail.Lastlogin.includes("."))
            getUserdetail.Lastlogin = getUserdetail.Lastlogin.substring(0, s.indexOf('.'));
          if (!getUserdetail.Lastlogin.includes("T"))
            getUserdetail.Lastlogin = getUserdetail.Lastlogin.replace("T", " ");
        }
      } catch (err) {}
      this.view.lblAttribute.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.fullname") + " : "
      this.view.lblAttributeVal.text = userInfo.firstName + " " + userInfo.lastName ? userInfo.firstName + " " + userInfo.lastName : "";
      this.view.lblStaus.text = status ? status : "";
      this.view.lblAttributeVal.width = "60%";
      this.view.lblEmailID.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.EmailID") + " : "
      this.view.lblEmailIDVal.text = userInfo.email ? userInfo.email : "-";
      this.view.lblDOB.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.dob") + " : "
      this.view.lblDOBVal.text = userInfo.dob ? userInfo.dob : "-";
      this.view.lblSSN.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.ssn") + " : "
      this.view.lblSSNVal.text = userInfo.ssn ? userInfo.ssn : "-";
      this.view.lblDriversLicense.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.DriverLicense") + " : "
      this.view.lblDriversLicenseVal.text = userInfo.drivingLicenseNumber ? userInfo.drivingLicenseNumber : "-";
      this.view.lblPhonrNo.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber") + " : "
      this.view.lblPhoneNoVal.text = userInfo.phoneNumber ? userInfo.phoneNumber : "-";
      this.view.lblUserID.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.userID") + " : "
      this.view.lblUserIDVal.text = getUserdetail.UserName ? getUserdetail.UserName : "-";
      this.view.lblAccessDetails.text = kony.i18n.getLocalizedString("Kony.mb.userdetail.accessDetails") + " : "
      this.view.lblAccessDetailsVal.text = (getUserdetailData.companyList.length ? getUserdetailData.companyList.length : "0") + " "+ kony.i18n.getLocalizedString("kony.mb.FilterAccounts.OptMultiCustomers");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    } catch (er) {
      kony.print(er);
    }
  },
  rowClick: function() {
    try {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("UserDetailsPermission");
    } catch (er) {
      kont.print(er)
    }
  },

  fetchresendActivationSuccess: function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (!kony.sdk.isNullOrUndefined(response)) {
      var Response = response.success;
      if (Response === "Successful") {
        var formFlow = {
          "FormType": "userDetail",
          "FormData": kony.i18n.getLocalizedString("kony.mb.userdetail.emailmsg"),
          "imgIconKey": "Approval",
        };
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("ACHTransactionDetails", formFlow);
        navManager.navigateTo("StausMessage");
      }
    }
  },

  fetchSetUserStatusSuccess: function(response) {
    this.view.flxConfirmationPopUp.isVisible = false;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var formFlow;
    if (!kony.sdk.isNullOrUndefined(response)) {
      if (response === "ACTIVE" || response === "active") {
        formFlow = {
          "FormType": "userDetail",
          "FormData": kony.i18n.getLocalizedString("kony.mb.userdetail.useractive"),
          "imgIconKey": "Approval",
        };
      } else if (response === "SUSPENDED" || response === "suspended") {
        formFlow = {
          "FormType": "userDetail",
          "FormData": kony.i18n.getLocalizedString("kony.mb.userdetail.usersuspended"),
          "imgIconKey": "Approval",
        };
      }
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("ACHTransactionDetails", formFlow);
      navManager.navigateTo("StausMessage");

    }
  },

  btnConfigurationUserdetails: function(status) {
    try {
      var navManager = applicationManager.getNavigationManager();
      var getLoginUsername = navManager.getCustomInfo("frmLoginusername");
      var getCurrentUsername = this.userName;
      var loginUsername = getLoginUsername.toLowerCase();
      var currentUsername = getCurrentUsername.toLowerCase();
      var userMgmtView = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_VIEW") ? true : false;
      var isPermission = loginUsername !== currentUsername && applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_VIEW") ? true : false;
      var activateOrSuspendPermisison = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT_ACTIVATE_OR_SUSPEND");
      var userMangementPermission = applicationManager.getConfigurationManager().checkUserPermission("USER_MANAGEMENT") ? true : false;
      if (!isPermission) { //condition for login and current user not same
        this.view.btnresendActLink.isVisible = false;
        this.view.btnActivate.isVisible = false;
        this.view.btnDeactivate.isVisible = false;
        this.view.btnViewUserDet.isVisible = false;
        if ((status === "new" || status === "NEW") && (userMgmtView)) {
          //this.view.btnresendActLink.isVisible = true;
          this.view.btnActivate.isVisible = false;
          this.view.btnDeactivate.isVisible = false;
        } else if ((status === "active" || status === "ACTIVE") && (activateOrSuspendPermisison)) {
          this.view.btnresendActLink.isVisible = false;
          this.view.btnActivate.isVisible = false;
          //this.view.btnDeactivate.isVisible = true;
        } else if ((status === "suspended" || status === "SUSPENDED") && (activateOrSuspendPermisison)) {
          this.view.btnresendActLink.isVisible = false;
          // this.view.btnActivate.isVisible = true;
          this.view.btnDeactivate.isVisible = false;
        }
      } else {
        //*check condition for userview permission and usermangement permission**//
        if (userMgmtView && userMangementPermission) {
          this.view.btnViewUserDet.isVisible = false;
        } else {
          this.view.btnViewUserDet.isVisible = false;
        }
        //*check condition for user active,deactive,resentlink permission **//
        if ((status === "new" || status === "NEW") && (userMgmtView)) {
        //  this.view.btnresendActLink.isVisible = true;
          this.view.btnActivate.isVisible = false;
          this.view.btnDeactivate.isVisible = false;
        } else if ((status === "active" || status === "ACTIVE") && (activateOrSuspendPermisison)) {
          this.view.btnresendActLink.isVisible = false;
          this.view.btnActivate.isVisible = false;
        //  this.view.btnDeactivate.isVisible = true;
        } else if ((status === "suspended" || status === "SUSPENDED") && (activateOrSuspendPermisison)) {
          this.view.btnresendActLink.isVisible = false;
          //this.view.btnActivate.isVisible = true;
          this.view.btnDeactivate.isVisible = false;
        }
      }

    } catch (er) {}
  },

  deactivateAlertOnClick: function(response) {
    if (response === true) {
      this.confirmationYesActions();
    } else {
      this.closePopup();
    }
  },

  /*This function is used to perform activation,deactivation,viewing of user details and resending of activation link */
  btnOnClick: function(obj) {
    try {
      kony.print("try of btnOnClick");
      var id = obj.id;
      switch (id) {
        case "btnViewUserDet":
          var navManager = applicationManager.getNavigationManager();
          var data = navManager.getCustomInfo("Usermanagement");
          var userObj = {
            "userName": data.UserName,
            "userRole": data.Rolename
          };
          navManager.setCustomInfo("UsermangementUsername", userObj);
          navManager.setCustomInfo("userdetailspermission", "frmUserDetailsPermission"); //have to replace 
          var BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');
          BussinessBankingModule.presentationController.fetchUserDetailsPermission(data.UserName);
          break;
        case "btnDeactivate":
          try {
            if (applicationManager.getDeviceUtilManager().isIPhone() || applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
              var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.userdetail.deactivateuser"),
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                "alertHandler": this.deactivateAlertOnClick
              };
              applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
            } else {
              this.view.flxConfirmationPopUp.isVisible = true;
              this.view.confirmationPopUp.lblMessage = kony.i18n.getLocalizedString("kony.mb.userdetail.deactivateuser");
            }
          } catch (e) {
            this.view.flxConfirmationPopUp.isVisible = true;
            this.view.confirmationPopUp.lblMessage = kony.i18n.getLocalizedString("kony.mb.userdetail.deactivateuser");
          }
          break;
        case "btnActivate":
          this.view.flxConfirmationPopUp.isVisible = true;
          this.view.confirmationPopUp.lblMessage = kony.i18n.getLocalizedString("kony.mb.userdetail.activateuser");
          break;
        default:
          break;
      }
    } catch (er) {
      kony.print("catch of btnOnclcik" + er);
    }
  },

  /*This function is used to navigate back*/
  backNavigation: function() {
    try {
      var userManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingUIModule");
      userManagementModule.presentationController.navigatetoallusers();

    } catch (er) {}
  },
  /*This function is used to perform action over the confirmation popup buttons */
  confirmationYesActions: function() {
    try {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var status = this.userStatus;
      var configStatus;
      switch (status.toLowerCase().trim()) {
        case "Active".toLowerCase().trim():
          configStatus = "SUSPENDED";
          break;
        case "Suspend".toLowerCase().trim():
          configStatus = "ACTIVE";
          break;
        case "Suspended".toLowerCase().trim():
          configStatus = "ACTIVE";
          break;
        case "New".toLowerCase().trim():
          configStatus = "New";
          break;
        default:
      }
      var navigationObj = {
        "UserName": this.userName,
        "Status": configStatus.toUpperCase().trim()
      };
      this.BussinessBankingModule.presentationController.setUserStatus(navigationObj);
    } catch (er) {
      kony.print("catch of confirmationYesActions" + er);
    }
  },
  /*This function is used to close the popup */
  closePopup: function(obj) {
    try {
      kony.print("try of closePopup");
      var id = obj.id;
      switch (id) {
        case "flxConfirmationPopUp":
        case "flxNo":
          this.view.flxConfirmationPopUp.isVisible = false;
          break;
        default:
          break;
      }
    } catch (er) {
      kony.print("catch of closePopup" + er);
    }
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
  }
});