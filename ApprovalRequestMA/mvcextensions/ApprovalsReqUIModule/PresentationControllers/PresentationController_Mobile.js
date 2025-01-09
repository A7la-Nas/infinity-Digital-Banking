define(["CommonUtilities"], function(CommonUtilities) {
  /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */





  function ApprovalsReqUIModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.initializePresentationController();
    this.MultiApprovalAckData=[];
    this.count=0;
    this.selectedData=[];
  }
  

  inheritsFrom(ApprovalsReqUIModule_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
   ApprovalsReqUIModule_PresentationController.prototype.initializePresentationController = function() {
    this.approvalsReqManager = applicationManager.getApprovalsReqManager();
  };
  ApprovalsReqUIModule_PresentationController.prototype.getMultiApprovalAckData = function() {
    return this.MultiApprovalAckData;
  };
  ApprovalsReqUIModule_PresentationController.prototype.setMultiApprovalAckData = function(AckData) {
    this.MultiApprovalAckData.push(AckData);
  };

  ApprovalsReqUIModule_PresentationController.prototype.clearMultiApprovalData = function() {
    this.MultiApprovalAckData = [];
    this.count = 0;
    this.selectedData = [];
  };

  ApprovalsReqUIModule_PresentationController.prototype.setCount = function(count) {
    this.count=count;
  };
  ApprovalsReqUIModule_PresentationController.prototype.getCount = function() {
    return this.count;
  };
  ApprovalsReqUIModule_PresentationController.prototype.setSelectedData = function(selectedData) {
    this.selectedData=selectedData;
  };
  ApprovalsReqUIModule_PresentationController.prototype.getSelectedData = function() {
    return this.selectedData;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getApprovalsData = function() {
    return JSON.parse(JSON.stringify(this.ApprovalsData));
  };


  ApprovalsReqUIModule_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    var appName = _kony.mvc.getCurrentAppName();
    if (appName === "ApprovalRequestMA")
      navManager.navigateTo(formName);
    else
      navManager.navigateTo({"appName" : "ApprovalRequestMA", "friendlyName" :formName});
  };

  ApprovalsReqUIModule_PresentationController.prototype.commonNavigationFunction = function(formname) {   
    var navigateToForm = new kony.mvc.Navigation(formname);   
    navigateToForm.navigate();
  };

  /**
  * getGeneralTransactionsPendingForMyApprovals :  This is the function which is used to fetch Transactions Pending for Approvals 
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - navigation object with success and failure flows
  * @return {}
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getGeneralTransactionsPendingForMyApprovals = function (navObj){ 

    kony.print("Presentation controller");
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.fetchGeneralTransactionsPendingForMyApprovals(
      navObj.requestData,
      scopeObj.onFetchGeneralTransactionsPendingForMyApprovalsSuccess.bind(scopeObj,navObj),
      scopeObj.onFetchGeneralTransactionsPendingForMyApprovalsFailure,
    );
  };
  /**
 * onFetchGeneralTransactionsPendingForMyApprovalsSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
 * @member of {PresentationController}
 * @param {JSON Object} response - response object from the service call 
 * @return {}  
 * @throws {}
 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchGeneralTransactionsPendingForMyApprovalsSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchGeneralTransactionsPendingForMyApprovalsSuccess"+JSON.stringify(response));
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);

      var processedDataGenTransaction =  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForGenTransaction(navObj,response);
      viewController.fetchGenTransactionMyApprovalSuccessCallBack(processedDataGenTransaction);
    }catch(e){
      kony.print("Exception in onFetchGeneralTransactionsPendingForMyApprovalsSuccess"+e);
    }
  };


  /**
  * onFetchGeneralTransactionsPendingForMyApprovalsFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
  * @member of {PresentationController}
  * @param {JSON Object} responseError - error object form failure callback of service
  * @return {}  
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchGeneralTransactionsPendingForMyApprovalsFailure = function (responseError) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("Presentation controller onFetchGeneralTransactionsPendingForMyApprovalsFailure"+JSON.stringify(responseError));
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getGeneralTransactionsPullDownDashboard = function (navObj){ 

    kony.print("Presentation controller");
    applicationManager.getPresentationUtility().showLoadingScreen();
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.fetchGeneralTransactionsPendingForMyApprovals(
      navObj.requestData,
      scopeObj.onFetchGetGeneralTransactionsPullDownDashboardSuccess.bind(scopeObj,navObj),
      scopeObj.onFetchGetGeneralTransactionsPullDownDashboardFailure,
    );
  };
  ApprovalsReqUIModule_PresentationController.prototype.onFetchGetGeneralTransactionsPullDownDashboardSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchGeneralTransactionsPendingForMyApprovalsSuccess"+JSON.stringify(response));
      var dataProcessor =  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForPullDownGenTransaction(response);
      var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
      viewController.fetchGenTransactionMyApprovalSuccessCallBack(dataProcessor);
    }catch(e){
      kony.print("Exception in onFetchGeneralTransactionsPendingForMyApprovalsSuccess"+e);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForPullDownGenTransaction= function (response) {
    response = response.BBGeneralTransaction;
    var recentTranactionsArr = [];
    var configManager = applicationManager.getConfigurationManager();
    for (var i =0 ;i<response.length;i++){
      var recentItem = {
        "lblSpendingCategory":response[i].Payee,
        "lblTotalAmount":configManager.getCurrencyCode()+""+response[i].Amount,
        "lblAmountSpent":CommonUtilities.getFrontendDateString(response[i].CreatedOn,"mm/dd/yyyy"),
        "lblPaymentMode":CommonUtilities.truncateStringWithGivenLength(response[i].TransactionType+"....",16)+CommonUtilities.getLastSixDigit(response[i].TransactionType),
      }; 
      recentTranactionsArr.push(recentItem);
    }
    return recentTranactionsArr;
  };
  ApprovalsReqUIModule_PresentationController.prototype.onFetchGetGeneralTransactionsPullDownDashboardFailure = function (responseError) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("Presentation controller onFetchGeneralTransactionsPendingForMyApprovalsFailure"+JSON.stringify(responseError));
    // return responseError;
  };

  /**
	  * getPendingApprovals :  This is the function which is used to fetch  Transactions Pending for Approvals 
	  * @member of {ApprovalsReqUIModule_PresentationController}
	  * @param {JSON Object} navObj - navigation object with success and failure flows
	  * @return {}
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getPendingApprovals = function (navObj) {
    try{
      var scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllMyPendingApprovals(
        navObj,
        scopeObj.onFetchPendingApprovalsTransSuccess.bind(scopeObj,navObj),
        scopeObj.onFetchPendingApprovalsFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getPendingApprovals"+e);}
  };
  /**
	 * onFetchPendingApprovalsTransSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
	 * @member of {PresentationController}
	 * @param {JSON Object} response - response object from the service call 
	 * @return {}  
	 * @throws {}
	 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchPendingApprovalsTransSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchPendingApprovalsTransSuccess"+JSON.stringify(response));

      var viewController = "";
      var navigationManager = applicationManager.getNavigationManager();
      var originFormName = navigationManager.getCustomInfo("formFlow");
      if(originFormName === "frmUnifiedDashboard"){
        viewController  = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
      }else if(originFormName== "frmApprovalsList"){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      }else if(originFormName== "frmApprovalsAndRequestsTitle"){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAndRequestsTitle', true);
      }

      var resGenTrans     = response.records;
      var approvalPendingCount = navigationManager.setCustomInfo("approvalPendingCount",resGenTrans);
      this.transactionArr = [];
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png", 
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};
      var textAndSkinObj = {};    
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approve"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveFlxVisiblity":true,
        "rejectLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject"),
        "rejectLblSkin":"sknLbl104B80SPReg20px",
        "rejectFlxVisiblity":true,
      };
      var scopeObj = this;
      var transactionsArr = [];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";



      // if(resGenTrans.length > 0){
      //   resGenTrans.forEach(function (responseObj) {
      //     var statusCheck = responseObj.status;
      //     var sentDate = responseObj.sentDate;
      //     sentDate = sentDate.split('T')[0];
      //     var processingDate = responseObj.processingDate;
      //     processingDate = processingDate === undefined ? "" : processingDate.split('T')[0];


      //     if(statusCheck==="Pending"){// this condtion used for fliter only pending status for approvals 
      //       var rowObj= {
      //         "template": "flxApprovalListView",
      //         "data" : responseObj,
      //         "requiredApprovals" : {"text":kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)?"0":responseObj.requiredApprovals},
      //         "featureActionName" : {"text":kony.sdk.isNullOrUndefined(responseObj.featureActionName)?"0":responseObj.featureActionName},
      //         "lblTransactionAP": {"text": kony.sdk.isNullOrUndefined(responseObj.featureName) ? "N/A" : responseObj.featureName},
      //         "lblTransactionAmountAP": {"text": kony.sdk.isNullOrUndefined(responseObj.sentBy) ? "N/A" : responseObj.sentBy},
      //         "lblDateAP": {"text": kony.sdk.isNullOrUndefined(responseObj.featureActionName) ? "N/A" : responseObj.featureActionName}, 
      //         "flxApprovalsList": {"isVisible": true,"height": "70dp"},
      //         "lblPayment" : {"text" : CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy")},
      //         "sentDate" : {"text" : CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy")},
      //         "processingDate" : {"text" : CommonUtilities.getFrontendDateString(processingDate,"mm/dd/yyyy")},
      //         "flxRejectAP": {
      //           "skin" : constantsSkin.flxRejectSkin, 
      //           onClick : viewController.rejectBtnOnClick,
      //           "isVisible" : configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
      //         },
      //         "flxApproveAP": {
      //           "skin" : constantsSkin.flxApproveSkin,
      //           onClick : viewController.approveBtnOnClick,
      //           "isVisible" : configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
      //         },
      //         "flxSelect" : {
      //           "isVisible":this.isPermissionEnabled()?true:false
      //        },
      //         "flxContentsAP" : { "width" : this.isPermissionEnabled()?"87%":"100%"},
      //         "imgCheckBox" : {"src" : inactivecheckbox.png},
      //         "lblRejectAP": {"text" : textAndSkinObj.rejectLblName, "skin" : textAndSkinObj.rejectLblSkin},
      //         "lblApproveAP": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
      //         "imgRejectAP": {"src": constantsSkin.imgReject},
      //         "imgApproveAP": {"src": constantsSkin.imgApprove},
      //       };
      //       transactionsArr.push(rowObj);
      //     }
      //   });
      // }else{
      //   var rowObj2 = {
      //     "template": "flxNoPending",
      //     "lblTransactionPending": {"text": kony.i18n.getLocalizedString("i18n.maps.NoResultsFound")},
      //     "flxNoPending": {"isVisible": true,"height": "80dp"}
      //   };
      //   transactionsArr.push(rowObj2);
      // }
      viewController.fetchMyPendingApprovalSuccessCallBack(resGenTrans);

      applicationManager.getPresentationUtility().dismissLoadingScreen();

    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in onFetchPendingApprovalsTransSuccess"+e);}
  };

  /**
	  * onFetchPendingApprovalsFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
	  * @member of {PresentationController}
	  * @param {JSON Object} responseError - error object form failure callback of service
	  * @return {}  
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchPendingApprovalsFailure = function (responseError) {
    kony.print("Presentation controller onFetchPendingApprovalsFailure"+JSON.stringify(responseError));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };


  /**
	  * getPendingRequest :  This is the function which is used to fetch  Transactions Pending for Request 
	  * @member of {RequestReqModule_PresentationController}
	  * @param {JSON Object} navObj - navigation object with success and failure flows
	  * @return {}
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getPendingRequests = function (navObj) {
    try{
      var scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllMyPendingRequests(
        navObj,
        scopeObj.onFetchPendingRequestsTransSuccess.bind(scopeObj,navObj),
        scopeObj.onFetchPendingRequestsFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getPendingRequests"+e);}
  };

  /**
	 * onFetchPendingRequestsTransSuccess :  Method to handle success response of fetching Transactions Pending for My Requests
	 * @member of {PresentationController}
	 * @param {JSON Object} response - response object from the service call 
	 * @return {}  
	 * @throws {}
	 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchPendingRequestsTransSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchPendingApprovalsTransSuccess"+JSON.stringify(response));
      var viewController = "";
      var navigationManager = applicationManager.getNavigationManager();
      var originFormName = navigationManager.getCustomInfo("formFlow");
      if(originFormName === "frmUnifiedDashboard"){
        viewController  = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
      }else if(originFormName== "frmRequestList"){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      }else if(originFormName == "frmApprovalsAndRequestsTitle"){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAndRequestsTitle', true);
      }
      var resGenTrans     = response.records;
      var requestPendingCount = navigationManager.setCustomInfo("requestPendingCount",resGenTrans);
      var constantsSkin = {
        "headerImgUp": "arrowupblue.png",
        "imgReject" : "cancelreject.png",
        "imgApprove" : "withdrawreq.png",
        "flxApproveSkin": "sknUnderlinef639afTab",
        "flxRejectSkin" : "sknflxf6f6f6Bcg"};



      var textAndSkinObj = {};
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveImgSrc": constantsSkin.imgApprove,
        "approveFlxSkin": constantsSkin.flxApproveSkin,
        "approveFlxVisiblity":true,
      };
      var scopeObj = this;
      var transactionsArr = [];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";



      if(resGenTrans.length > 0){
        resGenTrans.forEach(function (responseObj) {
          var statusCheck = responseObj.status;
          var withdrawVisiblity = (responseObj.status === "Pending") ? true : false;
          var sentDate = responseObj.sentDate;
          sentDate = !kony.sdk.isNullOrUndefined(sentDate)?sentDate.split('T')[0]:"";
          var processingDate = responseObj.processingDate;
          processingDate =  !kony.sdk.isNullOrUndefined(sentDate)?sentDate.split('T')[0] : "";
          //                       var time=response[i].Actionts;
          //                       time = time.split('T')[1];
          //                       var time1=time.substring(0, time.length - 1);

          if(statusCheck==="Pending"){// this condtion used for fliter only pending status for approvals 
            var statusApprovals = (kony.sdk.isNullOrUndefined(responseObj.receivedApprovals) ? "0" : responseObj.receivedApprovals) +" " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + (kony.sdk.isNullOrUndefined(responseObj.requiredApprovals) ? "0" : responseObj.requiredApprovals) + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
            var rowObj= {
              "template": "flxRequestList",
              "data" : responseObj,
              "requiredApprovals" : {"text":kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)?"0":responseObj.requiredApprovals},
              "featureActionName" : {"text":kony.sdk.isNullOrUndefined(responseObj.featureActionName)?"0":responseObj.featureActionName},
              "lblTransaction": {"text": kony.sdk.isNullOrUndefined(responseObj.featureName) ? "N/A" : responseObj.featureName},
              "lblStatus": {"text":statusApprovals},
              "lblDate": {"text": kony.sdk.isNullOrUndefined(responseObj.featureActionName) ? "N/A" : responseObj.featureActionName}, 
              "lblTransactionAmount" : {"text" : CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy")},
              //"flxRequestList": {"isVisible": true,"height": "70dp"},
              "sentDate" : {"text" : CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy")},
              "processingDate": {"text" : CommonUtilities.getFrontendDateString(processingDate,"mm/dd/yyyy")},
              "flxApprove": {
                "skin" : constantsSkin.flxApproveSkin,
                onClick : viewController.showWithdrawpopup,
                "isVisible" : withdrawVisiblity && configManager.getCreateACHTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager))
              },
              "lblApprove": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
              "imgApprove": {"src": constantsSkin.imgApprove},
            };
            transactionsArr.push(rowObj);
          }
        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text": kony.i18n.getLocalizedString("i18n.maps.NoResultsFound")},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        transactionsArr.push(rowObj2);
      }



      viewController.fetchMyPendingRequestSuccessCallBack(transactionsArr);
      applicationManager.getPresentationUtility().dismissLoadingScreen();


    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in onFetchPendingRequestsTransSuccess"+e);}
  };

  /**
	  * onFetchPendingRequestsFailure :  Method to handle failure response of fetching General Transactions Pending for My Requests
	  * @member of {PresentationController}
	  * @param {JSON Object} responseError - error object form failure callback of service
	  * @return {}  
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchPendingRequestsFailure = function (responseError) {
    kony.print("Presentation controller onFetchPendingRequestsFailure"+JSON.stringify(responseError));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };



  /**
  * getACHTransactionsPendingForMyApprovals :  This is the function which is used to fetch ACH Transactions Pending for Approvals 
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - navigation object with success and failure flows
  * @return {}
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getACHTransactionsPendingForMyApprovals = function (navObj) {
    try{
      var scopeObj = this;

      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchACHTransactionsPendingForMyApprovals(
        navObj.requestData,
        scopeObj.onFetchACHTransactionsSuccess.bind(scopeObj,navObj),
        scopeObj.onFetchACHTransactionsFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getACHTransactionsPendingForMyApprovals"+e);}
  };

  /**
 * onFetchACHTransactionsSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
 * @member of {PresentationController}
 * @param {JSON Object} response - response object from the service call 
 * @return {}  
 * @throws {}
 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchACHTransactionsSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchACHTransactionsSuccess"+JSON.stringify(response));
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      resOfACHTrans = response.ACHTransactions;
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png", 
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};
      var textAndSkinObj = {};
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approve"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveFlxVisiblity":true,
        "rejectLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject"),
        "rejectLblSkin":"sknLbl104B80SPReg20px",
        "rejectFlxVisiblity":true,
      };
      var scopeObj = this;
      var achTransactionsArr = [];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";

      if(resOfACHTrans.length > 0){
        resOfACHTrans.forEach(function (responseObj) {
          var statusCheck = responseObj.Status.toLowerCase();

          if(isiPhone && responseObj.EffectiveDate.includes(" ")) {
            responseObj.EffectiveDate = responseObj.EffectiveDate.replace(" ", "T") + "Z";
          }

          if(statusCheck==="pending"){// this condtion used for fliter only pending status for approvals 
            var rowObj= {
              "template": "flxApprovalsList",
              "data" : responseObj,
              "lblTransactionAP": {"text": CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName+"....",16)+CommonUtilities.getLastFourDigit(responseObj.DebitAccount)},
              "lblTransactionAmountAP": {"text": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(responseObj.TotalAmount, true)},
              "lblDateAP": {"text": CommonUtilities.getFrontendDateString(responseObj.CreatedOn,"mm/dd/yyyy")},
              "flxApprovalsList": {"isVisible": true,"height": "70dp"},
              "flxRejectAP": {
                "skin" : constantsSkin.flxRejectSkin, 
                onClick : viewController.rejectBtnOnClick,
                "isVisible" : configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
              },
              "flxApproveAP": {
                "skin" : constantsSkin.flxApproveSkin,
                onClick : viewController.approveACHTransaction,
                "isVisible" : configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
              },
              "lblRejectAP": {"text" : textAndSkinObj.rejectLblName, "skin" : textAndSkinObj.rejectLblSkin},
              "lblApproveAP": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
              "imgRejectAP": {"src": constantsSkin.imgReject},
              "imgApproveAP": {"src": constantsSkin.imgApprove},
              "userName" : 
              {"text" : CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
              },
              "createdBy" : 
              {
                "text" : CommonUtilities.truncateStringWithGivenLength(responseObj.createdby, 15),
              },
              "templateName" : 
              {
                "text" : kony.sdk.isNullOrUndefined(responseObj.TemplateName) ? "N/A":responseObj.TemplateName,
              },
              "lblEffectiveDate" : CommonUtilities.getFrontendDateString(responseObj.EffectiveDate,"mm/dd/yyyy"),
              "lblTemplateDescription" : kony.sdk.isNullOrUndefined(responseObj.TemplateDescription) ? "N/A" : responseObj.TemplateDescription,
              "lblConfirmationNumber" : kony.sdk.isNullOrUndefined(responseObj.ConfirmationNumber) ? "N/A" : responseObj.ConfirmationNumber,
              "amount" : CommonUtilities.formatCurrencyWithCommas(responseObj.TotalAmount, true),
              "createdOn" : CommonUtilities.getFrontendDateString(responseObj.CreatedOn,"mm/dd/yyyy"),
              "transmittedDate" : responseObj.CreatedOn,
              "approval" : responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of")+ " " + responseObj.requiredApprovals + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved"),
              "debitOrCreditAccount" : {
                "text" : CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName+"....",16)+CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
              },
              "accountName" : {
                "text" : responseObj.AccountName+"...."+CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
              },
              "request_id" : responseObj.Request_id
            };
            if(responseObj.RequestType.includes("PPD") || responseObj.RequestType.includes("CCD") || responseObj.RequestType.includes("CTX")){
              rowObj.RequestType = (responseObj.RequestType).substring(0, 3) + " " + responseObj.TransactionTypeValue;
            }
            achTransactionsArr.push(rowObj);
          }
        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoPendingACHTransApprovals")},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        achTransactionsArr.push(rowObj2);
      }
      viewController.fetchACHTransactionMyApprovalSuccessCallBack(achTransactionsArr);
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in onFetchACHTransactionsSuccess"+e);}

  };


  /**
  * onFetchACHTransactionsFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
  * @member of {PresentationController}
  * @param {JSON Object} responseError - error object form failure callback of service
  * @return {}  
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchACHTransactionsFailure = function (responseError) {
    kony.print("Presentation controller onFetchACHTransactionsFailure"+JSON.stringify(responseError));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };

  /**
  * getACHFilesPendingForMyApprovals :  This is the function which is used to fetch ACH Files Pending for Approvals 
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - navigation object with success and failure flows
  * @return {}
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getACHFilesPendingForMyApprovals = function (navObj) {
    try{
      var scopeObj = this;
      var approvalsReqManager = applicationManager.getApprovalsReqManager();

      approvalsReqManager.fetchACHFilesPendingForMyApprovals(
        navObj.requestData,
        scopeObj.onFetchACHFilesSuccess.bind(scopeObj,navObj),
        scopeObj.onFetchACHFilesFailure
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getACHFilesPendingForMyApprovals"+e);
    }
  };

  /**
 * onFetchACHFilesSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
 * @member of {PresentationController}
 * @param {JSON Object} response - response object from the service call 
 * @return {}  
 * @throws {}
 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchACHFilesSuccess = function (navObj, response) {
    try{
      kony.print("Presentation controller onFetchACHFilesSuccess response:"+JSON.stringify(response));
      response = response.ACHFile;
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      var achFilesResponseArr = [];
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png", 
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};
      var textAndSkinObj = {};
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approve"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveFlxVisiblity":true,
        "rejectLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject"),
        "rejectLblSkin":"sknLbl104B80SPReg20px",
        "rejectFlxVisiblity":true,
      };
      var configManager = applicationManager.getConfigurationManager();

      if(Array.isArray(response))
        if(response.length > 0){
          response.forEach(function (responseObj) {
            var statusCheck = responseObj.FileStatus.toLowerCase();
            if(isiPhone && responseObj.UpdatedDateAndTime.includes(" ")) {
              responseObj.UpdatedDateAndTime = responseObj.UpdatedDateAndTime.replace(" ", "T") + "Z";
            }
            if(!isiPhone) {
              responseObj.UpdatedDateAndTime  = responseObj.UpdatedDateAndTime.slice(0, 10) + "T12:00:00.001Z";
            }
            if(statusCheck==="pending"){// this condtion used for fliter only pending status for approvals  
              var rowObj = {
                "template": "flxApprovalsList",
                "data" : responseObj,
                "request_id" : responseObj.Request_id,
                "lblTransactionAP": {"text": "" + CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 30)},
                "lblTransactionAmountAP": {"text": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(responseObj.TotalDebitAmount, true)},
                "lblDateAP": {"text": CommonUtilities.getFrontendDateString(responseObj.UpdatedDateAndTime,"mm/dd/yyyy")},
                "flxApprovalsList": {"isVisible": true,"height": "70dp"},
                "ACHFileID":responseObj.ACHFileID,
                "flxRejectAP": {
                  "skin" : constantsSkin.flxRejectSkin, 
                  onClick : viewController.rejectBtnOnClick,
                  "isVisible" : configManager.getACHFileApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager))
                },
                "flxApproveAP": {
                  "skin" : constantsSkin.flxApproveSkin,
                  onClick : viewController.approveACHFile,
                  "isVisible" : configManager.getACHFileApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager))
                },
                "lblRejectAP": {"text" : textAndSkinObj.rejectLblName, "skin" : textAndSkinObj.rejectLblSkin},
                "lblApproveAP": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
                "imgRejectAP": {"src": constantsSkin.imgReject},
                "imgApproveAP": {"src": constantsSkin.imgApprove},
                "fileName" : 
                {
                  "text" : CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 30),
                },
                "userName" : 
                {
                  "text" : CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
                },
                "totalCreditAmount" : configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, true),
                "totalDebitAmount" : configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(responseObj.TotalDebitAmount, true),
                "tpdatedDateAndTime" : CommonUtilities.getDateAndTime(responseObj.UpdatedDateAndTime,"mm/dd/yyyy"),
              };

              achFilesResponseArr.push(rowObj);
            }
          });
        }else{
          var rowObj2 = {
            "template": "flxNoPending",
            "lblTransactionPending": {"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoPendingACHFileApprovals")},
            "flxNoPending": {"isVisible": true,"height": "80dp"}
          };
          achFilesResponseArr.push(rowObj2);
        }
      viewController.fetchACHFilesMyApprovalSuccessCallBack(achFilesResponseArr);
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in onFetchACHFilesSuccess"+e);
    }
  };


  /**
  * onFetchACHFilesFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
  * @member of {PresentationController}
  * @param {JSON Object} responseError - error object form failure callback of service
  * @return {}  
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchACHFilesFailure = function (responseError) {
    kony.print("Presentation controller onFetchACHFilesFailure"+JSON.stringify(responseError));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };

  /**
  	* fetchTransactionRequests :  This method fetches the requests made by the user that are related to transactions
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  	* @return {} 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.fetchTransactionRequests = function( navObj ) {  
    try{
      kony.print("Presentation controller fetchTransactionRequests");
      applicationManager.getPresentationUtility().showLoadingScreen();
      var scopeObj = this;
      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllTransactionRequests(
        navObj.requestData,
        scopeObj.transactionRequestsSuccess.bind(scopeObj,navObj),
        scopeObj.showTransactionRequestsFailure
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in fetchTransactionRequests"+e);
    }
  };


  /**
  	* transactionRequestsSuccess :  Success callback - which is invoked after fetching transaction requests successfully
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} response - Raw response form the Service call
  	* @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.transactionRequestsSuccess = function(navObj, response ) { 
    kony.print("Presentation controller transactionRequestsSuccess"+JSON.stringify(response));
    var processedDataGenTransaction =  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForGenTransactionRequests(navObj,response);
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
    viewController.transactionRequestSuccessCallback(processedDataGenTransaction);
  };


  /**
  	* showTransactionRequestsFailure :  Failure callback - which is invoked when fetching of transaction requests is failed
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} responseError - Respose Error from the Service call 
  	* @return {JSON Object} responseError - Respose Error from the Service call  
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.showTransactionRequestsFailure = function(responseError) { 
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    kony.print("Presentation controller showTransactionRequestsFailure"+JSON.stringify(responseError));
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true); //frmApprovalsList
    viewController.showToastPopup(responseError,"failure","");
    return(responseError);
  };


  /**
  	* fetchACHTransactionRequests :  This method fetches the requests made by the user that are related to ACH transactions
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  	* @return {} 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.fetchACHTransactionRequests = function( navObj ) { 

    try{
      var scopeObj = this;

      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllACHTransactionRequests(
        navObj.requestData,
        scopeObj.ACHTransactionRequestsSuccess.bind(scopeObj,navObj),
        scopeObj.ACHTransactionRequestsFailure
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in fetchACHTransactionRequests ::"+e);
    }
  };


  /**
  	* transactionRequestsSuccess :  Success callback - which is invoked after fetching ACH transaction requests successfully
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} response - Raw response form the Service call
  	* @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.ACHTransactionRequestsSuccess = function( navObj, response ) { 
    try{
      kony.print("Presentation controller ACHTransactionRequestsSuccess"+JSON.stringify(response));
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      resOfACHTrans = response.ACHTransactions;
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png",
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};

      var textAndSkinObj = {};
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveImgSrc": constantsSkin.imgApprove,
        "approveFlxSkin": constantsSkin.flxApproveSkin,
        "approveFlxVisiblity":true,
      };
      var scopeObj = this;
      var achTransactionsArr = [];
      resOfACHTrans = response.ACHTransactions;
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";

      if(resOfACHTrans.length > 0){
        resOfACHTrans.forEach(function(achTransactionObj){
          if(isiPhone && achTransactionObj.EffectiveDate.includes(" ")) {
            achTransactionObj.EffectiveDate = achTransactionObj.EffectiveDate.replace(" ", "T") + "Z";
          }
          var withdrawVisiblity = (achTransactionObj.Status === "Pending") ? true : false;
          var rowObj= {
            "template": "flxRequestList",
            "data" : achTransactionObj,
            "flxApprove": {
              "skin" : constantsSkin.flxApproveSkin,
              onClick : viewController.showWithdrawpopup,
              "isVisible" : withdrawVisiblity && configManager.getCreateACHTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager))
            },
            "lblApprove": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
            "imgApprove": {"src": constantsSkin.imgApprove},
            "lblTransaction": {"text": "" + CommonUtilities.truncateStringWithGivenLength(achTransactionObj.AccountName+"....",16)+CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount)},
            "lblTransactionAmount": {"text": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(achTransactionObj.TotalAmount, true)},
            "lblDate": {"text": CommonUtilities.getFrontendDateString(achTransactionObj.CreatedOn,"mm/dd/yyyy")},
            "flxRequestList": {"isVisible": true,"height": "70dp"},
            "lblStatus" : {"text" : achTransactionObj.Status},
            "templateName" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(achTransactionObj.TemplateName, 15),
            },
            "debitOrCreditAccount" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(achTransactionObj.AccountName+"....",16)+CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount),
            },
            "userName" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(achTransactionObj.userName, 15),
            },
            "amount" : CommonUtilities.formatCurrencyWithCommas(achTransactionObj.TotalAmount, true),
            "action" : "Withdraw",
            "createdOn" : CommonUtilities.getFrontendDateString(achTransactionObj.CreatedOn,"mm/dd/yyyy"),
            "transmittedDate" : achTransactionObj.CreatedOn,
            "accountName" : {
              "text" : achTransactionObj.AccountName+"...."+CommonUtilities.getLastFourDigit(achTransactionObj.DebitAccount),
            },
            "createdBy" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(achTransactionObj.createdby, 15),
            },
            "lblEffectiveDate" : CommonUtilities.getFrontendDateString(achTransactionObj.EffectiveDate,"mm/dd/yyyy"),
            "request_id":achTransactionObj.Request_id,
          };

          if(achTransactionObj.RequestType.includes("PPD") || achTransactionObj.RequestType.includes("CCD") || achTransactionObj.RequestType.includes("CTX")){
            achTransactionObj.RequestType=(achTransactionObj.RequestType).substring(0, 3) + " " + achTransactionObj.TransactionTypeValue;
          }

          if (achTransactionObj.Status === kony.i18n.getLocalizedString("i18n.konybb.Common.Pending")) {
            achTransactionObj.Approval = achTransactionObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + achTransactionObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
          }
          else if (achTransactionObj.Status === kony.i18n.getLocalizedString("i18n.konybb.Common.Rejected")) {
            achTransactionObj.Approval = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
          }
          else if (!kony.sdk.isNullOrUndefined(achTransactionObj.requiredApprovals)) {
            achTransactionObj.Approval = achTransactionObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
          } 
          else {
            achTransactionObj.Approval = "N/A";
          }
          achTransactionsArr.push(rowObj);
        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoACHTransactionRequests")},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        achTransactionsArr.push(rowObj2);
      }
      viewController.achTransactionRequestSuccessCallback(achTransactionsArr);
    }catch(e){
      kony.print("Exception in ACHTransactionRequestsSuccess"+e);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };


  /**
  	* showTransactionRequestsFailure :  Failure callback - which is invoked when fetching of ACH transaction requests is failed
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} responseError - Respose Error from the Service call 
  	* @return {JSON Object} responseError - Respose Error from the Service call  
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.ACHTransactionRequestsFailure = function( responseError ) { 
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true); //frmApprovalsList
    viewController.showToastPopup(responseError,"failure","");
    //return(responseError);
  };


  /**
  	* fetchACHFileRequests :  This method fetches the requests made by the user that are related to ACH Files
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  	* @return {} 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.fetchACHFileRequests = function( navObj ) {
    try{
      var scopeObj = this;

      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllACHFileRequests(
        navObj.requestData,
        scopeObj.ACHFileRequestsSuccess.bind(scopeObj,navObj),
        scopeObj.ACHFileRequestsFailure
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getACHFilesPendingForMyApprovals"+e);
    }
  };


  /**
  	* ACHFileRequestsSuccess :  Success callback - which is invoked after fetching ACH File requests successfully
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} response - Raw response form the Service call
  	* @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.ACHFileRequestsSuccess = function( navObj,response ) { 
    try{
      kony.print("Presentation controller ACHFileRequestsSuccess response:"+JSON.stringify(response));
      response = response.ACHFile;
      var achFilesResponseArr = [];
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png",
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};

      var textAndSkinObj = {};
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveImgSrc": constantsSkin.imgApprove,
        "approveFlxSkin": constantsSkin.flxApproveSkin,
        "approveFlxVisiblity":true,
      };
      var configManager = applicationManager.getConfigurationManager();

      if(Array.isArray(response))
        if(response.length > 0){
          response.forEach(function(achFileReq){
            var withdrawVisibility = achFileReq.FileStatus === "Pending";
            if(isiPhone && achFileReq.UpdatedDateAndTime.includes(" ")) {
              achFileReq.UpdatedDateAndTime = achFileReq.UpdatedDateAndTime.replace(" ", "T") + "Z";
            }
            if(!isiPhone) {
              achFileReq.UpdatedDateAndTime  = achFileReq.UpdatedDateAndTime.slice(0, 10) + "T12:00:00.001Z";
            }
            var rowObj = {
              "template": "flxRequestList",
              "data" : achFileReq,
              "lblTransaction": {"text": "" + CommonUtilities.truncateStringWithGivenLength(achFileReq.FileName, 30)},
              "lblTransactionAmount": {"text": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(achFileReq.TotalCreditAmount, true)},
              "lblDate": {"text": CommonUtilities.getFrontendDateString(achFileReq.UpdatedDateAndTime,"mm/dd/yyyy")},
              "flxRequestList": {"isVisible": true,"height": "70dp"},
              "lblStatus" : {"text" : achFileReq.FileStatus},
              "ACHFileID":achFileReq.ACHFileID,
              "flxApprove": {
                "skin" : constantsSkin.flxApproveSkin,
                onClick : viewController.showWithdrawpopup,
                "isVisible" : withdrawVisibility && configManager.getUploadACHFilePermissionsList().some(configManager.checkUserPermission.bind(configManager))
              },
              "lblApprove": {"text" : textAndSkinObj.approveLblName, "skin" : textAndSkinObj.approveLblSkin},
              "imgApprove": {"src": constantsSkin.imgApprove},
              "action" : "Withdraw",
              "fileName" : {
                "text" : CommonUtilities.truncateStringWithGivenLength(achFileReq.FileName, 30),
              },
              "userName" : {
                "text" : CommonUtilities.truncateStringWithGivenLength(achFileReq.userName, 15),
              },
              "totalCreditAmount" :configManager.getCurrencyCode()+""+ CommonUtilities.formatCurrencyWithCommas(achFileReq.TotalCreditAmount, true),
              "totalDebitAmount" : configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(achFileReq.TotalDebitAmount, true),
              "updatedDateAndTime" : CommonUtilities.getDateAndTime(achFileReq.UpdatedDateAndTime,"mm/dd/yyyy"),
              "request_id": achFileReq.Request_id, 
            }
            achFilesResponseArr.push(rowObj);
          });
        }else{
          var rowObj2 = {
            "template": "flxNoPending",
            "lblTransactionPending": {"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoACHFileRequests")},
            "flxNoPending": {"isVisible": true,"height": "80dp"}
          };
          achFilesResponseArr.push(rowObj2);
        }
      viewController.fetchACHFilesMyRequestsSuccessCallBack(achFilesResponseArr);
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in ACHFileRequestsSuccess"+e);
    }
  };


  /**
  	* ACHFileRequestsFailure : Failure callback - which is invoked when fetching of ACH File requests is failed
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} responseError - Respose Error from the Service call 
  	* @return {JSON Object} responseError - Respose Error from the Service call  
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.ACHFileRequestsFailure = function( responseError ){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true); //frmApprovalsList
    viewController.showToastPopup(responseError,"failure","");
  };

  /**
  	* dataProcessorForGenTransaction :  General Transaction Data Processing
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} response - Raw response form the Service call
  	* @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForGenTransaction = function(navObj,response) { 
    try{
      kony.print("Presentation controller dataProcessorForGenTransaction::");
      response = response.BBGeneralTransaction;
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      var bbGenTransacctionArrCustom = [];
      var constantsSkin = {};
      var textAndSkinObj = {};
      var scopeObj = this;
      constantsSkin = {"headerImgUp" : "arrowupblue.png",
                       "imgReject" : "cancelreject.png",
                       "imgApprove" : "approvetick.png", 
                       "flxApproveSkin": "sknUnderlinef639afTab",
                       "flxRejectSkin" : "sknflxf6f6f6Bcg"};

      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approve"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveFlxVisiblity":true,
        "rejectLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Reject"),
        "rejectLblSkin":"sknLbl104B80SPReg20px",
        "rejectFlxVisiblity":true,
      };
      var configManager = applicationManager.getConfigurationManager();

      if(response.length > 0){
        var scope = this;
        response.forEach(function(transaction){
          var statusCheck = transaction.Status.toLowerCase();

          if(statusCheck==="pending"){// this condtion used for fliter only pending status for approvals  
            kony.print("Payee :" +CommonUtilities.truncateStringWithGivenLength(transaction.Payee, 15));
            var rowObj = {
              "template": "flxApprovalsList",
              "data" : transaction,
              "lblTransactionAP": {
                "text": kony.sdk.isNullOrUndefined(transaction.Payee)?"NA" :transaction.Payee
              },// CommonUtilities.truncateStringWithGivenLength(transaction.Payee, 15)},
              "lblTransactionAmountAP": {"text":   configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(transaction.Amount,true)},//"$" + transArr[i].Amount + ".00"},
              "lblDateAP": {"text": "" + CommonUtilities.getFrontendDateString(transaction.TransactionDate,"mm/dd/yyyy")},
              "flxApprovalsList": {"isVisible": true,"height": "70dp"},
              "flxRejectAP": {
                "skin" : constantsSkin.flxRejectSkin,
                onClick : viewController.rejectBtnOnClick,
                "isVisible" : configManager.getGeneralTransactionApprovalFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
              },
              "flxApproveAP": {
                "skin" : constantsSkin.flxApproveSkin, 
                onClick : viewController.approveTransaction,
                "isVisible" : configManager.getGeneralTransactionApprovalFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager)),
              },
              "lblRejectAP": {
                "text" : textAndSkinObj.rejectLblName,
                "skin" : textAndSkinObj.rejectLblSkin
              },
              "lblApproveAP": {
                "text" : textAndSkinObj.approveLblName, 
                "skin" : textAndSkinObj.approveLblSkin
              },
              "imgRejectAP": {"src": constantsSkin.imgReject},
              "imgApproveAP": {"src": constantsSkin.imgApprove},
              "frequency" : kony.sdk.isNullOrUndefined(transaction.Frequency) ? "N/A" : transaction.Frequency,
              "reccurence" : kony.sdk.isNullOrUndefined(transaction.Reccurence) ? "N/A" : transaction.Reccurence,
              "transactionType" : {
                "text" :  kony.sdk.isNullOrUndefined(transaction.featureName) ? "N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.featureName, 22),
              },
              "lblApproval" : transaction.receivedApprovals + " of " + transaction.requiredApprovals,
              "amICreator": transaction.amICreator,
              "amIApprover": transaction.amIApprover,
              "status" : transaction.Status,
              "userName" : {
                "text" :  kony.sdk.isNullOrUndefined(transaction.userName) ?"N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.userName, 15),
              },
              "transaction_id" : transaction.Transaction_id,
              "debitAccount" : {
                "text" : CommonUtilities.truncateStringWithGivenLength(transaction.AccountName+"....",16)+CommonUtilities.getLastFourDigit(transaction.DebitOrCreditAccount),
              },
              "debitOrCreditAccount" : {
                "text" : CommonUtilities.truncateStringWithGivenLength(transaction.AccountName+"....",16)+CommonUtilities.getLastFourDigit(transaction.DebitOrCreditAccount),
              },
              "request_id" : transaction.Request_id
            };
            bbGenTransacctionArrCustom.push(rowObj);
          }
        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoPendingApprovals")},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        bbGenTransacctionArrCustom.push(rowObj2);
      }

      return(bbGenTransacctionArrCustom);
    }catch(ex){
      kony.print("Exception in dataProcessorForGenTransaction "+e);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };


  /**
  	* dataProcessorForGenTransactionRequests :  General Transaction Data Processing of Requests
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} response - Raw response form the Service call
  	* @return {JSON Object} response -  Massaged/formatted JSON data of the Transactions 
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForGenTransactionRequests = function(navObj,response) { 
    try{
      kony.print("Presentation controller dataProcessorForGenTransactionRequests::");
      response = response.BBGeneralTransaction;
      var bbGenTransacctionArrCustom = [];
      var constantsSkin = {};
      var textAndSkinObj = {};
      var scopeObj = this;
      var configManager = applicationManager.getConfigurationManager();
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      constantsSkin = {"headerImgUp" : "arrowupblue.png",
                       "imgReject" : "cancelreject.png",
                       "imgApprove" : "approvetick.png",
                       "flxApproveSkin": "sknUnderlinef639afTab",
                       "flxRejectSkin" : "sknflxf6f6f6Bcg"}
      textAndSkinObj = {
        "approveLblName":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Withdraw"),
        "approveLblSkin":"sknLblffffffSSP20px",
        "approveImgSrc": constantsSkin.imgApprove,
        "approveFlxSkin": constantsSkin.flxApproveSkin,
        "approveFlxVisiblity":true,
      };

      if(response.length > 0){
        response.forEach(function(transaction){
          kony.print("Payee :" +CommonUtilities.truncateStringWithGivenLength(transaction.Payee, 15));
          var withdrawVisiblity = (transaction.Status === "Pending") ? true : false;

          var rowObj = {
            "template": "flxRequestList",
            "data" : transaction,
            "flxRequestList": {"isVisible": true,"height": "70dp"},
            "flxApprove": {
              "skin" : constantsSkin.flxApproveSkin,
              "isVisible" : withdrawVisiblity && configManager.getCreateGeneralTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager)),
              onClick : viewController.showWithdrawpopup
            },
            "lblApprove": {
              "text" : textAndSkinObj.approveLblName,
              "skin" : textAndSkinObj.approveLblSkin
            },
            "imgApprove": {"src": constantsSkin.imgApprove},
            "lblTransaction": {
              "text": kony.sdk.isNullOrUndefined(transaction.Payee)?"NA" :transaction.Payee//CommonUtilities.truncateStringWithGivenLength(transaction.Payee, 15) + CommonUtilities.getLastFourDigit(transaction.DebitOrCreditAccount)
            },
            "lblTransactionAmount": {"text": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(transaction.Amount,true)},
            "lblDate": {"text":  CommonUtilities.getFrontendDateString(transaction.TransactionDate,"mm/dd/yyyy")},
            "lblStatus" : {"text" : transaction.Status},
            "frequency" : kony.sdk.isNullOrUndefined(transaction.Frequency) ? "N/A" : transaction.Frequency,
            "reccurence" : kony.sdk.isNullOrUndefined(transaction.Reccurence) ? "N/A" : transaction.Reccurence,
            "transactionType" : {
              "text" :  kony.sdk.isNullOrUndefined(transaction.featureName) ? "N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.featureName, 22),
            },
            "amICreator": transaction.amICreator,
            "amIApprover": transaction.amIApprover,
            "status" : transaction.Status,
            "userName" : {
              "text" :  kony.sdk.isNullOrUndefined(transaction.userName) ?"N/A" : CommonUtilities.truncateStringWithGivenLength(transaction.userName, 15),
            },
            "lblApproval" : transaction.receivedApprovals + " of " + transaction.requiredApprovals, 
            "transaction_id" : transaction.Transaction_id,
            "debitAccount" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(transaction.AccountName+"....",16)+CommonUtilities.getLastFourDigit(transaction.DebitOrCreditAccount),
            },
            "debitOrCreditAccount" : {
              "text" : CommonUtilities.truncateStringWithGivenLength(transaction.AccountName+"....",16)+CommonUtilities.getLastFourDigit(transaction.DebitOrCreditAccount),
            },
            "request_id" : transaction.Request_id
          };
          bbGenTransacctionArrCustom.push(rowObj);

        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.NoTransactionRequests")},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        bbGenTransacctionArrCustom.push(rowObj2);
      }

      return(bbGenTransacctionArrCustom);
    }catch(ex){
      kony.print("Exception in dataProcessorForGenTransactionRequests "+ex);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.dataFormToSegMyApprovals = function(responseofGenTrans,resOfACHTrans,resOfACHFiles){
    try {
      kony.print("Presentation controller dataFormToSegMyApprovals:::"+responseofGenTrans);

      var finalArr = []; // this is the final array which we are going to set in segment          
      var constantsSkin = {"headerImgUp" : "arrowupblue.png",
                           "imgReject" : "cancelreject.png",
                           "imgApprove" : "approvetick.png", 
                           "flxApproveSkin": "sknUnderlinef639afTab",
                           "flxRejectSkin" : "sknflxf6f6f6Bcg"};
      var headerTitles = [];
      if(responseofGenTrans !== undefined && responseofGenTrans !== null)
        headerTitles.push("Transactions");
      if(resOfACHTrans !== undefined && resOfACHTrans !== null)
        headerTitles.push("ACH Transactions");
      if(resOfACHFiles !== undefined && resOfACHFiles !== null)
        headerTitles.push("ACH Files");
      //kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.ACHTransactions"), 
      //kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.ACHFiles")];
      var combinedHeadRowArr = [];
      var scopeObj = this;
      if(Array.isArray(headerTitles)){
        for (var j = 0; j < headerTitles.length; j++) {
          combinedHeadRowArr = [];
          combinedHeadRowArr.push({
            "template": "flxApprovalReqExpColHeader",
            "lblHeader": {"text": headerTitles[j]},
            "imgUpArrow": {"src": constantsSkin.headerImgUp},
          });

          if(headerTitles[j] === "Transactions"){
            combinedHeadRowArr.push(responseofGenTrans); 
          }else if(headerTitles[j] === "ACH Transactions"){
            combinedHeadRowArr.push(resOfACHTrans); 
          }else{
            combinedHeadRowArr.push(resOfACHFiles); 
          }

          finalArr.push(combinedHeadRowArr);
        }}

      kony.print("final Arr::::" + JSON.stringify(finalArr));
      return finalArr;

    } catch (e) {
      kony.print("exception dataFormToSegMyApprovals::" + e);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };


  ApprovalsReqUIModule_PresentationController.prototype.getRequestsHistory = function(navObject){
    var scopeObj = applicationManager.getApprovalsReqManager();
    var ApprovalReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqManager').businessController;
    ApprovalReqModule.getRequestsHistory(navObject.requestData,this.getApprovalReqHistorySuccess,this.getApprovalReqHistoryFailure);
  };

  ApprovalsReqUIModule_PresentationController.prototype.getApprovalReqHistorySuccess = function (response) {
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("PendingRequestDetails",response);
    var proccessedResponse = ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForApprovalHistory(response);
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);    
    try{
      if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew' || navManager.stack[navManager.stack.length-1]==='frmApprovalsTransactionDetailNew') {
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
      }
      else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement' || navManager.stack[navManager.stack.length-1]==='frmApprovalsAcknowledgement'){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);

      }
    }catch(err){}
    viewController.getApprovalReqHistorySuccessCB(proccessedResponse, response);
    //return this.dataProcessorForGenTransaction(response);
  };

  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForApprovalHistory = function(response){
    try{
      var templateData = [];
      response = response.RequestHistory;
      var totalArraylength = response.length;
      var skin;
      if(!kony.sdk.isNullOrUndefined(response)){
        if(Array.isArray(response)){
          if(response.length > 0){
            for(var i = 0; i < totalArraylength ;i++){
              var isvisible=false;
              var approvalIsVisible=false; 
              if(!kony.sdk.isNullOrUndefined(response[i].Actionts)){
                var CreatedOn = response[i].Actionts;
                var varDateAndTimeInUTC = response[i].Actionts;
                CreatedOn = CreatedOn.split('T')[0];
                var time=response[i].Actionts;
                time = time.split('T')[1];
                var time1=time.substring(0, time.length - 1);
              }

              //var dateCreated = kony.sdk.isNullOrUndefined(CreatedOn)?"-":kony.i18n.getLocalizedString("Kony.mb.EBill.on")+CommonUtilities.getFrontendDateString(CreatedOn,"mm/dd/yyyy")+" "+time1;
              var dateCreated = kony.sdk.isNullOrUndefined(CreatedOn)?"-":CommonUtilities.getDateAndTimeInUTC(varDateAndTimeInUTC);
              var statusfinal = "-";
              if(response[i].Action === "Approved") {
                //response[i].Action = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved");
                statusfinal = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved");
                skin="sknlb1C810Cssp13px";
                approvalIsVisible=true;
                isvisible=true;
              }
              else if(response[i].Action === "Pending") {
                //response[i].Action = kony.i18n.getLocalizedString("kony.mb.achtransactions.CreatedRequest");
                statusfinal = kony.i18n.getLocalizedString("kony.mb.achtransactions.CreatedRequest");
                skin="sknlbl424242ssp40px";
              }
              else if(response[i].Action === "Rejected") {
                //response[i].Action = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Rejected");
                statusfinal = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Rejected");
                skin="sknlblD01212ssp13px";
                isvisible = true;
              }
              else if(response[i].Action === "Approval Pending") {
                //response[i].Action = kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalPending");
                statusfinal = kony.i18n.getLocalizedString("kony.mb.achtransactions.ApprovalPending");
                skin="sknlbAF8D0Fssp13px";
                dateCreated = "-";
                approvalIsVisible=true;
              }

              var jsonData={
                "lblRecipientname":{"text":kony.sdk.isNullOrUndefined(response[i].Action)?"-":statusfinal,
                                    "skin":skin},
                "lblAccountnumber":{"text" :kony.sdk.isNullOrUndefined(response[i].userName)?"-":response[i].userName,
                                    "skin":"sknlbl424242ssp40px"},
                "lblAmount":{"text":dateCreated,
                             "skin":"sknlbl424242ssp40px"},
                "lblStatus":{"text":kony.i18n.getLocalizedString("kony.mb.EuropeTransfer.By")+":", "skin":"sknlbl949494SSPR13px",isVisible:true},
                "flxComments":{isVisible:isvisible},
                "lblComments":{"text":kony.i18n.getLocalizedString("i18n.konybb.myRequests.comments")+":","skin":"sknlbl949494SSPR13px"},
                "lblCommentsVal":{"text":kony.sdk.isNullOrUndefined(response[i].Comments)?"-":response[i].Comments,
                                  "skin":"sknlbl424242ssp40px"},
                "flxSep":{isVisible:true},
                "flxSeperatorTrans4":{isVisible:false},
                "flxGroupName":{isVisible:true},
                "lblGroupName":{"text":kony.i18n.getLocalizedString("i18n.approvalMatrix.signatoryGroup")+":","skin":"sknlbl949494SSPR13px"},
                "lblGroupNameVal":{"text":kony.sdk.isNullOrUndefined(response[i].groupName)?"-":response[i].groupName,
                                   "skin":"sknlbl424242ssp40px"},
                "flxPendingApproval":{isVisible:false},
              };
              templateData.push(jsonData);  
            }
            var navManager = applicationManager.getNavigationManager();
            var formFlow = navManager.getCustomInfo("backFormFlow");
            if(formFlow=="ApprovalAndRequest"){
              var approvalCount="0";
              var rejectCount="0";
              var isApproved=false;
              var count="0";
              var lable;
              var isVisible=false;
              //reject count check
              for(var i=0;i<response.length;i++){
                if(response[i].Action === "Rejected"){
                  rejectCount++;
                }
              }
              var test1={"lblRecipientname":{"text":kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Rejected")+":",
                                             "skin":"sknlbl949494SSPR13px"},
                         "lblAccountnumber":{"text" :""+parseInt(rejectCount),
                                             "skin":"sknlbl424242ssp40px"},
                         "flxPendingApproval":{isVisible:false},
                         "flxSep":{isVisible:true},
                         "flxSeperatorTrans4":{isVisible:false},
                         "lblAmount":{isVisible:false},
                         "flxComments":{isVisible:false},
                         "lblCommentsVal":{isVisible:false},
                         "lblStatus":{isVisible:false},
                         "flxGroupName":{isVisible:false},
                         "lblGroupName":{isVisible:false},
                         "lblGroupNameVal":{isVisible:false}
                        }
              templateData.push(test1);
              //approved count check
              for(var i=0;i<response.length;i++){
                if(response[i].Action === "Approved"){
                  approvalCount++;
                }
              }
              var test2={"lblRecipientname":{"text": kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approved")+":",
                                             "skin":"sknlbl949494SSPR13px"},
                         "lblAccountnumber":{"text" :""+parseInt(approvalCount),
                                             "skin":"sknlbl424242ssp40px"},
                         "flxPendingApproval":{isVisible:false},
                         "flxSep":{isVisible:true},
                         "flxSeperatorTrans4":{isVisible:false},
                         "lblAmount":{isVisible:false},
                         "flxComments":{isVisible:false},
                         "lblCommentsVal":{isVisible:false},
                         "lblStatus":{isVisible:false},
                         "flxGroupName":{isVisible:false},
                         "lblGroupName":{isVisible:false},
                         "lblGroupNameVal":{isVisible:false}
                        }
              templateData.push(test2);
            }
          }
        }
      }
      return templateData;
    }catch(er){
      kony.print(er);
    }
  },

    ApprovalsReqUIModule_PresentationController.prototype.getApprovalReqHistoryFailure = function (responseError) {
    // return responseError;
  };

  /**
  * approvePendingTransactions :  This is the function to Approve an Pendgin Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @return {} 
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.approvePendingTransactions = function (navObj) {
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.Approve(
      navObj.requestData,
      scopeObj.onApproveBBGeneralTransactionsSuccess.bind(scopeObj,navObj),
      scopeObj.onApproveBBGeneralTransactionsFailure.bind(scopeObj,navObj)
    );
  };


  /**
  * approveBBGeneralTransactions :  This is the function to Approve an General Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @return {} 
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.approveBBGeneralTransactions = function (navObj) {
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.approveBBGeneralTransactions(
      navObj.requestData,
      scopeObj.onApproveBBGeneralTransactionsSuccess.bind(scopeObj,navObj),
      scopeObj.onApproveBBGeneralTransactionsFailure.bind(scopeObj,navObj)
    );
  };


  /**
  * onApproveBBGeneralTransactionsSuccess : Upon Success of an Approval, function to fetch the an General Transaction Details
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObject - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - success response data of the previous call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onApproveBBGeneralTransactionsSuccess = function (navObj, response) {
    var scopeObj = this;

    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"));
    }else if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsTransactionDetailNew"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
      viewController.savingAckData(response);
    }
    else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true); 
      viewController.fetchBBGeneralTransactionsSucces(response);
    }
  };

  /**
  * onApproveBBGeneralTransactionsFailure : Failed to Approve General Transaction 
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} responseError - Service returned error object
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onApproveBBGeneralTransactionsFailure = function (navObj,responseError) {
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };


  /*******************************************************
  * approveACHTransactions :  This is the function to Approve an ACH Transactions

  *********************************************************/ 
  ApprovalsReqUIModule_PresentationController.prototype.approveACHTransactions = function (navObj) { 
    var scopeObj = this;     
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.approveACHTransactions(navObj.requestData,
                                               scopeObj.onApproveACHTransactionsSuccess.bind(scopeObj,navObj),
                                               scopeObj.onApproveACHTransactionsFailure.bind(scopeObj,navObj));
  };

  ApprovalsReqUIModule_PresentationController.prototype.onApproveACHTransactionsSuccess = function ( navObj,response ){  
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchApproveACHTransactionsSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.onApproveACHTransactionsFailure = function ( navObj,responseError ) { 
    kony.print("Presentation controller onApproveACHTransactionsFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };


  /*****************************************************
  * approveACHFiles : call the service to Approve ACH File
  ****************************************************/
  ApprovalsReqUIModule_PresentationController.prototype.approveACHFiles = function (navObj) {
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.approveACHFiles(navObj.requestData,
                                        scopeObj.onApproveACHFilesSuccess.bind(scopeObj,navObj),
                                        scopeObj.onApproveACHFilesFailure.bind(scopeObj,navObj));
  };

  ApprovalsReqUIModule_PresentationController.prototype.onApproveACHFilesSuccess = function (navObj, response ){  
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.approved"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchApproveACHFilesSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.onApproveACHFilesFailure = function ( navObj, responseError ) { 
    kony.print("Presentation controller onApproveACHFilesFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };

  /**
	  * getCancellationReasons :  This is the function which is used to fetch  reject reasons for transactions
	  * @member of {ApprovalsReqUIModule_PresentationController}
	  * @param {JSON Object} navObj - navigation object with success and failure flows
	  * @return {}
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getCancellationReasons = function (navObj) {
    try{
      var scopeObj = this;

      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchBulkCancellationReason(
        navObj,
        scopeObj.onFetchCancellationReasonsSuccess.bind(scopeObj,navObj),
        scopeObj.onFetchCancellationReasonsFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getCancellationReasons"+e);}
  };

  /**
	 * onFetchCancellationReasonsSuccess :  Method to handle success response of fetching Transactions Pending for My Approvals
	 * @member of {PresentationController}
	 * @param {JSON Object} response - response object from the service call 
	 * @return {}  
	 * @throws {}
	 */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchCancellationReasonsSuccess = function (navObj,response) {
    try{
      kony.print("Presentation controller onFetchCancellationReasonsSuccess"+JSON.stringify(response));
      var navigationManager = applicationManager.getNavigationManager();
      var resCancelation = response.cancellationreasons;
      var transactionsArr = [];
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmBulkRejectReason', true);


      if(resCancelation.length > 0){
        resCancelation.forEach(function (responseObj) {
          var id = responseObj.id;
          var reason = responseObj.reason;
          reason = reason.charAt(0).toUpperCase() + reason.slice(1).toLowerCase();

          var rowObj= {
            "template": "flxFilterRows",
            "data" : responseObj,

            "lblName" : {text : kony.sdk.isNullOrUndefined(reason)?"-":reason},
            "imgSelection" : {"src":"transparent.png"},
          };
          transactionsArr.push(rowObj);
        });
      }else{
        var rowObj2 = {
          "template": "flxNoPending",
          "lblTransactionPending": {"text": "No Reason found"},
          "flxNoPending": {"isVisible": true,"height": "80dp"}
        };
        transactionsArr.push(rowObj2);
      }

      viewController.fetchRejectReasonSuccessCallBack(transactionsArr);

    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in onFetchCancellationReasonsSuccess"+e);}
  };

  /**
	  * onFetchPendingApprovalsFailure :  Method to handle failure response of fetching General Transactions Pending for My Approvals
	  * @member of {PresentationController}
	  * @param {JSON Object} responseError - error object form failure callback of service
	  * @return {}  
	  * @throws {}
	  */ 
  ApprovalsReqUIModule_PresentationController.prototype.onFetchCancellationReasonsFailure = function (responseError) {
    kony.print("Presentation controller onFetchCancellationReasonsFailure"+JSON.stringify(responseError));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmBulkRejectReason', true); //frmRequestList
    viewController.showToastPopup(responseError,"failure","");
    // return responseError;
  };

  /*  rejectPendingTransaction : This is the function for Reject Pending Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.rejectPendingTransaction = function (navObj) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.Reject(
      navObj.requestData,
      scopeObj.onRejectPendingTransactionsSuccess.bind(scopeObj,navObj),
      scopeObj.onRejectPendingTransactionsFailure.bind(scopeObj,navObj)
    );
  };

  /*  rejectBulkPaymentRecord : This is the function for Reject Pending Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.rejectBulkPaymentRecord = function (navObj) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.rejectBulkPaymentRecord(
      navObj.requestData,
      scopeObj.onRejectPendingTransactionsSuccess.bind(scopeObj,navObj),
      scopeObj.onRejectPendingTransactionsFailure.bind(scopeObj,navObj)
    );
  };

  /**
  * onRejectPendingTransactionsSuccess : Method to handle success response of Reject BB Pending Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - Success Data which is reponse to previous call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onRejectPendingTransactionsSuccess = function (navObj, response) { 
    var scopeObj = this;
    kony.print("Entered onRejectPendingTransactionsSuccess"+JSON.stringify(response));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"));
    }else if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsTransactionDetailNew"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
      viewController.savingAckData(response);
    }else if(navObj.formData.viewId === "ApprovalsReqUIModule/frmBulkRejectReason"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmBulkRejectReason', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchRejectBBGeneralTransactionsSuccess(response);
    }
  };


  /**
  * onRejectPendingTransactionsFailure : Method to handle failure response of Reject Pending Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} responseError - failure response object
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onRejectPendingTransactionsFailure = function (navObj,responseError) {
    kony.print("Entered onRejectPendingTransactionsFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else if(navObj.formData.viewId === "ApprovalsReqUIModule/frmBulkRejectReason"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmBulkRejectReason', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError)
    }
  };



  /*  rejectBBGeneralTransactions : This is the function for Reject BB General Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.rejectBBGeneralTransactions = function (navObj) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.rejectBBGeneralTransactions(
      navObj.requestData,
      scopeObj.onRejectBBGeneralTransactionsSuccess.bind(scopeObj,navObj),
      scopeObj.onRejectBBGeneralTransactionsFailure.bind(scopeObj,navObj)
    );
  };


  /**
  * onRejectBBGeneralTransactionsSuccess : Method to handle success response of Reject BB General Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
  * @param {JSON Object} response - Success Data which is reponse to previous call
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onRejectBBGeneralTransactionsSuccess = function (navObj, response) { 
    var scopeObj = this;
    kony.print("Entered onRejectBBGeneralTransactionsSuccess"+JSON.stringify(response));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchRejectBBGeneralTransactionsSuccess(response);
    }
  };


  /**
  * onRejectBBGeneralTransactionsSuccess : Method to handle failure response of Reject BB General Transactions
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} responseError - failure response object
  * @return {} 
  * @throws {}
  */
  ApprovalsReqUIModule_PresentationController.prototype.onRejectBBGeneralTransactionsFailure = function (navObj,responseError) {
    kony.print("Entered onRejectBBGeneralTransactionsFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError)
    }
  };



  /******************************************************************
  * rejectACHTransactions : This is the function for Reject ACH Transactions
  ****************************************/
  ApprovalsReqUIModule_PresentationController.prototype.rejectACHTransaction = function (navObj) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.rejectACHTransactions(navObj.requestData,
                                              scopeObj.onRejectACHTransactionsSuccess.bind(scopeObj,navObj),
                                              scopeObj.onRejectACHTransactionsFailure.bind(scopeObj,navObj));

  };
  ApprovalsReqUIModule_PresentationController.prototype.onRejectACHTransactionsSuccess = function ( navObj,response ){ 
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchRejectACHTransactionsSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.onRejectACHTransactionsFailure = function ( navObj,responseError ) { 
    kony.print("Presentation controller onRejectACHTransactionsFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };

  /**************************************************************
  * rejectACHFiles : Method to handle success response of Reject ACHFile
  ************************************************************/
  ApprovalsReqUIModule_PresentationController.prototype.rejectACHFile = function (navObj) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.rejectACHFiles(navObj.requestData,
                                       scopeObj.onRejectACHFilesSuccess.bind(scopeObj,navObj),
                                       scopeObj.onRejectACHFilesFailure.bind(scopeObj,navObj));  
  };
  ApprovalsReqUIModule_PresentationController.prototype.onRejectACHFilesSuccess = function ( navObj,response ){  
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.reject"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchRejectACHFilesSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.onRejectACHFilesFailure = function ( navObj,responseError ) { 
    kony.print("Presentation controller onRejectACHFilesFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmApprovalsList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };

  /**
  	* withdrawTransactionRequest :  This method is used to withdraw a transaction request made by the user 
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - navigation object with success and failure flows
  	* @return {}
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.withdrawPendingRequest = function( navObj ){ 
    var scopeObj = this;

    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.withdraw(
      navObj.requestData,
      scopeObj.transactionWithdrawlSuccess.bind(scopeObj,navObj),
      scopeObj.transactionWithdrawlFailure.bind(scopeObj,navObj),
    );
  };

  /**
  	* withdrawTransactionRequest :  This method is used to withdraw a transaction request made by the user 
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - navigation object with success and failure flows
  	* @return {}
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.withdrawTransactionRequest = function( navObj ){ 
    var scopeObj = this;

    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.withdrawTransactionRequest(
      navObj.requestData,
      scopeObj.transactionWithdrawlSuccess.bind(scopeObj,navObj),
      scopeObj.transactionWithdrawlFailure.bind(scopeObj,navObj),
    );
  };


  /**
  	* transactionWithdrawlSuccess :  Success callback invoked after the successful withdrawl of a transaction
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} navObj - navigation object with success and failure flows
    * @param {JSON Object} response - response object from the service call 
  	* @return {}  
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.transactionWithdrawlSuccess = function ( navObj, response ) { 
    var scopeObj = this;
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchBBGeneralTransactionsWithdrawlSuccess(response);
    }
  };


  /**
  	* transactionWithdrawlFailure :  Failure callback invoked after the failure of a transaction withdrawl 
  	* @member of {ApprovalsReqUIModule_PresentationController}
  	* @param {JSON Object} error - error object form failure callback of service
  	* @return {}  
  	* @throws {}
  	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.transactionWithdrawlFailure = function( navObj,error ){
    kony.print("Presentation controller transactionWithdrawlFailure"+JSON.stringify(error));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(error,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(error);
    }
  };

  /*************************************************************88
  	* withdrawTransactionRequest :  This method is used to withdraw a transaction request made by the user 

  ****************************************************************************88	*/ 
  ApprovalsReqUIModule_PresentationController.prototype.withdrawACHTransaction = function( navObj ){ 
    var scopeObj = this;  
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.withdrawACHTransactionRequest(navObj.requestData,
                                                      scopeObj.achTransactionWithdrawlSuccess.bind(scopeObj,navObj),
                                                      scopeObj.achTransactionWithdrawlFailure.bind(scopeObj,navObj));
  };
  ApprovalsReqUIModule_PresentationController.prototype.achTransactionWithdrawlSuccess = function ( navObj,response ){
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchACTransactionWithdrawlSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.achTransactionWithdrawlFailure = function ( navObj,responseError ) { 
    kony.print("Presentation controller onRejectACHFilesFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };
  /***********************************************
  	* withdrawACHFileRequest :  This method is used to withdraw an ACH File request made by the user
  	****************************************************/ 
  ApprovalsReqUIModule_PresentationController.prototype.withdrawACHFileRequests = function( navObj ) { 
    var scopeObj = this;
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    approvalsReqManager.withdrawACHFileRequest(
      navObj.requestData,
      scopeObj.achFileWithdrawlSuccess.bind(scopeObj,navObj),
      scopeObj.achFileWithdrawlFailure.bind(scopeObj,navObj) );
  };

  ApprovalsReqUIModule_PresentationController.prototype.achFileWithdrawlSuccess = function ( navObj,response ){   
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(response,"success",kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.withdraw"));
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchACHFileWithdrawlSuccess(response);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.achFileWithdrawlFailure = function ( navObj,responseError ) { 
    kony.print("Presentation controller achFileWithdrawlFailure"+JSON.stringify(responseError));
    if(navObj.formData.viewId === "ApprovalsReqUIModule/frmRequestList"){
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmRequestList', true);
      viewController.showToastPopup(responseError,"failure","");
    }else{
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
      viewController.fetchErrorBack(responseError);
    }
  };


  /**
  * getApprovalsHistory :  This is the function which is used to get ApprovalsHistory 
  * @member of {ApprovalsReqUIModule_PresentationController}
  * @param {JSON Object} navObj - navigation object with success and failure flows
  * @return {}
  * @throws {}
  */ 
  ApprovalsReqUIModule_PresentationController.prototype.getApprovalsHistory = function (navObj) {
    try{
      var scopeObj = this;
      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.FetchAllMyApprovalHistory(
        navObj,
        scopeObj.onFetchApprovalsHistorySuccess,
        scopeObj.onFetchApprovalsHistoryFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getApprovalsHistory"+e);}
  };

  ApprovalsReqUIModule_PresentationController.prototype.onFetchApprovalsHistorySuccess = function (responses) { 
    var proccessedResponse = ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForAllApprovalHistory(responses);
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalHistory', true);
    viewController.fetchApprovalsHistorySuccesscallback(proccessedResponse);
  };
  ApprovalsReqUIModule_PresentationController.prototype.onFetchApprovalsHistoryFailure = function( error ){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalHistory', true);
    viewController.errorCallback(error);
  };
  /**
    * dataProcessorForApprovalHistory : Method to format Data for ApprovalHistory  */// 
  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForAllApprovalHistory = function (responsedata ) { 
    try{     
      var setdataarray=[];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      var response = responsedata.records;
      if(Array.isArray(response)){
        for(var i=0;i<response.length;i++){ 
          var statusImage;
          if(response[i].status === "Approved" || response[i].status === "approved") {
            statusImage = "approval.png"
          }
          else if(response[i].status === "Pending" || response[i].status === "pending") {
            statusImage = "pending.png"
          } else{
            statusImage = "reject.png"
          }
          var approvalDate = response[i].approvalDate;
          approvalDate = approvalDate.split('T')[0];
          var featureName;
          var featureActionName;
          if(response[i].featureName.length > 53){
            featureName=CommonUtilities.truncateStringWithGivenLength(response[i].featureName + "...", 53);
          }else{
            featureName=response[i].featureName;
          }
          if(response[i].featureActionName.length > 33){
            featureActionName=CommonUtilities.truncateStringWithGivenLength(response[i].featureActionName + "...", 34)
          }else{
            featureActionName=response[i].featureActionName;
          }
          var parsedResponse={
            "data":response[i],
            "requestId":kony.sdk.isNullOrUndefined(response[i].requestId)?"-":response[i].requestId,
            "featureActionId":kony.sdk.isNullOrUndefined(response[i].featureActionId)?"-":response[i].featureActionId,            
            "featureActionName":kony.sdk.isNullOrUndefined(response[i].featureActionName)?"-":response[i].featureActionName,
            "featureName":kony.sdk.isNullOrUndefined(response[i].featureName)?"-":response[i].featureName,
            "lblPaymentType":kony.sdk.isNullOrUndefined(response[i].featureName)?"-":featureName,
            "lblPaymentMode":kony.sdk.isNullOrUndefined(response[i].featureActionName)?"-":featureActionName,
            "limitGroupId":kony.sdk.isNullOrUndefined(response[i].limitGroupId)?"-":response[i].limitGroupId,
            "limitGroupName":kony.sdk.isNullOrUndefined(response[i].limitGroupName)?"-":response[i].limitGroupName,            
            "transactionId":kony.sdk.isNullOrUndefined(response[i].transactionId)?"-":response[i].transactionId,
            "contractId":kony.sdk.isNullOrUndefined(response[i].contractId)?"-":response[i].contractId,
            "companyId":kony.sdk.isNullOrUndefined(response[i].companyId)?"-":response[i].companyId,
            "accountId":kony.sdk.isNullOrUndefined(response[i].accountId)?"-":response[i].accountId,
            "imgStatus":statusImage,
            "status":response[i].status,
            "sentBy":kony.sdk.isNullOrUndefined(response[i].sentBy)?"-":response[i].sentBy,
            "lblName":kony.sdk.isNullOrUndefined(response[i].sentBy)?"-":response[i].sentBy,
            "amIApprover":kony.sdk.isNullOrUndefined(response[i].amIApprover)?"-":response[i].amIApprover,
            "amICreator":kony.sdk.isNullOrUndefined(response[i].amICreator)?"-":response[i].amICreator,
            "requiredApprovals":kony.sdk.isNullOrUndefined(response[i].requiredApprovals)?"-":response[i].requiredApprovals,
            "receivedApprovals":kony.sdk.isNullOrUndefined(response[i].receivedApprovals)?"-":response[i].receivedApprovals,
            "actedByMeAlready":kony.sdk.isNullOrUndefined(response[i].actedByMeAlready)?"-":response[i].actedByMeAlready,
            "requestType":kony.sdk.isNullOrUndefined(response[i].requestType)?"-":response[i].requestType,    
            
            //"processingDate":kony.sdk.isNullOrUndefined(response[i].processingDate)?"-":CommonUtilities.getFrontendDateString(response[i].processingDate,"mm/dd/yyyy"),
            //"sentDate":kony.sdk.isNullOrUndefined(response[i].sentDate)?"-":CommonUtilities.getFrontendDateString(response[i].sentDate,"mm/dd/yyyy"),
            //"lblDate":kony.sdk.isNullOrUndefined(approvalDate)?"-":CommonUtilities.getFrontendDateString(approvalDate,"mm/dd/yyyy"),
            //"approvalDate":kony.sdk.isNullOrUndefined(response[i].approvalDate)?"-":CommonUtilities.getFrontendDateString(response[i].approvalDate,"mm/dd/yyyy"),
            
            "processingDate":kony.sdk.isNullOrUndefined(response[i].processingDate)?"-":CommonUtilities.getDateAndTimeInUTC(response[i].processingDate),
            "sentDate":kony.sdk.isNullOrUndefined(response[i].sentDate)?"-":CommonUtilities.getDateAndTimeInUTC(response[i].sentDate),
            "lblDate":kony.sdk.isNullOrUndefined(approvalDate)?"-":CommonUtilities.getDateAndTimeInUTC(approvalDate),
            "approvalDate":kony.sdk.isNullOrUndefined(response[i].approvalDate)?"-":CommonUtilities.getDateAndTimeInUTC(response[i].approvalDate),
            
            "amount":configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(kony.sdk.isNullOrUndefined(response[i].amount)?response[i].transactionAmount:response[i].amount,true),
            "payee":kony.sdk.isNullOrUndefined(response[i].payee)?"-":response[i].payee,
            "frequency":kony.sdk.isNullOrUndefined(response[i].frequency)?"-":response[i].frequency,
            "recurrence":kony.sdk.isNullOrUndefined(response[i].recurrence)?"-":response[i].recurrence,
            "reference":kony.sdk.isNullOrUndefined(response[i].reference)?"-":response[i].reference,           
            "customerName":kony.sdk.isNullOrUndefined(response[i].customerName)?"-":response[i].customerName,
            "templateName":kony.sdk.isNullOrUndefined(response[i].templateName)?"-":response[i].templateName,
            "fileType":kony.sdk.isNullOrUndefined(response[i].fileType)?"-":response[i].fileType,
            "customerId":kony.sdk.isNullOrUndefined(response[i].customerId)?"-":response[i].customerId,
            "fileName":kony.sdk.isNullOrUndefined(response[i].fileName)?"-":response[i].fileName,
            "totalCreditAmount":kony.sdk.isNullOrUndefined(response[i].totalCreditAmount)?"-":response[i].totalCreditAmount,
            "numberOfCredits":kony.sdk.isNullOrUndefined(response[i].numberOfCredits)?"-":response[i].numberOfCredits,
            "numberOfDebits":kony.sdk.isNullOrUndefined(response[i].numberOfDebits)?"-":response[i].numberOfDebits,
            "numberOfPrenotes":kony.sdk.isNullOrUndefined(response[i].numberOfPrenotes)?"-":response[i].numberOfPrenotes,
            "numberOfRecords":kony.sdk.isNullOrUndefined(response[i].numberOfRecords)?"-":response[i].numberOfRecords,
            "confirmationNumber":kony.sdk.isNullOrUndefined(response[i].confirmationNumber)?"-":response[i].confirmationNumber,
          };
          setdataarray.push(parsedResponse);
        }
      }
      return(setdataarray);
    }catch(err){
      kony.print("err--"+err);
    }
  };
  ApprovalsReqUIModule_PresentationController.prototype.getRequestAllHistory = function (navObj) {
    try{
      var scopeObj = this;
      var approvalsReqManager = applicationManager.getApprovalsReqManager();
      approvalsReqManager.fetchAllMyRequestHistory(
        navObj,
        scopeObj.onFetchRequestAllHistorySuccess,
        scopeObj.onFetchRequestAllHistoryFailure,
      );
    }catch(e){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Exception in getRequestAllHistory"+e);}
  };

  ApprovalsReqUIModule_PresentationController.prototype.onFetchRequestAllHistorySuccess = function (responses) { 
    var proccessedResponse = ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForRequestHistory(responses);
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalHistory', true);
    viewController.fetchRequestHistorySuccesscallback(proccessedResponse);
  };
  ApprovalsReqUIModule_PresentationController.prototype.onFetchRequestAllHistoryFailure = function( error ){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalHistory', true);
    viewController.errorCallback(error);
  };
  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForRequestHistory = function (responsedata ) { 
    try{     
      var setdataarray=[];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      var response = responsedata.records;
      if(Array.isArray(response)){
        for(var i=0;i<response.length;i++){ 
          var statusImage;
          if(response[i].status === "Approved" || response[i].status === "approved") {
            statusImage = "approval.png"
          }
          else if(response[i].status === "Pending" || response[i].status === "pending") {
            statusImage = "pending.png"
          } else if(response[i].status === "Rejected" || response[i].status === "rejected") {
            statusImage = "reject.png"
          }
          else{
            statusImage = "withdrawn.png"
          }
          var sentDate = response[i].sentDate;
          sentDate = sentDate.split('T')[0];
          var featureName;
          var featureActionName;
          if(response[i].featureName.length > 53){
            featureName=CommonUtilities.truncateStringWithGivenLength(response[i].featureName + "...", 53);
          }else{
            featureName=response[i].featureName;
          }
          if(response[i].featureActionName.length > 33){
            featureActionName=CommonUtilities.truncateStringWithGivenLength(response[i].featureActionName + "...", 34)
          }else{
            featureActionName=response[i].featureActionName;
          }
          var parsedResponse={
            "data":response[i],
            "requestId":kony.sdk.isNullOrUndefined(response[i].requestId)?"-":response[i].requestId,
            "featureActionId":kony.sdk.isNullOrUndefined(response[i].featureActionId)?"-":response[i].featureActionId,            
            "featureActionName":kony.sdk.isNullOrUndefined(response[i].featureActionName)?"-":response[i].featureActionName,
            "featureName":kony.sdk.isNullOrUndefined(response[i].featureName)?"-":response[i].featureName,
            "lblPaymentType":kony.sdk.isNullOrUndefined(response[i].featureName)?"-":featureName,
            "lblPaymentMode":kony.sdk.isNullOrUndefined(response[i].featureActionName)?"-":featureActionName,
            "limitGroupId":kony.sdk.isNullOrUndefined(response[i].limitGroupId)?"-":response[i].limitGroupId,
            "limitGroupName":kony.sdk.isNullOrUndefined(response[i].limitGroupName)?"-":response[i].limitGroupName,            
            "transactionId":kony.sdk.isNullOrUndefined(response[i].transactionId)?"-":response[i].transactionId,
            "contractId":kony.sdk.isNullOrUndefined(response[i].contractId)?"-":response[i].contractId,
            "companyId":kony.sdk.isNullOrUndefined(response[i].companyId)?"-":response[i].companyId,
            "accountId":kony.sdk.isNullOrUndefined(response[i].accountId)?"-":response[i].accountId,
            "imgStatus":statusImage,
            "status":response[i].status,
            "sentBy":kony.sdk.isNullOrUndefined(response[i].sentBy)?"-":response[i].sentBy,
            "lblName":{isVisible:false},
            "amIApprover":kony.sdk.isNullOrUndefined(response[i].amIApprover)?"-":response[i].amIApprover,
            "amICreator":kony.sdk.isNullOrUndefined(response[i].amICreator)?"-":response[i].amICreator,
            "requiredApprovals":kony.sdk.isNullOrUndefined(response[i].requiredApprovals)?"-":response[i].requiredApprovals,
            "receivedApprovals":kony.sdk.isNullOrUndefined(response[i].receivedApprovals)?"-":response[i].receivedApprovals,
            "actedByMeAlready":kony.sdk.isNullOrUndefined(response[i].actedByMeAlready)?"-":response[i].actedByMeAlready,
            "requestType":kony.sdk.isNullOrUndefined(response[i].requestType)?"-":response[i].requestType,            
            "processingDate":kony.sdk.isNullOrUndefined(response[i].processingDate)?"-":CommonUtilities.getFrontendDateString(response[i].processingDate,"mm/dd/yyyy"),
            "sentDate":kony.sdk.isNullOrUndefined(response[i].sentDate)?"-":CommonUtilities.getFrontendDateString(response[i].sentDate,"mm/dd/yyyy"),
            "lblDate":kony.sdk.isNullOrUndefined(sentDate)?"-":CommonUtilities.getFrontendDateString(sentDate,"mm/dd/yyyy"),
            "amount":configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(kony.sdk.isNullOrUndefined(response[i].amount) ? response[i].transactionAmount : response[i].amount,true),
            "payee":kony.sdk.isNullOrUndefined(response[i].payee)?"-":response[i].payee,
            "frequency":kony.sdk.isNullOrUndefined(response[i].frequency)?"-":response[i].frequency,
            "recurrence":kony.sdk.isNullOrUndefined(response[i].recurrence)?"-":response[i].recurrence,
            "reference":kony.sdk.isNullOrUndefined(response[i].reference)?"-":response[i].reference,           
            "customerName":kony.sdk.isNullOrUndefined(response[i].customerName)?"-":response[i].customerName,
            "templateName":kony.sdk.isNullOrUndefined(response[i].templateName)?"-":response[i].templateName,
            "fileType":kony.sdk.isNullOrUndefined(response[i].fileType)?"-":response[i].fileType,
            "customerId":kony.sdk.isNullOrUndefined(response[i].customerId)?"-":response[i].customerId,
            "fileName":kony.sdk.isNullOrUndefined(response[i].fileName)?"-":response[i].fileName,
            "totalCreditAmount":kony.sdk.isNullOrUndefined(response[i].totalCreditAmount)?"-":response[i].totalCreditAmount,
            "numberOfCredits":kony.sdk.isNullOrUndefined(response[i].numberOfCredits)?"-":response[i].numberOfCredits,
            "numberOfDebits":kony.sdk.isNullOrUndefined(response[i].numberOfDebits)?"-":response[i].numberOfDebits,
            "numberOfPrenotes":kony.sdk.isNullOrUndefined(response[i].numberOfPrenotes)?"-":response[i].numberOfPrenotes,
            "numberOfRecords":kony.sdk.isNullOrUndefined(response[i].numberOfRecords)?"-":response[i].numberOfRecords,
            "confirmationNumber":kony.sdk.isNullOrUndefined(response[i].confirmationNumber)?"-":response[i].confirmationNumber,
          };
          setdataarray.push(parsedResponse);
        }
      }
      return(setdataarray);
    }catch(err){
      kony.print("err--"+err);
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.renotifyPendingApprovalrequest = function(navObject){
    var scopeObj = applicationManager.getApprovalsReqManager();
    var ApprovalReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqManager').businessController;
    ApprovalReqModule.renotifyPendingApprovalRequest(navObject.requestData,this.renotifyPendingApprovalrequestSuccess,this.renotifyPendingApprovalrequestFailure);
  };



  ApprovalsReqUIModule_PresentationController.prototype.renotifyPendingApprovalrequestSuccess = function (response) {
    try{  
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmPendingApprovers', true);
      viewController.renotifyPendingApprovalrequestSuccessMB(response);
    }catch(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("err--"+err);
    }
  };



  ApprovalsReqUIModule_PresentationController.prototype.renotifyPendingApprovalrequestFailure = function (responseError) {
    try{ 
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmPendingApprovers', true);
      viewController.errorCallback(error);
    }catch(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("err--"+err);
    }
  }

  ApprovalsReqUIModule_PresentationController.prototype.setFilters = function(response) {
    var status = 0;
    if(kony.sdk.isNullOrUndefined(response)) response = "";
    try {
      this.filtersForCounts = response;
    }
    catch(err){
      status = -1;
    }
    return status;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getFilters = function() {
    if(kony.sdk.isNullOrUndefined(this.filtersForCounts)) this.filtersForCounts = "";
    return this.filtersForCounts;
  };

  ApprovalsReqUIModule_PresentationController.prototype.setFiltersbyStatus = function(response) {
    var status = 0;
    if(kony.sdk.isNullOrUndefined(response)) response = "";
    try {
      this.filtersForStatus = response;
    }
    catch(err){
      status = -1;
    }
    return status;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getFiltersbyStatus = function() {
    if(kony.sdk.isNullOrUndefined(this.filtersForStatus)) this.filtersForStatus = "";
    return this.filtersForStatus;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getFiltersbyDuration = function() {
    if(kony.sdk.isNullOrUndefined(this.filtersForDuration)) this.filtersForDuration = "";
    return this.filtersForDuration;
  };

  ApprovalsReqUIModule_PresentationController.prototype.setFiltersbyDuration = function(response) {
    var status = 0;
    if(kony.sdk.isNullOrUndefined(response)) response = "";
    try {
      this.filtersForDuration = response;
    }
    catch(err){
      status = -1;
    }
    return status;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getFiltersbySort = function() {
    if(kony.sdk.isNullOrUndefined(this.filtersForsort)) this.filtersForsort = "";
    return this.filtersForsort;
  };

  ApprovalsReqUIModule_PresentationController.prototype.setFiltersbySort = function(response) {
    var status = 0;
    if(kony.sdk.isNullOrUndefined(response)) response = "";
    try {
      this.filtersForsort = response;
    }
    catch(err){
      status = -1;
    }
    return status;
  };

  ApprovalsReqUIModule_PresentationController.prototype.fetchCounts = function (params,presentationSuccessCallback, presentationFailureCallback) {
    var CountsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Counts");
    //ACHFilesApprovalsModel.getAll(getAllCompletionCallback);
    CountsModel.customVerb("getCounts",params, getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj.data);
      } else {
        presentationFailureCallback(obj.errmsg);
      }
    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.getAllCounts = function (originFormName) {
    var scopeObj = this;
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var localestr =  locale.replace("_", "-");
    var params = {"languageCode": localestr};
    //var params = {"languageCode": kony.i18n.getCurrentLocale().replace("_", "-")};
    this.hasCountsServiceFailed = -1;
    scopeObj.ApprovalsReqManager = applicationManager.getApprovalsReqManager();
    var ApprovalsReqUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ApprovalsReqManager", "appName" : "ApprovalRequestMA"}).businessController;
    ApprovalsReqUIModule.fetchCounts(params,scopeObj.getAllCountsSuccess.bind(scopeObj),scopeObj.getAllCountsFailure.bind(scopeObj));
  };

  ApprovalsReqUIModule_PresentationController.prototype.getAllCountsSuccess = function(response) {
    var data = response;
    var data2 = response;
    this.featureActionNames = this.getCountsbyFeatureName(data2);
    if(!kony.sdk.isNullOrUndefined(data["records"]))
      data=data["records"];
    var i, k, datagroup = [],
        datafeatureActions = [],
        datafeatureAction;
    var singleApprovalsPendingCounts = 0,
        singleApprovalsHistoryCounts = 0,
        singleRequestsPendingCounts = 0,
        singleRequestsHistoryCounts = 0;
    var bulkApprovalsPendingCounts = 0,
        bulkApprovalsHistoryCounts = 0,
        bulkRequestsPendingCounts = 0,
        bulkRequestsHistoryCounts = 0;
    var otherApprovalsPendingCounts = 0,
        otherApprovalsHistoryCounts = 0,
        otherRequestsPendingCounts = 0,
        otherRequestsHistoryCounts = 0;
    var sameBank = 0;
    this.selectedAccount = "";
    this.selectedAccountBank = "";
    this.selectedAccountBalance = "";
    this.selectedAccountBankDone = false;
    this.singleApprovalsPending = [];
    this.singleApprovalsHistory = [];
    this.singleRequestsPending = [];
    this.singleRequestsHistory = [];
    this.bulkApprovalsPending = [];
    this.bulkApprovalsHistory = [];
    this.bulkRequestsPending = [];
    this.bulkRequestsHistory = [];
    this.otherApprovalsPending = [];
    this.otherApprovalsHistory = [];
    this.otherRequestsPending = [];
    this.otherRequestsHistory = [];
    this.sameBankCount = 0;
    if (data.length === 0) return;
    for (i = 0; i < data.length; i++) {
      datagroup = data[i];
      if(kony.sdk.isNullOrUndefined(datagroup)) continue;
      if(kony.sdk.isNullOrUndefined(datagroup["limitgroupId"])) continue;
      if (datagroup["limitgroupId"] === "SINGLE" || datagroup["limitgroupId"] === "SINGLE_PAYMENT" || datagroup["limitgroupId"] === "SINGLE_PAYMENT" || datagroup["limitgroupId"] === "ACCOUNT_TO_ACCOUNT") {
        datafeatureActions = datagroup["featureActions"];
        if(kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
        for (k = 0; k < datafeatureActions.length; k++) {
          datafeatureAction = datafeatureActions[k];
          if(kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
          singleApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
          singleApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
          singleRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
          singleRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);
          if (datafeatureAction["myApprovalsPending"] != 0) {
            this.singleApprovalsPending.push({
              "lblSeperator": "-",
              "imgSelect": {"src":"transparent.png"},
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureName"]+" (" + datafeatureAction["myApprovalsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myApprovalsPending"] + ")"
            });
          }
          if (datafeatureAction["myApprovalsHistory"] != 0) {
            this.singleApprovalsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureName"],
              "lblCounter": "(" + datafeatureAction["myApprovalsHistory"] + ")"
            });
          }
          if (datafeatureAction["myRequestsPending"] != 0) {
            this.singleRequestsPending.push({
              "lblSeperator": "-",
              "imgSelect": {"src":"transparent.png"},
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureName"]+" (" + datafeatureAction["myRequestsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myRequestsPending"] + ")"
            });
          }
          if (datafeatureAction["myRequestHistory"] != 0) {
            this.singleRequestsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureName"],
              "lblCounter": "(" + datafeatureAction["myRequestHistory"] + ")"
            });
          }
        }
      }
      if (datagroup["limitgroupId"] === "BULK" ||datagroup["limitgroupId"] === "BULK_PAYMENT") {
        datafeatureActions = datagroup["featureActions"];
        if(kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
        for (k = 0; k < datafeatureActions.length; k++) {
          datafeatureAction = datafeatureActions[k];
          if(kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
          bulkApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
          bulkApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
          bulkRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
          bulkRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);
          if (datafeatureAction["myApprovalsPending"] != 0) {
            this.bulkApprovalsPending.push({
              "lblSeperator": "-",
              "imgSelect": {"src":"transparent.png"},
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myApprovalsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myApprovalsPending"] + ")"
            });
          }
          if (datafeatureAction["myApprovalsHistory"] != 0) {
            this.bulkApprovalsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myApprovalsHistory"] + ")"
            });
          }
          if (datafeatureAction["myRequestsPending"] != 0) {
            this.bulkRequestsPending.push({
              "lblSeperator": "-",
              "imgSelect":{"src": "transparent.png"} ,
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myRequestsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myRequestsPending"] + ")"
            });
          }
          if (datafeatureAction["myRequestHistory"] != 0) {
            this.bulkRequestsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myRequestHistory"] + ")"
            });
          }
        }
      }
      if (datagroup["limitgroupId"] === "OTHER") {
        datafeatureActions = datagroup["featureActions"];
        if(kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
        for (k = 0; k < datafeatureActions.length; k++) {
          datafeatureAction = datafeatureActions[k];
          if(kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
          otherApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
          otherApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
          otherRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
          otherRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);
          if (datafeatureAction["myApprovalsPending"] != 0) {
            this.otherApprovalsPending.push({
              "lblSeperator": "-",
              "imgSelect": {"src":"transparent.png"},
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myApprovalsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myApprovalsPending"] + ")"
            });
          }
          if (datafeatureAction["myApprovalsHistory"] != 0) {
            this.otherApprovalsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myApprovalsHistory"] + ")"
            });
          }
          if (datafeatureAction["myRequestsPending"] != 0) {
            this.otherRequestsPending.push({
              "lblSeperator": "-",
              "imgSelect": {"src":"transparent.png"},
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myRequestsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myRequestsPending"] + ")"
            });
          }
          if (datafeatureAction["myRequestHistory"] != 0) {
            this.otherRequestsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myRequestHistory"] + ")"
            });
          }
        }
      }
      if (!kony.sdk.isNullOrUndefined(datagroup["featureActions"])) {
        datafeatureActions = datagroup["featureActions"];
        if(kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
        for (k = 0; k < datafeatureActions.length; k++) {
          datafeatureAction = datafeatureActions[k];
          if(kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
          if(!kony.sdk.isNullOrUndefined(datafeatureAction["featureActionName"])) {
            var featurename = datafeatureAction["featureActionName"];
            if(featurename.toLowerCase().indexOf("same") !== -1)
              if(featurename.toLowerCase().indexOf("bank") !== -1)
                sameBank++;
          }
        }
      }
      if (datagroup["limitgroupId"] !== "SINGLE_PAYMENT" && datagroup["limitgroupId"] !== "BULK_PAYMENT" && datagroup["limitgroupId"] !== "OTHER") {
        datafeatureActions = datagroup["featureActions"];
        if(kony.sdk.isNullOrUndefined(datafeatureActions)) continue;
        for (k = 0; k < datafeatureActions.length; k++) {
          datafeatureAction = datafeatureActions[k];
          if(kony.sdk.isNullOrUndefined(datafeatureAction)) continue;
          otherApprovalsPendingCounts += parseInt(datafeatureAction["myApprovalsPending"]);
          otherApprovalsHistoryCounts += parseInt(datafeatureAction["myApprovalsHistory"]);
          otherRequestsPendingCounts += parseInt(datafeatureAction["myRequestsPending"]);
          otherRequestsHistoryCounts += parseInt(datafeatureAction["myRequestHistory"]);
          if (datafeatureAction["myApprovalsPending"] != 0) {
            this.otherApprovalsPending.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myApprovalsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myApprovalsPending"] + ")"
            });
          }
          if (datafeatureAction["myApprovalsHistory"] != 0) {
            this.otherApprovalsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myApprovalsHistory"] + ")"
            });
          }
          if (datafeatureAction["myRequestsPending"] != 0) {
            this.otherRequestsPending.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"]+" (" + datafeatureAction["myRequestsPending"] + ")",
              //"lblCounter": "(" + datafeatureAction["myRequestsPending"] + ")"
            });
          }
          if (datafeatureAction["myRequestHistory"] != 0) {
            this.otherRequestsHistory.push({
              "lblSeperator": "-",
              "imgSelect": "transparent.png",
              "flxText": { "isVisible": true },
              "lblText": datafeatureAction["featureActionName"],
              "lblCounter": "(" + datafeatureAction["myRequestHistory"] + ")"
            });
          }
        }
      }
    }
    this.allApprovalsPendingCount = singleApprovalsPendingCounts + bulkApprovalsPendingCounts + otherApprovalsPendingCounts + singleApprovalsHistoryCounts +bulkApprovalsHistoryCounts;
    this.allApprovalsPendingCounts = singleApprovalsPendingCounts + bulkApprovalsPendingCounts + otherApprovalsPendingCounts; //+ singleApprovalsHistoryCounts +bulkApprovalsHistoryCounts;
    this.allApprovalsHistoryCount = singleApprovalsHistoryCounts + bulkApprovalsHistoryCounts + otherApprovalsHistoryCounts;
    this.allRequestsPendingCount = singleRequestsPendingCounts + bulkRequestsPendingCounts + otherRequestsPendingCounts + singleRequestsHistoryCounts + bulkRequestsHistoryCounts;
    this.allRequestsPendingCounts = singleRequestsPendingCounts + bulkRequestsPendingCounts + otherRequestsPendingCounts; //+ singleRequestsHistoryCounts + bulkRequestsHistoryCounts;
    this.allRequestsHistoryCount = singleRequestsHistoryCounts + bulkRequestsHistoryCounts + otherRequestsHistoryCounts;
    this.singleApprovalsPendingCount = singleApprovalsPendingCounts ;//+ singleApprovalsHistoryCounts;
    this.singleApprovalsHistoryCount = singleApprovalsHistoryCounts;
    this.singleRequestsPendingCount = singleRequestsPendingCounts ;// + singleRequestsHistoryCounts;
    this.singleRequestsHistoryCount = singleRequestsHistoryCounts;
    this.bulkApprovalsPendingCount = bulkApprovalsPendingCounts; // + bulkApprovalsHistoryCounts;
    this.bulkApprovalsHistoryCount = bulkApprovalsHistoryCounts;
    this.bulkRequestsPendingCount = bulkRequestsPendingCounts ;//+ bulkRequestsHistoryCounts;
    this.bulkRequestsHistoryCount = bulkRequestsHistoryCounts;
    this.otherApprovalsPendingCount = otherApprovalsPendingCounts;
    this.otherApprovalsHistoryCount = otherApprovalsHistoryCounts;
    this.otherRequestsPendingCount = otherRequestsPendingCounts;
    this.otherRequestsHistoryCount = otherRequestsHistoryCounts;
    this.isSingleApprovalsPendingAvailable = (singleApprovalsPendingCounts>0)? true: false;
    this.isSingleApprovalsHistoryAvailable = (singleApprovalsHistoryCounts>0)? true: false;
    this.isSingleRequestsPendingAvailable = (singleRequestsPendingCounts>0)? true: false;
    this.isSingleRequestsHistoryAvailable = (singleRequestsHistoryCounts>0)? true: false;
    this.isBulkApprovalsPendingAvailable = (bulkApprovalsPendingCounts>0)? true: false;
    this.isBulkApprovalsHistoryAvailable = (bulkApprovalsHistoryCounts>0)? true: false;
    this.isBulkRequestsPendingAvailable = (bulkRequestsPendingCounts>0)? true: false;
    this.isBulkRequestsHistoryAvailable = (bulkRequestsHistoryCounts>0)? true: false;
    this.isOtherApprovalsPendingAvailable = (otherApprovalsPendingCounts>0)? true: false;
    this.isOtherApprovalsHistoryAvailable = (otherApprovalsHistoryCounts>0)? true: false;
    this.isOtherRequestsPendingAvailable = (otherRequestsPendingCounts>0)? true: false;
    this.isOtherRequestsHistoryAvailable = (otherRequestsHistoryCounts>0)? true: false;
    this.hasCountsServiceFailed = 0;
    this.sameBankCount = sameBank;

    var configManager = applicationManager.getConfigurationManager();
    var currentForm=kony.application.getCurrentForm();
    if(configManager.isMicroAppPresent("HomepageMA")  && currentForm.id == 'frmUnifiedDashboard')
    {
      var metaObj = {"appName" : "HomepageMA", "friendlyName" : "frmUnifiedDashboard"};
      var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard',true,metaObj);
      try {
        this.approvalsAndRequestDashboard(response);
      } catch (e) {}
      try {
        viewController.getCountsSuccessCB(this.singleApprovalsPendingCount, this.bulkApprovalsPendingCount, this.otherApprovalsPendingCount, this.singleRequestsPendingCount, this.bulkRequestsPendingCount, this.otherRequestsPendingCount, this.featureActionNames, this.sameBankCount, this.requestsArray, this.approvalArray);
      } catch (e) {}
    }
  };
  ApprovalsReqUIModule_PresentationController.prototype.approvalsAndRequestDashboard = function(response) {
    var data = response;
    var i;
    var j;
    var datagroup;
    var limitgroupName;
    var featureActions;
    var request = {};
    var approvals = {};
    var approvalsCounter;
    var requestsCounter;
    var requestArray = [];
    var approvalsArray = [];
    var totalApprovals = 0;
    var totalRequests = 0;
    for (i = 0; i < data.length; i++) {
      datagroup = data[i];
      if (kony.sdk.isNullOrUndefined(datagroup)) continue;
      if (kony.sdk.isNullOrUndefined(datagroup["limitgroupName"])) continue;
      if (kony.sdk.isNullOrUndefined(datagroup["featureActions"])) continue;
      limitgroupName = datagroup["limitgroupName"];
      featureActions = datagroup["featureActions"];
      request = {
        "lblSpendingCategory": limitgroupName,
        "lblTotalAmount": 0,
        "flxSeperator": {
          "isVisible": true
        }
      };
      approvals = {
        "lblSpendingCategory": limitgroupName,
        "lblTotalAmount": 0,
        "flxSeperator": {
          "isVisible": true
        }
      };
      requestsCounter = 0;
      approvalsCounter = 0;
      if (featureActions.length === 0) {
        request["lblTotalAmount"] = "0";
        approvals["lblTotalAmount"] = "0";
      } else {
        for (j = 0; j < featureActions.length; j++) {
          if (kony.sdk.isNullOrUndefined(featureActions[j])) continue;
          if (!kony.sdk.isNullOrUndefined(featureActions[j]["myApprovalsPending"])) {
            var temp = parseInt(featureActions[j]["myApprovalsPending"]);
            approvalsCounter = approvalsCounter + temp;
          }
          if (!kony.sdk.isNullOrUndefined(featureActions[j]["myRequestsPending"])) {
            var temp1 = parseInt(featureActions[j]["myRequestsPending"]);
            requestsCounter = requestsCounter + temp1;
          }
        }
        request["lblTotalAmount"] = "" + requestsCounter;
        approvals["lblTotalAmount"] = "" + approvalsCounter;
        totalApprovals = totalApprovals + approvalsCounter;
        totalRequests = totalRequests + requestsCounter;
      }
      requestArray.push(CommonUtilities.cloneJSON(request));
      approvalsArray.push(CommonUtilities.cloneJSON(approvals));
    }
    this.requestsArray = CommonUtilities.cloneJSON(requestArray);
    this.approvalArray = CommonUtilities.cloneJSON(approvalsArray);
    this.totalApprovals = totalApprovals;
    this.totalRequests = totalRequests;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getAllCountsFailure = function() {
    this.singleApprovalsPending = [];
    this.singleApprovalsHistory = [];
    this.singleRequestsPending = [];
    this.singleRequestsHistory = [];
    this.bulkApprovalsPending = [];
    this.bulkApprovalsHistory = [];
    this.bulkRequestsPending = [];
    this.bulkRequestsHistory = [];
    this.otherApprovalsPending = [];
    this.otherApprovalsHistory = [];
    this.otherRequestsPending = [];
    this.otherRequestsHistory = [];
    this.allApprovalsPendingCount = 0;
    this.allApprovalsPendingCounts = 0;
    this.allApprovalsHistoryCount = 0;
    this.allRequestsPendingCount = 0;
    this.allRequestsPendingCounts = 0;
    this.allRequestsHistoryCount = 0;
    this.isSingleApprovalsPendingAvailable = false;
    this.isSingleApprovalsHistoryAvailable = false;
    this.isSingleRequestsPendingAvailable = false;
    this.isSingleRequestsHistoryAvailable = false;
    this.isBulkApprovalsPendingAvailable = false;
    this.isBulkApprovalsHistoryAvailable = false;
    this.isBulkRequestsPendingAvailable = false;
    this.isBulkRequestsHistoryAvailable = false;
    this.isOtherApprovalsPendingAvailable = false;
    this.isOtherApprovalsHistoryAvailable = false;
    this.isOtherRequestsPendingAvailable = false;
    this.isOtherRequestsHistoryAvailable = false;
    this.singleApprovalsPendingCount = 0;
    this.singleApprovalsHistoryCount = 0;
    this.singleRequestsPendingCount = 0;
    this.singleRequestsHistoryCount = 0;
    this.bulkApprovalsPendingCount = 0;
    this.bulkApprovalsHistoryCount = 0;
    this.bulkRequestsPendingCount = 0;
    this.bulkRequestsHistoryCount = 0;
    this.otherApprovalsPendingCount = 0;
    this.otherApprovalsHistoryCount = 0;
    this.otherRequestsPendingCount = 0;
    this.otherRequestsHistoryCount = 0;
    this.hasCountsServiceFailed = 1;
    this.sameBankCount = 0;
    this.selectedAccount = "";
    this.selectedAccountBank = "";
    this.selectedAccountBalance = "";
    this.selectedAccountBankDone = false;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getCountsbyFeatureName = function(data) {
    if (data.length === 0) return;
    var datagroup ;
    var datafeatureActions;
    var datafeatureAction;
    var featureActionNames = {};
    var featureActionName;
    var myApprovalsPending ;
    var myRequestsPending ;
    var json = {};
    for (i = 0; i < data.length; i++) {
      datagroup = data[i];
      if (kony.sdk.isNullOrUndefined(datagroup)) continue;
      if (kony.sdk.isNullOrUndefined(datagroup["limitgroupId"])) continue;

      if (datagroup["limitgroupId"] === "SINGLE" || datagroup["limitgroupId"] === "SINGLE_PAYMENT" || datagroup["limitgroupId"] === "SINGLE_PAYMENT" || datagroup["limitgroupId"] === "ACCOUNT_TO_ACCOUNT") {
        datafeatureActions = datagroup["featureActions"];
        for (var k = 0; k < datafeatureActions.length; k++) {
          if (kony.sdk.isNullOrUndefined(featureActionNames[datafeatureActions[k].featureActionId])) {
            featureActionName = datafeatureActions[k].featureActionName;
            myApprovalsPending = datafeatureActions[k].myApprovalsPending;
            myRequestsPending = datafeatureActions[k].myRequestsPending;
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId] = Array(json);
          } else {
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId].push(json);
          }
        }
      }
      if (datagroup["limitgroupId"] === "BULK" || datagroup["limitgroupId"] === "BULK_PAYMENT") {
        datafeatureActions = datagroup["featureActions"];
        for (var k = 0; k < datafeatureActions.length; k++) {
          if (kony.sdk.isNullOrUndefined(featureActionNames[datafeatureActions[k].featureActionId])) {
            featureActionName = datafeatureActions[k].featureActionName;
            myApprovalsPending = datafeatureActions[k].myApprovalsPending;
            myRequestsPending = datafeatureActions[k].myRequestsPending;
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId] = Array(json);
          } else {
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId].push(json);
          }
        }

      }
      if (datagroup["limitgroupId"] === "OTHER") {
        datafeatureActions = datagroup["featureActions"];
        for (var k = 0; k < datafeatureActions.length; k++) {
          if (kony.sdk.isNullOrUndefined(featureActionNames[datafeatureActions[k].featureActionId])) {
            featureActionName = datafeatureActions[k].featureActionName;
            myApprovalsPending = datafeatureActions[k].myApprovalsPending;
            myRequestsPending = datafeatureActions[k].myRequestsPending;
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId] = Array(json);
          } else {
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId].push(json);
          }
        }

      }

      if (datagroup["limitgroupId"] !== "SINGLE_PAYMENT" && datagroup["limitgroupId"] !== "BULK_PAYMENT" && datagroup["limitgroupId"] !== "OTHER") {
        datafeatureActions = datagroup["featureActions"];
        for (var k = 0; k < datafeatureActions.length; k++) {
          if (kony.sdk.isNullOrUndefined(featureActionNames[datafeatureActions[k].featureActionId])) {
            featureActionName = datafeatureActions[k].featureActionName;
            myApprovalsPending = datafeatureActions[k].myApprovalsPending;
            myRequestsPending = datafeatureActions[k].myRequestsPending;
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId] = Array(json);
          } else {
            json = {
              "featureActionName":featureActionName,
              "myApprovalsPending":myApprovalsPending,
              "myRequestsPending":myRequestsPending
            }
            featureActionNames[datafeatureActions[k].featureActionId].push(json);
          }
        }
      }
    }
    return featureActionNames;
  };

  ApprovalsReqUIModule_PresentationController.prototype.getDestinationAccountsRecords = function( navObject ) {
    var scopeObj = this;
    var ApprovalReqModule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ApprovalsReqManager').businessController;
    ApprovalReqModule.fetchACHTransactionRecords(
      navObject.requestData,
      scopeObj.getDestinationAccountsRecordsSuccess,
      scopeObj.getDestinationAccountsRecordsFailure,
    );
  };
  ApprovalsReqUIModule_PresentationController.prototype.getDestinationAccountsRecordsSuccess = function (response) {
    try
    {
      var navManager = applicationManager.getNavigationManager();
      var subRecordsMap = [];
      var isDone = false;
      var isValid = false;
      var navManager = applicationManager.getNavigationManager();
      var successCallSubrecord = function(TransactionRecord_id, subrecords) {
        if(subrecords === null || subrecords === [] || subrecords === undefined)
          subRecordsMap[TransactionRecord_id] = [];
        else
          subRecordsMap[TransactionRecord_id] = subrecords;

        for (var subrecord in subRecordsMap) {
          if(subRecordsMap[subrecord] === null) {
            isDone = false;
            break;
          }
          isDone = true;
        }

        if(isDone === true) {
          for (var subRecord in subRecordsMap) {
            if (subRecordsMap[subRecord] === "error") {
              isValid = false;
              break;
            }
            isValid = true;
          }
          if (isValid === true) { 
            response.forEach(function(obj) {
              if (obj.TransactionRecord_id) {
                obj.taxSubType = subRecordsMap[obj.TransactionRecord_id][0].taxSubType;
                obj.TaxSubCategory_id = subRecordsMap[obj.TransactionRecord_id][0].TaxSubCategory_id;
                obj.TranscationSubRecord_id = subRecordsMap[obj.TransactionRecord_id][0].TranscationSubRecord_id;
                obj.Amount = CommonUtilities.formatCurrencyWithCommas(subRecordsMap[obj.TransactionRecord_id][0].Amount,true);
              }
              var proccessedResponse = PresentationController.prototype.dataProcessorForDestinationSubAccnts(response);
              
              var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
              try{
                if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew' || navManager.stack[navManager.stack.length-1]==='frmApprovalsTransactionDetailNew') {
                  viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
                }
                else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement' || navManager.stack[navManager.stack.length-1]==='frmApprovalsAcknowledgement'){
                  viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);
          
                }
              }catch(err){}
              viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);

            });

          } 
          else {
            var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
            try{
              if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew' || navManager.stack[navManager.stack.length-1]==='frmApprovalsTransactionDetailNew') {
                viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
              }
              else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement' || navManager.stack[navManager.stack.length-1]==='frmApprovalsAcknowledgement'){
                viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);
        
              }
            }catch(err){}
            viewController.fetchErrorBack(response);
          }
        }
      };

      var failureCallSubrecord = function(TransactionRecord_id) {
        subRecordsMap[TransactionRecord_id] = "error";
        var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
        try{
          if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew' || navManager.stack[navManager.stack.length-1]==='frmApprovalsTransactionDetailNew') {
            viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
          }
          else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement' || navManager.stack[navManager.stack.length-1]==='frmApprovalsAcknowledgement'){
            viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);
    
          }
        }catch(err){}
        viewController.fetchErrorBack(response);
      };

      var scopeObj=this;
      if(!kony.sdk.isNullOrUndefined(response)){
        response.forEach(function(obj) {
          if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
            subRecordsMap[obj.TransactionRecord_id] = null;
          }
        });
        //for federal tax record need to call getACHTransactionSubRecords
        if(Object.keys(subRecordsMap).length !== 0) {
          response.forEach(function(obj) {
            if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
              ApprovalsReqUIModule_PresentationController.prototype.getACHTransactionSubRecords(obj.TransactionRecord_id, 
                                                                                                successCallSubrecord.bind(scopeObj,obj.TransactionRecord_id),
                                                                                                failureCallSubrecord.bind(scopeObj,obj.TransactionRecord_id));
            }
          });
        }
        else
        {
          var proccessedResponse = ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForDestinationAccnts(response);
          var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
          try{
            if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew' || navManager.stack[navManager.stack.length-1]==='frmApprovalsTransactionDetailNew') {
              viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
            }
            else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement' || navManager.stack[navManager.stack.length-1]==='frmApprovalsAcknowledgement'){
              viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);
      
            }
          }catch(err){}
          viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);
        }
      }
    }
    catch(err)
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.print("Error in getDestinationAccountsRecordsSuccess"+err);
    }
  };
  ApprovalsReqUIModule_PresentationController.prototype.getDestinationAccountsRecordsFailure = function (response) {
    var viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetail', true);
    try{
      if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsTransactionDetailNew') {
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsTransactionDetailNew', true);
      }
      else if(navManager.stack[navManager.stack.length-1]==='ApprovalsReqUIModule/frmApprovalsAcknowledgement'){
        viewController = applicationManager.getPresentationUtility().getController('ApprovalsReqUIModule/frmApprovalsAcknowledgement', true);

      }
    }catch(err){}
    viewController.fetchErrorBack(response);
  };
  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForDestinationAccnts = function(response){
    try{
      var templateData=[];
      var jsonData;
      if(!kony.sdk.isNullOrUndefined(response)){
        if(Array.isArray(response)){
          if(response.length > 0){
            for(var i = 0; i < response.length;i++){
              if(i !== (response.length) -1 ){
                jsonData={
                  "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].Record_Name)?"-":response[i].Record_Name,
                  "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].ToAccountNumber)?"-":response[i].ToAccountNumber,
                  "lblAmount":kony.sdk.isNullOrUndefined(response[i].Amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].Amount),
                  "flxSep":{isVisible:true},
                  "flxSeperatorTrans4":{isVisible:false},
                };
              }else{
                jsonData={
                  "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].Record_Name)?"-":response[i].Record_Name,
                  "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].ToAccountNumber)?"-":response[i].ToAccountNumber,
                  "lblAmount":kony.sdk.isNullOrUndefined(response[i].Amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].Amount),
                  "flxSep":{isVisible:false},
                  "flxSeperatorTrans4":{isVisible:false},
                };
              }
              templateData.push(jsonData);
            }
          }
        }
      }
      return  templateData;
    }catch(er){

    }
  };

  ApprovalsReqUIModule_PresentationController.prototype.dataProcessorForDestinationSubAccnts = function(response){
    try{
      var jsonData;
      var templateData=[];
      if(Array.isArray(response)){
        if(response.length > 0){
          for(var i = 0; i < response.length;i++){
            if(i !== (response.length) -1 ){
              jsonData={
                "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].TaxType)?"-":response[i].TaxType,
                "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].ToAccountNumber)?"-":response[i].ToAccountNumber,
                "lblAmount":kony.sdk.isNullOrUndefined(response[i].Amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].Amount),
                "flxSep":{isVisible:true},
                "flxSeperatorTrans4":{isVisible:false},
              };
            }else{
              jsonData={
                "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].TaxType)?"-":response[i].TaxType,
                "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].ToAccountNumber)?"-":response[i].ToAccountNumber,
                "lblAmount":kony.sdk.isNullOrUndefined(response[i].Amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].Amount),
                "flxSep":{isVisible:false},
                "flxSeperatorTrans4":{isVisible:false},
              };
            }
            templateData.push(jsonData);
          }
        }
      }

      return templateData;

    }
    catch(err)
    {
      kony.print("Error in dataprocessorsubrecords"+err);
    }
  };
  
  ApprovalsReqUIModule_PresentationController.prototype.getMaxApprovals = function() {
    var approvalsReqManager = applicationManager.getApprovalsReqManager();
    return approvalsReqManager.getMaxApprovals();
  };

  return ApprovalsReqUIModule_PresentationController;
});

