define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RMSActionCompleteRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RMSActionCompleteRepository.prototype = Object.create(BaseRepository.prototype);
	RMSActionCompleteRepository.prototype.constructor = RMSActionCompleteRepository;

	//For Operation 'rmsActionReject' with service id 'actionReject3779'
	RMSActionCompleteRepository.prototype.rmsActionReject = function(params, onCompletion){
		return RMSActionCompleteRepository.prototype.customVerb('rmsActionReject', params, onCompletion);
	};

	//For Operation 'rmsActionComplete' with service id 'actionComplete5411'
	RMSActionCompleteRepository.prototype.rmsActionComplete = function(params, onCompletion){
		return RMSActionCompleteRepository.prototype.customVerb('rmsActionComplete', params, onCompletion);
	};

	return RMSActionCompleteRepository;
})