define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UnlockCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UnlockCardRepository.prototype = Object.create(BaseRepository.prototype);
	UnlockCardRepository.prototype.constructor = UnlockCardRepository;

	//For Operation 'createRequest' with service id 'createOrder8365'
	UnlockCardRepository.prototype.createRequest = function(params, onCompletion){
		return UnlockCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return UnlockCardRepository;
})