define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReplaceCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReplaceCardRepository.prototype = Object.create(BaseRepository.prototype);
	ReplaceCardRepository.prototype.constructor = ReplaceCardRepository;

	//For Operation 'createRequest' with service id 'createOrder7268'
	ReplaceCardRepository.prototype.createRequest = function(params, onCompletion){
		return ReplaceCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return ReplaceCardRepository;
})