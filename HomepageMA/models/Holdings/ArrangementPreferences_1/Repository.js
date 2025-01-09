define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ArrangementPreferences_1Repository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ArrangementPreferences_1Repository.prototype = Object.create(BaseRepository.prototype);
	ArrangementPreferences_1Repository.prototype.constructor = ArrangementPreferences_1Repository;

	//For Operation 'deactivateP2P' with service id 'deactivateP2P9743'
	ArrangementPreferences_1Repository.prototype.deactivateP2P = function(params, onCompletion){
		return ArrangementPreferences_1Repository.prototype.customVerb('deactivateP2P', params, onCompletion);
	};

	//For Operation 'activateP2P' with service id 'activateP2PForUser8370'
	ArrangementPreferences_1Repository.prototype.activateP2P = function(params, onCompletion){
		return ArrangementPreferences_1Repository.prototype.customVerb('activateP2P', params, onCompletion);
	};

	//For Operation 'activateBillPay' with service id 'activateBillPaymentForUser1097'
	ArrangementPreferences_1Repository.prototype.activateBillPay = function(params, onCompletion){
		return ArrangementPreferences_1Repository.prototype.customVerb('activateBillPay', params, onCompletion);
	};

	//For Operation 'updateBillPayPreferredAccount' with service id 'updatePreferredBillPayAccount3351'
	ArrangementPreferences_1Repository.prototype.updateBillPayPreferredAccount = function(params, onCompletion){
		return ArrangementPreferences_1Repository.prototype.customVerb('updateBillPayPreferredAccount', params, onCompletion);
	};

	//For Operation 'updateP2PPreferredAccount' with service id 'updatePreferredP2PAccounts7402'
	ArrangementPreferences_1Repository.prototype.updateP2PPreferredAccount = function(params, onCompletion){
		return ArrangementPreferences_1Repository.prototype.customVerb('updateP2PPreferredAccount', params, onCompletion);
	};

	return ArrangementPreferences_1Repository;
})