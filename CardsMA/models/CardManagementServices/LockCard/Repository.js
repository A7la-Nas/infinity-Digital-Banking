define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LockCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LockCardRepository.prototype = Object.create(BaseRepository.prototype);
	LockCardRepository.prototype.constructor = LockCardRepository;

	//For Operation 'createRequest' with service id 'createOrder2180'
	LockCardRepository.prototype.createRequest = function(params, onCompletion){
		return LockCardRepository.prototype.customVerb('createRequest', params, onCompletion);
	};

	return LockCardRepository;
})