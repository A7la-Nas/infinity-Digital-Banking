define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerLimitsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerLimitsRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerLimitsRepository.prototype.constructor = CustomerLimitsRepository;

	//For Operation 'getCustomerActionLimits' with service id 'getCustomerActionLimits1179'
	CustomerLimitsRepository.prototype.getCustomerActionLimits = function(params, onCompletion){
		return CustomerLimitsRepository.prototype.customVerb('getCustomerActionLimits', params, onCompletion);
	};

	return CustomerLimitsRepository;
})