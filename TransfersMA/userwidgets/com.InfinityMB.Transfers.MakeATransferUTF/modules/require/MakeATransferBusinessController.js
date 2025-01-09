define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'], function(FormatUtils, DataValidationHandler, InvokeServiceUtils) {

  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.formatUtils = new FormatUtils();
    this.dataValidationHandler = new DataValidationHandler();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
    this.filterFromAccounts = "Loan,CreditCard" ;
    this.filterType = "accountType";
    this.phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\D\./0-9]*$/g;
    this.zipRegex = /^[^-_][a-zA-Z0-9\s-]*[a-zA-Z0-9\s]+$/;
    this.invalidChar = "&%<>\/\+'=|\\" ;
	this.alphaNumeric = /^[a-z\d\-_\s]+$/i;
  this.controller = {};
	Date.prototype.format = function (format) {
      var date = this;
      return format.replace(/(\\?)(.)/g, function (_, esc, chr) {
        return esc === "" && Date.replaceChars[chr] ? Date.replaceChars[chr].call(date) : chr
      })
    }
    /**@member {OBJECT}  contains all different types of calender notations*/
    Date.replaceChars = {
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      longMonthsUpperCase: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
      d: function () {
        return (this.getDate() < 10 ? "0" : "") + this.getDate();
      },
      D: function () {
        return Date.replaceChars.shortDays[this.getDay()];
      },
      j: function () {
        return this.getDate();
      },
      l: function () {
        return Date.replaceChars.longDays[this.getDay()];
      },
      N: function () {
        return this.getDay() === 0 ? 7 : this.getDay();
      },
      S: function () {
        return this.getDate() % 10 == 1 && this.getDate() != 11 ? "st" : this.getDate() % 10 == 2 && this.getDate() != 12 ? "nd" : this.getDate() % 10 == 3 && this.getDate() != 13 ? "rd" : "th";
      },
      w: function () {
        return this.getDay();
      },
      z: function () {
        var d = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((this - d) / 864e5);
      },
      W: function () {
        var target = new Date(this.valueOf());
        var dayNr = (this.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
          target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 6048e5);
      },
      F: function () {
        return Date.replaceChars.longMonths[this.getMonth()];
      },
      m: function () {
        return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1);
      },
      M: function () {
        return Date.replaceChars.shortMonths[this.getMonth()];
      },
      n: function () {
        return this.getMonth() + 1;
      },
      t: function () {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 0).getDate();
      },
      L: function () {
        var year = this.getFullYear();
        return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
      },
      o: function () {
        var d = new Date(this.valueOf());
        d.setDate(d.getDate() - (this.getDay() + 6) % 7 + 3);
        return d.getFullYear();
      },
      Y: function () {
        return this.getFullYear();
      },
      y: function () {
        return ("" + this.getFullYear()).substr(2);
      },
      a: function () {
        return this.getHours() < 12 ? "am" : "pm";
      },
      A: function () {
        return this.getHours() < 12 ? "AM" : "PM";
      },
      B: function () {
        return Math.floor(((this.getUTCHours() + 1) % 24 + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1e3 / 24);
      },
      g: function () {
        return this.getHours() % 12 || 12;
      },
      G: function () {
        return this.getHours();
      },
      h: function () {
        return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12);
      },
      H: function () {
        return (this.getHours() < 10 ? "0" : "") + this.getHours();
      },
      i: function () {
        return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
      },
      s: function () {
        return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
      },
      u: function () {
        var m = this.getMilliseconds();
        return (m < 10 ? "00" : m < 100 ? "0" : "") + m;
      },
      e: function () {
        return "Not Yet Supported";
      },
      I: function () {
        var DST = null;
        for (var i = 0; i < 12; ++i) {
          var d = new Date(this.getFullYear(), i, 1);
          var offset = d.getTimezoneOffset();
          if (DST === null)
            DST = offset;
          else if (offset < DST) {
            DST = offset;
            break;
          } else if (offset > DST)
            break;
        }
        return this.getTimezoneOffset() == DST | 0;
      },
      O: function () {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + "00";
      },
      P: function () {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + ":00";
      },
      T: function () {
        return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
      },
      Z: function () {
        return -this.getTimezoneOffset() * 60;
      },
      c: function () {
        return this.format("Y-m-d\\TH:i:sP");
      },
      r: function () {
        return this.toString();
      },
      U: function () {
        return this.getTime() / 1e3;
      },
      Q: function () {
        return Date.replaceChars.longMonthsUpperCase[this.getMonth()];
      }
    }
  }

  /**
	* @api : setProperties
	* sets initial properties
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON) {
    this.serviceParameters = serviceParameters;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };

  BusinessController.prototype.setController = function (controller) {
    this.controller = controller;
  }; 
  
  /**
	* @api : getMetaData
	* get meta data  from the model
	* @return : NA
	*/
  BusinessController.prototype.getMetaData = function() {
    var scope = this;
    function getMetaDataSuccess(response) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(response);
      objectMetadata = {"amount":{"validation":"AMOUNT","format":"AMOUNT"},"description":{"validation":"TEXT"},"fromAccountBalance":{"validation":"AMOUNT","format":"AMOUNT"},"fromAccountNumber":{"validation":"ACCOUNT_NUMBER"},"scheduledDate":{"validation":"DATE","format":"DATE"},"toAccountNumber":{"validation":"ACCOUNT_NUMBER"},"transactionDate":{"validation":"DATE","format":"DATE"},"payeeCurrency":{"format":"CURRENCY"},"transactionCurrency":{"format":"CURRENCY"},"availableBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"outstandingBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"currentBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"},"beneficiaryName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountNumber"}};
      scope.objectMetadata[scope.serviceParameters.GetFromAccounts.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err,"getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(this.serviceParameters.GetFromAccounts.Service, this.serviceParameters.GetFromAccounts.Object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.GetFromAccounts.Service, this.serviceParameters.GetFromAccounts.Object);
    this.getMetaDataFromModel(this.serviceParameters.GetExternalPayees.Service, this.serviceParameters.GetExternalPayees.Object);
    if(this.serviceParameters.GetCreditCardAccounts)
      this.getMetaDataFromModel(this.serviceParameters.GetCreditCardAccounts.Service, this.serviceParameters.GetCreditCardAccounts.Object);
    // this.getMetaDataFromModel(this.serviceParameters.FetchContractCustomers.Service, this.serviceParameters.FetchContractCustomers.Object);
  };
