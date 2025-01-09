define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CancelCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CancelCardRepository.prototype = Object.create(BaseRepository.prototype);
	CancelCardRepository.prototype.constructor = CancelCardRepository;

	//For Operation 'createRequest' with service id 'createOrder1702'
	CancelCardRepository.prototype.createRequest = function(params, onCompletion){
		return CancelCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return CancelCardRepository;
})