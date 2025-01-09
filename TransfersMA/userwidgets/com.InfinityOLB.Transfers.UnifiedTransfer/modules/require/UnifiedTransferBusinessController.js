define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils',], function (FormatUtils, DataValidationHandler, InvokeServiceUtils) {

  function BusinessController() {
    this.store = {};
    this.objectMetadata = {};
    this.context = {};
    this.serviceParameters = {};
    this.dataMapping = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils();
    this.dataValidationHandler = new DataValidationHandler();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
    this.serviceCounter = 0;
    this.fromAccountsData = [];
    this.toAccountsData = [];
    this.controller = {};
  }
  /**
  * @api : setPropertiesFromComponent
  * set properties from component
  * @return : NA
  */
  BusinessController.prototype.setProperties = function (serviceParameters, dataMapping, dataFormatJSON, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.dataMapping = dataMapping;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };
  
  BusinessController.prototype.setController = function (controller) {
    this.controller = controller;
  };
  /**
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function (transferType) {
    this.getMetaDataFromModel(this.serviceParameters.GetAccountsPostLogin.Service, this.serviceParameters.GetAccountsPostLogin.Object);
    this.getMetaDataFromModel(this.serviceParameters.GetCreditCardAccounts.Service, this.serviceParameters.GetCreditCardAccounts.Object);
    this.getMetaDataFromModel(this.serviceParameters.GetExternalPayees.Service, this.serviceParameters.GetExternalPayees.Object);
    if (transferType === "Same Bank") {
      this.getMetaDataFromModel(this.serviceParameters.IntraBankAccFundTransfer.Service, this.serviceParameters.IntraBankAccFundTransfer.Object);
    } else if (transferType === "Domestic Transfer") {
      this.getMetaDataFromModel(this.serviceParameters.GetBICFromBankDetails.Service, this.serviceParameters.GetBICFromBankDetails.Object);
      this.getMetaDataFromModel(this.serviceParameters.InterBankAccFundTransfer.Service, this.serviceParameters.InterBankAccFundTransfer.Object);
    } else if (transferType === "International Transfer") {
      this.getMetaDataFromModel(this.serviceParameters.GetBICFromBankDetails.Service, this.serviceParameters.GetBICFromBankDetails.Object);
      this.getMetaDataFromModel(this.serviceParameters.InternationalAccFundTransfer.Service, this.serviceParameters.InternationalAccFundTransfer.Object);
    } else if (transferType === "Pay a Person") {
      this.getMetaDataFromModel(this.serviceParameters.P2PTransfer.Service, this.serviceParameters.P2PTransfer.Object);
    }
  };
  /**
  * @api : getMetaDataFromModel
  * get meta data  from the model
  * @return : NA
  */
   BusinessController.prototype.getMetaDataFromModel = function (service, object) {
    var scope = this;
    function getMetaDataSuccess(res) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
      if (object === "CreditCard" || object === "DigitalArrangements") {
        objectMetadata = { "transactionCurrency": { "format": "CURRENCY" }, "availableBalance": { "validation": "AMOUNT", "format": "AMOUNT", "formatting_dependency": "currencyCode" }, "outstandingBalance": { "validation": "AMOUNT", "format": "AMOUNT", "formatting_dependency": "currencyCode" }, "currentBalance": { "validation": "AMOUNT", "format": "AMOUNT", "formatting_dependency": "currencyCode" }, "principalBalance": { "validation": "AMOUNT", "format": "AMOUNT", "formatting_dependency": "currencyCode" }, "accountName": { "validation": "ACCOUNT_NAME", "format": "ACCOUNT_NAME", "formatting_dependency": "accountID" } }
      } else if (object === "Recipients" || object === "Payees" || object === "Payee_P2P") {
		object = "Recipients";
        objectMetadata = { "beneficiaryName": { "validation": "ACCOUNT_NAME", "format": "ACCOUNT_NAME", "formatting_dependency": "accountNumber" }, "payeeName": { "validation": "NAME" }, "addressLine1": { "validation": "" }, "addressLine2": { "validation": "" }, "city": { "validation": "NAME" }, "zipCode": { "validation": "ZIPCODE" }, "accountNumber": { "validation": "ACCOUNT_NUMBER" }, "reenterAccountNumber": { "validation": "ACCOUNT_NUMBER" }, "country": { "validation": "NAME" }, "state": { "validation": "NAME" }, "phone": { "validation": "MOBILE_NUMBER" }, "email": { "validation": "EMAIL" } };
      } else if (object === "Transaction") {
        objectMetadata = { "amount": { "validation": "AMOUNT_FORMAT" } }
      } else if (object === "BankDetails") {
        objectMetadata = { "swiftCode": { "validation": "NAME" }, "lookupBankName": { "validation": "NAME" }, "lookupCountry": { "validation": "NAME" }, "lookupCity": { "validation": "NAME" }, "lookupBranch": { "validation": "NAME" } };
      }
      scope.objectMetadata[object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError("getMetaDataFromModel", err);
    }
    var options = { "getFromServer": true };
    kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
  };
  /**
   * @api : getDataBasedOnDataMapping
   * gets the corresponding data of each widget from collection
   * @return : NA
   */
  BusinessController.prototype.getDataBasedOnDataMapping = function (widget, valueType) {
    var collectionObj = this.store.getState();
    var dataMapping = this.dataMapping;
    for (var record in dataMapping) {
      var keyValues = dataMapping[record];
      if (!(widget in keyValues)) continue;
      for (var key in keyValues) {
        if (widget === key) {
          var fieldValue = dataMapping[record][widget];
          if (typeof fieldValue === "string") {
            if (!fieldValue.indexOf("${Collection")) {
              var group = fieldValue.split(".")[1];
              var fieldType = fieldValue.split(".")[2].replace("}", "");
              if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                  return collectionObj.Collection[group][fieldType];
                }
              }
            } else if (!fieldValue.indexOf("${i18n")) {
              return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
            }
            return fieldValue;
          } else if (typeof fieldValue === "object") {
            if (fieldValue.hasOwnProperty(valueType)) {
              fieldValue = fieldValue[valueType];
              if (valueType === "mapping") {
                if (!fieldValue.indexOf("${Collection")) {
                  var group = fieldValue.split(".")[1];
                  var fieldType = fieldValue.split(".")[2].replace("}", "");
                  if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                      return collectionObj.Collection[group][fieldType];
                    }
                  }
                }
              } else if (valueType === "placeHolder" || valueType === "text" || valueType === "toolTip") {
                if (typeof fieldValue === "object") {
                  fieldValue = this.getDataSpecificToBreakpoint(fieldValue);
                }
                if (!fieldValue.indexOf("${i18n")) {
                  return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
                }
                return fieldValue;
              }
            } else {
              fieldValue = this.getDataSpecificToBreakpoint(fieldValue);
              if (!fieldValue.indexOf("${i18n")) {
                return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
              }
              return fieldValue;
            }
          }
        }
      }
    }
    return "";
  };
  /**
   * @api : getDataSpecificToBreakpoint
   * gets data specified to the corresponding breakpoint
   * @return : NA
   */
  BusinessController.prototype.getDataSpecificToBreakpoint = function (inputJSON) {
    var currentBreakpoint = kony.application.getCurrentBreakpoint();
    if (Object.keys(this.breakpoints).length !== 0) {
      for (var key in this.breakpoints) {
        if (currentBreakpoint === this.breakpoints[key]) {
          if (!kony.sdk.isNullOrUndefined(inputJSON.key)) {
            return inputJSON.key;
          }
        }
      }
    }
    if (inputJSON.hasOwnProperty("default")) {
      return inputJSON["default"];
    }
  };
  /**
  * @api : getFormattedData
  * returns the formatted data
  * @return : NA
  */
  BusinessController.prototype.getFormattedData = function (object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
    formattedData.map(function (record) {
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if (objectMetadata.hasOwnProperty(key)) {
          var metaData = objectMetadata[key];
          if (metaData.format != undefined) {
            var dependentData;
            if (metaData.formatting_dependency) {
              dependentData = record[metaData.formatting_dependency]
            }
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData);
            record[key + "Formatted"] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };
  /**
	* @api : invokeCustomVerbforGetAccountsAndPayees
	* fetches the accounts
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetAccountsAndPayees = function(transferType) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var p1 = scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetAccountsPostLogin.Object, this.serviceParameters.GetAccountsPostLogin.Criteria, this.serviceParameters.GetAccountsPostLogin.Verb);
    var p2 = scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetCreditCardAccounts.Object, this.serviceParameters.GetCreditCardAccounts.Criteria, this.serviceParameters.GetCreditCardAccounts.Verb);
    var p3 = scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetExternalPayees.Object, this.serviceParameters.GetExternalPayees.Criteria, this.serviceParameters.GetExternalPayees.Verb);
    Promise.all([p1, p2, p3])
      .then(this.fetchAccountsAndPayees.bind(this, this.serviceParameters.GetAccountsPostLogin.Object, this.serviceParameters.GetCreditCardAccounts.Object, this.serviceParameters.GetExternalPayees.Object, transferType))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAccountsAndPayees"));
  };
  /**
	* @api : fetchAccountsAndPayees
	* fetches the accounts and payees
	* @return : NA
	*/
  BusinessController.prototype.fetchAccountsAndPayees = function (object1, object2, object3, transferType, data) {
    var scope = this;
    this.fromAccountsData = [];
    this.toAccountsData = [];
    var accountsPermissions = [];
    switch (transferType) {
      case "Same Bank":
        accountsPermissions.push("INTRA_BANK_FUND_TRANSFER_CREATE", "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE");
        break;
      case "Domestic Transfer":
        accountsPermissions.push("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE");
        break;
      case "International Transfer":
        accountsPermissions.push("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE");
        break;
      case "Pay a Person":
        accountsPermissions.push("P2P_CREATE");
        break;
    }
    var accounts = scope.getFormattedData(object1, data[0].Accounts);
    var creditCardAccounts = scope.getFormattedData(object2, data[1].Accounts);
    object3 = "Recipients";
    let extPayees = null;
    if (data[2].ExternalAccounts) {
        extPayees = data[2].ExternalAccounts.filter((record) => record.hasOwnProperty("payeeStatus") && record["payeeStatus"] !== "Pending");
    }
    var payees = scope.getFormattedData(object3, data[2].PayPerson || extPayees);
    accounts = accounts.filter(record => {
      var actions = record.actions ? JSON.parse(record.actions) : [];
      return accountsPermissions.some(permission => actions.includes(permission));
    });
    accounts =  accounts.filter(function (account) {
      return account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING"
  }) 
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i]["isBusinessAccount"] == "false") {
        accounts[i]["otherAccounts"] = "Personal Accounts";
      } else {
        accounts[i]["otherAccounts"] = "Buisness Accounts";
      }
      accounts[i]["isExternalAccount"] = false;
      accounts[i]["GroupField"] = "default";
    }
    for (var i = 0; i < creditCardAccounts.length; i++) {
      creditCardAccounts[i]["isBusinessAccount"] = "false";
      creditCardAccounts[i]["otherAccounts"] = "Personal Accounts";
      creditCardAccounts[i]["isExternalAccount"] = false;
      creditCardAccounts[i]["GroupField"] = "default";
    }
    for (var i = 0; i < payees.length; i++) {
      payees[i]["isExternalAccount"] = true;
      payees[i]["GroupField"] = "default";
      payees[i]["accountType"] = "External";
    }
    this.fromAccountsData = accounts.filter(record => record.accountType !== "Loan");
    if (transferType === "Same Bank") {
      this.toAccountsData.push(...accounts, ...creditCardAccounts);
      payees = payees.filter(record => record["isSameBankAccount"] === "true");
    } else if (transferType === "Domestic Transfer") {
      payees = payees.filter(record => record["isSameBankAccount"] === "false" && record["isInternationalAccount"] === "false");
    } else if (transferType === "International Transfer") {
      payees = payees.filter(record => record["isInternationalAccount"] === "true");
    }
    this.toAccountsData.push(...payees);
    kony.application.dismissLoadingScreen();
    this.controller.allPayeesServiceCallFlag = true;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: this.toAccountsData,
      key: "toAccounts"
    });
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: this.fromAccountsData,
      key: "fromAccounts"
    });
  };
  /**
	* @api : invokeCustomVerbforClearingIdentifierCodes
	* fetches ClearingIdentifierCodes
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforClearingIdentifierCodes = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
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
    this.controller.clearingIdentifierCodesUpdated = true;
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : clearingIdentifierCodes,
      key : "clearingIdentifierCodes"
    });
  };
  /**
	* @api : invokeCustomVerbforPurposeCodes
	* fetches purposeCodes
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforPurposeCodes = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
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
    var purposeCodes = data.PurposeCodes;
    this.controller.purposeCodesUpdated = true;
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : purposeCodes,
      key : "purposeCodes"
    });
  };
  /**
	* @api : invokeCustomVerbforGetBankDate
	* fetches the bank date object
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetBankDate = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDate.Object, this.serviceParameters.GetBankDate.Criteria, this.serviceParameters.GetBankDate.Verb)
      .then(this.fetchBankDate.bind(this, this.serviceParameters.GetBankDate.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetBankDate"));
  };
  /**
	* @api : fetchBankDate
	* fetches the bank date
	* @return : NA
	*/
  BusinessController.prototype.fetchBankDate = function(object, data) {
    var scope = this;
    kony.application.dismissLoadingScreen();
    var bankDate = data.date[0];
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : bankDate,
      key : "bankDate"
    });
  };
  /**
  * @api : invokeCustomVerbforGetAllCountries
  * fetches the  data from the object model for all countries
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetAllCountries = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetAllCountries.Object, this.serviceParameters.GetAllCountries.Criteria, this.serviceParameters.GetAllCountries.Verb)
      .then(this.fetchCountries.bind(this, this.serviceParameters.GetAllCountries.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAllCountries"));
  };
  /**
  * @api : fetchCountries
  * fetches all the countries
  * @return : NA
  */
  BusinessController.prototype.fetchCountries = function (object, data) {
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
     * invokeCustomVerbforSearchBCC
     * @api : invokeCustomVerbforSearchBCC
     * Method to get swift code to the value which was entered in lookup popup text boxs
     * @return : NA
     */
  BusinessController.prototype.invokeCustomVerbforSearchBCC = function(){
    var scope = this;
    kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters.GetBCCFromBankDetails.Criteria);
    scope.invokeServiceUtils
      .makeAServiceCall("customVerb", this.serviceParameters.GetBCCFromBankDetails.Object, criteria, this.serviceParameters.GetBCCFromBankDetails.Verb)
      .then(this.fetchSearchBCC.bind(this, this.serviceParameters.GetBCCFromBankDetails.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforSearchBCC"));
  };

  /**
	* @api : fetchPurposeCode
	* success call of ClearingIdentifierCodes
	* @return : NA
	*/
  BusinessController.prototype.fetchSearchBCC = function(object, data) {
    kony.application.dismissLoadingScreen();
    // var clearingIdentifierCodes = data.PurposeCodes;
    this.controller.searchBCCUpdated = true;
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : clearingIdentifierCodes,
      key : "clearingIdentifierCodes"
    });
  };


  /**
     * invokeCustomVerbforSearchSwiftCode
     * @api : invokeCustomVerbforSearchSwiftCode
     * Method to get swift code to the value which was entered in lookup popup text boxs
     * @return : NA
     */
  BusinessController.prototype.invokeCustomVerbforSearchSwiftCode = function(){
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters.GetBICFromBankDetails.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBICFromBankDetails.Object, criteria, this.serviceParameters.GetBICFromBankDetails.Verb)
      .then(this.showSearchSwiftCodeResults.bind(this, this.serviceParameters.GetBICFromBankDetails.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAllRegions"));
  };
  /**
     * @api : showSearchSwiftCodeResults
     * Method to show swift codes fetched
     * @return : NA
     */
  BusinessController.prototype.showSearchSwiftCodeResults = function(object, data){
    var swiftCodes = JSON.parse(JSON.stringify(data.swiftCodes));
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: swiftCodes,
      key: "swiftCodeLookup"
    });
  };
  /**
  * @api : invokeCustomVerbforGetAllRegions
  * fetches the  data from the object model for all regions
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetAllRegions = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetAllRegions.Object, this.serviceParameters.GetAllRegions.Criteria, this.serviceParameters.GetAllRegions.Verb)
      .then(this.fetchRegions.bind(this, this.serviceParameters.GetAllRegions.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAllRegions"));
  };
  /**
  * @api : fetchRegions
  * fetches regions based on the selected country
  * @return : NA
  */
  BusinessController.prototype.fetchRegions = function (object, data) {
    var scope = this;
    var newStateList = [];
    kony.application.dismissLoadingScreen();
    data = data.records;
    var statesList = JSON.parse(JSON.stringify(data));
    newStateList.push(["0", "Select a state"]);
    statesList.map(function (state) {
      return newStateList.push([state.Country_id, state.id, state.Name]);
    });
    this.store.dispatch({
      type: "UPDATE_CACHE",
      data: newStateList,
      key: "regions"
    });
  };
  /**
    * @api : getSpecifiedStates
    * Method  for retrieving states list for the selected Country
    * @return : NA
    */
  BusinessController.prototype.getSpecifiedStates = function (countryId) {
    var scope = this;
    var collectionObj = this.store.getState();
    var data = [];
    var statesList = [];
    statesList.push(["0", "Select a State"]);
    var state = collectionObj.Cache.regions;
    state.forEach((regions) => {
      if (regions[0] === countryId) statesList.push([regions[1], regions[2]]);
    });
    data = {
      "states": statesList,
      "stateSelected": statesList[0][0]
    };
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key: "regions"
    });
  };
  /**
  * @api : invokeCustomVerbforValidateSwiftCode
  * fetches the bank name from swift code
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforValidateSwiftCode = function (widgetName) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBankDetailsFromBicCode.Object, this.getCriteria(this.serviceParameters.GetBankDetailsFromBicCode.Criteria), this.serviceParameters.GetBankDetailsFromBicCode.Verb)
      .then(this.fetchBankDetails.bind(this, this.serviceParameters.GetBankDetailsFromBicCode.Object, widgetName))
      .catch(scope.setError.bind(this, "invokeCustomVerbforValidateSwiftCode"));
  };
  /**
  * @api : fetchBankDetails
  * fetches bank details from swift code
  * @return : NA
  */
  BusinessController.prototype.fetchBankDetails = function (object, widgetName, data) {
    var scope = this;
    var validationObject = {};
    kony.application.dismissLoadingScreen();
    this.controller.view.flxToTextBox.setActive(true);
    var collectionObj = this.store.getState();
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[object])) {
      scope.dataJSON = collectionObj.Collection[object];
    } else {
      collectionObj.Collection[object] = {};
      scope.dataJSON = collectionObj.Collection[object];
    }
    if (data.isBICValid == 'YES') {
      scope.dataJSON["bankName"] = data.bankName;
      if(data.bankName.length > 105) {
      scope.dataJSON["bankNameWithCountryCode"] = data.bankName.substr(0,104) + "....";
      } else {
      scope.dataJSON["bankNameWithCountryCode"] = data.bankName + (data.countryCode ? (", " + data.countryCode) : "");  
      }
      scope.dataJSON["countryCode"] = data.countryCode;
      scope.dataJSON["countryName"] = data.countryName;
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: scope.dataJSON,
        key: object
      });
    } else {
      const mappingKey = scope.getKeyFromMapping(widgetName);
      scope.dataJSON[mappingKey] = "";
      scope.dataJSON["bankName"] = "";
      scope.dataJSON["bankNameWithCountryCode"] = "";
      scope.dataJSON["countryCode"] = "";
      scope.dataJSON["countryName"] = "";
      validationObject = {
        "dvfError": {
          [widgetName]: kony.i18n.getLocalizedString("i18n.UnifiedTransfer.InvalidBIC")
        },
        "widgetId": widgetName
      }
      this.store.dispatch({
          type: "UPDATE_COLLECTION",
          data: validationObject,
          key: "dvfError"
      });
    }
  };
  /**
  * @api : performDataValidation
  * performs data validation
  * @return : whether validation is success or not
  */
  BusinessController.prototype.performDataValidation = function (inputData, mappedParameter, widgetName) {
    var validationSuccess = {};
    var inputDataJSON = {};
    var validateJSON = { "dataValidation": {} };
    var object = Object.keys(validateJSON)[0];
    var objectName = this.getObjectName(widgetName);
    validateJSON.dataValidation[widgetName] = this.getValidationType(objectName, mappedParameter);
    inputDataJSON[widgetName] = inputData;
    var dataValidator = this.dataValidationHandler.validateData(inputDataJSON, object, validateJSON);
    if (Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object) {
      validationSuccess["dvfError"] = "";
      validationSuccess["widgetId"] = widgetName;
      var text = Object.values(inputDataJSON)[0];
      this.storeInCollection({ [widgetName]: text });
    } else {
      validationSuccess["dvfError"] = dataValidator;
    }
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: validationSuccess,
        key: "dvfError"
      });
  };
  /**
  * @api : getValidationType
  * fetches the validation type from meta data
  * @return : validation type
  */
  BusinessController.prototype.getValidationType = function (Object, fieldType) {
    for (key in this.objectMetadata) {
      if (!kony.sdk.isNullOrUndefined(this.objectMetadata[Object][fieldType]))
        return this.objectMetadata[Object][fieldType].validation;
      else
        return "";
    }
  };
  /**
  * @api : getObjectName
  * gets the object name mapped for the corresponding widget
  * @return : NA
  */
  BusinessController.prototype.getObjectName = function (widgetName) {
    var dataMapping = this.dataMapping;
    for (var record in dataMapping) {
      var keyValues = dataMapping[record];
      if (!(widgetName in keyValues)) continue;
      for (var key in keyValues) {
        if (widgetName === key) {
          var fieldValue = dataMapping[record][widgetName];
          if (typeof fieldValue === "object") {
            fieldValue = fieldValue.mapping;
          }
          fieldValue = fieldValue.split(".")[1];
          return fieldValue;
        }
      }
    }
  };
  /**
  * @api : getKeyFromMapping
  * gets key from data mapping
  * @return : NA
  */
  BusinessController.prototype.getKeyFromMapping = function (widget) {
    var dataMapping = this.dataMapping;
    for (var record in dataMapping) {
      var keyValues = dataMapping[record];
      if (!(widget in keyValues)) continue;
      for (var key in keyValues) {
        if (widget === key) {
          var fieldValue = dataMapping[record][widget];
          if (typeof fieldValue === "object") {
            fieldValue = fieldValue.mapping;
          }
          if (!fieldValue) return "";
          fieldValue = fieldValue.split(".")[2].replace("}", "");
          return fieldValue;
        }
      }
    }
  };
  /**
   * @api : storeInCollection
   * stores the input data in collection
   * @return : NA
   */
  BusinessController.prototype.storeInCollection = function (inputData) {
    var scope = this;
    var collectionObj = this.store.getState();
    for (var key in inputData) {
      var fieldName = this.getKeyFromMapping(key) || key;
      var objectName = this.getObjectName(key) || "Transaction";
      if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
        collectionObj.Collection[objectName][fieldName] = inputData[key];
      } else {
        collectionObj.Collection[objectName] = {};
        collectionObj.Collection[objectName][fieldName] = inputData[key];
      }
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: collectionObj.Collection
    });
  };
  /**
   * @api : getCriteria
   * Parse the criteria based and set context values.
   * @param : criteria {JSON} - value collected from exposed contract
   * @return : {JSONObject} - jsonvalue for criteria
   */
  BusinessController.prototype.getCriteria = function (criteriaJSON) {
    var collectionObj = this.store.getState();
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for (var key in criteria) {
      var value = criteria[key];
      if (typeof value === "string") {
        if (value.indexOf("$") !== -1) {
          var token = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
          var objectName = token.split(".")[1];
          token = token.split(".")[2];
          if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName]) && !kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName][token])) {
            criteria[key] = collectionObj.Collection[objectName][token];
          } else {
            criteria[key] = "";
          }
        }
      }
    }
    return criteria;
  };
  /**
   * @api : isValidAccountNumber
   * check whether given Account number is valid
   * @param {String} accNumber- accNumber to validate
   * @returns {Boolean} - true if valid, false if invalid
   */
  BusinessController.prototype.isValidAccountNumber = function (accNumber) {
    if (isNaN(accNumber) || accNumber === null || accNumber.length <= 0 || accNumber == undefined || accNumber.length > 24) {
      return false;
    } else {
      return true;
    }
  };
  /**
   * @api : isValidIBAN
   * check whether given IBAN is valid
   * @param {String} iban- IBAN to validate
   * @returns {Boolean} - true if valid, false if invalid
   */
  BusinessController.prototype.isValidIBAN = function (iban) {
    iban = iban.replace(/\s/g, '');
    if (!iban.match(/^[\dA-Z]+$/)) return false;
    var ibanLen = {
      NO: 15, BE: 16, DK: 18, FI: 18, FO: 18, GL: 18, NL: 18, MK: 19,
      SI: 19, AT: 20, BA: 20, EE: 20, KZ: 20, LT: 20, LU: 20, CR: 21,
      CH: 21, HR: 21, LI: 21, LV: 21, BG: 22, BH: 22, DE: 22, GB: 22,
      GE: 22, IE: 22, ME: 22, RS: 22, AE: 23, GI: 23, IL: 23, AD: 24,
      CZ: 24, ES: 24, MD: 24, PK: 24, RO: 24, SA: 24, SE: 24, SK: 24,
      VG: 24, TN: 24, PT: 25, IS: 26, TR: 26, FR: 27, GR: 27, IT: 27,
      MC: 27, MR: 27, SM: 27, AL: 28, AZ: 28, CY: 28, DO: 28, GT: 28,
      HU: 28, LB: 28, PL: 28, BR: 29, PS: 29, KW: 30, MU: 30, MT: 31
    };
    var len = iban.length;
    if (len != ibanLen[iban.substr(0, 2)]) return false;
    var ibanNum, ibanMod;
    iban = iban.substr(4) + iban.substr(0, 4);
    for (ibanNum = '', i = 0; i < len; i += 1) {
      ibanNum += parseInt(iban.charAt(i), 36);
    }
    for (ibanMod = ibanNum.substr(0, 15) % 97, ibanNum = ibanNum.substr(15); ibanNum; ibanNum = ibanNum.substr(13)) {
      ibanMod = (ibanMod + ibanNum.substr(0, 13)) % 97;
    }
    return ibanMod == 1;
  };
  /**
   * @api : isValidSwiftCode
   * check whether given Swift/BIC Code is valid or invalid
   * @param {Number} swiftCode - Swift/BIC Code to validate
   * @returns {Boolean} - true if valid, false if invalid
   */
  BusinessController.prototype.isValidSwiftCode = function (swiftCode) {
    if (swiftCode.length === 8 || swiftCode.length === 11) {
      return true;
    } else {
      return false;
    }
  };
  
  /**
  * @api : invokeCustomVerbforValidateIban
  * validate the entered iban
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforValidateIban = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.IsValidIBAN.Object, this.getCriteria(this.serviceParameters.IsValidIBAN.Criteria), this.serviceParameters.IsValidIBAN.Verb)
      .then(this.validateIban.bind(this, this.serviceParameters.IsValidIBAN.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforValidateIban"));
  };
  /**
  * @api : validateIban
  * validate the entered iban
  * @return : NA
  */
  BusinessController.prototype.validateIban = function (object, data) {
    var scope = this;
    kony.application.dismissLoadingScreen();
    if (data.isIBANValid === "YES") {
      scope.invokeCustomVerbforGetSwiftCodeFromIBAN();
    }else{
      var collectionObj = this.store.getState();
      kony.application.dismissLoadingScreen();
      collectionObj.Collection["ibanError"] = "";
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidIBANMessage"),
        key: "ibanError"
      });
    }
  };
  /**
  * @api : invokeCustomVerbforGetSwiftCodeFromIBAN
  * fetches the Swift Code from iban
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetSwiftCodeFromIBAN = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters.GetSwiftCodeFromIBAN.Criteria);
    if (!criteria["countryCode"]) criteria["countryCode"] = criteria["iban"].slice(0, 2);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetSwiftCodeFromIBAN.Object, criteria, this.serviceParameters.GetSwiftCodeFromIBAN.Verb)
      .then(this.fetchSwiftCode.bind(this, this.serviceParameters.GetSwiftCodeFromIBAN.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetSwiftCodeFromIBAN"));
  };
  /**
  * @api : fetchSwiftCode
  * fetches the Swift Code from iban
  * @return : NA
  */
  BusinessController.prototype.fetchSwiftCode = function (object, data) {
    var scope = this;
    var collectionObj = this.store.getState();
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[object])) {
      scope.dataJSON = collectionObj.Collection[object];
    } else {
      collectionObj.Collection[object] = {};
      scope.dataJSON = collectionObj.Collection[object];
    }
    scope.dataJSON["swiftCode"] = data["bic"];
    scope.dataJSON["bankName"] = data["bankName"];
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: scope.dataJSON,
      key: object
    });
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
  BusinessController.prototype.getFormattedAmount = function (amountValue) {
    var scope = this;
    if (amountValue) {
      amountValue = amountValue.replace(/[^0-9\.-]+/g, "");
      return scope.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", amountValue);
    }
    return "";
  };
  /**
  * @api : getDeformattedAmount
  * get the deformatted amount value
  * @return : deformattedAmount
  */
  BusinessController.prototype.getDeformattedAmount = function (amountValue) {
    const isDeformatted = (/^(\-|)\d+(?:\.\d{1,2})?$/g).test(amountValue);
    if (isDeformatted) return amountValue;
    if (amountValue.lastIndexOf('.') > amountValue.lastIndexOf(',')) return amountValue.replace(/\,/g, '');
    return amountValue.replace(/\./g, '').replace(/\,/g, '.');
  };
  /**
  * @api : getFormattedDate
  * get the formatted Date
  * @return : formattedDate
  */
  BusinessController.prototype.getFormattedDate = function (date) {
    var scope = this;
    if (date) return scope.formatUtils.formatData("CUSTOM_DATE", date);
    return "";
  };
  /**
  * @api : invokeCustomVerbforGetAccountDetails
  * fetch the account details
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetAccountDetails = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetAccountDetails.Object, this.getCriteria(this.serviceParameters.GetAccountDetails.Criteria), this.serviceParameters.GetAccountDetails.Verb)
      .then(this.fetchAccountDetails.bind(this, this.serviceParameters.GetAccountDetails.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAccountDetails"));
  };
  /**
  * @api : invokeCustomVerbforGetAccountDetails
  * fetch the account details
  * @return : NA
  */
  BusinessController.prototype.fetchAccountDetails = function (object, data) {
    var scope = this;
    var collectionObj = this.store.getState();
    kony.application.dismissLoadingScreen();
    collectionObj.Collection["accountDetails"] = {};
    var accountDetails = data[0];
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: accountDetails,
      key: "accountDetails"
    });
  };
  /**
  * @api : storeSelectedAccountDataInCollection
  * stores the selected account details in collection
  * @return : NA
  */
  BusinessController.prototype.storeSelectedAccountDataInCollection = function (data, fieldType) {
    var scope = this;
    var collectionObj = this.store.getState();
    var objectName = "Transaction";
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      scope.dataJSON = collectionObj.Collection[objectName];
    } else {
      collectionObj.Collection[objectName] = {};
      scope.dataJSON = collectionObj.Collection[objectName];
    }
    if (fieldType === "From") {
      scope.dataJSON["fromAccountNumber"] = data.accountID;
      scope.dataJSON["fromAccountCurrency"] = data.currencyCode;
      scope.dataJSON["formattedFromAccount"] = data.accountNameFormatted;
      scope.dataJSON["fromAccountName"] = data.accountName;
      scope.dataJSON["coreCustomerId"] = data.coreCustomerId;
    } else {
      if (scope.dataJSON["transferType"] !== "Pay a Person") {
        scope.dataJSON["toAccountNumber"] = data.isExternalAccount ? data.accountNumber : data.accountID;
        scope.dataJSON["toAccountCurrency"] = data.currencyCode;
        scope.dataJSON["formattedToAccount"] = data.isExternalAccount ? data.beneficiaryNameFormatted : data.accountNameFormatted;
        scope.dataJSON["transactionType"] = data.isExternalAccount ? "ExternalTransfer" : "InternalTransfer";
        scope.dataJSON["accountType"] = data.accountType;
        scope.dataJSON["beneficiaryName"] = data.isExternalAccount ? data.beneficiaryName : data.accountName;
      } else {
        scope.dataJSON["personId"] = data.PayPersonId;
        scope.dataJSON["formattedToAccount"] = data.name;
        scope.dataJSON["transactionType"] = "P2P";
        scope.dataJSON["accountType"] = data.accountType;
        scope.dataJSON["beneficiaryName"] = data.name;
      }
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: scope.dataJSON,
      key: objectName
    });
  };
  /**
  * @api : filterAccountRecordsOnSelection
  * filter the records on selection of any record
  * @return : NA
  */
  BusinessController.prototype.filterAccountRecordsOnSelection = function(selectedRecord, transerType, fieldType) {
    var scope = this;
    var filteredRecords = [];
    var objectName = fieldType === "From" ? "toAccounts" : "fromAccounts";
    if (!selectedRecord.isExternalAccount) {
      filteredRecords = fieldType === "From" ? scope.toAccountsData : scope.fromAccountsData;
      filteredRecords = filteredRecords.filter(record => {
        if (record.isExternalAccount) return true;
        return record.accountID !== selectedRecord.accountID;
      });
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: filteredRecords,
        key: objectName
      });
    }
  };
  /**
  * @api : checkExistingAccount
  * check whether entered new account number already exists or not
  * @return : boolean
  */
  BusinessController.prototype.checkExistingAccount = function (accNumber) {
    var existingAccounts = this.toAccountsData;
    for (var index in existingAccounts) {
      if (!kony.sdk.isNullOrUndefined(existingAccounts[index].accountNumber)) {
        if (accNumber.toUpperCase() === existingAccounts[index].accountNumber.toUpperCase()) {
          return true;
        }
      } else if (!kony.sdk.isNullOrUndefined(existingAccounts[index].accountID)) {
        if (accNumber.toUpperCase() === existingAccounts[index].accountID.toUpperCase()) {
          return true;
        }
      }
    }
    return false;
  };
  /**
  * @api : getDateObjectFromDateComponents
  * used to get the date object from date components
  * @param {dateComponents} date
  * @returns {Date} - date object
  */
  BusinessController.prototype.getDateObjectFromDateComponents = function (dateComponents) {
    var date = new Date(dateComponents[2], parseInt(dateComponents[1]) - 1, dateComponents[0]);
    return date;
  };
  /**
   * @api : getDateObjectFromCalendarString
   * returns date object from given date string
   * @param {String} dateString - a date string
   * @param {String} format - format of date
   * @returns {Date} - date object
   */
  BusinessController.prototype.getDateObjectFromCalendarString = function (dateString, format) {
    var finalDateTime = null;
    if (dateString) {
      if (kony.sdk.isNullOrUndefined(format)) {
        format = "YYYY-MM-DDThh:mm:ss.SSSZ";
      }
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
          finalDateTime = new Date(Date.UTC(newyyyy, newmm - 1, newdd));
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
  };
  /**
  * @api : storeAttachmentDataInCollection
  * store the uploaded attachments data in collection
  * @return : NA
  */
  BusinessController.prototype.storeAttachmentDataInCollection = function (attachmentsData, attachedFileList) {
    var scope = this;
    var collectionObj = this.store.getState();
    var objectName = "Transaction";
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      scope.dataJSON = collectionObj.Collection[objectName];
    } else {
      collectionObj.Collection[objectName] = {};
      scope.dataJSON = collectionObj.Collection[objectName];
    }
    scope.dataJSON["uploadedattachments"] = attachmentsData.toString();
    scope.dataJSON["attachedFileList"] = attachedFileList;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: scope.dataJSON,
      key: objectName
    });
  };
  /**
  * @api : invokeCustomVerbforValidateIntermediaryBIC
  * fetches the bank name from swift code
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforValidateIntermediaryBicCode = function (widgetName) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ValidateIntermediaryBicCode.Object, this.getCriteria(this.serviceParameters.ValidateIntermediaryBicCode.Criteria), this.serviceParameters.ValidateIntermediaryBicCode.Verb)
      .then(this.validateIntermediaryBIC.bind(this, this.serviceParameters.ValidateIntermediaryBicCode.Object, widgetName))
      .catch(scope.setError.bind(this, "invokeCustomVerbforValidateIntermediaryBIC"));
  };
  /**
  * @api : validateIntermediaryBIC
  * validates Intermediary BIC
  * @return : NA
  */
  BusinessController.prototype.validateIntermediaryBIC = function (object, widgetName, data) {
    var scope = this;
    var validationObject = {};
    kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[object])) {
      scope.dataJSON = collectionObj.Collection[object];
    } else {
      collectionObj.Collection[object] = {};
      scope.dataJSON = collectionObj.Collection[object];
    }
    if (data.isBICValid === 'NO') {
      const mappingKey = scope.getKeyFromMapping(widgetName);
      scope.dataJSON[mappingKey] = "";
      validationObject["dvfError"] = {
        [widgetName]: kony.i18n.getLocalizedString("i18n.UnifiedTransfer.InvalidBIC")
      };
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: validationObject,
        key: "dvfError"
      });
    }
  };
  /**
  * @api : invokeCustomVerbforGetBeneficiaryName
  * retrieve the beneficiary name
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetBeneficiaryName = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBeneficiaryName.Object, this.getCriteria(this.serviceParameters.GetBeneficiaryName.Criteria), this.serviceParameters.GetBeneficiaryName.Verb)
      .then(this.fetchBeneficiaryName.bind(this, this.serviceParameters.GetBeneficiaryName.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetBeneficiaryName"));
  };
  /**
  * @api : fetchBeneficiaryName
  * fetches the beneficiary name
  * @return : NA
  */
  BusinessController.prototype.fetchBeneficiaryName = function (object, data) {
    var scope = this;
    var collectionObj = this.store.getState();
    kony.application.dismissLoadingScreen();
    collectionObj.Collection["beneficiaryDetails"] = {};
    var beneficiaryDetails = {
      "beneficiaryName": data.beneficiaryName,
      "beneficiaryCurrency": data.currency
    };
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: beneficiaryDetails,
      key: "beneficiaryDetails"
    });
  };
  /**
  * @api : invokeCustomVerbforValidateTransaction
  * validate the transaction data using service call
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforValidateTransaction = function(transferType) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var collectionObj = this.store.getState();
    var serviceName = "";
    var accountType = collectionObj.Collection["Transaction"]["accountType"];
    if (collectionObj.Collection["Transaction"]["payeeType"] === "Existing Payee") {
      if (transferType === "Same Bank") {
        if (accountType === "External") serviceName = "IntraBankAccFundTransfer";
        else if (accountType === "CreditCard") serviceName = "createCreditCardTransfer";
        else serviceName = "TransferToOwnAccounts";
      } else if (transferType === "Domestic Transfer") serviceName = "InterBankAccFundTransfer";
      else if (transferType === "International Transfer") serviceName = "InternationalAccFundTransfer";
      else serviceName = "P2PTransfer";
    } else {
      serviceName = "CreateOneTimeTransfer";
    }
    var criteria = this.getCriteria(this.serviceParameters[serviceName].Criteria);
    if (!criteria["toAccountCurrency"]) criteria["toAccountCurrency"] = criteria["transactionCurrency"];
    if (criteria["amount"]) criteria["amount"] = this.getDeformattedAmount(criteria["amount"]);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters[serviceName].Object, criteria, this.serviceParameters[serviceName].Verb)
      .then(this.validateCallSuccess.bind(this, this.serviceParameters[serviceName].Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforValidateTransaction"));
  };
  /**
  * @api : validateCallSuccess
  * success response of validate transaction data service
  * @return : NA
  */
  BusinessController.prototype.validateCallSuccess = function (object, data = {}) {
    var scope = this;
    kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();
    var objectName = "Transaction";
    if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      scope.dataJSON = collectionObj.Collection[objectName];
    } else {
      collectionObj.Collection[objectName] = {};
      scope.dataJSON = collectionObj.Collection[objectName];
    }
    if (data.dbpErrMsg || data.errmsg) {
      scope.dataJSON["validateSuccess"] = false;
      scope.dataJSON["errorDetails"] = data;
    } else {
      scope.dataJSON["validateSuccess"] = true;
      if(data.messageDetails){
      scope.dataJSON["messageDetails"] = data.messageDetails;
      } else{
        delete scope.dataJSON.messageDetails;
      }
      if (data.overrideList) scope.dataJSON["overrideList"] = data.overrideList;
      if (data.charges) {
        scope.dataJSON["charges"] = data.charges;
        var serviceCharge = 0;
        chargesList = JSON.parse(data.charges);
        var formattedCharge = [];
        for (var i = 0; i < chargesList.length; i++) {
          var chargeLabel = chargesList[i].chargeName;
          var chargeValue = scope.getCurrencySymbol(chargesList[i].chargeCurrency) + " " + chargesList[i].chargeAmount;
          formattedCharge.push(chargeLabel, chargeValue);
          serviceCharge = serviceCharge + chargesList[i].chargeAmount;
        }
        scope.dataJSON["formattedCharges"] = formattedCharge;
        scope.dataJSON["serviceCharge"] = serviceCharge;
      } else {
        scope.dataJSON["charges"] = "";
        scope.dataJSON["formattedCharges"] = "";
        scope.dataJSON["serviceCharge"] = "";
      }
      scope.dataJSON["exchangeRate"] = data.exchangeRate || "";
      scope.dataJSON["totalAmount"] =  data.totalAmount || "";
      scope.dataJSON["formattedTotalAmount"] = data.totalAmount ? (scope.getCurrencySymbol(scope.dataJSON["fromAccountCurrency"]) + " " + scope.getFormattedAmount(data.totalAmount)) : "";
      scope.dataJSON["creditValueDate"] = data.creditValueDate || "";
      scope.dataJSON["formattedCreditValueDate"] = data.creditValueDate ? scope.getFormattedDate(data.creditValueDate) : "";
      scope.dataJSON["transactionAmount"] = data.transactionAmount || "";
      scope.dataJSON["referenceId"] = data.referenceId || "";
      scope.dataJSON["amountWithCurrencySymbol"] = scope.getCurrencySymbol(scope.dataJSON["transactionCurrency"]) + " " + scope.dataJSON["amount"];
      scope.dataJSON["transactionCurrencyWithSymbol"] = scope.getCurrencySymbol(scope.dataJSON["transactionCurrency"]) + " " + scope.dataJSON["transactionCurrency"];
    }
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : scope.dataJSON,
      key : objectName
    });
  };
  /**
    * @api : resetCollection
    * clears the data in collection
    * @return : NA
    */
  BusinessController.prototype.resetCollection = function (objectName) {
    var collectionObj = this.store.getState();
    if (objectName) {
      collectionObj["Collection"][objectName] = {};
    } else {
      collectionObj["Cache"] = {},
      collectionObj["Collection"] = {};
    }
  };
  /**
    * @api : resetValidateCallResponse
    * clears the validate call response data in collection
    * @return : NA
    */
  BusinessController.prototype.resetValidateCallResponse = function () {
    var collectionObj = this.store.getState();
    if (!kony.sdk.isNullOrUndefined(collectionObj["Collection"]["Transaction"])) {
      collectionObj["Collection"]["Transaction"]["validateSuccess"] = "";
      collectionObj["Collection"]["Transaction"]["errorDetails"] = "";
      collectionObj["Collection"]["Transaction"]["overrideList"] = "";
      collectionObj["Collection"]["Transaction"]["charges"] = "";
      collectionObj["Collection"]["Transaction"]["formattedCharges"] = "";
      collectionObj["Collection"]["Transaction"]["serviceCharge"] = "";
      collectionObj["Collection"]["Transaction"]["exchangeRate"] = "";
      collectionObj["Collection"]["Transaction"]["totalAmount"] = "";
      collectionObj["Collection"]["Transaction"]["formattedTotalAmount"] = "";
      collectionObj["Collection"]["Transaction"]["creditValueDate"] = "";
      collectionObj["Collection"]["Transaction"]["formattedCreditValueDate"] = "";
      collectionObj["Collection"]["Transaction"]["transactionAmount"] = "";
      collectionObj["Collection"]["Transaction"]["referenceId"] = "";
      collectionObj["Collection"]["Transaction"]["createSuccess"] = "";
    }
  };
  /**
  * @api : invokeCustomVerbforGetBeneficiaryCurrency
  * retrieve the beneficiary currency
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforGetBeneficiaryCurrency = function () {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.GetBeneficiaryCurrency.Object, this.getCriteria(this.serviceParameters.GetBeneficiaryCurrency.Criteria), this.serviceParameters.GetBeneficiaryCurrency.Verb)
      .then(this.fetchBeneficiaryCurrency.bind(this, this.serviceParameters.GetBeneficiaryCurrency.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetBeneficiaryCurrency"));
  };
  /**
  * @api : fetchBeneficiaryCurrency
  * fetches the beneficiary currency
  * @return : NA
  */
  BusinessController.prototype.fetchBeneficiaryCurrency = function (object, data) {
    var scope = this;
    var collectionObj = this.store.getState();
    kony.application.dismissLoadingScreen();
    collectionObj.Collection["beneficiaryCurrency"] = "";
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data.currency,
      key: "beneficiaryCurrency"
    });
  };
  /**
	* @api : setError
	* triggered as an error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(method, errorDetails) {
    var collectionObj = this.store.getState();
    var objectName = "ErrorDetails";
    kony.application.dismissLoadingScreen();
    collectionObj.Collection[objectName] = {};
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : errorDetails,
      key : objectName
    });
  };
  return BusinessController;
});