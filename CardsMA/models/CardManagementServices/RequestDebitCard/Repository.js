define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RequestDebitCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RequestDebitCardRepository.prototype = Object.create(BaseRepository.prototype);
	RequestDebitCardRepository.prototype.constructor = RequestDebitCardRepository;

	//For Operation 'createRequest' with service id 'createOrder2378'
	RequestDebitCardRepository.prototype.createRequest = function(params, onCompletion){
		return RequestDebitCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return RequestDebitCardRepository;
})