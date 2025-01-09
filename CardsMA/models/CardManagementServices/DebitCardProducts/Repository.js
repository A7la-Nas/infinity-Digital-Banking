define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DebitCardProductsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DebitCardProductsRepository.prototype = Object.create(BaseRepository.prototype);
	DebitCardProductsRepository.prototype.constructor = DebitCardProductsRepository;

	//For Operation 'getProducts' with service id 'getCardProducts2281'
	DebitCardProductsRepository.prototype.getProducts = function(params, onCompletion){
		return DebitCardProductsRepository.prototype.customVerb('getProducts', params, onCompletion);
	};

	return DebitCardProductsRepository;
})