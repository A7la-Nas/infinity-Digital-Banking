define(["CommonUtilities", "ViewConstants"], function(CommonUtilities, ViewConstants) {

  function ACHModule_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.initializePresentationController();
  }

  inheritsFrom(ACHModule_PresentationController, kony.mvc.Presentation.BasePresenter);

  ACHModule_PresentationController.prototype.initializePresentationController = function() {
    var scopeobj = this;
    require(['ApplicationManager'], function(ApplicationManager){   
      scopeobj.ACHFileFormats = null;
      scopeobj.TemplateRequestTypes = null;
      scopeobj.TransactionTypes = null;
      scopeobj.UserAccounts = null;
      scopeobj.successCallback = function() {};
      scopeobj.failureCallback = function() {};
      scopeobj.ACHManager = applicationManager.getACHManager();
      scopeobj.navManager = applicationManager.getNavigationManager();
      scopeobj.mfaManager = applicationManager.getMFAManager();
    });
  };

  ACHModule_PresentationController.prototype.formPresenter = function(frmName, data) {
    this.presentUserInterface(frmName, data);
  };


  /**
       * uploadACHFile: This is the function which is used to create a new upload request
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.uploadACHFile = function(navObject) {
    var scopeObj = this;

    var hamburgerData = {};
    hamburgerData.menu = kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH");
    hamburgerData.subMenu = kony.i18n.getLocalizedString("i18n.konybb.ACH.Files");

    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    if (navObject.requestData)
      scopeObj.ACHManager.uploadNewACHFile(
        navObject.requestData,
        scopeObj.completeSuccessCallMFA.bind(scopeObj, navObject, "onUploadSuccess", "uploadACHFile", hamburgerData),
        scopeObj.completeFailedCall.bind(scopeObj, navObject, "onUploadFailure")
      );
  };


  /**
       * onUploadSuccess : Method to handle success response of upload file Request
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @param {object} response - success response object of upload file Request response
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onUploadSuccess = function(response) {
    var context = {
      "key": this.mfaManager.getMFAFlowType(),
      "responseData": response.ACHFileID
    }
    applicationManager.getNavigationManager().updateForm(context, "frmACHDashboard");
  };


  /**
       * getTemplateTypes : This is the function used to fetch Template Types 
       * @member of {ACHModule_PresentationController}
       * @param {object} responseError - failure response object of upload file Request response
       * @return {object} responseError - failure response object of upload file Request response
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onUploadFailure = function(responseError) {
    return (responseError);
  };

  /**
       * validateFileFormatAndGetFormatTypeId : This is the function returns FileFormatId if valid otherwise it returns null
       * @member of {ACHModule_PresentationController}
       * @param selectedFileType - Selected File Type
       * @param uploadedFileType - Uploaded File Type
       * @return ACHFileFormats
       * @throws {}
       */
  ACHModule_PresentationController.prototype.validateFileFormatAndGetFormatTypeId = function(selectedFileType, uploadedFileType) {
    var fileformats = this.ACHFileFormats;
    for (var i = 0; i < fileformats.length; i++) {
      if (fileformats[0].FileType == selectedFileType) {
        if (fileformats[0].Fileextension == uploadedFileType) {
          return fileformats[0].id;
        } else {
          return null;
        }
      }
    }
    return null;
  };

  /**
       * getTemplateTypes : This is the function used to fetch Template Types 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTemplateTypes = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchTemplateTypes(
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getTemplateTypesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getTemplateTypesFailure")
    );
  };

  /**
       * getCustomerActionLimits : This is the function used to fetch customer action limits 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getCustomerActionLimits = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    applicationManager.getConfigurationManager().fetchLimitsForAnAction(navObject.requestData,
                                                                        scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getCustomerActionLimitsSuccess"),
                                                                        scopeObj.completeFailedCall.bind(scopeObj, navObject, "getCustomerActionLimitsFailure")
                                                                       );
  };

  /**
       * getCustomerActionLimitsSuccess : format the fetched customer action limits 
       * @member of {ACHModule_PresentationController}
       */
  ACHModule_PresentationController.prototype.getCustomerActionLimitsSuccess = function(responseData) {
    var scopeObj = this;
    return responseData["accounts"];
  };


  /**
       * getCustomerActionLimitsFailure : failed to fetch the customer action limits 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} error - Error Json object
       * @return {JSON Array} error - Error Json object
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getCustomerActionLimitsFailure = function(error) {
    return (error);
  };

  /**
       * getTemplateTypesSuccess : format the fetched Template Types 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} responseData - Array of responses where all template Type with ID is fetched
       * @return {JSON Array}  TemplateTypes - Json Array of only Type Name and Type Id
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTemplateTypesSuccess = function(responseData) {
    var scopeObj = this;
    var configurationManager = applicationManager.getConfigurationManager();
    scopeObj.TransactionTypes = responseData;
    var TemplateTypes = [];
    responseData.forEach(function(obj) {
      if ((obj.TransactionTypeName.includes(kony.i18n.getLocalizedString("i18n.konybb.Common.Payment")) && configurationManager.getConfigurationValue('isACHPaymentCreateTransactionEnabled') === "true") ||
          (obj.TransactionTypeName.includes(kony.i18n.getLocalizedString("i18n.konybb.Common.Collection")) && configurationManager.getConfigurationValue('isACHCollectionCreateTransactionEnabled') === "true")) {
        var tempalteType = {
          "Id": obj.TransactionType_id,
          "Name": obj.TransactionTypeName
        };
        TemplateTypes.push(tempalteType);
      }
    });
    return (TemplateTypes);
  };


  /**
       * getTemplateTypesFailure : failed to fetch the Template Types 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} error - Error Json object
       * @return {JSON Array} error - Error Json object
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTemplateTypesFailure = function(error) {
    return (error);
  };


  /**
       * getRequestTypes : Method to fetch the Request Types for ACH
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getRequestTypes = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);

    scopeObj.ACHManager.fetchRequestTypes(
      navObject.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getRequestTypesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getRequestTypesFailure")
    );
  };


  /**
       * getRequestTypesSuccess : format the Request types to show in the UI
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} responseData - Array of responses where all template Request Type with ID is fetched
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getRequestTypesSuccess = function(responseData) {
    var scopeObj = this;
    scopeObj.TemplateRequestTypes = responseData;
    var RequestTypes = [];
    responseData.forEach(function(obj) {
      var requestType = {
        "Id": obj.TemplateRequestType_id,
        "Name": obj.TemplateRequestTypeName
      };
      RequestTypes.push(requestType);
    });
    return (RequestTypes);
  };


  /**
       * getRequestTypesFailure : failed to fetch the ACH Request Types 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} error - Error Json object
       * @return {JSON Array} error - Error Json object
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getRequestTypesFailure = function(error) {
    return (error);
  };


  /**
       * getACHAccountTypes : Method to fetch the ACH applicable Accounts
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHAccountTypes = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);

    scopeObj.ACHManager.fetchtACHAccountTypes(
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getACHAccountTypesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHAccountTypesFailure")
    );
  };


  /**
       * getACHAccountTypesSuccess : filter the Account ID and Type for the 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} responseData - backend response of ACCounts 
       * @return {JSON Array} ACHAccountTypes - accounts with only ID and AccountType
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHAccountTypesSuccess = function(responseData) {
    var scopeObj = this;
    var ACHAccountTypes = [];
    responseData.forEach(function(obj) {
      var accountType = {
        "Id": obj.Id,
        "Name": obj.AccountType
      };
      ACHAccountTypes.push(accountType);
    });
    return (ACHAccountTypes);
  };


  /**
       * getACHAccountTypesFailure : accounts types fetch failed
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} error - error object for failed 
       * @return {JSON Object} error - error object for failed 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHAccountTypesFailure = function(error) {
    return (error);
  };


  /**
       * getTaxTypes : Method to fetch supported TAX types 
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObject - Navigation Object with information on SuccessForms, Key and Context
       * @return {}
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxTypes = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);

    scopeObj.ACHManager.fetchtTaxTypes(
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getTaxTypesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getTaxTypesFailure")
    );
  };


  /**
       * getTaxTypesSuccess : method to format the Tax types to be shown in the UI
       * @member of {ACHModule_PresentationController}
       * @param {JSON ARRAY} responseData - service response of tax types
       * @return {JSON ARRAY} TaxTypes - formatted service response of tax types
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxTypesSuccess = function(responseData) {
    var scopeObj = this;
    var TaxTypes = [];
    responseData.forEach(function(obj) {
      var TaxType = {
        "Id": obj.Id,
        "Name": obj.TaxType
      };
      TaxTypes.push(TaxType);
    });
    return (TaxTypes);
  };


  /**
       * getTaxTypesFailure : method to show the failure call back
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} error - error response
       * @return {JSON object} error - error response
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxTypesFailure = function(error) {
    return (error);
  };


  /**
       * getTaxSubTypes : Method to fetch supported TAX SUB types based on tax type
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObject - Navigation Object with information on SuccessForms, Key and Context
       * @return {}
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxSubTypes = function(navObject) {
    var scopeObj = this;
    var params = navObject.requestData;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);

    scopeObj.ACHManager.fetchtTaxSubTypes(
      params,
      scopeObj.getTaxSubTypesSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getTaxSubTypesFailure")
    );
  };


  /**
       * getTaxTypesSuccess : method to format the Tax types to be shown in the UI
       * @member of {ACHModule_PresentationController}
       * @param {JSON ARRAY} responseData - service response of tax types
       * @return {JSON ARRAY} TaxTypes - formatted service response of tax types
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxSubTypesSuccess = function(navObject, responseData) {
    var scopeObj = this;
    var TaxSubTypes = [];
    responseData.forEach(function(obj) {
      var TaxSubType = {
        "Id": obj.Id,
        "Name": obj.TaxSubType
      };
      TaxSubTypes.push(TaxSubType);
    });
    navObject.onSuccess.context.responseData.data = TaxSubTypes;
    applicationManager.getNavigationManager().updateForm({
      "key": navObject.onSuccess.context.key,
      "responseData": navObject.onSuccess.context.responseData
    }, navObject.onSuccess.form);
  };


  /**
       * getTaxSubTypesFailure : method to show the failure case for fetch
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} error - error response
       * @return {JSON object} error - error response
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getTaxSubTypesFailure = function(error) {
    return (error);
  };


  /**
       * getSupportedFileTypes : Method to fetch supported ACH File types
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObject - Navigation Object with information on SuccessForms, Key and Context
       * @return {}
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getSupportedFileTypes = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);

    scopeObj.ACHManager.getFileFormatTypes(
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "fileTypesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "fileTypesFailure")
    );
  };


  /**
       * fileTypesSuccess : Method to format/Massage the Service Response for ACH File types
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array } responseData - response for the ACH file types
       * @return {String Array } FileTypeNames - formatted ACH Files Data for UI
       * @throws {}
       */
  ACHModule_PresentationController.prototype.fileTypesSuccess = function(responseData) {
    var scopeObj = this;
    scopeObj.ACHFileFormats = responseData;
    var FileTypeNames = [];
    responseData.forEach(function(obj) {
      var name = obj.FileType;
      FileTypeNames.push(name);
    });
    return (FileTypeNames);
  };


  /**
       * fileTypesFailure : when the call to fetch fileTYpes fail
       * @member of {ACHModule_PresentationController}
       * @param {}
       * @return {null}
       * @throws {}
       */
  ACHModule_PresentationController.prototype.fileTypesFailure = function() {
    return null;
  };


  /**
       * getMIMEType : Method to sent MIME Type form the fetched ACHFileFormats
       * @member of {ACHModule_PresentationController}
       * @param {String } FileTypeName - name of the File Type
       * @return {String } mimeString - name of the MIME type
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getMIMEType = function(FileTypeName) {
    var scopeObj = this;
    var mimeString = "";
    if (scopeObj.ACHFileFormats) {
      scopeObj.ACHFileFormats.forEach(function(obj) {
        if (FileTypeName == obj['FileType']) {
          mimeString = obj['MIMEtype'];
        }
      });
      return mimeString;
    } else {
      var successCallMimeTypes = function(responseData) {
        scopeObj.ACHFileFormats = responseData;
        scopeObj.getMIMEType(FileTypeName);
      }.bind(scopeObj);
      var failureCallMimeTypes = function() {
        //failed to get MimeTypes (to be implemented)
      };
      scopeObj.ACHManager.getFileFormatTypes(successCallMimeTypes, failureCallMimeTypes);
    }
  };


  /**
       * getAllACHFilesSuccess : Method to format/Massage the Service Response for ACH Files
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array } ACHFilesData - response for the Business call
       * @return {JSON Array } ACHFilesData - formatted ACH Files Data
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getAllACHFilesSuccess = function(ACHFilesData) {
    var scopeObj = this;
    ACHFilesData.forEach(function(fileObject) {
      fileObject.FileName = {
        text: CommonUtilities.truncateStringWithGivenLength(fileObject.FileName, 15),
        toolTip: fileObject.FileName
      };
      fileObject.UploadedBy = {
        text: CommonUtilities.truncateStringWithGivenLength(fileObject.UploadedBy, 15),
        toolTip: fileObject.UploadedBy
      };
      fileObject.userName = {
        text: fileObject.userName, //CommonUtilities.truncateStringWithGivenLength(fileObject.userName, 15),
        toolTip: fileObject.userName
      };
      fileObject.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(fileObject.TotalCreditAmount, true);
      fileObject.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(fileObject.TotalDebitAmount, true);
      fileObject.UpdatedDateAndTime = CommonUtilities.getDateAndTimeInUTC(fileObject.UpdatedDateAndTime, "mm/dd/yyyy");
      if ((fileObject.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (!kony.sdk.isNullOrUndefined(fileObject.requiredApprovals)) && (!kony.sdk.isNullOrUndefined(fileObject.receivedApprovals))) {
        fileObject.Approver = fileObject.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + fileObject.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (fileObject.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.REJECTED.toLowerCase()) {
        fileObject.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (fileObject.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.WITHDRAWN.toLowerCase()) {
        fileObject.Approver = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (!kony.sdk.isNullOrUndefined(fileObject.requiredApprovals)) {
        fileObject.Approver = fileObject.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        fileObject.Approver = kony.i18n.getLocalizedString("i18n.common.NA");
      }

      fileObject.flxViewDetailsButton = {
        "isVisible": false
      };
      fileObject.flxRejectButton = {
        "isVisible": false
      };
      fileObject.flxWithdrawButton = {
        "isVisible": false
      };

      if (fileObject.FileStatus.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if (!kony.sdk.isNullOrUndefined(fileObject.amIApprover) &&
            (fileObject.amIApprover === "true")) {
          fileObject.flxViewDetailsButton = {
            "isVisible": true
          };
          fileObject.flxRejectButton = {
            "isVisible": true
          };
        }
        if (!kony.sdk.isNullOrUndefined(fileObject.amICreator) &&
            (fileObject.amICreator === "true")) {
          fileObject.flxWithdrawButton = {
            "isVisible": true
          };
        }
      }

    });

    return (ACHFilesData);
  };


  /**
       * getAllACHFilesFailure : Method to send the Service Response if service failed
       * @member of {ACHModule_PresentationController}
       * @param { JSON object} responseError -  Error Object with message
       * @return {JSON Object } responseError - Error Object with message
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getAllACHFilesFailure = function(responseError) {
    return (responseError);
  };


  /**
       * getAllACHFiles : Method to Fetch all ACH Files - Business Controller Call
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObj - Navigation Object with information on SuccessForms, Key and Context
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getAllACHFiles = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ACHManager.getFilesData(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "getAllACHFilesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "getAllACHFilesFailure")
    );
  };


  ACHModule_PresentationController.prototype.NoServiceUpdateUI = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": null
    }, navObj.onSuccess.form);
  };


  /**
       * getACHFileDataSuccess : method to fileter the ACH File data 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} ACHFileData - Service response an array of JSon Objects of ACH Files
       * @return {JSON Object} response - formatted response of a single JSON Object
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHFileDataSuccess = function(ACHFileData) {
    var scopeObj = this;
    return (ACHFileData[0]);
  };


  /**
       * getACHFileDataFailure : Failed to fetch ACH File Data
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} error - Service response in error or failure
       * @return {JSON Array} error - Service response in error or failure
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHFileDataFailure = function(error) {
    return (error);
  };


  /**
       * getACHFileByID : Method to fetch ACH File Details based on ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObj - Navigation Object with information on SuccessForms, Key and Context
       * @return {}
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHFileByID = function(navObject) {
    var scopeObj = this;
    var params = {
      "ACHFileID": navObject.requestData
    };
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.getFilesDataByID(
      params,
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "getAllACHFilesSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHFileDataFailure")
    );
  };



  ACHModule_PresentationController.prototype.onGetACHRequestTypesSuccess = function(response) {
    return response;
    //any filtering logic goes here
  };

  ACHModule_PresentationController.prototype.onGetACHRequestTypesFailure = function(response) {
    //give appropriate data for the failure call like some popup or so
  };


  /**
       * onGetACHTemplatesAndACHTransactionsSuccess : Method to format Data for ACH Trasactions and ACH Templates 
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array} response - Service response an array of JSon Objects either ACH Transactions or Templates
       * @return {JSON Array} response - formatted response 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onGetACHTemplatesAndACHTransactionsSuccess = function(response) {
    var configurationManager = applicationManager.getConfigurationManager();
    response.forEach(function(responseObj) {
      responseObj.DebitAccountUnmasked = responseObj.DebitAccount;
      responseObj.AccountName = kony.sdk.isNullOrUndefined(responseObj.AccountName) ? "" : responseObj.AccountName;
      var accName = responseObj.AccountName.split('-');
      responseObj.AccountName = accName[0];
      responseObj.AccountName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.AccountName + "....", 16) + CommonUtilities.getLastFourDigit(responseObj.DebitAccount),
        toolTip: responseObj.AccountName + "...." + CommonUtilities.getLastFourDigit(responseObj.DebitAccount)
      };
      responseObj.userName = {
        text: responseObj.userName, // CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
        toolTip: responseObj.userName
      };
      responseObj.CreatedBy = responseObj.userName;
      responseObj.TemplateName = {
        text: responseObj.TemplateName, //CommonUtilities.truncateStringWithGivenLength(responseObj.TemplateName, 15),
        toolTip: responseObj.TemplateName
      };
      responseObj.CreatedOn = CommonUtilities.getFrontendDateStringInUTC(responseObj.CreatedOn, "mm/dd/yyyy");
      if (responseObj.TransactionTypeValue.includes(kony.i18n.getLocalizedString("i18n.konybb.Common.Payment")) && configurationManager.getConfigurationValue('isACHPaymentCreateTransactionEnabled') === "true")
        responseObj.Actions = {
          "text": kony.i18n.getLocalizedString("i18n.konybb.common.MakeAPayment"),
          "isVisible": (applicationManager.getConfigurationManager().checkAccountAction(responseObj.DebitAccount, "ACH_PAYMENT_CREATE"))
        }
        else if (responseObj.TransactionTypeValue.includes(kony.i18n.getLocalizedString("i18n.konybb.Common.Collection")) && configurationManager.getConfigurationValue('isACHCollectionCreateTransactionEnabled') === "true")
          responseObj.Actions = {
            "text": kony.i18n.getLocalizedString("i18n.konybb.common.CollectPayment"),
            "isVisible": (applicationManager.getConfigurationManager().checkAccountAction(responseObj.DebitAccount, "ACH_COLLECTION_CREATE"))
          }
          if (kony.sdk.isNullOrUndefined(responseObj.EffectiveDate)) {
            responseObj.EffectiveDate = "N/A";
          } else {
            responseObj.EffectiveDate = CommonUtilities.getFrontendDateStringInUTC(responseObj.EffectiveDate, "mm/dd/yyyy");
          }
      responseObj.MaxAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.MaxAmount, true);
      responseObj.TotalAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalAmount, true);
      if (responseObj.RequestType.includes("PPD") || responseObj.RequestType.includes("CCD") || responseObj.RequestType.includes("CTX"))
        responseObj.RequestType = (responseObj.RequestType).substring(0, 3) + " " + responseObj.TransactionTypeValue;
      if ((responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) && (!kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) && (!kony.sdk.isNullOrUndefined(responseObj.receivedApprovals))) {
        responseObj.Approver = responseObj.receivedApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved");
      } else if (responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.REJECTED.toLowerCase()) {
        responseObj.Approver = 1 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Rejection");
      } else if (responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.WITHDRAWN.toLowerCase()) {
        responseObj.Approver = kony.i18n.getLocalizedString("i18n.konybb.Common.Withdrawn");
      } else if (!kony.sdk.isNullOrUndefined(responseObj.requiredApprovals)) {
        responseObj.Approver = responseObj.requiredApprovals + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Approvals");
      } else {
        responseObj.Approver = "N/A";
      }
      responseObj.flxViewDetailsTr = {
        "isVisible": false
      };
      responseObj.flxRejectTr = {
        "isVisible": false
      };
      responseObj.flxWithdrawTr = {
        "isVisible": false
      };
      var widgets = 1;
      if (responseObj.Status.toLowerCase() === BBConstants.TRANSACTION_STATUS.PENDING.toLowerCase()) {
        if (!kony.sdk.isNullOrUndefined(responseObj.amIApprover) && (responseObj.amIApprover === "true")) {
          responseObj.flxViewDetailsTr = {
            "isVisible": true
          };
          responseObj.flxRejectTr = {
            "isVisible": true
          };
          widgets = widgets + 2;
        }
        if (!kony.sdk.isNullOrUndefined(responseObj.amICreator) && (responseObj.amICreator === "true")) {
          responseObj.flxWithdrawTr = {
            "isVisible": true
          };
          widgets = widgets + 1;
        }
      }

      var orientationHandler = new OrientationHandler();
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      var break_point = kony.application.getCurrentBreakpoint();
      if (break_point === 640 || orientationHandler.isMobile) {
        var width = (100 - widgets) / widgets;
        var widthValue = width + "%";
        responseObj.flxTrMainAction = {
          "isVisible": true,
          "width": widthValue
        };
        responseObj.flxViewDetailsTr.width = widthValue;
        responseObj.flxWithdrawTr.width = widthValue;
        responseObj.flxRejectTr.width = widthValue;
      } else {
        responseObj.flxTrMainAction = {
          "isVisible": true
        };
      }
    });
    return (response);
  };


  /**
       * onGetACHTemplatesAndACHTransactionsFailure : Method to Fetch all ACH Files - Business Controller Call
       * @member of {ACHModule_PresentationController}
       * @param {object} responseError - failure response object
       * @return {object} responseError - failure response object 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onGetACHTemplatesAndACHTransactionsFailure = function(responseError) {
    return (responseError);
  };


  /**
       * getACHTemplatesData : Method to Fetch all ACH Templates - Business Controller Call
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObj - Navigation Object with information on SuccessForms, Key and Context
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTemplatesData = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    var params = navObj.requestData;
    scopeObj.ACHManager.getACHTemplatesData(
      params,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onGetACHTemplatesAndACHTransactionsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onGetACHTemplatesAndACHTransactionsFailure")
    );
  };


  /**
       * getACHTransactionsData : Method to Fetch all ACH Transactions - Business Controller Call
       * @member of {ACHModule_PresentationController}
       * @param {JSON object} navObj - Navigation Object with information on SuccessForms, Key and Context
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTransactionsData = function(navObj) {
    var scopeObj = this;
    var params = navObj.requestData;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ACHManager.getACHTransactionsData(
      params,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onGetACHTemplatesAndACHTransactionsSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onGetACHTemplatesAndACHTransactionsFailure")
    );
  };

  ACHModule_PresentationController.prototype.onGetACHFilesSuccess = function(response) {
    return response;
    //any filtering logic goes here
  };

  ACHModule_PresentationController.prototype.onGetACHFilesFailure = function(response) {
    //give appropriate data for the failure call like some popup or so
  };

  ACHModule_PresentationController.prototype.getACHFilesData = function(query) {
    //applicationManager.getACHManager().fetchACHDashboard(this.onACHDashboardSuccess.bind(this), this.onACHDashboardFailure.bind(this));
    var scopeObj = this;
    var requestInputs = query;
    var res = scopeObj.ACHManager.ACHFilesData(
      requestInputs,
      scopeObj.onGetACHFilesSuccess.bind(scopeObj, requestInputs),
      scopeObj.onGetACHFilesFailure.bind(scopeObj)
    );
    return res;
  };

  /**
       * This is the function which is used to fetch Rejected ACH Files  
       */

  ACHModule_PresentationController.prototype.getRejectedACHFiles = function(successCallbackOfForm, failureCallbackOfForm) {
    var scopeObj = this;
    scopeObj.ACHManager.fetchRejectedACHFiles(
      scopeObj.onGetRejectedACHFilesSuccess.bind(scopeObj, successCallbackOfForm),
      scopeObj.onGetRejectedACHFilesFailure.bind(scopeObj, failureCallbackOfForm)
    );
  };


  /**
       * onGetRejectedACHFilesSuccess : Method to Format all Rejected ACH Files
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array } response - Navigation Object with information on SuccessForms, Key and Context
       * @return {JSON Array} response - formatted ACH Files
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onGetRejectedACHFilesSuccess = function(response) {
    response.forEach(function(responseObj) {
      responseObj.FileName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.FileName, 15),
        toolTip: responseObj.FileName
      };
      responseObj.userName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
        toolTip: responseObj.userName
      };
      responseObj.TotalCreditAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalCreditAmount, true);
      responseObj.TotalDebitAmount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalDebitAmount, true);
      responseObj.UpdatedDateAndTime = CommonUtilities.getDateAndTimeInUTC(responseObj.UpdatedDateAndTime, "mm/dd/yyyy");
    });
    return (response);
  };

  ACHModule_PresentationController.prototype.onGetRejectedACHFilesFailure = function(failureCallbackOfForm, responseError) {
    //alert(JSON.stringify(responseError));
    failureCallbackOfForm(responseError);
  };

  /**
       * This is the function which is used to fetch Rejected General Transactions
       */
  ACHModule_PresentationController.prototype.getRejectedGenTransactions = function(successCallbackOfForm, failureCallbackOfForm) {
    var scopeObj = this;
    scopeObj.ACHManager.fetchRejectedGeneralTransactions(
      scopeObj.onGetRejectedGenTransactionsSuccess.bind(scopeObj, successCallbackOfForm),
      scopeObj.onGetRejectedGenTransactionsFailure.bind(scopeObj, failureCallbackOfForm)
    );
  };

  ACHModule_PresentationController.prototype.onGetRejectedGenTransactionsSuccess = function(successCallbackOfForm, response) {
    successCallbackOfForm(response);
  };

  ACHModule_PresentationController.prototype.onGetRejectedGenTransactionsFailure = function(failureCallbackOfForm, responseError) {
    //alert(JSON.stringify(responseError));
    failureCallbackOfForm(responseError);
  };

  /**
       * This is the function which is used to fetch Rejected ACH Transactions
       */
  ACHModule_PresentationController.prototype.getRejectedACHTransactions = function(successCallbackOfForm, failureCallbackOfForm) {
    var scopeObj = this;
    scopeObj.ACHManager.fetchRejectedACHTransactions(
      scopeObj.onGetRejectedACHTransactionsSuccess.bind(scopeObj, successCallbackOfForm),
      scopeObj.onGetRejectedACHTransactionsFailure.bind(scopeObj, failureCallbackOfForm)
    );
  };


  /**
       * onGetRejectedACHTransactionsSuccess : Method to Format all Rejected ACH Transactions
       * @member of {ACHModule_PresentationController}
       * @param {JSON Array } response - Navigation Object with information on SuccessForms, Key and Context
       * @return {JSON Array} response - formatted ACH Trnsactions
       * @throws {}
       */
  ACHModule_PresentationController.prototype.onGetRejectedACHTransactionsSuccess = function(response) {
    response.forEach(function(responseObj) {
      responseObj.TemplateName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.TemplateName, 15),
        toolTip: responseObj.TemplateName
      };
      responseObj.userName = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.userName, 15),
        toolTip: responseObj.userName
      };
      responseObj.Approver = {
        text: CommonUtilities.truncateStringWithGivenLength(responseObj.Approver, 15),
        toolTip: responseObj.Approver
      };
      responseObj.DebitOrCreditAccount = responseObj.DebitAccount;
      responseObj.CreatedBy = responseObj.userName;
      responseObj.Approvals = responseObj.Approver;
      responseObj.Status = responseObj.StatusValue;
      responseObj.Amount = CommonUtilities.formatCurrencyWithCommas(responseObj.TotalAmount, true);
      responseObj.CreatedOn = CommonUtilities.getFrontendDateStringInUTC(responseObj.CreatedOn, "mm/dd/yyyy");
      responseObj.TransmittedDate = responseObj.CreatedOn;
      if (responseObj.RequestType.includes("PPD") || responseObj.RequestType.includes("CCD") || responseObj.RequestType.includes("CTX")) {
        responseObj.RequestType = (responseObj.RequestType).substring(0, 3) + " " + responseObj.TransactionTypeValue;
      }
    });
    return (response);
  };

  ACHModule_PresentationController.prototype.onGetRejectedACHTransactionsFailure = function(failureCallbackOfForm, responseError) {
    //alert(JSON.stringify(responseError));
    failureCallbackOfForm(responseError);
  };

  /**
       * getACHTransactionRecordsSuccess : Method to format the data of the Transaction Records based on the Transaction ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @param {JSON Array} response - Array of responses where all are records for the given transaction ID
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTransactionRecordsSuccess = function(navObject, response) {
    var scopeObj = this;
    var subRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": response
      }
    };

    var successCallSubrecord = function(TransactionRecord_id, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subRecordsMap[TransactionRecord_id] = [];
      else
        subRecordsMap[TransactionRecord_id] = subrecords;

      for (var subrecord in subRecordsMap) {
        if (subRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subRecordsMap) {
          if (subRecordsMap[subrecord] === "error") {
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
              obj.Amount = CommonUtilities.formatCurrencyWithCommas(subRecordsMap[obj.TransactionRecord_id][0].Amount, true);
            }
          });
          navigationContext.context.responseData = response;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(TransactionRecord_id) {
      subRecordsMap[TransactionRecord_id] = "error";
    };


    response.forEach(function(obj) {
      if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
        subRecordsMap[obj.TransactionRecord_id] = null;
      }
    });

    if (Object.keys(subRecordsMap).length !== 0) {
      response.forEach(function(obj) {
        if (obj.TransactionRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
          scopeObj.getACHTransactionSubRecords(obj.TransactionRecord_id, successCallSubrecord.bind(scopeObj, obj.TransactionRecord_id), failureCallSubrecord.bind(scopeObj, obj.TransactionRecord_id));
        }
      });
    } else {
      response.forEach(function(obj) {
        obj.Amount = {
          "text": CommonUtilities.formatCurrencyWithCommas(obj.Amount, true),
          "left": (kony.application.getCurrentBreakpoint() === 1024) ? "7%" : "10.3%"
        };
        obj.AdditionalInfo = kony.sdk.isNullOrUndefined(obj.AdditionalInfo) ? "N/A" : obj.AdditionalInfo;
        obj.Detail_id = kony.sdk.isNullOrUndefined(obj.Detail_id) ? "N/A" : obj.Detail_id;
        obj.Record_Name = kony.sdk.isNullOrUndefined(obj.Record_Name) ? "N/A" : obj.Record_Name;
        obj.ABATRCNumber = kony.sdk.isNullOrUndefined(obj.ABATRCNumber) ? "N/A" : obj.ABATRCNumber;
      });
      navigationContext.context.response = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }
  };


  /**
       * getACHTransactionRecordsFailure : Method to format the data of the Template Records based on the Template ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} responseError - response Error for the call
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTransactionRecordsFailure = function(responseError) {
    return (responseError);
  };


  /**
       * getACHTransactionRecords : Method to fetch the data of the Transactoin Records based on the Transaction ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTransactionRecords = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchACHTransactionRecords(
      navObject.requestData,
      scopeObj.getACHTransactionRecordsSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHTemplateRecordsFailure")
    );
  };


  /**
       * getACHTemplateRecordsSuccess : Method to format the data of the Template Records based on the Template ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @param {JSON Array} response - Array of responses where all are records for the given Template ID
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTemplateRecordsSuccess = function(navObject, response) {
    var scopeObj = this;
    var subRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var isEdit = (navObject.onSuccess.context.key === BBConstants.SHOW_ACH_RECORDS_FOR_EDIT);
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": {
          "response": response
        }
      }
    };

    var successCallSubrecord = function(TemplateRecord_id, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subRecordsMap[TemplateRecord_id] = [];
      else
        subRecordsMap[TemplateRecord_id] = subrecords;

      for (var subrecord in subRecordsMap) {
        if (subRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subRecordsMap) {
          if (subRecordsMap[subrecord] === "error") {
            isValid = false;
            break;
          }
          isValid = true;
        }
        if (isValid === true) {
          response.isTaxType = true;
          response.forEach(function(obj) {
            if (obj.TemplateRecord_id) {
              if (isEdit) {
                obj.EmpIDNumber = {
                  "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.tax.EIN"),
                  "text": kony.sdk.isNullOrUndefined(obj.EIN) ? "" : obj.EIN
                };
                obj.AccountNumber = {
                  "placeholder": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                  "text": kony.sdk.isNullOrUndefined(obj.ToAccountNumber) ? "" : obj.ToAccountNumber
                };
                obj.ABAOrTRC = {
                  "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.ABAOrTRC"),
                  "text": kony.sdk.isNullOrUndefined(obj.ABATRCNumber) ? "" : obj.ABATRCNumber
                };
                obj.Amount = {
                  "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
                  "text": kony.sdk.isNullOrUndefined(subRecordsMap[obj.TemplateRecord_id][0].Amount) ? "" : subRecordsMap[obj.TemplateRecord_id][0].Amount
                };
                obj.zeroCheckbox = {
                  "src": (obj.IsZeroTaxDue === "1") ? ViewConstants.IMAGES.CHECKED_IMAGE : ViewConstants.IMAGES.UNCHECKED_IMAGE
                };
                obj.flxSubTaxAmt = {
                  "width": (kony.application.getCurrentBreakpoint() === 1024) ? "23%" : "25.83%"
                };
                obj.TaxSubCategory_id = subRecordsMap[obj.TemplateRecord_id][0].TaxSubCategory_id;
              } else {
                obj.taxSubType = subRecordsMap[obj.TemplateRecord_id][0].taxSubType;
                obj.TemplateSubRecord_id = subRecordsMap[obj.TemplateRecord_id][0].TemplateSubRecord_id;
                obj.TaxSubCategory_id = subRecordsMap[obj.TemplateRecord_id][0].TaxSubCategory_id;
                obj.Amount = CommonUtilities.formatCurrencyWithCommas(subRecordsMap[obj.TemplateRecord_id][0].Amount, true);
              }
            }
          });

          navigationContext.context.responseData = response;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(TemplateRecord_id) {
      subRecordsMap[TemplateRecord_id] = "error";
    };


    response.forEach(function(obj) {
      if (obj.TemplateRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
        subRecordsMap[obj.TemplateRecord_id] = null;
      }
    });

    if (Object.keys(subRecordsMap).length !== 0) {
      response.forEach(function(obj) {
        if (obj.TemplateRecord_id && /Tax/.test(obj.TemplateRequestTypeValue)) {
          scopeObj.getACHTemplateSubRecords(obj.TemplateRecord_id, successCallSubrecord.bind(scopeObj, obj.TemplateRecord_id), failureCallSubrecord.bind(scopeObj, obj.TemplateRecord_id));
        }
      });
    } else {
      response.isTaxType = false;
      response.forEach(function(obj) {
        if (isEdit) {
          obj.AccountNumber = {
            "placeholder": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
            "text": kony.sdk.isNullOrUndefined(obj.ToAccountNumber) ? "" : obj.ToAccountNumber
          };
          obj.ABAOrTRC = {
            "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.ABAOrTRC"),
            "text": kony.sdk.isNullOrUndefined(obj.ABATRCNumber) ? "" : obj.ABATRCNumber
          };
          obj.Amount = {
            "placeholder": kony.i18n.getLocalizedString("i18n.transfers.amountlabel"),
            "text": kony.sdk.isNullOrUndefined(obj.Amount) ? "" : obj.Amount
          };
          obj.Name = {
            "placeholder": kony.i18n.getLocalizedString("i18n.konybb.Common.Name"),
            "text": kony.sdk.isNullOrUndefined(obj.Record_Name) ? "" : obj.Record_Name
          };
          obj.DetailID = {
            "placeholder": kony.i18n.getLocalizedString("i18n.konybb.common.detailId"),
            "text": kony.sdk.isNullOrUndefined(obj.Detail_id) ? "" : obj.Detail_id
          };
          obj.AddInfo = {
            "placeholder": kony.i18n.getLocalizedString("i18n.CardManagement.AddInformation"),
            "text": kony.sdk.isNullOrUndefined(obj.AdditionalInfo) ? "" : obj.AdditionalInfo
          };
          obj.flxAmount = {
            "left": (kony.application.getCurrentBreakpoint() === 1024) ? "76%" : "79%"
          };
        } else {
          obj.Amount = {
            "text": CommonUtilities.formatCurrencyWithCommas(obj.Amount, true),
            "left": (kony.application.getCurrentBreakpoint() === 1024) ? "7%" : "10.3%"
          };
          obj.AdditionalInfo = kony.sdk.isNullOrUndefined(obj.AdditionalInfo) ? "N/A" : obj.AdditionalInfo;
        }
      });

      navigationContext.context.responseData = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }
  };


  /**
       * getACHTemplateRecordsFailure : failure call back
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} responseError - response Error for the call
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTemplateRecordsFailure = function(error) {
    return (error);
  };


  /**
       * getACHTemplateRecords : Method to fetch the data of the Template Records based on the template ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHTemplateRecords = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchACHTemplateRecords(
      navObject.requestData,
      scopeObj.getACHTemplateRecordsSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHTemplateRecordsFailure")
    );
  };

  /** 
        createBBGeneralTransaction - called in success callback of every CreateTransaction flow
        @params - object type - with fields - {"TransactionDate" :"2019-01-20", "Payee":"name/acountno", "Amount":"300", 
        "Frequency":"1", "Reccurence":"1", "DebitOrCreditAccount":"12213123", "BBGeneralTransactionType_id":"4"};
      **/
  ACHModule_PresentationController.prototype.createBBGeneralTransaction = function(params) {
    var scopeObj = this;
    scopeObj.ACHManager.createBBGeneralTransactions(params);
  };


  /**
       * createACHTransaction : Method to create an ACH Transaction
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.createACHTemplate = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    var params = navObject.requestData;
    params.MaxAmount = CommonUtilities.getFloatValueOfCurrency(params.MaxAmount).toString();
    scopeObj.ACHManager.createACHTemplate(
      params,
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "createACHTransactionSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "createACHTransactionFailure")
    );
  };

  /**
       * editACHTemplate : Method to edit an ACH Template
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.editACHTemplate = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    var params = navObject.requestData;
    params.MaxAmount = CommonUtilities.getFloatValueOfCurrency(params.MaxAmount).toString();
    scopeObj.ACHManager.editACHTemplate(
      params,
      scopeObj.onEditingACHTemplateSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "editACHTemplateFailure")
    );
  };


  ACHModule_PresentationController.prototype.onEditingACHTemplateSuccess = function(navObject, response) {
    var scopeObj = this;

    scopeObj.ACHManager.getTemplateDetailsById({
      "Template_id": response.Template_id
    },
                                               scopeObj.completeSuccessCall.bind(scopeObj, navObject, "onGetACHTemplatesAndACHTransactionsSuccess"),
                                               scopeObj.completeFailedCall.bind(scopeObj, navObject, "onEditingACHTemplateByIDFailure")
                                              );
  };


  ACHModule_PresentationController.prototype.onEditingACHTemplateByIDSuccess = function(response) {
    return (response);
  };

  ACHModule_PresentationController.prototype.onEditingACHTemplateByIDFailure = function(responseError) {
    return (responseError);
  };

  ACHModule_PresentationController.prototype.editACHTemplateFailure = function(responseError) {
    return (responseError);
  };

  /**
       * createACHTransaction : Method to create an ACH Transaction
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.createACHTransaction = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    var params = navObject.requestData;
    var hamburgerData = {};
    hamburgerData.menu = kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH");
    hamburgerData.subMenu = kony.i18n.getLocalizedString("i18n.konybb.ACH.MakeOneTimePayment");
    scopeObj.ACHManager.createACHTranscation(
      params,
      scopeObj.completeSuccessCallMFA.bind(scopeObj, navObject, "createACHTransactionSuccess", "createACHTransaction", hamburgerData),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "createACHTransactionFailure")
    );
  };

  ACHModule_PresentationController.prototype.deleteACHTemplates = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);

    var params = navObj.requestData;
    scopeObj.ACHManager.deleteACHTemplate(
      params,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, "onDeletingACHTemplateSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "onDeletingACHTemplateFailure")
    );
  };

  ACHModule_PresentationController.prototype.onDeletingACHTemplateSuccess = function(response) {
    var response = {
      "isDeleted": true
    }
    return (response);
  };

  ACHModule_PresentationController.prototype.onDeletingACHTemplateFailure = function(responseError) {
    return (responseError);
  };

  /**
       * saveTransaction : Method to save an ACH Transaction as a template
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.saveTransaction = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.saveTransaction(
      navObject.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObject, "saveTransactionAsTemplateSuccess"),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "saveTransactionAsTemplateFailure")
    );
  };


  /**
       * saveTransactionAsTemplateSuccess : Success Method to save an ACH Transaction as a template
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} response - result of the successfully creating the Template
       * @return {JSON Object} response - result of the successfully creating the Template
       * @throws {}
       */
  ACHModule_PresentationController.prototype.saveTransactionAsTemplateSuccess = function(response) {
    return (response);
  };


  /**
       * saveTransactionAsTemplateFailure : Failure Method to save an ACH Transaction as a template
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} response - result of the successfully creating the Template
       * @return {JSON Object} response - result of the successfully creating the Template
       * @throws {}
       */
  ACHModule_PresentationController.prototype.saveTransactionAsTemplateFailure = function(error) {
    return (error);
  };

  ACHModule_PresentationController.prototype.executeTemplate = function(navObject) {

    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    var hamburgerData = {};
    hamburgerData.menu = kony.i18n.getLocalizedString("i18n.konybb.ACH.ACH");
    hamburgerData.subMenu = kony.i18n.getLocalizedString("i18n.konybb.ACH.MakePaymentWithTemplate");
    if (!kony.sdk.isNullOrUndefined(navObject.requestData.MFAAttributes)) {
      var params = navObject.requestData.MFAAttributes;
      navObject.requestData = {};
      navObject.requestData.MFAAttributes = params;
    } else {
      //complete requestData should be sent
    }

    scopeObj.ACHManager.executeTemplate(
      navObject.requestData,
      scopeObj.completeSuccessCallMFA.bind(scopeObj, navObject, "createACHTransactionSuccess", "executeTemplate", hamburgerData),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "createACHTransactionFailure")
    );
  };

  /**
       * createACHTransactionSuccess : Success Method for create an ACH Transaction
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} response - result of the successfully creating the Template
       * @return {JSON Object} response - result of the successfully creating the Template
       * @throws {}
       */
  ACHModule_PresentationController.prototype.createACHTransactionSuccess = function(response) {
    var key = this.mfaManager.getMFAFlowType();
    if (key) {
      var context = {
        "key": key,
        "responseData": response
      }
      if (kony.application.getCurrentForm().id !== "frmACHDashboard") {
        applicationManager.getNavigationManager().navigateTo("frmACHDashboard");
      }
      applicationManager.getNavigationManager().updateForm(context, "frmACHDashboard");
    } else
      return (response);
  };


  /**
       * createACHTransactionFailure : Failure Method for create an ACH Transaction
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} response - result of the successfully creating the Template
       * @return {JSON Object} response - result of the successfully creating the Template
       * @throws {}
       */
  ACHModule_PresentationController.prototype.createACHTransactionFailure = function(error) {
    return (error);
  };

  ACHModule_PresentationController.prototype.onSendTemplateDataForActionSuccess = function(response) {
    return response;
    //any filtering logic goes here
  };

  ACHModule_PresentationController.prototype.onSendTemplateDataForActionFailure = function(response) {
    //give appropriate data for the failure call like some popup or so
  };

  ACHModule_PresentationController.prototype.sendTemplateDataForAction = function(templateNameData, rowsDataForSending) {
    //applicationManager.getACHManager().fetchACHDashboard(this.onACHDashboardSuccess.bind(this), this.onACHDashboardFailure.bind(this));
    var scopeObj = this;
    var requestInputs = {
      templateNameData,
      "Records": rowsDataForSending
    };
    var res = scopeObj.ACHManager.sendTemplateDataForAction(
      requestInputs,
      scopeObj.onSendTemplateDataForActionSuccess.bind(scopeObj, requestInputs),
      scopeObj.onSendTemplateDataForActionFailure.bind(scopeObj)
    );
    return res;
  };

  ACHModule_PresentationController.prototype.getACHTransactionSubRecordsSuccess = function(successcallback, response) {
    successcallback(response);
  };

  ACHModule_PresentationController.prototype.getACHTransactionSubRecordsFailure = function(failurecallback) {
    failurecallback();
  };

  ACHModule_PresentationController.prototype.getACHTransactionSubRecords = function(transactionId, successcallback, failurecallback) {
    var scopeObj = this;
    var requestInputs = {
      "TransactionRecord_id": transactionId
    };
    scopeObj.ACHManager.fetchACHTransactionSubRecords(
      requestInputs,
      scopeObj.getACHTransactionSubRecordsSuccess.bind(scopeObj, successcallback),
      scopeObj.getACHTransactionSubRecordsFailure.bind(scopeObj, failurecallback)
    );
  };

  ACHModule_PresentationController.prototype.getACHTemplateSubRecordsSuccess = function(successcallback, response) {
    successcallback(response);
  };

  ACHModule_PresentationController.prototype.getACHTemplateSubRecordsFailure = function(failurecallback) {
    failurecallback();
  };

  ACHModule_PresentationController.prototype.getACHTemplateSubRecords = function(templateId, successcallback, failurecallback) {
    var scopeObj = this;
    var requestInputs = {
      "TemplateRecord_id": templateId
    };
    scopeObj.ACHManager.fetchACHTemplateSubRecords(
      requestInputs,
      scopeObj.getACHTemplateSubRecordsSuccess.bind(scopeObj, successcallback),
      scopeObj.getACHTemplateSubRecordsFailure.bind(scopeObj, failurecallback)
    );
  };

  ACHModule_PresentationController.prototype.getACHTermsAndCondtions = function(navObj) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObj.onSuccess.form);
    scopeObj.ACHManager.fetchTermsAndConditionsPostLogin(
      navObj.requestData,
      scopeObj.completeSuccessCall.bind(scopeObj, navObj, ""),
      scopeObj.completeFailedCall.bind(scopeObj, navObj, "")
    );
  };

  /**
       * noServiceNavigate :  This method navigates to the froms screen without any service call
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObj - Navigation with SUccess and Failure flows
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.noServiceNavigate = function(navObj) {
    applicationManager.getNavigationManager().navigateTo({
      "appName" : navObj.onSuccess.appName,
      "friendlyName" : navObj.onSuccess.module+"/"+navObj.onSuccess.form
    });
    applicationManager.getNavigationManager().updateForm({
      "key": navObj.onSuccess.context.key,
      "responseData": null
    }, navObj.onSuccess.form);

  };


  /**
       * Wrapper method to be passed as successcallback,updates desired form with help navigationObject,dataProcessor,and response
       *@param {object} navigaton object
       *@param {function} dataProcessor - this function is used to process and return formatted response.
       *@param response from service call
       */
  ACHModule_PresentationController.prototype.completeSuccessCall = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onSuccess.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onSuccess.form;
          if (kony.application.getCurrentForm().id !== navigationContext.form) {
            applicationManager.getNavigationManager().navigateTo(navigationContext.form);
          }
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };


  /**
       * Wrapper method to be passed as failurecallback,updates desired form with help navigationObject,dataProcessor,and response
       *@param {object} navigaton object
       *@param {function} dataProcessor - this function is used to process and return formatted response.
       *@param response from service call
       */
  ACHModule_PresentationController.prototype.completeFailedCall = function(navigationObject, dataProcessor, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onFailure)) {
        var processedData;
        if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
          processedData = this[dataProcessor](response);
        } else {
          processedData = response;
        }

        if (!kony.sdk.isNullOrUndefined(processedData)) {
          var navigationContext = {};
          navigationContext.context = {
            key: navigationObject.onFailure.context.key,
            responseData: processedData
          };
          navigationContext.form = navigationObject.onFailure.form;
          applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
        } else {
          kony.print("Response is null or undefined");
        }
      }
    }
  };

  ACHModule_PresentationController.prototype.getAchCampaigns = function() {
    var scope = this;
    var asyncManager = applicationManager.getAsyncManager();
    var accountsManager = applicationManager.getAccountManager();
    var breakpoint = kony.application.getCurrentBreakpoint();
    asyncManager.callAsync(
      [
        asyncManager.asyncItem(accountsManager, 'getCampaigns', [{
          "screenName": "ACCOUNT_DASHBOARD",
          "scale": (breakpoint >= 1366) ? "1366" : breakpoint
        }])
      ],
      function(asyncResponses) {
        scope.getCampaigns(asyncResponses.responses[0].data);
      }
    )
  };
  /**
       *Method is used for fetching of campaigns
       * @param {Object}- list of campaigns
       */
  ACHModule_PresentationController.prototype.getCampaigns = function(response) {
    if (response.campaignSpecifications)
      this.getCampaignsSuccess(response);
    else
      this.getCampaignsFailure(response);
  };
  /**
       * Method that gets called when fetching unread messages is successful
       * @param {Object} messagesObj List of messages Object
       */
  ACHModule_PresentationController.prototype.getCampaignsSuccess = function(res) {
    applicationManager.getNavigationManager().updateForm({
      "campaignRes": res["campaignSpecifications"]
    });
  };
  /**
       * Method that gets called when there is an error in fetching unread messages for account dashboard
       * @param {Object} error Error Object
       */
  ACHModule_PresentationController.prototype.getCampaignsFailure = function(error) {
    applicationManager.getNavigationManager().updateForm({
      "campaignError": error
    });
  };

  // FIXING THE OTP ISSUE IN ACH FLOW  
  ACHModule_PresentationController.prototype.sendOTP = function(successCalback, failureCallback) {
    var authManager = applicationManager.getAuthManager();
    authManager.fetchOTP(this.OTPSuccess.bind(this, successCalback), this.OTPFails.bind(this, failureCallback));
  };

  ACHModule_PresentationController.prototype.OTPSuccess = function(successCalback, response) {
    successCalback(response);
  };

  ACHModule_PresentationController.prototype.OTPFails = function(failureCallback, response) {
    failureCallback(response);
  };

  ACHModule_PresentationController.prototype.verifySentOTP = function(otpDetails, successCalback, failureCallback) {
    var authManager = applicationManager.getAuthManager();
    if (otpDetails) {
      authManager.verifyOTP(otpDetails, this.OTPSuccess.bind(this, successCalback), this.OTPFails.bind(this, failureCallback));
    } else {
      applicationManager.getLoggerManager().log("Invalid deatails to verify OTP : " + otpDetails);
    }
  };
  ACHModule_PresentationController.prototype.completeSuccessCallMFA = function(navigationObject, dataProcessor, callbackFunctionName, hamburgerData, response) {
    if (!kony.sdk.isNullOrUndefined(navigationObject)) {
      if (!kony.sdk.isNullOrUndefined(navigationObject.onSuccess)) {
        this.mfaManager.setMFAFlowType(navigationObject.onSuccess.context.key);
        if (!kony.sdk.isNullOrUndefined(response) && !kony.sdk.isNullOrUndefined(response.MFAAttributes)) {
          var mfaJSON = {
            "flowType": this.mfaManager.getMFAFlowType(),
            "response": response,
            "objectServiceDetails": this.getObjectServiceDetails()
          };
          this.mfaManager.initMFAFlow(mfaJSON);
        } else {
          var processedData;
          if (!kony.sdk.isNullOrUndefined(dataProcessor) && dataProcessor !== "" && this[dataProcessor] instanceof Function) {
            processedData = this[dataProcessor](response);
          } else {
            processedData = response;
          }

          if (!kony.sdk.isNullOrUndefined(processedData)) {
            var navigationContext = {};
            navigationContext.context = {
              key: navigationObject.onSuccess.context.key,
              responseData: processedData
            };
            navigationContext.form = navigationObject.onSuccess.form;
            if (kony.application.getCurrentForm().id !== navigationContext.form) {
              applicationManager.getNavigationManager().navigateTo(navigationContext.form);
            }
            applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
          } else {
            kony.print("Response is null or undefined");
          }
        }
      }
    }
  };

  /**
       * getACHFileRecords : Method to fetch the data of the file Records based on the file ID
       * @member of {ACHModule_PresentationController}
       * @param {JSON Object} navObject - Navigation Object with requestData, success and failure form and keys
       * @return {} 
       * @throws {}
       */
  ACHModule_PresentationController.prototype.getACHFileRecords = function(navObject) {
    var scopeObj = this;
    applicationManager.getNavigationManager().updateForm({
      "key": BBConstants.LOADING_INDICATOR,
      "responseData": null
    }, navObject.onSuccess.form);
    scopeObj.ACHManager.fetchACHFileRecords(
      navObject.requestData,
      scopeObj.getACHFileRecordsSuccess.bind(scopeObj, navObject),
      scopeObj.completeFailedCall.bind(scopeObj, navObject, "getACHTemplateRecordsFailure")
    );
  };

  ACHModule_PresentationController.prototype.getACHFileRecordsSuccess = function(navObject, response) {

    var scopeObj = this;
    var subFileRecordsMap = {};
    var isDone = false;
    var isValid = false;
    var navigationContext = {
      "form": navObject.onSuccess.form,
      "context": {
        "key": navObject.onSuccess.context.key,
        "responseData": response
      }
    };
    var successCallSubrecord = function(achFileRecordId, subrecords) {
      if (subrecords === null || subrecords === [] || subrecords === undefined)
        subFileRecordsMap[achFileRecordId] = [];
      else
        subFileRecordsMap[achFileRecordId] = subrecords;

      for (var subrecord in subFileRecordsMap) {
        if (subFileRecordsMap[subrecord] === null) {
          isDone = false;
          break;
        }
        isDone = true;
      }

      if (isDone === true) {
        for (var subrecord in subFileRecordsMap) {
          if (subFileRecordsMap[subrecord] === "error") {
            isValid = false;
            break;
          }
          isValid = true;
        }
        if (isValid === true) {
          response.AchFileRecords.forEach(function(obj) {
            if (obj.achFileRecordId) {
              obj.AchFileSubrecords = subFileRecordsMap[obj.achFileRecordId].AchFileSubrecords;
            }
          });

          var responseRecords = {};
          responseRecords["transactionRecords"] = [];
          var k = 0;

          for (var i = 0; i < response.AchFileRecords.length; i++) {
            for (var j = 0; j < response.AchFileRecords[i].AchFileSubrecords.length; j++) {
              responseRecords.transactionRecords[k] = {};
              responseRecords.transactionRecords[k].receiverName = response.AchFileRecords[i].AchFileSubrecords[j].receiverName;
              responseRecords.transactionRecords[k].receiverAccountNumber = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountNumber;
              responseRecords.transactionRecords[k].receiverAccountType = response.AchFileRecords[i].AchFileSubrecords[j].receiverAccountType;
              responseRecords.transactionRecords[k].receiverTransactionType = response.AchFileRecords[i].AchFileSubrecords[j].receiverTransactionType;
              responseRecords.transactionRecords[k].amount = response.AchFileRecords[i].AchFileSubrecords[j].amount.toString();
              responseRecords.transactionRecords[k].achFileId = response.AchFileRecords[i].achFileId;
              responseRecords.transactionRecords[k].achFileRecordId = response.AchFileRecords[i].achFileRecordId;
              responseRecords.transactionRecords[k].offsetAccountNumber = response.AchFileRecords[i].offsetAccountNumber;
              responseRecords.transactionRecords[k].achFileSubRecordId = response.AchFileRecords[i].AchFileSubrecords[j].achFileSubRecordId;
              responseRecords.transactionRecords[k].offsetAmount = response.AchFileRecords[i].offsetAmount;
              responseRecords.transactionRecords[k].offsetTransactionType = response.AchFileRecords[i].offsetTransactionType;
              responseRecords.transactionRecords[k].requestType = response.AchFileRecords[i].requestType;
              responseRecords.transactionRecords[k].totalCreditAmount = response.AchFileRecords[i].totalCreditAmount;
              responseRecords.transactionRecords[k].totalDebitAmount = response.AchFileRecords[i].totalDebitAmount;
              k = k + 1;
            }
          }
          navigationContext.context.responseData = responseRecords;
        } else {
          navigationContext.context.responseData = null;
          navigationContext.context.key = navObject.onFailure.context.key;
          navigationContext.form = navObject.onFailure.form;
        }
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    };

    var failureCallSubrecord = function(achFileRecordId) {
      subFileRecordsMap[achFileRecordId] = "error";
    };

    if ((!kony.sdk.isNullOrUndefined(response.AchFileRecords)) && Array.isArray(response.AchFileRecords)) {
      if (response.AchFileRecords.length > 0) {
        response.AchFileRecords.forEach(function(obj) {
          if (obj.achFileRecordId) {
            subFileRecordsMap[obj.achFileRecordId] = null;
            scopeObj.getACHFileSubRecords(obj.achFileRecordId, successCallSubrecord.bind(scopeObj, obj.achFileRecordId), failureCallSubrecord.bind(scopeObj, obj.achFileRecordId));
          }
        });
      } else {
        navigationContext.context.response = response;
        applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
      }
    } else {
      navigationContext.context.response = response;
      applicationManager.getNavigationManager().updateForm(navigationContext.context, navigationContext.form);
    }

  };

  ACHModule_PresentationController.prototype.getACHFileSubRecordsSuccess = function(successcallback, response) {
    successcallback(response);
  };

  ACHModule_PresentationController.prototype.getACHFileSubRecordsFailure = function(failurecallback) {
    failurecallback();
  };

  ACHModule_PresentationController.prototype.getACHFileSubRecords = function(achFileRecordId, successcallback, failurecallback) {
    var scopeObj = this;
    var requestInputs = {
      "achFileRecordId": achFileRecordId
    };
    scopeObj.ACHManager.fetchACHFileSubRecords(
      requestInputs,
      scopeObj.getACHFileSubRecordsSuccess.bind(scopeObj, successcallback),
      scopeObj.getACHFileSubRecordsFailure.bind(scopeObj, failurecallback)
    );
  };

  ACHModule_PresentationController.prototype.getObjectServiceDetails = function() {
    var objectServiceDetails = undefined;
    var flowType = applicationManager.getMFAManager().getMFAFlowType();
    switch (flowType) {
      case "SHOW_CREATED_TRANSACTION":
        objectServiceDetails = {
          "action": "ACHTransaction",
          "serviceName": "ACHObjects",
          "dataModel": "ACHTransactions",
          "verifyOTPOperationName": "createACHTransaction",
          "requestOTPOperationName": "createACHTransaction",
          "resendOTPOperationName": "createACHTransaction",
        };
        break;
      case "EXECUTE_TEMPLATE_SUCCESS":
        objectServiceDetails = {
          "action": "ACHTransaction",
          "serviceName": "ACHObjects",
          "dataModel": "ACHTemplates",
          "verifyOTPOperationName": "Execute",
          "requestOTPOperationName": "Execute",
          "resendOTPOperationName": "Execute",
        };
        break;
      case "FETCH_UPLOADED_ACH_FILE":
        objectServiceDetails = {
          "action": "UploadACHFile",
          "serviceName": "ACHObjects",
          "dataModel": "ACHFile",
          "verifyOTPOperationName": "UploadACHFile",
          "requestOTPOperationName": "UploadACHFile",
          "resendOTPOperationName": "UploadACHFile",
        };
        break;
      default:
        objectServiceDetails = undefined;
        break;
    }
    return objectServiceDetails;
  };


  return ACHModule_PresentationController;
});