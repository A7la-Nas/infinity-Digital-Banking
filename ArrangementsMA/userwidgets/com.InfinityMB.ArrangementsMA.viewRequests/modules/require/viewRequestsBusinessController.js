define(['DataFormattingUtils/FormatUtils','InvokeServiceUtils'],function(FormatUtils,InvokeServiceUtils) {

  function BusinessController() {
    this.store = {};
    this.objectMetadata = {};
    this.context = {};
    this.serviceParameters = {};
    this.formatUtils = new FormatUtils();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
  }

  BusinessController.prototype.getAccountName = function(id){
    var accounts = this.context;
    let foundAcc = false;
    let userAccountName;
    let userAccountType;

    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].accountID === id) {
        userAccountName = accounts[i].accountName.substring(0,30) + "..." + accounts[i].accountID.substr(accounts[i].accountID.length - 4);
        userAccountType = accounts[i].accountType;
        foundAcc = true;
      } 
    }
    return foundAcc?[userAccountName,userAccountType]:['NA','NA'];
  };

  /**
	* @api : setPropertiesFromComponent
	* set properties from component
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };
  /**
    * @api : getMetaDataForAllObjects
    * get meta data  from the model for all the objects
    * @return : NA
    */  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.ServiceOrder.Service, this.serviceParameters.ServiceOrder.Object);
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
      scope.objectMetadata[scope.serviceParameters.ServiceOrder.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err, "getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
    * @api : invokeCustomVerbforServiceOrder
    * fetches the  data from the object model for service requests
    * @return : NA
    */ 
  BusinessController.prototype.invokeCustomVerbforServiceOrder = function() {
    var scope = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ServiceOrder.Object, "", this.serviceParameters.ServiceOrder.Verb)
      .then(this.setRequestsList.bind(this, this.serviceParameters.ServiceOrder.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforServiceOrder"));
  };


  BusinessController.prototype.setRequestsList = function(object, data) {
    let formattedData;
    for (var i = 0, len = data.serviceReqs.length; i < len; i++) {      
      data.serviceReqs[i].accountName = data.serviceReqs[i].accountId?this.getAccountName(data.serviceReqs[i].accountId)[0]:"NA";
      data.serviceReqs[i].accountType = data.serviceReqs[i].accountId?this.getAccountName(data.serviceReqs[i].accountId)[1]:"NA";
    }
    formattedData = this.getFormattedData(object, data.serviceReqs);

    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      cacheData: data.serviceReqs,
      collectionData: formattedData,
      key : object
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
    // 	this.setRequestsList("serviceCallError",errorObj);
  };

  /**
	* @api : searchData
	* gets invoked on searching  data
	* @return : NA
	*/
  BusinessController.prototype.filterData = function(filterBy) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var filteredData = [];

    filteredData = records.filter(function(k) {
      return k["serviceReqStatus"].toUpperCase().includes(filterBy.toUpperCase()) ||
        k["subType_description"].toUpperCase().includes(filterBy.toUpperCase()) ||
        k["serviceReqId"].toUpperCase().includes(filterBy.toUpperCase()) ||
        (k["accountId"]&&k["accountId"].toUpperCase().includes(filterBy.toUpperCase()));
    });

    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, filteredData);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };  



  /**
	* @api : fetchServiceRequestsBySearch
	* fetches the  data from the object model
	* @return : NA
	*/
  BusinessController.prototype.fetchServiceRequestsBySearch = function(searchCriteria, startDate, endDate) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var filteredData = [];

    if (searchCriteria.length > 0 || startDate || endDate) {
      if(!startDate){
        let today = new Date();   
        today.setMonth(today.getMonth() - this.getMaxPeriod()); 
        startDate = today.toISOString().slice(0,10);
      }
      if(!endDate){
        let today = new Date();      
        endDate = today.toISOString().slice(0,10);
      }

      if (searchCriteria.length > 0){
        for (let index = 0; index < searchCriteria.length; index++) {
          filteredData = records.filter((elem) => (searchCriteria[index] && elem[searchCriteria[index][0]] === searchCriteria[index][1]) && (new Date(elem.requestDate) >= new Date(startDate)) && (new Date(elem.requestDate) <= new Date(endDate)));
          records = filteredData;
        }   
      }else{
        for (let index = 0; index < records.length; index++) {
          filteredData = records.filter((elem) => ( (new Date(elem.requestDate) >= new Date(startDate)) && (new Date(elem.requestDate) <= new Date(endDate))));
          records = filteredData;
        }   
      }
    }else {
      filteredData = records; 
    }

    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, filteredData);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };

  BusinessController.prototype.getMaxPeriod = function(){  
    var serviceReqMaxPeriod = 1;

    let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties(function(response) {
      let allClientProp = response;

      serviceReqMaxPeriod = response["SERVICE_REQUEST_MAX_PERIOD_MONTH"]?response["SERVICE_REQUEST_MAX_PERIOD_MONTH"]:1;

    }, function(){});

    return serviceReqMaxPeriod;
  };


  /**
	* @api : reset all filters
	* gets invoked on sorting  data
	* @return : NA
	*/
  BusinessController.prototype.resetDataList = function() {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];

    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, records);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };


  return BusinessController;
});