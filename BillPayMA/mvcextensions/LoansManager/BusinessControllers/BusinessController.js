define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
    function LoansManager() { 

    } ;

    inheritsFrom(LoansManager, kony.mvc.Business.Delegator); 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    LoansManager.prototype.initializeBusinessController = function() { 

    }; 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	LoansManager.prototype.simulationCall = function(params,presentationSuccessCallback,presentationErrorCallback) { 
        var loanObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository('LoanSimulateObject');
        loanObj.save(params, saveCompletionCallback);
        function saveCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    };
  //BillAmountCall
    LoansManager.prototype.fetchLoanPayoffAmount = function(criteria, presentationSuccessCallback, presentationErrorCallback) {
        var loansObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository('LoanBillObject');
        loansObj.customVerb("getByParam", criteria, saveCompletionCallback);
        function saveCompletionCallback(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj["status"] === true) {
                presentationSuccessCallback(obj["data"]);
            } else {
                presentationErrorCallback(obj["errmsg"]);
            }
        }
    };
    return LoansManager;

});