/**
	* @api : getMetaDataFromModel
	* get meta data  from the model
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataFromModel = function(service, object) {
    var scope = this;
    function getMetaDataSuccess(res) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
      if(object === "Recipients" || object ==="Payees") {
        object = "Recipients";
        objectMetadata =  {"availableBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"outstandingBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"currentBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"},"beneficiaryName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountNumber"}};
      }
      else if(object === "DigitalArrangements" || object === "Accounts" || object === "CreditCard") {
        objectMetadata =  {"availableBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"outstandingBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"currentBalance":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"currencyCode"},"accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"},"beneficiaryName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountNumber"},"nextPaymentDate":{"validation":"DATE","format":"DATE"}};
      }
      scope.objectMetadata[object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err, "getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
  * @api : getMetaData
  * get meta data  from the model
  * @return : NA
  */
  BusinessController.prototype.getMetaDataForTransactionsObject = function() {
    var scope = this;
    function getMetaDataSuccess(response) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(response);
      scope.objectMetadata[scope.serviceParameters.GetBankDate.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err,"getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(this.serviceParameters.GetBankDate.Service, this.serviceParameters.GetBankDate.Object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
	* @api : invokeCustomVerbforGetFromAccounts
	* fetches the  data from the object model for From Accounts
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetFromAccounts = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetFromAccounts.Object, this.serviceParameters.GetFromAccounts.Criteria, this.serviceParameters.GetFromAccounts.Verb)
      .then(this.ListFromAccounts.bind(this, this.serviceParameters.GetFromAccounts.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetFromAccounts"));
  };
  /**
	* @api : invokeCustomVerbforGetCreditCardAccounts
	* fetches the  data from the object model for From Accounts
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetCreditCardAccounts = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetCreditCardAccounts.Object, this.serviceParameters.GetCreditCardAccounts.Criteria, this.serviceParameters.GetCreditCardAccounts.Verb)
      .then(this.getCreditCardAccounts.bind(this, this.serviceParameters.GetCreditCardAccounts.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetCreditCardAccounts"));
  };
  /**
	* @api : invokeCustomVerbforGetExternalPayees
	* fetches the  data from the object model for From Recipients
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetExternalPayees = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetExternalPayees.Object, this.serviceParameters.GetExternalPayees.Criteria, this.serviceParameters.GetExternalPayees.Verb)
      .then(this.getExternalPayees.bind(this, this.serviceParameters.GetExternalPayees.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetExternalPayees"));
  };
  
  /**
  * @api : invokeCustomVerbforGetExternalPayees
  * fetches the  data from the object model for From Recipients
  * @return : NA
  */ 
  BusinessController.prototype.invokeCustomVerbforGetBeneficiaryName = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBeneficiaryName.Object, this.getCriteria(this.serviceParameters.GetBeneficiaryName.Criteria), this.serviceParameters.GetBeneficiaryName.Verb)
      .then(this.getBeneficiaryDetails.bind(this, this.serviceParameters.GetBeneficiaryName.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetBeneficiaryName"));
  };
  
  /**
  * @api : invokeCustomVerbforGetBankDate
  * fetches the  data from the object model for From Recipients
  * @return : NA
  */ 
  BusinessController.prototype.invokeCustomVerbforGetBankDate = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDate.Object, this.serviceParameters.GetBankDate.Criteria, this.serviceParameters.GetBankDate.Verb)
      .then(this.getBankDate.bind(this, this.serviceParameters.GetBankDate.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetBankDate"));
  };
   BusinessController.prototype.invokeCustomVerbforPayaPerson = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetP2PPayee.Object, this.serviceParameters.GetP2PPayee.Criteria, this.serviceParameters.GetP2PPayee.Verb)
      .then(this.GetP2PPayee.bind(this, this.serviceParameters.GetP2PPayee.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforPayaPerson"));
  };
  /**
  * @api : invokeCustomVerbforGetCountryCodesList
  * fetches the  data from the object model for From Country codes list
  * @return : NA
  */ 
  BusinessController.prototype.invokeCustomVerbforGetCountryCodesList = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetCountryCode.Object, this.serviceParameters.GetCountryCode.Criteria, this.serviceParameters.GetCountryCode.Verb)
      .then(this.getCountryCodesList.bind(this, this.serviceParameters.GetCountryCode.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetCountryCodesList"));
  };

    /**
	* @api : invokeCustomVerbforPurposeCodes
	* fetches purposeCodes
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforPurposeCodes = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.PurposeCodes.Object, this.serviceParameters.PurposeCodes.Criteria, this.serviceParameters.PurposeCodes.Verb)
      .then(this.fetchPurposeCodes.bind(this, this.serviceParameters.PurposeCodes.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforPurposeCodes"));
  };
  /**
	* @api : fetchPurposeCode
	* success call of purpose codes
	* @return : NA
	*/
  BusinessController.prototype.fetchPurposeCodes = function(object, data) {
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : data.PurposeCodes,
      key : "purposeCodes"
    });
  };

    /**
	* @api : invokeCustomVerbforClearingIdentifierCodes
	* fetches ClearingIdentifierCodes
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforClearingIdentifierCodes = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ClearingIdentifierCodes.Object, this.serviceParameters.ClearingIdentifierCodes.Criteria, this.serviceParameters.ClearingIdentifierCodes.Verb)
      .then(this.fetchClearingIdentifierCodes.bind(this, this.serviceParameters.ClearingIdentifierCodes.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforClearingIdentifierCodes"));
  };

  /**
	* @api : fetchPurposeCode
	* success call of ClearingIdentifierCodes
	* @return : NA
	*/
  BusinessController.prototype.fetchClearingIdentifierCodes = function(object, data) {
    kony.application.dismissLoadingScreen();
    var clearingIdentifierCodes = data.PurposeCodes;
    this.controller.clearingIdentifierCodesUpdated=true;
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : clearingIdentifierCodes,
      key : "clearingIdentifierCodes"
    });
  };
  
  
   BusinessController.prototype.getCurrencyForThirdPartyToAccount = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBeneficiaryName.Object, this.getCriteria(this.serviceParameters.GetBeneficiaryName.Criteria), this.serviceParameters.GetBeneficiaryName.Verb)
      .then(this.getCurrencyForThirdPartyToAccountSuccess.bind(this, this.serviceParameters.GetBeneficiaryName.Object))
      .catch(scope.setError.bind(this, "getCurrencyForThirdPartyToAccount"));
 };
  // to do 
 BusinessController.prototype.createOTTransaction = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.createOTTransaction.Object, this.getCriteria(this.serviceParameters.createOTTransaction.Criteria), this.serviceParameters.createOTTransaction.Verb)
    .then(this.createTransactionSuccess.bind(this, this.serviceParameters.createOTTransaction.Object))
    .catch(scope.setErrorInCreateTransaction.bind(this, "getCurrencyForThirdPartyToAccount"));
 };
 // to do 
 BusinessController.prototype.createCreditCardTransaction = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.createCreditCardTransaction.Object, this.getCriteria(this.serviceParameters.createCreditCardTransaction.Criteria), this.serviceParameters.createCreditCardTransaction.Verb)
    .then(this.createTransactionSuccess.bind(this, this.serviceParameters.createCreditCardTransaction.Object))
    .catch(scope.setErrorInCreateTransaction.bind(this, "createCreditCardTransaction"));
 };
 // to do
 BusinessController.prototype.createTransaction = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.createTransaction.Object, this.getCriteria(this.serviceParameters.createTransaction.Criteria), this.serviceParameters.createTransaction.Verb)
    .then(this.createTransactionSuccess.bind(this, this.serviceParameters.createTransaction.Object))
    .catch(scope.setErrorInCreateTransaction.bind(this, "createTransaction"));
 };
  
  BusinessController.prototype.createTransactionforEditFlow = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.createTransactionforeditflow.Object, this.getCriteria(this.serviceParameters.createTransactionforeditflow.Criteria), this.serviceParameters.createTransactionforeditflow.Verb)
      .then(this.createTransactionSuccess.bind(this, this.serviceParameters.createTransactionforeditflow.Object))
      .catch(scope.setErrorInCreateTransaction.bind(this, "createTransactionforeditflow"));
  };
  
