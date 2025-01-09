define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ServiceRequestRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ServiceRequestRepository.prototype = Object.create(BaseRepository.prototype);
	ServiceRequestRepository.prototype.constructor = ServiceRequestRepository;

	//For Operation 'getDetails' with service id 'getServiceRequestDetails4419'
	ServiceRequestRepository.prototype.getDetails = function(params, onCompletion){
		return ServiceRequestRepository.prototype.customVerb('getDetails', params, onCompletion);
	};

	return ServiceRequestRepository;
})