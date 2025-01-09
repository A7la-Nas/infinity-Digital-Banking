define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomRoleRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomRoleRepository.prototype = Object.create(BaseRepository.prototype);
	CustomRoleRepository.prototype.constructor = CustomRoleRepository;

	//For Operation 'deleteCustomRole' with service id 'deleteCustomRole3865'
	CustomRoleRepository.prototype.deleteCustomRole = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('deleteCustomRole', params, onCompletion);
	};

	//For Operation 'createCustomRole' with service id 'CreateCustomRoleActionLimits9917'
	CustomRoleRepository.prototype.createCustomRole = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('createCustomRole', params, onCompletion);
	};

	//For Operation 'updateCustomRole' with service id 'updateCustomRole7385'
	CustomRoleRepository.prototype.updateCustomRole = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('updateCustomRole', params, onCompletion);
	};

	//For Operation 'getOrganizationCustomRoles' with service id 'getOrganisationCustomRoles3906'
	CustomRoleRepository.prototype.getOrganizationCustomRoles = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('getOrganizationCustomRoles', params, onCompletion);
	};

	//For Operation 'getCustomRoleDetails' with service id 'getCustomRoleDetails3218'
	CustomRoleRepository.prototype.getCustomRoleDetails = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('getCustomRoleDetails', params, onCompletion);
	};

	//For Operation 'applyCustomRole' with service id 'ApplyCustomRole1304'
	CustomRoleRepository.prototype.applyCustomRole = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('applyCustomRole', params, onCompletion);
	};

	//For Operation 'verifyCustomRoleName' with service id 'verifyCustomRoleName2743'
	CustomRoleRepository.prototype.verifyCustomRoleName = function(params, onCompletion){
		return CustomRoleRepository.prototype.customVerb('verifyCustomRoleName', params, onCompletion);
	};

	return CustomRoleRepository;
})