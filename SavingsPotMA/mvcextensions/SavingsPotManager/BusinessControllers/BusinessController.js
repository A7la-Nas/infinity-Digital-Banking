/**
*@module SavingsPotManager
 */
define([], function() {
    /**
      * SavingsPotManager used to get the details of the Support form
      * @alias module:SavingsPotManager
      * @class
      */
    function SavingsPotManager(){
      var modelDefinition = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Pot");
      this.createBudgetData = new modelDefinition();
    }
    inheritsFrom(SavingsPotManager, kony.mvc.Business.Delegator);
    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    SavingsPotManager.prototype.initializeBusinessController = function() {
    };
     /**
   * Sets the value for each column in SavingsPot Model
   * @param {String} key , column name of the SavingsPot Model
   * @param {String} value , the data corresponding to key for each SavingsPot
   */
    SavingsPotManager.prototype.setAttributeCreateBudget=function(key,value)
    {
      this.createBudgetData[key]=value;
    };
     /**
    * set SavingsPotData variable with SavingsPot details
    * @param {object} SavingsPotId -SavingsPot Details which are to be stored.
    */
    SavingsPotManager.prototype.setCreateBudgetData = function()
    {
      this.createBudgetData;
    };
    /**
    * get the SavingsPot details
    * @returns {object} It returns SavingsPot details which is stores by setSavingsPotData
    */
    SavingsPotManager.prototype.getCreateBudgetData = function()
    {
      return this.createBudgetData;
    };
    /**
     * Clears the stored values for SavingsPotData member of RecipientsManager class
     */
    SavingsPotManager.prototype.clearCreateBudgetData = function()
    {
      var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Pot");
      this.createBudgetData=new modelDefinition();
    };
   /**
    * set SavingsPotData variable with SavingsPot details
    * @param {object} SavingsPotId - SavingsPot Details which are to be stored.
    */
   SavingsPotManager.prototype.setAttributeFundWithdraw = function(key,value)
    {
      this.createBudgetData[key]=value;
    };
    /**
    * get the SavingsPot details
    * @returns {object} It returns SavingsPot details which is stores by SavingsPotData
    */
    SavingsPotManager.prototype.getFundWithdrawData = function()
    {
      return this.createBudgetData;
    };
    /**
     * Clears the stored values for SavingsPotData member of RecipientsManager class
     */
    SavingsPotManager.prototype.clearFundWithdrawData = function()
    {
      var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Pot");
      this.createBudgetData=new modelDefinition();
    };
    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	SavingsPotManager.prototype.execute = function(command) {
		kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };
 
  
  /**
    * get saving pots related to an account
    * @param {object} accountNumber ,  account number of the user
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.fetchSavingsPotsDetails = function (fundingAccountId, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Pot"); 
    savingsPotRepo.customVerb("getPot", fundingAccountId, fetchSavingsPotsDetailsCompletionCallback);
    function fetchSavingsPotsDetailsCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

  /**
    * create saving pot related to an account
    * @param {object} savingsPotObject ,  savings pot object
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.createSavingsPot = function (savingsPotObject, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Pot"); 
    savingsPotRepo.customVerb("createPot", savingsPotObject, createSavingsPotCompletionCallback);
    function createSavingsPotCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

  /**
    * update savings pot balance
    * @param {object} savingsPotBalanceObject ,  savings pot balance object
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.updateSavingsPotBalance = function (savingsPotBalanceObject, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("PotBalance"); 
    savingsPotRepo.customVerb("updateBalance", savingsPotBalanceObject, updateSavingsPotBalanceCompletionCallback);
    function updateSavingsPotBalanceCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

   /**
    * close savings pot 
    * @param {object} savingsPotId ,  savings pot id
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.closeSavingsPot = function (savingsPotId, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Pot"); 
    savingsPotRepo.customVerb("closePot", savingsPotId, closeSavingsPotCompletionCallback);
    function closeSavingsPotCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

   /**
    * update savings pot object
    * @param {object} savingsPotObject ,  savings pot object
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.updateSavingsPot = function (savingsPotObject, presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Pot"); 
    savingsPotRepo.customVerb("updatePot", savingsPotObject, updateSavingsPotCompletionCallback);
    function updateSavingsPotCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

   /**
    * get goals categories
    * @param {}  ,  None
    * @param {function} presentationSuccessCallback , invoke the call back with success response.
    * @param {function} presentationErrorCallback , invoke the call back with error response.
    */
   SavingsPotManager.prototype.fetchCategoriesForGoal = function (presentationSuccessCallback, presentationErrorCallback) {
    var savingsPotRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("PotCategories"); 
    savingsPotRepo.customVerb("getCategories", {}, fetchCategoriesForGoalCompletionCallback);
    function fetchCategoriesForGoalCompletionCallback(status, data, error) {
        var srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true) {
           presentationSuccessCallback(obj["data"]);
        }
        else {
          presentationErrorCallback(obj["errmsg"]);
       }
    }
  };

    return SavingsPotManager;
});