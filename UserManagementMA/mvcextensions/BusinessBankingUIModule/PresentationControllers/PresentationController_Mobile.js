define(['CommonUtilities'], function(CommonUtilities) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    scopeObj_Businesspresentationcontroller=this;
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  PresentationController.prototype.initializePresentationController = function() {
    this.navManager = applicationManager.getNavigationManager();
    this.authManager = applicationManager.getAuthManager();
    this.formatUtil = applicationManager.getFormatUtilManager();
  };
  PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
	var appName = _kony.mvc.getCurrentAppName();
    if (appName === "UserManagementMA")
		navManager.navigateTo(formName);
	else
		navManager.navigateTo({"appName" : "UserManagementMA", "friendlyName" :"BusinessBankingUIModule/"+formName});
  };
  /**
 * Method to navigate to user management dashboard and fetch list of users
 * @param {JSON}  - consists context and parameters
 */
  PresentationController.prototype.navigatetoallusers = function(sortingInputs) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scopeObj = this;
    var params = {};
    var userManagementDetail= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "BusinessUserManager","appName": "UserManagementMA"}).businessController;
        userManagementDetail.getAssociatedContractUsers(params,scopeObj.onGetAssociatedContractUsersSuccess,
                                                scopeObj.onGetAssociatedContractUsersFailure);
 

//     applicationManager.getPresentationUtility().showLoadingScreen();
//     var navManager = applicationManager.getNavigationManager();
//     var businessBankingMod= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
//     businessBankingMod.clearDataMembers();
//     var searchString = sortingInputs ? sortingInputs.searchString : null;
//     var params = {
//       "offset": "",
//       "limit": "",
//       "sortBy": "createdts",
//       "order": "desc",
//       "paginationRowLimit": 10
//     };
//     // params = applicationManager.getPaginationManager().getValues(this.defaultSortConfig, sortingInputs);
//     if (typeof searchString === "string" && searchString.length > 0) {
//       params.searchString = searchString;
//       navManager.setCustomInfo("frmUserMgmntSearch",searchString);
//     } else if(searchString !== null && searchString !== undefined && searchString !== ""){
//       if(searchString.trim().length === 0){
//         params.sortBy = 'createdts';
//         params.order = 'desc';
//         navManager.setCustomInfo("frmUserMgmntSearch","");
//       }
//     }
//     else
//     {
//       navManager.setCustomInfo("frmUserMgmntSearch","");
//     }

