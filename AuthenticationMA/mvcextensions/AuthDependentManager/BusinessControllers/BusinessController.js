define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function AuthDependentManager() { 
        this.cards = null;
    } 
    inheritsFrom(AuthDependentManager, kony.mvc.Business.Delegator); 
    
    /**
     * @memberof CardsManager
     */
    AuthDependentManager.prototype.fetchAllCardsWithUsername = function(username, successCB, errorCB) {
		var cardsRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Cards");
		var params = {
			"userName": username
		};
		cardsRepo.customVerb('getCardsByUsername', params, getAllCompletionCallback);
		function getAllCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error, successCB, errorCB);
			if (obj["status"] === true) {
				this.cards = data;
				successCB(obj["data"]);
			} else {
                errorCB(obj["errmsg"]);
            }				
		}
	};
    
    return AuthDependentManager;

});