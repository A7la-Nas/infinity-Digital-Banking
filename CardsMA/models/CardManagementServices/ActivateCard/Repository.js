define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ActivateCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ActivateCardRepository.prototype = Object.create(BaseRepository.prototype);
	ActivateCardRepository.prototype.constructor = ActivateCardRepository;

	//For Operation 'createRequest' with service id 'createOrder6315'
	ActivateCardRepository.prototype.createRequest = function(params, onCompletion){
		return ActivateCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return ActivateCardRepository;
})