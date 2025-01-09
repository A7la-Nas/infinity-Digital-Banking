define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function OutageMessageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	OutageMessageRepository.prototype = Object.create(BaseRepository.prototype);
	OutageMessageRepository.prototype.constructor = OutageMessageRepository;

	//For Operation 'getOutageMessage' with service id 'getOutageMessage9185'
	OutageMessageRepository.prototype.getOutageMessage = function(params, onCompletion){
		return OutageMessageRepository.prototype.customVerb('getOutageMessage', params, onCompletion);
	};

	return OutageMessageRepository;
})