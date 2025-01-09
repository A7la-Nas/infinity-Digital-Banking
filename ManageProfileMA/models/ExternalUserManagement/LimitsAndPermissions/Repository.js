define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LimitsAndPermissionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LimitsAndPermissionsRepository.prototype = Object.create(BaseRepository.prototype);
	LimitsAndPermissionsRepository.prototype.constructor = LimitsAndPermissionsRepository;

	//For Operation 'updateCustomerRoleLimitsAndPermissions' with service id 'updateCustomerRoleLimitsAndPermissions2301'
	LimitsAndPermissionsRepository.prototype.updateCustomerRoleLimitsAndPermissions = function(params, onCompletion){
		return LimitsAndPermissionsRepository.prototype.customVerb('updateCustomerRoleLimitsAndPermissions', params, onCompletion);
	};

	//For Operation 'updateServiceDefinitionLimitsAndPermissions' with service id 'updateServiceDefinitionLimitsAndPermissions3569'
	LimitsAndPermissionsRepository.prototype.updateServiceDefinitionLimitsAndPermissions = function(params, onCompletion){
		return LimitsAndPermissionsRepository.prototype.customVerb('updateServiceDefinitionLimitsAndPermissions', params, onCompletion);
	};

	return LimitsAndPermissionsRepository;
})