BusinessController.prototype.CreateOwnAccountsTransfer = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.CreateOwnAccountsTransfer.Object, this.getCriteria(this.serviceParameters.CreateOwnAccountsTransfer.Criteria), this.serviceParameters.CreateOwnAccountsTransfer.Verb)
    .then(this.createTransactionSuccess.bind(this, this.serviceParameters.CreateOwnAccountsTransfer.Object))
    .catch(scope.setErrorInCreateTransaction.bind(this, "CreateOwnAccountsTransfer"));

};
  
  BusinessController.prototype.EditOwnAccountsTransferCreate = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.EditOwnAccountsTransferCreate.Object, this.getCriteria(this.serviceParameters.EditOwnAccountsTransferCreate.Criteria), this.serviceParameters.EditOwnAccountsTransferCreate.Verb)
      .then(this.createTransactionSuccess.bind(this, this.serviceParameters.EditOwnAccountsTransferCreate.Object))
      .catch(scope.setErrorInCreateTransaction.bind(this, "EditOwnAccountsTransferCreate"));
  };
// to do
 BusinessController.prototype.ValidateOTTDetails = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateOTTransaction.Object, this.getCriteria(this.serviceParameters.validateOTTransaction.Criteria), this.serviceParameters.validateOTTransaction.Verb)
    .then(this.validateSuccess.bind(this, this.serviceParameters.validateOTTransaction.Object))
    .catch(scope.setError.bind(this, "getCurrencyForThirdPartyToAccount"));
 };
 // to do
 BusinessController.prototype.validateCreditCardTransaction = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateCreditCardTransaction.Object, this.getCriteria(this.serviceParameters.validateCreditCardTransaction.Criteria), this.serviceParameters.validateCreditCardTransaction.Verb)
    .then(this.validateSuccess.bind(this, this.serviceParameters.validateCreditCardTransaction.Object))
    .catch(scope.setError.bind(this, "validateCreditCardTransaction"));
 };
 // to do
 BusinessController.prototype.ValidateDetails = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateATransfer.Object, this.getCriteria(this.serviceParameters.validateATransfer.Criteria), this.serviceParameters.validateATransfer.Verb)
    .then(this.validateSuccess.bind(this, this.serviceParameters.validateATransfer.Object))
    .catch(scope.setError.bind(this, "getCurrencyForThirdPartyToAccount"));
 };

 // to do
 BusinessController.prototype.ownAccountsValidate = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.OwnAccountsValidate.Object, this.getCriteria(this.serviceParameters.OwnAccountsValidate.Criteria), this.serviceParameters.OwnAccountsValidate.Verb)
    .then(this.validateSuccess.bind(this, this.serviceParameters.OwnAccountsValidate.Object))
    .catch(scope.setError.bind(this, "getCurrencyForThirdPartyToAccount"));
 };


 BusinessController.prototype.getLoanAccountDetails = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetLoanAccountDetails.Object, this.getCriteria(this.serviceParameters.GetLoanAccountDetails.Criteria), this.serviceParameters.GetLoanAccountDetails.Verb)
    .then(this.GetLoanAccountDetailsSuccess.bind(this, this.serviceParameters.GetLoanAccountDetails.Object))
    .catch(scope.setError.bind(this, "getLoanAccountDetails"));
 };

