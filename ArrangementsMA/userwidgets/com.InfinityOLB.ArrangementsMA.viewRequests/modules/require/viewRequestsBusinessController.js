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
  /**
	* @api : setPropertiesFromComponent
	* set properties from component
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, customDataFormat) {
    this.serviceParameters = serviceParameters;
    this.formatUtils.updateFormatJSON(customDataFormat);
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
      scope.objectMetadata[scope.serviceParameters.ServiceOrder.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err,"getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(this.serviceParameters.ServiceOrder.Service, this.serviceParameters.ServiceOrder.Object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
	* @api : fetchServiceOrders
	* fetches the  data from the object model
	* @return : NA
	*/
  BusinessController.prototype.fetchServiceRequests = function(context) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    this.context = context;
    var criteria = '';
    scope.invokeServiceUtils.makeAServiceCall("customVerb",this.serviceParameters.ServiceOrder.Object,criteria,this.serviceParameters.ServiceOrder.Verb)
      .then(this.setDataInCollection.bind(this,this.serviceParameters.ServiceOrder.Object))
      .catch(scope.setError.bind(this, "fetchServiceOrders"));
  };

  /**
	* @api : fetchServiceRequestsBySearch
	* fetches the  data from the object model
	* @return : NA
	*/
   BusinessController.prototype.fetchServiceRequestsBySearch = function(searchCriteria, startDate, endDate, keywords) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var filteredData = [];
    var startDateUndefined = "undefined-undefined-undefined" === startDate;
    var endDateUndefined = "undefined-undefined-undefined" === endDate;



    if (searchCriteria.length > 0 || startDate || endDate || keywords) {
      if(!startDate){
        let today = new Date();   
        today.setMonth(today.getMonth() - this.getMaxPeriod()); 
        startDate = today.toISOString().slice(0,10);
      }
      if(!endDate){
        let today = new Date();      
        endDate = today.toISOString().slice(0,10);
      }

      if(startDate || endDate){
        for (let index = 0; index < records.length; index++) {
          filteredData = records.filter(
            (elem) =>( (startDateUndefined || elem.requestDate >= startDate) && (endDateUndefined || elem.requestDate <= endDate)));
          records = filteredData;
        }
      }else
         filteredData = records;
      
      var filtered2Data = [];
      if (searchCriteria.length > 0) {
        for (let index = 0; index < searchCriteria.length; index++) {
          filtered2Data = filteredData.filter(
            (elem) =>(searchCriteria[index] && elem[searchCriteria[index][0]] === searchCriteria[index][1]));
          filteredData = filtered2Data;
        }
      }else
        filtered2Data = filteredData;
      
       
      if (keywords) {
        let keywordsList = keywords.split(' ');
        let newFiltered = [];
        for (let index = 0; index < keywordsList.length; index++) {
          let temp = keywordsList[index];   
          newFiltered = filtered2Data.filter((elem) => ((elem.subType_description.toUpperCase().includes(temp.toUpperCase())) || (elem.serviceReqId.toUpperCase().includes(temp.toUpperCase())) || (elem.
          accountId && elem.accountId.toUpperCase().includes(temp.toUpperCase())) || (elem.serviceReqStatus.toUpperCase().includes(temp.toUpperCase()))));
          filtered2Data = newFiltered;
        }
        filteredData = newFiltered;
      }else
        filteredData = filtered2Data;

    }
    else {
      filteredData = records;
//       if (keywords) {
//         let keywordsList = keywords.split(' ');
//         let newFiltered = [];
//         for (let index = 0; index < keywordsList.length; index++) {
//           let temp = keywordsList[index];   
//           newFiltered = filteredData.filter((elem) => ((elem.subType.toUpperCase().includes(temp.toUpperCase())) || (elem.serviceReqId.toUpperCase().includes(temp.toUpperCase())) || (elem.
//            accountId && elem.accountId.toUpperCase().includes(temp.toUpperCase())) || (elem.serviceReqStatus.toUpperCase().includes(temp.toUpperCase()))));
//           filteredData = newFiltered;
//         }
//         filteredData = newFiltered;
//       }
    }

    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, filteredData);
    this.store.dispatch({
      type: "UPDATE_Collection",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
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
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key]); 
            record[key] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };

  BusinessController.prototype.setAccountInCollection = function(data) {

    var userAccount = "";
    var accountType ="";
    var configurationManager = applicationManager.getConfigurationManager();
	var accountsPostLogin = configurationManager.userAccounts;
    let foundAcc = false;
    if (accountsPostLogin)
    accountsPostLogin.forEach(function(value) {
      if (value.accountID === data) {
        userAccount = value.accountName.substring(0,15) + "..." + value.accountID.substr(value.accountID.length - 4);
        accountType = value.accountType;
        foundAcc = true;
      }
    });
    return foundAcc? [userAccount,accountType]:'NA';
  };

  /**
	* @api : setDataInCollection
	* Store the service response in Master object under collection and invoke formatting data
	* @return : NA
	*/

  BusinessController.prototype.setDataInCollection = function(object, data) {

    for (i = 0; i < data.serviceReqs.length; i++) {
      var userAccount = this.setAccountInCollection(data.serviceReqs[i].accountId);
      if (userAccount !== 'NA') {
        data.serviceReqs[i].accountName = this.setAccountInCollection(data.serviceReqs[i].accountId)[0];    
        data.serviceReqs[i].accountType = this.setAccountInCollection(data.serviceReqs[i].accountId)[1];  
      }
      else {
        data.serviceReqs[i].accountName = 'NA';   
        data.serviceReqs[i].accountType = 'NA';
      }
      
      if(data.serviceReqs[i].signatoryApprovalRequired==='false')
        data.serviceReqs[i].signatoryApprovalRequired = 'No';        
      else
        data.serviceReqs[i].signatoryApprovalRequired = 'Yes';       
    }
    
    var collection = this.getFormattedData(object, data.serviceReqs);

    this.store.dispatch({
      type: "UPDATE_Collection_Cache",
      Cache: data.serviceReqs,
      Collection: collection,
      key : object
    }); 
    this.sortData(1,"DESC");
    kony.application.dismissLoadingScreen();
  };

  /**
	* @api : sortData
	* gets invoked on sorting  data
	* @return : NA
	*/
  BusinessController.prototype.sortData = function(field, sortBy) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var sortedData = [];
    sortedData = records.slice().sort(function(a, b) {
      a = a[field];
      b = b[field];
      return a > b ? 1 : a < b ? -1 : 0;
    });
    if(sortBy === "DESC"){
      sortedData = sortedData.reverse();
    }
    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, sortedData);
    this.store.dispatch({
      type: "UPDATE_Collection",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };
  
   /**
	* @api : sortData
	* gets invoked on sorting  data
	* @return : NA
	*/
  BusinessController.prototype.resetDataList = function(field, sortBy) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
   
    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, records);
    this.store.dispatch({
      type: "UPDATE_Collection",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };
  
 /**
	* @api : searchData
	* gets invoked on searching  data
	* @return : NA
	*/
  BusinessController.prototype.filterData = function(filterBy,searchCriteria) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var filteredData = [];
    
    filteredData = records.filter(function(k) {        
        for(var i = 0; i < searchCriteria.length; i++){
            try {
              if (k[searchCriteria[i].field] && 
                  k[searchCriteria[i].field].toUpperCase().includes(filterBy.toUpperCase()))
                return true;
            } catch(err) {
              //implicit non-match, skip to next field or record
            }
        }
      return false;
    });
     
    var data = this.getFormattedData(this.serviceParameters.ServiceOrder.Object, filteredData);
    this.store.dispatch({
      type: "UPDATE_Collection",
      data: data,
      key : this.serviceParameters.ServiceOrder.Object
    });
  };  
  
  /**
	* @api : getFilterList
	* gets invoked on sorting  data
	* @return : NA
	*/
  BusinessController.prototype.getFilterList = function(field, fieldLabel) {
    
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var list = [];
    if(records){
      let listFieldLabel = records.map(elem => ({field:elem[field], fieldLabel:elem[fieldLabel]}));

      let listUniquePairs = listFieldLabel.filter((elem, i, array) => array.findIndex(elem2 => elem2['field'] === elem['field']) === i);

      for (var index in listUniquePairs) {
        if(listUniquePairs[index]['field'])
          list.push([listUniquePairs[index]['field'], listUniquePairs[index]['fieldLabel']]);
        
      }
    }
    return list;
  };
  
  //for account label
   BusinessController.prototype.getAccountList = function(field, fieldLabel,fieldType) {
    
    var state = this.store.getState();
    var records = state.Cache[this.serviceParameters.ServiceOrder.Object];
    var list = [];
    if(records){
      let listFieldLabel = records.map(elem => ({field:elem[field], fieldLabel:elem[fieldLabel], fieldType:elem[fieldType]}));

      let listUniquePairs = listFieldLabel.filter((elem, i, array) => array.findIndex(elem2 => elem2['field'] === elem['field']) === i);

      for (var index in listUniquePairs) {
        if(listUniquePairs[index]['field'] && listUniquePairs[index]['fieldType'] !== "NA")
          list.push([listUniquePairs[index]['field'], listUniquePairs[index]['fieldLabel'], listUniquePairs[index]['fieldType']]);
        
      }
    }
    return list;
  };
  //end account
   
  BusinessController.prototype.getMaxPeriod = function(){  
    var serviceReqMaxPeriod = 1;

    let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties(function(response) {
      let allClientProp = response;

      serviceReqMaxPeriod = response["SERVICE_REQUEST_MAX_PERIOD_MONTH"]?response["SERVICE_REQUEST_MAX_PERIOD_MONTH"]:1;

    }, function(){});

    return serviceReqMaxPeriod;
  },


  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(errorMsg,method) {
    kony.application.dismissLoadingScreen();
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
  };

  return BusinessController;
});