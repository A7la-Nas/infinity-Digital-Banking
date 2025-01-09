define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PurchaseLimitRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PurchaseLimitRepository.prototype = Object.create(BaseRepository.prototype);
	PurchaseLimitRepository.prototype.constructor = PurchaseLimitRepository;

	//For Operation 'updateLimit' with service id 'createOrder2168'
	PurchaseLimitRepository.prototype.updateLimit = function(params, onCompletion){
		return PurchaseLimitRepository.prototype.customVerb('updateLimit', params, onCompletion);
	};

	return PurchaseLimitRepository;
})