BusinessController.prototype.invokeValidateIBANService = function(){
   var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.IsValidIBAN.Object, this.getCriteria(this.serviceParameters.IsValidIBAN.Criteria), this.serviceParameters.IsValidIBAN.Verb)
    .then(this.IsValidIBANSuccess.bind(this, this.serviceParameters.IsValidIBAN.Object))
    .catch(scope.setError.bind(this, "invokeValidateIBANService"));
};

BusinessController.prototype.getBankDetailsFromSwift = function(){
  var scope = this;
  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDetailsFromSwift.Object, this.getCriteria(this.serviceParameters.GetBankDetailsFromSwift.Criteria), this.serviceParameters.GetBankDetailsFromSwift.Verb)
    .then(this.GetBankDetailsFromSwiftSuccess.bind(this, this.serviceParameters.GetBankDetailsFromSwift.Object))
    .catch(scope.setError.bind(this, "getBankDetailsFromSwift"));
};

  BusinessController.prototype.invokeSwiftServiceFromIBAN = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDetailsFromIBAN.Object, this.getCriteria(this.serviceParameters.GetBankDetailsFromIBAN.Criteria), this.serviceParameters.GetBankDetailsFromIBAN.Verb)
      .then(this.invokeSwiftServiceFromIBANSuccess.bind(this, this.serviceParameters.GetBankDetailsFromIBAN.Object))
      .catch(scope.setError.bind(this, "invokeSwiftServiceFromIBAN"));
  };

 BusinessController.prototype.getCurrencyForThirdPartyToAccountSuccess = function(object, data){
   var collectionObj = this.store.getState();
     collectionObj.Collection.TransactionObject["toTransactionCurrency"] = data.currency;
     this.setDataInCollection("TransactionObject",collectionObj.Collection["TransactionObject"]);
    kony.application.dismissLoadingScreen();
 };

 BusinessController.prototype.validateSuccess = function(object, data){
  this.setDataInCollection("validateResponse", data);
 };

 BusinessController.prototype.createTransactionSuccess = function(object, data){
  this.setDataInCollection("transactionResponse", data);
 };
  

 BusinessController.prototype.GetBankDetailsFromSwiftSuccess = function(object, data){
  var collectionObj = this.store.getState();
  collectionObj.Collection.TransactionObject["isIBANValid"] ="YES";
  collectionObj.Collection.TransactionObject["isBICValid"] =data.isBICValid;
  if(data.bankName){
   if(data.bankName.length >105){
       var bankName;
       bankName = data.bankName.substr(0,104) + "....";
       collectionObj.Collection.TransactionObject["bankName"]=data.bankName +","+data.countryCode;
       collectionObj.Collection.TransactionObject["ibanBankName"]=bankName;
       } else {
       collectionObj.Collection.TransactionObject["bankName"]=data.bankName +","+data.countryCode;
       collectionObj.Collection.TransactionObject["ibanBankName"]=data.bankName +","+data.countryCode;
       }
   }
   else{
    collectionObj.Collection.TransactionObject["bankName"]="";
    collectionObj.Collection.TransactionObject["ibanBankName"]="";
   }
   this.setDataInCollection("TransactionObject",collectionObj.Collection["TransactionObject"]);
   this.controller.setRequiredCode();
  kony.application.dismissLoadingScreen();
 };
 
 BusinessController.prototype.invokeSwiftServiceFromIBANSuccess = function(object, data){
    var collectionObj = this.store.getState();
    if(data["bic"])
      collectionObj.Collection.TransactionObject["swiftCode"] = data["bic"];
    collectionObj.Collection.TransactionObject["isIBANValid"] ="YES";
    if(data.bankName){
      if(data.bankName.length >105){
       var bankName;
       bankName = data.bankName.substr(0,104) + "....";
       collectionObj.Collection.TransactionObject["bankName"]=data.bankName +","+data.countryCode;
       collectionObj.Collection.TransactionObject["ibanBankName"]=bankName;
       } else {
       collectionObj.Collection.TransactionObject["bankName"]=data.bankName +","+data.countryCode;
       collectionObj.Collection.TransactionObject["ibanBankName"]=data.bankName +","+data.countryCode;
       }
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data:  collectionObj.Collection["TransactionObject"],
        key : "TransactionObject"
      });
    }
    kony.application.dismissLoadingScreen();
  };
 
 BusinessController.prototype.IsValidIBANSuccess = function(object,data){
    //   if(data.isIBANValid === "YES"){
    //     this.getBankDetailsFromSwift();
    //   }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "IBAN"
    });
 };
  
 BusinessController.prototype.GetLoanAccountDetailsSuccess = function(object,data){
  var collectionObj = this.store.getState();
  if(data.Accounts[0].nextPaymentDate){
    collectionObj.Collection.TransactionObject["dueDate"] = data.Accounts[0].nextPaymentDate; 
  }
  if (data.Accounts[0].currencyCode) {
    collectionObj.Collection.TransactionObject["transactionCurrency"] = data.Accounts[0].currencyCode;
  }
   var frmdata = collectionObj.Cache["Accounts"].Accounts;
   for (i = 0; i < frmdata.length; i++) {
     if (data.Accounts[0].accountID === frmdata[i]["accountID"]){ 
       frmdata[i]["currentAmountDue"] = data.Accounts[0].paymentDue;
       frmdata[i]["transactionCurrency"] = data.Accounts[0].currencyCode;
       if(data.Accounts[0].nextPaymentAmount && data.Accounts[0].paymentDue){
         var paymentDue =  parseInt(data.Accounts[0].nextPaymentAmount) + parseInt(data.Accounts[0].paymentDue);
        frmdata[i]["paymentDue"] = paymentDue; 
       }
     }
   }
  this.setDataInCollection("TransactionObject",collectionObj.Collection["TransactionObject"]);
  kony.application.dismissLoadingScreen();
 };
 
 
  /**
	* @api : ListFromAccounts
	* Stores all the Accounts
	* @return : NA
	*/
  BusinessController.prototype.ListFromAccounts = function(object, data){ 
    let filteredAccountsData = data.Accounts.filter(filteredAccountData => filteredAccountData.accountStatus === "ACTIVE" || filteredAccountData.accountStatus === "CLOSURE_PENDING");
    var slaveData = this.getFormattedData(object, filteredAccountsData);
    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      masterData: data,
      slaveData: slaveData,
      key : "Accounts"
    });
    //  }
  };
  /**
	* @api : getExternalPayees
	* Stores all the External payees of the user
	* @return : NA
	*/
  BusinessController.prototype.getExternalPayees = function(object, data) {
    object = "Recipients";
    data = data.ExternalAccounts.filter(record => (record.hasOwnProperty("payeeStatus") && record["payeeStatus"]!== "Pending")) ;
    data.forEach(payee =>{
      payee.clearingCode1 = payee.clearingCode;
      payee.countryName = payee.bankCountryName;
    })
    var slaveData = this.getFormattedData(object, data);
    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      masterData: data,
      slaveData: slaveData,
      key : object
    });
  };
  
  BusinessController.prototype.getBeneficiaryDetails = function (object, data) {
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : object
    });
  };
  
   BusinessController.prototype.GetP2PPayee = function(object, data){
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "P2P"
    });
    kony.application.dismissLoadingScreen();
  };
  /**
  * @api : getExternalPayees
  * Stores all the External payees of the user
  * @return : NA
  */
  BusinessController.prototype.getBankDate = function(object, data) {
    var formattedData = this.getFormattedData(object,data["date"]);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: formattedData,
      key : "BankDate"
    });
  };
  /**
	* @api : ListFromAccounts
	* Stores all the user Accounts
	* @return : NA
	*/
  BusinessController.prototype.getCreditCardAccounts = function(object, data) {
    var slaveData = this.getFormattedData(object, data.Accounts);
    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      masterData: data,
      slaveData: slaveData,
      key : "CreditCardAccounts"
    });
  };
  
  BusinessController.prototype.getCountryCodesList = function(key, data) {
    var scope = this;
    var newCountryList = [];
    kony.application.dismissLoadingScreen();
    data = data.records;
    var countriesList = JSON.parse(JSON.stringify(data));
    newCountryList.push(["0", "Select a country"]);
    countriesList.map(function (country) {
      return newCountryList.push([country.id, country.Name]);
    });
    this.controller.bankCountriesUpdated = true;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: newCountryList,
      key: "countries"
    });
  };


  /**
	* @api : getFormattedData
	* returns the formatted data
	* @return : NA
	*/

  BusinessController.prototype.getFormattedData = function(object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
    formattedData.map(function(record){
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if(objectMetadata.hasOwnProperty(key)){
          var metaData = objectMetadata[key];
          if(metaData.format != undefined){
            var dependentData;
            if(metaData.formatting_dependency){
              dependentData = record[metaData.formatting_dependency]
            }
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData); 
            record[key] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };
  
  BusinessController.prototype.helperFormat = function(format, fieldValue, dependentData){
    var scope = this;
    return scope.formatUtils.formatData(format, fieldValue, dependentData); 
  };

  BusinessController.prototype.getFormattedDate = function(value){
    return this.formatUtils.formatData("DATE",value);
  };
  
  BusinessController.prototype.setDataInCollection = function(key, data){
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : key
    });
    kony.application.dismissLoadingScreen();
  };

  BusinessController.prototype.formatAccountsData = function(accountsData){    
    for (var i =0; i <accountsData.length; i++){
      if(accountsData[i].accountName){
        accountsData[i]['formattedAccountName'] = accountsData[i].accountName+ "...."+ accountsData[i].accountID.substr(-4);
      }else{
        accountsData[i]['formattedAccountName'] = accountsData[i].beneficiaryName+ "...."+ accountsData[i].accountNumber.substr(-4);
      }
      switch(accountsData[i].accountType){
        case "Savings":
        case "Checking":
          accountsData[i]['formattedAvailableBalance'] = accountsData[i].currencyCode +accountsData[i].availableBalance;
          break;
        case "Loan":
          accountsData[i]['formattedAvailableBalance'] = accountsData[i].currencyCode +accountsData[i].outstandingBalance;
          break;
        case "CreditCard":
          accountsData[i]['formattedAvailableBalance'] = accountsData[i].currencyCode +accountsData[i].availableCredit;
          break ;
      }
      accountsData[i].accountType ? accountsData[i].accountType : accountsData[i].accountType=accountsData[i].bankName;
    }
    return accountsData;
  };
  /**
     * @api : getCriteria
     * Parse the criteria based and set context values.
     * @param : criteria {JSON} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
  BusinessController.prototype.getCriteria = function(criteriaJSON) {
    var collectionObj = this.store.getState();
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for(key in criteria) {
      var value = criteria[key];
      if(typeof value === "string") {
        if(value.indexOf("$") !== -1) {
          var token = value.substring(value.indexOf("{") + 1,value.indexOf("}"));
          var objectName = token.split(".")[1];
          token = token.split(".")[2];
          criteria[key] = collectionObj.Collection[objectName][token];
        }
      }
    }
    return criteria;
  };
  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(errorMsg, method) {
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
	this.setDataInCollection("serviceCallError",errorObj);
  };
  
  
  /**
	* @api : setErrorInCreateTransaction
	* triggered as a error call back for any create service
	* @return : NA
	*/
  BusinessController.prototype.setErrorInCreateTransaction = function(errorMsg, method) {
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
	this.setDataInCollection("createServiceCallError",method);
  };
  
  BusinessController.prototype.getDataMappingforObject = function(dataMapping) {
    var fieldJSON = {};
	fieldJSON=dataMapping;
    if(typeof(fieldJSON) === 'object' && fieldJSON !== null){
    return fieldJSON;
	}
  };
  /**
     * @api : getDataBasedOnDataMapping
     * gets the corresponding data of each widget from collection
     * @return : NA
     */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      for(var key in keyValues) {
        if(widget === key) {
          var fieldValue = dataMapping[record][widget];
          var group = fieldValue.split(".")[1];
          var fieldType = fieldValue.split(".")[2].replace("}", "");
          if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
            if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType]))
              return collectionObj.Collection[group][fieldType];
          } } }
    }
    return "";
  };

  BusinessController.prototype.getParsedDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    if(dataMapping){
    var fieldValue = dataMapping[widget];
    if(typeof(fieldValue) === "number" || typeof(fieldValue)==="boolean" || typeof(fieldValue)==="object"){
      return fieldValue;
    }
    if(fieldValue){
    if(!fieldValue.indexOf("${Collection")) {
      var group = fieldValue.split(".")[1];
      var fieldType = fieldValue.split(".")[2].replace("}", "");
      if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
        if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType]))
          return collectionObj.Collection[group][fieldType];
      } }
    else if(!fieldValue.indexOf("${i18n")) {
      return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}")+1, fieldValue.length - 1) : fieldValue;
    }
    else if(typeof(fieldValue) === "string"){
      return fieldValue;
    }
    else{
      if(fieldValue.indexOf("$") != -1){
        var token = fieldValue.substring(fieldValue.indexOf("{")+1,fieldValue.indexOf("}"));
        if(token.indexOf("CNTX.") != -1){
          token = token.substring(5,token.length)
          return collectionObj["context"]?collectionObj["context"][token]:"";
        }
      }
    }
    }
    else
        return "";
    }
    return "";
  };

  /**
     * @api : resetServiceResponse
     * clears the service response in collection
     * @return : NA
     */
  BusinessController.prototype.resetServiceResponse = function(objectName) {
    var collectionObj = this.store.getState();
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      delete(collectionObj.Collection[objectName]);
    }
  };
  /*
     * Component filterRecordsList
     * Responsible to perform filter operation based on the contract
     */
  BusinessController.prototype.filterRecordsList =function(data){
    var self = this;
    try{
      if(self.filterFromAccounts && self.filterType){
        var filterList = self.filterFromAccounts.split(",");
        var filterVariable = self.filterType;
        var filteredRecords =data.filter(function (record) {
          var removeRecord =  false;
          for(var i=0;i<filterList.length;i++){
            if(record[filterVariable] === filterList[i])
            {
              removeRecord =  true;
            }
          }  
          return !removeRecord;
        });
        data = filteredRecords;
      }
      return data;
    }
    catch(e){
      var errorObj =
          {
            "errorInfo" : "Error in performing filter operation",
            "errorLevel" : "Buisness",
            "error": e
          };
      self.onError(errorObj);
    }
  };

  BusinessController.prototype.setToAccountsonTransferType = function(data){
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "toAccounts"
    });

    kony.application.dismissLoadingScreen();
  };
 /*Validation Mehods*/
  BusinessController.prototype.isValidPhoneNumber = function(phoneNumber){
    var phoneno =  this.phoneNumberRegex;
    if(phoneNumber === null || phoneNumber === undefined || phoneNumber === "" )return false;// no number case
    if(phoneNumber.match(phoneno)){
      return true;
    }else{
      return false;
    }
  };
  BusinessController.prototype.isValidZip = function(zipCode){
    if(zipCode === null || zipCode === undefined || zipCode === "" )return false;// no code case
    if(zipCode.match(this.zipRegex)){
      return true;
    }else{
      return false;
    }
  };
  BusinessController.prototype.isInvalidCharacterPresent=function(value){
    var regexp = this.invalidChar;
    for(var i=0;i<regexp.length;i++){
      if(value.indexOf(regexp[i]) != -1){
        return false;
      }
    }
    return true;
  };
  BusinessController.prototype.isValidEmail = function(email){
    return kony.string.isValidEmail(email);
  };  

	BusinessController.prototype.getBankDetailsFromBicCode = function(){
	  var scope = this;
	  kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
	  scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDetailsFromBicCode.Object, this.getCriteria(this.serviceParameters.GetBankDetailsFromBicCode.Criteria), this.serviceParameters.GetBankDetailsFromBicCode.Verb)
		.then(this.getBankDetailsFromBicCodeSuccess.bind(this, this.serviceParameters.GetBankDetailsFromBicCode.Object))
		.catch(scope.setError.bind(this, "getBankDetailsFromBicCode"));
	};
  
  BusinessController.prototype.getBankDetailsFromBicCodeSuccess = function(object,data){
	var collectionObj = this.store.getState();
	collectionObj["Collection"]["isBICValid"] = data.isBICValid;
	if(collectionObj["Collection"]["isBICValid"] === "YES"){
	  this.store.dispatch({
		type: "UPDATE_COLLECTION",
		data: collectionObj.Collection,
		key : "isBICValid"
	  });
	}
	else{
	  this.store.dispatch({
		type: "UPDATE_COLLECTION",
		data: "Invalid BIC",
		key : "invalidbicerror"
	  });
	}
	kony.application.dismissLoadingScreen();
  };

  /**
  * check whether given user name is valid
  * @param {String} username - A username to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  BusinessController.prototype.isValidUserName =function(username, minLength, maxLength){
    var min = (kony.sdk.isNullOrUndefined(minLength) && minLength === "") ? 8 : minLength;
    var max = (kony.sdk.isNullOrUndefined(maxLength) && maxLength === "") ? 24 : maxLength;
    if(username === null || username === undefined || username === "")
      return false;
    else if (username.charAt(0) === " ") {
            return false;
        } 
  else if(username.length < min || username.length > max){
      return false;
    }else if(!this.isInvalidCharacterPresent(username)){
      return false;
    }
    return true;
  };
  
   BusinessController.prototype.isValidIBANNumber = function(IBANNumber){
    var regex = this.alphaNumeric;
    if (kony.sdk.isNullOrUndefined(IBANNumber)) {
      return false;
    }
    IBANNumber = IBANNumber.trim();
    if (!IBANNumber.match(regex)) {
      return false;
    }
    return true;
  };

  BusinessController.prototype.isValidAccountNumber = function(accNumber){
    if(isNaN(accNumber) || accNumber === null || accNumber.length<=0 || accNumber == undefined || accNumber.length>24 ){
      return false;
    }
    else {
      return true;
    }
  };
  
  /**
  * @api : getCurrencySymbol
  * fetches the currency symbol of any currency code
  * @return : currencySymbol
  */
  BusinessController.prototype.getCurrencySymbol = function (currencyCode) {
    var scope = this;
    if (currencyCode) return scope.formatUtils.formatData("CURRENCY", currencyCode);
    return "";
  };
  /**
  * @api : getFormattedAmount
  * get the formatted amount value
  * @return : formattedAmount
  */
  BusinessController.prototype.getFormattedAmountWithOutCurrency = function (amountValue) {
    var scope = this;
    if (amountValue) {
      amountValue = amountValue.replace(/[^0-9\.-]+/g, "");
      return scope.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", amountValue);
    }
    return "";
  };
  
  /**
  * @api : getFormattedAmount
  * get the formatted amount value
  * @return : formattedAmount
  */
  BusinessController.prototype.getFormattedAmount = function (amountValue,currency) {
    var scope = this;
    if (amountValue) {
      return scope.formatUtils.formatData("AMOUNT", amountValue,currency);
    }
    return "";
  };
  BusinessController.prototype.getBICFromBankDetails = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBICFromBankDetails.Object, this.getCriteria(this.serviceParameters.GetBICFromBankDetails.Criteria), this.serviceParameters.GetBICFromBankDetails.Verb)
      .then(this.getBICFromBankDetailsSuccess.bind(this, this.serviceParameters.GetBICFromBankDetails.Object))
      .catch(scope.setError.bind(this, "getBICFromBankDetails"));
  }; 

  BusinessController.prototype.getBCCFromBankDetails = function(){
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBCCFromBankDetails.Object, this.serviceParameters.GetBCCFromBankDetails.Criteria, this.serviceParameters.GetBCCFromBankDetails.Verb)
      .then(this.getBCCFromBankDetailsSuccess.bind(this, this.serviceParameters.GetBCCFromBankDetails.Object))
      .catch(scope.setError.bind(this, "getBCCFromBankDetails"));
  }; 

  BusinessController.prototype.getBCCFromBankDetailsSuccess = function(object, data){
    var collectionObj = this.store.getState();
    if(data[this.serviceParameters.getBCCFromBankDetails.responseMapping]){
      collectionObj.Collection.TransactionObject["clearingCodes"] = data[this.serviceParameters.getBCCFromBankDetails.responseMapping];
            this.store.dispatch({
                type: "UPDATE_COLLECTION",
                data: collectionObj.Collection["TransactionObject"],
                key: "TransactionObject"
            });
    }
    kony.application.dismissLoadingScreen();
  }; 

  BusinessController.prototype.getBICFromBankDetailsSuccess = function(object, data){
    var collectionObj = this.store.getState();
    if(data.swiftCodes){
      collectionObj.Collection.TransactionObject["swiftCodes"] = data.swiftCodes;
            this.store.dispatch({
                type: "UPDATE_COLLECTION",
                data: collectionObj.Collection["TransactionObject"],
                key: "TransactionObject"
            });
    }
    kony.application.dismissLoadingScreen();
  }; 
  
  /**
     * @api : getDateObjectFromCalendarString
     * returns date object from given date string
     * @param {String} dateString - a date string
     * @param {String} format - format of date
     * @returns {Date} - date object
     */
    BusinessController.prototype.getDateObjectFromCalendarString = function(dateString, format) {
        try {
            var finalDateTime = null;
            if (dateString) {
                var formattype = format.toUpperCase();
                var yyyyIndex = formattype.indexOf("YYYY");
                var mmIndex = formattype.indexOf("MM");
                var ddIndex = formattype.indexOf("DD");
                var hhIndex = formattype.indexOf("HH");
                var minIndex = formattype.indexOf("MM", mmIndex + 1);
                var ssIndex = formattype.indexOf("SS");
                if (yyyyIndex > -1 && mmIndex > -1 && ddIndex > -1) {
                    var newdd = parseInt(dateString.substr(ddIndex, 2), 10);
                    var newmm = parseInt(dateString.substr(mmIndex, 2), 10);
                    var newyyyy = parseInt(dateString.substr(yyyyIndex, 4), 10);
                    if (newdd && (0 < newdd && newdd <= 31) && (newmm && (0 < newmm && newmm <= 12)) && (newyyyy && 0 <= newyyyy)) {
                        finalDateTime = new Date();
                        finalDateTime.setYear(newyyyy);
                        finalDateTime.setMonth(newmm - 1);
                        finalDateTime.setDate(newdd);
                        //finalDateTime = new Date(Date.UTC(newyyyy, newmm - 1, newdd, 0, 0, 0, 0));
                    }
                    var newTime = hhIndex > -1 ? dateString.substr(hhIndex, 2) : null;
                    newTime = newTime ? parseInt(newTime, 10) : null;
                    if (newTime && newTime < 24) {
                        finalDateTime = finalDateTime ? finalDateTime.setHours(newTime, 0, 0) : null;
                        finalDateTime = new Date(finalDateTime);
                    }
                    var newmin = minIndex > -1 ? dateString.substr(minIndex, 2) : null;
                    newmin = newmin ? parseInt(newmin, 10) : null;
                    if (newmin) {
                        finalDateTime = finalDateTime ? finalDateTime.setMinutes(newmin) : null;
                        finalDateTime = new Date(finalDateTime);
                    }
                    var newss = ssIndex > -1 ? dateString.substr(ssIndex, 4) : null;
                    newss = newss ? parseInt(newss, 10) : null;
                    if (newss) {
                        finalDateTime = finalDateTime ? finalDateTime.setSeconds(newss) : null;
                        finalDateTime = new Date(finalDateTime);
                    }
                }
                dateString = finalDateTime.toString();
                if (dateString.lastIndexOf(':') != -1) {
                    dateString = dateString.substring(0, dateString.lastIndexOf(':') + 3);
                }
                return finalDateTime;
            }
        }catch (err) {
            kony.print("Error in ISO date formatting -->" + err);
        }
    };
  return BusinessController;
});