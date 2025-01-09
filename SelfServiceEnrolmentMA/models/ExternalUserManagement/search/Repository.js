define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function searchRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	searchRepository.prototype = Object.create(BaseRepository.prototype);
	searchRepository.prototype.constructor = searchRepository;

	//For Operation 'customerSearch' with service id 'CustomerSearchOperation9369'
	searchRepository.prototype.customerSearch = function(params, onCompletion){
		return searchRepository.prototype.customVerb('customerSearch', params, onCompletion);
	};

	//For Operation 'getCustomerBasicInformation' with service id 'getCustomerBasicInformation3742'
	searchRepository.prototype.getCustomerBasicInformation = function(params, onCompletion){
		return searchRepository.prototype.customVerb('getCustomerBasicInformation', params, onCompletion);
	};

	return searchRepository;
})