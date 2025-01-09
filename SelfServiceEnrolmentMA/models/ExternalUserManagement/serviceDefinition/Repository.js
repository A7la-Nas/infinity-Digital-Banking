define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function serviceDefinitionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	serviceDefinitionRepository.prototype = Object.create(BaseRepository.prototype);
	serviceDefinitionRepository.prototype.constructor = serviceDefinitionRepository;

	//For Operation 'getServiceDefinitionsForContracts' with service id 'GetServiceDefinitionsForContracts3644'
	serviceDefinitionRepository.prototype.getServiceDefinitionsForContracts = function(params, onCompletion){
		return serviceDefinitionRepository.prototype.customVerb('getServiceDefinitionsForContracts', params, onCompletion);
	};

	//For Operation 'getServicedefinitionAndRoleFeatures' with service id 'GetServicedefinitionAndRoleFeatures2305'
	serviceDefinitionRepository.prototype.getServicedefinitionAndRoleFeatures = function(params, onCompletion){
		return serviceDefinitionRepository.prototype.customVerb('getServicedefinitionAndRoleFeatures', params, onCompletion);
	};

	//For Operation 'getServiceDefinitionRoles' with service id 'GetServiceDefinitionRoles4199'
	serviceDefinitionRepository.prototype.getServiceDefinitionRoles = function(params, onCompletion){
		return serviceDefinitionRepository.prototype.customVerb('getServiceDefinitionRoles', params, onCompletion);
	};

	return serviceDefinitionRepository;
})