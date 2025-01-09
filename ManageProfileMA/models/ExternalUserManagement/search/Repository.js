define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function searchRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	searchRepository.prototype = Object.create(BaseRepository.prototype);
	searchRepository.prototype.constructor = searchRepository;

	//For Operation 'UserIdSearchOperationDetailedData' with service id 'UserIdSearchOperationDetailedDataOperation2233'
	searchRepository.prototype.UserIdSearchOperationDetailedData = function(params, onCompletion){
		return searchRepository.prototype.customVerb('UserIdSearchOperationDetailedData', params, onCompletion);
	};

	//For Operation 'enrolledCustomerSearch' with service id 'enrolledCustomerSearchOperation4604'
	searchRepository.prototype.enrolledCustomerSearch = function(params, onCompletion){
		return searchRepository.prototype.customVerb('enrolledCustomerSearch', params, onCompletion);
	};

	//For Operation 'CustomerLegalEntitiesGetOperation' with service id 'CustomerLegalEntitiesGetOperation8022'
	searchRepository.prototype.CustomerLegalEntitiesGetOperation = function(params, onCompletion){
		return searchRepository.prototype.customVerb('CustomerLegalEntitiesGetOperation', params, onCompletion);
	};

	//For Operation 'customerSearch' with service id 'CustomerSearchOperation9369'
	searchRepository.prototype.customerSearch = function(params, onCompletion){
		return searchRepository.prototype.customVerb('customerSearch', params, onCompletion);
	};

	//For Operation 'customerSearchByUserName' with service id 'customerSearchByUserName3099'
	searchRepository.prototype.customerSearchByUserName = function(params, onCompletion){
		return searchRepository.prototype.customVerb('customerSearchByUserName', params, onCompletion);
	};

	//For Operation 'getCustomerBasicInformation' with service id 'getCustomerBasicInformation3742'
	searchRepository.prototype.getCustomerBasicInformation = function(params, onCompletion){
		return searchRepository.prototype.customVerb('getCustomerBasicInformation', params, onCompletion);
	};

	return searchRepository;
})