//     businessBankingMod.getAllUsers( params,
//                                    scopeObj_Businesspresentationcontroller.fetchSubUsersSuccess,
//                                    scopeObj_Businesspresentationcontroller.fetchSubUsersFailure);
  };
  PresentationController.prototype.onGetAssociatedContractUsersSuccess = function (response){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmUserManagementUserList",{"userExists": response});
    scopeObj_Businesspresentationcontroller.commonFunctionForNavigation("frmUserMgmtList");
  };

  PresentationController.prototype.onGetAssociatedContractUsersFailure = function (responseError ) {
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmUserManagementUserList",{"userExists": false,
                                                          "error" : responseError});
    scopeObj_Businesspresentationcontroller.commonFunctionForNavigation("frmUserMgmtList");
  };

  /** 
  * Method to handle success response of fetch sub users
  * @param {object} response - which consists of response from backend
  */
  PresentationController.prototype.fetchSubUsersSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    if (response.length !== 0 && response!== undefined) {
      navManager.setCustomInfo("frmUserMgmtListdetails", {"userExists": response});
    } 
    else
    {
      navManager.setCustomInfo("frmUserMgmtListdetails",{"userExists":false}); 
    }
    scopeObj_Businesspresentationcontroller.commonFunctionForNavigation("frmUserMgmtList");
  };

  /** 
  * Method to handle failure response of fetch sub users
  * @param {object} errorRes - which consists of errorResponse from backend
  */
  PresentationController.prototype.fetchSubUsersFailure = function(errorRes) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
    viewController.fetchErrorBack(errorRes);
  };


  /** Method to resend Activation Link
  * @param {String} username - contains username
  */
  PresentationController.prototype.resendActivationLinks = function (username) {
    var scobj=this;

    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.resendActivationLink(username, 
                                                this.resendActivationLinkSuccess, 
                                                this.resendActivationLinkFailure);
  };
  /** Method to handle success response of resendActivationLink
  */
  PresentationController.prototype.resendActivationLinkSuccess = function (response) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
    viewController.fetchresendActivationSuccess(response);  

  };

  /** Method to handle failure response of resendActivationLink
  */
  PresentationController.prototype.resendActivationLinkFailure = function (responserror) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
    viewController.fetchErrorBack(responserror);

  };

  /** Need to add more fields and parameters when the service is called
  * Method to update user status
  */
  PresentationController.prototype.setUserStatus = function (params) {
    var scobj=this;
    kony.print("params"+JSON.stringify(params));
    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.updateUserStatus(params, 
                                            this.setUserStatusSuccess, 
                                            this.setUserStatusFailure);
  };
  PresentationController.prototype.setUserStatusSuccess = function (response) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
    viewController.fetchSetUserStatusSuccess(response);  

  };
  PresentationController.prototype.setUserStatusFailure = function (response) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
    viewController.fetchErrorBack(response);

  };


  /** Method to fetch User details
  * @param {String} username - contains username
  */
  PresentationController.prototype.fetchUser = function (username) {
    var scobj=this;
    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.fetchUserDetails(username, 
                                            this.fetchUserDetailsauccess.bind(this), 
                                            this.onServerError.bind(this));
  };
  /** Method to handle success response of fetchUserDetails
  */
  PresentationController.prototype.fetchUserDetailsauccess = function(userObject) {
    var roleId = userObject.Group_id;
    userObject["defaultLimitsForSelectedRole"] = [];
    var scobj=this;
    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.getUserRoleActions({"groupId": roleId }, 
                                              this.fetchUserRoleActionsDefaultsSuccess.bind(this,userObject),
                                              this.onServerError.bind(this));   

  };	
  PresentationController.prototype.fetchUserRoleActionsDefaultsSuccess = function(userObject, response) {
    var store = segregateFeatureData(response.FeatureActions);
    userObject["defaultLimitsForSelectedRole"] = store;
    var viewController = applicationManager.getPresentationUtility().getController('frmUserPermissions', true);
    viewController.fetchUserRoleActionSuccessCallBack(userObject);
  };

  PresentationController.prototype.onServerError = function (responserror) {
    var viewController = applicationManager.getPresentationUtility().getController('frmUserPermissions', true);
    viewController.fetchErrorBack(responserror);
  };

  /** Method to fetch User details for other feature permissions
  * @param {String} username - contains username
  */
  PresentationController.prototype.fetchUserDetailsPermission= function (username) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scobj=this;
    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.fetchUserDetails(username, 
                                            this.fetchUserDetailsPermissionSuccess.bind(this), 
                                            this.fetchUserDetailsPermissionErrorcallback.bind(this));
  };

  /** Method to handle success response of fetchUserDetailsPermission
  */
  PresentationController.prototype.fetchUserDetailsPermissionSuccess = function(userObject) {
    var roleId = userObject.Group_id;
    userObject["defaultLimitsForSelectedRole"] = [];
    var scobj=this;
    scobj.BussinessBanking= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    scobj.BussinessBanking.getUserRoleActions({"groupId": roleId }, 
                                              this.fetchUserRoleDefaultsSuccess.bind(this,userObject),
                                              this.fetchUserDetailsPermissionErrorcallback.bind(this));   
  };    
  PresentationController.prototype.fetchUserRoleDefaultsSuccess = function(userObject, response) {
    // alert("fetchUserRoleActionsDefaultsSuccess"+JSON.stringify(response));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var store = segregateFeatureData(response.FeatureActions);
    userObject["defaultLimitsForSelectedRole"] = store;
    var navManager = applicationManager.getNavigationManager();
    var navigate=navManager.getCustomInfo("userdetailspermission");
    if(navigate!==undefined)
    {
      if(navigate==="frmUserDetailsPermission")
      {
        navManager.setCustomInfo("frmUserDetailsPermission",userObject);
        navManager.navigateTo("UserDetailsPermission");
      }

      else
      {
        navManager.setCustomInfo("frmOtherFeaturePermissions",userObject);
        navManager.navigateTo("frmOtherFeaturePermissions");
      }
    }
  };

  PresentationController.prototype.fetchUserDetailsPermissionErrorcallback = function (responserror) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var navigate=navManager.getCustomInfo("userdetailspermission");
    if(navigate!==undefined)
    {
      var viewController;
      if(navigate==="frmUserDetailsPermission")
      {
        viewController = applicationManager.getPresentationUtility().getController('frmUserDetails', true);
        viewController.fetchErrorBack(responserror);
      }

      else
      {
        viewController = applicationManager.getPresentationUtility().getController('frmUserDetailsPermission', true);
        viewController.fetchErrorBack(responserror);
      }
    }

  };
  PresentationController.prototype.getInfinityUser = function (userid,successCallBack,errorCallBack) {
    var scopeObj = this;
    var params = {
      "id" : userid
    };
    var userManagementDetail= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    userManagementDetail.getInfinityUser( params,
                                                scopeObj.getInfinityUserSuccess.bind(scopeObj, successCallBack),
                                                scopeObj.getInfinityUserFailure.bind(errorCallBack));

  };

  PresentationController.prototype.getInfinityUserSuccess = function (successCallBack,response){
    successCallBack(response);
  };

  PresentationController.prototype.getInfinityUserFailure = function (errorcallback) {
    //errorCallBack(responseError)
    var viewController = applicationManager.getPresentationUtility().getController('frmUserMgmtList', true);
    viewController.errorCallBack(errorcallback);
  };
  
  PresentationController.prototype.getContractUserDetailsData = function (userid,successCallBack,errorCallBack) {
    var scopeObj = this;
    var params = userid;
    var userManagementDetail= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessUserManager').businessController;
    userManagementDetail.getContractUserDetails( params,
                                                scopeObj.onGetContractUserDetailsDataSuccess.bind(scopeObj, successCallBack),
                                                scopeObj.onGetContractUserDetailsDataFailure.bind(errorCallBack));

  };

  PresentationController.prototype.onGetContractUserDetailsDataSuccess = function (successCallBack,response){
    successCallBack(response);
  };

  PresentationController.prototype.onGetContractUserDetailsDataFailure = function (errorCallBack,responseError ) {
    errorCallBack(responseError)
  }; 

  return PresentationController;
});