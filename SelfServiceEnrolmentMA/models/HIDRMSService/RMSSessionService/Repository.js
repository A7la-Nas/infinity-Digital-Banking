define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RMSSessionServiceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RMSSessionServiceRepository.prototype = Object.create(BaseRepository.prototype);
	RMSSessionServiceRepository.prototype.constructor = RMSSessionServiceRepository;

	//For Operation 'sessionLogout' with service id 'sessionLogout5422'
	RMSSessionServiceRepository.prototype.sessionLogout = function(params, onCompletion){
		return RMSSessionServiceRepository.prototype.customVerb('sessionLogout', params, onCompletion);
	};

	return RMSSessionServiceRepository;
})