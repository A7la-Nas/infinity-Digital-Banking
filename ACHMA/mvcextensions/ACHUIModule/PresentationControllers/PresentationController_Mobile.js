define(["CommonUtilities"], function(CommonUtilities) {
  /**
       * User defined presentation controller
       * @constructor
       * @extends kony.mvc.Presentation.BasePresenter
       */
  function PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);  
  }

  inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
       * Overridden Method of kony.mvc.Presentation.BasePresenter
       * This method gets called when presentation controller gets initialized
       * @method
       */
  PresentationController.prototype.initializePresentationController = function() {
    this.ACHManager = applicationManager.getACHManager();

  };

  PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
	var appName = _kony.mvc.getCurrentAppName();
    if (appName === "ACHMA")
		navManager.navigateTo(formName);
	else
		navManager.navigateTo({"appName" : "ACHMA", "friendlyName" :formName});
  };

  PresentationController.prototype.commonFunctionNavigationWithData = function(formname) {   
    var navigateToForm = new kony.mvc.Navigation(formname);   
    navigateToForm.navigate();
  };

  PresentationController.prototype.commonNavigationFunction = function(formname) {  
    var navigateToForm = new kony.mvc.Navigation(formname);   
    navigateToForm.navigate();
  };

  /** getACHTransactionsData : Method to Fetch all ACH Transactions - Business Controller Call*///

  PresentationController.prototype.getACHTransactionsData = function ( navObj ) {  
    var scopeObj = this;
    var params = navObj.requestData; 
    var ACHmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
    ACHmodule.getACHTransactionsData( params,
                                     scopeObj.onGetACHTransactionsSuccess,
                                     scopeObj.onGetACHTransactionsFailure);

  };

  PresentationController.prototype.onGetACHTransactionsSuccess = function ( response ){  

    var proccessedResponse = PresentationController.prototype.dataProcessorForGenerateTransaction(response);
    var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactions', true);
    viewController.fetchACHTransactionSuccessCallBack(proccessedResponse);
  };

  PresentationController.prototype.onGetACHTransactionsFailure = function ( responseError ) { 
    var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactions', true);
    viewController.fetchErrorcallBack(responseError);
  };

  /**
      * dataProcessorForGenerateTransaction : Method to format Data for ACH Trasactions  */// 
  PresentationController.prototype.dataProcessorForGenerateTransaction = function ( response ) { 
    try{     
      var setdataarray=[];
      var configManager = applicationManager.getConfigurationManager();
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      if(Array.isArray(response)){
        for(var i=0;i<response.length;i++){
          var requestType="";
          if(!kony.sdk.isNullOrUndefined(response[i].RequestType) && (response[i].RequestType.includes("PPD") || response[i].RequestType.includes("CCD") || response[i].RequestType.includes("CTX")) ) {
            reqtype=String(response[i].RequestType).split("(");
            requestType=(response[i].RequestType).substring(0, 3) + " " + response[i].TransactionTypeValue;
          }
          if(!kony.sdk.isNullOrUndefined(response[i].RequestType) && response[i].RequestType.includes("Web") ) {
            requestType = response[i].RequestType;
          }
          if(!kony.sdk.isNullOrUndefined(response[i].RequestType) && response[i].RequestType.includes("Tax") ) {
            requestType = response[i].RequestType + " " + response[i].TransactionTypeValue;
          }

          if(!kony.sdk.isNullOrUndefined(response[i].EffectiveDate)) {
            response[i].EffectiveDate = response[i].EffectiveDate.slice(0, 10) + "T12:00:00.001Z";
          }
          var CreatedOn = response[i].CreatedOn;
          CreatedOn = CreatedOn.split('T')[0];
          var time=response[i].CreatedOn;
          time = time.substring(0, time.length - 4);
          var split=time.split("T")[1];
          var am=split.substring(0, split.length - 3);
          var timeVal=parseInt(am);
          var str = response[i].CreatedOn;
          var substr = str.split('T')[1];
          var mm=substr.substring(3, substr.length - 4);
          if(12<timeVal){
            var timeFormate =parseInt(timeVal)-parseInt(12)+":"+mm;
            time=timeFormate +"PM";
          }else{
            time=split +"AM";
          }

          var parsedResponse={
            template:"flxAchtransation",
            "data":response[i],
            "lblPayment": requestType,
            "lblToAccount":"To: "+CommonUtilities.truncateStringWithGivenLength(response[i].AccountName+"....",20)+CommonUtilities.getLastSixDigit(response[i].AccountName),
            "lblAmount": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(response[i].TotalAmount, true),
            "lblDate":CommonUtilities.getFrontendDateString(response[i].EffectiveDate,"mm/dd/yyyy"),
            "createdOn":CommonUtilities.getFrontendDateString(CreatedOn,"mm/dd/yyyy")+", "+time,
            "amount":kony.sdk.isNullOrUndefined(response[i].MaxAmount)?"-": response[i].MaxAmount,
            "createdBy":kony.sdk.isNullOrUndefined(response[i].userName)?"-": response[i].userName,
            "Status":kony.sdk.isNullOrUndefined(response[i].Status)?"-": response[i].Status,
            "TemplateRequestType_id":kony.sdk.isNullOrUndefined(response[i].TemplateRequestType_id)?"-": response[i].TemplateRequestType_id,
            "Request_id":kony.sdk.isNullOrUndefined(response[i].Request_id)?"-": response[i].Request_id,
            "userName":kony.sdk.isNullOrUndefined(response[i].Request_id)?"-": response[i].Request_id, 
            "TotalAmount": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(response[i].TotalAmount, true),
            "MaxAmount": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(response[i].MaxAmount, true),
            "ConfirmationNumber":kony.sdk.isNullOrUndefined(response[i].ConfirmationNumber)?"-": response[i].ConfirmationNumber,
            "DebitAccount":kony.sdk.isNullOrUndefined(response[i].DebitAccount)?"-": response[i].DebitAccount,
            "TemplateType_id":kony.sdk.isNullOrUndefined(response[i].TemplateType_id)?"-": response[i].TemplateType_id,
            "CompanyName":kony.sdk.isNullOrUndefined(response[i].CompanyName)?"-": response[i].CompanyName,
            "RequestType":kony.sdk.isNullOrUndefined(response[i].RequestType)?"-": response[i].RequestType,
            "TemplateDescription":kony.sdk.isNullOrUndefined(response[i].TemplateDescription)?"-": response[i].TemplateDescription,
            "TemplateTypeValue":kony.sdk.isNullOrUndefined(response[i].TemplateTypeValue)?"-": response[i].TemplateTypeValue,
            "TransactionType_id":kony.sdk.isNullOrUndefined(response[i].TransactionType_id)?"-": response[i].TransactionType_id,
            //"createdby":kony.sdk.isNullOrUndefined(response[i].createdby)?"-": response[i].createdby,   
            "Company_id":kony.sdk.isNullOrUndefined(response[i].Company_id)?"-": response[i].Company_id,    
            "Transaction_id":kony.sdk.isNullOrUndefined(response[i].Transaction_id)?"-": response[i].Transaction_id,
            "EffectiveDate":CommonUtilities.getFrontendDateString(response[i].EffectiveDate,"mm/dd/yyyy"),
            "TemplateName":kony.sdk.isNullOrUndefined(response[i].TemplateName)?"-": response[i].TemplateName,
            "featureActionId":kony.sdk.isNullOrUndefined(response[i].featureActionId)?"-": response[i].featureActionId,
            "AccountName":kony.sdk.isNullOrUndefined(response[i].AccountName)?"-": response[i].AccountName,
            "requiredApprovals":kony.sdk.isNullOrUndefined(response[i].requiredApprovals)?"-": response[i].requiredApprovals,
            "receivedApprovals":kony.sdk.isNullOrUndefined(response[i].receivedApprovals)?"-": response[i].receivedApprovals,
            "amICreator":kony.sdk.isNullOrUndefined(response[i].amICreator)?"-": response[i].amICreator,
            "amIApprover":kony.sdk.isNullOrUndefined(response[i].amIApprover)?"-": response[i].amIApprover,
            "TransactionTypeValue":kony.sdk.isNullOrUndefined(response[i].TransactionTypeValue)?"-": response[i].TransactionTypeValue,
          };
          setdataarray.push(parsedResponse);
        }
      }
      return(setdataarray);
    }catch(err){
      kony.print("err--"+err);
    }
  };

  PresentationController.prototype.getDestinationAccountsRecords = function( navObject ) {
    var scopeObj = this;
    scopeObj.ACHManger = applicationManager.getACHManager();
    var ACHmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
    ACHmodule.fetchACHTransactionRecords(
      navObject.requestData,
      scopeObj.getDestinationAccountsRecordsSuccess,
      scopeObj.getDestinationAccountsRecordsFailure,
    );
      };
      PresentationController.prototype.getDestinationAccountsRecordsSuccess = function (response) {
      try
      {
        var subRecordsMap = [];
        var isDone = false;
        var isValid = false;
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
                var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
                viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);

              });

            } 
            else {
              var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
              viewController.fetchErrorBack(response);
            }
          }
        };

        var failureCallSubrecord = function(TransactionRecord_id) {
          subRecordsMap[TransactionRecord_id] = "error";
          var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
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
                PresentationController.prototype.getACHTransactionSubRecords(obj.TransactionRecord_id, 
                                                                             successCallSubrecord.bind(scopeObj,obj.TransactionRecord_id),
                                                                             failureCallSubrecord.bind(scopeObj,obj.TransactionRecord_id));
              }
            });
          }
          else
          {
            var proccessedResponse = PresentationController.prototype.dataProcessorForDestinationAccnts(response);
            var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
            viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);
          }
        }
      }
      catch(err)
      {
        kony.print("Error in getDestinationAccountsRecordsSuccess"+err);
      }
    };
    PresentationController.prototype.getDestinationAccountsRecordsFailure = function (response) {
      var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
      viewController.fetchErrorBack(response);
    };
    PresentationController.prototype.dataProcessorForDestinationAccnts = function(response){
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

    PresentationController.prototype.getACHFileSubRecord = function(navobj){
      try{
        var scopeObj = this;
        scopeObj.ACHManger = applicationManager.getACHManager();
        var ACHmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
        ACHmodule.fetchACHFileSubRecords(
          navobj.requestData,
          scopeObj.getACHFileSubRecordSuccess,
          scopeObj.getACHFileSubRecordFailure);
      }catch(er){

      }
    },
      PresentationController.prototype.getACHFileSubRecordSuccess = function(response){
      try{
        var proccessedResponse = PresentationController.prototype.dataProcessorForACHFileSubRecord(response.AchFileSubrecords);
        var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
        viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);
      }catch(er){

      }
    },
      PresentationController.prototype.dataProcessorForACHFileSubRecord = function(response){

      try{
        var templateData = [];
        var jsonData = {};
        if(!kony.sdk.isNullOrUndefined(response)){
          if(Array.isArray(response)){
            if(response.length > 0){
              for(var i = 0; i < response.length;i++){
                if(i !== (response.length) -1 ){
                  jsonData={
                    "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].receiverName)?"-":response[i].receiverName,
                    "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].receiverAccountNumber)?"-":response[i].receiverAccountNumber,
                    "lblAmount":kony.sdk.isNullOrUndefined(response[i].amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].amount),
                    "flxSep":{isVisible:true},
                    "flxSeperatorTrans4":{isVisible:false},
                  };
                }else{
                  jsonData={
                    "lblRecipientname":kony.sdk.isNullOrUndefined(response[i].receiverName)?"-":response[i].receiverName,
                    "lblAccountnumber":kony.sdk.isNullOrUndefined(response[i].receiverAccountNumber)?"-":response[i].receiverAccountNumber,
                    "lblAmount":kony.sdk.isNullOrUndefined(response[i].amount)?"-":CommonUtilities.formatCurrencyWithCommas(response[i].amount),
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

      }catch(er){

      }

    },
      PresentationController.prototype.getACHFileSubRecordFailure = function(errorResponse){
      try{
        var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
        viewController.fetchErrorcallBack(errorResponse);
      }catch(er){

      }
    },

      PresentationController.prototype.getACHFileRecord = function(navObj){
      try{
        var scopeObj = this;
        scopeObj.ACHManger = applicationManager.getACHManager();
        var ACHmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
        ACHmodule.fetchACHFileRecords(
          navObj.requestData,
          scopeObj.getACHFileRecordRecordsSuccess,
          scopeObj.getACHFileRecordFailure);
      }catch(er){

      }
    },

      PresentationController.prototype.dataProcessorForACHFileRecord = function (response) {
      try {
        if (!kony.sdk.isNullOrUndefined(response.AchFileRecords)) {
          if (Array.isArray(response.AchFileRecords)) {
            if (response.AchFileRecords.length === 1) {
              var achFileRecordId = response.AchFileRecords[0].achFileRecordId;
              return achFileRecordId;
            }
            if (response.AchFileRecords.length > 1) {
              var arr = [];
              response.AchFileRecords.forEach(function (data) {
                arr.push(data.achFileRecordId);
              });
              return arr;
            }
          }
        }
      } catch (er) {}
    },

      PresentationController.prototype.fileDataStore = function (response) {
      try {
        var subRecords = response.AchFileSubrecords;
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.files++;
        subRecords.forEach(function (data) {
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fileCollection.push(data);
        });
      } catch (er) {}
      try {
        if (kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.files >= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.filesLength) {
          PresentationController.prototype.dataProcessorForACHFileSubRecord(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fileCollection);
          try {
            var data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fileCollection;
            var proccessedResponse = PresentationController.prototype.dataProcessorForACHFileSubRecord(data);
            var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
            viewController.getACHFilesDestinationAccntSuccessCallBack(proccessedResponse);
          } catch (er) {}
        }
      } catch (er) {}
    },

      PresentationController.prototype.fetchFileData = function (response) {
      try {
        var ACHFileRecordID = response;
        var scopeObj = this;
        scopeObj.ACHManger = applicationManager.getACHManager();
        var ACHmodule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
        ACHmodule.fetchACHFileSubRecords({
          "achFileRecordId": ACHFileRecordID
        },
                                         kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fileDataStore,
                                         kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.getACHFileSubRecordFailure);
      } catch (er) {}
    },

      PresentationController.prototype.getACHFileRecordRecordsSuccess = function(response){
      try{

        if(!kony.sdk.isNullOrUndefined(response.AchFileRecords)){
          if (Array.isArray(response.AchFileRecords)) {
            if (response.AchFileRecords.length >0){
              var proccessedResponse = PresentationController.prototype.dataProcessorForACHFileRecord(response);
              var navigationManager = applicationManager.getNavigationManager();
              var originFormName = navigationManager.getCustomInfo("formFlow");
              var viewController = "";
              if(Array.isArray(proccessedResponse) && originFormName === "ACHFileList") { //limiting to ACHFileList as other flows might cause issues!
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.files = 0;
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.filesLength = proccessedResponse.length;
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fileCollection = [];
                proccessedResponse.forEach(function(data) {
                  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHUIModule').presentationController.fetchFileData(data);
                });
              }
              else {
                if(originFormName === "ACHFileList"){
                  viewController = applicationManager.getPresentationUtility().getController('frmACHTransactions', true);
                  viewController.getACHFileRecordsSuccessCB(proccessedResponse);
                }else if(originFormName === "ACHFileListApprovals"){
                  viewController = applicationManager.getPresentationUtility().getController('frmApprovalsList', true);
                  viewController.getACHFileRecordsSuccessCB(proccessedResponse);
                }else if(originFormName === "ACHFileListRequests"){
                  viewController = applicationManager.getPresentationUtility().getController('frmRequestList', true);
                  viewController.getACHFileRecordsSuccessCB(proccessedResponse);
                }
              }
            }}}

      }catch(er){}
    },
      PresentationController.prototype.getACHFileRecordFailure = function(errorResponse){
      try{
        var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactionDetail', true);
        viewController.fetchErrorcallBack(errorResponse);
      }catch(er){

      }
    },
      PresentationController.prototype.getAllACHFiles = function(navObj) { 
      var scopeObj = this;
      scopeObj.ACHManger = applicationManager.getACHManager();
      var ACHmodule= kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
      ACHmodule.getFilesData(
        navObj.requestData,
        scopeObj.getACHFilesTransactionRecordsSuccess,
        scopeObj.getACHFilesTransactionRecordsFailure);
    };
    PresentationController.prototype.dataProcessorForFiles = function(response){
      var templateData=[];
      var isiPhone = applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone";
      var configManager = applicationManager.getConfigurationManager();
      if(!kony.sdk.isNullOrUndefined(response)){
        if(Array.isArray(response)){
          if(response.length > 0){
            for(var i = 0; i < response.length;i++){
              if(!kony.sdk.isNullOrUndefined(response[i].UpdatedDateAndTime) && response[i].UpdatedDateAndTime !== "") {
                if(isiPhone && response[i].UpdatedDateAndTime.includes(" ")) {
                  response[i].UpdatedDateAndTime = response[i].UpdatedDateAndTime.replace(" ", "T") + "Z";
                }
              }
              var time=response[i].UpdatedDateAndTime;
              time = time.substring(0, time.length - 4);
              var split=time.split("T")[1];
              var am=split.substring(0, split.length - 3);
              var timeVal=parseInt(am);
              if(12<timeVal){
                time=split +"PM";
              }else{
                time=split +"AM";
              }
              var jsonData={
                template:"flxAchFilelist",
                "data":response[i],
                "lblFilename":kony.sdk.isNullOrUndefined(response[i].FileName)?"-": response[i].FileName,
                "lblAdmin":kony.sdk.isNullOrUndefined(response[i].userName)?"-": response[i].userName,
                "lblStatus":kony.sdk.isNullOrUndefined(response[i].FileStatus)?"-": response[i].FileStatus,
                "fileType":kony.sdk.isNullOrUndefined(response[i].FileFormatType)?"-": response[i].FileFormatType,
                "RequestType":kony.sdk.isNullOrUndefined(response[i].FileRequestType)?"-": response[i].FileRequestType,
                "uploadDate":kony.sdk.isNullOrUndefined(response[i].UpdatedDateAndTime)?"-":CommonUtilities.getFrontendDateString( response[i].UpdatedDateAndTime,"mm/dd/yyyy")+", "+time,
                "totalDebitAccount": configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(response[i].TotalDebitAmount, true),
                "totalCreditAccount":configManager.getCurrencyCode()+""+CommonUtilities.formatCurrencyWithCommas(response[i].TotalCreditAmount, true),
                "numberOfDebits":kony.sdk.isNullOrUndefined(response[i].NumberOfDebits)?"-": response[i].NumberOfDebits,
                "numberOfCredits":kony.sdk.isNullOrUndefined(response[i].NumberOfCredits)?"-": response[i].NumberOfCredits,
                "numberOfPreNotes":kony.sdk.isNullOrUndefined(response[i].NumberOfPrenotes)?"-": response[i].NumberOfPrenotes,
                "numberOfrecords":kony.sdk.isNullOrUndefined(response[i].NumberOfRecords)?"-": response[i].NumberOfRecords,
                "ACHFileID":kony.sdk.isNullOrUndefined(response[i].ACHFileID)?"-": response[i].ACHFileID,
                "amICreator":kony.sdk.isNullOrUndefined(response[i].amICreator)?"-": response[i].amICreator,
                "amIApprover":kony.sdk.isNullOrUndefined(response[i].amIApprover)?"-": response[i].amIApprover,
                "Request_id":kony.sdk.isNullOrUndefined(response[i].Request_id)?"-": response[i].Request_id,
                "receivedApprovals":kony.sdk.isNullOrUndefined(response[i].receivedApprovals)?"-": response[i].receivedApprovals,
                "requiredApprovals":kony.sdk.isNullOrUndefined(response[i].requiredApprovals)?"-": response[i].requiredApprovals,
                "flxsep":{skin:"sknflxe7e7e7",isVisible:true},
              };
              templateData.push(jsonData);
            }
          }
        }
      }

      return templateData;
    },
      PresentationController.prototype.getACHFilesTransactionRecordsSuccess = function (response) {
      var proccessedResponse = PresentationController.prototype.dataProcessorForFiles(response);
      var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactions', true);
      viewController.getACHFilesTransactionRecordsSuccessCallBack(proccessedResponse);
    },
      PresentationController.prototype.getACHFilesTransactionRecordsFailure = function (responseError) {
      var viewController = applicationManager.getPresentationUtility().getController('frmACHTransactions', true);
      viewController.fetchErrorcallBack(responseError);
    };
    PresentationController.prototype.onGetApprovalCountsSuccess = function (response){ 
      var navigationManager = applicationManager.getNavigationManager();
      var originFormName = navigationManager.getCustomInfo("originFormForApprovalCount");
      navigationManager.setCustomInfo("originFormForApprovalCount", null);
      var viewController = applicationManager.getPresentationUtility().getController(originFormName, true);
      viewController.getApprovalCountsSuccessCallBack(response);
    },
      PresentationController.prototype.onGetApprovalCountsFailure = function (errorResponse){
      var navigationManager = applicationManager.getNavigationManager();
      var originFormName = navigationManager.getCustomInfo("originFormForApprovalCount");
      navigationManager.setCustomInfo("originFormForApprovalCount", null);
      var viewController = applicationManager.getPresentationUtility().getController(originFormName, true);
      viewController.fetchErrorBack(errorResponse);
    },

      PresentationController.prototype.getApprovalCounts = function (originFormName) {
      var scopeObj = this;
      scopeObj.ACHManger = applicationManager.getACHManager();
      var ACHmodule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.setCustomInfo("originFormForApprovalCount", originFormName);
      ACHmodule.fetchApprovalRequestCounts(scopeObj.onGetApprovalCountsSuccess.bind(originFormName),scopeObj.onGetApprovalCountsFailure.bind(originFormName));
    };

    PresentationController.prototype.getACHTransactionSubRecords = function(transactionId, successcallback, failurecallback) {
      var scopeObj = this;
      var requestInputs = { "TransactionRecord_id" : transactionId};
      var ACHmodule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
      ACHmodule.fetchACHTransactionSubRecords(
        requestInputs,
        scopeObj.getACHTransactionSubRecordsSuccess.bind(scopeObj, successcallback),
        scopeObj.getACHTransactionSubRecordsFailure.bind(scopeObj, failurecallback)
      );
    };
    PresentationController.prototype.getACHTransactionSubRecordsSuccess = function(successcallback, response) {
      successcallback(response);
    };

    PresentationController.prototype.getACHTransactionSubRecordsFailure = function(failurecallback){
      failurecallback();

    };
    PresentationController.prototype.dataProcessorForDestinationSubAccnts = function(response){
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

    PresentationController.prototype.getAllCounts = function (originFormName) {
      var scopeObj = this;
      var config = applicationManager.getConfigurationManager();
      var locale=config.getLocale();
      var termsAndConditions=config.getTermsAndConditions();
      var localestr =  locale.replace("_", "-");
      var params = {"languageCode": localestr};
      //var params = {"languageCode": kony.i18n.getCurrentLocale().replace("_", "-")};
      this.hasCountsServiceFailed = -1;
      scopeObj.ACHManger = applicationManager.getACHManager();
      var ACHmodule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ACHManager').businessController;
      ACHmodule.fetchCounts(params,scopeObj.getAllCountsSuccess.bind(scopeObj),scopeObj.getAllCountsFailure.bind(scopeObj));
    };

    PresentationController.prototype.setFilters = function(response) {
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

    PresentationController.prototype.getFilters = function() {
      if(kony.sdk.isNullOrUndefined(this.filtersForCounts)) this.filtersForCounts = "";
      return this.filtersForCounts;
    };

    PresentationController.prototype.setFiltersbyStatus = function(response) {
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

    PresentationController.prototype.getFiltersbyStatus = function() {
      if(kony.sdk.isNullOrUndefined(this.filtersForStatus)) this.filtersForStatus = "";
      return this.filtersForStatus;
    };
    PresentationController.prototype.getFiltersbyDuration = function() {
      if(kony.sdk.isNullOrUndefined(this.filtersForDuration)) this.filtersForDuration = "";
      return this.filtersForDuration;
    };

    PresentationController.prototype.setFiltersbyDuration = function(response) {
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
    PresentationController.prototype.getFiltersbySort = function() {
      if(kony.sdk.isNullOrUndefined(this.filtersForsort)) this.filtersForsort = "";
      return this.filtersForsort;
    };

    PresentationController.prototype.setFiltersbySort = function(response) {
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

    PresentationController.prototype.getAllCountsSuccess = function(response) {
      var data = response;
      var data2 = response;
      this.featureActionNames = this.getCountsbyFeatureName(data2);
      if(!kony.sdk.isNullOrUndefined(data["records"]))
        data=data["records"];
      var viewController = applicationManager.getPresentationUtility().getController('frmUnifiedDashboard', true);
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

      try {
        this.approvalsAndRequestDashboard(response);
      } catch(e){}
      try {
        viewController.getCountsSuccessCB(this.singleApprovalsPendingCount,this.bulkApprovalsPendingCount,
                                          this.otherApprovalsPendingCount,this.singleRequestsPendingCount,
                                          this.bulkRequestsPendingCount, this.otherRequestsPendingCount,this.featureActionNames,this.sameBankCount,
                                          this.requestsArray,this.approvalArray);
      } catch (e) {}
    };

    PresentationController.prototype.approvalsAndRequestDashboard = function (response) {
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
      var totalApprovals= 0;
      var totalRequests = 0;
      for (i = 0; i < data.length; i++) {
        datagroup = data[i];
        if(kony.sdk.isNullOrUndefined(datagroup)) continue;
        if(kony.sdk.isNullOrUndefined(datagroup["limitgroupName"])) continue;
        if(kony.sdk.isNullOrUndefined(datagroup["featureActions"])) continue;
        limitgroupName = datagroup["limitgroupName"];
        featureActions = datagroup["featureActions"];
        request = {
          "lblSpendingCategory": limitgroupName,
          "lblTotalAmount": 0,
          "flxSeperator":{"isVisible":true}
        };
        approvals = {
          "lblSpendingCategory": limitgroupName,
          "lblTotalAmount": 0,
          "flxSeperator":{"isVisible":true}
        };
        requestsCounter = 0;
        approvalsCounter = 0;
        if(featureActions.length === 0) {
          request["lblTotalAmount"] = "0";
          approvals["lblTotalAmount"] = "0";
        }
        else {
          for(j = 0; j < featureActions.length; j++) {
            if(kony.sdk.isNullOrUndefined(featureActions[j])) continue;
            if(!kony.sdk.isNullOrUndefined(featureActions[j]["myApprovalsPending"])){
              var temp = parseInt(featureActions[j]["myApprovalsPending"]);
              approvalsCounter = approvalsCounter+ temp;
            } 
            if(!kony.sdk.isNullOrUndefined(featureActions[j]["myRequestsPending"])){
              var temp1 = parseInt(featureActions[j]["myRequestsPending"]);
              requestsCounter = requestsCounter + temp1;
            } 
          }
          request["lblTotalAmount"] = ""+requestsCounter;
          approvals["lblTotalAmount"] = ""+approvalsCounter;
          totalApprovals = totalApprovals+approvalsCounter;
          totalRequests = totalRequests+requestsCounter;
        }

        requestArray.push(cloneJSON(request));
        approvalsArray.push(cloneJSON(approvals));
      }
      this.requestsArray = cloneJSON(requestArray);
      this.approvalArray = cloneJSON(approvalsArray);
      this.totalApprovals = totalApprovals;
      this.totalRequests = totalRequests;
    };

    PresentationController.prototype.getAllApprovalsPendingCount = function () {
      return this.allApprovalsPendingCounts;
    };

    PresentationController.prototype.getAllRequestsPendingCount = function () {
      return this.allRequestsPendingCounts;
    };

    PresentationController.prototype.getAllCountsFailure = function() {
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

    PresentationController.prototype.getCountsbyFeatureName = function(data) {
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

    return PresentationController;

  });