define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ActivityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ActivityRepository.prototype = Object.create(BaseRepository.prototype);
	ActivityRepository.prototype.constructor = ActivityRepository;

	//For Operation 'getToExternalAccountTransactions' with service id 'getToExternalAccountTransactions9746'
	ActivityRepository.prototype.getToExternalAccountTransactions = function(params, onCompletion){
		return ActivityRepository.prototype.customVerb('getToExternalAccountTransactions', params, onCompletion);
	};

	//For Operation 'getUserWiredTransactions' with service id 'getUserWiredTransactions9079'
	ActivityRepository.prototype.getUserWiredTransactions = function(params, onCompletion){
		return ActivityRepository.prototype.customVerb('getUserWiredTransactions', params, onCompletion);
	};

	//For Operation 'getRecipientWireTransaction' with service id 'getRecipientWireTransaction9075'
	ActivityRepository.prototype.getRecipientWireTransaction = function(params, onCompletion){
		return ActivityRepository.prototype.customVerb('getRecipientWireTransaction', params, onCompletion);
	};

	return ActivityRepository;
})