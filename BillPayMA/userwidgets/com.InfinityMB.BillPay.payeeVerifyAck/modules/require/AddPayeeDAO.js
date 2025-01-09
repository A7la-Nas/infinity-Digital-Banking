define(function () {

  function AddPayeeDAO(){
    this.client=kony.sdk.getCurrentInstance();
  }

  /**
     * @api : createPayee
     * @description :  method to invoke createPayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.createPayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      
     var errObj = {
            "errorInfo" : "Error in createPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 

  /**
     * @api : customPayee
     * @description :  method to invoke customPayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.customPayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
      
     var errObj = {
            "errorInfo" : "Error in customPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 
  
  /**
     * @api : updatePayee
     * @description :  method to invoke updatePayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.updatePayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
     var errObj = {
            "errorInfo" : "Error in editPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 

  /**
     * @api : fetchBillerList
     * @description :  method to invoke fetchBillerList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.fetchBillerList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
     var errObj = {
            "errorInfo" : "Error in editPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  };
  /**
     * @api : getAddressSuggestions
     * @description :  method to invoke getAddressSuggestions service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.getAddressSuggestions = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
     response1 = {
  "Locations": [
    {
      "formattedAddress": "Kony India Private Limited, Siddiq Nagar, HITEC City, Hyderabad, Telangana, India",
      "place_id": "ChIJyX7atS_QQxERdKeUk5zDgqA"
    },
    {
      "formattedAddress": "Kony IT Services Pvt Ltd, Madhura Nagar Colony, Gachibowli, Hyderabad, Telangana, India",
      "place_id": "ChIJ50YzLqOVyzsRmxGMldPz6ho"
    }
  ],
  "opstatus": 0,
  "httpStatusCode": 200
};
   //   onSuccess(response1["records"],unicode);
      onSuccess(response1['Locations'],unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
     var errObj = {
            "errorInfo" : "Error in fetchCountriesList method of the component.",
            "error": error
          };
          onError(errObj);

    });
  };
  
  /**
     * @api : getFormattedAddress
     * @description :  method to invoke getFormattedAddress service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.getFormattedAddress = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
   var response1 =   {
  "Locations": [
    {
      "formattedAddress": "9225 Bee Cave Rd #300, Austin, TX 78733, USA",
      "address_components": "[{\"types\":[\"subpremise\"],\"short_name\":\"300\",\"long_name\":\"300\"},{\"types\":[\"street_number\"],\"short_name\":\"9225\",\"long_name\":\"9225\"},{\"types\":[\"route\"],\"short_name\":\"Bee Cave Rd\",\"long_name\":\"Bee Cave Road\"},{\"types\":[\"neighborhood\",\"political\"],\"short_name\":\"Barton Creek Highlands\",\"long_name\":\"Barton Creek Highlands\"},{\"types\":[\"locality\",\"political\"],\"short_name\":\"Austin\",\"long_name\":\"Austin\"},{\"types\":[\"administrative_area_level_2\",\"political\"],\"short_name\":\"Travis County\",\"long_name\":\"Travis County\"},{\"types\":[\"administrative_area_level_1\",\"political\"],\"short_name\":\"TX\",\"long_name\":\"Texas\"},{\"types\":[\"country\",\"political\"],\"short_name\":\"US\",\"long_name\":\"United States\"},{\"types\":[\"postal_code\"],\"short_name\":\"78733\",\"long_name\":\"78733\"},{\"types\":[\"postal_code_suffix\"],\"short_name\":\"6202\",\"long_name\":\"6202\"}]"
    }
  ],
  "opstatus": 0,
  "httpStatusCode": 200
};
    //  onSuccess(response1["records"],unicode);
      onSuccess(response1['Locations'],unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
      function(error) {
      /*
     var errObj = {
            "errorInfo" : "Error in fetchCountriesList method of the component.",
            "error": error
          };
          onError(errObj);
          */
       var response1 =   {
  "Locations": [
    {
      "formattedAddress": "9225 Bee Cave Rd #300, Austin, TX 78733, USA",
      "address_components": "[{\"types\":[\"subpremise\"],\"short_name\":\"300\",\"long_name\":\"300\"},{\"types\":[\"street_number\"],\"short_name\":\"9225\",\"long_name\":\"9225\"},{\"types\":[\"route\"],\"short_name\":\"Bee Cave Rd\",\"long_name\":\"Bee Cave Road\"},{\"types\":[\"neighborhood\",\"political\"],\"short_name\":\"Barton Creek Highlands\",\"long_name\":\"Barton Creek Highlands\"},{\"types\":[\"locality\",\"political\"],\"short_name\":\"Austin\",\"long_name\":\"Austin\"},{\"types\":[\"administrative_area_level_2\",\"political\"],\"short_name\":\"Travis County\",\"long_name\":\"Travis County\"},{\"types\":[\"administrative_area_level_1\",\"political\"],\"short_name\":\"TX\",\"long_name\":\"Texas\"},{\"types\":[\"country\",\"political\"],\"short_name\":\"US\",\"long_name\":\"United States\"},{\"types\":[\"postal_code\"],\"short_name\":\"78733\",\"long_name\":\"78733\"},{\"types\":[\"postal_code_suffix\"],\"short_name\":\"6202\",\"long_name\":\"6202\"}]"
    }
  ],
  "opstatus": 0,
  "httpStatusCode": 200
};
   onSuccess(response1['Locations'],unicode);
    });
  };
  
  /**
     * @api : fetchCountriesList
     * @description :  method to invoke fetchCountriesList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.fetchCountriesList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1["records"],unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
     var errObj = {
            "errorInfo" : "Error in fetchCountriesList method of the component.",
            "error": error
          };
          onError(errObj);

    });
  };
  
    /**
     * @api : fetchStatesList
     * @description :  method to invoke fetchStatesList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.fetchStatesList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options1,
                      function(response1) {
      onSuccess(response1["records"],unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {
     var errObj = {
            "errorInfo" : "Error in fetchStatesList method of the component.",
            "error": error
          };
          onError(errObj);

    });
  };
  return AddPayeeDAO;
});